"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    name: "Алексей М.",
    role: "Владелец интернет-магазина",
    text: "Денис сделал нам Telegram-бота для обработки заказов. Теперь менеджер тратит в 3 раза меньше времени. Всё работает как часы!",
    rating: 5,
    date: "Февраль 2026",
  },
  {
    name: "Мария К.",
    role: "SMM-специалист",
    text: "Fabrika — просто огонь! Автоматически создаёт посты под мою нишу. Сэкономила кучу времени на контент.",
    rating: 5,
    date: "Январь 2026",
  },
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", text: "", rating: 5 });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.text) return;
    setReviews((prev) => [
      {
        ...form,
        date: new Date().toLocaleDateString("ru-RU", { month: "long", year: "numeric" }),
      },
      ...prev,
    ]);
    setForm({ name: "", role: "", text: "", rating: 5 });
    setSent(true);
    setTimeout(() => { setSent(false); setShowForm(false); }, 2000);
  };

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
            Говорят <span className="gradient-text">клиенты</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto text-center">
            Реальные отзывы от людей, с которыми работали
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, s) => (
                  <svg
                    key={s}
                    className={`w-4 h-4 ${s < review.rating ? "text-amber-400" : "text-slate-600"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">"{review.text}"</p>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <div className="text-white font-medium text-sm">{review.name}</div>
                  {review.role && <div className="text-slate-500 text-xs">{review.role}</div>}
                </div>
                <div className="text-slate-600 text-xs">{review.date}</div>
              </div>
            </motion.div>
          ))}

          {/* Карточка добавить отзыв */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: reviews.length * 0.1 }}
            className="card border-dashed border-white/10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-yellow-700/40 min-h-48"
            onClick={() => setShowForm(true)}
          >
            <div className="w-12 h-12 rounded-full bg-yellow-700/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-slate-400 text-sm text-center">Оставить отзыв</p>
          </motion.div>
        </div>

        {/* Форма отзыва */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass rounded-2xl p-6 w-full max-w-md"
              >
                {sent ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">🎉</div>
                    <p className="text-white font-semibold">Спасибо за отзыв!</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-white">Оставить отзыв</h3>
                      <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        required
                        placeholder="Ваше имя *"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass text-white text-sm placeholder-slate-500 outline-none focus:border-yellow-700/50"
                      />
                      <input
                        placeholder="Должность / ниша"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass text-white text-sm placeholder-slate-500 outline-none focus:border-yellow-700/50"
                      />
                      <textarea
                        required
                        rows={4}
                        placeholder="Ваш отзыв *"
                        value={form.text}
                        onChange={(e) => setForm({ ...form, text: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass text-white text-sm placeholder-slate-500 outline-none focus:border-yellow-700/50 resize-none"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-400">Оценка:</span>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setForm({ ...form, rating: s })}
                          >
                            <svg className={`w-6 h-6 ${s <= form.rating ? "text-amber-400" : "text-slate-600"}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          </button>
                        ))}
                      </div>
                      <button type="submit" className="btn-primary w-full justify-center">
                        Отправить отзыв
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
