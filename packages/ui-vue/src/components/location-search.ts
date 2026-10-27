import { defineComponent, h, onMounted, type PropType, ref } from 'vue';
import { ensureScriptLoaded } from '../load-ui.js';
import type { SearchCitiesResponse } from '../types/index.js';

export interface RoxyLocationSearchProps {
	/** Browser-safe publishable key (pk_) the search sends with its request. A secret key is refused client-side and never sent. Leave unset when `endpoint` or `submitUrl` points at your own server route. */
	publishableKey?: string;
	/** Where the search sends its GET while the visitor types, as an absolute URL or a page-relative path such as "/api/roxy/location". Wins over submitUrl. Unset with no submitUrl, the search calls the RoxyAPI location search. */
	endpoint?: string;
	/** Your own backend route, which holds the secret key. With no endpoint set, each search is POSTed there as `{ path: "/location/search", method: "GET", query: { q, limit } }`, the shape every component request takes there. */
	submitUrl?: string;
	/** An object of your own, sent to your submitUrl route as `context` beside the search. Passed through untouched and never read. */
	submitContext?: Record<string, unknown>;
	/** Input placeholder. The default renders in the page language; a caller-supplied one is printed as given. */
	placeholder?: string;
	/** Initial text in the input, for restoring a previous search. */
	defaultValue?: string;
	/** Fires when the underlying <roxy-location-search> dispatches `roxy-location-select`. */
	onRoxyLocationSelect?: (event: CustomEvent<NonNullable<SearchCitiesResponse['cities']>[number] | { latitude?: number; longitude?: number; timezone?: string; utcOffset?: number; city?: string; province?: string; country?: string }>) => void;
	/** Fires when the underlying <roxy-location-search> dispatches `roxy-validation-error`. */
	onRoxyValidationError?: (event: CustomEvent<{ reason: string; message: string }>) => void;
}

export const RoxyLocationSearch = defineComponent({
	name: 'RoxyLocationSearch',
	props: {
		publishableKey: { type: String as PropType<RoxyLocationSearchProps['publishableKey']> },
		endpoint: { type: String as PropType<RoxyLocationSearchProps['endpoint']> },
		submitUrl: { type: String as PropType<RoxyLocationSearchProps['submitUrl']> },
		submitContext: { type: Object as PropType<RoxyLocationSearchProps['submitContext']> },
		placeholder: { type: String as PropType<RoxyLocationSearchProps['placeholder']> },
		defaultValue: { type: String as PropType<RoxyLocationSearchProps['defaultValue']> },
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
			if (props.publishableKey !== undefined) elementProps['.publishableKey'] = props.publishableKey;
			if (props.endpoint !== undefined) elementProps['.endpoint'] = props.endpoint;
			if (props.submitUrl !== undefined) elementProps['.submitUrl'] = props.submitUrl;
			if (props.submitContext !== undefined) elementProps['.submitContext'] = props.submitContext;
			if (props.placeholder !== undefined) elementProps['.placeholder'] = props.placeholder;
			if (props.defaultValue !== undefined) elementProps['.defaultValue'] = props.defaultValue;
			if (props.onRoxyLocationSelect) elementProps.onRoxyLocationSelect = props.onRoxyLocationSelect;
			if (props.onRoxyValidationError) elementProps.onRoxyValidationError = props.onRoxyValidationError;

			return h('roxy-location-search', elementProps);
		};
	},
});
