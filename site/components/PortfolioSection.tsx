"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const PROJECTS = [
  {
    title: "Мой Логист",
    desc: "Android-приложение для водителей-дальнобойщиков: AI-оптимизация маршрутов, антирадар (80 000+ камер), личный кабинет, подписка. Работает без интернета на кэше.",
    tags: ["React Native", "Expo", "FastAPI", "SQLite", "ЮКасса"],
    status: "Android",
    statusColor: "text-green-400 bg-green-400/10",
    gradient: "from-orange-900/40 to-yellow-900/40",
    border: "border-orange-500/20",
    icon: "🚛",
    link: "https://kodkontenta.ru/apk/moy-logist.apk",
    isDownload: true,
  },
  {
    title: "Fabrika — AI App Factory",
    desc: "Платформа для автоматического создания приложений под ключ с помощью AI. Клиент описывает задачу — система генерирует готовый продукт.",
    tags: ["Next.js", "TypeScript", "Claude AI", "SQLite", "Telegram"],
    status: "Работает",
    statusColor: "text-green-400 bg-green-400/10",
    gradient: "from-yellow-900/40 to-stone-900/40",
    border: "border-yellow-700/20",
    icon: "🏭",
    link: "https://fabrika-app-factory-production.up.railway.app",
    isDownload: false,
  },
  {
    title: "Репетитор под рукой",
    desc: "AI-репетитор для дошкольников и школьников. Помогает с домашними заданиями, подготовкой к ОГЭ/ЕГЭ, учит читать и писать. Адаптируется под уровень ученика.",
    tags: ["React", "TypeScript", "Supabase", "AI"],
    status: "Работает",
    statusColor: "text-green-400 bg-green-400/10",
    gradient: "from-blue-900/40 to-cyan-900/40",
    border: "border-stone-600/20",
    icon: "📚",
    link: "http://repetitor.kodkontenta.ru",
    isDownload: false,
  },
];

export default function PortfolioSection({ preview = false }: { preview?: boolean }) {
  const displayed = preview ? PROJECTS.slice(0, 3) : PROJECTS;

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
            <Link href="/portfolio" className="group inline-block">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 group-hover:opacity-80 transition-opacity">
                Наши <span className="gradient-text">продукты</span>
                <svg className="inline-block ml-3 w-8 h-8 text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </h2>
            </Link>
          ) : (
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Наши <span className="gradient-text">продукты</span>
            </h2>
          )}
          <p className="text-slate-400 text-lg text-center">
            Собственные AI-продукты, которые уже работают и помогают людям
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {displayed.map((project, i) => (
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
                  download={project.isDownload ? "moy-logist.apk" : undefined}
                  className="btn-primary text-sm py-2 justify-center mt-2"
                >
                  {project.isDownload ? (
                    <>
                      Скачать APK
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Открыть проект
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </>
                  )}
                </a>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
