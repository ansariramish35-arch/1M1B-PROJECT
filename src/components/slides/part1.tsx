import { Card, Kicker, Lead, Rise, SlideHeading, SlideShell, SourceTag, VerdictPill } from "@/components/primitives";
import { IconCheck, IconWaves } from "@/components/icons";

/* ----------------------------- Slide 1 — Title ----------------------------- */

export function Slide01() {
  return (
    <SlideShell dark>
      <Kicker dark delay={0}>Final Project Submission · 1M1B — AI for Sustainability Virtual Internship</Kicker>
      <Rise delay={80} className="flex items-end gap-5">
        <h1 className="font-display text-6xl font-semibold leading-[0.98] tracking-tight text-cream sm:text-[5.4rem]">
          Gomti
          <br />
          Saathi
        </h1>
        <span className="mb-3 hidden text-3xl text-marigold-400 [font-family:var(--font-devanagari)] sm:block">
          गोमती साथी
        </span>
      </Rise>
      <Rise delay={160}>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-river-100/90">
          Simple AI-based water-quality guidance for Lucknow residents.
        </p>
        <p className="mt-2 text-[13px] font-semibold text-river-300">
          In collaboration with IBM SkillsBuild &amp; AICTE
        </p>
      </Rise>

      <Rise delay={240} className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-river-800 bg-river-900/80 px-5 py-4">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-river-300">Submitted by</p>
          <p className="mt-1.5 text-lg font-bold text-cream">Mohammad Ramish Ansari</p>
          <p className="text-sm text-river-100/80">University of Lucknow</p>
        </div>
        <div className="rounded-xl border border-river-800 bg-river-900/80 px-5 py-4">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-river-300">SDG alignment</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-river-600 px-3 py-1 text-[12px] font-bold text-cream">
              SDG 6 · Clean Water &amp; Sanitation <em className="not-italic text-river-100/70">(primary)</em>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-marigold-500 px-3 py-1 text-[12px] font-bold text-river-950">
              SDG 11 · Sustainable Cities <em className="not-italic opacity-70">(secondary)</em>
            </span>
          </div>
        </div>
      </Rise>

      <Rise delay={320} className="mt-10">
        <svg viewBox="0 0 420 26" className="h-6 w-full max-w-md text-river-700" fill="none" aria-hidden>
          <path
            d="M2 8c14 0 14 10 28 10s14-10 28-10 14 10 28 10 14-10 28-10 14 10 28 10 14-10 28-10 14 10 28 10 14-10 28-10 14 10 28 10 14-10 28-10 14 10 28 10 14-10 28-10 14 10 28 10"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M2 20c14 0 14 4 28 4s14-4 28-4 14 4 28 4 14-4 28-4 14 4 28 4 14-4 28-4 14 4 28 4 14-4 28-4 14 4 28 4 14-4 28-4 14 4 28 4 14-4 28-4 14 4 28 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
        <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-river-400">
          A companion for reading the river
        </p>
      </Rise>
    </SlideShell>
  );
}

/* ----------------------------- Slide 2 — The Problem ----------------------------- */

export function Slide02() {
  const points = [
    "The Gomti River passes through the centre of Lucknow.",
    "Several city stretches experience sewage discharge, foam, garbage and poor water quality.",
    "UPPCB publishes monthly water-quality reports.",
    "However, these reports are technical, PDF-based and difficult for ordinary residents to understand.",
    "People often decide whether water is safe based on appearance, rumours or habit.",
  ];
  return (
    <SlideShell wide>
      <Kicker>02 · The Problem</Kicker>
      <SlideHeading>
        Water-quality data exists — but citizens <span className="text-clay-600">cannot use it easily</span>
      </SlideHeading>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Rise delay={160}>
          <ul className="space-y-3.5">
            {points.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-[9px] inline-block h-[7px] w-[14px] shrink-0 rounded-full bg-river-500" aria-hidden />
                <span className="text-[15.5px] leading-relaxed text-ink-soft">{t}</span>
              </li>
            ))}
          </ul>
        </Rise>
        <Rise delay={260}>
          <Card tone="river" className="flex h-full flex-col justify-between p-6">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-river-600">Key question</p>
              <p className="mt-3 font-display text-[1.55rem] font-semibold leading-snug text-river-900">
                How can residents get simple, location-specific and trustworthy water-safety information?
              </p>
            </div>
            <div className="mt-5 flex items-center gap-2 text-river-600">
              <IconWaves className="h-5 w-5" />
              <span className="text-[12px] font-bold uppercase tracking-wider">The question this project answers</span>
            </div>
          </Card>
        </Rise>
      </div>
    </SlideShell>
  );
}

/* --------------------------- Slide 3 — Why This Matters --------------------------- */

export function Slide03() {
  const uses = ["Bathing", "Washing clothes", "Fishing", "Children playing near ghats", "Religious & community activities"];
  return (
    <SlideShell wide>
      <Kicker>03 · Why This Matters</Kicker>
      <SlideHeading>Pollution affects real daily decisions</SlideHeading>
      <Lead>People near the river may use — or come into contact with — the water for everyday needs.</Lead>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <Rise delay={180}>
          <div className="flex flex-wrap gap-2.5">
            {uses.map((u) => (
              <span
                key={u}
                className="rounded-lg border border-ink/15 bg-cream px-3.5 py-2.5 text-[14px] font-bold text-ink shadow-sm"
              >
                {u}
              </span>
            ))}
          </div>
          <Card tone="marigold" className="mt-6 p-5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-marigold-700">Current challenge</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink">
              A resident may see water that <strong>“looks clean”</strong> after rain — but appearance does not reveal
              bacteria, dissolved oxygen or pollution load.
            </p>
          </Card>
        </Rise>
        <Rise delay={280}>
          <Card tone="cream" className="p-5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-faint">Need — a clear answer</p>
            <div className="mt-3 rounded-xl border border-ink/10 bg-paper p-4">
              <VerdictPill kind="avoid" label="Avoid contact" />
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink">
                “Avoid contact with water near this station. Latest report classifies it as{" "}
                <strong>Category E</strong>.”
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <SourceTag>UPPCB monthly advisory</SourceTag>
              </div>
            </div>
            <p className="mt-3 text-[13px] italic text-ink-faint">
              One honest sentence beats a forty-page PDF for someone standing at the ghat.
            </p>
          </Card>
        </Rise>
      </div>
    </SlideShell>
  );
}

/* --------------------------- Slide 4 — Proposed Solution --------------------------- */

export function Slide04() {
  const questions = [
    "Can we bathe near Gaughat?",
    "What does Category E mean?",
    "Is foam near Nishatganj dangerous?",
    "Can children play near Gomti Barrage?",
    "Does rain make the river safe?",
  ];
  const includes = [
    "Clear safety verdict",
    "Monitoring-station name",
    "Month of data",
    "Simple explanation",
    "Official source reference",
  ];
  return (
    <SlideShell wide>
      <Kicker>04 · Proposed Solution</Kicker>
      <SlideHeading>
        Introducing <span className="text-river-600">Gomti Saathi</span>
      </SlideHeading>
      <Lead>
        Gomti Saathi (<em>“Saathi”</em> means companion) is a simple AI chatbot that converts official river
        water-quality reports into plain-language answers.
      </Lead>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Rise delay={180}>
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-faint">
            Users ask in their own words
          </p>
          <div className="flex flex-col gap-2.5">
            {questions.map((q) => (
              <div
                key={q}
                className="self-start rounded-2xl rounded-br-sm border border-river-200 bg-river-50 px-4 py-2.5 text-[14.5px] font-semibold text-river-900"
              >
                “{q}”
              </div>
            ))}
          </div>
        </Rise>
        <Rise delay={280}>
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-faint">
            Every answer includes
          </p>
          <Card tone="cream" className="divide-y divide-ink/8 p-1">
            {includes.map((it) => (
              <div key={it} className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-river-600 text-cream">
                  <IconCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                <span className="text-[15px] font-bold text-ink">{it}</span>
              </div>
            ))}
          </Card>
        </Rise>
      </div>
    </SlideShell>
  );
}

/* ---------------------------- Slide 5 — SDG Alignment ---------------------------- */

export function Slide05() {
  return (
    <SlideShell wide>
      <Kicker>05 · SDG Alignment</Kicker>
      <SlideHeading>Supporting the Sustainable Development Goals</SlideHeading>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Rise delay={180}>
          <div className="h-full rounded-xl border-2 border-river-500 bg-river-50 p-6">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl font-semibold text-river-600">06</span>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-river-600">Primary</p>
                <p className="text-lg font-extrabold text-river-900">Clean Water and Sanitation</p>
              </div>
            </div>
            <ul className="mt-5 space-y-3">
              {[
                "Makes water-quality information accessible.",
                "Promotes safer contact with polluted water.",
                "Encourages awareness of sanitation and sewage impacts.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <IconCheck className="mt-1 h-4 w-4 shrink-0 text-river-600" strokeWidth={2.4} />
                  <span className="text-[15px] leading-relaxed text-river-900">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Rise>
        <Rise delay={280}>
          <div className="h-full rounded-xl border-2 border-marigold-400 bg-marigold-100 p-6">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl font-semibold text-marigold-600">11</span>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-marigold-700">Secondary</p>
                <p className="text-lg font-extrabold text-ink">Sustainable Cities and Communities</p>
              </div>
            </div>
            <ul className="mt-5 space-y-3">
              {[
                "Helps Lucknow residents engage with their local river.",
                "Supports informed community action and accountability.",
                "Makes environmental information more citizen-friendly.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <IconCheck className="mt-1 h-4 w-4 shrink-0 text-marigold-600" strokeWidth={2.4} />
                  <span className="text-[15px] leading-relaxed text-ink">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Rise>
      </div>
    </SlideShell>
  );
}
