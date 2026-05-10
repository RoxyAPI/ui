"use strict";var RoxyUI_data=(()=>{var k=Object.defineProperty;var it=Object.getOwnPropertyDescriptor;var St=Object.getOwnPropertyNames;var Et=Object.prototype.hasOwnProperty;var wt=(i,t)=>{for(var e in t)k(i,e,{get:t[e],enumerable:!0})},Ct=(i,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of St(t))!Et.call(i,s)&&s!==e&&k(i,s,{get:()=>t[s],enumerable:!(r=it(t,s))||r.enumerable});return i};var Pt=i=>Ct(k({},"__esModule",{value:!0}),i),z=(i,t,e,r)=>{for(var s=r>1?void 0:r?it(t,e):t,o=i.length-1,n;o>=0;o--)(n=i[o])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&k(t,e,s),s};var Ft={};wt(Ft,{RoxyData:()=>x});var L=globalThis,j=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),ot=new WeakMap,w=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(j&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=ot.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&ot.set(e,t))}return t}toString(){return this.cssText}},nt=i=>new w(typeof i=="string"?i:i+"",void 0,K),C=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((r,s,o)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[o+1],i[0]);return new w(e,i,K)},at=(i,t)=>{if(j)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),s=L.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,i.appendChild(r)}},V=j?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return nt(e)})(i):i;var{is:Ut,defineProperty:Ot,getOwnPropertyDescriptor:Tt,getOwnPropertyNames:Rt,getOwnPropertySymbols:Mt,getPrototypeOf:Nt}=Object,q=globalThis,lt=q.trustedTypes,Ht=lt?lt.emptyScript:"",kt=q.reactiveElementPolyfillSupport,P=(i,t)=>i,U={toAttribute(i,t){switch(t){case Boolean:i=i?Ht:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},I=(i,t)=>!Ut(i,t),ht={attribute:!0,type:String,converter:U,reflect:!1,useDefault:!1,hasChanged:I};Symbol.metadata??=Symbol("metadata"),q.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ht){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&Ot(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){let{get:s,set:o}=Tt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let l=s?.call(this);o?.call(this,n),this.requestUpdate(t,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ht}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let t=Nt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let e=this.properties,r=[...Rt(e),...Mt(e)];for(let s of r)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let s of r)e.unshift(V(s))}else t!==void 0&&e.push(V(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return at(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){let o=(r.converter?.toAttribute!==void 0?r.converter:U).toAttribute(e,r.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){let r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let o=r.getPropertyOptions(s),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:U;this._$Em=s;let l=n.fromAttribute(e,o.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(t,e,r,s=!1,o){if(t!==void 0){let n=this.constructor;if(s===!1&&(o=this[t]),r??=n.getPropertyOptions(t),!((r.hasChanged??I)(o,e)||r.useDefault&&r.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:s,wrapped:o},n){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,o]of r){let{wrapped:n}=o,l=this[s];n!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,o,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[P("elementProperties")]=new Map,y[P("finalized")]=new Map,kt?.({ReactiveElement:y}),(q.reactiveElementVersions??=[]).push("2.1.2");var Q=globalThis,ct=i=>i,D=Q.trustedTypes,dt=D?D.createPolicy("lit-html",{createHTML:i=>i}):void 0,gt="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,$t="?"+g,zt=`<${$t}>`,A=document,T=()=>A.createComment(""),R=i=>i===null||typeof i!="object"&&typeof i!="function",tt=Array.isArray,Lt=i=>tt(i)||typeof i?.[Symbol.iterator]=="function",W=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pt=/-->/g,ut=/>/g,_=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),mt=/'/g,yt=/"/g,xt=/^(?:script|style|textarea|title)$/i,et=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),d=et(1),te=et(2),ee=et(3),v=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ft=new WeakMap,b=A.createTreeWalker(A,129);function _t(i,t){if(!tt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return dt!==void 0?dt.createHTML(t):t}var jt=(i,t)=>{let e=i.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",n=O;for(let l=0;l<e;l++){let a=i[l],p,u,h=-1,m=0;for(;m<a.length&&(n.lastIndex=m,u=n.exec(a),u!==null);)m=n.lastIndex,n===O?u[1]==="!--"?n=pt:u[1]!==void 0?n=ut:u[2]!==void 0?(xt.test(u[2])&&(s=RegExp("</"+u[2],"g")),n=_):u[3]!==void 0&&(n=_):n===_?u[0]===">"?(n=s??O,h=-1):u[1]===void 0?h=-2:(h=n.lastIndex-u[2].length,p=u[1],n=u[3]===void 0?_:u[3]==='"'?yt:mt):n===yt||n===mt?n=_:n===pt||n===ut?n=O:(n=_,s=void 0);let f=n===_&&i[l+1].startsWith("/>")?" ":"";o+=n===O?a+zt:h>=0?(r.push(p),a.slice(0,h)+gt+a.slice(h)+g+f):a+g+(h===-2?l:f)}return[_t(i,o+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},M=class i{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let o=0,n=0,l=t.length-1,a=this.parts,[p,u]=jt(t,e);if(this.el=i.createElement(p,r),b.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=b.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(gt)){let m=u[n++],f=s.getAttribute(h).split(g),H=/([.?@])?(.*)/.exec(m);a.push({type:1,index:o,name:H[2],strings:f,ctor:H[1]==="."?Y:H[1]==="?"?G:H[1]==="@"?Z:E}),s.removeAttribute(h)}else h.startsWith(g)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(xt.test(s.tagName)){let h=s.textContent.split(g),m=h.length-1;if(m>0){s.textContent=D?D.emptyScript:"";for(let f=0;f<m;f++)s.append(h[f],T()),b.nextNode(),a.push({type:2,index:++o});s.append(h[m],T())}}}else if(s.nodeType===8)if(s.data===$t)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(g,h+1))!==-1;)a.push({type:7,index:o}),h+=g.length-1}o++}}static createElement(t,e){let r=A.createElement("template");return r.innerHTML=t,r}};function S(i,t,e=i,r){if(t===v)return t;let s=r!==void 0?e._$Co?.[r]:e._$Cl,o=R(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(i),s._$AT(i,e,r)),r!==void 0?(e._$Co??=[])[r]=s:e._$Cl=s),s!==void 0&&(t=S(i,s._$AS(i,t.values),s,r)),t}var F=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,s=(t?.creationScope??A).importNode(e,!0);b.currentNode=s;let o=b.nextNode(),n=0,l=0,a=r[0];for(;a!==void 0;){if(n===a.index){let p;a.type===2?p=new N(o,o.nextSibling,this,t):a.type===1?p=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(p=new X(o,this,t)),this._$AV.push(p),a=r[++l]}n!==a?.index&&(o=b.nextNode(),n++)}return b.currentNode=A,s}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},N=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),R(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==v&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Lt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=M.createElement(_t(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(e);else{let o=new F(s,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=ft.get(t.strings);return e===void 0&&ft.set(t.strings,e=new M(t)),e}k(t){tt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,s=0;for(let o of t)s===e.length?e.push(r=new i(this.O(T()),this.O(T()),this,this.options)):r=e[s],r._$AI(o),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=ct(t).nextSibling;ct(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=c}_$AI(t,e=this,r,s){let o=this.strings,n=!1;if(o===void 0)t=S(this,t,e,0),n=!R(t)||t!==this._$AH&&t!==v,n&&(this._$AH=t);else{let l=t,a,p;for(t=o[0],a=0;a<o.length-1;a++)p=S(this,l[r+a],e,a),p===v&&(p=this._$AH[a]),n||=!R(p)||p!==this._$AH[a],p===c?t=c:t!==c&&(t+=(p??"")+o[a+1]),this._$AH[a]=p}n&&!s&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Y=class extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},G=class extends E{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},Z=class extends E{constructor(t,e,r,s,o){super(t,e,r,s,o),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??c)===v)return;let r=this._$AH,s=t===c&&r!==c||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==c&&(r===c||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},X=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}};var qt=Q.litHtmlPolyfillSupport;qt?.(M,N),(Q.litHtmlVersions??=[]).push("3.3.2");var bt=(i,t,e)=>{let r=e?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=e?.renderBefore??null;r._$litPart$=s=new N(t.insertBefore(T(),o),o,void 0,e??{})}return s._$AI(i),s};var rt=globalThis,$=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=bt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return v}};$._$litElement$=!0,$.finalized=!0,rt.litElementHydrateSupport?.({LitElement:$});var It=rt.litElementPolyfillSupport;It?.({LitElement:$});(rt.litElementVersions??=[]).push("4.2.2");var At=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};var Dt={attribute:!0,type:String,converter:U,reflect:!1,hasChanged:I},Jt=(i=Dt,t,e)=>{let{kind:r,metadata:s}=e,o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),r==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(e.name,i),r==="accessor"){let{name:n}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,i,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,i,l),l}}}if(r==="setter"){let{name:n}=e;return function(l){let a=this[n];t.call(this,l),this.requestUpdate(n,a,i,!0,l)}}throw Error("Unsupported decorator location: "+r)};function J(i){return(t,e)=>typeof e=="object"?Jt(i,t,e):((r,s,o)=>{let n=s.hasOwnProperty(o);return s.constructor.createProperty(o,r),n?Object.getOwnPropertyDescriptor(s,o):void 0})(i,t,e)}var vt=C`
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
`;function st(i){return i.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^\w/,t=>t.toUpperCase())}var Bt=["title","name","label","heading","overview","summary"],Kt=["imageUrl","image","icon","symbol"],Vt=["imageUrl","image"],Wt=6,x=class extends ${constructor(){super(...arguments);this.data=null;this.depth=0}render(){return this.data==null?d`<div class="roxy-empty" role="status">No data</div>`:this.depth>=Wt?d`<div class="roxy-empty" role="status">…</div>`:d`<div
			class="roxy-card"
			aria-label="Generic data display"
		>
			${this.renderValue(this.data)}
		</div>`}renderValue(e){return e==null?c:typeof e=="string"?d`<p>${e}</p>`:typeof e=="number"||typeof e=="boolean"?d`<p>${String(e)}</p>`:Array.isArray(e)?this.renderArray(e):this.renderObject(e)}renderArray(e){return e.length===0?d`<div class="roxy-empty" role="status">Empty list</div>`:e.every(o=>o===null||["string","number","boolean"].includes(typeof o))?d`<ul class="roxy-chips">
				${e.map(o=>d`<li>${String(o)}</li>`)}
			</ul>`:e.every(o=>o!==null&&typeof o=="object"&&!Array.isArray(o))?this.renderTable(e):d`<ol>
			${e.map(o=>d`<li>${this.renderValue(o)}</li>`)}
		</ol>`}renderTable(e){let r=this.collectKeys(e);return d`<table class="roxy-table" role="table">
			<thead>
				<tr>
					${r.map(s=>d`<th>${st(s)}</th>`)}
				</tr>
			</thead>
			<tbody>
				${e.map(s=>d`<tr>
						${r.map(o=>d`<td>${this.formatPrimitive(s[o])}</td>`)}
					</tr>`)}
			</tbody>
		</table>`}renderObject(e){let r=Bt.find(l=>typeof e[l]=="string"),s=Kt.find(l=>typeof e[l]=="string"&&e[l].startsWith("http")),o=r!=="summary"&&typeof e.summary=="string"?"summary":null,n=Object.entries(e).filter(([l,a])=>l!==r&&l!==o&&!Vt.includes(l)&&a!==null&&a!==void 0);return d`
			${s?d`<img
						class="roxy-image"
						src=${String(e[s])}
						alt=${r?String(e[r]):"illustration"}
						loading="lazy"
					/>`:c}
			${r?d`<h3 class="roxy-title">${e[r]}</h3>`:c}
			${o?d`<p class="roxy-summary">${e[o]}</p>`:c}
			${n.length>0?d`<dl class="roxy-rows">
						${n.map(([l,a])=>d`
								<dt>${st(l)}</dt>
								<dd>${this.renderField(a)}</dd>
							`)}
					</dl>`:c}
		`}renderField(e){return e==null?"":typeof e=="string"?e:typeof e=="number"||typeof e=="boolean"?String(e):Array.isArray(e)&&e.every(s=>["string","number","boolean"].includes(typeof s))?d`<ul class="roxy-chips">
					${e.map(s=>d`<li>${String(s)}</li>`)}
				</ul>`:d`<roxy-data .data=${e} .depth=${this.depth+1}></roxy-data>`}formatPrimitive(e){return e==null?"":typeof e=="string"?e:typeof e=="number"||typeof e=="boolean"?String(e):Array.isArray(e)?e.map(String).join(", "):JSON.stringify(e)}collectKeys(e){let r=new Set;for(let s of e)for(let o of Object.keys(s))r.add(o);return Array.from(r)}};x.styles=[vt,C`
			.roxy-card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-md, 1rem);
				box-shadow: var(--roxy-shadow-sm);
			}

			.roxy-title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0 0 var(--roxy-space-sm, 0.5rem) 0;
				color: var(--roxy-primary, #0f172a);
				letter-spacing: var(--roxy-tracking-tight);
			}

			.roxy-summary {
				color: var(--roxy-secondary, #475569);
				margin: 0 0 var(--roxy-space-md, 1rem) 0;
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			dl.roxy-rows {
				margin: 0;
				display: grid;
				grid-template-columns: minmax(8ch, max-content) 1fr;
				gap: var(--roxy-space-xs, 0.25rem) var(--roxy-space-md, 1rem);
			}
			dl.roxy-rows dt {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				text-transform: capitalize;
			}
			dl.roxy-rows dd {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				word-break: break-word;
			}

			ul.roxy-chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				padding: 0;
				margin: 0;
				list-style: none;
			}
			ul.roxy-chips li {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			table.roxy-table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			table.roxy-table th,
			table.roxy-table td {
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				padding: var(--roxy-space-sm, 0.5rem);
				text-align: left;
				text-transform: none;
			}
			table.roxy-table th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: capitalize;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.04em;
			}

			.roxy-image {
				max-width: 100%;
				height: auto;
				border-radius: var(--roxy-radius-md, 8px);
				margin-bottom: var(--roxy-space-md, 1rem);
			}

			.roxy-section {
				margin-bottom: var(--roxy-space-md, 1rem);
			}
			.roxy-section h4 {
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-secondary, #475569);
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
				text-transform: capitalize;
			}
		`],z([J({attribute:!1})],x.prototype,"data",2),z([J({attribute:!1})],x.prototype,"depth",2),x=z([At("roxy-data")],x);return Pt(Ft);})();
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
//# sourceMappingURL=data.js.map
