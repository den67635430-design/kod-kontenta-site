import SubpageHeader from "@/components/SubpageHeader";
import PortfolioSection from "@/components/PortfolioSection";
import CodeRain from "@/components/CodeRain";
import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Портфолио — Код контента",
  description: "Собственные AI-продукты: Мой Логист, Fabrika, Репетитор под рукой.",
};

export default function PortfolioPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-primary)" }}>
      <CodeRain />
      <SubpageHeader title="Наши продукты" subtitle="Собственные AI-разработки" />
      <div className="pt-20">
        <PortfolioSection />
        <div className="divider mx-6 lg:mx-24" />
        <ContactSection />
      </div>
    </div>
  );
}
