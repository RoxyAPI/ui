/**
 * One entry per demo card. The SDK call is the source of truth — both the
 * server-render snippet (Code tab) and the shadcn registry snippet (shadcn tab)
 * are derived from it. (tag, slug, pascal, heading, topic, description) come
 * from window.ROXY_COMPONENTS (see scripts/sync-manifest.ts).
 */

const PERSON1 = {
	date: '1990-01-15',
	time: '14:30:00',
	latitude: 19.076,
	longitude: 72.877,
	timezone: 'Asia/Kolkata',
};
const PERSON2 = {
	date: '1992-06-20',
	time: '09:15:00',
	latitude: 28.6139,
	longitude: 77.209,
	timezone: 'Asia/Kolkata',
};

const REGISTRY_BASE = 'https://cdn.jsdelivr.net/gh/RoxyAPI/ui@main/registry';
const UI_CDN = 'https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn';

const MANIFEST_BY_TAG = Object.fromEntries(
	(window.ROXY_COMPONENTS || []).map((c) => [c.tag, c]),
);

function lookup(tag) {
	const meta = MANIFEST_BY_TAG[tag];
	if (!meta) throw new Error(`Unknown tag in demo manifest: ${tag}`);
	return meta;
}

function serverRender(tag, body) {
	// body is indented one level for the shadcn RSC block; dedent it to sit at
	// the top level of this standalone server snippet.
	const fetchCode = body.replace(/^ {2}/gm, '');
	return `// server.ts (Node, Bun, Hono, or a Next.js route handler)
import { createRoxy } from '@roxyapi/sdk';

// Secret key, used server-side only. It never reaches the browser.
const roxy = createRoxy(process.env.ROXY_API_KEY);
${fetchCode}

// Inline the response; the element hydrates from the child JSON. Any backend
// can emit this markup (PHP, Python, Go). Load roxy-ui.js once per page.
const html = \`
  <script src="${UI_CDN}/roxy-ui.js" defer></script>
  <${tag}>
    <script type="application/json" class="roxy-data">\${JSON.stringify(data)}</script>
  </${tag}>
\`;`;
}

function shadcn(tag, body) {
	const { pascal, slug } = lookup(tag);
	return `# Install via shadcn
npx shadcn@latest add ${REGISTRY_BASE}/${slug}.json

# Use in your Next.js / React app (server component)
import { ${pascal} } from '@/components/roxy-ui/${slug}';
import { createRoxy } from '@roxyapi/sdk';

export default async function Page() {
  const roxy = createRoxy(process.env.ROXY_API_KEY!);
${body}
  return <${pascal} data={data} />;
}`;
}

function entry({ id, tag, seoLine, heading, topic, attrs = '', sdkCall, code, shadcn: shadcnOverride }) {
	const meta = lookup(tag);
	return {
		id,
		tag,
		heading: heading ?? meta.heading,
		topic: topic ?? meta.topic,
		seoLine,
		attrs,
		code: code ?? serverRender(tag, sdkCall),
		shadcn: shadcnOverride ?? shadcn(tag, sdkCall),
	};
}

window.ROXY_UI_DEMOS = [
	entry({
		id: 'natal',
		tag: 'roxy-natal-chart',
		seoLine: 'Natal chart web component for astrology APIs',
		sdkCall: `  const { data } = await roxy.astrology.generateNatalChart({
    body: ${JSON.stringify({ ...PERSON1, houseSystem: 'placidus' }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'synastry',
		tag: 'roxy-synastry-chart',
		seoLine: 'Synastry compatibility wheel and aspect table',
		sdkCall: `  const person1 = ${JSON.stringify(PERSON1, null, 2).replace(/\n/g, '\n  ')};
  const person2 = ${JSON.stringify(PERSON2, null, 2).replace(/\n/g, '\n  ')};
  const { data } = await roxy.astrology.calculateSynastry({ body: { person1, person2 } });`,
	}),
	entry({
		id: 'western-planets',
		tag: 'roxy-western-planets-table',
		seoLine: 'Western planetary positions table: sign, degree, house, motion',
		sdkCall: `  const { data } = await roxy.astrology.generateNatalChart({
    body: ${JSON.stringify({ ...PERSON1, houseSystem: 'placidus' }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'transits',
		tag: 'roxy-transits-table',
		seoLine: 'Live planet transits with aspects to a natal chart',
		sdkCall: `  const { data } = await roxy.astrology.calculateTransits({
    body: {
      date: '2026-05-11',
      time: '12:00:00',
      natalChart: ${JSON.stringify(PERSON1, null, 2).replace(/\n/g, '\n      ')},
    },
  });`,
	}),
	entry({
		id: 'moon',
		tag: 'roxy-moon-phase',
		seoLine: 'Current moon phase, illumination, and meaning',
		attrs: ' mode="current"',
		sdkCall: `  const { data } = await roxy.astrology.getCurrentMoonPhase();`,
	}),
	entry({
		id: 'horoscope',
		tag: 'roxy-horoscope-card',
		seoLine: 'Daily horoscope card for any zodiac sign',
		attrs: ' period="daily"',
		sdkCall: `  const { data } = await roxy.astrology.getDailyHoroscope({ path: { sign: 'aries' } });`,
	}),
	entry({
		id: 'compat',
		tag: 'roxy-compatibility-card',
		seoLine: 'Astrology, numerology, biorhythm compatibility breakdown',
		attrs: ' mode="astrology"',
		sdkCall: `  const { data } = await roxy.astrology.calculateCompatibility({
    body: {
      person1: ${JSON.stringify(PERSON1, null, 2).replace(/\n/g, '\n      ')},
      person2: ${JSON.stringify(PERSON2, null, 2).replace(/\n/g, '\n      ')},
    },
  });`,
	}),
	entry({
		id: 'kundli',
		tag: 'roxy-vedic-kundli',
		seoLine: 'Vedic kundli (D1) chart for matchmaking and natal',
		sdkCall: `  const { data } = await roxy.vedicAstrology.generateBirthChart({
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'divisional',
		tag: 'roxy-divisional-chart',
		seoLine: 'Vedic D2 to D60 divisional varga chart wheel',
		sdkCall: `  const { data } = await roxy.vedicAstrology.generateDivisionalChart({
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, latitude: PERSON1.latitude, longitude: PERSON1.longitude, division: 9 }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'kp-chart',
		tag: 'roxy-kp-chart',
		seoLine: 'Full KP chart with Ascendant, Placidus cusps, and planets',
		sdkCall: `  const { data } = await roxy.vedicAstrology.generateKpChart({
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'vedic-planets',
		tag: 'roxy-vedic-planets-table',
		seoLine: 'Vedic planetary positions: degree, nakshatra, pada, bhava, avastha',
		sdkCall: `  const { data } = await roxy.vedicAstrology.generateBirthChart({
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'kp',
		tag: 'roxy-kp-planets-table',
		seoLine: 'KP system sub-lord planet table for horary',
		sdkCall: `  const { data } = await roxy.vedicAstrology.getKpPlanets({
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'kp-ruling',
		tag: 'roxy-kp-ruling-planets',
		seoLine: 'KP ruling planets for horary timing',
		sdkCall: `  const { data } = await roxy.vedicAstrology.getKpRulingPlanets({
    body: ${JSON.stringify({ latitude: PERSON1.latitude, longitude: PERSON1.longitude, datetime: `${PERSON1.date}T${PERSON1.time}`, birthDate: PERSON1.date, birthTime: PERSON1.time }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'ashtakavarga',
		tag: 'roxy-ashtakavarga-grid',
		seoLine: 'Sarva and Bhinna ashtakavarga heatmap with bindu scores',
		sdkCall: `  const { data } = await roxy.vedicAstrology.calculateAshtakavarga({
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'shadbala',
		tag: 'roxy-shadbala-table',
		seoLine: 'Six-fold planetary strength bar with adequacy badges',
		sdkCall: `  const { data } = await roxy.vedicAstrology.calculateShadbala({
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'dasha',
		tag: 'roxy-dasha-timeline',
		seoLine: 'Mahadasha and antardasha timeline visualizer',
		attrs: ' period="major"',
		sdkCall: `  const { data } = await roxy.vedicAstrology.getMajorDashas({
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'guna',
		tag: 'roxy-guna-milan',
		seoLine: 'Ashtakoota guna milan score for kundli matching',
		sdkCall: `  const { data } = await roxy.vedicAstrology.calculateGunMilan({
    body: { person1: ${JSON.stringify(PERSON1)}, person2: ${JSON.stringify(PERSON2)} },
  });`,
	}),
	entry({
		id: 'panchang',
		tag: 'roxy-panchang-table',
		seoLine: 'Detailed panchang with tithi, nakshatra, and muhurtas',
		attrs: ' detail="detailed"',
		sdkCall: `  const { data } = await roxy.vedicAstrology.getDetailedPanchang({
    body: { date: '2026-05-09', latitude: 19.076, longitude: 72.877 },
  });`,
	}),
	entry({
		id: 'choghadiya',
		tag: 'roxy-choghadiya-grid',
		seoLine: 'Day and night Choghadiya muhurta tiles for activity timing',
		sdkCall: `  const { data } = await roxy.vedicAstrology.getChoghadiya({
    body: { date: '2026-05-11', latitude: 19.076, longitude: 72.877 },
  });`,
	}),
	entry({
		id: 'yoga',
		tag: 'roxy-yoga-list',
		seoLine: 'Filterable yoga catalog with detail cards',
		sdkCall: `  const { data } = await roxy.vedicAstrology.listYogas();`,
	}),
	entry({
		id: 'nakshatra',
		tag: 'roxy-nakshatra-card',
		seoLine: 'Nakshatra reference: lord, deity, symbol, remedies',
		sdkCall: `  const { data } = await roxy.vedicAstrology.getNakshatra({
    path: { id: 'ashwini' },
  });`,
	}),
	entry({
		id: 'dosha',
		tag: 'roxy-dosha-card',
		seoLine: 'Manglik dosha analysis with severity and remedies',
		attrs: ' type="manglik"',
		sdkCall: `  const { data } = await roxy.vedicAstrology.checkManglikDosha({
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'num',
		tag: 'roxy-numerology-card',
		seoLine: 'Numerology life path calculator with master number detection',
		attrs: ' type="life-path"',
		sdkCall: `  const { data } = await roxy.numerology.calculateLifePath({
    body: { year: 1990, month: 1, day: 15 },
  });`,
	}),
	entry({
		id: 'tarot',
		tag: 'roxy-tarot-card',
		seoLine: 'Daily tarot card with upright and reversed meanings',
		sdkCall: `  const { data } = await roxy.tarot.getDailyCard({ body: { seed: 'visitor-42' } });`,
	}),
	entry({
		id: 'spread',
		tag: 'roxy-tarot-spread',
		seoLine: 'Past, present, future tarot spread with interpretation',
		attrs: ' spread="three-card"',
		sdkCall: `  const { data } = await roxy.tarot.castThreeCard({
    body: { question: 'What does my next chapter look like?' },
  });`,
	}),
	entry({
		id: 'bodygraph',
		tag: 'roxy-bodygraph',
		seoLine: 'Human Design bodygraph chart with nine centers and channels',
		sdkCall: `  const { data } = await roxy.humanDesign.generateBodygraph({
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, timezone: PERSON1.timezone, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'forecast-timeline',
		tag: 'roxy-forecast-timeline',
		seoLine: 'Cross-domain forecast timeline of upcoming astrological events',
		sdkCall: `  const { data } = await roxy.forecast.generateTimeline({
    body: {
      birthData: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, timezone: PERSON1.timezone, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n      ')},
      startDate: '2026-06-01',
      endDate: '2026-07-15',
    },
  });`,
	}),
	entry({
		id: 'bio',
		tag: 'roxy-biorhythm-chart',
		seoLine: 'Daily biorhythm cycle bars and energy rating',
		attrs: ' mode="daily"',
		sdkCall: `  const { data } = await roxy.biorhythm.getDailyBiorhythm({ body: { seed: 'visitor-42' } });`,
	}),
	entry({
		id: 'hex',
		tag: 'roxy-hexagram',
		seoLine: 'I Ching hexagram with judgment, image, and trigrams',
		sdkCall: `  const { data } = await roxy.iching.getRandomHexagram();`,
	}),
	entry({
		id: 'dream',
		tag: 'roxy-dream-card',
		seoLine: 'Dream dictionary symbol with full interpretation',
		sdkCall: `  const { data } = await roxy.dreams.getDreamSymbol({
    path: { id: 'water' },
  });`,
	}),
	entry({
		id: 'angel-card',
		tag: 'roxy-angel-number-card',
		seoLine: 'Angel number meaning with spiritual, love, and career guidance',
		sdkCall: `  const { data } = await roxy.angelNumbers.getAngelNumber({
    path: { number: '111' },
  });`,
	}),
	entry({
		id: 'angel-lookup',
		tag: 'roxy-angel-number-lookup',
		seoLine: 'Analyze any number sequence for angel number meaning',
		sdkCall: `  const { data } = await roxy.angelNumbers.analyzeNumberSequence({
    query: { number: '1212' },
  });`,
	}),
	entry({
		id: 'crystals',
		tag: 'roxy-crystal-grid',
		seoLine: 'Crystal gallery filtered by chakra, element, or zodiac sign',
		sdkCall: `  const { data } = await roxy.crystals.getCrystalsByChakra({
    path: { chakra: 'heart' },
    query: { limit: 8 },
  });`,
	}),
	entry({
		id: 'form',
		tag: 'roxy-endpoint-form',
		seoLine: 'Auto-generated input form from any RoxyAPI endpoint schema',
		attrs: ' data-endpoint="numerology/life-path" submit-label="Calculate" spec-url="./openapi.json"',
		code: `<script src="https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/roxy-ui.js" defer></script>
<roxy-endpoint-form
  data-endpoint="numerology/life-path"
  submit-label="Calculate"
></roxy-endpoint-form>
<script>
  document.querySelector('roxy-endpoint-form')
    .addEventListener('roxy-submit', (e) => console.log(e.detail.values));
</script>`,
		shadcn: `# Install via shadcn
npx shadcn@latest add ${REGISTRY_BASE}/endpoint-form.json

# Use in your Next.js / React app
'use client';
import { RoxyEndpointForm } from '@/components/roxy-ui/endpoint-form';

export default function NumerologyForm() {
  return (
    <RoxyEndpointForm
      data-endpoint="numerology/life-path"
      submit-label="Calculate"
      onRoxySubmit={(e) => console.log(e.detail.values)}
    />
  );
}`,
	}),
	entry({
		id: 'loc',
		tag: 'roxy-location-search',
		seoLine: 'Geocoder for any chart endpoint that needs latitude and longitude',
		attrs: ' placeholder="Try: London"',
		code: `<script src="https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/roxy-ui.js" defer></script>
<roxy-location-search publishable-key="YOUR_PUBLISHABLE_KEY"></roxy-location-search>
<script>
  document.querySelector('roxy-location-search')
    .addEventListener('roxy-location-select', (e) => {
      const { latitude, longitude, timezone } = e.detail;
      console.log({ latitude, longitude, timezone });
    });
</script>`,
		shadcn: `# Install via shadcn
npx shadcn@latest add ${REGISTRY_BASE}/location-search.json

# Use in your Next.js / React app
'use client';
import { RoxyLocationSearch } from '@/components/roxy-ui/location-search';

export default function CityPicker() {
  return (
    <RoxyLocationSearch
      publishable-key={process.env.NEXT_PUBLIC_ROXY_PK!}
      onRoxyLocationSelect={(e) => console.log(e.detail)}
    />
  );
}`,
	}),
	entry({
		id: 'data',
		tag: 'roxy-data',
		seoLine: 'Generic fallback renderer for any RoxyAPI response',
		code: `<script src="https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/roxy-ui.js" defer></script>
<roxy-data id="el"></roxy-data>
<script>
  // Hand any unknown response shape to <roxy-data>. It picks heuristics
  // (title-key, image-key, primitive lists, object arrays) automatically.
  document.getElementById('el').data = {
    title: 'Compatibility breakdown',
    score: 87,
    breakdown: [
      { name: 'Communication', score: 88 },
      { name: 'Trust', score: 84 },
    ],
  };
</script>`,
		shadcn: `# Install via shadcn
npx shadcn@latest add ${REGISTRY_BASE}/data.json

# Use in your Next.js / React app
import { RoxyData } from '@/components/roxy-ui/data';

export default function Page({ data }) {
  return <RoxyData data={data} />;
}`,
	}),
];
