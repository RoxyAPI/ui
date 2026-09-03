import { defineConfig, devices } from '@playwright/test';

const ALL_PROJECTS = [
	{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
	{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
	{ name: 'webkit', use: { ...devices['Desktop Safari'] } },
];

// PLAYWRIGHT_PROJECTS=chromium,firefox limits the matrix. Empty or unset
// runs every project. Local dev sets chromium, release.yml installs all.
const requested = process.env.PLAYWRIGHT_PROJECTS?.split(',')
	.map((s) => s.trim())
	.filter(Boolean);

const projects = requested?.length
	? ALL_PROJECTS.filter((p) => requested.includes(p.name))
	: ALL_PROJECTS;

/** The preview the suite drives. `PORT` moves it, with the same default `scripts/preview.ts` uses, so the gate can run on a machine where 3001 is taken. */
const PREVIEW_URL = `http://localhost:${process.env.PORT ?? 3001}`;

export default defineConfig({
	testDir: './packages/ui/tests/e2e',
	/**
	 * `.e2e.ts`, deliberately NOT the Playwright default of `.spec.ts`.
	 *
	 * Bun's test runner globs `*.spec.ts` as well as `*.test.ts`, so while these files carried the
	 * default suffix a bare `bun test` swept them up and reported 4 failures ("Playwright Test did not
	 * expect test.describe() to be called here"). The enumerated `test` script in package.json hid
	 * that, but anyone running `bun test` directly saw a red suite that was not red, which is worse
	 * than a broken test: it trains you to ignore the number. One suffix, one runner each.
	 */
	testMatch: '**/*.e2e.ts',
	/**
	 * 90s, not the 30s default.
	 *
	 * The axe passes mount the whole demo (54 components, 69 cards) and scan it in
	 * both themes. Isolated they take 10-12s, but the matrix runs three browsers
	 * over the same machine and contention triples that: a run was observed at
	 * 29.1s against the 30s ceiling, and adding one demo card was enough to tip
	 * `addStyleTag` in the practitioner spec over it. That failure reads as a
	 * theming or a11y bug and is neither, which is the expensive part. Raise the
	 * ceiling rather than trim the coverage that makes these the slow ones.
	 */
	timeout: 90_000,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 2 : undefined,
	reporter: process.env.CI ? 'github' : 'list',
	use: {
		baseURL: PREVIEW_URL,
		trace: 'on-first-retry',
	},
	webServer: {
		command: 'bun run preview',
		url: PREVIEW_URL,
		reuseExistingServer: !process.env.CI,
		timeout: 30_000,
	},
	projects,
});
