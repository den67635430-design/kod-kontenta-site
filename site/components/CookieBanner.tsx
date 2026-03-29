"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-accepted");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-accepted", "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50"
        >
          <div className="glass rounded-2xl p-5 shadow-2xl" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Мы используем файлы <strong className="text-white">cookie</strong> для улучшения работы сайта и аналитики. Продолжая использование сайта, вы соглашаетесь с{" "}
              <Link href="/privacy" className="text-yellow-500 hover:text-yellow-400 underline">
                политикой конфиденциальности
              </Link>
              .
            </p>
            <div className="flex gap-3">
              <button
                onClick={accept}
                className="btn-primary text-sm py-2 px-5 flex-1 justify-center"
              >
                Принять
              </button>
              <button
                onClick={accept}
                className="text-sm px-4 py-2 rounded-xl text-slate-400 hover:text-white transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
