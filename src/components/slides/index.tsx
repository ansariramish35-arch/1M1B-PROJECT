import type { ReactNode } from "react";
import { Slide01, Slide02, Slide03, Slide04, Slide05 } from "./part1";
import { Slide06, Slide07, Slide08, Slide09, Slide10 } from "./part2";
import { Slide11, Slide12, Slide13, Slide14 } from "./part3";
import { Slide15, Slide16, Slide17, Slide18, Slide19 } from "./part4";

export interface SlideCtx {
  openDemo: () => void;
}

export interface SlideDef {
  n: number;
  title: string;
  short: string;
  dark?: boolean;
  render: (ctx: SlideCtx) => ReactNode;
}

export const SLIDES: SlideDef[] = [
  { n: 1, title: "Title — Gomti Saathi", short: "Title", dark: true, render: () => <Slide01 /> },
  {
    n: 2,
    title: "The Problem",
    short: "Data exists, citizens can’t use it",
    render: () => <Slide02 />,
  },
  {
    n: 3,
    title: "Why This Matters",
    short: "Pollution affects daily decisions",
    render: () => <Slide03 />,
  },
  {
    n: 4,
    title: "Proposed Solution",
    short: "Introducing Gomti Saathi",
    render: () => <Slide04 />,
  },
  { n: 5, title: "SDG Alignment", short: "SDG 6 + SDG 11", render: () => <Slide05 /> },
  { n: 6, title: "Understanding the Users", short: "Who will use it", render: () => <Slide06 /> },
  {
    n: 7,
    title: "Design Thinking Process",
    short: "Empathize → Test & Refine",
    render: () => <Slide07 />,
  },
  { n: 8, title: "Why a RAG Chatbot?", short: "Option comparison", render: () => <Slide08 /> },
  { n: 9, title: "How Gomti Saathi Works", short: "The RAG workflow", render: () => <Slide09 /> },
  { n: 10, title: "Prototype Architecture", short: "Core components", render: () => <Slide10 /> },
  {
    n: 11,
    title: "Responsible AI by Design",
    short: "Five pillars",
    render: () => <Slide11 />,
  },
  {
    n: 12,
    title: "System Prompt Safety Rules",
    short: "Eight guardrails",
    dark: true,
    render: () => <Slide12 />,
  },
  {
    n: 13,
    title: "Sample Interaction — Gomti Barrage",
    short: "Children near the barrage",
    render: () => <Slide13 />,
  },
  {
    n: 14,
    title: "Sample Interaction — Category E",
    short: "Explaining a category",
    render: () => <Slide14 />,
  },
  { n: 15, title: "Expected Impact", short: "Small info, real change", render: () => <Slide15 /> },
  { n: 16, title: "Limitations", short: "Honest boundaries", render: () => <Slide16 /> },
  { n: 17, title: "Future Scope", short: "Next steps", render: () => <Slide17 /> },
  { n: 18, title: "Key Learning", short: "One line he can trust", render: () => <Slide18 /> },
  {
    n: 19,
    title: "Thank You",
    short: "Acknowledgements",
    dark: true,
    render: (ctx) => <Slide19 onOpenDemo={ctx.openDemo} />,
  },
];
