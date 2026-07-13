import type { GetBasicPanchangResponse, GetDetailedPanchangResponse } from '@roxyapi/ui/types';
import { defineComponent, h, onMounted, type PropType, ref } from 'vue';
import { ensureScriptLoaded } from '../load-ui.js';

export interface RoxyPanchangTableProps {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: GetBasicPanchangResponse | GetDetailedPanchangResponse;
	/** Whether the response is the basic five-limb panchang or the detailed muhurta set. Detailed mode shows the auspicious and inauspicious period sections. */
	detail?: 'basic' | 'detailed';
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

export const RoxyPanchangTable = defineComponent({
	name: 'RoxyPanchangTable',
	props: {
		data: { type: Object as PropType<RoxyPanchangTableProps['data']> },
		detail: { type: String as PropType<RoxyPanchangTableProps['detail']> },
		endpoint: { type: String as PropType<RoxyPanchangTableProps['endpoint']> },
		method: { type: String as PropType<RoxyPanchangTableProps['method']> },
		publishableKey: { type: String as PropType<RoxyPanchangTableProps['publishableKey']> },
		baseUrl: { type: String as PropType<RoxyPanchangTableProps['baseUrl']> },
		specUrl: { type: String as PropType<RoxyPanchangTableProps['specUrl']> },
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
			if (props.detail !== undefined) elementProps['.detail'] = props.detail;
			if (props.endpoint !== undefined) elementProps['.endpoint'] = props.endpoint;
			if (props.method !== undefined) elementProps['.method'] = props.method;
			if (props.publishableKey !== undefined) elementProps['.publishableKey'] = props.publishableKey;
			if (props.baseUrl !== undefined) elementProps['.baseUrl'] = props.baseUrl;
			if (props.specUrl !== undefined) elementProps['.specUrl'] = props.specUrl;

			return h('roxy-panchang-table', elementProps);
		};
	},
});
