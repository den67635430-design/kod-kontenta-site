"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Post {
  id: number;
  date_human: string;
  text: string;
  preview: string;
  category: string;
  views: number;
  url: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  portfolio: "Работа",
  news: "Новости AI",
  speaking: "Выступление",
  reviews: "Отзыв",
  tips: "Совет",
  other: "Пост",
};

const CATEGORY_COLORS: Record<string, string> = {
  portfolio: "text-purple-400 bg-purple-400/10",
  news: "text-blue-400 bg-blue-400/10",
  speaking: "text-amber-400 bg-amber-400/10",
  reviews: "text-green-400 bg-green-400/10",
  tips: "text-cyan-400 bg-cyan-400/10",
  other: "text-slate-400 bg-slate-400/10",
};

export default function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/posts.json")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["all", "news", "portfolio", "tips", "speaking", "reviews"];
  const filtered = filter === "all" ? posts : posts.filter((p) => p.category === filter);
  const visible = filtered.slice(0, 9);

  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="badge mx-auto mb-4">Новости</div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Из <span className="gradient-text">Telegram-канала</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Актуальные посты из канала{" "}
            <a href="https://t.me/kontentcod" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              @kontentcod
            </a>{" "}
            — AI-новости, кейсы, советы
          </p>
        </motion.div>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-purple-600 text-white"
                  : "glass text-slate-400 hover:text-white"
              }`}
            >
              {cat === "all" ? "Все" : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse h-48" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((post, i) => (
              <motion.a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card group cursor-pointer hover:border-purple-500/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] || CATEGORY_COLORS.other}`}>
                    {CATEGORY_LABELS[post.category] || "Пост"}
                  </span>
                  <span className="text-xs text-slate-500">{post.date_human}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-4 group-hover:text-white transition-colors">
                  {post.preview}
                </p>
                {post.views > 0 && (
                  <div className="flex items-center gap-1 mt-3 text-xs text-slate-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {post.views.toLocaleString()}
                  </div>
                )}
              </motion.a>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <a
            href="https://t.me/kontentcod"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.27c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.998l-2.95-.924c-.643-.203-.657-.643.136-.953l11.527-4.444c.535-.194 1.002.131.37.571z"/>
            </svg>
            Все посты в Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
