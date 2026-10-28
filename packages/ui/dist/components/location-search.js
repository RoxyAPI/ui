var j=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var i=(t,r,e,o)=>{for(var s=o>1?void 0:o?D(r,e):r,a=t.length-1,l;a>=0;a--)(l=t[a])&&(s=(o?l(r,e,s):l(s))||s);return o&&s&&j(r,e,s),s};import{css as Q,html as c,nothing as b}from"lit";import{property as d,state as u}from"lit/decorators.js";import{LitElement as M}from"lit";var v=`/**
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
`;var w="roxy-ui-tokens";function k(){if(typeof document>"u")return null;let t=document.getElementById(w);if(t)return t;let r=document.createElement("style");return r.id=w,r.textContent=v,document.head.prepend(r),r}function R(t){if(t.lang)return t.lang;if(typeof document>"u")return;let r=t.closest?.("[lang]")?.getAttribute("lang");return r||document.documentElement.lang||void 0}function C(t){return t.toLowerCase().replace(/[\s_-]+/g," ").trim()}var E="__ROXY_UI_I18N__";function A(){let t=globalThis,r=t[E];if(r)return r;let e={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return t[E]=e,e}function H(t,r){return r?t.replace(/\{\{(\w+)\}\}/g,(e,o)=>o in r?String(r[o]??""):e):t}function S(t,r,e){return H(Y(t,r)??r,e)}function Y(t,r){if(!t)return;let{catalogs:e}=A(),o=t.toLowerCase();return(e[o]??e[o.split("-")[0]])?.[C(r)]}function L(t){let{listeners:r}=A();return r.add(t),()=>{r.delete(t)}}var h=class{constructor(r){this.host=r,r.addController(this)}hostConnected(){this.unsubscribe=L(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var y=class extends M{constructor(){super();this.translator=(e,o)=>this.t(e,o);new h(this)}connectedCallback(){super.connectedCallback(),k()}t(e,o){return S(this.effectiveLang(),e,o)}effectiveLang(){return R(this)}};import{css as N}from"lit";import{css as q}from"lit";var T=q`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var B=N`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,O=[B,T];import{css as G}from"lit";var $=G`.spinner{inset-inline-end:calc(var(--roxy-space-unit) * 3);border:var(--roxy-line-thick) solid var(--roxy-muted);border-radius:var(--roxy-radius-full);border-top-color:#0000;block-size:.6lh;inline-size:.6lh;animation:.7s linear infinite roxy-spin;position:absolute;top:50%;transform:translateY(-50%)}@keyframes roxy-spin{to{transform:translateY(-50%)rotate(360deg)}}@media (prefers-reduced-motion:reduce){.spinner{animation:none}}.results{z-index:50;top:calc(100% + var(--roxy-space-xs));padding:var(--roxy-space-xs);background:var(--roxy-bg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);box-shadow:var(--roxy-shadow-md);max-block-size:15lh;animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing);margin:0;list-style:none;position:absolute;left:0;right:0;overflow-y:auto}.option{align-items:center;gap:var(--roxy-space-sm);inline-size:100%;min-block-size:var(--roxy-touch);padding:var(--roxy-space-sm) var(--roxy-space-md);border-radius:var(--roxy-radius-sm);text-align:start;font-size:var(--roxy-text-sm);color:var(--roxy-fg);cursor:pointer;transition:background-color var(--roxy-motion-duration);background:0 0;border:0;display:flex}.option:hover,.option[aria-selected=true]{background:color-mix(in srgb, var(--roxy-accent) 10%, transparent)}.empty{padding:var(--roxy-space-md);color:var(--roxy-muted);font-size:var(--roxy-text-sm)}`;function K(t,r){let e,o=((...s)=>{e&&clearTimeout(e),e=setTimeout(()=>{e=void 0,t(...s)},r)});return o.cancel=()=>{e&&(clearTimeout(e),e=void 0)},o}var U=t=>r=>{customElements.get(t)||customElements.define(t,r)};var X="pk_live_YOUR_KEY",_={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function p(t){if(t)return t===X?_.sample:t.startsWith("pk_")?void 0:_.secret}function f(t,r,e={}){e.warn&&console.warn(r.message),t.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:r.reason,message:r.message},bubbles:!0,composed:!0}))}var m="https://roxyapi.com/api/v2";async function z(t){return(await F(t)).message}async function F(t){try{let r=await t.json();if(r?.error){let e=r.code==="validation_error"&&Array.isArray(r.issues)?r.issues.filter(o=>typeof o.path=="string"&&typeof o.message=="string").map(o=>({path:o.path,message:o.message})):null;return{message:r.error,issues:e?.length?e:null,worded:!0}}}catch{}return{message:`Request failed (${t.status})`,issues:null,worded:!1}}var I={fromAttribute:t=>{if(t!=null){try{let r=JSON.parse(t);if(r&&typeof r=="object"&&!Array.isArray(r))return r}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},x=class extends Error{constructor(e,o=null,s=!0){super(e);this.issues=o;this.worded=s}};function V(t){return t.submitUrl?void 0:p(t.publishableKey)}async function P(t,r,e){let o=V(t);if(o)throw new x(o.message);let s=t.submitUrl?await fetch(t.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:J(r,t.submitContext),signal:e}):await Z(t,r,e);if(!s.ok){let a=await F(s);throw new x(a.message,a.issues,a.worded)}return await s.json()}function J(t,r){return JSON.stringify(r?{...t,context:r}:t)}function Z(t,r,e){let o=new URL(`${t.baseUrl??m}${r.path}`,document.baseURI);for(let[a,l]of Object.entries(r.query??{}))l!=null&&o.searchParams.set(a,String(l));let s={Accept:"application/json"};return t.publishableKey&&(s["X-API-Key"]=t.publishableKey),r.body!=null&&(s["Content-Type"]="application/json"),fetch(o,{method:r.method??"GET",headers:s,body:r.body!=null?JSON.stringify(r.body):void 0,signal:e})}var n=class extends y{constructor(){super(...arguments);this.placeholder="Search city";this.defaultValue="";this.query="";this.results=[];this.isOpen=!1;this.isLoading=!1;this.highlight=-1;this.error=null;this.debouncedFetch=K(e=>{this.fetchResults(e)},300);this.onInput=e=>{let o=e.target.value;if(this.query=o,o.length<2){this.results=[],this.isOpen=!1,this.highlight=-1,this.error=null;return}this.debouncedFetch(o)};this.onKeyDown=e=>{if(!this.isOpen||this.results.length===0){e.key==="ArrowDown"&&this.query.length>=2&&(this.fetchResults(this.query),e.preventDefault());return}if(e.key==="ArrowDown")e.preventDefault(),this.highlight=(this.highlight+1)%this.results.length;else if(e.key==="ArrowUp")e.preventDefault(),this.highlight=(this.highlight-1+this.results.length)%this.results.length;else if(e.key==="Enter"){e.preventDefault();let o=this.results[this.highlight]??this.results[0];o&&this.select(o)}else e.key==="Escape"&&(this.isOpen=!1)}}connectedCallback(){super.connectedCallback(),this.query=this.defaultValue,this.clickOutsideHandler=e=>{e.composedPath().includes(this)||(this.isOpen=!1)},document.addEventListener("mousedown",this.clickOutsideHandler)}willUpdate(e){if(e.has("publishableKey")||e.has("apiKey")){let o=p(this.publishableKey??this.apiKey);o&&!this.refusal&&f(this,o,{warn:!0}),this.refusal=o}}disconnectedCallback(){super.disconnectedCallback(),this.clickOutsideHandler&&document.removeEventListener("mousedown",this.clickOutsideHandler),this.debouncedFetch.cancel(),this.abortController&&(this.abortController.abort(),this.abortController=void 0)}async fetchResults(e){if(this.refusal)return;this.abortController&&this.abortController.abort();let o=new AbortController;this.abortController=o,this.isLoading=!0;try{let s=await this.search(e,o.signal);if(o.signal.aborted)return;this.error=null,this.results=s.cities??[],this.isOpen=!0,this.highlight=this.results.length>0?0:-1}catch(s){if(s?.name==="AbortError")return;this.results=[],this.isOpen=!1,this.highlight=-1,this.error=s instanceof Error?s.message:String(s)}finally{this.abortController===o&&(this.abortController=void 0),o.signal.aborted||(this.isLoading=!1)}}async search(e,o){if(!this.endpoint&&this.submitUrl)return P({submitUrl:this.submitUrl,submitContext:this.submitContext},{path:"/location/search",method:"GET",query:{q:e,limit:8}},o);let s=new URL(this.endpoint||`${m}/location/search`,document.baseURI);s.searchParams.set("q",e),s.searchParams.set("limit","8");let a={Accept:"application/json"};this.apiKey&&this.publishableKey&&console.warn("[roxy-location-search] both api-key and publishable-key set; using publishable-key. Remove api-key from your widget markup.");let l=this.publishableKey??this.apiKey;l&&(a["X-API-Key"]=l);let g=await fetch(s,{headers:a,signal:o});if(!g.ok)throw new Error(await z(g));return await g.json()}select(e){this.query=`${e.city}${e.province?`, ${e.province}`:""}, ${e.country}`,this.isOpen=!1,this.results=[],this.dispatchEvent(new CustomEvent("roxy-location-select",{detail:e,bubbles:!0,composed:!0}))}render(){return this.refusal?c`<div class="roxy-error" role="alert">${this.t(this.refusal.message)}</div>`:c`<div class="field"><input part="input" type="text" role="combobox" aria-expanded="${this.isOpen?"true":"false"}" aria-controls="roxy-location-listbox" aria-activedescendant="${this.isOpen&&this.highlight>=0?`roxy-location-option-${this.highlight}`:""}" aria-autocomplete="list" autocomplete="off" placeholder="${this.t(this.placeholder)}" .value="${this.query}" @input="${this.onInput}" @keydown="${this.onKeyDown}" @focus="${()=>{this.results.length>0&&(this.isOpen=!0)}}"> ${this.isLoading?c`<span class="spinner" role="status" aria-label="${this.t("Loading")}"></span>`:b} ${this.isOpen?c`<ul id="roxy-location-listbox" part="results" class="results" role="listbox">${this.results.length===0?c`<li class="empty" role="status">${this.t("No cities found")}</li>`:this.results.map((e,o)=>c`<li role="presentation"><button type="button" part="option" class="option" role="option" id="${`roxy-location-option-${o}`}" aria-selected="${this.highlight===o?"true":"false"}" @click="${()=>this.select(e)}" @mouseenter="${()=>{this.highlight=o}}"><span class="city">${e.city}</span> <span class="where">${e.province?c`${e.province},`:""}${e.country}</span> <span class="tz">UTC${e.utcOffset>=0?"+":""}${e.utcOffset}</span></button></li>`)}</ul>`:b}</div>${this.error?c`<p class="search-error" role="alert">${this.t(this.error)}</p>`:b}`}};n.styles=[O,$,Q`:host{display:block;position:relative}.field{position:relative}input{inline-size:100%;min-block-size:var(--roxy-touch)}.option .city{font-weight:var(--roxy-weight-bold)}.option .where{color:var(--roxy-muted);flex-grow:1}.option .tz{color:var(--roxy-muted);font-size:var(--roxy-text-xs);font-variant-numeric:tabular-nums}.search-error{margin:var(--roxy-space-xs) 0 0;color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm)}`],i([d({type:String,attribute:"api-key"})],n.prototype,"apiKey",2),i([d({type:String,attribute:"publishable-key"})],n.prototype,"publishableKey",2),i([d({type:String})],n.prototype,"endpoint",2),i([d({type:String,attribute:"submit-url"})],n.prototype,"submitUrl",2),i([d({attribute:"submit-context",converter:I})],n.prototype,"submitContext",2),i([d({type:String})],n.prototype,"placeholder",2),i([d({type:String,attribute:"default-value"})],n.prototype,"defaultValue",2),i([u()],n.prototype,"query",2),i([u()],n.prototype,"results",2),i([u()],n.prototype,"isOpen",2),i([u()],n.prototype,"isLoading",2),i([u()],n.prototype,"highlight",2),i([u()],n.prototype,"refusal",2),i([u()],n.prototype,"error",2),n=i([U("roxy-location-search")],n);export{n as RoxyLocationSearch};
