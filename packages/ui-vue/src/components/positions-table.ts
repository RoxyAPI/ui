import { defineComponent, h, onMounted, type PropType, ref } from 'vue';
import { ensureScriptLoaded } from '../load-ui.js';
import type { ArabicLotsResponse, AsteroidsResponse, LilithResponse, ProgressionsResponse, SolarArcResponse } from '../types/index.js';

export interface RoxyPositionsTableProps {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: AsteroidsResponse | LilithResponse | ProgressionsResponse | SolarArcResponse | ArabicLotsResponse;
	/** Override the auto-derived heading. Empty by default, in which case it is derived from the response shape (Asteroids, Black Moon Lilith, Secondary progressions, Solar arc directions, or Arabic lots). */
	heading?: string;
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

export const RoxyPositionsTable = defineComponent({
	name: 'RoxyPositionsTable',
	props: {
		data: { type: Object as PropType<RoxyPositionsTableProps['data']> },
		heading: { type: String as PropType<RoxyPositionsTableProps['heading']> },
		endpoint: { type: String as PropType<RoxyPositionsTableProps['endpoint']> },
		method: { type: String as PropType<RoxyPositionsTableProps['method']> },
		publishableKey: { type: String as PropType<RoxyPositionsTableProps['publishableKey']> },
		baseUrl: { type: String as PropType<RoxyPositionsTableProps['baseUrl']> },
		specUrl: { type: String as PropType<RoxyPositionsTableProps['specUrl']> },
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
			if (props.heading !== undefined) elementProps['.heading'] = props.heading;
			if (props.endpoint !== undefined) elementProps['.endpoint'] = props.endpoint;
			if (props.method !== undefined) elementProps['.method'] = props.method;
			if (props.publishableKey !== undefined) elementProps['.publishableKey'] = props.publishableKey;
			if (props.baseUrl !== undefined) elementProps['.baseUrl'] = props.baseUrl;
			if (props.specUrl !== undefined) elementProps['.specUrl'] = props.specUrl;

			return h('roxy-positions-table', elementProps);
		};
	},
});
