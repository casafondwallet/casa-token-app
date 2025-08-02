// API функции для работы с TON блокчейном

const TON_CENTER_API = 'https://toncenter.com/api/v2';
const TON_API_KEY = process.env.REACT_APP_TON_API_KEY || '';

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

// Получение баланса TON
export const getTonBalance = async (address: string): Promise<TonBalance> => {
  try {
    const response = await fetch(`${TON_CENTER_API}/getAddressBalance?address=${address}`, {
      headers: {
        'X-API-Key': TON_API_KEY
      }
    });
    
    const data = await response.json();
    
    if (!data.ok) {
      throw new Error(data.error || 'Failed to fetch TON balance');
    }
    
    return {
      balance: data.result,
      usdValue: await getTonUsdValue(data.result)
    };
  } catch (error) {
    console.error('Error fetching TON balance:', error);
    throw error;
  }
};

// Получение баланса Jetton токена
export const getJettonBalance = async (
  walletAddress: string, 
  jettonAddress: string
): Promise<JettonBalance> => {
  try {
    const response = await fetch(`${TON_CENTER_API}/getJettonWalletData?address=${walletAddress}&jetton_address=${jettonAddress}`, {
      headers: {
        'X-API-Key': TON_API_KEY
      }
    });
    
    const data = await response.json();
    
    if (!data.ok) {
      throw new Error(data.error || 'Failed to fetch Jetton balance');
    }
    
    return {
      balance: data.result.balance,
      metadata: data.result.metadata,
      usdValue: await getJettonUsdValue(data.result.balance, jettonAddress)
    };
  } catch (error) {
    console.error('Error fetching Jetton balance:', error);
    throw error;
  }
};

// Получение USD стоимости TON
export const getTonUsdValue = async (balance: string): Promise<string> => {
  try {
    // Получаем курс TON к USD
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
    const data = await response.json();
    
    const tonPrice = data['the-open-network']?.usd || 0;
    const balanceInTon = parseFloat(balance) / Math.pow(10, 9); // TON имеет 9 знаков после запятой
    
    return (balanceInTon * tonPrice).toFixed(2);
  } catch (error) {
    console.error('Error fetching TON USD value:', error);
    return '0.00';
  }
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

// Получение всех балансов для кошелька
export const getAllBalances = async (walletAddress: string) => {
  try {
    const [tonBalance, casaBalance] = await Promise.all([
      getTonBalance(walletAddress),
      getJettonBalance(walletAddress, 'EQBWK_VVEBJWiIQIIXOckUVw0HdF24buJiNiiR0dUHEe2xs4')
    ]);
    
    return {
      TON: tonBalance,
      CASA: casaBalance
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