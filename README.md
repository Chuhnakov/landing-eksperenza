# Эсперанза — лендинг студии красоты

> Шаблон промпта для создания такого же проекта под другую компанию: [`PROMPT-TEMPLATE.md`](./PROMPT-TEMPLATE.md)

Одностраничный сайт на **Next.js 16**, **Tailwind CSS v4**, **shadcn/ui**.

---

## Локальная разработка

```bash
npm install
npm run dev
```

Сайт: [http://localhost:3000](http://localhost:3000)

Доступ с телефона в той же Wi‑Fi сети: `http://IP_ВАШЕГО_ПК:3000`

---

## Структура проекта

```
app/                    # страницы и стили
components/landing/     # секции лендинга
lib/
  get-site-images.ts    # автоматически читает public/images/
  gallery-captions.ts   # подписи к фото галереи
  site-config.ts        # URL сайта из .env
public/images/          # фото (webp, png, jpg)
deploy/                 # скрипты для VDS
release/                # готовый сайт после сборки (не в git)
```

### Подписи к фото

Файл `lib/gallery-captions.ts`:

```typescript
export const galleryCaptions: Record<string, string> = {
  "XXXL.webp": "Зона брендинга",
  "XXXL (1).webp": "Маникюрная зона",
};
```

Ключ — **точное имя файла** из `public/images/`.

### Переменные окружения

Скопируйте `.env.example` → `.env`:

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Публичный адрес сайта (`http://IP` или `https://домен.ru`) |
| `PORT` | Порт Node.js (по умолчанию `3000`) |
| `HOSTNAME` | `0.0.0.0` — доступ по IP напрямую; `127.0.0.1` — только через nginx |
| `DEPLOY_PATH` | Папка на сервере (`/var/www/esperanza`) |

---

## Сборка для сервера

**Только на вашем ПК** (не на VDS):

```bash
npm run build:server
```

Создаётся папка **`release/`** — готовый сайт для загрузки на сервер.

> В `release/` нет `package.json`. Команды `npm install` / `npm run build` на сервере **не нужны**.

---

## Деплой на VDS (вручную)

Сервер: `root@89.19.215.214`  
Папка: `/var/www/esperanza`

### 1. Сборка на ПК

```bash
npm run build:server
```

### 2. Загрузка на сервер

```bash
scp -r release/* root@89.19.215.214:/var/www/esperanza/
```

Или через WinSCP / FileZilla (SFTP).

### 3. Настройка на сервере (первый раз)

```bash
ssh root@89.19.215.214
cd /var/www/esperanza

cp .env.example .env
nano .env
```

Содержимое `.env`:

```env
NEXT_PUBLIC_SITE_URL=http://89.19.215.214
PORT=3000
HOSTNAME=0.0.0.0
```

```bash
bash deploy/install-server.sh
```

### 4. Открыть сайт

- **Напрямую:** [http://89.19.215.214:3000](http://89.19.215.214:3000)
- **Через nginx (порт 80):** см. раздел ниже

### 5. Firewall (если сайт не открывается)

```bash
ufw allow 22/tcp
ufw allow 3000/tcp   # прямой доступ
ufw allow 80/tcp     # nginx
```

### Обновление вручную

```bash
# ПК
npm run build:server
scp -r release/* root@89.19.215.214:/var/www/esperanza/

# VDS
ssh root@89.19.215.214 "pm2 restart esperanza"
```

---

## Nginx (доступ без :3000)

На сервере (один раз):

```bash
apt install -y nginx
cd /var/www/esperanza
cp deploy/nginx-ip.conf /etc/nginx/sites-available/esperanza
ln -sf /etc/nginx/sites-available/esperanza /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

В `.env` смените:

```env
NEXT_PUBLIC_SITE_URL=http://89.19.215.214
HOSTNAME=127.0.0.1
```

```bash
pm2 restart esperanza
```

Сайт: [http://89.19.215.214](http://89.19.215.214)

### Когда появится домен

1. В `.env`: `NEXT_PUBLIC_SITE_URL=https://esperanza.ru`
2. `cp deploy/nginx.conf.example /etc/nginx/sites-available/esperanza` — замените `example.com`
3. `certbot --nginx -d esperanza.ru`
4. `pm2 restart esperanza`

---

## GitHub Actions (автодеплой)

При push в `main` / `master` проект собирается и заливается на сервер.

### Настройка (один раз)

1. **GitHub** → репозиторий → **Settings** → **Secrets and variables** → **Actions**

2. Добавьте секрет:

   | Имя | Значение |
   |-----|----------|
   | `SSH_PRIVATE_KEY` | Приватный SSH-ключ для `root@89.19.215.214` |

3. **На сервере** добавьте публичный ключ:

   ```bash
   # На ПК — если ключа ещё нет:
   ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_deploy

   # Скопировать публичный ключ на сервер:
   ssh-copy-id -i ~/.ssh/github_deploy.pub root@89.19.215.214

   # В GitHub Secret SSH_PRIVATE_KEY — содержимое ~/.ssh/github_deploy (приватный!)
   cat ~/.ssh/github_deploy
   ```

4. **На сервере** один раз установите Node.js и PM2:

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt install -y nodejs
   npm install -g pm2

   mkdir -p /var/www/esperanza
   cd /var/www/esperanza
   cp .env.example .env   # или создайте .env вручную
   nano .env
   ```

5. Push в `main` — деплой запустится автоматически.

   Или вручную: **Actions** → **Deploy to VDS** → **Run workflow**.

### Что делает workflow

1. `npm ci` + `npm run build:server`
2. `rsync release/` → `root@89.19.215.214:/var/www/esperanza/`
3. `pm2 restart esperanza` (или `install-server.sh` при первом деплое)

Файл: `.github/workflows/deploy.yml`

> Файл `.env` на сервере **не перезаписывается** при деплое.

---

## Деплой на Netlify

В репозитории есть `netlify.toml`.

**Build settings** в Netlify UI:

| Поле | Значение |
|------|----------|
| Build command | `npm run build` |
| Publish directory | `.next` (или пусто — задаёт плагин) |

> Не указывайте publish = корень репозитория — будет 404.

---

## Полезные команды на сервере

```bash
pm2 status              # статус
pm2 logs esperanza      # логи
pm2 restart esperanza   # перезапуск
systemctl status nginx  # nginx
curl http://127.0.0.1:3000   # проверка локально
```

---

## Скрипты npm

| Команда | Описание |
|---------|----------|
| `npm run dev` | Локальная разработка |
| `npm run build` | Сборка Next.js |
| `npm run build:server` | Сборка + папка `release/` для VDS |
| `npm run start` | Запуск dev-сборки |
| `npm run start:prod` | Запуск `release/server.js` локально |
