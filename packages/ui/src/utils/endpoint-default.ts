import type { SelfFetchEndpoint } from '../generated/endpoint-defaults.js';

/** The endpoint a component fetches when no `data-endpoint` names one: the first whose config attributes all hold on `config`, else the first it renders. */
export function defaultEndpoint(
	endpoints: readonly SelfFetchEndpoint[],
	config: Record<string, unknown>,
): SelfFetchEndpoint | undefined {
	return (
		endpoints.find(
			(e) =>
				e.attrs && Object.entries(e.attrs).every(([k, v]) => config[k] === v),
		) ?? endpoints[0]
	);
}
