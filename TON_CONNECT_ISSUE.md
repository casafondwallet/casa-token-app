# Проблема с TON Connect и localhost

## 🚨 Проблема

Получена ошибка 404 при подключении TON Connect:
```
{"url":"https://walletbot.me/tonconnect-proxy/http://localhost:3000/tonconnect-manifest.json","status":404,"response":"Not found because of proxy error: Error: connect ECONNREFUSED 127.0.0.1:3000"}
```

## 🔍 Анализ проблемы

### Причина ошибки

1. **TON Connect работает через HTTPS прокси:**
   - TON Connect использует `https://walletbot.me/tonconnect-proxy/`
   - Прокси пытается получить манифест по указанному URL

2. **localhost недоступен извне:**
   - `http://localhost:3000` доступен только на вашем компьютере
   - Прокси-сервер не может подключиться к localhost

3. **Требования TON Connect:**
   - Манифест должен быть доступен по публичному HTTPS URL
   - Домен должен быть доступен из интернета

## ✅ Решения

### 1. Развертывание на публичной платформе (Рекомендуется)

**Vercel (самый быстрый):**
```bash
# 1. Создайте аккаунт на vercel.com
# 2. Подключите GitHub репозиторий
# 3. Деплой автоматически запустится
# 4. Получите URL вида: https://your-app.vercel.app
# 5. Обновите манифест с новым URL
```

**Netlify:**
```bash
# 1. Создайте аккаунт на netlify.com
# 2. Подключите репозиторий
# 3. Настройте build settings
# 4. Деплой и обновление манифеста
```

### 2. Временные решения для разработки

**ngrok:**
```bash
# Установите ngrok
npm install -g ngrok

# Запустите приложение
npm start

# В другом терминале
ngrok http 3000

# Получите HTTPS URL и обновите манифест
```

**localtunnel:**
```bash
# Установите localtunnel
npm install -g localtunnel

# Запустите приложение
npm start

# В другом терминале
lt --port 3000

# Получите HTTPS URL и обновите манифест
```

## 🔧 Текущая конфигурация

### Манифест (обновлен для Vercel):
```json
{
  "url": "https://casa-token-app.vercel.app",
  "name": "CASA Token App",
  "iconUrl": "https://casa-token-app.vercel.app/icon.svg",
  "termsOfUseUrl": "https://casa-token-app.vercel.app/terms",
  "privacyPolicyUrl": "https://casa-token-app.vercel.app/privacy"
}
```

### Код (обновлен):
```typescript
const manifestUrl = 'https://casa-token-app.vercel.app/tonconnect-manifest.json';
```

## 📋 Шаги для решения

### Для быстрого тестирования:

1. **Разверните на Vercel:**
   - Следуйте инструкциям в `QUICK_DEPLOY.md`
   - Получите публичный URL

2. **Обновите манифест:**
   - Замените URL на ваш реальный домен
   - Убедитесь, что все ссылки корректны

3. **Обновите код:**
   - Измените `manifestUrl` в `src/index.tsx`
   - Используйте ваш реальный домен

4. **Проверьте:**
   - Откройте приложение
   - Нажмите "Connect Wallet"
   - Должен появиться список кошельков

### Для продакшена:

1. **Выберите платформу:**
   - Vercel (рекомендуется для быстрого старта)
   - Netlify (хорошая альтернатива)
   - GitHub Pages (бесплатно)

2. **Настройте домен:**
   - Используйте кастомный домен (опционально)
   - Убедитесь, что HTTPS включен

3. **Обновите конфигурацию:**
   - Манифест с реальным доменом
   - Переменные окружения
   - Иконки и метаданные

## 🎯 Результат

После развертывания:
- ✅ Приложение доступно по HTTPS
- ✅ TON Connect работает корректно
- ✅ Кошельки подключаются
- ✅ Все функции доступны

## 🔗 Полезные ссылки

- [TON Connect Documentation](https://docs.ton.org/develop/dapps/ton-connect)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [ngrok Documentation](https://ngrok.com/docs)

---

**Проблема решена! Разверните приложение на публичной платформе для работы с TON Connect. 🚀** 