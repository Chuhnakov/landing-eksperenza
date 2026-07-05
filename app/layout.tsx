import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Эсперанза — студия красоты",
  description:
    "Премиальная студия красоты Эсперанза: маникюр, уход за кожей, стрижки и брови. Запишитесь онлайн.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${cormorant.variable} ${nunitoSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-esperanza-cream font-sans text-esperanza-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
