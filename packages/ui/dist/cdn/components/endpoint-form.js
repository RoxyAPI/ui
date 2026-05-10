"use strict";var RoxyUI_endpoint_form=(()=>{var L=Object.defineProperty;var oe=Object.getOwnPropertyDescriptor;var we=Object.getOwnPropertyNames;var Ce=Object.prototype.hasOwnProperty;var Oe=(i,e)=>{for(var t in e)L(i,t,{get:e[t],enumerable:!0})},Pe=(i,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of we(e))!Ce.call(i,r)&&r!==t&&L(i,r,{get:()=>e[r],enumerable:!(s=oe(e,r))||s.enumerable});return i};var Ue=i=>Pe(L({},"__esModule",{value:!0}),i),f=(i,e,t,s)=>{for(var r=s>1?void 0:s?oe(e,t):e,o=i.length-1,n;o>=0;o--)(n=i[o])&&(r=(s?n(e,t,r):n(r))||r);return s&&r&&L(e,t,r),r};var Je={};Oe(Je,{RoxyEndpointForm:()=>m});var D=globalThis,j=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),ne=new WeakMap,O=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(j&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=ne.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&ne.set(t,e))}return e}toString(){return this.cssText}},ae=i=>new O(typeof i=="string"?i:i+"",void 0,K),P=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((s,r,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[o+1],i[0]);return new O(t,i,K)},le=(i,e)=>{if(j)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),r=D.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}},J=j?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return ae(t)})(i):i;var{is:Te,defineProperty:ke,getOwnPropertyDescriptor:Me,getOwnPropertyNames:Re,getOwnPropertySymbols:qe,getPrototypeOf:He}=Object,B=globalThis,ce=B.trustedTypes,Ne=ce?ce.emptyScript:"",ze=B.reactiveElementPolyfillSupport,U=(i,e)=>i,T={toAttribute(i,e){switch(e){case Boolean:i=i?Ne:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},I=(i,e)=>!Te(i,e),he={attribute:!0,type:String,converter:T,reflect:!1,useDefault:!1,hasChanged:I};Symbol.metadata??=Symbol("metadata"),B.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=he){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(e,s,t);r!==void 0&&ke(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){let{get:r,set:o}=Me(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){let c=r?.call(this);o?.call(this,n),this.requestUpdate(e,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??he}static _$Ei(){if(this.hasOwnProperty(U("elementProperties")))return;let e=He(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(U("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(U("properties"))){let t=this.properties,s=[...Re(t),...qe(t)];for(let r of s)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,r]of t)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let r=this._$Eu(t,s);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let r of s)t.unshift(J(r))}else e!==void 0&&t.push(J(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return le(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:T).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){let s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let o=s.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:T;this._$Em=r;let c=n.fromAttribute(t,o.type);this[r]=c??this._$Ej?.get(r)??c,this._$Em=null}}requestUpdate(e,t,s,r=!1,o){if(e!==void 0){let n=this.constructor;if(r===!1&&(o=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??I)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:o},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,o]of s){let{wrapped:n}=o,c=this[r];n!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,o,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[U("elementProperties")]=new Map,y[U("finalized")]=new Map,ze?.({ReactiveElement:y}),(B.reactiveElementVersions??=[]).push("2.1.2");var ee=globalThis,de=i=>i,V=ee.trustedTypes,pe=V?V.createPolicy("lit-html",{createHTML:i=>i}):void 0,$e="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,ve="?"+v,Le=`<${ve}>`,A=document,M=()=>A.createComment(""),R=i=>i===null||typeof i!="object"&&typeof i!="function",te=Array.isArray,De=i=>te(i)||typeof i?.[Symbol.iterator]=="function",Y=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ue=/-->/g,me=/>/g,_=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fe=/'/g,ge=/"/g,be=/^(?:script|style|textarea|title)$/i,se=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),g=se(1),Fe=se(2),et=se(3),S=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ye=new WeakMap,x=A.createTreeWalker(A,129);function _e(i,e){if(!te(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return pe!==void 0?pe.createHTML(e):e}var je=(i,e)=>{let t=i.length-1,s=[],r,o=e===2?"<svg>":e===3?"<math>":"",n=k;for(let c=0;c<t;c++){let a=i[c],l,d,h=-1,u=0;for(;u<a.length&&(n.lastIndex=u,d=n.exec(a),d!==null);)u=n.lastIndex,n===k?d[1]==="!--"?n=ue:d[1]!==void 0?n=me:d[2]!==void 0?(be.test(d[2])&&(r=RegExp("</"+d[2],"g")),n=_):d[3]!==void 0&&(n=_):n===_?d[0]===">"?(n=r??k,h=-1):d[1]===void 0?h=-2:(h=n.lastIndex-d[2].length,l=d[1],n=d[3]===void 0?_:d[3]==='"'?ge:fe):n===ge||n===fe?n=_:n===ue||n===me?n=k:(n=_,r=void 0);let $=n===_&&i[c+1].startsWith("/>")?" ":"";o+=n===k?a+Le:h>=0?(s.push(l),a.slice(0,h)+$e+a.slice(h)+v+$):a+v+(h===-2?c:$)}return[_e(i,o+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},q=class i{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let o=0,n=0,c=e.length-1,a=this.parts,[l,d]=je(e,t);if(this.el=i.createElement(l,s),x.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=x.nextNode())!==null&&a.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith($e)){let u=d[n++],$=r.getAttribute(h).split(v),z=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:z[2],strings:$,ctor:z[1]==="."?G:z[1]==="?"?Q:z[1]==="@"?X:C}),r.removeAttribute(h)}else h.startsWith(v)&&(a.push({type:6,index:o}),r.removeAttribute(h));if(be.test(r.tagName)){let h=r.textContent.split(v),u=h.length-1;if(u>0){r.textContent=V?V.emptyScript:"";for(let $=0;$<u;$++)r.append(h[$],M()),x.nextNode(),a.push({type:2,index:++o});r.append(h[u],M())}}}else if(r.nodeType===8)if(r.data===ve)a.push({type:2,index:o});else{let h=-1;for(;(h=r.data.indexOf(v,h+1))!==-1;)a.push({type:7,index:o}),h+=v.length-1}o++}}static createElement(e,t){let s=A.createElement("template");return s.innerHTML=e,s}};function w(i,e,t=i,s){if(e===S)return e;let r=s!==void 0?t._$Co?.[s]:t._$Cl,o=R(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,t,s)),s!==void 0?(t._$Co??=[])[s]=r:t._$Cl=r),r!==void 0&&(e=w(i,r._$AS(i,e.values),r,s)),e}var Z=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,r=(e?.creationScope??A).importNode(t,!0);x.currentNode=r;let o=x.nextNode(),n=0,c=0,a=s[0];for(;a!==void 0;){if(n===a.index){let l;a.type===2?l=new H(o,o.nextSibling,this,e):a.type===1?l=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(l=new F(o,this,e)),this._$AV.push(l),a=s[++c]}n!==a?.index&&(o=x.nextNode(),n++)}return x.currentNode=A,r}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},H=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),R(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):De(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&R(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=q.createElement(_e(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(t);else{let o=new Z(r,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o}}_$AC(e){let t=ye.get(e.strings);return t===void 0&&ye.set(e.strings,t=new q(e)),t}k(e){te(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,r=0;for(let o of e)r===t.length?t.push(s=new i(this.O(M()),this.O(M()),this,this.options)):s=t[r],s._$AI(o),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=de(e).nextSibling;de(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(e,t=this,s,r){let o=this.strings,n=!1;if(o===void 0)e=w(this,e,t,0),n=!R(e)||e!==this._$AH&&e!==S,n&&(this._$AH=e);else{let c=e,a,l;for(e=o[0],a=0;a<o.length-1;a++)l=w(this,c[s+a],t,a),l===S&&(l=this._$AH[a]),n||=!R(l)||l!==this._$AH[a],l===p?e=p:e!==p&&(e+=(l??"")+o[a+1]),this._$AH[a]=l}n&&!r&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},G=class extends C{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},Q=class extends C{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},X=class extends C{constructor(e,t,s,r,o){super(e,t,s,r,o),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??p)===S)return;let s=this._$AH,r=e===p&&s!==p||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==p&&(s===p||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},F=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}};var Be=ee.litHtmlPolyfillSupport;Be?.(q,H),(ee.litHtmlVersions??=[]).push("3.3.2");var xe=(i,e,t)=>{let s=t?.renderBefore??e,r=s._$litPart$;if(r===void 0){let o=t?.renderBefore??null;s._$litPart$=r=new H(e.insertBefore(M(),o),o,void 0,t??{})}return r._$AI(i),r};var re=globalThis,b=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=xe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}};b._$litElement$=!0,b.finalized=!0,re.litElementHydrateSupport?.({LitElement:b});var Ie=re.litElementPolyfillSupport;Ie?.({LitElement:b});(re.litElementVersions??=[]).push("4.2.2");var Ae=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};var Ve={attribute:!0,type:String,converter:T,reflect:!1,hasChanged:I},We=(i=Ve,e,t)=>{let{kind:s,metadata:r}=t,o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(t.name,i),s==="accessor"){let{name:n}=t;return{set(c){let a=e.get.call(this);e.set.call(this,c),this.requestUpdate(n,a,i,!0,c)},init(c){return c!==void 0&&this.C(n,void 0,i,c),c}}}if(s==="setter"){let{name:n}=t;return function(c){let a=this[n];e.call(this,c),this.requestUpdate(n,a,i,!0,c)}}throw Error("Unsupported decorator location: "+s)};function E(i){return(e,t)=>typeof t=="object"?We(i,e,t):((s,r,o)=>{let n=r.hasOwnProperty(o);return r.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(r,o):void 0})(i,e,t)}function N(i){return E({...i,state:!0,attribute:!1})}var Se=P`
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
`;var ie=new Map;async function Ke(i){let e=ie.get(i);return e||(e=fetch(i).then(async t=>{if(!t.ok)throw ie.delete(i),new Error(`HTTP ${t.status}`);return await t.json()}),ie.set(i,e)),e}var m=class extends b{constructor(){super(...arguments);this.endpoint="vedic-astrology/birth-chart";this.method="POST";this.specUrl="https://roxyapi.com/api/v2/openapi.json";this.submitLabel="Submit";this.fields=[];this.values={};this.hasLocation=!1;this.loaded=!1;this.onLocation=t=>{let s=t.detail;s&&(this.values={...this.values,latitude:s.latitude,longitude:s.longitude,timezone:s.timezone??s.utcOffset})};this.onSubmit=t=>{t.preventDefault();let s=this.fields.filter(r=>r.required).filter(r=>this.values[r.name]===void 0||this.values[r.name]==="");if(s.length>0){this.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{missing:s.map(r=>r.name)},bubbles:!0,composed:!0}));return}this.dispatchEvent(new CustomEvent("roxy-submit",{detail:{endpoint:this.endpoint,values:this.values},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.loadSchema()}async loadSchema(){try{let t=await Ke(this.specUrl),s=`/${this.endpoint.replace(/^\//,"")}`,r=t.paths?.[s]?.[this.method.toLowerCase()];if(!r)return;let o=t.components?.schemas??{},n=[],c;if(r.requestBody){let l=r.requestBody.content?.["application/json"]?.schema;c=this.resolve(l,o)}if(c?.properties){let l=new Set(c.required??[]);for(let[d,h]of Object.entries(c.properties)){let u=this.resolve(h,o)??{};n.push({name:d,type:this.fieldType(u),required:l.has(d),description:u.description,enum:u.enum,min:u.minimum,max:u.maximum,default:u.default})}}for(let l of r.parameters??[])if(l.in==="path"||l.in==="query"){let d=this.resolve(l.schema,o)??{};n.push({name:l.name,type:this.fieldType(d),required:!!l.required,description:d.description,enum:d.enum,default:d.default})}this.fields=n,this.hasLocation=n.some(l=>l.name==="latitude")&&n.some(l=>l.name==="longitude")&&n.some(l=>l.name==="timezone");let a={};for(let l of n)l.default!==void 0&&(a[l.name]=l.default);this.values=a,this.loaded=!0}catch{this.loaded=!0}}resolve(t,s){if(t){if("$ref"in t&&t.$ref){let r=t.$ref.split("/").pop();return r?s[r]:void 0}return t}}fieldType(t){return t.enum?"enum":t.format==="date"?"date":t.format==="time"?"time":t.format==="date-time"?"datetime":t.type==="integer"||t.type==="number"?"number":"text"}setValue(t,s){this.values={...this.values,[t]:s}}render(){if(!this.loaded)return g`<form><div class="roxy-skeleton" style="height: 8rem"></div></form>`;let t=s=>{if(this.hasLocation&&(s.name==="latitude"||s.name==="longitude"||s.name==="timezone"))return p;let r=`roxy-form-${s.name}`;return g`<div class="field">
				<label for=${r}>
					${Ee(s.name)}${s.required?g`<span class="req" aria-hidden="true">*</span>`:p}
				</label>
				${s.enum?g`<select
							id=${r}
							?required=${s.required}
							@change=${o=>this.setValue(s.name,o.target.value)}
						>
							<option value="">Choose</option>
							${s.enum.map(o=>g`<option value=${o} ?selected=${this.values[s.name]===o}>
									${o}
								</option>`)}
						</select>`:g`<input
							id=${r}
							type=${this.htmlType(s.type)}
							?required=${s.required}
							min=${s.min??""}
							max=${s.max??""}
							step=${s.type==="number"?"any":""}
							.value=${this.values[s.name]??""}
							@input=${o=>this.setValue(s.name,this.coerce(s.type,o.target.value))}
						/>`}
				${s.description?g`<small class="help">${s.description}</small>`:p}
			</div>`};return g`<form @submit=${this.onSubmit}>
			<h2 class="title">${Ee(this.endpoint.split("/").pop()??"")}</h2>
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
				${this.fields.map(s=>t(s))}
			</div>
			<button class="submit" type="submit">${this.submitLabel}</button>
		</form>`}htmlType(t){switch(t){case"date":return"date";case"time":return"time";case"datetime":return"datetime-local";case"number":return"number";default:return"text"}}coerce(t,s){if(s!==""){if(t==="number"){let r=Number(s);return Number.isFinite(r)?r:void 0}return s}}};m.styles=[Se,P`
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
		`],f([E({type:String,attribute:"data-endpoint"})],m.prototype,"endpoint",2),f([E({type:String})],m.prototype,"method",2),f([E({type:String,attribute:"spec-url"})],m.prototype,"specUrl",2),f([E({type:String,attribute:"submit-label"})],m.prototype,"submitLabel",2),f([N()],m.prototype,"fields",2),f([N()],m.prototype,"values",2),f([N()],m.prototype,"hasLocation",2),f([N()],m.prototype,"loaded",2),m=f([Ae("roxy-endpoint-form")],m);function Ee(i){return i.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^\w/,e=>e.toUpperCase())}return Ue(Je);})();
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
