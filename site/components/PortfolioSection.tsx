"use client";

import { motion } from "framer-motion";

const PROJECTS = [
  {
    title: "Fabrika — AI App Factory",
    desc: "Платформа для автоматического создания приложений под ключ с помощью AI. Клиент описывает задачу — система генерирует готовый продукт.",
    tags: ["Next.js", "TypeScript", "Claude AI", "SQLite", "Telegram"],
    status: "Работает",
    statusColor: "text-green-400 bg-green-400/10",
    gradient: "from-purple-900/40 to-blue-900/40",
    border: "border-purple-500/20",
    icon: "🏭",
    link: "https://fabrika-app-factory-production.up.railway.app",
  },
  {
    title: "Репетитор под рукой",
    desc: "AI-приложение для персонализированного обучения. Адаптируется под уровень ученика и создаёт индивидуальные задания.",
    tags: ["React Native", "AI", "Education"],
    status: "В разработке",
    statusColor: "text-amber-400 bg-amber-400/10",
    gradient: "from-blue-900/40 to-cyan-900/40",
    border: "border-blue-500/20",
    icon: "📚",
    link: null,
  },
  {
    title: "Kod VPN",
    desc: "Надёжный VPN-сервис на собственной инфраструктуре. Быстрый, без логов, с простым подключением для команд и бизнеса.",
    tags: ["WireGuard", "Linux", "Node.js"],
    status: "Скоро",
    statusColor: "text-slate-400 bg-slate-400/10",
    gradient: "from-cyan-900/40 to-green-900/40",
    border: "border-cyan-500/20",
    icon: "🔐",
    link: null,
  },
];

export default function PortfolioSection() {
  return (
    <section className="py-24 relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="badge mx-auto mb-4">Портфолио</div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Мои <span className="gradient-text">продукты</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Собственные AI-продукты, которые уже работают и помогают людям
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-2xl border ${project.border} bg-gradient-to-br ${project.gradient} p-6 flex flex-col gap-4 hover:-translate-y-2 transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between">
                <div className="text-4xl">{project.icon}</div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${project.statusColor}`}>
                  {project.status}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{project.desc}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-lg bg-white/5 text-slate-400 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm py-2 justify-center mt-2"
                >
                  Открыть проект
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
