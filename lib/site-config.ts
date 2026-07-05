/** Публичный адрес сайта — для metadata, canonical и т.д. */
export const siteConfig = {
  name: "Эсперанза",
  title: "Эсперанза — студия красоты",
  description:
    "Премиальная студия красоты Эсперанза: маникюр, уход за кожей, стрижки и брови. Запишитесь онлайн.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Порт Node.js на сервере (за nginx) */
  port: Number(process.env.PORT ?? 3000),
};
