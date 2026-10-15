import { describe, expect, mock, test } from 'bun:test';
import {
	enumPickers,
	matchingEnumLabels,
	splitLabelPayload,
	syncPickerEnums,
} from '../../../scripts/sync-field-labels.js';
import specJson from '../../../specs/openapi.json';
import { registerFieldLabels, registerLocale } from '../src/i18n/registry.js';
import {
	optionsFrom,
	type SpecDoc,
	translatedFieldLabel,
} from '../src/utils/field-schema.js';

const spec = specJson as unknown as SpecDoc;
const animalPath = '/chinese-astrology/zodiac/animals';
const animalSpec: SpecDoc = {
	paths: {
		[animalPath]: spec.paths[animalPath]!,
		[`${animalPath}/{id}`]: spec.paths[`${animalPath}/{id}`]!,
		'/chinese-astrology/zodiac/{id}/daily':
			spec.paths['/chinese-astrology/zodiac/{id}/daily']!,
	},
};

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

describe('identifier option sync', () => {
	test('finds enum collection paths, with language and page bounds, once for daily and animal pickers', () => {
		expect(enumPickers(animalSpec)).toEqual([
			{
				source: { path: animalPath, lang: true, limit: 12 },
				field: 'id',
				values: [
					'rat',
					'ox',
					'tiger',
					'rabbit',
					'dragon',
					'snake',
					'horse',
					'goat',
					'monkey',
					'rooster',
					'dog',
					'pig',
				],
			},
		]);
	});

	test('publishes localized collection names under wire values, without changing API field labels', async () => {
		const load = mock(async () => ({
			animals: [
				{ id: 'rat', name: 'Rat', nameLocalized: 'Rata' },
				{ id: 'ox', name: 'Buey' },
				{ id: 'unlisted', name: 'Ignored' },
				{ id: 'tiger' },
			],
		}));
		const payload = {
			fields: { id: 'ID' },
			enums: { 'id.ox': 'Existing API label' },
		};
		expect(await syncPickerEnums(payload, animalSpec, load)).toEqual({
			fields: payload.fields,
			enums: { 'id.rat': 'Rata', 'id.ox': 'Existing API label' },
		});
		expect(load).toHaveBeenCalledTimes(1);
		expect(payload.enums).toEqual({ 'id.ox': 'Existing API label' });
	});

	test('conflicting names for an ID shared by collections stay absent instead of depending on source order', async () => {
		const shared: SpecDoc = {
			paths: {
				'/first': {
					get: {
						operationId: 'listFirst',
						parameters: [{ name: 'lang', in: 'query' }],
					},
				},
				'/first/{id}': {
					get: {
						operationId: 'getFirst',
						parameters: [
							{
								name: 'id',
								in: 'path',
								description: 'First identifier',
								schema: { type: 'string', enum: ['shared'] },
							},
						],
					},
				},
				'/second': {
					get: {
						operationId: 'listSecond',
						parameters: [{ name: 'lang', in: 'query' }],
					},
				},
				'/second/{id}': {
					get: {
						operationId: 'getSecond',
						parameters: [
							{
								name: 'id',
								in: 'path',
								description: 'Second identifier',
								schema: { type: 'string', enum: ['shared'] },
							},
						],
					},
				},
			},
		};
		const result = await syncPickerEnums(
			{ fields: {}, enums: {} },
			shared,
			async (source) => [
				{
					id: 'shared',
					name: source.path === '/first' ? 'First name' : 'Second name',
				},
			],
		);
		expect(result.enums).toEqual({});
	});

	test('never borrows names from a partial or conflicting choice set', () => {
		expect(matchingEnumLabels({ 'one.rat': 'Rata' }, ['rat', 'ox'])).toEqual(
			{},
		);
		expect(
			matchingEnumLabels(
				{
					'one.rat': 'Rata',
					'one.ox': 'Buey',
					'two.rat': 'Other meaning',
					'two.ox': 'Buey',
				},
				['rat', 'ox'],
			),
		).toEqual({ ox: 'Buey' });
	});

	test('uses the API field-label names when a collection is unavailable, leaving unsupported values absent', async () => {
		const enums = Object.fromEntries(
			enumPickers(animalSpec)[0]!.values.map((v) => [
				`avoidAnimal.${v}`,
				v === 'rat' ? 'Rata' : v,
			]),
		);
		const result = await syncPickerEnums(
			{ fields: {}, enums },
			animalSpec,
			async () => {
				throw new Error('HTTP 401');
			},
		);
		expect(result.enums?.['id.rat']).toBe('Rata');
		expect(result.enums?.['id.unlisted']).toBeUndefined();
	});

	test('an unavailable collection fails the drift check and preserves prior names during a normal sync', async () => {
		const load = async () => {
			throw new Error('HTTP 401');
		};
		await expect(
			syncPickerEnums({ fields: {}, enums: {} }, animalSpec, load, {
				strict: true,
			}),
		).rejects.toThrow('HTTP 401');
		const result = await syncPickerEnums(
			{ fields: {}, enums: {} },
			animalSpec,
			load,
			{ previous: { 'id.rat': 'Rata' } },
		);
		expect(result.enums).toEqual({ 'id.rat': 'Rata' });
	});

	test('browser collection options keep their original canonical names', () => {
		expect(
			optionsFrom({
				entries: [{ id: 'rat', name: 'Rat', nameLocalized: 'Rata' }],
			}),
		).toEqual([{ value: 'rat', label: 'Rat' }]);
	});
});
