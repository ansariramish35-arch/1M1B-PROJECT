import { Card, Kicker, Lead, Rise, SlideHeading, SlideShell } from "@/components/primitives";
import {
  IconArrowDown,
  IconCheck,
  IconFile,
  IconSearch,
  IconSparkle,
  IconUsers,
  IconX,
} from "@/components/icons";

/* ------------------------ Slide 6 — Understanding the Users ------------------------ */

export function Slide06() {
  return (
    <SlideShell wide>
      <Kicker>06 · Understanding the Users</Kicker>
      <SlideHeading>Who will use Gomti Saathi?</SlideHeading>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Rise delay={180}>
          <Card tone="river" className="h-full p-6">
            <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-river-600">
              <IconUsers className="h-4 w-4" /> Primary users
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                "Residents living near Gomti ghats",
                "Washermen and people who use river water daily",
                "Fishermen and local workers",
                "Parents of children playing near the river",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-river-900">
                  <span className="mt-[8px] h-[6px] w-[12px] shrink-0 rounded-full bg-river-500" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        </Rise>
        <Rise delay={260}>
          <Card tone="cream" className="h-full p-6">
            <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-faint">
              <IconUsers className="h-4 w-4" /> Secondary users
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                "School and college students",
                "Local NGOs and clean-up groups",
                "Municipal and pollution-control staff",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-ink-soft">
                  <span className="mt-[8px] h-[6px] w-[12px] shrink-0 rounded-full bg-marigold-500" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        </Rise>
      </div>
      <Rise delay={360}>
        <div className="mt-6 rounded-xl border border-river-800 bg-river-950 px-6 py-5">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-marigold-300">
            Key insight from field interactions
          </p>
          <p className="mt-2 text-[16px] leading-relaxed text-river-100">
            People already know the river is polluted. What they do not know is —{" "}
            <strong className="text-cream">how polluted is their specific stretch, and whether it is safe today?</strong>
          </p>
        </div>
      </Rise>
    </SlideShell>
  );
}

/* ------------------------ Slide 7 — Design Thinking Process ------------------------ */

export function Slide07() {
  const steps = [
    {
      n: "1",
      t: "Empathize",
      d: "Informal conversations were held with people around Gaughat and Kudiyaghat.",
    },
    {
      n: "2",
      t: "Define",
      d: "Residents lack simple, location-specific water-quality information.",
    },
    {
      n: "3",
      t: "Ideate",
      d: "Four ideas were considered — the RAG chatbot won on cost, trust and reach.",
      chips: ["IoT water sensors", "Static website", "Image-based safety classification", "RAG chatbot ✓"],
    },
    {
      n: "4",
      t: "Prototype",
      d: "Created a workflow, knowledge base and safety-focused system prompt.",
    },
    {
      n: "5",
      t: "Test & Refine",
      d: "Feedback improved answer length, language support, data freshness warnings and safety rules.",
    },
  ];
  return (
    <SlideShell wide>
      <Kicker>07 · Design Thinking Process</Kicker>
      <SlideHeading>From field observation to AI solution</SlideHeading>
      <div className="mt-8 grid gap-3 md:grid-cols-5">
        {steps.map((s, i) => (
          <Rise key={s.n} delay={150 + i * 90} className="h-full">
            <div className="flex h-full flex-col rounded-xl border border-ink/10 bg-cream p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-river-600 font-display text-[13px] font-bold text-cream">
                  {s.n}
                </span>
                <p className="text-[13.5px] font-extrabold text-ink">{s.t}</p>
              </div>
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-soft">{s.d}</p>
              {s.chips ? (
                <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                  {s.chips.map((c) => (
                    <span
                      key={c}
                      className={`rounded-md px-2 py-1 text-[10.5px] font-bold ${
                        c.includes("✓") ? "bg-river-600 text-cream" : "bg-sand text-ink-soft"
                      }`}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Rise>
        ))}
      </div>
    </SlideShell>
  );
}

/* --------------------------- Slide 8 — Why a RAG Chatbot? --------------------------- */

export function Slide08() {
  const rows = [
    ["IoT water sensors", "Rejected", "Expensive, needs calibration and maintenance"],
    ["Static information website", "Rejected", "Can become outdated and cannot answer user-specific questions"],
    ["Image-based water safety detection", "Rejected", "Water appearance can be misleading"],
    ["RAG-based chatbot", "Selected", "Uses official data, gives location-specific answers and works on phones"],
  ];
  return (
    <SlideShell wide>
      <Kicker>08 · Why a RAG Chatbot?</Kicker>
      <SlideHeading>Choosing the simplest responsible solution</SlideHeading>
      <Rise delay={160} className="mt-7 overflow-x-auto">
        <table className="w-full min-w-[560px] border-separate border-spacing-0 overflow-hidden rounded-xl border border-ink/12 text-left">
          <thead>
            <tr className="bg-river-950 text-cream">
              <th className="px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.14em]">Option considered</th>
              <th className="px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.14em]">Decision</th>
              <th className="px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.14em]">Reason</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([opt, dec, reason], i) => (
              <tr key={opt} className={i % 2 ? "bg-sand/50" : "bg-cream"}>
                <td className="border-t border-ink/8 px-4 py-3.5 text-[14px] font-bold text-ink">{opt}</td>
                <td className="border-t border-ink/8 px-4 py-3.5">
                  {dec === "Selected" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-river-600 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-cream">
                      <IconCheck className="h-3 w-3" strokeWidth={2.6} /> Selected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-clay-100 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-clay-700">
                      <IconX className="h-3 w-3" strokeWidth={2.6} /> Rejected
                    </span>
                  )}
                </td>
                <td className="border-t border-ink/8 px-4 py-3.5 text-[13.5px] leading-snug text-ink-soft">{reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Rise>
      <Rise delay={300}>
        <div className="mt-6 rounded-xl border-l-4 border-river-600 bg-river-50 px-5 py-4">
          <p className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-river-700">Why RAG?</p>
          <p className="mt-1 text-[15px] leading-relaxed text-river-900">
            Retrieval-Augmented Generation ensures that answers are based on{" "}
            <strong>official documents</strong> rather than AI guesses.
          </p>
        </div>
      </Rise>
    </SlideShell>
  );
}

/* -------------------------- Slide 9 — How Gomti Saathi Works -------------------------- */

export function Slide09() {
  const steps = [
    "User asks a question",
    "Relevant UPPCB/CPCB document chunks are retrieved",
    "System prompt + retrieved information + user question are combined",
    "IBM Granite model generates a grounded response",
    "Plain-language answer with verdict, station, month and source",
  ];
  const sources = [
    "UPPCB monthly water-quality advisories",
    "CPCB water-quality classification criteria",
    "CPCB permissible-limit summaries",
    "Citizen FAQ notes from field visits",
  ];
  return (
    <SlideShell wide>
      <Kicker>09 · How Gomti Saathi Works</Kicker>
      <SlideHeading>The RAG workflow</SlideHeading>
      <div className="mt-7 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        <Rise delay={160}>
          <ol className="relative">
            {steps.map((s, i) => (
              <li key={s} className="relative flex items-start gap-3.5 pb-4 last:pb-0">
                {i < steps.length - 1 ? (
                  <span className="absolute left-[13px] top-8 h-[calc(100%-24px)] border-l-2 border-dashed border-river-400" aria-hidden />
                ) : null}
                <span className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-river-500 bg-paper font-display text-[12px] font-bold text-river-700">
                  {i + 1}
                </span>
                <span className="rounded-lg border border-ink/10 bg-cream px-3.5 py-2 text-[14px] font-semibold leading-snug text-ink shadow-sm">
                  {s}
                </span>
              </li>
            ))}
          </ol>
        </Rise>
        <Rise delay={280}>
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-faint">Knowledge sources</p>
          <div className="space-y-2.5">
            {sources.map((s) => (
              <div key={s} className="flex items-center gap-3 rounded-lg border border-ink/10 bg-cream px-4 py-3">
                <IconFile className="h-4.5 w-4.5 shrink-0 text-river-600" />
                <span className="text-[14px] font-semibold text-ink">{s}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-2 text-[12.5px] font-semibold text-ink-faint">
            <IconSearch className="h-4 w-4" /> Retrieval happens before every answer — nothing is answered from memory alone.
          </p>
        </Rise>
      </div>
    </SlideShell>
  );
}

/* ------------------------- Slide 10 — Prototype Architecture ------------------------- */

export function Slide10() {
  return (
    <SlideShell wide>
      <Kicker>10 · Prototype Architecture</Kicker>
      <SlideHeading>Core components</SlideHeading>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <Rise delay={150}>
          <div className="h-full rounded-xl border border-ink/10 bg-cream p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[13.5px] font-extrabold text-ink">Input</p>
              <span className="rounded-md bg-sand px-2 py-0.5 text-[10.5px] font-extrabold uppercase tracking-wide text-ink-soft">
                Step 1
              </span>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">Simple English, Hindi or Hinglish question.</p>
            <p className="mt-3 self-start rounded-lg bg-river-50 px-3 py-2 text-[13.5px] font-semibold text-river-900">
              “Nishatganj ke paas nahana safe hai?”
            </p>
          </div>
        </Rise>
        <Rise delay={230}>
          <div className="h-full rounded-xl border border-ink/10 bg-cream p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[13.5px] font-extrabold text-ink">Retrieval Layer</p>
              <span className="rounded-md bg-sand px-2 py-0.5 text-[10.5px] font-extrabold uppercase tracking-wide text-ink-soft">
                Step 2
              </span>
            </div>
            <p className="mt-2 text-[13px] font-bold uppercase tracking-wide text-ink-faint">Finds relevant information by:</p>
            <ul className="mt-2 space-y-1.5">
              {["Location / ghat name", "Water-quality category", "Monthly advisory data", "Type of activity: bathing, washing, fishing…"].map((t) => (
                <li key={t} className="flex items-start gap-2 text-[14px] text-ink-soft">
                  <IconSearch className="mt-0.5 h-4 w-4 shrink-0 text-river-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Rise>
        <Rise delay={310}>
          <div className="h-full rounded-xl border border-river-500 bg-river-50 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-[13.5px] font-extrabold text-river-900">
                <IconSparkle className="h-4 w-4 text-river-600" /> AI Response Layer
              </p>
              <span className="rounded-md bg-river-600 px-2 py-0.5 text-[10.5px] font-extrabold uppercase tracking-wide text-cream">
                Step 3
              </span>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-river-900">
              IBM Granite uses <strong>only the retrieved documents</strong> to generate an answer — guided by the
              safety-first system prompt.
            </p>
          </div>
        </Rise>
        <Rise delay={390}>
          <div className="h-full rounded-xl border border-ink/10 bg-cream p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[13.5px] font-extrabold text-ink">Output</p>
              <span className="rounded-md bg-sand px-2 py-0.5 text-[10.5px] font-extrabold uppercase tracking-wide text-ink-soft">
                Step 4
              </span>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
              A concise, safe and understandable response — verdict first, with station, month and source.
            </p>
          </div>
        </Rise>
      </div>
      <Rise delay={470} className="mt-5 flex justify-center">
        <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-ink-faint">
          Question <IconArrowDown className="h-4 w-4 rotate-[-90deg] text-river-500" /> Retrieval{" "}
          <IconArrowDown className="h-4 w-4 rotate-[-90deg] text-river-500" /> Generation{" "}
          <IconArrowDown className="h-4 w-4 rotate-[-90deg] text-river-500" /> Plain-language verdict
        </p>
      </Rise>
    </SlideShell>
  );
}
