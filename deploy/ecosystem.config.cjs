/**
 * PM2 — читает .env из корня сайта (папка release на сервере).
 *
 * pm2 start deploy/ecosystem.config.cjs
 */
const fs = require("fs");
const path = require("path");

function loadEnv(filePath) {
  const env = {};
  if (!fs.existsSync(filePath)) return env;
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

const siteDir = path.join(__dirname, "..");
const fileEnv = loadEnv(path.join(siteDir, ".env"));

const port = fileEnv.PORT || process.env.PORT || "3000";
const hostname = fileEnv.HOSTNAME || process.env.HOSTNAME || "0.0.0.0";
const siteUrl =
  fileEnv.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  `http://${hostname === "0.0.0.0" ? "127.0.0.1" : hostname}:${port}`;

module.exports = {
  apps: [
    {
      name: "esperanza",
      script: "server.js",
      cwd: siteDir,
      instances: 1,
      autorestart: true,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
        PORT: port,
        HOSTNAME: hostname,
        NEXT_PUBLIC_SITE_URL: siteUrl,
      },
    },
  ],
};
