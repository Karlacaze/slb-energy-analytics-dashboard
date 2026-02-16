import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ContentCardProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  delay?: number;
}

export default function ContentCard({ 
  icon: Icon, 
  title, 
  subtitle, 
  children, 
  delay = 0 
}: ContentCardProps) {
  return (
    <motion.div
      className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
          {subtitle && (
            <p className="text-slate-600 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </motion.div>
  );
}