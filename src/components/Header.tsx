import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import type { Language } from '../App';

interface HeaderProps {
  language: Language;
}

export default function Header({ language }: HeaderProps) {
  const t = {
    subtitle: {
      es: 'Optimizacion energetica mediante analisis topologico avanzado',
      en: 'Energy optimization through advanced topological analysis'
    },
    tagline: {
      es: 'Reduciendo emisiones - Optimizando costos - Impulsando la innovacion',
      en: 'Reducing emissions - Optimizing costs - Driving innovation'
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
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

      <div className="relative z-10 text-center py-16 px-8 text-white">
        <motion.div
          className="flex justify-center mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Zap className="w-16 h-16 text-white" />
        </motion.div>

        <motion.h1
          className="text-4xl lg:text-5xl font-black mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          SLB Energy Analytics
        </motion.h1>

        <motion.p
          className="text-xl lg:text-2xl font-medium mb-6 opacity-95 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t.subtitle[language]}
        </motion.p>

        <motion.div
          className="text-lg opacity-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t.tagline[language]}
        </motion.div>
      </div>
    </motion.div>
  );
}
