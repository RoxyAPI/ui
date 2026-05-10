"use strict";var RoxyUI_endpoint_form=(()=>{var L=Object.defineProperty;var ne=Object.getOwnPropertyDescriptor;var we=Object.getOwnPropertyNames;var Ce=Object.prototype.hasOwnProperty;var Oe=(i,e)=>{for(var t in e)L(i,t,{get:e[t],enumerable:!0})},Pe=(i,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of we(e))!Ce.call(i,s)&&s!==t&&L(i,s,{get:()=>e[s],enumerable:!(r=ne(e,s))||r.enumerable});return i};var Ue=i=>Pe(L({},"__esModule",{value:!0}),i),f=(i,e,t,r)=>{for(var s=r>1?void 0:r?ne(e,t):e,o=i.length-1,n;o>=0;o--)(n=i[o])&&(s=(r?n(e,t,s):n(s))||s);return r&&s&&L(e,t,s),s};var Je={};Oe(Je,{RoxyEndpointForm:()=>m});var D=globalThis,j=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),ae=new WeakMap,P=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(j&&e===void 0){let r=t!==void 0&&t.length===1;r&&(e=ae.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&ae.set(t,e))}return e}toString(){return this.cssText}},le=i=>new P(typeof i=="string"?i:i+"",void 0,K),U=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((r,s,o)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[o+1],i[0]);return new P(t,i,K)},ce=(i,e)=>{if(j)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let r=document.createElement("style"),s=D.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=t.cssText,i.appendChild(r)}},J=j?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return le(t)})(i):i;var{is:ke,defineProperty:Te,getOwnPropertyDescriptor:Me,getOwnPropertyNames:Re,getOwnPropertySymbols:qe,getPrototypeOf:ze}=Object,B=globalThis,he=B.trustedTypes,He=he?he.emptyScript:"",Ne=B.reactiveElementPolyfillSupport,k=(i,e)=>i,T={toAttribute(i,e){switch(e){case Boolean:i=i?He:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},I=(i,e)=>!ke(i,e),de={attribute:!0,type:String,converter:T,reflect:!1,useDefault:!1,hasChanged:I};Symbol.metadata??=Symbol("metadata"),B.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=de){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(e,r,t);s!==void 0&&Te(this.prototype,e,s)}}static getPropertyDescriptor(e,t,r){let{get:s,set:o}=Me(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){let c=s?.call(this);o?.call(this,n),this.requestUpdate(e,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??de}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;let e=ze(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){let t=this.properties,r=[...Re(t),...qe(t)];for(let s of r)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[r,s]of t)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[t,r]of this.elementProperties){let s=this._$Eu(t,r);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let s of r)t.unshift(J(s))}else e!==void 0&&t.push(J(e));return t}static _$Eu(e,t){let r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ce(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){let r=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,r);if(s!==void 0&&r.reflect===!0){let o=(r.converter?.toAttribute!==void 0?r.converter:T).toAttribute(t,r.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){let r=this.constructor,s=r._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let o=r.getPropertyOptions(s),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:T;this._$Em=s;let c=n.fromAttribute(t,o.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(e,t,r,s=!1,o){if(e!==void 0){let n=this.constructor;if(s===!1&&(o=this[e]),r??=n.getPropertyOptions(e),!((r.hasChanged??I)(o,t)||r.useDefault&&r.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:s,wrapped:o},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,o]of r){let{wrapped:n}=o,c=this[s];n!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,o,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[k("elementProperties")]=new Map,y[k("finalized")]=new Map,Ne?.({ReactiveElement:y}),(B.reactiveElementVersions??=[]).push("2.1.2");var ee=globalThis,pe=i=>i,V=ee.trustedTypes,ue=V?V.createPolicy("lit-html",{createHTML:i=>i}):void 0,ve="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,be="?"+v,Le=`<${be}>`,A=document,R=()=>A.createComment(""),q=i=>i===null||typeof i!="object"&&typeof i!="function",te=Array.isArray,De=i=>te(i)||typeof i?.[Symbol.iterator]=="function",Y=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,me=/-->/g,fe=/>/g,x=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ge=/'/g,ye=/"/g,xe=/^(?:script|style|textarea|title)$/i,re=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),g=re(1),Fe=re(2),et=re(3),S=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),$e=new WeakMap,_=A.createTreeWalker(A,129);function _e(i,e){if(!te(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ue!==void 0?ue.createHTML(e):e}var je=(i,e)=>{let t=i.length-1,r=[],s,o=e===2?"<svg>":e===3?"<math>":"",n=M;for(let c=0;c<t;c++){let a=i[c],l,d,h=-1,u=0;for(;u<a.length&&(n.lastIndex=u,d=n.exec(a),d!==null);)u=n.lastIndex,n===M?d[1]==="!--"?n=me:d[1]!==void 0?n=fe:d[2]!==void 0?(xe.test(d[2])&&(s=RegExp("</"+d[2],"g")),n=x):d[3]!==void 0&&(n=x):n===x?d[0]===">"?(n=s??M,h=-1):d[1]===void 0?h=-2:(h=n.lastIndex-d[2].length,l=d[1],n=d[3]===void 0?x:d[3]==='"'?ye:ge):n===ye||n===ge?n=x:n===me||n===fe?n=M:(n=x,s=void 0);let $=n===x&&i[c+1].startsWith("/>")?" ":"";o+=n===M?a+Le:h>=0?(r.push(l),a.slice(0,h)+ve+a.slice(h)+v+$):a+v+(h===-2?c:$)}return[_e(i,o+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},z=class i{constructor({strings:e,_$litType$:t},r){let s;this.parts=[];let o=0,n=0,c=e.length-1,a=this.parts,[l,d]=je(e,t);if(this.el=i.createElement(l,r),_.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=_.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(ve)){let u=d[n++],$=s.getAttribute(h).split(v),N=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:N[2],strings:$,ctor:N[1]==="."?G:N[1]==="?"?Q:N[1]==="@"?X:C}),s.removeAttribute(h)}else h.startsWith(v)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(xe.test(s.tagName)){let h=s.textContent.split(v),u=h.length-1;if(u>0){s.textContent=V?V.emptyScript:"";for(let $=0;$<u;$++)s.append(h[$],R()),_.nextNode(),a.push({type:2,index:++o});s.append(h[u],R())}}}else if(s.nodeType===8)if(s.data===be)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(v,h+1))!==-1;)a.push({type:7,index:o}),h+=v.length-1}o++}}static createElement(e,t){let r=A.createElement("template");return r.innerHTML=e,r}};function w(i,e,t=i,r){if(e===S)return e;let s=r!==void 0?t._$Co?.[r]:t._$Cl,o=q(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(i),s._$AT(i,t,r)),r!==void 0?(t._$Co??=[])[r]=s:t._$Cl=s),s!==void 0&&(e=w(i,s._$AS(i,e.values),s,r)),e}var Z=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,s=(e?.creationScope??A).importNode(t,!0);_.currentNode=s;let o=_.nextNode(),n=0,c=0,a=r[0];for(;a!==void 0;){if(n===a.index){let l;a.type===2?l=new H(o,o.nextSibling,this,e):a.type===1?l=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(l=new F(o,this,e)),this._$AV.push(l),a=r[++c]}n!==a?.index&&(o=_.nextNode(),n++)}return _.currentNode=A,s}p(e){let t=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},H=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,s){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),q(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):De(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&q(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,s=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=z.createElement(_e(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(t);else{let o=new Z(s,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o}}_$AC(e){let t=$e.get(e.strings);return t===void 0&&$e.set(e.strings,t=new z(e)),t}k(e){te(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,s=0;for(let o of e)s===t.length?t.push(r=new i(this.O(R()),this.O(R()),this,this.options)):r=t[s],r._$AI(o),s++;s<t.length&&(this._$AR(r&&r._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let r=pe(e).nextSibling;pe(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,s,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=p}_$AI(e,t=this,r,s){let o=this.strings,n=!1;if(o===void 0)e=w(this,e,t,0),n=!q(e)||e!==this._$AH&&e!==S,n&&(this._$AH=e);else{let c=e,a,l;for(e=o[0],a=0;a<o.length-1;a++)l=w(this,c[r+a],t,a),l===S&&(l=this._$AH[a]),n||=!q(l)||l!==this._$AH[a],l===p?e=p:e!==p&&(e+=(l??"")+o[a+1]),this._$AH[a]=l}n&&!s&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},G=class extends C{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},Q=class extends C{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},X=class extends C{constructor(e,t,r,s,o){super(e,t,r,s,o),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??p)===S)return;let r=this._$AH,s=e===p&&r!==p||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==p&&(r===p||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},F=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}};var Be=ee.litHtmlPolyfillSupport;Be?.(z,H),(ee.litHtmlVersions??=[]).push("3.3.2");var Ae=(i,e,t)=>{let r=t?.renderBefore??e,s=r._$litPart$;if(s===void 0){let o=t?.renderBefore??null;r._$litPart$=s=new H(e.insertBefore(R(),o),o,void 0,t??{})}return s._$AI(i),s};var se=globalThis,b=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ae(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}};b._$litElement$=!0,b.finalized=!0,se.litElementHydrateSupport?.({LitElement:b});var Ie=se.litElementPolyfillSupport;Ie?.({LitElement:b});(se.litElementVersions??=[]).push("4.2.2");var Se=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};var Ve={attribute:!0,type:String,converter:T,reflect:!1,hasChanged:I},We=(i=Ve,e,t)=>{let{kind:r,metadata:s}=t,o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),r==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(t.name,i),r==="accessor"){let{name:n}=t;return{set(c){let a=e.get.call(this);e.set.call(this,c),this.requestUpdate(n,a,i,!0,c)},init(c){return c!==void 0&&this.C(n,void 0,i,c),c}}}if(r==="setter"){let{name:n}=t;return function(c){let a=this[n];e.call(this,c),this.requestUpdate(n,a,i,!0,c)}}throw Error("Unsupported decorator location: "+r)};function E(i){return(e,t)=>typeof t=="object"?We(i,e,t):((r,s,o)=>{let n=s.hasOwnProperty(o);return s.constructor.createProperty(o,r),n?Object.getOwnPropertyDescriptor(s,o):void 0})(i,e,t)}function O(i){return E({...i,state:!0,attribute:!1})}var Ee=U`
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
`;function ie(i){return i.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^\w/,e=>e.toUpperCase())}var oe=new Map;async function Ke(i){let e=oe.get(i);return e||(e=fetch(i).then(async t=>{if(!t.ok)throw new Error(`HTTP ${t.status}`);return await t.json()}).catch(t=>{throw oe.delete(i),t}),oe.set(i,e)),e}var m=class extends b{constructor(){super(...arguments);this.endpoint="vedic-astrology/birth-chart";this.method="POST";this.specUrl="https://roxyapi.com/api/v2/openapi.json";this.submitLabel="Submit";this.fields=[];this.values={};this.hasLocation=!1;this.loaded=!1;this.specError=null;this.retryLoadSchema=()=>{this.loaded=!1,this.specError=null,this.loadSchema()};this.onLocation=t=>{let r=t.detail;r&&(this.values={...this.values,latitude:r.latitude,longitude:r.longitude,timezone:r.timezone??r.utcOffset})};this.onSubmit=t=>{t.preventDefault();let r=this.fields.filter(s=>s.required).filter(s=>this.values[s.name]===void 0||this.values[s.name]==="");if(r.length>0){this.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{missing:r.map(s=>s.name)},bubbles:!0,composed:!0}));return}this.dispatchEvent(new CustomEvent("roxy-submit",{detail:{endpoint:this.endpoint,values:this.values},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.loadSchema()}async loadSchema(){this.specError=null;try{let t=await Ke(this.specUrl),r=`/${this.endpoint.replace(/^\//,"")}`,s=t.paths?.[r]?.[this.method.toLowerCase()];if(!s)throw new Error(`Endpoint ${this.method} ${r} not found in OpenAPI spec`);let o=t.components?.schemas??{},n=[],c;if(s.requestBody){let l=s.requestBody.content?.["application/json"]?.schema;c=this.resolve(l,o)}if(c?.properties){let l=new Set(c.required??[]);for(let[d,h]of Object.entries(c.properties)){let u=this.resolve(h,o)??{};n.push({name:d,type:this.fieldType(u),required:l.has(d),description:u.description,enum:u.enum,min:u.minimum,max:u.maximum,default:u.default})}}for(let l of s.parameters??[])if(l.in==="path"||l.in==="query"){let d=this.resolve(l.schema,o)??{};n.push({name:l.name,type:this.fieldType(d),required:!!l.required,description:d.description,enum:d.enum,default:d.default})}this.fields=n,this.hasLocation=n.some(l=>l.name==="latitude")&&n.some(l=>l.name==="longitude")&&n.some(l=>l.name==="timezone");let a={};for(let l of n)l.default!==void 0&&(a[l.name]=l.default);this.values=a,this.loaded=!0}catch(t){let r=t instanceof Error?t.message:String(t);this.specError=r,this.loaded=!0,this.dispatchEvent(new CustomEvent("roxy-spec-error",{detail:{url:this.specUrl,message:r},bubbles:!0,composed:!0}))}}resolve(t,r){if(t){if("$ref"in t&&t.$ref){let s=t.$ref.split("/").pop();return s?r[s]:void 0}return t}}fieldType(t){return t.enum?"enum":t.format==="date"?"date":t.format==="time"?"time":t.format==="date-time"?"datetime":t.type==="integer"||t.type==="number"?"number":"text"}setValue(t,r){this.values={...this.values,[t]:r}}render(){if(!this.loaded)return g`<form><div class="roxy-skeleton" style="height: 8rem"></div></form>`;if(this.specError)return g`<div class="spec-error" role="alert">
				Schema load failed: ${this.specError}
				<button type="button" class="submit" @click=${this.retryLoadSchema}>Retry</button>
			</div>`;let t=r=>{if(this.hasLocation&&(r.name==="latitude"||r.name==="longitude"||r.name==="timezone"))return p;let s=`roxy-form-${r.name}`;return g`<div class="field">
				<label for=${s}>
					${ie(r.name)}${r.required?g`<span class="req" aria-hidden="true">*</span>`:p}
				</label>
				${r.enum?g`<select
							id=${s}
							?required=${r.required}
							@change=${o=>this.setValue(r.name,o.target.value)}
						>
							<option value="">Choose</option>
							${r.enum.map(o=>g`<option value=${o} ?selected=${this.values[r.name]===o}>
									${o}
								</option>`)}
						</select>`:g`<input
							id=${s}
							type=${this.htmlType(r.type)}
							?required=${r.required}
							min=${r.min??""}
							max=${r.max??""}
							step=${r.type==="number"?"any":""}
							.value=${this.values[r.name]??""}
							@input=${o=>this.setValue(r.name,this.coerce(r.type,o.target.value))}
						/>`}
				${r.description?g`<small class="help">${r.description}</small>`:p}
			</div>`};return g`<form @submit=${this.onSubmit}>
			<h2 class="title">${ie(this.endpoint.split("/").pop()??"")}</h2>
			${this.hasLocation?g`<div class="location-block">
						<label>Birth location</label>
						<roxy-location-search
							@roxy-location-select=${this.onLocation}
							placeholder="City of birth"
						></roxy-location-search>
						<small class="help">
							Required: latitude, longitude, timezone. Pick a city to autofill.
						</small>
					</div>`:p}
			<div class="fields">
				${this.fields.map(r=>t(r))}
			</div>
			<button class="submit" type="submit">${this.submitLabel}</button>
		</form>`}htmlType(t){switch(t){case"date":return"date";case"time":return"time";case"datetime":return"datetime-local";case"number":return"number";default:return"text"}}coerce(t,r){if(r!==""){if(t==="number"){let s=Number(r);return Number.isFinite(s)?s:void 0}return r}}};m.styles=[Ee,U`
			form {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.fields {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
				align-items: start;
				gap: var(--roxy-space-md, 1rem);
			}
			.field {
				display: flex;
				flex-direction: column;
				gap: var(--roxy-space-xs, 0.25rem);
				min-width: 0;
			}
			label {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			label .req {
				color: var(--roxy-danger-fg, #991b1b);
				margin-left: 4px;
			}
			input,
			select {
				width: 100%;
				box-sizing: border-box;
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-base, 1rem);
				font-family: inherit;
				color: var(--roxy-fg, #0a0a0a);
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
			}
			input:focus,
			select:focus {
				outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
				outline-offset: 2px;
				border-color: var(--roxy-accent-fg, #b45309);
			}
			.help {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.location-block {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
				grid-column: 1 / -1;
			}
			.coords {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.coords input {
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			button.submit {
				justify-self: start;
				background: var(--roxy-accent-fg, #b45309);
				color: var(--roxy-bg, #fff);
				border: 0;
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-lg, 1.5rem);
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
				cursor: pointer;
				transition:
					transform var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			button.submit:hover {
				transform: scale(1.02);
			}
			button.submit:focus-visible {
				outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
				outline-offset: 2px;
			}
			.spec-error {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
				justify-items: start;
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-danger, #dc2626);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				color: var(--roxy-danger-fg, #991b1b);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
		`],f([E({type:String,attribute:"data-endpoint"})],m.prototype,"endpoint",2),f([E({type:String})],m.prototype,"method",2),f([E({type:String,attribute:"spec-url"})],m.prototype,"specUrl",2),f([E({type:String,attribute:"submit-label"})],m.prototype,"submitLabel",2),f([O()],m.prototype,"fields",2),f([O()],m.prototype,"values",2),f([O()],m.prototype,"hasLocation",2),f([O()],m.prototype,"loaded",2),f([O()],m.prototype,"specError",2),m=f([Se("roxy-endpoint-form")],m);return Ue(Je);})();
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
//# sourceMappingURL=endpoint-form.js.map
