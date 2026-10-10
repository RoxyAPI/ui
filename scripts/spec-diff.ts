#!/usr/bin/env bun
/** Print the 200 response properties each `operationId` gains and loses between `specs/openapi.json` and the live spec (or `--file other.json`), for checking each added one against the component that renders it. */

/** The live spec, which `generate` also fetches. */
export const LIVE_SPEC_URL =
	process.env.ROXY_OPENAPI_URL ?? 'https://roxyapi.com/api/v2/openapi.json';

const COMMITTED_SPEC = 'specs/openapi.json';

export interface Schema {
	$ref?: string;
	type?: string | string[];
	properties?: Record<string, Schema>;
	items?: Schema;
	additionalProperties?: boolean | Schema;
	allOf?: Schema[];
	oneOf?: Schema[];
	anyOf?: Schema[];
}

export interface Spec {
	paths?: Record<
		string,
		Record<
			string,
			{
				operationId?: string;
				responses?: Record<
					string,
					{ content?: Record<string, { schema?: Schema }> }
				>;
			}
		>
	>;
	components?: { schemas?: Record<string, Schema> };
}

export interface OperationDiff {
	operationId: string;
	added: string[];
	removed: string[];
}

export interface SpecDiff {
	addedOperations: string[];
	removedOperations: string[];
	changed: OperationDiff[];
}

/** Every property path a schema declares: `a.b` for an object member, `a[]` for array items, `a.*` for a map value, with `$ref` resolved and composition merged. */
export function propertyPaths(
	spec: Spec,
	schema: Schema | undefined,
): string[] {
	const out = new Set<string>();
	const walk = (s: Schema | undefined, at: string, refs: string[]) => {
		if (!s) return;
		if (s.$ref) {
			if (refs.includes(s.$ref)) return;
			const name = s.$ref.replace('#/components/schemas/', '');
			walk(spec.components?.schemas?.[name], at, [...refs, s.$ref]);
			return;
		}
		for (const part of [
			...(s.allOf ?? []),
			...(s.oneOf ?? []),
			...(s.anyOf ?? []),
		])
			walk(part, at, refs);
		for (const [key, child] of Object.entries(s.properties ?? {})) {
			const path = at ? `${at}.${key}` : key;
			out.add(path);
			walk(child, path, refs);
		}
		if (s.items) walk(s.items, `${at}[]`, refs);
		if (typeof s.additionalProperties === 'object')
			walk(s.additionalProperties, `${at}.*`, refs);
	};
	walk(schema, '', []);
	return [...out].sort();
}

/** `operationId` to the property paths of its 200 JSON response, for every operation in the spec. */
export function responsePaths(spec: Spec): Map<string, string[]> {
	const out = new Map<string, string[]>();
	for (const item of Object.values(spec.paths ?? {}))
		for (const op of Object.values(item)) {
			if (!op?.operationId) continue;
			const schema =
				op.responses?.['200']?.content?.['application/json']?.schema;
			out.set(op.operationId, propertyPaths(spec, schema));
		}
	return out;
}

/** The operations and response properties `next` adds to and removes from `base`. */
export function diffSpecs(base: Spec, next: Spec): SpecDiff {
	const before = responsePaths(base);
	const after = responsePaths(next);
	const changed: OperationDiff[] = [];
	for (const [operationId, paths] of after) {
		const old = before.get(operationId);
		if (!old) continue;
		const added = paths.filter((p) => !old.includes(p));
		const removed = old.filter((p) => !paths.includes(p));
		if (added.length || removed.length)
			changed.push({ operationId, added, removed });
	}
	return {
		addedOperations: [...after.keys()].filter((id) => !before.has(id)).sort(),
		removedOperations: [...before.keys()].filter((id) => !after.has(id)).sort(),
		changed: changed.sort((a, b) => a.operationId.localeCompare(b.operationId)),
	};
}

/** The diff as plain lines, one per operation and one per property, or a single line saying nothing moved. */
export function formatDiff(diff: SpecDiff): string {
	const lines: string[] = [];
	for (const id of diff.addedOperations) lines.push(`+ operation ${id}`);
	for (const id of diff.removedOperations) lines.push(`- operation ${id}`);
	for (const { operationId, added, removed } of diff.changed) {
		lines.push(operationId);
		for (const p of added) lines.push(`  + ${p}`);
		for (const p of removed) lines.push(`  - ${p}`);
	}
	return lines.length
		? lines.join('\n')
		: 'No response property added or removed.';
}

if (import.meta.main) {
	const flag = process.argv.indexOf('--file');
	const file = flag > -1 ? process.argv[flag + 1] : undefined;
	const base = (await Bun.file(COMMITTED_SPEC).json()) as Spec;
	let next: Spec;
	if (file) next = (await Bun.file(file).json()) as Spec;
	else {
		const res = await fetch(LIVE_SPEC_URL, {
			headers: { 'Cache-Control': 'no-cache' },
		});
		if (!res.ok) throw new Error(`${LIVE_SPEC_URL}: HTTP ${res.status}`);
		next = (await res.json()) as Spec;
	}
	console.log(`${COMMITTED_SPEC} -> ${file ?? LIVE_SPEC_URL}`);
	console.log(formatDiff(diffSpecs(base, next)));
}
