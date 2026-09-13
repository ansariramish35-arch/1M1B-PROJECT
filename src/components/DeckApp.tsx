"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { SLIDES } from "@/components/slides";
import { ChatDemo } from "@/components/ChatDemo";
import { IconArrowLeft, IconArrowRight, IconGrid, IconKeyboard, IconSparkle, IconWaves } from "@/components/icons";

export function DeckApp() {
  const total = SLIDES.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [overview, setOverview] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  const goTo = useCallback(
    (i: number) => {
      setIndex((cur) => {
        const next = Math.max(0, Math.min(total - 1, i));
        if (next !== cur) setDir(next > cur ? 1 : -1);
        return next;
      });
    },
    [total]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if (e.key === "Escape") {
        if (typing) return;
        if (demoOpen) setDemoOpen(false);
        else if (overview) setOverview(false);
        return;
      }
      if (typing) return;

      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          if (!overview) next();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          if (!overview) prev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(total - 1);
          break;
        case "o":
        case "O":
          setOverview((v) => !v);
          break;
        case "d":
        case "D":
          setDemoOpen((v) => !v);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, total, overview, demoOpen]);

  const slide = SLIDES[index];
  const ctx = useMemo(() => ({ openDemo: () => setDemoOpen(true) }), []);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-paper">
      {/* ---------- Header ---------- */}
      <header className="z-20 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-ink/10 bg-cream/90 px-4 backdrop-blur sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-river-600 text-cream">
            <IconWaves className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-[15.5px] font-semibold leading-tight text-ink">Gomti Saathi</p>
            <p className="hidden truncate text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink-faint sm:block">
              Presentation deck · 1M1B AI for Sustainability
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOverview((v) => !v)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-extrabold transition ${
              overview
                ? "border-river-600 bg-river-600 text-cream"
                : "border-ink/15 bg-cream text-ink-soft hover:border-river-400 hover:text-river-700"
            }`}
            title="Overview (O)"
          >
            <IconGrid className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Overview</span>
          </button>
          <button
            onClick={() => setDemoOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-river-600 px-3 py-1.5 text-[12px] font-extrabold text-cream transition hover:bg-river-700"
            title="Try the live demo (D)"
          >
            <IconSparkle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Try the live demo</span>
            <span className="sm:hidden">Demo</span>
          </button>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-[3px] shrink-0 bg-ink/8">
        <div
          className="h-full bg-river-500 transition-all duration-500 ease-out"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      {/* ---------- Slide viewport ---------- */}
      <main className="relative min-h-0 flex-1">
        <div
          key={slide.n}
          className={`absolute inset-0 ${dir === 1 ? "slide-anim-fwd" : "slide-anim-back"}`}
        >
          {slide.render(ctx)}
        </div>

        {/* Overview grid */}
        {overview ? (
          <div className="fade-anim absolute inset-0 z-10 overflow-y-auto bg-paper/[0.985] thin-scroll">
            <div className="mx-auto max-w-6xl px-6 py-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-river-600">
                    Deck overview
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-ink">19 slides</h3>
                </div>
                <button
                  onClick={() => setOverview(false)}
                  className="rounded-lg border border-ink/15 bg-cream px-3 py-1.5 text-[12px] font-extrabold text-ink-soft hover:border-river-400"
                >
                  Close <span className="ml-1 opacity-60">Esc</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.n}
                    onClick={() => {
                      goTo(i);
                      setOverview(false);
                    }}
                    className={`group rounded-xl border p-4 text-left transition ${
                      i === index
                        ? "border-river-600 bg-river-50 ring-2 ring-river-200"
                        : "border-ink/10 bg-cream hover:border-river-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-display text-lg font-semibold ${
                          s.dark ? "text-river-600" : "text-ink"
                        }`}
                      >
                        {String(s.n).padStart(2, "0")}
                      </span>
                      {s.dark ? (
                        <span className="rounded bg-river-950 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-cream">
                          dark
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-[13px] font-extrabold leading-snug text-ink">{s.title}</p>
                    <p className="mt-1 text-[11.5px] leading-snug text-ink-faint">{s.short}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="z-20 flex h-[52px] shrink-0 items-center justify-between gap-3 border-t border-ink/10 bg-cream/90 px-4 backdrop-blur sm:px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={index === 0}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink/15 bg-cream text-ink-soft transition enabled:hover:border-river-400 enabled:hover:text-river-700 disabled:opacity-35"
            aria-label="Previous slide"
          >
            <IconArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            disabled={index === total - 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink/15 bg-cream text-ink-soft transition enabled:hover:border-river-400 enabled:hover:text-river-700 disabled:opacity-35"
            aria-label="Next slide"
          >
            <IconArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Tick progress */}
        <div className="flex flex-1 items-center justify-center gap-[5px]" role="tablist" aria-label="Slides">
          {SLIDES.map((s, i) => (
            <button
              key={s.n}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${s.n}: ${s.title}`}
              className={`h-[14px] rounded-full transition-all ${
                i === index
                  ? "w-6 bg-river-600"
                  : i < index
                    ? "w-[9px] bg-river-300 hover:bg-river-400"
                    : "w-[9px] bg-ink/15 hover:bg-ink/30"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <p className="hidden items-center gap-1.5 text-[11px] font-bold text-ink-faint lg:flex">
            <IconKeyboard className="h-4 w-4" />
            <kbd className="key">←</kbd>
            <kbd className="key">→</kbd>
            <span>navigate</span>
            <kbd className="key ml-1.5">O</kbd>
            <span>overview</span>
            <kbd className="key ml-1.5">D</kbd>
            <span>demo</span>
          </p>
          <p className="font-mono text-[12px] font-extrabold tracking-wide text-ink-soft">
            {String(index + 1).padStart(2, "0")}
            <span className="text-ink-faint"> / {total}</span>
          </p>
        </div>
      </footer>

      <ChatDemo open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}
