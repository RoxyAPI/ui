/** One fixed 600x400 preview stage per catalog component, every word from the manifest: the centred hero, or with `?style=split` a copy column of up to three `benefit` lines beside the component. */

(function () {
	const mount = document.getElementById('stages');
	const components = window.ROXY_COMPONENTS || [];
	const demos = window.ROXY_UI_DEMOS || [];
	if (!mount || !components.length || !demos.length) {
		throw new Error(
			'shot.js: ROXY_COMPONENTS / ROXY_UI_DEMOS globals missing (build + manifests must load first)',
		);
	}

	const params = new URLSearchParams(location.search);
	const split = params.get('style') === 'split';
	const benefits = params.getAll('benefit').slice(0, 3);

	// First demo per tag is the widgets-map default variant, 1:1 with the catalog slug; its id keys the fixture.
	const demoByTag = {};
	for (const d of demos) if (!(d.tag in demoByTag)) demoByTag[d.tag] = d;

	function esc(s) {
		return String(s).replace(
			/[&<>"]/g,
			(c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c],
		);
	}

	const slugs = [];
	const html = components
		.map((c) => {
			const demo = demoByTag[c.tag];
			// A catalog component with no demo card cannot be previewed, so fail loudly rather than emit a blank stage.
			if (!demo) {
				throw new Error(
					`shot.js: component ${c.slug} (${c.tag}) has no matching demo in ROXY_UI_DEMOS`,
				);
			}
			slugs.push(c.slug);
			const title = `<div class="stage-eyebrow">${esc(c.topic)}</div><h2 class="stage-heading">${esc(c.heading)}</h2>`;
			const frame = `<div class="stage-frame"><${c.tag} id="${esc(demo.id)}"${demo.attrs || ''} hide-readings></${c.tag}></div>`;
			return split
				? `<section class="stage stage-split" id="stage-${esc(c.slug)}">
					<div class="stage-copy">${title}<ul class="stage-benefits">${benefits.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div>
					<div class="stage-panel">${frame}</div>
				</section>`
				: `<section class="stage stage-hero" id="stage-${esc(c.slug)}">${title}${frame}</section>`;
		})
		.join('');

	mount.innerHTML = html;

	// The gap a fitted drawing keeps above the stage bottom; the card may bleed past it.
	const INSET = 20;

	const slugByTag = Object.fromEntries(components.map((c) => [c.tag, c.slug]));

	const nextFrame = () =>
		new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

	function partNames(node) {
		return (node.getAttribute('part') || '').split(/\s+/).filter(Boolean);
	}

	const visible = (n) => !n.closest('dialog');

	/** The steps from an element down to the shadow root that draws its `chart` part: `{ el, host }` per nested component, then `{ el, nodes }`. */
	function drawingPath(el) {
		const root = el.shadowRoot;
		if (!root) return null;
		const nodes = [...root.querySelectorAll('[part~="chart"]')].filter(visible);
		if (nodes.length) return [{ el, nodes }];
		for (const host of root.querySelectorAll('*')) {
			if (!(host.localName in slugByTag) || !visible(host)) continue;
			const rest = drawingPath(host);
			if (rest) return [{ el, host }, ...rest];
		}
		return null;
	}

	/** Every part name on the given nodes, their ancestors in the same root and their descendants: the names hiding must never reach. */
	function keptParts(nodes) {
		const keep = new Set();
		for (const node of nodes) {
			for (let n = node; n; n = n.parentElement)
				for (const p of partNames(n)) keep.add(p);
			for (const d of node.querySelectorAll('[part]'))
				for (const p of partNames(d)) keep.add(p);
		}
		return keep;
	}

	/** The box around every drawing node. */
	function extent(nodes) {
		const rects = nodes.map((n) => n.getBoundingClientRect());
		const top = Math.min(...rects.map((r) => r.top));
		const bottom = Math.max(...rects.map((r) => r.bottom));
		const left = Math.min(...rects.map((r) => r.left));
		const right = Math.max(...rects.map((r) => r.right));
		return { bottom, height: bottom - top, width: right - left };
	}

	async function drawingNodes(el) {
		const path = drawingPath(el) ?? [];
		for (const step of path) await step.el.updateComplete;
		await nextFrame();
		return drawingPath(el)?.at(-1).nodes ?? [];
	}

	const cap = (el, width) =>
		el.style.setProperty('--roxy-chart-max-width', `${Math.floor(width)}px`);

	/** True when the drawing follows `--roxy-chart-max-width`; a grid, bar or image figure spans its card and stays a card. */
	async function followsCap(el) {
		const before = extent(await drawingNodes(el)).width;
		cap(el, before / 2);
		const after = extent(await drawingNodes(el)).width;
		el.style.removeProperty('--roxy-chart-max-width');
		return after < before - 1;
	}

	/** Cap the drawing until it clears `limit`, scaling the cap by the overflow each step. */
	async function fit(el, limit, start) {
		let width = start;
		for (let i = 0; i < 8; i++) {
			cap(el, width);
			const box = extent(await drawingNodes(el));
			const over = box.bottom - limit;
			if (over <= 0) return true;
			width = Math.min(width, box.width) * ((box.height - over) / box.height);
		}
		return false;
	}

	/** Reduce each component whose `chart` follows the cap to that drawing, `bare` in a frame the stage draws, hiding every other part of its catalog list through `hide-sections` and capping it, never transforming it, until it clears the stage bottom. */
	window.__fitStages = async function (partsBySlug, selected) {
		const drawn = [];
		const unfitted = [];
		for (const slug of selected) {
			if (!partsBySlug[slug]?.includes('chart')) continue;
			const frame = document.querySelector(`#stage-${slug} .stage-frame`);
			const el = frame.firstElementChild;
			const path = drawingPath(el);
			if (!path || !(await followsCap(el))) continue;
			frame.classList.add('stage-drawing');
			for (const step of path) {
				step.el.setAttribute('bare', '');
				const keep = keptParts(step.nodes ?? [step.host]);
				const own = partsBySlug[slugByTag[step.el.localName]] ?? [];
				step.el.setAttribute(
					'hide-sections',
					own.filter((p) => !keep.has(p)).join(', '),
				);
			}
			drawn.push(slug);
			const limit = frame.closest('.stage').getBoundingClientRect().bottom - INSET;
			if (!(await fit(el, limit, frame.clientWidth))) unfitted.push(slug);
		}
		return { drawn, unfitted };
	};

	// The exact slug set the capture script must shoot, so a missing stage is caught, not skipped.
	window.__STAGE_SLUGS__ = slugs;
})();
