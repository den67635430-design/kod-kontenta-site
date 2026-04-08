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
    value: "@Dikiy4747",
    href: "https://t.me/Dikiy4747",
    desc: "Пишите по любым вопросам — отвечу быстро",
    color: "from-yellow-900/25 to-stone-900/25",
    border: "hover:border-yellow-700/40",
    iconColor: "text-yellow-500",
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
    color: "from-stone-900/25 to-yellow-900/25",
    border: "hover:border-stone-500/40",
    iconColor: "text-yellow-400",
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
    color: "from-yellow-900/20 to-stone-900/25",
    border: "hover:border-yellow-800/40",
    iconColor: "text-yellow-300",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.585-1.496c.596-.19 1.365 1.26 2.178 1.817.615.422 1.083.33 1.083.33l2.178-.03s1.139-.071.599-1.069c-.044-.081-.314-.661-1.617-1.868-1.363-1.26-1.181-1.057.462-3.238.999-1.329 1.398-2.142 1.272-2.49-.12-.332-.854-.244-.854-.244l-2.451.015s-.182-.025-.317.056c-.132.079-.217.262-.217.262s-.387 1.028-.903 1.903c-1.088 1.848-1.523 1.946-1.701 1.832-.413-.267-.31-1.075-.31-1.649 0-1.793.272-2.54-.528-2.733-.265-.064-.46-.106-1.137-.113-.869-.009-1.603.003-2.019.206-.277.135-.491.437-.361.454.161.022.526.099.72.363.25.341.241 1.107.241 1.107s.144 2.11-.335 2.372c-.328.179-.778-.186-1.744-1.857-.496-.858-.871-1.805-.871-1.805s-.072-.177-.202-.272c-.157-.115-.376-.151-.376-.151l-2.328.015s-.35.01-.478.162c-.113.136-.009.417-.009.417s1.822 4.261 3.881 6.409c1.89 1.974 4.037 1.844 4.037 1.844h.972z"/>
      </svg>
    ),
    label: "ВКонтакте",
    value: "Код контента",
    href: "https://vk.com/club237342216",
    desc: "Публикации, кейсы и новости",
    color: "from-blue-900/20 to-stone-900/25",
    border: "hover:border-blue-700/40",
    iconColor: "text-blue-400",
  },
];

export default function ContactSection() {
  return (
    <section className="py-32 relative min-h-screen flex flex-col justify-center">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Давайте <span className="gradient-text">поговорим</span>
          </h2>
          <p className="text-slate-400 text-lg text-center">
            Есть идея для проекта? Нужна автоматизация? Просто напишите — разберёмся вместе
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
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
          style={{ background: "linear-gradient(135deg, rgba(154,122,46,0.15), rgba(201,168,76,0.10))", border: "1px solid rgba(201,168,76,0.15)" }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-20 blob-animation"
              style={{ background: "radial-gradient(circle, #C9A84C, transparent 70%)" }} />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Готовы автоматизировать<br />
              <span className="gradient-text">свой бизнес?</span>
            </h3>
            <p className="text-slate-400 text-lg mb-8 text-center">
              Напишите в Telegram — обсудим задачу и найдём лучшее решение
            </p>
            <a
              href="https://t.me/Dikiy4747"
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
