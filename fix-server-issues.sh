#!/bin/bash

# Скрипт для исправления проблем на сервере

echo "🔧 Исправляем проблемы на сервере..."

# Переходим в директорию приложения
cd /home/casa-app/casa-token-app

# 1. Сохраняем локальные изменения
echo "💾 Сохраняем локальные изменения..."
git stash

# 2. Обновляем код из репозитория
echo "📥 Обновляем код из репозитория..."
git pull origin main

# 3. Восстанавливаем локальные изменения
echo "🔄 Восстанавливаем локальные изменения..."
git stash pop

# 4. Исправляем права доступа
echo "🔐 Исправляем права доступа..."
sudo chown -R casa-app:casa-app /home/casa-app/casa-token-app
chmod -R 755 /home/casa-app/casa-token-app

# 5. Удаляем старую папку build
echo "🗑️ Удаляем старую папку build..."
rm -rf build

# 6. Создаем файл переменных окружения
echo "⚙️ Создаем переменные окружения..."
cat > .env.production << EOF
REACT_APP_TON_NETWORK=mainnet
REACT_APP_CASA_TOKEN_ADDRESS=EQBWK_VVEBJWiIQIIXOckUVw0HdF24buJiNiiR0dUHEe2xs4
REACT_APP_API_URL=https://your-api.com
REACT_APP_TON_CONNECT_MANIFEST_URL=https://wallet.casafond.org/tonconnect-manifest.json
REACT_APP_TON_API_KEY=50ffa2414cc3cc0f125068e6990a0d705dc2e4743240ab65535cc8921d0d635a
REACT_APP_COINGECKO_API_URL=https://api.coingecko.com/api/v3
EOF

# 7. Обновляем TON Connect манифест
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

# 8. Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
npm install

# 9. Собираем приложение
echo "🔨 Собираем приложение..."
npm run build

# 10. Останавливаем текущий процесс
echo "⏹️ Останавливаем текущий процесс..."
pm2 stop casa-token-app

# 11. Обновляем ecosystem.config.js для продакшена
echo "⚙️ Обновляем конфигурацию PM2..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'casa-token-app',
    script: 'serve',
    args: '-s build -l 3000',
    cwd: '/home/casa-app/casa-token-app',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
EOF

# 12. Устанавливаем serve для продакшена
echo "📦 Устанавливаем serve..."
npm install -g serve

# 13. Запускаем приложение
echo "🚀 Запускаем приложение..."
pm2 start ecosystem.config.js
pm2 save

# 14. Проверяем статус
echo "✅ Проверяем статус приложения..."
pm2 status

echo "🎉 Исправление завершено!"
echo "📊 Статус приложения:"
pm2 logs casa-token-app --lines 10 