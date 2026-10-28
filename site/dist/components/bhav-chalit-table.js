var ue=Object.defineProperty;var me=Object.getOwnPropertyDescriptor;var d=(r,e,t,n)=>{for(var o=n>1?void 0:n?me(e,t):e,i=r.length-1,s;i>=0;i--)(s=r[i])&&(o=(n?s(e,t,o):s(o))||o);return n&&o&&ue(e,t,o),o};import{css as Ke,html as f,nothing as P}from"lit";var N=[{endpoint:"vedic-astrology/bhav-chalit",method:"POST"}];function S(r){return r.toLowerCase().replace(/[\s_-]+/g," ").trim()}function I(r){return r.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/([a-z])([0-9])/g,"$1 $2").replace(/^\w/,e=>e.toUpperCase())}var ye=(r,e)=>e?r[S(e)]:void 0,ge={sun:"☉",moon:"☽",mercury:"☿",venus:"♀",earth:"♁",mars:"♂",jupiter:"♃",saturn:"♄",uranus:"♅",neptune:"♆",pluto:"♇",rahu:"☊",ketu:"☋",ascendant:"Asc",midheaven:"MC","part of fortune":"⊗",vertex:"Vx",lagna:"La","north node":"☊","south node":"☋",chiron:"⚷",lilith:"⚸","black moon lilith":"⚸"},_=r=>ye(ge,r);import{html as l,nothing as u}from"lit";import{property as c,state as h}from"lit/decorators.js";import{ifDefined as b}from"lit/directives/if-defined.js";var U=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function $(r){if(r.lang)return r.lang;if(typeof document>"u")return;let e=r.closest?.("[lang]")?.getAttribute("lang");return e||document.documentElement.lang||void 0}var fe={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function F(r){let e=r.toLowerCase();return U.find(t=>t.toLowerCase()===e)}function D(r){let e=$(r);if(!e)return;let t=F(e);if(t)return t;let n=e.toLowerCase().split("-"),o=n[0];if(o==="zh"){let i=n.find(s=>s==="hans"||s==="hant")??fe[n[1]??""];return i?F(`zh-${i}`):void 0}return F(o)}import{LitElement as ve}from"lit";var K=`/**
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
`;var j="roxy-ui-tokens";function B(){if(typeof document>"u")return null;let r=document.getElementById(j);if(r)return r;let e=document.createElement("style");return e.id=j,e.textContent=K,document.head.prepend(e),e}var z="__ROXY_UI_I18N__";function M(){let r=globalThis,e=r[z];if(e)return e;let t={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return r[z]=t,t}function xe(r,e){return e?r.replace(/\{\{(\w+)\}\}/g,(t,n)=>n in e?String(e[n]??""):t):r}function q(r,e,t){return xe(be(r,e)??e,t)}function be(r,e){if(!r)return;let{catalogs:t}=M(),n=r.toLowerCase();return(t[n]??t[n.split("-")[0]])?.[S(e)]}function H(r){let{listeners:e}=M();return e.add(r),()=>{e.delete(r)}}var k=class{constructor(e){this.host=e,e.addController(this)}hostConnected(){this.unsubscribe=H(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var T=class extends ve{constructor(){super();this.translator=(t,n)=>this.t(t,n);new k(this)}connectedCallback(){super.connectedCallback(),B()}t(t,n){return q(this.effectiveLang(),t,n)}effectiveLang(){return $(this)}};import{css as Se}from"lit";import{css as we}from"lit";var Y=we`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var ke=Se`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,E=[ke,Y];var Te="__cols",Ee="__rows";function Re(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function R(r){if(Array.isArray(r)){let i=!1,s=r.map(p=>{let y=R(p);return y!==p&&(i=!0),y});return i?s:r}if(!Re(r))return r;let e=r[Te],t=r[Ee];if(Array.isArray(e)&&Array.isArray(t)&&Object.keys(r).length===2)return t.map(i=>{let s={};return e.forEach((p,y)=>{s[p]=R(i[y])}),s});let n=!1,o={};for(let[i,s]of Object.entries(r)){let p=R(s);p!==s&&(n=!0),o[i]=p}return n?o:r}function Z(r){return R(r)}function V(r,e){return r.find(t=>t.attrs&&Object.entries(t.attrs).every(([n,o])=>e[n]===o))??r[0]}var Oe="pk_live_YOUR_KEY",J={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function W(r){if(r)return r===Oe?J.sample:r.startsWith("pk_")?void 0:J.secret}function X(r,e,t={}){t.warn&&console.warn(e.message),r.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:e.reason,message:e.message},bubbles:!0,composed:!0}))}var Q="https://roxyapi.com/api/v2";async function Ce(r){try{let e=await r.json();if(e?.error){let t=e.code==="validation_error"&&Array.isArray(e.issues)?e.issues.filter(n=>typeof n.path=="string"&&typeof n.message=="string").map(n=>({path:n.path,message:n.message})):null;return{message:e.error,issues:t?.length?t:null,worded:!0}}}catch{}return{message:`Request failed (${r.status})`,issues:null,worded:!1}}var ee={fromAttribute:r=>{if(r!=null){try{let e=JSON.parse(r);if(e&&typeof e=="object"&&!Array.isArray(e))return e}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},x=class extends Error{constructor(t,n=null,o=!0){super(t);this.issues=n;this.worded=o}};function te(r){return r.submitUrl?void 0:W(r.publishableKey)}async function L(r,e,t){let n=te(r);if(n)throw new x(n.message);let o=r.submitUrl?await fetch(r.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Pe(e,r.submitContext),signal:t}):await Fe(r,e,t);if(!o.ok){let i=await Ce(o);throw new x(i.message,i.issues,i.worded)}return await o.json()}function Pe(r,e){return JSON.stringify(e?{...r,context:e}:r)}function Fe(r,e,t){let n=new URL(`${r.baseUrl??Q}${e.path}`,document.baseURI);for(let[i,s]of Object.entries(e.query??{}))s!=null&&n.searchParams.set(i,String(s));let o={Accept:"application/json"};return r.publishableKey&&(o["X-API-Key"]=r.publishableKey),e.body!=null&&(o["Content-Type"]="application/json"),fetch(n,{method:e.method??"GET",headers:o,body:e.body!=null?JSON.stringify(e.body):void 0,signal:t})}var O=class{constructor(e){this.baseUrl=Q;this.worded=!0;this.host=e,e.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(e){this.worded=!0;let t=te(this);if(t){this.host.error=t.message,X(this.host,t);return}this.abort?.abort();let n=new AbortController;this.abort=n,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let o=await L(this,e,n.signal);if(n.signal.aborted)return;this.host.data=o}catch(o){if(n.signal.aborted||o?.name==="AbortError")return;o instanceof x&&(this.host.issues=o.issues),this.worded=o instanceof x&&o.worded,this.host.error=o instanceof Error?o.message:String(o)}finally{this.abort===n&&(this.abort=void 0),n.signal.aborted||(this.host.loading=!1)}}};function re(r,e,t,n=[]){let o={...t},i=`/${r.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(w,g)=>{let he=o[g];return delete o[g],encodeURIComponent(String(he??""))}),s=new Set(n),p={},y={};for(let[w,g]of Object.entries(o))g===void 0||g===""||(e==="GET"||s.has(w)?p[w]=g:y[w]=g);return{path:i,method:e,query:p,body:e==="POST"?y:void 0}}import{css as Ae,html as A,nothing as G}from"lit";import{css as $e,html as Le}from"lit";function ne(){return Le`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var bt=$e`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var kt=Ae`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function oe(r,e,t){let n=r.filter(o=>!!o.body);return n.length===0?G:A`<section class="block" part="section readings"><h3>${t}</h3>${n.map((o,i)=>A`<details class="interp-card" part="reading" name="${e}" ?open="${i===0}"><summary><span class="interp-lead">${o.label}</span> ${ne()} ${o.aside?A`<span class="interp-aside"><small>${o.aside}</small></span>`:G}</summary><div class="interp-body"><p>${o.body}</p>${o.extra??G}</div></details>`)}</section>`}var Ge="roxy-data";function Ne(r){return r.nodeName==="SCRIPT"&&r.getAttribute("type")==="application/json"}var C=class{constructor(e){this.host=e,e.addController(this)}hostConnected(){if(this.host.data!=null)return;let e=this.read();e!==void 0&&(this.host.data=e,this.host.requestUpdate())}read(){let e=this.findInlineScript();return e?this.parse(e.textContent):void 0}findInlineScript(){for(let e of Array.from(this.host.children))if(Ne(e)&&e.classList.contains(Ge))return e;return null}parse(e){if(e?.trim())try{return JSON.parse(e)}catch{return}}};var a=class extends T{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let t=this.lastRequest,n=this.listKey,o=this.listRows();if(!(!t||!n||!o)){this.moreLoading=!0,this.moreError=null;try{let i=await L(this.fetcher,{...t,query:{...t.query,offset:o.length}});if(this.lastRequest!==t)return;let s=i[n];this.data={...this.data,...i,[n]:[...o,...Array.isArray(s)?s:[]]}}catch(i){this.lastRequest===t&&(this.moreError=i instanceof Error?i.message:String(i))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=t=>{let n=this.selfFetch();if(!n)return;let o=t.detail;this.lastValues=o.values,this.sticky=!!o.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(o.values),this.fetchFresh(re(n.endpoint,n.method,o.values,o.queryKeys??[]))};new C(this),this.fetcher=new O(this)}static{this.styles=[E]}static{this.endpoints=[]}willUpdate(t){if(t.has("data")&&this.data!=null){let n=Z(this.data);n!==this.data&&(this.data=n)}(t.has("publishableKey")||t.has("baseUrl")||t.has("submitUrl")||t.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let t=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:V(this.constructor.endpoints,this);return t&&{endpoint:t.endpoint,method:this.method??t.method}}render(){return l`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(t){try{return this.renderData(t)}catch(n){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,n),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:n},bubbles:!0,composed:!0})),customElements.get("roxy-data")?l`<roxy-data .data="${t}" lang="${b(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let t=this.hideSections.split(",").map(o=>o.trim().toLowerCase()).filter(o=>/^[a-z][a-z0-9-]*$/.test(o));if(t.length===0)return u;let n=t.map(o=>`[part~="${o}"],roxy-endpoint-form::part(${o}){display:none!important}`).join("");return l`<style>${n}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?l`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(t,n,o){return this.hideReadings?u:oe(t,n,this.t(o??"Reading"))}renderResult(t){let n=l`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(t)}`;return this.showAttribution()?l`${n}${this.renderAttribution()}`:n}renderWithForm(t){return l`${this.renderForm()}${t}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?u:this.renderErrorBanner(this.error):this.data==null?u:this.showAttribution()?l`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let t=this.listRows(),n=this.data?.total;return!this.lastRequest||!t||typeof n!="number"?u:t.length>=n?u:l`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?l`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:u}</div>`}listRows(){let t=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(t)?t:void 0}fetchFresh(t){return this.lastRequest=t,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(t)}load(t){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(t)}pickRow(t){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:t,bubbles:!0,composed:!0})),this.openRow(t.id)}openRow(t){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let n=this.openedRow??document.createElement(this.rowDetail.tag);n.publishableKey=this.publishableKey,n.baseUrl=this.baseUrl,n.submitUrl=this.submitUrl,n.submitContext=this.submitContext,n.hideReadings=this.hideReadings,n.hideSections=this.hideSections;let o=this.effectiveLang();o&&n.setAttribute("lang",o),this.openedRow=n,this.openedRowId=t,n.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(t))}`,method:"GET",query:{lang:D(this)}}).then(()=>n.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return l`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(u):this.renderEmpty()}renderForm(){let t=this.selfFetch();return l`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${t?.endpoint??""}" method="${t?.method??"POST"}" spec-url="${b(this.specUrl)}" publishable-key="${b(this.publishableKey)}" location-url="${b(this.locationUrl)}" submit-label="${b(this.submitLabel)}" lang="${b(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let t=sessionStorage.getItem(this.rememberKey());return t?JSON.parse(t):void 0}catch{return}}writeRemembered(t){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(t))}catch{}}renderEmpty(){return l`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return l`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(t){let n=!!this.selfFetch();if(n&&this.issues)return this.renderForm();let o=this.renderErrorBanner(t);return n?l`${o}${this.renderForm()}`:o}renderErrorBanner(t){return l`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(t)}</div>`}};d([c({attribute:!1})],a.prototype,"data",2),d([c({type:String,attribute:"data-endpoint"})],a.prototype,"endpoint",2),d([c({type:String})],a.prototype,"method",2),d([c({type:String,attribute:"publishable-key"})],a.prototype,"publishableKey",2),d([c({type:String,attribute:"base-url"})],a.prototype,"baseUrl",2),d([c({type:String,attribute:"spec-url"})],a.prototype,"specUrl",2),d([c({type:String,attribute:"submit-url"})],a.prototype,"submitUrl",2),d([c({attribute:"submit-context",converter:ee})],a.prototype,"submitContext",2),d([c({type:String,attribute:"location-url"})],a.prototype,"locationUrl",2),d([c({type:Boolean})],a.prototype,"remember",2),d([c({type:Boolean,attribute:"hide-readings",reflect:!0})],a.prototype,"hideReadings",2),d([c({type:String,attribute:"hide-sections",reflect:!0})],a.prototype,"hideSections",2),d([c({type:String,attribute:"submit-label"})],a.prototype,"submitLabel",2),d([c({type:String,attribute:"error-message"})],a.prototype,"errorMessage",2),d([c({type:String})],a.prototype,"attribution",2),d([h()],a.prototype,"loading",2),d([h()],a.prototype,"error",2),d([h()],a.prototype,"issues",2),d([h()],a.prototype,"selfFetched",2),d([h()],a.prototype,"editing",2),d([h()],a.prototype,"sticky",2),d([h()],a.prototype,"openedRow",2),d([h()],a.prototype,"openedRowId",2),d([h()],a.prototype,"moreLoading",2),d([h()],a.prototype,"moreError",2);var ie=r=>e=>{customElements.get(r)||customElements.define(r,e)};var ae=new Map;function Ie(r){if(!r)return["en"];let e=ae.get(r);if(e)return[e,"en"];let t="en";try{t=Intl.getCanonicalLocales(r)[0]??"en"}catch{t="en"}return ae.set(r,t),[t,"en"]}function m(r,e,t=1){return typeof e!="number"||!Number.isFinite(e)?"":e.toLocaleString(Ie(r),{maximumFractionDigits:t})}var _e={"kp-newcomb":"KP Newcomb","kp-old":"KP Old",lahiri:"Lahiri",raman:"B.V. Raman",custom:"Custom"};function se(r,e,t){let n=typeof e=="string"?_e[e]??I(e):"",o=typeof t=="number"?`${m(r,t,2)}°`:"";return n&&o?`${n} (${o})`:n||o}import{css as Ue,html as De,nothing as de}from"lit";var le=Ue`.roxy-frame{color:var(--roxy-muted);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-normal);margin:0}.roxy-frame .roxy-frame-deg{font-variant-numeric:tabular-nums}`;function ce(r,e,t){if(!e?.ayanamsa)return de;let n=se(r,e.ayanamsa);if(!n)return de;let o=typeof e.ayanamsaDegrees=="number"?m(r,e.ayanamsaDegrees,4):void 0;return De`<p class="roxy-frame">${o===void 0?t("Sidereal frame: {{frame}}",{frame:n}):t("Sidereal frame: {{frame}}, {{degrees}}° subtracted",{frame:n,degrees:o})}</p>`}function pe(r,e){return!e||!r?.length?"":r.map(t=>e[String(t)]?.[0]).filter(Boolean).join(", ")}var v=class extends a{renderData(e){let t=e.grahas??[],n=e.bhavas??[];if(!t.length&&!n.length)return this.renderEmpty();let o=t.filter(s=>s.moved),i=e.movedCount??o.length;return f`<div class="wrap" part="card" aria-label="${this.t("Bhav Chalit")}"><header class="head" part="header"><h2 class="title">${this.t("Bhav Chalit")}</h2><p class="lede">${i===0?this.t("No graha changes house. The Rashi chart and the Chalit chart agree, which is a normal result rather than a missing reading."):this.t("{{count}} of {{total}} grahas change house between the Rashi chart and the unequal Sripati cusps.",{count:i,total:t.length})}</p>${ce(this.effectiveLang(),e.frame,this.translator)}</header>${o.length?f`<div class="moved-list" part="table moved">${o.map(s=>this.renderMoved(s,e.houseThemes))}</div>`:P} ${n.length?f`<details part="details"><summary>${this.t("Bhava cusps and occupants")}</summary><div class="scroll" tabindex="0" role="region" aria-label="${this.t("Bhava cusps and occupants")}"><table part="table"><thead><tr><th>${this.t("Bhava")}</th><th>${this.t("Rashi")}</th><th>${this.t("Start")}</th><th>${this.t("Madhya")}</th><th>${this.t("End")}</th><th>${this.t("Span")}</th><th>${this.t("Grahas")}</th></tr></thead><tbody>${n.map(s=>this.renderBhavaRow(s))}</tbody></table></div></details>`:P}</div>`}renderMoved(e,t){let n=_(e.graha)??"",o=typeof e.bhava=="number"?pe([e.bhava],t):"";return f`<div class="moved-row"><span class="graha">${n?f`<span class="glyph">${n}</span>`:P}${e.graha} </span><span class="shift">${this.t("house {{from}} in the Rashi chart, house {{to}} here",{from:e.rashiHouse??"",to:e.bhava??""})} </span>${o?f`<span class="themes">${o}</span>`:P}</div>`}renderBhavaRow(e){let t=(e.grahas??[]).join(", ");return f`<tr><td class="num">${e.house}</td><td>${e.rashi}</td><td class="num">${m(this.effectiveLang(),e.start,2)}°</td><td class="num">${m(this.effectiveLang(),e.madhya,2)}°</td><td class="num">${m(this.effectiveLang(),e.end,2)}°</td><td class="num">${m(this.effectiveLang(),e.span,2)}°</td><td class="occupants">${t}</td></tr>`}};v.endpoints=N,v.styles=[E,le,Ke`.wrap{gap:var(--roxy-space-md);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,1fr);display:grid}.head{gap:var(--roxy-space-xs);display:grid}.title,.lede{margin:0}.lede{font-size:var(--roxy-text-sm)}.moved-row{align-items:baseline;gap:var(--roxy-space-sm);padding-block:var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);font-size:var(--roxy-text-sm);flex-wrap:wrap;display:flex}.graha{font-weight:var(--roxy-weight-bold)}.glyph{color:var(--roxy-muted);margin-inline-end:var(--roxy-space-xs)}.shift{font-variant-numeric:tabular-nums}.themes{color:var(--roxy-muted);font-size:var(--roxy-text-xs)}.scroll{min-width:0;margin-block-start:var(--roxy-space-sm);overflow-x:auto}table{width:100%}th,td{white-space:nowrap}td.num{font-variant-numeric:tabular-nums}td.occupants{white-space:normal;color:var(--roxy-secondary)}summary{font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-bold)}`],v=d([ie("roxy-bhav-chalit-table")],v);export{v as RoxyBhavChalitTable};
