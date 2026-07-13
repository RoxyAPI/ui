import { defineComponent, h, onMounted, type PropType, ref } from 'vue';
import { ensureScriptLoaded } from '../load-ui.js';
import type { SearchCitiesResponse } from '../types/index.js';

export interface RoxyLocationSearchProps {
	/** Fires when the underlying <roxy-location-search> dispatches `roxy-location-select`. */
	onRoxyLocationSelect?: (event: CustomEvent<NonNullable<SearchCitiesResponse['cities']>[number] | { latitude?: number; longitude?: number; timezone?: string; utcOffset?: number; city?: string; province?: string; country?: string }>) => void;
	/** Fires when the underlying <roxy-location-search> dispatches `roxy-validation-error`. */
	onRoxyValidationError?: (event: CustomEvent<{ reason: string; message: string }>) => void;
}

export const RoxyLocationSearch = defineComponent({
	name: 'RoxyLocationSearch',
	props: {
		onRoxyLocationSelect: { type: Function as PropType<RoxyLocationSearchProps['onRoxyLocationSelect']> },
		onRoxyValidationError: { type: Function as PropType<RoxyLocationSearchProps['onRoxyValidationError']> },
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
			if (props.onRoxyLocationSelect) elementProps.onRoxyLocationSelect = props.onRoxyLocationSelect;
			if (props.onRoxyValidationError) elementProps.onRoxyValidationError = props.onRoxyValidationError;

			return h('roxy-location-search', elementProps);
		};
	},
});
