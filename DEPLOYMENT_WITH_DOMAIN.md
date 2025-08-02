# Развертывание CASA Token App на VPS с доменом wallet.casafond.org

## 🎯 Подготовка

### Требования:
- VPS с Ubuntu 20.04/22.04
- Домен `wallet.casafond.org` настроен на VPS
- SSH доступ к серверу

### Рекомендуемые характеристики VPS:
- **CPU:** 2-4 ядра
- **RAM:** 4 GB
- **SSD:** 40 GB
- **Сеть:** 1 Gbps

## 🚀 Пошаговое развертывание

### 1. Подключение к серверу

```bash
ssh root@your-server-ip
```

### 2. Подготовка системы

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка необходимых пакетов
sudo apt install -y curl wget git nginx certbot python3-certbot-nginx ufw

# Установка Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Проверка версий
node --version
npm --version
```

### 3. Настройка пользователя

```bash
# Создание пользователя для приложения
sudo adduser casa-app
sudo usermod -aG sudo casa-app

# Переключение на пользователя
su - casa-app
```

### 4. Клонирование и настройка приложения

```bash
# Клонирование репозитория
git clone https://github.com/casafondwallet/casa-token-app.git
cd casa-token-app

# Установка зависимостей
npm install

# Сборка приложения
npm run build
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

### 6. Настройка Nginx для домена

```bash
# Создание конфигурации Nginx
sudo tee /etc/nginx/sites-available/wallet.casafond.org << EOF
server {
    listen 80;
    server_name wallet.casafond.org www.wallet.casafond.org;

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
        add_header Access-Control-Allow-Origin *;
    }

    location /icon.svg {
        alias /home/casa-app/casa-token-app/public/icon.svg;
        add_header Content-Type image/svg+xml;
        add_header Access-Control-Allow-Origin *;
    }

    # Кэширование статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Активация сайта
sudo ln -s /etc/nginx/sites-available/wallet.casafond.org /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### 7. Настройка SSL (Let's Encrypt)

```bash
# Получение SSL сертификата
sudo certbot --nginx -d wallet.casafond.org -d www.wallet.casafond.org

# Автоматическое обновление сертификата
sudo crontab -e
# Добавить строку:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

### 8. Настройка файрвола

```bash
# Настройка UFW
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 🔧 Дополнительные настройки

### Мониторинг

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
echo "App updated at $(date)" >> /home/casa-app/update.log
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
echo "Backup created at $(date)" >> /home/casa-app/backup.log
EOF

chmod +x backup.sh
```

## 🌐 Настройка DNS

### Убедитесь, что DNS записи настроены:

```bash
# Проверка DNS
nslookup wallet.casafond.org
dig wallet.casafond.org

# Должны указывать на IP вашего VPS
```

### Необходимые DNS записи:
- **A запись:** `wallet.casafond.org` → IP вашего VPS
- **CNAME запись:** `www.wallet.casafond.org` → `wallet.casafond.org`

## 🧪 Тестирование

### Проверка работы приложения:

```bash
# Проверка статуса PM2
pm2 status

# Проверка портов
sudo netstat -tlnp | grep :3000

# Проверка Nginx
sudo nginx -t
sudo systemctl status nginx

# Проверка SSL
sudo certbot certificates
```

### Тестирование TON Connect:

1. Откройте https://wallet.casafond.org
2. Нажмите "Connect Wallet"
3. Выберите кошелек (Tonkeeper, TonHub, etc.)
4. Подключитесь
5. Проверьте все функции

## 🆘 Устранение проблем

### Приложение не запускается:
```bash
pm2 status
pm2 logs casa-token-app
sudo netstat -tlnp | grep :3000
```

### Nginx ошибки:
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

### SSL проблемы:
```bash
sudo certbot certificates
sudo certbot renew --dry-run
```

### TON Connect не работает:
```bash
# Проверьте доступность манифеста
curl https://wallet.casafond.org/tonconnect-manifest.json

# Проверьте CORS заголовки
curl -I https://wallet.casafond.org/tonconnect-manifest.json
```

## 📊 Мониторинг производительности

### Рекомендуемые метрики:
- **CPU:** < 70%
- **RAM:** < 80%
- **Диск:** < 80%
- **Сеть:** Мониторинг трафика

### Инструменты:
```bash
# Установка дополнительных инструментов
sudo apt install -y htop iotop nethogs

# Мониторинг в реальном времени
htop
iotop
nethogs
```

## 🎯 Результат

После развертывания:
- ✅ Приложение доступно по https://wallet.casafond.org
- ✅ TON Connect работает полноценно
- ✅ SSL сертификат настроен
- ✅ Автоматический перезапуск
- ✅ Мониторинг и логи
- ✅ Резервное копирование

## 🔄 Обновление приложения

```bash
# Автоматическое обновление
./update-app.sh

# Или вручную
cd /home/casa-app/casa-token-app
git pull origin main
npm install
npm run build
pm2 restart casa-token-app
```

---

**CASA Token App готов к работе на https://wallet.casafond.org! 🚀** 