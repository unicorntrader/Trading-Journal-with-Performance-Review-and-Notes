import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TradeLog from './components/TradeLog/TradeLog';
import Notebook from './components/Notebook/Notebook';
import PerformanceReview from './components/Performance/PerformanceReview';
import { mockTrades, mockNotes } from './utils/mockData';
export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [trades, setTrades] = useState(mockTrades);
  const [notes, setNotes] = useState(mockNotes);
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard trades={trades} notes={notes} />;
      case 'tradelog':
        return <TradeLog trades={trades} setTrades={setTrades} />;
      case 'notebook':
        return <Notebook notes={notes} setNotes={setNotes} trades={trades} />;
      case 'performance':
        return <PerformanceReview trades={trades} />;
      default:
        return <Dashboard trades={trades} notes={notes} />;
    }
  };
  return <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>;
}