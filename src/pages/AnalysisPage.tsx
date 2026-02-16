import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, AlertTriangle, TrendingUp, Users, Truck } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import ContentCard from '../components/ContentCard';
import MetricCard from '../components/MetricCard';
import type { Language } from '../App';

interface AnalysisPageProps {
  language: Language;
}

const performanceDataByLang = {
  es: [
    { month: 'Ene', efficiency: 11.2 },
    { month: 'Feb', efficiency: 11.8 },
    { month: 'Mar', efficiency: 12.1 },
    { month: 'Abr', efficiency: 11.9 },
    { month: 'May', efficiency: 12.4 },
    { month: 'Jun', efficiency: 12.7 },
    { month: 'Jul', efficiency: 12.3 },
    { month: 'Ago', efficiency: 12.9 },
    { month: 'Sep', efficiency: 13.1 },
    { month: 'Oct', efficiency: 12.8 },
    { month: 'Nov', efficiency: 13.2 },
    { month: 'Dic', efficiency: 13.5 }
  ],
  en: [
    { month: 'Jan', efficiency: 11.2 },
    { month: 'Feb', efficiency: 11.8 },
    { month: 'Mar', efficiency: 12.1 },
    { month: 'Apr', efficiency: 11.9 },
    { month: 'May', efficiency: 12.4 },
    { month: 'Jun', efficiency: 12.7 },
    { month: 'Jul', efficiency: 12.3 },
    { month: 'Aug', efficiency: 12.9 },
    { month: 'Sep', efficiency: 13.1 },
    { month: 'Oct', efficiency: 12.8 },
    { month: 'Nov', efficiency: 13.2 },
    { month: 'Dec', efficiency: 13.5 }
  ]
};

const distributionData = [
  { range: '8-9', frequency: 6 },
  { range: '9-10', frequency: 14 },
  { range: '10-11', frequency: 27 },
  { range: '11-12', frequency: 44 },
  { range: '12-13', frequency: 39 },
  { range: '13-14', frequency: 24 },
  { range: '14-15', frequency: 11 },
  { range: '15-16', frequency: 5 }
];

const driverDataByLang = {
  es: [
    { name: 'Conductor 1', incidents: 23 },
    { name: 'Conductor 2', incidents: 19 },
    { name: 'Conductor 3', incidents: 17 },
    { name: 'Conductor 4', incidents: 15 },
    { name: 'Conductor 5', incidents: 12 },
    { name: 'Conductor 6', incidents: 10 },
    { name: 'Conductor 7', incidents: 8 },
    { name: 'Conductor 8', incidents: 6 }
  ],
  en: [
    { name: 'Driver 1', incidents: 23 },
    { name: 'Driver 2', incidents: 19 },
    { name: 'Driver 3', incidents: 17 },
    { name: 'Driver 4', incidents: 15 },
    { name: 'Driver 5', incidents: 12 },
    { name: 'Driver 6', incidents: 10 },
    { name: 'Driver 7', incidents: 8 },
    { name: 'Driver 8', incidents: 6 }
  ]
};

const vehicleDataByLang = {
  es: [
    { name: 'Veh. 1', value: 28, color: '#EF4444' },
    { name: 'Veh. 2', value: 22, color: '#F59E0B' },
    { name: 'Veh. 3', value: 18, color: '#10B981' },
    { name: 'Veh. 4', value: 15, color: '#3B82F6' },
    { name: 'Veh. 5', value: 12, color: '#8B5CF6' },
    { name: 'Veh. 6', value: 5, color: '#06B6D4' }
  ],
  en: [
    { name: 'Veh. 1', value: 28, color: '#EF4444' },
    { name: 'Veh. 2', value: 22, color: '#F59E0B' },
    { name: 'Veh. 3', value: 18, color: '#10B981' },
    { name: 'Veh. 4', value: 15, color: '#3B82F6' },
    { name: 'Veh. 5', value: 12, color: '#8B5CF6' },
    { name: 'Veh. 6', value: 5, color: '#06B6D4' }
  ]
};

export default function AnalysisPage({ language }: AnalysisPageProps) {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = {
    general: language === 'en' ? 'General Analysis' : 'Analisis General',
    performance: language === 'en' ? 'Low Performance' : 'Bajo Rendimiento',
    statistics: language === 'en' ? 'Statistics' : 'Estadisticas'
  };

  const t = {
    generalTitle: language === 'en' ? 'General Performance Analysis' : 'Analisis General de Rendimiento',
    generalSubtitle: language === 'en' ? 'Panoramic view of fuel consumption' : 'Vision panoramica del consumo de combustible',
    distribution: language === 'en' ? 'Performance Distribution (km/L)' : 'Distribucion de Rendimiento (km/L)',
    trend: language === 'en' ? 'Performance Trend by Month' : 'Tendencia de Rendimiento por Mes',
    records: language === 'en' ? 'records' : 'registros',
    frequency: language === 'en' ? 'Frequency' : 'Frecuencia',
    lowTitle: language === 'en' ? 'Low Performance Analysis' : 'Analisis de Bajo Rendimiento',
    lowSubtitle: language === 'en' ? 'Identification of critical factors and problem patterns' : 'Identificacion de factores criticos y patrones problematicos',
    criticalDrivers: language === 'en' ? 'Critical Drivers' : 'Conductores Criticos',
    problemVehicles: language === 'en' ? 'Problem Vehicles' : 'Vehiculos Problematicos',
    incidents: language === 'en' ? 'incidents' : 'incidentes',
    total: language === 'en' ? 'Total' : 'Total',
    totalRecords: language === 'en' ? 'Total Records' : 'Total Registros',
    lowPerf: language === 'en' ? 'Low performance' : 'Bajo rendimiento',
    affectedDrivers: language === 'en' ? 'Affected Drivers' : 'Conductores Afectados',
    requiresAttention: language === 'en' ? 'Requires attention' : 'Requieren atencion',
    affectedVehicles: language === 'en' ? 'Affected Vehicles' : 'Vehiculos Afectados',
    techReview: language === 'en' ? 'Technical review' : 'Revision tecnica',
    avgIncidents: language === 'en' ? 'Avg. Incidents' : 'Promedio Incidencias',
    perDriver: language === 'en' ? 'Per driver' : 'Por conductor',
    statsTitle: language === 'en' ? 'Detailed Statistics' : 'Estadisticas Detalladas',
    statsSubtitle: language === 'en' ? 'Key metrics and system KPIs' : 'Metricas clave y KPIs del sistema',
    modelAccuracy: language === 'en' ? 'Model Accuracy' : 'Precision del Modelo',
    detectionRecall: language === 'en' ? 'Detection Recall' : 'Recall en Deteccion',
    ineffCases: language === 'en' ? 'Inefficiency cases' : 'Casos de ineficiencia',
    co2Reduction: language === 'en' ? 'CO2 Reduction' : 'Reduccion CO2',
    estimatedPotential: language === 'en' ? 'Estimated potential' : 'Potencial estimado'
  };

  const tabList = [
    { id: 'general', label: tabs.general, icon: TrendingUp },
    { id: 'performance', label: tabs.performance, icon: AlertTriangle },
    { id: 'statistics', label: tabs.statistics, icon: BarChart3 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-8">
            <ContentCard icon={TrendingUp} title={t.generalTitle} subtitle={t.generalSubtitle}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">{t.distribution}</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={distributionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="range" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        formatter={(value: number) => [`${value} ${t.records}`, t.frequency]}
                        labelFormatter={(label: string) => `${label} km/L`}
                        contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                      />
                      <Bar dataKey="frequency" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">{t.trend}</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceDataByLang[language]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                      <Line type="monotone" dataKey="efficiency" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', strokeWidth: 2, r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </ContentCard>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-8">
            <ContentCard icon={AlertTriangle} title={t.lowTitle} subtitle={t.lowSubtitle}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Users className="w-5 h-5 text-red-600" />
                    <h4 className="text-lg font-semibold text-red-600">{t.criticalDrivers}</h4>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={driverDataByLang[language]} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" stroke="#64748b" />
                      <YAxis dataKey="name" type="category" stroke="#64748b" width={80} />
                      <Tooltip
                        formatter={(value: number) => [`${value} ${t.incidents}`, t.total]}
                        contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                      />
                      <Bar dataKey="incidents" fill="#ef4444" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Truck className="w-5 h-5 text-orange-600" />
                    <h4 className="text-lg font-semibold text-orange-600">{t.problemVehicles}</h4>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={vehicleDataByLang[language]}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {vehicleDataByLang[language].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                <MetricCard icon={BarChart3} value="1,247" label={t.totalRecords} change={t.lowPerf} changeType="negative" />
                <MetricCard icon={Users} value="34" label={t.affectedDrivers} change={t.requiresAttention} changeType="neutral" />
                <MetricCard icon={Truck} value="18" label={t.affectedVehicles} change={t.techReview} changeType="neutral" />
                <MetricCard icon={TrendingUp} value="12.3" label={t.avgIncidents} change={t.perDriver} changeType="neutral" />
              </div>
            </ContentCard>
          </div>
        );

      case 'statistics':
        return (
          <div className="space-y-8">
            <ContentCard icon={BarChart3} title={t.statsTitle} subtitle={t.statsSubtitle}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8 text-center" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <div className="text-5xl mb-4">?</div>
                  <div className="text-3xl font-bold mb-2">89%</div>
                  <div className="text-xl opacity-90 mb-2">{t.modelAccuracy}</div>
                  <div className="text-sm opacity-70">Machine Learning + TDA</div>
                </motion.div>

                <motion.div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-8 text-center" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <div className="text-5xl mb-4">??</div>
                  <div className="text-3xl font-bold mb-2">76%</div>
                  <div className="text-xl opacity-90 mb-2">{t.detectionRecall}</div>
                  <div className="text-sm opacity-70">{t.ineffCases}</div>
                </motion.div>

                <motion.div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-8 text-center" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <div className="text-5xl mb-4">??</div>
                  <div className="text-3xl font-bold mb-2">15%</div>
                  <div className="text-xl opacity-90 mb-2">{t.co2Reduction}</div>
                  <div className="text-sm opacity-70">{t.estimatedPotential}</div>
                </motion.div>
              </div>
            </ContentCard>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="flex flex-wrap gap-2 mb-8 bg-slate-100 p-2 rounded-2xl">
        {tabList.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {renderTabContent()}
      </motion.div>
    </div>
  );
}
