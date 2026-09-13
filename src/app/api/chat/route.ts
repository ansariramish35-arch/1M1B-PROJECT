import { NextResponse } from "next/server";
import { and, asc, eq, isNotNull } from "drizzle-orm";
import { db } from "@/db";
import { chatMessages } from "@/db/schema";
import { answerQuestion } from "@/lib/saathi";
import { ensureSeeded } from "@/lib/seed";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as {
      message?: unknown;
      sessionId?: unknown;
    } | null;

    const message = typeof body?.message === "string" ? body.message.trim() : "";
    if (!message || message.length > 600) {
      return NextResponse.json({ error: "A message of up to 600 characters is required." }, { status: 400 });
    }

    const sessionId =
      typeof body?.sessionId === "string" && body.sessionId.length >= 8 && body.sessionId.length <= 64
        ? body.sessionId
        : crypto.randomUUID();

    const answer = await answerQuestion(message);

    await db.insert(chatMessages).values([
      { sessionId, role: "user", content: message },
      { sessionId, role: "assistant", content: answer.text, sources: answer.sources },
    ]);

    return NextResponse.json({ sessionId, answer });
  } catch (err) {
    console.error("chat error", err);
    return NextResponse.json({ error: "Something went wrong while answering." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  if (!sessionId) return NextResponse.json({ messages: [] });
  await ensureSeeded();
  const rows = await db
    .select({
      id: chatMessages.id,
      role: chatMessages.role,
      content: chatMessages.content,
      sources: chatMessages.sources,
    })
    .from(chatMessages)
    .where(and(eq(chatMessages.sessionId, sessionId), isNotNull(chatMessages.content)))
    .orderBy(asc(chatMessages.id))
    .limit(100);
  return NextResponse.json({ messages: rows });
}
