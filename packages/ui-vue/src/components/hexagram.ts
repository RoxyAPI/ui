import { defineComponent, h, onMounted, type PropType, ref } from 'vue';
import { ensureScriptLoaded } from '../load-ui.js';
import type { CastReadingResponse, GetDailyHexagramResponse, GetHexagramResponse, GetRandomHexagramResponse, LookupHexagramResponse } from '../types/index.js';

export interface RoxyHexagramProps {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: GetHexagramResponse | GetRandomHexagramResponse | LookupHexagramResponse | GetDailyHexagramResponse | CastReadingResponse;
	/** Which I Ching response shape to render: a static hexagram lookup, a cast with changing lines, or the daily hexagram. */
	mode?: 'lookup' | 'cast' | 'daily';
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
}

export const RoxyHexagram = defineComponent({
	name: 'RoxyHexagram',
	props: {
		data: { type: Object as PropType<RoxyHexagramProps['data']> },
		mode: { type: String as PropType<RoxyHexagramProps['mode']> },
		endpoint: { type: String as PropType<RoxyHexagramProps['endpoint']> },
		method: { type: String as PropType<RoxyHexagramProps['method']> },
		publishableKey: { type: String as PropType<RoxyHexagramProps['publishableKey']> },
		baseUrl: { type: String as PropType<RoxyHexagramProps['baseUrl']> },
		specUrl: { type: String as PropType<RoxyHexagramProps['specUrl']> },
		lang: { type: String as PropType<RoxyHexagramProps['lang']> },
		submitLabel: { type: String as PropType<RoxyHexagramProps['submitLabel']> },
		attribution: { type: String as PropType<RoxyHexagramProps['attribution']> },
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

			return h('roxy-hexagram', elementProps);
		};
	},
});
