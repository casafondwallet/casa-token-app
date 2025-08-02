import React, { useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { RefreshCw, ArrowDown, TrendingUp, AlertCircle } from 'lucide-react';

interface SwapRate {
  from: string;
  to: string;
  rate: number;
  fee: number;
}

const SwapForm: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const connected = tonConnectUI.connected;

  const [swapData, setSwapData] = useState({
    fromToken: 'CASA',
    toToken: 'TON',
    fromAmount: '',
    toAmount: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [swapRate, setSwapRate] = useState<SwapRate>({
    from: 'CASA',
    to: 'TON',
    rate: 2.0,
    fee: 0.5
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSwapData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const calculateSwap = () => {
    if (!swapData.fromAmount || parseFloat(swapData.fromAmount) <= 0) {
      setSwapData(prev => ({ ...prev, toAmount: '' }));
      return;
    }

    const fromAmount = parseFloat(swapData.fromAmount);
    const calculatedAmount = fromAmount * swapRate.rate * (1 - swapRate.fee / 100);
    setSwapData(prev => ({
      ...prev,
      toAmount: calculatedAmount.toFixed(6)
    }));
  };

  const handleSwap = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!connected) {
      setError('Подключите кошелек для выполнения обмена');
      return;
    }

    if (!swapData.fromAmount || !swapData.toAmount) {
      setError('Введите сумму для обмена');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Здесь будет реальная логика обмена токенов
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      alert('Обмен выполнен успешно!');
      setSwapData({
        fromToken: 'CASA',
        toToken: 'TON',
        fromAmount: '',
        toAmount: ''
      });
    } catch (error) {
      setError('Ошибка при выполнении обмена. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  const switchTokens = () => {
    setSwapData(prev => ({
      fromToken: prev.toToken,
      toToken: prev.fromToken,
      fromAmount: prev.toAmount,
      toAmount: prev.fromAmount
    }));
    setSwapRate(prev => ({
      from: prev.to,
      to: prev.from,
      rate: 1 / prev.rate,
      fee: prev.fee
    }));
  };

  React.useEffect(() => {
    calculateSwap();
  }, [swapData.fromAmount, swapRate]);

  if (!connected) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="h-16 w-16 text-white/50 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Подключите кошелек
        </h3>
        <p className="text-white/70">
          Подключите свой TON кошелек для обмена токенов
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Обмен токенов</h2>
        <p className="text-white/70">Обменивайте CASA и TON токены по лучшим курсам</p>
      </div>

      <form onSubmit={handleSwap} className="space-y-6">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <div className="space-y-4">
            {/* Отправляете */}
            <div>
              <label className="block text-white font-medium mb-2">
                Отправляете
              </label>
              <div className="flex space-x-2">
                <select
                  name="fromToken"
                  value={swapData.fromToken}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="CASA">CASA</option>
                  <option value="TON">TON</option>
                </select>
                <input
                  type="number"
                  name="fromAmount"
                  value={swapData.fromAmount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>

            {/* Кнопка переключения */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={switchTokens}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
              >
                <ArrowDown className="h-5 w-5" />
              </button>
            </div>

            {/* Получаете */}
            <div>
              <label className="block text-white font-medium mb-2">
                Получаете
              </label>
              <div className="flex space-x-2">
                <select
                  name="toToken"
                  value={swapData.toToken}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="TON">TON</option>
                  <option value="CASA">CASA</option>
                </select>
                <input
                  type="number"
                  name="toAmount"
                  value={swapData.toAmount}
                  readOnly
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white/70"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Информация о курсе */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Курс обмена:</span>
              <span className="text-white font-medium">
                1 {swapRate.from} = {swapRate.rate.toFixed(4)} {swapRate.to}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Комиссия:</span>
              <span className="text-white font-medium">{swapRate.fee}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Минимальная сумма:</span>
              <span className="text-white font-medium">0.1 {swapRate.from}</span>
            </div>
          </div>
        </div>

        {/* Ошибка */}
        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <span className="text-red-400">{error}</span>
          </div>
        )}

        {/* Кнопка обмена */}
        <button
          type="submit"
          disabled={loading || !swapData.fromAmount || !swapData.toAmount}
          className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-casa-primary to-casa-secondary hover:from-casa-secondary hover:to-casa-primary text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Обмен...' : 'Обменять'}</span>
        </button>
      </form>

      {/* Рыночная информация */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Рыночная информация</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-white/70 text-sm">CASA/TON</p>
            <p className="text-white font-semibold">$2.00</p>
            <div className="flex items-center justify-center space-x-1 text-green-400">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">+5.2%</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-white/70 text-sm">TON/USD</p>
            <p className="text-white font-semibold">$1.50</p>
            <div className="flex items-center justify-center space-x-1 text-red-400">
              <ArrowDown className="h-4 w-4" />
              <span className="text-sm">-2.1%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapForm; 