import { describe, expect, test } from 'bun:test';
import {
	buildFormModel,
	classifyInput,
	deriveSubmitLabel,
	deriveTitle,
	isZodiacEnum,
	LOCATION_PAIR,
	type OpenApiSchema,
	type OperationSchema,
	sliceFileName,
} from '../src/utils/field-schema.js';

const SIGNS = [
	'aries',
	'taurus',
	'gemini',
	'cancer',
	'leo',
	'virgo',
	'libra',
	'scorpio',
	'sagittarius',
	'capricorn',
	'aquarius',
	'pisces',
];

describe('classifyInput (the shape -> input-kind registry)', () => {
	test('a small enum is a tile picker, a large one a select', () => {
		expect(classifyInput({ enum: SIGNS })).toBe('tiles');
		expect(classifyInput({ enum: ['a', 'b', 'c'] })).toBe('tiles');
		const big = Array.from({ length: 27 }, (_, i) => String(i));
		expect(classifyInput({ enum: big })).toBe('select');
	});

	test('a boolean is a toggle (fixes the boolean-as-text bug)', () => {
		expect(classifyInput({ type: 'boolean' })).toBe('toggle');
	});

	test('date, time, and date-time formats map to native inputs', () => {
		expect(classifyInput({ type: 'string', format: 'date' })).toBe('date');
		expect(classifyInput({ type: 'string', format: 'time' })).toBe('time');
		expect(classifyInput({ type: 'string', format: 'date-time' })).toBe(
			'datetime',
		);
	});

	test('integer and number are number inputs, string is text, array is array', () => {
		expect(classifyInput({ type: 'integer' })).toBe('number');
		expect(classifyInput({ type: 'number' })).toBe('number');
		expect(classifyInput({ type: 'string' })).toBe('text');
		expect(classifyInput({ type: 'array', items: { type: 'string' } })).toBe(
			'array',
		);
	});

	test('an anyOf union resolves through its members', () => {
		// houseSystem: enum-or-string -> the enum member wins -> tiles.
		expect(
			classifyInput({
				anyOf: [{ enum: ['placidus', 'koch'] }, { type: 'string' }],
			}),
		).toBe('tiles');
		// timezone: number-or-string -> a concrete-typed member -> number.
		expect(
			classifyInput({
				anyOf: [{ type: 'number' }, { type: 'string' }],
			}),
		).toBe('number');
	});

	test('a genuinely unhandled shape returns null so the taxonomy gate can fail', () => {
		expect(classifyInput({ type: 'object' })).toBeNull();
		expect(classifyInput({})).toBeNull();
	});
});

describe('isZodiacEnum', () => {
	test('recognizes the twelve signs case-insensitively', () => {
		expect(isZodiacEnum(SIGNS)).toBe(true);
		expect(isZodiacEnum(SIGNS.map((s) => s.toUpperCase()))).toBe(true);
	});
	test('rejects a non-sign or partial set', () => {
		expect(isZodiacEnum(SIGNS.slice(0, 11))).toBe(false);
		expect(isZodiacEnum(['fire', 'earth', 'air', 'water'])).toBe(false);
	});
});

describe('buildFormModel', () => {
	const schemas: Record<string, OpenApiSchema> = {};

	/**
	 * Two locations reach a request in two shapes. Nested per-person objects (`person1`/`person2`)
	 * were always grouped by object nesting, but `generateRelocationChart` puts BOTH coordinate pairs
	 * at the top level and distinguishes them by a name prefix, so it is the only operation in the
	 * spec that the nesting-only grouping could not see. It rendered four raw number inputs and a
	 * decimal-hours timezone to the visitor.
	 *
	 * `key` must stay the ORIGINAL wire name. Rewriting it to `birth.latitude` would group correctly
	 * and then serialise a body the API rejects, which is the failure mode a group-shape test alone
	 * would miss.
	 */
	test('a prefixed coordinate pair becomes its own group, keeping the wire key', () => {
		const op: OperationSchema = {
			summary: 'Relocation chart',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							type: 'object',
							required: ['date', 'birthLatitude', 'relocationLatitude'],
							properties: {
								date: { type: 'string', format: 'date' },
								timezone: { type: 'number' },
								birthLatitude: { type: 'number' },
								birthLongitude: { type: 'number' },
								relocationLatitude: { type: 'number' },
								relocationLongitude: { type: 'number' },
							},
						},
					},
				},
			},
		};

		const { fields } = buildFormModel(
			op,
			schemas,
			'astrology/relocation-chart',
		);
		const groups = [...new Set(fields.map((f) => f.group))];
		const located = groups.filter((g) =>
			LOCATION_PAIR.every((n) =>
				fields.some((f) => f.group === g && f.name === n),
			),
		);

		expect(located).toEqual(['birth', 'relocation']);
		expect(
			fields.find((f) => f.group === 'birth' && f.name === 'latitude')?.key,
		).toBe('birthLatitude');
		expect(
			fields.find((f) => f.group === 'relocation' && f.name === 'longitude')
				?.key,
		).toBe('relocationLongitude');
		// The shared timezone stays flat and unprefixed; the form assigns it to the first group.
		expect(fields.find((f) => f.name === 'timezone')?.group).toBeUndefined();
	});

	/** A prefix is harvested from coordinates ONLY. `birthDate` must not invent a `birth` group holding a lone date. */
	test('a non-coordinate field sharing a prefix stays in the flat group', () => {
		const op: OperationSchema = {
			summary: 'Solar return',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								birthDate: { type: 'string', format: 'date' },
								birthTime: { type: 'string' },
								latitude: { type: 'number' },
								longitude: { type: 'number' },
							},
						},
					},
				},
			},
		};

		const { fields } = buildFormModel(op, schemas, 'astrology/solar-return');
		expect(fields.find((f) => f.name === 'birthDate')?.group).toBeUndefined();
		expect(fields.find((f) => f.name === 'birthTime')?.group).toBeUndefined();
		expect(fields.find((f) => f.name === 'latitude')?.group).toBeUndefined();
	});

	test('a path enum plus a lang query becomes one tile field, lang suppressed', () => {
		const op: OperationSchema = {
			summary: 'Daily horoscope by zodiac sign - Transit forecast',
			parameters: [
				{ name: 'sign', in: 'path', required: true, schema: { enum: SIGNS } },
				{ name: 'lang', in: 'query', schema: { enum: ['en', 'de'] } },
			],
		};
		const model = buildFormModel(
			op,
			schemas,
			'astrology/horoscope/{sign}/daily',
		);
		expect(model.fields).toHaveLength(1);
		expect(model.fields[0]).toMatchObject({
			name: 'sign',
			kind: 'tiles',
			required: true,
		});
		expect(model.hasLang).toBe(true);
		expect(model.title).toBe('Daily horoscope by zodiac sign');
	});

	test('body props expand nested groups and carry min/max on params too', () => {
		const op: OperationSchema = {
			requestBody: {
				content: {
					'application/json': {
						schema: {
							type: 'object',
							required: ['person1'],
							properties: {
								person1: {
									type: 'object',
									required: ['date'],
									properties: {
										date: { type: 'string', format: 'date' },
										name: { type: 'string' },
									},
								},
								strictOrbs: { type: 'boolean' },
							},
						},
					},
				},
			},
			parameters: [
				{
					name: 'orb',
					in: 'query',
					schema: { type: 'integer', minimum: 1, maximum: 10 },
				},
			],
		};
		const model = buildFormModel(op, schemas, 'astrology/synastry');
		const byKey = Object.fromEntries(model.fields.map((f) => [f.key, f]));
		expect(byKey['person1.date']).toMatchObject({
			group: 'person1',
			kind: 'date',
			required: true,
		});
		expect(byKey['person1.name']).toMatchObject({
			group: 'person1',
			required: false,
		});
		expect(byKey.strictOrbs).toMatchObject({ kind: 'toggle' });
		// D-4: a query integer keeps its min/max, same as a body integer would.
		expect(byKey.orb).toMatchObject({
			kind: 'number',
			min: 1,
			max: 10,
			inQuery: true,
		});
	});
});

describe('deriveTitle and deriveSubmitLabel', () => {
	test('title prefers the summary lead, falls back to the path', () => {
		expect(deriveTitle('Generate natal chart - houses and aspects', 'x')).toBe(
			'Generate natal chart',
		);
		expect(deriveTitle(undefined, 'astrology/horoscope/{sign}/daily')).toBe(
			'Daily',
		);
	});
	test('submit label reflects the endpoint intent', () => {
		expect(deriveSubmitLabel('astrology/horoscope/{sign}/daily')).toBe(
			'Get reading',
		);
		expect(deriveSubmitLabel('astrology/synastry')).toBe('Compare');
		expect(deriveSubmitLabel('iching/cast')).toBe('Cast');
		expect(deriveSubmitLabel('vedic-astrology/birth-chart')).toBe('Generate');
	});
});

describe('sliceFileName', () => {
	test('is deterministic and URL-safe', () => {
		expect(sliceFileName('GET', 'astrology/horoscope/{sign}/daily')).toBe(
			'get--astrology-horoscope-sign-daily.json',
		);
		expect(sliceFileName('POST', '/astrology/natal-chart')).toBe(
			'post--astrology-natal-chart.json',
		);
	});
});
