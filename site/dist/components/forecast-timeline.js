var fe=Object.defineProperty;var xe=Object.getOwnPropertyDescriptor;var d=(t,e,r,n)=>{for(var o=n>1?void 0:n?xe(e,r):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(o=(n?s(e,r,o):s(o))||o);return n&&o&&fe(e,r,o),o};import{css as He,html as h,nothing as S}from"lit";var I=[{endpoint:"forecast/timeline",method:"POST"},{endpoint:"forecast/significant-dates",method:"POST"},{endpoint:"forecast/transits",method:"POST"}];function T(t){return t.toLowerCase().replace(/[\s_-]+/g," ").trim()}function U(t){return t?t.charAt(0).toUpperCase()+t.slice(1).toLowerCase():""}function y(t){return t.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/([a-z])([0-9])/g,"$1 $2").replace(/^\w/,e=>e.toUpperCase())}var be=(t,e)=>e?t[T(e)]:void 0;var ve={conjunction:"☌",semisextile:"⚺","semi sextile":"⚺",semisquare:"∠","semi square":"∠",sextile:"⚹",square:"□",trine:"△",sesquiquadrate:"⚼",quincunx:"⚻",opposition:"☍"},z=t=>be(ve,t);import{css as H}from"lit";var we=/^\d{4}-\d{2}-\d{2}$/,Se=/^\d{4}-\d{2}$/,ke=/^\d{2}:\d{2}(:\d{2})?$/,Te=/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/,M=new Map;function K(t){if(!t)return["en"];let e=M.get(t);if(e)return[e,"en"];let r="en";try{r=Intl.getCanonicalLocales(t)[0]??"en"}catch{r="en"}return M.set(t,r),[r,"en"]}function Ee(t,e){return t&&e?`${t} - ${e}`:t||e}function Re(t){let e=ke.test(t)?`1970-01-01T${t}`:we.test(t)?`${t}T00:00:00`:Se.test(t)?`${t}-01T00:00:00`:Te.test(t)?t.replace(" ","T"):null;return e?{d:new Date(`${e}Z`),timeZone:"UTC"}:{d:new Date(t)}}function E(t,e){if(typeof e!="string"||e.length===0)return"";let{d:r,timeZone:n}=Re(e);return Number.isNaN(r.getTime())?e:r.toLocaleDateString(K(t),{month:"short",day:"numeric",year:"numeric",timeZone:n})}function j(t,e,r){return Ee(E(t,e),E(t,r))}function q(t,e,r=1){return typeof e!="number"||!Number.isFinite(e)?"":e.toLocaleString(K(t),{maximumFractionDigits:r})}function w(t){return(t.type??"").toLowerCase().trim().replace(/[\s_]+/g,"-")}function B(t){return U(w(t))}var $=H`.aspect-trine,.aspect-sextile{--_aspect:var(--roxy-info);--_aspect-ink:var(--roxy-info-fg)}.aspect-square,.aspect-opposition{--_aspect:var(--roxy-danger);--_aspect-ink:var(--roxy-danger-fg)}.aspect-quincunx,.aspect-semi-sextile{--_aspect:var(--roxy-success);--_aspect-ink:var(--roxy-success-fg)}.aspect-conjunction{--_aspect:var(--roxy-accent-ink);--_aspect-ink:var(--roxy-accent-ink)}:is(.aspect-trine,.aspect-sextile,.aspect-square,.aspect-opposition,.aspect-quincunx,.aspect-semi-sextile,.aspect-conjunction){color:var(--_aspect-ink);stroke-opacity:1}.aspect-swatch{inline-size:var(--roxy-space-sm);block-size:var(--roxy-space-sm);border-radius:var(--roxy-radius-full);background:var(--_aspect);vertical-align:middle;margin-inline-end:var(--roxy-space-xs);display:inline-block}`,ot=[H`.aspect{stroke:var(--_aspect,var(--roxy-muted));stroke-width:.8px;fill:none;opacity:.55;stroke-opacity:.7}`,$];function Y(t){return`aspect-${w(t)}`}import{html as c,nothing as m}from"lit";import{property as l,state as u}from"lit/decorators.js";import{ifDefined as b}from"lit/directives/if-defined.js";var Z=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function _(t){if(t.lang)return t.lang;if(typeof document>"u")return;let e=t.closest?.("[lang]")?.getAttribute("lang");return e||document.documentElement.lang||void 0}var Fe={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function L(t){let e=t.toLowerCase();return Z.find(r=>r.toLowerCase()===e)}function V(t){let e=_(t);if(!e)return;let r=L(e);if(r)return r;let n=e.toLowerCase().split("-"),o=n[0];if(o==="zh"){let i=n.find(s=>s==="hans"||s==="hant")??Fe[n[1]??""];return i?L(`zh-${i}`):void 0}return L(o)}import{LitElement as Ce}from"lit";var J=`/**
 * Roxy UI design tokens: every colour, size, space, radius, font and duration a component reads.
 *
 * Two tiers. BASES are the few values a host tunes: fonts, base text size and its scale ratio, the
 * space unit, the base radius, motion, and the colour bases (bg, fg, accent and the four status
 * colours). Every other token DERIVES from them with calc() or color-mix(), so dark mode reassigns
 * the colour bases only and one font token restyles every heading. A host may still set any
 * derived token directly, and its value wins.
 *
 * Delivery: a global light-DOM stylesheet (linked, or injected by the CDN bundle). Custom properties
 * inherit through the shadow boundary, so a token set on any light-DOM ancestor reaches every
 * component. The :host selectors apply only if this sheet is adopted into a shadow root.
 *
 * Light is the default. Dark applies under prefers-color-scheme: dark, or [data-theme="dark"] or
 * .dark on the element or any ancestor; [data-theme="light"] or .light opts back into light. An
 * explicit choice wins over the OS because those blocks come later in source order.
 *
 * A derivation is computed where it is declared, so the derived block also matches every theme
 * trigger: a base reassigned on :root or on an element carrying data-theme, .light or .dark
 * re-derives everything below it.
 *
 * Font: --roxy-font-sans is unset by default, so every component inherits the host page font; any
 * value set by the host or a preset replaces it, and --roxy-font-display follows it until set.
 *
 * Motion: --roxy-motion-duration defaults to 200ms and prefers-reduced-motion forces 0ms.
 */

/*
 * Two mechanisms keep the host page in charge of every token, and both are load bearing.
 *
 * Every rule sits in the roxy.tokens cascade layer, and an unlayered declaration beats a layered
 * one at ANY specificity, so a plain \`:root { --roxy-accent: #8b5cf6 }\` on the host page wins, and
 * so does the same line inside a layer of its own, because this statement registers ours first
 * and the CDN bundle injects this sheet at the top of <head>. A host that links this file after its
 * own CSS orders the layers itself: \`@layer roxy, base, components, utilities;\` before either sheet.
 *
 * Every selector is ALSO wrapped in :where(), which has ZERO specificity, so a host declaration
 * still wins wherever a layer cannot decide it, under every dark signal alike.
 *
 * The theme presets in styles/themes/*.css write into roxy.theme; both files declare this order,
 * so either one loading alone still ranks a preset above these defaults.
 */
@layer roxy.tokens, roxy.theme;

@layer roxy.tokens {
	/* Bases, light. Also the mode-specific derivations: accent ink and status inks mix toward black. */
	:where(:root, :host) {
		/* A real inherited property: native controls, popups and scrollbars follow it. */
		color-scheme: light;

		--roxy-bg: #ffffff;
		--roxy-fg: #0a0a0a;
		--roxy-accent: #4a6297;
		--roxy-success: #16a34a;
		--roxy-warning: #ea580c;
		--roxy-danger: #dc2626;
		--roxy-info: #0284c7;

		/* Accent and status inks: 70 percent toward black reads at AA on the card and on a tint of the base. */
		--roxy-accent-ink: color-mix(in oklab, var(--roxy-accent) 70%, black);
		--roxy-success-fg: color-mix(in oklab, var(--roxy-success) 70%, black);
		--roxy-warning-fg: color-mix(in oklab, var(--roxy-warning) 70%, black);
		--roxy-danger-fg: color-mix(in oklab, var(--roxy-danger) 70%, black);
		--roxy-info-fg: color-mix(in oklab, var(--roxy-info) 70%, black);

		/* Unset on purpose: a component inherits the host page font until a host or preset sets one. */
		--roxy-font-sans: initial;
		--roxy-font-mono:
			ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas,
			"Liberation Mono", monospace;

		--roxy-text-base: 1rem;
		--roxy-text-scale: 1.15;
		--roxy-weight-normal: 400;
		--roxy-weight-bold: 600;
		--roxy-leading-tight: 1.25;
		--roxy-leading-normal: 1.5;
		--roxy-tracking-tight: -0.01em;
		--roxy-tracking-normal: 0em;

		--roxy-space-unit: 0.25rem;
		--roxy-radius: 6px;

		--roxy-motion-duration: 200ms;
		--roxy-motion-easing: cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Derived roles, identical in every mode, restated on every theme trigger so they follow its bases. */
	:where(:root, :host, [data-theme], .light, .dark) {
		/* Flat: the card is the page colour, separated by a hairline. */
		--roxy-surface: var(--roxy-bg);
		--roxy-primary: var(--roxy-fg);
		--roxy-secondary: color-mix(in oklab, var(--roxy-fg) 78%, var(--roxy-bg));
		--roxy-muted: color-mix(in oklab, var(--roxy-fg) 60%, var(--roxy-bg));
		--roxy-border: color-mix(in oklab, var(--roxy-fg) 14%, var(--roxy-bg));
		--roxy-ring: color-mix(in srgb, var(--roxy-accent) 40%, transparent);
		--roxy-heat: var(--roxy-danger);

		--roxy-font-display: var(--roxy-font-sans);

		--roxy-text-sm: calc(var(--roxy-text-base) / var(--roxy-text-scale));
		--roxy-text-xs: calc(var(--roxy-text-sm) / var(--roxy-text-scale));
		--roxy-text-lg: calc(var(--roxy-text-base) * var(--roxy-text-scale));
		--roxy-text-xl: calc(
			var(--roxy-text-lg) *
			var(--roxy-text-scale) *
			var(--roxy-text-scale)
		);

		--roxy-space-xs: var(--roxy-space-unit);
		--roxy-space-sm: calc(var(--roxy-space-unit) * 2);
		--roxy-space-md: calc(var(--roxy-space-unit) * 4);
		--roxy-space-lg: calc(var(--roxy-space-unit) * 6);
		--roxy-space-xl: calc(var(--roxy-space-unit) * 10);
		--roxy-line-thick: calc(var(--roxy-space-unit) / 2);
		--roxy-touch: calc(var(--roxy-space-unit) * 11);

		--roxy-radius-sm: calc(var(--roxy-radius) / 2);
		--roxy-radius-md: var(--roxy-radius);
		--roxy-radius-lg: calc(var(--roxy-radius) * 5 / 3);
		--roxy-radius-full: 9999px;

		/* Flat surfaces cast nothing; only a floating layer (a popup, an enlarged chart) lifts. */
		--roxy-shadow-sm: none;
		--roxy-shadow-md: 0 4px 12px color-mix(in srgb, black 10%, transparent);
		--roxy-shadow-lg: 0 12px 32px color-mix(in srgb, black 18%, transparent);
	}

	/* Bases, dark, by system preference. Inks mix toward white so they read on a dark card. */
	@media (prefers-color-scheme: dark) {
		:where(:root, :host) {
			color-scheme: dark;
			--roxy-bg: #0a0a0a;
			--roxy-fg: #fafafa;
			--roxy-accent: #92aade;
			--roxy-success: #22c55e;
			--roxy-warning: #fb923c;
			--roxy-danger: #ef4444;
			--roxy-info: #38bdf8;

			--roxy-accent-ink: var(--roxy-accent);
			--roxy-success-fg: color-mix(in oklab, var(--roxy-success) 70%, white);
			--roxy-warning-fg: color-mix(in oklab, var(--roxy-warning) 70%, white);
			--roxy-danger-fg: color-mix(in oklab, var(--roxy-danger) 70%, white);
			--roxy-info-fg: color-mix(in oklab, var(--roxy-info) 70%, white);
		}
	}

	/* Explicit light: beats the OS dark block when the host chooses light. */
	:where(
		:root[data-theme="light"],
		[data-theme="light"],
		:root.light,
		.light,
		:host([data-theme="light"])
	) {
		color-scheme: light;
		--roxy-bg: #ffffff;
		--roxy-fg: #0a0a0a;
		--roxy-accent: #4a6297;
		--roxy-success: #16a34a;
		--roxy-warning: #ea580c;
		--roxy-danger: #dc2626;
		--roxy-info: #0284c7;

		--roxy-accent-ink: color-mix(in oklab, var(--roxy-accent) 70%, black);
		--roxy-success-fg: color-mix(in oklab, var(--roxy-success) 70%, black);
		--roxy-warning-fg: color-mix(in oklab, var(--roxy-warning) 70%, black);
		--roxy-danger-fg: color-mix(in oklab, var(--roxy-danger) 70%, black);
		--roxy-info-fg: color-mix(in oklab, var(--roxy-info) 70%, black);
	}

	/* Explicit dark: a .dark class or data-theme="dark" on any ancestor themes every component below it. */
	:where(
		:root[data-theme="dark"],
		[data-theme="dark"],
		:root.dark,
		.dark,
		:host([data-theme="dark"])
	) {
		color-scheme: dark;
		--roxy-bg: #0a0a0a;
		--roxy-fg: #fafafa;
		--roxy-accent: #92aade;
		--roxy-success: #22c55e;
		--roxy-warning: #fb923c;
		--roxy-danger: #ef4444;
		--roxy-info: #38bdf8;

		--roxy-accent-ink: var(--roxy-accent);
		--roxy-success-fg: color-mix(in oklab, var(--roxy-success) 70%, white);
		--roxy-warning-fg: color-mix(in oklab, var(--roxy-warning) 70%, white);
		--roxy-danger-fg: color-mix(in oklab, var(--roxy-danger) 70%, white);
		--roxy-info-fg: color-mix(in oklab, var(--roxy-info) 70%, white);
	}

	@media (prefers-reduced-motion: reduce) {
		:where(:root, :host) {
			--roxy-motion-duration: 0ms;
		}
	}
}
`;var W="roxy-ui-tokens";function X(){if(typeof document>"u")return null;let t=document.getElementById(W);if(t)return t;let e=document.createElement("style");return e.id=W,e.textContent=J,document.head.prepend(e),e}var Q="__ROXY_UI_I18N__";function ee(){let t=globalThis,e=t[Q];if(e)return e;let r={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return t[Q]=r,r}function Oe(t,e){return e?t.replace(/\{\{(\w+)\}\}/g,(r,n)=>n in e?String(e[n]??""):r):t}function te(t,e,r){return Oe(Pe(t,e)??e,r)}function Pe(t,e){if(!t)return;let{catalogs:r}=ee(),n=t.toLowerCase();return(r[n]??r[n.split("-")[0]])?.[T(e)]}function re(t){let{listeners:e}=ee();return e.add(t),()=>{e.delete(t)}}var R=class{constructor(e){this.host=e,e.addController(this)}hostConnected(){this.unsubscribe=re(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var F=class extends Ce{constructor(){super();this.translator=(r,n)=>this.t(r,n);new R(this)}connectedCallback(){super.connectedCallback(),X()}t(r,n){return te(this.effectiveLang(),r,n)}effectiveLang(){return _(this)}};import{css as $e}from"lit";import{css as Ae}from"lit";var ne=Ae`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var Le=$e`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,O=[Le,ne];var _e="__cols",Ge="__rows";function Ne(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function P(t){if(Array.isArray(t)){let i=!1,s=t.map(p=>{let g=P(p);return g!==p&&(i=!0),g});return i?s:t}if(!Ne(t))return t;let e=t[_e],r=t[Ge];if(Array.isArray(e)&&Array.isArray(r)&&Object.keys(t).length===2)return r.map(i=>{let s={};return e.forEach((p,g)=>{s[p]=P(i[g])}),s});let n=!1,o={};for(let[i,s]of Object.entries(t)){let p=P(s);p!==s&&(n=!0),o[i]=p}return n?o:t}function oe(t){return P(t)}function ie(t,e){return t.find(r=>r.attrs&&Object.entries(r.attrs).every(([n,o])=>e[n]===o))??t[0]}var De="pk_live_YOUR_KEY",se={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function ae(t){if(t)return t===De?se.sample:t.startsWith("pk_")?void 0:se.secret}function de(t,e,r={}){r.warn&&console.warn(e.message),t.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:e.reason,message:e.message},bubbles:!0,composed:!0}))}var ce="https://roxyapi.com/api/v2";async function Ie(t){try{let e=await t.json();if(e?.error){let r=e.code==="validation_error"&&Array.isArray(e.issues)?e.issues.filter(n=>typeof n.path=="string"&&typeof n.message=="string").map(n=>({path:n.path,message:n.message})):null;return{message:e.error,issues:r?.length?r:null,worded:!0}}}catch{}return{message:`Request failed (${t.status})`,issues:null,worded:!1}}var le={fromAttribute:t=>{if(t!=null){try{let e=JSON.parse(t);if(e&&typeof e=="object"&&!Array.isArray(e))return e}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},x=class extends Error{constructor(r,n=null,o=!0){super(r);this.issues=n;this.worded=o}};function pe(t){return t.submitUrl?void 0:ae(t.publishableKey)}async function G(t,e,r){let n=pe(t);if(n)throw new x(n.message);let o=t.submitUrl?await fetch(t.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Ue(e,t.submitContext),signal:r}):await ze(t,e,r);if(!o.ok){let i=await Ie(o);throw new x(i.message,i.issues,i.worded)}return await o.json()}function Ue(t,e){return JSON.stringify(e?{...t,context:e}:t)}function ze(t,e,r){let n=new URL(`${t.baseUrl??ce}${e.path}`,document.baseURI);for(let[i,s]of Object.entries(e.query??{}))s!=null&&n.searchParams.set(i,String(s));let o={Accept:"application/json"};return t.publishableKey&&(o["X-API-Key"]=t.publishableKey),e.body!=null&&(o["Content-Type"]="application/json"),fetch(n,{method:e.method??"GET",headers:o,body:e.body!=null?JSON.stringify(e.body):void 0,signal:r})}var C=class{constructor(e){this.baseUrl=ce;this.worded=!0;this.host=e,e.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(e){this.worded=!0;let r=pe(this);if(r){this.host.error=r.message,de(this.host,r);return}this.abort?.abort();let n=new AbortController;this.abort=n,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let o=await G(this,e,n.signal);if(n.signal.aborted)return;this.host.data=o}catch(o){if(n.signal.aborted||o?.name==="AbortError")return;o instanceof x&&(this.host.issues=o.issues),this.worded=o instanceof x&&o.worded,this.host.error=o instanceof Error?o.message:String(o)}finally{this.abort===n&&(this.abort=void 0),n.signal.aborted||(this.host.loading=!1)}}};function he(t,e,r,n=[]){let o={...r},i=`/${t.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(k,f)=>{let ge=o[f];return delete o[f],encodeURIComponent(String(ge??""))}),s=new Set(n),p={},g={};for(let[k,f]of Object.entries(o))f===void 0||f===""||(e==="GET"||s.has(k)?p[k]=f:g[k]=f);return{path:i,method:e,query:p,body:e==="POST"?g:void 0}}import{css as je,html as N,nothing as D}from"lit";import{css as Me,html as Ke}from"lit";function ue(){return Ke`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var Lt=Me`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var Dt=je`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function ye(t,e,r){let n=t.filter(o=>!!o.body);return n.length===0?D:N`<section class="block" part="section readings"><h3>${r}</h3>${n.map((o,i)=>N`<details class="interp-card" part="reading" name="${e}" ?open="${i===0}"><summary><span class="interp-lead">${o.label}</span> ${ue()} ${o.aside?N`<span class="interp-aside"><small>${o.aside}</small></span>`:D}</summary><div class="interp-body"><p>${o.body}</p>${o.extra??D}</div></details>`)}</section>`}var qe="roxy-data";function Be(t){return t.nodeName==="SCRIPT"&&t.getAttribute("type")==="application/json"}var A=class{constructor(e){this.host=e,e.addController(this)}hostConnected(){if(this.host.data!=null)return;let e=this.read();e!==void 0&&(this.host.data=e,this.host.requestUpdate())}read(){let e=this.findInlineScript();return e?this.parse(e.textContent):void 0}findInlineScript(){for(let e of Array.from(this.host.children))if(Be(e)&&e.classList.contains(qe))return e;return null}parse(e){if(e?.trim())try{return JSON.parse(e)}catch{return}}};var a=class extends F{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let r=this.lastRequest,n=this.listKey,o=this.listRows();if(!(!r||!n||!o)){this.moreLoading=!0,this.moreError=null;try{let i=await G(this.fetcher,{...r,query:{...r.query,offset:o.length}});if(this.lastRequest!==r)return;let s=i[n];this.data={...this.data,...i,[n]:[...o,...Array.isArray(s)?s:[]]}}catch(i){this.lastRequest===r&&(this.moreError=i instanceof Error?i.message:String(i))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=r=>{let n=this.selfFetch();if(!n)return;let o=r.detail;this.lastValues=o.values,this.sticky=!!o.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(o.values),this.fetchFresh(he(n.endpoint,n.method,o.values,o.queryKeys??[]))};new A(this),this.fetcher=new C(this)}static{this.styles=[O]}static{this.endpoints=[]}willUpdate(r){if(r.has("data")&&this.data!=null){let n=oe(this.data);n!==this.data&&(this.data=n)}(r.has("publishableKey")||r.has("baseUrl")||r.has("submitUrl")||r.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let r=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:ie(this.constructor.endpoints,this);return r&&{endpoint:r.endpoint,method:this.method??r.method}}render(){return c`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(r){try{return this.renderData(r)}catch(n){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,n),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:n},bubbles:!0,composed:!0})),customElements.get("roxy-data")?c`<roxy-data .data="${r}" lang="${b(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let r=this.hideSections.split(",").map(o=>o.trim().toLowerCase()).filter(o=>/^[a-z][a-z0-9-]*$/.test(o));if(r.length===0)return m;let n=r.map(o=>`[part~="${o}"],roxy-endpoint-form::part(${o}){display:none!important}`).join("");return c`<style>${n}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?c`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(r,n,o){return this.hideReadings?m:ye(r,n,this.t(o??"Reading"))}renderResult(r){let n=c`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(r)}`;return this.showAttribution()?c`${n}${this.renderAttribution()}`:n}renderWithForm(r){return c`${this.renderForm()}${r}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?m:this.renderErrorBanner(this.error):this.data==null?m:this.showAttribution()?c`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let r=this.listRows(),n=this.data?.total;return!this.lastRequest||!r||typeof n!="number"?m:r.length>=n?m:c`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?c`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:m}</div>`}listRows(){let r=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(r)?r:void 0}fetchFresh(r){return this.lastRequest=r,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(r)}load(r){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(r)}pickRow(r){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:r,bubbles:!0,composed:!0})),this.openRow(r.id)}openRow(r){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let n=this.openedRow??document.createElement(this.rowDetail.tag);n.publishableKey=this.publishableKey,n.baseUrl=this.baseUrl,n.submitUrl=this.submitUrl,n.submitContext=this.submitContext,n.hideReadings=this.hideReadings,n.hideSections=this.hideSections;let o=this.effectiveLang();o&&n.setAttribute("lang",o),this.openedRow=n,this.openedRowId=r,n.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(r))}`,method:"GET",query:{lang:V(this)}}).then(()=>n.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return c`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(m):this.renderEmpty()}renderForm(){let r=this.selfFetch();return c`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${r?.endpoint??""}" method="${r?.method??"POST"}" spec-url="${b(this.specUrl)}" publishable-key="${b(this.publishableKey)}" location-url="${b(this.locationUrl)}" submit-label="${b(this.submitLabel)}" lang="${b(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let r=sessionStorage.getItem(this.rememberKey());return r?JSON.parse(r):void 0}catch{return}}writeRemembered(r){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(r))}catch{}}renderEmpty(){return c`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return c`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(r){let n=!!this.selfFetch();if(n&&this.issues)return this.renderForm();let o=this.renderErrorBanner(r);return n?c`${o}${this.renderForm()}`:o}renderErrorBanner(r){return c`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(r)}</div>`}};d([l({attribute:!1})],a.prototype,"data",2),d([l({type:String,attribute:"data-endpoint"})],a.prototype,"endpoint",2),d([l({type:String})],a.prototype,"method",2),d([l({type:String,attribute:"publishable-key"})],a.prototype,"publishableKey",2),d([l({type:String,attribute:"base-url"})],a.prototype,"baseUrl",2),d([l({type:String,attribute:"spec-url"})],a.prototype,"specUrl",2),d([l({type:String,attribute:"submit-url"})],a.prototype,"submitUrl",2),d([l({attribute:"submit-context",converter:le})],a.prototype,"submitContext",2),d([l({type:String,attribute:"location-url"})],a.prototype,"locationUrl",2),d([l({type:Boolean})],a.prototype,"remember",2),d([l({type:Boolean,attribute:"hide-readings",reflect:!0})],a.prototype,"hideReadings",2),d([l({type:String,attribute:"hide-sections",reflect:!0})],a.prototype,"hideSections",2),d([l({type:String,attribute:"submit-label"})],a.prototype,"submitLabel",2),d([l({type:String,attribute:"error-message"})],a.prototype,"errorMessage",2),d([l({type:String})],a.prototype,"attribution",2),d([u()],a.prototype,"loading",2),d([u()],a.prototype,"error",2),d([u()],a.prototype,"issues",2),d([u()],a.prototype,"selfFetched",2),d([u()],a.prototype,"editing",2),d([u()],a.prototype,"sticky",2),d([u()],a.prototype,"openedRow",2),d([u()],a.prototype,"openedRowId",2),d([u()],a.prototype,"moreLoading",2),d([u()],a.prototype,"moreError",2);var me=t=>e=>{customElements.get(t)||customElements.define(t,e)};var Ye={western:"Western",vedic:"Vedic",biorhythm:"Biorhythm"},Ze=["western","vedic","biorhythm"],v=class extends a{renderData(e){let r=e.events??[],n=this.groupByDate(r),o=Ze.filter(i=>r.some(s=>s.domain===i));return h`<div class="wrap" part="card" aria-label="${this.t("Forecast timeline")}"><header class="head" part="header"><h2>${this.t("Forecast timeline")}</h2>${e.startDate&&e.endDate?h`<div class="range">${j(this.effectiveLang(),e.startDate,e.endDate)} · ${this.t("{{count}} events",{count:e.count??r.length})}</div>`:S}</header>${o.length?h`<div class="legend" part="legend">${o.map(i=>h`<span><span class="swatch swatch-${i}"></span>${Ye[i]}</span>`)}</div>`:S} ${n.length?h`<div class="days" part="section events" role="list">${n.map(([i,s])=>this.renderDay(i,s))}</div>`:h`<p class="roxy-empty" role="status">${this.t("No events in this window")}</p>`}</div>`}groupByDate(e){let r=new Map;for(let n of e){let o=n.date??"",i=r.get(o)??[];i.push(n),r.set(o,i)}return[...r.entries()]}renderDay(e,r){return h`<div class="day" role="listitem"><div class="day-date">${E(this.effectiveLang(),e)}</div><div class="events">${r.map(n=>this.renderEvent(n))}</div></div>`}renderEvent(e){let r=typeof e.significance=="number"?e.significance:0,n=Math.max(0,Math.min(100,r));return h`<div class="event"><span class="dot dot-${e.domain}" aria-hidden="true"></span><div class="event-body"><div class="event-line">${this.renderHeadline(e)}</div>${e.description&&!this.hideReadings?h`<p class="event-desc">${e.description}</p>`:S}<div class="sig" title="${this.t("significance {{value}} of 100",{value:n})}"><span class="sig-track"><span class="sig-fill sig-fill-${e.domain}" style="width:${n}%"></span> </span><span class="sig-val">${n}</span></div></div></div>`}renderHeadline(e){let r=e.body?y(e.body):"",n=e.target?y(e.target):"",o=w({type:e.aspect}),i=o?z(e.aspect)??B({type:e.aspect}):"",s=typeof e.orb=="number"?q(this.effectiveLang(),e.orb,1):"",p=this.typeQualifier(e);return o&&n?h`<strong>${r}</strong> <span class="${Y({type:e.aspect})}">${i}</span> <strong>${n}</strong>${s?h`<span class="kind">${this.t("orb {{value}}°",{value:s})}</span>`:S}`:h`<strong>${r||y(e.type??"")}</strong>${p?h`<span class="kind">${p}</span>`:S}`}typeQualifier(e){return e.type==="sign-ingress"&&e.target?`enters ${y(e.target)}`:e.type==="retrograde-station"&&e.station?e.station:e.type==="eclipse"?[e.kind,"eclipse"].filter(Boolean).join(" "):e.type==="critical-day"?"critical day":e.type==="dasha-change"&&e.target?`dasha ${y(e.target)}`:y(e.type??"")}};v.endpoints=I,v.styles=[O,$,He`.wrap{gap:var(--roxy-space-md);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,1fr);display:grid}h2,p{margin:0}.head{justify-content:space-between;align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;display:flex}.range{color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}.legend{gap:var(--roxy-space-md);color:var(--roxy-muted);font-size:var(--roxy-text-xs);flex-wrap:wrap;display:flex}.legend .swatch{block-size:.6lh;inline-size:.6lh;border-radius:var(--roxy-radius-full);vertical-align:middle;margin-inline-end:var(--roxy-space-xs);display:inline-block}.swatch-western,.dot-western,.sig-fill-western{background:var(--roxy-accent)}.swatch-vedic,.dot-vedic,.sig-fill-vedic{background:var(--roxy-info)}.swatch-biorhythm,.dot-biorhythm,.sig-fill-biorhythm{background:var(--roxy-success)}.day{gap:var(--roxy-space-md);padding-block:var(--roxy-space-sm);border-block-start:1px solid var(--roxy-border);grid-template-columns:9ch minmax(0,1fr);display:grid}.day:first-of-type{border-block-start:0}@container (width<=30rem){.day{grid-template-columns:minmax(0,1fr)}}.day-date{color:var(--roxy-muted);font-size:var(--roxy-text-xs);font-variant-numeric:tabular-nums;padding-block-start:calc(var(--roxy-space-unit) / 2)}.events{gap:var(--roxy-space-sm);display:grid}.event{align-items:start;gap:var(--roxy-space-sm);grid-template-columns:.4lh minmax(0,1fr);display:grid}.dot{block-size:.4lh;inline-size:.4lh;border-radius:var(--roxy-radius-full);margin-block-start:var(--roxy-space-xs)}.event-body{min-width:0}.event-line{font-size:var(--roxy-text-sm)}.event-line .kind{color:var(--roxy-muted);font-size:var(--roxy-text-xs);margin-inline-start:var(--roxy-space-xs)}.event-desc{color:var(--roxy-muted);font-size:var(--roxy-text-xs);margin-block-start:calc(var(--roxy-space-unit) / 2)}.sig{align-items:center;gap:var(--roxy-space-xs);margin-block-start:var(--roxy-space-xs);display:flex}.sig-track{max-inline-size:16ch;block-size:calc(var(--roxy-line-thick) * 2);border-radius:var(--roxy-radius-full);background:var(--roxy-border);flex:1;overflow:hidden}.sig-fill{height:100%;display:block}.sig-val{color:var(--roxy-muted);font-size:var(--roxy-text-xs);font-variant-numeric:tabular-nums}`],v=d([me("roxy-forecast-timeline")],v);export{v as RoxyForecastTimeline};
