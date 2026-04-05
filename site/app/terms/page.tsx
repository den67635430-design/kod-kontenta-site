import SubpageHeader from "@/components/SubpageHeader";
import CodeRain from "@/components/CodeRain";

export const metadata = {
  title: "Пользовательское соглашение — Код контента",
  description: "Условия использования сайта kodkontenta.ru",
};

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-primary)" }}>
      <CodeRain />
      <SubpageHeader title="Пользовательское соглашение" />
      <div className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-invert max-w-none" style={{ color: "var(--text-secondary)" }}>

            <h1 style={{ color: "var(--text-primary)" }} className="text-3xl font-bold mb-2">Пользовательское соглашение</h1>
            <p className="text-sm mb-10" style={{ color: "var(--text-muted)" }}>Последнее обновление: 29 марта 2026 г.</p>

            <Section title="1. Принятие условий">
              <p>Используя сайт <strong>kodkontenta.ru</strong> (далее — «Сайт»), вы соглашаетесь с настоящим Пользовательским соглашением. Если вы не согласны — не используйте Сайт.</p>
            </Section>

            <Section title="2. Описание сервиса">
              <p>Сайт предоставляет информацию об услугах по разработке AI-агентов, чат-ботов, сайтов, мобильных приложений и автоматизации бизнеса, а также возможность связаться с Исполнителем для обсуждения проекта.</p>
            </Section>

            <Section title="3. Правила использования">
              <p>Пользователь обязуется:</p>
              <ul>
                <li>Не использовать Сайт в незаконных целях</li>
                <li>Не распространять вредоносное программное обеспечение через Сайт</li>
                <li>Не предпринимать попыток несанкционированного доступа к системам Сайта</li>
                <li>Не копировать контент Сайта без письменного разрешения</li>
                <li>Предоставлять достоверную информацию при заполнении форм</li>
              </ul>
            </Section>

            <Section title="4. Интеллектуальная собственность">
              <p>Весь контент Сайта (тексты, изображения, логотипы, дизайн, код) является интеллектуальной собственностью Администрации Сайта и охраняется законодательством об авторском праве.</p>
              <p>Использование контента без письменного разрешения запрещено.</p>
            </Section>

            <Section title="5. Персональные данные">
              <p>Обработка персональных данных осуществляется в соответствии с <a href="/privacy" className="text-yellow-500 hover:text-yellow-400">Политикой конфиденциальности</a>.</p>
            </Section>

            <Section title="6. Ограничение ответственности">
              <p>Сайт предоставляется «как есть». Администрация не гарантирует:</p>
              <ul>
                <li>Бесперебойную работу Сайта</li>
                <li>Полноту и актуальность информации на Сайте</li>
                <li>Соответствие Сайта конкретным ожиданиям пользователя</li>
              </ul>
              <p>Администрация не несёт ответственности за убытки, возникшие в результате использования или невозможности использования Сайта.</p>
            </Section>

            <Section title="7. Ссылки на сторонние ресурсы">
              <p>Сайт может содержать ссылки на сторонние ресурсы. Администрация не несёт ответственности за содержание и политику конфиденциальности этих ресурсов.</p>
            </Section>

            <Section title="8. Изменение соглашения">
              <p>Администрация вправе изменять настоящее соглашение в любое время без уведомления. Продолжение использования Сайта означает принятие изменений.</p>
            </Section>

            <Section title="9. Применимое право">
              <p>Настоящее соглашение регулируется законодательством Российской Федерации.</p>
            </Section>

            <Section title="10. Контакты">
              <ul>
                <li>Telegram: <a href="https://t.me/Dikiy4747" className="text-yellow-500 hover:text-yellow-400">@Dikiy4747</a></li>
                <li>Email: <a href="mailto:den67635430@gmail.com" className="text-yellow-500 hover:text-yellow-400">den67635430@gmail.com</a></li>
              </ul>
            </Section>

          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--accent-gold)" }}>{title}</h2>
      <div className="space-y-3 leading-relaxed">{children}</div>
    </div>
  );
}
