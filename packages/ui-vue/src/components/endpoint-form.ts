import { defineComponent, h, onMounted, type PropType, ref } from 'vue';
import { ensureScriptLoaded } from '../load-ui.js';

export interface RoxyEndpointFormProps {
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
			if (props.onRoxySubmit) elementProps.onRoxySubmit = props.onRoxySubmit;
			if (props.onRoxyValidationError) elementProps.onRoxyValidationError = props.onRoxyValidationError;
			if (props.onRoxySpecError) elementProps.onRoxySpecError = props.onRoxySpecError;

			return h('roxy-endpoint-form', elementProps);
		};
	},
});
