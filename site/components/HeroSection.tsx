"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const WORDS = ["\u0441\u0430\u0439\u0442\u044b", "\u0447\u0430\u0442-\u0431\u043e\u0442\u044b", "AI-\u0430\u0433\u0435\u043d\u0442\u043e\u0432", "\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f", "\u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044e"];

interface HeroSectionProps {
  onNavigate: (id: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-[600px] h-[600px] opacity-20 blob-animation"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-[15%] w-[400px] h-[400px] opacity-15 blob-animation"
          style={{ background: "radial-gradient(circle, #2563eb, transparent 70%)", animationDelay: "4s" }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }} />
      </div>

      <div className="container-wide relative z-10 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-0 items-center" style={{ minHeight: "80vh" }}>

          <div className="flex flex-col justify-center lg:pr-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="badge mb-8 self-start">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              AI-\u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u0434\u043b\u044f \u0431\u0438\u0437\u043d\u0435\u0441\u0430
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-6xl xl:text-7xl font-bold leading-tight mb-8"
              style={{ lineHeight: 1.05 }}>
              <span className="text-white">\u0421\u043e\u0437\u0434\u0430\u0451\u043c </span>
              <span className="gradient-text">{displayed}<span className="animate-pulse">|</span></span>
              <br /><span className="text-white">\u0434\u043b\u044f \u0432\u0430\u0448\u0435\u0433\u043e \u0431\u0438\u0437\u043d\u0435\u0441\u0430</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="text-xl text-slate-400 leading-relaxed mb-10 max-w-xl">
              Telegram-\u0431\u043e\u0442\u044b, \u043d\u0435\u0439\u0440\u043e\u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0438, \u0441\u0430\u0439\u0442\u044b \u0438 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f \u043f\u043e\u0434 \u043a\u043b\u044e\u0447.
              \u0410\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0438\u0440\u0443\u044e \u0431\u0438\u0437\u043d\u0435\u0441 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e AI \u2014 \u0431\u044b\u0441\u0442\u0440\u043e \u0438 \u0431\u0435\u0437 \u043b\u0438\u0448\u043d\u0438\u0445 \u0437\u0430\u0442\u0440\u0430\u0442.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-4 mb-10">
              <button onClick={() => onNavigate("contact")} className="btn-primary text-base px-8 py-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                \u041e\u0431\u0441\u0443\u0434\u0438\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442
              </button>
              <button onClick={() => onNavigate("portfolio")} className="btn-ghost text-base px-8 py-4">
                \u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0440\u0430\u0431\u043e\u0442\u044b
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 mb-12">
              <a href="https://t.me/kontentcod" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl glass text-sm text-slate-300 hover:text-white transition-all">
                <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.27c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.998l-2.95-.924c-.643-.203-.657-.643.136-.953l11.527-4.444c.535-.194 1.002.131.37.571z"/>
                </svg>
                \u041a\u0430\u043d\u0430\u043b @kontentcod
              </a>
              <a href="https://t.me/denis_kodkontenta" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl glass text-sm text-slate-300 hover:text-white transition-all">
                <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.27c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.998l-2.95-.924c-.643-.203-.657-.643.136-.953l11.527-4.444c.535-.194 1.002.131.37.571z"/>
                </svg>
                \u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u043b\u0438\u0447\u043d\u043e
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
              className="flex gap-12">
              {[{ value: "20+", label: "\u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432" }, { value: "3", label: "AI-\u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0430" }, { value: "24/7", label: "\u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430" }].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold gradient-text">{s.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* LATI - large, right side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="flex justify-end items-center relative"
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(circle at 65% 50%, rgba(124,58,237,0.22) 0%, transparent 60%)" }} />

            <div className="relative float-animation">
              <video ref={videoRef} src="/mascot/lati.mp4" autoPlay loop muted playsInline
                className="w-[460px] h-[460px] xl:w-[560px] xl:h-[560px] object-contain relative z-10"
                style={{ filter: "drop-shadow(0 0 80px rgba(124,58,237,0.55))" }} />

              {/* \u042f\u0440\u043a\u0438\u0439 \u043f\u0443\u0437\u044b\u0440\u044c */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, type: "spring", stiffness: 180 }}
                className="absolute top-8 -left-4 z-20 rounded-2xl rounded-tl-sm px-5 py-4"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
                  border: "2px solid rgba(255,255,255,0.35)",
                  boxShadow: "0 16px 48px rgba(124,58,237,0.75), 0 0 0 1px rgba(255,255,255,0.12)",
                  minWidth: "230px",
                }}
              >
                <p className="text-lg font-bold text-white">\u041f\u0440\u0438\u0432\u0435\u0442! \ud83d\udc4b</p>
                <p className="text-sm font-medium text-white mt-1 leading-relaxed" style={{ opacity: 0.9 }}>
                  \u042f \u041b\u0410\u0422\u0418 \u2014 \u043f\u043e\u043c\u043e\u0433\u0443 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u0442\u044c<br/>\u0432\u0430\u0448 \u0431\u0438\u0437\u043d\u0435\u0441 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e AI!
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 px-6 py-2.5 rounded-full flex items-center gap-2 whitespace-nowrap"
                style={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(16px)" }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-white">\u041e\u043d\u043b\u0430\u0439\u043d \u00b7 \u0433\u043e\u0442\u043e\u0432 \u043a \u0440\u0430\u0431\u043e\u0442\u0435</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="flex justify-center mt-6">
          <button onClick={() => onNavigate("services")}
            className="flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors">
            <span className="text-sm">\u0423\u0437\u043d\u0430\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435</span>
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
