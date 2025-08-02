// API функции для работы с TON блокчейном

const TON_CENTER_API = 'https://toncenter.com/api/v2';
const TON_API_KEY = process.env.REACT_APP_TON_API_KEY || '';

// Проверка наличия API ключа
export const hasApiKey = (): boolean => {
  return !!TON_API_KEY;
};

// Получение информации о лимитах API
export const getApiInfo = () => {
  return {
    hasKey: hasApiKey(),
    rateLimit: hasApiKey() ? '1000 requests/minute' : '10 requests/minute',
    priority: hasApiKey() ? 'High' : 'Low'
  };
};

// Кэш для балансов (5 минут)
const BALANCE_CACHE = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

export interface TonBalance {
  balance: string;
  usdValue?: string;
}

export interface JettonBalance {
  balance: string;
  metadata: {
    name: string;
    symbol: string;
    decimals: number;
  };
  usdValue?: string;
}

// Функция для получения кэшированных данных
const getCachedData = (key: string) => {
  const cached = BALANCE_CACHE.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

// Функция для сохранения данных в кэш
const setCachedData = (key: string, data: any) => {
  BALANCE_CACHE.set(key, { data, timestamp: Date.now() });
};

// Получение баланса TON с кэшированием
export const getTonBalance = async (address: string): Promise<TonBalance> => {
  const cacheKey = `ton_balance_${address}`;
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(`${TON_CENTER_API}/getAddressBalance?address=${address}`, {
      headers: {
        'X-API-Key': TON_API_KEY,
        'User-Agent': 'CASA-Token-Wallet/1.0'
      }
    });
    
    const data = await response.json();
    
    if (!data.ok) {
      throw new Error(data.error || 'Failed to fetch TON balance');
    }
    
    const result = {
      balance: data.result,
      usdValue: await getTonUsdValue(data.result)
    };
    
    setCachedData(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Error fetching TON balance:', error);
    
    // Fallback - возвращаем нулевой баланс
    return {
      balance: '0',
      usdValue: '0.00'
    };
  }
};

// Получение баланса Jetton токена с кэшированием
export const getJettonBalance = async (
  walletAddress: string, 
  jettonAddress: string
): Promise<JettonBalance> => {
  const cacheKey = `jetton_balance_${walletAddress}_${jettonAddress}`;
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(`${TON_CENTER_API}/getJettonWalletData?address=${walletAddress}&jetton_address=${jettonAddress}`, {
      headers: {
        'X-API-Key': TON_API_KEY,
        'User-Agent': 'CASA-Token-Wallet/1.0'
      }
    });
    
    const data = await response.json();
    
    if (!data.ok) {
      throw new Error(data.error || 'Failed to fetch Jetton balance');
    }
    
    const result = {
      balance: data.result.balance,
      metadata: data.result.metadata,
      usdValue: await getJettonUsdValue(data.result.balance, jettonAddress)
    };
    
    setCachedData(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Error fetching Jetton balance:', error);
    
    // Fallback - возвращаем нулевой баланс
    return {
      balance: '0',
      metadata: {
        name: 'CASA',
        symbol: 'CASA',
        decimals: 9
      },
      usdValue: '0.00'
    };
  }
};

// Кэш для курсов валют (10 минут)
const PRICE_CACHE = new Map<string, { data: any; timestamp: number }>();
const PRICE_CACHE_DURATION = 10 * 60 * 1000; // 10 минут

// Получение USD стоимости TON с кэшированием
export const getTonUsdValue = async (balance: string): Promise<string> => {
  const cacheKey = 'ton_price';
  const cached = PRICE_CACHE.get(cacheKey);
  
  let tonPrice = 0;
  
  if (cached && Date.now() - cached.timestamp < PRICE_CACHE_DURATION) {
    tonPrice = cached.data;
  } else {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
      const data = await response.json();
      
      tonPrice = data['the-open-network']?.usd || 0;
      PRICE_CACHE.set(cacheKey, { data: tonPrice, timestamp: Date.now() });
    } catch (error) {
      console.error('Error fetching TON USD value:', error);
      tonPrice = 1.5; // Fallback цена
    }
  }
  
  const balanceInTon = parseFloat(balance) / Math.pow(10, 9);
  return (balanceInTon * tonPrice).toFixed(2);
};

// Получение USD стоимости Jetton токена
export const getJettonUsdValue = async (balance: string, jettonAddress: string): Promise<string> => {
  try {
    // Для CASA токена используем фиксированный курс или получаем из DEX
    // Пока используем примерный курс 1 CASA = $2.00
    const casaPrice = 2.00;
    const balanceInCasa = parseFloat(balance) / Math.pow(10, 9);
    
    return (balanceInCasa * casaPrice).toFixed(2);
  } catch (error) {
    console.error('Error fetching Jetton USD value:', error);
    return '0.00';
  }
};

// Получение всех балансов для кошелька с оптимизацией
export const getAllBalances = async (walletAddress: string) => {
  try {
    // Используем Promise.allSettled для обработки ошибок отдельных запросов
    const [tonResult, casaResult] = await Promise.allSettled([
      getTonBalance(walletAddress),
      getJettonBalance(walletAddress, 'EQBWK_VVEBJWiIQIIXOckUVw0HdF24buJiNiiR0dUHEe2xs4')
    ]);
    
    return {
      TON: tonResult.status === 'fulfilled' ? tonResult.value : { balance: '0', usdValue: '0.00' },
      CASA: casaResult.status === 'fulfilled' ? casaResult.value : { 
        balance: '0', 
        metadata: { name: 'CASA', symbol: 'CASA', decimals: 9 },
        usdValue: '0.00' 
      }
    };
  } catch (error) {
    console.error('Error fetching all balances:', error);
    throw error;
  }
};

// Получение курса обмена между токенами
export const getSwapRate = async (fromToken: string, toToken: string): Promise<number> => {
  try {
    // Здесь можно интегрировать с DEX API (DeDust, Ston.fi)
    // Пока используем фиксированные курсы
    const rates: { [key: string]: number } = {
      'CASA_TON': 2.0,
      'TON_CASA': 0.5
    };
    
    const key = `${fromToken}_${toToken}`;
    return rates[key] || 1.0;
  } catch (error) {
    console.error('Error fetching swap rate:', error);
    return 1.0;
  }
};

// Очистка кэша
export const clearCache = () => {
  BALANCE_CACHE.clear();
  PRICE_CACHE.clear();
}; 