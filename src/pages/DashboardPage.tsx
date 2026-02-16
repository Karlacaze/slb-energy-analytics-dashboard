import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Fuel, DollarSign, Leaf, AlertTriangle, TrendingUp, Users, Truck, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import ContentCard from '../components/ContentCard';
import MetricCard from '../components/MetricCard';
import type { Language } from '../App';

interface DashboardPageProps {
  language: Language;
}

const efficiencyTrendData = Array.from({ length: 365 }, (_, i) => ({
  date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
  efficiency: 12 + 2 * Math.sin(i * 0.02) + Math.random() * 0.6 - 0.3
}));

const divisionDataByLang = {
  es: [
    { division: 'Norte', efficiency: 23.2 },
    { division: 'Sur', efficiency: 31.1 },
    { division: 'Centro', efficiency: 19.8 },
    { division: 'Oeste', efficiency: 15.4 },
    { division: 'Este', efficiency: 12.7 }
  ],
  en: [
    { division: 'North', efficiency: 23.2 },
    { division: 'South', efficiency: 31.1 },
    { division: 'Center', efficiency: 19.8 },
    { division: 'West', efficiency: 15.4 },
    { division: 'East', efficiency: 12.7 }
  ]
};

const alertsByLang = {
  es: [
    { type: 'error', title: 'Vehiculo VEH-004', description: 'Consumo 40% superior al promedio', time: 'Hace 2 horas', icon: '??' },
    { type: 'warning', title: 'Conductor Juan Perez', description: 'Patron de conduccion ineficiente detectado', time: 'Hace 4 horas', icon: '??' },
    { type: 'success', title: 'Division Norte', description: 'Meta mensual de eficiencia alcanzada', time: 'Hace 1 dia', icon: '??' },
    { type: 'warning', title: 'Estacion EST-023', description: 'Multiples registros de bajo rendimiento', time: 'Hace 2 dias', icon: '??' }
  ],
  en: [
    { type: 'error', title: 'Vehicle VEH-004', description: 'Fuel consumption 40% above average', time: '2 hours ago', icon: '??' },
    { type: 'warning', title: 'Driver Juan Perez', description: 'Inefficient driving pattern detected', time: '4 hours ago', icon: '??' },
    { type: 'success', title: 'North Division', description: 'Monthly efficiency target reached', time: '1 day ago', icon: '??' },
    { type: 'warning', title: 'Station EST-023', description: 'Multiple low-performance records', time: '2 days ago', icon: '??' }
  ]
};

export default function DashboardPage({ language }: DashboardPageProps) {
  const t = {
    title: language === 'en' ? 'Executive Dashboard' : 'Dashboard Ejecutivo',
    subtitle: language === 'en' ? 'Real-time monitoring and core KPIs' : 'Monitoreo en tiempo real y KPIs principales',
    avgKm: language === 'en' ? 'Average km/L' : 'km/L Promedio',
    vsPrevMonth: language === 'en' ? '+2.3% vs previous month' : '+2.3% vs mes anterior',
    monthlySavings: language === 'en' ? 'Monthly Savings' : 'Ahorro Mensual',
    optimization: language === 'en' ? '+$23K optimization' : '+$23K optimizacion',
    co2Avoided: language === 'en' ? 'CO2 Tons Avoided' : 'Toneladas CO2 Evitadas',
    co2Goal: language === 'en' ? 'Goal: 1,000t' : 'Objetivo: 1,000t',
    activeAlerts: language === 'en' ? 'Active Alerts' : 'Alertas Activas',
    needsAttention: language === 'en' ? 'Require attention' : 'Requieren atencion',
    trend: language === 'en' ? 'Efficiency Trend 2024' : 'Tendencia de Eficiencia 2024',
    avgEfficiency: language === 'en' ? 'Average Efficiency' : 'Eficiencia Promedio',
    byDivision: language === 'en' ? 'Efficiency by Division' : 'Eficiencia por Division',
    alertsCenter: language === 'en' ? 'Alerts Center' : 'Centro de Alertas',
    alertsSub: language === 'en' ? 'Notifications and required actions' : 'Notificaciones y acciones requeridas',
    activeDrivers: language === 'en' ? 'Active Drivers' : 'Conductores Activos',
    runningToday: language === 'en' ? 'Running today' : 'En operacion hoy',
    vehiclesRoute: language === 'en' ? 'Vehicles on Route' : 'Vehiculos en Ruta',
    realtime: language === 'en' ? 'Real-time monitoring' : 'Monitoreo en tiempo real',
    uptime: language === 'en' ? 'System Uptime' : 'Uptime del Sistema',
    last30: language === 'en' ? 'Last 30 days' : 'Ultimos 30 dias',
    efficiencyLabel: language === 'en' ? 'Efficiency' : 'Eficiencia'
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <ContentCard icon={Activity} title={t.title} subtitle={t.subtitle}>
        <div />
      </ContentCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard icon={Fuel} value="12.4" label={t.avgKm} change={t.vsPrevMonth} changeType="positive" delay={0.1} />
        <MetricCard icon={DollarSign} value="$127K" label={t.monthlySavings} change={t.optimization} changeType="positive" delay={0.2} />
        <MetricCard icon={Leaf} value="847" label={t.co2Avoided} change={t.co2Goal} changeType="positive" delay={0.3} />
        <MetricCard icon={AlertTriangle} value="23" label={t.activeAlerts} change={t.needsAttention} changeType="negative" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div className="bg-white border border-slate-200 rounded-2xl p-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
            {t.trend}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={efficiencyTrendData.slice(-90)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', { month: 'short', day: 'numeric' })
                }
              />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                labelFormatter={(value) => new Date(value).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES')}
                formatter={(value: number) => [`${value.toFixed(2)} km/L`, t.efficiencyLabel]}
              />
              <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="bg-white border border-slate-200 rounded-2xl p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
            {t.byDivision}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={divisionDataByLang[language]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="division" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                formatter={(value: number) => [`${value.toFixed(1)} km/L`, t.avgEfficiency]}
              />
              <Bar dataKey="efficiency" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div className="bg-white border border-slate-200 rounded-2xl p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{t.alertsCenter}</h3>
            <p className="text-slate-600">{t.alertsSub}</p>
          </div>
        </div>

        <div className="space-y-4">
          {alertsByLang[language].map((alert, index) => {
            const borderColors = {
              error: 'border-red-500',
              warning: 'border-yellow-500',
              success: 'border-green-500'
            };

            return (
              <motion.div
                key={index}
                className={`bg-white border-l-4 ${borderColors[alert.type as keyof typeof borderColors]} border border-slate-100 rounded-xl p-6 flex items-center justify-between hover:shadow-md transition-shadow`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{alert.icon}</div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">{alert.title}</h4>
                    <p className="text-slate-600 text-sm">{alert.description}</p>
                  </div>
                </div>
                <div className="text-slate-400 text-sm">{alert.time}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <motion.div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.9 }}>
          <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <div className="text-3xl font-bold mb-2">156</div>
          <div className="text-lg opacity-90">{t.activeDrivers}</div>
          <div className="text-sm opacity-70 mt-2">{t.runningToday}</div>
        </motion.div>

        <motion.div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.0 }}>
          <Truck className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <div className="text-3xl font-bold mb-2">89</div>
          <div className="text-lg opacity-90">{t.vehiclesRoute}</div>
          <div className="text-sm opacity-70 mt-2">{t.realtime}</div>
        </motion.div>

        <motion.div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.1 }}>
          <Activity className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <div className="text-3xl font-bold mb-2">94.2%</div>
          <div className="text-lg opacity-90">{t.uptime}</div>
          <div className="text-sm opacity-70 mt-2">{t.last30}</div>
        </motion.div>
      </div>
    </div>
  );
}
