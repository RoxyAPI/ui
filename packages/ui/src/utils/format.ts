/**
 * Display formatters for ISO timestamps and floats coming back from the API.
 * Every helper returns "" for nullish or unparseable input so it falls out of
 * template literals cleanly.
 */

export function formatTime(input: unknown): string {
	if (typeof input !== 'string' || input.length === 0) return '';
	if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return '';
	const bareTime = /^\d{2}:\d{2}(:\d{2})?$/.test(input);
	const iso = bareTime ? `1970-01-01T${input}` : input;
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return input;
	return d.toLocaleTimeString(undefined, {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	});
}

export function formatDate(input: unknown): string {
	if (typeof input !== 'string' || input.length === 0) return '';
	const d = new Date(
		/^\d{4}-\d{2}-\d{2}$/.test(input) ? `${input}T00:00:00` : input,
	);
	if (Number.isNaN(d.getTime())) return input;
	return d.toLocaleDateString(undefined, {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

export function formatTimeRange(
	t: { start?: string; end?: string } | undefined,
): string {
	if (!t) return '';
	const start = formatTime(t.start);
	const end = formatTime(t.end);
	if (start && end) return `${start} - ${end}`;
	return start || end || '';
}

export function formatNumber(value: unknown, dp = 1): string {
	if (typeof value !== 'number' || !Number.isFinite(value)) return '';
	return value.toFixed(dp).replace(/\.?0+$/, '');
}

export function formatPercent(value: unknown, dp = 1): string {
	const n = formatNumber(value, dp);
	return n ? `${n}%` : '';
}

export function formatLongitude(value: unknown): string {
	if (typeof value !== 'number' || !Number.isFinite(value)) return '';
	return `${formatNumber(value, 2)}°`;
}
