var Te=Object.defineProperty;var Ee=Object.getOwnPropertyDescriptor;var a=(n,t,e,r)=>{for(var o=r>1?void 0:r?Ee(t,e):t,i=n.length-1,s;i>=0;i--)(s=n[i])&&(o=(r?s(t,e,o):s(o))||o);return r&&o&&Te(t,e,o),o};import{css as Qe,html as p,nothing as T}from"lit";import{property as et}from"lit/decorators.js";var Y=[{endpoint:"astrology/planets/monthly",method:"POST"},{endpoint:"vedic-astrology/planetary-positions/monthly",method:"POST"}];function O(n){return n.toLowerCase().replace(/[\s_-]+/g," ").trim()}var V=(n,t)=>t?n[O(t)]:void 0,Re={sun:"☉",moon:"☽",mercury:"☿",venus:"♀",earth:"♁",mars:"♂",jupiter:"♃",saturn:"♄",uranus:"♅",neptune:"♆",pluto:"♇",rahu:"☊",ketu:"☋",ascendant:"Asc",midheaven:"MC","part of fortune":"⊗",vertex:"Vx",lagna:"La","north node":"☊","south node":"☋",chiron:"⚷",lilith:"⚸","black moon lilith":"⚸"},N=n=>V(Re,n);var Pe={aries:"♈",taurus:"♉",gemini:"♊",cancer:"♋",leo:"♌",virgo:"♍",libra:"♎",scorpio:"♏",sagittarius:"♐",capricorn:"♑",aquarius:"♒",pisces:"♓"},L=n=>V(Pe,n);var Z=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];import{html as u,nothing as x}from"lit";import{property as g,state as f}from"lit/decorators.js";import{ifDefined as w}from"lit/directives/if-defined.js";var W=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function K(n){if(n.lang)return n.lang;if(typeof document>"u")return;let t=n.closest?.("[lang]")?.getAttribute("lang");return t||document.documentElement.lang||void 0}var Oe={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function D(n){let t=n.toLowerCase();return W.find(e=>e.toLowerCase()===t)}function J(n){let t=K(n);if(!t)return;let e=D(t);if(e)return e;let r=t.toLowerCase().split("-"),o=r[0];if(o==="zh"){let i=r.find(s=>s==="hans"||s==="hant")??Oe[r[1]??""];return i?D(`zh-${i}`):void 0}return D(o)}import{LitElement as $e}from"lit";var X=`/**
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
`;var Q="roxy-ui-tokens";function ee(){if(typeof document>"u")return null;let n=document.getElementById(Q);if(n)return n;let t=document.createElement("style");return t.id=Q,t.textContent=X,document.head.prepend(t),t}var te="__ROXY_UI_I18N__";function ne(){let n=globalThis,t=n[te];if(t)return t;let e={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return n[te]=e,e}function Le(n,t){return t?n.replace(/\{\{(\w+)\}\}/g,(e,r)=>r in t?String(t[r]??""):e):n}function re(n,t,e){return Le(Fe(n,t)??t,e)}function Fe(n,t){if(!n)return;let{catalogs:e}=ne(),r=n.toLowerCase();return(e[r]??e[r.split("-")[0]])?.[O(t)]}function oe(n){let{listeners:t}=ne();return t.add(n),()=>{t.delete(n)}}var F=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){this.unsubscribe=oe(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var $=class extends $e{constructor(){super();this.translator=(e,r)=>this.t(e,r);new F(this)}connectedCallback(){super.connectedCallback(),ee()}t(e,r){return re(this.effectiveLang(),e,r)}effectiveLang(){return K(this)}};import{css as Ae}from"lit";import{css as Ce}from"lit";var ie=Ce`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var Me=Ae`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,C=[Me,ie];var Ie="__cols",Ge="__rows";function Ne(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function A(n){if(Array.isArray(n)){let i=!1,s=n.map(l=>{let c=A(l);return c!==l&&(i=!0),c});return i?s:n}if(!Ne(n))return n;let t=n[Ie],e=n[Ge];if(Array.isArray(t)&&Array.isArray(e)&&Object.keys(n).length===2)return e.map(i=>{let s={};return t.forEach((l,c)=>{s[l]=A(i[c])}),s});let r=!1,o={};for(let[i,s]of Object.entries(n)){let l=A(s);l!==s&&(r=!0),o[i]=l}return r?o:n}function se(n){return A(n)}function ae(n,t){return n.find(e=>e.attrs&&Object.entries(e.attrs).every(([r,o])=>t[r]===o))??n[0]}var De="pk_live_YOUR_KEY",de={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function le(n){if(n)return n===De?de.sample:n.startsWith("pk_")?void 0:de.secret}function ce(n,t,e={}){e.warn&&console.warn(t.message),n.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:t.reason,message:t.message},bubbles:!0,composed:!0}))}var pe="https://roxyapi.com/api/v2";async function Ke(n){try{let t=await n.json();if(t?.error){let e=t.code==="validation_error"&&Array.isArray(t.issues)?t.issues.filter(r=>typeof r.path=="string"&&typeof r.message=="string").map(r=>({path:r.path,message:r.message})):null;return{message:t.error,issues:e?.length?e:null,worded:!0}}}catch{}return{message:`Request failed (${n.status})`,issues:null,worded:!1}}var he={fromAttribute:n=>{if(n!=null){try{let t=JSON.parse(n);if(t&&typeof t=="object"&&!Array.isArray(t))return t}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},v=class extends Error{constructor(e,r=null,o=!0){super(e);this.issues=r;this.worded=o}};function ue(n){return n.submitUrl?void 0:le(n.publishableKey)}async function z(n,t,e){let r=ue(n);if(r)throw new v(r.message);let o=n.submitUrl?await fetch(n.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:ze(t,n.submitContext),signal:e}):await _e(n,t,e);if(!o.ok){let i=await Ke(o);throw new v(i.message,i.issues,i.worded)}return await o.json()}function ze(n,t){return JSON.stringify(t?{...n,context:t}:n)}function _e(n,t,e){let r=new URL(`${n.baseUrl??pe}${t.path}`,document.baseURI);for(let[i,s]of Object.entries(t.query??{}))s!=null&&r.searchParams.set(i,String(s));let o={Accept:"application/json"};return n.publishableKey&&(o["X-API-Key"]=n.publishableKey),t.body!=null&&(o["Content-Type"]="application/json"),fetch(r,{method:t.method??"GET",headers:o,body:t.body!=null?JSON.stringify(t.body):void 0,signal:e})}var M=class{constructor(t){this.baseUrl=pe;this.worded=!0;this.host=t,t.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(t){this.worded=!0;let e=ue(this);if(e){this.host.error=e.message,ce(this.host,e);return}this.abort?.abort();let r=new AbortController;this.abort=r,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let o=await z(this,t,r.signal);if(r.signal.aborted)return;this.host.data=o}catch(o){if(r.signal.aborted||o?.name==="AbortError")return;o instanceof v&&(this.host.issues=o.issues),this.worded=o instanceof v&&o.worded,this.host.error=o instanceof Error?o.message:String(o)}finally{this.abort===r&&(this.abort=void 0),r.signal.aborted||(this.host.loading=!1)}}};function ge(n,t,e,r=[]){let o={...e},i=`/${n.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(h,m)=>{let E=o[m];return delete o[m],encodeURIComponent(String(E??""))}),s=new Set(r),l={},c={};for(let[h,m]of Object.entries(o))m===void 0||m===""||(t==="GET"||s.has(h)?l[h]=m:c[h]=m);return{path:i,method:t,query:l,body:t==="POST"?c:void 0}}import{css as Be,html as _,nothing as U}from"lit";import{css as Ue,html as je}from"lit";function ye(){return je`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var Mt=Ue`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var Dt=Be`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function me(n,t,e){let r=n.filter(o=>!!o.body);return r.length===0?U:_`<section class="block" part="section readings"><h3>${e}</h3>${r.map((o,i)=>_`<details class="interp-card" part="reading" name="${t}" ?open="${i===0}"><summary><span class="interp-lead">${o.label}</span> ${ye()} ${o.aside?_`<span class="interp-aside"><small>${o.aside}</small></span>`:U}</summary><div class="interp-body"><p>${o.body}</p>${o.extra??U}</div></details>`)}</section>`}var qe="roxy-data";function He(n){return n.nodeName==="SCRIPT"&&n.getAttribute("type")==="application/json"}var I=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){if(this.host.data!=null)return;let t=this.read();t!==void 0&&(this.host.data=t,this.host.requestUpdate())}read(){let t=this.findInlineScript();return t?this.parse(t.textContent):void 0}findInlineScript(){for(let t of Array.from(this.host.children))if(He(t)&&t.classList.contains(qe))return t;return null}parse(t){if(t?.trim())try{return JSON.parse(t)}catch{return}}};var d=class extends ${constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let e=this.lastRequest,r=this.listKey,o=this.listRows();if(!(!e||!r||!o)){this.moreLoading=!0,this.moreError=null;try{let i=await z(this.fetcher,{...e,query:{...e.query,offset:o.length}});if(this.lastRequest!==e)return;let s=i[r];this.data={...this.data,...i,[r]:[...o,...Array.isArray(s)?s:[]]}}catch(i){this.lastRequest===e&&(this.moreError=i instanceof Error?i.message:String(i))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=e=>{let r=this.selfFetch();if(!r)return;let o=e.detail;this.lastValues=o.values,this.sticky=!!o.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(o.values),this.fetchFresh(ge(r.endpoint,r.method,o.values,o.queryKeys??[]))};new I(this),this.fetcher=new M(this)}static{this.styles=[C]}static{this.endpoints=[]}willUpdate(e){if(e.has("data")&&this.data!=null){let r=se(this.data);r!==this.data&&(this.data=r)}(e.has("publishableKey")||e.has("baseUrl")||e.has("submitUrl")||e.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let e=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:ae(this.constructor.endpoints,this);return e&&{endpoint:e.endpoint,method:this.method??e.method}}render(){return u`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(e){try{return this.renderData(e)}catch(r){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,r),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:r},bubbles:!0,composed:!0})),customElements.get("roxy-data")?u`<roxy-data .data="${e}" lang="${w(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let e=this.hideSections.split(",").map(o=>o.trim().toLowerCase()).filter(o=>/^[a-z][a-z0-9-]*$/.test(o));if(e.length===0)return x;let r=e.map(o=>`[part~="${o}"],roxy-endpoint-form::part(${o}){display:none!important}`).join("");return u`<style>${r}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?u`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(e,r,o){return this.hideReadings?x:me(e,r,this.t(o??"Reading"))}renderResult(e){let r=u`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(e)}`;return this.showAttribution()?u`${r}${this.renderAttribution()}`:r}renderWithForm(e){return u`${this.renderForm()}${e}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?x:this.renderErrorBanner(this.error):this.data==null?x:this.showAttribution()?u`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let e=this.listRows(),r=this.data?.total;return!this.lastRequest||!e||typeof r!="number"?x:e.length>=r?x:u`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?u`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:x}</div>`}listRows(){let e=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(e)?e:void 0}fetchFresh(e){return this.lastRequest=e,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(e)}load(e){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(e)}pickRow(e){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:e,bubbles:!0,composed:!0})),this.openRow(e.id)}openRow(e){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let r=this.openedRow??document.createElement(this.rowDetail.tag);r.publishableKey=this.publishableKey,r.baseUrl=this.baseUrl,r.submitUrl=this.submitUrl,r.submitContext=this.submitContext,r.hideReadings=this.hideReadings,r.hideSections=this.hideSections;let o=this.effectiveLang();o&&r.setAttribute("lang",o),this.openedRow=r,this.openedRowId=e,r.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(e))}`,method:"GET",query:{lang:J(this)}}).then(()=>r.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return u`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(x):this.renderEmpty()}renderForm(){let e=this.selfFetch();return u`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${e?.endpoint??""}" method="${e?.method??"POST"}" spec-url="${w(this.specUrl)}" publishable-key="${w(this.publishableKey)}" location-url="${w(this.locationUrl)}" submit-label="${w(this.submitLabel)}" lang="${w(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let e=sessionStorage.getItem(this.rememberKey());return e?JSON.parse(e):void 0}catch{return}}writeRemembered(e){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(e))}catch{}}renderEmpty(){return u`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return u`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(e){let r=!!this.selfFetch();if(r&&this.issues)return this.renderForm();let o=this.renderErrorBanner(e);return r?u`${o}${this.renderForm()}`:o}renderErrorBanner(e){return u`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(e)}</div>`}};a([g({attribute:!1})],d.prototype,"data",2),a([g({type:String,attribute:"data-endpoint"})],d.prototype,"endpoint",2),a([g({type:String})],d.prototype,"method",2),a([g({type:String,attribute:"publishable-key"})],d.prototype,"publishableKey",2),a([g({type:String,attribute:"base-url"})],d.prototype,"baseUrl",2),a([g({type:String,attribute:"spec-url"})],d.prototype,"specUrl",2),a([g({type:String,attribute:"submit-url"})],d.prototype,"submitUrl",2),a([g({attribute:"submit-context",converter:he})],d.prototype,"submitContext",2),a([g({type:String,attribute:"location-url"})],d.prototype,"locationUrl",2),a([g({type:Boolean})],d.prototype,"remember",2),a([g({type:Boolean,attribute:"hide-readings",reflect:!0})],d.prototype,"hideReadings",2),a([g({type:String,attribute:"hide-sections",reflect:!0})],d.prototype,"hideSections",2),a([g({type:String,attribute:"submit-label"})],d.prototype,"submitLabel",2),a([g({type:String,attribute:"error-message"})],d.prototype,"errorMessage",2),a([g({type:String})],d.prototype,"attribution",2),a([f()],d.prototype,"loading",2),a([f()],d.prototype,"error",2),a([f()],d.prototype,"issues",2),a([f()],d.prototype,"selfFetched",2),a([f()],d.prototype,"editing",2),a([f()],d.prototype,"sticky",2),a([f()],d.prototype,"openedRow",2),a([f()],d.prototype,"openedRowId",2),a([f()],d.prototype,"moreLoading",2),a([f()],d.prototype,"moreError",2);var fe=n=>t=>{customElements.get(n)||customElements.define(n,t)};function xe(n){let t=Math.floor(n);return{degree:t,minute:Math.floor((n-t)*60)}}var Ye=/^\d{4}-\d{2}-\d{2}$/,Ve=/^\d{4}-\d{2}$/,Ze=/^\d{2}:\d{2}(:\d{2})?$/,We=/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/,be=new Map;function j(n){if(!n)return["en"];let t=be.get(n);if(t)return[t,"en"];let e="en";try{e=Intl.getCanonicalLocales(n)[0]??"en"}catch{e="en"}return be.set(n,e),[e,"en"]}function Je(n,t){return n&&t?`${n} - ${t}`:n||t}function ve(n){let t=Ze.test(n)?`1970-01-01T${n}`:Ye.test(n)?`${n}T00:00:00`:Ve.test(n)?`${n}-01T00:00:00`:We.test(n)?n.replace(" ","T"):null;return t?{d:new Date(`${t}Z`),timeZone:"UTC"}:{d:new Date(n)}}function G(n,t){if(typeof t!="string"||t.length===0)return"";let{d:e,timeZone:r}=ve(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(j(n),{month:"short",day:"numeric",timeZone:r})}function we(n,t,e){let r=G(n,t),o=G(n,e);return r===o?r:Je(r,o)}function Se(n,t){if(typeof t!="string"||t.length===0)return"";let{d:e,timeZone:r}=ve(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(j(n),{weekday:"short",day:"numeric",timeZone:r})}function ke(n,t,e){return typeof t!="number"||!Number.isFinite(t)||typeof e!="number"||!Number.isInteger(e)||e<1||e>12?"":new Date(Date.UTC(t,e-1,1,12)).toLocaleDateString(j(n),{month:"long",year:"numeric",timeZone:"UTC"})}var Xe="Localized";function k(n,t,e){let r=n,o=r?.[`${t}${Xe}`];if(typeof o=="string"&&o!=="")return o;if(e!==void 0)return e;let i=r?.[t];return typeof i=="string"?i:""}var tt="12:00 UTC",b=class extends d{constructor(){super(...arguments);this.heading="Ephemeris"}renderData(e){if(!e.days?.length)return this.renderEmpty();let r=this.toViewModel(e),o=this.effectiveLang();return p`<div class="wrap" part="card"><header part="header"><h2>${this.t(this.heading)}</h2><p class="month roxy-label"><span>${ke(o,r.year,r.month)}</span><span>${tt}</span></p></header>${this.renderSignKey(r.signs)}<section part="section changes"><h3>${this.t("Sign changes and retrograde periods")}</h3><div role="list">${r.bodies.map(i=>this.renderTrack(i))}</div></section><section part="section daily"><h3>${this.t("Daily positions")}</h3><div class="scroll" part="table" tabindex="0" aria-label="${this.t("Daily positions")}">${this.renderGrid(r)}</div></section></div>`}renderSignKey(e){return e.length===0?T:p`<section part="section legend"><h3>${this.t("Signs in this month")}</h3><ul class="signkey" role="list">${e.map(r=>p`<li class="signkey-item"><span class="signkey-glyph" aria-hidden="true">${r.glyph}</span>${r.label}</li>`)}</ul></section>`}renderTrack(e){let r=N(e.name);return p`<div class="track" role="listitem"><span class="body-name">${r?p`<span class="glyph" aria-hidden="true">${r}</span>`:T}${e.label} </span><span class="span">${this.renderPosition(e.first)}<span class="arrow" aria-hidden="true">→</span>${this.renderPosition(e.last)} </span>${e.ingresses.length||e.retrogrades.length?p`<span class="chips roxy-chips">${e.ingresses.map(o=>this.renderIngressChip(o))} ${e.retrogrades.map(o=>this.renderRetrogradeChip(o))}</span>`:T}</div>`}renderPosition(e){let{degree:r,minute:o}=xe(e.degreeInSign),i=L(e.sign),s=k(e,"sign");return p`<span class="pos" title="${s}">${r}${i?p`<span class="sg" aria-hidden="true">${i}</span>`:p`<span class="sg">${s}</span>`}${String(o).padStart(2,"0")}</span>`}renderIngressChip(e){let r=L(e.sign),o=G(this.effectiveLang(),e.date);return p`<span class="roxy-chip chip--ingress" aria-label="${this.t("Enters {{sign}} on {{date}}",{sign:e.signLabel,date:o})}"><span aria-hidden="true">→</span>${r?p`<span aria-hidden="true">${r}</span>`:T}${e.signLabel} <span class="chip-date">${o}</span></span>`}renderRetrogradeChip(e){let r=we(this.effectiveLang(),e.start,e.end);return p`<span class="roxy-chip chip--retro" data-tone="danger"><span aria-hidden="true">℞</span>${this.t("Retrograde {{range}}",{range:r})}</span>`}renderGrid(e){let r=this.effectiveLang();return p`<table><caption class="roxy-sr-only">${this.t("Every body with its position on each day of the month, as a zodiac sign and a degree.")}</caption><thead><tr><th scope="col" class="day">${this.t("Date")}</th>${e.bodies.map(o=>{let i=N(o.name);return p`<th scope="col" title="${o.label}">${i?p`<span class="glyph" aria-hidden="true">${i}</span><span class="roxy-sr-only">${o.label}</span>`:o.label}</th>`})}</tr></thead><tbody>${e.rows.map(o=>p`<tr><th scope="row" class="day">${Se(r,o.date)}</th>${o.cells.map((i,s)=>this.renderCell(i,e.bodies[s],o.date))}</tr>`)}</tbody></table>`}renderCell(e,r,o){if(!e)return p`<td>—</td>`;let i=[e.isRetrograde?"retro":"",r?.ingressDates.has(o)?"ingress":"",r?.stationDates.has(o)?"station":""].filter(Boolean).join(" ");return p`<td class="${i}">${this.renderPosition(e)}${e.isRetrograde?p`<span class="retro-mark" aria-label="${this.t("retrograde")}">℞</span>`:T}</td>`}toViewModel(e){let r=[],o=new Map;for(let l of e.days)for(let c of l.positions){let h=o.get(c.planet);h||(h=[],o.set(c.planet,h),r.push(c.planet)),h.push({date:l.date,p:c})}let i=[];for(let l of r){let c=o.get(l),h=c?.[0],m=c?.[c.length-1];if(!c||!h||!m)continue;let E=[],R=[],B=new Set,q=new Set;for(let P=0;P<c.length;P++){let y=c[P],S=c[P-1];if(!y||(S&&y.p.sign!==S.p.sign&&(E.push({date:y.date,sign:y.p.sign,signLabel:k(y.p,"sign")}),B.add(y.date)),S&&y.p.isRetrograde!==S.p.isRetrograde&&q.add(y.date),!y.p.isRetrograde))continue;let H=R[R.length-1];H&&S?.p.isRetrograde?H.end=y.date:R.push({start:y.date,end:y.date})}i.push({name:l,label:k(m.p,"planet"),first:h.p,last:m.p,ingresses:E,retrogrades:R,ingressDates:B,stationDates:q})}let s=e.days.map(l=>{let c=new Map(l.positions.map(h=>[h.planet,h]));return{date:l.date,cells:i.map(h=>c.get(h.name))}});return{year:e.year,month:e.month,bodies:i,rows:s,signs:this.toSignKey(e)}}toSignKey(e){let r=new Map;for(let i of e.days)for(let s of i.positions){let l=String(s.sign??"").toLowerCase();l&&!r.has(l)&&r.set(l,k(s,"sign"))}let o=[];for(let i of Z){let s=r.get(i.toLowerCase()),l=L(i);s&&l&&o.push({sign:i,label:s,glyph:l})}return o}};b.endpoints=Y,b.styles=[C,Qe`:host{overflow-x:clip}.wrap{gap:var(--roxy-space-lg);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,1fr);display:grid}.wrap>*{min-width:0}h2,h3,p{margin:0}header,section{gap:var(--roxy-space-sm);display:grid}.month{gap:var(--roxy-space-xs) var(--roxy-space-sm);flex-wrap:wrap;display:flex}.signkey{gap:var(--roxy-space-xs) var(--roxy-space-md);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}.signkey-item{align-items:baseline;gap:var(--roxy-space-xs);color:var(--roxy-muted);font-size:var(--roxy-text-xs);white-space:nowrap;display:inline-flex}.signkey-glyph{color:var(--roxy-fg);font-size:var(--roxy-text-sm)}.track{align-items:center;gap:var(--roxy-space-xs) var(--roxy-space-sm);padding-block:var(--roxy-space-sm);border-block-start:1px solid var(--roxy-border);font-size:var(--roxy-text-sm);flex-wrap:wrap;display:flex}.body-name{align-items:baseline;gap:var(--roxy-space-xs);min-inline-size:16ch;font-weight:var(--roxy-weight-bold);display:inline-flex}.body-name .glyph{color:var(--roxy-accent-ink)}.span{align-items:baseline;gap:var(--roxy-space-xs);color:var(--roxy-secondary);font-variant-numeric:tabular-nums;white-space:nowrap;display:inline-flex}.arrow{color:var(--roxy-muted)}.chips{margin-inline-start:auto}.chip-date{color:var(--roxy-muted)}.scroll{min-width:0;overflow-x:auto}table{font-size:var(--roxy-text-xs)}:is(th,td){white-space:nowrap}thead th .glyph{color:var(--roxy-fg);font-size:var(--roxy-text-sm)}th.day{z-index:1;background:var(--roxy-bg);color:var(--roxy-fg);border-inline-end:1px solid var(--roxy-border);position:sticky;left:0}thead th.day{z-index:2}.sg{margin-inline:calc(var(--roxy-space-unit) / 2);color:var(--roxy-secondary);font-variant-numeric:normal}.retro-mark{font-weight:var(--roxy-weight-bold);margin-inline-start:calc(var(--roxy-space-unit) / 2)}td.retro,td.retro .sg{color:var(--roxy-danger-fg)}td.ingress{box-shadow:inset var(--roxy-line-thick) 0 var(--roxy-accent-ink);font-weight:var(--roxy-weight-bold)}td.station{border-block-start:var(--roxy-line-thick) solid var(--roxy-danger-fg);font-weight:var(--roxy-weight-bold)}`],a([et({type:String})],b.prototype,"heading",2),b=a([fe("roxy-ephemeris-table")],b);export{b as RoxyEphemerisTable};
