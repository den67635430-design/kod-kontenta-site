"""
Парсинг всей истории канала @kontentcod через Telethon
Сохраняет посты по категориям в posts.json
"""
import asyncio
import json
import re
from datetime import datetime
from telethon import TelegramClient
from telethon.sessions import StringSession

API_ID = 38048098
API_HASH = "b9ef0852997673dc02bb0909be9b44a6"
SESSION_FILE = r"C:\telegram_bot\denis_session_string.txt"
CHANNEL = "@kontentcod"
OUTPUT_FILE = r"C:\Users\UZER\kod-kontenta\posts.json"

# Ключевые слова для категоризации
CATEGORIES = {
    "portfolio": [
        "сделал", "создал", "разработал", "запустил", "проект", "кейс",
        "бот", "сайт", "приложение", "fabrika", "фабрика", "репетитор",
        "vpn", "автопостинг", "готово", "результат", "клиент"
    ],
    "news": [
        "новость", "новинка", "вышел", "вышла", "обновление", "релиз",
        "анонс", "запуск", "openai", "anthropic", "claude", "gpt",
        "chatgpt", "нейросеть", "ai ", "искусственный", "технология"
    ],
    "speaking": [
        "выступил", "выступление", "конференция", "вебинар", "эфир",
        "прямой", "мероприятие", "спикер", "доклад", "презентация"
    ],
    "reviews": [
        "отзыв", "благодарю", "благодарность", "спасибо", "рекомендую",
        "помог", "клиент написал", "отзывы", "довольны"
    ],
    "tips": [
        "лайфхак", "совет", "подсказка", "как ", "способ", "метод",
        "урок", "обучение", "курс", "гайд", "инструкция", "туториал"
    ],
}

def categorize_post(text: str) -> str:
    if not text:
        return "other"
    text_lower = text.lower()
    scores = {cat: 0 for cat in CATEGORIES}
    for cat, keywords in CATEGORIES.items():
        for kw in keywords:
            if kw in text_lower:
                scores[cat] += 1
    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else "other"

async def main():
    with open(SESSION_FILE, "r", encoding="utf-8") as f:
        session_string = f.read().strip()

    client = TelegramClient(StringSession(session_string), API_ID, API_HASH)
    await client.start()

    print(f"Подключился. Парсю {CHANNEL}...")

    posts = []
    total = 0

    async for message in client.iter_messages(CHANNEL, limit=None):
        if not message.text:
            continue

        total += 1
        category = categorize_post(message.text)

        post = {
            "id": message.id,
            "date": message.date.isoformat(),
            "date_human": message.date.strftime("%d.%m.%Y"),
            "text": message.text,
            "preview": message.text[:200].replace("\n", " ") + ("..." if len(message.text) > 200 else ""),
            "category": category,
            "views": getattr(message, "views", 0) or 0,
            "url": f"https://t.me/kontentcod/{message.id}",
            "has_media": message.media is not None,
        }
        posts.append(post)

        if total % 50 == 0:
            print(f"  Обработано: {total} постов...")

    await client.disconnect()

    # Сортируем по дате (новые первые)
    posts.sort(key=lambda x: x["date"], reverse=True)

    # Статистика по категориям
    stats = {}
    for post in posts:
        cat = post["category"]
        stats[cat] = stats.get(cat, 0) + 1

    result = {
        "channel": CHANNEL,
        "parsed_at": datetime.now().isoformat(),
        "total": len(posts),
        "stats": stats,
        "posts": posts,
    }

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    labels = {
        "portfolio": "Raboty/Keysy",
        "news": "Novosti/AI",
        "speaking": "Vystupleniya",
        "reviews": "Otzyvy",
        "tips": "Sovety",
        "other": "Prochee",
    }
    print(f"\nGotovo! Vsego postov: {len(posts)}")
    print("Po kategoriyam:")
    for cat, count in sorted(stats.items(), key=lambda x: x[1], reverse=True):
        print(f"  {labels.get(cat, cat)}: {count}")
    print(f"\nSohraneno: {OUTPUT_FILE}")

asyncio.run(main())
