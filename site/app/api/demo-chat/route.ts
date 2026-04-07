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
  const reply = data.choices?.[0]?.message?.content;
  if (reply) return NextResponse.json({ reply });

  console.error("LiteLLM error:", JSON.stringify(data));
  return NextResponse.json({ reply: "Сервис временно недоступен." });
}
