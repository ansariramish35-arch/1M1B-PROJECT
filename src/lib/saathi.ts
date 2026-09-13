import { db } from "@/db";
import { knowledgeChunks } from "@/db/schema";
import { STATIONS, ensureSeeded } from "@/lib/seed";

export type Verdict = "safe" | "caution" | "avoid" | "info";
export type Lang = "en" | "hinglish" | "hi";

export interface SourceRef {
  title: string;
  detail?: string;
}

export interface SaathiAnswer {
  text: string;
  verdict: Verdict;
  station?: string;
  category?: string;
  monthLabel?: string;
  sources: SourceRef[];
}

type Chunk = typeof knowledgeChunks.$inferSelect;
type Activity = "bathing" | "washing" | "fishing" | "children" | "contact";

/* ------------------------------------------------------------------ */
/* Language detection — reply in the same language as the user         */
/* ------------------------------------------------------------------ */

const HINGLISH_WORDS =
  /\b(kya|hai|hain|ke|ki|ka|kaise|paas|nahana|nahane|dhona|kapde|machhli|bachche|bacche|jhag|baarish|pani|paani|matlab|bataiye|batao|kitna|kaun|kab|nadi|ghat|chahiye|khelna|safe|khatarnak)\b/i;

export function detectLang(q: string): Lang {
  if (/[\u0900-\u097F]/.test(q)) return "hi";
  if (HINGLISH_WORDS.test(q)) return "hinglish";
  return "en";
}

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function categoryVerdict(cat: string): Verdict {
  if (cat === "A" || cat === "B") return "safe";
  if (cat === "C") return "caution";
  return "avoid";
}

function monthsBetween(dateISO: string, now = new Date()): number {
  const d = new Date(dateISO);
  return (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
}

function resolveStation(q: string) {
  let best: { name: string; hits: number } | null = null;
  for (const st of STATIONS) {
    const hits = st.aliases.filter((a) => q.includes(a)).length;
    if (hits > 0 && (!best || hits > best.hits)) best = { name: st.name, hits };
  }
  return best?.name;
}

function detectActivity(q: string): Activity {
  if (/child|kid|bachch|bacche|बच्च|खेल|play|school/.test(q)) return "children";
  if (/wash|kapd|धो|laundry|dhona/.test(q)) return "washing";
  if (/fish|machhl|मछल/.test(q)) return "fishing";
  if (/bath|swim|tair|snaan|snan|नहा|नहान/.test(q)) return "bathing";
  return "contact";
}

const stationList = STATIONS.map((s) => s.short).join(", ");

/* ------------------------------------------------------------------ */
/* Localised phrase book                                               */
/* ------------------------------------------------------------------ */

const VERDICT_LEAD: Record<Lang, Record<"safe" | "caution" | "avoid", string>> = {
  en: {
    safe: "This stretch is currently suitable for bathing",
    caution: "Caution — limit contact with the water",
    avoid: "Avoid contact with the water",
  },
  hinglish: {
    safe: "Yah stretch abhi nahane ke liye theek hai",
    caution: "Savdhani — paani se contact kam rakhein",
    avoid: "Paani se door rahein — yah stretch safe nahi hai",
  },
  hi: {
    safe: "यह हिस्सा अभी नहाने के लिए उपयुक्त है",
    caution: "सावधानी — पानी से संपर्क सीमित रखें",
    avoid: "पानी से दूर रहें — यह हिस्सा सुरक्षित नहीं है",
  },
};

const CAT_SHORT: Record<Lang, Record<string, string>> = {
  en: {
    A: "Category A is the highest class — fit for drinking after disinfection.",
    B: "Category B is suitable for organised outdoor bathing.",
    C: "Category C is a drinking-water source after treatment — not a bathing category.",
    D: "Category D supports wildlife and fisheries, and is not fit for bathing or washing.",
    E: "Category E is the lowest class, suitable only for controlled waste disposal — not for bathing, washing or any contact.",
  },
  hinglish: {
    A: "Category A sabse upar ki class hai — disinfection ke baad peene layak.",
    B: "Category B organised nahane ke liye theek maani jaati hai.",
    C: "Category C treatment ke baad peene ke liye hai — nahane ki category nahi hai.",
    D: "Category D sirf wildlife aur fisheries ke liye hai — nahana ya dhona sahi nahi.",
    E: "Category E sabse neeche category hai — sirf controlled waste disposal ke liye; nahana, dhona ya koi contact safe nahi hai.",
  },
  hi: {
    A: "श्रेणी A सबसे उच्चतम वर्ग है — कीटाणुशोधन के बाद पीने योग्य।",
    B: "श्रेणी B व्यवस्थित स्नान के लिए उपयुक्त मानी जाती है।",
    C: "श्रेणी C उपचार के बाद पेयजल स्रोत है — स्नान की श्रेणी नहीं।",
    D: "श्रेणी D केवल वन्यजीव और मत्स्य पालन के लिए है — स्नान या धुलाई उचित नहीं।",
    E: "श्रेणी E सबसे निचली श्रेणी है — केवल नियंत्रित अपशिष्ट निपटान के लिए; स्नान, धुलाई या कोई संपर्क सुरक्षित नहीं।",
  },
};

const ACTIVITY_LINE: Record<Lang, Record<"avoid" | "caution" | "safe", Record<Activity, string>>> = {
  en: {
    avoid: {
      bathing: "Bathing and washing are not advised at this stretch.",
      washing: "Washing clothes in this stretch is not advised.",
      fishing: "Fishing is not advised in this stretch.",
      children:
        "Children may play on the bank, but they should not enter the water, and they should wash their hands afterwards.",
      contact: "Avoid entering or using the water here.",
    },
    caution: {
      bathing: "Bathing is not recommended; keep contact with the water minimal.",
      washing: "Avoid washing here; the water is not in a bathing-grade condition.",
      fishing: "Fishing is not recommended at this stretch.",
      children: "Keep children out of the water at this stretch and wash hands after any contact.",
      contact: "Limit contact with the water at this stretch.",
    },
    safe: {
      bathing: "Bathing is generally acceptable as per the latest advisory; re-check after heavy rain.",
      washing: "Washing is acceptable as per the latest advisory.",
      fishing: "Fishing conditions are acceptable as per the latest advisory.",
      children: "Children can enjoy the bank; still supervise them near the water.",
      contact: "Normal contact with the water is acceptable as per the latest advisory.",
    },
  },
  hinglish: {
    avoid: {
      bathing: "Is stretch par nahana aur kapde dhona salah nahi diya jata.",
      washing: "Is stretch par kapde dhona salah nahi diya jata.",
      fishing: "Is stretch par machhli pakadna salah nahi diya jata.",
      children:
        "Bachche kinare par khel sakte hain, par paani mein nahi jaana chahiye; baad mein haath sabun se dho lein.",
      contact: "Yahan paani mein jaane ya istemaal karne se bachein.",
    },
    caution: {
      bathing: "Nahana recommended nahi hai; paani se contact kam rakhein.",
      washing: "Yahan dhona taliye; paani nahane layak quality mein nahi hai.",
      fishing: "Is stretch par machhli pakadna recommended nahi hai.",
      children: "Bachchon ko paani se door rakhein; contact ke baad haath dho lein.",
      contact: "Is stretch par paani se contact kam rakhein.",
    },
    safe: {
      bathing: "Latest advisory ke hisaab se nahana aam taur par theek hai; tez baarish ke baad phir check karein.",
      washing: "Latest advisory ke hisaab se dhona theek hai.",
      fishing: "Latest advisory ke hisaab se machhli pakadna theek hai.",
      children: "Bachche kinare ka aanand le sakte hain; phir bhi paani ke paas nigrani rakhein.",
      contact: "Latest advisory ke hisaab se paani se aam contact theek hai.",
    },
  },
  hi: {
    avoid: {
      bathing: "इस हिस्से में नहाना और कपड़े धोना उचित नहीं है।",
      washing: "इस हिस्से में कपड़े धोना उचित नहीं है।",
      fishing: "इस हिस्से में मछली पकड़ना उचित नहीं है।",
      children: "बच्चे किनारे पर खेल सकते हैं, लेकिन पानी में नहीं जाने चाहिए; बाद में हाथ साबुन से धोएं।",
      contact: "यहाँ पानी में जाने या उससे संपर्क से बचें।",
    },
    caution: {
      bathing: "नहाना अनुशंसित नहीं है; पानी से संपर्क न्यूनतम रखें।",
      washing: "यहाँ धोने से बचें; पानी स्नान-योग्य गुणवत्ता में नहीं है।",
      fishing: "इस हिस्से में मछली पकड़ना अनुशंसित नहीं है।",
      children: "बच्चों को पानी से दूर रखें; संपर्क के बाद हाथ धोएं।",
      contact: "इस हिस्से में पानी से संपर्क सीमित रखें।",
    },
    safe: {
      bathing: "नवीनतम सलाह के अनुसार नहाना सामान्यतः ठीक है; तेज़ बारिश के बाद पुनः जाँचें।",
      washing: "नवीनतम सलाह के अनुसार धुलाई ठीक है।",
      fishing: "नवीनतम सलाह के अनुसार मछली पकड़ना ठीक है।",
      children: "बच्चे किनारे का आनंद ले सकते हैं; फिर भी पानी के पास निगरानी रखें।",
      contact: "नवीनतम सलाह के अनुसार पानी से सामान्य संपर्क ठीक है।",
    },
  },
};

const SOURCE_LINE: Record<Lang, (station: string, month: string) => string> = {
  en: (s, m) => `Source: UPPCB monthly water-quality advisory — ${s} station, ${m}. Criteria: CPCB classification.`,
  hinglish: (s, m) => `Source: UPPCB monthly advisory — ${s} station, ${m}. Criteria: CPCB classification.`,
  hi: (s, m) => `स्रोत: यूपीपीसीबी मासिक जल-गुणवत्ता सलाह — ${s} स्टेशन, ${m}। मानदंड: सीपीसीबी वर्गीकरण।`,
};

const STALE_LINE: Record<Lang, (month: string) => string> = {
  en: (m) => `Note: this data is from ${m} (older than two months). Please check the latest UPPCB advisory before relying on it.`,
  hinglish: (m) => `Dhyan dein: yah data ${m} ka hai (do mahine se purana). Bharosa karne se pehle latest UPPCB advisory check karein.`,
  hi: (m) => `ध्यान दें: यह डेटा ${m} का है (दो महीने से पुराना)। भरोसा करने से पहले नवीनतम यूपीपीसीबी सलाह जाँचें।`,
};

const CAT_DEF: Record<string, string> = {
  A: "Drinking water source without conventional treatment but after disinfection.",
  B: "Outdoor bathing (organised).",
  C: "Drinking water source after conventional treatment.",
  D: "Propagation of wild life and fisheries.",
  E: "Irrigation, industrial cooling and controlled waste disposal.",
};

/* ------------------------------------------------------------------ */
/* Answer builders                                                     */
/* ------------------------------------------------------------------ */

function buildStationAnswer(
  stationName: string,
  chunk: Chunk | undefined,
  activity: Activity,
  lang: Lang
): SaathiAnswer {
  const st = STATIONS.find((s) => s.name === stationName);
  const cat = chunk?.category ?? st?.category ?? "E";
  const month = chunk?.monthLabel ?? "latest month";
  const verdict = categoryVerdict(cat);
  const level = verdict === "info" ? "avoid" : verdict;

  const lines = [`${VERDICT_LEAD[lang][level]}.`, ""];
  if (lang === "en") {
    lines.push(`The latest UPPCB advisory (${month}) classifies the ${stationName} stretch as Category ${cat}. ${CAT_SHORT[lang][cat]}`);
  } else if (lang === "hinglish") {
    lines.push(`Latest UPPCB advisory (${month}) ke hisaab se ${stationName} stretch Category ${cat} mein aata hai. ${CAT_SHORT[lang][cat]}`);
  } else {
    lines.push(`नवीनतम यूपीपीसीबी सलाह (${month}) के अनुसार ${stationName} हिस्सा श्रेणी ${cat} में आता है। ${CAT_SHORT[lang][cat]}`);
  }
  lines.push("", ACTIVITY_LINE[lang][level][activity]);

  if (chunk?.advisoryDate && monthsBetween(chunk.advisoryDate) > 2) {
    lines.push("", STALE_LINE[lang](month));
  }

  lines.push("", SOURCE_LINE[lang](stationName, month));

  return {
    text: lines.join("\n"),
    verdict,
    station: stationName,
    category: cat,
    monthLabel: month,
    sources: [
      { title: "UPPCB monthly water-quality advisory", detail: `${stationName} station · ${month}` },
      { title: "CPCB water-quality classification criteria" },
    ],
  };
}

function buildCategoryAnswer(letter: string, chunk: Chunk | undefined, lang: Lang): SaathiAnswer {
  const def = chunk?.content ?? CAT_DEF[letter] ?? "";
  const cpcb = { title: "CPCB water-quality classification criteria" };

  if (letter === "E") {
    const text =
      lang === "en"
        ? `Category E is the lowest water-quality category. It is suitable only for controlled waste disposal — not for bathing, washing, fishing or any direct contact.\n\nIt often indicates severe pollution, low oxygen and sewage contamination.\n\n${def ? `${def}\n\n` : ""}Source: CPCB Water Quality Classification Criteria.`
        : lang === "hinglish"
          ? `Category E sabse neeche water-quality category hai. Yeh sirf controlled waste disposal ke liye hoti hai — nahana, kapde dhona, machhli pakadna ya koi bhi direct contact safe nahi hai.\n\nIska matlab aksar severe pollution, kam oxygen aur sewage contamination hota hai.\n\nSource: CPCB Water Quality Classification Criteria.`
          : `श्रेणी E सबसे निचली जल-गुणवत्ता श्रेणी है। यह केवल नियंत्रित अपशिष्ट निपटान के लिए उपयुक्त है — नहाने, कपड़े धोने, मछली पकड़ने या किसी भी सीधे संपर्क के लिए नहीं।\n\nयह अक्सर गंभीर प्रदूषण, कम ऑक्सीजन और मलजल संदूषण का संकेत है।\n\nस्रोत: सीपीसीबी जल-गुणवत्ता वर्गीकरण मानदंड।`;
    return { text, verdict: "info", category: letter, sources: [cpcb] };
  }

  const implication =
    letter === "A"
      ? "The best class — rare inside city stretches."
      : letter === "B"
        ? "Good enough for organised bathing — the goal for Lucknow's ghats."
        : letter === "C"
          ? "Needs treatment before drinking; bathing is not recommended."
          : "Poor for human contact; bathing and washing are not advised.";

  const text =
    lang === "en"
      ? `Category ${letter}: ${def}\n\nWhat it means for you: ${implication}\n\nSource: CPCB Water Quality Classification Criteria.`
      : lang === "hinglish"
        ? `Category ${letter} ka matlab: ${def}\n\nAapke liye matlab: ${implication}\n\nSource: CPCB Water Quality Classification Criteria.`
        : `श्रेणी ${letter} का अर्थ: ${def}\n\nआपके लिए अर्थ: ${implication}\n\nस्रोत: सीपीसीबी जल-गुणवत्ता वर्गीकरण मानदंड।`;

  return { text, verdict: "info", category: letter, sources: [cpcb] };
}

function buildFaqAnswer(chunk: Chunk | undefined, fallback: string, lang: Lang, extra?: string): SaathiAnswer {
  const body = chunk?.content ?? fallback;
  const src: SourceRef = { title: chunk?.title ?? "Gomti Saathi citizen FAQ", detail: "Field-visit notes" };
  let text = body;
  if (extra) text += `\n\n${extra}`;
  text += lang === "hi" ? `\n\nस्रोत: ${chunk?.title ?? "Gomti Saathi citizen FAQ"}` : `\n\nSource: ${chunk?.title ?? "Gomti Saathi citizen FAQ"}.`;
  return { text, verdict: "info", sources: [src] };
}

function buildFallback(lang: Lang): SaathiAnswer {
  const text =
    lang === "en"
      ? `Namaste! I am Gomti Saathi. I turn official UPPCB/CPCB water-quality documents into simple answers.\n\nTry asking:\n• “Can we bathe near Gaughat?”\n• “What does Category E mean?”\n• “Is foam near Nishatganj dangerous?”\n• “Does rain make the river safe?”\n\nI answer only from the documents I retrieve — I never invent readings, dates or station names.`
      : lang === "hinglish"
        ? `Namaste! Main Gomti Saathi hoon. Main UPPCB/CPCB ke official documents ko aasan jawabon mein badalta hoon.\n\nPoochh kar dekhein:\n• “Gaughat ke paas nahana safe hai?”\n• “Category E ka matlab kya hai?”\n• “Nishatganj ke jhaag khatarnak hain kya?”\n• “Kya baarish se nadi safe ho jaati hai?”\n\nMain sirf retrieve kiye gaye documents se jawab deta hoon — readings ya dates ka andaza nahi lagata.`
        : `नमस्ते! मैं गोमती साथी हूँ। मैं यूपीपीसीबी/सीपीसीबी के आधिकारिक दस्तावेज़ों को सरल उत्तरों में बदलता हूँ।\n\nपूछकर देखें:\n• “गौघाट के पास नहाना सुरक्षित है?”\n• “श्रेणी E का क्या मतलब है?”\n• “क्या बारिश से नदी साफ हो जाती है?”\n\nमैं केवल प्राप्त दस्तावेज़ों से उत्तर देता हूँ — कोई अनुमानित आँकड़ा नहीं।`;
  return {
    text,
    verdict: "info",
    sources: [{ title: "Gomti Saathi system-prompt safety rules" }],
  };
}

function buildPickStation(lang: Lang, activity: Activity): SaathiAnswer {
  const text =
    lang === "en"
      ? `I want to give you a location-specific answer. Which stretch do you mean? In this demo I cover: ${stationList}.\n\nFor example, ask: “Can we bathe near Gaughat?”`
      : lang === "hinglish"
        ? `Main location-specific jawab dena chahta hoon. Aap kaunse stretch ke baare mein poochh rahe hain? Is demo mein main in stations ko cover karta hoon: ${stationList}.\n\nJaise poochein: “Gaughat ke paas nahana safe hai?”`
        : `मैं स्थान-विशिष्ट उत्तर देना चाहता हूँ। आप किस हिस्से के बारे में पूछ रहे हैं? इस डेमो में मैं इन स्टेशनों को कवर करता हूँ: ${stationList}।`;
  return {
    text,
    verdict: "info",
    sources: [{ title: "Gomti Saathi coverage", detail: `${STATIONS.length} monitoring stations` }],
  };
}

function buildFreshness(lang: Lang, chunks: Chunk[]): SaathiAnswer {
  const adv = chunks.find((c) => c.kind === "advisory");
  const month = adv?.monthLabel ?? "the latest month";
  const text =
    lang === "en"
      ? `Gomti Saathi uses UPPCB's monthly water-quality advisories. The latest data in this demo is from ${month} and covers these stations: ${stationList}.\n\nAdvisories are refreshed every month — for the newest report, always check the official UPPCB publication.\n\nSource: UPPCB monthly water-quality advisory, ${month}.`
      : lang === "hinglish"
        ? `Gomti Saathi UPPCB ki monthly advisories istemaal karta hai. Is demo mein latest data ${month} ka hai aur in stations ko cover karta hai: ${stationList}.\n\nHar mahine nayi advisory aati hai — sabse fresh report ke liye official UPPCB publication check karein.`
        : `गोमती साथी यूपीपीसीबी की मासिक सलाह का उपयोग करता है। इस डेमो में नवीनतम डेटा ${month} का है और इन स्टेशनों को कवर करता है: ${stationList}।\n\nहर माह नई सलाह जारी होती है — नवीनतम रिपोर्ट के लिए आधिकारिक यूपीपीसीबी प्रकाशन देखें।`;
  return {
    text,
    verdict: "info",
    monthLabel: month,
    sources: [{ title: "UPPCB monthly water-quality advisory", detail: month }],
  };
}

/* ------------------------------------------------------------------ */
/* Main entry point                                                    */
/* ------------------------------------------------------------------ */

export async function answerQuestion(question: string): Promise<SaathiAnswer> {
  await ensureSeeded();
  const chunks = await db.select().from(knowledgeChunks);
  const lang = detectLang(question);
  const q = question.toLowerCase();

  const stationName = resolveStation(q);
  const stationChunk = stationName ? chunks.find((c) => c.kind === "advisory" && c.station === stationName) : undefined;

  // 1. Category definition — "What does Category E mean?"
  const catMatch = q.match(/(?:category|shreni|categorie|वर्ग|श्रेणी|कैटेगरी)[\s\-]*([a-e])\b/i);
  if (catMatch) {
    const letter = catMatch[1].toUpperCase();
    const chunk = chunks.find((c) => c.kind === "criteria" && c.category === letter);
    return buildCategoryAnswer(letter, chunk, lang);
  }

  // 2. Foam — default to the Nishatganj drain outfall
  if (/\bfoam\b|froth|jhag|झाग|फेन/.test(q)) {
    const foamStation = stationName ?? "Nishatganj";
    const chunk = chunks.find((c) => c.kind === "advisory" && c.station === foamStation) ?? stationChunk;
    const cat = chunk?.category ?? "E";
    const month = chunk?.monthLabel ?? "latest month";
    const body = chunks.find((c) => c.kind === "faq" && /foam/i.test(c.title))?.content;
    const text =
      lang === "en"
        ? `${body ?? "Foam usually indicates detergents and untreated sewage mixing into the river."}\n\nNear ${foamStation}, the latest advisory (${month}) classifies the water as Category ${cat} — avoid touching the foam or the water, and keep children away from it.\n\n${SOURCE_LINE.en(foamStation, month)}`
        : lang === "hinglish"
          ? `Nadi par jhaag aam taur par detergent aur untreated sewage ka sanket hai.\n\n${foamStation} ke paas latest advisory (${month}) paani ko Category ${cat} maanti hai — jhaag ya paani ko chhune se bachein, aur bachchon ko door rakhein.\n\n${SOURCE_LINE.hinglish(foamStation, month)}`
          : `नदी पर झाग आमतौर पर डिटर्जेंट और अनुपचारित मलजल का संकेत है।\n\n${foamStation} के पास नवीनतम सलाह (${month}) पानी को श्रेणी ${cat} में रखती है — झाग या पानी को छूने से बचें और बच्चों को दूर रखें।\n\n${SOURCE_LINE.hi(foamStation, month)}`;
    return {
      text,
      verdict: "avoid",
      station: foamStation,
      category: cat,
      monthLabel: month,
      sources: [
        { title: "UPPCB monthly water-quality advisory", detail: `${foamStation} station · ${month}` },
        { title: "What does foam on the river mean?", detail: "Citizen FAQ" },
      ],
    };
  }

  // 3. Rain
  if (/\brain\b|baarish|barish|बारिश|monsoon/.test(q)) {
    const chunk = chunks.find((c) => c.kind === "faq" && /rain/i.test(c.title));
    const warn =
      lang === "en"
        ? "Appearance is not a safety test — check the station's latest advisory."
        : lang === "hinglish"
          ? "Dikhawat suraksha ka saboot nahi hai — apne station ki latest advisory check karein."
          : "दिखावट सुरक्षा का प्रमाण नहीं है — अपने स्टेशन की नवीनतम सलाह जाँचें।";
    return buildFaqAnswer(chunk, "Rain does not make the river safe.", lang, warn);
  }

  // 4. Appearance — "looks clean"
  if (/looks clean|clean looking|dikhta|saaf dikhta|दिखता|दिखने|appearance/.test(q)) {
    const chunk = chunks.find((c) => c.kind === "faq" && /clean/i.test(c.title));
    return buildFaqAnswer(chunk, "Appearance does not reveal bacteria or pollution load.", lang);
  }

  // 5. Station-specific question
  if (stationName) {
    const activity = detectActivity(q);
    return buildStationAnswer(stationName, stationChunk, activity, lang);
  }

  // 6. Activity question without a station
  if (/(bath|nahana|wash|dhona|fish|machhl|child|kid|bachch|बच्च|नहा|धो|मछल|play|khel)/i.test(q)) {
    return buildPickStation(lang, detectActivity(q));
  }

  // 7. Freshness / data questions
  if (/\blatest\b|new report|which month|data freshness|advisory|ताज़ा|नई रिपोर्ट|महीन/.test(q)) {
    return buildFreshness(lang, chunks);
  }

  // 8. Fallback
  return buildFallback(lang);
}
