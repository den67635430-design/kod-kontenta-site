import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  // Используем локальный LiteLLM прокси (тот же что используют все боты на VPS)
  const proxyUrl = process.env.LITELLM_URL || "http://localhost:4000";
  const proxyKey = process.env.LITELLM_KEY || "litellm-proxy-key-denis";

  const res = await fetch(`${proxyUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${proxyKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  let reply = data.choices?.[0]?.message?.content as string | undefined;

  // Убираем reasoning/thinking блоки которые модель выводит в ответ
  if (reply) {
    // Удаляем паттерны "думающих" моделей
    reply = reply
      .replace(/<think>[\s\S]*?<\/think>/gi, "")
      .replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, "")
      .trim();

    // Если ответ содержит "пользователь спрашивает" / "нужно" в начале — это рассуждения
    // Берём только часть после двойного переноса строки (финальный ответ)
    const parts = reply.split(/\n\n+/);
    if (parts.length > 1 && /пользователь|нужно кратко|нужно структур|давайте|итак|таким образом/i.test(parts[0])) {
      reply = parts.slice(1).join("\n\n").trim();
    }

    return NextResponse.json({ reply });
  }

  console.error("LiteLLM error:", JSON.stringify(data));
  return NextResponse.json({ reply: "Сервис временно недоступен." });
}
