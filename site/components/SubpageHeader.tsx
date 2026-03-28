"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface SubpageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SubpageHeader({ title, subtitle }: SubpageHeaderProps) {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(10, 8, 5, 0.96)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(201,168,76,0.10)",
      }}
    >
      <div className="mx-4 xl:mx-8 flex items-center gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-700 to-yellow-500 flex items-center justify-center text-black font-bold text-sm shadow-lg">
            КК
          </div>
          <span className="hidden md:block font-bold text-base text-white group-hover:text-yellow-300 transition-all whitespace-nowrap">
            Код контента
          </span>
        </Link>

        <div className="hidden md:block h-4 w-px bg-white/10" />

        <div className="flex-1 min-w-0">
          <span className="text-slate-300 text-sm font-medium truncate">{title}</span>
          {subtitle && <span className="hidden md:block text-slate-500 text-xs mt-0.5">{subtitle}</span>}
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-700/40 text-sm font-medium text-yellow-400/80 hover:bg-yellow-700/10 hover:text-yellow-300 transition-all shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">На главную</span>
        </Link>
      </div>
    </motion.header>
  );
}
