/**
 * Build one fixed 600x400 capture stage per catalog component for the preview
 * composites (scripts/component-previews.ts shoots each #stage-{slug}). Every
 * stage pairs the spec-synced manifest text (heading, docsSummary, tag) with the
 * real component mounted fresh from the demo pipeline, so nothing here is
 * hand-written per component and the render is a genuine one, not a clone.
 *
 * Runs BEFORE the deferred sample-data.js module, so the elements exist by id
 * when that module assigns .data. Kept vanilla to match page.js.
 */

(function () {
	const mount = document.getElementById('stages');
	const components = window.ROXY_COMPONENTS || [];
	const demos = window.ROXY_UI_DEMOS || [];
	if (!mount || !components.length || !demos.length) {
		throw new Error(
			'shot.js: ROXY_COMPONENTS / ROXY_UI_DEMOS globals missing (build + manifests must load first)',
		);
	}

	// First demo per tag is the widgets-map default variant, 1:1 with the catalog
	// slug. Its id keys the sample-data.js fixture that hydrates the element.
	const demoByTag = {};
	for (const d of demos) if (!(d.tag in demoByTag)) demoByTag[d.tag] = d;

	// Per-domain accent presets, keyed by manifest topic, transcribed from the
	// shipped table in packages/ui/THEMING.md (light --roxy-accent + dark accent).
	// The tint only softens the stage background; ink contrast is not at stake.
	// Helpers span domains and have no dedicated accent, so they fall back to the
	// library default (Western amber).
	const DOMAIN_ACCENTS = {
		Astrology: { light: '#f59e0b', dark: '#fbbf24' },
		Vedic: { light: '#f97316', dark: '#fb923c' },
		Numerology: { light: '#6366f1', dark: '#818cf8' },
		Tarot: { light: '#8b5cf6', dark: '#a78bfa' },
		'Human Design': { light: '#06b6d4', dark: '#22d3ee' },
		Forecast: { light: '#0ea5e9', dark: '#38bdf8' },
		Biorhythm: { light: '#10b981', dark: '#34d399' },
		'I Ching': { light: '#78716c', dark: '#a8a29e' },
		Crystals: { light: '#d946ef', dark: '#e879f9' },
		Dreams: { light: '#3b82f6', dark: '#60a5fa' },
		'Angel Numbers': { light: '#f43f5e', dark: '#fb7185' },
		Helpers: { light: '#f59e0b', dark: '#fbbf24' },
	};

	function esc(s) {
		return String(s).replace(
			/[&<>]/g,
			(c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c],
		);
	}

	const slugs = [];
	const html = components
		.map((c) => {
			const demo = demoByTag[c.tag];
			// Same invariant the audit relies on: a catalog component with no demo
			// card cannot be previewed, so fail loudly rather than emit a blank stage.
			if (!demo) {
				throw new Error(
					`shot.js: component ${c.slug} (${c.tag}) has no matching demo in ROXY_UI_DEMOS`,
				);
			}
			const accent = DOMAIN_ACCENTS[c.topic] || DOMAIN_ACCENTS.Helpers;
			slugs.push(c.slug);
			return `
			<section class="stage" id="stage-${esc(c.slug)}"
				style="--stage-accent-light:${accent.light};--stage-accent-dark:${accent.dark}">
				<div class="stage-head">
					<h2 class="stage-heading">${esc(c.heading)}</h2>
					<p class="stage-sub">${esc(c.docsSummary)}</p>
					<code class="stage-tag">&lt;${esc(c.tag)}&gt;</code>
				</div>
				<div class="stage-body">
					<div class="stage-mount"><${c.tag} id="${esc(demo.id)}"${demo.attrs || ''}></${c.tag}></div>
				</div>
			</section>`;
		})
		.join('');

	mount.innerHTML = html;

	// Surfaced for the capture script: the exact slug set it must shoot, so a
	// missing stage (e.g. a demo added without a component) is caught, not skipped.
	window.__STAGE_SLUGS__ = slugs;
})();
