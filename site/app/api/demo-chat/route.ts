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

    // Убираем reasoning паттерны (модель думает на русском и английском)
    const thinkingPatterns = /^(okay|ok,|let me|the user|alright|so,|i need|first,|let's|thinking|hmm|пользователь|нужно |давайте|итак,|таким образом|хорошо,|сначала)/i;
    const parts = reply.split(/\n\n+/);
    // Находим первый абзац который НЕ является размышлением
    const firstRealPart = parts.findIndex(p => !thinkingPatterns.test(p.trim()));
    if (firstRealPart > 0) {
      reply = parts.slice(firstRealPart).join("\n\n").trim();
    }

    return NextResponse.json({ reply });
  }

  console.error("LiteLLM error:", JSON.stringify(data));
  return NextResponse.json({ reply: "Сервис временно недоступен." });
}
