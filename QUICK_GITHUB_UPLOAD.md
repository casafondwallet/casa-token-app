# 🚀 Быстрая загрузка на GitHub

## 1. Установите Git (если не установлен)
- **Windows:** https://git-scm.com/download/win
- **Linux:** `sudo apt install git`
- **macOS:** `brew install git`

## 2. Создайте репозиторий на GitHub
1. Перейдите на [github.com](https://github.com)
2. Нажмите "New repository"
3. Название: `casa-token-app`
4. Описание: `CASA Token App - TON Blockchain Wallet`
5. **НЕ ставьте галочки** на README, .gitignore, license
6. Нажмите "Create repository"

## 3. Скопируйте URL репозитория
```
https://github.com/YOUR_USERNAME/casa-token-app.git
```

## 4. Выполните команды в терминале

```bash
# Настройка Git (замените на ваши данные)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Инициализация и загрузка
git init
git add .
git commit -m "Initial commit: CASA Token App with TON Connect"
git remote add origin https://github.com/YOUR_USERNAME/casa-token-app.git
git branch -M main
git push -u origin main
```

## 5. Проверьте результат
- Откройте https://github.com/YOUR_USERNAME/casa-token-app
- Убедитесь, что все файлы загружены

## ✅ Готово!
Теперь можно развертывать на VPS по инструкции `DEPLOYMENT_WITH_DOMAIN.md`

---

**ЗАМЕНИТЕ `YOUR_USERNAME` на ваше имя пользователя GitHub!** 