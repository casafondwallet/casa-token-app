# Развертывание CASA Token App на VPS

## 🖥️ Требования к VPS

### Минимальные характеристики:
- **CPU:** 1-2 ядра
- **RAM:** 1-2 GB
- **SSD:** 10-20 GB
- **ОС:** Ubuntu 20.04/22.04

### Рекомендуемые характеристики:
- **CPU:** 2-4 ядра
- **RAM:** 4 GB
- **SSD:** 40 GB
- **Сеть:** 1 Gbps

## 🚀 Пошаговое развертывание

### 1. Подготовка сервера

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка необходимых пакетов
sudo apt install -y curl wget git nginx certbot python3-certbot-nginx

# Установка Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Проверка версий
node --version
npm --version
```

### 2. Настройка пользователя

```bash
# Создание пользователя для приложения
sudo adduser casa-app
sudo usermod -aG sudo casa-app

# Переключение на пользователя
su - casa-app
```

### 3. Клонирование и настройка приложения

```bash
# Клонирование репозитория
git clone https://github.com/your-username/casa-token-app.git
cd casa-token-app

# Установка зависимостей
npm install

# Сборка приложения
npm run build
```

### 4. Обновление конфигурации TON Connect

**public/tonconnect-manifest.json:**
```json
{
  "url": "https://your-domain.com",
  "name": "CASA Token App",
  "iconUrl": "https://your-domain.com/icon.svg",
  "termsOfUseUrl": "https://your-domain.com/terms",
  "privacyPolicyUrl": "https://your-domain.com/privacy"
}
```

**src/index.tsx:**
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const manifestUrl = 'https://your-domain.com/tonconnect-manifest.json';

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

### 5. Настройка PM2

```bash
# Установка PM2
npm install -g pm2

# Создание ecosystem.config.js
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'casa-token-app',
    script: 'npm',
    args: 'start',
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

# Запуск приложения
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 6. Настройка Nginx

```bash
# Создание конфигурации Nginx
sudo tee /etc/nginx/sites-available/casa-token-app << EOF
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location /tonconnect-manifest.json {
        alias /home/casa-app/casa-token-app/public/tonconnect-manifest.json;
        add_header Content-Type application/json;
    }

    location /icon.svg {
        alias /home/casa-app/casa-token-app/public/icon.svg;
        add_header Content-Type image/svg+xml;
    }
}
EOF

# Активация сайта
sudo ln -s /etc/nginx/sites-available/casa-token-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7. Настройка SSL (Let's Encrypt)

```bash
# Получение SSL сертификата
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Автоматическое обновление сертификата
sudo crontab -e
# Добавить строку:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

### 8. Настройка файрвола

```bash
# Установка UFW
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 🔧 Дополнительные настройки

### Мониторинг и логи

```bash
# Просмотр логов PM2
pm2 logs casa-token-app

# Просмотр логов Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Мониторинг ресурсов
htop
df -h
free -h
```

### Автоматическое обновление

```bash
# Создание скрипта обновления
cat > update-app.sh << 'EOF'
#!/bin/bash
cd /home/casa-app/casa-token-app
git pull origin main
npm install
npm run build
pm2 restart casa-token-app
EOF

chmod +x update-app.sh
```

### Резервное копирование

```bash
# Создание скрипта бэкапа
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/casa-app/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/casa-app-$DATE.tar.gz /home/casa-app/casa-token-app
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
EOF

chmod +x backup.sh
```

## 📊 Мониторинг производительности

### Рекомендуемые метрики:
- **CPU:** < 70%
- **RAM:** < 80%
- **Диск:** < 80%
- **Сеть:** Мониторинг трафика

### Инструменты мониторинга:
- **htop** - мониторинг процессов
- **iotop** - мониторинг диска
- **nethogs** - мониторинг сети
- **Prometheus + Grafana** - продвинутый мониторинг

## 🆘 Устранение проблем

### Приложение не запускается:
```bash
# Проверка статуса PM2
pm2 status
pm2 logs casa-token-app

# Проверка портов
sudo netstat -tlnp | grep :3000
```

### Nginx ошибки:
```bash
# Проверка конфигурации
sudo nginx -t

# Просмотр логов
sudo tail -f /var/log/nginx/error.log
```

### SSL проблемы:
```bash
# Проверка сертификата
sudo certbot certificates

# Обновление сертификата
sudo certbot renew --dry-run
```

## 💰 Стоимость VPS

### Бюджетные варианты:
- **DigitalOcean:** $5-10/месяц
- **Vultr:** $5-10/месяц
- **Linode:** $5-10/месяц

### Премиум варианты:
- **AWS EC2:** $10-50/месяц
- **Google Cloud:** $10-50/месяц
- **Azure:** $10-50/месяц

## 🎯 Результат

После развертывания:
- ✅ Приложение доступно по HTTPS
- ✅ TON Connect работает
- ✅ Автоматический перезапуск
- ✅ SSL сертификат
- ✅ Мониторинг и логи
- ✅ Резервное копирование

---

**VPS готов к работе! 🚀** 