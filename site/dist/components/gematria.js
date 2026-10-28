var ut=Object.defineProperty;var mt=Object.getOwnPropertyDescriptor;var l=(o,t,e,r)=>{for(var n=r>1?void 0:r?mt(t,e):t,i=o.length-1,a;i>=0;i--)(a=o[i])&&(n=(r?a(t,e,n):a(n))||n);return r&&n&&ut(t,e,n),n};import{css as Nt,html as s,nothing as c}from"lit";import{ifDefined as It}from"lit/directives/if-defined.js";var N=[{endpoint:"kabbalah/gematria",method:"POST"}];import{html as p,nothing as g}from"lit";import{property as h,state as y}from"lit/decorators.js";import{ifDefined as w}from"lit/directives/if-defined.js";var I=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function C(o){if(o.lang)return o.lang;if(typeof document>"u")return;let t=o.closest?.("[lang]")?.getAttribute("lang");return t||document.documentElement.lang||void 0}var yt={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function P(o){let t=o.toLowerCase();return I.find(e=>e.toLowerCase()===t)}function K(o){let t=C(o);if(!t)return;let e=P(t);if(e)return e;let r=t.toLowerCase().split("-"),n=r[0];if(n==="zh"){let i=r.find(a=>a==="hans"||a==="hant")??yt[r[1]??""];return i?P(`zh-${i}`):void 0}return P(n)}import{LitElement as xt}from"lit";var U=`/**
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
`;var _="roxy-ui-tokens";function D(){if(typeof document>"u")return null;let o=document.getElementById(_);if(o)return o;let t=document.createElement("style");return t.id=_,t.textContent=U,document.head.prepend(t),t}function j(o){return o.toLowerCase().replace(/[\s_-]+/g," ").trim()}function m(o){return o.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/([a-z])([0-9])/g,"$1 $2").replace(/^\w/,t=>t.toUpperCase())}var M="__ROXY_UI_I18N__";function L(){let o=globalThis,t=o[M];if(t)return t;let e={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return o[M]=e,e}function gt(o,t){return t?o.replace(/\{\{(\w+)\}\}/g,(e,r)=>r in t?String(t[r]??""):e):o}function V(o,t,e){return gt(ft(o,t)??t,e)}function ft(o,t){if(!o)return;let{catalogs:e}=L(),r=o.toLowerCase();return(e[r]??e[r.split("-")[0]])?.[j(t)]}function H(o){if(!o)return;let{fieldLabels:t}=L(),e=o.toLowerCase();return t[e]??t[e.split("-")[0]]}function q(o,t){return H(o)?.fields[t]}function B(o,t,e){return H(o)?.enums[`${t}.${e}`]}function Y(o){let{listeners:t}=L();return t.add(o),()=>{t.delete(o)}}var T=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){this.unsubscribe=Y(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var E=class extends xt{constructor(){super();this.translator=(e,r)=>this.t(e,r);new T(this)}connectedCallback(){super.connectedCallback(),D()}t(e,r){return V(this.effectiveLang(),e,r)}effectiveLang(){return C(this)}};import{css as vt}from"lit";import{css as bt}from"lit";var Z=bt`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var wt=vt`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,$=[wt,Z];var kt="__cols",St="__rows";function Tt(o){return typeof o=="object"&&o!==null&&!Array.isArray(o)}function F(o){if(Array.isArray(o)){let i=!1,a=o.map(u=>{let x=F(u);return x!==u&&(i=!0),x});return i?a:o}if(!Tt(o))return o;let t=o[kt],e=o[St];if(Array.isArray(t)&&Array.isArray(e)&&Object.keys(o).length===2)return e.map(i=>{let a={};return t.forEach((u,x)=>{a[u]=F(i[x])}),a});let r=!1,n={};for(let[i,a]of Object.entries(o)){let u=F(a);u!==a&&(r=!0),n[i]=u}return r?n:o}function W(o){return F(o)}function J(o,t){return o.find(e=>e.attrs&&Object.entries(e.attrs).every(([r,n])=>t[r]===n))??o[0]}var Et="pk_live_YOUR_KEY",X={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function Q(o){if(o)return o===Et?X.sample:o.startsWith("pk_")?void 0:X.secret}function tt(o,t,e={}){e.warn&&console.warn(t.message),o.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:t.reason,message:t.message},bubbles:!0,composed:!0}))}var et="https://roxyapi.com/api/v2";async function $t(o){try{let t=await o.json();if(t?.error){let e=t.code==="validation_error"&&Array.isArray(t.issues)?t.issues.filter(r=>typeof r.path=="string"&&typeof r.message=="string").map(r=>({path:r.path,message:r.message})):null;return{message:t.error,issues:e?.length?e:null,worded:!0}}}catch{}return{message:`Request failed (${o.status})`,issues:null,worded:!1}}var rt={fromAttribute:o=>{if(o!=null){try{let t=JSON.parse(o);if(t&&typeof t=="object"&&!Array.isArray(t))return t}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},v=class extends Error{constructor(e,r=null,n=!0){super(e);this.issues=r;this.worded=n}};function nt(o){return o.submitUrl?void 0:Q(o.publishableKey)}async function A(o,t,e){let r=nt(o);if(r)throw new v(r.message);let n=o.submitUrl?await fetch(o.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Ft(t,o.submitContext),signal:e}):await Ot(o,t,e);if(!n.ok){let i=await $t(n);throw new v(i.message,i.issues,i.worded)}return await n.json()}function Ft(o,t){return JSON.stringify(t?{...o,context:t}:o)}function Ot(o,t,e){let r=new URL(`${o.baseUrl??et}${t.path}`,document.baseURI);for(let[i,a]of Object.entries(t.query??{}))a!=null&&r.searchParams.set(i,String(a));let n={Accept:"application/json"};return o.publishableKey&&(n["X-API-Key"]=o.publishableKey),t.body!=null&&(n["Content-Type"]="application/json"),fetch(r,{method:t.method??"GET",headers:n,body:t.body!=null?JSON.stringify(t.body):void 0,signal:e})}var O=class{constructor(t){this.baseUrl=et;this.worded=!0;this.host=t,t.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(t){this.worded=!0;let e=nt(this);if(e){this.host.error=e.message,tt(this.host,e);return}this.abort?.abort();let r=new AbortController;this.abort=r,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let n=await A(this,t,r.signal);if(r.signal.aborted)return;this.host.data=n}catch(n){if(r.signal.aborted||n?.name==="AbortError")return;n instanceof v&&(this.host.issues=n.issues),this.worded=n instanceof v&&n.worded,this.host.error=n instanceof Error?n.message:String(n)}finally{this.abort===r&&(this.abort=void 0),r.signal.aborted||(this.host.loading=!1)}}};function ot(o,t,e,r=[]){let n={...e},i=`/${o.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(S,b)=>{let ht=n[b];return delete n[b],encodeURIComponent(String(ht??""))}),a=new Set(r),u={},x={};for(let[S,b]of Object.entries(n))b===void 0||b===""||(t==="GET"||a.has(S)?u[S]=b:x[S]=b);return{path:i,method:t,query:u,body:t==="POST"?x:void 0}}import{css as Ct,html as G,nothing as z}from"lit";import{css as Rt,html as Pt}from"lit";function it(){return Pt`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var me=Rt`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var xe=Ct`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function at(o,t,e){let r=o.filter(n=>!!n.body);return r.length===0?z:G`<section class="block" part="section readings"><h3>${e}</h3>${r.map((n,i)=>G`<details class="interp-card" part="reading" name="${t}" ?open="${i===0}"><summary><span class="interp-lead">${n.label}</span> ${it()} ${n.aside?G`<span class="interp-aside"><small>${n.aside}</small></span>`:z}</summary><div class="interp-body"><p>${n.body}</p>${n.extra??z}</div></details>`)}</section>`}var Lt="roxy-data";function At(o){return o.nodeName==="SCRIPT"&&o.getAttribute("type")==="application/json"}var R=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){if(this.host.data!=null)return;let t=this.read();t!==void 0&&(this.host.data=t,this.host.requestUpdate())}read(){let t=this.findInlineScript();return t?this.parse(t.textContent):void 0}findInlineScript(){for(let t of Array.from(this.host.children))if(At(t)&&t.classList.contains(Lt))return t;return null}parse(t){if(t?.trim())try{return JSON.parse(t)}catch{return}}};var d=class extends E{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let e=this.lastRequest,r=this.listKey,n=this.listRows();if(!(!e||!r||!n)){this.moreLoading=!0,this.moreError=null;try{let i=await A(this.fetcher,{...e,query:{...e.query,offset:n.length}});if(this.lastRequest!==e)return;let a=i[r];this.data={...this.data,...i,[r]:[...n,...Array.isArray(a)?a:[]]}}catch(i){this.lastRequest===e&&(this.moreError=i instanceof Error?i.message:String(i))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=e=>{let r=this.selfFetch();if(!r)return;let n=e.detail;this.lastValues=n.values,this.sticky=!!n.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(n.values),this.fetchFresh(ot(r.endpoint,r.method,n.values,n.queryKeys??[]))};new R(this),this.fetcher=new O(this)}static{this.styles=[$]}static{this.endpoints=[]}willUpdate(e){if(e.has("data")&&this.data!=null){let r=W(this.data);r!==this.data&&(this.data=r)}(e.has("publishableKey")||e.has("baseUrl")||e.has("submitUrl")||e.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let e=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:J(this.constructor.endpoints,this);return e&&{endpoint:e.endpoint,method:this.method??e.method}}render(){return p`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(e){try{return this.renderData(e)}catch(r){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,r),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:r},bubbles:!0,composed:!0})),customElements.get("roxy-data")?p`<roxy-data .data="${e}" lang="${w(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let e=this.hideSections.split(",").map(n=>n.trim().toLowerCase()).filter(n=>/^[a-z][a-z0-9-]*$/.test(n));if(e.length===0)return g;let r=e.map(n=>`[part~="${n}"],roxy-endpoint-form::part(${n}){display:none!important}`).join("");return p`<style>${r}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?p`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(e,r,n){return this.hideReadings?g:at(e,r,this.t(n??"Reading"))}renderResult(e){let r=p`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(e)}`;return this.showAttribution()?p`${r}${this.renderAttribution()}`:r}renderWithForm(e){return p`${this.renderForm()}${e}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?g:this.renderErrorBanner(this.error):this.data==null?g:this.showAttribution()?p`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let e=this.listRows(),r=this.data?.total;return!this.lastRequest||!e||typeof r!="number"?g:e.length>=r?g:p`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?p`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:g}</div>`}listRows(){let e=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(e)?e:void 0}fetchFresh(e){return this.lastRequest=e,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(e)}load(e){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(e)}pickRow(e){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:e,bubbles:!0,composed:!0})),this.openRow(e.id)}openRow(e){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let r=this.openedRow??document.createElement(this.rowDetail.tag);r.publishableKey=this.publishableKey,r.baseUrl=this.baseUrl,r.submitUrl=this.submitUrl,r.submitContext=this.submitContext,r.hideReadings=this.hideReadings,r.hideSections=this.hideSections;let n=this.effectiveLang();n&&r.setAttribute("lang",n),this.openedRow=r,this.openedRowId=e,r.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(e))}`,method:"GET",query:{lang:K(this)}}).then(()=>r.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return p`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(g):this.renderEmpty()}renderForm(){let e=this.selfFetch();return p`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${e?.endpoint??""}" method="${e?.method??"POST"}" spec-url="${w(this.specUrl)}" publishable-key="${w(this.publishableKey)}" location-url="${w(this.locationUrl)}" submit-label="${w(this.submitLabel)}" lang="${w(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let e=sessionStorage.getItem(this.rememberKey());return e?JSON.parse(e):void 0}catch{return}}writeRemembered(e){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(e))}catch{}}renderEmpty(){return p`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return p`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(e){let r=!!this.selfFetch();if(r&&this.issues)return this.renderForm();let n=this.renderErrorBanner(e);return r?p`${n}${this.renderForm()}`:n}renderErrorBanner(e){return p`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(e)}</div>`}};l([h({attribute:!1})],d.prototype,"data",2),l([h({type:String,attribute:"data-endpoint"})],d.prototype,"endpoint",2),l([h({type:String})],d.prototype,"method",2),l([h({type:String,attribute:"publishable-key"})],d.prototype,"publishableKey",2),l([h({type:String,attribute:"base-url"})],d.prototype,"baseUrl",2),l([h({type:String,attribute:"spec-url"})],d.prototype,"specUrl",2),l([h({type:String,attribute:"submit-url"})],d.prototype,"submitUrl",2),l([h({attribute:"submit-context",converter:rt})],d.prototype,"submitContext",2),l([h({type:String,attribute:"location-url"})],d.prototype,"locationUrl",2),l([h({type:Boolean})],d.prototype,"remember",2),l([h({type:Boolean,attribute:"hide-readings",reflect:!0})],d.prototype,"hideReadings",2),l([h({type:String,attribute:"hide-sections",reflect:!0})],d.prototype,"hideSections",2),l([h({type:String,attribute:"submit-label"})],d.prototype,"submitLabel",2),l([h({type:String,attribute:"error-message"})],d.prototype,"errorMessage",2),l([h({type:String})],d.prototype,"attribution",2),l([y()],d.prototype,"loading",2),l([y()],d.prototype,"error",2),l([y()],d.prototype,"issues",2),l([y()],d.prototype,"selfFetched",2),l([y()],d.prototype,"editing",2),l([y()],d.prototype,"sticky",2),l([y()],d.prototype,"openedRow",2),l([y()],d.prototype,"openedRowId",2),l([y()],d.prototype,"moreLoading",2),l([y()],d.prototype,"moreError",2);var st=o=>t=>{customElements.get(o)||customElements.define(o,t)};var dt=new Map;function Gt(o){if(!o)return["en"];let t=dt.get(o);if(t)return[t,"en"];let e="en";try{e=Intl.getCanonicalLocales(o)[0]??"en"}catch{e="en"}return dt.set(o,e),[e,"en"]}function f(o,t){return typeof t!="number"||!Number.isFinite(t)?"":t.toLocaleString(Gt(o),{maximumFractionDigits:0})}function lt(o,t,e){return q(o,t)??e??m(t)}function ct(o,t,e,r){return B(o,t,e)??r??m(e)}import{css as zt}from"lit";var pt=zt`@container (width<=30rem){table.stacked,table.stacked caption,table.stacked tbody,table.stacked tr,table.stacked td{width:100%;min-width:0;display:block}table.stacked thead{display:none}table.stacked tr{border-bottom:1px solid var(--roxy-border);padding-block:var(--roxy-space-sm)}table.stacked tr:last-child{border-bottom:0}table.stacked td{padding:calc(var(--roxy-space-unit) / 2) 0;white-space:normal;border:0}table.stacked td:empty{display:none}table.stacked td[data-label]:before{content:attr(data-label) " ";color:var(--roxy-muted)}}`;var k=class extends d{renderData(t){let e=this.effectiveLang(),r=t.chosen,n=t.input?.text??t.input?.textHebrew??"";return s`<article class="card" part="card" aria-labelledby="gematria-title"><header class="head" part="header"><h2 id="gematria-title">${n?`${this.t("Gematria")} · ${n}`:this.t("Gematria")}</h2>${r?.hebrew?s`<span class="hebrew" lang="he" dir="rtl">${r.hebrew}</span>`:c} ${this.chosenForm(t)?.romanization?s`<span class="roman">${this.chosenForm(t)?.romanization}</span>`:c} ${r?.rule?s`<p class="rule">${r.rule}</p>`:c}</header>${this.renderLetters(e,this.chosenForm(t)?.letters)} ${this.renderValues(e,t.values,this.t("Cipher values"))} ${this.renderForms(e,t)} ${this.renderTransformations(e,t.transformations)} ${this.renderLatin(e,t.latinValues)} ${this.renderMatches(e,t.matches)} ${this.renderConventions(t.conventions)}</article>`}chosenForm(t){let e=t.hebrewForms??[];return e.find(r=>r.hebrew===t.chosen?.hebrew)??e[0]}renderLetters(t,e){let r=e??[];return r.length===0?c:s`<section part="section letters"><h3>${this.t("Letters")}</h3><div class="letters" part="chart" dir="rtl">${r.map(n=>s`<div class="${`letter${n.isFinal?" is-final":""}`}" dir="ltr" title="${It(n.isFinal?this.t("Final form"):void 0)}"><span class="glyph" lang="he">${n.glyph??""}</span> <span class="name">${n.name??""}</span> <span class="num">${f(t,n.value)}</span></div>`)}</div>${r.some(n=>n.isFinal)?s`<p class="legend" part="legend"><span class="swatch"></span>${this.t("Final form")}</p>`:c}</section>`}renderValues(t,e,r){let n=(e??[]).filter(a=>typeof a.value=="number");if(n.length===0)return c;let i=n.some(a=>(a.alternateValues??[]).length>0);return s`<section part="section values"><h3>${r}</h3><div class="scroll" tabindex="0" role="region" aria-label="${r}"><table><thead><tr><th>${this.t("Cipher")}</th><th>${this.t("Value")}</th>${i?s`<th>${this.t("Also published")}</th>`:c}</tr></thead><tbody>${n.map(a=>s`<tr><td>${m(a.id??"")}</td><td class="num">${f(t,a.value)}</td>${i?s`<td class="num">${(a.alternateValues??[]).map(u=>f(t,u)).join(", ")}</td>`:c}</tr>`)}</tbody></table></div>${this.renderProvenance(n)}</section>`}renderProvenance(t){let e=new Map;for(let r of t)r.tradition&&!e.has(r.tradition)&&e.set(r.tradition,r.source);return e.size===0?c:s`<p class="provenance"><span class="roxy-label">${this.t("Tradition")}</span> ${[...e].map(([r,n],i)=>s`${i>0?" · ":""}${m(r)}${n?s`<a class="src" href="${n}" target="_blank" rel="noopener noreferrer">${this.t("Source")}</a>`:c}`)}</p>`}renderForms(t,e){let r=e.hebrewForms??[];return r.length<2?c:s`<section part="section spellings"><h3>${this.t("Spellings")}</h3><ul class="forms">${r.map(n=>s`<li class="form"><div><span class="hebrew" lang="he" dir="rtl">${n.hebrew??""}</span> ${n.hebrew===e.chosen?.hebrew?s`<span class="chosen roxy-chip" data-tone="success">${this.t("Chosen")}</span>`:c}</div><span class="roman">${n.romanization??""}</span> ${n.rule?s`<p class="rule">${n.rule}</p>`:c} ${this.renderFormTotals(t,n)}</li>`)}</ul></section>`}renderFormTotals(t,e){let r=(e.values??[]).find(n=>typeof n.value=="number");return r?s`<p class="rule"><span class="roxy-label">${m(r.id??"")}</span> ${f(t,r.value)}</p>`:c}renderTransformations(t,e){let r=e??[];return r.length===0?c:s`<section part="section substitutions"><h3>${this.t("Substitutions")}</h3><div class="scroll" tabindex="0" role="region" aria-label="${this.t("Substitutions")}"><table><thead><tr><th>${this.t("Cipher")}</th><th>${this.t("Output")}</th><th>${this.t("Value")}</th></tr></thead><tbody>${r.map(n=>s`<tr><td>${m(n.id??"")}</td><td>${n.output?s`<span lang="he" dir="rtl">${n.output}</span>`:c} ${n.outputRomanization?s`<span class="roman">${n.outputRomanization}</span>`:c}</td><td class="num">${f(t,n.value)}</td></tr>`)}</tbody></table></div></section>`}renderLatin(t,e){let r=e??[];return r.length===0?c:s`<section part="section latin-ciphers"><h3>${this.t("Latin ciphers")}</h3><div class="scroll" tabindex="0" role="region" aria-label="${this.t("Latin ciphers")}"><table class="stacked"><thead><tr><th>${this.t("Cipher")}</th><th>${this.t("Value")}</th><th>${this.t("Tradition")}</th></tr></thead><tbody>${r.map(n=>s`<tr><td data-label="${this.t("Cipher")}">${m(n.id??"")} ${n.lineage?s`<p class="lineage">${n.lineage}</p>`:c}</td><td class="num" data-label="${this.t("Value")}">${f(t,n.value)}</td><td data-label="${this.t("Tradition")}">${m(n.tradition??"")}</td></tr>`)}</tbody></table></div></section>`}renderMatches(t,e){let r=e??[];return r.length===0?c:s`<section part="section matches"><h3>${this.t("Equal values")}</h3><div class="scroll" tabindex="0" role="region" aria-label="${this.t("Equal values")}"><table class="stacked"><thead><tr><th>${this.t("Word")}</th><th>${this.t("Meaning")}</th><th>${this.t("Value")}</th></tr></thead><tbody>${r.map(n=>s`<tr><td data-label="${this.t("Word")}"><span lang="he" dir="rtl">${n.hebrew??""}</span> <span class="roman">${n.romanization??""}</span></td><td data-label="${this.t("Meaning")}">${n.meaning??""} ${n.note&&!this.hideReadings?s`<p class="match-note" part="reading">${n.note}</p>`:c}</td><td class="num" data-label="${this.t("Value")}">${f(t,n.value)}</td></tr>`)}</tbody></table></div></section>`}renderConventions(t){let e=this.effectiveLang(),r=[];for(let n of["transliteration","misparGadol"]){let i=t?.[n];i&&r.push([lt(e,n),ct(e,n,i)])}return r.length===0?c:s`<p class="provenance">${r.map(([n,i],a)=>s`${a>0?" · ":""}<span class="roxy-label">${n}</span>${i}`)}</p>`}};k.endpoints=N,k.styles=[$,pt,Nt`.card{gap:var(--roxy-space-md);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,1fr);display:grid}h2,h3,p{margin:0}section>h3{margin-block-end:var(--roxy-space-sm)}.head{justify-items:start;gap:calc(var(--roxy-space-unit) / 2);min-width:0;display:grid}.hebrew{font-size:calc(var(--roxy-text-xl) * 1.3);font-weight:var(--roxy-weight-bold);line-height:1.4}.roman{color:var(--roxy-secondary);font-size:var(--roxy-text-sm)}.rule{color:var(--roxy-muted);font-size:var(--roxy-text-xs)}.provenance .roxy-label,.rule .roxy-label{font-size:inherit;margin-inline-end:var(--roxy-space-xs)}.src{margin-inline-start:var(--roxy-space-xs)}.letters{gap:var(--roxy-space-xs);flex-wrap:wrap;display:flex}.letter{justify-items:center;gap:calc(var(--roxy-space-unit) / 2);min-inline-size:5ch;padding:var(--roxy-space-xs) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);display:grid}.letter .glyph{font-size:var(--roxy-text-lg);line-height:1.3}.letter .name{color:var(--roxy-secondary);font-size:var(--roxy-text-xs)}.letter .num{font-size:var(--roxy-text-xs);font-weight:var(--roxy-weight-bold);font-variant-numeric:tabular-nums}.letter.is-final{border-color:var(--roxy-accent)}.legend{color:var(--roxy-muted);font-size:var(--roxy-text-xs);margin-block-start:var(--roxy-space-sm)}.legend .swatch{block-size:.6lh;inline-size:.6lh;border:1px solid var(--roxy-accent);border-radius:var(--roxy-radius-sm);vertical-align:middle;margin-inline-end:var(--roxy-space-xs);display:inline-block}.scroll{min-width:0;overflow-x:auto}table{width:100%}th,td.num{white-space:nowrap}.provenance{color:var(--roxy-muted);font-size:var(--roxy-text-xs);margin-block-start:var(--roxy-space-sm)}.lineage,.match-note{color:var(--roxy-secondary);font-size:var(--roxy-text-xs);white-space:normal;margin-block-start:calc(var(--roxy-space-unit) / 2)}a{color:var(--roxy-accent-ink)}.forms{gap:var(--roxy-space-md);margin:0;padding:0;list-style:none;display:grid}.form{gap:var(--roxy-space-xs);min-width:0;border-block-start:1px solid var(--roxy-border);padding-block-start:var(--roxy-space-sm);display:grid}.form:first-child{border-block-start:0;padding-block-start:0}`],k=l([st("roxy-gematria")],k);export{k as RoxyGematria};
