import type { NatalChartResponse } from '@roxyapi/ui/types';
import { defineComponent, h, onMounted, type PropType, ref } from 'vue';
import { ensureScriptLoaded } from '../load-ui.js';

export interface RoxyWesternPlanetsTableProps {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: NatalChartResponse;
	/** Endpoint path for built-in self-fetch (uncontrolled mode), e.g. "astrology/natal-chart". The component renders its own input form, fetches with the publishable key, and displays the result. Leave unset for controlled mode (pass `data`). */
	endpoint?: string;
	/** HTTP method for the self-fetch request. Defaults to POST. */
	method?: 'GET' | 'POST';
	/** Browser-safe publishable key (pk_) for self-fetch. A secret key is refused client-side and never sent. */
	publishableKey?: string;
	/** Override the API origin for self-hosted or proxied deployments. */
	baseUrl?: string;
	/** Override the OpenAPI spec URL the self-fetch form introspects. */
	specUrl?: string;
}

export const RoxyWesternPlanetsTable = defineComponent({
	name: 'RoxyWesternPlanetsTable',
	props: {
		data: { type: Object as PropType<RoxyWesternPlanetsTableProps['data']> },
		endpoint: { type: String as PropType<RoxyWesternPlanetsTableProps['endpoint']> },
		method: { type: String as PropType<RoxyWesternPlanetsTableProps['method']> },
		publishableKey: { type: String as PropType<RoxyWesternPlanetsTableProps['publishableKey']> },
		baseUrl: { type: String as PropType<RoxyWesternPlanetsTableProps['baseUrl']> },
		specUrl: { type: String as PropType<RoxyWesternPlanetsTableProps['specUrl']> },
	},
	setup(props) {
		const loadError = ref<Error | null>(null);

		onMounted(() => {
			ensureScriptLoaded().catch((err: unknown) => {
				loadError.value = err instanceof Error ? err : new Error(String(err));
			});
		});

		return () => {
			if (loadError.value) {
				return h(
					'div',
					{ role: 'alert' },
					`Roxy UI script load failed: ${loadError.value.message}`,
				);
			}

			const elementProps: Record<string, unknown> = {};
			if (props.data !== undefined) elementProps['.data'] = props.data;
			if (props.endpoint !== undefined) elementProps['.endpoint'] = props.endpoint;
			if (props.method !== undefined) elementProps['.method'] = props.method;
			if (props.publishableKey !== undefined) elementProps['.publishableKey'] = props.publishableKey;
			if (props.baseUrl !== undefined) elementProps['.baseUrl'] = props.baseUrl;
			if (props.specUrl !== undefined) elementProps['.specUrl'] = props.specUrl;

			return h('roxy-western-planets-table', elementProps);
		};
	},
});
