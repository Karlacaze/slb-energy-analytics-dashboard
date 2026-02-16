import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Map, Search, Info, BarChart3 } from 'lucide-react';
import ContentCard from '../components/ContentCard';
import type { Language } from '../App';

interface MappingPageProps {
  language: Language;
}

export default function MappingPage({ language }: MappingPageProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const mapperHtmlPath = '/mapper_output_bueno.html';

  useEffect(() => {
    const loadMapperContent = async () => {
      try {
        await fetch('/mapper_output_bueno.html');
      } catch (error) {
        console.error('Error loading mapper:', error);
      }
    };

    // loadMapperContent();
    void loadMapperContent;
  }, []);

  const t = {
    title: language === 'en' ? 'Topological Analysis (TDA)' : 'Analisis Topologico (TDA)',
    subtitle: language === 'en' ? 'Visualization of complex patterns through Mapper' : 'Visualizacion de patrones complejos mediante Mapper',
    intro:
      language === 'en'
        ? 'Topological data analysis (TDA) lets us identify the shape of fuel consumption data, revealing structures that are not visible with traditional methods. The interactive map shows nodes grouped by topological similarity, where highlighted nodes represent low-performance areas detected by our algorithm.'
        : 'El analisis topologico de datos (TDA) permite identificar la forma de los datos de consumo de combustible, revelando estructuras que no son evidentes con metodos tradicionales. El mapa interactivo muestra nodos agrupados por similitudes topologicas, donde los nodos resaltados representan areas de bajo rendimiento detectadas por nuestro algoritmo.',
    mapTitle: language === 'en' ? 'Interactive Topological Map' : 'Mapa Topologico Interactivo',
    mapGuide: language === 'en' ? 'Map Guide' : 'Guia del Mapa',
    highNodes: language === 'en' ? 'High-performance nodes' : 'Nodos de alto rendimiento',
    midNodes: language === 'en' ? 'Medium-performance nodes' : 'Nodos de rendimiento medio',
    lowNodes: language === 'en' ? 'Low-performance nodes' : 'Nodos de bajo rendimiento',
    interpretation: language === 'en' ? 'Interpretation' : 'Interpretacion',
    interpretationText:
      language === 'en'
        ? 'Connected nodes indicate topological similarity. Dense groups reveal specific consumption patterns that can be optimized.'
        : 'Los nodos conectados indican similitudes topologicas. Las agrupaciones densas revelan patrones especificos de consumo que pueden optimizarse.',
    statsTitle: language === 'en' ? 'TDA Statistics' : 'Estadisticas TDA',
    totalNodes: language === 'en' ? 'Total Nodes' : 'Nodos Totales',
    connections: language === 'en' ? 'Connections' : 'Conexiones',
    components: language === 'en' ? 'Components' : 'Componentes',
    lowPerformance: language === 'en' ? 'Low Performance' : 'Bajo Rendimiento',
    nodes: language === 'en' ? 'nodes' : 'nodos',
    methodology: language === 'en' ? 'TDA Methodology' : 'Metodologia TDA',
    m1:
      language === 'en'
        ? '1. Filtering: Apply a distance function to build simplicial complexes.'
        : '1. Filtracion: Aplicacion de funcion de distancia para crear complejos simpliciales.',
    m2:
      language === 'en'
        ? '2. Mapper: Build a connectivity graph based on overlapping clusters.'
        : '2. Mapper: Construccion de grafo de conectividad basado en overlapping clusters.',
    m3:
      language === 'en'
        ? '3. Analysis: Identify persistent components and topological features.'
        : '3. Analisis: Identificacion de componentes persistentes y caracteristicas topologicas.'
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <ContentCard icon={Map} title={t.title} subtitle={t.subtitle}>
        <div className="mb-6">
          <p className="text-slate-600 leading-relaxed">{t.intro}</p>
        </div>
      </ContentCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div className="bg-white border border-slate-200 rounded-2xl overflow-hidden h-[600px]" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <iframe
              ref={iframeRef}
              src={mapperHtmlPath}
              className="w-full h-full border-0"
              title={t.mapTitle}
              onLoad={() => console.log('Mapper loaded')}
              onError={() => console.error('Error loading mapper')}
            />
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div className="bg-white border border-slate-200 rounded-2xl p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="flex items-center space-x-2 mb-6">
              <Search className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900">{t.mapGuide}</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3"><div className="w-5 h-5 bg-green-500 rounded-full"></div><span className="text-sm text-slate-700">{t.highNodes}</span></div>
              <div className="flex items-center space-x-3"><div className="w-5 h-5 bg-yellow-500 rounded-full"></div><span className="text-sm text-slate-700">{t.midNodes}</span></div>
              <div className="flex items-center space-x-3"><div className="w-5 h-5 bg-red-500 rounded-full"></div><span className="text-sm text-slate-700">{t.lowNodes}</span></div>
            </div>

            <div className="border-t border-slate-100 pt-4 mt-6">
              <div className="flex items-center space-x-2 mb-3">
                <Info className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-slate-900">{t.interpretation}</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{t.interpretationText}</p>
            </div>
          </motion.div>

          <motion.div className="bg-white border border-slate-200 rounded-2xl p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <div className="flex items-center space-x-2 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900">{t.statsTitle}</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-100"><span className="text-sm text-slate-600">{t.totalNodes}</span><span className="font-semibold text-slate-900">47</span></div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100"><span className="text-sm text-slate-600">{t.connections}</span><span className="font-semibold text-slate-900">128</span></div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100"><span className="text-sm text-slate-600">{t.components}</span><span className="font-semibold text-slate-900">3</span></div>
              <div className="flex justify-between items-center py-2"><span className="text-sm text-slate-600">{t.lowPerformance}</span><span className="font-semibold text-red-600">12 {t.nodes}</span></div>
            </div>
          </motion.div>

          <motion.div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <h3 className="text-lg font-bold text-slate-900 mb-4">{t.methodology}</h3>
            <div className="space-y-3 text-sm text-slate-700">
              <div>{t.m1}</div>
              <div>{t.m2}</div>
              <div>{t.m3}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
