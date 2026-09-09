import { defineComponent, h, onMounted, type PropType, ref } from 'vue';
import { ensureScriptLoaded } from '../load-ui.js';

export interface RoxyEndpointFormProps {
	/** Endpoint path the form is built for and submits to, e.g. "astrology/natal-chart". The fields are derived from the spec for that operation. */
	endpoint?: string;
	/** HTTP method of the operation. Defaults to POST. */
	method?: 'GET' | 'POST';
	/** Explicit OpenAPI spec URL to build the form from. Empty resolves a version-pinned slice first, then the production spec. */
	specUrl?: string;
	/** Override the submit-button label. Empty derives an outcome-first label from the endpoint. */
	submitLabel?: string;
	/** Browser-safe publishable key (pk_) forwarded to the slotted city search so a natal or synastry form can geocode. */
	publishableKey?: string;
	/** Where the slotted city search sends its request, absolute or page-relative. Set it when the page routes its API traffic through its own server. Unset, the search keeps its own default. */
	locationUrl?: string;
	/** Prefill values keyed by field name, nested per group. Used to restore a previous submission. Property only, never an attribute. */
	initialValues?: Record<string, unknown>;
	/** Fires when the underlying <roxy-endpoint-form> dispatches `roxy-submit`. */
	onRoxySubmit?: (event: CustomEvent<{ endpoint: string; values: Record<string, unknown>; queryKeys: string[]; sticky: boolean }>) => void;
	/** Fires when the underlying <roxy-endpoint-form> dispatches `roxy-validation-error`. */
	onRoxyValidationError?: (event: CustomEvent<{ missing: string[] }>) => void;
	/** Fires when the underlying <roxy-endpoint-form> dispatches `roxy-spec-error`. */
	onRoxySpecError?: (event: CustomEvent<{ url: string; message: string }>) => void;
}

export const RoxyEndpointForm = defineComponent({
	name: 'RoxyEndpointForm',
	props: {
		endpoint: { type: String as PropType<RoxyEndpointFormProps['endpoint']> },
		method: { type: String as PropType<RoxyEndpointFormProps['method']> },
		specUrl: { type: String as PropType<RoxyEndpointFormProps['specUrl']> },
		submitLabel: { type: String as PropType<RoxyEndpointFormProps['submitLabel']> },
		publishableKey: { type: String as PropType<RoxyEndpointFormProps['publishableKey']> },
		locationUrl: { type: String as PropType<RoxyEndpointFormProps['locationUrl']> },
		initialValues: { type: Object as PropType<RoxyEndpointFormProps['initialValues']> },
		onRoxySubmit: { type: Function as PropType<RoxyEndpointFormProps['onRoxySubmit']> },
		onRoxyValidationError: { type: Function as PropType<RoxyEndpointFormProps['onRoxyValidationError']> },
		onRoxySpecError: { type: Function as PropType<RoxyEndpointFormProps['onRoxySpecError']> },
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
			if (props.endpoint !== undefined) elementProps['.endpoint'] = props.endpoint;
			if (props.method !== undefined) elementProps['.method'] = props.method;
			if (props.specUrl !== undefined) elementProps['.specUrl'] = props.specUrl;
			if (props.submitLabel !== undefined) elementProps['.submitLabel'] = props.submitLabel;
			if (props.publishableKey !== undefined) elementProps['.publishableKey'] = props.publishableKey;
			if (props.locationUrl !== undefined) elementProps['.locationUrl'] = props.locationUrl;
			if (props.initialValues !== undefined) elementProps['.initialValues'] = props.initialValues;
			if (props.onRoxySubmit) elementProps.onRoxySubmit = props.onRoxySubmit;
			if (props.onRoxyValidationError) elementProps.onRoxyValidationError = props.onRoxyValidationError;
			if (props.onRoxySpecError) elementProps.onRoxySpecError = props.onRoxySpecError;

			return h('roxy-endpoint-form', elementProps);
		};
	},
});
