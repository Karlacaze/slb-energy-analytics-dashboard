# SLB Energy Analytics

Plataforma web para analisis de eficiencia de combustible con enfoque en sostenibilidad, analitica visual, mapeo topologico (TDA) y prediccion con Machine Learning.

## Que incluye el proyecto
- Frontend en `React + TypeScript + Vite`.
- Backend API en `Flask` para servir opciones y predicciones.
- Modelo entrenado (`Random Forest + TDA`) cargado desde archivo `.pkl`.
- Visualizaciones interactivas con `Recharts`.
- Selector de idioma global: Espanol e Ingles.

## Funcionalidades principales
- Introduccion del proyecto, objetivos tecnicos y de sostenibilidad.
- Analisis de datos:
  - Distribucion de rendimiento (histograma por rangos).
  - Tendencia mensual de eficiencia.
  - Conductores criticos y vehiculos problematicos.
- Mapeo topologico (TDA) con iframe a `public/mapper_output_bueno.html`.
- Prediccion de eficiencia por parametros operativos (con API Flask).
- Dashboard ejecutivo con KPIs, tendencias y alertas.

## Estructura del repositorio
```text
PROYECT/
  src/
    components/
    pages/
    App.tsx
  public/
    mapper_output_bueno.html
  backend/
    appi.py
    requirements.txt
    modelo_rendimiento.pkl
    df_modelo.csv
  docs/
    Reto_Topologia_Final.pdf
```

## Requisitos
- Node.js 18+ (recomendado 20+)
- npm
- Python 3.10+
- pip

## Instalacion y ejecucion
### 1) Frontend
Desde la raiz del proyecto:
```bash
npm install
npm run dev
```
Frontend disponible en: `http://localhost:5173`

### 2) Backend
En otra terminal:
```bash
cd backend
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
python appi.py
```
Backend disponible en: `http://localhost:8000`

## Endpoints API
Base URL: `http://localhost:8000`

- `GET /health`
  - Estado general, si modelo y datos estan cargados.
- `GET /get_options`
  - Opciones para dropdowns (conductores, vehiculos, division, BL, mercancia, estacion).
- `POST /predict`
  - Recibe:
    - `conductor`
    - `vehiculo`
    - `division`
    - `bl`
    - `mercancia`
    - `estacion`
  - Devuelve prediccion (`EFICIENTE` o `INEFICIENTE`), probabilidad y scores.
- `GET /model_info`
  - Metadata del modelo y variables usadas.

## Configuracion de modelo y datos
El backend espera estos archivos dentro de `backend/`:
- `modelo_rendimiento.pkl`
- `df_modelo.csv`

Si cambias nombres o rutas, ajusta `backend/appi.py` en `load_model_and_data()`.

## Idioma (ES/EN)
La app tiene selector de idioma en la barra lateral.
El idioma se propaga a todas las paginas principales:
- Introduccion
- Analisis
- Mapeo
- Prediccion
- Dashboard
- Header y Footer

## PDF del reto
Si, **si se puede agregar un PDF en GitHub**, pero no reemplaza al `README.md` principal.

Forma recomendada:
1. Guardar el PDF dentro del repo (ej. `docs/Reto_Topologia_Final.pdf`).
2. Enlazarlo desde el README.

En este repo quedo enlazado aqui:
- [Ver documento del reto (PDF)](docs/Reto_Topologia_Final.pdf)

## Scripts disponibles (frontend)
- `npm run dev`: desarrollo local
- `npm run build`: build de produccion
- `npm run preview`: previsualizar build
- `npm run lint`: revisar lint

## Notas
- La API Flask corre en `0.0.0.0:8000` con `debug=True` en desarrollo.
- La carpeta `backend/.venv` no deberia subirse a Git.
- Si usas este proyecto en produccion, mueve secretos y configuraciones a variables de entorno.

## Autor
Proyecto desarrollado para analisis de eficiencia energetica y deteccion de bajo rendimiento con apoyo de TDA + ML.
