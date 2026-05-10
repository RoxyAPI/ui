"use strict";var RoxyUI_numerology_card=(()=>{var H=Object.defineProperty;var se=Object.getOwnPropertyDescriptor;var Se=Object.getOwnPropertyNames;var Ee=Object.prototype.hasOwnProperty;var we=(i,e)=>{for(var t in e)H(i,t,{get:e[t],enumerable:!0})},Ce=(i,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Se(e))!Ee.call(i,s)&&s!==t&&H(i,s,{get:()=>e[s],enumerable:!(r=se(e,s))||r.enumerable});return i};var Pe=i=>Ce(H({},"__esModule",{value:!0}),i),z=(i,e,t,r)=>{for(var s=r>1?void 0:r?se(e,t):e,o=i.length-1,n;o>=0;o--)(n=i[o])&&(s=(r?n(e,t,s):n(s))||s);return r&&s&&H(e,t,s),s};var Ke={};we(Ke,{RoxyNumerologyCard:()=>v});var D=globalThis,L=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),ie=new WeakMap,w=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(L&&e===void 0){let r=t!==void 0&&t.length===1;r&&(e=ie.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&ie.set(t,e))}return e}toString(){return this.cssText}},oe=i=>new w(typeof i=="string"?i:i+"",void 0,V),C=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((r,s,o)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[o+1],i[0]);return new w(t,i,V)},ne=(i,e)=>{if(L)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let r=document.createElement("style"),s=D.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=t.cssText,i.appendChild(r)}},K=L?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return oe(t)})(i):i;var{is:Re,defineProperty:Ue,getOwnPropertyDescriptor:Ne,getOwnPropertyNames:Oe,getOwnPropertySymbols:Me,getPrototypeOf:ke}=Object,j=globalThis,ae=j.trustedTypes,Te=ae?ae.emptyScript:"",He=j.reactiveElementPolyfillSupport,P=(i,e)=>i,R={toAttribute(i,e){switch(e){case Boolean:i=i?Te:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},q=(i,e)=>!Re(i,e),le={attribute:!0,type:String,converter:R,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??=Symbol("metadata"),j.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=le){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(e,r,t);s!==void 0&&Ue(this.prototype,e,s)}}static getPropertyDescriptor(e,t,r){let{get:s,set:o}=Ne(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){let c=s?.call(this);o?.call(this,n),this.requestUpdate(e,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??le}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let e=ke(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let t=this.properties,r=[...Oe(t),...Me(t)];for(let s of r)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[r,s]of t)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[t,r]of this.elementProperties){let s=this._$Eu(t,r);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let s of r)t.unshift(K(s))}else e!==void 0&&t.push(K(e));return t}static _$Eu(e,t){let r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ne(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){let r=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,r);if(s!==void 0&&r.reflect===!0){let o=(r.converter?.toAttribute!==void 0?r.converter:R).toAttribute(t,r.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){let r=this.constructor,s=r._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let o=r.getPropertyOptions(s),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:R;this._$Em=s;let c=n.fromAttribute(t,o.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(e,t,r,s=!1,o){if(e!==void 0){let n=this.constructor;if(s===!1&&(o=this[e]),r??=n.getPropertyOptions(e),!((r.hasChanged??q)(o,t)||r.useDefault&&r.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:s,wrapped:o},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,o]of r){let{wrapped:n}=o,c=this[s];n!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,o,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[P("elementProperties")]=new Map,f[P("finalized")]=new Map,He?.({ReactiveElement:f}),(j.reactiveElementVersions??=[]).push("2.1.2");var X=globalThis,ce=i=>i,B=X.trustedTypes,he=B?B.createPolicy("lit-html",{createHTML:i=>i}):void 0,ge="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,ye="?"+y,ze=`<${ye}>`,b=document,N=()=>b.createComment(""),O=i=>i===null||typeof i!="object"&&typeof i!="function",ee=Array.isArray,De=i=>ee(i)||typeof i?.[Symbol.iterator]=="function",W=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,de=/>/g,x=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ue=/'/g,me=/"/g,$e=/^(?:script|style|textarea|title)$/i,te=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),p=te(1),Qe=te(2),Xe=te(3),A=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),fe=new WeakMap,_=b.createTreeWalker(b,129);function ve(i,e){if(!ee(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return he!==void 0?he.createHTML(e):e}var Le=(i,e)=>{let t=i.length-1,r=[],s,o=e===2?"<svg>":e===3?"<math>":"",n=U;for(let c=0;c<t;c++){let a=i[c],d,u,h=-1,m=0;for(;m<a.length&&(n.lastIndex=m,u=n.exec(a),u!==null);)m=n.lastIndex,n===U?u[1]==="!--"?n=pe:u[1]!==void 0?n=de:u[2]!==void 0?($e.test(u[2])&&(s=RegExp("</"+u[2],"g")),n=x):u[3]!==void 0&&(n=x):n===x?u[0]===">"?(n=s??U,h=-1):u[1]===void 0?h=-2:(h=n.lastIndex-u[2].length,d=u[1],n=u[3]===void 0?x:u[3]==='"'?me:ue):n===me||n===ue?n=x:n===pe||n===de?n=U:(n=x,s=void 0);let g=n===x&&i[c+1].startsWith("/>")?" ":"";o+=n===U?a+ze:h>=0?(r.push(d),a.slice(0,h)+ge+a.slice(h)+y+g):a+y+(h===-2?c:g)}return[ve(i,o+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},M=class i{constructor({strings:e,_$litType$:t},r){let s;this.parts=[];let o=0,n=0,c=e.length-1,a=this.parts,[d,u]=Le(e,t);if(this.el=i.createElement(d,r),_.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=_.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(ge)){let m=u[n++],g=s.getAttribute(h).split(y),T=/([.?@])?(.*)/.exec(m);a.push({type:1,index:o,name:T[2],strings:g,ctor:T[1]==="."?G:T[1]==="?"?J:T[1]==="@"?Z:E}),s.removeAttribute(h)}else h.startsWith(y)&&(a.push({type:6,index:o}),s.removeAttribute(h));if($e.test(s.tagName)){let h=s.textContent.split(y),m=h.length-1;if(m>0){s.textContent=B?B.emptyScript:"";for(let g=0;g<m;g++)s.append(h[g],N()),_.nextNode(),a.push({type:2,index:++o});s.append(h[m],N())}}}else if(s.nodeType===8)if(s.data===ye)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(y,h+1))!==-1;)a.push({type:7,index:o}),h+=y.length-1}o++}}static createElement(e,t){let r=b.createElement("template");return r.innerHTML=e,r}};function S(i,e,t=i,r){if(e===A)return e;let s=r!==void 0?t._$Co?.[r]:t._$Cl,o=O(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(i),s._$AT(i,t,r)),r!==void 0?(t._$Co??=[])[r]=s:t._$Cl=s),s!==void 0&&(e=S(i,s._$AS(i,e.values),s,r)),e}var F=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,s=(e?.creationScope??b).importNode(t,!0);_.currentNode=s;let o=_.nextNode(),n=0,c=0,a=r[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new k(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new Q(o,this,e)),this._$AV.push(d),a=r[++c]}n!==a?.index&&(o=_.nextNode(),n++)}return _.currentNode=b,s}p(e){let t=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},k=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,s){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),O(e)?e===l||e==null||e===""?(this._$AH!==l&&this._$AR(),this._$AH=l):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):De(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==l&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(b.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,s=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=M.createElement(ve(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(t);else{let o=new F(s,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o}}_$AC(e){let t=fe.get(e.strings);return t===void 0&&fe.set(e.strings,t=new M(e)),t}k(e){ee(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,s=0;for(let o of e)s===t.length?t.push(r=new i(this.O(N()),this.O(N()),this,this.options)):r=t[s],r._$AI(o),s++;s<t.length&&(this._$AR(r&&r._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let r=ce(e).nextSibling;ce(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,s,o){this.type=1,this._$AH=l,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=l}_$AI(e,t=this,r,s){let o=this.strings,n=!1;if(o===void 0)e=S(this,e,t,0),n=!O(e)||e!==this._$AH&&e!==A,n&&(this._$AH=e);else{let c=e,a,d;for(e=o[0],a=0;a<o.length-1;a++)d=S(this,c[r+a],t,a),d===A&&(d=this._$AH[a]),n||=!O(d)||d!==this._$AH[a],d===l?e=l:e!==l&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!s&&this.j(e)}j(e){e===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},G=class extends E{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===l?void 0:e}},J=class extends E{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==l)}},Z=class extends E{constructor(e,t,r,s,o){super(e,t,r,s,o),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??l)===A)return;let r=this._$AH,s=e===l&&r!==l||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==l&&(r===l||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Q=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}};var je=X.litHtmlPolyfillSupport;je?.(M,k),(X.litHtmlVersions??=[]).push("3.3.2");var xe=(i,e,t)=>{let r=t?.renderBefore??e,s=r._$litPart$;if(s===void 0){let o=t?.renderBefore??null;r._$litPart$=s=new k(e.insertBefore(N(),o),o,void 0,t??{})}return s._$AI(i),s};var re=globalThis,$=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=xe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};$._$litElement$=!0,$.finalized=!0,re.litElementHydrateSupport?.({LitElement:$});var qe=re.litElementPolyfillSupport;qe?.({LitElement:$});(re.litElementVersions??=[]).push("4.2.2");var _e=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};var Be={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:q},Ie=(i=Be,e,t)=>{let{kind:r,metadata:s}=t,o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),r==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(t.name,i),r==="accessor"){let{name:n}=t;return{set(c){let a=e.get.call(this);e.set.call(this,c),this.requestUpdate(n,a,i,!0,c)},init(c){return c!==void 0&&this.C(n,void 0,i,c),c}}}if(r==="setter"){let{name:n}=t;return function(c){let a=this[n];e.call(this,c),this.requestUpdate(n,a,i,!0,c)}}throw Error("Unsupported decorator location: "+r)};function I(i){return(e,t)=>typeof t=="object"?Ie(i,e,t):((r,s,o)=>{let n=s.hasOwnProperty(o);return s.constructor.createProperty(o,r),n?Object.getOwnPropertyDescriptor(s,o):void 0})(i,e,t)}var be=C`
	:host {
		display: block;
		container-type: inline-size;
		font-family: var(
			--roxy-font-sans,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif
		);
		color: var(--roxy-fg, #0a0a0a);
		background: transparent;
		font-size: var(--roxy-text-base, 1rem);
		line-height: var(--roxy-leading-normal, 1.5);
		animation: roxy-fade-in var(--roxy-motion-duration, 200ms)
			var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1)) both;
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	@keyframes roxy-fade-in {
		from {
			opacity: 0;
			transform: translateY(2px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:host {
			animation: none;
		}
	}

	.roxy-skeleton {
		background: linear-gradient(
			90deg,
			var(--roxy-border, #e4e4e7) 0%,
			color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent) 50%,
			var(--roxy-border, #e4e4e7) 100%
		);
		background-size: 200% 100%;
		animation: roxy-shimmer 1.4s ease-in-out infinite;
		border-radius: var(--roxy-radius-md, 8px);
	}

	@keyframes roxy-shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.roxy-skeleton {
			animation: none;
		}
	}

	.roxy-empty {
		padding: var(--roxy-space-lg, 1.5rem);
		color: var(--roxy-muted, #71717a);
		text-align: center;
		font-size: var(--roxy-text-sm, 0.875rem);
	}

	:host(:focus-within) .roxy-card {
		outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
		outline-offset: 2px;
	}
`;function Ae(i){return i.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^\w/,e=>e.toUpperCase())}var v=class extends ${constructor(){super(...arguments);this.data=null;this.type="life-path"}render(){let t=this.data;if(!t)return p`<div class="roxy-empty" role="status">No numerology data</div>`;let r=Ye[this.type]??this.type;return"coreNumbers"in t?this.renderChart(t,r):"personalYear"in t?this.renderPersonalYear(t,r):this.renderNumberCard(t,r)}renderNumberCard(t,r){let s=t.meaning?.keywords??[];return p`<article class="card" aria-label=${r}>
			<div class="hero">
				${typeof t.number=="number"?p`<div class="numeral">${t.number}</div>`:l}
				<div>
					<p class="label">${r}</p>
					${t.meaning?.title?p`<h2 class="title">${t.meaning.title}</h2>`:l}
				</div>
			</div>
			${t.meaning?.description?p`<p class="meaning">${t.meaning.description}</p>`:l}
			${t.calculation?p`<pre class="calc">${t.calculation}</pre>`:l}
			${s.length>0?p`<div class="chips">
						${s.map(o=>p`<span>${o}</span>`)}
					</div>`:l}
			${t.hasKarmicDebt&&t.karmicDebtNumber?p`<div class="karmic">
						Karmic debt ${t.karmicDebtNumber}.
						${Ve(t.karmicDebtMeaning)}
					</div>`:l}
		</article>`}renderPersonalYear(t,r){return p`<article class="card" aria-label=${r}>
			<div class="hero">
				${typeof t.personalYear=="number"?p`<div class="numeral">${t.personalYear}</div>`:l}
				<div>
					<p class="label">${r}</p>
					${t.theme?p`<h2 class="title">${t.theme}</h2>`:l}
				</div>
			</div>
			${t.forecast?p`<p class="meaning">${t.forecast}</p>`:l}
			${t.advice?p`<p>${t.advice}</p>`:l}
		</article>`}renderChart(t,r){let s=Object.entries(t.coreNumbers).filter(([,o])=>o!=null);return p`<article class="card" aria-label=${r}>
			<div>
				<p class="label">${r}</p>
				${t.profile?.name?p`<h2 class="title">${t.profile.name}</h2>`:l}
			</div>
			${s.length>0?p`<div class="cores">
						${s.map(([o,n])=>p`<div class="item">
								<span>${Ae(o)}</span>
								<strong>${n.number??""}</strong>
							</div>`)}
					</div>`:l}
		</article>`}};v.styles=[be,C`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.hero {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			.numeral {
				font-size: 4rem;
				line-height: 1;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-fg, #b45309);
				font-variant-numeric: tabular-nums;
			}
			.label {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.meaning {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
			}

			.calc {
				margin: 0;
				font-family: var(--roxy-font-mono);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 30%, transparent);
				padding: var(--roxy-space-sm, 0.5rem);
				border-radius: var(--roxy-radius-sm, 4px);
				white-space: pre-wrap;
				overflow-wrap: anywhere;
			}

			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.chips span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			.cores {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-md, 1rem);
			}
			.cores .item {
				display: flex;
				align-items: baseline;
				gap: var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.cores .item span:first-child {
				color: var(--roxy-muted, #71717a);
				text-transform: capitalize;
			}
			.cores .item strong {
				color: var(--roxy-accent-fg, #b45309);
				font-variant-numeric: tabular-nums;
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.karmic {
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 12%, transparent);
				border: 1px solid color-mix(in srgb, var(--roxy-warning, #ea580c) 32%, transparent);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				border-radius: var(--roxy-radius-md, 8px);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
		`],z([I({attribute:!1})],v.prototype,"data",2),z([I({type:String,reflect:!0})],v.prototype,"type",2),v=z([_e("roxy-numerology-card")],v);var Ye={"life-path":"Life Path",expression:"Expression","personal-year":"Personal Year",chart:"Numerology chart"};function Ve(i){return i?[i.description,i.challenge,i.resolution].filter(Boolean).join(" "):""}return Pe(Ke);})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=numerology-card.js.map
