import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_KEY = "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";
const MODELS = [
  "meta-llama/llama-3.1-8b-instruct:free",
  "google/gemma-3-27b-it:free",
  "meta-llama/llama-3.3-70b-instruct:free",
];

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  for (const model of MODELS) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://kodkontenta.ru",
        },
        body: JSON.stringify({ model, messages, max_tokens: 500 }),
      });
      const data = await res.json();
      if (data.choices?.[0]?.message?.content) {
        return NextResponse.json({ reply: data.choices[0].message.content });
      }
    } catch {
      continue;
    }
  }

  return NextResponse.json({ reply: "Сервис временно недоступен. Попробуйте позже." });
}
