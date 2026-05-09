import { defineConfig } from '@hey-api/openapi-ts';

/**
 * The UI library only consumes types from the OpenAPI spec. We do not
 * generate client wrappers here. Components import response types and use
 * them as their `data` prop shape.
 */
export default defineConfig({
	input: './specs/openapi.json',
	output: {
		path: 'packages/ui/src/types',
		clean: true,
	},
	plugins: ['@hey-api/typescript'],
});
