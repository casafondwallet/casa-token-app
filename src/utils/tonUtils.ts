// Утилиты для работы с TON блокчейном

export interface TokenInfo {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  icon: string;
}

export const TON_TOKENS: TokenInfo[] = [
  {
    symbol: 'TON',
    name: 'Toncoin',
    address: 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c',
    decimals: 9,
    icon: '🟡'
  },
  {
    symbol: 'CASA',
    name: 'CASA Token',
    address: 'EQD...', // Замените на реальный адрес CASA токена
    decimals: 9,
    icon: '🏠'
  }
];

export const formatAddress = (address: string): string => {
  if (!address) return '';
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatAmount = (amount: string | number, decimals: number = 9): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '0.00';
  
  const formatted = (num / Math.pow(10, decimals)).toFixed(6);
  return parseFloat(formatted).toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  });
};

export const parseAmount = (amount: string, decimals: number = 9): string => {
  const num = parseFloat(amount);
  if (isNaN(num)) return '0';
  
  return (num * Math.pow(10, decimals)).toString();
};

export const validateAddress = (address: string): boolean => {
  // Базовая валидация TON адреса
  const tonAddressRegex = /^EQ[a-zA-Z0-9]{48}$/;
  return tonAddressRegex.test(address);
};

export const getTokenBySymbol = (symbol: string): TokenInfo | undefined => {
  return TON_TOKENS.find(token => token.symbol === symbol);
};

export const getTokenByAddress = (address: string): TokenInfo | undefined => {
  return TON_TOKENS.find(token => token.address === address);
};

export const calculateSwapRate = (fromToken: string, toToken: string): number => {
  // Здесь будет реальная логика получения курса обмена
  // Пока используем моковые данные
  const rates: { [key: string]: number } = {
    'CASA_TON': 2.0,
    'TON_CASA': 0.5
  };
  
  const key = `${fromToken}_${toToken}`;
  return rates[key] || 1.0;
};

export const estimateGasFee = (transactionType: 'transfer' | 'swap'): string => {
  // Оценка комиссии за газ
  const fees = {
    transfer: '0.01',
    swap: '0.05'
  };
  return fees[transactionType] || '0.01';
};

export const getExplorerUrl = (hash: string, network: 'mainnet' | 'testnet' = 'mainnet'): string => {
  const baseUrl = network === 'mainnet' 
    ? 'https://tonviewer.com' 
    : 'https://testnet.tonviewer.com';
  return `${baseUrl}/transaction/${hash}`;
};

export const getWalletUrl = (address: string, network: 'mainnet' | 'testnet' = 'mainnet'): string => {
  const baseUrl = network === 'mainnet' 
    ? 'https://tonviewer.com' 
    : 'https://testnet.tonviewer.com';
  return `${baseUrl}/address/${address}`;
}; 