"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AGENTS = [
  {
    id: "accountant",
    emoji: "📊",
    name: "AI-Бухгалтер",
    desc: "Налоги, документы, отчётность",
    color: "from-green-900/30 to-stone-900/30",
    border: "hover:border-green-700/40",
    iconColor: "text-green-400",
    prompt: `Ты опытный бухгалтер с 10-летним стажем в России. Работаешь с УСН и ОСН. Помогаешь с первичной документацией, проводками, налогами и финансовым учётом. Отвечай кратко и структурированно. Это демо-версия — покажи свои возможности. Представься коротко и спроси с чем помочь.`,
  },
  {
    id: "hr",
    emoji: "👥",
    name: "AI-HR",
    desc: "Подбор персонала, вакансии, онбординг",
    color: "from-blue-900/30 to-stone-900/30",
    border: "hover:border-blue-700/40",
    iconColor: "text-blue-400",
    prompt: `Ты HR-менеджер с опытом в подборе и развитии персонала. Помогаешь создавать вакансии, структурировать интервью, разрабатывать системы оценки и адаптации сотрудников. Пиши профессионально, без канцелярита. Это демо-версия — представься коротко и спроси с чем помочь.`,
  },
  {
    id: "seller",
    emoji: "💼",
    name: "AI-Продавец",
    desc: "Скрипты продаж, возражения, КП",
    color: "from-yellow-900/30 to-stone-900/30",
    border: "hover:border-yellow-700/40",
    iconColor: "text-yellow-400",
    prompt: `Ты опытный менеджер по продажам. Знаешь техники SPIN, AIDA, работу с возражениями. Помогаешь составлять скрипты, коммерческие предложения и стратегии. Это демо-версия — представься коротко и спроси что продаём и с чем помочь.`,
  },
  {
    id: "copywriter",
    emoji: "✍️",
    name: "AI-Копирайтер",
    desc: "Тексты, посты, рекламные объявления",
    color: "from-purple-900/30 to-stone-900/30",
    border: "hover:border-purple-700/40",
    iconColor: "text-purple-400",
    prompt: `Ты копирайтер с опытом в маркетинге и продажах. Пишешь убедительно, без воды и клише. Создаёшь тексты для лендингов, соцсетей, рекламы. Это демо-версия — представься коротко и спроси для чего нужен текст.`,
  },
  {
    id: "lawyer",
    emoji: "⚖️",
    name: "AI-Юрист",
    desc: "Договоры, претензии, право РФ",
    color: "from-red-900/30 to-stone-900/30",
    border: "hover:border-red-700/40",
    iconColor: "text-red-400",
    prompt: `Ты юридический консультант, специализируешься на праве РФ. Помогаешь с договорами, претензиями, трудовыми вопросами. Всегда указывай применимые статьи законов. Это демо-версия — представься коротко и спроси с чем помочь.`,
  },
  {
    id: "marketer",
    emoji: "📈",
    name: "AI-Маркетолог",
    desc: "Стратегия, реклама, контент-план",
    color: "from-orange-900/30 to-stone-900/30",
    border: "hover:border-orange-700/40",
    iconColor: "text-orange-400",
    prompt: `Ты performance-маркетолог и стратег. Работаешь с малым и средним бизнесом. Помогаешь выстраивать маркетинг от стратегии до конкретных гипотез. Это демо-версия — представься коротко и спроси о бизнесе клиента.`,
  },
  {
    id: "support",
    emoji: "🎧",
    name: "AI-Поддержка",
    desc: "Ответы клиентам 24/7",
    color: "from-cyan-900/30 to-stone-900/30",
    border: "hover:border-cyan-700/40",
    iconColor: "text-cyan-400",
    prompt: `Ты вежливый специалист поддержки клиентов. Отвечаешь быстро, по существу и доброжелательно. Помогаешь решать вопросы клиентов. Это демо-версия — представься коротко и спроси чем можешь помочь.`,
  },
  {
    id: "assistant",
    emoji: "🗂️",
    name: "AI-Секретарь",
    desc: "Письма, протоколы, планирование",
    color: "from-slate-800/30 to-stone-900/30",
    border: "hover:border-slate-500/40",
    iconColor: "text-slate-400",
    prompt: `Ты профессиональный бизнес-ассистент. Помогаешь с перепиской, планированием, протоколами встреч и обработкой информации. Пишешь кратко, чётко и по делу. Это демо-версия — представься коротко и спроси чем помочь.`,
  },
];

const ADMIN_CODE = "Admin9791";
const DEMO_MINUTES = 30;

interface Message {
  role: "user" | "assistant";
  content: string;
}

function useIsAdmin() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("admin") === ADMIN_CODE;
}

export default function DemoSection() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState<Record<string, boolean>>({});
  const [startTime] = useState<number>(() => Date.now());
  const [expired, setExpired] = useState(false);
  const isAdmin = useIsAdmin();

  // Таймер истечения для обычных пользователей
  useState(() => {
    if (isAdmin) return;
    const interval = setInterval(() => {
      if (Date.now() - startTime > DEMO_MINUTES * 60 * 1000) {
        setExpired(true);
        setActiveAgent(null);
        clearInterval(interval);
      }
    }, 10000);
    return () => clearInterval(interval);
  });

  const agent = AGENTS.find((a) => a.id === activeAgent);

  const openAgent = async (id: string) => {
    setActiveAgent(id);
    if (initialized[id]) return;
    const ag = AGENTS.find((a) => a.id === id)!;
    setLoading(true);
    setMessages([]);
    try {
      const res = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: ag.prompt },
            { role: "user", content: "Привет" },
          ],
        }),
      });
      const data = await res.json();
      const reply = data.reply || "Привет! Чем могу помочь?";
      setMessages([{ role: "assistant", content: reply }]);
      setInitialized((prev) => ({ ...prev, [id]: true }));
    } catch {
      setMessages([{ role: "assistant", content: "Привет! Чем могу помочь?" }]);
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || !agent || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: agent.prompt },
            ...newMessages.slice(-10),
          ],
        }),
      });
      const data = await res.json();
      const reply = data.reply || "Не удалось получить ответ";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Ошибка соединения" }]);
    }
    setLoading(false);
  };

  return (
    <section id="demo" className="py-32 relative min-h-screen flex flex-col justify-center">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Попробуйте <span className="gradient-text">AI-ассистентов</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Выберите ассистента и задайте вопрос — прямо сейчас, бесплатно
          </p>
        </motion.div>

        {expired && (
          <div className="text-center mb-8 p-6 rounded-2xl" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
            <div className="text-2xl mb-2">⏰</div>
            <div className="text-white font-semibold mb-1">Демо-время истекло</div>
            <div className="text-slate-400 text-sm mb-4">Хотите получить полноценного AI-ассистента для вашего бизнеса?</div>
            <a href="https://t.me/Dikiy4747" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-6 py-3">
              Написать Денису →
            </a>
          </div>
        )}

        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 ${expired ? "opacity-40 pointer-events-none" : ""}`}>
          {AGENTS.map((ag, i) => (
            <motion.button
              key={ag.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => openAgent(ag.id)}
              className={`card bg-gradient-to-br ${ag.color} ${ag.border} text-left group cursor-pointer transition-all ${activeAgent === ag.id ? "border-yellow-500/60" : ""}`}
            >
              <div className={`text-3xl mb-3`}>{ag.emoji}</div>
              <div className="text-white font-semibold mb-1">{ag.name}</div>
              <div className="text-slate-400 text-sm">{ag.desc}</div>
              <div className="mt-3 text-xs text-yellow-500 group-hover:text-yellow-400">
                Попробовать →
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {activeAgent && agent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="card" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{agent.emoji}</span>
                    <div>
                      <div className="text-white font-semibold">{agent.name}</div>
                      <div className="text-xs text-slate-500">демо-версия</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveAgent(null)}
                    className="text-slate-500 hover:text-white transition-colors text-xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="h-72 overflow-y-auto mb-4 space-y-3 pr-1">
                  {loading && messages.length === 0 && (
                    <div className="text-slate-500 text-sm text-center pt-10">Загрузка...</div>
                  )}
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                          msg.role === "user"
                            ? "bg-yellow-600/30 text-white"
                            : "bg-stone-800/60 text-slate-200"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {loading && messages.length > 0 && (
                    <div className="flex justify-start">
                      <div className="bg-stone-800/60 rounded-2xl px-4 py-2 text-slate-400 text-sm">...</div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Напишите вопрос..."
                    className="flex-1 bg-stone-800/50 border border-stone-700/50 rounded-xl px-4 py-2 text-white text-sm placeholder-slate-500 outline-none focus:border-yellow-600/50"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="btn-primary px-4 py-2 text-sm disabled:opacity-50"
                  >
                    →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
