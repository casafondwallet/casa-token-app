#!/bin/bash

# Скрипт обновления CASA Token App на сервере
# Обновляет приложение с реальным адресом токена

echo "🔄 Начинаем обновление CASA Token App..."

# Переходим в директорию приложения
cd /home/casa-app/casa-token-app

# Обновляем код из репозитория
echo "📥 Обновляем код из репозитория..."
git pull origin main

# Создаем файл переменных окружения
echo "⚙️ Создаем переменные окружения..."
cat > .env.production << EOF
REACT_APP_TON_NETWORK=mainnet
REACT_APP_CASA_TOKEN_ADDRESS=EQBWK_VVEBJWiIQIIXOckUVw0HdF24buJiNiiR0dUHEe2xs4
REACT_APP_API_URL=https://your-api.com
REACT_APP_TON_CONNECT_MANIFEST_URL=https://wallet.casafond.org/tonconnect-manifest.json
EOF

# Обновляем TON Connect манифест
echo "🔗 Обновляем TON Connect манифест..."
cat > public/tonconnect-manifest.json << EOF
{
  "url": "https://wallet.casafond.org",
  "name": "CASA Token Wallet",
  "iconUrl": "https://wallet.casafond.org/icon.svg",
  "termsOfUseUrl": "https://wallet.casafond.org/terms",
  "privacyPolicyUrl": "https://wallet.casafond.org/privacy"
}
EOF

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
npm install

# Собираем приложение
echo "🔨 Собираем приложение..."
npm run build

# Перезапускаем приложение
echo "🚀 Перезапускаем приложение..."
pm2 restart casa-token-app
pm2 save

# Проверяем статус
echo "✅ Проверяем статус приложения..."
pm2 status

echo "🎉 Обновление завершено!"
echo "📊 Статус приложения:"
pm2 logs casa-token-app --lines 10 