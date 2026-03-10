import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const POSTS_FILE = path.join(process.cwd(), "data", "posts.json");
const SECRET = process.env.TELEGRAM_WEBHOOK_SECRET || "kodkontenta2026";

const CATEGORIES: Record<string, string[]> = {
  portfolio: ["сделал", "создал", "разработал", "запустил", "проект", "кейс", "бот", "сайт", "приложение", "fabrika", "фабрика", "репетитор", "vpn", "готово", "результат"],
  news: ["новость", "новинка", "вышел", "вышла", "обновление", "релиз", "анонс", "openai", "anthropic", "claude", "gpt", "нейросеть", "ai ", "искусственный", "технология"],
  speaking: ["выступил", "выступление", "конференция", "вебинар", "эфир", "прямой", "мероприятие", "спикер"],
  reviews: ["отзыв", "благодарю", "спасибо", "рекомендую", "помог"],
  tips: ["лайфхак", "совет", "как ", "способ", "урок", "обучение", "гайд"],
};

function categorize(text: string): string {
  const lower = text.toLowerCase();
  let best = "other";
  let max = 0;
  for (const [cat, words] of Object.entries(CATEGORIES)) {
    const score = words.filter((w) => lower.includes(w)).length;
    if (score > max) { max = score; best = cat; }
  }
  return best;
}

function loadPosts() {
  try {
    if (fs.existsSync(POSTS_FILE)) {
      return JSON.parse(fs.readFileSync(POSTS_FILE, "utf-8"));
    }
  } catch {}
  // Fallback: читаем из public/posts.json
  try {
    const pub = path.join(process.cwd(), "public", "posts.json");
    if (fs.existsSync(pub)) return JSON.parse(fs.readFileSync(pub, "utf-8"));
  } catch {}
  return { total: 0, posts: [] };
}

function savePosts(data: unknown) {
  const dir = path.dirname(POSTS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(POSTS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// GET — проверка работоспособности (Telegram требует ответить на GET)
export async function GET() {
  return NextResponse.json({ ok: true, service: "kod-kontenta-webhook" });
}

// POST — получаем обновления от Telegram
export async function POST(req: NextRequest) {
  try {
    // Проверка секрета
    const secret = req.nextUrl.searchParams.get("secret");
    if (secret !== SECRET) {
      return NextResponse.json({ ok: false }, { status: 403 });
    }

    const body = await req.json();

    // Обрабатываем только сообщения из канала
    const message = body.channel_post || body.message;
    if (!message?.text) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat?.id;
    const channelUsername = message.chat?.username;

    // Принимаем только из нашего канала
    if (channelUsername !== "kontentcod" && chatId !== -1001675618341) {
      return NextResponse.json({ ok: true });
    }

    const date = new Date(message.date * 1000);
    const newPost = {
      id: message.message_id,
      date: date.toISOString(),
      date_human: date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" }),
      text: message.text,
      preview: message.text.slice(0, 200).replace(/\n/g, " ") + (message.text.length > 200 ? "..." : ""),
      category: categorize(message.text),
      views: 0,
      url: `https://t.me/kontentcod/${message.message_id}`,
      has_media: !!message.photo || !!message.video,
    };

    const data = loadPosts();
    // Не дублируем
    const exists = data.posts.some((p: { id: number }) => p.id === newPost.id);
    if (!exists) {
      data.posts.unshift(newPost);
      data.total = data.posts.length;
      data.last_updated = new Date().toISOString();
      savePosts(data);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Webhook error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
