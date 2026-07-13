import { defineComponent, h, onMounted, type PropType, ref } from 'vue';
import { ensureScriptLoaded } from '../load-ui.js';
import type { GetCriticalDaysResponse, GetDailyBiorhythmResponse, GetForecastResponse } from '../types/index.js';

export interface RoxyBiorhythmChartProps {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: GetDailyBiorhythmResponse | GetForecastResponse | GetCriticalDaysResponse;
	/** Which biorhythm response shape to render: a single day, a multi-day forecast, or the critical days list. */
	mode?: 'daily' | 'forecast' | 'critical-days';
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

export const RoxyBiorhythmChart = defineComponent({
	name: 'RoxyBiorhythmChart',
	props: {
		data: { type: Object as PropType<RoxyBiorhythmChartProps['data']> },
		mode: { type: String as PropType<RoxyBiorhythmChartProps['mode']> },
		endpoint: { type: String as PropType<RoxyBiorhythmChartProps['endpoint']> },
		method: { type: String as PropType<RoxyBiorhythmChartProps['method']> },
		publishableKey: { type: String as PropType<RoxyBiorhythmChartProps['publishableKey']> },
		baseUrl: { type: String as PropType<RoxyBiorhythmChartProps['baseUrl']> },
		specUrl: { type: String as PropType<RoxyBiorhythmChartProps['specUrl']> },
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
			if (props.mode !== undefined) elementProps['.mode'] = props.mode;
			if (props.endpoint !== undefined) elementProps['.endpoint'] = props.endpoint;
			if (props.method !== undefined) elementProps['.method'] = props.method;
			if (props.publishableKey !== undefined) elementProps['.publishableKey'] = props.publishableKey;
			if (props.baseUrl !== undefined) elementProps['.baseUrl'] = props.baseUrl;
			if (props.specUrl !== undefined) elementProps['.specUrl'] = props.specUrl;

			return h('roxy-biorhythm-chart', elementProps);
		};
	},
});
