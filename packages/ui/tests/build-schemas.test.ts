import { afterEach, describe, expect, mock, test } from 'bun:test';
import { readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildSchemas } from '../../../scripts/build-schemas.js';
import {
	buildFormModel,
	type OpenApiSchema,
	type OperationSchema,
	sliceFileName,
} from '../src/utils/field-schema.js';
// Registers roxy-endpoint-form.
import '../src/index.js';

const spec = JSON.parse(readFileSync('specs/openapi.json', 'utf8')) as {
	paths: Record<string, Record<string, OperationSchema>>;
	components?: { schemas?: Record<string, OpenApiSchema> };
};

describe('build-schemas generator', () => {
	test('the natal-chart slice equals the spec-derived form model', async () => {
		const outDir = join(tmpdir(), `roxy-slices-${Date.now()}`);
		const count = await buildSchemas(outDir);
		expect(count).toBeGreaterThan(100);

		const method = 'post';
		const path = '/astrology/natal-chart';
		const file = join(outDir, sliceFileName(method, path));
		const written = JSON.parse(readFileSync(file, 'utf8'));

		const op = spec.paths[path]?.[method] as OperationSchema;
		const expected = buildFormModel(
			op,
			spec.components?.schemas ?? {},
			path.replace(/^\//, ''),
		);
		expect(written).toEqual(expected);
		// A real natal form has a date, a time, and the suppressed lang.
		const names = expected.fields.map((f) => f.name);
		expect(names).toContain('date');
		expect(names).toContain('time');
		expect(expected.hasLang).toBe(true);

		rmSync(outDir, { recursive: true, force: true });
	});
});

type FormEl = HTMLElement & { updateComplete: Promise<unknown> };

async function flush(el: FormEl): Promise<void> {
	for (let i = 0; i < 6; i++) {
		await el.updateComplete;
		await new Promise((r) => setTimeout(r, 0));
	}
}

describe('endpoint-form slice resolution order', () => {
	const originalFetch = globalThis.fetch;
	afterEach(() => {
		globalThis.fetch = originalFetch;
	});

	test('an explicit spec-url never fetches a slice', async () => {
		const urls: string[] = [];
		globalThis.fetch = mock(async (url: string | URL) => {
			urls.push(String(url));
			return { ok: false, status: 404, json: async () => ({}) };
		}) as unknown as typeof fetch;
		const el = document.createElement('roxy-endpoint-form') as FormEl;
		el.setAttribute('data-endpoint', 'astrology/natal-chart');
		el.setAttribute('spec-url', 'https://example.test/custom-spec.json');
		document.body.appendChild(el);
		await flush(el);
		expect(urls.some((u) => u.includes('custom-spec.json'))).toBe(true);
		expect(urls.some((u) => u.includes('/schemas/'))).toBe(false);
		el.remove();
	});

	test('with no spec-url, a slice miss falls back to the full production spec', async () => {
		const urls: string[] = [];
		globalThis.fetch = mock(async (url: string | URL) => {
			urls.push(String(url));
			return { ok: false, status: 404, json: async () => ({}) };
		}) as unknown as typeof fetch;
		const el = document.createElement('roxy-endpoint-form') as FormEl;
		el.setAttribute('data-endpoint', 'iching/cast');
		el.setAttribute('method', 'GET');
		document.body.appendChild(el);
		await flush(el);
		// Slice first, then the production spec fallback.
		expect(urls.some((u) => u.includes('/schemas/'))).toBe(true);
		expect(urls.some((u) => u.includes('openapi.json'))).toBe(true);
		el.remove();
	});
});
