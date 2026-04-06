import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const key = process.env.GROQ_API_KEY;
  if (!key) return NextResponse.json({ reply: "API ключ не настроен." });

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content;
  if (reply) return NextResponse.json({ reply });

  console.error("Groq error:", data);
  return NextResponse.json({ reply: "Сервис временно недоступен." });
}
