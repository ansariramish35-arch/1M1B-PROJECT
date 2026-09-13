import { ChatBubble, Kicker, Lead, Rise, SlideHeading, SlideShell } from "@/components/primitives";
import { IconClock, IconEye, IconLock, IconScale, IconShield } from "@/components/icons";

/* ------------------------- Slide 11 — Responsible AI by Design ------------------------- */

export function Slide11() {
  const pillars = [
    {
      icon: IconScale,
      t: "Fairness",
      pts: [
        "Supports Hindi, Hinglish and simple English.",
        "Avoids unfairly labelling communities or areas without official data.",
      ],
    },
    {
      icon: IconEye,
      t: "Transparency",
      pts: ["Names the monitoring station and month.", "Clearly states the information source."],
    },
    {
      icon: IconClock,
      t: "Reliability",
      pts: ["Never invents readings, dates or locations.", "Warns users when data is old or unavailable."],
    },
    {
      icon: IconShield,
      t: "Safety",
      pts: [
        "Advises caution when unsure.",
        "Does not encourage bathing or washing in Category D or E stretches.",
      ],
    },
    {
      icon: IconLock,
      t: "Privacy",
      pts: ["No names, phone numbers or personal information required.", "Uses only public documents."],
    },
  ];
  return (
    <SlideShell wide>
      <Kicker>11 · Responsible AI by Design</Kicker>
      <SlideHeading>Safety, honesty and inclusion are core features</SlideHeading>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p, i) => (
          <Rise key={p.t} delay={150 + i * 80} className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}>
            <div className="h-full rounded-xl border border-ink/10 bg-cream p-5 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-river-600 text-cream">
                  <p.icon className="h-4.5 w-4.5" />
                </span>
                <p className="text-[15px] font-extrabold text-ink">{p.t}</p>
              </div>
              <ul className="mt-3 space-y-2">
                {p.pts.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-ink-soft">
                    <span className="mt-[7px] h-[6px] w-[11px] shrink-0 rounded-full bg-marigold-500" aria-hidden />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </Rise>
        ))}
        <Rise delay={560} className="hidden items-center lg:flex">
          <p className="font-display text-[15px] italic leading-snug text-ink-faint">
            “Responsible AI is not a checkbox — it is the product.”
          </p>
        </Rise>
      </div>
    </SlideShell>
  );
}

/* ------------------------ Slide 12 — System Prompt Safety Rules ------------------------ */

export function Slide12() {
  const rules = [
    "Answer only from the provided documents.",
    "Never invent water readings, dates or station names.",
    "Always state the monitoring station and month.",
    "Warn users when data is older than two months.",
    "Give the verdict first: Safe / Not Safe / Avoid Contact.",
    "Use plain language and explain technical terms.",
    "Reply in the same language as the user.",
    "When uncertain, advise caution and suggest checking the latest UPPCB advisory.",
  ];
  return (
    <SlideShell dark wide>
      <Kicker dark>12 · System Prompt Safety Rules</Kicker>
      <SlideHeading dark>Instructions given to the AI assistant</SlideHeading>
      <Lead dark delay={130}>
        These eight rules are written into the system prompt that shapes every Gomti Saathi response.
      </Lead>
      <Rise delay={220} className="mt-7">
        <div className="overflow-hidden rounded-xl border border-river-800 bg-river-900/90 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-river-800 bg-river-950 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-clay-500" aria-hidden />
            <span className="h-2.5 w-2.5 rounded-full bg-marigold-400" aria-hidden />
            <span className="h-2.5 w-2.5 rounded-full bg-river-400" aria-hidden />
            <span className="ml-2 font-mono text-[11.5px] font-semibold text-river-300">system-prompt.txt</span>
          </div>
          <ol className="grid gap-x-8 px-5 py-5 font-mono text-[13px] leading-relaxed text-river-100 sm:grid-cols-2 sm:text-[13.5px]">
            {rules.map((r, i) => (
              <li key={r} className="flex gap-3 border-b border-river-800/60 py-2.5 last:border-0 sm:[&:nth-last-child(2)]:border-0">
                <span className="select-none font-bold text-marigold-400">{String(i + 1).padStart(2, "0")}</span>
                <span>{r}</span>
              </li>
            ))}
          </ol>
        </div>
      </Rise>
    </SlideShell>
  );
}

/* --------------------------- Slide 13 — Sample Interaction 1 --------------------------- */

export function Slide13() {
  return (
    <SlideShell>
      <Kicker>13 · Sample Interaction</Kicker>
      <SlideHeading>Example: children playing near Gomti Barrage</SlideHeading>
      <div className="mx-auto mt-8 w-full max-w-2xl space-y-4">
        <Rise delay={160}>
          <ChatBubble who="user">My children play near Gomti Barrage. Should I stop them?</ChatBubble>
        </Rise>
        <Rise delay={340}>
          <ChatBubble
            who="saathi"
            verdict="avoid"
            source="UPPCB monthly advisory — Gomti Barrage station"
          >
            <p>
              <strong>Avoid contact with the water.</strong> Recent advisories classify the Gomti Barrage stretch as{" "}
              <strong>Category E</strong>, which is not suitable for bathing, washing or water contact.
            </p>
            <p className="mt-2.5">
              Children may play on the bank, but they should avoid entering the water and wash their hands afterwards.
            </p>
          </ChatBubble>
        </Rise>
        <Rise delay={520}>
          <p className="text-center text-[12px] font-bold uppercase tracking-[0.18em] text-ink-faint">
            Verdict first · station named · source cited
          </p>
        </Rise>
      </div>
    </SlideShell>
  );
}

/* --------------------------- Slide 14 — Sample Interaction 2 --------------------------- */

export function Slide14() {
  return (
    <SlideShell>
      <Kicker>14 · Another Sample Interaction</Kicker>
      <SlideHeading>Example: understanding Category E</SlideHeading>
      <div className="mx-auto mt-8 w-full max-w-2xl space-y-4">
        <Rise delay={160}>
          <ChatBubble who="user">What does Category E mean?</ChatBubble>
        </Rise>
        <Rise delay={340}>
          <ChatBubble
            who="saathi"
            verdict="info"
            source="CPCB Water Quality Classification Criteria"
          >
            <p>
              <strong>Category E</strong> is the lowest water-quality category. It is suitable only for{" "}
              <strong>controlled waste disposal</strong> — not for bathing, washing, fishing or any direct contact.
            </p>
            <p className="mt-2.5">It often indicates severe pollution, low oxygen and sewage contamination.</p>
          </ChatBubble>
        </Rise>
        <Rise delay={520}>
          <p className="text-center text-[12px] font-bold uppercase tracking-[0.18em] text-ink-faint">
            Technical term, explained in one breath
          </p>
        </Rise>
      </div>
    </SlideShell>
  );
}
