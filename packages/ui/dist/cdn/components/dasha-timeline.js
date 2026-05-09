"use strict";var RoxyUI_dasha_timeline=(()=>{var R=Object.defineProperty;var rt=Object.getOwnPropertyDescriptor;var St=Object.getOwnPropertyNames;var Et=Object.prototype.hasOwnProperty;var wt=(a,t)=>{for(var e in t)R(a,e,{get:t[e],enumerable:!0})},Pt=(a,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of St(t))!Et.call(a,r)&&r!==e&&R(a,r,{get:()=>t[r],enumerable:!(s=rt(t,r))||s.enumerable});return a};var Ct=a=>Pt(R({},"__esModule",{value:!0}),a),L=(a,t,e,s)=>{for(var r=s>1?void 0:s?rt(t,e):t,i=a.length-1,o;i>=0;i--)(o=a[i])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&R(t,e,r),r};var Vt={};wt(Vt,{RoxyDashaTimeline:()=>_});var T=globalThis,z=T.ShadowRoot&&(T.ShadyCSS===void 0||T.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),at=new WeakMap,w=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(z&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=at.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&at.set(e,t))}return t}toString(){return this.cssText}},it=a=>new w(typeof a=="string"?a:a+"",void 0,W),P=(a,...t)=>{let e=a.length===1?a[0]:t.reduce((s,r,i)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+a[i+1],a[0]);return new w(e,a,W)},ot=(a,t)=>{if(z)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=T.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,a.appendChild(s)}},Y=z?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return it(e)})(a):a;var{is:kt,defineProperty:Mt,getOwnPropertyDescriptor:Ut,getOwnPropertyNames:Nt,getOwnPropertySymbols:Ot,getPrototypeOf:Dt}=Object,j=globalThis,nt=j.trustedTypes,Ht=nt?nt.emptyScript:"",Rt=j.reactiveElementPolyfillSupport,C=(a,t)=>a,k={toAttribute(a,t){switch(t){case Boolean:a=a?Ht:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},I=(a,t)=>!kt(a,t),ht={attribute:!0,type:String,converter:k,reflect:!1,useDefault:!1,hasChanged:I};Symbol.metadata??=Symbol("metadata"),j.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ht){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&Mt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:i}=Ut(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){let h=r?.call(this);i?.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ht}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;let t=Dt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){let e=this.properties,s=[...Nt(e),...Ot(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(Y(r))}else t!==void 0&&e.push(Y(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ot(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:k).toAttribute(e,s.type);this._$Em=t,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(t,e){let s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let i=s.getPropertyOptions(r),o=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:k;this._$Em=r;let h=o.fromAttribute(e,i.type);this[r]=h??this._$Ej?.get(r)??h,this._$Em=null}}requestUpdate(t,e,s,r=!1,i){if(t!==void 0){let o=this.constructor;if(r===!1&&(i=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??I)(i,e)||s.useDefault&&s.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:i},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),i!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,i]of this._$Ep)this[r]=i;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,i]of s){let{wrapped:o}=i,h=this[r];o!==!0||this._$AL.has(r)||h===void 0||this.C(r,void 0,i,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[C("elementProperties")]=new Map,f[C("finalized")]=new Map,Rt?.({ReactiveElement:f}),(j.reactiveElementVersions??=[]).push("2.1.2");var X=globalThis,lt=a=>a,q=X.trustedTypes,dt=q?q.createPolicy("lit-html",{createHTML:a=>a}):void 0,yt="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,gt="?"+g,Lt=`<${gt}>`,x=document,U=()=>x.createComment(""),N=a=>a===null||typeof a!="object"&&typeof a!="function",tt=Array.isArray,Tt=a=>tt(a)||typeof a?.[Symbol.iterator]=="function",F=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ct=/-->/g,pt=/>/g,v=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ut=/'/g,mt=/"/g,$t=/^(?:script|style|textarea|title)$/i,et=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),u=et(1),Zt=et(2),Gt=et(3),A=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),ft=new WeakMap,b=x.createTreeWalker(x,129);function _t(a,t){if(!tt(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return dt!==void 0?dt.createHTML(t):t}var zt=(a,t)=>{let e=a.length-1,s=[],r,i=t===2?"<svg>":t===3?"<math>":"",o=M;for(let h=0;h<e;h++){let n=a[h],c,p,d=-1,m=0;for(;m<n.length&&(o.lastIndex=m,p=o.exec(n),p!==null);)m=o.lastIndex,o===M?p[1]==="!--"?o=ct:p[1]!==void 0?o=pt:p[2]!==void 0?($t.test(p[2])&&(r=RegExp("</"+p[2],"g")),o=v):p[3]!==void 0&&(o=v):o===v?p[0]===">"?(o=r??M,d=-1):p[1]===void 0?d=-2:(d=o.lastIndex-p[2].length,c=p[1],o=p[3]===void 0?v:p[3]==='"'?mt:ut):o===mt||o===ut?o=v:o===ct||o===pt?o=M:(o=v,r=void 0);let y=o===v&&a[h+1].startsWith("/>")?" ":"";i+=o===M?n+Lt:d>=0?(s.push(c),n.slice(0,d)+yt+n.slice(d)+g+y):n+g+(d===-2?h:y)}return[_t(a,i+(a[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},O=class a{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let i=0,o=0,h=t.length-1,n=this.parts,[c,p]=zt(t,e);if(this.el=a.createElement(c,s),b.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=b.nextNode())!==null&&n.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(yt)){let m=p[o++],y=r.getAttribute(d).split(g),H=/([.?@])?(.*)/.exec(m);n.push({type:1,index:i,name:H[2],strings:y,ctor:H[1]==="."?J:H[1]==="?"?Z:H[1]==="@"?G:E}),r.removeAttribute(d)}else d.startsWith(g)&&(n.push({type:6,index:i}),r.removeAttribute(d));if($t.test(r.tagName)){let d=r.textContent.split(g),m=d.length-1;if(m>0){r.textContent=q?q.emptyScript:"";for(let y=0;y<m;y++)r.append(d[y],U()),b.nextNode(),n.push({type:2,index:++i});r.append(d[m],U())}}}else if(r.nodeType===8)if(r.data===gt)n.push({type:2,index:i});else{let d=-1;for(;(d=r.data.indexOf(g,d+1))!==-1;)n.push({type:7,index:i}),d+=g.length-1}i++}}static createElement(t,e){let s=x.createElement("template");return s.innerHTML=t,s}};function S(a,t,e=a,s){if(t===A)return t;let r=s!==void 0?e._$Co?.[s]:e._$Cl,i=N(t)?void 0:t._$litDirective$;return r?.constructor!==i&&(r?._$AO?.(!1),i===void 0?r=void 0:(r=new i(a),r._$AT(a,e,s)),s!==void 0?(e._$Co??=[])[s]=r:e._$Cl=r),r!==void 0&&(t=S(a,r._$AS(a,t.values),r,s)),t}var K=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??x).importNode(e,!0);b.currentNode=r;let i=b.nextNode(),o=0,h=0,n=s[0];for(;n!==void 0;){if(o===n.index){let c;n.type===2?c=new D(i,i.nextSibling,this,t):n.type===1?c=new n.ctor(i,n.name,n.strings,this,t):n.type===6&&(c=new Q(i,this,t)),this._$AV.push(c),n=s[++h]}o!==n?.index&&(i=b.nextNode(),o++)}return b.currentNode=x,r}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},D=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),N(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Tt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=O.createElement(_t(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{let i=new K(r,this),o=i.u(this.options);i.p(e),this.T(o),this._$AH=i}}_$AC(t){let e=ft.get(t.strings);return e===void 0&&ft.set(t.strings,e=new O(t)),e}k(t){tt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let i of t)r===e.length?e.push(s=new a(this.O(U()),this.O(U()),this,this.options)):s=e[r],s._$AI(i),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=lt(t).nextSibling;lt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,i){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(t,e=this,s,r){let i=this.strings,o=!1;if(i===void 0)t=S(this,t,e,0),o=!N(t)||t!==this._$AH&&t!==A,o&&(this._$AH=t);else{let h=t,n,c;for(t=i[0],n=0;n<i.length-1;n++)c=S(this,h[s+n],e,n),c===A&&(c=this._$AH[n]),o||=!N(c)||c!==this._$AH[n],c===l?t=l:t!==l&&(t+=(c??"")+i[n+1]),this._$AH[n]=c}o&&!r&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},J=class extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}},Z=class extends E{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}},G=class extends E{constructor(t,e,s,r,i){super(t,e,s,r,i),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??l)===A)return;let s=this._$AH,r=t===l&&s!==l||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==l&&(s===l||r);r&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Q=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}};var jt=X.litHtmlPolyfillSupport;jt?.(O,D),(X.litHtmlVersions??=[]).push("3.3.2");var vt=(a,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let i=e?.renderBefore??null;s._$litPart$=r=new D(t.insertBefore(U(),i),i,void 0,e??{})}return r._$AI(a),r};var st=globalThis,$=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=vt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};$._$litElement$=!0,$.finalized=!0,st.litElementHydrateSupport?.({LitElement:$});var It=st.litElementPolyfillSupport;It?.({LitElement:$});(st.litElementVersions??=[]).push("4.2.2");var bt=a=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(a,t)}):customElements.define(a,t)};var qt={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:I},Bt=(a=qt,t,e)=>{let{kind:s,metadata:r}=e,i=globalThis.litPropertyMetadata.get(r);if(i===void 0&&globalThis.litPropertyMetadata.set(r,i=new Map),s==="setter"&&((a=Object.create(a)).wrapped=!0),i.set(e.name,a),s==="accessor"){let{name:o}=e;return{set(h){let n=t.get.call(this);t.set.call(this,h),this.requestUpdate(o,n,a,!0,h)},init(h){return h!==void 0&&this.C(o,void 0,a,h),h}}}if(s==="setter"){let{name:o}=e;return function(h){let n=this[o];t.call(this,h),this.requestUpdate(o,n,a,!0,h)}}throw Error("Unsupported decorator location: "+s)};function B(a){return(t,e)=>typeof e=="object"?Bt(a,t,e):((s,r,i)=>{let o=r.hasOwnProperty(i);return r.constructor.createProperty(i,s),o?Object.getOwnPropertyDescriptor(r,i):void 0})(a,t,e)}var xt=P`
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
`;var _=class extends ${constructor(){super(...arguments);this.data=null;this.period="current"}render(){let e=this.data;if(!e)return u`<div class="roxy-empty" role="status">No dasha data</div>`;let s=this.collectPeriods(e),r=s.length?Math.max(...s.map(i=>i.durationYears??i.years??1)):0;return u`<div class="wrap" aria-label="Dasha timeline">
			<header class="head">
				<h2 class="title">
					${this.period==="major"?"Vimshottari Mahadasha":this.period==="sub"?"Antardasha":"Active dashas"}
				</h2>
				${e.nakshatraName||e.moonNakshatra?u`<div class="nakshatra">
							Moon nakshatra: ${e.nakshatraName??e.moonNakshatra}
							${e.nakshatraLord?u`(lord ${e.nakshatraLord})`:l}
						</div>`:l}
			</header>

			${this.period==="current"?this.renderCurrent(e):l}
			${s.length>0?u`<div class="timeline" role="list">
						${s.map(i=>this.renderBar(i,r))}
					</div>`:l}
		</div>`}renderCurrent(e){return u`<div class="current">
			${e.mahadasha?u`<div>
						<span>Mahadasha</span>
						<strong>${e.mahadasha.lord??e.mahadasha.mahadashaLord}</strong>
						${typeof e.remainingInMahadasha=="number"?u`<small>${e.remainingInMahadasha.toFixed(1)} years left</small>`:l}
					</div>`:l}
			${e.antardasha?u`<div>
						<span>Antardasha</span>
						<strong>${e.antardasha.lord??e.antardasha.antardashaLord}</strong>
						${typeof e.remainingInAntardasha=="number"?u`<small>${e.remainingInAntardasha.toFixed(1)} years left</small>`:l}
					</div>`:l}
			${e.pratyantardasha?u`<div>
						<span>Pratyantardasha</span>
						<strong
							>${e.pratyantardasha.lord??e.pratyantardasha.pratyantardashaLord}</strong
						>
						${typeof e.remainingInPratyantardasha=="number"?u`<small
									>${e.remainingInPratyantardasha.toFixed(2)} years left</small
								>`:l}
					</div>`:l}
		</div>`}collectPeriods(e){return this.period==="major"&&e.mahadashas?.length?e.mahadashas:this.period==="sub"&&e.antardashas?.length?e.antardashas:e.mahadashas??e.antardashas??[]}renderBar(e,s){let r=e.lord??e.mahadashaLord??e.antardashaLord??e.planet??"",i=e.durationYears??e.years??0,o=s>0?i/s*100:0;return u`<div class="bar" role="listitem">
			<span>${r}</span>
			<span class="bar-track"><span style="width: ${o}%"></span></span>
			<span class="dates">
				${e.startDate?At(e.startDate):""}
				${e.endDate?u`- ${At(e.endDate)}`:""}
			</span>
		</div>`}};_.styles=[xt,P`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.nakshatra {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			.current {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-md, 1rem);
				box-shadow: var(--roxy-shadow-sm);
			}
			.current div span:first-child {
				display: block;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.current div strong {
				font-size: var(--roxy-text-base, 1rem);
				color: var(--roxy-fg, #0a0a0a);
			}

			.timeline {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.bar {
				display: grid;
				grid-template-columns: 5rem 1fr 8rem;
				gap: var(--roxy-space-sm, 0.5rem);
				align-items: center;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.bar-track {
				height: 14px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
			}
			.bar-track > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.dates {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
				text-align: right;
			}
		`],L([B({attribute:!1})],_.prototype,"data",2),L([B({type:String,reflect:!0})],_.prototype,"period",2),_=L([bt("roxy-dasha-timeline")],_);function At(a){let t=a.match(/^(\d{4})/);return t?t[1]:a}return Ct(Vt);})();
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
//# sourceMappingURL=dasha-timeline.js.map
