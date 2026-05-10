#!/usr/bin/env bun
/**
 * Sync the auto-generated component table block in README.md and AGENTS.md.
 * Looks for <!-- BEGIN:COMPONENTS --> ... <!-- END:COMPONENTS --> markers and
 * replaces the contents with the live table from the spec + manifest.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { ROXY_COMPONENTS } from '../packages/ui/src/manifest.js';

const TABLE = [
	'| Element | Domain | Endpoint(s) | What it renders |',
	'|---|---|---|---|',
	...ROXY_COMPONENTS.map(
		(c) =>
			`| \`<${c.tag}>\` | ${c.docsLabel} | ${c.endpointLabel} | ${c.docsSummary} |`,
	),
].join('\n');

const MARKER_BEGIN = '<!-- BEGIN:COMPONENTS -->';
const MARKER_END = '<!-- END:COMPONENTS -->';

async function syncFile(path: string) {
	let text: string;
	try {
		text = await readFile(path, 'utf8');
	} catch {
		return;
	}
	const start = text.indexOf(MARKER_BEGIN);
	const end = text.indexOf(MARKER_END);
	if (start === -1 || end === -1) return;
	const before = text.slice(0, start + MARKER_BEGIN.length);
	const after = text.slice(end);
	const next = `${before}\n${TABLE}\n${after}`;
	if (next !== text) {
		await writeFile(path, next);
		console.log(`Updated component table in ${path}`);
	}
}

async function main() {
	for (const path of ['README.md', 'AGENTS.md', 'packages/ui/AGENTS.md']) {
		await syncFile(path);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
