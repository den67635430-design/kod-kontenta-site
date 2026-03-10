"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import NewsSection from "@/components/NewsSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import LatiChat from "@/components/LatiChat";

const SECTIONS = ["hero", "services", "portfolio", "news", "reviews", "contact"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

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
          <ServicesSection />
        </div>

        <div className="divider mx-6 lg:mx-24" />

        <div id="portfolio">
          <PortfolioSection />
        </div>

        <div className="divider mx-6 lg:mx-24" />

        <div id="news">
          <NewsSection />
        </div>

        <div className="divider mx-6 lg:mx-24" />

        <div id="reviews">
          <ReviewsSection />
        </div>

        <div className="divider mx-6 lg:mx-24" />

        <div id="contact">
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-600 text-sm border-t border-white/5">
        <p>© 2026 Код контента · AI-разработка для бизнеса</p>
        <p className="mt-1">
          <a href="https://t.me/kontentcod" className="hover:text-slate-400 transition-colors">@kontentcod</a>
          {" · "}
          <a href="https://t.me/denis_kodkontenta" className="hover:text-slate-400 transition-colors">@denis_kodkontenta</a>
        </p>
      </footer>

      {/* AI-ассистент ЛАТИ */}
      <LatiChat />
    </div>
  );
}
