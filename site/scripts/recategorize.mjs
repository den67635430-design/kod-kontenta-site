import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_FILE = path.join(__dirname, "../data/posts.json");

const OWN_PROJECTS = ["openclaw", "опен клав", "fabrika", "фабрика приложений", "репетитор под рукой", "repetitor", "наш сайт", "наш бот", "мой бот", "мой проект", "я запустил", "я создал", "я сделал", "я разработал", "мы запустили", "мы создали", "мы сделали", "начал работу над", "закончил создавать", "новый проект", "kodkontenta", "denis_kodkontenta"];
const NEWS_COMPANIES = ["openai", "anthropic", "google", "nvidia", "microsoft", "apple", "meta ", "amazon", "yandex", "яндекс", "grok", "alibaba", "baidu", "netflix", "heygen", "moonshot", "sam altman", "сэм альтман", "lecun", "лекун", "deepmind", "mistral", "perplexity", "cohere", "xai ", "илон маск"];
const NEWS_MODELS = ["gpt-", "claude ", "gemini", "llama", "qwen", "kimi ", "nemotron", "copilot", "blackwell", "o1 ", "o3 ", "o4 "];
const NEWS_ACTIONS = ["выпустил", "выпустила", "запустил", "запустила", "анонсировал", "анонсировала", "купил", "купила", "скупает", "закрыл раунд", "финансирование", "млрд", "релиз", "вышел", "вышла", "обновление", "новинка"];
const TIPS_WORDS = ["промт", "prompt", "формула", "шаблон", "лайфхак", "чек-лист", "инструкция", "гайд", "как собрать", "как написать", "как использовать", "как сделать", "как заработать", "способ ", "совет ", "советы", "урок", "обучение", "структура:", "роль:", "задача:"];
const SPEAKING_WORDS = ["выступил", "выступление", "конференция", "вебинар", "эфир", "прямой эфир", "мероприятие", "спикер", "пригласили выступить"];
const REVIEWS_WORDS = ["отзыв", "благодарю", "спасибо", "рекомендую", "помог мне", "добрый вечер, меня зовут", "меня зовут", "проектный менеджер", "клиент", "написал клиент"];

function categorize(text) {
  const lower = text.toLowerCase();
  if (OWN_PROJECTS.some(w => lower.includes(w))) return "portfolio";
  const reviewScore = REVIEWS_WORDS.filter(w => lower.includes(w)).length;
  if (reviewScore >= 2) return "reviews";
  if (SPEAKING_WORDS.some(w => lower.includes(w))) return "speaking";
  const tipsScore = TIPS_WORDS.filter(w => lower.includes(w)).length;
  if (tipsScore >= 1) return "tips";
  const companyHit = NEWS_COMPANIES.some(w => lower.includes(w));
  const modelHit = NEWS_MODELS.some(w => lower.includes(w));
  const actionHit = NEWS_ACTIONS.some(w => lower.includes(w));
  if (companyHit && (actionHit || modelHit)) return "news";
  if (companyHit || modelHit) return "news";
  if (["новость", "только что", "стало известно", "большая новость", "бомба из"].some(w => lower.includes(w))) return "news";
  return "other";
}

const data = JSON.parse(fs.readFileSync(POSTS_FILE, "utf-8"));
const counts = {};

data.posts = data.posts.map(post => {
  const newCat = categorize(post.text || "");
  counts[newCat] = (counts[newCat] || 0) + 1;
  return { ...post, category: newCat };
});

data.last_updated = new Date().toISOString();
fs.writeFileSync(POSTS_FILE, JSON.stringify(data, null, 2), "utf-8");

console.log("Перекатегоризация завершена:");
for (const [cat, cnt] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${cat}: ${cnt}`);
}
console.log(`Всего: ${data.total}`);
