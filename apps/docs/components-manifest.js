/**
 * One entry per demo card. The SDK call is the source of truth — both the
 * server-render snippet (Code tab) and the shadcn registry snippet (shadcn tab)
 * are derived from it. (tag, slug, pascal, heading, topic, description) come
 * from window.ROXY_COMPONENTS (see scripts/sync-manifest.ts).
 */

// New York and London. The demo is the lead surface, so the lead example is a
// globally-accessible one. Keep in sync with scripts/refresh-samples.ts, which
// geocodes the same cities to fetch the live sample responses.
const PERSON1 = {
	date: '1990-01-15',
	time: '14:30:00',
	latitude: 40.7128,
	longitude: -74.006,
	timezone: 'America/New_York',
};
const PERSON2 = {
	date: '1992-06-20',
	time: '09:15:00',
	latitude: 51.5074,
	longitude: -0.1278,
	timezone: 'Europe/London',
};

const REGISTRY_BASE = 'https://cdn.jsdelivr.net/gh/RoxyAPI/ui@main/registry';
const UI_CDN = 'https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn';
const PRACTITIONER_THEME_URL =
	'https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/styles/themes/practitioner.css';

const MANIFEST_BY_TAG = Object.fromEntries(
	(window.ROXY_COMPONENTS || []).map((c) => [c.tag, c]),
);

// Generated endpoint map (window.ROXY_ENDPOINT_BINDINGS, mirrored by
// scripts/sync-manifest.ts). The Embed tab derives from it, so a binding change
// flows through with no per-card edit here.
const ENDPOINT_BINDINGS = window.ROXY_ENDPOINT_BINDINGS || {};

function lookup(tag) {
	const meta = MANIFEST_BY_TAG[tag];
	if (!meta) throw new Error(`Unknown tag in demo manifest: ${tag}`);
	return meta;
}

/**
 * Derive the Embed-tab snippets for an endpoint-bound component from its tag,
 * slug, and the generated endpoint bindings. The tag's FIRST binding (the
 * widgets-map default; bindings are path-sorted) drives both the script-mode
 * element and the one-tag widgets.js div, so there is zero per-card authoring.
 * Returns null for a component with no binding (the three helpers), and the demo
 * hides the tab for those.
 */
function embedSnippet(tag, slug) {
	const bindings = ENDPOINT_BINDINGS[tag];
	if (!bindings || !bindings.length) return null;
	const def = bindings[0];
	const endpoint = def.path.replace(/^\//, '');
	// POST is the element default, so only a GET binding needs an explicit method.
	const methodAttr = def.method === 'POST' ? '' : ` method="${def.method}"`;
	// The default variant's selector attribute (period/mode/type/spread/detail),
	// so the script element renders the same view the one-tag default resolves to.
	const configAttr = def.attrs
		? Object.entries(def.attrs)
				.map(([k, v]) => ` ${k}="${v}"`)
				.join('')
		: '';

	const script = `<!-- Optional: warm practitioner theme (drop this line for the default look) -->
<!-- <link rel="stylesheet" href="${PRACTITIONER_THEME_URL}"> -->
<script src="${UI_CDN}/roxy-ui.js" defer></script>
<${tag}${configAttr} data-endpoint="${endpoint}"${methodAttr} publishable-key="pk_live_..." lang="en"></${tag}>`;

	const oneTag = `<script src="${UI_CDN}/widgets.js" defer></script>
<div data-roxy-widget="${slug}" data-publishable-key="pk_live_..."></div>`;

	// The selector attribute and its non-default values, surfaced on the hint line
	// so one data-* attribute on the one-tag div switches variant.
	const selector = def.attrs ? Object.keys(def.attrs)[0] : undefined;
	const otherValues = selector
		? bindings
				.slice(1)
				.map((b) => b.attrs && b.attrs[selector])
				.filter(Boolean)
		: [];
	const variantHint =
		selector && otherValues.length
			? ` Switch variant with data-${selector} (${otherValues.map((v) => `"${v}"`).join(', ')}) on the one-tag div.`
			: '';

	const hint = `Mint a publishable key at roxyapi.com/account, register the origins you embed on, and replace the pk_live_ placeholder. Works on any site that allows script tags.${variantHint}`;

	return { script, oneTag, hint };
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
		// null for the three unbound helpers, so page.js hides the Embed tab.
		embed: embedSnippet(tag, meta.slug),
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
		id: 'aspects-table',
		tag: 'roxy-aspects-table',
		seoLine: 'Natal and transit aspects with chart-pattern detection',
		sdkCall: `  const { data } = await roxy.astrology.calculateAspects({
    body: { date: '${PERSON1.date}', time: '${PERSON1.time}', timezone: ${PERSON1.timezone} },
  });`,
	}),
	entry({
		id: 'astrocartography',
		tag: 'roxy-astrocartography-map',
		seoLine: 'Astrocartography world map of planetary relocation lines',
		sdkCall: `  const { data } = await roxy.astrology.generateAstrocartography({
    body: ${JSON.stringify(PERSON1, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'local-space',
		tag: 'roxy-local-space-compass',
		seoLine: 'Local space compass of planetary directions from a birthplace',
		sdkCall: `  const { data } = await roxy.astrology.generateLocalSpace({
    body: ${JSON.stringify(PERSON1, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'relocation',
		tag: 'roxy-relocation-wheel',
		seoLine: 'Relocation chart wheel with recomputed houses and angles for a new city',
		sdkCall: `  const { data } = await roxy.astrology.generateRelocationChart({
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, timezone: PERSON1.timezone, birthLatitude: PERSON1.latitude, birthLongitude: PERSON1.longitude, relocationLatitude: 40.7128, relocationLongitude: -74.006 }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'asteroids',
		tag: 'roxy-positions-table',
		heading: 'Asteroids',
		topic: 'Astrology',
		seoLine: 'Ceres, Pallas, Juno, and Vesta positions with house and motion',
		sdkCall: `  const { data } = await roxy.astrology.generateAsteroids({
    body: ${JSON.stringify(PERSON1, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'lilith',
		tag: 'roxy-positions-table',
		heading: 'Black Moon Lilith',
		topic: 'Astrology',
		seoLine: 'Mean and true Black Moon Lilith apogee positions',
		sdkCall: `  const { data } = await roxy.astrology.generateLilith({
    body: ${JSON.stringify(PERSON1, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'arabic-lots',
		tag: 'roxy-positions-table',
		heading: 'Arabic lots',
		topic: 'Astrology',
		seoLine: 'The seven Hermetic lots with their sect-aware formulas',
		sdkCall: `  const { data } = await roxy.astrology.calculateArabicLots({
    body: ${JSON.stringify(PERSON1, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'fixed-stars',
		tag: 'roxy-fixed-stars',
		seoLine: 'Fixed star conjunctions to the natal chart with the star catalog',
		sdkCall: `  const { data } = await roxy.astrology.generateFixedStars({
    body: ${JSON.stringify(PERSON1, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'progressions',
		tag: 'roxy-positions-table',
		heading: 'Secondary progressions',
		topic: 'Astrology',
		seoLine: 'Secondary progressed planets and angles for a target date',
		sdkCall: `  const { data } = await roxy.astrology.generateProgressions({
    body: ${JSON.stringify({ ...PERSON1, targetDate: '2025-07-15' }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'solar-arc',
		tag: 'roxy-positions-table',
		heading: 'Solar arc directions',
		topic: 'Astrology',
		seoLine: 'Solar arc directed positions versus their natal degrees',
		sdkCall: `  const { data } = await roxy.astrology.generateSolarArc({
    body: ${JSON.stringify({ ...PERSON1, targetDate: '2025-07-15' }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'profections',
		tag: 'roxy-profection-card',
		seoLine: 'Annual profection year: profected house, sign, and lord of the year',
		sdkCall: `  const { data } = await roxy.astrology.generateProfections({
    body: ${JSON.stringify({ ...PERSON1, targetDate: '2025-07-15' }, null, 2).replace(/\n/g, '\n    ')},
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
		seoLine:
			'Vimshottari timeline visualizer, mahadasha through sookshma with drill-down at every level',
		attrs: ' period="major"',
		sdkCall: `  const { data } = await roxy.vedicAstrology.getMajorDashas({
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'dasha-current',
		tag: 'roxy-dasha-timeline',
		heading: 'Current dasha',
		seoLine:
			'The running mahadasha, antardasha, pratyantardasha and sookshma with their readings',
		attrs: ' period="current"',
		sdkCall: `  const { data } = await roxy.vedicAstrology.getCurrentDasha({
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'dasha-sub',
		tag: 'roxy-dasha-timeline',
		heading: 'Antardashas',
		seoLine: 'Antardashas within a mahadasha, with the parent period as context',
		attrs: ' period="sub"',
		sdkCall: `  const { data } = await roxy.vedicAstrology.getSubDashas({
    path: { mahadasha: 'venus' },
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	// No dasha-antara / dasha-sookshma cards yet, deliberately. Their samples come
	// from `scripts/refresh-samples.ts` via @roxyapi/sdk, and the published SDK
	// regenerates from the live spec on its OWN pipeline, so it does not know a
	// brand new operation for a while. A card with no sample renders an empty
	// state, which is worse than no card. @roxyapi/sdk 1.2.50 does expose both
	// operations, but bunfig.toml sets minimumReleaseAge = 3 days, so it cannot be
	// installed here until 2026-07-29 and refresh-samples cannot capture them
	// before that. Do not bypass that guard for a demo card. Full sequence:
	// CLAUDE.md, "Binding a new endpoint to an EXISTING component", step 8.
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
    body: { date: '2026-05-09', latitude: 40.7128, longitude: -74.006 },
  });`,
	}),
	entry({
		id: 'choghadiya',
		tag: 'roxy-choghadiya-grid',
		seoLine: 'Day and night Choghadiya muhurta tiles for activity timing',
		sdkCall: `  const { data } = await roxy.vedicAstrology.getChoghadiya({
    body: { date: '2026-05-11', latitude: 40.7128, longitude: -74.006 },
  });`,
	}),
	entry({
		id: 'vedic-aspects',
		tag: 'roxy-vedic-aspects',
		seoLine: 'Vedic graha drishti table with mutual aspects',
		sdkCall: `  const { data } = await roxy.vedicAstrology.calculateDrishti({
    body: { date: '${PERSON1.date}', time: '${PERSON1.time}', timezone: ${PERSON1.timezone}, latitude: ${PERSON1.latitude}, longitude: ${PERSON1.longitude} },
  });`,
	}),
	entry({
		id: 'hora-table',
		tag: 'roxy-hora-table',
		seoLine: 'Vedic Hora planetary hours for electional timing',
		sdkCall: `  const { data } = await roxy.vedicAstrology.getHora({
    body: { date: '2026-06-19', timezone: ${PERSON1.timezone}, latitude: ${PERSON1.latitude}, longitude: ${PERSON1.longitude} },
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
		id: 'num-chart',
		tag: 'roxy-numerology-card',
		heading: 'Numerology chart',
		seoLine: 'Full numerology chart with all six core numbers and their readings',
		attrs: ' type="chart"',
		sdkCall: `  const { data } = await roxy.numerology.generateNumerologyChart({
    body: { fullName: 'Ada Lovelace', year: 1990, month: 1, day: 15 },
  });`,
	}),
	entry({
		id: 'tarot',
		tag: 'roxy-tarot-card',
		seoLine: 'Daily tarot card with upright and reversed meanings',
		sdkCall: `  const { data } = await roxy.tarot.getDailyCard({ body: { seed: 'visitor-42' } });`,
	}),
	entry({
		id: 'tarot-reference',
		tag: 'roxy-tarot-card',
		heading: 'Tarot reference card',
		seoLine: 'Tarot card reference with both upright and reversed readings',
		sdkCall: `  const { data } = await roxy.tarot.getCard({ path: { id: 'fool' } });`,
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
		id: 'spread-yesno',
		tag: 'roxy-tarot-spread',
		heading: 'Tarot yes or no',
		seoLine: 'Tarot yes or no verdict with the card it was drawn from',
		attrs: ' spread="yes-no"',
		sdkCall: `  const { data } = await roxy.tarot.castYesNo({
    body: { question: 'Should I take the offer?' },
  });`,
	}),
	entry({
		id: 'tarot-catalog',
		tag: 'roxy-tarot-catalog',
		seoLine: 'Browse the full tarot deck with card art and arcana captions',
		sdkCall: `  const { data } = await roxy.tarot.listCards({ query: { limit: 12 } });`,
	}),
	entry({
		id: 'bodygraph',
		tag: 'roxy-bodygraph',
		seoLine:
			'Human Design bodygraph chart with nine centers and channels, plus the type, strategy, authority, profile, and gate readings',
		sdkCall: `  const { data } = await roxy.humanDesign.generateBodygraph({
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, timezone: PERSON1.timezone, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'hd-type-card',
		tag: 'roxy-hd-type-card',
		seoLine:
			'Human Design type, strategy, and authority reading with the aura, signature, and not-self themes',
		sdkCall: `  const { data } = await roxy.humanDesign.calculateType({
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, timezone: PERSON1.timezone, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'hd-type-card-profile',
		tag: 'roxy-hd-type-card',
		heading: 'HD profile',
		seoLine:
			'Human Design profile with the conscious and unconscious line keynotes',
		sdkCall: `  const { data } = await roxy.humanDesign.calculateProfile({
    body: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, timezone: PERSON1.timezone, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n    ')},
  });`,
	}),
	entry({
		id: 'hd-connection',
		tag: 'roxy-hd-connection',
		seoLine: 'Human Design connection chart for two-person compatibility',
		sdkCall: `  const { data } = await roxy.humanDesign.calculateConnection({
    body: {
      personA: ${JSON.stringify(PERSON1, null, 2).replace(/\n/g, '\n      ')},
      personB: ${JSON.stringify(PERSON2, null, 2).replace(/\n/g, '\n      ')},
    },
  });`,
	}),
	entry({
		id: 'hd-penta',
		tag: 'roxy-hd-penta',
		seoLine: 'Human Design penta chart for a 3 to 5 person team or family',
		sdkCall: `  const { data } = await roxy.humanDesign.calculatePenta({
    body: { members: [person1, person2, person3] },
  });`,
	}),
	entry({
		id: 'hd-variables',
		tag: 'roxy-hd-variables',
		seoLine:
			'Human Design variables: the four PHS transformation arrows with a reading for each',
		sdkCall: `  const { data } = await roxy.humanDesign.calculateVariables({
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
		id: 'forecast-digest',
		tag: 'roxy-forecast-digest',
		seoLine: 'Rolled-up forecast across the next 24 hours, 7, 30, and 90 days',
		sdkCall: `  const { data } = await roxy.forecast.generateDigest({
    body: {
      birthData: ${JSON.stringify({ date: PERSON1.date, time: PERSON1.time, timezone: PERSON1.timezone, latitude: PERSON1.latitude, longitude: PERSON1.longitude }, null, 2).replace(/\n/g, '\n      ')},
      startDate: '2026-06-19',
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
		id: 'bio-forecast',
		tag: 'roxy-biorhythm-chart',
		heading: 'Biorhythm forecast',
		seoLine: 'Biorhythm forecast cycles with best and worst days and critical markers',
		attrs: ' mode="forecast"',
		sdkCall: `  const { data } = await roxy.biorhythm.getForecast({
    body: { birthDate: '1990-01-15', days: 30 },
  });`,
	}),
	entry({
		id: 'bio-critical',
		tag: 'roxy-biorhythm-chart',
		heading: 'Biorhythm critical days',
		seoLine: 'Biorhythm critical days with the advisory for each',
		attrs: ' mode="critical-days"',
		sdkCall: `  const { data } = await roxy.biorhythm.getCriticalDays({
    body: { birthDate: '1990-01-15', days: 60 },
  });`,
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
		id: 'dream-search',
		tag: 'roxy-dream-search',
		seoLine: 'Search the dream dictionary; selecting a symbol opens its meaning',
		sdkCall: `  const { data } = await roxy.dreams.searchDreamSymbols({
    query: { q: 'water', limit: 12 },
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
		id: 'angel-lookup-unknown',
		tag: 'roxy-angel-number-lookup',
		seoLine: 'Digit-root fallback reading for a number with no catalog entry',
		sdkCall: `  const { data } = await roxy.angelNumbers.analyzeNumberSequence({
    query: { number: '7841' },
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
		id: 'reference-card',
		tag: 'roxy-reference-card',
		seoLine: 'Glossary card for any reference lookup: sign, planet, rashi, gate, number',
		sdkCall: `  const { data } = await roxy.astrology.getZodiacSign({
    path: { id: 'aries' },
  });`,
	}),
	entry({
		id: 'crystal-card',
		tag: 'roxy-crystal-card',
		seoLine: 'Single-crystal detail with meaning, attributes, and pairings',
		sdkCall: `  const { data } = await roxy.crystals.getCrystal({
    path: { id: 'amethyst' },
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
