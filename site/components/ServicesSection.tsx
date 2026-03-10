"use client";

import { motion } from "framer-motion";

const SERVICES = [
  {
    icon: "🤖",
    title: "AI-агенты и нейросотрудники",
    desc: "Создаю умных агентов, которые выполняют задачи 24/7 — отвечают клиентам, создают контент, обрабатывают заявки.",
    tags: ["Claude AI", "GPT-4", "Telegram", "WhatsApp"],
    color: "from-purple-600/20 to-blue-600/20",
    border: "hover:border-purple-500/40",
  },
  {
    icon: "💬",
    title: "Telegram-боты и чат-боты",
    desc: "Боты под любую задачу: продажи, поддержка, автопостинг, опросы, квизы, интеграции с CRM и платёжками.",
    tags: ["Telegram Bot API", "Node.js", "Python"],
    color: "from-blue-600/20 to-cyan-600/20",
    border: "hover:border-blue-500/40",
  },
  {
    icon: "🌐",
    title: "Сайты и лендинги",
    desc: "Современные сайты под ключ: лендинги, корпоративные сайты, интернет-магазины. Быстро, красиво, SEO.",
    tags: ["Next.js", "React", "Tailwind"],
    color: "from-cyan-600/20 to-green-600/20",
    border: "hover:border-cyan-500/40",
  },
  {
    icon: "📱",
    title: "Мобильные приложения",
    desc: "Кроссплатформенные приложения для iOS и Android. От MVP до полноценного продукта.",
    tags: ["React Native", "Expo", "TypeScript"],
    color: "from-green-600/20 to-amber-600/20",
    border: "hover:border-green-500/40",
  },
  {
    icon: "⚡",
    title: "Автоматизация бизнеса",
    desc: "Автоматизирую рутинные процессы: рассылки, парсинг, обработка данных, интеграции между сервисами.",
    tags: ["Make.com", "Python", "API"],
    color: "from-amber-600/20 to-red-600/20",
    border: "hover:border-amber-500/40",
  },
  {
    icon: "🔐",
    title: "VPN и безопасность",
    desc: "Настройка VPN-серверов, защищённых каналов связи и инфраструктуры для команд и бизнеса.",
    tags: ["WireGuard", "OpenVPN", "Linux"],
    color: "from-red-600/20 to-purple-600/20",
    border: "hover:border-red-500/40",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="badge mx-auto mb-4">Услуги</div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Что я <span className="gradient-text">создаю</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Весь спектр AI-разработки: от простых ботов до сложных интеллектуальных систем
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
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
