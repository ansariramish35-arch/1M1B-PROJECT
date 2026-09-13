import type { CSSProperties, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Slide shell                                                         */
/* ------------------------------------------------------------------ */

export function SlideShell({
  dark = false,
  children,
  wide = false,
}: {
  dark?: boolean;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`relative h-full w-full overflow-y-auto thin-scroll ${
        dark ? "bg-river-950 text-cream" : "bg-paper text-ink"
      }`}
    >
      {dark ? (
        <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      ) : (
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      )}
      <div
        className={`relative mx-auto flex min-h-full flex-col justify-center px-6 py-10 sm:px-12 ${
          wide ? "max-w-6xl" : "max-w-5xl"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function Kicker({ children, dark = false, delay = 0 }: { children: ReactNode; dark?: boolean; delay?: number }) {
  return (
    <p
      className="rise mb-3 flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.18em]"
      style={{ animationDelay: ms(delay) }}
    >
      <span className={`inline-block h-[2px] w-8 rounded-full ${dark ? "bg-marigold-400" : "bg-river-500"}`} aria-hidden />
      <span className={dark ? "text-marigold-300" : "text-river-600"}>{children}</span>
    </p>
  );
}

export function SlideHeading({
  children,
  dark = false,
  delay = 60,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <h2
      className={`rise font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-[2.6rem] ${
        dark ? "text-cream" : "text-ink"
      } ${className}`}
      style={{ animationDelay: ms(delay) }}
    >
      {children}
    </h2>
  );
}

export function Lead({ children, dark = false, delay = 120 }: { children: ReactNode; dark?: boolean; delay?: number }) {
  return (
    <p
      className={`rise mt-3 max-w-3xl text-[15px] leading-relaxed sm:text-base ${dark ? "text-river-100/85" : "text-ink-soft"}`}
      style={{ animationDelay: ms(delay) }}
    >
      {children}
    </p>
  );
}

export function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`rise ${className}`} style={{ animationDelay: ms(delay) }}>
      {children}
    </div>
  );
}

function ms(n: number): CSSProperties["animationDelay"] {
  return `${n}ms`;
}

/* ------------------------------------------------------------------ */
/* Content pieces                                                      */
/* ------------------------------------------------------------------ */

export function Bullet({
  icon,
  children,
  dark = false,
}: {
  icon?: ReactNode;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-[7px] inline-block h-[7px] w-[14px] shrink-0 rounded-full ${
          dark ? "bg-marigold-400" : "bg-river-500"
        }`}
        aria-hidden
      />
      <span className={`text-[15px] leading-relaxed ${dark ? "text-river-100/90" : "text-ink-soft"}`}>
        {icon ? <span className="mr-1.5 inline-flex translate-y-[2px]">{icon}</span> : null}
        {children}
      </span>
    </li>
  );
}

export function Card({
  children,
  className = "",
  tone = "cream",
}: {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "sand" | "river" | "marigold" | "clay" | "dark";
}) {
  const tones: Record<string, string> = {
    cream: "bg-cream border-ink/10",
    sand: "bg-sand/60 border-ink/10",
    river: "bg-river-50 border-river-200",
    marigold: "bg-marigold-100 border-marigold-300",
    clay: "bg-clay-100 border-clay-300",
    dark: "bg-river-900 border-river-800",
  };
  return <div className={`rounded-xl border ${tones[tone]} ${className}`}>{children}</div>;
}

export function VerdictPill({ kind, label }: { kind: "safe" | "caution" | "avoid" | "info"; label?: string }) {
  const styles: Record<string, string> = {
    safe: "bg-river-600 text-cream",
    caution: "bg-marigold-500 text-cream",
    avoid: "bg-clay-600 text-cream",
    info: "bg-ink/85 text-cream",
  };
  const defaults: Record<string, string> = {
    safe: "Safe",
    caution: "Avoid contact",
    avoid: "Avoid contact — Not safe",
    info: "Information",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide ${styles[kind]}`}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-80" aria-hidden />
      {label ?? defaults[kind]}
    </span>
  );
}

export function SourceTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-ink/15 bg-paper px-2 py-0.5 text-[11px] font-semibold text-ink-soft">
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 3h7l4 4v14H7V3Z" strokeLinejoin="round" />
      </svg>
      {children}
    </span>
  );
}

export function SectionLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`mb-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] ${dark ? "text-river-300" : "text-ink-faint"}`}>
      {children}
    </p>
  );
}

export function ChatBubble({
  who,
  children,
  verdict,
  source,
}: {
  who: "user" | "saathi";
  children: ReactNode;
  verdict?: "safe" | "caution" | "avoid" | "info";
  source?: string;
}) {
  if (who === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-river-700 px-4 py-3 text-[14.5px] leading-relaxed text-cream">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div className="max-w-[92%] rounded-2xl rounded-bl-sm border border-ink/10 bg-cream px-4 py-3 shadow-sm">
        {verdict ? (
          <div className="mb-2">
            <VerdictPill kind={verdict} />
          </div>
        ) : null}
        <div className="text-[14.5px] leading-relaxed text-ink">{children}</div>
        {source ? (
          <div className="mt-2.5 border-t border-dashed border-ink/10 pt-2">
            <SourceTag>{source}</SourceTag>
          </div>
        ) : null}
      </div>
    </div>
  );
}
