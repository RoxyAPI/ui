var le=Object.defineProperty;var ce=Object.getOwnPropertyDescriptor;var a=(r,t,e,n)=>{for(var o=n>1?void 0:n?ce(t,e):t,s=r.length-1,i;s>=0;s--)(i=r[s])&&(o=(n?i(t,e,o):i(o))||o);return n&&o&&le(t,e,o),o};import{css as Ae,html as g,nothing as ae}from"lit";import{property as Ge}from"lit/decorators.js";var L=[{endpoint:"crystals",method:"GET"},{endpoint:"crystals/chakra/{chakra}",method:"GET"},{endpoint:"crystals/element/{element}",method:"GET"},{endpoint:"crystals/zodiac/{sign}",method:"GET"},{endpoint:"crystals/birthstone/{month}",method:"GET"},{endpoint:"crystals/search",method:"GET"}];import{html as c,nothing as y}from"lit";import{property as p,state as u}from"lit/decorators.js";import{ifDefined as b}from"lit/directives/if-defined.js";var A=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function C(r){if(r.lang)return r.lang;if(typeof document>"u")return;let t=r.closest?.("[lang]")?.getAttribute("lang");return t||document.documentElement.lang||void 0}var pe={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function O(r){let t=r.toLowerCase();return A.find(e=>e.toLowerCase()===t)}function G(r){let t=C(r);if(!t)return;let e=O(t);if(e)return e;let n=t.toLowerCase().split("-"),o=n[0];if(o==="zh"){let s=n.find(i=>i==="hans"||i==="hant")??pe[n[1]??""];return s?O(`zh-${s}`):void 0}return O(o)}import{LitElement as ye}from"lit";var U=`/**
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
`;var I="roxy-ui-tokens";function N(){if(typeof document>"u")return null;let r=document.getElementById(I);if(r)return r;let t=document.createElement("style");return t.id=I,t.textContent=U,document.head.prepend(t),t}function D(r){return r.toLowerCase().replace(/[\s_-]+/g," ").trim()}var _="__ROXY_UI_I18N__";function K(){let r=globalThis,t=r[_];if(t)return t;let e={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return r[_]=e,e}function he(r,t){return t?r.replace(/\{\{(\w+)\}\}/g,(e,n)=>n in t?String(t[n]??""):e):r}function z(r,t,e){return he(ue(r,t)??t,e)}function ue(r,t){if(!r)return;let{catalogs:e}=K(),n=r.toLowerCase();return(e[n]??e[n.split("-")[0]])?.[D(t)]}function j(r){let{listeners:t}=K();return t.add(r),()=>{t.delete(r)}}var w=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){this.unsubscribe=j(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var S=class extends ye{constructor(){super();this.translator=(e,n)=>this.t(e,n);new w(this)}connectedCallback(){super.connectedCallback(),N()}t(e,n){return z(this.effectiveLang(),e,n)}effectiveLang(){return C(this)}};import{css as ge}from"lit";import{css as me}from"lit";var M=me`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var fe=ge`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,k=[fe,M];var xe="__cols",be="__rows";function ve(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function T(r){if(Array.isArray(r)){let s=!1,i=r.map(l=>{let h=T(l);return h!==l&&(s=!0),h});return s?i:r}if(!ve(r))return r;let t=r[xe],e=r[be];if(Array.isArray(t)&&Array.isArray(e)&&Object.keys(r).length===2)return e.map(s=>{let i={};return t.forEach((l,h)=>{i[l]=T(s[h])}),i});let n=!1,o={};for(let[s,i]of Object.entries(r)){let l=T(i);l!==i&&(n=!0),o[s]=l}return n?o:r}function B(r){return T(r)}function q(r,t){return r.find(e=>e.attrs&&Object.entries(e.attrs).every(([n,o])=>t[n]===o))??r[0]}var we="pk_live_YOUR_KEY",H={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function Y(r){if(r)return r===we?H.sample:r.startsWith("pk_")?void 0:H.secret}function Z(r,t,e={}){e.warn&&console.warn(t.message),r.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:t.reason,message:t.message},bubbles:!0,composed:!0}))}var V="https://roxyapi.com/api/v2";async function Se(r){try{let t=await r.json();if(t?.error){let e=t.code==="validation_error"&&Array.isArray(t.issues)?t.issues.filter(n=>typeof n.path=="string"&&typeof n.message=="string").map(n=>({path:n.path,message:n.message})):null;return{message:t.error,issues:e?.length?e:null,worded:!0}}}catch{}return{message:`Request failed (${r.status})`,issues:null,worded:!1}}var W={fromAttribute:r=>{if(r!=null){try{let t=JSON.parse(r);if(t&&typeof t=="object"&&!Array.isArray(t))return t}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},x=class extends Error{constructor(e,n=null,o=!0){super(e);this.issues=n;this.worded=o}};function J(r){return r.submitUrl?void 0:Y(r.publishableKey)}async function P(r,t,e){let n=J(r);if(n)throw new x(n.message);let o=r.submitUrl?await fetch(r.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:ke(t,r.submitContext),signal:e}):await Te(r,t,e);if(!o.ok){let s=await Se(o);throw new x(s.message,s.issues,s.worded)}return await o.json()}function ke(r,t){return JSON.stringify(t?{...r,context:t}:r)}function Te(r,t,e){let n=new URL(`${r.baseUrl??V}${t.path}`,document.baseURI);for(let[s,i]of Object.entries(t.query??{}))i!=null&&n.searchParams.set(s,String(i));let o={Accept:"application/json"};return r.publishableKey&&(o["X-API-Key"]=r.publishableKey),t.body!=null&&(o["Content-Type"]="application/json"),fetch(n,{method:t.method??"GET",headers:o,body:t.body!=null?JSON.stringify(t.body):void 0,signal:e})}var E=class{constructor(t){this.baseUrl=V;this.worded=!0;this.host=t,t.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(t){this.worded=!0;let e=J(this);if(e){this.host.error=e.message,Z(this.host,e);return}this.abort?.abort();let n=new AbortController;this.abort=n,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let o=await P(this,t,n.signal);if(n.signal.aborted)return;this.host.data=o}catch(o){if(n.signal.aborted||o?.name==="AbortError")return;o instanceof x&&(this.host.issues=o.issues),this.worded=o instanceof x&&o.worded,this.host.error=o instanceof Error?o.message:String(o)}finally{this.abort===n&&(this.abort=void 0),n.signal.aborted||(this.host.loading=!1)}}};function X(r,t,e,n=[]){let o={...e},s=`/${r.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(v,m)=>{let de=o[m];return delete o[m],encodeURIComponent(String(de??""))}),i=new Set(n),l={},h={};for(let[v,m]of Object.entries(o))m===void 0||m===""||(t==="GET"||i.has(v)?l[v]=m:h[v]=m);return{path:s,method:t,query:l,body:t==="POST"?h:void 0}}import{css as Oe,html as F,nothing as $}from"lit";import{css as Ee,html as Re}from"lit";function Q(){return Re`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var pt=Ee`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var mt=Oe`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function ee(r,t,e){let n=r.filter(o=>!!o.body);return n.length===0?$:F`<section class="block" part="section readings"><h3>${e}</h3>${n.map((o,s)=>F`<details class="interp-card" part="reading" name="${t}" ?open="${s===0}"><summary><span class="interp-lead">${o.label}</span> ${Q()} ${o.aside?F`<span class="interp-aside"><small>${o.aside}</small></span>`:$}</summary><div class="interp-body"><p>${o.body}</p>${o.extra??$}</div></details>`)}</section>`}var Ce="roxy-data";function Pe(r){return r.nodeName==="SCRIPT"&&r.getAttribute("type")==="application/json"}var R=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){if(this.host.data!=null)return;let t=this.read();t!==void 0&&(this.host.data=t,this.host.requestUpdate())}read(){let t=this.findInlineScript();return t?this.parse(t.textContent):void 0}findInlineScript(){for(let t of Array.from(this.host.children))if(Pe(t)&&t.classList.contains(Ce))return t;return null}parse(t){if(t?.trim())try{return JSON.parse(t)}catch{return}}};var d=class extends S{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let e=this.lastRequest,n=this.listKey,o=this.listRows();if(!(!e||!n||!o)){this.moreLoading=!0,this.moreError=null;try{let s=await P(this.fetcher,{...e,query:{...e.query,offset:o.length}});if(this.lastRequest!==e)return;let i=s[n];this.data={...this.data,...s,[n]:[...o,...Array.isArray(i)?i:[]]}}catch(s){this.lastRequest===e&&(this.moreError=s instanceof Error?s.message:String(s))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=e=>{let n=this.selfFetch();if(!n)return;let o=e.detail;this.lastValues=o.values,this.sticky=!!o.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(o.values),this.fetchFresh(X(n.endpoint,n.method,o.values,o.queryKeys??[]))};new R(this),this.fetcher=new E(this)}static{this.styles=[k]}static{this.endpoints=[]}willUpdate(e){if(e.has("data")&&this.data!=null){let n=B(this.data);n!==this.data&&(this.data=n)}(e.has("publishableKey")||e.has("baseUrl")||e.has("submitUrl")||e.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let e=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:q(this.constructor.endpoints,this);return e&&{endpoint:e.endpoint,method:this.method??e.method}}render(){return c`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(e){try{return this.renderData(e)}catch(n){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,n),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:n},bubbles:!0,composed:!0})),customElements.get("roxy-data")?c`<roxy-data .data="${e}" lang="${b(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let e=this.hideSections.split(",").map(o=>o.trim().toLowerCase()).filter(o=>/^[a-z][a-z0-9-]*$/.test(o));if(e.length===0)return y;let n=e.map(o=>`[part~="${o}"],roxy-endpoint-form::part(${o}){display:none!important}`).join("");return c`<style>${n}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?c`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(e,n,o){return this.hideReadings?y:ee(e,n,this.t(o??"Reading"))}renderResult(e){let n=c`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(e)}`;return this.showAttribution()?c`${n}${this.renderAttribution()}`:n}renderWithForm(e){return c`${this.renderForm()}${e}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?y:this.renderErrorBanner(this.error):this.data==null?y:this.showAttribution()?c`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let e=this.listRows(),n=this.data?.total;return!this.lastRequest||!e||typeof n!="number"?y:e.length>=n?y:c`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?c`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:y}</div>`}listRows(){let e=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(e)?e:void 0}fetchFresh(e){return this.lastRequest=e,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(e)}load(e){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(e)}pickRow(e){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:e,bubbles:!0,composed:!0})),this.openRow(e.id)}openRow(e){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let n=this.openedRow??document.createElement(this.rowDetail.tag);n.publishableKey=this.publishableKey,n.baseUrl=this.baseUrl,n.submitUrl=this.submitUrl,n.submitContext=this.submitContext,n.hideReadings=this.hideReadings,n.hideSections=this.hideSections;let o=this.effectiveLang();o&&n.setAttribute("lang",o),this.openedRow=n,this.openedRowId=e,n.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(e))}`,method:"GET",query:{lang:G(this)}}).then(()=>n.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return c`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(y):this.renderEmpty()}renderForm(){let e=this.selfFetch();return c`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${e?.endpoint??""}" method="${e?.method??"POST"}" spec-url="${b(this.specUrl)}" publishable-key="${b(this.publishableKey)}" location-url="${b(this.locationUrl)}" submit-label="${b(this.submitLabel)}" lang="${b(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let e=sessionStorage.getItem(this.rememberKey());return e?JSON.parse(e):void 0}catch{return}}writeRemembered(e){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(e))}catch{}}renderEmpty(){return c`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return c`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(e){let n=!!this.selfFetch();if(n&&this.issues)return this.renderForm();let o=this.renderErrorBanner(e);return n?c`${o}${this.renderForm()}`:o}renderErrorBanner(e){return c`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(e)}</div>`}};a([p({attribute:!1})],d.prototype,"data",2),a([p({type:String,attribute:"data-endpoint"})],d.prototype,"endpoint",2),a([p({type:String})],d.prototype,"method",2),a([p({type:String,attribute:"publishable-key"})],d.prototype,"publishableKey",2),a([p({type:String,attribute:"base-url"})],d.prototype,"baseUrl",2),a([p({type:String,attribute:"spec-url"})],d.prototype,"specUrl",2),a([p({type:String,attribute:"submit-url"})],d.prototype,"submitUrl",2),a([p({attribute:"submit-context",converter:W})],d.prototype,"submitContext",2),a([p({type:String,attribute:"location-url"})],d.prototype,"locationUrl",2),a([p({type:Boolean})],d.prototype,"remember",2),a([p({type:Boolean,attribute:"hide-readings",reflect:!0})],d.prototype,"hideReadings",2),a([p({type:String,attribute:"hide-sections",reflect:!0})],d.prototype,"hideSections",2),a([p({type:String,attribute:"submit-label"})],d.prototype,"submitLabel",2),a([p({type:String,attribute:"error-message"})],d.prototype,"errorMessage",2),a([p({type:String})],d.prototype,"attribution",2),a([u()],d.prototype,"loading",2),a([u()],d.prototype,"error",2),a([u()],d.prototype,"issues",2),a([u()],d.prototype,"selfFetched",2),a([u()],d.prototype,"editing",2),a([u()],d.prototype,"sticky",2),a([u()],d.prototype,"openedRow",2),a([u()],d.prototype,"openedRowId",2),a([u()],d.prototype,"moreLoading",2),a([u()],d.prototype,"moreError",2);var Fe={apple:"#8db600",azure:"#007fff",blackish:"black",bluish:"blue",bottle:"#006a4e",brass:"#b5a642",brick:"#b22222",brownish:"brown",browns:"brown",burgundy:"#800020",clear:"#eef2f6",colorless:"#eef2f6",colourless:"#eef2f6",cream:"#fffdd0",creamy:"#fffdd0",emerald:"#50c878",golden:"gold",greenish:"green",lilac:"#c8a2c8",mauve:"#e0b0ff",peach:"peachpuff",pinkish:"pink",reddish:"red",rose:"#f4a6b7",royal:"royalblue",silvery:"silver",sky:"skyblue",yellowish:"yellow"},$e=new Set(["beige","black","blue","brown","crimson","cyan","gold","gray","green","grey","indigo","lavender","magenta","maroon","navy","olive","orange","pink","purple","red","salmon","silver","tan","teal","turquoise","violet","white","yellow"]),Le={bright:["white",85],dark:["black",60],deep:["black",70],faintly:["white",30],light:["white",55],pale:["white",45],rich:["black",80]};function te(r){let t=[],e=[];for(let i of r.toLowerCase().split(/[\s-]+/)){let l=Le[i];if(l){e.push(l);continue}let h=Fe[i]??($e.has(i)?i:"");h&&t.push(h)}let[n,o]=t;if(!n)return"var(--roxy-border, #e4e4e7)";let s=o?`color-mix(in srgb, ${n}, ${o})`:n;for(let[i,l]of e)s=`color-mix(in srgb, ${s} ${l}%, ${i})`;return s}var re=r=>t=>{customElements.get(r)||customElements.define(r,t)};var ne=new Map;function oe(r){if(!r)return["en"];let t=ne.get(r);if(t)return[t,"en"];let e="en";try{e=Intl.getCanonicalLocales(r)[0]??"en"}catch{e="en"}return ne.set(r,e),[e,"en"]}function ie(r,t){return typeof t!="number"||!Number.isInteger(t)||t<1||t>12?"":new Date(Date.UTC(2e3,t-1,1,12)).toLocaleDateString(oe(r),{month:"long",timeZone:"UTC"})}function se(r,t){let e=t.filter(Boolean);return e.length<2?e[0]??"":new Intl.ListFormat(oe(r),{style:"long",type:"conjunction"}).format(e)}var f=class extends d{constructor(){super(...arguments);this.heading="";this.rowDetail={tag:"roxy-crystal-card",path:"crystals/{id}"};this.listKey="crystals"}renderData(e){let n=e.crystals??[];if(n.length===0)return this.renderEmpty();let o=this.heading||this.deriveHeading(e),s="total"in e&&typeof e.total=="number"?e.total:n.length;return g`<section class="wrap" part="card" aria-label="${o}"><header class="head" part="header"><h2>${o}</h2><span class="count">${s===1?this.t("1 crystal"):this.t("{{count}} crystals",{count:s})}</span></header><ul class="grid" part="section crystals">${n.map(i=>g`<li><button type="button" class="tile" aria-pressed="${this.openedRowId===i.id?"true":"false"}" @click="${()=>this.pickRow({id:i.id,name:i.name})}">${i.imageUrl?g`<img class="photo" src="${i.imageUrl}" alt="${i.name??this.t("Crystal")}" loading="lazy">`:g`<div class="photo" aria-hidden="true"></div>`}<p class="name">${i.name}</p>${i.colors&&i.colors.length>0?g`<div class="colors" aria-label="${this.t("Colors: {{list}}",{list:se(this.effectiveLang(),i.colors)})}">${i.colors.map(l=>g`<span class="swatch" style="${`background:${te(l)}`}" title="${l}"></span>`)}</div>`:ae}</button></li>`)}</ul>${this.renderMore()} ${this.openedRow?g`<div class="detail" part="detail">${this.openedRow}</div>`:ae}</section>`}deriveHeading(e){return"chakra"in e&&e.chakra?this.t("{{chakra}} chakra crystals",{chakra:e.chakra}):"element"in e&&e.element?this.t("{{element}} element crystals",{element:e.element}):"sign"in e&&e.sign?this.t("Crystals for {{sign}}",{sign:e.sign}):"month"in e&&typeof e.month=="number"?this.t("{{month}} birthstones",{month:ie(this.effectiveLang(),e.month)}):this.t("Crystals")}};f.endpoints=L,f.styles=[k,Ae`.wrap{gap:var(--roxy-space-md);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,1fr);display:grid}h2,p{margin:0}.head{justify-content:space-between;align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;display:flex}.count{color:var(--roxy-muted);font-size:var(--roxy-text-sm)}.grid{gap:var(--roxy-space-md);grid-template-columns:repeat(auto-fill,minmax(min(100%,16ch),1fr));margin:0;padding:0;list-style:none;display:grid}.tile{gap:var(--roxy-space-xs);width:100%;padding:var(--roxy-space-xs);color:inherit;border-radius:var(--roxy-radius-md);text-align:start;cursor:pointer;transition:border-color var(--roxy-motion-duration) var(--roxy-motion-easing);background:0 0;border:1px solid #0000;display:grid}.tile[aria-pressed=true],.tile:hover{border-color:var(--roxy-accent)}.detail{margin-block-start:var(--roxy-space-md)}.photo{aspect-ratio:1;border-radius:var(--roxy-radius-sm);object-fit:cover;background:var(--roxy-border);width:100%}.name{font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-bold)}.colors{gap:var(--roxy-space-xs);flex-wrap:wrap;display:flex}.swatch{border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-full);block-size:.4lh;inline-size:.4lh}`],a([Ge({type:String,reflect:!0})],f.prototype,"heading",2),f=a([re("roxy-crystal-grid")],f);export{f as RoxyCrystalGrid};
