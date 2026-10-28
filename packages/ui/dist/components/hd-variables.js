var ce=Object.defineProperty;var pe=Object.getOwnPropertyDescriptor;var d=(o,e,t,r)=>{for(var n=r>1?void 0:r?pe(e,t):e,i=o.length-1,a;i>=0;i--)(a=o[i])&&(n=(r?a(e,t,n):a(n))||n);return r&&n&&ce(e,t,n),n};import{css as Ke,html as c,nothing as u}from"lit";var G=[{endpoint:"human-design/variables",method:"POST"}];import{html as p,nothing as f}from"lit";import{property as h,state as g}from"lit/decorators.js";import{ifDefined as v}from"lit/directives/if-defined.js";var z=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function C(o){if(o.lang)return o.lang;if(typeof document>"u")return;let e=o.closest?.("[lang]")?.getAttribute("lang");return e||document.documentElement.lang||void 0}var he={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function F(o){let e=o.toLowerCase();return z.find(t=>t.toLowerCase()===e)}function U(o){let e=C(o);if(!e)return;let t=F(e);if(t)return t;let r=e.toLowerCase().split("-"),n=r[0];if(n==="zh"){let i=r.find(a=>a==="hans"||a==="hant")??he[r[1]??""];return i?F(`zh-${i}`):void 0}return F(n)}import{LitElement as me}from"lit";var I=`/**
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
`;var _="roxy-ui-tokens";function j(){if(typeof document>"u")return null;let o=document.getElementById(_);if(o)return o;let e=document.createElement("style");return e.id=_,e.textContent=I,document.head.prepend(e),e}function M(o){return o.toLowerCase().replace(/[\s_-]+/g," ").trim()}var N="__ROXY_UI_I18N__";function B(){let o=globalThis,e=o[N];if(e)return e;let t={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return o[N]=t,t}function ye(o,e){return e?o.replace(/\{\{(\w+)\}\}/g,(t,r)=>r in e?String(e[r]??""):t):o}function q(o,e,t){return ye(ue(o,e)??e,t)}function ue(o,e){if(!o)return;let{catalogs:t}=B(),r=o.toLowerCase();return(t[r]??t[r.split("-")[0]])?.[M(e)]}function H(o){let{listeners:e}=B();return e.add(o),()=>{e.delete(o)}}var k=class{constructor(e){this.host=e,e.addController(this)}hostConnected(){this.unsubscribe=H(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var E=class extends me{constructor(){super();this.translator=(t,r)=>this.t(t,r);new k(this)}connectedCallback(){super.connectedCallback(),j()}t(t,r){return q(this.effectiveLang(),t,r)}effectiveLang(){return C(this)}};import{css as fe}from"lit";import{css as ge}from"lit";var D=ge`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var xe=fe`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,T=[xe,D];var be="__cols",ve="__rows";function we(o){return typeof o=="object"&&o!==null&&!Array.isArray(o)}function R(o){if(Array.isArray(o)){let i=!1,a=o.map(l=>{let y=R(l);return y!==l&&(i=!0),y});return i?a:o}if(!we(o))return o;let e=o[be],t=o[ve];if(Array.isArray(e)&&Array.isArray(t)&&Object.keys(o).length===2)return t.map(i=>{let a={};return e.forEach((l,y)=>{a[l]=R(i[y])}),a});let r=!1,n={};for(let[i,a]of Object.entries(o)){let l=R(a);l!==a&&(r=!0),n[i]=l}return r?n:o}function V(o){return R(o)}function Y(o,e){return o.find(t=>t.attrs&&Object.entries(t.attrs).every(([r,n])=>e[r]===n))??o[0]}var Se="pk_live_YOUR_KEY",W={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function J(o){if(o)return o===Se?W.sample:o.startsWith("pk_")?void 0:W.secret}function X(o,e,t={}){t.warn&&console.warn(e.message),o.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:e.reason,message:e.message},bubbles:!0,composed:!0}))}var Z="https://roxyapi.com/api/v2";async function ke(o){try{let e=await o.json();if(e?.error){let t=e.code==="validation_error"&&Array.isArray(e.issues)?e.issues.filter(r=>typeof r.path=="string"&&typeof r.message=="string").map(r=>({path:r.path,message:r.message})):null;return{message:e.error,issues:t?.length?t:null,worded:!0}}}catch{}return{message:`Request failed (${o.status})`,issues:null,worded:!1}}var Q={fromAttribute:o=>{if(o!=null){try{let e=JSON.parse(o);if(e&&typeof e=="object"&&!Array.isArray(e))return e}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},b=class extends Error{constructor(t,r=null,n=!0){super(t);this.issues=r;this.worded=n}};function ee(o){return o.submitUrl?void 0:J(o.publishableKey)}async function L(o,e,t){let r=ee(o);if(r)throw new b(r.message);let n=o.submitUrl?await fetch(o.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Ee(e,o.submitContext),signal:t}):await Te(o,e,t);if(!n.ok){let i=await ke(n);throw new b(i.message,i.issues,i.worded)}return await n.json()}function Ee(o,e){return JSON.stringify(e?{...o,context:e}:o)}function Te(o,e,t){let r=new URL(`${o.baseUrl??Z}${e.path}`,document.baseURI);for(let[i,a]of Object.entries(e.query??{}))a!=null&&r.searchParams.set(i,String(a));let n={Accept:"application/json"};return o.publishableKey&&(n["X-API-Key"]=o.publishableKey),e.body!=null&&(n["Content-Type"]="application/json"),fetch(r,{method:e.method??"GET",headers:n,body:e.body!=null?JSON.stringify(e.body):void 0,signal:t})}var O=class{constructor(e){this.baseUrl=Z;this.worded=!0;this.host=e,e.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(e){this.worded=!0;let t=ee(this);if(t){this.host.error=t.message,X(this.host,t);return}this.abort?.abort();let r=new AbortController;this.abort=r,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let n=await L(this,e,r.signal);if(r.signal.aborted)return;this.host.data=n}catch(n){if(r.signal.aborted||n?.name==="AbortError")return;n instanceof b&&(this.host.issues=n.issues),this.worded=n instanceof b&&n.worded,this.host.error=n instanceof Error?n.message:String(n)}finally{this.abort===r&&(this.abort=void 0),r.signal.aborted||(this.host.loading=!1)}}};function te(o,e,t,r=[]){let n={...t},i=`/${o.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(S,x)=>{let le=n[x];return delete n[x],encodeURIComponent(String(le??""))}),a=new Set(r),l={},y={};for(let[S,x]of Object.entries(n))x===void 0||x===""||(e==="GET"||a.has(S)?l[S]=x:y[S]=x);return{path:i,method:e,query:l,body:e==="POST"?y:void 0}}import{css as Pe,html as A,nothing as K}from"lit";import{css as Re,html as Oe}from"lit";function P(){return Oe`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var re=Re`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var oe=Pe`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function ne(o,e,t){let r=o.filter(n=>!!n.body);return r.length===0?K:A`<section class="block" part="section readings"><h3>${t}</h3>${r.map((n,i)=>A`<details class="interp-card" part="reading" name="${e}" ?open="${i===0}"><summary><span class="interp-lead">${n.label}</span> ${P()} ${n.aside?A`<span class="interp-aside"><small>${n.aside}</small></span>`:K}</summary><div class="interp-body"><p>${n.body}</p>${n.extra??K}</div></details>`)}</section>`}var $e="roxy-data";function Fe(o){return o.nodeName==="SCRIPT"&&o.getAttribute("type")==="application/json"}var $=class{constructor(e){this.host=e,e.addController(this)}hostConnected(){if(this.host.data!=null)return;let e=this.read();e!==void 0&&(this.host.data=e,this.host.requestUpdate())}read(){let e=this.findInlineScript();return e?this.parse(e.textContent):void 0}findInlineScript(){for(let e of Array.from(this.host.children))if(Fe(e)&&e.classList.contains($e))return e;return null}parse(e){if(e?.trim())try{return JSON.parse(e)}catch{return}}};var s=class extends E{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let t=this.lastRequest,r=this.listKey,n=this.listRows();if(!(!t||!r||!n)){this.moreLoading=!0,this.moreError=null;try{let i=await L(this.fetcher,{...t,query:{...t.query,offset:n.length}});if(this.lastRequest!==t)return;let a=i[r];this.data={...this.data,...i,[r]:[...n,...Array.isArray(a)?a:[]]}}catch(i){this.lastRequest===t&&(this.moreError=i instanceof Error?i.message:String(i))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=t=>{let r=this.selfFetch();if(!r)return;let n=t.detail;this.lastValues=n.values,this.sticky=!!n.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(n.values),this.fetchFresh(te(r.endpoint,r.method,n.values,n.queryKeys??[]))};new $(this),this.fetcher=new O(this)}static{this.styles=[T]}static{this.endpoints=[]}willUpdate(t){if(t.has("data")&&this.data!=null){let r=V(this.data);r!==this.data&&(this.data=r)}(t.has("publishableKey")||t.has("baseUrl")||t.has("submitUrl")||t.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let t=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:Y(this.constructor.endpoints,this);return t&&{endpoint:t.endpoint,method:this.method??t.method}}render(){return p`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(t){try{return this.renderData(t)}catch(r){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,r),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:r},bubbles:!0,composed:!0})),customElements.get("roxy-data")?p`<roxy-data .data="${t}" lang="${v(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let t=this.hideSections.split(",").map(n=>n.trim().toLowerCase()).filter(n=>/^[a-z][a-z0-9-]*$/.test(n));if(t.length===0)return f;let r=t.map(n=>`[part~="${n}"],roxy-endpoint-form::part(${n}){display:none!important}`).join("");return p`<style>${r}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?p`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(t,r,n){return this.hideReadings?f:ne(t,r,this.t(n??"Reading"))}renderResult(t){let r=p`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(t)}`;return this.showAttribution()?p`${r}${this.renderAttribution()}`:r}renderWithForm(t){return p`${this.renderForm()}${t}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?f:this.renderErrorBanner(this.error):this.data==null?f:this.showAttribution()?p`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let t=this.listRows(),r=this.data?.total;return!this.lastRequest||!t||typeof r!="number"?f:t.length>=r?f:p`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?p`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:f}</div>`}listRows(){let t=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(t)?t:void 0}fetchFresh(t){return this.lastRequest=t,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(t)}load(t){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(t)}pickRow(t){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:t,bubbles:!0,composed:!0})),this.openRow(t.id)}openRow(t){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let r=this.openedRow??document.createElement(this.rowDetail.tag);r.publishableKey=this.publishableKey,r.baseUrl=this.baseUrl,r.submitUrl=this.submitUrl,r.submitContext=this.submitContext,r.hideReadings=this.hideReadings,r.hideSections=this.hideSections;let n=this.effectiveLang();n&&r.setAttribute("lang",n),this.openedRow=r,this.openedRowId=t,r.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(t))}`,method:"GET",query:{lang:U(this)}}).then(()=>r.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return p`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(f):this.renderEmpty()}renderForm(){let t=this.selfFetch();return p`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${t?.endpoint??""}" method="${t?.method??"POST"}" spec-url="${v(this.specUrl)}" publishable-key="${v(this.publishableKey)}" location-url="${v(this.locationUrl)}" submit-label="${v(this.submitLabel)}" lang="${v(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let t=sessionStorage.getItem(this.rememberKey());return t?JSON.parse(t):void 0}catch{return}}writeRemembered(t){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(t))}catch{}}renderEmpty(){return p`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return p`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(t){let r=!!this.selfFetch();if(r&&this.issues)return this.renderForm();let n=this.renderErrorBanner(t);return r?p`${n}${this.renderForm()}`:n}renderErrorBanner(t){return p`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(t)}</div>`}};d([h({attribute:!1})],s.prototype,"data",2),d([h({type:String,attribute:"data-endpoint"})],s.prototype,"endpoint",2),d([h({type:String})],s.prototype,"method",2),d([h({type:String,attribute:"publishable-key"})],s.prototype,"publishableKey",2),d([h({type:String,attribute:"base-url"})],s.prototype,"baseUrl",2),d([h({type:String,attribute:"spec-url"})],s.prototype,"specUrl",2),d([h({type:String,attribute:"submit-url"})],s.prototype,"submitUrl",2),d([h({attribute:"submit-context",converter:Q})],s.prototype,"submitContext",2),d([h({type:String,attribute:"location-url"})],s.prototype,"locationUrl",2),d([h({type:Boolean})],s.prototype,"remember",2),d([h({type:Boolean,attribute:"hide-readings",reflect:!0})],s.prototype,"hideReadings",2),d([h({type:String,attribute:"hide-sections",reflect:!0})],s.prototype,"hideSections",2),d([h({type:String,attribute:"submit-label"})],s.prototype,"submitLabel",2),d([h({type:String,attribute:"error-message"})],s.prototype,"errorMessage",2),d([h({type:String})],s.prototype,"attribution",2),d([g()],s.prototype,"loading",2),d([g()],s.prototype,"error",2),d([g()],s.prototype,"issues",2),d([g()],s.prototype,"selfFetched",2),d([g()],s.prototype,"editing",2),d([g()],s.prototype,"sticky",2),d([g()],s.prototype,"openedRow",2),d([g()],s.prototype,"openedRowId",2),d([g()],s.prototype,"moreLoading",2),d([g()],s.prototype,"moreError",2);var ie=o=>e=>{customElements.get(o)||customElements.define(o,e)};import{css as Le,html as At,nothing as Kt}from"lit";import{css as Ce}from"lit";var ae=Ce`.roxy-facts{gap:var(--roxy-space-sm) var(--roxy-space-lg);margin:var(--roxy-space-sm) 0 0;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums;flex-wrap:wrap;display:flex}.roxy-facts>div{min-width:0}.roxy-facts dd{overflow-wrap:anywhere;margin:0}`;var zt=[ae,Le`.roxy-facts{margin:0}.lead{font-size:var(--roxy-text-sm);margin:0}.keynotes{gap:var(--roxy-space-xs);margin:0;display:grid}.keynotes dd{margin:0}`];function se(o,e){return o==="design"?e("Design"):o==="personality"?e("Personality"):o??""}var Ae="Localized";function m(o,e,t){let r=o,n=r?.[`${e}${Ae}`];if(typeof n=="string"&&n!=="")return n;if(t!==void 0)return t;let i=r?.[e];return typeof i=="string"?i:""}var w=class extends s{renderData(e){let t=[...e.arrows??[]].sort((r,n)=>de(r.position)-de(n.position));return c`<div class="wrap" part="card" aria-label="${this.t("Human Design variables")}"><h2 part="header">${this.t("Variables")}</h2><div class="grid" part="details arrows">${t.map(r=>this.renderArrow(r))}</div>${e.confident===!1?c`<p class="note" role="note">${typeof e.confidenceMarginDeg=="number"?this.t("Low confidence: a birth time near a color or tone boundary (within {{margin}}°). Verify the exact birth time.",{margin:e.confidenceMarginDeg}):this.t("Low confidence: a birth time near a color or tone boundary. Verify the exact birth time.")}</p>`:u} ${this.renderReading(t,e.baseDescription)}</div>`}renderArrow(e){let t=e.direction==="left"?"←":"→",r=m(e,"baseName");return c`<div class="arrow"><div class="arrow-head"><span class="glyph ${e.activation?.side??""}" aria-hidden="true">${t}</span> <span class="name">${m(e,"name")}</span></div>${e.layer?c`<span class="layer">${m(e,"layer")}</span>`:u} <span class="labels">${[m(e,"directionLabel"),m(e,"colorLabel")].filter(Boolean).join(" · ")} </span>${typeof e.color=="number"?c`<span class="ctb">${this.t("Color {{color}} · Tone {{tone}} · Base {{base}}",{color:e.color,tone:e.tone??"",base:e.base??""})}${r?`, ${r}`:""}</span>`:u} ${e.activation?.planet?c`<span class="ctb">${[m(e.activation,"planet"),se(e.activation.side,this.translator)].filter(Boolean).join(" · ")}</span>`:u} ${e.confident===!1?c`<span class="note" role="note">${this.t("Knife-edge: could flip with a more precise birth time.")}</span>`:u}</div>`}renderReading(e,t){let r=e.filter(a=>a.description||a.colorMeaning);if(r.length===0||this.hideReadings)return u;let n=new Map;for(let a of r){let l=a.layer??"",y=n.get(l);y?y.push(a):n.set(l,[a])}let i=0;return c`<section class="block" part="section readings"><h3>${this.t("Reading")}</h3>${[...n].map(([a,l])=>c`<div class="group">${a?c`<p class="group-head">${m(l[0],"layer")}</p>`:u} ${l[0]?.layerDescription?c`<p class="group-note">${l[0].layerDescription}</p>`:u} ${l.map(y=>this.renderArrowReading(y,i++===0))}</div>`)} ${t?c`<p class="footnote">${this.t("Base")}. ${t}</p>`:u}</section>`}renderArrowReading(e,t){let r=e.cognition,n=r?m(r,"label"):"",i=[{label:this.t("Color"),body:e.colorMeaning},{label:this.t("Tone"),body:e.toneMeaning},{label:this.t("Direction"),body:e.directionMeaning},{label:n?`${this.t("Cognition")} · ${n}`:this.t("Cognition"),body:r?.description}].filter(a=>!!a.body);return c`<details class="interp-card" part="reading" name="hd-variable" ?open="${t}"><summary><span class="interp-lead">${m(e,"name")}</span> ${P()} ${e.position?c`<span class="interp-aside"><small>${m(e,"position")}</small></span>`:u}</summary><div class="interp-body">${e.description?c`<p>${e.description}</p>`:u} ${i.length>0?c`<dl class="facets">${i.map(a=>c`<dt>${a.label}</dt><dd>${a.body}</dd>`)}</dl>`:u}</div></details>`}};w.endpoints=G,w.styles=[T,re,oe,Ke`.wrap{gap:var(--roxy-space-md);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,1fr);display:grid}h2,p{margin:0}.grid{gap:0 var(--roxy-space-lg);grid-template-columns:repeat(2,minmax(0,1fr));display:grid}.arrow{align-content:start;gap:var(--roxy-space-xs);padding-block:var(--roxy-space-sm);border-block-start:1px solid var(--roxy-border);display:grid}.arrow-head{align-items:center;gap:var(--roxy-space-sm);display:flex}.glyph{font-size:var(--roxy-text-xl);color:var(--roxy-accent-ink);line-height:1}.glyph.design{color:var(--roxy-danger-fg)}.glyph.personality{color:var(--roxy-fg)}.name{font-weight:var(--roxy-weight-bold)}.layer,.ctb{color:var(--roxy-muted);font-size:var(--roxy-text-xs)}.ctb{font-variant-numeric:tabular-nums}.labels{font-size:var(--roxy-text-sm)}.note{color:var(--roxy-warning-fg);font-size:var(--roxy-text-xs)}@container (width<=28rem){.grid{grid-template-columns:minmax(0,1fr)}}.group+.group{margin-block-start:var(--roxy-space-md)}.group-head{font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-bold)}.group-note,.footnote{color:var(--roxy-muted);font-size:var(--roxy-text-xs)}.group-note{margin-block-end:var(--roxy-space-sm)}.facets{gap:var(--roxy-space-xs);margin:0;display:grid}.facets dd{margin:0}`],w=d([ie("roxy-hd-variables")],w);function de(o){switch(o){case"Top left":return 0;case"Top right":return 1;case"Bottom left":return 2;case"Bottom right":return 3;default:return 99}}export{w as RoxyHdVariables};
