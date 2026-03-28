import SubpageHeader from "@/components/SubpageHeader";
import ReviewsSection from "@/components/ReviewsSection";
import CodeRain from "@/components/CodeRain";
import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Отзывы — Код контента",
  description: "Реальные отзывы клиентов о работе с Денисом и командой Код контента.",
};

export default function ReviewsPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-primary)" }}>
      <CodeRain />
      <SubpageHeader title="Говорят клиенты" subtitle="Реальные отзывы" />
      <div className="pt-20">
        <ReviewsSection />
        <div className="divider mx-6 lg:mx-24" />
        <ContactSection />
      </div>
    </div>
  );
}
