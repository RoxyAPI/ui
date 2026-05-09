"use strict";var RoxyUI_synastry_chart=(()=>{var z=Object.defineProperty;var lt=Object.getOwnPropertyDescriptor;var Nt=Object.getOwnPropertyNames;var Tt=Object.prototype.hasOwnProperty;var Ot=(n,t)=>{for(var e in t)z(n,e,{get:t[e],enumerable:!0})},Ut=(n,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Nt(t))!Tt.call(n,s)&&s!==e&&z(n,s,{get:()=>t[s],enumerable:!(r=lt(t,s))||r.enumerable});return n};var Lt=n=>Ut(z({},"__esModule",{value:!0}),n),F=(n,t,e,r)=>{for(var s=r>1?void 0:r?lt(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(s=(r?o(t,e,s):o(s))||s);return r&&s&&z(t,e,s),s};var te={};Ot(te,{RoxySynastryChart:()=>S});var q=globalThis,I=q.ShadowRoot&&(q.ShadyCSS===void 0||q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),ct=new WeakMap,P=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(I&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=ct.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&ct.set(e,t))}return t}toString(){return this.cssText}},ht=n=>new P(typeof n=="string"?n:n+"",void 0,Y),C=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((r,s,i)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[i+1],n[0]);return new P(e,n,Y)},dt=(n,t)=>{if(I)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),s=q.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,n.appendChild(r)}},K=I?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return ht(e)})(n):n;var{is:Ht,defineProperty:kt,getOwnPropertyDescriptor:zt,getOwnPropertyNames:qt,getOwnPropertySymbols:It,getPrototypeOf:jt}=Object,j=globalThis,pt=j.trustedTypes,Dt=pt?pt.emptyScript:"",Bt=j.reactiveElementPolyfillSupport,R=(n,t)=>n,M={toAttribute(n,t){switch(t){case Boolean:n=n?Dt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},D=(n,t)=>!Ht(n,t),ut={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:D};Symbol.metadata??=Symbol("metadata"),j.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ut){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&kt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){let{get:s,set:i}=zt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let l=s?.call(this);i?.call(this,o),this.requestUpdate(t,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ut}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let t=jt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let e=this.properties,r=[...qt(e),...It(e)];for(let s of r)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let s of r)e.unshift(K(s))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return dt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:M).toAttribute(e,r.type);this._$Em=t,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(t,e){let r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let i=r.getPropertyOptions(s),o=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:M;this._$Em=s;let l=o.fromAttribute(e,i.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(t,e,r,s=!1,i){if(t!==void 0){let o=this.constructor;if(s===!1&&(i=this[t]),r??=o.getPropertyOptions(t),!((r.hasChanged??D)(i,e)||r.useDefault&&r.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:s,wrapped:i},o){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),i!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,i]of r){let{wrapped:o}=i,l=this[s];o!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,i,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[R("elementProperties")]=new Map,f[R("finalized")]=new Map,Bt?.({ReactiveElement:f}),(j.reactiveElementVersions??=[]).push("2.1.2");var rt=globalThis,mt=n=>n,B=rt.trustedTypes,gt=B?B.createPolicy("lit-html",{createHTML:n=>n}):void 0,At="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,bt="?"+$,Gt=`<${bt}>`,b=document,T=()=>b.createComment(""),O=n=>n===null||typeof n!="object"&&typeof n!="function",st=Array.isArray,Vt=n=>st(n)||typeof n?.[Symbol.iterator]=="function",J=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ft=/-->/g,yt=/>/g,x=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$t=/'/g,_t=/"/g,vt=/^(?:script|style|textarea|title)$/i,nt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),m=nt(1),G=nt(2),oe=nt(3),v=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),xt=new WeakMap,A=b.createTreeWalker(b,129);function St(n,t){if(!st(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return gt!==void 0?gt.createHTML(t):t}var Wt=(n,t)=>{let e=n.length-1,r=[],s,i=t===2?"<svg>":t===3?"<math>":"",o=N;for(let l=0;l<e;l++){let a=n[l],h,p,d=-1,g=0;for(;g<a.length&&(o.lastIndex=g,p=o.exec(a),p!==null);)g=o.lastIndex,o===N?p[1]==="!--"?o=ft:p[1]!==void 0?o=yt:p[2]!==void 0?(vt.test(p[2])&&(s=RegExp("</"+p[2],"g")),o=x):p[3]!==void 0&&(o=x):o===x?p[0]===">"?(o=s??N,d=-1):p[1]===void 0?d=-2:(d=o.lastIndex-p[2].length,h=p[1],o=p[3]===void 0?x:p[3]==='"'?_t:$t):o===_t||o===$t?o=x:o===ft||o===yt?o=N:(o=x,s=void 0);let y=o===x&&n[l+1].startsWith("/>")?" ":"";i+=o===N?a+Gt:d>=0?(r.push(h),a.slice(0,d)+At+a.slice(d)+$+y):a+$+(d===-2?l:y)}return[St(n,i+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},U=class n{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let i=0,o=0,l=t.length-1,a=this.parts,[h,p]=Wt(t,e);if(this.el=n.createElement(h,r),A.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=A.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(At)){let g=p[o++],y=s.getAttribute(d).split($),k=/([.?@])?(.*)/.exec(g);a.push({type:1,index:i,name:k[2],strings:y,ctor:k[1]==="."?Q:k[1]==="?"?X:k[1]==="@"?tt:w}),s.removeAttribute(d)}else d.startsWith($)&&(a.push({type:6,index:i}),s.removeAttribute(d));if(vt.test(s.tagName)){let d=s.textContent.split($),g=d.length-1;if(g>0){s.textContent=B?B.emptyScript:"";for(let y=0;y<g;y++)s.append(d[y],T()),A.nextNode(),a.push({type:2,index:++i});s.append(d[g],T())}}}else if(s.nodeType===8)if(s.data===bt)a.push({type:2,index:i});else{let d=-1;for(;(d=s.data.indexOf($,d+1))!==-1;)a.push({type:7,index:i}),d+=$.length-1}i++}}static createElement(t,e){let r=b.createElement("template");return r.innerHTML=t,r}};function E(n,t,e=n,r){if(t===v)return t;let s=r!==void 0?e._$Co?.[r]:e._$Cl,i=O(t)?void 0:t._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(n),s._$AT(n,e,r)),r!==void 0?(e._$Co??=[])[r]=s:e._$Cl=s),s!==void 0&&(t=E(n,s._$AS(n,t.values),s,r)),t}var Z=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,s=(t?.creationScope??b).importNode(e,!0);A.currentNode=s;let i=A.nextNode(),o=0,l=0,a=r[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new L(i,i.nextSibling,this,t):a.type===1?h=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(h=new et(i,this,t)),this._$AV.push(h),a=r[++l]}o!==a?.index&&(i=A.nextNode(),o++)}return A.currentNode=b,s}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},L=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),O(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==v&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Vt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(b.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=U.createElement(St(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(e);else{let i=new Z(s,this),o=i.u(this.options);i.p(e),this.T(o),this._$AH=i}}_$AC(t){let e=xt.get(t.strings);return e===void 0&&xt.set(t.strings,e=new U(t)),e}k(t){st(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,s=0;for(let i of t)s===e.length?e.push(r=new n(this.O(T()),this.O(T()),this,this.options)):r=e[s],r._$AI(i),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=mt(t).nextSibling;mt(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},w=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,i){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=c}_$AI(t,e=this,r,s){let i=this.strings,o=!1;if(i===void 0)t=E(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==v,o&&(this._$AH=t);else{let l=t,a,h;for(t=i[0],a=0;a<i.length-1;a++)h=E(this,l[r+a],e,a),h===v&&(h=this._$AH[a]),o||=!O(h)||h!==this._$AH[a],h===c?t=c:t!==c&&(t+=(h??"")+i[a+1]),this._$AH[a]=h}o&&!s&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Q=class extends w{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},X=class extends w{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},tt=class extends w{constructor(t,e,r,s,i){super(t,e,r,s,i),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??c)===v)return;let r=this._$AH,s=t===c&&r!==c||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==c&&(r===c||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},et=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}};var Ft=rt.litHtmlPolyfillSupport;Ft?.(U,L),(rt.litHtmlVersions??=[]).push("3.3.2");var Et=(n,t,e)=>{let r=e?.renderBefore??t,s=r._$litPart$;if(s===void 0){let i=e?.renderBefore??null;r._$litPart$=s=new L(t.insertBefore(T(),i),i,void 0,e??{})}return s._$AI(n),s};var it=globalThis,_=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Et(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return v}};_._$litElement$=!0,_.finalized=!0,it.litElementHydrateSupport?.({LitElement:_});var Yt=it.litElementPolyfillSupport;Yt?.({LitElement:_});(it.litElementVersions??=[]).push("4.2.2");var wt=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};var Kt={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:D},Jt=(n=Kt,t,e)=>{let{kind:r,metadata:s}=e,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),i.set(e.name,n),r==="accessor"){let{name:o}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,n,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,n,l),l}}}if(r==="setter"){let{name:o}=e;return function(l){let a=this[o];t.call(this,l),this.requestUpdate(o,a,n,!0,l)}}throw Error("Unsupported decorator location: "+r)};function ot(n){return(t,e)=>typeof e=="object"?Jt(n,t,e):((r,s,i)=>{let o=s.hasOwnProperty(i);return s.constructor.createProperty(i,r),o?Object.getOwnPropertyDescriptor(s,i):void 0})(n,t,e)}var Pt={Sun:"\u2609",Moon:"\u263D",Mercury:"\u263F",Venus:"\u2640",Earth:"\u2641",Mars:"\u2642",Jupiter:"\u2643",Saturn:"\u2644",Uranus:"\u2645",Neptune:"\u2646",Pluto:"\u2647",Rahu:"\u260A",Ketu:"\u260B",Ascendant:"Asc",Lagna:"La",NorthNode:"\u260A",SouthNode:"\u260B"};var Ct={Aries:"\u2648",Taurus:"\u2649",Gemini:"\u264A",Cancer:"\u264B",Leo:"\u264C",Virgo:"\u264D",Libra:"\u264E",Scorpio:"\u264F",Sagittarius:"\u2650",Capricorn:"\u2651",Aquarius:"\u2652",Pisces:"\u2653"};var Rt=C`
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
`;function H(n,t,e,r){let s=r*Math.PI/180;return{x:n+e*Math.cos(s),y:t+e*Math.sin(s)}}var at=360,u=at/2,Mt=170,Zt=154,Qt=124,W=96,S=class extends _{constructor(){super(...arguments);this.data=null}render(){if(!this.data)return m`<div class="roxy-empty" role="status">No synastry data</div>`;let{person1:e,person2:r,compatibilityScore:s,summary:i,interAspects:o=[]}=this.data,l=this.normalizePlanets(e?.planets),a=this.normalizePlanets(r?.planets);return m`<div
			class="wrap"
			aria-label="Synastry compatibility chart"
		>
			<div class="head">
				<h2 class="title">Synastry</h2>
				${typeof s=="number"?m`<span class="score" aria-label=${`Score ${s} of 100`}
							>${s} / 100</span
						>`:c}
			</div>
			<svg
				viewBox="0 0 ${at} ${at}"
				role="img"
				aria-label="Dual chart wheel comparing two natal charts"
			>
				<title>Synastry dual wheel</title>
				<circle
					class="wheel-line"
					cx=${u}
					cy=${u}
					r=${Mt}
					stroke-width="1.5"
				/>
				<circle
					class="wheel-line"
					cx=${u}
					cy=${u}
					r=${W+14}
					stroke-width="0.8"
				/>
				<circle
					class="wheel-line"
					cx=${u}
					cy=${u}
					r=${W-14}
					stroke-width="0.6"
				/>
				${this.renderSpokes()} ${this.renderSigns()}
				${this.renderRing(l,Qt,"p1")} ${this.renderRing(a,W,"p2")}
			</svg>
			${i?m`<p class="summary">${i}</p>`:c}
			${o.length>0?this.renderAspects(o):c}
			${(this.data.strengths?.length??0)>0||(this.data.challenges?.length??0)>0?m`<div class="lists">
						${this.data.strengths?.length?m`<div>
									<h3>Strengths</h3>
									<ul>
										${this.data.strengths.map(h=>m`<li>${h}</li>`)}
									</ul>
								</div>`:c}
						${this.data.challenges?.length?m`<div>
									<h3>Challenges</h3>
									<ul>
										${this.data.challenges.map(h=>m`<li>${h}</li>`)}
									</ul>
								</div>`:c}
					</div>`:c}
		</div>`}normalizePlanets(e){return e?Array.isArray(e)?e:Object.entries(e).map(([r,s])=>({...s,name:r})):[]}renderSpokes(){return Array.from({length:12},(e,r)=>{let s=r*30-90,i=H(u,u,W-14,s),o=H(u,u,Mt,s);return G`<line class="wheel-line" x1=${i.x} y1=${i.y} x2=${o.x} y2=${o.y} stroke-width="0.6" />`})}renderSigns(){return["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"].map((r,s)=>{let i=s*30+15-90,o=H(u,u,Zt,i);return G`<text class="sign" x=${o.x} y=${o.y} text-anchor="middle" dominant-baseline="central">${Ct[r]}</text>`})}renderRing(e,r,s){return e.map(i=>{let o=typeof i.longitude=="number"?i.longitude:typeof i.degree=="number"?i.degree:NaN;if(!Number.isFinite(o))return c;let l=H(u,u,r,o-90),a=i.name??i.planet??"",h=Pt[Xt(a)]??a.slice(0,2);return G`<text class=${s} x=${l.x} y=${l.y} text-anchor="middle" dominant-baseline="central"><title>${a}</title>${h}</text>`})}renderAspects(e){return m`<table>
			<thead>
				<tr>
					<th>Planet 1</th>
					<th>Planet 2</th>
					<th>Aspect</th>
					<th>Orb</th>
					<th>Strength</th>
				</tr>
			</thead>
			<tbody>
				${e.slice(0,16).map(r=>m`<tr>
						<td>${r.planet1??""}</td>
						<td>${r.planet2??""}</td>
						<td>${r.aspect??""}</td>
						<td class="orb">
							${typeof r.orb=="number"?r.orb.toFixed(1):""}
						</td>
						<td>${r.strength??""}</td>
					</tr>`)}
			</tbody>
		</table>`}};S.styles=[Rt,C`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
			}

			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}

			.score {
				font-variant-numeric: tabular-nums;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-fg, #b45309);
				font-size: var(--roxy-text-xl, 1.5rem);
			}

			svg {
				display: block;
				width: 100%;
				max-width: 400px;
				margin: 0 auto;
			}

			.wheel-line {
				fill: none;
				stroke: var(--roxy-border, #e4e4e7);
			}
			.sign {
				fill: var(--roxy-secondary, #475569);
				font-size: 14px;
			}
			.p1 {
				fill: var(--roxy-accent, #f59e0b);
				font-weight: 600;
				font-size: 13px;
			}
			.p2 {
				fill: var(--roxy-info, #0284c7);
				font-weight: 600;
				font-size: 13px;
			}

			.summary {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-base, 1rem);
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
			td.orb {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-muted, #71717a);
			}

			.lists {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}
			.lists h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.lists ul {
				margin: 0;
				padding-left: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
		`],F([ot({attribute:!1})],S.prototype,"data",2),S=F([wt("roxy-synastry-chart")],S);function Xt(n){return n?n.charAt(0).toUpperCase()+n.slice(1).toLowerCase():""}return Lt(te);})();
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
//# sourceMappingURL=synastry-chart.js.map
