var pt=Object.defineProperty;var ut=Object.getOwnPropertyDescriptor;var a=(n,e,t,r)=>{for(var o=r>1?void 0:r?ut(e,t):e,i=n.length-1,d;i>=0;i--)(d=n[i])&&(o=(r?d(e,t,o):d(o))||o);return r&&o&&pt(e,t,o),o};import{css as Mt,html as p,nothing as w}from"lit";var N=[{endpoint:"astrology/fixed-stars",method:"POST"}];function k(n){return n.toLowerCase().replace(/[\s_-]+/g," ").trim()}var ht=(n,e)=>e?n[k(e)]:void 0;var mt={aries:"♈",taurus:"♉",gemini:"♊",cancer:"♋",leo:"♌",virgo:"♍",libra:"♎",scorpio:"♏",sagittarius:"♐",capricorn:"♑",aquarius:"♒",pisces:"♓"},M=n=>ht(mt,n);import{html as c,nothing as m}from"lit";import{property as l,state as h}from"lit/decorators.js";import{ifDefined as x}from"lit/directives/if-defined.js";var _=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function $(n){if(n.lang)return n.lang;if(typeof document>"u")return;let e=n.closest?.("[lang]")?.getAttribute("lang");return e||document.documentElement.lang||void 0}var yt={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function C(n){let e=n.toLowerCase();return _.find(t=>t.toLowerCase()===e)}function K(n){let e=$(n);if(!e)return;let t=C(e);if(t)return t;let r=e.toLowerCase().split("-"),o=r[0];if(o==="zh"){let i=r.find(d=>d==="hans"||d==="hant")??yt[r[1]??""];return i?C(`zh-${i}`):void 0}return C(o)}import{LitElement as xt}from"lit";var z=`/**
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
`;var U="roxy-ui-tokens";function D(){if(typeof document>"u")return null;let n=document.getElementById(U);if(n)return n;let e=document.createElement("style");return e.id=U,e.textContent=z,document.head.prepend(e),e}var j="__ROXY_UI_I18N__";function q(){let n=globalThis,e=n[j];if(e)return e;let t={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return n[j]=t,t}function gt(n,e){return e?n.replace(/\{\{(\w+)\}\}/g,(t,r)=>r in e?String(e[r]??""):t):n}function B(n,e,t){return gt(ft(n,e)??e,t)}function ft(n,e){if(!n)return;let{catalogs:t}=q(),r=n.toLowerCase();return(t[r]??t[r.split("-")[0]])?.[k(e)]}function H(n){let{listeners:e}=q();return e.add(n),()=>{e.delete(n)}}var T=class{constructor(e){this.host=e,e.addController(this)}hostConnected(){this.unsubscribe=H(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var E=class extends xt{constructor(){super();this.translator=(t,r)=>this.t(t,r);new T(this)}connectedCallback(){super.connectedCallback(),D()}t(t,r){return B(this.effectiveLang(),t,r)}effectiveLang(){return $(this)}};import{css as vt}from"lit";import{css as bt}from"lit";var Y=bt`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var wt=vt`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,P=[wt,Y];var St="__cols",kt="__rows";function Tt(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function R(n){if(Array.isArray(n)){let i=!1,d=n.map(u=>{let y=R(u);return y!==u&&(i=!0),y});return i?d:n}if(!Tt(n))return n;let e=n[St],t=n[kt];if(Array.isArray(e)&&Array.isArray(t)&&Object.keys(n).length===2)return t.map(i=>{let d={};return e.forEach((u,y)=>{d[u]=R(i[y])}),d});let r=!1,o={};for(let[i,d]of Object.entries(n)){let u=R(d);u!==d&&(r=!0),o[i]=u}return r?o:n}function V(n){return R(n)}function Z(n,e){return n.find(t=>t.attrs&&Object.entries(t.attrs).every(([r,o])=>e[r]===o))??n[0]}var Et="pk_live_YOUR_KEY",J={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function W(n){if(n)return n===Et?J.sample:n.startsWith("pk_")?void 0:J.secret}function X(n,e,t={}){t.warn&&console.warn(e.message),n.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:e.reason,message:e.message},bubbles:!0,composed:!0}))}var Q="https://roxyapi.com/api/v2";async function Pt(n){try{let e=await n.json();if(e?.error){let t=e.code==="validation_error"&&Array.isArray(e.issues)?e.issues.filter(r=>typeof r.path=="string"&&typeof r.message=="string").map(r=>({path:r.path,message:r.message})):null;return{message:e.error,issues:t?.length?t:null,worded:!0}}}catch{}return{message:`Request failed (${n.status})`,issues:null,worded:!1}}var tt={fromAttribute:n=>{if(n!=null){try{let e=JSON.parse(n);if(e&&typeof e=="object"&&!Array.isArray(e))return e}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},f=class extends Error{constructor(t,r=null,o=!0){super(t);this.issues=r;this.worded=o}};function et(n){return n.submitUrl?void 0:W(n.publishableKey)}async function A(n,e,t){let r=et(n);if(r)throw new f(r.message);let o=n.submitUrl?await fetch(n.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Rt(e,n.submitContext),signal:t}):await Ot(n,e,t);if(!o.ok){let i=await Pt(o);throw new f(i.message,i.issues,i.worded)}return await o.json()}function Rt(n,e){return JSON.stringify(e?{...n,context:e}:n)}function Ot(n,e,t){let r=new URL(`${n.baseUrl??Q}${e.path}`,document.baseURI);for(let[i,d]of Object.entries(e.query??{}))d!=null&&r.searchParams.set(i,String(d));let o={Accept:"application/json"};return n.publishableKey&&(o["X-API-Key"]=n.publishableKey),e.body!=null&&(o["Content-Type"]="application/json"),fetch(r,{method:e.method??"GET",headers:o,body:e.body!=null?JSON.stringify(e.body):void 0,signal:t})}var O=class{constructor(e){this.baseUrl=Q;this.worded=!0;this.host=e,e.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(e){this.worded=!0;let t=et(this);if(t){this.host.error=t.message,X(this.host,t);return}this.abort?.abort();let r=new AbortController;this.abort=r,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let o=await A(this,e,r.signal);if(r.signal.aborted)return;this.host.data=o}catch(o){if(r.signal.aborted||o?.name==="AbortError")return;o instanceof f&&(this.host.issues=o.issues),this.worded=o instanceof f&&o.worded,this.host.error=o instanceof Error?o.message:String(o)}finally{this.abort===r&&(this.abort=void 0),r.signal.aborted||(this.host.loading=!1)}}};function nt(n,e,t,r=[]){let o={...t},i=`/${n.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(S,g)=>{let lt=o[g];return delete o[g],encodeURIComponent(String(lt??""))}),d=new Set(r),u={},y={};for(let[S,g]of Object.entries(o))g===void 0||g===""||(e==="GET"||d.has(S)?u[S]=g:y[S]=g);return{path:i,method:e,query:u,body:e==="POST"?y:void 0}}import{css as Ct,html as G,nothing as I}from"lit";import{css as Ft,html as Lt}from"lit";function v(){return Lt`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var rt=Ft`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var ot=Ct`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function it(n,e,t){let r=n.filter(o=>!!o.body);return r.length===0?I:G`<section class="block" part="section readings"><h3>${t}</h3>${r.map((o,i)=>G`<details class="interp-card" part="reading" name="${e}" ?open="${i===0}"><summary><span class="interp-lead">${o.label}</span> ${v()} ${o.aside?G`<span class="interp-aside"><small>${o.aside}</small></span>`:I}</summary><div class="interp-body"><p>${o.body}</p>${o.extra??I}</div></details>`)}</section>`}var $t="roxy-data";function At(n){return n.nodeName==="SCRIPT"&&n.getAttribute("type")==="application/json"}var F=class{constructor(e){this.host=e,e.addController(this)}hostConnected(){if(this.host.data!=null)return;let e=this.read();e!==void 0&&(this.host.data=e,this.host.requestUpdate())}read(){let e=this.findInlineScript();return e?this.parse(e.textContent):void 0}findInlineScript(){for(let e of Array.from(this.host.children))if(At(e)&&e.classList.contains($t))return e;return null}parse(e){if(e?.trim())try{return JSON.parse(e)}catch{return}}};var s=class extends E{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let t=this.lastRequest,r=this.listKey,o=this.listRows();if(!(!t||!r||!o)){this.moreLoading=!0,this.moreError=null;try{let i=await A(this.fetcher,{...t,query:{...t.query,offset:o.length}});if(this.lastRequest!==t)return;let d=i[r];this.data={...this.data,...i,[r]:[...o,...Array.isArray(d)?d:[]]}}catch(i){this.lastRequest===t&&(this.moreError=i instanceof Error?i.message:String(i))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=t=>{let r=this.selfFetch();if(!r)return;let o=t.detail;this.lastValues=o.values,this.sticky=!!o.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(o.values),this.fetchFresh(nt(r.endpoint,r.method,o.values,o.queryKeys??[]))};new F(this),this.fetcher=new O(this)}static{this.styles=[P]}static{this.endpoints=[]}willUpdate(t){if(t.has("data")&&this.data!=null){let r=V(this.data);r!==this.data&&(this.data=r)}(t.has("publishableKey")||t.has("baseUrl")||t.has("submitUrl")||t.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let t=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:Z(this.constructor.endpoints,this);return t&&{endpoint:t.endpoint,method:this.method??t.method}}render(){return c`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(t){try{return this.renderData(t)}catch(r){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,r),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:r},bubbles:!0,composed:!0})),customElements.get("roxy-data")?c`<roxy-data .data="${t}" lang="${x(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let t=this.hideSections.split(",").map(o=>o.trim().toLowerCase()).filter(o=>/^[a-z][a-z0-9-]*$/.test(o));if(t.length===0)return m;let r=t.map(o=>`[part~="${o}"],roxy-endpoint-form::part(${o}){display:none!important}`).join("");return c`<style>${r}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?c`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(t,r,o){return this.hideReadings?m:it(t,r,this.t(o??"Reading"))}renderResult(t){let r=c`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(t)}`;return this.showAttribution()?c`${r}${this.renderAttribution()}`:r}renderWithForm(t){return c`${this.renderForm()}${t}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?m:this.renderErrorBanner(this.error):this.data==null?m:this.showAttribution()?c`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let t=this.listRows(),r=this.data?.total;return!this.lastRequest||!t||typeof r!="number"?m:t.length>=r?m:c`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?c`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:m}</div>`}listRows(){let t=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(t)?t:void 0}fetchFresh(t){return this.lastRequest=t,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(t)}load(t){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(t)}pickRow(t){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:t,bubbles:!0,composed:!0})),this.openRow(t.id)}openRow(t){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let r=this.openedRow??document.createElement(this.rowDetail.tag);r.publishableKey=this.publishableKey,r.baseUrl=this.baseUrl,r.submitUrl=this.submitUrl,r.submitContext=this.submitContext,r.hideReadings=this.hideReadings,r.hideSections=this.hideSections;let o=this.effectiveLang();o&&r.setAttribute("lang",o),this.openedRow=r,this.openedRowId=t,r.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(t))}`,method:"GET",query:{lang:K(this)}}).then(()=>r.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return c`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(m):this.renderEmpty()}renderForm(){let t=this.selfFetch();return c`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${t?.endpoint??""}" method="${t?.method??"POST"}" spec-url="${x(this.specUrl)}" publishable-key="${x(this.publishableKey)}" location-url="${x(this.locationUrl)}" submit-label="${x(this.submitLabel)}" lang="${x(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let t=sessionStorage.getItem(this.rememberKey());return t?JSON.parse(t):void 0}catch{return}}writeRemembered(t){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(t))}catch{}}renderEmpty(){return c`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return c`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(t){let r=!!this.selfFetch();if(r&&this.issues)return this.renderForm();let o=this.renderErrorBanner(t);return r?c`${o}${this.renderForm()}`:o}renderErrorBanner(t){return c`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(t)}</div>`}};a([l({attribute:!1})],s.prototype,"data",2),a([l({type:String,attribute:"data-endpoint"})],s.prototype,"endpoint",2),a([l({type:String})],s.prototype,"method",2),a([l({type:String,attribute:"publishable-key"})],s.prototype,"publishableKey",2),a([l({type:String,attribute:"base-url"})],s.prototype,"baseUrl",2),a([l({type:String,attribute:"spec-url"})],s.prototype,"specUrl",2),a([l({type:String,attribute:"submit-url"})],s.prototype,"submitUrl",2),a([l({attribute:"submit-context",converter:tt})],s.prototype,"submitContext",2),a([l({type:String,attribute:"location-url"})],s.prototype,"locationUrl",2),a([l({type:Boolean})],s.prototype,"remember",2),a([l({type:Boolean,attribute:"hide-readings",reflect:!0})],s.prototype,"hideReadings",2),a([l({type:String,attribute:"hide-sections",reflect:!0})],s.prototype,"hideSections",2),a([l({type:String,attribute:"submit-label"})],s.prototype,"submitLabel",2),a([l({type:String,attribute:"error-message"})],s.prototype,"errorMessage",2),a([l({type:String})],s.prototype,"attribution",2),a([h()],s.prototype,"loading",2),a([h()],s.prototype,"error",2),a([h()],s.prototype,"issues",2),a([h()],s.prototype,"selfFetched",2),a([h()],s.prototype,"editing",2),a([h()],s.prototype,"sticky",2),a([h()],s.prototype,"openedRow",2),a([h()],s.prototype,"openedRowId",2),a([h()],s.prototype,"moreLoading",2),a([h()],s.prototype,"moreError",2);var st=n=>e=>{customElements.get(n)||customElements.define(n,e)};function Gt(n){let e=Math.floor(n);return{degree:e,minute:Math.floor((n-e)*60)}}function at(n){let{degree:e,minute:t}=Gt(n);return`${e}°${String(t).padStart(2,"0")}'`}var dt=new Map;function It(n){if(!n)return["en"];let e=dt.get(n);if(e)return[e,"en"];let t="en";try{t=Intl.getCanonicalLocales(n)[0]??"en"}catch{t="en"}return dt.set(n,t),[t,"en"]}function L(n,e,t=1){return typeof e!="number"||!Number.isFinite(e)?"":e.toLocaleString(It(n),{maximumFractionDigits:t})}var Nt="Localized";function ct(n,e,t){let r=n,o=r?.[`${e}${Nt}`];if(typeof o=="string"&&o!=="")return o;if(t!==void 0)return t;let i=r?.[e];return typeof i=="string"?i:""}var b=class extends s{renderData(e){let t=e.conjunctions??[],r=e.stars??[];return p`<div class="wrap" part="card"><header part="header"><h2>${this.t("Fixed stars")}</h2>${typeof e.orb=="number"?p`<p class="roxy-label">${this.t("Orb")} ${L(this.effectiveLang(),e.orb,1)}°</p>`:w}</header>${e.summary&&!this.hideReadings?p`<p class="summary">${e.summary}</p>`:w} ${t.length?p`<section part="section conjunctions"><h3>${this.t("Conjunctions to the chart")}</h3>${t.map((o,i)=>p`<details class="interp-card" part="reading" name="fixed-star-contacts" ?open="${i===0}"><summary><span class="interp-lead">${this.t("{{point}} conjunct {{star}}",{point:ct(o,"point"),star:o.star})}</span> ${v()} <span class="interp-aside"><small>${this.t("orb {{value}}°",{value:L(this.effectiveLang(),o.orb,2)})}</small></span></summary>${o.interpretation&&!this.hideReadings?p`<div class="interp-body"><p>${o.interpretation}</p></div>`:w}</details>`)}</section>`:p`<p class="empty-note">${this.t("No star sits within the orb of a natal point.")}</p>`} ${r.length?this.renderCatalog(r):w}</div>`}renderCatalog(e){return p`<details class="catalog"><summary>${v()} ${this.t("Star catalog ({{count}})",{count:e.length})}</summary><div class="scroll" tabindex="0" role="region" aria-label="${this.t("Precessed positions for the chart date")}"><table><caption class="roxy-label">${this.t("Precessed positions for the chart date")}</caption><thead><tr><th scope="col">${this.t("Star")}</th><th scope="col">${this.t("Position")}</th><th scope="col" class="num">${this.t("Mag")}</th><th scope="col">${this.t("Nature")}</th><th scope="col">${this.t("Keywords")}</th></tr></thead><tbody>${e.map(t=>{let r=M(t.sign);return p`<tr><td>${t.name}</td><td>${r?p`<span class="sg">${r}</span>`:w}${at(t.degree)} ${t.sign}</td><td class="num">${L(this.effectiveLang(),t.magnitude,1)}</td><td>${t.nature}</td><td><ul class="kw roxy-chips">${(t.keywords??[]).map(o=>p`<li>${o}</li>`)}</ul></td></tr>`})}</tbody></table></div></details>`}};b.endpoints=N,b.styles=[P,rt,ot,Mt`.wrap{gap:var(--roxy-space-md);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,1fr);display:grid}h2,h3,p{margin:0}header{gap:var(--roxy-space-xs);display:grid}.summary{font-size:var(--roxy-text-sm)}.empty-note{color:var(--roxy-muted);font-size:var(--roxy-text-sm)}section>h3{margin-block-end:var(--roxy-space-sm)}.interp-lead .point{color:var(--roxy-accent-ink);font-weight:var(--roxy-weight-bold)}.interp-aside small{font-variant-numeric:tabular-nums}.catalog summary{align-items:center;gap:var(--roxy-space-sm);font-weight:var(--roxy-weight-bold);display:flex}.scroll{min-width:0;margin-block-start:var(--roxy-space-sm);overflow-x:auto}table{width:100%}caption{caption-side:top;text-align:start;padding-block-end:var(--roxy-space-xs)}:is(th,td){white-space:nowrap}:is(th,td).num{text-align:end}.sg{color:var(--roxy-secondary);margin-inline-end:var(--roxy-space-xs)}.kw{max-inline-size:32ch}`],b=a([st("roxy-fixed-stars")],b);export{b as RoxyFixedStars};
