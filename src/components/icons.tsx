import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function base(props: P) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export const IconWaves = (p: P) => (
  <svg {...base(p)}>
    <path d="M2 7c1.7 0 1.7 1.4 3.4 1.4S7.1 7 8.8 7s1.7 1.4 3.4 1.4S13.9 7 15.6 7s1.7 1.4 3.4 1.4S20.3 7 22 7" />
    <path d="M2 12.5c1.7 0 1.7 1.4 3.4 1.4s1.7-1.4 3.4-1.4 1.7 1.4 3.4 1.4 1.7-1.4 3.4-1.4 1.7 1.4 3.4 1.4 1.3-1.4 3-1.4" />
    <path d="M2 18c1.7 0 1.7 1.4 3.4 1.4S7.1 18 8.8 18s1.7 1.4 3.4 1.4 1.7-1.4 3.4-1.4 1.7 1.4 3.4 1.4 1.3-1.4 3-1.4" />
  </svg>
);

export const IconDroplet = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3.5s6 6.2 6 10.3a6 6 0 0 1-12 0C6 9.7 12 3.5 12 3.5Z" />
    <path d="M9.5 14.2a2.6 2.6 0 0 0 2.1 2.6" />
  </svg>
);

export const IconFlask = (p: P) => (
  <svg {...base(p)}>
    <path d="M9.5 3h5M10.5 3v5.2L5.2 17a2.4 2.4 0 0 0 2.1 3.5h9.4a2.4 2.4 0 0 0 2.1-3.5L13.5 8.2V3" />
    <path d="M7.5 14.5h9" />
  </svg>
);

export const IconShield = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3 5 5.8v5.4c0 4.4 3 8.4 7 9.8 4-1.4 7-5.4 7-9.8V5.8L12 3Z" />
    <path d="m9.2 12 2 2 3.6-3.8" />
  </svg>
);

export const IconEye = (p: P) => (
  <svg {...base(p)}>
    <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="2.6" />
  </svg>
);

export const IconUsers = (p: P) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8.2" r="3.2" />
    <path d="M3.5 19.5c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
    <path d="M15.4 5.6a3.2 3.2 0 0 1 0 5.3M17.6 15.1c1.6.7 2.6 2.2 3 4.4" />
  </svg>
);

export const IconPin = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s7-6 7-11.2A7 7 0 0 0 5 9.8C5 15 12 21 12 21Z" />
    <circle cx="12" cy="9.6" r="2.4" />
  </svg>
);

export const IconFile = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 3h7l4 4v14H7V3Z" />
    <path d="M14 3v4h4M10 12h5M10 16h5" />
  </svg>
);

export const IconSparkle = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4.5 13.8 9l4.5 1.8-4.5 1.8L12 17l-1.8-4.4L5.7 10.8 10.2 9 12 4.5Z" />
    <path d="M18.5 3.5v3M17 5h3M5.5 17v3M4 18.5h3" />
  </svg>
);

export const IconAlert = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4 2.8 19.5h18.4L12 4Z" />
    <path d="M12 10v4.2M12 17.2v.1" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="m4.5 12.5 5 5L19.5 6.5" />
  </svg>
);

export const IconX = (p: P) => (
  <svg {...base(p)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const IconArrowLeft = (p: P) => (
  <svg {...base(p)}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </svg>
);

export const IconArrowDown = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4v16M6 14l6 6 6-6" />
  </svg>
);

export const IconGrid = (p: P) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="7" height="7" rx="1.2" />
    <rect x="13" y="4" width="7" height="7" rx="1.2" />
    <rect x="4" y="13" width="7" height="7" rx="1.2" />
    <rect x="13" y="13" width="7" height="7" rx="1.2" />
  </svg>
);

export const IconChat = (p: P) => (
  <svg {...base(p)}>
    <path d="M20 11.6c0 4-3.6 7.2-8 7.2-.9 0-1.8-.1-2.6-.4L5 19.6l1-3.3A6.8 6.8 0 0 1 4 11.6c0-4 3.6-7.2 8-7.2s8 3.2 8 7.2Z" />
  </svg>
);

export const IconBook = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
    <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
  </svg>
);

export const IconScale = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4v16M8 20h8M12 4c-2 1.2-4 1.2-6 1.2M12 4c2 1.2 4 1.2 6 1.2" />
    <path d="m6 5.2-2.5 6a3 3 0 0 0 5 0l-2.5-6ZM18 5.2l-2.5 6a3 3 0 0 0 5 0l-2.5-6Z" />
  </svg>
);

export const IconLock = (p: P) => (
  <svg {...base(p)}>
    <rect x="5.5" y="10.5" width="13" height="9.5" rx="1.6" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14.5v2" />
  </svg>
);

export const IconClock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconSearch = (p: P) => (
  <svg {...base(p)}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="m15.5 15.5 5 5" />
  </svg>
);

export const IconLayers = (p: P) => (
  <svg {...base(p)}>
    <path d="m12 3.5 9 4.7-9 4.7-9-4.7 9-4.7Z" />
    <path d="m4.5 12.8 7.5 4 7.5-4M4.5 16.8l7.5 4 7.5-4" />
  </svg>
);

export const IconSend = (p: P) => (
  <svg {...base(p)}>
    <path d="M20.5 3.5 3.5 10.2l6.6 2.6 2.7 7.7 7.7-17Z" />
    <path d="m10.1 12.8 4.6-4.6" />
  </svg>
);

export const IconMegaphone = (p: P) => (
  <svg {...base(p)}>
    <path d="M3.5 10.5v3.5h3l4.5 4.5v-13L6.5 10h-3Z" />
    <path d="M14.5 8.5a4.5 4.5 0 0 1 0 7.5M17.5 6a8.5 8.5 0 0 1 0 12.5" />
  </svg>
);

export const IconHeart = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.2 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
    <path d="M4 12h4l1.6-2.8 2.4 5 1.8-3.2H20" />
  </svg>
);

export const IconSprout = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 20.5V11" />
    <path d="M12 11c0-3.5 2.5-6.5 7.5-6.5 0 4-2.5 6.5-7.5 6.5ZM12 14.5c0-2.8-2-5-6-5 0 3.2 2 5 6 5Z" />
  </svg>
);

export const IconExpand = (p: P) => (
  <svg {...base(p)}>
    <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
  </svg>
);

export const IconMic = (p: P) => (
  <svg {...base(p)}>
    <rect x="9" y="3.5" width="6" height="11" rx="3" />
    <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v2.5" />
  </svg>
);

export const IconCamera = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 8h3l1.6-2.5h6.8L17 8h3v11H4V8Z" />
    <circle cx="12" cy="13" r="3.2" />
  </svg>
);

export const IconPhone = (p: P) => (
  <svg {...base(p)}>
    <rect x="7" y="3" width="10" height="18" rx="2" />
    <path d="M11 17.5h2" />
  </svg>
);

export const IconRefresh = (p: P) => (
  <svg {...base(p)}>
    <path d="M20 12a8 8 0 1 1-2.3-5.6M20 3.5V8h-4.5" />
  </svg>
);

export const IconInfo = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5M12 7.8v.1" />
  </svg>
);

export const IconKeyboard = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="7" width="18" height="11" rx="1.8" />
    <path d="M7 10.5h.1M10.5 10.5h.1M14 10.5h.1M17.5 10.5h.1M7 14.5h10" />
  </svg>
);
