var ot=Object.defineProperty;var it=Object.getOwnPropertyDescriptor;var l=(r,t,e,n)=>{for(var o=n>1?void 0:n?it(t,e):t,i=r.length-1,a;i>=0;i--)(a=r[i])&&(o=(n?a(t,e,o):a(o))||o);return n&&o&&ot(t,e,o),o};import{html as tt}from"lit";import{property as te}from"lit/decorators.js";var oe=[{endpoint:"vedic-astrology/birth-chart",method:"POST"}];import{html as f,nothing as R}from"lit";import{property as b,state as k}from"lit/decorators.js";import{ifDefined as O}from"lit/directives/if-defined.js";var ie=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function B(r){if(r.lang)return r.lang;if(typeof document>"u")return;let t=r.closest?.("[lang]")?.getAttribute("lang");return t||document.documentElement.lang||void 0}var at={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function j(r){let t=r.toLowerCase();return ie.find(e=>e.toLowerCase()===t)}function ae(r){let t=B(r);if(!t)return;let e=j(t);if(e)return e;let n=t.toLowerCase().split("-"),o=n[0];if(o==="zh"){let i=n.find(a=>a==="hans"||a==="hant")??at[n[1]??""];return i?j(`zh-${i}`):void 0}return j(o)}import{LitElement as lt}from"lit";var se=`/**
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
`;var de="roxy-ui-tokens";function le(){if(typeof document>"u")return null;let r=document.getElementById(de);if(r)return r;let t=document.createElement("style");return t.id=de,t.textContent=se,document.head.prepend(t),t}function F(r){return r.toLowerCase().replace(/[\s_-]+/g," ").trim()}function H(r){return r?r.charAt(0).toUpperCase()+r.slice(1).toLowerCase():""}function ce(r){return r.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/([a-z])([0-9])/g,"$1 $2").replace(/^\w/,t=>t.toUpperCase())}var he="__ROXY_UI_I18N__";function pe(){let r=globalThis,t=r[he];if(t)return t;let e={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return r[he]=e,e}function st(r,t){return t?r.replace(/\{\{(\w+)\}\}/g,(e,n)=>n in t?String(t[n]??""):e):r}function ue(r,t,e){return st(dt(r,t)??t,e)}function dt(r,t){if(!r)return;let{catalogs:e}=pe(),n=r.toLowerCase();return(e[n]??e[n.split("-")[0]])?.[F(t)]}function ye(r){let{listeners:t}=pe();return t.add(r),()=>{t.delete(r)}}var A=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){this.unsubscribe=ye(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var M=class extends lt{constructor(){super();this.translator=(e,n)=>this.t(e,n);new A(this)}connectedCallback(){super.connectedCallback(),le()}t(e,n){return ue(this.effectiveLang(),e,n)}effectiveLang(){return B(this)}};import{css as ht}from"lit";import{css as ct}from"lit";var me=ct`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var pt=ht`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,G=[pt,me];var ut="__cols",yt="__rows";function mt(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function N(r){if(Array.isArray(r)){let i=!1,a=r.map(d=>{let s=N(d);return s!==d&&(i=!0),s});return i?a:r}if(!mt(r))return r;let t=r[ut],e=r[yt];if(Array.isArray(t)&&Array.isArray(e)&&Object.keys(r).length===2)return e.map(i=>{let a={};return t.forEach((d,s)=>{a[d]=N(i[s])}),a});let n=!1,o={};for(let[i,a]of Object.entries(r)){let d=N(a);d!==a&&(n=!0),o[i]=d}return n?o:r}function ge(r){return N(r)}function fe(r,t){return r.find(e=>e.attrs&&Object.entries(e.attrs).every(([n,o])=>t[n]===o))??r[0]}var gt="pk_live_YOUR_KEY",xe={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function be(r){if(r)return r===gt?xe.sample:r.startsWith("pk_")?void 0:xe.secret}function ve(r,t,e={}){e.warn&&console.warn(t.message),r.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:t.reason,message:t.message},bubbles:!0,composed:!0}))}var we="https://roxyapi.com/api/v2";async function ft(r){try{let t=await r.json();if(t?.error){let e=t.code==="validation_error"&&Array.isArray(t.issues)?t.issues.filter(n=>typeof n.path=="string"&&typeof n.message=="string").map(n=>({path:n.path,message:n.message})):null;return{message:t.error,issues:e?.length?e:null,worded:!0}}}catch{}return{message:`Request failed (${r.status})`,issues:null,worded:!1}}var Se={fromAttribute:r=>{if(r!=null){try{let t=JSON.parse(r);if(t&&typeof t=="object"&&!Array.isArray(t))return t}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},P=class extends Error{constructor(e,n=null,o=!0){super(e);this.issues=n;this.worded=o}};function ke(r){return r.submitUrl?void 0:be(r.publishableKey)}async function q(r,t,e){let n=ke(r);if(n)throw new P(n.message);let o=r.submitUrl?await fetch(r.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:xt(t,r.submitContext),signal:e}):await bt(r,t,e);if(!o.ok){let i=await ft(o);throw new P(i.message,i.issues,i.worded)}return await o.json()}function xt(r,t){return JSON.stringify(t?{...r,context:t}:r)}function bt(r,t,e){let n=new URL(`${r.baseUrl??we}${t.path}`,document.baseURI);for(let[i,a]of Object.entries(t.query??{}))a!=null&&n.searchParams.set(i,String(a));let o={Accept:"application/json"};return r.publishableKey&&(o["X-API-Key"]=r.publishableKey),t.body!=null&&(o["Content-Type"]="application/json"),fetch(n,{method:t.method??"GET",headers:o,body:t.body!=null?JSON.stringify(t.body):void 0,signal:e})}var I=class{constructor(t){this.baseUrl=we;this.worded=!0;this.host=t,t.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(t){this.worded=!0;let e=ke(this);if(e){this.host.error=e.message,ve(this.host,e);return}this.abort?.abort();let n=new AbortController;this.abort=n,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let o=await q(this,t,n.signal);if(n.signal.aborted)return;this.host.data=o}catch(o){if(n.signal.aborted||o?.name==="AbortError")return;o instanceof P&&(this.host.issues=o.issues),this.worded=o instanceof P&&o.worded,this.host.error=o instanceof Error?o.message:String(o)}finally{this.abort===n&&(this.abort=void 0),n.signal.aborted||(this.host.loading=!1)}}};function $e(r,t,e,n=[]){let o={...e},i=`/${r.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(u,g)=>{let p=o[g];return delete o[g],encodeURIComponent(String(p??""))}),a=new Set(n),d={},s={};for(let[u,g]of Object.entries(o))g===void 0||g===""||(t==="GET"||a.has(u)?d[u]=g:s[u]=g);return{path:i,method:t,query:d,body:t==="POST"?s:void 0}}import{css as St,html as V,nothing as Y}from"lit";import{css as vt,html as wt}from"lit";function Te(){return wt`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var Fr=vt`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var Nr=St`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function Ee(r,t,e){let n=r.filter(o=>!!o.body);return n.length===0?Y:V`<section class="block" part="section readings"><h3>${e}</h3>${n.map((o,i)=>V`<details class="interp-card" part="reading" name="${t}" ?open="${i===0}"><summary><span class="interp-lead">${o.label}</span> ${Te()} ${o.aside?V`<span class="interp-aside"><small>${o.aside}</small></span>`:Y}</summary><div class="interp-body"><p>${o.body}</p>${o.extra??Y}</div></details>`)}</section>`}var kt="roxy-data";function $t(r){return r.nodeName==="SCRIPT"&&r.getAttribute("type")==="application/json"}var _=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){if(this.host.data!=null)return;let t=this.read();t!==void 0&&(this.host.data=t,this.host.requestUpdate())}read(){let t=this.findInlineScript();return t?this.parse(t.textContent):void 0}findInlineScript(){for(let t of Array.from(this.host.children))if($t(t)&&t.classList.contains(kt))return t;return null}parse(t){if(t?.trim())try{return JSON.parse(t)}catch{return}}};var c=class extends M{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let e=this.lastRequest,n=this.listKey,o=this.listRows();if(!(!e||!n||!o)){this.moreLoading=!0,this.moreError=null;try{let i=await q(this.fetcher,{...e,query:{...e.query,offset:o.length}});if(this.lastRequest!==e)return;let a=i[n];this.data={...this.data,...i,[n]:[...o,...Array.isArray(a)?a:[]]}}catch(i){this.lastRequest===e&&(this.moreError=i instanceof Error?i.message:String(i))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=e=>{let n=this.selfFetch();if(!n)return;let o=e.detail;this.lastValues=o.values,this.sticky=!!o.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(o.values),this.fetchFresh($e(n.endpoint,n.method,o.values,o.queryKeys??[]))};new _(this),this.fetcher=new I(this)}static{this.styles=[G]}static{this.endpoints=[]}willUpdate(e){if(e.has("data")&&this.data!=null){let n=ge(this.data);n!==this.data&&(this.data=n)}(e.has("publishableKey")||e.has("baseUrl")||e.has("submitUrl")||e.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let e=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:fe(this.constructor.endpoints,this);return e&&{endpoint:e.endpoint,method:this.method??e.method}}render(){return f`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(e){try{return this.renderData(e)}catch(n){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,n),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:n},bubbles:!0,composed:!0})),customElements.get("roxy-data")?f`<roxy-data .data="${e}" lang="${O(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let e=this.hideSections.split(",").map(o=>o.trim().toLowerCase()).filter(o=>/^[a-z][a-z0-9-]*$/.test(o));if(e.length===0)return R;let n=e.map(o=>`[part~="${o}"],roxy-endpoint-form::part(${o}){display:none!important}`).join("");return f`<style>${n}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?f`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(e,n,o){return this.hideReadings?R:Ee(e,n,this.t(o??"Reading"))}renderResult(e){let n=f`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(e)}`;return this.showAttribution()?f`${n}${this.renderAttribution()}`:n}renderWithForm(e){return f`${this.renderForm()}${e}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?R:this.renderErrorBanner(this.error):this.data==null?R:this.showAttribution()?f`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let e=this.listRows(),n=this.data?.total;return!this.lastRequest||!e||typeof n!="number"?R:e.length>=n?R:f`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?f`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:R}</div>`}listRows(){let e=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(e)?e:void 0}fetchFresh(e){return this.lastRequest=e,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(e)}load(e){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(e)}pickRow(e){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:e,bubbles:!0,composed:!0})),this.openRow(e.id)}openRow(e){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let n=this.openedRow??document.createElement(this.rowDetail.tag);n.publishableKey=this.publishableKey,n.baseUrl=this.baseUrl,n.submitUrl=this.submitUrl,n.submitContext=this.submitContext,n.hideReadings=this.hideReadings,n.hideSections=this.hideSections;let o=this.effectiveLang();o&&n.setAttribute("lang",o),this.openedRow=n,this.openedRowId=e,n.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(e))}`,method:"GET",query:{lang:ae(this)}}).then(()=>n.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return f`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(R):this.renderEmpty()}renderForm(){let e=this.selfFetch();return f`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${e?.endpoint??""}" method="${e?.method??"POST"}" spec-url="${O(this.specUrl)}" publishable-key="${O(this.publishableKey)}" location-url="${O(this.locationUrl)}" submit-label="${O(this.submitLabel)}" lang="${O(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let e=sessionStorage.getItem(this.rememberKey());return e?JSON.parse(e):void 0}catch{return}}writeRemembered(e){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(e))}catch{}}renderEmpty(){return f`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return f`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(e){let n=!!this.selfFetch();if(n&&this.issues)return this.renderForm();let o=this.renderErrorBanner(e);return n?f`${o}${this.renderForm()}`:o}renderErrorBanner(e){return f`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(e)}</div>`}};l([b({attribute:!1})],c.prototype,"data",2),l([b({type:String,attribute:"data-endpoint"})],c.prototype,"endpoint",2),l([b({type:String})],c.prototype,"method",2),l([b({type:String,attribute:"publishable-key"})],c.prototype,"publishableKey",2),l([b({type:String,attribute:"base-url"})],c.prototype,"baseUrl",2),l([b({type:String,attribute:"spec-url"})],c.prototype,"specUrl",2),l([b({type:String,attribute:"submit-url"})],c.prototype,"submitUrl",2),l([b({attribute:"submit-context",converter:Se})],c.prototype,"submitContext",2),l([b({type:String,attribute:"location-url"})],c.prototype,"locationUrl",2),l([b({type:Boolean})],c.prototype,"remember",2),l([b({type:Boolean,attribute:"hide-readings",reflect:!0})],c.prototype,"hideReadings",2),l([b({type:String,attribute:"hide-sections",reflect:!0})],c.prototype,"hideSections",2),l([b({type:String,attribute:"submit-label"})],c.prototype,"submitLabel",2),l([b({type:String,attribute:"error-message"})],c.prototype,"errorMessage",2),l([b({type:String})],c.prototype,"attribution",2),l([k()],c.prototype,"loading",2),l([k()],c.prototype,"error",2),l([k()],c.prototype,"issues",2),l([k()],c.prototype,"selfFetched",2),l([k()],c.prototype,"editing",2),l([k()],c.prototype,"sticky",2),l([k()],c.prototype,"openedRow",2),l([k()],c.prototype,"openedRowId",2),l([k()],c.prototype,"moreLoading",2),l([k()],c.prototype,"moreError",2);import{css as Tt,html as Re,nothing as Et}from"lit";var D=class{constructor(t){this.host=t;this.state="closed";this.zoom=1;this.pressedBy="";this.press=t=>{this.pressedBy=t.pointerType};this.openOnMouse=t=>{let e=this.pressedBy==="mouse";this.pressedBy="",e&&(t.target?.closest?.("a, button, summary, input, select, textarea")||getSelection()?.toString()||this.open())};t.addController(this)}hostUpdated(){let t=this.host.renderRoot.querySelector(".roxy-chart-dialog");if(!t)this.reset();else if(t.isConnected&&this.state!=="closed"){this.state==="opening"&&(this.state="open",t.open||t.showModal());let e=t.querySelector(".roxy-chart-scroll");t.open&&e&&this.position&&(e.scrollLeft=e.scrollWidth*this.position.x-e.clientWidth/2,e.scrollTop=e.scrollHeight*this.position.y-e.clientHeight/2,this.position=void 0)}}hostDisconnected(){this.reset(),this.host.renderRoot.querySelector(".roxy-chart-dialog")?.close()}open(){this.state="opening",this.position={x:.5,y:0},this.host.requestUpdate()}reset(){this.state="closed",this.zoom=1,this.position=void 0}resize(t){let e=this.host.renderRoot.querySelector(".roxy-chart-scroll");this.position=t===0?{x:.5,y:0}:e?{x:(e.scrollLeft+e.clientWidth/2)/e.scrollWidth,y:(e.scrollTop+e.clientHeight/2)/e.scrollHeight}:void 0,this.zoom=t===0?1:Math.min(3,Math.max(1,this.zoom+t)),this.host.requestUpdate()}renderChartViewport(t,e,n){return Re`<div class="roxy-chart-view"><div class="roxy-chart-hit" @pointerdown="${this.press}" @click="${this.openOnMouse}">${t}</div><div class="roxy-chart-tools" part="chart-controls"><button type="button" @click="${()=>this.open()}">${n("Enlarge chart")}</button></div><dialog class="roxy-chart-dialog" part="chart-dialog" aria-label="${e}" @close="${()=>{this.reset(),this.host.requestUpdate()}}">${this.state!=="closed"?Re`<div class="roxy-chart-bar"><strong>${e}</strong><div class="roxy-chart-tools"><button type="button" aria-label="${n("Zoom out")}" ?disabled="${this.zoom===1}" @click="${()=>this.resize(-.5)}">−</button> <button type="button" @click="${()=>this.resize(0)}">${n("Reset zoom")}</button> <button type="button" aria-label="${n("Zoom in")}" ?disabled="${this.zoom===3}" @click="${()=>this.resize(.5)}">+</button> <button type="button" @click="${()=>this.host.renderRoot.querySelector(".roxy-chart-dialog")?.close()}">${n("Close")}</button></div></div><div class="roxy-chart-scroll" role="region" tabindex="0" aria-label="${e}"><div class="roxy-chart-expanded" style="${`--chart-zoom:${this.zoom}`}">${t}</div></div>`:Et}</dialog></div>`}},Ce=Tt`.roxy-chart-view{min-width:0}@media (hover:hover) and (pointer:fine){.roxy-chart-hit{cursor:zoom-in}}.roxy-chart-tools{gap:var(--roxy-space-sm);flex-wrap:wrap;justify-content:flex-end;align-items:center;display:flex}.roxy-chart-tools button{font-size:var(--roxy-text-sm);color:var(--roxy-secondary);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);min-width:2lh;min-height:2lh;padding:var(--roxy-space-xs) var(--roxy-space-sm);cursor:pointer;background:0 0}.roxy-chart-tools button:hover:not(:disabled){border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-chart-tools button:disabled{color:var(--roxy-muted);cursor:default}.roxy-chart-dialog{--roxy-surface:var(--roxy-bg);width:calc(100% - 2 * var(--roxy-space-md));max-width:calc(var(--roxy-chart-expanded-width,60rem) * 1.2);max-height:calc(100% - 2 * var(--roxy-space-md));padding:var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);color:var(--roxy-fg);background:var(--roxy-bg);box-shadow:var(--roxy-shadow-lg);margin:auto}.roxy-chart-dialog[open]{flex-direction:column;display:flex;overflow:hidden}.roxy-chart-dialog::backdrop{background:color-mix(in oklab, var(--roxy-bg) 85%, transparent)}.roxy-chart-bar{justify-content:space-between;align-items:center;gap:var(--roxy-space-md);margin-bottom:var(--roxy-space-md);flex-wrap:wrap;flex-shrink:0;display:flex}.roxy-chart-bar>strong{overflow-wrap:anywhere;min-width:0}.roxy-chart-scroll{overscroll-behavior:contain;flex:auto;min-height:0;overflow:auto}.roxy-chart-expanded{width:max(100%, calc(var(--roxy-chart-expanded-width,60rem) * var(--chart-zoom)));padding:var(--roxy-space-sm)}.roxy-chart-expanded>svg{width:100%;max-width:none;height:auto;margin:0}`;var Pe=r=>t=>{customElements.get(r)||customElements.define(r,t)};import{css as Pt,html as Ot,nothing as Fe}from"lit";var Oe=new Map;function Rt(r){if(!r)return["en"];let t=Oe.get(r);if(t)return[t,"en"];let e="en";try{e=Intl.getCanonicalLocales(r)[0]??"en"}catch{e="en"}return Oe.set(r,e),[e,"en"]}function Z(r,t,e=1){return typeof t!="number"||!Number.isFinite(t)?"":t.toLocaleString(Rt(r),{maximumFractionDigits:e})}var Ct={"kp-newcomb":"KP Newcomb","kp-old":"KP Old",lahiri:"Lahiri",raman:"B.V. Raman",custom:"Custom"};function Le(r,t,e){let n=typeof t=="string"?Ct[t]??ce(t):"",o=typeof e=="number"?`${Z(r,e,2)}°`:"";return n&&o?`${n} (${o})`:n||o}var Ae=Pt`.roxy-frame{color:var(--roxy-muted);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-normal);margin:0}.roxy-frame .roxy-frame-deg{font-variant-numeric:tabular-nums}`;function Me(r,t,e){if(!t?.ayanamsa)return Fe;let n=Le(r,t.ayanamsa);if(!n)return Fe;let o=typeof t.ayanamsaDegrees=="number"?Z(r,t.ayanamsaDegrees,4):void 0;return Ot`<p class="roxy-frame">${o===void 0?e("Sidereal frame: {{frame}}",{frame:n}):e("Sidereal frame: {{frame}}, {{degrees}}° subtracted",{frame:n,degrees:o})}</p>`}import{html as je,nothing as v,svg as y}from"lit";var Ge=(r,t)=>t?r[F(t)]:void 0;var Lt={sun:"Su",moon:"Mo",mercury:"Me",venus:"Ve",mars:"Ma",jupiter:"Ju",saturn:"Sa",uranus:"Ur",neptune:"Ne",pluto:"Pl",rahu:"Ra",ketu:"Ke",ascendant:"Asc",lagna:"La"},Ne=r=>Ge(Lt,r);var Ft={aries:"Ar",taurus:"Ta",gemini:"Ge",cancer:"Cn",leo:"Le",virgo:"Vi",libra:"Li",scorpio:"Sc",sagittarius:"Sg",capricorn:"Cp",aquarius:"Aq",pisces:"Pi"},K=r=>Ge(Ft,r),T=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];function At(r){let t=r%360;return t<0?t+360:t}function W(r){let t=At(r),e=Math.floor(t/30)%12,n=t%30,o=Math.floor(n),i=(n-o)*60,a=Math.floor(i),d=Math.round((i-a)*60);return{sign:T[e]??"Aries",signIndex:e,degree:o,minute:a,second:d}}import{css as Mt,html as J,nothing as Ie}from"lit";var _e=Mt`.roxy-tablist{gap:var(--roxy-space-xs);box-shadow:inset 0 calc(var(--roxy-line-thick) * -1) 0 var(--roxy-border);scrollbar-width:thin;min-width:0;display:flex;overflow-x:auto}.roxy-tab{padding:var(--roxy-space-xs) var(--roxy-space-md);font-size:var(--roxy-text-sm);border:none;border-bottom:var(--roxy-line-thick) solid transparent;cursor:pointer;color:var(--roxy-muted);transition:color var(--roxy-motion-duration) var(--roxy-motion-easing);background:0 0;flex-shrink:0}.roxy-tab[aria-selected=true]{color:var(--roxy-accent-ink);border-bottom-color:var(--roxy-accent);font-weight:var(--roxy-weight-bold)}.roxy-tab:hover:not([aria-selected=true]){color:var(--roxy-fg)}.roxy-tab:focus-visible{outline-offset:calc(var(--roxy-line-thick) * -1);border-radius:var(--roxy-radius-sm)}`;function De(r){let{items:t,active:e,onSelect:n,label:o,idPrefix:i,controls:a=!1}=r;return J`<div class="roxy-tablist" part="tablist" role="tablist" aria-label="${o}" @keydown="${s=>{if(s.key!=="ArrowRight"&&s.key!=="ArrowLeft")return;s.preventDefault();let u=t.findIndex($=>$.id===e);if(u===-1)return;let g=s.key==="ArrowRight"?1:-1,p=t[(u+g+t.length)%t.length];if(!p)return;n(p.id);let w=s.currentTarget.getRootNode();requestAnimationFrame(()=>{w.querySelector(`#${i}-tab-${p.id}`)?.focus()})}}">${t.map(s=>J`<button type="button" class="roxy-tab" part="tab" role="tab" id="${i}-tab-${s.id}" aria-selected="${e===s.id?"true":"false"}" aria-controls="${a?`${i}-panel-${s.id}`:Ie}" tabindex="${e===s.id?"0":"-1"}" @click="${()=>n(s.id)}">${s.label}</button>`)}</div>${a?t.filter(s=>s.id!==e).map(s=>J`<div role="tabpanel" id="${i}-panel-${s.id}" aria-labelledby="${i}-tab-${s.id}" hidden></div>`):Ie}`}var S=400,h=20,x=S-2*h,m=S/2,Ke=Object.fromEntries(T.map(r=>[r.toLowerCase(),r])),Gt=[{id:"north",source:"North"},{id:"south",source:"South"},{id:"east",source:"East"}],Be="ʳ",He="ᶜ",qe="ʷ";function X(r){return T.indexOf(r)}function Nt(r){let t=Ne(r.graha)??r.graha,e=`${r.isRetrograde?Be:""}${r.combust?He:""}${r.war?qe:""}`;if(typeof r.longitude!="number"||!Number.isFinite(r.longitude)||r.natalReference)return`${t}${e}`;let{degree:n}=W(r.longitude);return`${t} ${n}°${e}`}function It(r,t,e){let n=[H(r.graha)],o=r.natalReference===!0;if(o&&n.push(e("in {{sign}}",{sign:t})),typeof r.longitude=="number"&&Number.isFinite(r.longitude)){let i=W(r.longitude),a=String(i.minute).padStart(2,"0");n.push(o?`D1: ${i.degree}°${a}' ${i.sign}`:`${i.degree}°${a}' ${i.sign}`)}if(r.nakshatra?.name){let i=r.nakshatra.pada?` ${e("pada {{n}}",{n:r.nakshatra.pada})}`:"";n.push(`${o?"D1: ":""}${r.nakshatra.name}${i}`)}return r.nakshatra?.lord&&n.push(e("nakshatra lord {{graha}}",{graha:r.nakshatra.lord})),r.awastha&&n.push(r.awastha),r.deeptadi&&n.push(r.deeptadi),r.combust&&n.push(e("combust")),r.war&&n.push(r.war.winner?e("planetary war with {{graha}}, won by {{winner}}",{graha:r.war.opponent,winner:r.war.winner}):e("planetary war with {{graha}}",{graha:r.war.opponent})),r.isRetrograde&&n.push(e("retrograde")),n.join(" · ")}function Q(r,t,e,n,o,i){let a=n-(r.length-1)*o/2;return r.map((d,s)=>{let u=a+s*o;return y`<text class="planet-text" x=${e} y=${u} text-anchor="middle" dominant-baseline="central">${Nt(d)}<title>${It(d,t,i)}</title></text>`})}function Ve(r,t={}){let{divisionLabel:e,lagnaOverride:n,states:o,natalReference:i}=t,a=new Set((o?.combustion??[]).map(p=>(p.planet??"").toLowerCase())),d=new Map;for(let p of o?.planetaryWar??[])!p.planet1||!p.planet2||(d.set(p.planet1.toLowerCase(),{opponent:p.planet2,winner:p.winner}),d.set(p.planet2.toLowerCase(),{opponent:p.planet1,winner:p.winner}));let s={};for(let p of T)s[p.toLowerCase()]=[];let u=n?Ke[n.toLowerCase()]??"":"",g=u;for(let[p,w]of Object.entries(r??{})){let $=(w?.rashi??"").toLowerCase();if(p==="Lagna"||w?.graha==="Lagna"){u||(g=Ke[$]??"");continue}if(!$||!($ in s))continue;let L=w.graha??p,U=L.toLowerCase();s[$]?.push({graha:L,natalReference:i,longitude:w.longitude,nakshatra:w.nakshatra,isRetrograde:w.isRetrograde,awastha:w.awastha,deeptadi:w.deeptadi,combust:a.has(U)||void 0,war:d.get(U)})}return{lagnaSign:g,placements:s,divisionLabel:e}}var C=x/4,_t={Pisces:{col:0,row:0},Aries:{col:1,row:0},Taurus:{col:2,row:0},Gemini:{col:3,row:0},Cancer:{col:3,row:1},Leo:{col:3,row:2},Virgo:{col:3,row:3},Libra:{col:2,row:3},Scorpio:{col:1,row:3},Sagittarius:{col:0,row:3},Capricorn:{col:0,row:2},Aquarius:{col:0,row:1}};function Dt(r){let t=_t[r]??{col:0,row:0};return{x:h+t.col*C,y:h+t.row*C,w:C,h:C}}function Kt(r){let t=h,e=h+C,n=h+2*C,o=h+3*C,i=S-h;return y`
		<rect class="line" x=${t} y=${t} width=${x} height=${x} stroke-width="1.5" fill="none" />
		<line class="line" x1=${t} y1=${e} x2=${i} y2=${e} stroke-width="1" />
		<line class="line" x1=${t} y1=${o} x2=${i} y2=${o} stroke-width="1" />
		<line class="line" x1=${e} y1=${t} x2=${e} y2=${i} stroke-width="1" />
		<line class="line" x1=${o} y1=${t} x2=${o} y2=${i} stroke-width="1" />
		<line class="line" x1=${t} y1=${n} x2=${e} y2=${n} stroke-width="1" />
		<line class="line" x1=${o} y1=${n} x2=${i} y2=${n} stroke-width="1" />
		<line class="line" x1=${n} y1=${t} x2=${n} y2=${e} stroke-width="1" />
		<line class="line" x1=${n} y1=${o} x2=${n} y2=${i} stroke-width="1" />
		${r?y`<text class="centre-label" x=${m} y=${m} text-anchor="middle" dominant-baseline="central">${r}</text>`:v}
	`}function ee(r,t){let e=X(t),n=X(r);return e===-1||n===-1?0:(n-e+12)%12+1}function zt(r,t,e,n,o){let i=Dt(r),a=i.x+i.w/2,d=i.y+i.h/2,s=K(r)??r,u=14;return y`
		<g class=${e?"cell lagna":"cell"}>
			${e?y`
						<rect class="lagna-bg" x=${i.x} y=${i.y} width=${i.w} height=${i.h} />
						<line class="lagna-slash" x1=${i.x+i.w-u} y1=${i.y+u} x2=${i.x+u} y2=${i.y+i.h-u} stroke-width="1.2" />
					`:v}
			<text class="sign-text" x=${i.x+6} y=${i.y+12} text-anchor="start" dominant-baseline="central">${s}</text>
			${n>0?y`<text class="house-num" x=${i.x+i.w-6} y=${i.y+12} text-anchor="end" dominant-baseline="central">${n}</text>`:v}
			${e?y`<text class="lagna-marker" x=${a} y=${i.y+26} text-anchor="middle" dominant-baseline="central">${o("ASC")}</text>`:v}
			${t.length?Q(t,r,a,d+4,14,o):v}
		</g>
	`}function ze(r,t){let e=r.lagnaSign.toLowerCase();return y`
		${Kt(r.divisionLabel)}
		${T.map(n=>zt(n,r.placements[n.toLowerCase()]??[],n.toLowerCase()===e,ee(n,r.lagnaSign),t))}
	`}var Ye={tl:{x:h,y:h},tr:{x:S-h,y:h},br:{x:S-h,y:S-h},bl:{x:h,y:S-h},top:{x:m,y:h},right:{x:S-h,y:m},bottom:{x:m,y:S-h},left:{x:h,y:m},tlMid:{x:m-x/4,y:m-x/4},trMid:{x:m+x/4,y:m-x/4},brMid:{x:m+x/4,y:m+x/4},blMid:{x:m-x/4,y:m+x/4}};function Ze(r){let t=r.reduce((n,o)=>n+o.x,0)/r.length,e=r.reduce((n,o)=>n+o.y,0)/r.length;return{x:t,y:e}}var Ut=Object.fromEntries(Object.entries({1:["top","trMid","centre","tlMid"],2:["tl","top","tlMid"],3:["tl","left","tlMid"],4:["left","tlMid","centre","blMid"],5:["bl","left","blMid"],6:["bl","bottom","blMid"],7:["bottom","blMid","centre","brMid"],8:["br","bottom","brMid"],9:["br","right","brMid"],10:["right","brMid","centre","trMid"],11:["tr","right","trMid"],12:["tr","top","trMid"]}).map(([r,t])=>{let e=t.map(n=>n==="centre"?{x:m,y:m}:Ye[n]);return[r,{centre:Ze(e),floor:Math.max(...e.map(n=>n.y))}]})),Ue=12,jt=16,Bt=8;function Ht(r){let{tl:t,tr:e,br:n,bl:o,top:i,right:a,bottom:d,left:s}=Ye;return y`
		<rect class="line" x=${t.x} y=${t.y} width=${x} height=${x} stroke-width="1.5" fill="none" />
		<polygon class="line" points="${i.x},${i.y} ${a.x},${a.y} ${d.x},${d.y} ${s.x},${s.y}" stroke-width="1" fill="none" />
		<line class="line" x1=${t.x} y1=${t.y} x2=${n.x} y2=${n.y} stroke-width="1" />
		<line class="line" x1=${e.x} y1=${e.y} x2=${o.x} y2=${o.y} stroke-width="1" />
		${r?y`<text class="centre-label" x=${m} y=${m} text-anchor="middle" dominant-baseline="central">${r}</text>`:v}
	`}function qt(r,t,e,n,o,i){let a=Ut[r];if(!a)return y``;let d=a.centre,s=Math.min(14,Math.abs(d.y-m)*.45+6),u=(n.length-1)*Ue,g=Math.max(d.y+8-u/2,d.y-s+jt),p=Math.max(0,g+u-(a.floor-Bt)),w=d.y-s-p,$=g-p+u/2,L=o?`${t} · ${K(e)??e}`:`${t}`;return y`
		<g class=${o?"cell lagna":"cell"}>
			<text class="rashi-num" x=${d.x} y=${w} text-anchor="middle" dominant-baseline="central">${L}</text>
			${o?y`<text class="lagna-marker" x=${d.x} y=${w-12} text-anchor="middle" dominant-baseline="central">${i("ASC")}</text>`:v}
			${n.length?Q(n,e,d.x,$,Ue,i):v}
		</g>
	`}function Vt(r,t){return y`
		${Ht(r.divisionLabel)}
		${T.map((e,n)=>{let o=ee(e,r.lagnaSign);return qt(o,n+1,e,r.placements[e.toLowerCase()]??[],o===1,t)})}
	`}var z=x/3;function Yt(){let r=h,t=h+z,e=h+2*z,n=S-h,rt={Aries:[{x:t,y:r},{x:e,y:r},{x:e,y:t},{x:t,y:t}],Taurus:[{x:r,y:r},{x:t,y:r},{x:t,y:t}],Gemini:[{x:r,y:r},{x:t,y:t},{x:r,y:t}],Cancer:[{x:r,y:t},{x:t,y:t},{x:t,y:e},{x:r,y:e}],Leo:[{x:r,y:e},{x:t,y:e},{x:r,y:n}],Virgo:[{x:t,y:e},{x:t,y:n},{x:r,y:n}],Libra:[{x:t,y:e},{x:e,y:e},{x:e,y:n},{x:t,y:n}],Scorpio:[{x:e,y:e},{x:e,y:n},{x:n,y:n}],Sagittarius:[{x:e,y:e},{x:n,y:n},{x:n,y:e}],Capricorn:[{x:e,y:t},{x:n,y:t},{x:n,y:e},{x:e,y:e}],Aquarius:[{x:n,y:r},{x:n,y:t},{x:e,y:t}],Pisces:[{x:e,y:r},{x:n,y:r},{x:e,y:t}]},re={};for(let[nt,ne]of Object.entries(rt))re[nt]={points:[...ne],centroid:Ze(ne)};return re}var Zt=Yt();function Wt(r){let t=h,e=h+z,n=h+2*z,o=S-h;return y`
		<rect class="line" x=${t} y=${t} width=${x} height=${x} stroke-width="1.5" fill="none" />
		<line class="line" x1=${t} y1=${e} x2=${e} y2=${e} stroke-width="1" />
		<line class="line" x1=${n} y1=${e} x2=${o} y2=${e} stroke-width="1" />
		<line class="line" x1=${t} y1=${n} x2=${e} y2=${n} stroke-width="1" />
		<line class="line" x1=${n} y1=${n} x2=${o} y2=${n} stroke-width="1" />
		<line class="line" x1=${e} y1=${t} x2=${e} y2=${e} stroke-width="1" />
		<line class="line" x1=${e} y1=${n} x2=${e} y2=${o} stroke-width="1" />
		<line class="line" x1=${n} y1=${t} x2=${n} y2=${e} stroke-width="1" />
		<line class="line" x1=${n} y1=${n} x2=${n} y2=${o} stroke-width="1" />
		<line class="line" x1=${t} y1=${t} x2=${e} y2=${e} stroke-width="1" />
		<line class="line" x1=${o} y1=${t} x2=${n} y2=${e} stroke-width="1" />
		<line class="line" x1=${o} y1=${o} x2=${n} y2=${n} stroke-width="1" />
		<line class="line" x1=${t} y1=${o} x2=${e} y2=${n} stroke-width="1" />
		${r?y`<text class="centre-label" x=${m} y=${m} text-anchor="middle" dominant-baseline="central">${r}</text>`:v}
	`}function Jt(r,t,e,n,o){let i=Zt[r];if(!i)return y``;let{centroid:a,points:d}=i,s=K(r)??r,u=d.map(g=>`${g.x},${g.y}`).join(" ");return y`
		<g class=${e?"cell lagna":"cell"}>
			${e?y`<polygon class="lagna-bg" points=${u} />`:v}
			<text class="sign-text" x=${a.x} y=${a.y-16} text-anchor="middle" dominant-baseline="central">${s}</text>
			${n>0?y`<text class="house-num" x=${a.x+18} y=${a.y-16} text-anchor="start" dominant-baseline="central">${n}</text>`:v}
			${e?y`<text class="lagna-marker" x=${a.x} y=${a.y-30} text-anchor="middle" dominant-baseline="central">${o("ASC")}</text>`:v}
			${t.length?Q(t,r,a.x,a.y+4,12,o):v}
		</g>
	`}function Xt(r,t){let e=r.lagnaSign.toLowerCase();return y`
		${Wt(r.divisionLabel)}
		${T.map(n=>Jt(n,r.placements[n.toLowerCase()]??[],n.toLowerCase()===e,ee(n,r.lagnaSign),t))}
	`}function We(r){return X(r.lagnaSign)!==-1}function Qt(r,t){let e=Object.values(r.placements).flat(),n=[];return e.some(o=>o.isRetrograde)&&n.push(`${Be} ${t("retrograde")}`),e.some(o=>o.combust)&&n.push(`${He} ${t("combust")}`),e.some(o=>o.war)&&n.push(`${qe} ${t("planetary war")}`),n.length===0?v:je`<p class="roxy-frame">${n.join(" · ")}</p>`}function er(r){return je`<p class="roxy-frame">${r("No ascendant in this chart, so the houses are not numbered.")}</p>`}function Je(r,t){let e=[];We(r)||e.push(er(t));let n=Qt(r,t);return n!==v&&e.push(n),e}function Xe(r,t,e){if(t==="north"&&!We(r))return ze(r,e);switch(t){case"north":return Vt(r,e);case"east":return Xt(r,e);default:return ze(r,e)}}function Qe(r,t,e){return De({items:Gt.map(({id:n,source:o})=>({id:n,label:e(o)})),active:r,onSelect:t,label:e("Kundli style"),idPrefix:"kundli",controls:!0})}import{css as tr}from"lit";var et=tr`.wrap{gap:var(--roxy-space-md);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,1fr);display:grid}.kundli-reference{min-width:0}.kundli-reference>summary{justify-content:space-between;align-items:center;gap:var(--roxy-space-sm);display:flex}.kundli-reference-scroll{min-width:0;margin-top:var(--roxy-space-sm);overflow-x:auto}.kundli-reference-table{width:100%}.kundli-reference-table :is(th,td){white-space:nowrap}.kundli-reference-table small{color:var(--roxy-secondary);display:block}.header{justify-content:space-between;align-items:center;gap:var(--roxy-space-sm);flex-wrap:wrap;display:flex}.title{margin:0}svg:where([part~=chart]){width:100%;max-width:var(--roxy-chart-max-width,35rem);aspect-ratio:1;height:auto;margin:0 auto;display:block}.line{fill:#0000;stroke:var(--roxy-border)}.sign-text{fill:var(--roxy-muted);font-size:calc(var(--roxy-text-base) * .6875);font-weight:var(--roxy-weight-normal);font-family:var(--roxy-font-sans);text-transform:uppercase}.rashi-num{fill:var(--roxy-muted);font-size:calc(var(--roxy-text-base) * .75);font-weight:var(--roxy-weight-normal);font-family:var(--roxy-font-sans)}.house-num{fill:var(--roxy-accent-ink);font-size:calc(var(--roxy-text-base) * .6875);font-weight:var(--roxy-weight-bold);font-family:var(--roxy-font-sans)}.planet-text{fill:var(--roxy-fg);font-size:calc(var(--roxy-text-base) * .8125);font-weight:var(--roxy-weight-bold);font-family:var(--roxy-font-sans)}.centre-label{fill:var(--roxy-muted);font-size:calc(var(--roxy-text-base) * .875);font-weight:var(--roxy-weight-bold);font-family:var(--roxy-font-sans)}.lagna-marker{fill:var(--roxy-accent-ink);font-size:calc(var(--roxy-text-base) * .625);font-weight:var(--roxy-weight-bold);font-family:var(--roxy-font-sans);text-transform:uppercase}.lagna-bg{fill:color-mix(in srgb, var(--roxy-accent) 14%, transparent)}.lagna-slash{stroke:var(--roxy-accent);stroke-linecap:round;opacity:.7}`;var E=class extends c{constructor(){super(...arguments);this.chartViewport=new D(this);this.chartStyle="north";this.chartReference="lagna";this.lagnaOverride="";this.setStyle=e=>{this.chartStyle=e}}resolveReference(){if(this.lagnaOverride)return this.lagnaOverride;if(this.chartReference==="moon")return this.data?.meta?.Moon?.rashi}viewModel(){return this.data?.meta?Ve(this.data.meta,{divisionLabel:"D1 Rashi",lagnaOverride:this.resolveReference(),states:this.data}):null}renderData(e){let n=this.viewModel();if(!n)return this.renderEmpty();let o=this.chartReference==="moon"&&!this.lagnaOverride?this.t("Chandra lagna"):this.t("Vedic kundli");return tt`<div class="wrap" part="card"><div class="header" part="header"><div><h2 class="title">${o}</h2>${Me(this.effectiveLang(),e.frame,this.translator)} ${Je(n,this.translator)}</div>${Qe(this.chartStyle,this.setStyle,this.translator)}</div><div id="kundli-panel-${this.chartStyle}" part="panel" role="tabpanel" tabindex="0" aria-labelledby="kundli-tab-${this.chartStyle}">${this.chartViewport.renderChartViewport(tt`<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" part="chart" role="img" aria-label="${this.t("Vedic birth chart with twelve sign houses")}"><title>${this.t("Vedic kundli")}</title>${Xe(n,this.chartStyle,this.translator)}</svg>`,o,this.translator)}</div></div>`}};E.endpoints=oe,E.styles=[G,Ce,Ae,et,_e],l([te({type:String,reflect:!0,attribute:"chart-style"})],E.prototype,"chartStyle",2),l([te({type:String,reflect:!0,attribute:"chart-reference"})],E.prototype,"chartReference",2),l([te({type:String,reflect:!0,attribute:"lagna-override"})],E.prototype,"lagnaOverride",2),E=l([Pe("roxy-vedic-kundli")],E);export{E as RoxyVedicKundli};
