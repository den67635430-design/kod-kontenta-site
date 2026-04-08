"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const SERVICES = [
  {
    icon: "🤖",
    title: "AI-агенты и нейросотрудники",
    desc: "Создаём умных агентов, которые выполняют задачи 24/7 — отвечают клиентам, создают контент, обрабатывают заявки.",
    tags: ["Claude AI", "GPT-4", "Telegram", "WhatsApp"],
    color: "from-yellow-900/30 to-stone-900/30",
    border: "hover:border-yellow-700/40",
  },
  {
    icon: "💬",
    title: "Telegram-боты и чат-боты",
    desc: "Боты под любую задачу: продажи, поддержка, автопостинг, опросы, квизы, интеграции с CRM и платёжками.",
    tags: ["Telegram Bot API", "Node.js", "Python"],
    color: "from-stone-800/30 to-yellow-900/30",
    border: "hover:border-stone-500/40",
  },
  {
    icon: "🌐",
    title: "Сайты и лендинги",
    desc: "Современные сайты под ключ: лендинги, корпоративные сайты, интернет-магазины. Быстро, красиво, SEO.",
    tags: ["Next.js", "React", "Tailwind"],
    color: "from-yellow-900/30 to-stone-800/30",
    border: "hover:border-yellow-800/40",
  },
  {
    icon: "📱",
    title: "Мобильные приложения",
    desc: "Кроссплатформенные приложения для iOS и Android. От MVP до полноценного продукта.",
    tags: ["React Native", "Expo", "TypeScript"],
    color: "from-stone-900/30 to-yellow-900/20",
    border: "hover:border-stone-600/40",
  },
  {
    icon: "⚡",
    title: "Автоматизация бизнеса",
    desc: "Автоматизируем рутинные процессы: рассылки, парсинг, обработка данных, интеграции между сервисами.",
    tags: ["Make.com", "Python", "API"],
    color: "from-yellow-900/20 to-stone-900/30",
    border: "hover:border-yellow-700/40",
  },
  {
    icon: "🖥️",
    title: "VPS и инфраструктура",
    desc: "Настройка VPS-серверов, деплой приложений, защищённая инфраструктура для команд и бизнеса.",
    tags: ["Linux", "Nginx", "Docker"],
    color: "from-stone-800/30 to-yellow-900/30",
    border: "hover:border-stone-500/40",
  },
];

export default function ServicesSection({ preview = false }: { preview?: boolean }) {
  const displayed = preview ? SERVICES.slice(0, 3) : SERVICES;

  return (
    <section className="py-24 relative min-h-screen flex flex-col justify-center">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {preview ? (
            <Link href="/services" className="group inline-block">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 group-hover:opacity-80 transition-opacity">
                Что мы <span className="gradient-text">создаём</span>
                <svg className="inline-block ml-3 w-8 h-8 text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </h2>
            </Link>
          ) : (
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Что мы <span className="gradient-text">создаём</span>
            </h2>
          )}
          <p className="text-slate-400 text-lg text-center">
            Весь спектр AI-разработки: от простых ботов до сложных интеллектуальных систем
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`card ${service.border} bg-gradient-to-br ${service.color} group cursor-default`}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{service.desc}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-lg bg-white/5 text-slate-400 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
