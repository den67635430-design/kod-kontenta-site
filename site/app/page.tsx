"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import DemoSection from "@/components/DemoSection";
import PortfolioSection from "@/components/PortfolioSection";
import NewsSection from "@/components/NewsSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import LatiChat from "@/components/LatiChat";
import CookieBanner from "@/components/CookieBanner";
import Link from "next/link";

const SECTIONS = ["hero", "services", "portfolio", "news", "reviews", "contact"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  // Следим за активной секцией при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navigateTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div style={{ backgroundColor: "var(--bg-primary)" }}>
      <Navbar activeSection={activeSection} onNavigate={navigateTo} />

      <main>
        <div id="hero">
          <HeroSection onNavigate={navigateTo} />
        </div>

        {/* Разделитель */}
        <div className="divider mx-6 lg:mx-24" />

        <div id="services">
          <ServicesSection preview />
        </div>

        <div className="divider mx-6 lg:mx-24" />

        <div id="demo">
          <DemoSection />
        </div>

        <div className="divider mx-6 lg:mx-24" />

        <div id="portfolio">
          <PortfolioSection preview />
        </div>

        <div className="divider mx-6 lg:mx-24" />

        <div id="news">
          <NewsSection preview />
        </div>

        <div className="divider mx-6 lg:mx-24" />

        <div id="reviews">
          <ReviewsSection preview />
        </div>

        <div className="divider mx-6 lg:mx-24" />

        <div id="contact">
          <ContactSection />
        </div>
      </main>

      {/* SEO-секция — видимый текст с ключевыми словами */}
      <section className="py-16 border-t border-white/5">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-semibold gradient-text mb-3">AI-агенты и нейросотрудники</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Создаём ИИ-агентов и нейросотрудников для автоматизации бизнеса. AI-продавец, AI-бухгалтер, AI-менеджер, AI-парсер, AI-HR — нейросотрудник на любую должность работает 24/7.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold gradient-text mb-3">Автоматизация бизнес-процессов</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Автоматизируем продажи, поддержку, аналитику и документооборот. Интеграция с CRM, Bitrix24, amoCRM. Работаем на базе ChatGPT, Claude AI, Gemini, DeepSeek.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold gradient-text mb-3">Чат-боты для Telegram и WhatsApp</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Умные чат-боты для продаж, техподдержки и лидогенерации. AI-боты заменяют менеджеров и обрабатывают заявки автоматически. Готовый бот за 3–7 дней.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer с мини-ЛАТИ */}
      <footer className="border-t border-white/5 py-12">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Мини-ЛАТИ с поддержкой */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src="/mascot/lati.png" alt="ЛАТИ" className="w-16 h-16 object-contain"
                  style={{ filter: "drop-shadow(0 0 12px rgba(124,58,237,0.5))" }} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#07070f] animate-pulse" />
              </div>
              <div>
                <p className="text-white font-semibold">Нужна помощь?</p>
                <a href="https://t.me/Dikiy4747" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  Напишите Денису →
                </a>
              </div>
            </div>

            {/* Центр */}
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center mb-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xs">КК</div>
                <span className="text-white font-bold">Код контента</span>
              </div>
              <p className="text-slate-600 text-sm">© 2026 · AI-разработка для бизнеса</p>
              <div className="flex gap-3 mt-2 text-xs">
                <Link href="/privacy" className="text-slate-600 hover:text-slate-400 transition-colors">Конфиденциальность</Link>
                <Link href="/terms" className="text-slate-600 hover:text-slate-400 transition-colors">Соглашение</Link>
                <Link href="/offer" className="text-slate-600 hover:text-slate-400 transition-colors">Оферта</Link>
              </div>
            </div>

            {/* Контакты */}
            <div className="flex flex-col items-end gap-2 text-sm">
              <a href="https://t.me/kontentcod" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors">
                <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.27c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.998l-2.95-.924c-.643-.203-.657-.643.136-.953l11.527-4.444c.535-.194 1.002.131.37.571z"/>
                </svg>
                Канал @kontentcod
              </a>
              <a href="https://t.me/Dikiy4747" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors">
                <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.27c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.998l-2.95-.924c-.643-.203-.657-.643.136-.953l11.527-4.444c.535-.194 1.002.131.37.571z"/>
                </svg>
                Личка @Dikiy4747
              </a>
              <a href="https://kodkontenta.ru" className="text-slate-500 hover:text-slate-300 transition-colors">
                🌐 kodkontenta.ru
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI-ассистент ЛАТИ */}
      <LatiChat />
      <CookieBanner />
    </div>
  );
}
