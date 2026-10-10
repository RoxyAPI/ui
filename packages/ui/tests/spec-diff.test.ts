import { describe, expect, test } from 'bun:test';
import {
	diffSpecs,
	formatDiff,
	type Schema,
	type Spec,
} from '../../../scripts/spec-diff.js';

const ok = (schema: Schema) => ({
	responses: { '200': { content: { 'application/json': { schema } } } },
});

const base: Spec = {
	paths: {
		'/signs/{id}': {
			get: {
				operationId: 'getSign',
				...ok({ $ref: '#/components/schemas/Sign' }),
			},
		},
		'/old': { get: { operationId: 'getOld', ...ok({ type: 'object' }) } },
	},
	components: {
		schemas: {
			Sign: {
				type: 'object',
				properties: {
					name: { type: 'string' },
					traits: { type: 'array', items: { type: 'string' } },
					legacy: { type: 'string' },
				},
			},
		},
	},
};

const next: Spec = {
	paths: {
		'/signs/{id}': {
			get: {
				operationId: 'getSign',
				...ok({ $ref: '#/components/schemas/Sign' }),
			},
		},
		'/new': { post: { operationId: 'castNew', ...ok({ type: 'object' }) } },
	},
	components: {
		schemas: {
			Sign: {
				allOf: [
					{
						type: 'object',
						properties: {
							name: { type: 'string' },
							traits: {
								type: 'array',
								items: {
									type: 'object',
									properties: { label: { type: 'string' } },
								},
							},
						},
					},
					{ properties: { ruler: { $ref: '#/components/schemas/Planet' } } },
				],
			},
			Planet: { type: 'object', properties: { glyph: { type: 'string' } } },
		},
	},
};

describe('spec diff', () => {
	test('reports added and removed response paths per operation through refs and composition', () => {
		expect(diffSpecs(base, next)).toEqual({
			addedOperations: ['castNew'],
			removedOperations: ['getOld'],
			changed: [
				{
					operationId: 'getSign',
					added: ['ruler', 'ruler.glyph', 'traits[].label'],
					removed: ['legacy'],
				},
			],
		});
	});

	test('prints one line per operation and per property, and says so when nothing moved', () => {
		expect(formatDiff(diffSpecs(base, next))).toBe(
			[
				'+ operation castNew',
				'- operation getOld',
				'getSign',
				'  + ruler',
				'  + ruler.glyph',
				'  + traits[].label',
				'  - legacy',
			].join('\n'),
		);
		expect(formatDiff(diffSpecs(base, base))).toBe(
			'No response property added or removed.',
		);
	});
});
