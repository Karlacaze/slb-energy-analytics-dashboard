import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  delay?: number;
}

export default function MetricCard({ 
  icon: Icon, 
  value, 
  label, 
  change, 
  changeType = 'neutral',
  delay = 0 
}: MetricCardProps) {
  const changeColors = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-slate-600 bg-slate-50'
  };

  return (
    <motion.div
      className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-700" />
      
      <Icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
      
      <div className="text-3xl font-bold text-blue-600 mb-2 leading-none">
        {value}
      </div>
      
      <div className="text-lg font-medium text-slate-700 mb-3">
        {label}
      </div>
      
      {change && (
        <div className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${changeColors[changeType]}`}>
          {change}
        </div>
      )}
    </motion.div>
  );
}