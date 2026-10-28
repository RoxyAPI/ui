var ue=Object.defineProperty;var me=Object.getOwnPropertyDescriptor;var d=(r,t,e,n)=>{for(var o=n>1?void 0:n?me(t,e):t,i=r.length-1,s;i>=0;i--)(s=r[i])&&(o=(n?s(t,e,o):s(o))||o);return n&&o&&ue(t,e,o),o};import{css as je,html as c,nothing as h}from"lit";var D=[{endpoint:"iching/hexagrams/random",method:"GET"},{endpoint:"iching/hexagrams/{number}",method:"GET"},{endpoint:"iching/hexagrams/lookup",method:"GET"},{endpoint:"iching/cast",method:"GET"},{endpoint:"iching/daily",method:"POST"},{endpoint:"iching/daily/cast",method:"POST"}];function k(r){return r.toLowerCase().replace(/[\s_-]+/g," ").trim()}var ge=(r,t)=>t?r[k(t)]:void 0;var ye={heaven:"☰",lake:"☱",fire:"☲",thunder:"☳",wind:"☴",water:"☵",mountain:"☶",earth:"☷"},$=r=>ge(ye,r);import{html as u,nothing as x}from"lit";import{property as m,state as y}from"lit/decorators.js";import{ifDefined as w}from"lit/directives/if-defined.js";var H=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function G(r){if(r.lang)return r.lang;if(typeof document>"u")return;let t=r.closest?.("[lang]")?.getAttribute("lang");return t||document.documentElement.lang||void 0}var fe={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function A(r){let t=r.toLowerCase();return H.find(e=>e.toLowerCase()===t)}function z(r){let t=G(r);if(!t)return;let e=A(t);if(e)return e;let n=t.toLowerCase().split("-"),o=n[0];if(o==="zh"){let i=n.find(s=>s==="hans"||s==="hant")??fe[n[1]??""];return i?A(`zh-${i}`):void 0}return A(o)}import{LitElement as ve}from"lit";var j=`/**
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
`;var K="roxy-ui-tokens";function M(){if(typeof document>"u")return null;let r=document.getElementById(K);if(r)return r;let t=document.createElement("style");return t.id=K,t.textContent=j,document.head.prepend(t),t}var q="__ROXY_UI_I18N__";function B(){let r=globalThis,t=r[q];if(t)return t;let e={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return r[q]=e,e}function xe(r,t){return t?r.replace(/\{\{(\w+)\}\}/g,(e,n)=>n in t?String(t[n]??""):e):r}function Y(r,t,e){return xe(be(r,t)??t,e)}function be(r,t){if(!r)return;let{catalogs:e}=B(),n=r.toLowerCase();return(e[n]??e[n.split("-")[0]])?.[k(t)]}function Z(r){let{listeners:t}=B();return t.add(r),()=>{t.delete(r)}}var T=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){this.unsubscribe=Z(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var E=class extends ve{constructor(){super();this.translator=(e,n)=>this.t(e,n);new T(this)}connectedCallback(){super.connectedCallback(),M()}t(e,n){return Y(this.effectiveLang(),e,n)}effectiveLang(){return G(this)}};import{css as Se}from"lit";import{css as we}from"lit";var V=we`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var ke=Se`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,R=[ke,V];var Te="__cols",Ee="__rows";function Re(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function O(r){if(Array.isArray(r)){let i=!1,s=r.map(p=>{let l=O(p);return l!==p&&(i=!0),l});return i?s:r}if(!Re(r))return r;let t=r[Te],e=r[Ee];if(Array.isArray(t)&&Array.isArray(e)&&Object.keys(r).length===2)return e.map(i=>{let s={};return t.forEach((p,l)=>{s[p]=O(i[l])}),s});let n=!1,o={};for(let[i,s]of Object.entries(r)){let p=O(s);p!==s&&(n=!0),o[i]=p}return n?o:r}function J(r){return O(r)}function W(r,t){return r.find(e=>e.attrs&&Object.entries(e.attrs).every(([n,o])=>t[n]===o))??r[0]}var Oe="pk_live_YOUR_KEY",X={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function Q(r){if(r)return r===Oe?X.sample:r.startsWith("pk_")?void 0:X.secret}function ee(r,t,e={}){e.warn&&console.warn(t.message),r.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:t.reason,message:t.message},bubbles:!0,composed:!0}))}var te="https://roxyapi.com/api/v2";async function Pe(r){try{let t=await r.json();if(t?.error){let e=t.code==="validation_error"&&Array.isArray(t.issues)?t.issues.filter(n=>typeof n.path=="string"&&typeof n.message=="string").map(n=>({path:n.path,message:n.message})):null;return{message:t.error,issues:e?.length?e:null,worded:!0}}}catch{}return{message:`Request failed (${r.status})`,issues:null,worded:!1}}var re={fromAttribute:r=>{if(r!=null){try{let t=JSON.parse(r);if(t&&typeof t=="object"&&!Array.isArray(t))return t}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},v=class extends Error{constructor(e,n=null,o=!0){super(e);this.issues=n;this.worded=o}};function ne(r){return r.submitUrl?void 0:Q(r.publishableKey)}async function I(r,t,e){let n=ne(r);if(n)throw new v(n.message);let o=r.submitUrl?await fetch(r.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Ce(t,r.submitContext),signal:e}):await Le(r,t,e);if(!o.ok){let i=await Pe(o);throw new v(i.message,i.issues,i.worded)}return await o.json()}function Ce(r,t){return JSON.stringify(t?{...r,context:t}:r)}function Le(r,t,e){let n=new URL(`${r.baseUrl??te}${t.path}`,document.baseURI);for(let[i,s]of Object.entries(t.query??{}))s!=null&&n.searchParams.set(i,String(s));let o={Accept:"application/json"};return r.publishableKey&&(o["X-API-Key"]=r.publishableKey),t.body!=null&&(o["Content-Type"]="application/json"),fetch(n,{method:t.method??"GET",headers:o,body:t.body!=null?JSON.stringify(t.body):void 0,signal:e})}var P=class{constructor(t){this.baseUrl=te;this.worded=!0;this.host=t,t.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(t){this.worded=!0;let e=ne(this);if(e){this.host.error=e.message,ee(this.host,e);return}this.abort?.abort();let n=new AbortController;this.abort=n,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let o=await I(this,t,n.signal);if(n.signal.aborted)return;this.host.data=o}catch(o){if(n.signal.aborted||o?.name==="AbortError")return;o instanceof v&&(this.host.issues=o.issues),this.worded=o instanceof v&&o.worded,this.host.error=o instanceof Error?o.message:String(o)}finally{this.abort===n&&(this.abort=void 0),n.signal.aborted||(this.host.loading=!1)}}};function oe(r,t,e,n=[]){let o={...e},i=`/${r.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(f,g)=>{let b=o[g];return delete o[g],encodeURIComponent(String(b??""))}),s=new Set(n),p={},l={};for(let[f,g]of Object.entries(o))g===void 0||g===""||(t==="GET"||s.has(f)?p[f]=g:l[f]=g);return{path:i,method:t,query:p,body:t==="POST"?l:void 0}}import{css as Ae,html as N,nothing as U}from"lit";import{css as Fe,html as $e}from"lit";function C(){return $e`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var ie=Fe`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var se=Ae`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function ae(r,t,e){let n=r.filter(o=>!!o.body);return n.length===0?U:N`<section class="block" part="section readings"><h3>${e}</h3>${n.map((o,i)=>N`<details class="interp-card" part="reading" name="${t}" ?open="${i===0}"><summary><span class="interp-lead">${o.label}</span> ${C()} ${o.aside?N`<span class="interp-aside"><small>${o.aside}</small></span>`:U}</summary><div class="interp-body"><p>${o.body}</p>${o.extra??U}</div></details>`)}</section>`}var Ge="roxy-data";function Ie(r){return r.nodeName==="SCRIPT"&&r.getAttribute("type")==="application/json"}var L=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){if(this.host.data!=null)return;let t=this.read();t!==void 0&&(this.host.data=t,this.host.requestUpdate())}read(){let t=this.findInlineScript();return t?this.parse(t.textContent):void 0}findInlineScript(){for(let t of Array.from(this.host.children))if(Ie(t)&&t.classList.contains(Ge))return t;return null}parse(t){if(t?.trim())try{return JSON.parse(t)}catch{return}}};var a=class extends E{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let e=this.lastRequest,n=this.listKey,o=this.listRows();if(!(!e||!n||!o)){this.moreLoading=!0,this.moreError=null;try{let i=await I(this.fetcher,{...e,query:{...e.query,offset:o.length}});if(this.lastRequest!==e)return;let s=i[n];this.data={...this.data,...i,[n]:[...o,...Array.isArray(s)?s:[]]}}catch(i){this.lastRequest===e&&(this.moreError=i instanceof Error?i.message:String(i))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=e=>{let n=this.selfFetch();if(!n)return;let o=e.detail;this.lastValues=o.values,this.sticky=!!o.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(o.values),this.fetchFresh(oe(n.endpoint,n.method,o.values,o.queryKeys??[]))};new L(this),this.fetcher=new P(this)}static{this.styles=[R]}static{this.endpoints=[]}willUpdate(e){if(e.has("data")&&this.data!=null){let n=J(this.data);n!==this.data&&(this.data=n)}(e.has("publishableKey")||e.has("baseUrl")||e.has("submitUrl")||e.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let e=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:W(this.constructor.endpoints,this);return e&&{endpoint:e.endpoint,method:this.method??e.method}}render(){return u`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(e){try{return this.renderData(e)}catch(n){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,n),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:n},bubbles:!0,composed:!0})),customElements.get("roxy-data")?u`<roxy-data .data="${e}" lang="${w(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let e=this.hideSections.split(",").map(o=>o.trim().toLowerCase()).filter(o=>/^[a-z][a-z0-9-]*$/.test(o));if(e.length===0)return x;let n=e.map(o=>`[part~="${o}"],roxy-endpoint-form::part(${o}){display:none!important}`).join("");return u`<style>${n}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?u`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(e,n,o){return this.hideReadings?x:ae(e,n,this.t(o??"Reading"))}renderResult(e){let n=u`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(e)}`;return this.showAttribution()?u`${n}${this.renderAttribution()}`:n}renderWithForm(e){return u`${this.renderForm()}${e}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?x:this.renderErrorBanner(this.error):this.data==null?x:this.showAttribution()?u`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let e=this.listRows(),n=this.data?.total;return!this.lastRequest||!e||typeof n!="number"?x:e.length>=n?x:u`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?u`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:x}</div>`}listRows(){let e=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(e)?e:void 0}fetchFresh(e){return this.lastRequest=e,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(e)}load(e){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(e)}pickRow(e){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:e,bubbles:!0,composed:!0})),this.openRow(e.id)}openRow(e){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let n=this.openedRow??document.createElement(this.rowDetail.tag);n.publishableKey=this.publishableKey,n.baseUrl=this.baseUrl,n.submitUrl=this.submitUrl,n.submitContext=this.submitContext,n.hideReadings=this.hideReadings,n.hideSections=this.hideSections;let o=this.effectiveLang();o&&n.setAttribute("lang",o),this.openedRow=n,this.openedRowId=e,n.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(e))}`,method:"GET",query:{lang:z(this)}}).then(()=>n.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return u`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(x):this.renderEmpty()}renderForm(){let e=this.selfFetch();return u`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${e?.endpoint??""}" method="${e?.method??"POST"}" spec-url="${w(this.specUrl)}" publishable-key="${w(this.publishableKey)}" location-url="${w(this.locationUrl)}" submit-label="${w(this.submitLabel)}" lang="${w(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let e=sessionStorage.getItem(this.rememberKey());return e?JSON.parse(e):void 0}catch{return}}writeRemembered(e){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(e))}catch{}}renderEmpty(){return u`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return u`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(e){let n=!!this.selfFetch();if(n&&this.issues)return this.renderForm();let o=this.renderErrorBanner(e);return n?u`${o}${this.renderForm()}`:o}renderErrorBanner(e){return u`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(e)}</div>`}};d([m({attribute:!1})],a.prototype,"data",2),d([m({type:String,attribute:"data-endpoint"})],a.prototype,"endpoint",2),d([m({type:String})],a.prototype,"method",2),d([m({type:String,attribute:"publishable-key"})],a.prototype,"publishableKey",2),d([m({type:String,attribute:"base-url"})],a.prototype,"baseUrl",2),d([m({type:String,attribute:"spec-url"})],a.prototype,"specUrl",2),d([m({type:String,attribute:"submit-url"})],a.prototype,"submitUrl",2),d([m({attribute:"submit-context",converter:re})],a.prototype,"submitContext",2),d([m({type:String,attribute:"location-url"})],a.prototype,"locationUrl",2),d([m({type:Boolean})],a.prototype,"remember",2),d([m({type:Boolean,attribute:"hide-readings",reflect:!0})],a.prototype,"hideReadings",2),d([m({type:String,attribute:"hide-sections",reflect:!0})],a.prototype,"hideSections",2),d([m({type:String,attribute:"submit-label"})],a.prototype,"submitLabel",2),d([m({type:String,attribute:"error-message"})],a.prototype,"errorMessage",2),d([m({type:String})],a.prototype,"attribution",2),d([y()],a.prototype,"loading",2),d([y()],a.prototype,"error",2),d([y()],a.prototype,"issues",2),d([y()],a.prototype,"selfFetched",2),d([y()],a.prototype,"editing",2),d([y()],a.prototype,"sticky",2),d([y()],a.prototype,"openedRow",2),d([y()],a.prototype,"openedRowId",2),d([y()],a.prototype,"moreLoading",2),d([y()],a.prototype,"moreError",2);var de=r=>t=>{customElements.get(r)||customElements.define(r,t)};var Ne=/^\d{4}-\d{2}-\d{2}$/,Ue=/^\d{4}-\d{2}$/,_e=/^\d{2}:\d{2}(:\d{2})?$/,De=/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/,le=new Map;function He(r){if(!r)return["en"];let t=le.get(r);if(t)return[t,"en"];let e="en";try{e=Intl.getCanonicalLocales(r)[0]??"en"}catch{e="en"}return le.set(r,e),[e,"en"]}function ze(r){let t=_e.test(r)?`1970-01-01T${r}`:Ne.test(r)?`${r}T00:00:00`:Ue.test(r)?`${r}-01T00:00:00`:De.test(r)?r.replace(" ","T"):null;return t?{d:new Date(`${t}Z`),timeZone:"UTC"}:{d:new Date(r)}}function ce(r,t){if(typeof t!="string"||t.length===0)return"";let{d:e,timeZone:n}=ze(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(He(r),{month:"short",day:"numeric",year:"numeric",timeZone:n})}var S=class extends a{resolveHexagram(){let t=this.data;if(!t)return null;if("hexagram"in t&&t.hexagram){if("lines"in t){let i=t,s=i.hexagram;return{hex:s,lines:i.lines,date:i.date,changingLinePositions:i.changingLinePositions,changingLines:i.changingLines??s.changingLines,resultingHexagram:i.resultingHexagram}}let n=t,o=n.hexagram;return{hex:o,changingLines:o.changingLines,dailyMessage:n.dailyMessage,date:n.date}}let e=t;return{hex:e,changingLines:e.changingLines}}renderData(){let t=this.resolveHexagram();if(!t)return this.renderEmpty();let{hex:e,lines:n,changingLinePositions:o,changingLines:i,dailyMessage:s,date:p,resultingHexagram:l}=t;return c`<article class="card" part="card" aria-label="${this.t("I Ching hexagram")}">${this.renderHexagram("hexagram",e,n,o,i,s,p)} ${l?c`<details class="result" part="section resulting-hexagram"><summary>${this.t("Becomes hexagram {{number}} {{name}}.",{number:l.number,name:l.english??l.chinese??""})}${C()}</summary><div class="result-chart">${this.renderHexagram("result",l)}</div></details>`:h}</article>`}renderHexagram(t,e,n,o,i,s,p){let l=n??this.derivedLines(e),f=new Set(o??[]),g=!this.hideReadings;return c`<div class="glyphs" part="chart">${e.symbol?c`<div class="symbol">${e.symbol}</div>`:h} ${l.length>0?c`<div class="lines" aria-hidden="true">${l.slice().reverse().map((b,F)=>{let pe=l.length-1-F+1,he=f.has(pe),_=b===6||b===8;return c`<div class="line ${`${_?"broken":"solid"}${he?" changing":""}`}">${_?c`<span class="seg"></span><span class="seg"></span>`:c`<span class="seg"></span>`}</div>`})}</div>`:h}</div><div part="header"><h2>${[e.number!=null?`${e.number}.`:"",e.english??e.chinese??this.t("I Ching hexagram")].filter(Boolean).join(" ")}</h2>${p?c`<time class="daily-date" part="details" datetime="${p}">${ce(this.effectiveLang(),p)}</time>`:h}<p class="subtitle">${e.chinese?c`${e.chinese}`:h} ${e.pinyin?c`· ${e.pinyin}`:h}</p><div class="trigrams roxy-label" part="details">${e.upperTrigram?c`<div>${this.t("Upper")} <span class="tri-glyph">${$(e.upperTrigram)??""}</span>${e.upperTrigram}</div>`:h} ${e.lowerTrigram?c`<div>${this.t("Lower")} <span class="tri-glyph">${$(e.lowerTrigram)??""}</span>${e.lowerTrigram}</div>`:h}</div>${e.judgment&&g?c`<p class="judgment">${e.judgment}</p>`:h} ${e.image&&g?c`<p class="image">${e.image}</p>`:h} ${s&&g?c`<p class="message">${s}</p>`:h} ${e.interpretation?.general&&g?c`<p>${e.interpretation.general}</p>`:h} ${f.size>0?c`<div class="changes" part="section changing-lines">${this.t("Changing lines: {{lines}}.",{lines:Array.from(f).sort((b,F)=>b-F).join(", ")})}</div>`:h} ${this.renderTopics(e,t)} ${this.renderLines(i??e.changingLines,f,`${t}-lines`)}</div>`}renderTopics(t,e){let n=t.interpretation;return n?this.renderInterpretation([{label:this.t("Love"),body:n.love??""},{label:this.t("Career"),body:n.career??""},{label:this.t("Decision"),body:n.decision??""},{label:this.t("Advice"),body:n.advice??""}].filter(o=>o.body),`${e}-topics`,"Readings"):h}renderLines(t,e,n){let o=t??[];if(o.length===0)return h;let i=e.size>0,s=i?o.filter(l=>e.has(l.position)):o;if(s.length===0)return h;let p=s.map(l=>({label:`Line ${l.position}`,body:l.text??"",extra:l.meaning?c`<p class="line-meaning">${l.meaning}</p>`:h}));return this.renderInterpretation(p,n,i?"Changing lines":"Lines")}derivedLines(t){let e=t.binary??"";return/^[01]{6}$/.test(e)?Array.from(e,n=>n==="1"?7:8):[]}};S.endpoints=D,S.styles=[R,ie,se,je`.card{gap:var(--roxy-space-lg);padding:var(--roxy-space-lg);grid-template-columns:minmax(0,4lh) minmax(0,1fr);display:grid}.result-chart{gap:var(--roxy-space-lg);grid-template-columns:minmax(0,4lh) minmax(0,1fr);padding-block-start:var(--roxy-space-md);display:grid}.result{border-block-start:1px solid var(--roxy-border);grid-column:1/-1;padding-block-start:var(--roxy-space-md)}.result>summary{justify-content:space-between;align-items:center;gap:var(--roxy-space-sm);display:flex}@container (width<=480px){.card,.result-chart{grid-template-columns:minmax(0,1fr)}}h2,p{margin:0}.glyphs{align-content:start;align-self:start;justify-items:center;gap:var(--roxy-space-md);display:grid}.symbol{color:var(--roxy-accent-ink);font-size:calc(var(--roxy-text-xl) * 2);line-height:1}.lines{gap:calc(var(--roxy-space-unit) * 1.5);inline-size:2lh;display:grid}.line{gap:var(--roxy-space-xs);grid-template-columns:1fr 1fr;display:grid}.seg{block-size:calc(var(--roxy-line-thick) * 3);background:var(--roxy-fg);display:block}.line.solid .seg{grid-column:1/-1}.line.changing .seg{background:var(--roxy-accent)}.subtitle{color:var(--roxy-muted);font-size:var(--roxy-text-sm);margin-block-end:var(--roxy-space-sm)}.daily-date{color:var(--roxy-secondary);font-size:var(--roxy-text-sm);margin-block-end:var(--roxy-space-sm);display:block}.trigrams{gap:var(--roxy-space-md);flex-wrap:wrap;margin-block-end:var(--roxy-space-sm);display:flex}.tri-glyph{color:var(--roxy-accent-ink);font-size:var(--roxy-text-xl);vertical-align:middle;margin-inline-end:var(--roxy-space-xs)}.judgment,.image,.message{font-size:var(--roxy-text-sm);margin-block-end:var(--roxy-space-sm)}.judgment:before{content:"Judgment. ";color:var(--roxy-secondary);font-weight:var(--roxy-weight-bold)}.image:before{content:"Image. ";color:var(--roxy-secondary);font-weight:var(--roxy-weight-bold)}.line-meaning{border-inline-start:var(--roxy-line-thick) solid var(--roxy-border);color:var(--roxy-muted);padding-inline-start:var(--roxy-space-sm)}.changes{border-block-start:1px solid var(--roxy-border);color:var(--roxy-accent-ink);font-size:var(--roxy-text-sm);margin-block-start:var(--roxy-space-md);padding-block-start:var(--roxy-space-md)}`],S=d([de("roxy-hexagram")],S);export{S as RoxyHexagram};
