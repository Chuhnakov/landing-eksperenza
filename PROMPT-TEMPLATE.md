# Промпт-шаблон: премиум-лендинг (полная версия)

Скопируйте блок ниже, заполните `[...]` и отправьте ассистенту.

---

```
Ты — эксперт по премиум-лендингам.

Создай одностраничный лендинг для: [НАЗВАНИЕ КОМПАНИИ / НИША]
Примеры: «Студия красоты Bloom», «Стоматология Smile», «Юридическая фирма Lex»

## Бренд
- Название: [НАЗВАНИЕ]
- Слоган: [СЛОГАН]
- Язык: [ru / en]
- Тон дизайна: [опиши — нежный женственный / строгий корпоративный / тёплый уютный / tech-минимализм и т.д.]
- Адрес: [АДРЕС]
- Телефон: [ТЕЛЕФОН]
- CTA-кнопка: [Записаться / Оставить заявку / Получить консультацию]
- Шрифты: заголовки [Cormorant / Playfair / Montserrat], текст [Nunito / Inter / Manrope]

## Фото и цвета
- Фото клиента лежат в `public/images/` (webp, png, jpg — любые форматы, имена могут содержать пробелы)
- Из фото / брендбука извлеки палитру 5–7 цветов
- Цвета ОБЯЗАТЕЛЬНО в `app/globals.css` → `@theme inline` (Tailwind v4!)
- Дублируй в `tailwind.config.ts`, но основной источник — `@theme inline`
- Подписи галереи — `lib/gallery-captions.ts` (ключ = точное имя файла)

## Стек
- Next.js App Router + TypeScript
- Tailwind CSS v4 (`@import "tailwindcss"`, `@config`, `@theme inline`)
- shadcn/ui (Card, Badge, Avatar, Carousel, Separator, Button)
- Lucide React
- БЕЗ Framer Motion для скрытия контента

## Секции (порядок)
1. Sticky Header — лого, якорная навигация, CTA
2. Hero — заголовок, описание, большая CTA, фото, 2–3 цифры
3. Услуги — 4 карточки (иконка, описание, цена «от …»)
4. Команда — 4 карточки (имя, роль, специализация)
5. Галерея — карусель Embla, все фото из `public/images/` автоматически
6. Отзывы — 3 карточки со звёздами
7. Форма заявки — имя, телефон, услуга, дата, комментарий
8. Контакты — адрес, телефон, режим, карта, соцсети, footer
9. Плавающая CTA-кнопка внизу экрана — ВСЕГДА видна

---

## КРИТИЧЕСКИЕ ПРАВИЛА (обязательно — из опыта продакшена)

### 1. Контент виден БЕЗ JavaScript
- ❌ ЗАПРЕЩЕНО: Framer Motion с `initial={{ opacity: 0 }}`, `whileInView`, `return null` до скролла
- ✅ motion-wrapper.tsx — только обычные `<div>`, без opacity:0
- ✅ Hero — обычные `<div>`, не motion.div с opacity:0
- Контент должен работать в Chrome и на телефоне сразу после загрузки HTML

### 2. Кнопки — обычный HTML
- ❌ ЗАПРЕЩЕНО: shadcn Button + `render={<a />}` для главных CTA
- ✅ Компонент `CtaLink` — `<a href="#booking">` + `buttonVariants`
- ✅ Submit формы: `<button type="submit">`
- ✅ Поля формы: класс `.input-field` в globals.css (белый фон, видимая рамка)

### 3. Плавающая CTA (внизу экрана)
- ❌ ЗАПРЕЩЕНО: useState + scroll + Intersection Observer (ненадёжно на телефонах)
- ✅ Server Component, без `"use client"`, без JavaScript
- ✅ `fixed inset-x-0 bottom-0 z-[9999]`
- ✅ `pb-[max(1rem,env(safe-area-inset-bottom))]` для iPhone
- ✅ Цвет кнопки inline: `bg-[#HEX]` (не только Tailwind-класс)
- ✅ У `main` добавь `pb-24`

### 4. Tailwind v4 — цвета
В `@theme inline` в globals.css:
```css
--color-brand-primary: #...;
--color-brand-accent: #...;
--color-brand-cream: #...;
--color-brand-charcoal: #...;
--background-image-section-texture: ...;
--shadow-soft: ...;
```
Привяжи shadcn CSS-переменные (`--primary`, `--background`) к палитре бренда.
`--font-heading: var(--font-heading)` — не подменяй на `--font-sans`!

### 5. Изображения
- `lib/get-site-images.ts` — `fs.readdirSync('public/images')`, фильтр: webp, png, jpg, jpeg, gif, avif
- URL: `encodeURIComponent(filename)` для пробелов и скобок в именах
- Hero: `salon-hero.*` → `XXXL.*` → первый файл
- ❌ Не хардкодить расширение .png если файлы .webp

### 6. Карточки и формы
- Карточки: `border border-brand/30 bg-white shadow-soft`
- Не использовать `bg-white/80` без видимой рамки

---

## Деплой — полная инфраструктура

### next.config.ts
```typescript
output: "standalone"
```

### package.json scripts
```json
"dev": "next dev --hostname 0.0.0.0",
"build:server": "next build && node scripts/pack-standalone.mjs",
"start:prod": "cross-env NODE_ENV=production node release/server.js"
```

### Зависимости dev
`cross-env`, `dotenv-cli`, `@netlify/plugin-nextjs` (если Netlify)

### scripts/pack-standalone.mjs
- Собирает `release/` из `.next/standalone` + `public/` + `.next/static/`
- Копирует всю папку `deploy/` и `.env.example`
- Создаёт `release/README.txt` с инструкцией «npm НЕ запускать на сервере»

### deploy/
- `install-server.sh` — читает `.env`, запускает PM2
- `ecosystem.config.cjs` — парсит `.env` из корня (fs.readFileSync), передаёт PORT, HOSTNAME, NEXT_PUBLIC_SITE_URL в PM2
- `nginx-ip.conf` — доступ по IP без домена
- `nginx.conf.example` — для домена + SSL
- `VDS-QUICKSTART.txt` — краткая инструкция

### .env.example
```env
NEXT_PUBLIC_SITE_URL=http://IP_ИЛИ_ДОМЕН
PORT=3000
HOSTNAME=0.0.0.0
DEPLOY_PATH=/var/www/[папка]
```

### netlify.toml (опционально)
```toml
[build]
  command = "npm run build"
  publish = ".next"
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### GitHub Actions — `.github/workflows/deploy.yml`
- Trigger: push main/master + workflow_dispatch
- Steps: npm ci → npm run build:server → rsync release/ на сервер (--exclude '.env') → pm2 restart
- Secret: SSH_PRIVATE_KEY
- Env: SSH_HOST, SSH_USER, DEPLOY_PATH

### README.md
Полная документация:
- Локальная разработка
- Структура проекта, gallery-captions
- Сборка release (только на ПК!)
- Ручной деплой VDS
- Nginx IP / домен
- GitHub Actions настройка
- Netlify
- pm2 команды

### .gitignore
```
/release/
.env*
!.env.example
```

---

## Структура файлов

```
app/layout.tsx, page.tsx, globals.css
components/landing/
  header.tsx, hero.tsx, services.tsx, masters.tsx (или team.tsx)
  gallery.tsx, reviews.tsx, booking-form.tsx, contacts.tsx
  floating-cta.tsx      # server component, всегда видна
  cta-link.tsx          # <a> + buttonVariants
  section-heading.tsx
  motion-wrapper.tsx    # только div-обёртки
lib/
  get-site-images.ts
  gallery-captions.ts
  site-config.ts
scripts/pack-standalone.mjs
deploy/ (install-server.sh, ecosystem.config.cjs, nginx-*.conf, VDS-QUICKSTART.txt)
.github/workflows/deploy.yml
netlify.toml
.env.example
README.md
public/images/
tailwind.config.ts
```

---

## VDS сервер (заполнить под клиента)
- IP: [89.19.215.214]
- Пользователь: [root]
- Папка: [/var/www/название]
- Доступ: http://IP:3000 (HOSTNAME=0.0.0.0) или http://IP через nginx

---

## Формат ответа
1. Палитра (таблица с HEX и ролью)
2. Структура проекта
3. Весь код
4. Краткая инструкция деплоя

## Чеклист перед сдачей
- [ ] `npm run build:server` проходит без ошибок
- [ ] release/ содержит deploy/install-server.sh и README.txt
- [ ] Нет opacity:0 в motion/анимациях
- [ ] Плавающая CTA — server component, z-[9999]
- [ ] Цвета в @theme inline
- [ ] Фото читаются динамически из public/images/
- [ ] CtaLink вместо Button+render для CTA
```

---

## Короткая версия (если лимит символов)

```
Создай премиум лендинг для [БИЗНЕС] — Next.js 16 + Tailwind v4 + shadcn/ui.
Секции: Header, Hero, Услуги, Команда, Галерея, Отзывы, Форма, Контакты.
Тон: [СТИЛЬ]. CTA: «[ТЕКСТ]». Язык: ru.

ОБЯЗАТЕЛЬНО (продакшен-правила):
- Цвета в @theme inline (Tailwind v4), палитра из фото
- Контент без JS: NO Framer Motion opacity:0, motion-wrapper = div
- CTA = CtaLink (<a>), floating-cta = server component, always visible, z-[9999], bg-[#hex]
- Фото: lib/get-site-images.ts (fs.readdirSync, webp/png/jpg), gallery-captions.ts
- Деплой: output standalone, scripts/pack-standalone.mjs → release/
- deploy/ (install-server.sh, ecosystem.cjs читает .env, nginx-ip.conf)
- GitHub Actions: build:server → rsync → pm2 restart
- README.md со всеми инструкциями
- netlify.toml с @netlify/plugin-nextjs

VDS: root@[IP]:/[путь]
Не запускать npm на сервере — только bash deploy/install-server.sh
```

---

## Пример заполненного промпта

```
Создай премиум лендинг для стоматологии «Smile Clinic».

Бренд:
- Слоган: «Улыбка, которой хочется делиться»
- Тон: чистый медицинский премиум, белый + бирюзовый + золото
- CTA: «Записаться на приём»
- Шрифты: Playfair Display + Inter
- Адрес: Москва, ул. Пример, 1
- Телефон: +7 (495) 000-00-00

Фото в public/images/ (webp).
VDS: root@123.45.67.89:/var/www/smile

[вставить полный шаблон выше]
```
