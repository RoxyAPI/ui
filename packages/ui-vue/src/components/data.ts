import { defineComponent, h, onMounted, ref } from 'vue';
import { ensureScriptLoaded } from '../load-ui.js';

export const RoxyData = defineComponent({
	name: 'RoxyData',
	setup() {
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

			return h('roxy-data');
		};
	},
});
