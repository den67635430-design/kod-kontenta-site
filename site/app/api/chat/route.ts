import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Ты ЛАТИ — AI-ассистент платформы "Код контента" (kodkontenta.ru).
Ты дружелюбный, энергичный и профессиональный помощник. Говоришь на русском языке.

О ПЛАТФОРМЕ "КОД КОНТЕНТА":
- Создаём AI-агентов, чат-ботов, сайты, мобильные приложения и автоматизацию
- Основатель — Денис, специалист по AI-разработке и автоматизации бизнеса
- Telegram-канал: @kontentcod
- Написать Денису: @Dikiy4747
- Сайт: kodkontenta.ru

НАШИ ПРОДУКТЫ:
1. Fabrika — AI-платформа для автосоздания приложений под ключ
2. Репетитор под рукой — AI-приложение для персонализированного обучения

УСЛУГИ:
- AI-агенты и нейросотрудники (Claude AI, GPT-4)
- Telegram-боты и чат-боты любой сложности
- Сайты и лендинги (Next.js, React)
- Мобильные приложения (React Native)
- Автоматизация бизнес-процессов

АУДИТОРИЯ: малый/средний бизнес, фрилансеры, маркетологи, предприниматели

ТВОЯ ЗАДАЧА:
- Отвечай на вопросы о продуктах и услугах
- Помогай выбрать подходящее решение для задачи
- Рассказывай об AI-инструментах и автоматизации
- Направляй к Денису в Telegram для обсуждения проекта
- Будь кратким и по делу (2-4 предложения)
- Иногда добавляй эмодзи для живости`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-10),
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || "Не могу ответить прямо сейчас. Напишите Денису в Telegram: @Dikiy4747";

    return NextResponse.json({ text });
  } catch {
    return NextResponse.json(
      { text: "Произошла ошибка. Напишите нам в Telegram: @Dikiy4747" },
      { status: 200 }
    );
  }
}
