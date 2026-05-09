"use strict";var RoxyUI_guna_milan=(()=>{var H=Object.defineProperty;var rt=Object.getOwnPropertyDescriptor;var At=Object.getOwnPropertyNames;var St=Object.prototype.hasOwnProperty;var Et=(o,t)=>{for(var e in t)H(o,e,{get:t[e],enumerable:!0})},wt=(o,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of At(t))!St.call(o,r)&&r!==e&&H(o,r,{get:()=>t[r],enumerable:!(s=rt(t,r))||s.enumerable});return o};var Ct=o=>wt(H({},"__esModule",{value:!0}),o),I=(o,t,e,s)=>{for(var r=s>1?void 0:s?rt(t,e):t,n=o.length-1,i;n>=0;n--)(i=o[n])&&(r=(s?i(t,e,r):i(r))||r);return s&&r&&H(t,e,r),r};var Gt={};Et(Gt,{GUNA_CATEGORIES:()=>Wt,RoxyGunaMilan:()=>A});var z=globalThis,D=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),ot=new WeakMap,w=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(D&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ot.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ot.set(e,t))}return t}toString(){return this.cssText}},it=o=>new w(typeof o=="string"?o:o+"",void 0,V),C=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((s,r,n)=>s+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[n+1],o[0]);return new w(e,o,V)},nt=(o,t)=>{if(D)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=z.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,o.appendChild(s)}},W=D?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return it(e)})(o):o;var{is:Pt,defineProperty:Ut,getOwnPropertyDescriptor:Ot,getOwnPropertyNames:Tt,getOwnPropertySymbols:kt,getPrototypeOf:Mt}=Object,L=globalThis,at=L.trustedTypes,Nt=at?at.emptyScript:"",Rt=L.reactiveElementPolyfillSupport,P=(o,t)=>o,U={toAttribute(o,t){switch(t){case Boolean:o=o?Nt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},j=(o,t)=>!Pt(o,t),ct={attribute:!0,type:String,converter:U,reflect:!1,useDefault:!1,hasChanged:j};Symbol.metadata??=Symbol("metadata"),L.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ct){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&Ut(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:n}=Ot(this.prototype,t)??{get(){return this[e]},set(i){this[e]=i}};return{get:r,set(i){let c=r?.call(this);n?.call(this,i),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ct}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let t=Mt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let e=this.properties,s=[...Tt(e),...kt(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(W(r))}else t!==void 0&&e.push(W(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return nt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:U).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let n=s.getPropertyOptions(r),i=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:U;this._$Em=r;let c=i.fromAttribute(e,n.type);this[r]=c??this._$Ej?.get(r)??c,this._$Em=null}}requestUpdate(t,e,s,r=!1,n){if(t!==void 0){let i=this.constructor;if(r===!1&&(n=this[t]),s??=i.getPropertyOptions(t),!((s.hasChanged??j)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:n},i){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??e??this[t]),n!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,n]of s){let{wrapped:i}=n,c=this[r];i!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,n,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[P("elementProperties")]=new Map,f[P("finalized")]=new Map,Rt?.({ReactiveElement:f}),(L.reactiveElementVersions??=[]).push("2.1.2");var Q=globalThis,lt=o=>o,q=Q.trustedTypes,ht=q?q.createPolicy("lit-html",{createHTML:o=>o}):void 0,yt="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,gt="?"+g,Ht=`<${gt}>`,x=document,T=()=>x.createComment(""),k=o=>o===null||typeof o!="object"&&typeof o!="function",X=Array.isArray,zt=o=>X(o)||typeof o?.[Symbol.iterator]=="function",G=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,pt=/>/g,_=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ut=/'/g,mt=/"/g,$t=/^(?:script|style|textarea|title)$/i,tt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),u=tt(1),Qt=tt(2),Xt=tt(3),b=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),ft=new WeakMap,v=x.createTreeWalker(x,129);function _t(o,t){if(!X(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return ht!==void 0?ht.createHTML(t):t}var Dt=(o,t)=>{let e=o.length-1,s=[],r,n=t===2?"<svg>":t===3?"<math>":"",i=O;for(let c=0;c<e;c++){let a=o[c],d,p,l=-1,m=0;for(;m<a.length&&(i.lastIndex=m,p=i.exec(a),p!==null);)m=i.lastIndex,i===O?p[1]==="!--"?i=dt:p[1]!==void 0?i=pt:p[2]!==void 0?($t.test(p[2])&&(r=RegExp("</"+p[2],"g")),i=_):p[3]!==void 0&&(i=_):i===_?p[0]===">"?(i=r??O,l=-1):p[1]===void 0?l=-2:(l=i.lastIndex-p[2].length,d=p[1],i=p[3]===void 0?_:p[3]==='"'?mt:ut):i===mt||i===ut?i=_:i===dt||i===pt?i=O:(i=_,r=void 0);let y=i===_&&o[c+1].startsWith("/>")?" ":"";n+=i===O?a+Ht:l>=0?(s.push(d),a.slice(0,l)+yt+a.slice(l)+g+y):a+g+(l===-2?c:y)}return[_t(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},M=class o{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,i=0,c=t.length-1,a=this.parts,[d,p]=Dt(t,e);if(this.el=o.createElement(d,s),v.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(r=v.nextNode())!==null&&a.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(let l of r.getAttributeNames())if(l.endsWith(yt)){let m=p[i++],y=r.getAttribute(l).split(g),R=/([.?@])?(.*)/.exec(m);a.push({type:1,index:n,name:R[2],strings:y,ctor:R[1]==="."?K:R[1]==="?"?Y:R[1]==="@"?J:E}),r.removeAttribute(l)}else l.startsWith(g)&&(a.push({type:6,index:n}),r.removeAttribute(l));if($t.test(r.tagName)){let l=r.textContent.split(g),m=l.length-1;if(m>0){r.textContent=q?q.emptyScript:"";for(let y=0;y<m;y++)r.append(l[y],T()),v.nextNode(),a.push({type:2,index:++n});r.append(l[m],T())}}}else if(r.nodeType===8)if(r.data===gt)a.push({type:2,index:n});else{let l=-1;for(;(l=r.data.indexOf(g,l+1))!==-1;)a.push({type:7,index:n}),l+=g.length-1}n++}}static createElement(t,e){let s=x.createElement("template");return s.innerHTML=t,s}};function S(o,t,e=o,s){if(t===b)return t;let r=s!==void 0?e._$Co?.[s]:e._$Cl,n=k(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(o),r._$AT(o,e,s)),s!==void 0?(e._$Co??=[])[s]=r:e._$Cl=r),r!==void 0&&(t=S(o,r._$AS(o,t.values),r,s)),t}var F=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??x).importNode(e,!0);v.currentNode=r;let n=v.nextNode(),i=0,c=0,a=s[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new N(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new Z(n,this,t)),this._$AV.push(d),a=s[++c]}i!==a?.index&&(n=v.nextNode(),i++)}return v.currentNode=x,r}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},N=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),k(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):zt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&k(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=M.createElement(_t(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{let n=new F(r,this),i=n.u(this.options);n.p(e),this.T(i),this._$AH=n}}_$AC(t){let e=ft.get(t.strings);return e===void 0&&ft.set(t.strings,e=new M(t)),e}k(t){X(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let n of t)r===e.length?e.push(s=new o(this.O(T()),this.O(T()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=lt(t).nextSibling;lt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,n){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(t,e=this,s,r){let n=this.strings,i=!1;if(n===void 0)t=S(this,t,e,0),i=!k(t)||t!==this._$AH&&t!==b,i&&(this._$AH=t);else{let c=t,a,d;for(t=n[0],a=0;a<n.length-1;a++)d=S(this,c[s+a],e,a),d===b&&(d=this._$AH[a]),i||=!k(d)||d!==this._$AH[a],d===h?t=h:t!==h&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}i&&!r&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},K=class extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}},Y=class extends E{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},J=class extends E{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??h)===b)return;let s=this._$AH,r=t===h&&s!==h||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==h&&(s===h||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Z=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}};var Lt=Q.litHtmlPolyfillSupport;Lt?.(M,N),(Q.litHtmlVersions??=[]).push("3.3.2");var vt=(o,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let n=e?.renderBefore??null;s._$litPart$=r=new N(t.insertBefore(T(),n),n,void 0,e??{})}return r._$AI(o),r};var et=globalThis,$=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=vt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};$._$litElement$=!0,$.finalized=!0,et.litElementHydrateSupport?.({LitElement:$});var jt=et.litElementPolyfillSupport;jt?.({LitElement:$});(et.litElementVersions??=[]).push("4.2.2");var xt=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};var qt={attribute:!0,type:String,converter:U,reflect:!1,hasChanged:j},Bt=(o=qt,t,e)=>{let{kind:s,metadata:r}=e,n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),s==="setter"&&((o=Object.create(o)).wrapped=!0),n.set(e.name,o),s==="accessor"){let{name:i}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(i,a,o,!0,c)},init(c){return c!==void 0&&this.C(i,void 0,o,c),c}}}if(s==="setter"){let{name:i}=e;return function(c){let a=this[i];t.call(this,c),this.requestUpdate(i,a,o,!0,c)}}throw Error("Unsupported decorator location: "+s)};function st(o){return(t,e)=>typeof e=="object"?Bt(o,t,e):((s,r,n)=>{let i=r.hasOwnProperty(n);return r.constructor.createProperty(n,s),i?Object.getOwnPropertyDescriptor(r,n):void 0})(o,t,e)}var bt=C`
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
`;var It=["Varna","Vasya","Tara","Yoni","Maitri","Gana","Bhakoot","Nadi"],A=class extends ${constructor(){super(...arguments);this.data=null}render(){let e=this.data;if(!e)return u`<div class="roxy-empty" role="status">No Guna Milan data</div>`;let s=e.total??e.totalScore??0,r=e.maxScore??36,n=(e.breakdown??[]).filter(i=>i&&(i.name||i.score!==void 0));return u`<article class="card" aria-label="Guna Milan score">
			<div class="score-bar">
				<div>
					<span class="total">${s}</span>
					<span class="over"> / ${r}</span>
					${typeof e.percentage=="number"?u`<small style="margin-left: 0.5rem; color: var(--roxy-muted)">
								${e.percentage}%
							</small>`:h}
				</div>
				${e.recommendation?u`<span class="recommendation">${e.recommendation}</span>`:h}
			</div>

			${n.length>0?u`<table>
						<thead>
							<tr>
								<th>Category</th>
								<th>Progress</th>
								<th class="score">Score</th>
							</tr>
						</thead>
						<tbody>
							${n.map(i=>{let c=i.score??0,a=i.max??i.maxScore??Vt(i.name),d=a?c/a*100:0;return u`<tr>
									<td>${i.name??""}</td>
									<td class="bar-cell">
										<div class="mini-bar">
											<span style="width: ${d}%"></span>
										</div>
									</td>
									<td class="score">${c} / ${a}</td>
								</tr>`})}
						</tbody>
					</table>`:h}
			${(e.doshas?.length??0)>0||(e.doshaCancellations?.length??0)>0?u`<div class="tags">
						${e.doshas?.map(i=>u`<span class="dosha">${i}</span>`)}
						${e.doshaCancellations?.map(i=>u`<span class="cancel">${i}</span>`)}
					</div>`:h}
		</article>`}};A.styles=[bt,C`
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
				color: var(--roxy-danger, #dc2626);
			}
			.tags .cancel {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 18%, transparent);
				color: var(--roxy-success, #16a34a);
			}
		`],I([st({attribute:!1})],A.prototype,"data",2),A=I([xt("roxy-guna-milan")],A);function Vt(o){if(!o)return 1;switch(o.toLowerCase()){case"varna":return 1;case"vasya":return 2;case"tara":return 3;case"yoni":return 4;case"maitri":return 5;case"gana":return 6;case"bhakoot":return 7;case"nadi":return 8;default:return 1}}var Wt=It;return Ct(Gt);})();
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
