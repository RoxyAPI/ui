import { afterEach, describe, expect, mock, test } from 'bun:test';
import {
	fetchLabels,
	splitLabelPayload,
} from '../../../scripts/sync-field-labels.js';
import { registerFieldLabels, registerLocale } from '../src/i18n/registry.js';
import { translatedFieldLabel } from '../src/utils/field-schema.js';

const originalFetch = globalThis.fetch;
afterEach(() => {
	globalThis.fetch = originalFetch;
});

describe('contextual form labels', () => {
	test('uses published nouns including unchanged spellings, with regional tags and deliberate gaps', () => {
		// A separate tag leaves the process-global Spanish catalogue intact.
		registerLocale('test-form', { Center: 'Centro', Rashi: 'Rashi' });
		registerFieldLabels('test-form', {
			fields: { id: 'ID', birthLatitude: 'Latitud de nacimiento' },
			enums: {},
		});
		expect(
			translatedFieldLabel('test-form', { name: 'id', label: 'Center' }),
		).toBe('Centro');
		expect(
			translatedFieldLabel('TEST-FORM', { name: 'id', label: 'Rashi' }),
		).toBe('Rashi');
		expect(
			translatedFieldLabel('test-form', {
				name: 'latitude',
				key: 'birthLatitude',
				label: 'Birth latitude',
			}),
		).toBe('Latitud de nacimiento');
		expect(
			translatedFieldLabel('test-form', { name: 'id', label: 'Life area' }),
		).toBeUndefined();
		expect(
			translatedFieldLabel('unpublished', { name: 'id', label: 'Rashi' }),
		).toBeUndefined();
	});
});

describe('server/runtime label split', () => {
	test('routes only identifier enums to the server artifact and preserves every shared field and enum', () => {
		const payload = {
			fields: { latitude: 'Latitud' },
			enums: {
				'id.rat': 'Rata',
				'avoidAnimal.rat': 'Rata',
				'nodeType.true': 'Nodo verdadero',
			},
		};
		expect(splitLabelPayload(payload)).toEqual({
			runtime: {
				fields: payload.fields,
				enums: { 'avoidAnimal.rat': 'Rata', 'nodeType.true': 'Nodo verdadero' },
			},
			server: { enums: { 'id.rat': 'Rata' }, labels: {} },
		});
		expect(payload.enums['id.rat']).toBe('Rata');
	});
});

describe('keyless field-label feed', () => {
	test('reads picker names directly from the feed with one request and no credentials', async () => {
		const payload = {
			fields: { birthLatitude: 'Latitud de nacimiento' },
			enums: {
				'id.rat': 'Rata',
				'id.ox': 'Buey',
				'id.tiger': 'Tigre',
				'avoidAnimal.rat': 'Rata',
			},
		};
		const request = mock(async () => new Response(JSON.stringify(payload)));
		globalThis.fetch = request as unknown as typeof fetch;
		const result = await fetchLabels('es');
		expect(result).toEqual(payload);
		expect(request).toHaveBeenCalledTimes(1);
		const [url, options] = (
			request.mock.calls as unknown as [string, RequestInit][]
		)[0]!;
		expect(url).toBe(
			'https://roxyapi.com/api/v2/languages/field-labels?lang=es',
		);
		expect(options.headers).toBeUndefined();
		const { runtime, server } = splitLabelPayload(result);
		expect(server.enums).toEqual({
			'id.rat': 'Rata',
			'id.ox': 'Buey',
			'id.tiger': 'Tigre',
		});
		expect(runtime.enums).toEqual({ 'avoidAnimal.rat': 'Rata' });
	});

	test('does not reconstruct omitted conflicting identifiers from other enums', async () => {
		const payload = {
			fields: { id: 'ID' },
			enums: {
				'first.shared': 'First meaning',
				'second.shared': 'Second meaning',
			},
		};
		globalThis.fetch = mock(
			async () => new Response(JSON.stringify(payload)),
		) as unknown as typeof fetch;
		const { server } = splitLabelPayload(await fetchLabels('es'));
		expect(server.enums).toEqual({});
	});

	test('rejects failed and empty feeds so drift checks cannot silently pass', async () => {
		globalThis.fetch = mock(
			async () => new Response('{}', { status: 503 }),
		) as unknown as typeof fetch;
		await expect(fetchLabels('es')).rejects.toThrow('HTTP 503');
		globalThis.fetch = mock(
			async () =>
				new Response(
					JSON.stringify({ fields: {}, enums: { 'id.rat': 'Rata' } }),
				),
		) as unknown as typeof fetch;
		await expect(fetchLabels('es')).rejects.toThrow(
			'payload carried no fields',
		);
	});
});
