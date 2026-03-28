import SubpageHeader from "@/components/SubpageHeader";
import NewsSection from "@/components/NewsSection";
import CodeRain from "@/components/CodeRain";

export const metadata = {
  title: "Telegram-канал — Код контента",
  description: "Все посты из канала @kontentcod — AI-новости, кейсы, советы, промты.",
};

export default function NewsPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-primary)" }}>
      <CodeRain />
      <SubpageHeader title="Из Telegram-канала" subtitle="@kontentcod — AI-новости, кейсы, советы" />
      <div className="pt-20">
        <NewsSection />
      </div>
    </div>
  );
}
