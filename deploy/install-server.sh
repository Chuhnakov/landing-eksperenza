#!/usr/bin/env bash
# Запускать НА СЕРВЕРЕ из папки сайта (DEPLOY_PATH)
# Пример: cd /var/www/esperanza && bash deploy/install-server.sh

set -euo pipefail

SITE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SITE_DIR"

echo "→ Папка сайта: $SITE_DIR"

if [ ! -f "server.js" ]; then
  echo "❌ server.js не найден. Сначала загрузите папку release/ на сервер."
  exit 1
fi

if [ ! -f ".env" ]; then
  if [ -f ".env.example" ]; then
    cp .env.example .env
    echo "→ Создан .env из .env.example — отредактируйте NEXT_PUBLIC_SITE_URL!"
  else
    echo "⚠️  Файл .env не найден. Создайте его с PORT и NEXT_PUBLIC_SITE_URL."
  fi
fi

# shellcheck disable=SC1091
[ -f ".env" ] && set -a && source .env && set +a

PORT="${PORT:-3000}"
export PORT HOSTNAME="${HOSTNAME:-127.0.0.1}" NODE_ENV=production

if ! command -v pm2 &>/dev/null; then
  echo "→ Установка PM2..."
  npm install -g pm2
fi

echo "→ Запуск через PM2 (порт $PORT)..."
pm2 delete esperanza 2>/dev/null || true
pm2 start deploy/ecosystem.config.cjs
pm2 save

echo ""
echo "✅ Сайт запущен: http://127.0.0.1:$PORT"
echo ""
echo "Настройте nginx (см. deploy/nginx.conf.example) для домена."
echo "Проверка: pm2 status && pm2 logs esperanza"
