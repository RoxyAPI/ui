import { defineComponent, h, onMounted, type PropType, ref } from 'vue';
import { ensureScriptLoaded } from '../load-ui.js';
import type { CalculateBioCompatibilityResponse, CalculateCompatibilityResponse, CalculateNumCompatibilityResponse } from '../types/index.js';

export interface RoxyCompatibilityCardProps {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: CalculateCompatibilityResponse | CalculateNumCompatibilityResponse | CalculateBioCompatibilityResponse;
	/** Which compatibility domain the response is from. Themes the card and labels the category breakdown. */
	mode?: 'astrology' | 'numerology' | 'biorhythm';
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
	/** Response language for self-fetch, forwarded to the API `lang` query parameter (en, tr, de, es, hi, pt, fr, ru). The form never shows a language field; the site owner sets it here. Defaults to English. */
	lang?: string;
	/** Override the self-fetch form submit-button label. Empty derives an outcome-first label from the endpoint (Get reading, Generate, Compare, Cast). */
	submitLabel?: string;
	/** Render a small "Spiritual data by RoxyAPI" credit under a self-fetch result, linking back to RoxyAPI. Off by default; set any value to enable, or "off" to force it off. Never shown in controlled mode. */
	attribution?: string;
	/** Render the chart and the data and omit the written interpretation. Off by default. Use it when the page supplies its own words: the wheels, tables, grids, legends and numbers stay, and the interpretive prose is left out of the markup entirely. */
	hideReadings?: boolean;
}

export const RoxyCompatibilityCard = defineComponent({
	name: 'RoxyCompatibilityCard',
	props: {
		data: { type: Object as PropType<RoxyCompatibilityCardProps['data']> },
		mode: { type: String as PropType<RoxyCompatibilityCardProps['mode']> },
		endpoint: { type: String as PropType<RoxyCompatibilityCardProps['endpoint']> },
		method: { type: String as PropType<RoxyCompatibilityCardProps['method']> },
		publishableKey: { type: String as PropType<RoxyCompatibilityCardProps['publishableKey']> },
		baseUrl: { type: String as PropType<RoxyCompatibilityCardProps['baseUrl']> },
		specUrl: { type: String as PropType<RoxyCompatibilityCardProps['specUrl']> },
		lang: { type: String as PropType<RoxyCompatibilityCardProps['lang']> },
		submitLabel: { type: String as PropType<RoxyCompatibilityCardProps['submitLabel']> },
		attribution: { type: String as PropType<RoxyCompatibilityCardProps['attribution']> },
		hideReadings: { type: Boolean as PropType<RoxyCompatibilityCardProps['hideReadings']> },
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
			if (props.lang !== undefined) elementProps['.lang'] = props.lang;
			if (props.submitLabel !== undefined) elementProps['.submitLabel'] = props.submitLabel;
			if (props.attribution !== undefined) elementProps['.attribution'] = props.attribution;
			if (props.hideReadings !== undefined) elementProps['.hideReadings'] = props.hideReadings;

			return h('roxy-compatibility-card', elementProps);
		};
	},
});
