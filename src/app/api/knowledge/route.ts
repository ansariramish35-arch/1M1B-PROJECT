import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { knowledgeChunks } from "@/db/schema";
import { ensureSeeded } from "@/lib/seed";

export async function GET() {
  await ensureSeeded();
  const rows = await db
    .select({
      id: knowledgeChunks.id,
      kind: knowledgeChunks.kind,
      title: knowledgeChunks.title,
      station: knowledgeChunks.station,
      category: knowledgeChunks.category,
      monthLabel: knowledgeChunks.monthLabel,
    })
    .from(knowledgeChunks)
    .orderBy(asc(knowledgeChunks.kind), asc(knowledgeChunks.id));

  return NextResponse.json({ total: rows.length, chunks: rows });
}
