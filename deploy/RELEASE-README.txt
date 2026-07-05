═══════════════════════════════════════════════════════════════
  ЭТО ГОТОВЫЙ САЙТ — НЕ ЗДЕСЬ ЗАПУСКАТЬ npm run build:server
═══════════════════════════════════════════════════════════════

Сборка (npm run build:server) — ТОЛЬКО на вашем компьютере.
На сервере npm install / npm run build НЕ НУЖНЫ.

─── НА СЕРВЕРЕ (VDS) ─────────────────────────────────────────

1. Скопируйте ВСЁ содержимое этой папки в /var/www/esperanza/

2. Создайте .env:
   cp .env.example .env
   nano .env

   NEXT_PUBLIC_SITE_URL=http://ВАШ_IP
   PORT=3000
   HOSTNAME=0.0.0.0

3. Запуск:
   bash deploy/install-server.sh

4. Открыть: http://ВАШ_IP:3000
   (или http://ВАШ_IP если настроен nginx)

─── ОБНОВЛЕНИЕ САЙТА ─────────────────────────────────────────

На ПК:    npm run build:server
          scp -r release/* root@IP:/var/www/esperanza/

На VDS:   pm2 restart esperanza

═══════════════════════════════════════════════════════════════
