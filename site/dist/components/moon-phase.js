var ue=Object.defineProperty;var me=Object.getOwnPropertyDescriptor;var s=(r,t,e,n)=>{for(var o=n>1?void 0:n?me(t,e):t,i=r.length-1,d;i>=0;i--)(d=r[i])&&(o=(n?d(t,e,o):d(o))||o);return n&&o&&ue(t,e,o),o};import{css as De,html as p,nothing as y}from"lit";import{property as Me}from"lit/decorators.js";var U=[{endpoint:"astrology/moon-phase/current",method:"GET",attrs:{mode:"current"}},{endpoint:"astrology/moon-phase/upcoming",method:"GET",attrs:{mode:"upcoming"}},{endpoint:"astrology/moon-phase/calendar/{year}/{month}",method:"GET",attrs:{mode:"calendar"}}];function S(r){return r.toLowerCase().replace(/[\s_-]+/g," ").trim()}var _={"new moon":"🌑","waxing crescent":"🌒","first quarter":"🌓","waxing gibbous":"🌔","full moon":"🌕","waning gibbous":"🌖","last quarter":"🌗","waning crescent":"🌘"},D=r=>{if(!r)return;let t=S(r),e=t.replace(/ moon$/,""),n=e==="third quarter"?"last quarter":e;return _[t]??_[n]};import{html as l,nothing as m}from"lit";import{property as c,state as u}from"lit/decorators.js";import{ifDefined as v}from"lit/directives/if-defined.js";var M=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function L(r){if(r.lang)return r.lang;if(typeof document>"u")return;let t=r.closest?.("[lang]")?.getAttribute("lang");return t||document.documentElement.lang||void 0}var ye={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function F(r){let t=r.toLowerCase();return M.find(e=>e.toLowerCase()===t)}function K(r){let t=L(r);if(!t)return;let e=F(t);if(e)return e;let n=t.toLowerCase().split("-"),o=n[0];if(o==="zh"){let i=n.find(d=>d==="hans"||d==="hant")??ye[n[1]??""];return i?F(`zh-${i}`):void 0}return F(o)}import{LitElement as xe}from"lit";var j=`/**
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
`;var z="roxy-ui-tokens";function q(){if(typeof document>"u")return null;let r=document.getElementById(z);if(r)return r;let t=document.createElement("style");return t.id=z,t.textContent=j,document.head.prepend(t),t}var B="__ROXY_UI_I18N__";function H(){let r=globalThis,t=r[B];if(t)return t;let e={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return r[B]=e,e}function ge(r,t){return t?r.replace(/\{\{(\w+)\}\}/g,(e,n)=>n in t?String(t[n]??""):e):r}function Y(r,t,e){return ge(fe(r,t)??t,e)}function fe(r,t){if(!r)return;let{catalogs:e}=H(),n=r.toLowerCase();return(e[n]??e[n.split("-")[0]])?.[S(t)]}function Z(r){let{listeners:t}=H();return t.add(r),()=>{t.delete(r)}}var k=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){this.unsubscribe=Z(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var E=class extends xe{constructor(){super();this.translator=(e,n)=>this.t(e,n);new k(this)}connectedCallback(){super.connectedCallback(),q()}t(e,n){return Y(this.effectiveLang(),e,n)}effectiveLang(){return L(this)}};import{css as ve}from"lit";import{css as be}from"lit";var V=be`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var we=ve`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,T=[we,V];var Se="__cols",ke="__rows";function Ee(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function R(r){if(Array.isArray(r)){let i=!1,d=r.map(h=>{let g=R(h);return g!==h&&(i=!0),g});return i?d:r}if(!Ee(r))return r;let t=r[Se],e=r[ke];if(Array.isArray(t)&&Array.isArray(e)&&Object.keys(r).length===2)return e.map(i=>{let d={};return t.forEach((h,g)=>{d[h]=R(i[g])}),d});let n=!1,o={};for(let[i,d]of Object.entries(r)){let h=R(d);h!==d&&(n=!0),o[i]=h}return n?o:r}function J(r){return R(r)}function W(r,t){return r.find(e=>e.attrs&&Object.entries(e.attrs).every(([n,o])=>t[n]===o))??r[0]}var Te="pk_live_YOUR_KEY",X={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function Q(r){if(r)return r===Te?X.sample:r.startsWith("pk_")?void 0:X.secret}function ee(r,t,e={}){e.warn&&console.warn(t.message),r.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:t.reason,message:t.message},bubbles:!0,composed:!0}))}var te="https://roxyapi.com/api/v2";async function Re(r){try{let t=await r.json();if(t?.error){let e=t.code==="validation_error"&&Array.isArray(t.issues)?t.issues.filter(n=>typeof n.path=="string"&&typeof n.message=="string").map(n=>({path:n.path,message:n.message})):null;return{message:t.error,issues:e?.length?e:null,worded:!0}}}catch{}return{message:`Request failed (${r.status})`,issues:null,worded:!1}}var re={fromAttribute:r=>{if(r!=null){try{let t=JSON.parse(r);if(t&&typeof t=="object"&&!Array.isArray(t))return t}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},b=class extends Error{constructor(e,n=null,o=!0){super(e);this.issues=n;this.worded=o}};function ne(r){return r.submitUrl?void 0:Q(r.publishableKey)}async function $(r,t,e){let n=ne(r);if(n)throw new b(n.message);let o=r.submitUrl?await fetch(r.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Pe(t,r.submitContext),signal:e}):await Oe(r,t,e);if(!o.ok){let i=await Re(o);throw new b(i.message,i.issues,i.worded)}return await o.json()}function Pe(r,t){return JSON.stringify(t?{...r,context:t}:r)}function Oe(r,t,e){let n=new URL(`${r.baseUrl??te}${t.path}`,document.baseURI);for(let[i,d]of Object.entries(t.query??{}))d!=null&&n.searchParams.set(i,String(d));let o={Accept:"application/json"};return r.publishableKey&&(o["X-API-Key"]=r.publishableKey),t.body!=null&&(o["Content-Type"]="application/json"),fetch(n,{method:t.method??"GET",headers:o,body:t.body!=null?JSON.stringify(t.body):void 0,signal:e})}var P=class{constructor(t){this.baseUrl=te;this.worded=!0;this.host=t,t.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(t){this.worded=!0;let e=ne(this);if(e){this.host.error=e.message,ee(this.host,e);return}this.abort?.abort();let n=new AbortController;this.abort=n,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let o=await $(this,t,n.signal);if(n.signal.aborted)return;this.host.data=o}catch(o){if(n.signal.aborted||o?.name==="AbortError")return;o instanceof b&&(this.host.issues=o.issues),this.worded=o instanceof b&&o.worded,this.host.error=o instanceof Error?o.message:String(o)}finally{this.abort===n&&(this.abort=void 0),n.signal.aborted||(this.host.loading=!1)}}};function oe(r,t,e,n=[]){let o={...e},i=`/${r.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(w,f)=>{let he=o[f];return delete o[f],encodeURIComponent(String(he??""))}),d=new Set(n),h={},g={};for(let[w,f]of Object.entries(o))f===void 0||f===""||(t==="GET"||d.has(w)?h[w]=f:g[w]=f);return{path:i,method:t,query:h,body:t==="POST"?g:void 0}}import{css as Le,html as A,nothing as G}from"lit";import{css as Ce,html as Fe}from"lit";function ie(){return Fe`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var bt=Ce`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var kt=Le`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function se(r,t,e){let n=r.filter(o=>!!o.body);return n.length===0?G:A`<section class="block" part="section readings"><h3>${e}</h3>${n.map((o,i)=>A`<details class="interp-card" part="reading" name="${t}" ?open="${i===0}"><summary><span class="interp-lead">${o.label}</span> ${ie()} ${o.aside?A`<span class="interp-aside"><small>${o.aside}</small></span>`:G}</summary><div class="interp-body"><p>${o.body}</p>${o.extra??G}</div></details>`)}</section>`}var $e="roxy-data";function Ae(r){return r.nodeName==="SCRIPT"&&r.getAttribute("type")==="application/json"}var O=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){if(this.host.data!=null)return;let t=this.read();t!==void 0&&(this.host.data=t,this.host.requestUpdate())}read(){let t=this.findInlineScript();return t?this.parse(t.textContent):void 0}findInlineScript(){for(let t of Array.from(this.host.children))if(Ae(t)&&t.classList.contains($e))return t;return null}parse(t){if(t?.trim())try{return JSON.parse(t)}catch{return}}};var a=class extends E{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let e=this.lastRequest,n=this.listKey,o=this.listRows();if(!(!e||!n||!o)){this.moreLoading=!0,this.moreError=null;try{let i=await $(this.fetcher,{...e,query:{...e.query,offset:o.length}});if(this.lastRequest!==e)return;let d=i[n];this.data={...this.data,...i,[n]:[...o,...Array.isArray(d)?d:[]]}}catch(i){this.lastRequest===e&&(this.moreError=i instanceof Error?i.message:String(i))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=e=>{let n=this.selfFetch();if(!n)return;let o=e.detail;this.lastValues=o.values,this.sticky=!!o.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(o.values),this.fetchFresh(oe(n.endpoint,n.method,o.values,o.queryKeys??[]))};new O(this),this.fetcher=new P(this)}static{this.styles=[T]}static{this.endpoints=[]}willUpdate(e){if(e.has("data")&&this.data!=null){let n=J(this.data);n!==this.data&&(this.data=n)}(e.has("publishableKey")||e.has("baseUrl")||e.has("submitUrl")||e.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let e=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:W(this.constructor.endpoints,this);return e&&{endpoint:e.endpoint,method:this.method??e.method}}render(){return l`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(e){try{return this.renderData(e)}catch(n){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,n),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:n},bubbles:!0,composed:!0})),customElements.get("roxy-data")?l`<roxy-data .data="${e}" lang="${v(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let e=this.hideSections.split(",").map(o=>o.trim().toLowerCase()).filter(o=>/^[a-z][a-z0-9-]*$/.test(o));if(e.length===0)return m;let n=e.map(o=>`[part~="${o}"],roxy-endpoint-form::part(${o}){display:none!important}`).join("");return l`<style>${n}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?l`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(e,n,o){return this.hideReadings?m:se(e,n,this.t(o??"Reading"))}renderResult(e){let n=l`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(e)}`;return this.showAttribution()?l`${n}${this.renderAttribution()}`:n}renderWithForm(e){return l`${this.renderForm()}${e}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?m:this.renderErrorBanner(this.error):this.data==null?m:this.showAttribution()?l`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let e=this.listRows(),n=this.data?.total;return!this.lastRequest||!e||typeof n!="number"?m:e.length>=n?m:l`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?l`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:m}</div>`}listRows(){let e=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(e)?e:void 0}fetchFresh(e){return this.lastRequest=e,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(e)}load(e){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(e)}pickRow(e){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:e,bubbles:!0,composed:!0})),this.openRow(e.id)}openRow(e){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let n=this.openedRow??document.createElement(this.rowDetail.tag);n.publishableKey=this.publishableKey,n.baseUrl=this.baseUrl,n.submitUrl=this.submitUrl,n.submitContext=this.submitContext,n.hideReadings=this.hideReadings,n.hideSections=this.hideSections;let o=this.effectiveLang();o&&n.setAttribute("lang",o),this.openedRow=n,this.openedRowId=e,n.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(e))}`,method:"GET",query:{lang:K(this)}}).then(()=>n.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return l`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(m):this.renderEmpty()}renderForm(){let e=this.selfFetch();return l`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${e?.endpoint??""}" method="${e?.method??"POST"}" spec-url="${v(this.specUrl)}" publishable-key="${v(this.publishableKey)}" location-url="${v(this.locationUrl)}" submit-label="${v(this.submitLabel)}" lang="${v(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let e=sessionStorage.getItem(this.rememberKey());return e?JSON.parse(e):void 0}catch{return}}writeRemembered(e){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(e))}catch{}}renderEmpty(){return l`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return l`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(e){let n=!!this.selfFetch();if(n&&this.issues)return this.renderForm();let o=this.renderErrorBanner(e);return n?l`${o}${this.renderForm()}`:o}renderErrorBanner(e){return l`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(e)}</div>`}};s([c({attribute:!1})],a.prototype,"data",2),s([c({type:String,attribute:"data-endpoint"})],a.prototype,"endpoint",2),s([c({type:String})],a.prototype,"method",2),s([c({type:String,attribute:"publishable-key"})],a.prototype,"publishableKey",2),s([c({type:String,attribute:"base-url"})],a.prototype,"baseUrl",2),s([c({type:String,attribute:"spec-url"})],a.prototype,"specUrl",2),s([c({type:String,attribute:"submit-url"})],a.prototype,"submitUrl",2),s([c({attribute:"submit-context",converter:re})],a.prototype,"submitContext",2),s([c({type:String,attribute:"location-url"})],a.prototype,"locationUrl",2),s([c({type:Boolean})],a.prototype,"remember",2),s([c({type:Boolean,attribute:"hide-readings",reflect:!0})],a.prototype,"hideReadings",2),s([c({type:String,attribute:"hide-sections",reflect:!0})],a.prototype,"hideSections",2),s([c({type:String,attribute:"submit-label"})],a.prototype,"submitLabel",2),s([c({type:String,attribute:"error-message"})],a.prototype,"errorMessage",2),s([c({type:String})],a.prototype,"attribution",2),s([u()],a.prototype,"loading",2),s([u()],a.prototype,"error",2),s([u()],a.prototype,"issues",2),s([u()],a.prototype,"selfFetched",2),s([u()],a.prototype,"editing",2),s([u()],a.prototype,"sticky",2),s([u()],a.prototype,"openedRow",2),s([u()],a.prototype,"openedRowId",2),s([u()],a.prototype,"moreLoading",2),s([u()],a.prototype,"moreError",2);var ae=r=>t=>{customElements.get(r)||customElements.define(r,t)};var Ge=/^\d{4}-\d{2}-\d{2}$/,Ne=/^\d{4}-\d{2}$/,Ie=/^\d{2}:\d{2}(:\d{2})?$/,Ue=/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/,de=new Map;function C(r){if(!r)return["en"];let t=de.get(r);if(t)return[t,"en"];let e="en";try{e=Intl.getCanonicalLocales(r)[0]??"en"}catch{e="en"}return de.set(r,e),[e,"en"]}function _e(r){let t=Ie.test(r)?`1970-01-01T${r}`:Ge.test(r)?`${r}T00:00:00`:Ne.test(r)?`${r}-01T00:00:00`:Ue.test(r)?r.replace(" ","T"):null;return t?{d:new Date(`${t}Z`),timeZone:"UTC"}:{d:new Date(r)}}function N(r,t){if(typeof t!="string"||t.length===0)return"";let{d:e,timeZone:n}=_e(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(C(r),{month:"short",day:"numeric",year:"numeric",timeZone:n})}function le(r,t,e){return typeof t!="number"||!Number.isFinite(t)||typeof e!="number"||!Number.isInteger(e)||e<1||e>12?"":new Date(Date.UTC(t,e-1,1,12)).toLocaleDateString(C(r),{month:"long",year:"numeric",timeZone:"UTC"})}function I(r,t,e=1){return typeof t!="number"||!Number.isFinite(t)?"":t.toLocaleString(C(r),{maximumFractionDigits:e})}function ce(r,t,e=1){return typeof t!="number"||!Number.isFinite(t)?"":(t/100).toLocaleString(C(r),{style:"percent",maximumFractionDigits:e})}var x=class extends a{constructor(){super(...arguments);this.mode="current"}renderData(e){let n="phases"in e?e.phases:"calendar"in e?e.calendar:[];if(this.mode!=="current"&&n.length>0){let o=le(this.effectiveLang(),"year"in e?e.year:void 0,"month"in e?e.month:void 0);return p`<article class="card" part="card" aria-label="${this.t("Moon phase calendar")}"><h2 class="label" part="header">${o||this.t("Moon phase calendar")}</h2><div part="table" role="list">${n.map(i=>this.renderListItem(i))}</div></article>`}return"phase"in e?this.renderSingle(e):y}renderSingle(e){let n=e.meaning?.symbol||pe(e.phase);return p`<article class="card" part="card" aria-label="${this.t("Current moon phase")}"><div class="hero" part="header"><span class="emoji" aria-hidden="true">${n}</span><div><h2 class="label">${e.phase??this.t("Current moon phase")}</h2>${e.date?p`<p class="roxy-label">${N(this.effectiveLang(),e.date)}</p>`:y}</div></div><div class="stats" part="details">${typeof e.illumination=="number"?p`<div><span class="roxy-label">${this.t("Illumination")}</span> <strong>${ce(this.effectiveLang(),e.illumination,0)}</strong></div>`:y} ${typeof e.age=="number"?p`<div><span class="roxy-label">${this.t("Age")}</span> <strong>${this.t("{{count}} days",{count:I(this.effectiveLang(),e.age,1)})}</strong></div>`:y} ${e.sign?p`<div><span class="roxy-label">${this.t("Sign")}</span> <strong>${e.sign}</strong></div>`:y} ${typeof e.distance=="number"?p`<div><span class="roxy-label">${this.t("Distance")}</span> <strong>${this.t("{{value}}k km",{value:I(this.effectiveLang(),e.distance/1e3,0)})}</strong></div>`:y}</div>${e.meaning?.description&&!this.hideReadings?p`<p>${e.meaning.description}</p>`:y} ${e.meaning?.keywords?.length&&!this.hideReadings?p`<ul class="roxy-chips">${e.meaning.keywords.map(o=>p`<li>${o}</li>`)}</ul>`:y}</article>`}renderListItem(e){let n=pe(e.phase);return p`<div class="list-item" role="listitem"><span aria-hidden="true">${n}</span> <span>${e.phase}</span> <span>${N(this.effectiveLang(),e.date)}</span></div>`}};x.endpoints=U,x.styles=[T,De`.card{gap:var(--roxy-space-md);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,1fr);display:grid}h2,p{margin:0}.hero{align-items:center;gap:var(--roxy-space-md);display:flex}.emoji{font-size:calc(var(--roxy-text-xl) * 2);line-height:1}.label{text-transform:capitalize}.stats{gap:var(--roxy-space-md);font-size:var(--roxy-text-sm);grid-template-columns:repeat(auto-fit,minmax(min(100%,14ch),1fr));display:grid}.stats .roxy-label{display:block}.stats strong{font-variant-numeric:tabular-nums}.list-item{align-items:center;gap:var(--roxy-space-sm);padding-block:var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);font-size:var(--roxy-text-sm);grid-template-columns:auto minmax(0,1fr) auto;display:grid}.list-item:last-child{border-block-end:0}`],s([Me({type:String,reflect:!0})],x.prototype,"mode",2),x=s([ae("roxy-moon-phase")],x);function pe(r){return D(r)??"🌙"}export{x as RoxyMoonPhase};
