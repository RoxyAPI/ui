var bt=Object.defineProperty;var vt=Object.getOwnPropertyDescriptor;var d=(r,t,e,n)=>{for(var o=n>1?void 0:n?vt(t,e):t,a=r.length-1,i;a>=0;a--)(i=r[a])&&(o=(n?i(t,e,o):i(o))||o);return n&&o&&bt(t,e,o),o};import{css as Ht,html as l,nothing as p}from"lit";var _=[{endpoint:"ayurveda/constitution",method:"POST"}];import{html as c,nothing as g}from"lit";import{property as h,state as y}from"lit/decorators.js";import{ifDefined as w}from"lit/directives/if-defined.js";var j=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function N(r){if(r.lang)return r.lang;if(typeof document>"u")return;let t=r.closest?.("[lang]")?.getAttribute("lang");return t||document.documentElement.lang||void 0}var wt={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function A(r){let t=r.toLowerCase();return j.find(e=>e.toLowerCase()===t)}function K(r){let t=N(r);if(!t)return;let e=A(t);if(e)return e;let n=t.toLowerCase().split("-"),o=n[0];if(o==="zh"){let a=n.find(i=>i==="hans"||i==="hant")??wt[n[1]??""];return a?A(`zh-${a}`):void 0}return A(o)}import{LitElement as Tt}from"lit";var B=`/**
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
`;var M="roxy-ui-tokens";function H(){if(typeof document>"u")return null;let r=document.getElementById(M);if(r)return r;let t=document.createElement("style");return t.id=M,t.textContent=B,document.head.prepend(t),t}function q(r){return r.toLowerCase().replace(/[\s_-]+/g," ").trim()}function m(r){return r?r.charAt(0).toUpperCase()+r.slice(1).toLowerCase():""}function b(r){return r.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/([a-z])([0-9])/g,"$1 $2").replace(/^\w/,t=>t.toUpperCase())}var Y="__ROXY_UI_I18N__";function Z(){let r=globalThis,t=r[Y];if(t)return t;let e={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return r[Y]=e,e}function St(r,t){return t?r.replace(/\{\{(\w+)\}\}/g,(e,n)=>n in t?String(t[n]??""):e):r}function V(r,t,e){return St(kt(r,t)??t,e)}function kt(r,t){if(!r)return;let{catalogs:e}=Z(),n=r.toLowerCase();return(e[n]??e[n.split("-")[0]])?.[q(t)]}function W(r){let{listeners:t}=Z();return t.add(r),()=>{t.delete(r)}}var E=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){this.unsubscribe=W(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var $=class extends Tt{constructor(){super();this.translator=(e,n)=>this.t(e,n);new E(this)}connectedCallback(){super.connectedCallback(),H()}t(e,n){return V(this.effectiveLang(),e,n)}effectiveLang(){return N(this)}};import{css as $t}from"lit";import{css as Et}from"lit";var J=Et`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var Rt=$t`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,R=[Rt,J];var Ct="__cols",Ft="__rows";function Ot(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function C(r){if(Array.isArray(r)){let a=!1,i=r.map(u=>{let f=C(u);return f!==u&&(a=!0),f});return a?i:r}if(!Ot(r))return r;let t=r[Ct],e=r[Ft];if(Array.isArray(t)&&Array.isArray(e)&&Object.keys(r).length===2)return e.map(a=>{let i={};return t.forEach((u,f)=>{i[u]=C(a[f])}),i});let n=!1,o={};for(let[a,i]of Object.entries(r)){let u=C(i);u!==i&&(n=!0),o[a]=u}return n?o:r}function X(r){return C(r)}function Q(r,t){return r.find(e=>e.attrs&&Object.entries(e.attrs).every(([n,o])=>t[n]===o))??r[0]}var Pt="pk_live_YOUR_KEY",tt={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function et(r){if(r)return r===Pt?tt.sample:r.startsWith("pk_")?void 0:tt.secret}function rt(r,t,e={}){e.warn&&console.warn(t.message),r.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:t.reason,message:t.message},bubbles:!0,composed:!0}))}var nt="https://roxyapi.com/api/v2";async function Lt(r){try{let t=await r.json();if(t?.error){let e=t.code==="validation_error"&&Array.isArray(t.issues)?t.issues.filter(n=>typeof n.path=="string"&&typeof n.message=="string").map(n=>({path:n.path,message:n.message})):null;return{message:t.error,issues:e?.length?e:null,worded:!0}}}catch{}return{message:`Request failed (${r.status})`,issues:null,worded:!1}}var ot={fromAttribute:r=>{if(r!=null){try{let t=JSON.parse(r);if(t&&typeof t=="object"&&!Array.isArray(t))return t}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},v=class extends Error{constructor(e,n=null,o=!0){super(e);this.issues=n;this.worded=o}};function it(r){return r.submitUrl?void 0:et(r.publishableKey)}async function G(r,t,e){let n=it(r);if(n)throw new v(n.message);let o=r.submitUrl?await fetch(r.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:At(t,r.submitContext),signal:e}):await Nt(r,t,e);if(!o.ok){let a=await Lt(o);throw new v(a.message,a.issues,a.worded)}return await o.json()}function At(r,t){return JSON.stringify(t?{...r,context:t}:r)}function Nt(r,t,e){let n=new URL(`${r.baseUrl??nt}${t.path}`,document.baseURI);for(let[a,i]of Object.entries(t.query??{}))i!=null&&n.searchParams.set(a,String(i));let o={Accept:"application/json"};return r.publishableKey&&(o["X-API-Key"]=r.publishableKey),t.body!=null&&(o["Content-Type"]="application/json"),fetch(n,{method:t.method??"GET",headers:o,body:t.body!=null?JSON.stringify(t.body):void 0,signal:e})}var F=class{constructor(t){this.baseUrl=nt;this.worded=!0;this.host=t,t.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(t){this.worded=!0;let e=it(this);if(e){this.host.error=e.message,rt(this.host,e);return}this.abort?.abort();let n=new AbortController;this.abort=n,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let o=await G(this,t,n.signal);if(n.signal.aborted)return;this.host.data=o}catch(o){if(n.signal.aborted||o?.name==="AbortError")return;o instanceof v&&(this.host.issues=o.issues),this.worded=o instanceof v&&o.worded,this.host.error=o instanceof Error?o.message:String(o)}finally{this.abort===n&&(this.abort=void 0),n.signal.aborted||(this.host.loading=!1)}}};function at(r,t,e,n=[]){let o={...e},a=`/${r.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(T,x)=>{let xt=o[x];return delete o[x],encodeURIComponent(String(xt??""))}),i=new Set(n),u={},f={};for(let[T,x]of Object.entries(o))x===void 0||x===""||(t==="GET"||i.has(T)?u[T]=x:f[T]=x);return{path:a,method:t,query:u,body:t==="POST"?f:void 0}}import{css as It,html as U,nothing as I}from"lit";import{css as Gt,html as Ut}from"lit";function O(){return Ut`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var st=Gt`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var Fe=It`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function dt(r,t,e){let n=r.filter(o=>!!o.body);return n.length===0?I:U`<section class="block" part="section readings"><h3>${e}</h3>${n.map((o,a)=>U`<details class="interp-card" part="reading" name="${t}" ?open="${a===0}"><summary><span class="interp-lead">${o.label}</span> ${O()} ${o.aside?U`<span class="interp-aside"><small>${o.aside}</small></span>`:I}</summary><div class="interp-body"><p>${o.body}</p>${o.extra??I}</div></details>`)}</section>`}var Dt="roxy-data";function zt(r){return r.nodeName==="SCRIPT"&&r.getAttribute("type")==="application/json"}var P=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){if(this.host.data!=null)return;let t=this.read();t!==void 0&&(this.host.data=t,this.host.requestUpdate())}read(){let t=this.findInlineScript();return t?this.parse(t.textContent):void 0}findInlineScript(){for(let t of Array.from(this.host.children))if(zt(t)&&t.classList.contains(Dt))return t;return null}parse(t){if(t?.trim())try{return JSON.parse(t)}catch{return}}};var s=class extends ${constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let e=this.lastRequest,n=this.listKey,o=this.listRows();if(!(!e||!n||!o)){this.moreLoading=!0,this.moreError=null;try{let a=await G(this.fetcher,{...e,query:{...e.query,offset:o.length}});if(this.lastRequest!==e)return;let i=a[n];this.data={...this.data,...a,[n]:[...o,...Array.isArray(i)?i:[]]}}catch(a){this.lastRequest===e&&(this.moreError=a instanceof Error?a.message:String(a))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=e=>{let n=this.selfFetch();if(!n)return;let o=e.detail;this.lastValues=o.values,this.sticky=!!o.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(o.values),this.fetchFresh(at(n.endpoint,n.method,o.values,o.queryKeys??[]))};new P(this),this.fetcher=new F(this)}static{this.styles=[R]}static{this.endpoints=[]}willUpdate(e){if(e.has("data")&&this.data!=null){let n=X(this.data);n!==this.data&&(this.data=n)}(e.has("publishableKey")||e.has("baseUrl")||e.has("submitUrl")||e.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let e=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:Q(this.constructor.endpoints,this);return e&&{endpoint:e.endpoint,method:this.method??e.method}}render(){return c`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(e){try{return this.renderData(e)}catch(n){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,n),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:n},bubbles:!0,composed:!0})),customElements.get("roxy-data")?c`<roxy-data .data="${e}" lang="${w(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let e=this.hideSections.split(",").map(o=>o.trim().toLowerCase()).filter(o=>/^[a-z][a-z0-9-]*$/.test(o));if(e.length===0)return g;let n=e.map(o=>`[part~="${o}"],roxy-endpoint-form::part(${o}){display:none!important}`).join("");return c`<style>${n}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?c`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(e,n,o){return this.hideReadings?g:dt(e,n,this.t(o??"Reading"))}renderResult(e){let n=c`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(e)}`;return this.showAttribution()?c`${n}${this.renderAttribution()}`:n}renderWithForm(e){return c`${this.renderForm()}${e}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?g:this.renderErrorBanner(this.error):this.data==null?g:this.showAttribution()?c`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let e=this.listRows(),n=this.data?.total;return!this.lastRequest||!e||typeof n!="number"?g:e.length>=n?g:c`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?c`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:g}</div>`}listRows(){let e=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(e)?e:void 0}fetchFresh(e){return this.lastRequest=e,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(e)}load(e){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(e)}pickRow(e){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:e,bubbles:!0,composed:!0})),this.openRow(e.id)}openRow(e){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let n=this.openedRow??document.createElement(this.rowDetail.tag);n.publishableKey=this.publishableKey,n.baseUrl=this.baseUrl,n.submitUrl=this.submitUrl,n.submitContext=this.submitContext,n.hideReadings=this.hideReadings,n.hideSections=this.hideSections;let o=this.effectiveLang();o&&n.setAttribute("lang",o),this.openedRow=n,this.openedRowId=e,n.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(e))}`,method:"GET",query:{lang:K(this)}}).then(()=>n.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return c`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(g):this.renderEmpty()}renderForm(){let e=this.selfFetch();return c`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${e?.endpoint??""}" method="${e?.method??"POST"}" spec-url="${w(this.specUrl)}" publishable-key="${w(this.publishableKey)}" location-url="${w(this.locationUrl)}" submit-label="${w(this.submitLabel)}" lang="${w(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let e=sessionStorage.getItem(this.rememberKey());return e?JSON.parse(e):void 0}catch{return}}writeRemembered(e){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(e))}catch{}}renderEmpty(){return c`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return c`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(e){let n=!!this.selfFetch();if(n&&this.issues)return this.renderForm();let o=this.renderErrorBanner(e);return n?c`${o}${this.renderForm()}`:o}renderErrorBanner(e){return c`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(e)}</div>`}};d([h({attribute:!1})],s.prototype,"data",2),d([h({type:String,attribute:"data-endpoint"})],s.prototype,"endpoint",2),d([h({type:String})],s.prototype,"method",2),d([h({type:String,attribute:"publishable-key"})],s.prototype,"publishableKey",2),d([h({type:String,attribute:"base-url"})],s.prototype,"baseUrl",2),d([h({type:String,attribute:"spec-url"})],s.prototype,"specUrl",2),d([h({type:String,attribute:"submit-url"})],s.prototype,"submitUrl",2),d([h({attribute:"submit-context",converter:ot})],s.prototype,"submitContext",2),d([h({type:String,attribute:"location-url"})],s.prototype,"locationUrl",2),d([h({type:Boolean})],s.prototype,"remember",2),d([h({type:Boolean,attribute:"hide-readings",reflect:!0})],s.prototype,"hideReadings",2),d([h({type:String,attribute:"hide-sections",reflect:!0})],s.prototype,"hideSections",2),d([h({type:String,attribute:"submit-label"})],s.prototype,"submitLabel",2),d([h({type:String,attribute:"error-message"})],s.prototype,"errorMessage",2),d([h({type:String})],s.prototype,"attribution",2),d([y()],s.prototype,"loading",2),d([y()],s.prototype,"error",2),d([y()],s.prototype,"issues",2),d([y()],s.prototype,"selfFetched",2),d([y()],s.prototype,"editing",2),d([y()],s.prototype,"sticky",2),d([y()],s.prototype,"openedRow",2),d([y()],s.prototype,"openedRowId",2),d([y()],s.prototype,"moreLoading",2),d([y()],s.prototype,"moreError",2);var _t=/^\d+(?:[.,]\d+)*(?:\s*-\s*\d+(?:[.,]\d+)*)?$/;function D(r){if(!r.text)return"";let t=r.chapter==null?"":String(r.chapter),e=r.verse??"",n=t;e&&(n=t?_t.test(e.trim())?`${t}.${e}`:`${t}, ${e}`:e);let o=r.translation?[r.translation,r.year].filter(Boolean).join(" "):"";return[[b(r.text),n].filter(Boolean).join(" "),o,r.basis].filter(Boolean).join(" · ")}var lt=r=>t=>{customElements.get(r)||customElements.define(r,t)};var ct=new Map;function L(r){if(!r)return["en"];let t=ct.get(r);if(t)return[t,"en"];let e="en";try{e=Intl.getCanonicalLocales(r)[0]??"en"}catch{e="en"}return ct.set(r,e),[e,"en"]}function pt(r,t){return typeof t!="number"||!Number.isFinite(t)?"":t.toLocaleString(L(r),{maximumFractionDigits:0})}function ht(r,t){let e=t.filter(Boolean);return e.length<2?e[0]??"":new Intl.ListFormat(L(r),{style:"long",type:"conjunction"}).format(e)}function S(r,t,e=1){return typeof t!="number"||!Number.isFinite(t)?"":t.toLocaleString(L(r),{maximumFractionDigits:e})}function z(r,t,e=1){return typeof t!="number"||!Number.isFinite(t)?"":(t/100).toLocaleString(L(r),{style:"percent",maximumFractionDigits:e})}var jt={"kp-newcomb":"KP Newcomb","kp-old":"KP Old",lahiri:"Lahiri",raman:"B.V. Raman",custom:"Custom"};function ut(r,t,e){let n=typeof t=="string"?jt[t]??b(t):"",o=typeof e=="number"?`${S(r,e,2)}°`:"";return n&&o?`${n} (${o})`:n||o}import{css as Kt,html as Bt,nothing as mt}from"lit";var yt=Kt`.roxy-frame{color:var(--roxy-muted);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-normal);margin:0}.roxy-frame .roxy-frame-deg{font-variant-numeric:tabular-nums}`;function gt(r,t,e){if(!t?.ayanamsa)return mt;let n=ut(r,t.ayanamsa);if(!n)return mt;let o=typeof t.ayanamsaDegrees=="number"?S(r,t.ayanamsaDegrees,4):void 0;return Bt`<p class="roxy-frame">${o===void 0?e("Sidereal frame: {{frame}}",{frame:n}):e("Sidereal frame: {{frame}}, {{degrees}}° subtracted",{frame:n,degrees:o})}</p>`}import{css as Mt}from"lit";var ft=Mt`.row{grid-template-columns:var(--roxy-label-col) minmax(0, 1fr);display:grid}@container (width<=30rem){.row{grid-template-columns:minmax(0,1fr)}}`;var qt=["vata","pitta","kapha"],Yt={"lagna-sign":"Lagna","moon-sign":"Moon sign","strongest-planet":"Strongest graha"};function Zt(r){return r.split("-").map(m).join("-")}function Vt(r,t){return ht(r,(t??"").split(" ").filter(Boolean).map(m))}var k=class extends s{renderData(t){let e=this.effectiveLang(),n=t.composite;return l`<article class="card" part="card" aria-labelledby="dosha-title"><header class="head" part="header"><h2 id="dosha-title">${this.t("Ayurvedic constitution")}</h2>${n?.type?l`<span class="type">${Zt(n.type)}</span>`:p}</header>${this.renderBar(e,t)}<div class="facts" part="details">${n?.dominant?l`<span><span class="roxy-label">${this.t("Dominant")}</span><b>${m(n.dominant)}</b></span>`:p} ${n?.secondary?l`<span><span class="roxy-label">${this.t("Secondary")}</span><b>${m(n.secondary)}</b></span>`:p} ${t.lagnaSign?l`<span><span class="roxy-label">${this.t("Lagna")}</span><b>${m(t.lagnaSign)}</b></span>`:p} ${t.moonSign?l`<span><span class="roxy-label">${this.t("Moon sign")}</span><b>${m(t.moonSign)}</b></span>`:p}</div>${this.renderFactors(e,t.factors)} ${this.renderRanking(e,t.strengthRanking)} ${this.renderPlanetDoshas(t.planetDoshas)} ${t.summary&&!this.hideReadings?l`<p class="summary" part="section readings">${t.summary}</p>`:p} ${gt(e,t.frame,this.translator)} ${t.meta?.disclaimer?l`<p class="disclaimer" part="disclaimer">${t.meta.disclaimer}</p>`:p}</article>`}renderBar(t,e){let n=e.composite,o=qt.map(i=>({humour:i,value:n?.[i]??0}));return o.reduce((i,u)=>i+u.value,0)<=0?p:l`<div part="chart"><div class="bar" role="img" aria-label="${o.map(i=>`${m(i.humour)} ${z(t,i.value,0)}`).join(", ")}">${o.filter(i=>i.value>0).map(i=>l`<div class="${`seg seg-${i.humour}`}" style="${`flex: ${i.value} 0 0`}"></div>`)}</div><p class="shares">${o.map(i=>l`<span><span class="${`swatch seg-${i.humour}`}"></span>${m(i.humour)} <b>${z(t,i.value,0)}</b></span>`)}</p></div>`}renderFactors(t,e){let n=e??[];return n.length===0?p:l`<section part="section factors"><h3>${this.t("Factors")}</h3><ul class="rows">${n.map(o=>l`<li class="row" part="label-track"><span class="roxy-label">${this.factorLabel(o.id)}</span><div><span>${Vt(t,o.input)}</span> ${o.doshas?.length?l`· ${o.doshas.map(a=>m(a)).join(", ")}`:p} ${typeof o.weight=="number"?l`· <span class="roxy-label">${this.t("Weight")}</span>${S(t,o.weight,2)}`:p} ${this.renderCitation(o.source)}</div></li>`)}</ul></section>`}factorLabel(t){let e=Yt[t??""];return e?this.t(e):b(t??"")}renderCitation(t){let e=D(t??{});return e?l`<div class="cite"><p><span class="roxy-label">${this.t("Source")}</span>${e}</p>${t?.note?l`<details class="note"><summary>${this.t("Note on the source")}${O()}</summary><p>${t.note}</p></details>`:p}</div>`:p}renderRanking(t,e){let n=e??[];return n.length===0?p:l`<section part="section ranking"><h3>${this.t("Shadbala")}</h3><div class="scroll" tabindex="0" role="region" aria-label="${this.t("Shadbala")}"><table><thead><tr><th>${this.t("Rank")}</th><th>${this.t("Graha")}</th><th>${this.t("Strength")}</th><th>${this.t("Strong")}</th></tr></thead><tbody>${n.map(o=>l`<tr class="${o.strong?"is-strong":""}"><td>${pt(t,o.rank)}</td><td>${o.graha??""}</td><td>${this.t("{{value}} virupas",{value:S(t,o.totalVirupas,2)})}</td><td>${o.strong?this.t("Yes"):this.t("No")}</td></tr>`)}</tbody></table></div></section>`}renderPlanetDoshas(t){let e=t??[];return e.length===0?p:l`<section part="section planet-humours"><h3>${this.t("Planetary humours")}</h3><div class="scroll" tabindex="0" role="region" aria-label="${this.t("Planetary humours")}"><table><thead><tr><th>${this.t("Graha")}</th><th>${this.t("Humours")}</th><th>${this.t("Dhatu")}</th></tr></thead><tbody>${e.map(n=>l`<tr><td>${n.graha??""}</td><td>${(n.doshas??[]).map(o=>m(o)).join(", ")}</td><td>${[n.dhatu,n.dhatuSanskrit].filter(Boolean).join(" · ")}</td></tr>`)}</tbody></table></div>${this.renderTableSources(e)}</section>`}renderTableSources(t){let e=new Set;for(let n of t)for(let o of[n.doshaSource,n.dhatuSource]){let a=D(o??{});a&&e.add(a)}return e.size===0?p:l`<p class="cite"><span class="roxy-label">${this.t("Source")}</span>${[...e].join(" · ")}</p>`}};k.endpoints=_,k.styles=[R,yt,st,ft,Ht`.card{gap:var(--roxy-space-md);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,1fr);display:grid}h2,h3,p{margin:0}section>h3{margin-block-end:var(--roxy-space-sm)}.head{align-items:baseline;gap:var(--roxy-space-xs) var(--roxy-space-md);flex-wrap:wrap;display:flex}.type{color:var(--roxy-accent-ink);font-size:var(--roxy-text-xl);font-weight:var(--roxy-weight-bold)}.bar{width:100%;min-width:0;border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);block-size:1lh;display:flex;overflow:hidden}.seg{min-width:0}.seg-vata{background:color-mix(in srgb, var(--roxy-info) 45%, var(--roxy-surface))}.seg-pitta{background:color-mix(in srgb, var(--roxy-danger) 45%, var(--roxy-surface))}.seg-kapha{background:color-mix(in srgb, var(--roxy-success) 45%, var(--roxy-surface))}.shares,.facts{gap:var(--roxy-space-xs) var(--roxy-space-md);color:var(--roxy-secondary);font-size:var(--roxy-text-sm);flex-wrap:wrap;display:flex}.swatch{block-size:.5lh;inline-size:.5lh;border-radius:var(--roxy-radius-sm);vertical-align:middle;margin-inline-end:var(--roxy-space-xs);display:inline-block}.shares b,.facts b{color:var(--roxy-fg);font-weight:var(--roxy-weight-bold);font-variant-numeric:tabular-nums}.facts .roxy-label,.row>div .roxy-label,.cite .roxy-label{margin-inline-end:var(--roxy-space-xs)}.rows{margin:0;padding:0;list-style:none;display:grid}.row{align-items:baseline;gap:calc(var(--roxy-space-unit) / 2) var(--roxy-space-md);padding-block:var(--roxy-space-sm);border-block-start:1px solid var(--roxy-border);font-size:var(--roxy-text-sm)}.row:first-child{border-block-start:0;padding-block-start:0}.cite{color:var(--roxy-muted);font-size:var(--roxy-text-xs);margin-block-start:calc(var(--roxy-space-unit) / 2)}.cite .roxy-label{font-size:inherit}.cite .note summary{align-items:center;gap:var(--roxy-space-xs);width:fit-content;color:var(--roxy-secondary);display:flex}.cite .note p{margin-block-start:calc(var(--roxy-space-unit) / 2)}.scroll{min-width:0;overflow-x:auto}table{width:100%}th,td{white-space:nowrap}tr.is-strong td{font-weight:var(--roxy-weight-bold)}.summary{font-size:var(--roxy-text-sm)}.disclaimer{border-inline-start:var(--roxy-line-thick) solid var(--roxy-border);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);padding-inline-start:var(--roxy-space-md)}`],k=d([lt("roxy-dosha-constitution")],k);export{k as RoxyDoshaConstitution};
