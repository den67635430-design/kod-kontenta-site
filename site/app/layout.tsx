import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CodeRain from "@/components/CodeRain";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Код контента — AI-агенты, чат-боты и автоматизация для бизнеса",
  description: "Создаём сайты, мобильные приложения, чат-боты и AI-ассистентов под ключ. Автоматизация бизнеса с помощью нейросетей.",
  keywords: "AI агенты, чат-боты, автоматизация, нейросети, создание сайтов, приложения, Telegram боты",
  openGraph: {
    title: "Код контента",
    description: "AI-агенты и автоматизация для вашего бизнеса",
    url: "https://kodkontenta.ru",
    siteName: "Код контента",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} antialiased`}>
        <CodeRain />
        {children}
      </body>
    </html>
  );
}
