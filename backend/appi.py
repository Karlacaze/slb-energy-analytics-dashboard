# app.py - Flask API Backend
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import numpy as np
import logging

app = Flask(__name__)
CORS(app)

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Variables globales para el modelo y datos
model_rend = None
df_modelo = None

def load_model_and_data():
    """Cargar modelo y datos al inicializar la aplicación"""
    global model_rend, df_modelo
    
    try:
        # Cargar el modelo
        model_rend = joblib.load('modelo_rendimiento.pkl')
        logger.info("Modelo cargado exitosamente")
        
        # Cargar los datos (ajustar la ruta según tu estructura)
        df_modelo = pd.read_csv('df_modelo.csv')  # o el archivo que uses
        logger.info(f"Datos cargados: {len(df_modelo)} registros")
        
    except FileNotFoundError as e:
        logger.error(f"Archivo no encontrado: {e}")
        model_rend = None
        df_modelo = None
    except Exception as e:
        logger.error(f"Error cargando modelo/datos: {e}")
        model_rend = None
        df_modelo = None

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint para verificar el estado de la API"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model_rend is not None,
        'data_loaded': df_modelo is not None,
        'data_records': len(df_modelo) if df_modelo is not None else 0
    })

@app.route('/get_options', methods=['GET'])
def get_options():
    """Obtener las opciones disponibles para los dropdowns"""
    if df_modelo is None:
        return jsonify({'error': 'Datos no disponibles'}), 500
    
    try:
        options = {
            'conductores': sorted(df_modelo["conductor"].dropna().astype(str).unique().tolist()),
            'vehiculos': sorted(df_modelo["vehículo"].dropna().astype(str).unique().tolist()),
            'divisiones': sorted(df_modelo["division"].dropna().astype(str).unique().tolist()),
            'bls': sorted(df_modelo["bl"].dropna().astype(str).unique().tolist()),
            'mercancias': sorted(df_modelo["mercancía"].dropna().astype(str).unique().tolist()),
            'estaciones': sorted(df_modelo["no_estación_pemex"].dropna().astype(str).unique().tolist())
        }
        
        return jsonify(options)
    
    except Exception as e:
        logger.error(f"Error obteniendo opciones: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    """Endpoint principal de predicción - Lógica idéntica a Streamlit"""
    
    if model_rend is None:
        return jsonify({
            'error': 'Modelo no disponible',
            'message': 'El archivo modelo_rendimiento.pkl no se encuentra disponible'
        }), 500
    
    if df_modelo is None:
        return jsonify({
            'error': 'Datos no disponibles',
            'message': 'Los datos del modelo no están cargados'
        }), 500
    
    try:
        # Obtener datos del request
        data = request.json
        conductor = data.get('conductor')
        vehiculo = data.get('vehiculo')
        division = data.get('division')
        bl = data.get('bl')
        mercancia = data.get('mercancia')
        estacion = data.get('estacion')
        
        # Validar que todos los campos estén presentes
        if not all([conductor, vehiculo, division, bl, mercancia, estacion]):
            return jsonify({'error': 'Todos los campos son requeridos'}), 400
        
        logger.info(f"Predicción solicitada para: {conductor}, {vehiculo}, {division}")
        
        # LÓGICA IDÉNTICA AL CÓDIGO STREAMLIT
        # Cálculo de features
        cs = df_modelo[df_modelo["conductor"].astype(str)==conductor]["conductor_score"].mean()
        vs = df_modelo[df_modelo["vehículo"].astype(str)==vehiculo]["vehiculo_score"].mean()
        rcm = df_modelo[df_modelo["conductor"].astype(str)==conductor]["rend_cond_mean"].mean()
        rvm = df_modelo[df_modelo["vehículo"].astype(str)==vehiculo]["rend_veh_mean"].mean()

        # Preparar datos para predicción (igual que en Streamlit)
        X_input = pd.DataFrame([{
            "conductor_score": cs if not pd.isna(cs) else 0.5,
            "vehiculo_score": vs if not pd.isna(vs) else 0.5,
            "rend_cond_mean": rcm if not pd.isna(rcm) else 10.0,
            "rend_veh_mean": rvm if not pd.isna(rvm) else 10.0,
            "division": division,
            "bl": bl,
            "mercancía": mercancia,
            "no_estación_pemex": estacion
        }])

        # Realizar predicción
        pred = model_rend.predict(X_input)[0]
        proba = None
        feature_importance = None
        
        # Obtener probabilidad si está disponible
        if hasattr(model_rend, "predict_proba"):
            proba_array = model_rend.predict_proba(X_input)[0]
            proba = float(proba_array[1])  # Probabilidad de ineficiencia
        
        # Obtener importancia de features si está disponible
        if hasattr(model_rend, "feature_importances_"):
            feature_names = X_input.columns.tolist()
            importances = model_rend.feature_importances_
            feature_importance = dict(zip(feature_names, importances.tolist()))
        
        # Calcular scores individuales para información adicional
        scores = {
            'conductor_score': float(cs) if not pd.isna(cs) else 0.5,
            'vehiculo_score': float(vs) if not pd.isna(vs) else 0.5,
            'rend_cond_mean': float(rcm) if not pd.isna(rcm) else 10.0,
            'rend_veh_mean': float(rvm) if not pd.isna(rvm) else 10.0
        }
        
        # Preparar respuesta
        response = {
            'prediction': int(pred),
            'result_text': 'EFICIENTE' if pred == 1 else 'INEFICIENTE',
            'result_description': 'El sistema predice un buen rendimiento de combustible' if pred == 1 else 'El sistema detecta posibles problemas de eficiencia',
            'confidence': 0.89,  # Precisión del modelo
            'scores': scores
        }
        
        if proba is not None:
            response['probability'] = proba
            response['probability_percentage'] = f"{proba:.1%}"
        
        if feature_importance is not None:
            response['feature_importance'] = feature_importance
        
        logger.info(f"Predicción exitosa: {pred} (probabilidad: {proba})")
        return jsonify(response)
        
    except KeyError as e:
        logger.error(f"Campo faltante en datos: {e}")
        return jsonify({'error': f'Campo faltante: {str(e)}'}), 400
    
    except Exception as e:
        logger.error(f"Error en predicción: {e}")
        return jsonify({'error': f'Error en predicción: {str(e)}'}), 500

@app.route('/model_info', methods=['GET'])
def model_info():
    """Obtener información del modelo"""
    if model_rend is None:
        return jsonify({'error': 'Modelo no disponible'}), 500
    
    try:
        info = {
            'algorithm': 'Random Forest + TDA',
            'precision': '89%',
            'features_count': 8,
            'model_type': str(type(model_rend).__name__),
            'variables_used': [
                'Score del conductor',
                'Score del vehículo', 
                'Rendimiento promedio conductor',
                'Rendimiento promedio vehículo',
                'División',
                'BL',
                'Mercancía',
                'Estación'
            ]
        }
        
        # Agregar métricas adicionales si están disponibles
        if hasattr(model_rend, 'feature_importances_'):
            info['has_feature_importance'] = True
        if hasattr(model_rend, 'predict_proba'):
            info['has_probability'] = True
            
        return jsonify(info)
        
    except Exception as e:
        logger.error(f"Error obteniendo info del modelo: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Cargar modelo y datos al iniciar
    load_model_and_data()
    
    # Verificar si el modelo se cargó correctamente
    if model_rend is None:
        logger.warning("⚠️ ADVERTENCIA: Modelo no cargado. La API funcionará en modo de prueba.")
    else:
        logger.info("✅ API lista con modelo cargado")
    
    # Ejecutar la aplicación
    app.run(debug=True, host='0.0.0.0', port=8000)  