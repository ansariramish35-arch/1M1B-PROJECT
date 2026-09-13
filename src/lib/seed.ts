import { count } from "drizzle-orm";
import { db } from "@/db";
import { knowledgeChunks } from "@/db/schema";

/** Monitoring stations used in the demo knowledge base (illustrative data,
 *  modelled on the format of public UPPCB advisories). */
export const STATIONS = [
  {
    name: "Upstream Gomti (Kukrail)",
    short: "Kukrail",
    category: "C" as const,
    aliases: ["kukrail", "upstream", "origin", "kukrail river"],
  },
  {
    name: "Gaughat",
    short: "Gaughat",
    category: "D" as const,
    aliases: ["gaughat", "gao ghat", "gau ghat"],
  },
  {
    name: "Kudiyaghat",
    short: "Kudiyaghat",
    category: "D" as const,
    aliases: ["kudiyaghat", "kudiya ghat", "kudiya"],
  },
  {
    name: "Nishatganj",
    short: "Nishatganj",
    category: "E" as const,
    aliases: ["nishatganj", "nishat ganj", "nishat"],
  },
  {
    name: "Gomti Barrage",
    short: "Gomti Barrage",
    category: "E" as const,
    aliases: ["barrage", "gomti barrage"],
  },
  {
    name: "Downstream Gomti Barrage (Dilkusha)",
    short: "Dilkusha",
    category: "E" as const,
    aliases: ["dilkusha", "downstream", "after barrage"],
  },
];

/** Latest advisory month in the demo KB: the previous calendar month. */
export function advisoryMonth(): { label: string; dateISO: string; dateObj: Date } {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() - 1);
  return {
    label: d.toLocaleString("en-US", { month: "long", year: "numeric" }),
    dateISO: d.toISOString().slice(0, 10),
    dateObj: d,
  };
}

interface ChunkRow {
  kind: string;
  title: string;
  station: string | null;
  category: string | null;
  monthLabel: string | null;
  advisoryDate: string | null;
  tags: string[];
  content: string;
}

function buildRows(): ChunkRow[] {
  const adv = advisoryMonth();
  const rows: ChunkRow[] = [];

  const stationContent: Record<string, string> = {
    "Upstream Gomti (Kukrail)":
      "Monitoring station: Upstream Gomti at Kukrail, Lucknow. Designated best-use category: C (drinking water source after conventional treatment). Dissolved oxygen is fair, but faecal coliform exceeds the bathing limit. Direct contact should be limited; the water is not recommended for bathing or washing.",
    Gaughat:
      "Monitoring station: Gaughat, Lucknow. Designated best-use category: D (propagation of wild life and fisheries). Dissolved oxygen is low and faecal coliform is high. The stretch receives domestic sewage from city drains. Bathing and washing are not advised; avoid prolonged contact with the water.",
    Kudiyaghat:
      "Monitoring station: Kudiyaghat, Lucknow. Designated best-use category: D (propagation of wild life and fisheries). Low dissolved oxygen and elevated faecal coliform due to sewage discharge. Bathing, washing and fishing are not advised at this stretch.",
    Nishatganj:
      "Monitoring station: Nishatganj stretch, Lucknow. Designated best-use category: E (irrigation, industrial cooling and controlled waste disposal only). Sewage discharge causes persistent foam near the drains and oxygen levels are very low. Avoid all direct contact with the water.",
    "Gomti Barrage":
      "Monitoring station: Gomti Barrage, Lucknow. Designated best-use category: E (irrigation, industrial cooling and controlled waste disposal only). The water is not suitable for bathing, washing, fishing or any water contact. Children may stay on the bank but should not enter the water.",
    "Downstream Gomti Barrage (Dilkusha)":
      "Monitoring station: Downstream of Gomti Barrage near Dilkusha, Lucknow. Designated best-use category: E. The downstream stretch carries the accumulated sewage load of the city; avoid all direct contact with the water.",
  };

  for (const st of STATIONS) {
    rows.push({
      kind: "advisory",
      title: `UPPCB monthly water-quality advisory — ${st.short} station`,
      station: st.name,
      category: st.category,
      monthLabel: adv.label,
      advisoryDate: adv.dateISO,
      tags: [...st.aliases, "bathing", "washing", "contact", "safety", "station"],
      content: stationContent[st.name] ?? "",
    });
  }

  const criteria: Array<[string, string, string]> = [
    [
      "A",
      "Category A — Drinking water source without conventional treatment but after disinfection. This is the highest quality class in the CPCB designated best-use scale.",
      "Drinking water source without conventional treatment but after disinfection.",
    ],
    [
      "B",
      "Category B — Outdoor bathing (organised). Water of this class is considered suitable for bathing under organised supervision. It is the benchmark most city ghats would need to reach.",
      "Outdoor bathing (organised).",
    ],
    [
      "C",
      "Category C — Drinking water source after conventional treatment. The water still needs treatment before drinking and is not recommended for bathing.",
      "Drinking water source after conventional treatment.",
    ],
    [
      "D",
      "Category D — Propagation of wild life and fisheries. Water quality is poor for human contact; bathing and washing are not advised.",
      "Propagation of wild life and fisheries.",
    ],
    [
      "E",
      "Category E — Irrigation, industrial cooling and controlled waste disposal. This is the lowest water-quality category; the water is not fit for bathing, washing, fishing or any direct contact.",
      "Irrigation, industrial cooling and controlled waste disposal.",
    ],
  ];
  for (const [letter, content, short] of criteria) {
    rows.push({
      kind: "criteria",
      title: `CPCB water-quality category ${letter}`,
      station: null,
      category: letter,
      monthLabel: null,
      advisoryDate: null,
      tags: [`category ${letter}`, `category${letter}`, "criteria", "classification", letter.toLowerCase(), short.split(" ")[0].toLowerCase()],
      content,
    });
  }

  const faqs: Array<{ title: string; tags: string[]; content: string }> = [
    {
      title: "Does rain make the river safe?",
      tags: ["rain", "baarish", "monsoon", "weather", "safe"],
      content:
        "Rain does not make the river safe. Heavy rain washes drains, garbage and open sewage into the Gomti, so pollution load often rises after storms. Dilution can make the water look better for a day or two, but bacteria and sewage return quickly. Always rely on the latest official advisory rather than appearance.",
    },
    {
      title: "What does foam on the river mean?",
      tags: ["foam", "jhag", "froth", "detergent", "sewage", "nishatganj"],
      content:
        "White foam on the Gomti usually indicates detergents and untreated sewage mixing into the river, most visibly near drain outfalls such as the Nishatganj stretch. Foam is a visible warning sign: avoid touching the foam or the water nearby, and keep children away from it.",
    },
    {
      title: "Water looks clean — is it safe?",
      tags: ["looks", "clean", "appearance", "colour", "smell"],
      content:
        "Appearance does not reveal bacteria, dissolved oxygen or pollution load. Water that looks clean after rain can still carry faecal coliform and sewage contamination. Safety verdicts should come from monitoring data, not from how the water looks.",
    },
    {
      title: "Children playing near the river",
      tags: ["children", "kids", "play", "bachche", "khel", "school"],
      content:
        "Children may play on the river bank, but on stretches classified Category D or E they should not enter the water. If they touch the water, hands should be washed with soap afterwards. Keep children away from foam patches and drain outfalls.",
    },
    {
      title: "About Gomti Saathi's data",
      tags: ["data", "source", "documents", "uppcb", "cpcb", "about"],
      content:
        "Gomti Saathi answers only from official documents: UPPCB monthly water-quality advisories, CPCB water-quality classification criteria and CPCB permissible-limit summaries, plus citizen FAQ notes from field visits. This live demo knowledge base is illustrative and modelled on the format of those public documents.",
    },
  ];
  for (const f of faqs) {
    rows.push({
      kind: "faq",
      title: f.title,
      station: null,
      category: null,
      monthLabel: null,
      advisoryDate: null,
      tags: f.tags,
      content: f.content,
    });
  }

  return rows;
}

let seeding: Promise<void> | null = null;

/** Idempotent: seeds the knowledge base on first use. */
export function ensureSeeded(): Promise<void> {
  if (!seeding) {
    seeding = (async () => {
      const [row] = await db.select({ n: count() }).from(knowledgeChunks);
      if (row.n > 0) return;
      await db.insert(knowledgeChunks).values(buildRows());
    })().catch((err) => {
      seeding = null;
      throw err;
    });
  }
  return seeding;
}
