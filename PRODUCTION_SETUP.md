# Настройка для продакшена

## 🚨 Важно! Текущая конфигурация для разработки

Сейчас приложение настроено для работы в режиме разработки с localhost. Для продакшена необходимо обновить конфигурацию.

## 🔧 Шаги для продакшена

### 1. Обновить манифест TON Connect

Замените содержимое `public/tonconnect-manifest.json`:

```json
{
  "url": "https://your-real-domain.com",
  "name": "CASA Token App",
  "iconUrl": "https://your-real-domain.com/icon.svg",
  "termsOfUseUrl": "https://your-real-domain.com/terms",
  "privacyPolicyUrl": "https://your-real-domain.com/privacy"
}
```

### 2. Обновить URL в коде

В файле `src/index.tsx` замените:

```typescript
const manifestUrl = 'https://your-real-domain.com/tonconnect-manifest.json';
```

### 3. Создать иконку

Замените `public/icon.svg` на вашу реальную иконку или создайте PNG версию:

```bash
# Создать PNG из SVG (если нужно)
# Используйте любой онлайн конвертер или графический редактор
```

### 4. Переменные окружения

Создайте файл `.env.production`:

```env
REACT_APP_TON_NETWORK=mainnet
REACT_APP_CASA_TOKEN_ADDRESS=EQD...
REACT_APP_API_URL=https://your-api.com
REACT_APP_TON_CONNECT_MANIFEST_URL=https://your-real-domain.com/tonconnect-manifest.json
```

## 🌐 Развертывание

### Netlify

1. Подключите репозиторий к Netlify
2. В настройках сайта добавьте переменные окружения
3. Обновите манифест с вашим доменом
4. Деплой автоматически запустится

### Vercel

1. Подключите репозиторий к Vercel
2. В настройках проекта добавьте переменные окружения
3. Обновите манифест с вашим доменом
4. Деплой автоматически запустится

### GitHub Pages

1. Обновите манифест с вашим доменом
2. Настройте GitHub Actions для деплоя
3. Включите GitHub Pages в настройках репозитория

## 🔍 Проверка

После развертывания проверьте:

1. **Манифест доступен:**
   ```
   https://your-domain.com/tonconnect-manifest.json
   ```

2. **Иконка загружается:**
   ```
   https://your-domain.com/icon.svg
   ```

3. **TON Connect работает:**
   - Откройте приложение
   - Нажмите "Connect Wallet"
   - Должен появиться список кошельков

## 🆘 Устранение проблем

### Ошибка 422 при подключении кошелька

**Причина:** Неправильный URL в манифесте

**Решение:**
1. Убедитесь, что URL в манифесте соответствует вашему домену
2. Проверьте, что манифест доступен по указанному URL
3. Убедитесь, что используется HTTPS в продакшене

### Кошелек не подключается

**Причина:** Проблемы с манифестом или доменом

**Решение:**
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что домен добавлен в белый список TON Connect
3. Проверьте, что манифест валиден

### Ошибки CORS

**Причина:** Неправильные настройки сервера

**Решение:**
1. Настройте CORS на вашем сервере
2. Убедитесь, что все необходимые заголовки установлены
3. Проверьте настройки безопасности

## 📋 Чек-лист продакшена

- [ ] Обновлен манифест с реальным доменом
- [ ] Обновлен URL в коде
- [ ] Добавлена иконка приложения
- [ ] Настроены переменные окружения
- [ ] Включен HTTPS
- [ ] Протестирована функциональность
- [ ] Проверена работа TON Connect
- [ ] Настроен мониторинг ошибок

## 🔗 Полезные ссылки

- [TON Connect Documentation](https://docs.ton.org/develop/dapps/ton-connect)
- [TON Connect Manifest Specification](https://docs.ton.org/develop/dapps/ton-connect/manifest)
- [TON Connect Wallet Integration](https://docs.ton.org/develop/dapps/ton-connect/wallet-integration)

---

**Удачного развертывания! 🚀** 