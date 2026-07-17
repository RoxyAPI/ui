import { defineComponent, h, onMounted, type PropType, ref } from 'vue';
import { ensureScriptLoaded } from '../load-ui.js';
import type { ListCardsResponse } from '../types/index.js';

export interface RoxyTarotCatalogProps {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: ListCardsResponse;
	/** Override the auto-derived gallery heading. Empty by default, in which case the heading is "Tarot deck". */
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
	/** Response language for self-fetch, forwarded to the API `lang` query parameter (en, tr, de, es, hi, pt, fr, ru). The form never shows a language field; the site owner sets it here. Defaults to English. */
	lang?: string;
	/** Override the self-fetch form submit-button label. Empty derives an outcome-first label from the endpoint (Get reading, Generate, Compare, Cast). */
	submitLabel?: string;
	/** Render a small "Spiritual data by RoxyAPI" credit under a self-fetch result, linking back to RoxyAPI. Off by default; set any value to enable, or "off" to force it off. Never shown in controlled mode. */
	attribution?: string;
}

export const RoxyTarotCatalog = defineComponent({
	name: 'RoxyTarotCatalog',
	props: {
		data: { type: Object as PropType<RoxyTarotCatalogProps['data']> },
		heading: { type: String as PropType<RoxyTarotCatalogProps['heading']> },
		endpoint: { type: String as PropType<RoxyTarotCatalogProps['endpoint']> },
		method: { type: String as PropType<RoxyTarotCatalogProps['method']> },
		publishableKey: { type: String as PropType<RoxyTarotCatalogProps['publishableKey']> },
		baseUrl: { type: String as PropType<RoxyTarotCatalogProps['baseUrl']> },
		specUrl: { type: String as PropType<RoxyTarotCatalogProps['specUrl']> },
		lang: { type: String as PropType<RoxyTarotCatalogProps['lang']> },
		submitLabel: { type: String as PropType<RoxyTarotCatalogProps['submitLabel']> },
		attribution: { type: String as PropType<RoxyTarotCatalogProps['attribution']> },
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
			if (props.lang !== undefined) elementProps['.lang'] = props.lang;
			if (props.submitLabel !== undefined) elementProps['.submitLabel'] = props.submitLabel;
			if (props.attribution !== undefined) elementProps['.attribution'] = props.attribution;

			return h('roxy-tarot-catalog', elementProps);
		};
	},
});
