import type { SelfFetchEndpoint } from '../generated/endpoint-defaults.js';
/** The endpoint a component fetches when no `data-endpoint` names one: the first whose config attributes all hold on `config`, else the first it renders. */
export declare function defaultEndpoint(endpoints: readonly SelfFetchEndpoint[], config: Record<string, unknown>): SelfFetchEndpoint | undefined;
/** The path parameters a request path filled into whichever of these endpoint templates it matches, or undefined when it matches none. */
export declare function pathParams(endpoints: readonly SelfFetchEndpoint[], path: string): Record<string, string> | undefined;
