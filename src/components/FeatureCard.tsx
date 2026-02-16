import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}: FeatureCardProps) {
  return (
    <motion.div
      className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />
      
      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-white" />
      </div>
      
      <h4 className="text-xl font-bold text-slate-900 mb-3">{title}</h4>
      
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}