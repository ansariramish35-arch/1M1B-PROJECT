import { Card, Kicker, Lead, Rise, SlideHeading, SlideShell } from "@/components/primitives";
import {
  IconAlert,
  IconArrowRight,
  IconCamera,
  IconExpand,
  IconHeart,
  IconMegaphone,
  IconMic,
  IconPhone,
  IconRefresh,
  IconSparkle,
  IconSprout,
  IconWaves,
} from "@/components/icons";

/* ---------------------------- Slide 15 — Expected Impact ---------------------------- */

export function Slide15() {
  const quads = [
    {
      icon: IconHeart,
      t: "Health & safety",
      pts: ["Helps residents avoid unsafe water contact.", "Reduces risks from polluted stretches."],
    },
    {
      icon: IconSprout,
      t: "Awareness",
      pts: ["Makes monthly government data understandable.", "Replaces rumours and visual assumptions with evidence."],
    },
    {
      icon: IconMegaphone,
      t: "Accountability",
      pts: [
        "Citizens can identify specific locations and report concerns.",
        "NGOs can use sourced information in awareness campaigns.",
      ],
    },
    {
      icon: IconExpand,
      t: "Scalability",
      pts: ["The same model can be reused for other rivers.", "Only the knowledge base needs to be replaced."],
    },
  ];
  return (
    <SlideShell wide>
      <Kicker>15 · Expected Impact</Kicker>
      <SlideHeading>Small information, meaningful change</SlideHeading>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {quads.map((q, i) => (
          <Rise key={q.t} delay={150 + i * 90}>
            <div className="h-full rounded-xl border border-ink/10 bg-cream p-5 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-marigold-500 text-cream">
                  <q.icon className="h-4.5 w-4.5" />
                </span>
                <p className="text-[15px] font-extrabold text-ink">{q.t}</p>
              </div>
              <ul className="mt-3 space-y-2">
                {q.pts.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-soft">
                    <span className="mt-[7px] h-[6px] w-[11px] shrink-0 rounded-full bg-river-500" aria-hidden />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </Rise>
        ))}
      </div>
    </SlideShell>
  );
}

/* ------------------------------- Slide 16 — Limitations ------------------------------- */

export function Slide16() {
  const limits = [
    "Depends on monthly official data; it cannot detect a sudden spill immediately.",
    "Answers are only as accurate as the published documents.",
    "It is currently a conceptual prototype, not a deployed public system.",
    "A text chatbot may exclude people without smartphones or literacy access.",
    "It does not replace laboratory testing or official UPPCB advisories.",
  ];
  return (
    <SlideShell wide>
      <Kicker>16 · Limitations</Kicker>
      <SlideHeading>What Gomti Saathi cannot do</SlideHeading>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <Rise delay={160}>
          <ol className="space-y-3">
            {limits.map((l, i) => (
              <li key={l} className="flex items-start gap-3.5 rounded-lg border border-ink/10 bg-cream px-4 py-3.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clay-100 font-display text-[12px] font-bold text-clay-700">
                  {i + 1}
                </span>
                <span className="text-[14.5px] leading-relaxed text-ink-soft">{l}</span>
              </li>
            ))}
          </ol>
        </Rise>
        <Rise delay={300}>
          <Card tone="clay" className="flex h-full flex-col justify-center p-6">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-clay-700">Important principle</p>
            <p className="mt-3 font-display text-[1.45rem] font-semibold leading-snug text-clay-700">
              Gomti Saathi is an information assistant — not a water-testing authority.
            </p>
          </Card>
        </Rise>
      </div>
    </SlideShell>
  );
}

/* ------------------------------ Slide 17 — Future Scope ------------------------------ */

export function Slide17() {
  const steps = [
    { icon: IconMic, t: "Add Hindi voice input and audio responses." },
    { icon: IconPhone, t: "Deploy through WhatsApp or SMS." },
    { icon: IconRefresh, t: "Update the knowledge base automatically when new UPPCB reports are released." },
    { icon: IconWaves, t: "Expand to the Sai River and other Uttar Pradesh rivers." },
    { icon: IconCamera, t: "Enable citizens to report foam, sewage or garbage with dated photos." },
    { icon: IconAlert, t: "Use photos only for reporting — not for declaring water safe or unsafe." },
  ];
  return (
    <SlideShell wide>
      <Kicker>17 · Future Scope</Kicker>
      <SlideHeading>Next steps</SlideHeading>
      <div className="mt-8 grid gap-3.5 sm:grid-cols-2">
        {steps.map((s, i) => (
          <Rise key={s.t} delay={140 + i * 70}>
            <div className="flex h-full items-start gap-3.5 rounded-xl border border-ink/10 bg-cream px-4 py-4 shadow-sm">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-river-600 text-cream">
                <s.icon className="h-4.5 w-4.5" />
              </span>
              <p className="text-[14.5px] font-semibold leading-relaxed text-ink">{s.t}</p>
            </div>
          </Rise>
        ))}
      </div>
      <Rise delay={600}>
        <p className="mt-6 text-[13px] italic text-ink-faint">
          The goal stays the same: one clear, sourced answer — on whatever device a resident already has.
        </p>
      </Rise>
    </SlideShell>
  );
}

/* ------------------------------- Slide 18 — Key Learning ------------------------------- */

export function Slide18() {
  const learning = [
    "AI projects do not always require training large models.",
    "The real challenge is defining the right problem.",
    "RAG can make public information more usable and trustworthy.",
    "Responsible AI must be built into the design from the beginning.",
    "For citizens near the Gomti, one clear and honest sentence can be more useful than a long technical report.",
  ];
  return (
    <SlideShell wide>
      <Kicker>18 · Key Learning</Kicker>
      <SlideHeading>What I learned</SlideHeading>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <Rise delay={160}>
          <ul className="space-y-3.5">
            {learning.map((l) => (
              <li key={l} className="flex items-start gap-3">
                <span className="mt-[9px] inline-block h-[7px] w-[14px] shrink-0 rounded-full bg-river-500" aria-hidden />
                <span className="text-[15px] leading-relaxed text-ink-soft">{l}</span>
              </li>
            ))}
          </ul>
        </Rise>
        <Rise delay={300}>
          <figure className="relative h-full rounded-xl border border-river-800 bg-river-950 p-7">
            <span className="font-display absolute -top-5 left-5 text-7xl leading-none text-marigold-400" aria-hidden>
              “
            </span>
            <blockquote className="pt-4 font-display text-[1.35rem] font-medium italic leading-snug text-cream sm:text-[1.5rem]">
              The washerman at Gaughat does not need a research paper. He needs one line he can trust.
            </blockquote>
            <figcaption className="mt-4 text-[12px] font-bold uppercase tracking-[0.16em] text-river-300">
              Field note · Gaughat, Lucknow
            </figcaption>
          </figure>
        </Rise>
      </div>
    </SlideShell>
  );
}

/* -------------------------------- Slide 19 — Thank You -------------------------------- */

export function Slide19({ onOpenDemo }: { onOpenDemo?: () => void }) {
  return (
    <SlideShell dark>
      <Kicker dark>19 · Thank You</Kicker>
      <Rise delay={80}>
        <h2 className="font-display text-5xl font-semibold tracking-tight text-cream sm:text-6xl">Thank You</h2>
      </Rise>
      <Rise delay={170}>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-river-100/90">
          <strong className="text-cream">Gomti Saathi</strong> — making Gomti water-quality information simple, local
          and actionable.
        </p>
      </Rise>
      <Rise delay={260} className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-river-800 bg-river-900/80 px-5 py-4">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-river-300">Submitted by</p>
          <p className="mt-1 text-lg font-bold text-cream">Mohammad Ramish Ansari</p>
          <p className="text-sm text-river-100/80">University of Lucknow</p>
        </div>
        <div className="rounded-xl border border-river-800 bg-river-900/80 px-5 py-4">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-river-300">Acknowledgements</p>
          <p className="mt-1 text-[14px] leading-relaxed text-river-100/90">
            1M1B · IBM SkillsBuild · AICTE · Mentors and field-test participants
          </p>
        </div>
      </Rise>
      <Rise delay={350} className="mt-9 flex flex-wrap items-center gap-4">
        {onOpenDemo ? (
          <button
            onClick={onOpenDemo}
            className="group inline-flex items-center gap-2.5 rounded-full bg-marigold-500 px-6 py-3 text-[14px] font-extrabold text-river-950 transition hover:bg-marigold-400"
          >
            <IconSparkle className="h-4.5 w-4.5" />
            Try the live Gomti Saathi demo
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        ) : null}
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-river-400">
          SDG 6 · Clean Water and Sanitation
        </p>
      </Rise>
    </SlideShell>
  );
}
