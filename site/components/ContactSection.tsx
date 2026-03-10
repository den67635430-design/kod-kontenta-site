"use client";

import { motion } from "framer-motion";

const CONTACTS = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.27c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.998l-2.95-.924c-.643-.203-.657-.643.136-.953l11.527-4.444c.535-.194 1.002.131.37.571z"/>
      </svg>
    ),
    label: "Личка Telegram",
    value: "@denis_kodkontenta",
    href: "https://t.me/denis_kodkontenta",
    desc: "Пишите по любым вопросам — отвечу быстро",
    color: "from-blue-600/20 to-blue-800/20",
    border: "hover:border-blue-500/40",
    iconColor: "text-blue-400",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.27c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.998l-2.95-.924c-.643-.203-.657-.643.136-.953l11.527-4.444c.535-.194 1.002.131.37.571z"/>
      </svg>
    ),
    label: "Telegram канал",
    value: "@kontentcod",
    href: "https://t.me/kontentcod",
    desc: "AI-новости, кейсы и советы каждый день",
    color: "from-purple-600/20 to-purple-800/20",
    border: "hover:border-purple-500/40",
    iconColor: "text-purple-400",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    label: "Сайт",
    value: "kodkontenta.ru",
    href: "https://kodkontenta.ru",
    desc: "Вы уже здесь 😊",
    color: "from-cyan-600/20 to-cyan-800/20",
    border: "hover:border-cyan-500/40",
    iconColor: "text-cyan-400",
  },
];

export default function ContactSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="badge mx-auto mb-4">Контакты</div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Давайте <span className="gradient-text">поговорим</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Есть идея для проекта? Нужна автоматизация? Просто напишите — разберёмся вместе
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {CONTACTS.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`card bg-gradient-to-br ${contact.color} ${contact.border} flex flex-col gap-4 group`}
            >
              <div className={`${contact.iconColor} w-12 h-12 rounded-xl glass flex items-center justify-center`}>
                {contact.icon}
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">{contact.label}</div>
                <div className="text-white font-semibold group-hover:gradient-text transition-all">{contact.value}</div>
                <div className="text-slate-400 text-sm mt-1">{contact.desc}</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-auto">
                <span>Перейти</span>
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Финальный CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-12 text-center"
          style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.2))", border: "1px solid rgba(124,58,237,0.2)" }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-20 blob-animation"
              style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }} />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Готовы автоматизировать<br />
              <span className="gradient-text">свой бизнес?</span>
            </h3>
            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
              Напишите в Telegram — обсудим задачу и найдём лучшее решение
            </p>
            <a
              href="https://t.me/denis_kodkontenta"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.27c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.998l-2.95-.924c-.643-.203-.657-.643.136-.953l11.527-4.444c.535-.194 1.002.131.37.571z"/>
              </svg>
              Написать Денису
            </a>
            <p className="text-slate-500 text-sm mt-4">Отвечаю в течение часа</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
