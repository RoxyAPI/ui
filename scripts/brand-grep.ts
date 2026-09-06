#!/usr/bin/env bun

/**
 * brand-grep.ts - CI gate for brand-rule and content-rule violations.
 *
 * Categories A, B and C scan an allowlist of public prose (README, AGENTS,
 * THEMING, the showcase page, examples) for forbidden phrases, hardcoded counts
 * and stale URL pinning. Category D scans EVERY committed file, because this
 * repository is public and `src` ships inside the npm tarball with its JSDoc
 * copied into the published `.d.ts`, so a source comment is published copy.
 * Exit 1 on any Sev-1 violation; category C is a warning only.
 *
 * Usage:
 *   bun run scripts/brand-grep.ts
 *   bun run scripts/brand-grep.ts --explain
 */

import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// ---------------------------------------------------------------------------
// File allowlist: only these paths are scanned. Glob patterns are expanded
// via `git ls-files` so we only touch committed files.
// ---------------------------------------------------------------------------
const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');

const STATIC_PATHS = [
	'README.md',
	'AGENTS.md',
	'packages/ui/README.md',
	'packages/ui/THEMING.md',
	'packages/ui-react/README.md',
	'packages/ui-vue/README.md',
	'apps/docs/index.html',
];

const GLOB_PATTERNS = ['examples/**/*'];

function expandGlobs(): string[] {
	const results: string[] = [];
	for (const pattern of GLOB_PATTERNS) {
		try {
			const out = execSync(`git -C "${ROOT}" ls-files -- "${pattern}"`, {
				encoding: 'utf8',
			}).trim();
			if (out) {
				results.push(...out.split('\n').filter(Boolean));
			}
		} catch {
			// pattern matched nothing, which is fine
		}
	}
	return results;
}

/**
 * Paths whose contents are generated from the API or from another script, so a
 * match in them is not something an author can fix here. Mirrors the generated
 * set the repository already maintains.
 */
const GENERATED = [
	/^packages\/ui-(react|vue)\/src\/components\//,
	/^packages\/ui\/src\/(generated|locales\/field-labels)\//,
	/^packages\/ui\/components-catalog\.json$/,
	/^registry\//,
	/^specs\//,
	/^apps\/docs\/(manifest|sample-data)\.js$/,
	/^assets\//,
	// The OFL text ships verbatim beside each self-hosted font. It is a licence, not
	// our prose, and it may not be edited to satisfy a writing rule.
	/^packages\/ui\/src\/styles\/fonts\/.*\/OFL\.txt$/,
	/\.(png|webp|jpe?g|svg|ico|woff2?|lock)$/i,
];

/** Every committed file category D applies to. Derived, so a new file is covered the day it lands. */
function collectSourceFiles(): string[] {
	const out = execSync(`git -C "${ROOT}" ls-files`, { encoding: 'utf8' })
		.trim()
		.split('\n')
		.filter(Boolean);
	return out.filter(
		(f) => !GENERATED.some((re) => re.test(f)) && existsSync(join(ROOT, f)),
	);
}

/**
 * Whether a line can carry authored prose. Markdown is prose throughout; every
 * other format is scanned only where it comments, so a rendered string, a code
 * sample or a fixture date cannot trip a category D pattern.
 */
function isProseLine(rel: string, line: string): boolean {
	if (/\.(md|txt)$/i.test(rel)) return true;
	if (/\.(ya?ml)$/i.test(rel)) return /(^|\s)#/.test(line);
	if (/\.html?$/i.test(rel)) return /<!--/.test(line);
	return /^\s*(\/\/|\/\*|\*)/.test(line) || /(^|\s)\/\/\s/.test(line);
}

function collectFiles(): string[] {
	const all = new Set<string>();
	for (const p of STATIC_PATHS) {
		all.add(p);
	}
	for (const p of expandGlobs()) {
		all.add(p);
	}
	// Return only files that actually exist on disk
	return [...all].filter((p) => existsSync(join(ROOT, p)));
}

// ---------------------------------------------------------------------------
// Pattern definitions
// ---------------------------------------------------------------------------

interface Pattern {
	category: 'A' | 'B' | 'C' | 'D';
	label: string;
	test: (line: string, raw: string) => boolean;
	/** If true, violations produce a warning rather than a hard failure */
	warnOnly?: boolean;
}

const TLDS = 'com|net|org|de|fr|es|it|co|io|app|dev|ai|in|tr|ru|br|pt';
/** The host of a written URL. A reserved or made-up TLD is not a site anyone visits, so it never matches. */
const URL_HOST = new RegExp(
	`https?://((?:[a-z0-9-]+\\.)+(?:${TLDS}))(?![a-z])`,
	'gi',
);
/** A bare hostname in prose, never a path segment or half of a hyphenated word. */
const BARE_HOST = new RegExp(
	`(?<![\\w/-])((?:[a-z0-9]+(?:-[a-z0-9]+)*\\.)+(?:${TLDS}))(?![\\w-])`,
	'gi',
);

/** Ours, plus the toolchain and standards bodies this project legitimately cites. Keyed by registrable domain, so any subdomain of one is covered. */
const OWN_DOMAINS = new Set([
	'roxyapi.com',
	'roxystudio.app',
	'jsdelivr.net',
	'npmjs.com',
	'github.com',
	'githubusercontent.com',
	'github.io',
	'shields.io',
	'unpkg.com',
	'schema.org',
	'json-schema.org',
	'openapis.org',
	'apisjson.org',
	'w3.org',
	'lit.dev',
	'biomejs.dev',
	'playwright.dev',
	'shadcn.com',
	'googleapis.com',
	'gstatic.com',
	'anthropic.com',
	'sil.org', // OFL FAQ link, shipped verbatim inside the license text bundled with each self-hosted font
]);

/**
 * Package directories this repository owns, read from git rather than listed, so adding one needs no edit here
 * and any FOREIGN `packages/<name>/` path is a pointer at a repo the reader cannot open.
 */
const OWN_PACKAGES = new Set(
	execSync('git ls-files packages', { cwd: ROOT, encoding: 'utf8' })
		.split('\n')
		.map((line) => line.split('/')[1])
		.filter((name): name is string => Boolean(name)),
);

/** Every host a line names, each reduced to its registrable domain. */
function hostsIn(line: string): string[] {
	const found: string[] = [];
	for (const m of line.matchAll(URL_HOST)) found.push(m[1] ?? '');
	for (const m of line.matchAll(BARE_HOST)) found.push(m[1] ?? '');
	return found
		.map((h) => h.toLowerCase().split('.').slice(-2).join('.'))
		.filter(Boolean);
}

/** `verified against <Name>`: the shape a sourcing note takes when it names an outside product. */
const COMPARED_AGAINST_NAME =
	/\b(?:verified|checked|measured|compared|cross-?checked|reconciled|benchmarked|sourced)\b[^.]{0,24}?\bagainst\s+(?:the\s+|a\s+|an\s+)?((?:[A-Z][a-zA-Z0-9-]+)(?:\s+[A-Z][a-zA-Z0-9-]+)*)/g;

/** Named here so "against the Portuguese the endpoints return" reads as a language, not a product. */
const LANGUAGES = new Set([
	'English',
	'German',
	'Spanish',
	'French',
	'Hindi',
	'Portuguese',
	'Russian',
	'Turkish',
	'Brazilian',
	'Sanskrit',
]);

// Helper: build a simple case-insensitive regex test
function ci(re: RegExp): (line: string) => boolean {
	const r = new RegExp(
		re.source,
		re.flags.includes('i') ? re.flags : `${re.flags}i`,
	);
	return (line) => r.test(line);
}

const CATEGORY_A_PATTERNS: Pattern[] = [
	// Em-dash (U+2014)
	{
		category: 'A',
		label: 'em-dash',
		test: (line) => line.includes('—'),
	},
	// En-dash used as em-dash substitute (U+2013) — flag when surrounded by spaces
	{
		category: 'A',
		label: 'en-dash-as-dash',
		test: (line) => /\s–\s/.test(line),
	},
	// Double-hyphen used as a dash (whitespace on both sides, not in HTML comments or table separators)
	{
		category: 'A',
		label: 'double-hyphen-dash',
		test: (line) => {
			// Skip HTML comments and markdown table lines
			if (/<!--/.test(line) || /^\s*\|/.test(line)) return false;
			return /\s--\s/.test(line);
		},
	},
	// Apostrophe contractions (prose only — fenced code blocks are handled per-file)
	{
		category: 'A',
		label: 'contraction',
		test: ci(
			/\b(it's|let's|you're|doesn't|don't|won't|we're|they're|you'll|we'll|isn't|aren't|haven't|wasn't|that's|there's|here's|what's|who's|i'm|i've|i'd|i'll)\b/i,
		),
	},
	// Internal lore phrases
	{
		category: 'A',
		label: 'forbidden-phrase',
		test: ci(/jsdelivr\s+UMD/i),
	},
	{
		category: 'A',
		label: 'forbidden-phrase',
		test: ci(/lazy[-\s]?load(?:s|ing)?/i),
	},
	{
		category: 'A',
		label: 'forbidden-phrase',
		test: ci(/thin\s+(wrapper|shell|shells)/i),
	},
	{
		category: 'A',
		label: 'forbidden-phrase',
		test: ci(/\b(react|typed)\s+wrappers?\b/i),
	},
	{
		category: 'A',
		label: 'forbidden-phrase',
		test: ci(/\bwrapper\s+(file|around)\b/i),
	},
	{
		category: 'A',
		label: 'forbidden-phrase',
		test: ci(/decoupled\s+release|coordinated\s+release/i),
	},
	{
		category: 'A',
		label: 'forbidden-phrase',
		test: ci(/no\s+runtime\s+(dependency|deps)/i),
	},
	{
		category: 'A',
		label: 'forbidden-phrase',
		test: (line) => /\bforwardRef\b/.test(line),
	},
	{
		category: 'A',
		label: 'forbidden-phrase',
		test: (line) => /\bensureScriptLoaded\b/.test(line),
	},
	{
		category: 'A',
		label: 'forbidden-phrase',
		test: (line) => /\broxy_xxx\b/i.test(line),
	},
	// Brand-forbidden words
	{
		category: 'A',
		label: 'forbidden-word',
		test: ci(/\btoolkit\b/i),
	},
	{
		category: 'A',
		label: 'forbidden-word',
		test: ci(/collection\s+of\s+components/i),
	},
	{
		category: 'A',
		label: 'forbidden-word',
		test: (line) => /\bastronomy-engine\b/i.test(line),
	},
	{
		category: 'A',
		label: 'forbidden-word',
		test: (line) => /\bSwiss\s+Ephemeris\b/i.test(line),
	},
	{
		category: 'A',
		label: 'forbidden-word',
		test: (line) => /\bVSOP87\b/.test(line),
	},
	{
		category: 'A',
		label: 'forbidden-word',
		test: (line) => /\bkerykeion\b/i.test(line),
	},
	{
		category: 'A',
		label: 'forbidden-word',
		test: (line) => /\bNOVAS\b/.test(line),
	},
];

const CATEGORY_B_PATTERNS: Pattern[] = [
	{
		category: 'B',
		label: 'hardcoded-count',
		test: (line) => /\b(18|19|20)\s+components\b/i.test(line),
	},
	{
		category: 'B',
		label: 'hardcoded-count',
		test: (line) => /\bten\s+domains\b/i.test(line),
	},
	{
		category: 'B',
		label: 'hardcoded-count',
		test: (line) => /\b(10|11|12|13)\s+domains\b/i.test(line),
	},
	{
		category: 'B',
		label: 'hardcoded-count',
		test: (line) => /\$39\b/.test(line),
	},
	{
		category: 'B',
		label: 'hardcoded-count',
		test: (line) => /\bPhase\s+1\s+components\b/i.test(line),
	},
	{
		category: 'B',
		label: 'hardcoded-count',
		test: (line) => /\b18\s+elements\b/i.test(line),
	},
];

/**
 * Category D - anything a reader outside the project should never find in a file
 * we publish. Applied to comment lines in code and to every line of prose, so a
 * rendered string or a fixture cannot trip it.
 */
const CATEGORY_D_PATTERNS: Pattern[] = [
	// Named external products. Describe the convention, never the product it was
	// read from. NASA JPL Horizons is the one attribution this project publishes,
	// so it is absent here.
	{
		category: 'D',
		label: 'third-party-name',
		test: ci(
			/\b(jovian\s+archive|mybodygraph|maia\s+mechanics|genetic\s+matrix|rave\s+bodygraph|drikpanchang|astro-?seek|astro\.com|jhora|humdes|hdkit|sirius)\b/i,
		),
	},
	// Any outside site, named by its host. A wordlist only knows the products
	// somebody thought to list; this holds for the ones nobody did, and the
	// allowlist is the only part to maintain.
	{
		category: 'D',
		label: 'third-party-domain',
		test: (line: string) => hostsIn(line).some((h) => !OWN_DOMAINS.has(h)),
	},
	// The same disclosure without a name attached: a claim measured against some
	// outside artifact. Catches the construction rather than the product.
	{
		category: 'D',
		label: 'external-comparison',
		test: ci(
			/\b(verified|checked|measured|compared|cross-?checked|reconciled|benchmarked)\b[^.]{0,30}?\bagainst\s+(the\s+|a\s+|an\s+)?(?!NASA\b)[a-z-]*\s*(chart|table|ephemeris|calculator|implementation|render|software|tool|site|publication)\b/i,
		),
	},
	// The same construction with a NAME after it rather than a noun. A wordlist can
	// only hold products somebody listed; this holds for the ones nobody did.
	// NASA JPL Horizons is the one attribution this project publishes, and a
	// language is a language rather than a product.
	{
		category: 'D',
		label: 'external-comparison',
		test: (line: string) => {
			for (const m of line.matchAll(COMPARED_AGAINST_NAME)) {
				const name = m[1] ?? '';
				if (name.startsWith('NASA') || LANGUAGES.has(name)) continue;
				return true;
			}
			return false;
		},
	},
	// Anything that identifies or recounts a user of the product.
	{
		category: 'D',
		label: 'user-reference',
		test: ci(/\bcustomers?('s)?\b/i),
	},
	// A date next to a verification verb is an internal audit trail. A bare date is
	// left alone, because a DST boundary or a sample value is a technical fact.
	{
		category: 'D',
		label: 'dated-claim',
		test: ci(
			/(?:verified|measured|checked|corrected|captured|confirmed|re-?tested|recounted|sourced|re-?examined|as\\s+of|since|carries|carried)\b[^.]{0,60}?\b20\d\d-\d\d-\d\d\b|\b20\d\d-\d\d-\d\d\b[^.]{0,20}?\b(?:verified|measured|checked|corrected|captured|confirmed|re-?tested|recounted|sourced|re-?examined|as\\s+of|since|carries|carried)\b/i,
		),
	},
	// Narrating a past defect. A public file states the behaviour
	// that ships; the history belongs in the maintainer notes. The second pattern is
	// the same class written as a comparison against a past state rather than as a
	// verb, which is how the wording drifts back in. Both are deliberately narrow:
	// an ordering statement ("declared before this block") and a browser fact ("the
	// rule is silently ignored on older engines") are technical, not narration.
	{
		category: 'D',
		label: 'defect-narrative',
		test: ci(
			/\b(used\s+to|the\s+defect|silently\s+(dropped|kept|lost|reverted|stopped|broke|did)|was\s+wrong|shipped\s+(with|for\s+months|green)|before\s+the\s+fix)\b/i,
		),
	},
	{
		category: 'D',
		label: 'defect-narrative',
		test: ci(
			/\bwas\s+(losing|winning)\b|\bwere\s+two\s+different\s+results\b|\b(rule|rules|declaration|declarations|mapping|map|override|overrides|block|value|token|bridge|default|defaults|component|components)\s+lost\s+to\b|\bkept\s+the\s+stock\b|\bbefore\s+the\s+change\b|\bbefore\s+this\s*[.,;]/i,
		),
	},
	// Pointers at files the reader cannot open. Derived rather than listed: the wordlist this replaced named five
	// maintainer docs and had already fallen behind by one, which is the same failure mode the third-party-domain
	// rule above calls out. Every doc in this tree is written for maintainers, so any of them counts.
	{
		category: 'D',
		label: 'internal-pointer',
		test: (line: string) => {
			for (const m of line.matchAll(/\bpackages\/([a-z][a-z0-9-]*)\//gi)) {
				if (!OWN_PACKAGES.has((m[1] ?? '').toLowerCase())) return true;
			}
			return /\b(CLAUDE\.md|docs\/[a-z][a-z0-9-]*\.md|app\/src\/|~\/per\/|maintainer[-\s]internal|main\s+repo)\b/i.test(
				line,
			);
		},
	},
	// Administrative surfaces. Naming one discloses the path it is meant to hide.
	{
		category: 'D',
		label: 'admin-surface',
		test: ci(
			/(^|[^a-z0-9])\/hq\b|\broxy-hq\b|\badmin\s+(route|panel|dashboard)\b/i,
		),
	},
	// Commercial and discoverability strategy. Sell the outcome, never the playbook. Deliberately whole phrases:
	// a bare acronym false-positives on ordinary words (the Spanish `Apogeo` contains `geo`).
	{
		category: 'D',
		label: 'internal-strategy',
		test: ci(
			/\bmoney\s+(api|endpoint|angle)\b|\bapis\s+that\s+sell\b|\bconversion\s+endpoint\b|\bcitation\s+gravity\b|\bdistribution\s+playbook\b|\bbreadth\s+edge\b|\bso\s+(that\s+)?[^.]{0,40}?\b(ai|llms?|agents?|search\s+engines?|chatgpt|perplexity)\b[^.]{0,40}?\b(cite|cites|recommend|recommends|surface|surfaces|index|indexes|rank|ranks)\b/i,
		),
	},
	// How access is GRANTED or metered, which is a bypass recipe. The benefit may be stated ("a free tier is
	// available"); the mechanism may not.
	{
		category: 'D',
		label: 'auth-mechanics',
		test: ci(
			/\b(omit|omitting|without|missing|absent)\b[^.]{0,40}?\b(api[-\s]?key|x-api-key|credential|bearer\s+token)\b|\b(quota|allowance|free\s+tier|rate\s+limit)\b[^.]{0,40}?\b(resets?|is\s+counted|decrements?|per\s+(ip|key|minute))\b/i,
		),
	},
];

const CATEGORY_C_PATTERNS: Pattern[] = [
	{
		category: 'C',
		label: 'stale-url',
		warnOnly: true,
		test: (line) => /cdn\.jsdelivr\.net\/gh\/RoxyAPI\/ui@main/i.test(line),
	},
];

/** Categories that apply to the public-prose allowlist. */
const PROSE_PATTERNS = [
	...CATEGORY_A_PATTERNS,
	...CATEGORY_B_PATTERNS,
	...CATEGORY_C_PATTERNS,
	...CATEGORY_D_PATTERNS,
];

// ---------------------------------------------------------------------------
// Violation type
// ---------------------------------------------------------------------------

interface Violation {
	file: string;
	line: number;
	column: number;
	category: 'A' | 'B' | 'C' | 'D';
	label: string;
	match: string;
	context: string;
	warnOnly: boolean;
}

// ---------------------------------------------------------------------------
// Core scanner
// ---------------------------------------------------------------------------

function extractContext(line: string, match: string, maxLen = 60): string {
	const idx = line.indexOf(match);
	if (idx === -1) {
		// regex match — use first 60 chars around centre
		return line.slice(0, maxLen);
	}
	const start = Math.max(0, idx - 20);
	const end = Math.min(line.length, idx + match.length + 20);
	const raw = line.slice(start, end);
	return (start > 0 ? '...' : '') + raw + (end < line.length ? '...' : '');
}

// Ordered extraction regexes — more specific patterns first so the match text
// displayed in violation output is maximally meaningful.
const EXTRACTION_RES: RegExp[] = [
	// Category D
	/\b(jovian\s+archive|mybodygraph|maia\s+mechanics|genetic\s+matrix|rave\s+bodygraph|drikpanchang|astro-?seek|astro\.com|jhora|humdes|hdkit|sirius)\b/i,
	/\b(verified|checked|measured|compared|cross-?checked|reconciled|benchmarked)\b[^.]{0,30}?\bagainst\s+(the\s+|a\s+|an\s+)?(?!NASA\b)[a-z-]*\s*(chart|table|ephemeris|calculator|implementation|render|software|tool|site|publication)\b/i,
	/\bcustomers?('s)?\b/i,
	/(?:verified|measured|checked|corrected|captured|confirmed|re-?tested|recounted|sourced|re-?examined|as\\s+of|since|carries|carried)\b[^.]{0,60}?\b20\d\d-\d\d-\d\d\b|\b20\d\d-\d\d-\d\d\b[^.]{0,20}?\b(?:verified|measured|checked|corrected|captured|confirmed|re-?tested|recounted|sourced|re-?examined|as\\s+of|since|carries|carried)\b/i,
	/\b(used\s+to\s+(be|do|draw|render|print|read|return|carry|show|interpolate|implement|call|key|resolve)|the\s+defect|silently\s+(dropped|kept|lost|reverted|stopped|broke)|was\s+wrong|shipped\s+(with|for\s+months|green)|before\s+the\s+fix)\b/i,
	/\b(CLAUDE\.md|docs\/(lessons|todo|authoring|build-and-release|revamp-design)\.md|maintainer[-\s]internal|main\s+repo)\b/i,
	// Category C (specific multi-char strings, check before generic punctuation)
	/cdn\.jsdelivr\.net\/gh\/RoxyAPI\/ui@main/i,
	// Category B
	/\b(18|19|20)\s+components\b/i,
	/\bten\s+domains\b/i,
	/\b(10|11|12|13)\s+domains\b/i,
	/\$39\b/,
	/\bPhase\s+1\s+components\b/i,
	/\b18\s+elements\b/i,
	// Category A — multi-word phrases before single-char punctuation
	/jsdelivr\s+UMD/i,
	/lazy[-\s]?load(?:s|ing)?/i,
	/thin\s+(wrapper|shell|shells)/i,
	/\b(react|typed)\s+wrappers?\b/i,
	/\bwrapper\s+(file|around)\b/i,
	/decoupled\s+release|coordinated\s+release/i,
	/no\s+runtime\s+(dependency|deps)/i,
	/\bforwardRef\b/,
	/\bensureScriptLoaded\b/,
	/\broxy_xxx\b/i,
	/\btoolkit\b/i,
	/collection\s+of\s+components/i,
	/\bastronomy-engine\b/i,
	/\bSwiss\s+Ephemeris\b/i,
	/\bVSOP87\b/,
	/\bkerykeion\b/i,
	/\bNOVAS\b/,
	/\b(it's|let's|you're|doesn't|don't|won't|we're|they're|you'll|we'll|isn't|aren't|haven't|wasn't|that's|there's|here's|what's|who's|i'm|i've|i'd|i'll)\b/i,
	// Single-char punctuation last
	/—/,
	/–/,
	/\s--\s/,
];

function findMatchText(line: string, _pattern: Pattern): string {
	for (const re of EXTRACTION_RES) {
		const m = line.match(re);
		if (m) return m[0].trim();
	}
	return line.trim().slice(0, 40);
}

function scanFile(
	filePath: string,
	relPath: string,
	patterns: Pattern[],
): Violation[] {
	const content = readFileSync(filePath, 'utf8');
	const lines = content.split('\n');
	const violations: Violation[] = [];

	let inFencedBlock = false;
	const fenceRe = /^(\s*)(```|~~~)/;

	for (let i = 0; i < lines.length; i++) {
		const raw = lines[i];
		const lineNo = i + 1;

		// Track fenced code blocks
		if (fenceRe.test(raw)) {
			inFencedBlock = !inFencedBlock;
		}

		for (const pattern of patterns) {
			// A code sample is quoted, not authored, so neither category reads it
			if (
				(pattern.category === 'A' || pattern.category === 'D') &&
				inFencedBlock
			) {
				continue;
			}
			// Category D only reads authored prose, never a rendered string
			if (pattern.category === 'D' && !isProseLine(relPath, raw)) continue;

			if (pattern.test(raw, raw)) {
				const matchText = findMatchText(raw, pattern);
				const col = matchText ? raw.indexOf(matchText) + 1 : 1;
				const ctx = extractContext(raw.trim(), matchText);
				violations.push({
					file: relPath,
					line: lineNo,
					column: Math.max(col, 1),
					category: pattern.category,
					label: pattern.label,
					match: matchText,
					context: ctx,
					warnOnly: pattern.warnOnly ?? false,
				});
			}
		}
	}

	return violations;
}

// ---------------------------------------------------------------------------
// Output helpers
// ---------------------------------------------------------------------------

const EXPLAIN = process.argv.includes('--explain');

function formatViolation(v: Violation): string {
	const sev = v.warnOnly ? '[warn]' : '[fail]';
	return `${v.file}:${v.line}:${v.column}: [${v.label}]${sev} ${v.match} — "${v.context}"`;
}

function explain(): void {
	console.log(`
brand-grep guidance:

Category A (Sev-1 — build fails):
  - em-dash (—) and en-dash used as dash (–): use a plain hyphen or rewrite the sentence.
  - double-hyphen dash (--): rewrite; never use -- as a dash in prose.
  - contractions (don't, it's, you're …): expand to "do not", "it is", "you are" etc.
  - internal lore (jsdelivr UMD, lazy load, thin wrapper, decoupled release, forwardRef …):
    remove entirely from public copy; implementation lore stays in the maintainer notes.
  - brand words (toolkit, collection of components, astronomy-engine, Swiss Ephemeris …):
    replace with "web components", "every domain in the catalog", or remove.

Category B (Sev-1 — build fails):
  - hardcoded counts (18 components, 10 domains, $39, Phase 1 components …):
    use dynamic phrasing: "every domain in the catalog", "every RoxyAPI domain".

Category C (Sev-2 — warning only):
  - stale jsDelivr URL (cdn.jsdelivr.net/gh/RoxyAPI/ui@main):
    switch to cdn.jsdelivr.net/npm/@roxyapi/ui@latest or a pinned version tag.

Category D (Sev-1 - build fails, every committed file):
  This repository is public and src ships inside the npm tarball, with JSDoc
  copied into the published .d.ts, so a source comment is published copy.
  - third-party names and external comparisons: describe the convention, never the
    product or the artifact it was read from.
  - user references: say what the code does, not who asked for it.
  - dated claims: a date beside a verification verb is an internal trail; drop it.
  - defect narratives: document the behaviour that ships, not the one that did not.
  - internal pointers: never cite a path a reader of this repository cannot open.
  - admin surfaces: naming one discloses the path it is meant to hide.
  - internal strategy: sell the outcome, never the playbook.
  - auth mechanics: state the benefit ("a free tier is available"), never how access is
    granted or metered, which is a bypass recipe.
  All of them belong in the maintainer notes instead.
`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

// `--explain` answers before anything is scanned, because the clean-tree path exits zero and guidance is most
// often wanted on a tree that is already green.
if (EXPLAIN) {
	explain();
	process.exit(0);
}

const proseFiles = collectFiles();
const proseSet = new Set(proseFiles);
const sourceFiles = collectSourceFiles();
const files = [...new Set([...proseFiles, ...sourceFiles])];
const allViolations: Violation[] = [];

for (const rel of files) {
	// The prose allowlist takes every rule; everything else takes category D only.
	const patterns = proseSet.has(rel) ? PROSE_PATTERNS : CATEGORY_D_PATTERNS;
	allViolations.push(...scanFile(join(ROOT, rel), rel, patterns));
}

const hardFailures = allViolations.filter((v) => !v.warnOnly);
const warnings = allViolations.filter((v) => v.warnOnly);

if (allViolations.length === 0) {
	console.log(
		`✓ brand-rule grep passed (${files.length} files scanned, 0 violations)`,
	);
	process.exit(0);
}

console.log('✖ Brand-rule grep failed.\n');

if (hardFailures.length > 0) {
	for (const v of hardFailures) {
		console.log(formatViolation(v));
	}
}

if (warnings.length > 0) {
	console.log('\nWarnings (Sev-2, not blocking):');
	for (const v of warnings) {
		console.log(formatViolation(v));
	}
}

const fileSlugs = new Set(allViolations.map((v) => v.file));
console.log(
	`\n${allViolations.length} violation${allViolations.length === 1 ? '' : 's'} across ${fileSlugs.size} file${fileSlugs.size === 1 ? '' : 's'}.${hardFailures.length > 0 ? ' CI failed.' : ' (warnings only — CI passes)'}`,
);
console.log(
	'\nFix or run `bun run scripts/brand-grep.ts --explain` for guidance.',
);

process.exit(hardFailures.length > 0 ? 1 : 0);
