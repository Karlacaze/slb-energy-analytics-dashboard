import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Rocket, AlertTriangle, Info, TrendingUp, Server } from 'lucide-react';
import ContentCard from '../components/ContentCard';
import type { Language } from '../App';

interface PredictionPageProps {
  language?: Language;
}

export default function PredictionPage({ language = 'es' }: PredictionPageProps) {
  const t = {
    title: language === 'en' ? 'Efficiency Prediction System' : 'Sistema de Prediccion de Eficiencia',
    subtitle:
      language === 'en'
        ? 'Machine Learning model to evaluate fuel efficiency'
        : 'Modelo de Machine Learning para evaluar rendimiento de combustible',
    intro:
      language === 'en'
        ? 'Use our trained model to predict fuel efficiency based on operational parameters. The model combines topological analysis with machine learning to achieve 89% accuracy.'
        : 'Utiliza nuestro modelo entrenado para predecir la eficiencia de combustible con base en parametros operativos. El modelo combina analisis topologico y machine learning para lograr 89% de precision.',
    connected: language === 'en' ? 'Connected' : 'Conectado',
    disconnected: language === 'en' ? 'Disconnected' : 'Desconectado',
    connecting: language === 'en' ? 'Connecting...' : 'Conectando...',
    inputParams: language === 'en' ? 'Input Parameters' : 'Parametros de Entrada',
    selectDriver: language === 'en' ? 'Select driver' : 'Seleccionar conductor',
    selectVehicle: language === 'en' ? 'Select vehicle' : 'Seleccionar vehiculo',
    selectDivision: language === 'en' ? 'Select division' : 'Seleccionar division',
    selectBL: language === 'en' ? 'Select BL' : 'Seleccionar BL',
    selectCargo: language === 'en' ? 'Select cargo' : 'Seleccionar mercancia',
    selectStation: language === 'en' ? 'Select station' : 'Seleccionar estacion',
    labelDriver: language === 'en' ? 'Driver' : 'Conductor',
    labelVehicle: language === 'en' ? 'Vehicle' : 'Vehiculo',
    labelDivision: language === 'en' ? 'Division' : 'Division',
    labelCargo: language === 'en' ? 'Cargo' : 'Mercancia',
    labelStation: language === 'en' ? 'Station' : 'Estacion',
    connectionError: language === 'en' ? 'Connection error:' : 'Error de conexion:',
    tempSimulation: language === 'en' ? 'Using temporary simulation...' : 'Usando simulacion temporal...',
    calculating: language === 'en' ? 'Calculating...' : 'Calculando...',
    predictApi: language === 'en' ? 'Predict with API' : 'Predecir con API',
    openStreamlit: language === 'en' ? 'Open Streamlit' : 'Abrir Streamlit',
    efficient: language === 'en' ? 'EFFICIENT' : 'EFICIENTE',
    inefficient: language === 'en' ? 'INEFFICIENT' : 'INEFICIENTE',
    efficientDesc:
      language === 'en'
        ? 'The system predicts good fuel efficiency.'
        : 'El sistema predice un buen rendimiento de combustible.',
    inefficientDesc:
      language === 'en'
        ? 'The system detects possible efficiency issues.'
        : 'El sistema detecta posibles problemas de eficiencia.',
    ineffProbability: language === 'en' ? 'Inefficiency Probability' : 'Probabilidad de Ineficiencia',
    modelConfidence: language === 'en' ? 'Model Confidence' : 'Confianza del Modelo',
    driverScore: language === 'en' ? 'Driver Score' : 'Score Conductor',
    vehicleScore: language === 'en' ? 'Vehicle Score' : 'Score Vehiculo',
    driverPerf: language === 'en' ? 'Driver Avg. Efficiency' : 'Rend. Conductor',
    vehiclePerf: language === 'en' ? 'Vehicle Avg. Efficiency' : 'Rend. Vehiculo',
    featureImportance: language === 'en' ? 'Feature Importance' : 'Importancia de Variables',
    recommendations: language === 'en' ? 'Recommendations to Improve Efficiency' : 'Recomendaciones para Mejorar la Eficiencia',
    rec1Title: language === 'en' ? 'Vehicle Review' : 'Revision del Vehiculo',
    rec1Text: language === 'en' ? 'Check maintenance and technical status.' : 'Verificar mantenimiento y estado tecnico.',
    rec2Title: language === 'en' ? 'Training' : 'Capacitacion',
    rec2Text: language === 'en' ? 'Provide efficient driving training.' : 'Entrenamiento en conduccion eficiente.',
    rec3Title: language === 'en' ? 'Route Optimization' : 'Optimizacion de Rutas',
    rec3Text: language === 'en' ? 'Review consumption patterns by route.' : 'Revisar patrones de consumo por ruta.',
    modelInfo: language === 'en' ? 'Model Information' : 'Informacion del Modelo',
    precision: language === 'en' ? 'Accuracy' : 'Precision',
    algorithm: language === 'en' ? 'Algorithm' : 'Algoritmo',
    features: language === 'en' ? 'Features' : 'Features',
    varsUsed: language === 'en' ? 'Variables used:' : 'Variables utilizadas:',
    avgPerformance: language === 'en' ? 'Average performance' : 'Rendimiento promedio',
    operationalData: language === 'en' ? 'Operational data' : 'Datos operativos',
    modelPerformance: language === 'en' ? 'Model Performance' : 'Rendimiento del Modelo',
    recall: language === 'en' ? 'Recall' : 'Recall'
  };

  const [dropdownOptions, setDropdownOptions] = useState({
    conductores: [] as string[],
    vehiculos: [] as string[],
    divisiones: [] as string[],
    bls: [] as string[],
    mercancias: [] as string[],
    estaciones: [] as string[]
  });

  const [formData, setFormData] = useState({
    conductor: '',
    vehiculo: '',
    division: '',
    bl: '',
    mercancia: '',
    estacion: ''
  });

  const [prediction, setPrediction] = useState<{
    result: number;
    result_text?: string;
    result_description?: string;
    probability?: number;
    probability_percentage?: string;
    confidence?: number;
    feature_importance?: Record<string, number>;
    scores?: Record<string, number>;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');

  useEffect(() => {
    void loadDropdownOptions();
    void checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const response = await fetch('http://localhost:8000/health');
      const health = await response.json();
      setApiStatus(health.model_loaded ? 'connected' : 'error');
    } catch {
      setApiStatus('error');
    }
  };

  const loadDropdownOptions = async () => {
    try {
      const response = await fetch('http://localhost:8000/get_options');
      if (response.ok) {
        const options = await response.json();
        setDropdownOptions(options);
      }
    } catch (err) {
      console.error('Error loading options:', err);
      setDropdownOptions({
        conductores: ['Juan Perez', 'Ana Garcia', 'Carlos Lopez'],
        vehiculos: ['VEH001', 'VEH002', 'VEH003'],
        divisiones: ['Norte', 'Sur', 'Centro'],
        bls: ['BL001', 'BL002', 'BL003'],
        mercancias: ['Petroleo', 'Gas', 'Quimicos'],
        estaciones: ['EST001', 'EST002', 'EST003']
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePredictAPI = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setPrediction({
        result: data.prediction,
        result_text: data.result_text,
        result_description: data.result_description,
        probability: data.probability,
        probability_percentage: data.probability_percentage,
        confidence: data.confidence,
        feature_importance: data.feature_importance,
        scores: data.scores
      });
    } catch (err) {
      console.error('Error calling prediction API:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePredictStreamlit = () => {
    const params = new URLSearchParams(formData);
    window.open(`http://localhost:8501?${params.toString()}`, '_blank');
  };

  const handlePredict = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await handlePredictAPI();
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const efficiency = Math.random();
      const result = efficiency > 0.6 ? 1 : 0;
      const probability = efficiency;
      const confidence = 0.85 + Math.random() * 0.1;

      setPrediction({
        result,
        probability,
        confidence,
        feature_importance: {
          conductor_score: Math.random() * 0.3,
          vehiculo_score: Math.random() * 0.25,
          division_performance: Math.random() * 0.2,
          mercancia_type: Math.random() * 0.15,
          estacion_efficiency: Math.random() * 0.1
        }
      });
      setIsLoading(false);
    }
  };

  const isFormValid = Object.values(formData).every((value) => value !== '');
  const apiStatusLabel = apiStatus === 'connected' ? t.connected : apiStatus === 'error' ? t.disconnected : t.connecting;

  const resultTitle = prediction?.result === 1 ? t.efficient : t.inefficient;
  const resultDescription = prediction?.result === 1 ? t.efficientDesc : t.inefficientDesc;

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <ContentCard icon={Brain} title={t.title} subtitle={t.subtitle}>
        <div className="flex items-center justify-between gap-4">
          <p className="text-slate-600 leading-relaxed">{t.intro}</p>
          <div
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
              apiStatus === 'connected' ? 'bg-green-100 text-green-700' : apiStatus === 'error' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            <Server className="w-4 h-4" />
            <span className="text-sm">API: {apiStatusLabel}</span>
          </div>
        </div>
      </ContentCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div className="bg-white border border-slate-200 rounded-2xl p-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{t.inputParams}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelDriver}</label>
                <select value={formData.conductor} onChange={(e) => handleInputChange('conductor', e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <option value="">{t.selectDriver}</option>
                  {dropdownOptions.conductores.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelVehicle}</label>
                <select value={formData.vehiculo} onChange={(e) => handleInputChange('vehiculo', e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <option value="">{t.selectVehicle}</option>
                  {dropdownOptions.vehiculos.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelDivision}</label>
                <select value={formData.division} onChange={(e) => handleInputChange('division', e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <option value="">{t.selectDivision}</option>
                  {dropdownOptions.divisiones.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">BL</label>
                <select value={formData.bl} onChange={(e) => handleInputChange('bl', e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <option value="">{t.selectBL}</option>
                  {dropdownOptions.bls.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelCargo}</label>
                <select value={formData.mercancia} onChange={(e) => handleInputChange('mercancia', e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <option value="">{t.selectCargo}</option>
                  {dropdownOptions.mercancias.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.labelStation}</label>
                <select value={formData.estacion} onChange={(e) => handleInputChange('estacion', e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <option value="">{t.selectStation}</option>
                  {dropdownOptions.estaciones.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700 font-medium">{t.connectionError}</span>
                </div>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <p className="text-red-500 text-xs mt-2">{t.tempSimulation}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <motion.button
                onClick={handlePredict}
                disabled={!isFormValid || isLoading}
                className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  isFormValid && !isLoading ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:-translate-y-1' : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
                whileHover={isFormValid && !isLoading ? { scale: 1.05 } : {}}
                whileTap={isFormValid && !isLoading ? { scale: 0.95 } : {}}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.calculating}</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5" />
                    <span>{t.predictApi}</span>
                  </>
                )}
              </motion.button>

              <button
                onClick={handlePredictStreamlit}
                disabled={!isFormValid}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium border-2 transition-all duration-200 ${
                  isFormValid ? 'border-blue-600 text-blue-600 hover:bg-blue-50' : 'border-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Server className="w-4 h-4" />
                <span>{t.openStreamlit}</span>
              </button>
            </div>
          </motion.div>

          {prediction && (
            <motion.div
              className={`mt-8 rounded-2xl p-8 text-center text-white ${prediction.result === 1 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">{prediction.result === 1 ? '?' : '?'}</div>
              <h2 className="text-4xl font-bold mb-4">{resultTitle}</h2>
              <p className="text-xl mb-6">{resultDescription}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                {prediction.probability !== undefined && (
                  <div className="bg-white/20 rounded-xl p-4">
                    <strong>{t.ineffProbability}:</strong>
                    <br />
                    {prediction.probability_percentage || `${(prediction.probability * 100).toFixed(1)}%`}
                  </div>
                )}
                {prediction.confidence !== undefined && (
                  <div className="bg-white/20 rounded-xl p-4">
                    <strong>{t.modelConfidence}:</strong>
                    <br />
                    {(prediction.confidence * 100).toFixed(1)}%
                  </div>
                )}
              </div>

              {prediction.scores && (
                <div className="mt-6 grid grid-cols-2 gap-3 max-w-lg mx-auto text-sm">
                  <div className="bg-white/20 rounded-lg p-3"><strong>{t.driverScore}:</strong><br />{(prediction.scores.conductor_score ?? 0).toFixed(2)}</div>
                  <div className="bg-white/20 rounded-lg p-3"><strong>{t.vehicleScore}:</strong><br />{(prediction.scores.vehiculo_score ?? 0).toFixed(2)}</div>
                  <div className="bg-white/20 rounded-lg p-3"><strong>{t.driverPerf}:</strong><br />{(prediction.scores.rend_cond_mean ?? 0).toFixed(1)} km/L</div>
                  <div className="bg-white/20 rounded-lg p-3"><strong>{t.vehiclePerf}:</strong><br />{(prediction.scores.rend_veh_mean ?? 0).toFixed(1)} km/L</div>
                </div>
              )}
            </motion.div>
          )}

          {prediction?.feature_importance && (
            <motion.div className="mt-8 bg-white border border-slate-200 rounded-2xl p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h3 className="text-xl font-bold text-slate-900 mb-6">{t.featureImportance}</h3>
              <div className="space-y-4">
                {Object.entries(prediction.feature_importance).map(([feature, importance]) => (
                  <div key={feature}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">{feature.replace('_', ' ')}</span>
                      <span>{(importance * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full transition-all duration-1000" style={{ width: `${importance * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {prediction && prediction.result === 0 && (
            <motion.div className="mt-8 bg-white border border-slate-200 rounded-2xl p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-bold text-slate-900">{t.recommendations}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-xl p-4"><h4 className="font-semibold text-slate-900 mb-2">{t.rec1Title}</h4><p className="text-sm text-slate-600">{t.rec1Text}</p></div>
                <div className="bg-slate-50 rounded-xl p-4"><h4 className="font-semibold text-slate-900 mb-2">{t.rec2Title}</h4><p className="text-sm text-slate-600">{t.rec2Text}</p></div>
                <div className="bg-slate-50 rounded-xl p-4"><h4 className="font-semibold text-slate-900 mb-2">{t.rec3Title}</h4><p className="text-sm text-slate-600">{t.rec3Text}</p></div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <motion.div className="bg-white border border-slate-200 rounded-2xl p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="flex items-center space-x-2 mb-6">
              <Info className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900">{t.modelInfo}</h3>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">{t.precision}:</span><span className="font-semibold">89%</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t.algorithm}:</span><span className="font-semibold">Random Forest + TDA</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t.features}:</span><span className="font-semibold">8 variables</span></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-3">{t.varsUsed}</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center space-x-2"><div className="w-2 h-2 bg-blue-600 rounded-full"></div><span>{t.driverScore}</span></li>
                <li className="flex items-center space-x-2"><div className="w-2 h-2 bg-blue-600 rounded-full"></div><span>{t.vehicleScore}</span></li>
                <li className="flex items-center space-x-2"><div className="w-2 h-2 bg-blue-600 rounded-full"></div><span>{t.avgPerformance}</span></li>
                <li className="flex items-center space-x-2"><div className="w-2 h-2 bg-blue-600 rounded-full"></div><span>{t.operationalData}</span></li>
              </ul>
            </div>
          </motion.div>

          <motion.div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">{t.modelPerformance}</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1"><span>{t.precision}</span><span>89%</span></div>
                <div className="w-full bg-slate-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{ width: '89%' }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1"><span>{t.recall}</span><span>76%</span></div>
                <div className="w-full bg-slate-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '76%' }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1"><span>F1-Score</span><span>82%</span></div>
                <div className="w-full bg-slate-200 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{ width: '82%' }}></div></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
