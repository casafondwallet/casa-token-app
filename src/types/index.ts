// Типы для CASA Token приложения

export interface WalletInfo {
  address: string;
  chain: string;
  publicKey: string;
}

export interface TokenBalance {
  symbol: string;
  balance: string;
  usdValue: string;
  change24h: number;
  tokenInfo: TokenInfo;
}

export interface TokenInfo {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  icon: string;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap';
  token: string;
  amount: string;
  usdValue: string;
  address: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  hash?: string;
  message?: string;
}

export interface SwapRate {
  from: string;
  to: string;
  rate: number;
  fee: number;
  minAmount: string;
  maxAmount: string;
}

export interface TransferFormData {
  recipient: string;
  amount: string;
  token: string;
  message: string;
}

export interface SwapFormData {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
}

export interface MarketData {
  symbol: string;
  price: string;
  change24h: number;
  volume24h: string;
  marketCap: string;
}

export interface NetworkConfig {
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  chainId: string;
}

export interface AppConfig {
  network: 'mainnet' | 'testnet';
  casaTokenAddress: string;
  apiUrl: string;
  tonConnectManifestUrl: string;
}

export type TabType = 'balance' | 'transfer' | 'swap' | 'history';

export interface ErrorResponse {
  code: string;
  message: string;
  details?: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ErrorResponse;
} 