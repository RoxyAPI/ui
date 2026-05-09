import * as React from 'react';

type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyEndpointFormProps
	extends Omit<DivAttrs, 'children' | 'onSelect'> {
	data?: unknown;
	[attr: string]: unknown;
}
export declare const RoxyEndpointForm: React.ForwardRefExoticComponent<
	Omit<RoxyEndpointFormProps, 'ref'> & React.RefAttributes<HTMLElement>
>;
//# sourceMappingURL=endpoint-form.d.ts.map
