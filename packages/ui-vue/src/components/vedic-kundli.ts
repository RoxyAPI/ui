import { defineComponent, h, onMounted, type PropType, ref } from 'vue';
import { ensureScriptLoaded } from '../load-ui.js';
import type { BirthChartResponse } from '../types/index.js';

export interface RoxyVedicKundliProps {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: BirthChartResponse;
	/** Initial regional kundli layout. The end user can switch styles at runtime via the visible tablist. */
	chartStyle?: 'south' | 'north' | 'east';
	/** Ascendant reference point. "lagna" (default) uses the Janma Lagna; "moon" renders the Chandra Lagna (Moon as house 1) from the same response. */
	chartReference?: 'lagna' | 'moon';
	/** Explicit rashi/sign name to pin as the ascendant, overriding both the Janma Lagna and chartReference. Empty by default. Use for Surya Lagna, Arudha Lagna, or any custom reference chart. */
	lagnaOverride?: string;
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

export const RoxyVedicKundli = defineComponent({
	name: 'RoxyVedicKundli',
	props: {
		data: { type: Object as PropType<RoxyVedicKundliProps['data']> },
		chartStyle: { type: String as PropType<RoxyVedicKundliProps['chartStyle']> },
		chartReference: { type: String as PropType<RoxyVedicKundliProps['chartReference']> },
		lagnaOverride: { type: String as PropType<RoxyVedicKundliProps['lagnaOverride']> },
		endpoint: { type: String as PropType<RoxyVedicKundliProps['endpoint']> },
		method: { type: String as PropType<RoxyVedicKundliProps['method']> },
		publishableKey: { type: String as PropType<RoxyVedicKundliProps['publishableKey']> },
		baseUrl: { type: String as PropType<RoxyVedicKundliProps['baseUrl']> },
		specUrl: { type: String as PropType<RoxyVedicKundliProps['specUrl']> },
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
			if (props.chartStyle !== undefined) elementProps['.chartStyle'] = props.chartStyle;
			if (props.chartReference !== undefined) elementProps['.chartReference'] = props.chartReference;
			if (props.lagnaOverride !== undefined) elementProps['.lagnaOverride'] = props.lagnaOverride;
			if (props.endpoint !== undefined) elementProps['.endpoint'] = props.endpoint;
			if (props.method !== undefined) elementProps['.method'] = props.method;
			if (props.publishableKey !== undefined) elementProps['.publishableKey'] = props.publishableKey;
			if (props.baseUrl !== undefined) elementProps['.baseUrl'] = props.baseUrl;
			if (props.specUrl !== undefined) elementProps['.specUrl'] = props.specUrl;

			return h('roxy-vedic-kundli', elementProps);
		};
	},
});
