import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Leaf, Database, Settings, BarChart3, Map, Brain, TrendingUp, CheckCircle } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import MetricCard from '../components/MetricCard';
import type { Language } from '../App';

interface IntroductionPageProps {
  language: Language;
}

export default function IntroductionPage({ language }: IntroductionPageProps) {
  const t = {
    hero: {
      subtitle: {
        es: 'Plataforma de analisis topologico para la optimizacion energetica y sostenibilidad operativa',
        en: 'Topological analytics platform for energy optimization and operational sustainability'
      },
      tagline: {
        es: 'Reduciendo emisiones - Optimizando costos - Impulsando la innovacion',
        en: 'Reducing emissions - Optimizing costs - Driving innovation'
      }
    },
    metrics: {
      analyzed: { label: { es: 'Registros Analizados', en: 'Records Analyzed' }, change: { es: '3 anos de datos', en: '3 years of data' } },
      precision: { label: { es: 'Precision del Modelo', en: 'Model Accuracy' }, change: { es: 'ML + TDA', en: 'ML + TDA' } },
      co2: { label: { es: 'Reduccion CO2', en: 'CO2 Reduction' }, change: { es: 'Objetivo estimado', en: 'Estimated target' } },
      recall: { label: { es: 'Recall Deteccion', en: 'Detection Recall' }, change: { es: 'Casos ineficiencia', en: 'Inefficiency cases' } }
    },
    techObjectivesTitle: { es: 'Objetivos Tecnicos', en: 'Technical Objectives' },
    sustainabilityTitle: { es: 'Objetivos de Sostenibilidad', en: 'Sustainability Objectives' },
    techObjectives: {
      es: [
        'Detectar patrones ineficientes por estacion y vehiculo',
        'Predecir consumo futuro con datos historicos',
        'Implementar analisis topologico mediante TDA',
        'Visualizar grupos de bajo rendimiento'
      ],
      en: [
        'Detect inefficient patterns by station and vehicle',
        'Predict future consumption using historical data',
        'Implement topological analysis using TDA',
        'Visualize low-performance groups'
      ]
    },
    sustainabilityObjectives: {
      es: [
        'Reducir emisiones de CO2 en un 15%',
        'Optimizar rutas y frecuencias de carga',
        'Mejorar eficiencia operativa general',
        'Contribuir a la transicion energetica'
      ],
      en: [
        'Reduce CO2 emissions by 15%',
        'Optimize routes and fueling frequency',
        'Improve overall operational efficiency',
        'Contribute to the energy transition'
      ]
    },
    mainDataTitle: { es: 'Datos Principales', en: 'Main Data' },
    extraDataTitle: { es: 'Datos Complementarios', en: 'Complementary Data' },
    mainDataRows: {
      es: [
        ['Periodo:', '2021-2024 (3 anos completos)'],
        ['Registros:', '120,000+ transacciones'],
        ['Vehiculos:', 'Datos de carga por unidad'],
        ['Estaciones:', 'Registros por zona geografica']
      ],
      en: [
        ['Period:', '2021-2024 (3 full years)'],
        ['Records:', '120,000+ transactions'],
        ['Vehicles:', 'Load data per unit'],
        ['Stations:', 'Records by geographic area']
      ]
    },
    extraDataRows: {
      es: [
        ['Edenred:', 'Registros de pagos electronicos'],
        ['Tecnicos:', 'Variables de vehiculos'],
        ['Operativos:', 'Pressure, peso, rendimiento'],
        ['Geograficos:', 'Ubicacion y rutas']
      ],
      en: [
        ['Edenred:', 'Electronic payment records'],
        ['Technical:', 'Vehicle variables'],
        ['Operational:', 'Pressure, weight, efficiency'],
        ['Geographic:', 'Location and routes']
      ]
    },
    features: {
      advanced: {
        title: { es: 'Analisis Avanzado', en: 'Advanced Analytics' },
        desc: {
          es: 'Procesamiento de grandes volumenes de datos con machine learning para identificar patrones de consumo.',
          en: 'Large-scale data processing with machine learning to identify consumption patterns.'
        }
      },
      mapping: {
        title: { es: 'Mapeo Topologico', en: 'Topological Mapping' },
        desc: {
          es: 'Visualizacion de estructuras complejas mediante analisis topologico de datos (TDA).',
          en: 'Visualization of complex structures through topological data analysis (TDA).'
        }
      },
      prediction: {
        title: { es: 'Prediccion Inteligente', en: 'Smart Prediction' },
        desc: {
          es: 'Modelos predictivos con 89% de precision para anticipar problemas de eficiencia energetica.',
          en: 'Predictive models with 89% accuracy to anticipate energy efficiency issues.'
        }
      }
    }
  };

  return (
    <div className="min-h-screen">
      <motion.div
        className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
            }}
          />
        </div>

        <div className="relative z-10 text-center py-20 px-8 text-white">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Zap className="w-20 h-20 text-white" />
          </motion.div>

          <motion.h1
            className="text-5xl lg:text-7xl font-black mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            SLB Energy Analytics
          </motion.h1>

          <motion.p
            className="text-2xl lg:text-3xl font-medium mb-8 opacity-95 max-w-5xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t.hero.subtitle[language]}
          </motion.p>

          <motion.div
            className="text-xl opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {t.hero.tagline[language]}
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <MetricCard icon={Database} value="120K+" label={t.metrics.analyzed.label[language]} change={t.metrics.analyzed.change[language]} changeType="neutral" delay={0.1} />
          <MetricCard icon={TrendingUp} value="89%" label={t.metrics.precision.label[language]} change={t.metrics.precision.change[language]} changeType="positive" delay={0.2} />
          <MetricCard icon={Leaf} value="15%" label={t.metrics.co2.label[language]} change={t.metrics.co2.change[language]} changeType="positive" delay={0.3} />
          <MetricCard icon={Target} value="76%" label={t.metrics.recall.label[language]} change={t.metrics.recall.change[language]} changeType="positive" delay={0.4} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div className="bg-white border border-slate-200 rounded-2xl p-8" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-slate-900">{t.techObjectivesTitle[language]}</h3>
            </div>
            <div className="space-y-4">
              {t.techObjectives[language].map((objective, index) => (
                <motion.div key={index} className="flex items-center space-x-3 py-3 border-b border-slate-100 last:border-b-0" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}>
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-slate-700">{objective}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="bg-white border border-slate-200 rounded-2xl p-8" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
            <div className="flex items-center space-x-3 mb-6">
              <Leaf className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-slate-900">{t.sustainabilityTitle[language]}</h3>
            </div>
            <div className="space-y-4">
              {t.sustainabilityObjectives[language].map((objective, index) => (
                <motion.div key={index} className="flex items-center space-x-3 py-3 border-b border-slate-100 last:border-b-0" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}>
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">{objective}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
            <div className="flex items-center space-x-3 mb-6">
              <Database className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-bold">{t.mainDataTitle[language]}</h3>
            </div>
            <div className="space-y-4">
              {t.mainDataRows[language].map(([key, value], idx) => (
                <div key={key} className={`flex justify-between items-center py-3 ${idx < t.mainDataRows[language].length - 1 ? 'border-b border-blue-400/30' : ''}`}>
                  <span className="font-medium">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-bold">{t.extraDataTitle[language]}</h3>
            </div>
            <div className="space-y-4">
              {t.extraDataRows[language].map(([key, value], idx) => (
                <div key={key} className={`flex justify-between items-center py-3 ${idx < t.extraDataRows[language].length - 1 ? 'border-b border-cyan-400/30' : ''}`}>
                  <span className="font-medium">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard icon={BarChart3} title={t.features.advanced.title[language]} description={t.features.advanced.desc[language]} delay={0.9} />
          <FeatureCard icon={Map} title={t.features.mapping.title[language]} description={t.features.mapping.desc[language]} delay={1.0} />
          <FeatureCard icon={Brain} title={t.features.prediction.title[language]} description={t.features.prediction.desc[language]} delay={1.1} />
        </div>
      </div>
    </div>
  );
}
