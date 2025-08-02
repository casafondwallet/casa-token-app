import React, { useState, useEffect } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { BarChart3, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, ExternalLink } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap';
  token: string;
  amount: string;
  usdValue: string;
  address: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  hash?: string;
}

const TransactionHistory: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const connected = tonConnectUI.connected;
  const account = tonConnectUI.account;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'send' | 'receive' | 'swap'>('all');

  const mockTransactions: Transaction[] = [
    {
      id: '1',
      type: 'send',
      token: 'CASA',
      amount: '100.00',
      usdValue: '200.00',
      address: 'EQD...abc123',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'completed',
      hash: '0x1234567890abcdef'
    },
    {
      id: '2',
      type: 'receive',
      token: 'TON',
      amount: '50.00',
      usdValue: '75.00',
      address: 'EQD...def456',
      timestamp: '2024-01-14T15:45:00Z',
      status: 'completed',
      hash: '0xabcdef1234567890'
    },
    {
      id: '3',
      type: 'swap',
      token: 'CASA → TON',
      amount: '25.00',
      usdValue: '50.00',
      address: 'DEX Exchange',
      timestamp: '2024-01-13T09:20:00Z',
      status: 'completed'
    },
    {
      id: '4',
      type: 'send',
      token: 'CASA',
      amount: '75.50',
      usdValue: '151.00',
      address: 'EQD...ghi789',
      timestamp: '2024-01-12T14:15:00Z',
      status: 'pending'
    }
  ];

  const fetchTransactions = async () => {
    if (!connected || !account) return;
    
    setLoading(true);
    try {
      // Здесь будет реальный API вызов для получения транзакций
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTransactions(mockTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connected) {
      fetchTransactions();
    }
  }, [connected, account]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <ArrowUpRight className="h-4 w-4 text-red-400" />;
      case 'receive':
        return <ArrowDownLeft className="h-4 w-4 text-green-400" />;
      case 'swap':
        return <BarChart3 className="h-4 w-4 text-blue-400" />;
      default:
        return null;
    }
  };

  const filteredTransactions = transactions.filter(tx => 
    filter === 'all' || tx.type === filter
  );

  if (!connected) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="h-16 w-16 text-white/50 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Подключите кошелек
        </h3>
        <p className="text-white/70">
          Подключите свой TON кошелек для просмотра истории транзакций
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">История транзакций</h2>
        <button
          onClick={fetchTransactions}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors disabled:opacity-50"
        >
          <BarChart3 className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Обновить</span>
        </button>
      </div>

      {/* Фильтры */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: 'Все' },
          { key: 'send', label: 'Отправленные' },
          { key: 'receive', label: 'Полученные' },
          { key: 'swap', label: 'Обмены' }
        ].map((filterOption) => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key as any)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === filterOption.key
                ? 'bg-white text-ton-blue'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Список транзакций */}
      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/70">Транзакции не найдены</p>
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(tx.type)}
                    {getStatusIcon(tx.status)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">
                        {tx.type === 'send' ? 'Отправлено' : 
                         tx.type === 'receive' ? 'Получено' : 'Обмен'}
                      </span>
                      <span className="text-white/70 text-sm">
                        {tx.token}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm">
                      {formatDate(tx.timestamp)}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-white font-semibold">
                    {tx.type === 'send' ? '-' : '+'}{tx.amount}
                  </div>
                  <div className="text-white/70 text-sm">
                    ${tx.usdValue}
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm break-all">
                    {tx.address}
                  </span>
                  {tx.hash && (
                    <a
                      href={`https://tonviewer.com/transaction/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-white/70 hover:text-white transition-colors"
                    >
                      <span className="text-sm">Просмотр</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionHistory; 