var mt=Object.defineProperty;var yt=Object.getOwnPropertyDescriptor;var d=(n,t,e,r)=>{for(var o=r>1?void 0:r?yt(t,e):t,s=n.length-1,i;s>=0;s--)(i=n[s])&&(o=(r?i(t,e,o):i(o))||o);return r&&o&&mt(t,e,o),o};import{css as zt,html as u,nothing as b}from"lit";var M=[{endpoint:"vedic-astrology/aspects",method:"POST"}];import{html as l,nothing as m}from"lit";import{property as c,state as h}from"lit/decorators.js";import{ifDefined as x}from"lit/directives/if-defined.js";var N=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function C(n){if(n.lang)return n.lang;if(typeof document>"u")return;let t=n.closest?.("[lang]")?.getAttribute("lang");return t||document.documentElement.lang||void 0}var gt={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function F(n){let t=n.toLowerCase();return N.find(e=>e.toLowerCase()===t)}function _(n){let t=C(n);if(!t)return;let e=F(t);if(e)return e;let r=t.toLowerCase().split("-"),o=r[0];if(o==="zh"){let s=r.find(i=>i==="hans"||i==="hant")??gt[r[1]??""];return s?F(`zh-${s}`):void 0}return F(o)}import{LitElement as bt}from"lit";var U=`/**
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
`;var D="roxy-ui-tokens";function z(){if(typeof document>"u")return null;let n=document.getElementById(D);if(n)return n;let t=document.createElement("style");return t.id=D,t.textContent=U,document.head.prepend(t),t}function K(n){return n.toLowerCase().replace(/[\s_-]+/g," ").trim()}var j="__ROXY_UI_I18N__";function q(){let n=globalThis,t=n[j];if(t)return t;let e={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return n[j]=e,e}function ft(n,t){return t?n.replace(/\{\{(\w+)\}\}/g,(e,r)=>r in t?String(t[r]??""):e):n}function B(n,t,e){return ft(xt(n,t)??t,e)}function xt(n,t){if(!n)return;let{catalogs:e}=q(),r=n.toLowerCase();return(e[r]??e[r.split("-")[0]])?.[K(t)]}function H(n){let{listeners:t}=q();return t.add(n),()=>{t.delete(n)}}var S=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){this.unsubscribe=H(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var k=class extends bt{constructor(){super();this.translator=(e,r)=>this.t(e,r);new S(this)}connectedCallback(){super.connectedCallback(),z()}t(e,r){return B(this.effectiveLang(),e,r)}effectiveLang(){return C(this)}};import{css as wt}from"lit";import{css as vt}from"lit";var Y=vt`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var St=wt`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,T=[St,Y];var kt="__cols",Tt="__rows";function Et(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function E(n){if(Array.isArray(n)){let s=!1,i=n.map(p=>{let y=E(p);return y!==p&&(s=!0),y});return s?i:n}if(!Et(n))return n;let t=n[kt],e=n[Tt];if(Array.isArray(t)&&Array.isArray(e)&&Object.keys(n).length===2)return e.map(s=>{let i={};return t.forEach((p,y)=>{i[p]=E(s[y])}),i});let r=!1,o={};for(let[s,i]of Object.entries(n)){let p=E(i);p!==i&&(r=!0),o[s]=p}return r?o:n}function Z(n){return E(n)}function V(n,t){return n.find(e=>e.attrs&&Object.entries(e.attrs).every(([r,o])=>t[r]===o))??n[0]}var Pt="pk_live_YOUR_KEY",J={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function W(n){if(n)return n===Pt?J.sample:n.startsWith("pk_")?void 0:J.secret}function X(n,t,e={}){e.warn&&console.warn(t.message),n.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:t.reason,message:t.message},bubbles:!0,composed:!0}))}var Q="https://roxyapi.com/api/v2";async function Rt(n){try{let t=await n.json();if(t?.error){let e=t.code==="validation_error"&&Array.isArray(t.issues)?t.issues.filter(r=>typeof r.path=="string"&&typeof r.message=="string").map(r=>({path:r.path,message:r.message})):null;return{message:t.error,issues:e?.length?e:null,worded:!0}}}catch{}return{message:`Request failed (${n.status})`,issues:null,worded:!1}}var tt={fromAttribute:n=>{if(n!=null){try{let t=JSON.parse(n);if(t&&typeof t=="object"&&!Array.isArray(t))return t}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},f=class extends Error{constructor(e,r=null,o=!0){super(e);this.issues=r;this.worded=o}};function et(n){return n.submitUrl?void 0:W(n.publishableKey)}async function L(n,t,e){let r=et(n);if(r)throw new f(r.message);let o=n.submitUrl?await fetch(n.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Ot(t,n.submitContext),signal:e}):await Ft(n,t,e);if(!o.ok){let s=await Rt(o);throw new f(s.message,s.issues,s.worded)}return await o.json()}function Ot(n,t){return JSON.stringify(t?{...n,context:t}:n)}function Ft(n,t,e){let r=new URL(`${n.baseUrl??Q}${t.path}`,document.baseURI);for(let[s,i]of Object.entries(t.query??{}))i!=null&&r.searchParams.set(s,String(i));let o={Accept:"application/json"};return n.publishableKey&&(o["X-API-Key"]=n.publishableKey),t.body!=null&&(o["Content-Type"]="application/json"),fetch(r,{method:t.method??"GET",headers:o,body:t.body!=null?JSON.stringify(t.body):void 0,signal:e})}var P=class{constructor(t){this.baseUrl=Q;this.worded=!0;this.host=t,t.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(t){this.worded=!0;let e=et(this);if(e){this.host.error=e.message,X(this.host,e);return}this.abort?.abort();let r=new AbortController;this.abort=r,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let o=await L(this,t,r.signal);if(r.signal.aborted)return;this.host.data=o}catch(o){if(r.signal.aborted||o?.name==="AbortError")return;o instanceof f&&(this.host.issues=o.issues),this.worded=o instanceof f&&o.worded,this.host.error=o instanceof Error?o.message:String(o)}finally{this.abort===r&&(this.abort=void 0),r.signal.aborted||(this.host.loading=!1)}}};function nt(n,t,e,r=[]){let o={...e},s=`/${n.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(w,g)=>{let ut=o[g];return delete o[g],encodeURIComponent(String(ut??""))}),i=new Set(r),p={},y={};for(let[w,g]of Object.entries(o))g===void 0||g===""||(t==="GET"||i.has(w)?p[w]=g:y[w]=g);return{path:s,method:t,query:p,body:t==="POST"?y:void 0}}import{css as $t,html as $,nothing as A}from"lit";import{css as Ct,html as Lt}from"lit";function rt(){return Lt`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var xe=Ct`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var Se=$t`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function ot(n,t,e){let r=n.filter(o=>!!o.body);return r.length===0?A:$`<section class="block" part="section readings"><h3>${e}</h3>${r.map((o,s)=>$`<details class="interp-card" part="reading" name="${t}" ?open="${s===0}"><summary><span class="interp-lead">${o.label}</span> ${rt()} ${o.aside?$`<span class="interp-aside"><small>${o.aside}</small></span>`:A}</summary><div class="interp-body"><p>${o.body}</p>${o.extra??A}</div></details>`)}</section>`}var At="roxy-data";function Gt(n){return n.nodeName==="SCRIPT"&&n.getAttribute("type")==="application/json"}var R=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){if(this.host.data!=null)return;let t=this.read();t!==void 0&&(this.host.data=t,this.host.requestUpdate())}read(){let t=this.findInlineScript();return t?this.parse(t.textContent):void 0}findInlineScript(){for(let t of Array.from(this.host.children))if(Gt(t)&&t.classList.contains(At))return t;return null}parse(t){if(t?.trim())try{return JSON.parse(t)}catch{return}}};var a=class extends k{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let e=this.lastRequest,r=this.listKey,o=this.listRows();if(!(!e||!r||!o)){this.moreLoading=!0,this.moreError=null;try{let s=await L(this.fetcher,{...e,query:{...e.query,offset:o.length}});if(this.lastRequest!==e)return;let i=s[r];this.data={...this.data,...s,[r]:[...o,...Array.isArray(i)?i:[]]}}catch(s){this.lastRequest===e&&(this.moreError=s instanceof Error?s.message:String(s))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=e=>{let r=this.selfFetch();if(!r)return;let o=e.detail;this.lastValues=o.values,this.sticky=!!o.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(o.values),this.fetchFresh(nt(r.endpoint,r.method,o.values,o.queryKeys??[]))};new R(this),this.fetcher=new P(this)}static{this.styles=[T]}static{this.endpoints=[]}willUpdate(e){if(e.has("data")&&this.data!=null){let r=Z(this.data);r!==this.data&&(this.data=r)}(e.has("publishableKey")||e.has("baseUrl")||e.has("submitUrl")||e.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let e=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:V(this.constructor.endpoints,this);return e&&{endpoint:e.endpoint,method:this.method??e.method}}render(){return l`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(e){try{return this.renderData(e)}catch(r){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,r),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:r},bubbles:!0,composed:!0})),customElements.get("roxy-data")?l`<roxy-data .data="${e}" lang="${x(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let e=this.hideSections.split(",").map(o=>o.trim().toLowerCase()).filter(o=>/^[a-z][a-z0-9-]*$/.test(o));if(e.length===0)return m;let r=e.map(o=>`[part~="${o}"],roxy-endpoint-form::part(${o}){display:none!important}`).join("");return l`<style>${r}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?l`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(e,r,o){return this.hideReadings?m:ot(e,r,this.t(o??"Reading"))}renderResult(e){let r=l`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(e)}`;return this.showAttribution()?l`${r}${this.renderAttribution()}`:r}renderWithForm(e){return l`${this.renderForm()}${e}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?m:this.renderErrorBanner(this.error):this.data==null?m:this.showAttribution()?l`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let e=this.listRows(),r=this.data?.total;return!this.lastRequest||!e||typeof r!="number"?m:e.length>=r?m:l`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?l`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:m}</div>`}listRows(){let e=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(e)?e:void 0}fetchFresh(e){return this.lastRequest=e,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(e)}load(e){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(e)}pickRow(e){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:e,bubbles:!0,composed:!0})),this.openRow(e.id)}openRow(e){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let r=this.openedRow??document.createElement(this.rowDetail.tag);r.publishableKey=this.publishableKey,r.baseUrl=this.baseUrl,r.submitUrl=this.submitUrl,r.submitContext=this.submitContext,r.hideReadings=this.hideReadings,r.hideSections=this.hideSections;let o=this.effectiveLang();o&&r.setAttribute("lang",o),this.openedRow=r,this.openedRowId=e,r.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(e))}`,method:"GET",query:{lang:_(this)}}).then(()=>r.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return l`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(m):this.renderEmpty()}renderForm(){let e=this.selfFetch();return l`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${e?.endpoint??""}" method="${e?.method??"POST"}" spec-url="${x(this.specUrl)}" publishable-key="${x(this.publishableKey)}" location-url="${x(this.locationUrl)}" submit-label="${x(this.submitLabel)}" lang="${x(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let e=sessionStorage.getItem(this.rememberKey());return e?JSON.parse(e):void 0}catch{return}}writeRemembered(e){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(e))}catch{}}renderEmpty(){return l`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return l`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(e){let r=!!this.selfFetch();if(r&&this.issues)return this.renderForm();let o=this.renderErrorBanner(e);return r?l`${o}${this.renderForm()}`:o}renderErrorBanner(e){return l`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(e)}</div>`}};d([c({attribute:!1})],a.prototype,"data",2),d([c({type:String,attribute:"data-endpoint"})],a.prototype,"endpoint",2),d([c({type:String})],a.prototype,"method",2),d([c({type:String,attribute:"publishable-key"})],a.prototype,"publishableKey",2),d([c({type:String,attribute:"base-url"})],a.prototype,"baseUrl",2),d([c({type:String,attribute:"spec-url"})],a.prototype,"specUrl",2),d([c({type:String,attribute:"submit-url"})],a.prototype,"submitUrl",2),d([c({attribute:"submit-context",converter:tt})],a.prototype,"submitContext",2),d([c({type:String,attribute:"location-url"})],a.prototype,"locationUrl",2),d([c({type:Boolean})],a.prototype,"remember",2),d([c({type:Boolean,attribute:"hide-readings",reflect:!0})],a.prototype,"hideReadings",2),d([c({type:String,attribute:"hide-sections",reflect:!0})],a.prototype,"hideSections",2),d([c({type:String,attribute:"submit-label"})],a.prototype,"submitLabel",2),d([c({type:String,attribute:"error-message"})],a.prototype,"errorMessage",2),d([c({type:String})],a.prototype,"attribution",2),d([h()],a.prototype,"loading",2),d([h()],a.prototype,"error",2),d([h()],a.prototype,"issues",2),d([h()],a.prototype,"selfFetched",2),d([h()],a.prototype,"editing",2),d([h()],a.prototype,"sticky",2),d([h()],a.prototype,"openedRow",2),d([h()],a.prototype,"openedRowId",2),d([h()],a.prototype,"moreLoading",2),d([h()],a.prototype,"moreError",2);var it=n=>t=>{customElements.get(n)||customElements.define(n,t)};var st=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];function It(n){let t=n%360;return t<0?t+360:t}function Mt(n){let t=It(n),e=Math.floor(t/30)%12,r=t%30,o=Math.floor(r),s=(r-o)*60,i=Math.floor(s),p=Math.round((s-i)*60);return{sign:st[e]??"Aries",signIndex:e,degree:o,minute:i,second:p}}function at(n,t){let{sign:e,degree:r,minute:o}=Mt(n);return`${r}° ${t||e} ${String(o).padStart(2,"0")}'`}var G=/^\d{4}-\d{2}-\d{2}$/,Nt=/^\d{4}-\d{2}$/,ct=/^\d{2}:\d{2}(:\d{2})?$/,_t=/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/,dt=new Map;function O(n){if(!n)return["en"];let t=dt.get(n);if(t)return[t,"en"];let e="en";try{e=Intl.getCanonicalLocales(n)[0]??"en"}catch{e="en"}return dt.set(n,e),[e,"en"]}var lt=new Map;function Ut(n){let t=n??"",e=lt.get(t);if(e)return e;let o={hour:new Intl.DateTimeFormat(O(n),{timeStyle:"short",timeZone:"UTC"}).formatToParts(new Date(Date.UTC(2e3,0,1,1))).find(s=>s.type==="hour")?.value?.length===2?"2-digit":"numeric",minute:"2-digit"};return lt.set(t,o),o}function pt(n){let t=ct.test(n)?`1970-01-01T${n}`:G.test(n)?`${n}T00:00:00`:Nt.test(n)?`${n}-01T00:00:00`:_t.test(n)?n.replace(" ","T"):null;return t?{d:new Date(`${t}Z`),timeZone:"UTC"}:{d:new Date(n)}}function Dt(n,t){if(typeof t!="string"||t.length===0)return"";let{d:e,timeZone:r}=pt(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(O(n),{month:"short",day:"numeric",year:"numeric",timeZone:r})}function I(n,t,e=1){return typeof t!="number"||!Number.isFinite(t)?"":t.toLocaleString(O(n),{maximumFractionDigits:e})}function ht(n,t,e,r=!1){let o=typeof t=="string"&&G.test(t)&&typeof e=="string"&&ct.test(e)?`${t}T${e}`:t;if(typeof o!="string"||o.length===0)return"";if(G.test(o))return Dt(n,o);let{d:s,timeZone:i}=pt(o);return Number.isNaN(s.getTime())?o:s.toLocaleString(O(n),{month:"short",day:"numeric",year:"numeric",...Ut(n),...r?{second:"2-digit"}:{},timeZone:i})}var v=class extends a{renderData(t){let e=t.aspects??[],r=t.mutualAspects??[],o=t.planets??[];if(e.length===0&&r.length===0)return this.renderEmpty();let s=t.datetime?ht(this.effectiveLang(),t.datetime):"";return u`<div class="wrap" part="card" aria-label="${this.t("Vedic aspects")}"><div class="head" part="header"><h2>${this.t("Vedic aspects")}</h2>${s?u`<p class="roxy-label">${this.t("Chart time {{when}}",{when:s})}</p>`:b}</div>${o.length>0?u`<div part="section positions"><h3 class="section-label">${this.t("Sidereal positions")}</h3><ul class="roxy-chips">${o.map(i=>u`<li class="position"><strong>${i.name}</strong> ${typeof i.longitude=="number"?at(i.longitude):i.sign??""}</li>`)}</ul></div>`:b} ${r.length>0?u`<div part="section mutual-aspects"><h3 class="section-label">${this.t("Mutual aspects")}</h3><ul class="roxy-chips">${r.map(i=>u`<li class="mutual-pill">${i.planet1} ⟷ ${i.planet2} ${i.aspectType?u`<span class="rel">${i.aspectType}</span>`:b}</li>`)}</ul></div>`:b} ${e.length>0?u`<div class="overflow-scroll" part="table" tabindex="0" role="region" aria-label="${this.t("Vedic aspects")}"><table><caption class="roxy-sr-only">${this.t("Vedic planetary aspects: aspecting planet, aspect type, aspected planet, strength and orb.")}</caption><thead><tr><th scope="col">${this.t("From")}</th><th scope="col">${this.t("Aspect")}</th><th scope="col">${this.t("To")}</th><th scope="col">${this.t("Strength")}</th><th scope="col">${this.t("Orb")}</th></tr></thead><tbody>${e.map(i=>u`<tr><td>${i.aspectingPlanet}</td><td><span class="kind">${i.aspectType}</span></td><td>${i.aspectedPlanet}</td><td>${typeof i.strength=="number"?u`<span class="bar" style="--_v:${Math.max(10,Math.min(100,i.strength))}"></span><span class="num">${I(this.effectiveLang(),i.strength,0)}</span>`:b}</td><td class="num">${typeof i.orb=="number"?`${I(this.effectiveLang(),i.orb,2)}°`:""}</td></tr>`)}</tbody></table></div>`:b}</div>`}};v.endpoints=M,v.styles=[T,zt`.wrap{gap:var(--roxy-space-md);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,1fr);display:grid}.head{justify-content:space-between;align-items:baseline;gap:var(--roxy-space-md);flex-wrap:wrap;display:flex}h2,h3,p{margin:0}.section-label{margin-block-end:var(--roxy-space-xs)}.position,.mutual-pill{font-variant-numeric:tabular-nums;min-width:0}.position strong,.mutual-pill{color:var(--roxy-fg)}.overflow-scroll{min-width:0;overflow-x:auto}table{width:100%}th,td{white-space:nowrap}tbody tr:last-child td{border-block-end:0}.kind{font-weight:var(--roxy-weight-bold)}.num{color:var(--roxy-muted)}.bar{inline-size:calc(var(--_v) * 5ch / 100);block-size:.3lh;border-radius:var(--roxy-radius-full);background:var(--roxy-accent);vertical-align:middle;margin-inline-end:var(--roxy-space-xs);display:inline-block}`],v=d([it("roxy-vedic-aspects")],v);export{v as RoxyVedicAspects};
