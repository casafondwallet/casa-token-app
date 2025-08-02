import React, { useState } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { Wallet, Send, RefreshCw, BarChart3, Home } from 'lucide-react';
import BalanceCard from './components/BalanceCard';
import TransferForm from './components/TransferForm';
import SwapForm from './components/SwapForm';
import TransactionHistory from './components/TransactionHistory';

type TabType = 'balance' | 'transfer' | 'swap' | 'history';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('balance');

  const tabs = [
    { id: 'balance', label: 'Баланс', icon: Wallet },
    { id: 'transfer', label: 'Перевод', icon: Send },
    { id: 'swap', label: 'Обмен', icon: RefreshCw },
    { id: 'history', label: 'История', icon: BarChart3 }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'balance':
        return <BalanceCard />;
      case 'transfer':
        return <TransferForm />;
      case 'swap':
        return <SwapForm />;
      case 'history':
        return <TransactionHistory />;
      default:
        return <BalanceCard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ton-blue to-purple-600">
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Home className="h-8 w-8 text-white" />
                <h1 className="text-2xl font-bold text-white">CASA Token</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <TonConnectButton />
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-1 mb-8">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-ton-blue shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        {/* Content Area */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App; 