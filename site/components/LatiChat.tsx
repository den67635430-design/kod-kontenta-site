"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "Что такое AI-агент?",
  "Сколько стоит сайт?",
  "Как работает Fabrika?",
  "Как связаться с Денисом?",
];

interface LatiChatProps {
  externalOpen?: boolean;
  onExternalClose?: () => void;
}

export default function LatiChat({ externalOpen, onExternalClose }: LatiChatProps = {}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (externalOpen) setOpen(true);
  }, [externalOpen]);

  const handleClose = () => {
    setOpen(false);
    onExternalClose?.();
  };
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Привет! 👋 Я ЛАТИ — ваш AI-помощник. Расскажу о наших продуктах и услугах. Чем могу помочь?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Что-то пошло не так. Напишите в Telegram: @Dikiy4747" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Кнопка открытия чата */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl overflow-hidden"
        style={{ boxShadow: "0 0 30px rgba(124,58,237,0.5)" }}
      >
        <img src="/mascot/lati.png" alt="ЛАТИ" className="w-full h-full object-cover" />
        {!open && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#07070f] animate-pulse" />
        )}
      </motion.button>

      {/* Чат */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 flex flex-col glass rounded-2xl shadow-2xl overflow-hidden"
            style={{ maxHeight: "520px", boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.2)" }}
          >
            {/* Шапка */}
            <div className="flex items-center gap-3 p-4 border-b border-white/5">
              <div className="relative">
                <img src="/mascot/lati.png" alt="ЛАТИ" className="w-10 h-10 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0d0d1a]" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">ЛАТИ</div>
                <div className="text-xs text-slate-400">AI-ассистент · онлайн</div>
              </div>
              <button onClick={handleClose} className="text-slate-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "300px" }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-yellow-700 text-white rounded-br-sm"
                        : "glass text-slate-200 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="glass px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-slate-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Быстрые вопросы */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 rounded-xl glass text-slate-300 hover:text-white hover:border-yellow-700/40 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Ввод */}
            <div className="p-4 border-t border-white/5 flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Написать сообщение..."
                className="flex-1 px-4 py-2.5 rounded-xl glass text-white text-sm placeholder-slate-500 outline-none focus:border-yellow-700/40 border border-transparent"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-yellow-700 hover:bg-yellow-600 disabled:opacity-40 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
