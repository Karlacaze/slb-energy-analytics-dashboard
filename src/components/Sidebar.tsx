import React from 'react';
import { motion } from 'framer-motion';
import { Home, BarChart3, Map, Brain, Activity, Lightbulb } from 'lucide-react';
import type { PageType, Language } from '../App';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const navigationItems = [
  {
    id: 'intro' as PageType,
    icon: Home,
    title: { es: 'Introduccion', en: 'Introduction' },
    desc: { es: 'Vision general del sistema', en: 'System overview' }
  },
  {
    id: 'analysis' as PageType,
    icon: BarChart3,
    title: { es: 'Analisis de Datos', en: 'Data Analysis' },
    desc: { es: 'Exploracion y estadisticas', en: 'Exploration and stats' }
  },
  {
    id: 'mapping' as PageType,
    icon: Map,
    title: { es: 'Mapeo Topologico', en: 'Topological Mapping' },
    desc: { es: 'Analisis TDA avanzado', en: 'Advanced TDA analysis' }
  },
  {
    id: 'prediction' as PageType,
    icon: Brain,
    title: { es: 'Prediccion', en: 'Prediction' },
    desc: { es: 'Machine Learning', en: 'Machine Learning' }
  },
  {
    id: 'dashboard' as PageType,
    icon: Activity,
    title: { es: 'Dashboard', en: 'Dashboard' },
    desc: { es: 'Monitoreo en tiempo real', en: 'Real-time monitoring' }
  }
];

export default function Sidebar({ currentPage, onPageChange, language, onLanguageChange }: SidebarProps) {
  const t = {
    platform: { es: 'Plataforma de Analitica Energetica', en: 'Energy Analytics Platform' },
    language: { es: 'Idioma', en: 'Language' },
    tipTitle: { es: 'Tip', en: 'Tip' },
    tipText: {
      es: 'Navega por las secciones para explorar el analisis completo de eficiencia energetica.',
      en: 'Browse sections to explore the full energy efficiency analysis.'
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white border-r border-slate-200 shadow-xl z-50 overflow-y-auto">
      <div className="p-8">
        <div className="text-center mb-8">
          <motion.div
            className="text-3xl font-black text-blue-600 mb-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            SLB
          </motion.div>
          <div className="text-sm text-slate-600 font-medium">{t.platform[language]}</div>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
            {t.language[language]}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onLanguageChange('es')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 ${
                language === 'es'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
              }`}
            >
              Espanol
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 ${
                language === 'en'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
              }`}
            >
              English
            </button>
          </div>
        </div>

        <nav className="space-y-3">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 shadow-lg'
                    : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-md hover:-translate-y-1'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start space-x-3">
                  <Icon className={`w-6 h-6 mt-1 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                  <div>
                    <div className={`font-semibold text-lg ${isActive ? 'text-white' : 'text-slate-900'}`}>
                      {item.title[language]}
                    </div>
                    <div className={`text-sm ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                      {item.desc[language]}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </nav>

        <motion.div
          className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-slate-900">{t.tipTitle[language]}</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{t.tipText[language]}</p>
        </motion.div>
      </div>
    </div>
  );
}
