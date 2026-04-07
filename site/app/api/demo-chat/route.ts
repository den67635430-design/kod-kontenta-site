import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return NextResponse.json({ reply: "API ключ не настроен." });

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://kodkontenta.ru",
      "X-Title": "Kod Kontenta Demo",
    },
    body: JSON.stringify({
      model: "google/gemma-3-12b-it:free",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content;
  if (reply) return NextResponse.json({ reply });

  console.error("OpenRouter error:", JSON.stringify(data));
  return NextResponse.json({ reply: "Сервис временно недоступен." });
}
