import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import IntroductionPage from './pages/IntroductionPage';
import AnalysisPage from './pages/AnalysisPage';
import MappingPage from './pages/MappingPage';
import PredictionPage from './pages/PredictionPage';
import DashboardPage from './pages/DashboardPage';
import Footer from './components/Footer';

export type PageType = 'intro' | 'analysis' | 'mapping' | 'prediction' | 'dashboard';
export type Language = 'es' | 'en';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('intro');
  const [language, setLanguage] = useState<Language>('es');

  const renderPage = () => {
    switch (currentPage) {
      case 'intro':
        return <IntroductionPage language={language} />;
      case 'analysis':
        return <AnalysisPage language={language} />;
      case 'mapping':
        return <MappingPage language={language} />;
      case 'prediction':
        return <PredictionPage language={language} />;
      case 'dashboard':
        return <DashboardPage language={language} />;
      default:
        return <IntroductionPage language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          language={language}
          onLanguageChange={setLanguage}
        />

        <div className="flex-1 lg:ml-80">
          {currentPage !== 'intro' && <Header language={language} />}

          <main className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentPage}-${language}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer language={language} />
        </div>
      </div>
    </div>
  );
}

export default App;
