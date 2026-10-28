var ie=Object.defineProperty;var ae=Object.getOwnPropertyDescriptor;var s=(r,e,t,o)=>{for(var n=o>1?void 0:o?ae(e,t):e,i=r.length-1,d;i>=0;i--)(d=r[i])&&(n=(o?d(e,t,n):d(n))||n);return o&&n&&ie(e,t,n),n};import{css as Re,html as g,nothing as O}from"lit";var L=[{endpoint:"vedic-astrology/kp/ruling-planets",method:"POST"}];import{html as l,nothing as y}from"lit";import{property as c,state as h}from"lit/decorators.js";import{ifDefined as x}from"lit/directives/if-defined.js";var G=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function F(r){if(r.lang)return r.lang;if(typeof document>"u")return;let e=r.closest?.("[lang]")?.getAttribute("lang");return e||document.documentElement.lang||void 0}var se={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function P(r){let e=r.toLowerCase();return G.find(t=>t.toLowerCase()===e)}function U(r){let e=F(r);if(!e)return;let t=P(e);if(t)return t;let o=e.toLowerCase().split("-"),n=o[0];if(n==="zh"){let i=o.find(d=>d==="hans"||d==="hant")??se[o[1]??""];return i?P(`zh-${i}`):void 0}return P(n)}import{LitElement as ce}from"lit";var _=`/**
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
`;var K="roxy-ui-tokens";function I(){if(typeof document>"u")return null;let r=document.getElementById(K);if(r)return r;let e=document.createElement("style");return e.id=K,e.textContent=_,document.head.prepend(e),e}function z(r){return r.toLowerCase().replace(/[\s_-]+/g," ").trim()}var j="__ROXY_UI_I18N__";function H(){let r=globalThis,e=r[j];if(e)return e;let t={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return r[j]=t,t}function de(r,e){return e?r.replace(/\{\{(\w+)\}\}/g,(t,o)=>o in e?String(e[o]??""):t):r}function N(r,e,t){return de(le(r,e)??e,t)}function le(r,e){if(!r)return;let{catalogs:t}=H(),o=r.toLowerCase();return(t[o]??t[o.split("-")[0]])?.[z(e)]}function q(r){let{listeners:e}=H();return e.add(r),()=>{e.delete(r)}}var S=class{constructor(e){this.host=e,e.addController(this)}hostConnected(){this.unsubscribe=q(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var w=class extends ce{constructor(){super();this.translator=(t,o)=>this.t(t,o);new S(this)}connectedCallback(){super.connectedCallback(),I()}t(t,o){return N(this.effectiveLang(),t,o)}effectiveLang(){return F(this)}};import{css as he}from"lit";import{css as pe}from"lit";var M=pe`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var ye=he`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,k=[ye,M];var ue="__cols",me="__rows";function ge(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function E(r){if(Array.isArray(r)){let i=!1,d=r.map(p=>{let u=E(p);return u!==p&&(i=!0),u});return i?d:r}if(!ge(r))return r;let e=r[ue],t=r[me];if(Array.isArray(e)&&Array.isArray(t)&&Object.keys(r).length===2)return t.map(i=>{let d={};return e.forEach((p,u)=>{d[p]=E(i[u])}),d});let o=!1,n={};for(let[i,d]of Object.entries(r)){let p=E(d);p!==d&&(o=!0),n[i]=p}return o?n:r}function B(r){return E(r)}function Y(r,e){return r.find(t=>t.attrs&&Object.entries(t.attrs).every(([o,n])=>e[o]===n))??r[0]}var fe="pk_live_YOUR_KEY",D={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function V(r){if(r)return r===fe?D.sample:r.startsWith("pk_")?void 0:D.secret}function J(r,e,t={}){t.warn&&console.warn(e.message),r.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:e.reason,message:e.message},bubbles:!0,composed:!0}))}var W="https://roxyapi.com/api/v2";async function xe(r){try{let e=await r.json();if(e?.error){let t=e.code==="validation_error"&&Array.isArray(e.issues)?e.issues.filter(o=>typeof o.path=="string"&&typeof o.message=="string").map(o=>({path:o.path,message:o.message})):null;return{message:e.error,issues:t?.length?t:null,worded:!0}}}catch{}return{message:`Request failed (${r.status})`,issues:null,worded:!1}}var X={fromAttribute:r=>{if(r!=null){try{let e=JSON.parse(r);if(e&&typeof e=="object"&&!Array.isArray(e))return e}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},f=class extends Error{constructor(t,o=null,n=!0){super(t);this.issues=o;this.worded=n}};function Z(r){return r.submitUrl?void 0:V(r.publishableKey)}async function C(r,e,t){let o=Z(r);if(o)throw new f(o.message);let n=r.submitUrl?await fetch(r.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:be(e,r.submitContext),signal:t}):await ve(r,e,t);if(!n.ok){let i=await xe(n);throw new f(i.message,i.issues,i.worded)}return await n.json()}function be(r,e){return JSON.stringify(e?{...r,context:e}:r)}function ve(r,e,t){let o=new URL(`${r.baseUrl??W}${e.path}`,document.baseURI);for(let[i,d]of Object.entries(e.query??{}))d!=null&&o.searchParams.set(i,String(d));let n={Accept:"application/json"};return r.publishableKey&&(n["X-API-Key"]=r.publishableKey),e.body!=null&&(n["Content-Type"]="application/json"),fetch(o,{method:e.method??"GET",headers:n,body:e.body!=null?JSON.stringify(e.body):void 0,signal:t})}var T=class{constructor(e){this.baseUrl=W;this.worded=!0;this.host=e,e.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(e){this.worded=!0;let t=Z(this);if(t){this.host.error=t.message,J(this.host,t);return}this.abort?.abort();let o=new AbortController;this.abort=o,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let n=await C(this,e,o.signal);if(o.signal.aborted)return;this.host.data=n}catch(n){if(o.signal.aborted||n?.name==="AbortError")return;n instanceof f&&(this.host.issues=n.issues),this.worded=n instanceof f&&n.worded,this.host.error=n instanceof Error?n.message:String(n)}finally{this.abort===o&&(this.abort=void 0),o.signal.aborted||(this.host.loading=!1)}}};function Q(r,e,t,o=[]){let n={...t},i=`/${r.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(v,m)=>{let ne=n[m];return delete n[m],encodeURIComponent(String(ne??""))}),d=new Set(o),p={},u={};for(let[v,m]of Object.entries(n))m===void 0||m===""||(e==="GET"||d.has(v)?p[v]=m:u[v]=m);return{path:i,method:e,query:p,body:e==="POST"?u:void 0}}import{css as ke,html as $,nothing as A}from"lit";import{css as Se,html as we}from"lit";function ee(){return we`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var ot=Se`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var st=ke`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function te(r,e,t){let o=r.filter(n=>!!n.body);return o.length===0?A:$`<section class="block" part="section readings"><h3>${t}</h3>${o.map((n,i)=>$`<details class="interp-card" part="reading" name="${e}" ?open="${i===0}"><summary><span class="interp-lead">${n.label}</span> ${ee()} ${n.aside?$`<span class="interp-aside"><small>${n.aside}</small></span>`:A}</summary><div class="interp-body"><p>${n.body}</p>${n.extra??A}</div></details>`)}</section>`}var Ee="roxy-data";function Te(r){return r.nodeName==="SCRIPT"&&r.getAttribute("type")==="application/json"}var R=class{constructor(e){this.host=e,e.addController(this)}hostConnected(){if(this.host.data!=null)return;let e=this.read();e!==void 0&&(this.host.data=e,this.host.requestUpdate())}read(){let e=this.findInlineScript();return e?this.parse(e.textContent):void 0}findInlineScript(){for(let e of Array.from(this.host.children))if(Te(e)&&e.classList.contains(Ee))return e;return null}parse(e){if(e?.trim())try{return JSON.parse(e)}catch{return}}};var a=class extends w{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let t=this.lastRequest,o=this.listKey,n=this.listRows();if(!(!t||!o||!n)){this.moreLoading=!0,this.moreError=null;try{let i=await C(this.fetcher,{...t,query:{...t.query,offset:n.length}});if(this.lastRequest!==t)return;let d=i[o];this.data={...this.data,...i,[o]:[...n,...Array.isArray(d)?d:[]]}}catch(i){this.lastRequest===t&&(this.moreError=i instanceof Error?i.message:String(i))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=t=>{let o=this.selfFetch();if(!o)return;let n=t.detail;this.lastValues=n.values,this.sticky=!!n.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(n.values),this.fetchFresh(Q(o.endpoint,o.method,n.values,n.queryKeys??[]))};new R(this),this.fetcher=new T(this)}static{this.styles=[k]}static{this.endpoints=[]}willUpdate(t){if(t.has("data")&&this.data!=null){let o=B(this.data);o!==this.data&&(this.data=o)}(t.has("publishableKey")||t.has("baseUrl")||t.has("submitUrl")||t.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let t=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:Y(this.constructor.endpoints,this);return t&&{endpoint:t.endpoint,method:this.method??t.method}}render(){return l`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(t){try{return this.renderData(t)}catch(o){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,o),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:o},bubbles:!0,composed:!0})),customElements.get("roxy-data")?l`<roxy-data .data="${t}" lang="${x(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let t=this.hideSections.split(",").map(n=>n.trim().toLowerCase()).filter(n=>/^[a-z][a-z0-9-]*$/.test(n));if(t.length===0)return y;let o=t.map(n=>`[part~="${n}"],roxy-endpoint-form::part(${n}){display:none!important}`).join("");return l`<style>${o}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?l`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(t,o,n){return this.hideReadings?y:te(t,o,this.t(n??"Reading"))}renderResult(t){let o=l`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(t)}`;return this.showAttribution()?l`${o}${this.renderAttribution()}`:o}renderWithForm(t){return l`${this.renderForm()}${t}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?y:this.renderErrorBanner(this.error):this.data==null?y:this.showAttribution()?l`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let t=this.listRows(),o=this.data?.total;return!this.lastRequest||!t||typeof o!="number"?y:t.length>=o?y:l`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?l`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:y}</div>`}listRows(){let t=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(t)?t:void 0}fetchFresh(t){return this.lastRequest=t,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(t)}load(t){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(t)}pickRow(t){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:t,bubbles:!0,composed:!0})),this.openRow(t.id)}openRow(t){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let o=this.openedRow??document.createElement(this.rowDetail.tag);o.publishableKey=this.publishableKey,o.baseUrl=this.baseUrl,o.submitUrl=this.submitUrl,o.submitContext=this.submitContext,o.hideReadings=this.hideReadings,o.hideSections=this.hideSections;let n=this.effectiveLang();n&&o.setAttribute("lang",n),this.openedRow=o,this.openedRowId=t,o.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(t))}`,method:"GET",query:{lang:U(this)}}).then(()=>o.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return l`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(y):this.renderEmpty()}renderForm(){let t=this.selfFetch();return l`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${t?.endpoint??""}" method="${t?.method??"POST"}" spec-url="${x(this.specUrl)}" publishable-key="${x(this.publishableKey)}" location-url="${x(this.locationUrl)}" submit-label="${x(this.submitLabel)}" lang="${x(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let t=sessionStorage.getItem(this.rememberKey());return t?JSON.parse(t):void 0}catch{return}}writeRemembered(t){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(t))}catch{}}renderEmpty(){return l`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return l`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(t){let o=!!this.selfFetch();if(o&&this.issues)return this.renderForm();let n=this.renderErrorBanner(t);return o?l`${n}${this.renderForm()}`:n}renderErrorBanner(t){return l`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(t)}</div>`}};s([c({attribute:!1})],a.prototype,"data",2),s([c({type:String,attribute:"data-endpoint"})],a.prototype,"endpoint",2),s([c({type:String})],a.prototype,"method",2),s([c({type:String,attribute:"publishable-key"})],a.prototype,"publishableKey",2),s([c({type:String,attribute:"base-url"})],a.prototype,"baseUrl",2),s([c({type:String,attribute:"spec-url"})],a.prototype,"specUrl",2),s([c({type:String,attribute:"submit-url"})],a.prototype,"submitUrl",2),s([c({attribute:"submit-context",converter:X})],a.prototype,"submitContext",2),s([c({type:String,attribute:"location-url"})],a.prototype,"locationUrl",2),s([c({type:Boolean})],a.prototype,"remember",2),s([c({type:Boolean,attribute:"hide-readings",reflect:!0})],a.prototype,"hideReadings",2),s([c({type:String,attribute:"hide-sections",reflect:!0})],a.prototype,"hideSections",2),s([c({type:String,attribute:"submit-label"})],a.prototype,"submitLabel",2),s([c({type:String,attribute:"error-message"})],a.prototype,"errorMessage",2),s([c({type:String})],a.prototype,"attribution",2),s([h()],a.prototype,"loading",2),s([h()],a.prototype,"error",2),s([h()],a.prototype,"issues",2),s([h()],a.prototype,"selfFetched",2),s([h()],a.prototype,"editing",2),s([h()],a.prototype,"sticky",2),s([h()],a.prototype,"openedRow",2),s([h()],a.prototype,"openedRowId",2),s([h()],a.prototype,"moreLoading",2),s([h()],a.prototype,"moreError",2);var re=r=>e=>{customElements.get(r)||customElements.define(r,e)};function oe(r,e){return!e||!r?.length?"":r.map(t=>e[String(t)]?.[0]).filter(Boolean).join(", ")}var b=class extends a{renderData(e){let t=e.significators??[];return g`<div class="wrap" part="card" aria-label="KP ruling planets"><header part="header"><h2 class="title">KP ruling planets</h2>${e.dayLord?g`<div class="day-lord">Day lord: <strong>${e.dayLord}</strong></div>`:O}</header><div class="groups" part="details"><div class="group"><h3>Moon</h3><dl part="label-track"><dt>Sign lord</dt><dd>${e.moonSignLord??""}</dd><dt>Star lord</dt><dd>${e.moonStarLord??""}</dd><dt>Sub lord</dt><dd>${e.moonSublord??""}</dd><dt>Sub-sub lord</dt><dd>${e.moonSubSublord??""}</dd></dl></div><div class="group"><h3>Lagna</h3><dl part="label-track"><dt>Sign lord</dt><dd>${e.lagnaSignLord??""}</dd><dt>Star lord</dt><dd>${e.lagnaStarLord??""}</dd><dt>Sub lord</dt><dd>${e.lagnaSublord??""}</dd><dt>Sub-sub lord</dt><dd>${e.lagnaSubSublord??""}</dd></dl></div></div>${e.rulingPlanets?.length?g`<div class="rp-list" part="details"><span class="roxy-label">Ruling planets</span><ol class="roxy-chips" aria-label="Ruling planets by strength">${e.rulingPlanets.map((o,n)=>g`<li class="rp"><span class="rank">${n+1}</span> ${o}</li>`)}</ol></div>`:O} ${t.length?g`<table part="table"><caption class="roxy-sr-only">House significators: each ruling planet, the houses it signifies, and what those houses stand for.</caption><thead><tr><th scope="col">Planet</th><th scope="col">Signifies houses</th></tr></thead><tbody>${t.map(o=>{let n=oe(o.signifies,e.houseThemes);return g`<tr><td>${o.planet}</td><td><span class="num">${(o.signifies??[]).join(", ")}</span> ${n?g`<span class="themes">${n}</span>`:O}</td></tr>`})}</tbody></table>`:O}</div>`}};b.endpoints=L,b.styles=[k,Re`.wrap{gap:var(--roxy-space-md);padding:var(--roxy-space-md);grid-template-columns:minmax(0,1fr);display:grid}.title,.group h3{margin:0}.day-lord{color:var(--roxy-muted);font-size:var(--roxy-text-sm)}.day-lord strong{color:var(--roxy-fg)}.groups{gap:var(--roxy-space-md) var(--roxy-space-xl);flex-wrap:wrap;display:flex}.group{gap:var(--roxy-space-xs);flex:1 1 0;min-width:min(100%,22ch);display:grid}.group dl{grid-template-columns:var(--roxy-label-col) minmax(0, 1fr);gap:var(--roxy-space-xs) var(--roxy-space-sm);font-size:var(--roxy-text-sm);margin:0;display:grid}.group dd{font-weight:var(--roxy-weight-bold);margin:0}.rp-list{align-items:center;gap:var(--roxy-space-sm);flex-wrap:wrap;display:flex}.rp .rank{color:var(--roxy-accent-ink);font-weight:var(--roxy-weight-bold)}.num{font-variant-numeric:tabular-nums}.themes{color:var(--roxy-muted);font-size:var(--roxy-text-xs);display:block}`],b=s([re("roxy-kp-ruling-planets")],b);export{b as RoxyKpRulingPlanets};
