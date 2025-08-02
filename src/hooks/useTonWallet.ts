import { useState, useEffect, useCallback } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { WalletInfo, TokenBalance } from '../types';
import { TON_TOKENS, formatAmount } from '../utils/tonUtils';
import { MESSAGES } from '../constants';

export const useTonWallet = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connected = tonConnectUI.connected;
  const account = tonConnectUI.account;

  // Получение информации о кошельке
  useEffect(() => {
    if (connected && account) {
      setWalletInfo({
        address: account.address,
        chain: account.chain || 'mainnet',
        publicKey: account.publicKey || ''
      });
    } else {
      setWalletInfo(null);
    }
  }, [connected, account]);

  // Получение балансов токенов
  const fetchBalances = useCallback(async () => {
    if (!connected || !account) {
      setBalances([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Здесь будет реальный API вызов для получения балансов
      // Пока используем моковые данные
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockBalances: TokenBalance[] = [
        {
          symbol: 'CASA',
          balance: '1234.56',
          usdValue: '2469.12',
          change24h: 5.2,
          tokenInfo: TON_TOKENS.find(t => t.symbol === 'CASA')!
        },
        {
          symbol: 'TON',
          balance: '100.00',
          usdValue: '150.00',
          change24h: -2.1,
          tokenInfo: TON_TOKENS.find(t => t.symbol === 'TON')!
        }
      ];

      setBalances(mockBalances);
    } catch (err) {
      setError(MESSAGES.NETWORK_ERROR);
      console.error('Error fetching balances:', err);
    } finally {
      setLoading(false);
    }
  }, [connected, account]);

  // Отправка транзакции
  const sendTransaction = useCallback(async (
    to: string,
    amount: string,
    token: string,
    message?: string
  ) => {
    if (!connected) {
      throw new Error(MESSAGES.WALLET_NOT_CONNECTED);
    }

    try {
      // Здесь будет реальная логика отправки транзакции через TON Connect
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60, // 60 секунд
        messages: [
          {
            address: to,
            amount: amount,
            payload: message || ''
          }
        ]
      };

      const result = await tonConnectUI.sendTransaction(transaction);
      return result;
    } catch (err) {
      console.error('Transaction error:', err);
      throw new Error(MESSAGES.TRANSACTION_FAILED);
    }
  }, [connected, tonConnectUI]);

  // Обновление балансов при подключении/отключении кошелька
  useEffect(() => {
    if (connected) {
      fetchBalances();
    } else {
      setBalances([]);
    }
  }, [connected, fetchBalances]);

  // Получение баланса конкретного токена
  const getTokenBalance = useCallback((symbol: string): TokenBalance | null => {
    return balances.find(balance => balance.symbol === symbol) || null;
  }, [balances]);

  // Проверка достаточности баланса
  const hasSufficientBalance = useCallback((symbol: string, amount: string): boolean => {
    const balance = getTokenBalance(symbol);
    if (!balance) return false;
    
    const currentBalance = parseFloat(balance.balance);
    const requiredAmount = parseFloat(amount);
    
    return currentBalance >= requiredAmount;
  }, [getTokenBalance]);

  // Форматирование баланса для отображения
  const formatBalance = useCallback((symbol: string): string => {
    const balance = getTokenBalance(symbol);
    if (!balance) return '0.00';
    
    return formatAmount(balance.balance, balance.tokenInfo.decimals);
  }, [getTokenBalance]);

  return {
    connected,
    walletInfo,
    balances,
    loading,
    error,
    fetchBalances,
    sendTransaction,
    getTokenBalance,
    hasSufficientBalance,
    formatBalance
  };
}; 