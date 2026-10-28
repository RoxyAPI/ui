var we=Object.defineProperty;var Se=Object.getOwnPropertyDescriptor;var s=(r,n,e,t)=>{for(var o=t>1?void 0:t?Se(n,e):n,a=r.length-1,i;a>=0;a--)(i=r[a])&&(o=(t?i(n,e,o):i(o))||o);return t&&o&&we(n,e,o),o};import{css as je,html as c,nothing as p,svg as T}from"lit";import{property as Be}from"lit/decorators.js";import{ifDefined as xe}from"lit/directives/if-defined.js";var K=[{endpoint:"vastu/mandala",method:"POST",attrs:{mode:"mandala"}},{endpoint:"vastu/entrance",method:"POST",attrs:{mode:"entrance"}}];import{html as u,nothing as b}from"lit";import{property as m,state as g}from"lit/decorators.js";import{ifDefined as k}from"lit/directives/if-defined.js";var M=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function z(r){if(r.lang)return r.lang;if(typeof document>"u")return;let n=r.closest?.("[lang]")?.getAttribute("lang");return n||document.documentElement.lang||void 0}var ke={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function N(r){let n=r.toLowerCase();return M.find(e=>e.toLowerCase()===n)}function j(r){let n=z(r);if(!n)return;let e=N(n);if(e)return e;let t=n.toLowerCase().split("-"),o=t[0];if(o==="zh"){let a=t.find(i=>i==="hans"||i==="hant")??ke[t[1]??""];return a?N(`zh-${a}`):void 0}return N(o)}import{LitElement as $e}from"lit";var B=`/**
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
`;var q="roxy-ui-tokens";function H(){if(typeof document>"u")return null;let r=document.getElementById(q);if(r)return r;let n=document.createElement("style");return n.id=q,n.textContent=B,document.head.prepend(n),n}function Y(r){return r.toLowerCase().replace(/[\s_-]+/g," ").trim()}function x(r){return r.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/([a-z])([0-9])/g,"$1 $2").replace(/^\w/,n=>n.toUpperCase())}var V="__ROXY_UI_I18N__";function I(){let r=globalThis,n=r[V];if(n)return n;let e={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return r[V]=e,e}function Ee(r,n){return n?r.replace(/\{\{(\w+)\}\}/g,(e,t)=>t in n?String(n[t]??""):e):r}function Z(r,n,e){return Ee(Te(r,n)??n,e)}function Te(r,n){if(!r)return;let{catalogs:e}=I(),t=r.toLowerCase();return(e[t]??e[t.split("-")[0]])?.[Y(n)]}function W(r){if(!r)return;let{fieldLabels:n}=I(),e=r.toLowerCase();return n[e]??n[e.split("-")[0]]}function X(r,n){return W(r)?.fields[n]}function J(r,n,e){return W(r)?.enums[`${n}.${e}`]}function Q(r){let{listeners:n}=I();return n.add(r),()=>{n.delete(r)}}var R=class{constructor(n){this.host=n,n.addController(this)}hostConnected(){this.unsubscribe=Q(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var P=class extends $e{constructor(){super();this.translator=(e,t)=>this.t(e,t);new R(this)}connectedCallback(){super.connectedCallback(),H()}t(e,t){return Z(this.effectiveLang(),e,t)}effectiveLang(){return z(this)}};import{css as Pe}from"lit";import{css as Re}from"lit";var ee=Re`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var Oe=Pe`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,O=[Oe,ee];var Ce="__cols",Fe="__rows";function Le(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function C(r){if(Array.isArray(r)){let a=!1,i=r.map(l=>{let h=C(l);return h!==l&&(a=!0),h});return a?i:r}if(!Le(r))return r;let n=r[Ce],e=r[Fe];if(Array.isArray(n)&&Array.isArray(e)&&Object.keys(r).length===2)return e.map(a=>{let i={};return n.forEach((l,h)=>{i[l]=C(a[h])}),i});let t=!1,o={};for(let[a,i]of Object.entries(r)){let l=C(i);l!==i&&(t=!0),o[a]=l}return t?o:r}function te(r){return C(r)}function re(r,n){return r.find(e=>e.attrs&&Object.entries(e.attrs).every(([t,o])=>n[t]===o))??r[0]}var Ae="pk_live_YOUR_KEY",ne={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function oe(r){if(r)return r===Ae?ne.sample:r.startsWith("pk_")?void 0:ne.secret}function ae(r,n,e={}){e.warn&&console.warn(n.message),r.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:n.reason,message:n.message},bubbles:!0,composed:!0}))}var ie="https://roxyapi.com/api/v2";async function Ge(r){try{let n=await r.json();if(n?.error){let e=n.code==="validation_error"&&Array.isArray(n.issues)?n.issues.filter(t=>typeof t.path=="string"&&typeof t.message=="string").map(t=>({path:t.path,message:t.message})):null;return{message:n.error,issues:e?.length?e:null,worded:!0}}}catch{}return{message:`Request failed (${r.status})`,issues:null,worded:!1}}var se={fromAttribute:r=>{if(r!=null){try{let n=JSON.parse(r);if(n&&typeof n=="object"&&!Array.isArray(n))return n}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},S=class extends Error{constructor(e,t=null,o=!0){super(e);this.issues=t;this.worded=o}};function de(r){return r.submitUrl?void 0:oe(r.publishableKey)}async function D(r,n,e){let t=de(r);if(t)throw new S(t.message);let o=r.submitUrl?await fetch(r.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Ne(n,r.submitContext),signal:e}):await ze(r,n,e);if(!o.ok){let a=await Ge(o);throw new S(a.message,a.issues,a.worded)}return await o.json()}function Ne(r,n){return JSON.stringify(n?{...r,context:n}:r)}function ze(r,n,e){let t=new URL(`${r.baseUrl??ie}${n.path}`,document.baseURI);for(let[a,i]of Object.entries(n.query??{}))i!=null&&t.searchParams.set(a,String(i));let o={Accept:"application/json"};return r.publishableKey&&(o["X-API-Key"]=r.publishableKey),n.body!=null&&(o["Content-Type"]="application/json"),fetch(t,{method:n.method??"GET",headers:o,body:n.body!=null?JSON.stringify(n.body):void 0,signal:e})}var F=class{constructor(n){this.baseUrl=ie;this.worded=!0;this.host=n,n.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(n){this.worded=!0;let e=de(this);if(e){this.host.error=e.message,ae(this.host,e);return}this.abort?.abort();let t=new AbortController;this.abort=t,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let o=await D(this,n,t.signal);if(t.signal.aborted)return;this.host.data=o}catch(o){if(t.signal.aborted||o?.name==="AbortError")return;o instanceof S&&(this.host.issues=o.issues),this.worded=o instanceof S&&o.worded,this.host.error=o instanceof Error?o.message:String(o)}finally{this.abort===t&&(this.abort=void 0),t.signal.aborted||(this.host.loading=!1)}}};function le(r,n,e,t=[]){let o={...e},a=`/${r.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(f,y)=>{let $=o[y];return delete o[y],encodeURIComponent(String($??""))}),i=new Set(t),l={},h={};for(let[f,y]of Object.entries(o))y===void 0||y===""||(n==="GET"||i.has(f)?l[f]=y:h[f]=y);return{path:a,method:n,query:l,body:n==="POST"?h:void 0}}import{css as _e,html as _,nothing as U}from"lit";import{css as Ie,html as De}from"lit";function ce(){return De`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var Ot=Ie`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var At=_e`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function pe(r,n,e){let t=r.filter(o=>!!o.body);return t.length===0?U:_`<section class="block" part="section readings"><h3>${e}</h3>${t.map((o,a)=>_`<details class="interp-card" part="reading" name="${n}" ?open="${a===0}"><summary><span class="interp-lead">${o.label}</span> ${ce()} ${o.aside?_`<span class="interp-aside"><small>${o.aside}</small></span>`:U}</summary><div class="interp-body"><p>${o.body}</p>${o.extra??U}</div></details>`)}</section>`}var Ue="roxy-data";function Ke(r){return r.nodeName==="SCRIPT"&&r.getAttribute("type")==="application/json"}var L=class{constructor(n){this.host=n,n.addController(this)}hostConnected(){if(this.host.data!=null)return;let n=this.read();n!==void 0&&(this.host.data=n,this.host.requestUpdate())}read(){let n=this.findInlineScript();return n?this.parse(n.textContent):void 0}findInlineScript(){for(let n of Array.from(this.host.children))if(Ke(n)&&n.classList.contains(Ue))return n;return null}parse(n){if(n?.trim())try{return JSON.parse(n)}catch{return}}};var d=class extends P{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let e=this.lastRequest,t=this.listKey,o=this.listRows();if(!(!e||!t||!o)){this.moreLoading=!0,this.moreError=null;try{let a=await D(this.fetcher,{...e,query:{...e.query,offset:o.length}});if(this.lastRequest!==e)return;let i=a[t];this.data={...this.data,...a,[t]:[...o,...Array.isArray(i)?i:[]]}}catch(a){this.lastRequest===e&&(this.moreError=a instanceof Error?a.message:String(a))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=e=>{let t=this.selfFetch();if(!t)return;let o=e.detail;this.lastValues=o.values,this.sticky=!!o.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(o.values),this.fetchFresh(le(t.endpoint,t.method,o.values,o.queryKeys??[]))};new L(this),this.fetcher=new F(this)}static{this.styles=[O]}static{this.endpoints=[]}willUpdate(e){if(e.has("data")&&this.data!=null){let t=te(this.data);t!==this.data&&(this.data=t)}(e.has("publishableKey")||e.has("baseUrl")||e.has("submitUrl")||e.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let e=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:re(this.constructor.endpoints,this);return e&&{endpoint:e.endpoint,method:this.method??e.method}}render(){return u`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(e){try{return this.renderData(e)}catch(t){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,t),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:t},bubbles:!0,composed:!0})),customElements.get("roxy-data")?u`<roxy-data .data="${e}" lang="${k(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let e=this.hideSections.split(",").map(o=>o.trim().toLowerCase()).filter(o=>/^[a-z][a-z0-9-]*$/.test(o));if(e.length===0)return b;let t=e.map(o=>`[part~="${o}"],roxy-endpoint-form::part(${o}){display:none!important}`).join("");return u`<style>${t}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?u`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(e,t,o){return this.hideReadings?b:pe(e,t,this.t(o??"Reading"))}renderResult(e){let t=u`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(e)}`;return this.showAttribution()?u`${t}${this.renderAttribution()}`:t}renderWithForm(e){return u`${this.renderForm()}${e}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?b:this.renderErrorBanner(this.error):this.data==null?b:this.showAttribution()?u`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let e=this.listRows(),t=this.data?.total;return!this.lastRequest||!e||typeof t!="number"?b:e.length>=t?b:u`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?u`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:b}</div>`}listRows(){let e=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(e)?e:void 0}fetchFresh(e){return this.lastRequest=e,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(e)}load(e){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(e)}pickRow(e){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:e,bubbles:!0,composed:!0})),this.openRow(e.id)}openRow(e){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let t=this.openedRow??document.createElement(this.rowDetail.tag);t.publishableKey=this.publishableKey,t.baseUrl=this.baseUrl,t.submitUrl=this.submitUrl,t.submitContext=this.submitContext,t.hideReadings=this.hideReadings,t.hideSections=this.hideSections;let o=this.effectiveLang();o&&t.setAttribute("lang",o),this.openedRow=t,this.openedRowId=e,t.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(e))}`,method:"GET",query:{lang:j(this)}}).then(()=>t.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return u`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(b):this.renderEmpty()}renderForm(){let e=this.selfFetch();return u`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${e?.endpoint??""}" method="${e?.method??"POST"}" spec-url="${k(this.specUrl)}" publishable-key="${k(this.publishableKey)}" location-url="${k(this.locationUrl)}" submit-label="${k(this.submitLabel)}" lang="${k(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let e=sessionStorage.getItem(this.rememberKey());return e?JSON.parse(e):void 0}catch{return}}writeRemembered(e){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(e))}catch{}}renderEmpty(){return u`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return u`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(e){let t=!!this.selfFetch();if(t&&this.issues)return this.renderForm();let o=this.renderErrorBanner(e);return t?u`${o}${this.renderForm()}`:o}renderErrorBanner(e){return u`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(e)}</div>`}};s([m({attribute:!1})],d.prototype,"data",2),s([m({type:String,attribute:"data-endpoint"})],d.prototype,"endpoint",2),s([m({type:String})],d.prototype,"method",2),s([m({type:String,attribute:"publishable-key"})],d.prototype,"publishableKey",2),s([m({type:String,attribute:"base-url"})],d.prototype,"baseUrl",2),s([m({type:String,attribute:"spec-url"})],d.prototype,"specUrl",2),s([m({type:String,attribute:"submit-url"})],d.prototype,"submitUrl",2),s([m({attribute:"submit-context",converter:se})],d.prototype,"submitContext",2),s([m({type:String,attribute:"location-url"})],d.prototype,"locationUrl",2),s([m({type:Boolean})],d.prototype,"remember",2),s([m({type:Boolean,attribute:"hide-readings",reflect:!0})],d.prototype,"hideReadings",2),s([m({type:String,attribute:"hide-sections",reflect:!0})],d.prototype,"hideSections",2),s([m({type:String,attribute:"submit-label"})],d.prototype,"submitLabel",2),s([m({type:String,attribute:"error-message"})],d.prototype,"errorMessage",2),s([m({type:String})],d.prototype,"attribution",2),s([g()],d.prototype,"loading",2),s([g()],d.prototype,"error",2),s([g()],d.prototype,"issues",2),s([g()],d.prototype,"selfFetched",2),s([g()],d.prototype,"editing",2),s([g()],d.prototype,"sticky",2),s([g()],d.prototype,"openedRow",2),s([g()],d.prototype,"openedRowId",2),s([g()],d.prototype,"moreLoading",2),s([g()],d.prototype,"moreError",2);var Me=/^\d+(?:[.,]\d+)*(?:\s*-\s*\d+(?:[.,]\d+)*)?$/;function he(r){if(!r.text)return"";let n=r.chapter==null?"":String(r.chapter),e=r.verse??"",t=n;e&&(t=n?Me.test(e.trim())?`${n}.${e}`:`${n}, ${e}`:e);let o=r.translation?[r.translation,r.year].filter(Boolean).join(" "):"";return[[x(r.text),t].filter(Boolean).join(" "),o,r.basis].filter(Boolean).join(" · ")}var ue=r=>n=>{customElements.get(r)||customElements.define(r,n)};var me=new Map;function ye(r){if(!r)return["en"];let n=me.get(r);if(n)return[n,"en"];let e="en";try{e=Intl.getCanonicalLocales(r)[0]??"en"}catch{e="en"}return me.set(r,e),[e,"en"]}function v(r,n){return typeof n!="number"||!Number.isFinite(n)?"":n.toLocaleString(ye(r),{maximumFractionDigits:0})}function ge(r,n,e=1){return typeof n!="number"||!Number.isFinite(n)?"":n.toLocaleString(ye(r),{maximumFractionDigits:e})}function fe(r,n,e){return X(r,n)??e??x(n)}function E(r,n,e,t){return J(r,n,e)??t??x(e)}var qe=["North","East","South","West"],He={perimeter:"Perimeter",innerRing:"Inner ring",innerCorner:"Inner corner",center:"Center"},Ye={auspicious:"Favourable",inauspicious:"Unfavourable",mixed:"Mixed"},Ve={feet:"ft²",metres:"m²"},A=.04,Ze=8,We=.88;function be(r){return"cells"in r}function Xe(r){let n=r.map(i=>i.center?.x).filter(i=>i!=null),e=r.map(i=>i.center?.y).filter(i=>i!=null),t=Math.max(0,...r.map(i=>i.rowFromNorth??0),...r.map(i=>i.columnFromWest??0));if(t<2||n.length===0||e.length===0)return;let o=(Math.max(...n)-Math.min(...n))/(t-1),a=(Math.max(...e)-Math.min(...e))/(t-1);if(!(!(o>0)||!(a>0)))return{size:t,cellW:o,cellH:a,originX:Math.min(...n)-o/2,originY:Math.min(...e)-a/2}}function G(r,n){let e=((n?.x??0)-r.originX)/r.cellW,t=r.size-((n?.y??0)-r.originY)/r.cellH;return[ve(e),ve(t)]}function ve(r){return Math.round(r*1e3)/1e3}var w=class extends d{constructor(){super(...arguments);this.mode="mandala"}renderData(e){let t=this.effectiveLang(),o=be(e)?e:void 0,a=this.mode==="entrance"&&!be(e)?e:void 0,i=o?Xe(o.cells??[]):Je(e.conventions?.grid);return c`<article class="card" part="card" aria-labelledby="vastu-title"><header class="head" part="header"><h2 class="title" id="vastu-title">${a?this.t("Entrance pada"):this.t("Vastu mandala")}</h2>${a?.auspiciousness?c`<span class="${`roxy-chip verdict-${a.auspiciousness}`}">${this.verdictLabel(a.auspiciousness)}</span>`:p}</header>${this.renderGrid(t,i,o,a)} ${this.renderLegend(a,o)} ${this.renderDevatas(t,o?.cells)} ${this.renderFacts(t,e,o,a)} ${a?.effect&&!this.hideReadings?c`<p class="effect" part="reading">${a.effect}</p>`:p} ${a?.reading&&!this.hideReadings?c`<p class="reading" part="reading">${a.reading}</p>`:p} ${this.renderSources(o?.sources??(a?.source?[a.source]:[]))}</article>`}renderGrid(e,t,o,a){if(!t)return p;let i=t.size,l=`${-A} ${-A} ${i+A*2} ${i+A*2}`;return c`<div class="frame" part="chart">${qe.map(h=>c`<span class="${`compass compass-${h[0]?.toLowerCase()}`}">${E(e,"facing",h)}</span>`)} <svg viewBox="${l}" role="img" aria-label="${this.t("Vastu grid, north at the top and west on the left")}">${(o?.cells??[]).map(h=>this.renderCell(e,h))} ${a?this.renderEmptyGrid(i):p} ${a?this.renderDoor(e,a):p} ${this.renderVamsa(t,o?.vamsa)} ${this.renderBrahmasthan(t,o?.brahmasthan?.polygon)} ${this.renderAtimarma(t,o)}</svg></div>`}renderCell(e,t){let o=t.class??t.role??"",a=["pada",o?`pada-${o}`:"",t.withinPlot===!1?"pada-outside":""].filter(Boolean).join(" "),i=t.devataName??"";return this.renderPada(e,t.columnFromWest,t.rowFromNorth,a,t.square,i,[i,this.ringLabel(o)].filter(Boolean).join(" · "))}renderPada(e,t,o,a,i,l,h){let f=(t??1)-1,y=(o??1)-1,$=l.length>Ze;return T`<g>
			<rect class=${a} x=${f} y=${y} width="1" height="1">
				<title>${h}</title>
			</rect>
			<text class="square-no" x=${f+.5} y=${y+.34}>${v(e,i)}</text>
			${l?T`<text
						class="devata"
						x=${f+.5}
						y=${y+.68}
						textLength=${xe($?We:void 0)}
						lengthAdjust=${xe($?"spacingAndGlyphs":void 0)}
						>${l}</text
					>`:p}
		</g>`}renderEmptyGrid(e){let t=[];for(let o=0;o<e;o++)for(let a=0;a<e;a++)t.push(T`<rect class="pada" x=${a} y=${o} width="1" height="1"></rect>`);return t}renderDoor(e,t){let o=t.devata?.name??"";return this.renderPada(e,t.cell?.columnFromWest,t.cell?.rowFromNorth,"pada pada-door",t.square,o,o)}renderVamsa(e,t){return(t??[]).map(o=>{let[a,i]=G(e,o.from),[l,h]=G(e,o.to);return T`<line class="vamsa" x1=${a} y1=${i} x2=${l} y2=${h}></line>`})}renderBrahmasthan(e,t){let o=t??[];if(o.length<3)return p;let a=o.map(i=>G(e,i).join(",")).join(" ");return T`<polygon class="brahmasthan" points=${a}></polygon>`}renderAtimarma(e,t){let o=new Set(t?.atimarma??[]);return o.size===0?p:(t?.cells??[]).filter(a=>a.square!=null&&o.has(a.square)).map(a=>{let[i,l]=G(e,a.center);return T`<circle class="atimarma" cx=${i} cy=${l} r="0.06"></circle>`})}renderDevatas(e,t){let o=new Map;for(let a of t??[])!a.devataName||a.square==null||o.set(a.devataName,[...o.get(a.devataName)??[],a.square]);return o.size===0?p:c`<section part="section devatas"><h3 class="block-title">${this.t("Devata")}</h3><ul class="devatas">${[...o].map(([a,i])=>c`<li><b>${a}</b> ${i.sort((l,h)=>l-h).map(l=>v(e,l)).join(", ")}</li>`)}</ul></section>`}renderLegend(e,t){if(e)return c`<div class="legend" part="legend"><span><span class="swatch swatch-door"></span>${this.t("Door pada")}</span></div>`;let o=(t?.cells??[]).some(a=>a.withinPlot===!1);return c`<div class="legend" part="legend"><span><span class="swatch swatch-brahma"></span>${this.t("Brahmasthan")}</span> ${o?c`<span><span class="swatch swatch-outside"></span>${this.t("Outside the plot")}</span>`:p}</div>`}renderFacts(e,t,o,a){let i=t.conventions?.grid;return c`<div class="facts" part="details">${i?c`<span><span class="roxy-label">${fe(e,"grid")}</span><b>${E(e,"grid",i)}</b></span>`:p} ${a?.pada!=null?c`<span><span class="roxy-label">${this.t("Pada")}</span><b>${v(e,a.pada)}</b></span>`:p} ${a?.side?c`<span><span class="roxy-label">${this.t("Side")}</span><b>${E(e,"facing",a.side)}</b></span>`:p} ${a?.startCorner?c`<span><span class="roxy-label">${this.t("Counted from")}</span>${E(e,"facing",a.startCorner)} ${a.ordinalOnSide!=null?c`· ${v(e,a.ordinalOnSide)}`:p}</span>`:p} ${a?.devata?.name?c`<span><span class="roxy-label">${this.t("Devata")}</span><b>${a.devata.name}</b> ${a.devata.padaCount!=null?c`· ${this.t("Pada")} ${v(e,a.devata.padaCount)}`:p}</span>`:p} ${a?.recommendedPadas?.length?c`<span><span class="roxy-label">${this.t("Recommended padas")}</span>${a.recommendedPadas.map(l=>v(e,l)).join(", ")}</span>`:p} ${o?.brahmasthan?.area!=null?c`<span><span class="roxy-label">${this.t("Brahmasthan area")}</span><b>${this.areaLabel(e,o.brahmasthan.area,o.conventions?.unit)}</b></span>`:p} ${o?.marma?.areaEach!=null?c`<span><span class="roxy-label">${this.t("Area of one marma")}</span>${this.areaLabel(e,o.marma.areaEach,o.conventions?.unit)}</span>`:p} ${o?.atimarma?.length?c`<span><span class="roxy-label">${this.t("Crossing points")}</span>${o.atimarma.map(l=>v(e,l)).join(", ")}</span>`:p}</div>`}renderSources(e){return e.length===0?p:c`<section part="section sources"><ul class="cites">${e.map(t=>c`<li>${he(t)}</li>`)}</ul></section>`}areaLabel(e,t,o){let a=ge(e,t,2);if(!o)return a;let i=Ve[o]??`${o}²`;return c`<span title="${E(e,"unit",o)}">${a} ${i}</span>`}ringLabel(e){let t=He[e];return t?this.t(t):x(e)}verdictLabel(e){let t=Ye[e];return t?this.t(t):x(e)}};w.endpoints=K,w.styles=[O,je`.card{gap:var(--roxy-space-md);padding:var(--roxy-space-lg);--_brahma:color-mix(in srgb, var(--roxy-accent) 16%, var(--roxy-surface));--_outside:color-mix(in srgb, var(--roxy-muted) 18%, var(--roxy-surface));--_door:color-mix(in srgb, var(--roxy-success) 26%, var(--roxy-surface));grid-template-columns:minmax(0,1fr);display:grid}.head{align-items:baseline;gap:var(--roxy-space-xs) var(--roxy-space-md);flex-wrap:wrap;display:flex}.title,.block-title{margin:0}.block-title{margin-block-end:var(--roxy-space-sm)}.verdict-auspicious{color:var(--roxy-success-fg)}.verdict-inauspicious{color:var(--roxy-danger-fg)}.verdict-mixed{color:var(--roxy-warning-fg)}.frame{place-items:center;gap:calc(var(--roxy-space-unit) / 2) var(--roxy-space-xs);inline-size:100%;max-inline-size:var(--roxy-chart-max-width,32rem);grid-template-columns:auto minmax(0,1fr) auto;grid-template-areas:".n.""w plate e"".s.";margin-inline:auto;display:grid}.compass{color:var(--roxy-muted);font-size:var(--roxy-text-xs)}.compass-n{grid-area:n}.compass-s{grid-area:s}.compass-w,.compass-e{writing-mode:vertical-rl}.compass-w{grid-area:w;rotate:180deg}.compass-e{grid-area:e}svg{grid-area:plate;width:100%;height:auto;display:block}.pada{fill:var(--roxy-surface);stroke:var(--roxy-border);stroke-width:.012px}.pada-innerRing,.pada-innerCorner,.pada-around-brahma{fill:color-mix(in srgb, var(--roxy-accent) 7%, var(--roxy-surface))}.pada-center,.pada-brahma{fill:var(--_brahma)}.pada-outside{fill:var(--_outside)}.pada-door{fill:var(--_door);stroke:var(--roxy-fg);stroke-width:.03px}.brahmasthan{fill:none;stroke:var(--roxy-accent-ink);stroke-width:.05px}.vamsa{stroke:var(--roxy-secondary);stroke-width:.02px;stroke-dasharray:.12 .1}.atimarma{fill:var(--roxy-accent-ink)}text{fill:var(--roxy-fg);text-anchor:middle}.devata{font-size:calc(var(--roxy-text-base) * .011875)}.square-no{fill:var(--roxy-muted);font-size:calc(var(--roxy-text-base) * .00875)}@container (width<=30rem){.devata{display:none}.square-no{font-size:calc(var(--roxy-text-base) * .02125);dominant-baseline:middle;translate:0 .31lh}}.facts{gap:var(--roxy-space-xs) var(--roxy-space-md);color:var(--roxy-secondary);font-size:var(--roxy-text-sm);flex-wrap:wrap;display:flex}.facts .roxy-label{margin-inline-end:var(--roxy-space-xs)}.facts b,.devatas b{color:var(--roxy-fg)}.devatas{gap:var(--roxy-space-xs) var(--roxy-space-md);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);font-variant-numeric:tabular-nums;flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}.legend{gap:var(--roxy-space-xs) var(--roxy-space-md);color:var(--roxy-muted);font-size:var(--roxy-text-xs);flex-wrap:wrap;display:flex}.swatch{inline-size:var(--roxy-space-sm);block-size:var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);vertical-align:middle;margin-inline-end:var(--roxy-space-xs);display:inline-block}.swatch-brahma{background:var(--_brahma)}.swatch-outside{background:var(--_outside)}.swatch-door{background:var(--_door)}.effect{margin:0;padding-block-start:var(--roxy-space-md)}.reading{color:var(--roxy-secondary);font-size:var(--roxy-text-sm);border-block-start:0;margin:0}.cites{color:var(--roxy-muted);font-size:var(--roxy-text-xs);margin:0;padding:0;list-style:none}`],s([Be({type:String,reflect:!0})],w.prototype,"mode",2),w=s([ue("roxy-vastu-mandala")],w);function Je(r){let n=Number.parseInt(r??"",10),e=Math.round(Math.sqrt(n));if(!(!Number.isFinite(e)||e<2||e*e!==n))return{size:e,originX:0,cellW:1,originY:0,cellH:1}}export{w as RoxyVastuMandala};
