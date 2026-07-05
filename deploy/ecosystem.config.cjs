/**
 * PM2 — автозапуск Node.js на сервере.
 *
 * Установка на сервере:
 *   npm install -g pm2
 *
 * Запуск из папки сайта (DEPLOY_PATH):
 *   pm2 start deploy/ecosystem.config.cjs
 *   pm2 save
 *   pm2 startup
 */
module.exports = {
  apps: [
    {
      name: "esperanza",
      script: "server.js",
      cwd: __dirname + "/..",
      instances: 1,
      autorestart: true,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
