#!/usr/bin/env bun
/**
 * Emit one digested per-operation form slice per endpoint into `dist/schemas`, so an embedded `<roxy-endpoint-form>` fetches a few hundred bytes instead of the ~1.5 MB full OpenAPI spec on every widget page. Each slice is the exact {@link FormModel} the form renders (fields, kinds, enums, defaults, descriptions, examples, groups, title, hasLang), produced by the same {@link buildFormModel} the browser uses, so the runtime cannot disagree with the build.
 *
 * @remarks
 * Runs as a step of `bun run build` (after the spec is committed and the dist tree exists). The slices ship via the `dist` entry in the package `files` allowlist and are served version-pinned on jsDelivr; the form falls back to the full spec on any slice miss, so an older published bundle keeps working.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import {
	buildFormModel,
	type SpecDoc,
	sliceFileName,
} from '../packages/ui/src/utils/field-schema.js';

const SPEC_PATH = 'specs/openapi.json';
const OUT_DIR = 'packages/ui/dist/schemas';

/** Generate every slice into `outDir` (defaults to the published dist path). Returns the number written. */
export async function buildSchemas(outDir: string = OUT_DIR): Promise<number> {
	const spec = JSON.parse(await readFile(SPEC_PATH, 'utf8')) as SpecDoc;
	const schemas = spec.components?.schemas ?? {};
	await mkdir(outDir, { recursive: true });
	let count = 0;
	for (const [path, item] of Object.entries(spec.paths)) {
		for (const [method, op] of Object.entries(item)) {
			if (method !== 'get' && method !== 'post') continue;
			const model = buildFormModel(op, schemas, path.replace(/^\//, ''));
			await writeFile(
				`${outDir}/${sliceFileName(method, path)}`,
				JSON.stringify(model),
			);
			count += 1;
		}
	}
	return count;
}

if (import.meta.main) {
	const count = await buildSchemas();
	console.log(`Wrote ${count} schema slices to ${OUT_DIR}`);
}
