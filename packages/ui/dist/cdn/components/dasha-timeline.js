"use strict";var RoxyUI_dasha_timeline=(()=>{var T=Object.defineProperty;var nt=Object.getOwnPropertyDescriptor;var Et=Object.getOwnPropertyNames;var wt=Object.prototype.hasOwnProperty;var Ct=(n,t)=>{for(var e in t)T(n,e,{get:t[e],enumerable:!0})},Pt=(n,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Et(t))!wt.call(n,s)&&s!==e&&T(n,s,{get:()=>t[s],enumerable:!(r=nt(t,s))||r.enumerable});return n};var kt=n=>Pt(T({},"__esModule",{value:!0}),n),H=(n,t,e,r)=>{for(var s=r>1?void 0:r?nt(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(s=(r?o(t,e,s):o(s))||s);return r&&s&&T(t,e,s),s};var Wt={};Ct(Wt,{RoxyDashaTimeline:()=>_});var j=globalThis,L=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),it=new WeakMap,w=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(L&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=it.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&it.set(e,t))}return t}toString(){return this.cssText}},ot=n=>new w(typeof n=="string"?n:n+"",void 0,Y),C=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((r,s,i)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[i+1],n[0]);return new w(e,n,Y)},at=(n,t)=>{if(L)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),s=j.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,n.appendChild(r)}},F=L?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return ot(e)})(n):n;var{is:Mt,defineProperty:Nt,getOwnPropertyDescriptor:Ut,getOwnPropertyNames:Ot,getOwnPropertySymbols:Dt,getPrototypeOf:Rt}=Object,z=globalThis,ht=z.trustedTypes,Tt=ht?ht.emptyScript:"",Ht=z.reactiveElementPolyfillSupport,P=(n,t)=>n,k={toAttribute(n,t){switch(t){case Boolean:n=n?Tt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},I=(n,t)=>!Mt(n,t),lt={attribute:!0,type:String,converter:k,reflect:!1,useDefault:!1,hasChanged:I};Symbol.metadata??=Symbol("metadata"),z.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&Nt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){let{get:s,set:i}=Ut(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let l=s?.call(this);i?.call(this,o),this.requestUpdate(t,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??lt}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let t=Rt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let e=this.properties,r=[...Ot(e),...Dt(e)];for(let s of r)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let s of r)e.unshift(F(s))}else t!==void 0&&e.push(F(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return at(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:k).toAttribute(e,r.type);this._$Em=t,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(t,e){let r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let i=r.getPropertyOptions(s),o=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:k;this._$Em=s;let l=o.fromAttribute(e,i.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(t,e,r,s=!1,i){if(t!==void 0){let o=this.constructor;if(s===!1&&(i=this[t]),r??=o.getPropertyOptions(t),!((r.hasChanged??I)(i,e)||r.useDefault&&r.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:s,wrapped:i},o){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),i!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,i]of r){let{wrapped:o}=i,l=this[s];o!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,i,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[P("elementProperties")]=new Map,f[P("finalized")]=new Map,Ht?.({ReactiveElement:f}),(z.reactiveElementVersions??=[]).push("2.1.2");var tt=globalThis,ct=n=>n,q=tt.trustedTypes,dt=q?q.createPolicy("lit-html",{createHTML:n=>n}):void 0,yt="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,$t="?"+y,jt=`<${$t}>`,A=document,N=()=>A.createComment(""),U=n=>n===null||typeof n!="object"&&typeof n!="function",et=Array.isArray,Lt=n=>et(n)||typeof n?.[Symbol.iterator]=="function",G=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pt=/-->/g,ut=/>/g,v=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),mt=/'/g,ft=/"/g,_t=/^(?:script|style|textarea|title)$/i,rt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),u=rt(1),Zt=rt(2),Qt=rt(3),b=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),gt=new WeakMap,x=A.createTreeWalker(A,129);function vt(n,t){if(!et(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return dt!==void 0?dt.createHTML(t):t}var zt=(n,t)=>{let e=n.length-1,r=[],s,i=t===2?"<svg>":t===3?"<math>":"",o=M;for(let l=0;l<e;l++){let a=n[l],d,p,c=-1,m=0;for(;m<a.length&&(o.lastIndex=m,p=o.exec(a),p!==null);)m=o.lastIndex,o===M?p[1]==="!--"?o=pt:p[1]!==void 0?o=ut:p[2]!==void 0?(_t.test(p[2])&&(s=RegExp("</"+p[2],"g")),o=v):p[3]!==void 0&&(o=v):o===v?p[0]===">"?(o=s??M,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?v:p[3]==='"'?ft:mt):o===ft||o===mt?o=v:o===pt||o===ut?o=M:(o=v,s=void 0);let g=o===v&&n[l+1].startsWith("/>")?" ":"";i+=o===M?a+jt:c>=0?(r.push(d),a.slice(0,c)+yt+a.slice(c)+y+g):a+y+(c===-2?l:g)}return[vt(n,i+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},O=class n{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let i=0,o=0,l=t.length-1,a=this.parts,[d,p]=zt(t,e);if(this.el=n.createElement(d,r),x.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=x.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(yt)){let m=p[o++],g=s.getAttribute(c).split(y),R=/([.?@])?(.*)/.exec(m);a.push({type:1,index:i,name:R[2],strings:g,ctor:R[1]==="."?J:R[1]==="?"?Z:R[1]==="@"?Q:E}),s.removeAttribute(c)}else c.startsWith(y)&&(a.push({type:6,index:i}),s.removeAttribute(c));if(_t.test(s.tagName)){let c=s.textContent.split(y),m=c.length-1;if(m>0){s.textContent=q?q.emptyScript:"";for(let g=0;g<m;g++)s.append(c[g],N()),x.nextNode(),a.push({type:2,index:++i});s.append(c[m],N())}}}else if(s.nodeType===8)if(s.data===$t)a.push({type:2,index:i});else{let c=-1;for(;(c=s.data.indexOf(y,c+1))!==-1;)a.push({type:7,index:i}),c+=y.length-1}i++}}static createElement(t,e){let r=A.createElement("template");return r.innerHTML=t,r}};function S(n,t,e=n,r){if(t===b)return t;let s=r!==void 0?e._$Co?.[r]:e._$Cl,i=U(t)?void 0:t._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(n),s._$AT(n,e,r)),r!==void 0?(e._$Co??=[])[r]=s:e._$Cl=s),s!==void 0&&(t=S(n,s._$AS(n,t.values),s,r)),t}var K=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,s=(t?.creationScope??A).importNode(e,!0);x.currentNode=s;let i=x.nextNode(),o=0,l=0,a=r[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new D(i,i.nextSibling,this,t):a.type===1?d=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(d=new X(i,this,t)),this._$AV.push(d),a=r[++l]}o!==a?.index&&(i=x.nextNode(),o++)}return x.currentNode=A,s}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},D=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),U(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Lt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=O.createElement(vt(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(e);else{let i=new K(s,this),o=i.u(this.options);i.p(e),this.T(o),this._$AH=i}}_$AC(t){let e=gt.get(t.strings);return e===void 0&&gt.set(t.strings,e=new O(t)),e}k(t){et(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,s=0;for(let i of t)s===e.length?e.push(r=new n(this.O(N()),this.O(N()),this,this.options)):r=e[s],r._$AI(i),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=ct(t).nextSibling;ct(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,i){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=h}_$AI(t,e=this,r,s){let i=this.strings,o=!1;if(i===void 0)t=S(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==b,o&&(this._$AH=t);else{let l=t,a,d;for(t=i[0],a=0;a<i.length-1;a++)d=S(this,l[r+a],e,a),d===b&&(d=this._$AH[a]),o||=!U(d)||d!==this._$AH[a],d===h?t=h:t!==h&&(t+=(d??"")+i[a+1]),this._$AH[a]=d}o&&!s&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},J=class extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}},Z=class extends E{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},Q=class extends E{constructor(t,e,r,s,i){super(t,e,r,s,i),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??h)===b)return;let r=this._$AH,s=t===h&&r!==h||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==h&&(r===h||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},X=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}};var It=tt.litHtmlPolyfillSupport;It?.(O,D),(tt.litHtmlVersions??=[]).push("3.3.2");var xt=(n,t,e)=>{let r=e?.renderBefore??t,s=r._$litPart$;if(s===void 0){let i=e?.renderBefore??null;r._$litPart$=s=new D(t.insertBefore(N(),i),i,void 0,e??{})}return s._$AI(n),s};var st=globalThis,$=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=xt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};$._$litElement$=!0,$.finalized=!0,st.litElementHydrateSupport?.({LitElement:$});var qt=st.litElementPolyfillSupport;qt?.({LitElement:$});(st.litElementVersions??=[]).push("4.2.2");var At=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};var Bt={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:I},Vt=(n=Bt,t,e)=>{let{kind:r,metadata:s}=e,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),i.set(e.name,n),r==="accessor"){let{name:o}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,n,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,n,l),l}}}if(r==="setter"){let{name:o}=e;return function(l){let a=this[o];t.call(this,l),this.requestUpdate(o,a,n,!0,l)}}throw Error("Unsupported decorator location: "+r)};function B(n){return(t,e)=>typeof e=="object"?Vt(n,t,e):((r,s,i)=>{let o=s.hasOwnProperty(i);return s.constructor.createProperty(i,r),o?Object.getOwnPropertyDescriptor(s,i):void 0})(n,t,e)}var bt=C`
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
`;function W(n,t=1){return typeof n!="number"||!Number.isFinite(n)?"":n.toFixed(t).replace(/\.?0+$/,"")}var _=class extends ${constructor(){super(...arguments);this.data=null;this.period="current"}render(){let e=this.data;if(!e)return u`<div class="roxy-empty" role="status">No dasha data</div>`;let r=this.collectPeriods(e),s=r.length?Math.max(...r.map(i=>i.durationYears)):0;return u`<div class="wrap" aria-label="Dasha timeline">
			<header class="head">
				<h2 class="title">
					${this.period==="major"?"Vimshottari Mahadasha":this.period==="sub"?"Antardasha":"Active dashas"}
				</h2>
				${"nakshatraName"in e&&e.nakshatraName?u`<div class="nakshatra">
						Moon nakshatra: ${e.nakshatraName}
						${"nakshatraLord"in e&&e.nakshatraLord?u`(lord ${e.nakshatraLord})`:h}
					</div>`:h}
			</header>

			${this.period==="current"?this.renderCurrent(e):h}
			${r.length>0?u`<div class="timeline" role="list">
						${r.map(i=>this.renderBar(i,s))}
					</div>`:h}
		</div>`}renderCurrent(e){return"mahadasha"in e?u`<div class="current">
			${"mahadasha"in e&&e.mahadasha?u`<div>
					<span>Mahadasha</span>
					<strong>${e.mahadasha.planet}</strong>
					${"remainingInMahadasha"in e&&e.remainingInMahadasha?u`<small>${W(e.remainingInMahadasha.years+e.remainingInMahadasha.months/12,1)} years left</small>`:h}
				</div>`:h}
			${"antardasha"in e&&e.antardasha?u`<div>
					<span>Antardasha</span>
					<strong>${e.antardasha.planet}</strong>
					${"remainingInAntardasha"in e&&e.remainingInAntardasha?u`<small>${W(e.remainingInAntardasha.years+e.remainingInAntardasha.months/12,1)} years left</small>`:h}
				</div>`:h}
			${"pratyantardasha"in e&&e.pratyantardasha?u`<div>
					<span>Pratyantardasha</span>
					<strong>${e.pratyantardasha.planet}</strong>
					${"remainingInPratyantardasha"in e&&e.remainingInPratyantardasha?u`<small>${W(e.remainingInPratyantardasha.years+e.remainingInPratyantardasha.months/12,1)} years left</small>`:h}
				</div>`:h}
		</div>`:h}collectPeriods(e){return"mahadashas"in e&&e.mahadashas?.length?e.mahadashas:"antardashas"in e&&e.antardashas?.length?e.antardashas:[]}renderBar(e,r){let s=e.durationYears,i=r>0?s/r*100:0;return u`<div class="bar" role="listitem">
			<span>${e.planet}</span>
			<span class="bar-track"><span style="width: ${i}%"></span></span>
			<span class="dates">
				${e.startDate?St(e.startDate):""}
				${e.endDate?u`- ${St(e.endDate)}`:""}
			</span>
		</div>`}};_.styles=[bt,C`
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
		`],H([B({attribute:!1})],_.prototype,"data",2),H([B({type:String,reflect:!0})],_.prototype,"period",2),_=H([At("roxy-dasha-timeline")],_);function St(n){let t=n.match(/^(\d{4})/);return t?t[1]:n}return kt(Wt);})();
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
