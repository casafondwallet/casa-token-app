// Константы для CASA Token приложения

export const APP_NAME = 'CASA Token';
export const APP_VERSION = '1.0.0';

// Сети
export const NETWORKS = {
  MAINNET: 'mainnet',
  TESTNET: 'testnet'
} as const;

// Токены
export const TOKENS = {
  TON: 'TON',
  CASA: 'CASA'
} as const;

// Статусы транзакций
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed'
} as const;

// Типы транзакций
export const TRANSACTION_TYPES = {
  SEND: 'send',
  RECEIVE: 'receive',
  SWAP: 'swap'
} as const;

// Вкладки приложения
export const TABS = {
  BALANCE: 'balance',
  TRANSFER: 'transfer',
  SWAP: 'swap',
  HISTORY: 'history'
} as const;

// URL'ы
export const URLS = {
  TON_EXPLORER_MAINNET: 'https://tonviewer.com',
  TON_EXPLORER_TESTNET: 'https://testnet.tonviewer.com',
  TON_CONNECT_DOCS: 'https://docs.ton.org/develop/dapps/ton-connect',
  TON_WEBSITE: 'https://ton.org'
} as const;

// Лимиты
export const LIMITS = {
  MIN_TRANSFER_AMOUNT: '0.001',
  MAX_TRANSFER_AMOUNT: '1000000',
  MIN_SWAP_AMOUNT: '0.1',
  MAX_SWAP_AMOUNT: '100000',
  MAX_MESSAGE_LENGTH: 1000
} as const;

// Комиссии
export const FEES = {
  TRANSFER: '0.01',
  SWAP: '0.5',
  GAS_LIMIT: '1000000'
} as const;

// Курсы обмена (моковые данные)
export const SWAP_RATES = {
  CASA_TON: 2.0,
  TON_CASA: 0.5
} as const;

// Цвета
export const COLORS = {
  PRIMARY: '#FF6B35',
  SECONDARY: '#F7931E',
  TON_BLUE: '#0088CC',
  SUCCESS: '#10B981',
  ERROR: '#EF4444',
  WARNING: '#F59E0B',
  INFO: '#3B82F6'
} as const;

// Сообщения
export const MESSAGES = {
  WALLET_NOT_CONNECTED: 'Подключите кошелек для продолжения',
  INSUFFICIENT_BALANCE: 'Недостаточно средств',
  INVALID_ADDRESS: 'Неверный адрес получателя',
  TRANSACTION_SUCCESS: 'Транзакция выполнена успешно',
  TRANSACTION_FAILED: 'Ошибка при выполнении транзакции',
  NETWORK_ERROR: 'Ошибка сети. Попробуйте еще раз',
  LOADING: 'Загрузка...',
  CONNECTING: 'Подключение...',
  SENDING: 'Отправка...',
  SWAPPING: 'Обмен...'
} as const;

// Временные интервалы
export const INTERVALS = {
  BALANCE_REFRESH: 30000, // 30 секунд
  PRICE_REFRESH: 10000,   // 10 секунд
  TRANSACTION_TIMEOUT: 60000 // 60 секунд
} as const;

// Локальное хранилище
export const STORAGE_KEYS = {
  WALLET_ADDRESS: 'casa_wallet_address',
  SELECTED_NETWORK: 'casa_network',
  TRANSACTION_HISTORY: 'casa_transactions',
  USER_PREFERENCES: 'casa_preferences'
} as const; 