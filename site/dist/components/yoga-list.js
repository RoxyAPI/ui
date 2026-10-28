var fe=Object.defineProperty;var xe=Object.getOwnPropertyDescriptor;var s=(r,t,e,n)=>{for(var o=n>1?void 0:n?xe(t,e):t,i=r.length-1,a;i>=0;i--)(a=r[i])&&(o=(n?a(t,e,o):a(o))||o);return n&&o&&fe(t,e,o),o};import{css as Ke,html as l,nothing as m}from"lit";import{state as je}from"lit/decorators.js";var N=[{endpoint:"vedic-astrology/yoga",method:"GET"},{endpoint:"vedic-astrology/yoga/detect",method:"POST"},{endpoint:"vedic-astrology/yoga/{id}",method:"GET"}];import{html as p,nothing as b}from"lit";import{property as h,state as x}from"lit/decorators.js";import{ifDefined as k}from"lit/directives/if-defined.js";var U=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function A(r){if(r.lang)return r.lang;if(typeof document>"u")return;let t=r.closest?.("[lang]")?.getAttribute("lang");return t||document.documentElement.lang||void 0}var be={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function P(r){let t=r.toLowerCase();return U.find(e=>e.toLowerCase()===t)}function z(r){let t=A(r);if(!t)return;let e=P(t);if(e)return e;let n=t.toLowerCase().split("-"),o=n[0];if(o==="zh"){let i=n.find(a=>a==="hans"||a==="hant")??be[n[1]??""];return i?P(`zh-${i}`):void 0}return P(o)}import{LitElement as Se}from"lit";var _=`/**
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
`;var Y="roxy-ui-tokens";function K(){if(typeof document>"u")return null;let r=document.getElementById(Y);if(r)return r;let t=document.createElement("style");return t.id=Y,t.textContent=_,document.head.prepend(t),t}function j(r){return r.toLowerCase().replace(/[\s_-]+/g," ").trim()}function T(r){return r?r.charAt(0).toUpperCase()+r.slice(1).toLowerCase():""}function B(r){return r.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/([a-z])([0-9])/g,"$1 $2").replace(/^\w/,t=>t.toUpperCase())}var M="__ROXY_UI_I18N__";function q(){let r=globalThis,t=r[M];if(t)return t;let e={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return r[M]=e,e}function ve(r,t){return t?r.replace(/\{\{(\w+)\}\}/g,(e,n)=>n in t?String(t[n]??""):e):r}function H(r,t,e){return ve(we(r,t)??t,e)}function we(r,t){if(!r)return;let{catalogs:e}=q(),n=r.toLowerCase();return(e[n]??e[n.split("-")[0]])?.[j(t)]}function V(r){let{listeners:t}=q();return t.add(r),()=>{t.delete(r)}}var E=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){this.unsubscribe=V(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var R=class extends Se{constructor(){super();this.translator=(e,n)=>this.t(e,n);new E(this)}connectedCallback(){super.connectedCallback(),K()}t(e,n){return H(this.effectiveLang(),e,n)}effectiveLang(){return A(this)}};import{css as Te}from"lit";import{css as ke}from"lit";var Z=ke`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var Ee=Te`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,C=[Ee,Z];var Re="__cols",Ce="__rows";function $e(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function $(r){if(Array.isArray(r)){let i=!1,a=r.map(u=>{let g=$(u);return g!==u&&(i=!0),g});return i?a:r}if(!$e(r))return r;let t=r[Re],e=r[Ce];if(Array.isArray(t)&&Array.isArray(e)&&Object.keys(r).length===2)return e.map(i=>{let a={};return t.forEach((u,g)=>{a[u]=$(i[g])}),a});let n=!1,o={};for(let[i,a]of Object.entries(r)){let u=$(a);u!==a&&(n=!0),o[i]=u}return n?o:r}function J(r){return $(r)}function W(r,t){return r.find(e=>e.attrs&&Object.entries(e.attrs).every(([n,o])=>t[n]===o))??r[0]}var Fe="pk_live_YOUR_KEY",X={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function Q(r){if(r)return r===Fe?X.sample:r.startsWith("pk_")?void 0:X.secret}function ee(r,t,e={}){e.warn&&console.warn(t.message),r.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:t.reason,message:t.message},bubbles:!0,composed:!0}))}var te="https://roxyapi.com/api/v2";async function Oe(r){try{let t=await r.json();if(t?.error){let e=t.code==="validation_error"&&Array.isArray(t.issues)?t.issues.filter(n=>typeof n.path=="string"&&typeof n.message=="string").map(n=>({path:n.path,message:n.message})):null;return{message:t.error,issues:e?.length?e:null,worded:!0}}}catch{}return{message:`Request failed (${r.status})`,issues:null,worded:!1}}var re={fromAttribute:r=>{if(r!=null){try{let t=JSON.parse(r);if(t&&typeof t=="object"&&!Array.isArray(t))return t}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},S=class extends Error{constructor(e,n=null,o=!0){super(e);this.issues=n;this.worded=o}};function ne(r){return r.submitUrl?void 0:Q(r.publishableKey)}async function L(r,t,e){let n=ne(r);if(n)throw new S(n.message);let o=r.submitUrl?await fetch(r.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Pe(t,r.submitContext),signal:e}):await Ae(r,t,e);if(!o.ok){let i=await Oe(o);throw new S(i.message,i.issues,i.worded)}return await o.json()}function Pe(r,t){return JSON.stringify(t?{...r,context:t}:r)}function Ae(r,t,e){let n=new URL(`${r.baseUrl??te}${t.path}`,document.baseURI);for(let[i,a]of Object.entries(t.query??{}))a!=null&&n.searchParams.set(i,String(a));let o={Accept:"application/json"};return r.publishableKey&&(o["X-API-Key"]=r.publishableKey),t.body!=null&&(o["Content-Type"]="application/json"),fetch(n,{method:t.method??"GET",headers:o,body:t.body!=null?JSON.stringify(t.body):void 0,signal:e})}var F=class{constructor(t){this.baseUrl=te;this.worded=!0;this.host=t,t.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(t){this.worded=!0;let e=ne(this);if(e){this.host.error=e.message,ee(this.host,e);return}this.abort?.abort();let n=new AbortController;this.abort=n,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let o=await L(this,t,n.signal);if(n.signal.aborted)return;this.host.data=o}catch(o){if(n.signal.aborted||o?.name==="AbortError")return;o instanceof S&&(this.host.issues=o.issues),this.worded=o instanceof S&&o.worded,this.host.error=o instanceof Error?o.message:String(o)}finally{this.abort===n&&(this.abort=void 0),n.signal.aborted||(this.host.loading=!1)}}};function oe(r,t,e,n=[]){let o={...e},i=`/${r.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(c,y)=>{let w=o[y];return delete o[y],encodeURIComponent(String(w??""))}),a=new Set(n),u={},g={};for(let[c,y]of Object.entries(o))y===void 0||y===""||(t==="GET"||a.has(c)?u[c]=y:g[c]=y);return{path:i,method:t,query:u,body:t==="POST"?g:void 0}}import{css as Ge,html as D,nothing as G}from"lit";import{css as Le,html as De}from"lit";function ie(){return De`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var St=Le`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var Rt=Ge`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function ae(r,t,e){let n=r.filter(o=>!!o.body);return n.length===0?G:D`<section class="block" part="section readings"><h3>${e}</h3>${n.map((o,i)=>D`<details class="interp-card" part="reading" name="${t}" ?open="${i===0}"><summary><span class="interp-lead">${o.label}</span> ${ie()} ${o.aside?D`<span class="interp-aside"><small>${o.aside}</small></span>`:G}</summary><div class="interp-body"><p>${o.body}</p>${o.extra??G}</div></details>`)}</section>`}var Ie="roxy-data";function Ne(r){return r.nodeName==="SCRIPT"&&r.getAttribute("type")==="application/json"}var O=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){if(this.host.data!=null)return;let t=this.read();t!==void 0&&(this.host.data=t,this.host.requestUpdate())}read(){let t=this.findInlineScript();return t?this.parse(t.textContent):void 0}findInlineScript(){for(let t of Array.from(this.host.children))if(Ne(t)&&t.classList.contains(Ie))return t;return null}parse(t){if(t?.trim())try{return JSON.parse(t)}catch{return}}};var d=class extends R{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let e=this.lastRequest,n=this.listKey,o=this.listRows();if(!(!e||!n||!o)){this.moreLoading=!0,this.moreError=null;try{let i=await L(this.fetcher,{...e,query:{...e.query,offset:o.length}});if(this.lastRequest!==e)return;let a=i[n];this.data={...this.data,...i,[n]:[...o,...Array.isArray(a)?a:[]]}}catch(i){this.lastRequest===e&&(this.moreError=i instanceof Error?i.message:String(i))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=e=>{let n=this.selfFetch();if(!n)return;let o=e.detail;this.lastValues=o.values,this.sticky=!!o.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(o.values),this.fetchFresh(oe(n.endpoint,n.method,o.values,o.queryKeys??[]))};new O(this),this.fetcher=new F(this)}static{this.styles=[C]}static{this.endpoints=[]}willUpdate(e){if(e.has("data")&&this.data!=null){let n=J(this.data);n!==this.data&&(this.data=n)}(e.has("publishableKey")||e.has("baseUrl")||e.has("submitUrl")||e.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let e=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:W(this.constructor.endpoints,this);return e&&{endpoint:e.endpoint,method:this.method??e.method}}render(){return p`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(e){try{return this.renderData(e)}catch(n){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,n),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:n},bubbles:!0,composed:!0})),customElements.get("roxy-data")?p`<roxy-data .data="${e}" lang="${k(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let e=this.hideSections.split(",").map(o=>o.trim().toLowerCase()).filter(o=>/^[a-z][a-z0-9-]*$/.test(o));if(e.length===0)return b;let n=e.map(o=>`[part~="${o}"],roxy-endpoint-form::part(${o}){display:none!important}`).join("");return p`<style>${n}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?p`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(e,n,o){return this.hideReadings?b:ae(e,n,this.t(o??"Reading"))}renderResult(e){let n=p`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(e)}`;return this.showAttribution()?p`${n}${this.renderAttribution()}`:n}renderWithForm(e){return p`${this.renderForm()}${e}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?b:this.renderErrorBanner(this.error):this.data==null?b:this.showAttribution()?p`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let e=this.listRows(),n=this.data?.total;return!this.lastRequest||!e||typeof n!="number"?b:e.length>=n?b:p`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?p`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:b}</div>`}listRows(){let e=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(e)?e:void 0}fetchFresh(e){return this.lastRequest=e,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(e)}load(e){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(e)}pickRow(e){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:e,bubbles:!0,composed:!0})),this.openRow(e.id)}openRow(e){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let n=this.openedRow??document.createElement(this.rowDetail.tag);n.publishableKey=this.publishableKey,n.baseUrl=this.baseUrl,n.submitUrl=this.submitUrl,n.submitContext=this.submitContext,n.hideReadings=this.hideReadings,n.hideSections=this.hideSections;let o=this.effectiveLang();o&&n.setAttribute("lang",o),this.openedRow=n,this.openedRowId=e,n.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(e))}`,method:"GET",query:{lang:z(this)}}).then(()=>n.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return p`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(b):this.renderEmpty()}renderForm(){let e=this.selfFetch();return p`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${e?.endpoint??""}" method="${e?.method??"POST"}" spec-url="${k(this.specUrl)}" publishable-key="${k(this.publishableKey)}" location-url="${k(this.locationUrl)}" submit-label="${k(this.submitLabel)}" lang="${k(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let e=sessionStorage.getItem(this.rememberKey());return e?JSON.parse(e):void 0}catch{return}}writeRemembered(e){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(e))}catch{}}renderEmpty(){return p`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return p`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(e){let n=!!this.selfFetch();if(n&&this.issues)return this.renderForm();let o=this.renderErrorBanner(e);return n?p`${o}${this.renderForm()}`:o}renderErrorBanner(e){return p`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(e)}</div>`}};s([h({attribute:!1})],d.prototype,"data",2),s([h({type:String,attribute:"data-endpoint"})],d.prototype,"endpoint",2),s([h({type:String})],d.prototype,"method",2),s([h({type:String,attribute:"publishable-key"})],d.prototype,"publishableKey",2),s([h({type:String,attribute:"base-url"})],d.prototype,"baseUrl",2),s([h({type:String,attribute:"spec-url"})],d.prototype,"specUrl",2),s([h({type:String,attribute:"submit-url"})],d.prototype,"submitUrl",2),s([h({attribute:"submit-context",converter:re})],d.prototype,"submitContext",2),s([h({type:String,attribute:"location-url"})],d.prototype,"locationUrl",2),s([h({type:Boolean})],d.prototype,"remember",2),s([h({type:Boolean,attribute:"hide-readings",reflect:!0})],d.prototype,"hideReadings",2),s([h({type:String,attribute:"hide-sections",reflect:!0})],d.prototype,"hideSections",2),s([h({type:String,attribute:"submit-label"})],d.prototype,"submitLabel",2),s([h({type:String,attribute:"error-message"})],d.prototype,"errorMessage",2),s([h({type:String})],d.prototype,"attribution",2),s([x()],d.prototype,"loading",2),s([x()],d.prototype,"error",2),s([x()],d.prototype,"issues",2),s([x()],d.prototype,"selfFetched",2),s([x()],d.prototype,"editing",2),s([x()],d.prototype,"sticky",2),s([x()],d.prototype,"openedRow",2),s([x()],d.prototype,"openedRowId",2),s([x()],d.prototype,"moreLoading",2),s([x()],d.prototype,"moreError",2);var se=r=>t=>{customElements.get(r)||customElements.define(r,t)};import{css as _e,html as Ye,nothing as ce}from"lit";var de=new Map;function Ue(r){if(!r)return["en"];let t=de.get(r);if(t)return[t,"en"];let e="en";try{e=Intl.getCanonicalLocales(r)[0]??"en"}catch{e="en"}return de.set(r,e),[e,"en"]}function I(r,t,e=1){return typeof t!="number"||!Number.isFinite(t)?"":t.toLocaleString(Ue(r),{maximumFractionDigits:e})}var ze={"kp-newcomb":"KP Newcomb","kp-old":"KP Old",lahiri:"Lahiri",raman:"B.V. Raman",custom:"Custom"};function le(r,t,e){let n=typeof t=="string"?ze[t]??B(t):"",o=typeof e=="number"?`${I(r,e,2)}°`:"";return n&&o?`${n} (${o})`:n||o}var pe=_e`.roxy-frame{color:var(--roxy-muted);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-normal);margin:0}.roxy-frame .roxy-frame-deg{font-variant-numeric:tabular-nums}`;function he(r,t,e){if(!t?.ayanamsa)return ce;let n=le(r,t.ayanamsa);if(!n)return ce;let o=typeof t.ayanamsaDegrees=="number"?I(r,t.ayanamsaDegrees,4):void 0;return Ye`<p class="roxy-frame">${o===void 0?e("Sidereal frame: {{frame}}",{frame:n}):e("Sidereal frame: {{frame}}, {{degrees}}° subtracted",{frame:n,degrees:o})}</p>`}function ue(r){return r.suppressedBy||void 0}var ye=["classical","asraya","dala","akriti","sankhya"];function me(r){let t=ye.indexOf(r.family);return t===-1?ye.length:t}var Be=[{id:"present",source:"Present",open:!0,noteSource:"Every classical condition is satisfied by this chart."},{id:"outranked",source:"Outranked",open:!0,noteSource:"The rule matched, but a stronger family silences it under the classical precedence norms. Each card names the family that took precedence."},{id:"absent",source:"Not present",open:!1,noteSource:"At least one classical condition fails. Read the evidence for which."}],Me={Positive:"success",Negative:"danger",Both:"warning"},v=class extends d{constructor(){super(...arguments);this.filter="";this.handleInput=e=>{this.filter=e.target.value}}verdictOf(e){return e.present?"present":ue(e)?"outranked":"absent"}renderVerdictGroup(e,n){if(!n.length)return m;let o=[...n].sort((i,a)=>me(i)-me(a));return l`<details class="group" part="section verdict" ?open="${e.open||!!this.filter}"><summary class="group-summary"><span class="group-label">${this.t(e.source)}</span> <span class="group-count">${n.length}</span></summary><p class="group-note">${this.t(e.noteSource)}</p><div class="detail-grid">${o.map(i=>this.renderDetectCard(i))}</div></details>`}renderQualityChip(e){return l`<span class="quality-chip roxy-chip quality-${e}" data-tone="${Me[e]??m}">${e}</span>`}renderFamilyChip(e){return e.family?l`<span class="family-chip roxy-chip" title="${this.t("Classical family")}">${T(e.family)}</span>`:m}renderDetailCard(e){return l`<div class="detail-card"><p class="detail-name">${e.name} ${e.quality?this.renderQualityChip(e.quality):m} ${this.renderFamilyChip(e)}</p>${e.description&&!this.hideReadings?l`<p class="description">${e.description}</p>`:m} ${this.renderEffects(e.result)}</div>`}renderEffects(e){return!e||this.hideReadings?m:l`<details part="reading"><summary>${this.t("Effects")}</summary><div class="result-body">${e}</div></details>`}renderDetectCard(e){let n=e.present?void 0:ue(e),[o,i,a]=e.present?["is-present","Present","success"]:n?["is-outranked",`Outranked by ${T(n)}`,"warning"]:["is-absent","Not present",void 0];return l`<div class="detail-card ${e.present?"":n?"outranked":"absent"}"><p class="detail-name">${e.name} ${e.quality?this.renderQualityChip(e.quality):m} ${this.renderFamilyChip(e)} <span class="present-badge roxy-chip ${o}" data-tone="${a??m}">${i}</span></p>${e.description&&!this.hideReadings?l`<p class="description">${e.description}</p>`:m} ${e.present?this.renderEffects(e.result):m} ${e.evidence?l`<p class="evidence">${e.evidence}</p>`:m}</div>`}renderData(e){let n=this.filter.toLowerCase();if("description"in e&&typeof e.description=="string"){let o=e;return l`<div class="wrap" part="card">${this.renderDetailCard(o)}</div>`}if("yogas"in e&&Array.isArray(e.yogas)){let o=e.yogas;if(o.length>0&&"present"in o[0]){let c=o,y=n?c.filter(f=>f.name.toLowerCase().includes(n)):c,w=e.total??c.filter(f=>f.present).length;return l`<div class="wrap" part="card"><div class="head" part="header"><h2>${this.t("Detected yogas")}</h2><span class="count">${this.t("{{count}} of {{total}} present",{count:w,total:c.length})}</span></div>${he(this.effectiveLang(),e.frame,this.translator)}<div class="search-wrap"><input class="search" type="search" placeholder="${this.t("Filter yogas...")}" aria-label="${this.t("Filter detected yogas by name")}" .value="${this.filter}" @input="${this.handleInput}"></div><div class="group-stack" part="section verdicts" role="region" aria-live="polite" aria-label="${this.t("Detected yogas")}">${y.length>0?Be.map(f=>this.renderVerdictGroup(f,y.filter(ge=>this.verdictOf(ge)===f.id))):l`<p class="no-results">${this.t("No yogas match your search.")}</p>`}</div></div>`}if(o.length>0&&"description"in o[0]){let c=o,y=n?c.filter(f=>f.name.toLowerCase().includes(n)):c,w=e.total;return l`<div class="wrap" part="card"><div class="head" part="header"><h2>${this.t("Yoga catalog")}</h2>${w!==void 0?l`<span class="count">${this.t("{{count}} total",{count:w})}</span>`:m}</div><div class="search-wrap"><input class="search" type="search" placeholder="${this.t("Filter yogas...")}" aria-label="${this.t("Filter yoga list by name")}" .value="${this.filter}" @input="${this.handleInput}"></div><div class="detail-grid" part="section yogas" role="region" aria-live="polite" aria-label="${this.t("Yoga results")}">${y.length>0?y.map(f=>this.renderDetailCard(f)):l`<p class="no-results">${this.t("No yogas match your search.")}</p>`}</div></div>`}let a=o,u=n?a.filter(c=>c.name.toLowerCase().includes(n)):a,g=e.total;return l`<div class="wrap" part="card"><div class="head" part="header"><h2>${this.t("Yoga catalog")}</h2>${g!==void 0?l`<span class="count">${this.t("{{count}} total",{count:g})}</span>`:m}</div><div class="search-wrap"><input class="search" type="search" placeholder="${this.t("Filter yogas...")}" aria-label="${this.t("Filter yoga list by name")}" .value="${this.filter}" @input="${this.handleInput}"></div><div class="grid" part="section yogas" role="region" aria-live="polite" aria-label="${this.t("Yoga results")}">${u.length>0?u.map(c=>l`<div class="yoga-chip">${c.name}</div>`):l`<p class="no-results">${this.t("No yogas match your search.")}</p>`}</div></div>`}return l`<div class="roxy-empty" role="status">${this.t("No yoga data")}</div>`}};v.endpoints=N,v.styles=[C,pe,Ke`.wrap{gap:var(--roxy-space-md);padding:var(--roxy-space-md);grid-template-columns:minmax(0,1fr);display:grid}.head{justify-content:space-between;align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;display:flex}h2,p{margin:0}.count,.no-results{color:var(--roxy-muted);font-size:var(--roxy-text-sm)}.search{inline-size:100%;max-inline-size:32ch;font-size:var(--roxy-text-sm)}.search::placeholder{color:var(--roxy-muted)}.grid{gap:0 var(--roxy-space-md);grid-template-columns:repeat(auto-fill,minmax(min(100%,22ch),1fr));display:grid}.yoga-chip{padding-block:var(--roxy-space-xs);border-block-end:1px solid var(--roxy-border);font-size:var(--roxy-text-sm);overflow-wrap:anywhere}.detail-card{gap:var(--roxy-space-sm);display:grid}.detail-grid>.detail-card+.detail-card{border-block-start:1px solid var(--roxy-border);padding-block-start:var(--roxy-space-sm)}.detail-name{align-items:center;gap:var(--roxy-space-sm);font-weight:var(--roxy-weight-bold);flex-wrap:wrap;display:flex}.wrap>.detail-card .detail-name{font-size:var(--roxy-text-lg)}.family-chip{color:var(--roxy-fg)}.quality-chip,.present-badge{font-weight:var(--roxy-weight-bold)}.detail-card.absent,.detail-card.outranked{color:var(--roxy-secondary)}.group-stack,.group,.detail-grid{gap:var(--roxy-space-sm);display:grid}.group-stack{gap:var(--roxy-space-md)}.group-summary{align-items:baseline;gap:var(--roxy-space-sm);color:var(--roxy-secondary);list-style:none;display:flex}.group-summary:before,.detail-card details>summary:before{content:"+";font-size:var(--roxy-text-base);line-height:1}.group-summary:before{color:var(--roxy-accent-ink)}.group[open]>.group-summary:before,.detail-card details[open]>summary:before{content:"-"}.group-label{font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-bold)}.group-count{font-size:var(--roxy-text-xs);font-variant-numeric:tabular-nums}.group-note,.evidence{color:var(--roxy-muted);font-size:var(--roxy-text-xs)}.description{color:var(--roxy-muted);font-size:var(--roxy-text-sm)}.detail-card details{font-size:var(--roxy-text-sm)}.detail-card details>summary{align-items:center;gap:var(--roxy-space-xs);padding-block:var(--roxy-space-xs);color:var(--roxy-accent-ink);list-style:none;display:flex}.result-body{color:var(--roxy-fg);padding-block-start:var(--roxy-space-xs)}`],s([je()],v.prototype,"filter",2),v=s([se("roxy-yoga-list")],v);export{ye as FAMILY_ORDER,v as RoxyYogaList};
