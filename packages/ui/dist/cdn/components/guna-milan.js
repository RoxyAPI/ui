"use strict";var RoxyUI_guna_milan=(()=>{var H=Object.defineProperty;var ot=Object.getOwnPropertyDescriptor;var Et=Object.getOwnPropertyNames;var wt=Object.prototype.hasOwnProperty;var Ct=(o,t)=>{for(var e in t)H(o,e,{get:t[e],enumerable:!0})},Pt=(o,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Et(t))!wt.call(o,s)&&s!==e&&H(o,s,{get:()=>t[s],enumerable:!(r=ot(t,s))||r.enumerable});return o};var Tt=o=>Pt(H({},"__esModule",{value:!0}),o),V=(o,t,e,r)=>{for(var s=r>1?void 0:r?ot(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&H(t,e,s),s};var Yt={};Ct(Yt,{GUNA_CATEGORIES:()=>Kt,RoxyGunaMilan:()=>A});var z=globalThis,L=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),it=new WeakMap,w=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(L&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=it.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&it.set(e,t))}return t}toString(){return this.cssText}},nt=o=>new w(typeof o=="string"?o:o+"",void 0,W),C=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((r,s,i)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[i+1],o[0]);return new w(e,o,W)},at=(o,t)=>{if(L)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),s=z.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,o.appendChild(r)}},F=L?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return nt(e)})(o):o;var{is:Nt,defineProperty:Ut,getOwnPropertyDescriptor:Ot,getOwnPropertyNames:kt,getOwnPropertySymbols:Rt,getPrototypeOf:Mt}=Object,D=globalThis,ct=D.trustedTypes,Ht=ct?ct.emptyScript:"",zt=D.reactiveElementPolyfillSupport,P=(o,t)=>o,T={toAttribute(o,t){switch(t){case Boolean:o=o?Ht:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},j=(o,t)=>!Nt(o,t),lt={attribute:!0,type:String,converter:T,reflect:!1,useDefault:!1,hasChanged:j};Symbol.metadata??=Symbol("metadata"),D.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&Ut(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){let{get:s,set:i}=Ot(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let c=s?.call(this);i?.call(this,n),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??lt}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let t=Mt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let e=this.properties,r=[...kt(e),...Rt(e)];for(let s of r)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let s of r)e.unshift(F(s))}else t!==void 0&&e.push(F(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return at(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:T).toAttribute(e,r.type);this._$Em=t,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(t,e){let r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let i=r.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:T;this._$Em=s;let c=n.fromAttribute(e,i.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(t,e,r,s=!1,i){if(t!==void 0){let n=this.constructor;if(s===!1&&(i=this[t]),r??=n.getPropertyOptions(t),!((r.hasChanged??j)(i,e)||r.useDefault&&r.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:s,wrapped:i},n){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),i!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,i]of r){let{wrapped:n}=i,c=this[s];n!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,i,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[P("elementProperties")]=new Map,f[P("finalized")]=new Map,zt?.({ReactiveElement:f}),(D.reactiveElementVersions??=[]).push("2.1.2");var X=globalThis,ht=o=>o,q=X.trustedTypes,dt=q?q.createPolicy("lit-html",{createHTML:o=>o}):void 0,yt="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,$t="?"+y,Lt=`<${$t}>`,v=document,U=()=>v.createComment(""),O=o=>o===null||typeof o!="object"&&typeof o!="function",tt=Array.isArray,Dt=o=>tt(o)||typeof o?.[Symbol.iterator]=="function",K=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pt=/-->/g,ut=/>/g,_=RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),mt=/'/g,ft=/"/g,_t=/^(?:script|style|textarea|title)$/i,et=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),u=et(1),te=et(2),ee=et(3),b=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),gt=new WeakMap,x=v.createTreeWalker(v,129);function xt(o,t){if(!tt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return dt!==void 0?dt.createHTML(t):t}var jt=(o,t)=>{let e=o.length-1,r=[],s,i=t===2?"<svg>":t===3?"<math>":"",n=N;for(let c=0;c<e;c++){let a=o[c],d,p,l=-1,m=0;for(;m<a.length&&(n.lastIndex=m,p=n.exec(a),p!==null);)m=n.lastIndex,n===N?p[1]==="!--"?n=pt:p[1]!==void 0?n=ut:p[2]!==void 0?(_t.test(p[2])&&(s=RegExp("</"+p[2],"g")),n=_):p[3]!==void 0&&(n=_):n===_?p[0]===">"?(n=s??N,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?_:p[3]==='"'?ft:mt):n===ft||n===mt?n=_:n===pt||n===ut?n=N:(n=_,s=void 0);let g=n===_&&o[c+1].startsWith("/>")?" ":"";i+=n===N?a+Lt:l>=0?(r.push(d),a.slice(0,l)+yt+a.slice(l)+y+g):a+y+(l===-2?c:g)}return[xt(o,i+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},k=class o{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let i=0,n=0,c=t.length-1,a=this.parts,[d,p]=jt(t,e);if(this.el=o.createElement(d,r),x.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=x.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let l of s.getAttributeNames())if(l.endsWith(yt)){let m=p[n++],g=s.getAttribute(l).split(y),M=/([.?@])?(.*)/.exec(m);a.push({type:1,index:i,name:M[2],strings:g,ctor:M[1]==="."?G:M[1]==="?"?J:M[1]==="@"?Z:E}),s.removeAttribute(l)}else l.startsWith(y)&&(a.push({type:6,index:i}),s.removeAttribute(l));if(_t.test(s.tagName)){let l=s.textContent.split(y),m=l.length-1;if(m>0){s.textContent=q?q.emptyScript:"";for(let g=0;g<m;g++)s.append(l[g],U()),x.nextNode(),a.push({type:2,index:++i});s.append(l[m],U())}}}else if(s.nodeType===8)if(s.data===$t)a.push({type:2,index:i});else{let l=-1;for(;(l=s.data.indexOf(y,l+1))!==-1;)a.push({type:7,index:i}),l+=y.length-1}i++}}static createElement(t,e){let r=v.createElement("template");return r.innerHTML=t,r}};function S(o,t,e=o,r){if(t===b)return t;let s=r!==void 0?e._$Co?.[r]:e._$Cl,i=O(t)?void 0:t._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(o),s._$AT(o,e,r)),r!==void 0?(e._$Co??=[])[r]=s:e._$Cl=s),s!==void 0&&(t=S(o,s._$AS(o,t.values),s,r)),t}var Y=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,s=(t?.creationScope??v).importNode(e,!0);x.currentNode=s;let i=x.nextNode(),n=0,c=0,a=r[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new R(i,i.nextSibling,this,t):a.type===1?d=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(d=new Q(i,this,t)),this._$AV.push(d),a=r[++c]}n!==a?.index&&(i=x.nextNode(),n++)}return x.currentNode=v,s}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},R=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),O(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Dt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(v.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=k.createElement(xt(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(e);else{let i=new Y(s,this),n=i.u(this.options);i.p(e),this.T(n),this._$AH=i}}_$AC(t){let e=gt.get(t.strings);return e===void 0&&gt.set(t.strings,e=new k(t)),e}k(t){tt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,s=0;for(let i of t)s===e.length?e.push(r=new o(this.O(U()),this.O(U()),this,this.options)):r=e[s],r._$AI(i),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=ht(t).nextSibling;ht(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,i){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=h}_$AI(t,e=this,r,s){let i=this.strings,n=!1;if(i===void 0)t=S(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else{let c=t,a,d;for(t=i[0],a=0;a<i.length-1;a++)d=S(this,c[r+a],e,a),d===b&&(d=this._$AH[a]),n||=!O(d)||d!==this._$AH[a],d===h?t=h:t!==h&&(t+=(d??"")+i[a+1]),this._$AH[a]=d}n&&!s&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},G=class extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}},J=class extends E{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},Z=class extends E{constructor(t,e,r,s,i){super(t,e,r,s,i),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??h)===b)return;let r=this._$AH,s=t===h&&r!==h||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==h&&(r===h||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Q=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}};var qt=X.litHtmlPolyfillSupport;qt?.(k,R),(X.litHtmlVersions??=[]).push("3.3.2");var vt=(o,t,e)=>{let r=e?.renderBefore??t,s=r._$litPart$;if(s===void 0){let i=e?.renderBefore??null;r._$litPart$=s=new R(t.insertBefore(U(),i),i,void 0,e??{})}return s._$AI(o),s};var rt=globalThis,$=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=vt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};$._$litElement$=!0,$.finalized=!0,rt.litElementHydrateSupport?.({LitElement:$});var Bt=rt.litElementPolyfillSupport;Bt?.({LitElement:$});(rt.litElementVersions??=[]).push("4.2.2");var bt=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};var It={attribute:!0,type:String,converter:T,reflect:!1,hasChanged:j},Vt=(o=It,t,e)=>{let{kind:r,metadata:s}=e,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),r==="setter"&&((o=Object.create(o)).wrapped=!0),i.set(e.name,o),r==="accessor"){let{name:n}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(n,a,o,!0,c)},init(c){return c!==void 0&&this.C(n,void 0,o,c),c}}}if(r==="setter"){let{name:n}=e;return function(c){let a=this[n];t.call(this,c),this.requestUpdate(n,a,o,!0,c)}}throw Error("Unsupported decorator location: "+r)};function st(o){return(t,e)=>typeof e=="object"?Vt(o,t,e):((r,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,r),n?Object.getOwnPropertyDescriptor(s,i):void 0})(o,t,e)}var At=C`
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
`;function I(o,t=1){return typeof o!="number"||!Number.isFinite(o)?"":o.toFixed(t).replace(/\.?0+$/,"")}function St(o,t=1){let e=I(o,t);return e?`${e}%`:""}var Wt=["Varna","Vasya","Tara","Yoni","Maitri","Gana","Bhakoot","Nadi"],A=class extends ${constructor(){super(...arguments);this.data=null}render(){let e=this.data;if(!e)return u`<div class="roxy-empty" role="status">No Guna Milan data</div>`;let r=(e.breakdown??[]).filter(s=>s?.category!==void 0);return u`<article class="card" aria-label="Guna Milan score">
			<div class="score-bar">
				<div>
					<span class="total">${I(e.total,1)}</span>
					<span class="over"> / ${e.maxScore}</span>
					${typeof e.percentage=="number"?u`<small style="margin-left: 0.5rem; color: var(--roxy-muted)">
								${St(e.percentage,1)}
							</small>`:h}
				</div>
				${e.recommendation?u`<span class="recommendation">${e.recommendation}</span>`:h}
			</div>

			${r.length>0?u`<table>
						<thead>
							<tr>
								<th>Category</th>
								<th>Progress</th>
								<th class="score">Score</th>
							</tr>
						</thead>
						<tbody>
							${r.map(s=>{let i=s.score??0,n=s.maxScore??Ft(s.category),c=n?i/n*100:0;return u`<tr>
									<td>${s.category}</td>
									<td class="bar-cell">
										<div class="mini-bar">
											<span style="width: ${c}%"></span>
										</div>
									</td>
									<td class="score">${I(i,1)} / ${n}</td>
								</tr>`})}
						</tbody>
					</table>`:h}
			${(e.doshas?.length??0)>0||(e.doshaCancellations?.length??0)>0?u`<div class="tags">
						${e.doshas?.map(s=>u`<span class="dosha">${s}</span>`)}
						${e.doshaCancellations?.map(s=>u`<span class="cancel" title=${s.reason}>${s.dosha} cancelled</span>`)}
					</div>`:h}
		</article>`}};A.styles=[At,C`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.score-bar {
				display: grid;
				grid-template-columns: 1fr auto;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			.total {
				font-size: 2.25rem;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-fg, #b45309);
				font-variant-numeric: tabular-nums;
				line-height: 1;
			}
			.over {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-base, 1rem);
			}
			.recommendation {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}

			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			th,
			td {
				padding: var(--roxy-space-sm, 0.5rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				text-align: left;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.06em;
			}
			td.score {
				text-align: right;
				font-variant-numeric: tabular-nums;
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
			}
			td.bar-cell {
				width: 30%;
			}
			.mini-bar {
				height: 8px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
			}
			.mini-bar > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}

			.tags {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.tags span {
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.tags .dosha {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.tags .cancel {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 18%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
		`],V([st({attribute:!1})],A.prototype,"data",2),A=V([bt("roxy-guna-milan")],A);function Ft(o){if(!o)return 1;switch(o.toLowerCase()){case"varna":return 1;case"vasya":return 2;case"tara":return 3;case"yoni":return 4;case"maitri":return 5;case"gana":return 6;case"bhakoot":return 7;case"nadi":return 8;default:return 1}}var Kt=Wt;return Tt(Yt);})();
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
//# sourceMappingURL=guna-milan.js.map
