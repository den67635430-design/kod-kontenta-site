import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const POSTS_FILE = path.join(process.cwd(), "data", "posts.json");
const SECRET = process.env.TELEGRAM_WEBHOOK_SECRET || "kodkontenta2026";

// Собственные продукты и услуги Дениса
const OWN_PROJECTS = ["openclaw", "опен клав", "fabrika", "фабрика приложений", "репетитор под рукой", "repetitor", "наш сайт", "наш бот", "мой бот", "мой проект", "я запустил", "я создал", "я сделал", "я разработал", "мы запустили", "мы создали", "мы сделали", "начал работу над", "закончил создавать", "новый проект", "kodkontenta", "denis_kodkontenta", "превращаем старые", "дарим вторую жизнь", "возвращаем атмосферу", "оживление старых фото", "открытки в стиле", "создаём уникальные открытки", "ai продавцы", "ai оживление", "чат-боты:", "чат-боты изменили", "пригласили выступить с проектом"];

// Крупные AI/tech компании и продукты — признак новости
const NEWS_COMPANIES = ["openai", "anthropic", "google", "nvidia", "microsoft", "apple", "meta ", "amazon", "yandex", "яндекс", "grok", "alibaba", "baidu", "netflix", "heygen", "moonshot", "sam altman", "сэм альтман", "lecun", "лекун", "deepmind", "mistral", "perplexity", "cohere", "xai ", "илон маск", "honor ", "яндекс браузер", "javascript", "python"];
const NEWS_MODELS = ["gpt-", "claude ", "gemini", "llama", "qwen", "kimi ", "nemotron", "copilot", "blackwell", "o1 ", "o3 ", "o4 ", "gpt-5", "gpt5"];
const NEWS_ACTIONS = ["выпустил", "выпустила", "запустил", "запустила", "анонсировал", "анонсировала", "купил", "купила", "скупает", "закрыл раунд", "финансирование", "млрд", "релиз", "вышел", "вышла", "обновление", "новинка", "интегрировал", "встроил", "разрабатывает", "бросила бомбу", "дропнул"];

// AI/tech инсайты без названий компаний
const NEWS_GENERAL = ["нейросеть", "нейросети", "ии-модель", "ии-агент", "ai-агент", "языковая модель", "искусственный интеллект", "нейронная сеть", "большая языковая", "исследователи обнаружили", "разработчик протестировал", "процентов", "% ии", "% ai"];

// Советы, промты, обучение
const TIPS_WORDS = ["промт", "prompt", "формула:", "шаблон", "лайфхак", "чек-лист", "инструкция", "гайд", "как собрать", "как написать", "как использовать", "как сделать", "как заработать", "способ ", "совет ", "советы", "урок", "структура:", "роль:", "задача:", "оказывается,", "контент — это", "почему пост", "3 способа", "5 вопросов", "5 писем", "серии telegram-постов"];

// Выступления
const SPEAKING_WORDS = ["выступил на", "выступление на", "конференция", "вебинар", "эфир", "прямой эфир", "мероприятие", "спикер"];

// Отзывы клиентов
const REVIEWS_WORDS = ["отзыв", "благодарю", "спасибо", "рекомендую", "помог мне", "добрый вечер, меня зовут", "меня зовут", "проектный менеджер", "написал клиент"];

function categorize(text: string): string {
  const lower = text.toLowerCase();

  // 1. Собственные проекты — высший приоритет
  if (OWN_PROJECTS.some(w => lower.includes(w))) return "portfolio";

  // 2. Отзывы клиентов
  const reviewScore = REVIEWS_WORDS.filter(w => lower.includes(w)).length;
  if (reviewScore >= 2) return "reviews";

  // 3. Выступления
  if (SPEAKING_WORDS.some(w => lower.includes(w))) return "speaking";

  // 4. Советы / промты
  const tipsScore = TIPS_WORDS.filter(w => lower.includes(w)).length;
  if (tipsScore >= 1) return "tips";

  // 5. Новости — компании + действия или модели
  const companyHit = NEWS_COMPANIES.some(w => lower.includes(w));
  const modelHit = NEWS_MODELS.some(w => lower.includes(w));
  const actionHit = NEWS_ACTIONS.some(w => lower.includes(w));
  if (companyHit && (actionHit || modelHit)) return "news";
  if (companyHit || modelHit) return "news";

  // 6. Общие AI-новости без названий компаний
  if (NEWS_GENERAL.some(w => lower.includes(w))) return "news";
  if (["новость", "только что", "стало известно", "большая новость", "бомба из", "лучшие ии-новости", "лучшие ai-новости"].some(w => lower.includes(w))) return "news";

  return "other";
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
