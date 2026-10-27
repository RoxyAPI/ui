/** Run `fn` while the runtime reports `zone` as the viewer's IANA zone, or names none when `zone` is undefined. */
export async function withViewerZone<T>(
	zone: string | undefined,
	fn: () => Promise<T>,
): Promise<T> {
	const Real = Intl.DateTimeFormat;
	class Fixed extends Real {
		resolvedOptions() {
			return {
				...super.resolvedOptions(),
				timeZone: zone,
			} as Intl.ResolvedDateTimeFormatOptions;
		}
	}
	Intl.DateTimeFormat = Fixed as typeof Real;
	try {
		return await fn();
	} finally {
		Intl.DateTimeFormat = Real;
	}
}
