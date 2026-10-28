var ge=Object.defineProperty;var fe=Object.getOwnPropertyDescriptor;var a=(r,e,t,o)=>{for(var n=o>1?void 0:o?fe(e,t):e,i=r.length-1,d;i>=0;i--)(d=r[i])&&(n=(o?d(e,t,n):d(n))||n);return o&&n&&ge(e,t,n),n};import{css as Ie,html as x,nothing as R}from"lit";var M=[{endpoint:"astrology/signs/{id}",method:"GET"},{endpoint:"astrology/planet-meanings/{id}",method:"GET"},{endpoint:"vedic-astrology/rashis/{id}",method:"GET"},{endpoint:"iching/trigrams/{id}",method:"GET"},{endpoint:"human-design/gates/{number}",method:"GET"},{endpoint:"human-design/centers/{id}",method:"GET"},{endpoint:"numerology/meanings/{number}",method:"GET"},{endpoint:"vedic-astrology/avasthas/{id}",method:"GET"}];import{html as p,nothing as b}from"lit";import{property as h,state as f}from"lit/decorators.js";import{ifDefined as k}from"lit/directives/if-defined.js";var q=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function U(r){if(r.lang)return r.lang;if(typeof document>"u")return;let e=r.closest?.("[lang]")?.getAttribute("lang");return e||document.documentElement.lang||void 0}var xe={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function z(r){let e=r.toLowerCase();return q.find(t=>t.toLowerCase()===e)}function H(r){let e=U(r);if(!e)return;let t=z(e);if(t)return t;let o=e.toLowerCase().split("-"),n=o[0];if(n==="zh"){let i=o.find(d=>d==="hans"||d==="hant")??xe[o[1]??""];return i?z(`zh-${i}`):void 0}return z(n)}import{LitElement as we}from"lit";var B=`/**
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
`;var Y="roxy-ui-tokens";function D(){if(typeof document>"u")return null;let r=document.getElementById(Y);if(r)return r;let e=document.createElement("style");return e.id=Y,e.textContent=B,document.head.prepend(e),e}function V(r){return r.toLowerCase().replace(/[\s_-]+/g," ").trim()}function T(r){return r.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/([a-z])([0-9])/g,"$1 $2").replace(/^\w/,e=>e.toUpperCase())}var J="__ROXY_UI_I18N__";function _(){let r=globalThis,e=r[J];if(e)return e;let t={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return r[J]=t,t}function be(r,e){return e?r.replace(/\{\{(\w+)\}\}/g,(t,o)=>o in e?String(e[o]??""):t):r}function W(r,e,t){return be(ve(r,e)??e,t)}function ve(r,e){if(!r)return;let{catalogs:t}=_(),o=r.toLowerCase();return(t[o]??t[o.split("-")[0]])?.[V(e)]}function Se(r){if(!r)return;let{fieldLabels:e}=_(),t=r.toLowerCase();return e[t]??e[t.split("-")[0]]}function X(r,e){return Se(r)?.fields[e]}function Z(r){let{listeners:e}=_();return e.add(r),()=>{e.delete(r)}}var P=class{constructor(e){this.host=e,e.addController(this)}hostConnected(){this.unsubscribe=Z(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var F=class extends we{constructor(){super();this.translator=(t,o)=>this.t(t,o);new P(this)}connectedCallback(){super.connectedCallback(),D()}t(t,o){return W(this.effectiveLang(),t,o)}effectiveLang(){return U(this)}};import{css as Ee}from"lit";import{css as ke}from"lit";var Q=ke`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var Te=Ee`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,C=[Te,Q];var Re="__cols",Oe="__rows";function Pe(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function A(r){if(Array.isArray(r)){let i=!1,d=r.map(y=>{let u=A(y);return u!==y&&(i=!0),u});return i?d:r}if(!Pe(r))return r;let e=r[Re],t=r[Oe];if(Array.isArray(e)&&Array.isArray(t)&&Object.keys(r).length===2)return t.map(i=>{let d={};return e.forEach((y,u)=>{d[y]=A(i[u])}),d});let o=!1,n={};for(let[i,d]of Object.entries(r)){let y=A(d);y!==d&&(o=!0),n[i]=y}return o?n:r}function ee(r){return A(r)}function te(r,e){return r.find(t=>t.attrs&&Object.entries(t.attrs).every(([o,n])=>e[o]===n))??r[0]}var Fe="pk_live_YOUR_KEY",re={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function oe(r){if(r)return r===Fe?re.sample:r.startsWith("pk_")?void 0:re.secret}function ne(r,e,t={}){t.warn&&console.warn(e.message),r.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:e.reason,message:e.message},bubbles:!0,composed:!0}))}var ie="https://roxyapi.com/api/v2";async function Ce(r){try{let e=await r.json();if(e?.error){let t=e.code==="validation_error"&&Array.isArray(e.issues)?e.issues.filter(o=>typeof o.path=="string"&&typeof o.message=="string").map(o=>({path:o.path,message:o.message})):null;return{message:e.error,issues:t?.length?t:null,worded:!0}}}catch{}return{message:`Request failed (${r.status})`,issues:null,worded:!1}}var se={fromAttribute:r=>{if(r!=null){try{let e=JSON.parse(r);if(e&&typeof e=="object"&&!Array.isArray(e))return e}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},w=class extends Error{constructor(t,o=null,n=!0){super(t);this.issues=o;this.worded=n}};function ae(r){return r.submitUrl?void 0:oe(r.publishableKey)}async function I(r,e,t){let o=ae(r);if(o)throw new w(o.message);let n=r.submitUrl?await fetch(r.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Ae(e,r.submitContext),signal:t}):await $e(r,e,t);if(!n.ok){let i=await Ce(n);throw new w(i.message,i.issues,i.worded)}return await n.json()}function Ae(r,e){return JSON.stringify(e?{...r,context:e}:r)}function $e(r,e,t){let o=new URL(`${r.baseUrl??ie}${e.path}`,document.baseURI);for(let[i,d]of Object.entries(e.query??{}))d!=null&&o.searchParams.set(i,String(d));let n={Accept:"application/json"};return r.publishableKey&&(n["X-API-Key"]=r.publishableKey),e.body!=null&&(n["Content-Type"]="application/json"),fetch(o,{method:e.method??"GET",headers:n,body:e.body!=null?JSON.stringify(e.body):void 0,signal:t})}var $=class{constructor(e){this.baseUrl=ie;this.worded=!0;this.host=e,e.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(e){this.worded=!0;let t=ae(this);if(t){this.host.error=t.message,ne(this.host,t);return}this.abort?.abort();let o=new AbortController;this.abort=o,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let n=await I(this,e,o.signal);if(o.signal.aborted)return;this.host.data=n}catch(n){if(o.signal.aborted||n?.name==="AbortError")return;n instanceof w&&(this.host.issues=n.issues),this.worded=n instanceof w&&n.worded,this.host.error=n instanceof Error?n.message:String(n)}finally{this.abort===o&&(this.abort=void 0),o.signal.aborted||(this.host.loading=!1)}}};function de(r,e,t,o=[]){let n={...t},i=`/${r.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(v,m)=>{let l=n[m];return delete n[m],encodeURIComponent(String(l??""))}),d=new Set(o),y={},u={};for(let[v,m]of Object.entries(n))m===void 0||m===""||(e==="GET"||d.has(v)?y[v]=m:u[v]=m);return{path:i,method:e,query:y,body:e==="POST"?u:void 0}}import{css as Ke,html as j,nothing as N}from"lit";import{css as Le,html as Ge}from"lit";function le(){return Ge`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var vt=Le`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var Et=Ke`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function ce(r,e,t){let o=r.filter(n=>!!n.body);return o.length===0?N:j`<section class="block" part="section readings"><h3>${t}</h3>${o.map((n,i)=>j`<details class="interp-card" part="reading" name="${e}" ?open="${i===0}"><summary><span class="interp-lead">${n.label}</span> ${le()} ${n.aside?j`<span class="interp-aside"><small>${n.aside}</small></span>`:N}</summary><div class="interp-body"><p>${n.body}</p>${n.extra??N}</div></details>`)}</section>`}var ze="roxy-data";function Ue(r){return r.nodeName==="SCRIPT"&&r.getAttribute("type")==="application/json"}var L=class{constructor(e){this.host=e,e.addController(this)}hostConnected(){if(this.host.data!=null)return;let e=this.read();e!==void 0&&(this.host.data=e,this.host.requestUpdate())}read(){let e=this.findInlineScript();return e?this.parse(e.textContent):void 0}findInlineScript(){for(let e of Array.from(this.host.children))if(Ue(e)&&e.classList.contains(ze))return e;return null}parse(e){if(e?.trim())try{return JSON.parse(e)}catch{return}}};var s=class extends F{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let t=this.lastRequest,o=this.listKey,n=this.listRows();if(!(!t||!o||!n)){this.moreLoading=!0,this.moreError=null;try{let i=await I(this.fetcher,{...t,query:{...t.query,offset:n.length}});if(this.lastRequest!==t)return;let d=i[o];this.data={...this.data,...i,[o]:[...n,...Array.isArray(d)?d:[]]}}catch(i){this.lastRequest===t&&(this.moreError=i instanceof Error?i.message:String(i))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=t=>{let o=this.selfFetch();if(!o)return;let n=t.detail;this.lastValues=n.values,this.sticky=!!n.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(n.values),this.fetchFresh(de(o.endpoint,o.method,n.values,n.queryKeys??[]))};new L(this),this.fetcher=new $(this)}static{this.styles=[C]}static{this.endpoints=[]}willUpdate(t){if(t.has("data")&&this.data!=null){let o=ee(this.data);o!==this.data&&(this.data=o)}(t.has("publishableKey")||t.has("baseUrl")||t.has("submitUrl")||t.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let t=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:te(this.constructor.endpoints,this);return t&&{endpoint:t.endpoint,method:this.method??t.method}}render(){return p`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(t){try{return this.renderData(t)}catch(o){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,o),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:o},bubbles:!0,composed:!0})),customElements.get("roxy-data")?p`<roxy-data .data="${t}" lang="${k(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let t=this.hideSections.split(",").map(n=>n.trim().toLowerCase()).filter(n=>/^[a-z][a-z0-9-]*$/.test(n));if(t.length===0)return b;let o=t.map(n=>`[part~="${n}"],roxy-endpoint-form::part(${n}){display:none!important}`).join("");return p`<style>${o}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?p`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(t,o,n){return this.hideReadings?b:ce(t,o,this.t(n??"Reading"))}renderResult(t){let o=p`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(t)}`;return this.showAttribution()?p`${o}${this.renderAttribution()}`:o}renderWithForm(t){return p`${this.renderForm()}${t}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?b:this.renderErrorBanner(this.error):this.data==null?b:this.showAttribution()?p`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let t=this.listRows(),o=this.data?.total;return!this.lastRequest||!t||typeof o!="number"?b:t.length>=o?b:p`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?p`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:b}</div>`}listRows(){let t=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(t)?t:void 0}fetchFresh(t){return this.lastRequest=t,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(t)}load(t){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(t)}pickRow(t){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:t,bubbles:!0,composed:!0})),this.openRow(t.id)}openRow(t){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let o=this.openedRow??document.createElement(this.rowDetail.tag);o.publishableKey=this.publishableKey,o.baseUrl=this.baseUrl,o.submitUrl=this.submitUrl,o.submitContext=this.submitContext,o.hideReadings=this.hideReadings,o.hideSections=this.hideSections;let n=this.effectiveLang();n&&o.setAttribute("lang",n),this.openedRow=o,this.openedRowId=t,o.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(t))}`,method:"GET",query:{lang:H(this)}}).then(()=>o.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return p`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(b):this.renderEmpty()}renderForm(){let t=this.selfFetch();return p`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${t?.endpoint??""}" method="${t?.method??"POST"}" spec-url="${k(this.specUrl)}" publishable-key="${k(this.publishableKey)}" location-url="${k(this.locationUrl)}" submit-label="${k(this.submitLabel)}" lang="${k(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let t=sessionStorage.getItem(this.rememberKey());return t?JSON.parse(t):void 0}catch{return}}writeRemembered(t){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(t))}catch{}}renderEmpty(){return p`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return p`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(t){let o=!!this.selfFetch();if(o&&this.issues)return this.renderForm();let n=this.renderErrorBanner(t);return o?p`${n}${this.renderForm()}`:n}renderErrorBanner(t){return p`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(t)}</div>`}};a([h({attribute:!1})],s.prototype,"data",2),a([h({type:String,attribute:"data-endpoint"})],s.prototype,"endpoint",2),a([h({type:String})],s.prototype,"method",2),a([h({type:String,attribute:"publishable-key"})],s.prototype,"publishableKey",2),a([h({type:String,attribute:"base-url"})],s.prototype,"baseUrl",2),a([h({type:String,attribute:"spec-url"})],s.prototype,"specUrl",2),a([h({type:String,attribute:"submit-url"})],s.prototype,"submitUrl",2),a([h({attribute:"submit-context",converter:se})],s.prototype,"submitContext",2),a([h({type:String,attribute:"location-url"})],s.prototype,"locationUrl",2),a([h({type:Boolean})],s.prototype,"remember",2),a([h({type:Boolean,attribute:"hide-readings",reflect:!0})],s.prototype,"hideReadings",2),a([h({type:String,attribute:"hide-sections",reflect:!0})],s.prototype,"hideSections",2),a([h({type:String,attribute:"submit-label"})],s.prototype,"submitLabel",2),a([h({type:String,attribute:"error-message"})],s.prototype,"errorMessage",2),a([h({type:String})],s.prototype,"attribution",2),a([f()],s.prototype,"loading",2),a([f()],s.prototype,"error",2),a([f()],s.prototype,"issues",2),a([f()],s.prototype,"selfFetched",2),a([f()],s.prototype,"editing",2),a([f()],s.prototype,"sticky",2),a([f()],s.prototype,"openedRow",2),a([f()],s.prototype,"openedRowId",2),a([f()],s.prototype,"moreLoading",2),a([f()],s.prototype,"moreError",2);var pe=r=>e=>{customElements.get(r)||customElements.define(r,e)};import{css as _e}from"lit";var he=_e`.roxy-facts{gap:var(--roxy-space-sm) var(--roxy-space-lg);margin:var(--roxy-space-sm) 0 0;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums;flex-wrap:wrap;display:flex}.roxy-facts>div{min-width:0}.roxy-facts dd{overflow-wrap:anywhere;margin:0}`;function G(r,e,t){return X(r,e)??t??T(e)}var ye="Localized";function K(r){let e;for(let t of Object.keys(r)){if(!t.endsWith(ye))continue;let o=t.slice(0,-ye.length);if(o===""||!(o in r))continue;e??={...r};let n=r[t];n!=null&&n!==""&&(e[o]=n),delete e[t]}return e??r}var me=["name","english","title"],je=new Set(["description","meaning","characteristics","tagline","definedMeaning","undefinedMeaning","motto"]),Ne=new Set(["id","symbol",...me]),ue=48;function Me(r){return T(r).toLowerCase().replace(/\s+/g,"-")}function qe(r){return Object.values(K(r)).filter(e=>typeof e=="string"||typeof e=="number").map(String).join(" · ")}var E=class extends s{renderData(e){let t=K(e),o=this.deriveTitle(t),n=typeof t.symbol=="string"?t.symbol:void 0,i=Array.isArray(t.keywords)?t.keywords.map(String):[],d=[],y=[],u=[],v=(l,c,O)=>{if(c!=null){if(Array.isArray(c)){let S=c.filter(g=>g!=null).map(g=>typeof g=="object"?qe(g):String(g)).filter(g=>g.length>0);S.length>0&&y.push([l,S,S.some(g=>g.length>ue)])}else if(typeof c=="string")je.has(l)||c.length>ue?d.push([l,c]):u.push([l,c]);else if(typeof c=="number"||typeof c=="boolean")u.push([l,String(c)]);else if(typeof c=="object"&&O<2)for(let[S,g]of Object.entries(K(c)))v(`${l} ${S}`,g,O+1)}};for(let[l,c]of Object.entries(t))Ne.has(l)||l==="keywords"&&Array.isArray(c)||v(l,c,0);let m=!this.hideReadings;return x`<article class="card" part="card" aria-label="${o}"><header class="head" part="header">${n?x`<span class="symbol" aria-hidden="true">${n}</span>`:R}<div><p class="roxy-label">${this.t("Reference")}</p><h2>${o}</h2></div></header>${i.length>0&&m?x`<ul class="roxy-chips">${i.map(l=>x`<li>${l}</li>`)}</ul>`:R} ${m?d.map(([l,c])=>x`<p class="prose"><span class="roxy-label">${G(this.effectiveLang(),l)}</span>${c}</p>`):R} ${u.length>0?x`<div part="details"><dl class="roxy-facts">${u.map(([l,c])=>x`<div><dt>${G(this.effectiveLang(),l)}</dt><dd>${c}</dd></div>`)}</dl></div>`:R} ${y.map(([l,c,O])=>O&&!m?R:x`<div class="list" part="section ${Me(l)}"><h3>${G(this.effectiveLang(),l)}</h3><ul class="roxy-chips">${c.map(S=>x`<li>${S}</li>`)}</ul></div>`)}</article>`}deriveTitle(e){for(let n of me)if(typeof e[n]=="string")return e[n];let t=typeof e.type=="string"?T(e.type):"",o=e.number;return o!=null?`${t} ${o}`.trim():this.t("Reference")}};E.endpoints=M,E.styles=[C,he,Ie`.card{gap:var(--roxy-space-md);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,1fr);display:grid}h2,h3,p{margin:0}.head{align-items:center;gap:var(--roxy-space-md);display:flex}.symbol{color:var(--roxy-accent-ink);font-size:calc(var(--roxy-text-xl) * 1.5);flex:none;line-height:1}.prose .roxy-label{margin-block-end:calc(var(--roxy-space-unit) / 2);display:block}.list h3{margin-block-end:var(--roxy-space-xs)}.roxy-facts{margin:0}`],E=a([pe("roxy-reference-card")],E);export{E as RoxyReferenceCard};
