import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ reply: "API ключ не настроен." });

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      system: messages[0]?.role === "system" ? messages[0].content : undefined,
      messages: messages.filter((m: { role: string }) => m.role !== "system"),
    }),
  });

  const data = await res.json();
  const reply = data.content?.[0]?.text;
  if (reply) return NextResponse.json({ reply });

  console.error("Anthropic error:", JSON.stringify(data));
  return NextResponse.json({ reply: "Сервис временно недоступен." });
}
