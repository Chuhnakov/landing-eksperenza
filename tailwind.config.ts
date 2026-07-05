import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        esperanza: {
          /** Основной — нежный пастельный розовый (кружки, подушка) */
          pink: "#F2B8C6",
          /** Пыльная роза — бархатная подушка маникюра */
          rose: "#D4899A",
          /** Акцент — золото (ручки, детали лампы) */
          gold: "#C9A962",
          /** Яркий акцент — неоновая фиолетовая арка */
          purple: "#D946EF",
          /** Фон — тёплый off-white */
          cream: "#FAF8F5",
          /** Секции — мраморный светло-серый */
          marble: "#EDECEA",
          /** Натуральный — дерево, pampas grass */
          wood: "#C4A882",
          /** Текст — глубокий charcoal */
          charcoal: "#2C2C2C",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "marble-texture":
          "radial-gradient(circle at 20% 30%, #ffffff 0%, transparent 50%), radial-gradient(circle at 80% 70%, #e8e6e3 0%, transparent 40%), linear-gradient(135deg, #f5f3f0 0%, #edecea 100%)",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(212, 137, 154, 0.15)",
        glow: "0 0 40px -8px rgba(217, 70, 239, 0.25)",
      },
    },
  },
};

export default config;
