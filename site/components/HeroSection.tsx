"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const WORDS = ["AI-агентов", "чат-ботов", "нейросотрудников", "автоматизации", "приложений"];

interface HeroSectionProps {
  onNavigate: (id: string) => void;
  onOpenChat?: () => void;
}

export default function HeroSection({ onNavigate, onOpenChat }: HeroSectionProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const word = WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 130);
      } else {
        timeout = setTimeout(() => setTyping(false), 4000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 70);
      } else {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, wordIndex]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-[600px] h-[600px] opacity-15 blob-animation"
          style={{ background: "radial-gradient(circle, #C9A84C, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-[15%] w-[400px] h-[400px] opacity-10 blob-animation"
          style={{ background: "radial-gradient(circle, #9A7A2E, transparent 70%)", animationDelay: "4s" }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }} />
      </div>

      {/* ЛАТИ — правый угол, кликабельный чат */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
        className="absolute right-4 xl:right-6 top-16 hidden md:flex flex-col items-center z-20 float-animation"
        style={{ width: "190px" }}
      >
        {/* Видео ЛАТИ — кликабельное */}
        <div onClick={onOpenChat} style={{ cursor: "pointer" }}>
          <video
            ref={videoRef}
            src="/mascot/lati.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "190px", height: "190px", objectFit: "contain", filter: "drop-shadow(0 0 30px rgba(201,168,76,0.5))" }}
          />
        </div>
        {/* Надпись под ЛАТИ */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 180 }}
          onClick={onOpenChat}
          style={{
            width: "190px",
            background: "linear-gradient(135deg, #9A7A2E 0%, #C9A84C 100%)",
            border: "2px solid rgba(255,255,255,0.20)",
            boxShadow: "0 8px 30px rgba(201,168,76,0.35)",
            borderRadius: "16px",
            marginTop: "8px",
            padding: "10px 14px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <p className="text-sm font-bold text-white">Привет! 👋</p>
          <p className="text-xs font-medium text-white mt-1 leading-snug" style={{ opacity: 0.9 }}>
            Нажмите — задайте вопрос!
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-white" style={{ opacity: 0.8 }}>Онлайн · готов к работе</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="container-wide relative z-10 pt-28 pb-16 w-full">
        <div className="max-w-2xl flex flex-col justify-center" style={{ minHeight: "80vh" }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="badge mb-8 self-start">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            AI-разработка для бизнеса
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-6xl xl:text-7xl font-bold mb-4" style={{ lineHeight: 1.05 }}>
            <span className="gradient-text">Автоматизация бизнеса</span>
            <br /><span className="text-white">под ваши задачи</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-2xl font-semibold text-white mb-6">
            Ваш бизнес работает 24/7. Даже когда вы спите.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-xl text-slate-400 leading-relaxed mb-10 max-w-xl">
            Telegram-боты, нейросотрудники, сайты и приложения под ключ.
            Меньше рутины. Больше прибыли. Свободное время — ваше.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-4 mb-10">
            <button onClick={() => onNavigate("contact")} className="btn-primary text-base px-8 py-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Обсудить проект
            </button>
            <button onClick={() => onNavigate("portfolio")} className="btn-ghost text-base px-8 py-4">
              Смотреть работы
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 mb-12">
            <a href="https://t.me/kontentcod" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl glass text-sm text-slate-300 hover:text-white transition-all">
              <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.27c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.998l-2.95-.924c-.643-.203-.657-.643.136-.953l11.527-4.444c.535-.194 1.002.131.37.571z"/>
              </svg>
              Канал @kontentcod
            </a>
            <a href="https://t.me/Dikiy4747" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl glass text-sm text-slate-300 hover:text-white transition-all">
              <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.27c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.998l-2.95-.924c-.643-.203-.657-.643.136-.953l11.527-4.444c.535-.194 1.002.131.37.571z"/>
              </svg>
              Написать лично
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            className="flex gap-12">
            {[
              { value: "20+", label: "проектов" },
              { value: "3", label: "AI-продукта" },
              { value: "24/7", label: "поддержка" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold gradient-text">{s.value}</div>
                <div className="text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="flex justify-center mt-6">
          <button onClick={() => onNavigate("services")}
            className="flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors">
            <span className="text-sm">Узнать больше</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
