import SubpageHeader from "@/components/SubpageHeader";
import ServicesSection from "@/components/ServicesSection";
import CodeRain from "@/components/CodeRain";
import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Услуги — Код контента",
  description: "Весь спектр AI-разработки: агенты, боты, сайты, мобильные приложения, автоматизация, VPS.",
};

export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-primary)" }}>
      <CodeRain />
      <SubpageHeader title="Что мы создаём" subtitle="Полный список услуг" />
      <div className="pt-20">
        <ServicesSection />
        <div className="divider mx-6 lg:mx-24" />
        <ContactSection />
      </div>
    </div>
  );
}
