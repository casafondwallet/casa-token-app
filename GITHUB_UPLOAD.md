# Загрузка CASA Token App на GitHub

## 🔧 Установка Git

### Windows:
1. **Скачайте Git:** https://git-scm.com/download/win
2. **Установите** с настройками по умолчанию
3. **Перезапустите PowerShell/Command Prompt**

### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install git
```

### macOS:
```bash
# Через Homebrew
brew install git

# Или скачайте с https://git-scm.com/download/mac
```

## 🚀 Создание GitHub репозитория

### 1. Создайте репозиторий на GitHub:
1. Перейдите на [github.com](https://github.com)
2. Нажмите "New repository" (зеленая кнопка)
3. Заполните форму:
   - **Repository name:** `casa-token-app`
   - **Description:** `CASA Token App - TON Blockchain Wallet`
   - **Visibility:** Public (или Private)
   - **НЕ ставьте галочки** на README, .gitignore, license
4. Нажмите "Create repository"

### 2. Скопируйте URL репозитория:
```
https://github.com/YOUR_USERNAME/casa-token-app.git
```

## 📁 Подготовка проекта

### 1. Создайте .gitignore файл:
```bash
# Создайте файл .gitignore в корне проекта
touch .gitignore
```

**Содержимое .gitignore:**
```
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
Thumbs.db
```

### 2. Инициализация Git:
```bash
# Инициализация Git репозитория
git init

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "Initial commit: CASA Token App"

# Добавление удаленного репозитория (замените YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/casa-token-app.git

# Отправка на GitHub
git branch -M main
git push -u origin main
```

## 🔄 Полные команды для выполнения:

```bash
# 1. Создайте .gitignore
echo "# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
Thumbs.db" > .gitignore

# 2. Инициализация Git
git init

# 3. Добавление файлов
git add .

# 4. Первый коммит
git commit -m "Initial commit: CASA Token App with TON Connect"

# 5. Добавление удаленного репозитория (ЗАМЕНИТЕ YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/casa-token-app.git

# 6. Отправка на GitHub
git branch -M main
git push -u origin main
```

## 🎯 После загрузки на GitHub:

### 1. Проверьте репозиторий:
- Откройте https://github.com/YOUR_USERNAME/casa-token-app
- Убедитесь, что все файлы загружены

### 2. Обновите инструкцию развертывания:
В файле `DEPLOYMENT_WITH_DOMAIN.md` замените:
```bash
git clone https://github.com/your-username/casa-token-app.git
```
на:
```bash
git clone https://github.com/YOUR_USERNAME/casa-token-app.git
```

## 📋 Чек-лист:

- [ ] Git установлен
- [ ] GitHub репозиторий создан
- [ ] .gitignore файл создан
- [ ] Проект инициализирован с Git
- [ ] Файлы добавлены в коммит
- [ ] Проект загружен на GitHub
- [ ] URL репозитория скопирован для развертывания

## 🆘 Если возникли проблемы:

### Ошибка "git not found":
- Установите Git: https://git-scm.com/downloads
- Перезапустите терминал

### Ошибка аутентификации:
```bash
# Настройте Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Или используйте GitHub CLI
gh auth login
```

### Ошибка push:
```bash
# Проверьте URL репозитория
git remote -v

# Если нужно изменить URL
git remote set-url origin https://github.com/YOUR_USERNAME/casa-token-app.git
```

---

**После загрузки на GitHub проект будет готов к развертыванию на VPS! 🚀** 