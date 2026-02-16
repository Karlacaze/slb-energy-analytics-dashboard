import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import type { Language } from '../App';

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const t = {
    slogan: {
      es: 'Optimizacion mediante analisis topologico - Reduciendo emisiones - Impulsando la sostenibilidad',
      en: 'Optimization through topological analysis - Reducing emissions - Driving sustainability'
    },
    rights: {
      es: '© 2025 SLB - Schlumberger Limited. Todos los derechos reservados.',
      en: '© 2025 SLB - Schlumberger Limited. All rights reserved.'
    },
    stack: {
      es: 'Plataforma desarrollada con React, TypeScript, TDA y Machine Learning',
      en: 'Platform built with React, TypeScript, TDA and Machine Learning'
    }
  };

  return (
    <motion.footer
      className="bg-slate-100 mt-16 py-12 px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <Zap className="w-8 h-8 text-blue-600" />
        </div>

        <h3 className="text-2xl font-bold text-blue-600 mb-4">SLB Energy Analytics</h3>

        <p className="text-lg font-medium text-slate-700 mb-4">
          <strong>{t.slogan[language]}</strong>
        </p>

        <p className="text-slate-600 mb-4">{t.rights[language]}</p>

        <p className="text-sm text-slate-500">{t.stack[language]}</p>
      </div>
    </motion.footer>
  );
}
