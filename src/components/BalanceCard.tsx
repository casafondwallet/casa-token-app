import React from 'react';
import { Wallet, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { useTonWallet } from '../hooks/useTonWallet';

const BalanceCard: React.FC = () => {
  const {
    connected,
    walletInfo,
    balances,
    loading,
    error,
    refreshBalances
  } = useTonWallet();

  if (!connected) {
    return (
      <div className="text-center py-12">
        <Wallet className="h-16 w-16 text-white/50 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Подключите кошелек
        </h3>
        <p className="text-white/70">
          Подключите свой TON кошелек для просмотра балансов
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Баланс</h2>
          <p className="text-white/70">
            {walletInfo?.address ? `${walletInfo.address.slice(0, 6)}...${walletInfo.address.slice(-4)}` : 'Адрес не найден'}
          </p>
        </div>
        <button
          onClick={refreshBalances}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors disabled:opacity-50"
          title="Принудительное обновление (очистка кэша)"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Обновить</span>
        </button>
      </div>

      {/* Total Balance */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
        <div className="text-center">
          <p className="text-white/70 text-sm mb-1">Общий баланс</p>
          <p className="text-3xl font-bold text-white mb-2">$3,250.00</p>
          <div className="flex items-center justify-center space-x-1 text-green-400">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">+3.1% за 24ч</span>
          </div>
        </div>
      </div>

      {/* Token Balances */}
      <div className="space-y-4">
        {balances.map((token) => (
          <div
            key={token.symbol}
            className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{token.tokenInfo.icon}</div>
                <div>
                  <h3 className="text-white font-semibold">{token.symbol}</h3>
                  <p className="text-white/70 text-sm">
                    {token.balance} {token.symbol}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">${token.usdValue}</p>
                <div className={`flex items-center space-x-1 text-sm ${
                  token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {token.change24h >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>{Math.abs(token.change24h)}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BalanceCard; 