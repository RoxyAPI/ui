#!/usr/bin/env bun

/**
 * brand-grep.ts — CI gate for brand-rule and content-rule violations.
 *
 * Scans a fixed allowlist of public committed files for forbidden phrases,
 * hardcoded counts, and stale URL pinning. Exit 1 on any Sev-1 violation.
 * Category C (stale URL) is a warning only — prints but does not fail.
 *
 * Usage:
 *   bun run scripts/brand-grep.ts
 *   bun run scripts/brand-grep.ts --explain
 */

import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

// ---------------------------------------------------------------------------
// File allowlist — only these paths are scanned. Glob patterns are expanded
// via `git ls-files` so we only touch committed files.
// ---------------------------------------------------------------------------
const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');

const STATIC_PATHS = [
	'README.md',
	'AGENTS.md',
	'packages/ui/README.md',
	'packages/ui/THEMING.md',
	'packages/ui-react/README.md',
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
			// pattern matched nothing — that is fine
		}
	}
	return results;
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
	category: 'A' | 'B' | 'C';
	label: string;
	test: (line: string, raw: string) => boolean;
	/** If true, violations produce a warning rather than a hard failure */
	warnOnly?: boolean;
}

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

const CATEGORY_C_PATTERNS: Pattern[] = [
	{
		category: 'C',
		label: 'stale-url',
		warnOnly: true,
		test: (line) => /cdn\.jsdelivr\.net\/gh\/RoxyAPI\/ui@main/i.test(line),
	},
];

const ALL_PATTERNS = [
	...CATEGORY_A_PATTERNS,
	...CATEGORY_B_PATTERNS,
	...CATEGORY_C_PATTERNS,
];

// ---------------------------------------------------------------------------
// Violation type
// ---------------------------------------------------------------------------

interface Violation {
	file: string;
	line: number;
	column: number;
	category: 'A' | 'B' | 'C';
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
	// Category C (specific multi-char strings — check before generic punctuation)
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

function scanFile(filePath: string, relPath: string): Violation[] {
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

		for (const pattern of ALL_PATTERNS) {
			// Category A is skipped inside fenced code blocks
			if (pattern.category === 'A' && inFencedBlock) continue;

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
    remove entirely from public copy; these belong in CLAUDE.md only.
  - brand words (toolkit, collection of components, astronomy-engine, Swiss Ephemeris …):
    replace with "web components", "every domain in the catalog", or remove.

Category B (Sev-1 — build fails):
  - hardcoded counts (18 components, 10 domains, $39, Phase 1 components …):
    use dynamic phrasing: "every domain in the catalog", "every RoxyAPI domain".

Category C (Sev-2 — warning only):
  - stale jsDelivr URL (cdn.jsdelivr.net/gh/RoxyAPI/ui@main):
    switch to cdn.jsdelivr.net/npm/@roxyapi/ui@latest or a pinned version tag.
`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const files = collectFiles();
const allViolations: Violation[] = [];

for (const rel of files) {
	const abs = join(ROOT, rel);
	const vs = scanFile(abs, rel);
	allViolations.push(...vs);
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

if (EXPLAIN) {
	explain();
}

process.exit(hardFailures.length > 0 ? 1 : 0);
