import { defineComponent, h, onMounted, type PropType, ref } from 'vue';
import { ensureScriptLoaded } from '../load-ui.js';
import type { GetCardResponse, GetDailyCardResponse } from '../types/index.js';

export interface RoxyTarotCardProps {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: GetCardResponse | GetDailyCardResponse;
	/** Endpoint path for built-in self-fetch (uncontrolled mode), e.g. "astrology/natal-chart". The component renders its own input form, fetches with the publishable key, and displays the result. Leave unset for controlled mode (pass `data`). */
	endpoint?: string;
	/** HTTP method for the self-fetch request. Defaults to POST. */
	method?: 'GET' | 'POST';
	/** Browser-safe publishable key (pk_) for self-fetch. A secret key is refused client-side and never sent. */
	publishableKey?: string;
	/** Override the API origin for self-hosted or proxied deployments. */
	baseUrl?: string;
	/** Your own backend route, which holds the secret key. Self-fetch POSTs `{ path, method, body, query }` there instead of calling RoxyAPI directly and renders the JSON your route returns, so no key of any kind reaches the browser. */
	submitUrl?: string;
	/** Where the self-fetch form city search sends its request, absolute or relative to the page. The companion of submitUrl: the city search is a GET the form issues on its own while a visitor types, so a page that routes its API traffic through its own server names that route here as well. Unset, the search calls the public location endpoint. */
	locationUrl?: string;
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
	/** Comma-separated list of `part` names to take off this component, for example "patterns" or "patterns, legend". Per element rather than per site, so the same component can drop a block on one page and keep it on another with no CSS. Sibling of hideReadings and a different tool: this hides a whole block whatever it contains, where hideReadings drops interpretive prose out of the markup. Names come from the `parts` array in components-catalog.json; a name the component does not carry hides nothing and is not an error. */
	hideSections?: string;
}

export const RoxyTarotCard = defineComponent({
	name: 'RoxyTarotCard',
	props: {
		data: { type: Object as PropType<RoxyTarotCardProps['data']> },
		endpoint: { type: String as PropType<RoxyTarotCardProps['endpoint']> },
		method: { type: String as PropType<RoxyTarotCardProps['method']> },
		publishableKey: { type: String as PropType<RoxyTarotCardProps['publishableKey']> },
		baseUrl: { type: String as PropType<RoxyTarotCardProps['baseUrl']> },
		submitUrl: { type: String as PropType<RoxyTarotCardProps['submitUrl']> },
		locationUrl: { type: String as PropType<RoxyTarotCardProps['locationUrl']> },
		specUrl: { type: String as PropType<RoxyTarotCardProps['specUrl']> },
		lang: { type: String as PropType<RoxyTarotCardProps['lang']> },
		submitLabel: { type: String as PropType<RoxyTarotCardProps['submitLabel']> },
		attribution: { type: String as PropType<RoxyTarotCardProps['attribution']> },
		hideReadings: { type: Boolean as PropType<RoxyTarotCardProps['hideReadings']> },
		hideSections: { type: String as PropType<RoxyTarotCardProps['hideSections']> },
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
			if (props.submitUrl !== undefined) elementProps['.submitUrl'] = props.submitUrl;
			if (props.locationUrl !== undefined) elementProps['.locationUrl'] = props.locationUrl;
			if (props.specUrl !== undefined) elementProps['.specUrl'] = props.specUrl;
			if (props.lang !== undefined) elementProps['.lang'] = props.lang;
			if (props.submitLabel !== undefined) elementProps['.submitLabel'] = props.submitLabel;
			if (props.attribution !== undefined) elementProps['.attribution'] = props.attribution;
			if (props.hideReadings !== undefined) elementProps['.hideReadings'] = props.hideReadings;
			if (props.hideSections !== undefined) elementProps['.hideSections'] = props.hideSections;

			return h('roxy-tarot-card', elementProps);
		};
	},
});
