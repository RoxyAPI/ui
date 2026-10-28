var kt=Object.defineProperty;var Tt=Object.getOwnPropertyDescriptor;var l=(e,t,n,o)=>{for(var r=o>1?void 0:o?Tt(t,n):t,i=e.length-1,a;i>=0;i--)(a=e[i])&&(r=(o?a(t,n,r):a(r))||r);return o&&r&&kt(t,n,r),r};import{css as ee,html as h,nothing as u}from"lit";var U=[{endpoint:"astrology/natal-chart",method:"POST"}];function E(e){return e.toLowerCase().replace(/[\s_-]+/g," ").trim()}function j(e){return e?e.charAt(0).toUpperCase()+e.slice(1).toLowerCase():""}function q(e){return e.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/([a-z])([0-9])/g,"$1 $2").replace(/^\w/,t=>t.toUpperCase())}var B=(e,t)=>t?e[E(t)]:void 0,Et={sun:"☉",moon:"☽",mercury:"☿",venus:"♀",earth:"♁",mars:"♂",jupiter:"♃",saturn:"♄",uranus:"♅",neptune:"♆",pluto:"♇",rahu:"☊",ketu:"☋",ascendant:"Asc",midheaven:"MC","part of fortune":"⊗",vertex:"Vx",lagna:"La","north node":"☊","south node":"☋",chiron:"⚷",lilith:"⚸","black moon lilith":"⚸"},H=e=>B(Et,e);var Rt={aries:"♈",taurus:"♉",gemini:"♊",cancer:"♋",leo:"♌",virgo:"♍",libra:"♎",scorpio:"♏",sagittarius:"♐",capricorn:"♑",aquarius:"♒",pisces:"♓"},Y=e=>B(Rt,e);var V=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];import{html as c,nothing as f}from"lit";import{property as p,state as y}from"lit/decorators.js";import{ifDefined as w}from"lit/directives/if-defined.js";var Z=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function G(e){if(e.lang)return e.lang;if(typeof document>"u")return;let t=e.closest?.("[lang]")?.getAttribute("lang");return t||document.documentElement.lang||void 0}var Pt={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function A(e){let t=e.toLowerCase();return Z.find(n=>n.toLowerCase()===t)}function W(e){let t=G(e);if(!t)return;let n=A(t);if(n)return n;let o=t.toLowerCase().split("-"),r=o[0];if(r==="zh"){let i=o.find(a=>a==="hans"||a==="hant")??Pt[o[1]??""];return i?A(`zh-${i}`):void 0}return A(r)}import{LitElement as $t}from"lit";var J=`/**
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
`;var X="roxy-ui-tokens";function Q(){if(typeof document>"u")return null;let e=document.getElementById(X);if(e)return e;let t=document.createElement("style");return t.id=X,t.textContent=J,document.head.prepend(t),t}var tt="__ROXY_UI_I18N__";function N(){let e=globalThis,t=e[tt];if(t)return t;let n={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return e[tt]=n,n}function Ot(e,t){return t?e.replace(/\{\{(\w+)\}\}/g,(n,o)=>o in t?String(t[o]??""):n):e}function et(e,t,n){return Ot(Lt(e,t)??t,n)}function Lt(e,t){if(!e)return;let{catalogs:n}=N(),o=e.toLowerCase();return(n[o]??n[o.split("-")[0]])?.[E(t)]}function Ft(e){if(!e)return;let{fieldLabels:t}=N(),n=e.toLowerCase();return t[n]??t[n.split("-")[0]]}function nt(e,t){return Ft(e)?.fields[t]}function rt(e){let{listeners:t}=N();return t.add(e),()=>{t.delete(e)}}var R=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){this.unsubscribe=rt(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var P=class extends $t{constructor(){super();this.translator=(n,o)=>this.t(n,o);new R(this)}connectedCallback(){super.connectedCallback(),Q()}t(n,o){return et(this.effectiveLang(),n,o)}effectiveLang(){return G(this)}};import{css as At}from"lit";import{css as Ct}from"lit";var ot=Ct`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var Gt=At`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,O=[Gt,ot];var Nt="__cols",It="__rows";function Mt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function L(e){if(Array.isArray(e)){let i=!1,a=e.map(s=>{let m=L(s);return m!==s&&(i=!0),m});return i?a:e}if(!Mt(e))return e;let t=e[Nt],n=e[It];if(Array.isArray(t)&&Array.isArray(n)&&Object.keys(e).length===2)return n.map(i=>{let a={};return t.forEach((s,m)=>{a[s]=L(i[m])}),a});let o=!1,r={};for(let[i,a]of Object.entries(e)){let s=L(a);s!==a&&(o=!0),r[i]=s}return o?r:e}function it(e){return L(e)}function st(e,t){return e.find(n=>n.attrs&&Object.entries(n.attrs).every(([o,r])=>t[o]===r))??e[0]}var _t="pk_live_YOUR_KEY",at={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function dt(e){if(e)return e===_t?at.sample:e.startsWith("pk_")?void 0:at.secret}function lt(e,t,n={}){n.warn&&console.warn(t.message),e.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:t.reason,message:t.message},bubbles:!0,composed:!0}))}var ct="https://roxyapi.com/api/v2";async function Dt(e){try{let t=await e.json();if(t?.error){let n=t.code==="validation_error"&&Array.isArray(t.issues)?t.issues.filter(o=>typeof o.path=="string"&&typeof o.message=="string").map(o=>({path:o.path,message:o.message})):null;return{message:t.error,issues:n?.length?n:null,worded:!0}}}catch{}return{message:`Request failed (${e.status})`,issues:null,worded:!1}}var pt={fromAttribute:e=>{if(e!=null){try{let t=JSON.parse(e);if(t&&typeof t=="object"&&!Array.isArray(t))return t}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},v=class extends Error{constructor(n,o=null,r=!0){super(n);this.issues=o;this.worded=r}};function ht(e){return e.submitUrl?void 0:dt(e.publishableKey)}async function I(e,t,n){let o=ht(e);if(o)throw new v(o.message);let r=e.submitUrl?await fetch(e.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Kt(t,e.submitContext),signal:n}):await zt(e,t,n);if(!r.ok){let i=await Dt(r);throw new v(i.message,i.issues,i.worded)}return await r.json()}function Kt(e,t){return JSON.stringify(t?{...e,context:t}:e)}function zt(e,t,n){let o=new URL(`${e.baseUrl??ct}${t.path}`,document.baseURI);for(let[i,a]of Object.entries(t.query??{}))a!=null&&o.searchParams.set(i,String(a));let r={Accept:"application/json"};return e.publishableKey&&(r["X-API-Key"]=e.publishableKey),t.body!=null&&(r["Content-Type"]="application/json"),fetch(o,{method:t.method??"GET",headers:r,body:t.body!=null?JSON.stringify(t.body):void 0,signal:n})}var F=class{constructor(t){this.baseUrl=ct;this.worded=!0;this.host=t,t.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(t){this.worded=!0;let n=ht(this);if(n){this.host.error=n.message,lt(this.host,n);return}this.abort?.abort();let o=new AbortController;this.abort=o,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let r=await I(this,t,o.signal);if(o.signal.aborted)return;this.host.data=r}catch(r){if(o.signal.aborted||r?.name==="AbortError")return;r instanceof v&&(this.host.issues=r.issues),this.worded=r instanceof v&&r.worded,this.host.error=r instanceof Error?r.message:String(r)}finally{this.abort===o&&(this.abort=void 0),o.signal.aborted||(this.host.loading=!1)}}};function ut(e,t,n,o=[]){let r={...n},i=`/${e.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(b,g)=>{let T=r[g];return delete r[g],encodeURIComponent(String(T??""))}),a=new Set(o),s={},m={};for(let[b,g]of Object.entries(r))g===void 0||g===""||(t==="GET"||a.has(b)?s[b]=g:m[b]=g);return{path:i,method:t,query:s,body:t==="POST"?m:void 0}}import{css as qt,html as M,nothing as _}from"lit";import{css as Ut,html as jt}from"lit";function mt(){return jt`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var Ge=Ut`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var _e=qt`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function gt(e,t,n){let o=e.filter(r=>!!r.body);return o.length===0?_:M`<section class="block" part="section readings"><h3>${n}</h3>${o.map((r,i)=>M`<details class="interp-card" part="reading" name="${t}" ?open="${i===0}"><summary><span class="interp-lead">${r.label}</span> ${mt()} ${r.aside?M`<span class="interp-aside"><small>${r.aside}</small></span>`:_}</summary><div class="interp-body"><p>${r.body}</p>${r.extra??_}</div></details>`)}</section>`}var Bt="roxy-data";function Ht(e){return e.nodeName==="SCRIPT"&&e.getAttribute("type")==="application/json"}var $=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){if(this.host.data!=null)return;let t=this.read();t!==void 0&&(this.host.data=t,this.host.requestUpdate())}read(){let t=this.findInlineScript();return t?this.parse(t.textContent):void 0}findInlineScript(){for(let t of Array.from(this.host.children))if(Ht(t)&&t.classList.contains(Bt))return t;return null}parse(t){if(t?.trim())try{return JSON.parse(t)}catch{return}}};var d=class extends P{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let n=this.lastRequest,o=this.listKey,r=this.listRows();if(!(!n||!o||!r)){this.moreLoading=!0,this.moreError=null;try{let i=await I(this.fetcher,{...n,query:{...n.query,offset:r.length}});if(this.lastRequest!==n)return;let a=i[o];this.data={...this.data,...i,[o]:[...r,...Array.isArray(a)?a:[]]}}catch(i){this.lastRequest===n&&(this.moreError=i instanceof Error?i.message:String(i))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=n=>{let o=this.selfFetch();if(!o)return;let r=n.detail;this.lastValues=r.values,this.sticky=!!r.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(r.values),this.fetchFresh(ut(o.endpoint,o.method,r.values,r.queryKeys??[]))};new $(this),this.fetcher=new F(this)}static{this.styles=[O]}static{this.endpoints=[]}willUpdate(n){if(n.has("data")&&this.data!=null){let o=it(this.data);o!==this.data&&(this.data=o)}(n.has("publishableKey")||n.has("baseUrl")||n.has("submitUrl")||n.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let n=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:st(this.constructor.endpoints,this);return n&&{endpoint:n.endpoint,method:this.method??n.method}}render(){return c`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(n){try{return this.renderData(n)}catch(o){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,o),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:o},bubbles:!0,composed:!0})),customElements.get("roxy-data")?c`<roxy-data .data="${n}" lang="${w(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let n=this.hideSections.split(",").map(r=>r.trim().toLowerCase()).filter(r=>/^[a-z][a-z0-9-]*$/.test(r));if(n.length===0)return f;let o=n.map(r=>`[part~="${r}"],roxy-endpoint-form::part(${r}){display:none!important}`).join("");return c`<style>${o}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?c`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(n,o,r){return this.hideReadings?f:gt(n,o,this.t(r??"Reading"))}renderResult(n){let o=c`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(n)}`;return this.showAttribution()?c`${o}${this.renderAttribution()}`:o}renderWithForm(n){return c`${this.renderForm()}${n}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?f:this.renderErrorBanner(this.error):this.data==null?f:this.showAttribution()?c`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let n=this.listRows(),o=this.data?.total;return!this.lastRequest||!n||typeof o!="number"?f:n.length>=o?f:c`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?c`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:f}</div>`}listRows(){let n=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(n)?n:void 0}fetchFresh(n){return this.lastRequest=n,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(n)}load(n){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(n)}pickRow(n){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:n,bubbles:!0,composed:!0})),this.openRow(n.id)}openRow(n){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let o=this.openedRow??document.createElement(this.rowDetail.tag);o.publishableKey=this.publishableKey,o.baseUrl=this.baseUrl,o.submitUrl=this.submitUrl,o.submitContext=this.submitContext,o.hideReadings=this.hideReadings,o.hideSections=this.hideSections;let r=this.effectiveLang();r&&o.setAttribute("lang",r),this.openedRow=o,this.openedRowId=n,o.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(n))}`,method:"GET",query:{lang:W(this)}}).then(()=>o.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return c`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(f):this.renderEmpty()}renderForm(){let n=this.selfFetch();return c`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${n?.endpoint??""}" method="${n?.method??"POST"}" spec-url="${w(this.specUrl)}" publishable-key="${w(this.publishableKey)}" location-url="${w(this.locationUrl)}" submit-label="${w(this.submitLabel)}" lang="${w(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let n=sessionStorage.getItem(this.rememberKey());return n?JSON.parse(n):void 0}catch{return}}writeRemembered(n){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(n))}catch{}}renderEmpty(){return c`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return c`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(n){let o=!!this.selfFetch();if(o&&this.issues)return this.renderForm();let r=this.renderErrorBanner(n);return o?c`${r}${this.renderForm()}`:r}renderErrorBanner(n){return c`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(n)}</div>`}};l([p({attribute:!1})],d.prototype,"data",2),l([p({type:String,attribute:"data-endpoint"})],d.prototype,"endpoint",2),l([p({type:String})],d.prototype,"method",2),l([p({type:String,attribute:"publishable-key"})],d.prototype,"publishableKey",2),l([p({type:String,attribute:"base-url"})],d.prototype,"baseUrl",2),l([p({type:String,attribute:"spec-url"})],d.prototype,"specUrl",2),l([p({type:String,attribute:"submit-url"})],d.prototype,"submitUrl",2),l([p({attribute:"submit-context",converter:pt})],d.prototype,"submitContext",2),l([p({type:String,attribute:"location-url"})],d.prototype,"locationUrl",2),l([p({type:Boolean})],d.prototype,"remember",2),l([p({type:Boolean,attribute:"hide-readings",reflect:!0})],d.prototype,"hideReadings",2),l([p({type:String,attribute:"hide-sections",reflect:!0})],d.prototype,"hideSections",2),l([p({type:String,attribute:"submit-label"})],d.prototype,"submitLabel",2),l([p({type:String,attribute:"error-message"})],d.prototype,"errorMessage",2),l([p({type:String})],d.prototype,"attribution",2),l([y()],d.prototype,"loading",2),l([y()],d.prototype,"error",2),l([y()],d.prototype,"issues",2),l([y()],d.prototype,"selfFetched",2),l([y()],d.prototype,"editing",2),l([y()],d.prototype,"sticky",2),l([y()],d.prototype,"openedRow",2),l([y()],d.prototype,"openedRowId",2),l([y()],d.prototype,"moreLoading",2),l([y()],d.prototype,"moreError",2);var yt=e=>t=>{customElements.get(e)||customElements.define(e,t)};function Yt(e){let t=e%360;return t<0?t+360:t}function Vt(e){let t=Yt(e),n=Math.floor(t/30)%12,o=t%30,r=Math.floor(o),i=(o-r)*60,a=Math.floor(i),s=Math.round((i-a)*60);return{sign:V[n]??"Aries",signIndex:n,degree:r,minute:a,second:s}}function D(e,t){let{sign:n,degree:o,minute:r}=Vt(e);return`${o}° ${t||n} ${String(r).padStart(2,"0")}'`}import{css as Zt}from"lit";var ft=Zt`.roxy-facts{gap:var(--roxy-space-sm) var(--roxy-space-lg);margin:var(--roxy-space-sm) 0 0;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums;flex-wrap:wrap;display:flex}.roxy-facts>div{min-width:0}.roxy-facts dd{overflow-wrap:anywhere;margin:0}`;var K=/^\d{4}-\d{2}-\d{2}$/,Wt=/^\d{4}-\d{2}$/,vt=/^\d{2}:\d{2}(:\d{2})?$/,Jt=/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/,xt=new Map;function C(e){if(!e)return["en"];let t=xt.get(e);if(t)return[t,"en"];let n="en";try{n=Intl.getCanonicalLocales(e)[0]??"en"}catch{n="en"}return xt.set(e,n),[n,"en"]}var bt=new Map;function Xt(e){let t=e??"",n=bt.get(t);if(n)return n;let r={hour:new Intl.DateTimeFormat(C(e),{timeStyle:"short",timeZone:"UTC"}).formatToParts(new Date(Date.UTC(2e3,0,1,1))).find(i=>i.type==="hour")?.value?.length===2?"2-digit":"numeric",minute:"2-digit"};return bt.set(t,r),r}function wt(e){let t=vt.test(e)?`1970-01-01T${e}`:K.test(e)?`${e}T00:00:00`:Wt.test(e)?`${e}-01T00:00:00`:Jt.test(e)?e.replace(" ","T"):null;return t?{d:new Date(`${t}Z`),timeZone:"UTC"}:{d:new Date(e)}}function Qt(e,t){if(typeof t!="string"||t.length===0)return"";let{d:n,timeZone:o}=wt(t);return Number.isNaN(n.getTime())?t:n.toLocaleDateString(C(e),{month:"short",day:"numeric",year:"numeric",timeZone:o})}function x(e,t,n=1){return typeof t!="number"||!Number.isFinite(t)?"":t.toLocaleString(C(e),{maximumFractionDigits:n})}function St(e,t,n,o=!1){let r=typeof t=="string"&&K.test(t)&&typeof n=="string"&&vt.test(n)?`${t}T${n}`:t;if(typeof r!="string"||r.length===0)return"";if(K.test(r))return Qt(e,r);let{d:i,timeZone:a}=wt(r);return Number.isNaN(i.getTime())?r:i.toLocaleString(C(e),{month:"short",day:"numeric",year:"numeric",...Xt(e),...o?{second:"2-digit"}:{},timeZone:a})}function z(e,t,n){return nt(e,t)??n??q(t)}var te="Localized";function S(e,t,n){let o=e,r=o?.[`${t}${te}`];if(typeof r=="string"&&r!=="")return r;if(n!==void 0)return n;let i=o?.[t];return typeof i=="string"?i:""}var k=class extends d{rows(){let t=this.data;if(!t)return[];let n=(t.planets??[]).map(r=>({name:r.name,label:S(r,"name"),sign:r.sign,signLabel:S(r,"sign"),longitude:r.longitude,latitude:r.latitude,house:r.house,speed:r.speed,isRetrograde:r.isRetrograde,dignity:r.dignity})),o=[["Ascendant",t.ascendant],["Midheaven",t.midheaven],["Part of Fortune",t.partOfFortune],["Vertex",t.vertex]];for(let[r,i]of o)i&&n.push({name:r,label:this.t(r),sign:i.sign,signLabel:S(i,"sign"),longitude:i.longitude,house:"house"in i?i.house:void 0,sect:"sect"in i?i.sect:void 0,isPoint:!0});return n}renderData(t){if(!t.planets)return this.renderEmpty();let n=this.rows(),o=t.birthDetails,r=n.some(s=>Number.isFinite(s.latitude)),i=n.some(s=>s.sect),a=["latitude","longitude","timezone"];return h`<div class="wrap" part="card"><header part="header"><h2>${this.t("Planetary positions")}</h2>${o?h`<div part="details"><p class="roxy-label">${St(this.effectiveLang(),o.date,o.time,!0)}</p><dl class="roxy-facts">${a.map(s=>h`<div><dt>${z(this.effectiveLang(),s)}</dt><dd>${x(this.effectiveLang(),o[s],5)}</dd></div>`)}</dl></div>`:u}</header><div class="scroll" tabindex="0" role="region" aria-label="${this.t("Western planetary positions")}"><table part="table"><caption class="roxy-sr-only">${this.t("Western planetary positions: each body with its sign, degree, house, essential dignity and motion. The dignity cell is blank for the lunar nodes, Chiron and Lilith, which rule no sign and therefore hold no dignity at all.")}</caption><thead><tr><th scope="col">${this.t("Body")}</th><th scope="col">${this.t("Sign")}</th><th scope="col">${this.t("Degree")}</th><th scope="col">${this.t("Longitude")}</th>${r?h`<th scope="col">${z(this.effectiveLang(),"latitude")}</th>`:u}<th scope="col">${this.t("House")}</th><th scope="col">${this.t("Dignity")}</th><th scope="col">${this.t("Motion")}</th>${i?h`<th scope="col">${this.t("Sect")}</th>`:u}</tr></thead><tbody>${n.map(s=>{let m=H(s.name)??"",b=s.sect==="day"?this.t("Daytime"):s.sect==="night"?this.t("Night"):"",g=Y(s.sign)??"",T=typeof s.speed=="number"?x(this.effectiveLang(),s.speed,6):"";return h`<tr class="${s.isPoint?"point":""}"><td class="body">${m?h`<span class="glyph">${m}</span>`:u}${s.label}</td><td>${g?h`<span class="glyph">${g}</span>`:u}${s.signLabel??""}</td><td>${typeof s.longitude=="number"?D(s.longitude,s.signLabel):""}</td><td>${typeof s.longitude=="number"?`${x(this.effectiveLang(),s.longitude,5)}°`:u}</td>${r?h`<td>${typeof s.latitude=="number"?`${x(this.effectiveLang(),s.latitude,5)}°`:u}</td>`:u}<td>${typeof s.house=="number"?s.house:""}</td><td class="dignity">${s.dignity?j(s.dignity):""}</td><td>${T?h`${T}${this.t("°/day")}`:u} ${s.isRetrograde?h`<span class="retro">℞</span>`:u}</td>${i?h`<td>${b}</td>`:u}</tr>`})}</tbody></table></div>${t.houses?.length?h`<details part="section houses"><summary>${this.t("Houses")}</summary><div class="scroll" tabindex="0" role="region" aria-label="${this.t("Houses")}"><table part="table"><thead><tr><th scope="col">${this.t("House")}</th><th scope="col">${this.t("Sign")}</th><th scope="col">${this.t("Degree")}</th><th scope="col">${this.t("Longitude")}</th></tr></thead><tbody>${t.houses.map(s=>h`<tr><th scope="row">${x(this.effectiveLang(),s.number,0)}</th><td>${S(s,"sign")}</td><td>${D(s.longitude,S(s,"sign"))}</td><td>${x(this.effectiveLang(),s.longitude,5)}°</td></tr>`)}</tbody></table></div></details>`:u}</div>`}};k.endpoints=U,k.styles=[O,ft,ee`.wrap{gap:var(--roxy-space-md);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,1fr);display:grid}h2,p{margin:0}h2{overflow-wrap:anywhere}.scroll{min-width:0;overflow-x:auto}table{width:100%}:is(th,td){white-space:nowrap}tr:not(.point)+tr.point>*{border-block-start:1px solid var(--roxy-secondary)}td.body{font-weight:var(--roxy-weight-bold)}.glyph{color:var(--roxy-muted);margin-inline-end:var(--roxy-space-xs)}.retro{color:var(--roxy-danger-fg);font-weight:var(--roxy-weight-bold)}details>summary{font-weight:var(--roxy-weight-bold)}details>.scroll{margin-block-start:var(--roxy-space-sm)}`],k=l([yt("roxy-western-planets-table")],k);export{k as RoxyWesternPlanetsTable};
