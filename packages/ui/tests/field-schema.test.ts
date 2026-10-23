import { describe, expect, test } from 'bun:test';
import spec from '../../../specs/openapi.json';
import {
	buildFormModel,
	classifyInput,
	collectionSource,
	deriveGroupLabel,
	deriveSubmitLabel,
	deriveTitle,
	type FieldDef,
	isZodiacEnum,
	LOCATION_PAIR,
	type OpenApiSchema,
	type OperationSchema,
	opensOnLoad,
	optionKind,
	optionsFrom,
	pickerSource,
	type SpecDoc,
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
		expect(classifyInput({ enum: [...SIGNS, 'ophiuchus'] })).toBe('select');
		expect(classifyInput({ enum: ['a', 'b', 'c'] })).toBe('tiles');
	});

	test('choices of one or two characters fit thirty to a row, words twelve, and past that a select', () => {
		const letters = [...'abcdefghijklmnopqrstuvwxyz'];
		expect(optionKind(letters)).toBe('tiles');
		expect(optionKind(Array.from({ length: 30 }, (_, i) => String(i)))).toBe(
			'tiles',
		);
		expect(optionKind(Array.from({ length: 31 }, (_, i) => String(i)))).toBe(
			'select',
		);
		expect(optionKind(SIGNS)).toBe('tiles');
		expect(optionKind([...SIGNS, 'Mars & Venus'])).toBe('select');
		// One word among the codes makes the set a set of words.
		expect(optionKind([...letters.slice(0, 12), 'mars'])).toBe('select');
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

	test('bare path enum identifiers get the opening noun, without relabelling meaningful names or free inputs', () => {
		const field = (name: string, description?: string, inPath = true) =>
			buildFormModel(
				{
					parameters: [
						{
							name,
							in: inPath ? 'path' : 'query',
							description,
							schema: { type: 'string', enum: ['one'] },
						},
					],
				},
				{},
				'test',
			).fields[0]!;
		for (const [description, label] of [
			['Animal id, case-insensitive.', 'Animal'],
			['Rashi ID slug. One of mesha.', 'Rashi'],
			['Life area id.', 'Life area'],
			['Yoga identifier (lowercase, hyphenated)', 'Yoga'],
			['Avastha slug. Baladi: bala.', 'Avastha'],
		])
			expect(field('id', description).label).toBe(label);
		expect(field('id').label).toBeUndefined();
		expect(field('id', 'Choose a value.').label).toBeUndefined();
		expect(field('sign', 'Animal id.').label).toBeUndefined();
		expect(field('id', 'Animal id.', false).label).toBeUndefined();
		const free = buildFormModel(
			{
				parameters: [
					{
						name: 'id',
						in: 'path',
						schema: { type: 'string', description: 'Animal id.' },
					},
				],
			},
			{},
			'test',
		);
		expect(free.fields[0]!.label).toBeUndefined();
		const schemaDescription = buildFormModel(
			{
				parameters: [
					{
						name: 'id',
						in: 'path',
						schema: { enum: ['one'], description: 'Center id.' },
					},
				],
			},
			{},
			'test',
		);
		expect(schemaDescription.fields[0]!.label).toBe('Center');
	});

	test('group labels retain humanized legends and numbered array field labels', () => {
		expect(deriveGroupLabel('personA')).toBe('Person A');
		expect(deriveGroupLabel('person1')).toBe('Person 1');
		expect(deriveGroupLabel('plot')).toBe('Plot');
		expect(deriveGroupLabel('natalChart')).toBe('Natal Chart');
		expect(deriveGroupLabel('members.0')).toBe('Group members 1');
		expect(deriveGroupLabel('futureGroup')).toBe('Future Group');
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
		// A collection that pages is searched, whatever its domain would say: the deck is not cast.
		const paged: FieldDef[] = [
			{ key: 'limit', name: 'limit', kind: 'number', required: false },
		];
		expect(deriveSubmitLabel('tarot/cards')).toBe('Cast');
		expect(deriveSubmitLabel('tarot/cards', paged)).toBe('Search');
		expect(deriveSubmitLabel('dreams/symbols', paged)).toBe('Search');
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

describe('options read from the API', () => {
	const doc = spec as unknown as SpecDoc;
	const param = (path: string, name: string) =>
		doc.paths[path]?.get?.parameters?.find((p) => p.name === name) ?? {
			name,
		};

	test('a list of strings, a list of records and a count map each become choices', () => {
		expect(optionsFrom({ count: 2, colors: ['apple green', 'blue'] })).toEqual([
			{ value: 'apple green', label: 'apple green' },
			{ value: 'blue', label: 'blue' },
		]);
		expect(
			optionsFrom({
				total: 1,
				cards: [{ id: 'fool', name: 'The Fool', arcana: 'major' }],
			}),
		).toEqual([{ value: 'fool', label: 'The Fool' }]);
		// A response that is itself the list.
		expect(optionsFrom([{ id: 'aries', name: 'Aries' }])).toEqual([
			{ value: 'aries', label: 'Aries' },
		]);
		// A record with no id carries its value under the field it fills, or its number.
		expect(
			optionsFrom(
				{ numbers: [{ number: '444', title: 'Protection' }] },
				'number',
			),
		).toEqual([{ value: '444', label: '444' }]);
		expect(
			optionsFrom({ trigrams: [{ number: 1, english: 'Heaven' }] }),
		).toEqual([{ value: '1', label: 'Heaven' }]);
	});

	test('a letter index lists the whole alphabet, with the letters it lacks disabled', () => {
		const options = optionsFrom({
			letters: { a: 109, b: 97, m: 0 },
			total: 206,
		});
		expect(options).toHaveLength(26);
		expect(options[0]).toEqual({ value: 'a', label: 'A', disabled: false });
		expect(options[2]).toEqual({ value: 'c', label: 'C', disabled: true });
		expect(options[12]).toEqual({ value: 'm', label: 'M', disabled: true });
		// A count map that is not an index lists what it has.
		expect(optionsFrom({ by: { Fire: 3, Water: 0 } })).toEqual([
			{ value: 'Fire', label: 'Fire', disabled: false },
			{ value: 'Water', label: 'Water', disabled: true },
		]);
		expect(optionsFrom({ total: 0 })).toEqual([]);
		expect(optionsFrom(null)).toEqual([]);
	});

	test('a free-string path identifier picks from the collection one segment up', () => {
		expect(
			pickerSource(
				doc,
				'/dreams/symbols/{id}',
				param('/dreams/symbols/{id}', 'id'),
			),
		).toEqual({ path: '/dreams/symbols', search: 'q', limit: 50 });
		expect(
			pickerSource(doc, '/tarot/cards/{id}', param('/tarot/cards/{id}', 'id')),
		).toEqual({ path: '/tarot/cards', limit: 100, lang: true });
		expect(
			pickerSource(
				doc,
				'/astrology/signs/{id}',
				param('/astrology/signs/{id}', 'id'),
			),
		).toEqual({ path: '/astrology/signs', lang: true });
	});

	test('an identifier the spec already constrains keeps its input', () => {
		// A pattern names the values, an enum lists them, a number is typed as one.
		expect(
			pickerSource(
				doc,
				'/numerology/meanings/{number}',
				param('/numerology/meanings/{number}', 'number'),
			),
		).toBeUndefined();
		expect(
			pickerSource(
				doc,
				'/crystals/chakra/{chakra}',
				param('/crystals/chakra/{chakra}', 'chakra'),
			),
		).toBeUndefined();
		expect(
			pickerSource(
				doc,
				'/crystals/birthstone/{month}',
				param('/crystals/birthstone/{month}', 'month'),
			),
		).toBeUndefined();
		expect(collectionSource(doc, '/no/such/collection')).toBeUndefined();
	});

	test('a read that needs nothing from the visitor opens on load, and nothing else does', () => {
		const optional: FieldDef = {
			key: 'q',
			name: 'q',
			kind: 'text',
			required: false,
		};
		const required: FieldDef = { ...optional, required: true };
		expect(
			opensOnLoad({ title: '', hasLang: false, fields: [optional] }, 'GET'),
		).toBe(true);
		expect(opensOnLoad({ title: '', hasLang: false, fields: [] }, 'get')).toBe(
			true,
		);
		expect(
			opensOnLoad({ title: '', hasLang: false, fields: [required] }, 'GET'),
		).toBe(false);
		// An empty body is usually an either-or the schema cannot state, so a POST never opens on load.
		expect(
			opensOnLoad({ title: '', hasLang: false, fields: [optional] }, 'POST'),
		).toBe(false);
	});

	test('an exclusive bound reaches the input as the nearest bound it can state', () => {
		const model = buildFormModel(
			doc.paths['/kabbalah/names']?.get as OperationSchema,
			(doc.components?.schemas ?? {}) as Record<string, OpenApiSchema>,
			'kabbalah/names',
		);
		const longitude = model.fields.find((f) => f.name === 'longitude');
		expect(longitude?.min).toBe(0);
		expect(longitude?.max).toBe(360);
	});
});

describe('platform-neutral render intent', () => {
	const bodyModel = (
		properties: Record<string, OpenApiSchema>,
		required: string[] = [],
	) =>
		buildFormModel(
			{
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties,
								required,
							},
						},
					},
				},
			},
			{},
			'test',
			'POST',
		);

	test('only the first coordinate pair claims the shared timezone, without rewriting keys', () => {
		const model = bodyModel(
			{
				timezone: { type: 'number' },
				birthLatitude: { type: 'number' },
				birthLongitude: { type: 'number' },
				relocationLatitude: { type: 'number' },
				relocationLongitude: { type: 'number' },
			},
			['birthLatitude', 'birthLongitude', 'timezone'],
		);
		expect(model.groups).toEqual([
			{},
			{
				key: 'birth',
				label: 'Birth',
				location: {
					fields: ['birthLatitude', 'birthLongitude', 'timezone'],
					required: true,
				},
			},
			{
				key: 'relocation',
				label: 'Relocation',
				location: {
					fields: ['relocationLatitude', 'relocationLongitude'],
					required: false,
				},
			},
		]);
		expect(model.fields.every((f) => f.role === 'location')).toBe(true);
		expect(model.fields.some((f) => f.city)).toBe(false);
		expect(
			model.fields
				.filter((f) => f.name !== 'timezone')
				.map((f) => [f.key, f.label]),
		).toEqual([
			['birthLatitude', 'Birth latitude'],
			['birthLongitude', 'Birth longitude'],
			['relocationLatitude', 'Relocation latitude'],
			['relocationLongitude', 'Relocation longitude'],
		]);
		const future = bodyModel({
			partnerLatitude: { type: 'number' },
			partnerLongitude: { type: 'number' },
			birthDate: { type: 'string', format: 'date' },
		});
		expect(future.fields.map((f) => f.label)).toEqual([
			'Partner latitude',
			'Partner longitude',
			undefined,
		]);
	});

	test('an unclaimed timezone becomes a city picker and a lone coordinate never invents a pair', () => {
		const model = bodyModel(
			{ timezone: { type: 'string' }, latitude: { type: 'number' } },
			['timezone'],
		);
		expect(model.fields.find((f) => f.name === 'timezone')).toMatchObject({
			city: true,
			required: true,
		});
		expect(model.groups?.some((g) => g.location)).toBe(false);
	});

	test('Advanced groups stay whole; fields with no primary input stay open unless defaulted', () => {
		const properties: Record<string, OpenApiSchema> = {
			name: { type: 'string' },
			count: { type: 'integer', default: 3 },
			person: {
				type: 'object',
				properties: { date: { type: 'string', format: 'date' } },
			},
		};
		const eitherOr = bodyModel(properties);
		expect(eitherOr.fields.filter((f) => f.fold).map((f) => f.key)).toEqual([
			'count',
		]);
		expect(
			eitherOr.groups?.find((g) => g.key === 'person')?.fold,
		).toBeUndefined();
		const primary = bodyModel(properties, ['name']);
		expect(primary.fields.filter((f) => f.fold).map((f) => f.key)).toEqual([
			'count',
			'person.date',
		]);
		expect(primary.groups?.find((g) => g.key === 'person')?.fold).toBe(true);
	});

	test('an either-or body asks its first input set and tucks the alternatives away', () => {
		const sets = [['date', 'gender'], ['kua']];
		const model = buildFormModel(
			{
				'x-required-any-of': sets,
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									kua: { type: 'number' },
									date: { type: 'string', format: 'date' },
									gender: { type: 'string', enum: ['male', 'female'] },
								},
							},
						},
					},
				},
			},
			{},
			'feng-shui/eight-mansions',
			'POST',
		);
		expect(model.requiredAnyOf).toEqual(sets);
		expect(model.fields.map((f) => [f.key, f.required, f.fold])).toEqual([
			['kua', false, true],
			['date', true, undefined],
			['gender', true, undefined],
		]);
		expect(
			bodyModel({ kua: { type: 'number' } }).requiredAnyOf,
		).toBeUndefined();
	});

	test('seed and optional pagination stay hidden, required pagination remains an input', () => {
		const model = bodyModel(
			{
				seed: { type: 'integer' },
				limit: { type: 'integer', default: 20 },
				offset: { type: 'integer' },
			},
			['seed', 'offset'],
		);
		expect(model.fields.map((f) => [f.key, f.role])).toEqual([
			['seed', 'seed'],
			['limit', 'hidden-default'],
			['offset', undefined],
		]);
	});

	test('option sources, disabling rules and opensOnLoad are resolved in the model', () => {
		const doc = spec as unknown as SpecDoc;
		const modelFor = (path: string, method: string) =>
			buildFormModel(
				doc.paths[path]?.[method] as OperationSchema,
				doc.components?.schemas ?? {},
				path,
				method,
			);
		const dreams = modelFor('/dreams/symbols', 'get');
		expect(dreams.opensOnLoad).toBe(true);
		expect(dreams.fields.find((f) => f.key === 'letter')?.source).toEqual({
			path: '/dreams/symbols/letters',
		});
		expect(
			modelFor('/dreams/symbols/{id}', 'get').fields.find((f) => f.key === 'id')
				?.source,
		).toMatchObject({ path: '/dreams/symbols', search: 'q' });
		expect(
			modelFor('/tarot/cards', 'get').fields.find((f) => f.key === 'suit')
				?.disabledWhen,
		).toEqual({ field: 'arcana', value: 'major' });
		expect(modelFor('/numerology/chart', 'post').opensOnLoad).toBe(false);
	});
});
