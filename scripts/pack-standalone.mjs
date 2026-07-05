/**
 * Собирает папку release/ для загрузки на веб-сервер.
 * Запуск: npm run build:server
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const standaloneDir = path.join(root, ".next", "standalone");
const releaseDir = path.join(root, "release");

function rmDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

if (!fs.existsSync(standaloneDir)) {
  console.error("❌ Нет .next/standalone — сначала выполните: npm run build");
  process.exit(1);
}

console.log("📦 Сборка release/ для веб-сервера...");

rmDir(releaseDir);
copyDir(standaloneDir, releaseDir);
copyDir(path.join(root, "public"), path.join(releaseDir, "public"));
copyDir(
  path.join(root, ".next", "static"),
  path.join(releaseDir, ".next", "static")
);

const envExample = path.join(root, ".env.example");
if (fs.existsSync(envExample)) {
  fs.copyFileSync(envExample, path.join(releaseDir, ".env.example"));
}

const deploySrc = path.join(root, "deploy");
const deployDest = path.join(releaseDir, "deploy");
if (fs.existsSync(deploySrc)) {
  copyDir(deploySrc, deployDest);
}

fs.copyFileSync(
  path.join(root, "deploy", "RELEASE-README.txt"),
  path.join(releaseDir, "README.txt")
);

console.log("");
console.log("✅ Готово: папка release/");
console.log("");
console.log("Дальше на сервере:");
console.log("  1. Скопируйте release/ → DEPLOY_PATH (см. .env.example)");
console.log("  2. cp .env.example .env && отредактируйте адрес сайта");
console.log("  3. bash deploy/install-server.sh");
console.log("");
