import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Manrope, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["500", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gomti Saathi — AI for Gomti River Water Quality",
  description:
    "Gomti Saathi: a RAG chatbot concept that converts official UPPCB/CPCB water-quality reports into plain-language, location-specific answers for Lucknow residents. Final project — 1M1B AI for Sustainability Virtual Internship with IBM SkillsBuild & AICTE.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} ${devanagari.variable}`}>
      <body>{children}</body>
    </html>
  );
}
