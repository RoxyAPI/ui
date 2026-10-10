/** Derive the GET reads a component sends beyond its bound endpoints (filter lists, identifier pickers, Show more pages, an opened row) from the generated option sources and its own `rowDetail` and `listKey`. */
import { readFileSync } from 'node:fs';
import type { EndpointBinding } from '../packages/ui/src/generated/endpoint-bindings.js';
import { OPTION_SOURCES } from '../packages/ui/src/generated/option-sources.js';
import type {
	OperationSchema,
	SpecDoc,
} from '../packages/ui/src/utils/field-schema.js';
import { code, sourcePathForSlug } from './component-parts.js';

export type SideReadKind = 'options' | 'picker' | 'more' | 'row';

export interface SideRead {
	kind: SideReadKind;
	/** The bound operation whose form or list sends this read; absent on `row`, which any rendered list can send. */
	endpoint?: string;
	/** The request field the read fills, on `options` and `picker`. */
	field?: string;
	operationId: string;
	method: 'GET';
	path: string;
}

type Spec = SpecDoc & {
	paths: Record<
		string,
		Record<string, OperationSchema & { operationId?: string }>
	>;
};

const spec = JSON.parse(readFileSync('specs/openapi.json', 'utf8')) as Spec;

/** The GET operation at a path, or a thrown error naming the path, because a read the spec lacks would publish a route nothing answers. */
function getAt(path: string): OperationSchema & { operationId?: string } {
	const op = spec.paths[path]?.get;
	if (!op?.operationId)
		throw new Error(`side read: no GET operation at ${path}`);
	return op;
}

const ROW_DETAIL =
	/\browDetail\s*=\s*\{\s*tag:\s*'[^']+',\s*path:\s*'([^']+)'\s*,?\s*\}/;
const LIST_KEY = /\blistKey\s*=\s*'[^']+'/;

/** The `rowDetail` path and whether a `listKey` is declared, read from the component source with comments removed. */
export function listTraits(slug: string): { rowPath?: string; pages: boolean } {
	const src = code(readFileSync(sourcePathForSlug(slug), 'utf8'));
	const row = src.match(ROW_DETAIL);
	if (!row && /\browDetail\s*=/.test(src))
		throw new Error(
			`side read: ${slug} declares a rowDetail the scan cannot read`,
		);
	return { rowPath: row?.[1], pages: LIST_KEY.test(src) };
}

/** Every side read of one component, in binding order, then its row read. */
export function sideReadsFor(
	slug: string,
	endpoints: EndpointBinding[],
): SideRead[] {
	const { rowPath, pages } = listTraits(slug);
	const reads: SideRead[] = [];
	const read = (
		kind: SideReadKind,
		path: string,
		extra: Pick<SideRead, 'endpoint' | 'field'>,
	) => {
		const operationId = getAt(path).operationId as string;
		reads.push({ kind, ...extra, operationId, method: 'GET', path });
	};
	for (const e of endpoints) {
		const sources = OPTION_SOURCES[`${e.method} ${e.path}`] ?? {};
		for (const [field, source] of Object.entries(sources))
			read(e.path.includes(`{${field}}`) ? 'picker' : 'options', source.path, {
				endpoint: e.operationId,
				field,
			});
		if (
			pages &&
			e.method === 'GET' &&
			getAt(e.path).parameters?.some((p) => p.name === 'offset')
		)
			read('more', e.path, { endpoint: e.operationId });
	}
	if (rowPath) read('row', `/${rowPath}`, {});
	return reads;
}
