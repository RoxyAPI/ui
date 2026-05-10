"use strict";var RoxyUI_transits_table=(()=>{var z=Object.defineProperty;var nt=Object.getOwnPropertyDescriptor;var Nt=Object.getOwnPropertyNames;var Tt=Object.prototype.hasOwnProperty;var Rt=(s,t)=>{for(var e in t)z(s,e,{get:t[e],enumerable:!0})},Mt=(s,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Nt(t))!Tt.call(s,o)&&o!==e&&z(s,o,{get:()=>t[o],enumerable:!(r=nt(t,o))||r.enumerable});return s};var Lt=s=>Mt(z({},"__esModule",{value:!0}),s),W=(s,t,e,r)=>{for(var o=r>1?void 0:r?nt(t,e):t,i=s.length-1,n;i>=0;i--)(n=s[i])&&(o=(r?n(t,e,o):n(o))||o);return r&&o&&z(t,e,o),o};var Jt={};Rt(Jt,{RoxyTransitsTable:()=>A});var q=globalThis,D=q.ShadowRoot&&(q.ShadyCSS===void 0||q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),at=new WeakMap,E=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(D&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=at.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&at.set(e,t))}return t}toString(){return this.cssText}},lt=s=>new E(typeof s=="string"?s:s+"",void 0,Y),C=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((r,o,i)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+s[i+1],s[0]);return new E(e,s,Y)},ct=(s,t)=>{if(D)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),o=q.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=e.cssText,s.appendChild(r)}},K=D?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return lt(e)})(s):s;var{is:Ut,defineProperty:Ot,getOwnPropertyDescriptor:Ht,getOwnPropertyNames:kt,getOwnPropertySymbols:zt,getPrototypeOf:qt}=Object,j=globalThis,pt=j.trustedTypes,Dt=pt?pt.emptyScript:"",jt=j.reactiveElementPolyfillSupport,P=(s,t)=>s,N={toAttribute(s,t){switch(t){case Boolean:s=s?Dt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},B=(s,t)=>!Ut(s,t),ht={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:B};Symbol.metadata??=Symbol("metadata"),j.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ht){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),o=this.getPropertyDescriptor(t,r,e);o!==void 0&&Ot(this.prototype,t,o)}}static getPropertyDescriptor(t,e,r){let{get:o,set:i}=Ht(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:o,set(n){let l=o?.call(this);i?.call(this,n),this.requestUpdate(t,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ht}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let t=qt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let e=this.properties,r=[...kt(e),...zt(e)];for(let o of r)this.createProperty(o,e[o])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,o]of e)this.elementProperties.set(r,o)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let o=this._$Eu(e,r);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let o of r)e.unshift(K(o))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ct(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,r);if(o!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:N).toAttribute(e,r.type);this._$Em=t,i==null?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(t,e){let r=this.constructor,o=r._$Eh.get(t);if(o!==void 0&&this._$Em!==o){let i=r.getPropertyOptions(o),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:N;this._$Em=o;let l=n.fromAttribute(e,i.type);this[o]=l??this._$Ej?.get(o)??l,this._$Em=null}}requestUpdate(t,e,r,o=!1,i){if(t!==void 0){let n=this.constructor;if(o===!1&&(i=this[t]),r??=n.getPropertyOptions(t),!((r.hasChanged??B)(i,e)||r.useDefault&&r.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:o,wrapped:i},n){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),i!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[o,i]of this._$Ep)this[o]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[o,i]of r){let{wrapped:n}=i,l=this[o];n!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,i,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[P("elementProperties")]=new Map,g[P("finalized")]=new Map,jt?.({ReactiveElement:g}),(j.reactiveElementVersions??=[]).push("2.1.2");var et=globalThis,dt=s=>s,I=et.trustedTypes,ut=I?I.createPolicy("lit-html",{createHTML:s=>s}):void 0,xt="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,vt="?"+y,Bt=`<${vt}>`,b=document,R=()=>b.createComment(""),M=s=>s===null||typeof s!="object"&&typeof s!="function",rt=Array.isArray,It=s=>rt(s)||typeof s?.[Symbol.iterator]=="function",F=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,mt=/-->/g,gt=/>/g,x=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,yt=/"/g,bt=/^(?:script|style|textarea|title)$/i,st=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),u=st(1),re=st(2),se=st(3),_=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),$t=new WeakMap,v=b.createTreeWalker(b,129);function _t(s,t){if(!rt(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return ut!==void 0?ut.createHTML(t):t}var Gt=(s,t)=>{let e=s.length-1,r=[],o,i=t===2?"<svg>":t===3?"<math>":"",n=T;for(let l=0;l<e;l++){let a=s[l],h,d,c=-1,m=0;for(;m<a.length&&(n.lastIndex=m,d=n.exec(a),d!==null);)m=n.lastIndex,n===T?d[1]==="!--"?n=mt:d[1]!==void 0?n=gt:d[2]!==void 0?(bt.test(d[2])&&(o=RegExp("</"+d[2],"g")),n=x):d[3]!==void 0&&(n=x):n===x?d[0]===">"?(n=o??T,c=-1):d[1]===void 0?c=-2:(c=n.lastIndex-d[2].length,h=d[1],n=d[3]===void 0?x:d[3]==='"'?yt:ft):n===yt||n===ft?n=x:n===mt||n===gt?n=T:(n=x,o=void 0);let f=n===x&&s[l+1].startsWith("/>")?" ":"";i+=n===T?a+Bt:c>=0?(r.push(h),a.slice(0,c)+xt+a.slice(c)+y+f):a+y+(c===-2?l:f)}return[_t(s,i+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},L=class s{constructor({strings:t,_$litType$:e},r){let o;this.parts=[];let i=0,n=0,l=t.length-1,a=this.parts,[h,d]=Gt(t,e);if(this.el=s.createElement(h,r),v.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(o=v.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let c of o.getAttributeNames())if(c.endsWith(xt)){let m=d[n++],f=o.getAttribute(c).split(y),k=/([.?@])?(.*)/.exec(m);a.push({type:1,index:i,name:k[2],strings:f,ctor:k[1]==="."?Z:k[1]==="?"?Q:k[1]==="@"?X:w}),o.removeAttribute(c)}else c.startsWith(y)&&(a.push({type:6,index:i}),o.removeAttribute(c));if(bt.test(o.tagName)){let c=o.textContent.split(y),m=c.length-1;if(m>0){o.textContent=I?I.emptyScript:"";for(let f=0;f<m;f++)o.append(c[f],R()),v.nextNode(),a.push({type:2,index:++i});o.append(c[m],R())}}}else if(o.nodeType===8)if(o.data===vt)a.push({type:2,index:i});else{let c=-1;for(;(c=o.data.indexOf(y,c+1))!==-1;)a.push({type:7,index:i}),c+=y.length-1}i++}}static createElement(t,e){let r=b.createElement("template");return r.innerHTML=t,r}};function S(s,t,e=s,r){if(t===_)return t;let o=r!==void 0?e._$Co?.[r]:e._$Cl,i=M(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(s),o._$AT(s,e,r)),r!==void 0?(e._$Co??=[])[r]=o:e._$Cl=o),o!==void 0&&(t=S(s,o._$AS(s,t.values),o,r)),t}var J=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,o=(t?.creationScope??b).importNode(e,!0);v.currentNode=o;let i=v.nextNode(),n=0,l=0,a=r[0];for(;a!==void 0;){if(n===a.index){let h;a.type===2?h=new U(i,i.nextSibling,this,t):a.type===1?h=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(h=new tt(i,this,t)),this._$AV.push(h),a=r[++l]}n!==a?.index&&(i=v.nextNode(),n++)}return v.currentNode=b,o}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},U=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,o){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),M(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==_&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):It(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(b.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=L.createElement(_t(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(e);else{let i=new J(o,this),n=i.u(this.options);i.p(e),this.T(n),this._$AH=i}}_$AC(t){let e=$t.get(t.strings);return e===void 0&&$t.set(t.strings,e=new L(t)),e}k(t){rt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,o=0;for(let i of t)o===e.length?e.push(r=new s(this.O(R()),this.O(R()),this,this.options)):r=e[o],r._$AI(i),o++;o<e.length&&(this._$AR(r&&r._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=dt(t).nextSibling;dt(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},w=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,o,i){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=p}_$AI(t,e=this,r,o){let i=this.strings,n=!1;if(i===void 0)t=S(this,t,e,0),n=!M(t)||t!==this._$AH&&t!==_,n&&(this._$AH=t);else{let l=t,a,h;for(t=i[0],a=0;a<i.length-1;a++)h=S(this,l[r+a],e,a),h===_&&(h=this._$AH[a]),n||=!M(h)||h!==this._$AH[a],h===p?t=p:t!==p&&(t+=(h??"")+i[a+1]),this._$AH[a]=h}n&&!o&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Z=class extends w{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},Q=class extends w{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},X=class extends w{constructor(t,e,r,o,i){super(t,e,r,o,i),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??p)===_)return;let r=this._$AH,o=t===p&&r!==p||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==p&&(r===p||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},tt=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}};var Vt=et.litHtmlPolyfillSupport;Vt?.(L,U),(et.litHtmlVersions??=[]).push("3.3.2");var At=(s,t,e)=>{let r=e?.renderBefore??t,o=r._$litPart$;if(o===void 0){let i=e?.renderBefore??null;r._$litPart$=o=new U(t.insertBefore(R(),i),i,void 0,e??{})}return o._$AI(s),o};var ot=globalThis,$=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=At(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return _}};$._$litElement$=!0,$.finalized=!0,ot.litElementHydrateSupport?.({LitElement:$});var Wt=ot.litElementPolyfillSupport;Wt?.({LitElement:$});(ot.litElementVersions??=[]).push("4.2.2");var St=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};var Yt={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:B},Kt=(s=Yt,t,e)=>{let{kind:r,metadata:o}=e,i=globalThis.litPropertyMetadata.get(o);if(i===void 0&&globalThis.litPropertyMetadata.set(o,i=new Map),r==="setter"&&((s=Object.create(s)).wrapped=!0),i.set(e.name,s),r==="accessor"){let{name:n}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,s,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,s,l),l}}}if(r==="setter"){let{name:n}=e;return function(l){let a=this[n];t.call(this,l),this.requestUpdate(n,a,s,!0,l)}}throw Error("Unsupported decorator location: "+r)};function it(s){return(t,e)=>typeof e=="object"?Kt(s,t,e):((r,o,i)=>{let n=o.hasOwnProperty(i);return o.constructor.createProperty(i,r),n?Object.getOwnPropertyDescriptor(o,i):void 0})(s,t,e)}var V={Sun:"\u2609",Moon:"\u263D",Mercury:"\u263F",Venus:"\u2640",Earth:"\u2641",Mars:"\u2642",Jupiter:"\u2643",Saturn:"\u2644",Uranus:"\u2645",Neptune:"\u2646",Pluto:"\u2647",Rahu:"\u260A",Ketu:"\u260B",Ascendant:"Asc",Lagna:"La",NorthNode:"\u260A",SouthNode:"\u260B","North node":"\u260A","South node":"\u260B",Chiron:"\u26B7",Lilith:"\u26B8","Black moon lilith":"\u26B8"};var wt={Aries:"\u2648",Taurus:"\u2649",Gemini:"\u264A",Cancer:"\u264B",Leo:"\u264C",Virgo:"\u264D",Libra:"\u264E",Scorpio:"\u264F",Sagittarius:"\u2650",Capricorn:"\u2651",Aquarius:"\u2652",Pisces:"\u2653"};var Ft=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],Ie=Ft.map(s=>s.toLowerCase());var Et=C`
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
`;function Ct(s){if(typeof s!="string"||s.length===0||/^\d{4}-\d{2}-\d{2}$/.test(s))return"";let e=/^\d{2}:\d{2}(:\d{2})?$/.test(s)?`1970-01-01T${s}`:s,r=new Date(e);return Number.isNaN(r.getTime())?s:r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit",hour12:!0})}function Pt(s){if(typeof s!="string"||s.length===0)return"";let t=new Date(/^\d{4}-\d{2}-\d{2}$/.test(s)?`${s}T00:00:00`:s);return Number.isNaN(t.getTime())?s:t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}function O(s,t=1){return typeof s!="number"||!Number.isFinite(s)?"":s.toFixed(t).replace(/\.?0+$/,"")}function H(s){return s?s.charAt(0).toUpperCase()+s.slice(1).toLowerCase():""}var A=class extends ${constructor(){super(...arguments);this.data=null}render(){if(!this.data?.transitPlanets?.length)return u`<div class="roxy-empty" role="status">No transits data</div>`;let{transitDate:e,transitTime:r,transitPlanets:o,transitAspects:i,summary:n}=this.data,l=[Pt(e),Ct(r)].filter(Boolean).join(" ");return u`<div class="wrap" aria-label="Transit positions table">
			<div class="head">
				<h2 class="title">Transits</h2>
				${l?u`<p class="subtitle">${l}</p>`:p}
			</div>

			${n?this.renderSummaryPills(n):p}

			<div>
				<p class="section-label">Planet positions</p>
				<div class="overflow-scroll">
					${this.renderPlanetsTable(o)}
				</div>
			</div>

			${i?.length?u`<div>
						<p class="section-label">Transit aspects</p>
						<div class="overflow-scroll">
							${this.renderAspectsTable(i)}
						</div>
					</div>`:p}
		</div>`}renderSummaryPills(e){return u`<div class="summary-pills" role="region" aria-label="Aspect summary">
			<span class="pill pill--muted">
				Total: ${e.totalAspects}
			</span>
			<span class="pill pill--success">
				Harmonious: ${e.harmonious}
			</span>
			<span class="pill pill--danger">
				Challenging: ${e.challenging}
			</span>
			<span class="pill pill--muted">
				Neutral: ${e.neutral}
			</span>
		</div>`}renderPlanetsTable(e){return u`<table class="planets-table">
			<thead>
				<tr>
					<th scope="col">Planet</th>
					<th scope="col">Sign</th>
					<th scope="col">Degree</th>
					<th scope="col">Speed</th>
				</tr>
			</thead>
			<tbody>
				${e.map(r=>{let o=V[H(r.name)]??"",i=wt[H(r.sign)]??"",n=r.speed>=0?"\u2191":"\u2193";return u`<tr>
						<td>
							<div class="planet-cell">
								<span class="glyph" aria-hidden="true">${o}</span>
								${r.name}
								${r.isRetrograde?u`<span class="retro-badge" aria-label="retrograde">R</span>`:p}
							</div>
						</td>
						<td>
							<div class="planet-cell">
								<span class="glyph" aria-hidden="true">${i}</span>
								${r.sign}
							</div>
						</td>
						<td class="num">${O(r.degree,2)}</td>
						<td class="speed">
							<span class="speed-arrow" aria-hidden="true">${n}</span>
							${O(Math.abs(r.speed),4)}
						</td>
					</tr>`})}
			</tbody>
		</table>`}renderAspectsTable(e){return u`<table class="aspects-table">
			<thead>
				<tr>
					<th scope="col">Transit Planet</th>
					<th scope="col">Natal Planet</th>
					<th scope="col">Type</th>
					<th scope="col">Orb</th>
					<th scope="col">Status</th>
					<th scope="col">Strength</th>
				</tr>
			</thead>
			<tbody>
				${e.map(r=>{let o=V[H(r.transitPlanet)]??"",i=V[H(r.natalPlanet)]??"",n=`nature-${(r.nature??"").toLowerCase()}`,l=r.interpretation?.summary??"";return u`<tr class=${l?"aspect-row":"aspect-row no-interp"}>
							<td>
								<div class="arrow-cell">
									<span class="glyph" aria-hidden="true">${o}</span>
									${r.transitPlanet}
								</div>
							</td>
							<td>
								<div class="arrow-cell">
									<span class="glyph" aria-hidden="true">${i}</span>
									${r.natalPlanet}
								</div>
							</td>
							<td class=${n}>${(r.type??"").toLowerCase()}</td>
							<td class="num">${O(r.orb,2)}</td>
							<td>${r.isApplying?"Applying":"Separating"}</td>
							<td class="num">${O(r.strength,1)}</td>
						</tr>
						${l?u`<tr class="interp-row">
										<td colspan="6">${l}</td>
									</tr>`:p}`})}
			</tbody>
		</table>`}};A.styles=[Et,C`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.head {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
			}

			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}

			.subtitle {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0;
			}

			.summary-pills {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}

			.pill {
				display: inline-flex;
				align-items: center;
				gap: 4px;
				padding: 2px var(--roxy-space-sm, 0.5rem);
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				border: 1px solid currentColor;
			}

			.pill--muted {
				color: var(--roxy-fg, #0a0a0a);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
			}

			.pill--success {
				color: var(--roxy-success-fg, #166534);
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 10%, transparent);
			}

			.pill--danger {
				color: var(--roxy-danger-fg, #991b1b);
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 10%, transparent);
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

			.section-label {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
			}

			.glyph {
				font-size: 1.1em;
				margin-right: 2px;
				line-height: 1;
			}

			.planet-cell {
				display: flex;
				align-items: center;
				gap: 4px;
				white-space: nowrap;
			}

			.retro-badge {
				display: inline-block;
				font-size: 0.7em;
				padding: 1px 4px;
				border-radius: var(--roxy-radius-sm, 4px);
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 12%, transparent);
				color: var(--roxy-warning-fg, #9a3412);
				font-weight: var(--roxy-weight-bold, 600);
				margin-left: 2px;
				vertical-align: middle;
			}

			.speed {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-muted, #71717a);
				white-space: nowrap;
			}

			.speed-arrow {
				font-size: 0.85em;
			}

			td.num {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-muted, #71717a);
			}

			.nature-harmonious {
				color: var(--roxy-success-fg, #166534);
			}

			.nature-challenging {
				color: var(--roxy-danger-fg, #991b1b);
			}

			.nature-neutral {
				color: var(--roxy-muted, #71717a);
			}

			.arrow-cell {
				display: inline-flex;
				align-items: center;
				gap: 4px;
				white-space: nowrap;
			}

			.interp-row td {
				padding-top: 0;
				padding-bottom: var(--roxy-space-sm, 0.5rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				color: var(--roxy-secondary, #475569);
				font-size: var(--roxy-text-xs, 0.75rem);
				line-height: 1.45;
			}

			.aspect-row td {
				border-bottom: none;
				padding-bottom: 4px;
			}

			.aspect-row.no-interp td {
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				padding-bottom: var(--roxy-space-sm, 0.5rem);
			}

			.overflow-scroll {
				overflow-x: auto;
				-webkit-overflow-scrolling: touch;
			}
		`],W([it({attribute:!1})],A.prototype,"data",2),A=W([St("roxy-transits-table")],A);return Lt(Jt);})();
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
//# sourceMappingURL=transits-table.js.map
