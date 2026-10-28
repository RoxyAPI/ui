var ye=Object.defineProperty;var me=Object.getOwnPropertyDescriptor;var s=(n,r,e,t)=>{for(var o=t>1?void 0:t?me(r,e):r,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(t?a(r,e,o):a(o))||o);return t&&o&&ye(r,e,o),o};import{css as Me,html as l,nothing as c}from"lit";import{property as je}from"lit/decorators.js";var G=[{endpoint:"mesoamerican-astrology/mayan/tzolkin",method:"POST",attrs:{mode:"day"}},{endpoint:"mesoamerican-astrology/mayan/chart",method:"POST",attrs:{mode:"chart"}}];import{html as p,nothing as g}from"lit";import{property as h,state as y}from"lit/decorators.js";import{ifDefined as w}from"lit/directives/if-defined.js";var I=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function F(n){if(n.lang)return n.lang;if(typeof document>"u")return;let r=n.closest?.("[lang]")?.getAttribute("lang");return r||document.documentElement.lang||void 0}var ge={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function P(n){let r=n.toLowerCase();return I.find(e=>e.toLowerCase()===r)}function K(n){let r=F(n);if(!r)return;let e=P(r);if(e)return e;let t=r.toLowerCase().split("-"),o=t[0];if(o==="zh"){let i=t.find(a=>a==="hans"||a==="hant")??ge[t[1]??""];return i?P(`zh-${i}`):void 0}return P(o)}import{LitElement as ve}from"lit";var D=`/**
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
`;var U="roxy-ui-tokens";function _(){if(typeof document>"u")return null;let n=document.getElementById(U);if(n)return n;let r=document.createElement("style");return r.id=U,r.textContent=D,document.head.prepend(r),r}function M(n){return n.toLowerCase().replace(/[\s_-]+/g," ").trim()}function k(n){return n.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/([a-z])([0-9])/g,"$1 $2").replace(/^\w/,r=>r.toUpperCase())}var j="__ROXY_UI_I18N__";function L(){let n=globalThis,r=n[j];if(r)return r;let e={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return n[j]=e,e}function fe(n,r){return r?n.replace(/\{\{(\w+)\}\}/g,(e,t)=>t in r?String(r[t]??""):e):n}function B(n,r,e){return fe(xe(n,r)??r,e)}function xe(n,r){if(!n)return;let{catalogs:e}=L(),t=n.toLowerCase();return(e[t]??e[t.split("-")[0]])?.[M(r)]}function be(n){if(!n)return;let{fieldLabels:r}=L(),e=n.toLowerCase();return r[e]??r[e.split("-")[0]]}function H(n,r,e){return be(n)?.enums[`${r}.${e}`]}function q(n){let{listeners:r}=L();return r.add(n),()=>{r.delete(n)}}var T=class{constructor(r){this.host=r,r.addController(this)}hostConnected(){this.unsubscribe=q(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var E=class extends ve{constructor(){super();this.translator=(e,t)=>this.t(e,t);new T(this)}connectedCallback(){super.connectedCallback(),_()}t(e,t){return B(this.effectiveLang(),e,t)}effectiveLang(){return F(this)}};import{css as Se}from"lit";import{css as we}from"lit";var Y=we`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var ke=Se`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,$=[ke,Y];var Te="__cols",Ee="__rows";function $e(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function R(n){if(Array.isArray(n)){let i=!1,a=n.map(u=>{let f=R(u);return f!==u&&(i=!0),f});return i?a:n}if(!$e(n))return n;let r=n[Te],e=n[Ee];if(Array.isArray(r)&&Array.isArray(e)&&Object.keys(n).length===2)return e.map(i=>{let a={};return r.forEach((u,f)=>{a[u]=R(i[f])}),a});let t=!1,o={};for(let[i,a]of Object.entries(n)){let u=R(a);u!==a&&(t=!0),o[i]=u}return t?o:n}function Z(n){return R(n)}function V(n,r){return n.find(e=>e.attrs&&Object.entries(e.attrs).every(([t,o])=>r[t]===o))??n[0]}var Re="pk_live_YOUR_KEY",W={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function J(n){if(n)return n===Re?W.sample:n.startsWith("pk_")?void 0:W.secret}function X(n,r,e={}){e.warn&&console.warn(r.message),n.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:r.reason,message:r.message},bubbles:!0,composed:!0}))}var Q="https://roxyapi.com/api/v2";async function Oe(n){try{let r=await n.json();if(r?.error){let e=r.code==="validation_error"&&Array.isArray(r.issues)?r.issues.filter(t=>typeof t.path=="string"&&typeof t.message=="string").map(t=>({path:t.path,message:t.message})):null;return{message:r.error,issues:e?.length?e:null,worded:!0}}}catch{}return{message:`Request failed (${n.status})`,issues:null,worded:!1}}var ee={fromAttribute:n=>{if(n!=null){try{let r=JSON.parse(n);if(r&&typeof r=="object"&&!Array.isArray(r))return r}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},v=class extends Error{constructor(e,t=null,o=!0){super(e);this.issues=t;this.worded=o}};function te(n){return n.submitUrl?void 0:J(n.publishableKey)}async function A(n,r,e){let t=te(n);if(t)throw new v(t.message);let o=n.submitUrl?await fetch(n.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Ce(r,n.submitContext),signal:e}):await Pe(n,r,e);if(!o.ok){let i=await Oe(o);throw new v(i.message,i.issues,i.worded)}return await o.json()}function Ce(n,r){return JSON.stringify(r?{...n,context:r}:n)}function Pe(n,r,e){let t=new URL(`${n.baseUrl??Q}${r.path}`,document.baseURI);for(let[i,a]of Object.entries(r.query??{}))a!=null&&t.searchParams.set(i,String(a));let o={Accept:"application/json"};return n.publishableKey&&(o["X-API-Key"]=n.publishableKey),r.body!=null&&(o["Content-Type"]="application/json"),fetch(t,{method:r.method??"GET",headers:o,body:r.body!=null?JSON.stringify(r.body):void 0,signal:e})}var O=class{constructor(r){this.baseUrl=Q;this.worded=!0;this.host=r,r.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(r){this.worded=!0;let e=te(this);if(e){this.host.error=e.message,X(this.host,e);return}this.abort?.abort();let t=new AbortController;this.abort=t,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let o=await A(this,r,t.signal);if(t.signal.aborted)return;this.host.data=o}catch(o){if(t.signal.aborted||o?.name==="AbortError")return;o instanceof v&&(this.host.issues=o.issues),this.worded=o instanceof v&&o.worded,this.host.error=o instanceof Error?o.message:String(o)}finally{this.abort===t&&(this.abort=void 0),t.signal.aborted||(this.host.loading=!1)}}};function re(n,r,e,t=[]){let o={...e},i=`/${n.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(S,x)=>{let ue=o[x];return delete o[x],encodeURIComponent(String(ue??""))}),a=new Set(t),u={},f={};for(let[S,x]of Object.entries(o))x===void 0||x===""||(r==="GET"||a.has(S)?u[S]=x:f[S]=x);return{path:i,method:r,query:u,body:r==="POST"?f:void 0}}import{css as Ae,html as N,nothing as z}from"lit";import{css as Fe,html as Le}from"lit";function ne(){return Le`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var kt=Fe`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var oe=Ae`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function ie(n,r,e){let t=n.filter(o=>!!o.body);return t.length===0?z:N`<section class="block" part="section readings"><h3>${e}</h3>${t.map((o,i)=>N`<details class="interp-card" part="reading" name="${r}" ?open="${i===0}"><summary><span class="interp-lead">${o.label}</span> ${ne()} ${o.aside?N`<span class="interp-aside"><small>${o.aside}</small></span>`:z}</summary><div class="interp-body"><p>${o.body}</p>${o.extra??z}</div></details>`)}</section>`}var Ne="roxy-data";function ze(n){return n.nodeName==="SCRIPT"&&n.getAttribute("type")==="application/json"}var C=class{constructor(r){this.host=r,r.addController(this)}hostConnected(){if(this.host.data!=null)return;let r=this.read();r!==void 0&&(this.host.data=r,this.host.requestUpdate())}read(){let r=this.findInlineScript();return r?this.parse(r.textContent):void 0}findInlineScript(){for(let r of Array.from(this.host.children))if(ze(r)&&r.classList.contains(Ne))return r;return null}parse(r){if(r?.trim())try{return JSON.parse(r)}catch{return}}};var d=class extends E{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let e=this.lastRequest,t=this.listKey,o=this.listRows();if(!(!e||!t||!o)){this.moreLoading=!0,this.moreError=null;try{let i=await A(this.fetcher,{...e,query:{...e.query,offset:o.length}});if(this.lastRequest!==e)return;let a=i[t];this.data={...this.data,...i,[t]:[...o,...Array.isArray(a)?a:[]]}}catch(i){this.lastRequest===e&&(this.moreError=i instanceof Error?i.message:String(i))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=e=>{let t=this.selfFetch();if(!t)return;let o=e.detail;this.lastValues=o.values,this.sticky=!!o.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(o.values),this.fetchFresh(re(t.endpoint,t.method,o.values,o.queryKeys??[]))};new C(this),this.fetcher=new O(this)}static{this.styles=[$]}static{this.endpoints=[]}willUpdate(e){if(e.has("data")&&this.data!=null){let t=Z(this.data);t!==this.data&&(this.data=t)}(e.has("publishableKey")||e.has("baseUrl")||e.has("submitUrl")||e.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let e=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:V(this.constructor.endpoints,this);return e&&{endpoint:e.endpoint,method:this.method??e.method}}render(){return p`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(e){try{return this.renderData(e)}catch(t){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,t),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:t},bubbles:!0,composed:!0})),customElements.get("roxy-data")?p`<roxy-data .data="${e}" lang="${w(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let e=this.hideSections.split(",").map(o=>o.trim().toLowerCase()).filter(o=>/^[a-z][a-z0-9-]*$/.test(o));if(e.length===0)return g;let t=e.map(o=>`[part~="${o}"],roxy-endpoint-form::part(${o}){display:none!important}`).join("");return p`<style>${t}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?p`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(e,t,o){return this.hideReadings?g:ie(e,t,this.t(o??"Reading"))}renderResult(e){let t=p`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(e)}`;return this.showAttribution()?p`${t}${this.renderAttribution()}`:t}renderWithForm(e){return p`${this.renderForm()}${e}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?g:this.renderErrorBanner(this.error):this.data==null?g:this.showAttribution()?p`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let e=this.listRows(),t=this.data?.total;return!this.lastRequest||!e||typeof t!="number"?g:e.length>=t?g:p`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?p`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:g}</div>`}listRows(){let e=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(e)?e:void 0}fetchFresh(e){return this.lastRequest=e,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(e)}load(e){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(e)}pickRow(e){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:e,bubbles:!0,composed:!0})),this.openRow(e.id)}openRow(e){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let t=this.openedRow??document.createElement(this.rowDetail.tag);t.publishableKey=this.publishableKey,t.baseUrl=this.baseUrl,t.submitUrl=this.submitUrl,t.submitContext=this.submitContext,t.hideReadings=this.hideReadings,t.hideSections=this.hideSections;let o=this.effectiveLang();o&&t.setAttribute("lang",o),this.openedRow=t,this.openedRowId=e,t.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(e))}`,method:"GET",query:{lang:K(this)}}).then(()=>t.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return p`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(g):this.renderEmpty()}renderForm(){let e=this.selfFetch();return p`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${e?.endpoint??""}" method="${e?.method??"POST"}" spec-url="${w(this.specUrl)}" publishable-key="${w(this.publishableKey)}" location-url="${w(this.locationUrl)}" submit-label="${w(this.submitLabel)}" lang="${w(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let e=sessionStorage.getItem(this.rememberKey());return e?JSON.parse(e):void 0}catch{return}}writeRemembered(e){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(e))}catch{}}renderEmpty(){return p`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return p`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(e){let t=!!this.selfFetch();if(t&&this.issues)return this.renderForm();let o=this.renderErrorBanner(e);return t?p`${o}${this.renderForm()}`:o}renderErrorBanner(e){return p`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(e)}</div>`}};s([h({attribute:!1})],d.prototype,"data",2),s([h({type:String,attribute:"data-endpoint"})],d.prototype,"endpoint",2),s([h({type:String})],d.prototype,"method",2),s([h({type:String,attribute:"publishable-key"})],d.prototype,"publishableKey",2),s([h({type:String,attribute:"base-url"})],d.prototype,"baseUrl",2),s([h({type:String,attribute:"spec-url"})],d.prototype,"specUrl",2),s([h({type:String,attribute:"submit-url"})],d.prototype,"submitUrl",2),s([h({attribute:"submit-context",converter:ee})],d.prototype,"submitContext",2),s([h({type:String,attribute:"location-url"})],d.prototype,"locationUrl",2),s([h({type:Boolean})],d.prototype,"remember",2),s([h({type:Boolean,attribute:"hide-readings",reflect:!0})],d.prototype,"hideReadings",2),s([h({type:String,attribute:"hide-sections",reflect:!0})],d.prototype,"hideSections",2),s([h({type:String,attribute:"submit-label"})],d.prototype,"submitLabel",2),s([h({type:String,attribute:"error-message"})],d.prototype,"errorMessage",2),s([h({type:String})],d.prototype,"attribution",2),s([y()],d.prototype,"loading",2),s([y()],d.prototype,"error",2),s([y()],d.prototype,"issues",2),s([y()],d.prototype,"selfFetched",2),s([y()],d.prototype,"editing",2),s([y()],d.prototype,"sticky",2),s([y()],d.prototype,"openedRow",2),s([y()],d.prototype,"openedRowId",2),s([y()],d.prototype,"moreLoading",2),s([y()],d.prototype,"moreError",2);var ae=n=>r=>{customElements.get(n)||customElements.define(n,r)};var Ge=/^\d{4}-\d{2}-\d{2}$/,Ie=/^\d{4}-\d{2}$/,Ke=/^\d{2}:\d{2}(:\d{2})?$/,De=/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/,se=new Map;function de(n){if(!n)return["en"];let r=se.get(n);if(r)return[r,"en"];let e="en";try{e=Intl.getCanonicalLocales(n)[0]??"en"}catch{e="en"}return se.set(n,e),[e,"en"]}function Ue(n){let r=Ke.test(n)?`1970-01-01T${n}`:Ge.test(n)?`${n}T00:00:00`:Ie.test(n)?`${n}-01T00:00:00`:De.test(n)?n.replace(" ","T"):null;return r?{d:new Date(`${r}Z`),timeZone:"UTC"}:{d:new Date(n)}}function le(n,r){if(typeof r!="string"||r.length===0)return"";let{d:e,timeZone:t}=Ue(r);return Number.isNaN(e.getTime())?r:e.toLocaleDateString(de(n),{month:"short",day:"numeric",year:"numeric",timeZone:t})}function m(n,r){return typeof r!="number"||!Number.isFinite(r)?"":r.toLocaleString(de(n),{maximumFractionDigits:0})}function ce(n,r,e,t){return H(n,r,e)??t??k(e)}import{css as _e}from"lit";var pe=_e`@container (width<=30rem){table.stacked,table.stacked caption,table.stacked tbody,table.stacked tr,table.stacked td{width:100%;min-width:0;display:block}table.stacked thead{display:none}table.stacked tr{border-bottom:1px solid var(--roxy-border);padding-block:var(--roxy-space-sm)}table.stacked tr:last-child{border-bottom:0}table.stacked td{padding:calc(var(--roxy-space-unit) / 2) 0;white-space:normal;border:0}table.stacked td:empty{display:none}table.stacked td[data-label]:before{content:attr(data-label) " ";color:var(--roxy-muted)}}`;var Be={gentle:"Gentle",indifferent:"Indifferent",violent:"Violent"},He={center:"Center",conception:"Conception arm",destiny:"Destiny arm",left:"Left arm",right:"Right arm"},qe=13;function he(n){return"tzolkin"in n}var b=class extends d{constructor(){super(...arguments);this.mode="day"}renderData(e){let t=this.effectiveLang(),o=this.mode==="chart"&&he(e)?e:void 0,i=he(e)?e.tzolkin:e,a=i?.reading,u=a?.numberBand?Be[a.numberBand]:void 0;return l`<article class="card" part="card" aria-labelledby="mayan-title"><header class="hero" part="header">${typeof i?.number=="number"?l`<div class="coefficient">${m(t,i.number)}</div>`:c}<div><p class="roxy-label">${this.t("Mayan day sign")}</p><h2 class="title" id="mayan-title">${i?.daySignName??""}</h2><p class="spellings">${i?.daySignClassic?l`<span><span class="roxy-label">${this.t("Classic spelling")}</span>${i.daySignClassic}</span>`:c} ${i?.daySignKiche?l`<span><span class="roxy-label">${this.t("Highland spelling")}</span>${i.daySignKiche}</span>`:c}</p></div></header><div class="facts" part="details">${e.date?l`<span><span class="roxy-label">${this.t("Date")}</span><b>${le(t,e.date)}</b></span>`:c} ${this.renderTrecena(t,i?.trecena)} ${o?this.renderHaabFact(t,o.haab):c} ${o?.longCount?.formatted?l`<span><span class="roxy-label">${this.t("Long Count")}</span><b>${o.longCount.formatted}</b></span>`:c} ${o?.calendarRound?l`<span><span class="roxy-label">${this.t("Calendar Round")}</span><b>${o.calendarRound}</b></span>`:c} ${o?.yearBearer?.daySignName?l`<span><span class="roxy-label">${this.t("Year Bearer")}</span><b>${m(t,o.yearBearer.number)} ${o.yearBearer.daySignName}</b></span>`:c} ${o?.lordOfNight?.label?l`<span><span class="roxy-label">${this.t("Lord of the Night")}</span><b>${o.lordOfNight.label}</b></span>`:c} ${u?l`<span><span class="roxy-label">${this.t("Character of the number")}</span><b class="band">${this.t(u)}</b></span>`:c} ${e.conventions?.correlation?l`<span><span class="roxy-label">${this.t("Correlation")}</span><span title="${e.conventions.correlation}">${ce(t,"correlation",e.conventions.correlation,e.conventions.correlation)}</span></span>`:c}</div>${a?.keynote&&!this.hideReadings?l`<p class="keynote" part="reading">${a.keynote}</p>`:c} ${this.renderLists(a)} ${this.renderInterpretation(this.sections(o,a),"mayan-day")} ${this.renderCross(t,o?.cross)} ${o?.summary&&!this.hideReadings?l`<p class="summary" part="reading">${o.summary}</p>`:c}</article>`}renderTrecena(e,t){return t?l`<span><span class="roxy-label">${this.t("Trecena")}</span><b>${m(e,t.number)}</b> ${typeof t.dayOfTrecena=="number"?this.t("Day {{n}} of {{total}}",{n:m(e,t.dayOfTrecena),total:m(e,qe)}):c} ${t.rulingSignName?l`· <span class="roxy-label">${this.t("Ruling sign")}</span>${t.rulingSignName}`:c}</span>`:c}renderHaabFact(e,t){return t?.monthName?l`<span><span class="roxy-label">${this.t("Haab")}</span><b>${m(e,t.day)} ${t.monthName}</b> ${t.monthClassic?l`(${t.monthClassic})`:c} ${typeof t.dayOfYear=="number"?l`· <span class="roxy-label">${this.t("Day of year")}</span>${m(e,t.dayOfYear)}`:c}</span>`:c}renderLists(e){let t=e?.strengths??[],o=e?.challenges??[];return this.hideReadings||t.length===0&&o.length===0?c:l`<div class="lists" part="section readings">${t.length>0?l`<div><h3 class="block-title">${this.t("Strengths")}</h3><ul class="plain">${t.map(i=>l`<li>${i}</li>`)}</ul></div>`:c} ${o.length>0?l`<div><h3 class="block-title">${this.t("Challenges")}</h3><ul class="plain">${o.map(i=>l`<li>${i}</li>`)}</ul></div>`:c}</div>`}sections(e,t){let o=[];return t?.numberReading&&o.push({label:this.t("Coefficient"),body:t.numberReading}),t?.guidance&&o.push({label:this.t("Guidance"),body:t.guidance}),e?.haab?.reading&&o.push({label:this.t("Haab"),body:e.haab.reading}),e?.lordOfNight?.reading&&o.push({label:this.t("Lord of the Night"),body:e.lordOfNight.reading}),e?.yearBearer?.reading&&o.push({label:this.t("Year Bearer"),body:e.yearBearer.reading}),o}crossLabel(e){let t=He[e??""];return t?this.t(t):k(e??"")}renderCross(e,t){let o=t??[];return o.length===0?c:l`<section part="section cross"><h3 class="block-title">${this.t("Mayan cross")}</h3><div class="scroll" tabindex="0" role="region" aria-label="${this.t("Mayan cross")}"><table class="stacked"><thead><tr><th>${this.t("Position")}</th><th>${this.t("Offset in days")}</th><th>${this.t("Day sign")}</th></tr></thead><tbody>${o.map(i=>l`<tr><td data-label="${this.t("Position")}">${this.crossLabel(i.position)}</td><td class="num" data-label="${this.t("Offset in days")}">${m(e,i.offsetDays)}</td><td data-label="${this.t("Day sign")}">${m(e,i.number)} ${i.daySignName??""} ${i.daySignKiche?l`(${i.daySignKiche})`:c} ${i.reading&&!this.hideReadings?l`<p part="reading">${i.reading}</p>`:c}</td></tr>`)}</tbody></table></div></section>`}};b.endpoints=G,b.styles=[$,oe,pe,Me`.card{gap:var(--roxy-space-md);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,1fr);display:grid}.hero{align-items:center;gap:var(--roxy-space-md);display:flex}.coefficient{color:var(--roxy-accent-ink);font-size:calc(var(--roxy-text-base) * 2.75);font-weight:var(--roxy-weight-bold);font-variant-numeric:tabular-nums;flex-shrink:0;line-height:1}.hero>div:not(.coefficient){min-width:0}.title,.block-title,p.roxy-label{margin:0}.title{font-size:var(--roxy-text-xl)}.block-title{margin-block-end:var(--roxy-space-sm)}.spellings{gap:calc(var(--roxy-space-unit) / 2) var(--roxy-space-md);margin:calc(var(--roxy-space-unit) / 2) 0 0;color:var(--roxy-secondary);font-size:var(--roxy-text-sm);flex-wrap:wrap;display:flex}.facts{gap:var(--roxy-space-xs) var(--roxy-space-md);color:var(--roxy-secondary);font-size:var(--roxy-text-sm);flex-wrap:wrap;display:flex}span>.roxy-label{margin-inline-end:var(--roxy-space-xs)}.facts b{color:var(--roxy-fg)}.keynote,.summary{margin:0;padding-block-start:var(--roxy-space-md)}.summary{color:var(--roxy-secondary);font-size:var(--roxy-text-sm)}.lists{gap:var(--roxy-space-md);grid-template-columns:repeat(auto-fit,minmax(min(100%,28ch),1fr));display:grid}ul.plain{font-size:var(--roxy-text-sm);margin:0;padding-inline-start:var(--roxy-space-lg)}.scroll{min-width:0;overflow-x:auto}table{width:100%}th,td.num{white-space:nowrap}td.num{font-variant-numeric:tabular-nums}td p{margin:calc(var(--roxy-space-unit) / 2) 0 0;color:var(--roxy-secondary);font-size:var(--roxy-text-xs);border-block-start:0}`],s([je({type:String,reflect:!0})],b.prototype,"mode",2),b=s([ae("roxy-mayan-day-sign")],b);export{b as RoxyMayanDaySign};
