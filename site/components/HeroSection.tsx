"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const WORDS = ["сайты", "чат-боты", "AI-агентов", "приложения", "автоматизацию"];

interface HeroSectionProps {
  onNavigate: (id: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Typewriter эффект
  useEffect(() => {
    const word = WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, wordIndex]);

  // Воспроизводим случайное видео маскота
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Фоновые блобы */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-20 blob-animation"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 opacity-15 blob-animation"
          style={{ background: "radial-gradient(circle, #2563eb, transparent 70%)", animationDelay: "4s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 opacity-10 blob-animation"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)", animationDelay: "2s" }}
        />
        {/* Сетка */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка — текст */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="badge mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              AI-разработка для бизнеса
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Создаём{" "}
              <span className="gradient-text">
                {displayed}
                <span className="animate-pulse">|</span>
              </span>
              <br />
              <span className="text-white">для вашего бизнеса</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg"
            >
              Автоматизирую рутину с помощью AI. Telegram-боты, нейросотрудники,
              сайты и мобильные приложения под ключ — быстро и без лишних затрат.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <button onClick={() => onNavigate("contact")} className="btn-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Обсудить проект
              </button>
              <button onClick={() => onNavigate("portfolio")} className="btn-ghost">
                Смотреть работы
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>

            {/* Быстрые ссылки */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="https://t.me/kontentcod"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-slate-300 hover:text-white hover:border-blue-500/40 transition-all"
              >
                <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.27c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.998l-2.95-.924c-.643-.203-.657-.643.136-.953l11.527-4.444c.535-.194 1.002.131.37.571z"/>
                </svg>
                Канал @kontentcod
              </a>
              <a
                href="https://t.me/denis_kodkontenta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-slate-300 hover:text-white hover:border-purple-500/40 transition-all"
              >
                <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.27c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.998l-2.95-.924c-.643-.203-.657-.643.136-.953l11.527-4.444c.535-.194 1.002.131.37.571z"/>
                </svg>
                Написать лично
              </a>
            </motion.div>

            {/* Счётчики */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="flex gap-8 mt-10"
            >
              {[
                { value: "20+", label: "проектов" },
                { value: "3", label: "AI-продукта" },
                { value: "24/7", label: "поддержка" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Правая колонка — маскот ЛАТИ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="flex justify-center items-center"
          >
            <div className="relative">
              {/* Кольцо свечения */}
              <div
                className="absolute inset-0 rounded-full opacity-30 blob-animation"
                style={{
                  background: "radial-gradient(circle, #7c3aed 0%, #2563eb 50%, transparent 70%)",
                  filter: "blur(40px)",
                  transform: "scale(1.3)",
                }}
              />

              {/* Видео маскота */}
              <div className="relative float-animation">
                <video
                  ref={videoRef}
                  src="/mascot/lati.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-72 h-72 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 0 40px rgba(124, 58, 237, 0.4))" }}
                />
              </div>

              {/* Пузырь с приветствием */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -top-4 -right-4 glass rounded-2xl rounded-tr-sm px-4 py-3 max-w-48"
              >
                <p className="text-sm font-medium text-white">Привет! 👋</p>
                <p className="text-xs text-slate-400 mt-0.5">Я ЛАТИ — помогу автоматизировать ваш бизнес</p>
              </motion.div>

              {/* Плашка снизу */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass rounded-xl px-4 py-2 flex items-center gap-2 whitespace-nowrap"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-slate-300">Онлайн · готов к работе</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Прокрутка вниз */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={() => onNavigate("services")}
            className="flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <span className="text-xs">Узнать больше</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
