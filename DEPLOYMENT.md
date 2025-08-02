# Инструкции по развертыванию CASA Token App

## 🚀 Быстрый старт

### 1. Подготовка к развертыванию

Перед развертыванием необходимо:

1. **Обновить манифест TON Connect:**
   ```json
   {
     "url": "https://your-domain.com",
     "name": "CASA Token App",
     "iconUrl": "https://your-domain.com/icon.png",
     "termsOfUseUrl": "https://your-domain.com/terms",
     "privacyPolicyUrl": "https://your-domain.com/privacy"
   }
   ```

2. **Обновить URL манифеста в коде:**
   В файле `src/index.tsx` замените:
   ```typescript
   const manifestUrl = 'https://your-domain.com/tonconnect-manifest.json';
   ```

3. **Добавить иконку приложения:**
   - Создайте файл `public/icon.png` (рекомендуемый размер: 512x512px)
   - Обновите ссылку в манифесте

### 2. Локальное тестирование

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Сборка для продакшена
npm run build
```

## 🌐 Развертывание на платформах

### Netlify

1. **Подключение репозитория:**
   - Зайдите на [netlify.com](https://netlify.com)
   - Нажмите "New site from Git"
   - Выберите ваш репозиторий

2. **Настройки сборки:**
   - Build command: `npm run build`
   - Publish directory: `build`

3. **Переменные окружения:**
   ```
   REACT_APP_TON_NETWORK=mainnet
   REACT_APP_CASA_TOKEN_ADDRESS=EQD...
   REACT_APP_API_URL=https://your-api.com
   ```

4. **Домен:**
   - Настройте кастомный домен в настройках сайта
   - Обновите манифест TON Connect с новым доменом

### Vercel

1. **Подключение репозитория:**
   - Зайдите на [vercel.com](https://vercel.com)
   - Нажмите "New Project"
   - Импортируйте ваш репозиторий

2. **Автоматическая настройка:**
   - Vercel автоматически определит настройки React
   - Build command: `npm run build`
   - Output directory: `build`

3. **Переменные окружения:**
   - Добавьте в настройках проекта
   - Те же переменные, что и для Netlify

### GitHub Pages

1. **Настройка GitHub Actions:**
   Создайте файл `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: '16'
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./build
   ```

2. **Настройка Pages:**
   - В настройках репозитория включите GitHub Pages
   - Выберите источник: GitHub Actions

## 🔧 Конфигурация для продакшена

### 1. Переменные окружения

Создайте файл `.env.production`:
```env
REACT_APP_TON_NETWORK=mainnet
REACT_APP_CASA_TOKEN_ADDRESS=EQD...
REACT_APP_API_URL=https://your-api.com
REACT_APP_TON_CONNECT_MANIFEST_URL=https://your-domain.com/tonconnect-manifest.json
```

### 2. Оптимизация производительности

1. **Сжатие изображений:**
   ```bash
   npm install --save-dev imagemin imagemin-pngquant
   ```

2. **Анализ бандла:**
   ```bash
   npm install --save-dev webpack-bundle-analyzer
   npm run build -- --analyze
   ```

### 3. Безопасность

1. **Content Security Policy:**
   Добавьте в `public/index.html`:
   ```html
   <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';">
   ```

2. **HTTPS:**
   - Обязательно используйте HTTPS в продакшене
   - Настройте редирект с HTTP на HTTPS

## 📱 PWA настройка

### 1. Манифест приложения

Создайте `public/manifest.json`:
```json
{
  "short_name": "CASA Token",
  "name": "CASA Token - TON Blockchain App",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#FF6B35",
  "background_color": "#ffffff"
}
```

### 2. Service Worker

Создайте `src/serviceWorker.ts`:
```typescript
export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
}
```

## 🔍 Мониторинг и аналитика

### 1. Google Analytics

Добавьте в `public/index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Обработка ошибок

Добавьте Sentry или аналогичный сервис:
```bash
npm install @sentry/react @sentry/tracing
```

## 🚨 Чек-лист перед запуском

- [ ] Обновлен манифест TON Connect с правильным доменом
- [ ] Добавлена иконка приложения
- [ ] Настроены переменные окружения
- [ ] Включен HTTPS
- [ ] Протестирована функциональность на тестовой сети
- [ ] Настроен мониторинг ошибок
- [ ] Добавлена аналитика
- [ ] Оптимизированы изображения
- [ ] Протестирована производительность

## 🆘 Устранение неполадок

### Проблемы с TON Connect

1. **Кошелек не подключается:**
   - Проверьте правильность манифеста
   - Убедитесь, что домен соответствует манифесту
   - Проверьте консоль браузера на ошибки

2. **Транзакции не отправляются:**
   - Проверьте подключение к сети
   - Убедитесь в достаточности баланса
   - Проверьте правильность адреса получателя

### Проблемы с развертыванием

1. **Сборка не проходит:**
   - Проверьте логи сборки
   - Убедитесь в корректности TypeScript
   - Проверьте зависимости

2. **Приложение не загружается:**
   - Проверьте консоль браузера
   - Убедитесь в правильности путей
   - Проверьте настройки сервера

## 📞 Поддержка

При возникновении проблем:

1. Проверьте [документацию TON Connect](https://docs.ton.org/develop/dapps/ton-connect)
2. Создайте Issue в GitHub репозитории
3. Обратитесь к сообществу TON

---

**Удачного развертывания! 🚀** 