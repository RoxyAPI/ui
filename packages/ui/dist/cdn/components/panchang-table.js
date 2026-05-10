"use strict";var RoxyUI_panchang_table=(()=>{var j=Object.defineProperty;var it=Object.getOwnPropertyDescriptor;var wt=Object.getOwnPropertyNames;var Pt=Object.prototype.hasOwnProperty;var Ct=(o,t)=>{for(var e in t)j(o,e,{get:t[e],enumerable:!0})},Mt=(o,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of wt(t))!Pt.call(o,s)&&s!==e&&j(o,s,{get:()=>t[s],enumerable:!(r=it(t,s))||r.enumerable});return o};var Nt=o=>Mt(j({},"__esModule",{value:!0}),o),D=(o,t,e,r)=>{for(var s=r>1?void 0:r?it(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&j(t,e,s),s};var Wt={};Ct(Wt,{RoxyPanchangTable:()=>_});var z=globalThis,L=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),nt=new WeakMap,P=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(L&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=nt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&nt.set(e,t))}return t}toString(){return this.cssText}},at=o=>new P(typeof o=="string"?o:o+"",void 0,W),C=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((r,s,i)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[i+1],o[0]);return new P(e,o,W)},ht=(o,t)=>{if(L)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),s=z.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,o.appendChild(r)}},F=L?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return at(e)})(o):o;var{is:Tt,defineProperty:Ut,getOwnPropertyDescriptor:Ot,getOwnPropertyNames:kt,getOwnPropertySymbols:Rt,getPrototypeOf:Ht}=Object,q=globalThis,lt=q.trustedTypes,jt=lt?lt.emptyScript:"",Dt=q.reactiveElementPolyfillSupport,M=(o,t)=>o,N={toAttribute(o,t){switch(t){case Boolean:o=o?jt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},B=(o,t)=>!Tt(o,t),dt={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:B};Symbol.metadata??=Symbol("metadata"),q.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=dt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&Ut(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){let{get:s,set:i}=Ot(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let h=s?.call(this);i?.call(this,n),this.requestUpdate(t,h,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??dt}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;let t=Ht(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){let e=this.properties,r=[...kt(e),...Rt(e)];for(let s of r)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let s of r)e.unshift(F(s))}else t!==void 0&&e.push(F(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ht(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:N).toAttribute(e,r.type);this._$Em=t,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(t,e){let r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let i=r.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:N;this._$Em=s;let h=n.fromAttribute(e,i.type);this[s]=h??this._$Ej?.get(s)??h,this._$Em=null}}requestUpdate(t,e,r,s=!1,i){if(t!==void 0){let n=this.constructor;if(s===!1&&(i=this[t]),r??=n.getPropertyOptions(t),!((r.hasChanged??B)(i,e)||r.useDefault&&r.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:s,wrapped:i},n){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),i!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,i]of r){let{wrapped:n}=i,h=this[s];n!==!0||this._$AL.has(s)||h===void 0||this.C(s,void 0,i,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[M("elementProperties")]=new Map,f[M("finalized")]=new Map,Dt?.({ReactiveElement:f}),(q.reactiveElementVersions??=[]).push("2.1.2");var tt=globalThis,ct=o=>o,I=tt.trustedTypes,pt=I?I.createPolicy("lit-html",{createHTML:o=>o}):void 0,$t="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,_t="?"+g,zt=`<${_t}>`,x=document,U=()=>x.createComment(""),O=o=>o===null||typeof o!="object"&&typeof o!="function",et=Array.isArray,Lt=o=>et(o)||typeof o?.[Symbol.iterator]=="function",G=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,mt=/>/g,b=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,yt=/"/g,bt=/^(?:script|style|textarea|title)$/i,rt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),u=rt(1),Qt=rt(2),Xt=rt(3),A=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),gt=new WeakMap,v=x.createTreeWalker(x,129);function vt(o,t){if(!et(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(t):t}var qt=(o,t)=>{let e=o.length-1,r=[],s,i=t===2?"<svg>":t===3?"<math>":"",n=T;for(let h=0;h<e;h++){let a=o[h],c,p,l=-1,m=0;for(;m<a.length&&(n.lastIndex=m,p=n.exec(a),p!==null);)m=n.lastIndex,n===T?p[1]==="!--"?n=ut:p[1]!==void 0?n=mt:p[2]!==void 0?(bt.test(p[2])&&(s=RegExp("</"+p[2],"g")),n=b):p[3]!==void 0&&(n=b):n===b?p[0]===">"?(n=s??T,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,c=p[1],n=p[3]===void 0?b:p[3]==='"'?yt:ft):n===yt||n===ft?n=b:n===ut||n===mt?n=T:(n=b,s=void 0);let y=n===b&&o[h+1].startsWith("/>")?" ":"";i+=n===T?a+zt:l>=0?(r.push(c),a.slice(0,l)+$t+a.slice(l)+g+y):a+g+(l===-2?h:y)}return[vt(o,i+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},k=class o{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let i=0,n=0,h=t.length-1,a=this.parts,[c,p]=qt(t,e);if(this.el=o.createElement(c,r),v.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=v.nextNode())!==null&&a.length<h;){if(s.nodeType===1){if(s.hasAttributes())for(let l of s.getAttributeNames())if(l.endsWith($t)){let m=p[n++],y=s.getAttribute(l).split(g),H=/([.?@])?(.*)/.exec(m);a.push({type:1,index:i,name:H[2],strings:y,ctor:H[1]==="."?J:H[1]==="?"?Z:H[1]==="@"?Q:w}),s.removeAttribute(l)}else l.startsWith(g)&&(a.push({type:6,index:i}),s.removeAttribute(l));if(bt.test(s.tagName)){let l=s.textContent.split(g),m=l.length-1;if(m>0){s.textContent=I?I.emptyScript:"";for(let y=0;y<m;y++)s.append(l[y],U()),v.nextNode(),a.push({type:2,index:++i});s.append(l[m],U())}}}else if(s.nodeType===8)if(s.data===_t)a.push({type:2,index:i});else{let l=-1;for(;(l=s.data.indexOf(g,l+1))!==-1;)a.push({type:7,index:i}),l+=g.length-1}i++}}static createElement(t,e){let r=x.createElement("template");return r.innerHTML=t,r}};function E(o,t,e=o,r){if(t===A)return t;let s=r!==void 0?e._$Co?.[r]:e._$Cl,i=O(t)?void 0:t._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(o),s._$AT(o,e,r)),r!==void 0?(e._$Co??=[])[r]=s:e._$Cl=s),s!==void 0&&(t=E(o,s._$AS(o,t.values),s,r)),t}var Y=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,s=(t?.creationScope??x).importNode(e,!0);v.currentNode=s;let i=v.nextNode(),n=0,h=0,a=r[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new R(i,i.nextSibling,this,t):a.type===1?c=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(c=new X(i,this,t)),this._$AV.push(c),a=r[++h]}n!==a?.index&&(i=v.nextNode(),n++)}return v.currentNode=x,s}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},R=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),O(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Lt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=k.createElement(vt(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(e);else{let i=new Y(s,this),n=i.u(this.options);i.p(e),this.T(n),this._$AH=i}}_$AC(t){let e=gt.get(t.strings);return e===void 0&&gt.set(t.strings,e=new k(t)),e}k(t){et(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,s=0;for(let i of t)s===e.length?e.push(r=new o(this.O(U()),this.O(U()),this,this.options)):r=e[s],r._$AI(i),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=ct(t).nextSibling;ct(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},w=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,i){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=d}_$AI(t,e=this,r,s){let i=this.strings,n=!1;if(i===void 0)t=E(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==A,n&&(this._$AH=t);else{let h=t,a,c;for(t=i[0],a=0;a<i.length-1;a++)c=E(this,h[r+a],e,a),c===A&&(c=this._$AH[a]),n||=!O(c)||c!==this._$AH[a],c===d?t=d:t!==d&&(t+=(c??"")+i[a+1]),this._$AH[a]=c}n&&!s&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},J=class extends w{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},Z=class extends w{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},Q=class extends w{constructor(t,e,r,s,i){super(t,e,r,s,i),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??d)===A)return;let r=this._$AH,s=t===d&&r!==d||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==d&&(r===d||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},X=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}};var Bt=tt.litHtmlPolyfillSupport;Bt?.(k,R),(tt.litHtmlVersions??=[]).push("3.3.2");var xt=(o,t,e)=>{let r=e?.renderBefore??t,s=r._$litPart$;if(s===void 0){let i=e?.renderBefore??null;r._$litPart$=s=new R(t.insertBefore(U(),i),i,void 0,e??{})}return s._$AI(o),s};var st=globalThis,$=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=xt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};$._$litElement$=!0,$.finalized=!0,st.litElementHydrateSupport?.({LitElement:$});var It=st.litElementPolyfillSupport;It?.({LitElement:$});(st.litElementVersions??=[]).push("4.2.2");var At=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};var Vt={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:B},Kt=(o=Vt,t,e)=>{let{kind:r,metadata:s}=e,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),r==="setter"&&((o=Object.create(o)).wrapped=!0),i.set(e.name,o),r==="accessor"){let{name:n}=e;return{set(h){let a=t.get.call(this);t.set.call(this,h),this.requestUpdate(n,a,o,!0,h)},init(h){return h!==void 0&&this.C(n,void 0,o,h),h}}}if(r==="setter"){let{name:n}=e;return function(h){let a=this[n];t.call(this,h),this.requestUpdate(n,a,o,!0,h)}}throw Error("Unsupported decorator location: "+r)};function V(o){return(t,e)=>typeof e=="object"?Kt(o,t,e):((r,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,r),n?Object.getOwnPropertyDescriptor(s,i):void 0})(o,t,e)}var St=C`
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
`;function S(o){if(typeof o!="string"||o.length===0||/^\d{4}-\d{2}-\d{2}$/.test(o))return"";let e=/^\d{2}:\d{2}(:\d{2})?$/.test(o)?`1970-01-01T${o}`:o,r=new Date(e);return Number.isNaN(r.getTime())?o:r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit",hour12:!0})}function Et(o){if(typeof o!="string"||o.length===0)return"";let t=new Date(/^\d{4}-\d{2}-\d{2}$/.test(o)?`${o}T00:00:00`:o);return Number.isNaN(t.getTime())?o:t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}function ot(o){if(!o)return"";let t=S(o.start),e=S(o.end);return t&&e?`${t} - ${e}`:t||e||""}var _=class extends ${constructor(){super(...arguments);this.data=null;this.detail="detailed"}render(){let e=this.data;if(!e)return u`<div class="roxy-empty" role="status">No panchang data</div>`;let r="sunrise"in e?e:null,s=[["Tithi",this.formatPart(e.tithi)],["Nakshatra",this.formatPart(e.nakshatra)],["Yoga",this.formatPart(e.yoga)],["Karana",this.formatPart(e.karana)]];r&&s.push(["Vara",this.formatPart(r.vara)]);let i=r?[["Brahma Muhurta",r.brahmaMuhurta],["Abhijit Muhurta",r.abhijitMuhurta],["Vijaya Muhurta",r.vijayaMuhurta],["Godhuli Muhurta",r.godhuliMuhurta],["Nishita Muhurta",r.nishitaMuhurta],["Pratah Sandhya",r.pratahSandhya],["Sayahna Sandhya",r.sayahnaSandhya]]:[],n=r?[["Rahu Kaal",r.rahuKaal],["Yamaganda",r.yamaganda],["Gulika",r.gulika]]:[];return u`<div class="wrap" aria-label="Panchang">
			<header class="head">
				<h2 class="title">Panchang</h2>
				<span class="date">${r?Et(r.date):""}</span>
			</header>
			<table>
				<tbody>
					${s.map(([h,a])=>u`<tr>
							<th>${h}</th>
							<td>${a}</td>
						</tr>`)}
					${r?.sunrise?u`<tr>
								<th>Sunrise</th>
								<td>${S(r.sunrise)}</td>
							</tr>`:d}
					${r?.sunset?u`<tr>
								<th>Sunset</th>
								<td>${S(r.sunset)}</td>
							</tr>`:d}
					${r?.moonrise?u`<tr>
								<th>Moonrise</th>
								<td>${S(r.moonrise)}</td>
							</tr>`:d}
					${r?.moonset?u`<tr>
								<th>Moonset</th>
								<td>${S(r.moonset)}</td>
							</tr>`:d}
				</tbody>
			</table>
			${this.detail==="detailed"&&(i.some(h=>!!h[1])||n.some(h=>!!h[1]))?u`
						<div class="section">Auspicious muhurtas</div>
						<table>
							<tbody>
								${i.filter(([,h])=>!!h).map(([h,a])=>u`<tr>
											<th>${h}</th>
											<td>${ot(a)}</td>
										</tr>`)}
							</tbody>
						</table>
						<div class="section">Inauspicious periods</div>
						<table>
							<tbody>
								${n.filter(([,h])=>!!h).map(([h,a])=>u`<tr>
											<th>${h}</th>
											<td>${ot(a)}</td>
										</tr>`)}
							</tbody>
						</table>
					`:d}
		</div>`}formatPart(e){if(!e)return"";if(typeof e=="string")return e;if(typeof e=="object"){let r=e;return[r.name,r.lord?`(${r.lord})`:"",r.phase].filter(Boolean).join(" ")}return String(e)}};_.styles=[St,C`
			.wrap {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-bg, #fff);
				overflow: hidden;
				box-shadow: var(--roxy-shadow-sm);
			}
			.head {
				padding: var(--roxy-space-md, 1rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.date {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			tbody tr:nth-child(odd) {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 24%, transparent);
			}
			th,
			td {
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				text-align: left;
				vertical-align: top;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				width: 38%;
				text-transform: capitalize;
			}
			td {
				color: var(--roxy-fg, #0a0a0a);
				font-variant-numeric: tabular-nums;
			}
			.section {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
		`],D([V({attribute:!1})],_.prototype,"data",2),D([V({type:String,reflect:!0})],_.prototype,"detail",2),_=D([At("roxy-panchang-table")],_);return Nt(Wt);})();
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
//# sourceMappingURL=panchang-table.js.map
