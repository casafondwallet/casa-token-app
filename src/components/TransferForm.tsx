import React, { useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { Send, Copy, Check, AlertCircle } from 'lucide-react';

const TransferForm: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const connected = tonConnectUI.connected;
  const account = tonConnectUI.account;

  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    token: 'CASA',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected) {
      setError('Подключите кошелек для выполнения перевода');
      return;
    }

    if (!formData.recipient || !formData.amount) {
      setError('Заполните все обязательные поля');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Здесь будет реальная логика отправки транзакции
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Транзакция отправлена успешно!');
      setFormData({
        recipient: '',
        amount: '',
        token: 'CASA',
        message: ''
      });
    } catch (error) {
      setError('Ошибка при отправке транзакции. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!connected) {
    return (
      <div className="text-center py-12">
        <Send className="h-16 w-16 text-white/50 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Подключите кошелек
        </h3>
        <p className="text-white/70">
          Подключите свой TON кошелек для выполнения переводов
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Перевод токенов</h2>
        <p className="text-white/70">Отправьте CASA или TON токены другому пользователю</p>
      </div>

      {/* Ваш адрес */}
      {account?.address && (
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-medium mb-1">Ваш адрес</h3>
              <p className="text-white/70 text-sm break-all">{account.address}</p>
            </div>
            <button
              onClick={copyAddress}
              className="flex items-center space-x-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="text-sm">{copied ? 'Скопировано' : 'Копировать'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Форма перевода */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <div className="space-y-4">
            {/* Токен */}
            <div>
              <label className="block text-white font-medium mb-2">
                Токен для перевода
              </label>
              <select
                name="token"
                value={formData.token}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="CASA">CASA</option>
                <option value="TON">TON</option>
              </select>
            </div>

            {/* Получатель */}
            <div>
              <label className="block text-white font-medium mb-2">
                Адрес получателя *
              </label>
              <input
                type="text"
                name="recipient"
                value={formData.recipient}
                onChange={handleInputChange}
                placeholder="Введите адрес получателя"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            {/* Сумма */}
            <div>
              <label className="block text-white font-medium mb-2">
                Сумма *
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            {/* Сообщение */}
            <div>
              <label className="block text-white font-medium mb-2">
                Сообщение (необязательно)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Добавьте сообщение к переводу"
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
              />
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

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-casa-primary to-casa-secondary hover:from-casa-secondary hover:to-casa-primary text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5" />
          <span>{loading ? 'Отправка...' : 'Отправить'}</span>
        </button>
      </form>
    </div>
  );
};

export default TransferForm; 