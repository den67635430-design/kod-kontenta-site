import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  // Сначала пробуем data/posts.json (обновляется webhook)
  const dataFile = path.join(process.cwd(), "data", "posts.json");
  const publicFile = path.join(process.cwd(), "public", "posts.json");

  try {
    const file = fs.existsSync(dataFile) ? dataFile : publicFile;
    const raw = fs.readFileSync(file, "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json({ total: 0, posts: [] });
  }
}
