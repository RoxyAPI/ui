import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import type { AstrocartographyResponse } from '../../src/types/index.js';

for (const slug of ['bodygraph', 'natal-chart']) {
	for (const width of [320, 390, 1280]) {
		test(`${slug} chart detail remains usable at ${width}px`, async ({
			page,
		}) => {
			await page.setViewportSize({ width, height: 900 });
			await page.goto(`/preview.html?c=${slug}`);
			const host = page.locator(`roxy-${slug}`);
			const opener = host.getByRole('button', {
				name: 'Enlarge chart',
				exact: true,
			});
			await expect(opener).toBeVisible();
			const overview = host.locator('.roxy-chart-view > svg');
			const dialog = host.getByRole('dialog');
			const pageWidth = () =>
				page.evaluate(() => ({
					content: document.documentElement.scrollWidth,
					viewport: document.documentElement.clientWidth,
				}));
			const assertPageWidth = async () => {
				const box = await pageWidth();
				expect(box.content).toBeLessThanOrEqual(box.viewport + 1);
			};
			await assertPageWidth();
			await expect(host.locator('dialog')).not.toHaveAttribute('open');
			await opener.focus();
			await opener.click();
			await expect(dialog).toBeVisible();
			await expect(dialog).toHaveJSProperty('open', true);
			expect(await dialog.evaluate((node) => node.matches(':modal'))).toBe(
				true,
			);

			const expanded = dialog.locator('.roxy-chart-expanded');
			const figure = expanded.locator('svg[part~="chart"]');
			const scroll = dialog.locator('.roxy-chart-scroll');
			const scrollPosition = () =>
				scroll.evaluate((node) => ({
					left: node.scrollLeft,
					top: node.scrollTop,
					centerError:
						node.scrollLeft - (node.scrollWidth - node.clientWidth) / 2,
					x: (node.scrollLeft + node.clientWidth / 2) / node.scrollWidth,
					y: (node.scrollTop + node.clientHeight / 2) / node.scrollHeight,
				}));
			const assertCentered = async () => {
				await expect
					.poll(async () => Math.abs((await scrollPosition()).centerError))
					.toBeLessThan(1.5);
				expect((await scrollPosition()).top).toBe(0);
			};
			const figureWidth = () =>
				figure.evaluate((node) => node.getBoundingClientRect().width);
			await expect
				.poll(() =>
					expanded.evaluate((node) => node.getBoundingClientRect().width),
				)
				.toBeGreaterThanOrEqual(960);
			const initialWidth = await figureWidth();
			expect(initialWidth).toBeGreaterThan(
				await overview.evaluate((node) => node.getBoundingClientRect().width),
			);
			await expect(
				dialog.getByRole('button', { name: 'Zoom out', exact: true }),
			).toBeDisabled();
			await assertPageWidth();
			await assertCentered();
			await scroll.evaluate((node) => {
				node.scrollTop = 120;
				if (node.scrollWidth > node.clientWidth) node.scrollLeft += 80;
			});
			const focalPoint = await scrollPosition();

			await dialog
				.getByRole('button', { name: 'Zoom in', exact: true })
				.click();
			await expect.poll(figureWidth).toBeGreaterThan(initialWidth);
			await expect
				.poll(async () => (await scrollPosition()).x)
				.toBeCloseTo(focalPoint.x, 2);
			await expect
				.poll(async () => (await scrollPosition()).y)
				.toBeCloseTo(focalPoint.y, 2);
			await dialog
				.getByRole('button', { name: 'Zoom out', exact: true })
				.click();
			await expect.poll(figureWidth).toBeCloseTo(initialWidth, 0);
			await dialog
				.getByRole('button', { name: 'Zoom in', exact: true })
				.click();
			await dialog
				.getByRole('button', { name: 'Reset zoom', exact: true })
				.click();
			await expect.poll(figureWidth).toBeCloseTo(initialWidth, 0);
			await assertCentered();
			await expect(
				dialog.getByRole('button', { name: 'Zoom out', exact: true }),
			).toBeDisabled();

			if (width < 960) {
				expect(
					await scroll.evaluate((node) => node.scrollWidth > node.clientWidth),
				).toBe(true);
				const initialLeft = (await scrollPosition()).left;
				await scroll.focus();
				await page.keyboard.press('ArrowRight');
				await expect
					.poll(() => scroll.evaluate((node) => node.scrollLeft))
					.toBeGreaterThan(initialLeft);
			}

			const marker = slug === 'bodygraph' ? '.bg-gate.on' : '.planet-glyph';
			const before = await overview.locator(marker).count();
			expect(before).toBeGreaterThan(1);
			await host.evaluate(async (element, kind) => {
				type Chart = HTMLElement & {
					data: { gates?: { gate: number }[]; planets?: unknown[] };
					updateComplete: Promise<unknown>;
				};
				const chart = element as Chart;
				if (kind === 'bodygraph') {
					const gates = chart.data.gates ?? [];
					chart.data = {
						...chart.data,
						gates: gates.filter((gate) => gate.gate !== gates[0]?.gate),
					};
				} else {
					chart.data = { ...chart.data, planets: chart.data.planets?.slice(1) };
				}
				await chart.updateComplete;
			}, slug);
			await expect(overview.locator(marker)).toHaveCount(before - 1);
			await expect(figure.locator(marker)).toHaveCount(before - 1);
			await expect(dialog).toBeVisible();
			await assertPageWidth();

			await page.keyboard.press('Escape');
			await expect(host.locator('dialog')).not.toHaveAttribute('open');
			await expect(opener).toBeFocused();
			await opener.click();
			await expect(dialog).toBeVisible();
			await expect(
				dialog.getByRole('button', { name: 'Zoom out', exact: true }),
			).toBeDisabled();
			await dialog.getByRole('button', { name: 'Close', exact: true }).click();
			await expect(host.locator('dialog')).not.toHaveAttribute('open');
			await expect(opener).toBeFocused();
			await assertPageWidth();
		});
	}
}

for (const transition of ['clear data', 'disconnect']) {
	test(`chart detail closes when its host must ${transition}`, async ({
		page,
	}) => {
		await page.setViewportSize({ width: 390, height: 900 });
		await page.goto('/preview.html?c=bodygraph');
		const host = page.locator('roxy-bodygraph');
		const opener = host.getByRole('button', {
			name: 'Enlarge chart',
			exact: true,
		});
		await opener.click();
		await expect(host.getByRole('dialog')).toBeVisible();
		await host.evaluate(async (element, change) => {
			type Chart = HTMLElement & {
				data?: Record<string, unknown>;
				updateComplete: Promise<unknown>;
			};
			const chart = element as Chart;
			const data = chart.data;
			if (change === 'clear data') {
				chart.data = undefined;
				await chart.updateComplete;
				chart.data = data;
			} else {
				const parent = chart.parentNode;
				chart.remove();
				chart.data = { ...data };
				parent?.appendChild(chart);
			}
			await chart.updateComplete;
		}, transition);
		await expect(host.locator('dialog')).not.toHaveAttribute('open');
		await expect(opener).toBeVisible();
		await opener.click();
		await expect(host.getByRole('dialog')).toBeVisible();
		await page.keyboard.press('Escape');
		await expect(host.locator('dialog')).not.toHaveAttribute('open');
	});
}

for (const theme of ['light', 'dark']) {
	test(`open bare chart detail has accessible chrome in ${theme} theme`, async ({
		page,
	}) => {
		await page.setViewportSize({ width: 390, height: 900 });
		await page.goto(`/preview.html?c=bodygraph&theme=${theme}`);
		const host = page.locator('roxy-bodygraph');
		await host.evaluate((element) => element.setAttribute('bare', ''));
		await host
			.getByRole('button', { name: 'Enlarge chart', exact: true })
			.click();
		const dialog = host.getByRole('dialog');
		await expect(dialog).toBeVisible();
		await expect(dialog.getByRole('region')).toHaveAccessibleName(
			'Human Design bodygraph',
		);
		const paints = await dialog.evaluate((element) => {
			const style = getComputedStyle(element);
			return {
				background: style.backgroundColor,
				surface: style.getPropertyValue('--roxy-surface'),
				bg: style.getPropertyValue('--roxy-bg'),
				center: getComputedStyle(
					element.querySelector('.bg-center:not(.defined)')!,
				).fill,
			};
		});
		expect(paints.surface).toBe(paints.bg);
		expect(paints.background).toMatch(/^rgb\(/);
		expect(paints.center).toBe(paints.background);
		expect(
			await host.evaluate((element) =>
				getComputedStyle(element).getPropertyValue('--roxy-surface').trim(),
			),
		).toBe('transparent');
		const painting = await host.evaluate(async (element) => {
			const chart = element as HTMLElement & {
				data: { centers: { defined: boolean }[] };
				updateComplete: Promise<unknown>;
			};
			chart.data = {
				...chart.data,
				centers: chart.data.centers.map((center) => ({
					...center,
					defined: true,
				})),
			};
			await chart.updateComplete;
			const svg = chart.shadowRoot!.querySelector<SVGSVGElement>('dialog svg')!;
			const mask = async (nodes: SVGElement[], bounds: DOMRect) => {
				const canvas = document.createElement('canvas');
				canvas.width = Math.ceil(bounds.width * 8);
				canvas.height = Math.ceil(bounds.height * 8);
				const drawing = document.createElementNS(
					'http://www.w3.org/2000/svg',
					'svg',
				);
				drawing.setAttribute(
					'viewBox',
					`${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`,
				);
				drawing.setAttribute('width', String(canvas.width));
				drawing.setAttribute('height', String(canvas.height));
				for (const node of nodes) {
					const clone = node.cloneNode(true) as SVGElement;
					const style = getComputedStyle(node);
					clone.removeAttribute('class');
					clone.style.fontFamily = style.fontFamily;
					clone.style.fontSize = style.fontSize;
					clone.style.fontWeight = style.fontWeight;
					clone.style.fontStyle = style.fontStyle;
					clone.style.letterSpacing = style.letterSpacing;
					clone.style.fill = 'white';
					clone.style.stroke = 'none';
					drawing.append(clone);
				}
				const image = new Image();
				image.src = `data:image/svg+xml,${encodeURIComponent(new XMLSerializer().serializeToString(drawing))}`;
				await image.decode();
				const context = canvas.getContext('2d')!;
				context.drawImage(image, 0, 0);
				return context.getImageData(0, 0, canvas.width, canvas.height).data;
			};
			const centers = [...svg.querySelectorAll('.bg-center')];
			const gates = await Promise.all(
				[...svg.querySelectorAll<SVGGElement>('.bg-gate-node')].map(
					async (group) => {
						const text = group.querySelector<SVGTextElement>('.bg-gate')!;
						const discs = [
							...group.querySelectorAll<SVGElement>('.bg-gate-dot'),
						];
						const style = getComputedStyle(text);
						const bounds = group.getBBox();
						const [inkMask, discMask] = await Promise.all([
							mask([text], bounds),
							mask(discs, bounds),
						]);
						let inkPixels = 0;
						let uncoveredPixels = 0;
						for (let i = 3; i < inkMask.length; i += 4)
							if (inkMask[i] > 0) {
								inkPixels++;
								if (discMask[i] === 0) uncoveredPixels++;
							}
						return {
							number: Number(text.textContent),
							ink: style.fill,
							color: style.color,
							opacity: Number(style.opacity),
							fillOpacity: Number(style.fillOpacity),
							font: {
								family: style.fontFamily,
								size: style.fontSize,
								weight: style.fontWeight,
							},
							inkPixels,
							uncoveredPixels,
							ordered:
								centers.every((center) =>
									Boolean(
										center.compareDocumentPosition(group) &
											Node.DOCUMENT_POSITION_FOLLOWING,
									),
								) &&
								discs.every((disc) =>
									Boolean(
										disc.compareDocumentPosition(text) &
											Node.DOCUMENT_POSITION_FOLLOWING,
									),
								),
							discs: discs.map((disc) => {
								const paint = getComputedStyle(disc);
								return {
									fill: paint.fill,
									opacity: Number(paint.opacity),
									fillOpacity: Number(paint.fillOpacity),
								};
							}),
						};
					},
				),
			);
			const labels = [...svg.querySelectorAll('.bg-center-name.defined')].map(
				(label) => {
					const style = getComputedStyle(label);
					return {
						ink: style.fill,
						color: style.color,
						opacity: Number(style.opacity),
						background: getComputedStyle(label.previousElementSibling!).fill,
					};
				},
			);
			return {
				labels,
				gates,
				fonts: [...document.fonts].map((font) => ({
					family: font.family,
					status: font.status,
				})),
			};
		});
		await test.info().attach('svg-paint-proof', {
			body: JSON.stringify(painting, null, 2),
			contentType: 'application/json',
		});
		const luminance = (rgb: string) => {
			const channels = rgb
				.match(/[\d.]+/g)!
				.slice(0, 3)
				.map((value) => Number(value) / 255)
				.map((value) =>
					value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
				);
			return channels.reduce(
				(sum, value, i) => sum + value * [0.2126, 0.7152, 0.0722][i],
				0,
			);
		};
		expect(new Set(painting.labels.map((label) => label.background)).size).toBe(
			4,
		);
		for (const label of painting.labels) {
			expect(label.opacity).toBe(1);
			expect(label.ink).toBe(label.color);
			const [low, high] = [
				luminance(label.ink),
				luminance(label.background),
			].sort((a, b) => a - b);
			expect(
				(high + 0.05) / (low + 0.05),
				JSON.stringify(label),
			).toBeGreaterThanOrEqual(4.5);
		}
		expect(painting.fonts, 'SVG masks use the chart system font').toEqual([]);
		expect(
			painting.gates.map((gate) => gate.number).sort((a, b) => a - b),
		).toEqual(Array.from({ length: 64 }, (_, index) => index + 1));
		for (const gate of painting.gates) {
			expect(gate.opacity).toBe(1);
			expect(gate.fillOpacity).toBe(1);
			expect(gate.ordered).toBe(true);
			expect(gate.inkPixels).toBeGreaterThan(0);
			expect(gate.uncoveredPixels, `Gate ${gate.number}`).toBe(0);
			expect(gate.discs.length).toBeGreaterThan(0);
			for (const disc of gate.discs) {
				expect(disc.opacity).toBe(1);
				expect(disc.fillOpacity).toBe(1);
				const [low, high] = [luminance(gate.ink), luminance(disc.fill)].sort(
					(a, b) => a - b,
				);
				expect(
					(high + 0.05) / (low + 0.05),
					JSON.stringify(gate),
				).toBeGreaterThanOrEqual(4.5);
			}
		}
		const results = await new AxeBuilder({ page })
			.include({ fromShadowDom: ['roxy-bodygraph', 'dialog'] })
			.analyze();
		await test.info().attach('axe-raw-results', {
			body: JSON.stringify(results, null, 2),
			contentType: 'application/json',
		});
		const blocking: typeof results.violations = [];
		const verifiedGateReports: { gate: number; target: unknown }[] = [];
		for (const violation of results.violations) {
			if (violation.impact === 'minor') continue;
			const nodes: typeof violation.nodes = [];
			for (const node of violation.nodes) {
				const gate =
					violation.id === 'color-contrast'
						? await page.evaluate((target) => {
								const path = target[0];
								if (
									target.length !== 1 ||
									!Array.isArray(path) ||
									path.length !== 2 ||
									typeof path[0] !== 'string' ||
									typeof path[1] !== 'string'
								)
									return null;
								const element = document.querySelector(path[0]);
								if (!element?.matches('roxy-bodygraph')) return null;
								const label = element.shadowRoot?.querySelector(path[1]);
								if (
									!(label instanceof SVGTextElement) ||
									!label.matches('.bg-gate-node > .bg-gate') ||
									label.closest('svg') !==
										element.shadowRoot?.querySelector(
											'dialog[open] .roxy-chart-expanded > svg',
										)
								)
									return null;
								return Number(label.textContent);
							}, node.target)
						: null;
				if (painting.gates.some((proof) => proof.number === gate))
					verifiedGateReports.push({ gate: gate!, target: node.target });
				else nodes.push(node);
			}
			if (nodes.length) blocking.push({ ...violation, nodes });
		}
		await test.info().attach('verified-gate-contrast-reports', {
			body: JSON.stringify(verifiedGateReports, null, 2),
			contentType: 'application/json',
		});
		expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
	});
}

for (const viewport of [
	{ width: 390, height: 900 },
	{ width: 320, height: 400 },
]) {
	test(`wrapped chart toolbar stays reachable at ${viewport.width}x${viewport.height}`, async ({
		page,
	}) => {
		await page.setViewportSize(viewport);
		await page.goto('/preview.html?c=bodygraph&lang=de');
		const host = page.locator('roxy-bodygraph');
		await host
			.getByRole('button', { name: 'Grafik vergrößern', exact: true })
			.click();
		const dialog = host.getByRole('dialog');
		await expect(dialog).toBeVisible();
		await expect(dialog.locator('.roxy-chart-bar > strong')).toBeInViewport({
			ratio: 1,
		});
		for (const button of await dialog.locator('button').all())
			await expect(button).toBeInViewport({ ratio: 1 });
		expect(
			await dialog.evaluate(
				(element) => element.scrollHeight - element.clientHeight,
			),
		).toBeLessThanOrEqual(1);
		expect(
			await dialog
				.locator('.roxy-chart-scroll')
				.evaluate((element) => element.clientHeight),
		).toBeGreaterThan(80);
		expect(
			await page.evaluate(
				() =>
					document.documentElement.scrollWidth -
					document.documentElement.clientWidth,
			),
		).toBeLessThanOrEqual(1);
		await dialog
			.getByRole('button', { name: 'Schließen', exact: true })
			.click();
		await expect(host.locator('dialog')).not.toHaveAttribute('open');
	});
}

test('localized relocation titles wrap within a narrow card and dialog', async ({
	page,
}) => {
	await page.setViewportSize({ width: 240, height: 600 });
	await page.goto('/preview.html?c=relocation-wheel&lang=de');
	const host = page.locator('roxy-relocation-wheel');
	const title = host.locator('roxy-natal-chart .title').first();
	await expect(title).toHaveText('Relokationshoroskop');
	expect(
		await page.evaluate(
			() => document.documentElement.scrollWidth - innerWidth,
		),
	).toBeLessThanOrEqual(1);
	await host
		.getByRole('button', { name: 'Grafik vergrößern', exact: true })
		.click();
	const dialog = host.getByRole('dialog');
	await expect(dialog).toBeVisible();
	const label = dialog.locator('.roxy-chart-bar > strong');
	expect(
		await label.evaluate((element) => {
			const range = document.createRange();
			range.selectNodeContents(element);
			const text = range.getBoundingClientRect();
			const box = element.getBoundingClientRect();
			return Math.max(text.right - box.right, box.left - text.left);
		}),
	).toBeLessThanOrEqual(1);
	for (const button of await dialog.locator('button').all())
		await expect(button).toBeInViewport({ ratio: 1 });
});

test('synastry numeric tables support keyboard panning with readings hidden', async ({
	page,
}) => {
	await page.setViewportSize({ width: 320, height: 900 });
	await page.goto('/preview.html?c=synastry-chart');
	const host = page.locator('roxy-synastry-chart');
	await host.evaluate((element) => element.setAttribute('hide-readings', ''));
	await host.locator('details.catalog > summary').click();
	const regions = host.locator('.scroll');
	await expect(regions).toHaveCount(3);
	for (const region of await regions.all()) {
		await region.focus();
		await expect(region).toBeFocused();
		expect(
			await region.evaluate((element) => element.scrollWidth),
		).toBeGreaterThan(await region.evaluate((element) => element.clientWidth));
		await page.keyboard.press('ArrowRight');
		await expect
			.poll(() => region.evaluate((element) => element.scrollLeft))
			.toBeGreaterThan(0);
	}
	expect(
		await page.evaluate(() => document.documentElement.scrollWidth),
	).toBeLessThanOrEqual(320);
});

for (const method of ['native close', 'Close button', 'Escape']) {
	test(`chart detail stays closed after ${method} interleaved with data update`, async ({
		page,
	}) => {
		await page.setViewportSize({ width: 320, height: 900 });
		await page.goto('/preview.html?c=natal-chart');
		const host = page.locator('roxy-natal-chart');
		const opener = host.getByRole('button', {
			name: 'Enlarge chart',
			exact: true,
		});
		await opener.click();
		await expect(host.getByRole('dialog')).toBeVisible();
		await host.evaluate(async (element, closeMethod) => {
			const chart = element as HTMLElement & {
				data: Record<string, unknown>;
				updateComplete: Promise<unknown>;
			};
			const dialog = chart.shadowRoot!.querySelector('dialog')!;
			const update = () => {
				chart.data = { ...chart.data };
			};
			if (closeMethod === 'Escape')
				dialog.addEventListener('cancel', update, { once: true });
			else {
				if (closeMethod === 'native close') dialog.close();
				else
					dialog
						.querySelector<HTMLButtonElement>(
							'.roxy-chart-bar button:last-child',
						)!
						.click();
				update();
				await chart.updateComplete;
			}
		}, method);
		if (method === 'Escape') await page.keyboard.press('Escape');
		await expect(host.locator('dialog')).not.toHaveAttribute('open');
		await expect(opener).toBeFocused();
		await opener.click();
		await expect(host.getByRole('dialog')).toBeVisible();
	});
}

for (const width of [240, 390, 1280]) {
	test(`map edge labels remain visible at ${width}px`, async ({ page }) => {
		await page.setViewportSize({ width, height: 900 });
		await page.goto('/preview.html?c=astrocartography-map');
		const host = page.locator('roxy-astrocartography-map');
		await expect(host.locator('.acg-glyph').first()).toBeVisible();
		await host.evaluate(async (element) => {
			const e = element as HTMLElement & {
				data: AstrocartographyResponse;
				updateComplete: Promise<boolean>;
			};
			const data = structuredClone(e.data);
			for (const [i, line] of data.lines.slice(0, 2).entries()) {
				line.mc.longitude = i ? 179.9 : -179.9;
				line.ic.longitude = -line.mc.longitude;
				line.ascendant.points = [
					{ latitude: 0, longitude: line.mc.longitude },
					{ latitude: 5, longitude: i ? 170 : -170 },
				];
				line.descendant.points = [
					{ latitude: 0, longitude: line.ic.longitude },
					{ latitude: -5, longitude: i ? -170 : 170 },
				];
			}
			e.data = data;
			await e.updateComplete;
			await document.fonts.ready;
		});
		const overview = host.locator('.roxy-chart-view > svg');
		const clipped = (figure = overview) =>
			figure.evaluate((map) => {
				const frame = (map as SVGSVGElement).viewBox.baseVal;
				return [...map.querySelectorAll('text')]
					.filter((text) => {
						const box = text.getBBox();
						return (
							box.x < frame.x ||
							box.y < frame.y ||
							box.x + box.width > frame.x + frame.width ||
							box.y + box.height > frame.y + frame.height
						);
					})
					.map((text) => text.textContent);
			});
		await expect.poll(clipped).toEqual([]);
		const viewBox = await overview.getAttribute('viewBox');
		await overview.evaluate((map) =>
			map.setAttribute('viewBox', '0 0 360 180'),
		);
		expect(await clipped()).not.toEqual([]);
		await overview.evaluate(
			(map, frame) => map.setAttribute('viewBox', frame!),
			viewBox,
		);

		const meridians = await overview
			.locator('line.acg-line:not(.dashed)')
			.evaluateAll((lines) =>
				lines.map((line) => Number(line.getAttribute('x1'))),
			);
		expect(meridians[0]).toBeCloseTo(0.1, 8);
		expect(meridians[1]).toBeCloseTo(359.9, 8);
		await host
			.getByRole('button', { name: 'Enlarge chart', exact: true })
			.click();
		await expect(host.getByRole('dialog')).toBeVisible();
		const detail = host.locator('.roxy-chart-expanded svg');
		await expect.poll(() => clipped(detail)).toEqual([]);
		expect(
			await detail
				.locator('line.acg-line:not(.dashed)')
				.evaluateAll((lines) =>
					lines.map((line) => Number(line.getAttribute('x1'))),
				),
		).toEqual(meridians);
		await host.getByRole('button', { name: 'Close', exact: true }).click();
		expect(
			await page.evaluate(() => document.documentElement.scrollWidth),
		).toBeLessThanOrEqual(width + 1);
	});
}
