var fe=Object.defineProperty;var xe=Object.getOwnPropertyDescriptor;var s=(r,t,e,n)=>{for(var o=n>1?void 0:n?xe(t,e):t,a=r.length-1,i;a>=0;a--)(i=r[a])&&(o=(n?i(t,e,o):i(o))||o);return n&&o&&fe(t,e,o),o};import{css as He,html as l,nothing as c}from"lit";import{property as Be}from"lit/decorators.js";var U=[{endpoint:"chinese-astrology/calendar/day/{date}",method:"GET",attrs:{mode:"day"}},{endpoint:"chinese-astrology/calendar/monthly",method:"GET",attrs:{mode:"month"}},{endpoint:"chinese-astrology/calendar/auspicious-days",method:"POST",attrs:{mode:"auspicious"}}];import{html as p,nothing as m}from"lit";import{property as h,state as y}from"lit/decorators.js";import{ifDefined as w}from"lit/directives/if-defined.js";var _=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function D(r){if(r.lang)return r.lang;if(typeof document>"u")return;let t=r.closest?.("[lang]")?.getAttribute("lang");return t||document.documentElement.lang||void 0}var be={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function L(r){let t=r.toLowerCase();return _.find(e=>e.toLowerCase()===t)}function M(r){let t=D(r);if(!t)return;let e=L(t);if(e)return e;let n=t.toLowerCase().split("-"),o=n[0];if(o==="zh"){let a=n.find(i=>i==="hans"||i==="hant")??be[n[1]??""];return a?L(`zh-${a}`):void 0}return L(o)}import{LitElement as ke}from"lit";var j=`/**
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
`;var q="roxy-ui-tokens";function H(){if(typeof document>"u")return null;let r=document.getElementById(q);if(r)return r;let t=document.createElement("style");return t.id=q,t.textContent=j,document.head.prepend(t),t}function B(r){return r.toLowerCase().replace(/[\s_-]+/g," ").trim()}function S(r){return r.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/([a-z])([0-9])/g,"$1 $2").replace(/^\w/,t=>t.toUpperCase())}var Y="__ROXY_UI_I18N__";function G(){let r=globalThis,t=r[Y];if(t)return t;let e={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return r[Y]=e,e}function ve(r,t){return t?r.replace(/\{\{(\w+)\}\}/g,(e,n)=>n in t?String(t[n]??""):e):r}function Z(r,t,e){return ve(we(r,t)??t,e)}function we(r,t){if(!r)return;let{catalogs:e}=G(),n=r.toLowerCase();return(e[n]??e[n.split("-")[0]])?.[B(t)]}function Se(r){if(!r)return;let{fieldLabels:t}=G(),e=r.toLowerCase();return t[e]??t[e.split("-")[0]]}function V(r,t,e){return Se(r)?.enums[`${t}.${e}`]}function W(r){let{listeners:t}=G();return t.add(r),()=>{t.delete(r)}}var T=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){this.unsubscribe=W(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var E=class extends ke{constructor(){super();this.translator=(e,n)=>this.t(e,n);new T(this)}connectedCallback(){super.connectedCallback(),H()}t(e,n){return Z(this.effectiveLang(),e,n)}effectiveLang(){return D(this)}};import{css as Ee}from"lit";import{css as Te}from"lit";var J=Te`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var Re=Ee`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,R=[Re,J];var $e="__cols",Oe="__rows";function Pe(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function $(r){if(Array.isArray(r)){let a=!1,i=r.map(u=>{let f=$(u);return f!==u&&(a=!0),f});return a?i:r}if(!Pe(r))return r;let t=r[$e],e=r[Oe];if(Array.isArray(t)&&Array.isArray(e)&&Object.keys(r).length===2)return e.map(a=>{let i={};return t.forEach((u,f)=>{i[u]=$(a[f])}),i});let n=!1,o={};for(let[a,i]of Object.entries(r)){let u=$(i);u!==i&&(n=!0),o[a]=u}return n?o:r}function X(r){return $(r)}function Q(r,t){return r.find(e=>e.attrs&&Object.entries(e.attrs).every(([n,o])=>t[n]===o))??r[0]}var Fe="pk_live_YOUR_KEY",ee={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function te(r){if(r)return r===Fe?ee.sample:r.startsWith("pk_")?void 0:ee.secret}function re(r,t,e={}){e.warn&&console.warn(t.message),r.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:t.reason,message:t.message},bubbles:!0,composed:!0}))}var ne="https://roxyapi.com/api/v2";async function Ae(r){try{let t=await r.json();if(t?.error){let e=t.code==="validation_error"&&Array.isArray(t.issues)?t.issues.filter(n=>typeof n.path=="string"&&typeof n.message=="string").map(n=>({path:n.path,message:n.message})):null;return{message:t.error,issues:e?.length?e:null,worded:!0}}}catch{}return{message:`Request failed (${r.status})`,issues:null,worded:!1}}var oe={fromAttribute:r=>{if(r!=null){try{let t=JSON.parse(r);if(t&&typeof t=="object"&&!Array.isArray(t))return t}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},v=class extends Error{constructor(e,n=null,o=!0){super(e);this.issues=n;this.worded=o}};function ae(r){return r.submitUrl?void 0:te(r.publishableKey)}async function z(r,t,e){let n=ae(r);if(n)throw new v(n.message);let o=r.submitUrl?await fetch(r.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Ce(t,r.submitContext),signal:e}):await Le(r,t,e);if(!o.ok){let a=await Ae(o);throw new v(a.message,a.issues,a.worded)}return await o.json()}function Ce(r,t){return JSON.stringify(t?{...r,context:t}:r)}function Le(r,t,e){let n=new URL(`${r.baseUrl??ne}${t.path}`,document.baseURI);for(let[a,i]of Object.entries(t.query??{}))i!=null&&n.searchParams.set(a,String(i));let o={Accept:"application/json"};return r.publishableKey&&(o["X-API-Key"]=r.publishableKey),t.body!=null&&(o["Content-Type"]="application/json"),fetch(n,{method:t.method??"GET",headers:o,body:t.body!=null?JSON.stringify(t.body):void 0,signal:e})}var O=class{constructor(t){this.baseUrl=ne;this.worded=!0;this.host=t,t.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(t){this.worded=!0;let e=ae(this);if(e){this.host.error=e.message,re(this.host,e);return}this.abort?.abort();let n=new AbortController;this.abort=n,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let o=await z(this,t,n.signal);if(n.signal.aborted)return;this.host.data=o}catch(o){if(n.signal.aborted||o?.name==="AbortError")return;o instanceof v&&(this.host.issues=o.issues),this.worded=o instanceof v&&o.worded,this.host.error=o instanceof Error?o.message:String(o)}finally{this.abort===n&&(this.abort=void 0),n.signal.aborted||(this.host.loading=!1)}}};function ie(r,t,e,n=[]){let o={...e},a=`/${r.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(k,x)=>{let ge=o[x];return delete o[x],encodeURIComponent(String(ge??""))}),i=new Set(n),u={},f={};for(let[k,x]of Object.entries(o))x===void 0||x===""||(t==="GET"||i.has(k)?u[k]=x:f[k]=x);return{path:a,method:t,query:u,body:t==="POST"?f:void 0}}import{css as ze,html as I,nothing as N}from"lit";import{css as De,html as Ge}from"lit";function se(){return Ge`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var kt=De`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var $t=ze`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function de(r,t,e){let n=r.filter(o=>!!o.body);return n.length===0?N:I`<section class="block" part="section readings"><h3>${e}</h3>${n.map((o,a)=>I`<details class="interp-card" part="reading" name="${t}" ?open="${a===0}"><summary><span class="interp-lead">${o.label}</span> ${se()} ${o.aside?I`<span class="interp-aside"><small>${o.aside}</small></span>`:N}</summary><div class="interp-body"><p>${o.body}</p>${o.extra??N}</div></details>`)}</section>`}var Ie="roxy-data";function Ne(r){return r.nodeName==="SCRIPT"&&r.getAttribute("type")==="application/json"}var P=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){if(this.host.data!=null)return;let t=this.read();t!==void 0&&(this.host.data=t,this.host.requestUpdate())}read(){let t=this.findInlineScript();return t?this.parse(t.textContent):void 0}findInlineScript(){for(let t of Array.from(this.host.children))if(Ne(t)&&t.classList.contains(Ie))return t;return null}parse(t){if(t?.trim())try{return JSON.parse(t)}catch{return}}};var d=class extends E{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let e=this.lastRequest,n=this.listKey,o=this.listRows();if(!(!e||!n||!o)){this.moreLoading=!0,this.moreError=null;try{let a=await z(this.fetcher,{...e,query:{...e.query,offset:o.length}});if(this.lastRequest!==e)return;let i=a[n];this.data={...this.data,...a,[n]:[...o,...Array.isArray(i)?i:[]]}}catch(a){this.lastRequest===e&&(this.moreError=a instanceof Error?a.message:String(a))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=e=>{let n=this.selfFetch();if(!n)return;let o=e.detail;this.lastValues=o.values,this.sticky=!!o.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(o.values),this.fetchFresh(ie(n.endpoint,n.method,o.values,o.queryKeys??[]))};new P(this),this.fetcher=new O(this)}static{this.styles=[R]}static{this.endpoints=[]}willUpdate(e){if(e.has("data")&&this.data!=null){let n=X(this.data);n!==this.data&&(this.data=n)}(e.has("publishableKey")||e.has("baseUrl")||e.has("submitUrl")||e.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let e=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:Q(this.constructor.endpoints,this);return e&&{endpoint:e.endpoint,method:this.method??e.method}}render(){return p`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(e){try{return this.renderData(e)}catch(n){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,n),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:n},bubbles:!0,composed:!0})),customElements.get("roxy-data")?p`<roxy-data .data="${e}" lang="${w(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let e=this.hideSections.split(",").map(o=>o.trim().toLowerCase()).filter(o=>/^[a-z][a-z0-9-]*$/.test(o));if(e.length===0)return m;let n=e.map(o=>`[part~="${o}"],roxy-endpoint-form::part(${o}){display:none!important}`).join("");return p`<style>${n}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?p`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(e,n,o){return this.hideReadings?m:de(e,n,this.t(o??"Reading"))}renderResult(e){let n=p`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(e)}`;return this.showAttribution()?p`${n}${this.renderAttribution()}`:n}renderWithForm(e){return p`${this.renderForm()}${e}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?m:this.renderErrorBanner(this.error):this.data==null?m:this.showAttribution()?p`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let e=this.listRows(),n=this.data?.total;return!this.lastRequest||!e||typeof n!="number"?m:e.length>=n?m:p`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?p`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:m}</div>`}listRows(){let e=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(e)?e:void 0}fetchFresh(e){return this.lastRequest=e,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(e)}load(e){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(e)}pickRow(e){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:e,bubbles:!0,composed:!0})),this.openRow(e.id)}openRow(e){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let n=this.openedRow??document.createElement(this.rowDetail.tag);n.publishableKey=this.publishableKey,n.baseUrl=this.baseUrl,n.submitUrl=this.submitUrl,n.submitContext=this.submitContext,n.hideReadings=this.hideReadings,n.hideSections=this.hideSections;let o=this.effectiveLang();o&&n.setAttribute("lang",o),this.openedRow=n,this.openedRowId=e,n.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(e))}`,method:"GET",query:{lang:M(this)}}).then(()=>n.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return p`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(m):this.renderEmpty()}renderForm(){let e=this.selfFetch();return p`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${e?.endpoint??""}" method="${e?.method??"POST"}" spec-url="${w(this.specUrl)}" publishable-key="${w(this.publishableKey)}" location-url="${w(this.locationUrl)}" submit-label="${w(this.submitLabel)}" lang="${w(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let e=sessionStorage.getItem(this.rememberKey());return e?JSON.parse(e):void 0}catch{return}}writeRemembered(e){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(e))}catch{}}renderEmpty(){return p`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return p`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(e){let n=!!this.selfFetch();if(n&&this.issues)return this.renderForm();let o=this.renderErrorBanner(e);return n?p`${o}${this.renderForm()}`:o}renderErrorBanner(e){return p`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(e)}</div>`}};s([h({attribute:!1})],d.prototype,"data",2),s([h({type:String,attribute:"data-endpoint"})],d.prototype,"endpoint",2),s([h({type:String})],d.prototype,"method",2),s([h({type:String,attribute:"publishable-key"})],d.prototype,"publishableKey",2),s([h({type:String,attribute:"base-url"})],d.prototype,"baseUrl",2),s([h({type:String,attribute:"spec-url"})],d.prototype,"specUrl",2),s([h({type:String,attribute:"submit-url"})],d.prototype,"submitUrl",2),s([h({attribute:"submit-context",converter:oe})],d.prototype,"submitContext",2),s([h({type:String,attribute:"location-url"})],d.prototype,"locationUrl",2),s([h({type:Boolean})],d.prototype,"remember",2),s([h({type:Boolean,attribute:"hide-readings",reflect:!0})],d.prototype,"hideReadings",2),s([h({type:String,attribute:"hide-sections",reflect:!0})],d.prototype,"hideSections",2),s([h({type:String,attribute:"submit-label"})],d.prototype,"submitLabel",2),s([h({type:String,attribute:"error-message"})],d.prototype,"errorMessage",2),s([h({type:String})],d.prototype,"attribution",2),s([y()],d.prototype,"loading",2),s([y()],d.prototype,"error",2),s([y()],d.prototype,"issues",2),s([y()],d.prototype,"selfFetched",2),s([y()],d.prototype,"editing",2),s([y()],d.prototype,"sticky",2),s([y()],d.prototype,"openedRow",2),s([y()],d.prototype,"openedRowId",2),s([y()],d.prototype,"moreLoading",2),s([y()],d.prototype,"moreError",2);var le=r=>t=>{customElements.get(r)||customElements.define(r,t)};var Ke=/^\d{4}-\d{2}-\d{2}$/,Ue=/^\d{4}-\d{2}$/,_e=/^\d{2}:\d{2}(:\d{2})?$/,Me=/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/,ce=new Map;function A(r){if(!r)return["en"];let t=ce.get(r);if(t)return[t,"en"];let e="en";try{e=Intl.getCanonicalLocales(r)[0]??"en"}catch{e="en"}return ce.set(r,e),[e,"en"]}function je(r,t){return r&&t?`${r} - ${t}`:r||t}function pe(r){let t=_e.test(r)?`1970-01-01T${r}`:Ke.test(r)?`${r}T00:00:00`:Ue.test(r)?`${r}-01T00:00:00`:Me.test(r)?r.replace(" ","T"):null;return t?{d:new Date(`${t}Z`),timeZone:"UTC"}:{d:new Date(r)}}function F(r,t){if(typeof t!="string"||t.length===0)return"";let{d:e,timeZone:n}=pe(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(A(r),{month:"short",day:"numeric",year:"numeric",timeZone:n})}function he(r,t,e){return je(F(r,t),F(r,e))}function K(r,t){if(typeof t!="string"||t.length===0)return"";let{d:e,timeZone:n}=pe(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(A(r),{month:"short",day:"numeric",timeZone:n})}function ue(r,t,e){return typeof t!="number"||!Number.isFinite(t)||typeof e!="number"||!Number.isInteger(e)||e<1||e>12?"":new Date(Date.UTC(t,e-1,1,12)).toLocaleDateString(A(r),{month:"long",year:"numeric",timeZone:"UTC"})}function ye(r,t){return typeof t!="number"||!Number.isFinite(t)?"":t.toLocaleString(A(r),{maximumFractionDigits:0})}function C(r,t,e,n){return V(r,t,e)??n??S(e)}var qe="Localized";function g(r,t,e){let n=r,o=n?.[`${t}${qe}`];if(typeof o=="string"&&o!=="")return o;if(e!==void 0)return e;let a=n?.[t];return typeof a=="string"?a:""}function me(r){return!("days"in r)}var b=class extends d{constructor(){super(...arguments);this.mode="day"}renderData(e){let n=this.effectiveLang();return this.mode==="day"&&me(e)?l`<article class="card" part="card" aria-labelledby="almanac-title">${this.renderDayCard(e,n)}</article>`:me(e)?c:l`<article class="card" part="card" aria-labelledby="almanac-title"><header class="head" part="header"><h2 class="title" id="almanac-title">${"activityLabel"in e&&e.activityLabel?e.activityLabel:this.t("Almanac")}</h2>${"startDate"in e&&e.startDate?l`<span class="lunar">${he(n,e.startDate,e.endDate)}</span>`:c} ${"year"in e&&typeof e.year=="number"?l`<span class="lunar">${ue(n,e.year,e.month)||e.year}</span>`:c} ${typeof e.total=="number"?l`<span class="lunar">${this.t("{{count}} days",{count:ye(n,e.total)})}</span>`:c}</header>${"avoidAnimal"in e&&e.avoidAnimal?l`<div class="facts" part="details"><span><span class="roxy-label">${this.t("Avoiding")}</span><b>${S(g(e,"avoidAnimal"))}</b></span></div>`:c} ${this.renderSolarTerms(e,n)}<section part="section days"><ul class="days">${(e.days??[]).map(o=>this.renderDayRow(o,n))}</ul></section></article>`}renderDayCard(e,n){let o=e.dayOfficer;return l`<header class="head" part="header"><h2 class="title" id="almanac-title">${F(n,e.date)}</h2>${e.lunar?l`<span class="lunar">${e.lunar.isLeapMonth?this.t("Lunar {{month}}/{{day}} (leap)",{month:String(e.lunar.month??""),day:String(e.lunar.day??"")}):this.t("Lunar {{month}}/{{day}}",{month:String(e.lunar.month??""),day:String(e.lunar.day??"")})}</span>`:c} ${o?.name?l`<span class="roxy-chip tag tag-${o.quality??"neutral"}">${g(o,"name")} <span lang="zh">${o.chinese??""}</span></span>`:c}</header>${this.renderPillars(e)} ${this.renderLists(e,n)} ${o?.meaning&&!this.hideReadings?l`<p class="meaning" part="reading">${o.meaning}</p>`:c} ${this.renderMansion(e)}`}renderPillars(e){let o=[["Year",e.yearPillar],["Month",e.monthPillar],["Day",e.dayPillar]].filter(([,a])=>a?.chinese||a?.stem);return o.length===0&&!e.clashAnimal?c:l`<div class="facts" part="details">${o.map(([a,i])=>l`<span><span class="roxy-label">${this.t(a)}</span> <b lang="zh">${i?.chinese??""}</b> ${i?.naYin??""}</span>`)} ${e.clashAnimal?l`<span><span class="roxy-label">${this.t("Clash")}</span><b>${g(e,"clashAnimal")}</b></span>`:c}</div>`}renderLists(e,n){let o=e.favours??[],a=e.avoids??[];return o.length===0&&a.length===0?c:l`<div class="lists" part="section activities">${o.length?l`<div class="list"><h3>${this.t("Favours")}</h3><div class="roxy-chips chips-favour">${o.map(i=>l`<span class="roxy-chip">${C(n,"activity",i)}</span>`)}</div></div>`:c} ${a.length?l`<div class="list"><h3>${this.t("Avoids")}</h3><div class="roxy-chips chips-avoid">${a.map(i=>l`<span class="roxy-chip">${C(n,"activity",i)}</span>`)}</div></div>`:c}</div>`}renderMansion(e){let n=e.mansion;return n?.name?l`<div class="facts" part="details"><span><span class="roxy-label">${this.t("Mansion")}</span><b>${g(n,"name")}</b> <span lang="zh">${n.chinese??""}</span></span> ${n.palace?l`<span>${S(n.palace)}</span>`:c} ${n.planet?l`<span>${n.planet}</span>`:c} ${n.animal?l`<span>${g(n,"animal")}</span>`:c}</div>`:c}renderSolarTerms(e,n){let o="solarTerms"in e?e.solarTerms??[]:[];return o.length===0?c:l`<div class="terms" part="details">${o.map(a=>l`<span>${K(n,a.date)} ${a.name??""}</span>`)}</div>`}renderDayRow(e,n){let o=e.dayOfficer,a=e.favours??[];return l`<li class="day" part="label-track"><span class="day-date">${K(n,e.date)}</span><div class="day-body"><span lang="zh">${e.dayPillar?.chinese??""}</span> ${o?.name?l`<span class="roxy-chip tag tag-${o.quality??"neutral"}">${g(o,"name")}</span>`:c} ${a.length?l`<span class="roxy-chips chips-favour">${a.map(i=>l`<span class="roxy-chip">${C(n,"activity",i)}</span>`)}</span>`:c} ${e.clashAnimal?l`<span class="roxy-label">${this.t("Clash")} ${g(e,"clashAnimal")}</span>`:c}</div></li>`}};b.endpoints=U,b.styles=[R,He`.card{gap:var(--roxy-space-md);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,1fr);display:grid}.head{align-items:baseline;gap:var(--roxy-space-xs) var(--roxy-space-md);flex-wrap:wrap;display:flex}.title,.list h3{margin:0}.list h3{margin-block-end:var(--roxy-space-xs)}.lunar{color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}.facts{gap:var(--roxy-space-xs) var(--roxy-space-md);color:var(--roxy-secondary);font-size:var(--roxy-text-sm);flex-wrap:wrap;display:flex}.facts .roxy-label{margin-inline-end:var(--roxy-space-xs)}.facts b{color:var(--roxy-fg)}:is(.tag-auspicious,.chips-favour>*){color:var(--roxy-success-fg)}:is(.tag-inauspicious,.chips-avoid>*){color:var(--roxy-danger-fg)}.tag-neutral{color:var(--roxy-info-fg)}.lists{gap:var(--roxy-space-md);grid-template-columns:repeat(auto-fit,minmax(min(100%,24ch),1fr));display:grid}.meaning{color:var(--roxy-secondary);font-size:var(--roxy-text-sm);margin:0;padding-block-start:var(--roxy-space-md)}.days{margin:0;padding:0;list-style:none;display:grid}.day{grid-template-columns:var(--roxy-label-col) minmax(0, 1fr);align-items:baseline;gap:calc(var(--roxy-space-unit) / 2) var(--roxy-space-md);padding-block:var(--roxy-space-sm);border-block-start:1px solid var(--roxy-border);font-size:var(--roxy-text-sm);display:grid}.day:first-child{border-block-start:0;padding-block-start:0}.day-date{color:var(--roxy-accent-ink);font-weight:var(--roxy-weight-bold);font-variant-numeric:tabular-nums}.day-body{align-items:baseline;gap:var(--roxy-space-xs) var(--roxy-space-sm);flex-wrap:wrap;display:flex}.terms{gap:var(--roxy-space-xs) var(--roxy-space-md);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);flex-wrap:wrap;display:flex}`],s([Be({type:String,reflect:!0})],b.prototype,"mode",2),b=s([le("roxy-almanac-day")],b);export{b as RoxyAlmanacDay};
