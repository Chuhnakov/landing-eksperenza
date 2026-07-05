import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Минимальная сборка для VPS: npm run build:server → папка release/ */
  output: "standalone",
};

export default nextConfig;
