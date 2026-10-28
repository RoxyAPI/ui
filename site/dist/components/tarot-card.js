var xe=Object.defineProperty;var be=Object.getOwnPropertyDescriptor;var d=(o,t,e,r)=>{for(var n=r>1?void 0:r?be(t,e):t,i=o.length-1,a;i>=0;i--)(a=o[i])&&(n=(r?a(t,e,n):a(n))||n);return r&&n&&xe(t,e,n),n};import{css as Ne,html as y,nothing as S}from"lit";import{state as qe}from"lit/decorators.js";var j=[{endpoint:"tarot/daily",method:"POST"},{endpoint:"tarot/cards/{id}",method:"GET"}];import{html as p,nothing as f}from"lit";import{property as h,state as u}from"lit/decorators.js";import{ifDefined as v}from"lit/directives/if-defined.js";var N=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function F(o){if(o.lang)return o.lang;if(typeof document>"u")return;let t=o.closest?.("[lang]")?.getAttribute("lang");return t||document.documentElement.lang||void 0}var ve={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function $(o){let t=o.toLowerCase();return N.find(e=>e.toLowerCase()===t)}function q(o){let t=F(o);if(!t)return;let e=$(t);if(e)return e;let r=t.toLowerCase().split("-"),n=r[0];if(n==="zh"){let i=r.find(a=>a==="hans"||a==="hant")??ve[r[1]??""];return i?$(`zh-${i}`):void 0}return $(n)}import{LitElement as Ee}from"lit";var D=`/**
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
`;var M="roxy-ui-tokens";function H(){if(typeof document>"u")return null;let o=document.getElementById(M);if(o)return o;let t=document.createElement("style");return t.id=M,t.textContent=D,document.head.prepend(t),t}function B(o){return o.toLowerCase().replace(/[\s_-]+/g," ").trim()}function C(o){return o?o.charAt(0).toUpperCase()+o.slice(1).toLowerCase():""}function Y(o){return o.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/([a-z])([0-9])/g,"$1 $2").replace(/^\w/,t=>t.toUpperCase())}var V="__ROXY_UI_I18N__";function A(){let o=globalThis,t=o[V];if(t)return t;let e={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return o[V]=e,e}function Se(o,t){return t?o.replace(/\{\{(\w+)\}\}/g,(e,r)=>r in t?String(t[r]??""):e):o}function J(o,t,e){return Se(we(o,t)??t,e)}function we(o,t){if(!o)return;let{catalogs:e}=A(),r=o.toLowerCase();return(e[r]??e[r.split("-")[0]])?.[B(t)]}function ke(o){if(!o)return;let{fieldLabels:t}=A(),e=o.toLowerCase();return t[e]??t[e.split("-")[0]]}function W(o,t,e){return ke(o)?.enums[`${t}.${e}`]}function X(o){let{listeners:t}=A();return t.add(o),()=>{t.delete(o)}}var k=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){this.unsubscribe=X(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var E=class extends Ee{constructor(){super();this.translator=(e,r)=>this.t(e,r);new k(this)}connectedCallback(){super.connectedCallback(),H()}t(e,r){return J(this.effectiveLang(),e,r)}effectiveLang(){return F(this)}};import{css as Re}from"lit";import{css as Te}from"lit";var Z=Te`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var Oe=Re`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,T=[Oe,Z];var Pe="__cols",$e="__rows";function Fe(o){return typeof o=="object"&&o!==null&&!Array.isArray(o)}function R(o){if(Array.isArray(o)){let i=!1,a=o.map(c=>{let s=R(c);return s!==c&&(i=!0),s});return i?a:o}if(!Fe(o))return o;let t=o[Pe],e=o[$e];if(Array.isArray(t)&&Array.isArray(e)&&Object.keys(o).length===2)return e.map(i=>{let a={};return t.forEach((c,s)=>{a[c]=R(i[s])}),a});let r=!1,n={};for(let[i,a]of Object.entries(o)){let c=R(a);c!==a&&(r=!0),n[i]=c}return r?n:o}function Q(o){return R(o)}function ee(o,t){return o.find(e=>e.attrs&&Object.entries(e.attrs).every(([r,n])=>t[r]===n))??o[0]}var Ce="pk_live_YOUR_KEY",te={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function re(o){if(o)return o===Ce?te.sample:o.startsWith("pk_")?void 0:te.secret}function oe(o,t,e={}){e.warn&&console.warn(t.message),o.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:t.reason,message:t.message},bubbles:!0,composed:!0}))}var ne="https://roxyapi.com/api/v2";async function Ae(o){try{let t=await o.json();if(t?.error){let e=t.code==="validation_error"&&Array.isArray(t.issues)?t.issues.filter(r=>typeof r.path=="string"&&typeof r.message=="string").map(r=>({path:r.path,message:r.message})):null;return{message:t.error,issues:e?.length?e:null,worded:!0}}}catch{}return{message:`Request failed (${o.status})`,issues:null,worded:!1}}var ie={fromAttribute:o=>{if(o!=null){try{let t=JSON.parse(o);if(t&&typeof t=="object"&&!Array.isArray(t))return t}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},b=class extends Error{constructor(e,r=null,n=!0){super(e);this.issues=r;this.worded=n}};function ae(o){return o.submitUrl?void 0:re(o.publishableKey)}async function L(o,t,e){let r=ae(o);if(r)throw new b(r.message);let n=o.submitUrl?await fetch(o.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Le(t,o.submitContext),signal:e}):await Ge(o,t,e);if(!n.ok){let i=await Ae(n);throw new b(i.message,i.issues,i.worded)}return await n.json()}function Le(o,t){return JSON.stringify(t?{...o,context:t}:o)}function Ge(o,t,e){let r=new URL(`${o.baseUrl??ne}${t.path}`,document.baseURI);for(let[i,a]of Object.entries(t.query??{}))a!=null&&r.searchParams.set(i,String(a));let n={Accept:"application/json"};return o.publishableKey&&(n["X-API-Key"]=o.publishableKey),t.body!=null&&(n["Content-Type"]="application/json"),fetch(r,{method:t.method??"GET",headers:n,body:t.body!=null?JSON.stringify(t.body):void 0,signal:e})}var O=class{constructor(t){this.baseUrl=ne;this.worded=!0;this.host=t,t.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(t){this.worded=!0;let e=ae(this);if(e){this.host.error=e.message,oe(this.host,e);return}this.abort?.abort();let r=new AbortController;this.abort=r,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let n=await L(this,t,r.signal);if(r.signal.aborted)return;this.host.data=n}catch(n){if(r.signal.aborted||n?.name==="AbortError")return;n instanceof b&&(this.host.issues=n.issues),this.worded=n instanceof b&&n.worded,this.host.error=n instanceof Error?n.message:String(n)}finally{this.abort===r&&(this.abort=void 0),r.signal.aborted||(this.host.loading=!1)}}};function se(o,t,e,r=[]){let n={...e},i=`/${o.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(m,g)=>{let w=n[g];return delete n[g],encodeURIComponent(String(w??""))}),a=new Set(r),c={},s={};for(let[m,g]of Object.entries(n))g===void 0||g===""||(t==="GET"||a.has(m)?c[m]=g:s[m]=g);return{path:i,method:t,query:c,body:t==="POST"?s:void 0}}import{css as Ue,html as G,nothing as K}from"lit";import{css as Ke,html as Ie}from"lit";function de(){return Ie`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var le=Ke`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var ce=Ue`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function pe(o,t,e){let r=o.filter(n=>!!n.body);return r.length===0?K:G`<section class="block" part="section readings"><h3>${e}</h3>${r.map((n,i)=>G`<details class="interp-card" part="reading" name="${t}" ?open="${i===0}"><summary><span class="interp-lead">${n.label}</span> ${de()} ${n.aside?G`<span class="interp-aside"><small>${n.aside}</small></span>`:K}</summary><div class="interp-body"><p>${n.body}</p>${n.extra??K}</div></details>`)}</section>`}var ze="roxy-data";function _e(o){return o.nodeName==="SCRIPT"&&o.getAttribute("type")==="application/json"}var P=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){if(this.host.data!=null)return;let t=this.read();t!==void 0&&(this.host.data=t,this.host.requestUpdate())}read(){let t=this.findInlineScript();return t?this.parse(t.textContent):void 0}findInlineScript(){for(let t of Array.from(this.host.children))if(_e(t)&&t.classList.contains(ze))return t;return null}parse(t){if(t?.trim())try{return JSON.parse(t)}catch{return}}};var l=class extends E{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let e=this.lastRequest,r=this.listKey,n=this.listRows();if(!(!e||!r||!n)){this.moreLoading=!0,this.moreError=null;try{let i=await L(this.fetcher,{...e,query:{...e.query,offset:n.length}});if(this.lastRequest!==e)return;let a=i[r];this.data={...this.data,...i,[r]:[...n,...Array.isArray(a)?a:[]]}}catch(i){this.lastRequest===e&&(this.moreError=i instanceof Error?i.message:String(i))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=e=>{let r=this.selfFetch();if(!r)return;let n=e.detail;this.lastValues=n.values,this.sticky=!!n.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(n.values),this.fetchFresh(se(r.endpoint,r.method,n.values,n.queryKeys??[]))};new P(this),this.fetcher=new O(this)}static{this.styles=[T]}static{this.endpoints=[]}willUpdate(e){if(e.has("data")&&this.data!=null){let r=Q(this.data);r!==this.data&&(this.data=r)}(e.has("publishableKey")||e.has("baseUrl")||e.has("submitUrl")||e.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let e=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:ee(this.constructor.endpoints,this);return e&&{endpoint:e.endpoint,method:this.method??e.method}}render(){return p`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(e){try{return this.renderData(e)}catch(r){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,r),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:r},bubbles:!0,composed:!0})),customElements.get("roxy-data")?p`<roxy-data .data="${e}" lang="${v(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let e=this.hideSections.split(",").map(n=>n.trim().toLowerCase()).filter(n=>/^[a-z][a-z0-9-]*$/.test(n));if(e.length===0)return f;let r=e.map(n=>`[part~="${n}"],roxy-endpoint-form::part(${n}){display:none!important}`).join("");return p`<style>${r}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?p`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(e,r,n){return this.hideReadings?f:pe(e,r,this.t(n??"Reading"))}renderResult(e){let r=p`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(e)}`;return this.showAttribution()?p`${r}${this.renderAttribution()}`:r}renderWithForm(e){return p`${this.renderForm()}${e}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?f:this.renderErrorBanner(this.error):this.data==null?f:this.showAttribution()?p`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let e=this.listRows(),r=this.data?.total;return!this.lastRequest||!e||typeof r!="number"?f:e.length>=r?f:p`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?p`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:f}</div>`}listRows(){let e=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(e)?e:void 0}fetchFresh(e){return this.lastRequest=e,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(e)}load(e){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(e)}pickRow(e){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:e,bubbles:!0,composed:!0})),this.openRow(e.id)}openRow(e){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let r=this.openedRow??document.createElement(this.rowDetail.tag);r.publishableKey=this.publishableKey,r.baseUrl=this.baseUrl,r.submitUrl=this.submitUrl,r.submitContext=this.submitContext,r.hideReadings=this.hideReadings,r.hideSections=this.hideSections;let n=this.effectiveLang();n&&r.setAttribute("lang",n),this.openedRow=r,this.openedRowId=e,r.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(e))}`,method:"GET",query:{lang:q(this)}}).then(()=>r.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return p`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(f):this.renderEmpty()}renderForm(){let e=this.selfFetch();return p`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${e?.endpoint??""}" method="${e?.method??"POST"}" spec-url="${v(this.specUrl)}" publishable-key="${v(this.publishableKey)}" location-url="${v(this.locationUrl)}" submit-label="${v(this.submitLabel)}" lang="${v(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let e=sessionStorage.getItem(this.rememberKey());return e?JSON.parse(e):void 0}catch{return}}writeRemembered(e){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(e))}catch{}}renderEmpty(){return p`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return p`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(e){let r=!!this.selfFetch();if(r&&this.issues)return this.renderForm();let n=this.renderErrorBanner(e);return r?p`${n}${this.renderForm()}`:n}renderErrorBanner(e){return p`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(e)}</div>`}};d([h({attribute:!1})],l.prototype,"data",2),d([h({type:String,attribute:"data-endpoint"})],l.prototype,"endpoint",2),d([h({type:String})],l.prototype,"method",2),d([h({type:String,attribute:"publishable-key"})],l.prototype,"publishableKey",2),d([h({type:String,attribute:"base-url"})],l.prototype,"baseUrl",2),d([h({type:String,attribute:"spec-url"})],l.prototype,"specUrl",2),d([h({type:String,attribute:"submit-url"})],l.prototype,"submitUrl",2),d([h({attribute:"submit-context",converter:ie})],l.prototype,"submitContext",2),d([h({type:String,attribute:"location-url"})],l.prototype,"locationUrl",2),d([h({type:Boolean})],l.prototype,"remember",2),d([h({type:Boolean,attribute:"hide-readings",reflect:!0})],l.prototype,"hideReadings",2),d([h({type:String,attribute:"hide-sections",reflect:!0})],l.prototype,"hideSections",2),d([h({type:String,attribute:"submit-label"})],l.prototype,"submitLabel",2),d([h({type:String,attribute:"error-message"})],l.prototype,"errorMessage",2),d([h({type:String})],l.prototype,"attribution",2),d([u()],l.prototype,"loading",2),d([u()],l.prototype,"error",2),d([u()],l.prototype,"issues",2),d([u()],l.prototype,"selfFetched",2),d([u()],l.prototype,"editing",2),d([u()],l.prototype,"sticky",2),d([u()],l.prototype,"openedRow",2),d([u()],l.prototype,"openedRowId",2),d([u()],l.prototype,"moreLoading",2),d([u()],l.prototype,"moreError",2);var he=o=>t=>{customElements.get(o)||customElements.define(o,t)};import{css as je,html as I,nothing as ye}from"lit";var ue=je`.roxy-tablist{gap:var(--roxy-space-xs);box-shadow:inset 0 calc(var(--roxy-line-thick) * -1) 0 var(--roxy-border);scrollbar-width:thin;min-width:0;display:flex;overflow-x:auto}.roxy-tab{padding:var(--roxy-space-xs) var(--roxy-space-md);font-size:var(--roxy-text-sm);border:none;border-bottom:var(--roxy-line-thick) solid transparent;cursor:pointer;color:var(--roxy-muted);transition:color var(--roxy-motion-duration) var(--roxy-motion-easing);background:0 0;flex-shrink:0}.roxy-tab[aria-selected=true]{color:var(--roxy-accent-ink);border-bottom-color:var(--roxy-accent);font-weight:var(--roxy-weight-bold)}.roxy-tab:hover:not([aria-selected=true]){color:var(--roxy-fg)}.roxy-tab:focus-visible{outline-offset:calc(var(--roxy-line-thick) * -1);border-radius:var(--roxy-radius-sm)}`;function me(o){let{items:t,active:e,onSelect:r,label:n,idPrefix:i,controls:a=!1}=o;return I`<div class="roxy-tablist" part="tablist" role="tablist" aria-label="${n}" @keydown="${s=>{if(s.key!=="ArrowRight"&&s.key!=="ArrowLeft")return;s.preventDefault();let m=t.findIndex(fe=>fe.id===e);if(m===-1)return;let g=s.key==="ArrowRight"?1:-1,w=t[(m+g+t.length)%t.length];if(!w)return;r(w.id);let ge=s.currentTarget.getRootNode();requestAnimationFrame(()=>{ge.querySelector(`#${i}-tab-${w.id}`)?.focus()})}}">${t.map(s=>I`<button type="button" class="roxy-tab" part="tab" role="tab" id="${i}-tab-${s.id}" aria-selected="${e===s.id?"true":"false"}" aria-controls="${a?`${i}-panel-${s.id}`:ye}" tabindex="${e===s.id?"0":"-1"}" @click="${()=>r(s.id)}">${s.label}</button>`)}</div>${a?t.filter(s=>s.id!==e).map(s=>I`<div role="tabpanel" id="${i}-panel-${s.id}" aria-labelledby="${i}-tab-${s.id}" hidden></div>`):ye}`}function U(o,t,e,r){return W(o,t,e)??r??Y(e)}function z(o,t){return U(o,"arcana",t,`${C(t)} Arcana`)}function _(o,t){return U(o,"suit",t,C(t))}var De=[["love","Love"],["career","Career"],["finances","Finance"],["health","Health"],["spirituality","Spiritual"]],x=class extends l{constructor(){super(...arguments);this.orientation="upright"}renderData(e){return"card"in e?this.renderDailyCard(e):this.renderFullCard(e)}renderDailyCard(e){let r=e.card,n=!!r.reversed,i=r.keywords??[],a=this.effectiveLang(),c=[r.arcana?z(a,r.arcana):"",r.suit?_(a,r.suit):""].filter(Boolean).join(" · "),s=!this.hideReadings;return y`<article class="card" part="card" aria-label="${r.name??this.t("Tarot card")}">${this.renderImage(r.imageUrl,r.name,n)}<div part="header"><div class="meta roxy-label">${c?`${c} · `:""}<span class="drawn">${n?this.t("drawn reversed"):this.t("drawn upright")}</span></div><h2>${r.name??this.t("Tarot card")}</h2>${e.dailyMessage&&s?y`<p class="message">${e.dailyMessage}</p>`:S} ${r.meaning&&s?y`<p class="reading">${r.meaning}</p>`:S} ${i.length>0&&s?y`<ul class="roxy-chips">${i.map(m=>y`<li>${m}</li>`)}</ul>`:S} ${this.renderGuidance(r,"tarot-daily-guidance")}</div></article>`}renderFullCard(e){let r=this.orientation==="reversed",n=r?e.reversed:e.upright,i=(r?e.keywords?.reversed:e.keywords?.upright)??n?.keywords??[],a=!this.hideReadings;return y`<article class="card" part="card" aria-label="${e.name??this.t("Tarot card")}">${this.renderImage(e.imageUrl,e.name,r)}<div part="header"><div class="meta roxy-label">${[e.arcana?z(this.effectiveLang(),e.arcana):"",e.suit?_(this.effectiveLang(),e.suit):"",e.number!==void 0&&e.number!==null?this.t("no. {{number}}",{number:e.number}):""].filter(Boolean).join(" · ")}</div><h2>${e.name??this.t("Tarot card")}</h2>${me({items:[{id:"upright",label:this.t("Upright")},{id:"reversed",label:this.t("Reversed")}],active:this.orientation,onSelect:c=>{this.orientation=c},label:this.t("Card orientation"),idPrefix:"tarot",controls:!0})}<div id="tarot-panel-${this.orientation}" part="panel" role="tabpanel" tabindex="0" aria-labelledby="tarot-tab-${this.orientation}">${n?.description&&a?y`<p class="reading">${n.description}</p>`:S} ${i.length>0&&a?y`<ul class="roxy-chips">${i.map(c=>y`<li>${c}</li>`)}</ul>`:S} ${this.renderGuidance(n,`tarot-${this.orientation}-guidance`)}</div></div></article>`}renderImage(e,r,n){let i=`image ${n?"reversed":""}`;return e?y`<img class="${i}" part="chart" src="${e}" alt="${r??this.t("Tarot card")}">`:y`<div class="${i}" part="chart" style="aspect-ratio:0.6;display:flex;align-items:center;justify-content:center;color:var(--roxy-muted)">${r??"?"}</div>`}renderGuidance(e,r){if(!e)return S;let n=De.map(([i,a])=>({label:this.t(a),body:e[i]??""}));return this.renderInterpretation(n,r,"Guidance")}};x.endpoints=j,x.styles=[T,le,ce,ue,Ne`.card{align-items:start;gap:var(--roxy-space-lg);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,6lh) minmax(0,1fr);display:grid}@container (width<=480px){.card{grid-template-columns:minmax(0,1fr)}}h2,p{margin:0}.image{border-radius:var(--roxy-radius-md);background:var(--roxy-border);width:100%;height:auto;transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);display:block}.image.reversed{transform:rotate(180deg)}.meta{margin-block-end:var(--roxy-space-sm)}.drawn{color:var(--roxy-fg);font-weight:var(--roxy-weight-bold)}.message{margin-block:var(--roxy-space-sm) var(--roxy-space-md)}.reading{white-space:pre-line;margin-block-end:var(--roxy-space-md)}.roxy-tablist{margin-block:var(--roxy-space-sm)}.roxy-chips{margin-block-start:var(--roxy-space-sm)}`],d([qe()],x.prototype,"orientation",2),x=d([he("roxy-tarot-card")],x);export{x as RoxyTarotCard};
