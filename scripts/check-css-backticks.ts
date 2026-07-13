/**
 * A backtick inside a css`` tagged template TERMINATES the template.
 *
 * @remarks
 * It is a natural thing to type, because every other comment in this codebase quotes identifiers with backticks. Inside a css template it silently ends the CSS and the rest of the rule is parsed as TypeScript, so the failure surfaces as a baffling error tens of lines away ("Expected ] but found max"). It cost four debugging detours in one day; a grep is cheaper than remembering.
 *
 * Detection walks LINES, not the template body: locating the template's end by scanning for the next backtick is exactly what a stray backtick breaks, so such a checker silently passes on the bug it exists to catch. Instead track whether we are inside a css template (opened by a line ending in css`, closed by a line that is only a backtick plus , or ;) and flag any backtick inside a CSS comment there.
 */
import { Glob } from 'bun';

const bad: string[] = [];

for await (const file of new Glob('packages/ui/src/**/*.ts').scan('.')) {
	const lines = (await Bun.file(file).text()).split('\n');
	let inCss = false;
	let inComment = false;
	for (const [i, line] of lines.entries()) {
		if (!inCss) {
			if (/\bcss`\s*$/.test(line)) inCss = true;
			continue;
		}
		if (/^\s*`[,;]?\s*$/.test(line)) {
			inCss = false;
			inComment = false;
			continue;
		}
		const opens = line.includes('/*');
		const closes = line.includes('*/');
		const commented = inComment || opens;
		// An ESCAPED backtick is legal inside a template literal and appears
		// deliberately in some comments; only a bare one ends the CSS.
		const bare = line.replace(/\\`/g, '');
		if (commented && bare.includes('`')) {
			bad.push(`${file}:${i + 1}  unescaped backtick inside a CSS comment`);
		}
		if (opens && !closes) inComment = true;
		if (closes) inComment = false;
	}
}

if (bad.length > 0) {
	console.error('Backtick inside a css`` template. It ENDS the template.\n');
	for (const b of bad) console.error(`  ${b}`);
	console.error('\nQuote identifiers in CSS comments without backticks.');
	process.exit(1);
}
console.log(`css templates clean: no stray backticks in CSS comments.`);
