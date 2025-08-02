# Подключение TON Connect

## 🎯 Текущий статус

Приложение работает в демо режиме без TON Connect. Для полной функциональности нужно развернуть на публичном домене.

## 🚀 Быстрое подключение TON Connect

### 1. Развертывание на Vercel (Рекомендуется)

```bash
# 1. Создайте аккаунт на vercel.com
# 2. Подключите GitHub репозиторий
# 3. Получите URL вида: https://your-app.vercel.app
```

### 2. Обновление конфигурации

После получения URL обновите файлы:

**public/tonconnect-manifest.json:**
```json
{
  "url": "https://your-app.vercel.app",
  "name": "CASA Token App",
  "iconUrl": "https://your-app.vercel.app/icon.svg",
  "termsOfUseUrl": "https://your-app.vercel.app/terms",
  "privacyPolicyUrl": "https://your-app.vercel.app/privacy"
}
```

**src/index.tsx:**
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const manifestUrl = 'https://your-app.vercel.app/tonconnect-manifest.json';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);
```

**src/App.tsx:**
```typescript
import React, { useState } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { Wallet, Send, RefreshCw, BarChart3, Home } from 'lucide-react';
// ... остальные импорты

function App() {
  // ... остальной код

  return (
    <div className="min-h-screen bg-gradient-to-br from-ton-blue to-purple-600">
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Home className="h-8 w-8 text-white" />
                <h1 className="text-2xl font-bold text-white">CASA Token</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <TonConnectButton />
            </div>
          </div>
        </div>
      </header>
      {/* ... остальной контент */}
    </div>
  );
}
```

### 3. Обновление компонентов

Верните TON Connect интеграцию в компоненты:

**BalanceCard.tsx:**
```typescript
import { useTonConnectUI } from '@tonconnect/ui-react';

const BalanceCard: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const connected = tonConnectUI.connected;
  const account = tonConnectUI.account;
  
  // ... остальной код с проверкой connected
};
```

**TransferForm.tsx:**
```typescript
import { useTonConnectUI } from '@tonconnect/ui-react';

const TransferForm: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const connected = tonConnectUI.connected;
  const account = tonConnectUI.account;
  
  // ... остальной код с проверкой connected
};
```

**SwapForm.tsx:**
```typescript
import { useTonConnectUI } from '@tonconnect/ui-react';

const SwapForm: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const connected = tonConnectUI.connected;
  
  // ... остальной код с проверкой connected
};
```

**TransactionHistory.tsx:**
```typescript
import { useTonConnectUI } from '@tonconnect/ui-react';

const TransactionHistory: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const connected = tonConnectUI.connected;
  const account = tonConnectUI.account;
  
  // ... остальной код с проверкой connected
};
```

## 🔧 Альтернативные платформы

### Netlify
```bash
# 1. Создайте аккаунт на netlify.com
# 2. Подключите репозиторий
# 3. Настройте build: npm run build
# 4. Получите URL и обновите манифест
```

### GitHub Pages
```bash
# 1. Включите GitHub Pages в настройках репозитория
# 2. Настройте GitHub Actions для деплоя
# 3. Получите URL и обновите манифест
```

## 📋 Чек-лист подключения

- [ ] Приложение развернуто на публичном домене
- [ ] Манифест обновлен с правильным URL
- [ ] Код обновлен с TonConnectUIProvider
- [ ] Компоненты обновлены с useTonConnectUI
- [ ] Иконка приложения доступна
- [ ] TON Connect кнопка работает
- [ ] Кошелек подключается
- [ ] Все функции работают

## 🆘 Устранение проблем

### Ошибка "Operation aborted"
- Убедитесь, что манифест доступен по указанному URL
- Проверьте, что используется HTTPS
- Убедитесь, что домен публично доступен

### Кошелек не подключается
- Проверьте консоль браузера на ошибки
- Убедитесь, что манифест валиден
- Проверьте, что все URL в манифесте корректны

### Ошибки CORS
- Убедитесь, что используется HTTPS
- Проверьте настройки сервера
- Убедитесь, что домен добавлен в белый список

## 🎯 Результат

После подключения TON Connect:
- ✅ Кошельки подключаются
- ✅ Реальные балансы отображаются
- ✅ Транзакции отправляются
- ✅ Обмены работают
- ✅ История транзакций загружается

---

**TON Connect готов к подключению! 🚀** 