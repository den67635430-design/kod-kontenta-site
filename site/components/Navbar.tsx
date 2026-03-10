"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "hero", label: "Главная" },
  { id: "services", label: "Услуги" },
  { id: "portfolio", label: "Портфолио" },
  { id: "news", label: "Новости" },
  { id: "reviews", label: "Отзывы" },
  { id: "contact", label: "Контакты" },
];

interface NavbarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div
          className={`mx-auto max-w-6xl px-6 flex items-center justify-between rounded-2xl transition-all duration-300 ${
            scrolled ? "glass py-3 mx-4" : "py-0"
          }`}
        >
          {/* Логотип */}
          <button
            onClick={() => handleNav("hero")}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              КК
            </div>
            <span className="font-bold text-lg text-white group-hover:gradient-text transition-all">
              Код контента
            </span>
          </button>

          {/* Десктоп навигация */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA + Telegram */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://t.me/kontentcod"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.27c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.998l-2.95-.924c-.643-.203-.657-.643.136-.953l11.527-4.444c.535-.194 1.002.131.37.571z"/>
              </svg>
              Канал
            </a>
            <button
              onClick={() => handleNav("contact")}
              className="btn-primary text-sm py-2 px-5"
            >
              Связаться
            </button>
          </div>

          {/* Мобильное меню */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 glass rounded-xl flex items-center justify-center"
          >
            <div className="space-y-1.5">
              <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Мобильное выпадающее меню */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-40 glass rounded-2xl p-4 space-y-1"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-purple-600/20 text-purple-300"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 flex gap-2">
              <a
                href="https://t.me/kontentcod"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm py-2 flex-1 justify-center"
              >
                TG Канал
              </a>
              <button
                onClick={() => handleNav("contact")}
                className="btn-primary text-sm py-2 flex-1 justify-center"
              >
                Связаться
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
