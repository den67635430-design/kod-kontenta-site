"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "hero",      label: "Главная",   color: "from-purple-600 to-purple-500",   border: "border-purple-500/50",  text: "text-purple-200" },
  { id: "services",  label: "Услуги",    color: "from-blue-600 to-blue-500",       border: "border-blue-500/50",    text: "text-blue-200" },
  { id: "portfolio", label: "Портфолио", color: "from-cyan-600 to-cyan-500",       border: "border-cyan-500/50",    text: "text-cyan-200" },
  { id: "news",      label: "Новости",   color: "from-emerald-600 to-emerald-500", border: "border-emerald-500/50", text: "text-emerald-200" },
  { id: "reviews",   label: "Отзывы",    color: "from-amber-600 to-amber-500",     border: "border-amber-500/50",   text: "text-amber-200" },
  { id: "contact",   label: "Контакты",  color: "from-rose-600 to-rose-500",       border: "border-rose-500/50",    text: "text-rose-200" },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}
      >
        <div className={`mx-4 xl:mx-8 flex items-center gap-4 transition-all duration-300 ${scrolled ? "glass rounded-2xl px-5 py-3" : "px-2 py-0"}`}>

          {/* Логотип */}
          <button onClick={() => handleNav("hero")} className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              КК
            </div>
            <span className="font-bold text-base text-white group-hover:text-purple-300 transition-all whitespace-nowrap">
              Код контента
            </span>
          </button>

          {/* Десктоп навигация — растянута на всю ширину */}
          <div className="hidden md:flex items-center justify-between flex-1 px-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  activeSection === item.id
                    ? `bg-gradient-to-r ${item.color} ${item.border} ${item.text} shadow-lg scale-105`
                    : `border-white/10 text-slate-400 hover:border-white/25 hover:text-white hover:bg-white/8 hover:scale-105`
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Правая часть */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="https://t.me/kontentcod"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 text-sm font-medium text-blue-300 hover:bg-blue-500/10 hover:text-white transition-all"
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
            className="md:hidden ml-auto w-9 h-9 glass rounded-xl flex items-center justify-center"
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
                    ? `bg-gradient-to-r ${item.color} ${item.text}`
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
