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

export default defineConfig({
	testDir: './packages/ui/tests/e2e',
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
		baseURL: 'http://localhost:3001',
		trace: 'on-first-retry',
	},
	webServer: {
		command: 'bun run preview',
		url: 'http://localhost:3001',
		reuseExistingServer: !process.env.CI,
		timeout: 30_000,
	},
	projects,
});
