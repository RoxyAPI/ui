var le=Object.defineProperty;var ce=Object.getOwnPropertyDescriptor;var a=(r,t,e,o)=>{for(var n=o>1?void 0:o?ce(t,e):t,i=r.length-1,d;i>=0;i--)(d=r[i])&&(n=(o?d(t,e,n):d(n))||n);return o&&n&&le(t,e,n),n};import{css as Le,html as b,nothing as $e}from"lit";import{property as Ae}from"lit/decorators.js";var K=[{endpoint:"tarot/cards",method:"GET"}];import{html as c,nothing as y}from"lit";import{property as p,state as h}from"lit/decorators.js";import{ifDefined as x}from"lit/directives/if-defined.js";var z=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function P(r){if(r.lang)return r.lang;if(typeof document>"u")return;let t=r.closest?.("[lang]")?.getAttribute("lang");return t||document.documentElement.lang||void 0}var pe={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function O(r){let t=r.toLowerCase();return z.find(e=>e.toLowerCase()===t)}function U(r){let t=P(r);if(!t)return;let e=O(t);if(e)return e;let o=t.toLowerCase().split("-"),n=o[0];if(n==="zh"){let i=o.find(d=>d==="hans"||d==="hant")??pe[o[1]??""];return i?O(`zh-${i}`):void 0}return O(n)}import{LitElement as me}from"lit";var I=`/**
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
`;var _="roxy-ui-tokens";function j(){if(typeof document>"u")return null;let r=document.getElementById(_);if(r)return r;let t=document.createElement("style");return t.id=_,t.textContent=I,document.head.prepend(t),t}function N(r){return r.toLowerCase().replace(/[\s_-]+/g," ").trim()}function F(r){return r?r.charAt(0).toUpperCase()+r.slice(1).toLowerCase():""}function q(r){return r.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/([a-z])([0-9])/g,"$1 $2").replace(/^\w/,t=>t.toUpperCase())}var M="__ROXY_UI_I18N__";function C(){let r=globalThis,t=r[M];if(t)return t;let e={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return r[M]=e,e}function he(r,t){return t?r.replace(/\{\{(\w+)\}\}/g,(e,o)=>o in t?String(t[o]??""):e):r}function H(r,t,e){return he(ye(r,t)??t,e)}function ye(r,t){if(!r)return;let{catalogs:e}=C(),o=r.toLowerCase();return(e[o]??e[o.split("-")[0]])?.[N(t)]}function ue(r){if(!r)return;let{fieldLabels:t}=C(),e=r.toLowerCase();return t[e]??t[e.split("-")[0]]}function B(r,t,e){return ue(r)?.enums[`${t}.${e}`]}function Y(r){let{listeners:t}=C();return t.add(r),()=>{t.delete(r)}}var S=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){this.unsubscribe=Y(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var w=class extends me{constructor(){super();this.translator=(e,o)=>this.t(e,o);new S(this)}connectedCallback(){super.connectedCallback(),j()}t(e,o){return H(this.effectiveLang(),e,o)}effectiveLang(){return P(this)}};import{css as fe}from"lit";import{css as ge}from"lit";var D=ge`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var xe=fe`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,k=[xe,D];var be="__cols",ve="__rows";function Se(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function E(r){if(Array.isArray(r)){let i=!1,d=r.map(l=>{let u=E(l);return u!==l&&(i=!0),u});return i?d:r}if(!Se(r))return r;let t=r[be],e=r[ve];if(Array.isArray(t)&&Array.isArray(e)&&Object.keys(r).length===2)return e.map(i=>{let d={};return t.forEach((l,u)=>{d[l]=E(i[u])}),d});let o=!1,n={};for(let[i,d]of Object.entries(r)){let l=E(d);l!==d&&(o=!0),n[i]=l}return o?n:r}function V(r){return E(r)}function J(r,t){return r.find(e=>e.attrs&&Object.entries(e.attrs).every(([o,n])=>t[o]===n))??r[0]}var we="pk_live_YOUR_KEY",W={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function X(r){if(r)return r===we?W.sample:r.startsWith("pk_")?void 0:W.secret}function Z(r,t,e={}){e.warn&&console.warn(t.message),r.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:t.reason,message:t.message},bubbles:!0,composed:!0}))}var Q="https://roxyapi.com/api/v2";async function ke(r){try{let t=await r.json();if(t?.error){let e=t.code==="validation_error"&&Array.isArray(t.issues)?t.issues.filter(o=>typeof o.path=="string"&&typeof o.message=="string").map(o=>({path:o.path,message:o.message})):null;return{message:t.error,issues:e?.length?e:null,worded:!0}}}catch{}return{message:`Request failed (${r.status})`,issues:null,worded:!1}}var ee={fromAttribute:r=>{if(r!=null){try{let t=JSON.parse(r);if(t&&typeof t=="object"&&!Array.isArray(t))return t}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},f=class extends Error{constructor(e,o=null,n=!0){super(e);this.issues=o;this.worded=n}};function te(r){return r.submitUrl?void 0:X(r.publishableKey)}async function L(r,t,e){let o=te(r);if(o)throw new f(o.message);let n=r.submitUrl?await fetch(r.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Ee(t,r.submitContext),signal:e}):await Te(r,t,e);if(!n.ok){let i=await ke(n);throw new f(i.message,i.issues,i.worded)}return await n.json()}function Ee(r,t){return JSON.stringify(t?{...r,context:t}:r)}function Te(r,t,e){let o=new URL(`${r.baseUrl??Q}${t.path}`,document.baseURI);for(let[i,d]of Object.entries(t.query??{}))d!=null&&o.searchParams.set(i,String(d));let n={Accept:"application/json"};return r.publishableKey&&(n["X-API-Key"]=r.publishableKey),t.body!=null&&(n["Content-Type"]="application/json"),fetch(o,{method:t.method??"GET",headers:n,body:t.body!=null?JSON.stringify(t.body):void 0,signal:e})}var T=class{constructor(t){this.baseUrl=Q;this.worded=!0;this.host=t,t.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(t){this.worded=!0;let e=te(this);if(e){this.host.error=e.message,Z(this.host,e);return}this.abort?.abort();let o=new AbortController;this.abort=o,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let n=await L(this,t,o.signal);if(o.signal.aborted)return;this.host.data=n}catch(n){if(o.signal.aborted||n?.name==="AbortError")return;n instanceof f&&(this.host.issues=n.issues),this.worded=n instanceof f&&n.worded,this.host.error=n instanceof Error?n.message:String(n)}finally{this.abort===o&&(this.abort=void 0),o.signal.aborted||(this.host.loading=!1)}}};function re(r,t,e,o=[]){let n={...e},i=`/${r.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(v,m)=>{let de=n[m];return delete n[m],encodeURIComponent(String(de??""))}),d=new Set(o),l={},u={};for(let[v,m]of Object.entries(n))m===void 0||m===""||(t==="GET"||d.has(v)?l[v]=m:u[v]=m);return{path:i,method:t,query:l,body:t==="POST"?u:void 0}}import{css as Pe,html as $,nothing as A}from"lit";import{css as Re,html as Oe}from"lit";function oe(){return Oe`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var pt=Re`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var mt=Pe`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function ne(r,t,e){let o=r.filter(n=>!!n.body);return o.length===0?A:$`<section class="block" part="section readings"><h3>${e}</h3>${o.map((n,i)=>$`<details class="interp-card" part="reading" name="${t}" ?open="${i===0}"><summary><span class="interp-lead">${n.label}</span> ${oe()} ${n.aside?$`<span class="interp-aside"><small>${n.aside}</small></span>`:A}</summary><div class="interp-body"><p>${n.body}</p>${n.extra??A}</div></details>`)}</section>`}var Fe="roxy-data";function Ce(r){return r.nodeName==="SCRIPT"&&r.getAttribute("type")==="application/json"}var R=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){if(this.host.data!=null)return;let t=this.read();t!==void 0&&(this.host.data=t,this.host.requestUpdate())}read(){let t=this.findInlineScript();return t?this.parse(t.textContent):void 0}findInlineScript(){for(let t of Array.from(this.host.children))if(Ce(t)&&t.classList.contains(Fe))return t;return null}parse(t){if(t?.trim())try{return JSON.parse(t)}catch{return}}};var s=class extends w{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let e=this.lastRequest,o=this.listKey,n=this.listRows();if(!(!e||!o||!n)){this.moreLoading=!0,this.moreError=null;try{let i=await L(this.fetcher,{...e,query:{...e.query,offset:n.length}});if(this.lastRequest!==e)return;let d=i[o];this.data={...this.data,...i,[o]:[...n,...Array.isArray(d)?d:[]]}}catch(i){this.lastRequest===e&&(this.moreError=i instanceof Error?i.message:String(i))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=e=>{let o=this.selfFetch();if(!o)return;let n=e.detail;this.lastValues=n.values,this.sticky=!!n.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(n.values),this.fetchFresh(re(o.endpoint,o.method,n.values,n.queryKeys??[]))};new R(this),this.fetcher=new T(this)}static{this.styles=[k]}static{this.endpoints=[]}willUpdate(e){if(e.has("data")&&this.data!=null){let o=V(this.data);o!==this.data&&(this.data=o)}(e.has("publishableKey")||e.has("baseUrl")||e.has("submitUrl")||e.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let e=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:J(this.constructor.endpoints,this);return e&&{endpoint:e.endpoint,method:this.method??e.method}}render(){return c`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(e){try{return this.renderData(e)}catch(o){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,o),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:o},bubbles:!0,composed:!0})),customElements.get("roxy-data")?c`<roxy-data .data="${e}" lang="${x(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let e=this.hideSections.split(",").map(n=>n.trim().toLowerCase()).filter(n=>/^[a-z][a-z0-9-]*$/.test(n));if(e.length===0)return y;let o=e.map(n=>`[part~="${n}"],roxy-endpoint-form::part(${n}){display:none!important}`).join("");return c`<style>${o}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?c`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(e,o,n){return this.hideReadings?y:ne(e,o,this.t(n??"Reading"))}renderResult(e){let o=c`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(e)}`;return this.showAttribution()?c`${o}${this.renderAttribution()}`:o}renderWithForm(e){return c`${this.renderForm()}${e}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?y:this.renderErrorBanner(this.error):this.data==null?y:this.showAttribution()?c`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let e=this.listRows(),o=this.data?.total;return!this.lastRequest||!e||typeof o!="number"?y:e.length>=o?y:c`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?c`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:y}</div>`}listRows(){let e=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(e)?e:void 0}fetchFresh(e){return this.lastRequest=e,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(e)}load(e){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(e)}pickRow(e){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:e,bubbles:!0,composed:!0})),this.openRow(e.id)}openRow(e){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let o=this.openedRow??document.createElement(this.rowDetail.tag);o.publishableKey=this.publishableKey,o.baseUrl=this.baseUrl,o.submitUrl=this.submitUrl,o.submitContext=this.submitContext,o.hideReadings=this.hideReadings,o.hideSections=this.hideSections;let n=this.effectiveLang();n&&o.setAttribute("lang",n),this.openedRow=o,this.openedRowId=e,o.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(e))}`,method:"GET",query:{lang:U(this)}}).then(()=>o.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return c`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(y):this.renderEmpty()}renderForm(){let e=this.selfFetch();return c`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${e?.endpoint??""}" method="${e?.method??"POST"}" spec-url="${x(this.specUrl)}" publishable-key="${x(this.publishableKey)}" location-url="${x(this.locationUrl)}" submit-label="${x(this.submitLabel)}" lang="${x(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let e=sessionStorage.getItem(this.rememberKey());return e?JSON.parse(e):void 0}catch{return}}writeRemembered(e){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(e))}catch{}}renderEmpty(){return c`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return c`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(e){let o=!!this.selfFetch();if(o&&this.issues)return this.renderForm();let n=this.renderErrorBanner(e);return o?c`${n}${this.renderForm()}`:n}renderErrorBanner(e){return c`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(e)}</div>`}};a([p({attribute:!1})],s.prototype,"data",2),a([p({type:String,attribute:"data-endpoint"})],s.prototype,"endpoint",2),a([p({type:String})],s.prototype,"method",2),a([p({type:String,attribute:"publishable-key"})],s.prototype,"publishableKey",2),a([p({type:String,attribute:"base-url"})],s.prototype,"baseUrl",2),a([p({type:String,attribute:"spec-url"})],s.prototype,"specUrl",2),a([p({type:String,attribute:"submit-url"})],s.prototype,"submitUrl",2),a([p({attribute:"submit-context",converter:ee})],s.prototype,"submitContext",2),a([p({type:String,attribute:"location-url"})],s.prototype,"locationUrl",2),a([p({type:Boolean})],s.prototype,"remember",2),a([p({type:Boolean,attribute:"hide-readings",reflect:!0})],s.prototype,"hideReadings",2),a([p({type:String,attribute:"hide-sections",reflect:!0})],s.prototype,"hideSections",2),a([p({type:String,attribute:"submit-label"})],s.prototype,"submitLabel",2),a([p({type:String,attribute:"error-message"})],s.prototype,"errorMessage",2),a([p({type:String})],s.prototype,"attribution",2),a([h()],s.prototype,"loading",2),a([h()],s.prototype,"error",2),a([h()],s.prototype,"issues",2),a([h()],s.prototype,"selfFetched",2),a([h()],s.prototype,"editing",2),a([h()],s.prototype,"sticky",2),a([h()],s.prototype,"openedRow",2),a([h()],s.prototype,"openedRowId",2),a([h()],s.prototype,"moreLoading",2),a([h()],s.prototype,"moreError",2);var ie=r=>t=>{customElements.get(r)||customElements.define(r,t)};function G(r,t,e,o){return B(r,t,e)??o??q(e)}function ae(r,t){return G(r,"arcana",t,`${F(t)} Arcana`)}function se(r,t){return G(r,"suit",t,F(t))}var g=class extends s{constructor(){super(...arguments);this.heading="";this.rowDetail={tag:"roxy-tarot-card",path:"tarot/cards/{id}"};this.listKey="cards"}renderData(e){let o=e.cards??[];if(o.length===0)return this.renderEmpty();let n=this.heading||this.t("Tarot deck"),i=typeof e.total=="number"?e.total:o.length,d=this.effectiveLang();return b`<section class="wrap" part="card" aria-label="${n}"><header class="head" part="header"><h2>${n}</h2><span class="count">${i===1?this.t("1 card"):this.t("{{count}} cards",{count:i})}</span></header><ul class="grid" part="section cards">${o.map(l=>b`<li><button type="button" class="tile" aria-pressed="${this.openedRowId===l.id?"true":"false"}" @click="${()=>this.pickRow({id:l.id,name:l.name})}">${l.imageUrl?b`<img class="art" src="${l.imageUrl}" alt="${l.name??this.t("Tarot card")}" loading="lazy">`:b`<div class="art" aria-hidden="true"></div>`}<p class="name">${l.name}</p><p class="meta">${Ge(d,l)}</p></button></li>`)}</ul>${this.renderMore()} ${this.openedRow?b`<div class="detail" part="detail">${this.openedRow}</div>`:$e}</section>`}};g.endpoints=K,g.styles=[k,Le`.wrap{gap:var(--roxy-space-md);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,1fr);display:grid}h2,p{margin:0}.head{justify-content:space-between;align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;display:flex}.count{color:var(--roxy-muted);font-size:var(--roxy-text-sm)}.grid{gap:var(--roxy-space-md);grid-template-columns:repeat(auto-fill,minmax(min(100%,14ch),1fr));margin:0;padding:0;list-style:none;display:grid}.tile{gap:var(--roxy-space-xs);width:100%;padding:var(--roxy-space-xs);color:inherit;border-radius:var(--roxy-radius-md);text-align:start;cursor:pointer;transition:border-color var(--roxy-motion-duration) var(--roxy-motion-easing);background:0 0;border:1px solid #0000;display:grid}.tile[aria-pressed=true],.tile:hover{border-color:var(--roxy-accent)}.detail{margin-block-start:var(--roxy-space-md)}.art{aspect-ratio:2/3;border-radius:var(--roxy-radius-sm);object-fit:cover;background:var(--roxy-border);width:100%}.name{font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-bold)}.meta{color:var(--roxy-muted);font-size:var(--roxy-text-xs)}`],a([Ae({type:String,reflect:!0})],g.prototype,"heading",2),g=a([ie("roxy-tarot-catalog")],g);function Ge(r,t){let e=ae(r,t.arcana);return t.suit?`${e} · ${se(r,t.suit)}`:e}export{g as RoxyTarotCatalog};
