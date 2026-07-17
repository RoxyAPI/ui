import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import {
	classifyInput,
	type OpenApiSchema,
	resolveSchema,
} from '../src/utils/field-schema.js';

/**
 * Taxonomy coverage gate. Every request parameter in the committed spec (path,
 * query, and every body property including nested group leaves) MUST resolve to
 * a known {@link classifyInput} kind. When the API grows a shape the registry
 * does not handle, this fails and names the operation and parameter, forcing a
 * conscious input decision rather than a silent text-input fallback.
 */

interface SpecOp {
	requestBody?: {
		content?: Record<string, { schema?: OpenApiSchema }>;
	};
	parameters?: Array<{ name: string; in: string; schema?: OpenApiSchema }>;
}

const spec = JSON.parse(readFileSync('specs/openapi.json', 'utf8')) as {
	paths: Record<string, Record<string, SpecOp>>;
	components?: { schemas?: Record<string, OpenApiSchema> };
};
const schemas = spec.components?.schemas ?? {};

/** Classify one leaf; object-with-properties is a group and is walked, not classified. Returns an unhandled marker string or null when covered. */
function unhandledLeaf(
	label: string,
	schema: OpenApiSchema | undefined,
): string[] {
	const r = resolveSchema(schema, schemas) ?? {};
	if (r.type === 'object' && r.properties) {
		return Object.entries(r.properties).flatMap(([name, sub]) =>
			unhandledLeaf(`${label}.${name}`, sub),
		);
	}
	return classifyInput(r) === null ? [label] : [];
}

describe('request-param taxonomy coverage', () => {
	test('every spec parameter resolves to a known input kind', () => {
		const unhandled: string[] = [];
		let paramCount = 0;
		for (const [path, item] of Object.entries(spec.paths)) {
			for (const [method, op] of Object.entries(item)) {
				if (method !== 'get' && method !== 'post') continue;
				const where = `${method.toUpperCase()} ${path}`;
				const bodyRef = op.requestBody?.content?.['application/json']?.schema;
				const body = resolveSchema(bodyRef, schemas);
				for (const [name, sub] of Object.entries(body?.properties ?? {})) {
					paramCount += 1;
					unhandled.push(...unhandledLeaf(`${where} body.${name}`, sub));
				}
				for (const p of op.parameters ?? []) {
					if (p.in !== 'path' && p.in !== 'query') continue;
					paramCount += 1;
					unhandled.push(
						...unhandledLeaf(`${where} ${p.in}.${p.name}`, p.schema),
					);
				}
			}
		}
		// Sanity: the walk actually visited a realistic number of parameters.
		expect(paramCount).toBeGreaterThan(100);
		expect(
			unhandled,
			`Parameters with no registry input kind (add one in classifyInput):\n  ${unhandled.join('\n  ')}`,
		).toEqual([]);
	});
});
