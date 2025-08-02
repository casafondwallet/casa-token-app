# Быстрое развертывание для тестирования TON Connect

## 🚨 Проблема с localhost

TON Connect не может работать с localhost через HTTPS прокси. Нужно развернуть приложение на публичном домене.

## 🚀 Быстрое решение - Vercel

### 1. Подготовка

1. **Создайте аккаунт на Vercel:**
   - Зайдите на [vercel.com](https://vercel.com)
   - Зарегистрируйтесь через GitHub

2. **Подготовьте репозиторий:**
   ```bash
   # Инициализируйте git (если еще не сделано)
   git init
   git add .
   git commit -m "Initial commit"
   
   # Создайте репозиторий на GitHub
   # Или используйте существующий
   ```

### 2. Развертывание на Vercel

1. **Подключите репозиторий:**
   - Войдите в Vercel Dashboard
   - Нажмите "New Project"
   - Выберите ваш GitHub репозиторий
   - Нажмите "Import"

2. **Настройки проекта:**
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Переменные окружения (опционально):**
   ```
   REACT_APP_TON_NETWORK=mainnet
   REACT_APP_CASA_TOKEN_ADDRESS=EQD...
   ```

4. **Деплой:**
   - Нажмите "Deploy"
   - Дождитесь завершения сборки

### 3. Обновление манифеста

После деплоя Vercel даст вам URL вида:
```
https://your-project-name.vercel.app
```

Обновите манифест с вашим URL:

```json
{
  "url": "https://your-project-name.vercel.app",
  "name": "CASA Token App",
  "iconUrl": "https://your-project-name.vercel.app/icon.svg",
  "termsOfUseUrl": "https://your-project-name.vercel.app/terms",
  "privacyPolicyUrl": "https://your-project-name.vercel.app/privacy"
}
```

И обновите код в `src/index.tsx`:
```typescript
const manifestUrl = 'https://your-project-name.vercel.app/tonconnect-manifest.json';
```

### 4. Проверка

После обновления:
1. Откройте ваше приложение
2. Нажмите "Connect Wallet"
3. Должен появиться список TON кошельков

## 🌐 Альтернативные платформы

### Netlify

1. Зайдите на [netlify.com](https://netlify.com)
2. Нажмите "New site from Git"
3. Выберите репозиторий
4. Настройки:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Деплой и обновление манифеста

### GitHub Pages

1. В настройках репозитория включите GitHub Pages
2. Выберите источник: GitHub Actions
3. Создайте `.github/workflows/deploy.yml`
4. Деплой и обновление манифеста

## 🔧 Локальная разработка

Для локальной разработки можно использовать:

### 1. ngrok (временное решение)

```bash
# Установите ngrok
npm install -g ngrok

# Запустите приложение
npm start

# В другом терминале запустите ngrok
ngrok http 3000
```

Получите HTTPS URL и обновите манифест.

### 2. localtunnel

```bash
# Установите localtunnel
npm install -g localtunnel

# Запустите приложение
npm start

# В другом терминале запустите localtunnel
lt --port 3000
```

## 📋 Чек-лист

- [ ] Создан аккаунт на Vercel/Netlify
- [ ] Репозиторий подключен
- [ ] Приложение развернуто
- [ ] Манифест обновлен с правильным URL
- [ ] Код обновлен с правильным URL
- [ ] TON Connect работает
- [ ] Кошелек подключается

## 🆘 Устранение проблем

### Ошибка 404 при подключении

**Причина:** Неправильный URL в манифесте

**Решение:**
1. Убедитесь, что URL соответствует вашему домену
2. Проверьте, что манифест доступен по URL
3. Убедитесь, что используется HTTPS

### Кошелек не подключается

**Причина:** Проблемы с манифестом

**Решение:**
1. Проверьте консоль браузера
2. Убедитесь, что манифест валиден
3. Проверьте, что все URL в манифесте корректны

## 🎯 Результат

После развертывания:
- ✅ Приложение доступно по HTTPS
- ✅ TON Connect работает
- ✅ Кошельки подключаются
- ✅ Все функции доступны

---

**Удачного развертывания! 🚀** 