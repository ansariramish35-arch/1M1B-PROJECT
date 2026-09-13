import { date, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Knowledge base chunks for the Gomti Saathi RAG demo.
 * Each chunk mirrors the shape of an official document excerpt
 * (UPPCB advisory, CPCB criteria, citizen FAQ).
 */
export const knowledgeChunks = pgTable("knowledge_chunks", {
  id: serial("id").primaryKey(),
  kind: text("kind").notNull(), // 'advisory' | 'criteria' | 'faq'
  title: text("title").notNull(),
  station: text("station"),
  category: text("category"), // 'A' | 'B' | 'C' | 'D' | 'E'
  monthLabel: text("month_label"),
  advisoryDate: date("advisory_date"),
  tags: text("tags").array().notNull().default([]),
  content: text("content").notNull(),
});

/** Persisted demo chat messages (no personal data is ever stored). */
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  role: text("role").notNull(), // 'user' | 'assistant'
  content: text("content").notNull(),
  sources: jsonb("sources"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
