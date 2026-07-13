import { defineComponent, h, onMounted, type PropType, ref } from 'vue';
import { ensureScriptLoaded } from '../load-ui.js';
import type { CastCareerSpreadResponse, CastCelticCrossResponse, CastCustomSpreadResponse, CastLoveSpreadResponse, CastReadingResponse, CastThreeCardResponse, CastYesNoResponse, DrawCardsResponse } from '../types/index.js';

export interface RoxyTarotSpreadProps {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: CastThreeCardResponse | CastCelticCrossResponse | CastLoveSpreadResponse | CastYesNoResponse | CastReadingResponse | CastCareerSpreadResponse | CastCustomSpreadResponse | DrawCardsResponse;
	/** Which spread layout the response is for. Positions the cards and selects the reading template. */
	spread?: 'three-card' | 'celtic-cross' | 'love' | 'career' | 'custom' | 'yes-no' | 'draw';
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

export const RoxyTarotSpread = defineComponent({
	name: 'RoxyTarotSpread',
	props: {
		data: { type: Object as PropType<RoxyTarotSpreadProps['data']> },
		spread: { type: String as PropType<RoxyTarotSpreadProps['spread']> },
		endpoint: { type: String as PropType<RoxyTarotSpreadProps['endpoint']> },
		method: { type: String as PropType<RoxyTarotSpreadProps['method']> },
		publishableKey: { type: String as PropType<RoxyTarotSpreadProps['publishableKey']> },
		baseUrl: { type: String as PropType<RoxyTarotSpreadProps['baseUrl']> },
		specUrl: { type: String as PropType<RoxyTarotSpreadProps['specUrl']> },
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
			if (props.spread !== undefined) elementProps['.spread'] = props.spread;
			if (props.endpoint !== undefined) elementProps['.endpoint'] = props.endpoint;
			if (props.method !== undefined) elementProps['.method'] = props.method;
			if (props.publishableKey !== undefined) elementProps['.publishableKey'] = props.publishableKey;
			if (props.baseUrl !== undefined) elementProps['.baseUrl'] = props.baseUrl;
			if (props.specUrl !== undefined) elementProps['.specUrl'] = props.specUrl;

			return h('roxy-tarot-spread', elementProps);
		};
	},
});
