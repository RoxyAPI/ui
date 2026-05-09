#!/usr/bin/env bun
/**
 * Wrap the main repo's brand-asset generator. Outputs assets/banner.png at
 * the GitHub-recommended 1280x640 spec.
 */
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const MAIN_REPO =
	process.env.ROXY_MAIN_REPO ?? resolve(process.cwd(), '../roxyapi');
const SCRIPT = `${MAIN_REPO}/scripts/generate-asset.tsx`;
const OUTPUT = resolve(process.cwd(), 'assets/banner.png');

if (!existsSync(SCRIPT)) {
	console.error(`! Brand asset script not found at ${SCRIPT}.`);
	console.error(`  Set ROXY_MAIN_REPO env var to the main repo path.`);
	process.exit(1);
}

const args = [
	'bun',
	SCRIPT,
	'--preset',
	'github-sdk',
	'--eyebrow',
	'Roxy UI',
	'--title',
	'Beautiful spiritual components in 30 minutes',
	'--subtitle',
	'npm install @roxyapi/ui',
	'--foot',
	'One key. Flat pricing.',
	'--output',
	OUTPUT,
];

console.log(`Generating banner: ${OUTPUT}`);
execSync(args.join(' '), { stdio: 'inherit', cwd: MAIN_REPO });
console.log('Banner generated.');
