"use strict";var RoxyUI=(()=>{var Ae=Object.defineProperty;var pr=Object.getOwnPropertyDescriptor;var Gr=Object.getOwnPropertyNames;var jr=Object.prototype.hasOwnProperty;var Ir=(i,a)=>{for(var e in a)Ae(i,e,{get:a[e],enumerable:!0})},Br=(i,a,e,r)=>{if(a&&typeof a=="object"||typeof a=="function")for(let s of Gr(a))!jr.call(i,s)&&s!==e&&Ae(i,s,{get:()=>a[s],enumerable:!(r=pr(a,s))||r.enumerable});return i};var qr=i=>Br(Ae({},"__esModule",{value:!0}),i),p=(i,a,e,r)=>{for(var s=r>1?void 0:r?pr(a,e):a,o=i.length-1,l;o>=0;o--)(l=i[o])&&(s=(r?l(a,e,s):l(s))||s);return r&&s&&Ae(a,e,s),s};var Ct={};Ir(Ct,{ROXY_COMPONENTS:()=>Ie,ROXY_UI_COMPONENTS:()=>At,ROXY_UI_VERSION:()=>Hr,RoxyAshtakavargaGrid:()=>M,RoxyBiorhythmChart:()=>D,RoxyChoghadiyaGrid:()=>re,RoxyCompatibilityCard:()=>H,RoxyDashaTimeline:()=>G,RoxyData:()=>j,RoxyDivisionalChart:()=>I,RoxyDoshaCard:()=>B,RoxyEndpointForm:()=>_,RoxyGunaMilan:()=>te,RoxyHexagram:()=>q,RoxyHoroscopeCard:()=>U,RoxyKpPlanetsTable:()=>ae,RoxyLocationSearch:()=>T,RoxyMoonPhase:()=>Y,RoxyNatalChart:()=>K,RoxyNumerologyCard:()=>V,RoxyPanchangTable:()=>F,RoxyShadbalaTable:()=>se,RoxySynastryChart:()=>oe,RoxyTarotCard:()=>W,RoxyTarotSpread:()=>J,RoxyTransitsTable:()=>ie,RoxyVedicKundli:()=>X,RoxyYogaList:()=>Z});var Ce=globalThis,Ee=Ce.ShadowRoot&&(Ce.ShadyCSS===void 0||Ce.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Be=Symbol(),mr=new WeakMap,ye=class{constructor(a,e,r){if(this._$cssResult$=!0,r!==Be)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=a,this.t=e}get styleSheet(){let a=this.o,e=this.t;if(Ee&&a===void 0){let r=e!==void 0&&e.length===1;r&&(a=mr.get(e)),a===void 0&&((this.o=a=new CSSStyleSheet).replaceSync(this.cssText),r&&mr.set(e,a))}return a}toString(){return this.cssText}},hr=i=>new ye(typeof i=="string"?i:i+"",void 0,Be),x=(i,...a)=>{let e=i.length===1?i[0]:a.reduce((r,s,o)=>r+(l=>{if(l._$cssResult$===!0)return l.cssText;if(typeof l=="number")return l;throw Error("Value passed to 'css' function must be a 'css' function result: "+l+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[o+1],i[0]);return new ye(e,i,Be)},gr=(i,a)=>{if(Ee)i.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of a){let r=document.createElement("style"),s=Ce.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,i.appendChild(r)}},qe=Ee?i=>i:i=>i instanceof CSSStyleSheet?(a=>{let e="";for(let r of a.cssRules)e+=r.cssText;return hr(e)})(i):i;var{is:Ur,defineProperty:Yr,getOwnPropertyDescriptor:Kr,getOwnPropertyNames:Vr,getOwnPropertySymbols:Fr,getPrototypeOf:Wr}=Object,Re=globalThis,yr=Re.trustedTypes,Jr=yr?yr.emptyScript:"",Xr=Re.reactiveElementPolyfillSupport,ue=(i,a)=>i,xe={toAttribute(i,a){switch(a){case Boolean:i=i?Jr:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,a){let e=i;switch(a){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Pe=(i,a)=>!Ur(i,a),ur={attribute:!0,type:String,converter:xe,reflect:!1,useDefault:!1,hasChanged:Pe};Symbol.metadata??=Symbol("metadata"),Re.litPropertyMetadata??=new WeakMap;var N=class extends HTMLElement{static addInitializer(a){this._$Ei(),(this.l??=[]).push(a)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(a,e=ur){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(a)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(a,e),!e.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(a,r,e);s!==void 0&&Yr(this.prototype,a,s)}}static getPropertyDescriptor(a,e,r){let{get:s,set:o}=Kr(this.prototype,a)??{get(){return this[e]},set(l){this[e]=l}};return{get:s,set(l){let d=s?.call(this);o?.call(this,l),this.requestUpdate(a,d,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(a){return this.elementProperties.get(a)??ur}static _$Ei(){if(this.hasOwnProperty(ue("elementProperties")))return;let a=Wr(this);a.finalize(),a.l!==void 0&&(this.l=[...a.l]),this.elementProperties=new Map(a.elementProperties)}static finalize(){if(this.hasOwnProperty(ue("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ue("properties"))){let e=this.properties,r=[...Vr(e),...Fr(e)];for(let s of r)this.createProperty(s,e[s])}let a=this[Symbol.metadata];if(a!==null){let e=litPropertyMetadata.get(a);if(e!==void 0)for(let[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(a){let e=[];if(Array.isArray(a)){let r=new Set(a.flat(1/0).reverse());for(let s of r)e.unshift(qe(s))}else a!==void 0&&e.push(qe(a));return e}static _$Eu(a,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof a=="string"?a.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(a=>this.enableUpdating=a),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(a=>a(this))}addController(a){(this._$EO??=new Set).add(a),this.renderRoot!==void 0&&this.isConnected&&a.hostConnected?.()}removeController(a){this._$EO?.delete(a)}_$E_(){let a=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(a.set(r,this[r]),delete this[r]);a.size>0&&(this._$Ep=a)}createRenderRoot(){let a=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gr(a,this.constructor.elementStyles),a}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(a=>a.hostConnected?.())}enableUpdating(a){}disconnectedCallback(){this._$EO?.forEach(a=>a.hostDisconnected?.())}attributeChangedCallback(a,e,r){this._$AK(a,r)}_$ET(a,e){let r=this.constructor.elementProperties.get(a),s=this.constructor._$Eu(a,r);if(s!==void 0&&r.reflect===!0){let o=(r.converter?.toAttribute!==void 0?r.converter:xe).toAttribute(e,r.type);this._$Em=a,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(a,e){let r=this.constructor,s=r._$Eh.get(a);if(s!==void 0&&this._$Em!==s){let o=r.getPropertyOptions(s),l=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:xe;this._$Em=s;let d=l.fromAttribute(e,o.type);this[s]=d??this._$Ej?.get(s)??d,this._$Em=null}}requestUpdate(a,e,r,s=!1,o){if(a!==void 0){let l=this.constructor;if(s===!1&&(o=this[a]),r??=l.getPropertyOptions(a),!((r.hasChanged??Pe)(o,e)||r.useDefault&&r.reflect&&o===this._$Ej?.get(a)&&!this.hasAttribute(l._$Eu(a,r))))return;this.C(a,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(a,e,{useDefault:r,reflect:s,wrapped:o},l){r&&!(this._$Ej??=new Map).has(a)&&(this._$Ej.set(a,l??e??this[a]),o!==!0||l!==void 0)||(this._$AL.has(a)||(this.hasUpdated||r||(e=void 0),this._$AL.set(a,e)),s===!0&&this._$Em!==a&&(this._$Eq??=new Set).add(a))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let a=this.scheduleUpdate();return a!=null&&await a,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,o]of r){let{wrapped:l}=o,d=this[s];l!==!0||this._$AL.has(s)||d===void 0||this.C(s,void 0,o,d)}}let a=!1,e=this._$AL;try{a=this.shouldUpdate(e),a?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw a=!1,this._$EM(),r}a&&this._$AE(e)}willUpdate(a){}_$AE(a){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(a)),this.updated(a)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(a){return!0}update(a){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(a){}firstUpdated(a){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[ue("elementProperties")]=new Map,N[ue("finalized")]=new Map,Xr?.({ReactiveElement:N}),(Re.reactiveElementVersions??=[]).push("2.1.2");var Je=globalThis,xr=i=>i,Te=Je.trustedTypes,fr=Te?Te.createPolicy("lit-html",{createHTML:i=>i}):void 0,Sr="$lit$",Q=`lit$${Math.random().toFixed(9).slice(2)}$`,Ar="?"+Q,Zr=`<${Ar}>`,de=document,ve=()=>de.createComment(""),be=i=>i===null||typeof i!="object"&&typeof i!="function",Xe=Array.isArray,Qr=i=>Xe(i)||typeof i?.[Symbol.iterator]=="function",Ue=`[ 	
\f\r]`,fe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vr=/-->/g,br=/>/g,ne=RegExp(`>|${Ue}(?:([^\\s"'>=/]+)(${Ue}*=${Ue}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$r=/'/g,wr=/"/g,Cr=/^(?:script|style|textarea|title)$/i,Ze=i=>(a,...e)=>({_$litType$:i,strings:a,values:e}),t=Ze(1),S=Ze(2),_t=Ze(3),ce=Symbol.for("lit-noChange"),n=Symbol.for("lit-nothing"),kr=new WeakMap,le=de.createTreeWalker(de,129);function Er(i,a){if(!Xe(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return fr!==void 0?fr.createHTML(a):a}var et=(i,a)=>{let e=i.length-1,r=[],s,o=a===2?"<svg>":a===3?"<math>":"",l=fe;for(let d=0;d<e;d++){let c=i[d],m,h,g=-1,f=0;for(;f<c.length&&(l.lastIndex=f,h=l.exec(c),h!==null);)f=l.lastIndex,l===fe?h[1]==="!--"?l=vr:h[1]!==void 0?l=br:h[2]!==void 0?(Cr.test(h[2])&&(s=RegExp("</"+h[2],"g")),l=ne):h[3]!==void 0&&(l=ne):l===ne?h[0]===">"?(l=s??fe,g=-1):h[1]===void 0?g=-2:(g=l.lastIndex-h[2].length,m=h[1],l=h[3]===void 0?ne:h[3]==='"'?wr:$r):l===wr||l===$r?l=ne:l===vr||l===br?l=fe:(l=ne,s=void 0);let k=l===ne&&i[d+1].startsWith("/>")?" ":"";o+=l===fe?c+Zr:g>=0?(r.push(m),c.slice(0,g)+Sr+c.slice(g)+Q+k):c+Q+(g===-2?d:k)}return[Er(i,o+(i[e]||"<?>")+(a===2?"</svg>":a===3?"</math>":"")),r]},$e=class i{constructor({strings:a,_$litType$:e},r){let s;this.parts=[];let o=0,l=0,d=a.length-1,c=this.parts,[m,h]=et(a,e);if(this.el=i.createElement(m,r),le.currentNode=this.el.content,e===2||e===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=le.nextNode())!==null&&c.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(Sr)){let f=h[l++],k=s.getAttribute(g).split(Q),$=/([.?@])?(.*)/.exec(f);c.push({type:1,index:o,name:$[2],strings:k,ctor:$[1]==="."?Ke:$[1]==="?"?Ve:$[1]==="@"?Fe:ge}),s.removeAttribute(g)}else g.startsWith(Q)&&(c.push({type:6,index:o}),s.removeAttribute(g));if(Cr.test(s.tagName)){let g=s.textContent.split(Q),f=g.length-1;if(f>0){s.textContent=Te?Te.emptyScript:"";for(let k=0;k<f;k++)s.append(g[k],ve()),le.nextNode(),c.push({type:2,index:++o});s.append(g[f],ve())}}}else if(s.nodeType===8)if(s.data===Ar)c.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(Q,g+1))!==-1;)c.push({type:7,index:o}),g+=Q.length-1}o++}}static createElement(a,e){let r=de.createElement("template");return r.innerHTML=a,r}};function he(i,a,e=i,r){if(a===ce)return a;let s=r!==void 0?e._$Co?.[r]:e._$Cl,o=be(a)?void 0:a._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(i),s._$AT(i,e,r)),r!==void 0?(e._$Co??=[])[r]=s:e._$Cl=s),s!==void 0&&(a=he(i,s._$AS(i,a.values),s,r)),a}var Ye=class{constructor(a,e){this._$AV=[],this._$AN=void 0,this._$AD=a,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(a){let{el:{content:e},parts:r}=this._$AD,s=(a?.creationScope??de).importNode(e,!0);le.currentNode=s;let o=le.nextNode(),l=0,d=0,c=r[0];for(;c!==void 0;){if(l===c.index){let m;c.type===2?m=new we(o,o.nextSibling,this,a):c.type===1?m=new c.ctor(o,c.name,c.strings,this,a):c.type===6&&(m=new We(o,this,a)),this._$AV.push(m),c=r[++d]}l!==c?.index&&(o=le.nextNode(),l++)}return le.currentNode=de,s}p(a){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(a,r,e),e+=r.strings.length-2):r._$AI(a[e])),e++}},we=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(a,e,r,s){this.type=2,this._$AH=n,this._$AN=void 0,this._$AA=a,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let a=this._$AA.parentNode,e=this._$AM;return e!==void 0&&a?.nodeType===11&&(a=e.parentNode),a}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(a,e=this){a=he(this,a,e),be(a)?a===n||a==null||a===""?(this._$AH!==n&&this._$AR(),this._$AH=n):a!==this._$AH&&a!==ce&&this._(a):a._$litType$!==void 0?this.$(a):a.nodeType!==void 0?this.T(a):Qr(a)?this.k(a):this._(a)}O(a){return this._$AA.parentNode.insertBefore(a,this._$AB)}T(a){this._$AH!==a&&(this._$AR(),this._$AH=this.O(a))}_(a){this._$AH!==n&&be(this._$AH)?this._$AA.nextSibling.data=a:this.T(de.createTextNode(a)),this._$AH=a}$(a){let{values:e,_$litType$:r}=a,s=typeof r=="number"?this._$AC(a):(r.el===void 0&&(r.el=$e.createElement(Er(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(e);else{let o=new Ye(s,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(a){let e=kr.get(a.strings);return e===void 0&&kr.set(a.strings,e=new $e(a)),e}k(a){Xe(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,s=0;for(let o of a)s===e.length?e.push(r=new i(this.O(ve()),this.O(ve()),this,this.options)):r=e[s],r._$AI(o),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(a=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);a!==this._$AB;){let r=xr(a).nextSibling;xr(a).remove(),a=r}}setConnected(a){this._$AM===void 0&&(this._$Cv=a,this._$AP?.(a))}},ge=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(a,e,r,s,o){this.type=1,this._$AH=n,this._$AN=void 0,this.element=a,this.name=e,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=n}_$AI(a,e=this,r,s){let o=this.strings,l=!1;if(o===void 0)a=he(this,a,e,0),l=!be(a)||a!==this._$AH&&a!==ce,l&&(this._$AH=a);else{let d=a,c,m;for(a=o[0],c=0;c<o.length-1;c++)m=he(this,d[r+c],e,c),m===ce&&(m=this._$AH[c]),l||=!be(m)||m!==this._$AH[c],m===n?a=n:a!==n&&(a+=(m??"")+o[c+1]),this._$AH[c]=m}l&&!s&&this.j(a)}j(a){a===n?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,a??"")}},Ke=class extends ge{constructor(){super(...arguments),this.type=3}j(a){this.element[this.name]=a===n?void 0:a}},Ve=class extends ge{constructor(){super(...arguments),this.type=4}j(a){this.element.toggleAttribute(this.name,!!a&&a!==n)}},Fe=class extends ge{constructor(a,e,r,s,o){super(a,e,r,s,o),this.type=5}_$AI(a,e=this){if((a=he(this,a,e,0)??n)===ce)return;let r=this._$AH,s=a===n&&r!==n||a.capture!==r.capture||a.once!==r.once||a.passive!==r.passive,o=a!==n&&(r===n||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,a),this._$AH=a}handleEvent(a){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,a):this._$AH.handleEvent(a)}},We=class{constructor(a,e,r){this.element=a,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(a){he(this,a)}};var rt=Je.litHtmlPolyfillSupport;rt?.($e,we),(Je.litHtmlVersions??=[]).push("3.3.2");var Rr=(i,a,e)=>{let r=e?.renderBefore??a,s=r._$litPart$;if(s===void 0){let o=e?.renderBefore??null;r._$litPart$=s=new we(a.insertBefore(ve(),o),o,void 0,e??{})}return s._$AI(i),s};var Qe=globalThis,u=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let a=super.createRenderRoot();return this.renderOptions.renderBefore??=a.firstChild,a}update(a){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(a),this._$Do=Rr(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ce}};u._$litElement$=!0,u.finalized=!0,Qe.litElementHydrateSupport?.({LitElement:u});var tt=Qe.litElementPolyfillSupport;tt?.({LitElement:u});(Qe.litElementVersions??=[]).push("4.2.2");var v=i=>(a,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,a)}):customElements.define(i,a)};var at={attribute:!0,type:String,converter:xe,reflect:!1,hasChanged:Pe},st=(i=at,a,e)=>{let{kind:r,metadata:s}=e,o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),r==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(e.name,i),r==="accessor"){let{name:l}=e;return{set(d){let c=a.get.call(this);a.set.call(this,d),this.requestUpdate(l,c,i,!0,d)},init(d){return d!==void 0&&this.C(l,void 0,i,d),d}}}if(r==="setter"){let{name:l}=e;return function(d){let c=this[l];a.call(this,d),this.requestUpdate(l,c,i,!0,d)}}throw Error("Unsupported decorator location: "+r)};function y(i){return(a,e)=>typeof e=="object"?st(i,a,e):((r,s,o)=>{let l=s.hasOwnProperty(o);return s.constructor.createProperty(o,r),l?Object.getOwnPropertyDescriptor(s,o):void 0})(i,a,e)}function E(i){return y({...i,state:!0,attribute:!1})}var L={Sun:"\u2609",Moon:"\u263D",Mercury:"\u263F",Venus:"\u2640",Earth:"\u2641",Mars:"\u2642",Jupiter:"\u2643",Saturn:"\u2644",Uranus:"\u2645",Neptune:"\u2646",Pluto:"\u2647",Rahu:"\u260A",Ketu:"\u260B",Ascendant:"Asc",Lagna:"La",NorthNode:"\u260A",SouthNode:"\u260B","North node":"\u260A","South node":"\u260B",Chiron:"\u26B7",Lilith:"\u26B8","Black moon lilith":"\u26B8"},er={Sun:"Su",Moon:"Mo",Mercury:"Me",Venus:"Ve",Mars:"Ma",Jupiter:"Ju",Saturn:"Sa",Uranus:"Ur",Neptune:"Ne",Pluto:"Pl",Rahu:"Ra",Ketu:"Ke",Ascendant:"Asc",Lagna:"La"},z={Aries:"\u2648",Taurus:"\u2649",Gemini:"\u264A",Cancer:"\u264B",Leo:"\u264C",Virgo:"\u264D",Libra:"\u264E",Scorpio:"\u264F",Sagittarius:"\u2650",Capricorn:"\u2651",Aquarius:"\u2652",Pisces:"\u2653"},rr={Aries:"Ar",Taurus:"Ta",Gemini:"Ge",Cancer:"Cn",Leo:"Le",Virgo:"Vi",Libra:"Li",Scorpio:"Sc",Sagittarius:"Sg",Capricorn:"Cp",Aquarius:"Aq",Pisces:"Pi"},pe=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],_e=pe.map(i=>i.toLowerCase());var tr={heaven:"\u2630",lake:"\u2631",fire:"\u2632",thunder:"\u2633",wind:"\u2634",water:"\u2635",mountain:"\u2636",earth:"\u2637",Heaven:"\u2630",Lake:"\u2631",Fire:"\u2632",Thunder:"\u2633",Wind:"\u2634",Water:"\u2635",Mountain:"\u2636",Earth:"\u2637"},Pr={"new moon":"\u{1F311}","waxing crescent":"\u{1F312}","first quarter":"\u{1F313}","waxing gibbous":"\u{1F314}","full moon":"\u{1F315}","waning gibbous":"\u{1F316}","last quarter":"\u{1F317}","waning crescent":"\u{1F318}"};var b=x`
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
`;var ot={sarva:"Sarvashtakavarga",bhinna:"Bhinnashtakavarga",pinda:"Shodhya Pinda"},me=["sarva","bhinna","pinda"],M=class extends u{constructor(){super(...arguments);this.data=null;this.activeTab="sarva"}render(){if(!this.data)return t`<div class="roxy-empty" role="status">No ashtakavarga data</div>`;let e=this.data.signs??[];return t`<div class="wrap" aria-label="Ashtakavarga grid">
			<div class="head">
				<h2 class="title">Ashtakavarga</h2>
				${e.length?t`<p class="subtitle">${e.length} signs</p>`:n}
			</div>

			<div
				class="tablist"
				role="tablist"
				aria-label="Ashtakavarga views"
				@keydown=${this.onTabKeyDown}
			>
				${me.map(r=>t`<button
						class="tab"
						role="tab"
						id="tab-${r}"
						aria-selected=${this.activeTab===r?"true":"false"}
						aria-controls="panel-${r}"
						tabindex=${this.activeTab===r?"0":"-1"}
						@click=${()=>{this.activeTab=r}}
					>
						${ot[r]}
					</button>`)}
			</div>

			<div
				id="panel-${this.activeTab}"
				role="tabpanel"
				aria-labelledby="tab-${this.activeTab}"
			>
				${this.activeTab==="sarva"?this.renderSarva(e):this.activeTab==="bhinna"?this.renderBhinna(e):this.renderPinda()}
			</div>
		</div>`}onTabKeyDown(e){let r=me.indexOf(this.activeTab);e.key==="ArrowRight"?(e.preventDefault(),this.activeTab=me[(r+1)%me.length],this.focusActiveTab()):e.key==="ArrowLeft"&&(e.preventDefault(),this.activeTab=me[(r-1+me.length)%me.length],this.focusActiveTab())}focusActiveTab(){requestAnimationFrame(()=>{this.shadowRoot?.querySelector(`#tab-${this.activeTab}`)?.focus()})}heatClass(e){return e<=1?"heat-1":e<=2?"heat-2":e<=3?"heat-3":e<=4?"heat-4":e<=5?"heat-5":e<=6?"heat-6":"heat-7"}renderSarva(e){let r=this.data.sarvashtakavarga;return r?t`<div class="overflow-scroll">
			<table aria-label="Sarvashtakavarga bindu counts per sign">
				<thead>
					<tr>
						<th scope="col">Sign</th>
						<th scope="col">Bindus</th>
					</tr>
				</thead>
				<tbody>
					${e.map((s,o)=>{let l=r.bindus[o]??0,d=this.heatClass(l);return t`<tr>
							<td>
								<div class="planet-cell">
									<span class="glyph" aria-hidden="true">${z[s]??""}</span>
									${s}
								</div>
							</td>
							<td class="${`heat-cell ${d}`}">${l}</td>
						</tr>`})}
				</tbody>
				<tfoot>
					<tr class="total-row">
						<td>Total</td>
						<td>${r.total}</td>
					</tr>
				</tfoot>
			</table>
		</div>`:t`<p class="roxy-empty">No sarvashtakavarga data</p>`}renderBhinna(e){let r=this.data.bhinnashtakavarga;return r?.length?t`<div class="overflow-scroll">
			<table class="bhinna-table" aria-label="Bhinnashtakavarga planet-by-sign grid">
				<thead>
					<tr>
						<th scope="col">Planet</th>
						${e.map(s=>t`<th scope="col" title=${s}>${z[s]??s.slice(0,2)}</th>`)}
						<th scope="col">Total</th>
					</tr>
				</thead>
				<tbody>
					${r.map(s=>t`<tr>
						<td>${s.planet}</td>
						${s.bindus.map(o=>{let l=this.heatClass(o);return t`<td class="${`heat-cell ${l}`}">${o}</td>`})}
						<td>${s.total}</td>
					</tr>`)}
				</tbody>
			</table>
		</div>`:t`<p class="roxy-empty">No bhinnashtakavarga data</p>`}renderPinda(){let e=this.data.shodhyaPinda;return e?.length?t`<div class="overflow-scroll">
			<table aria-label="Shodhya Pinda planet strength scores">
				<thead>
					<tr>
						<th scope="col">Planet</th>
						<th scope="col">Rashi Pinda</th>
						<th scope="col">Graha Pinda</th>
						<th scope="col">Shodhya Pinda</th>
					</tr>
				</thead>
				<tbody>
					${e.map(r=>t`<tr>
							<td>${r.planet}</td>
							<td>${r.rashiPinda}</td>
							<td>${r.grahaPinda}</td>
							<td>${r.shodhyaPinda}</td>
						</tr>`)}
				</tbody>
			</table>
		</div>`:t`<p class="roxy-empty">No shodhya pinda data</p>`}};M.styles=[b,x`
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

			/* Tabs */
			.tablist {
				display: flex;
				gap: 2px;
				border-bottom: 2px solid var(--roxy-border, #e4e4e7);
			}

			.tab {
				padding: var(--roxy-space-xs, 0.25rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				background: none;
				border: none;
				border-bottom: 2px solid transparent;
				margin-bottom: -2px;
				cursor: pointer;
				color: var(--roxy-muted, #71717a);
				font-family: inherit;
				transition: color var(--roxy-motion-duration, 200ms) var(--roxy-motion-easing, ease);
			}

			.tab[aria-selected='true'] {
				color: var(--roxy-accent-fg, #b45309);
				border-bottom-color: var(--roxy-accent, #f59e0b);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.tab:hover:not([aria-selected='true']) {
				color: var(--roxy-fg, #0a0a0a);
			}

			/* Tables */
			.overflow-scroll {
				overflow-x: auto;
				-webkit-overflow-scrolling: touch;
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
				text-align: center;
			}

			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.06em;
			}

			td:first-child,
			th:first-child {
				text-align: left;
			}

			.glyph {
				font-size: 1.1em;
				margin-right: 3px;
				line-height: 1;
			}

			.planet-cell {
				display: flex;
				align-items: center;
				gap: 4px;
				white-space: nowrap;
			}

			.total-row td {
				font-weight: var(--roxy-weight-bold, 600);
				border-top: 2px solid var(--roxy-border, #e4e4e7);
				border-bottom: none;
			}

			/* Heat cells */
			.heat-cell {
				border-radius: var(--roxy-radius-sm, 4px);
				font-weight: var(--roxy-weight-bold, 600);
				min-width: 2rem;
				font-variant-numeric: tabular-nums;
			}

			.heat-1 { background: var(--roxy-heat-1, #f0fdf4); color: var(--roxy-fg, #0a0a0a); }
			.heat-2 { background: var(--roxy-heat-2, #d1fae5); color: var(--roxy-fg, #0a0a0a); }
			.heat-3 { background: var(--roxy-heat-3, #a7f3d0); color: var(--roxy-fg, #0a0a0a); }
			.heat-4 { background: var(--roxy-heat-4, #fde68a); color: var(--roxy-fg, #0a0a0a); }
			.heat-5 { background: var(--roxy-heat-5, #fdba74); color: var(--roxy-fg, #0a0a0a); }
			.heat-6 { background: var(--roxy-heat-6, #fb923c); color: var(--roxy-fg, #0a0a0a); }
			.heat-7 { background: var(--roxy-heat-7, #ef4444); color: var(--roxy-fg, #0a0a0a); }

			/* Bhinna grid: planet header column narrower */
			.bhinna-table th:first-child,
			.bhinna-table td:first-child {
				min-width: 5rem;
			}
		`],p([y({attribute:!1})],M.prototype,"data",2),p([E()],M.prototype,"activeTab",2),M=p([v("roxy-ashtakavarga-grid")],M);var Tr={physical:"#dc2626",emotional:"#0284c7",intellectual:"#16a34a",intuitive:"#a855f7",aesthetic:"#f59e0b",awareness:"#ec4899",spiritual:"#14b8a6",passion:"#ef4444",mastery:"#6366f1",wisdom:"#475569"},D=class extends u{constructor(){super(...arguments);this.data=null;this.mode="daily"}render(){let e=this.data;return e?this.mode==="critical-days"&&"criticalDays"in e?this.renderCritical(e):this.mode==="forecast"&&"days"in e?this.renderForecast(e):this.renderDaily(e):t`<div class="roxy-empty" role="status">No biorhythm data</div>`}renderDaily(e){let r=e.quickRead??{},s=Object.entries(r).map(([o,l])=>{let d=typeof l=="number"?l:0,c=Math.abs(d)>1?d/100:d;return[o,c]});return t`<section class="wrap" aria-label="Daily biorhythm">
			<header class="head">
				<h2 class="title">Biorhythm</h2>
				${typeof e.energyRating=="number"?t`<span class="energy">Energy ${e.energyRating}/10</span>`:n}
			</header>
			<div class="bars" role="list">
				${s.map(([o,l])=>{let d=(l+1)/2*100,c=Tr[o]??"var(--roxy-accent, #f59e0b)";return t`<div class="bar" role="listitem">
						<span style="text-transform: capitalize">${o}</span>
						<span class="track">
							<span
								class="fill"
								style="width: ${d}%; background: ${c}"
							></span>
						</span>
						<span class="value">${Math.round(l*100)}%</span>
					</div>`})}
			</div>
			${e.dailyMessage?t`<p class="advice">${e.dailyMessage}</p>`:n}
			${e.advice?t`<p class="advice">${e.advice}</p>`:n}
		</section>`}renderForecast(e){let r=e.days??[];if(r.length===0)return t`<div class="roxy-empty" role="status">No forecast</div>`;let s=600,o=160,l=s/Math.max(r.length-1,1),d=["physical","emotional","intellectual","intuitive"];return t`<section class="wrap" aria-label="Biorhythm forecast">
			<header class="head">
				<h2 class="title">Forecast</h2>
				<span class="energy">${e.startDate} - ${e.endDate}</span>
			</header>
			<svg
				viewBox="0 0 ${s} ${o}"
				role="img"
				aria-label="Biorhythm cycle lines across the forecast window"
			>
				<title>Biorhythm forecast</title>
				<line
					x1="0"
					y1=${o/2}
					x2=${s}
					y2=${o/2}
					stroke="var(--roxy-border, #e4e4e7)"
					stroke-width="1"
				/>
				${d.map(c=>{let m=r.map((g,f)=>{let k=g[c]??0,$=f*l,cr=o/2-k/100*(o/2-8);return`${$.toFixed(2)},${cr.toFixed(2)}`}).join(" "),h=Tr[c]??"#475569";return S`<polyline points=${m} fill="none" stroke=${h} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />`})}
			</svg>
			${e.summary?.periodAdvice?t`<p class="advice">${e.summary.periodAdvice}</p>`:n}
		</section>`}renderCritical(e){return t`<section class="wrap" aria-label="Critical days">
			<header class="head">
				<h2 class="title">Critical days</h2>
				<span class="energy">${e.totalCriticalDays} total</span>
			</header>
			<div>
				${e.criticalDays.map(r=>t`<span class="crit"
						>${r.date} · ${r.cycle} ${r.severity}</span
					>`)}
			</div>
		</section>`}};D.styles=[b,x`
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
			.energy {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-accent-fg, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.bars {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.bar {
				display: grid;
				grid-template-columns: 8rem 1fr 3.5rem;
				gap: var(--roxy-space-sm, 0.5rem);
				align-items: center;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.track {
				height: 14px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
				position: relative;
			}
			.fill {
				display: block;
				height: 100%;
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.value {
				font-variant-numeric: tabular-nums;
				text-align: right;
				color: var(--roxy-muted, #71717a);
			}
			.advice {
				color: var(--roxy-fg, #0a0a0a);
			}
			.alert {
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 12%, transparent);
				border: 1px solid color-mix(in srgb, var(--roxy-warning, #ea580c) 32%, transparent);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0;
			}
			svg {
				display: block;
				width: 100%;
				height: auto;
			}
			.crit {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 12%, transparent);
				border-radius: var(--roxy-radius-sm, 4px);
				padding: 4px 8px;
				font-size: var(--roxy-text-xs, 0.75rem);
				display: inline-block;
				margin: 2px;
			}
		`],p([y({attribute:!1})],D.prototype,"data",2),p([y({type:String,reflect:!0})],D.prototype,"mode",2),D=p([v("roxy-biorhythm-chart")],D);function C(i){return i?i.charAt(0).toUpperCase()+i.slice(1).toLowerCase():""}function ee(i){return i.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^\w/,a=>a.toUpperCase())}function Lr(i){try{let a=new Date(i);return Number.isNaN(a.getTime())?i:a.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return i}}var re=class extends u{constructor(){super(...arguments);this.data=null}renderTile(e){let r=e.effect==="Good"?"good":e.effect==="Bad"?"bad":"neutral",s=L[C(e.lord)]??"",o=`${Lr(e.start)} - ${Lr(e.end)}`;return t`<div class="cho-tile ${r}" role="listitem">
			<span class="tile-name">${e.name}</span>
			<span class="tile-time" aria-label="Time range">${o}</span>
			<span class="tile-lord">
				${s?t`<span aria-hidden="true">${s}</span>`:n}
				${e.lord}
			</span>
		</div>`}render(){if(!this.data)return t`<div class="roxy-empty" role="status">No choghadiya data</div>`;let{date:e,dayChoghadiya:r,nightChoghadiya:s}=this.data;return t`<div class="wrap">
			<div class="header">
				<h2 class="title">Choghadiya</h2>
				${e?t`<p class="subtitle">${e}</p>`:n}
			</div>

			<div class="cho-grid">
				<section class="period-col" aria-label="Day muhurta periods">
					<h3 class="period-heading">Day</h3>
					<div role="list" aria-label="Daytime choghadiya">
						${r&&r.length>0?r.map(o=>this.renderTile(o)):t`<p class="roxy-empty" role="status">No daytime periods</p>`}
					</div>
				</section>

				<section class="period-col" aria-label="Night muhurta periods">
					<h3 class="period-heading">Night</h3>
					<div role="list" aria-label="Nighttime choghadiya">
						${s&&s.length>0?s.map(o=>this.renderTile(o)):t`<p class="roxy-empty" role="status">No nighttime periods</p>`}
					</div>
				</section>
			</div>
		</div>`}};re.styles=[b,x`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.header {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}
			.subtitle {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				margin: 0;
			}
			.cho-grid {
				display: grid;
				grid-template-columns: 1fr;
				gap: var(--roxy-space-md, 1rem);
			}
			@media (min-width: 720px) {
				.cho-grid {
					grid-template-columns: 1fr 1fr;
				}
			}
			.period-col {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.period-heading {
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.cho-tile {
				display: grid;
				grid-template-columns: 1fr auto;
				align-items: center;
				gap: 0.25em 0.75em;
				padding: 0.55em 0.85em;
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
			}
			.cho-tile.good {
				background: color-mix(in srgb, var(--roxy-success, #22c55e) 18%, transparent);
				border-color: color-mix(in srgb, var(--roxy-success, #22c55e) 45%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.cho-tile.bad {
				background: color-mix(in srgb, var(--roxy-danger, #ef4444) 18%, transparent);
				border-color: color-mix(in srgb, var(--roxy-danger, #ef4444) 45%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.cho-tile.neutral {
				background: transparent;
				color: var(--roxy-fg, #0a0a0a);
			}
			.tile-name {
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
				grid-column: 1;
			}
			.tile-time {
				font-size: var(--roxy-text-xs, 0.75rem);
				opacity: 0.8;
				white-space: nowrap;
				grid-column: 2;
				grid-row: 1 / 3;
				text-align: right;
				align-self: center;
			}
			.tile-lord {
				font-size: var(--roxy-text-sm, 0.875rem);
				opacity: 0.85;
				grid-column: 1;
				display: flex;
				align-items: center;
				gap: 0.25em;
			}
		`],p([y({attribute:!1})],re.prototype,"data",2),re=p([v("roxy-choghadiya-grid")],re);function O(i){if(typeof i!="string"||i.length===0||/^\d{4}-\d{2}-\d{2}$/.test(i))return"";let e=/^\d{2}:\d{2}(:\d{2})?$/.test(i)?`1970-01-01T${i}`:i,r=new Date(e);return Number.isNaN(r.getTime())?i:r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit",hour12:!0})}function ze(i){if(typeof i!="string"||i.length===0)return"";let a=new Date(/^\d{4}-\d{2}-\d{2}$/.test(i)?`${i}T00:00:00`:i);return Number.isNaN(a.getTime())?i:a.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}function ar(i){if(!i)return"";let a=O(i.start),e=O(i.end);return a&&e?`${a} - ${e}`:a||e||""}function w(i,a=1){return typeof i!="number"||!Number.isFinite(i)?"":i.toFixed(a).replace(/\.?0+$/,"")}function _r(i,a=1){let e=w(i,a);return e?`${e}%`:""}var Ne={conjunction:"aspect-conjunction",sextile:"aspect-sextile",square:"aspect-square",trine:"aspect-trine",opposition:"aspect-opposition"};function ke(i){return(i.type??"").toLowerCase().replace(/_/g,"-")}var H=class extends u{constructor(){super(...arguments);this.data=null;this.mode="astrology"}getBreakdown(){let e=this.data;if(!e)return{};if("categories"in e&&e.categories){let r={};for(let[s,o]of Object.entries(e.categories))typeof o=="number"&&Number.isFinite(o)&&(r[s]=o);return r}return{}}render(){let e=this.data;if(!e)return t`<div class="roxy-empty" role="status">No compatibility data</div>`;let r=e.overallScore,s=this.getBreakdown(),o="rating"in e?e.rating:void 0,l="archetype"in e?e.archetype:void 0,d="advice"in e?e.advice:void 0,c="summary"in e?e.summary:void 0,m="interpretation"in e?e.interpretation:void 0,h="strengths"in e?e.strengths:void 0,g="challenges"in e?e.challenges:void 0,f="keyAspects"in e?e.keyAspects:void 0;return t`<article
			class="card"
			aria-label=${`Compatibility (${this.mode})`}
		>
			<div class="head">
				<h2>${this.mode} compatibility</h2>
				<div>
					${typeof r=="number"?t`<div class="score">${w(r,0)}</div>`:n}
					${o?t`<div class="rating">${o}</div>`:n}
				</div>
			</div>

			${Object.keys(s).length>0?t`<div role="list">
						${Object.entries(s).map(([k,$])=>t`<div class="bar-row" role="listitem">
								<span style="text-transform: capitalize">${k}</span>
								<span class="bar"
									><span style="width: ${Math.max(0,Math.min(100,$))}%"></span
								></span>
								<span>${w($,0)}</span>
							</div>`)}
					</div>`:n}
			${l?t`<p>
						<span class="archetype">${l.label}</span>
						${l.description?t` · ${l.description}`:n}
					</p>`:n}
			${c?t`<p>${c}</p>`:n}
			${m&&!c?t`<p>${m}</p>`:n}
			${d?t`<p>${d}</p>`:n}
			${(h?.length??0)>0||(g?.length??0)>0?t`<div class="lists">
						${h?.length?t`<div>
									<h3>Strengths</h3>
									<ul>
										${h.map(k=>t`<li>${k}</li>`)}
									</ul>
								</div>`:n}
						${g?.length?t`<div>
									<h3>Challenges</h3>
									<ul>
										${g.map(k=>t`<li>${k}</li>`)}
									</ul>
								</div>`:n}
					</div>`:n}
			${f?.length?t`<div>
						<h3 style="margin: 0 0 0.25rem; font-size: var(--roxy-text-xs); color: var(--roxy-muted); text-transform: uppercase; letter-spacing: 0.06em;">Key aspects</h3>
						<ul style="margin: 0; padding-left: 1rem; font-size: var(--roxy-text-sm);">
							${f.slice(0,6).map(k=>t`<li>${it(k)}</li>`)}
						</ul>
					</div>`:n}
		</article>`}};H.styles=[b,x`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.head {
				display: grid;
				grid-template-columns: 1fr auto;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			.head h2 {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: capitalize;
			}

			.score {
				font-variant-numeric: tabular-nums;
				font-size: 2rem;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-fg, #b45309);
				line-height: 1;
			}
			.rating {
				color: var(--roxy-secondary, #475569);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			.bar-row {
				display: grid;
				grid-template-columns: 8rem 1fr 3.5rem;
				gap: var(--roxy-space-sm, 0.5rem);
				align-items: center;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.bar {
				height: 8px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
			}
			.bar > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.bar-row > span:last-child {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-muted, #71717a);
				text-align: right;
			}

			.archetype {
				color: var(--roxy-accent-fg, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.lists {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}
			.lists h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.lists ul {
				margin: 0;
				padding-left: var(--roxy-space-md, 1rem);
			}
		`],p([y({attribute:!1})],H.prototype,"data",2),p([y({type:String,reflect:!0})],H.prototype,"mode",2),H=p([v("roxy-compatibility-card")],H);function it(i){let a=i.type.toLowerCase().replace(/_/g,"-"),e=typeof i.orb=="number"?` (orb ${w(i.orb,1)}\xB0)`:"",r=[i.planet1,a,i.planet2].filter(Boolean).join(" ");return i.description?`${r}${e} \xB7 ${i.description}`:`${r}${e}`}var G=class extends u{constructor(){super(...arguments);this.data=null;this.period="current"}render(){let e=this.data;if(!e)return t`<div class="roxy-empty" role="status">No dasha data</div>`;let r=this.collectPeriods(e),s=r.length?Math.max(...r.map(o=>o.durationYears)):0;return t`<div class="wrap" aria-label="Dasha timeline">
			<header class="head">
				<h2 class="title">
					${this.period==="major"?"Vimshottari Mahadasha":this.period==="sub"?"Antardasha":"Active dashas"}
				</h2>
				${"nakshatraName"in e&&e.nakshatraName?t`<div class="nakshatra">
						Moon nakshatra: ${e.nakshatraName}
						${"nakshatraLord"in e&&e.nakshatraLord?t`(lord ${e.nakshatraLord})`:n}
					</div>`:n}
			</header>

			${this.period==="current"?this.renderCurrent(e):n}
			${r.length>0?t`<div class="timeline" role="list">
						${r.map(o=>this.renderBar(o,s))}
					</div>`:n}
		</div>`}renderCurrent(e){return"mahadasha"in e?t`<div class="current">
			${"mahadasha"in e&&e.mahadasha?t`<div>
					<span>Mahadasha</span>
					<strong>${e.mahadasha.planet}</strong>
					${"remainingInMahadasha"in e&&e.remainingInMahadasha?t`<small>${w(e.remainingInMahadasha.years+e.remainingInMahadasha.months/12,1)} years left</small>`:n}
				</div>`:n}
			${"antardasha"in e&&e.antardasha?t`<div>
					<span>Antardasha</span>
					<strong>${e.antardasha.planet}</strong>
					${"remainingInAntardasha"in e&&e.remainingInAntardasha?t`<small>${w(e.remainingInAntardasha.years+e.remainingInAntardasha.months/12,1)} years left</small>`:n}
				</div>`:n}
			${"pratyantardasha"in e&&e.pratyantardasha?t`<div>
					<span>Pratyantardasha</span>
					<strong>${e.pratyantardasha.planet}</strong>
					${"remainingInPratyantardasha"in e&&e.remainingInPratyantardasha?t`<small>${w(e.remainingInPratyantardasha.years+e.remainingInPratyantardasha.months/12,1)} years left</small>`:n}
				</div>`:n}
		</div>`:n}collectPeriods(e){return"mahadashas"in e&&e.mahadashas?.length?e.mahadashas:"antardashas"in e&&e.antardashas?.length?e.antardashas:[]}renderBar(e,r){let s=e.durationYears,o=r>0?s/r*100:0;return t`<div class="bar" role="listitem">
			<span>${e.planet}</span>
			<span class="bar-track"><span style="width: ${o}%"></span></span>
			<span class="dates">
				${e.startDate?zr(e.startDate):""}
				${e.endDate?t`- ${zr(e.endDate)}`:""}
			</span>
		</div>`}};G.styles=[b,x`
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
		`],p([y({attribute:!1})],G.prototype,"data",2),p([y({type:String,reflect:!0})],G.prototype,"period",2),G=p([v("roxy-dasha-timeline")],G);function zr(i){let a=i.match(/^(\d{4})/);return a?a[1]:i}var nt=["title","name","label","heading","overview","summary"],lt=["imageUrl","image","icon","symbol"],dt=["imageUrl","image"],ct=6,j=class extends u{constructor(){super(...arguments);this.data=null;this.depth=0}render(){return this.data==null?t`<div class="roxy-empty" role="status">No data</div>`:this.depth>=ct?t`<div class="roxy-empty" role="status">…</div>`:t`<div
			class="roxy-card"
			aria-label="Generic data display"
		>
			${this.renderValue(this.data)}
		</div>`}renderValue(e){return e==null?n:typeof e=="string"?t`<p>${e}</p>`:typeof e=="number"||typeof e=="boolean"?t`<p>${String(e)}</p>`:Array.isArray(e)?this.renderArray(e):this.renderObject(e)}renderArray(e){return e.length===0?t`<div class="roxy-empty" role="status">Empty list</div>`:e.every(o=>o===null||["string","number","boolean"].includes(typeof o))?t`<ul class="roxy-chips">
				${e.map(o=>t`<li>${String(o)}</li>`)}
			</ul>`:e.every(o=>o!==null&&typeof o=="object"&&!Array.isArray(o))?this.renderTable(e):t`<ol>
			${e.map(o=>t`<li>${this.renderValue(o)}</li>`)}
		</ol>`}renderTable(e){let r=this.collectKeys(e);return t`<table class="roxy-table" role="table">
			<thead>
				<tr>
					${r.map(s=>t`<th>${ee(s)}</th>`)}
				</tr>
			</thead>
			<tbody>
				${e.map(s=>t`<tr>
						${r.map(o=>t`<td>${this.formatPrimitive(s[o])}</td>`)}
					</tr>`)}
			</tbody>
		</table>`}renderObject(e){let r=nt.find(d=>typeof e[d]=="string"),s=lt.find(d=>typeof e[d]=="string"&&e[d].startsWith("http")),o=r!=="summary"&&typeof e.summary=="string"?"summary":null,l=Object.entries(e).filter(([d,c])=>d!==r&&d!==o&&!dt.includes(d)&&c!==null&&c!==void 0);return t`
			${s?t`<img
						class="roxy-image"
						src=${String(e[s])}
						alt=${r?String(e[r]):"illustration"}
						loading="lazy"
					/>`:n}
			${r?t`<h3 class="roxy-title">${e[r]}</h3>`:n}
			${o?t`<p class="roxy-summary">${e[o]}</p>`:n}
			${l.length>0?t`<dl class="roxy-rows">
						${l.map(([d,c])=>t`
								<dt>${ee(d)}</dt>
								<dd>${this.renderField(c)}</dd>
							`)}
					</dl>`:n}
		`}renderField(e){return e==null?"":typeof e=="string"?e:typeof e=="number"||typeof e=="boolean"?String(e):Array.isArray(e)&&e.every(s=>["string","number","boolean"].includes(typeof s))?t`<ul class="roxy-chips">
					${e.map(s=>t`<li>${String(s)}</li>`)}
				</ul>`:t`<roxy-data .data=${e} .depth=${this.depth+1}></roxy-data>`}formatPrimitive(e){return e==null?"":typeof e=="string"?e:typeof e=="number"||typeof e=="boolean"?String(e):Array.isArray(e)?e.map(String).join(", "):JSON.stringify(e)}collectKeys(e){let r=new Set;for(let s of e)for(let o of Object.keys(s))r.add(o);return Array.from(r)}};j.styles=[b,x`
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
		`],p([y({attribute:!1})],j.prototype,"data",2),p([y({attribute:!1})],j.prototype,"depth",2),j=p([v("roxy-data")],j);var Me=Object.fromEntries(pe.map(i=>[i.toLowerCase(),i])),pt={1:{x:150,y:58},2:{x:205,y:52},3:{x:253,y:112},4:{x:243,y:150},5:{x:253,y:188},6:{x:205,y:248},7:{x:150,y:242},8:{x:95,y:248},9:{x:47,y:188},10:{x:57,y:150},11:{x:47,y:112},12:{x:95,y:52}},mt={1:{x:150,y:35},2:{x:222,y:40},3:{x:265,y:100},4:{x:265,y:150},5:{x:265,y:200},6:{x:222,y:260},7:{x:150,y:265},8:{x:78,y:260},9:{x:35,y:200},10:{x:35,y:150},11:{x:35,y:100},12:{x:78,y:40}},ht={1:{x:150,y:60},2:{x:225,y:100},3:{x:255,y:150},4:{x:225,y:200},5:{x:150,y:240},6:{x:75,y:200},7:{x:45,y:150},8:{x:75,y:100},9:{x:100,y:80},10:{x:150,y:108},11:{x:200,y:80},12:{x:200,y:220}};function De(i){let a=pt[i.number],e=mt[i.number];if(!a||!e)return n;let r=rr[i.sign]??"",s=i.planets;return S`
		<g>
			${i.isLagna?S`<rect
							class="lagna-bg"
							x=${a.x-30} y=${a.y-28}
							width="60" height="56" rx="6"
						/>`:n}
			${r?S`<text class="sign-text" x=${e.x} y=${e.y} text-anchor="middle" dominant-baseline="central">${r}</text>`:n}
			${i.isLagna?S`<text class="lagna-marker" x=${a.x} y=${a.y-18} text-anchor="middle" dominant-baseline="central">LAGNA</text>`:n}
			${s.map((o,l)=>{let d=er[C(o)]??o.slice(0,2),c=13,g=(i.isLagna?a.y+8:a.y)-(s.length-1)*c/2+l*c;return S`<text class="planet-text" x=${a.x} y=${g} text-anchor="middle" dominant-baseline="central">${d}</text>`})}
		</g>
	`}function Oe(){return S`
		<polygon class="line" points="150,10 290,150 150,290 10,150" stroke-width="1.5" />
		<line class="line" x1="150" y1="10" x2="150" y2="290" stroke-width="1" />
		<line class="line" x1="10" y1="150" x2="290" y2="150" stroke-width="1" />
		<line class="line" x1="150" y1="10" x2="10" y2="150" stroke-width="0.6" stroke-dasharray="3,3" />
		<line class="line" x1="150" y1="10" x2="290" y2="150" stroke-width="0.6" stroke-dasharray="3,3" />
		<line class="line" x1="150" y1="290" x2="10" y2="150" stroke-width="0.6" stroke-dasharray="3,3" />
		<line class="line" x1="150" y1="290" x2="290" y2="150" stroke-width="0.6" stroke-dasharray="3,3" />
	`}function He(i){let a=ht[i.number];if(!a)return n;let e=rr[i.sign]??"",r=i.planets;return S`
		<g>
			${i.isLagna?S`<circle class="lagna-bg" cx=${a.x} cy=${a.y} r="22" />`:n}
			${e?S`<text class="sign-text" x=${a.x} y=${a.y-10} text-anchor="middle" dominant-baseline="central">${e}</text>`:n}
			<text class="house-num" x=${a.x} y=${a.y+2} text-anchor="middle" dominant-baseline="central">${i.number}</text>
			${r.map((s,o)=>{let l=er[C(s)]??s.slice(0,2),d=11,m=a.y+14-(r.length-1)*d/2+o*d;return S`<text class="planet-text" x=${a.x} y=${m} text-anchor="middle" dominant-baseline="central">${l}</text>`})}
		</g>
	`}function Ge(){return S`
		<polygon class="line" points="150,10 290,150 150,290 10,150" stroke-width="1.5" />
		<polygon class="line" points="220,80 220,220 80,220 80,80" stroke-width="1" fill="none" />
		<line class="line" x1="150" y1="10" x2="80" y2="80" stroke-width="1" />
		<line class="line" x1="150" y1="10" x2="220" y2="80" stroke-width="1" />
		<line class="line" x1="290" y1="150" x2="220" y2="80" stroke-width="1" />
		<line class="line" x1="290" y1="150" x2="220" y2="220" stroke-width="1" />
		<line class="line" x1="150" y1="290" x2="220" y2="220" stroke-width="1" />
		<line class="line" x1="150" y1="290" x2="80" y2="220" stroke-width="1" />
		<line class="line" x1="10" y1="150" x2="80" y2="220" stroke-width="1" />
		<line class="line" x1="10" y1="150" x2="80" y2="80" stroke-width="1" />
	`}var I=class extends u{constructor(){super(...arguments);this.data=null;this.chartStyle="south"}buildHouses(){if(!this.data)return[];let e=this.data.chart,s=(this.data.chart.meta??{}).Lagna?.rashi??"",o=[];for(let l=0;l<12;l++){let d=_e[l],m=(e[d]?.signs??[]).map(g=>g.graha).filter(Boolean),h=Me[d]??"";o.push({number:l+1,sign:h,planets:m,isLagna:s?s.toLowerCase()===h.toLowerCase():!1})}return o}render(){if(!this.data)return t`<div class="roxy-empty" role="status">No divisional chart data</div>`;let{division:e,vargottama:r}=this.data,s=this.buildHouses(),o=this.chartStyle==="north";return t`<div class="wrap">
			<div class="header">
				<h2 class="title">
					D${e.number} ${e.name}
					${e.sanskritName&&e.sanskritName!==e.name?t`<span class="division-meta"> · ${e.sanskritName}</span>`:n}
				</h2>
				${e.significance?t`<p class="significance">${e.significance}</p>`:n}
			</div>

			<svg
				viewBox="0 0 300 300"
				role="img"
				aria-label="D${e.number} ${e.name} divisional chart with twelve sign houses"
			>
				<title>D${e.number} ${e.name}</title>
				${o?Oe():Ge()}
				${o?s.map(l=>He(l)):s.map(l=>De(l))}
			</svg>

			${r&&r.length>0?t`<div class="vargottama-row" role="list" aria-label="Vargottama planets">
						<span class="vargottama-label">Vargottama:</span>
						${r.map(l=>t`<span class="vargottama-pill" role="listitem">
									${L[l]??""} ${l}
								</span>`)}
					</div>`:n}
		</div>`}};I.styles=[b,x`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.header {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}
			.division-meta {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				margin: 0;
			}
			.significance {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				border-left: 2px solid var(--roxy-border, #e4e4e7);
				padding-left: var(--roxy-space-sm, 0.5rem);
				margin: 0;
			}
			svg {
				display: block;
				width: 100%;
				max-width: 360px;
				margin: 0 auto;
			}
			.line {
				fill: transparent;
				stroke: var(--roxy-border, #e4e4e7);
			}
			.sign-text {
				fill: var(--roxy-muted, #71717a);
				font-size: 9px;
				font-weight: 500;
				font-family: var(--roxy-font-sans);
			}
			.planet-text {
				fill: var(--roxy-fg, #0a0a0a);
				font-size: 11px;
				font-weight: 600;
				font-family: var(--roxy-font-sans);
			}
			.house-num {
				fill: var(--roxy-muted, #71717a);
				font-size: 9px;
				font-weight: 400;
				font-family: var(--roxy-font-sans);
			}
			.lagna-marker {
				fill: var(--roxy-accent-fg, #b45309);
				font-size: 8px;
				font-weight: 700;
				font-family: var(--roxy-font-sans);
				letter-spacing: 0.05em;
			}
			.lagna-bg {
				fill: color-mix(in srgb, var(--roxy-accent, #f59e0b) 12%, transparent);
				stroke: color-mix(in srgb, var(--roxy-accent, #f59e0b) 45%, transparent);
				stroke-width: 0.8;
			}
			.vargottama-row {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				align-items: center;
			}
			.vargottama-label {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				font-weight: 500;
				margin-right: var(--roxy-space-xs, 0.25rem);
			}
			.vargottama-pill {
				display: inline-flex;
				align-items: center;
				gap: 0.2em;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: 600;
				padding: 0.15em 0.6em;
				border-radius: 999px;
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 22%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid color-mix(in srgb, var(--roxy-accent, #f59e0b) 45%, transparent);
			}
		`],p([y({attribute:!1})],I.prototype,"data",2),p([y({type:String,reflect:!0,attribute:"chart-style"})],I.prototype,"chartStyle",2),I=p([v("roxy-divisional-chart")],I);var gt={manglik:"Mangal Dosha",kalsarpa:"Kaal Sarp Dosha",sadhesati:"Sade Sati"},B=class extends u{constructor(){super(...arguments);this.data=null;this.type="manglik"}render(){let e=this.data;if(!e)return t`<div class="roxy-empty" role="status">No dosha data</div>`;let r=!!e.present,s=gt[this.type]??this.type,o=(e.severity??"").toLowerCase(),l=o==="severe"?3:o==="moderate"?2:o==="mild"?1:0,d=l*33,c=l===3?"var(--roxy-danger)":l===2?"var(--roxy-warning)":l===1?"var(--roxy-success)":"transparent";return t`<article
			class="card"
			aria-label=${s}
		>
			<header class="head">
				<h2 class="title">${s}</h2>
				<span class=${`badge ${r?"present":"absent"}`}>
					${r?"Present":"Absent"}
				</span>
			</header>
			${e.severity?t`<div
						class="severity-bar"
						role="meter"
						aria-valuemin="0"
						aria-valuemax="3"
						aria-valuenow="${l}"
						aria-label="Severity ${e.severity}"
					>
						<span class="severity-fill" style="width: ${d}%; background: ${c};"></span>
					</div>`:n}
			${e.description?t`<p class="description">${e.description}</p>`:n}
			${this.renderEffects(e)}
			${e.remedies&&e.remedies.length>0?t`<div>
						<h3>Remedies</h3>
						<ul>
							${e.remedies.map(m=>t`<li>${m}</li>`)}
						</ul>
					</div>`:n}
			${"exceptions"in e&&e.exceptions&&e.exceptions.length>0?t`<div>
					<h3>Exceptions</h3>
					<ul>
						${e.exceptions.map(m=>t`<li>${m}</li>`)}
					</ul>
				</div>`:n}
		</article>`}renderEffects(e){if(!e.effects)return n;let r=Object.entries(e.effects).filter(([,s])=>typeof s=="string"&&s.length>0);return r.length===0?n:t`<div class="effects">
			${r.map(([s,o])=>t`<div>
					<h3>${s}</h3>
					<p>${o}</p>
				</div>`)}
		</div>`}};B.styles=[b,x`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.head {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: capitalize;
			}
			.badge {
				display: inline-flex;
				align-items: center;
				gap: var(--roxy-space-xs, 0.25rem);
				padding: 4px 10px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.badge.absent {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.badge.present {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.severity-bar {
				position: relative;
				width: 100%;
				height: 8px;
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 30%, transparent);
				border-radius: 4px;
				overflow: hidden;
			}
			.severity-fill {
				display: block;
				height: 100%;
				transition: width var(--roxy-motion-duration, 200ms) ease-out;
				border-radius: 4px;
			}
			@media (prefers-reduced-motion: reduce) {
				.severity-fill {
					transition: none;
				}
			}

			.description {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
			}

			h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			ul {
				margin: 0;
				padding-left: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.effects {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}
			.effects p {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
		`],p([y({attribute:!1})],B.prototype,"data",2),p([y({type:String,reflect:!0})],B.prototype,"type",2),B=p([v("roxy-dosha-card")],B);var sr=new Map;async function yt(i){let a=sr.get(i);return a||(a=fetch(i).then(async e=>{if(!e.ok)throw new Error(`HTTP ${e.status}`);return await e.json()}).catch(e=>{throw sr.delete(i),e}),sr.set(i,a)),a}var _=class extends u{constructor(){super(...arguments);this.endpoint="vedic-astrology/birth-chart";this.method="POST";this.specUrl="https://roxyapi.com/api/v2/openapi.json";this.submitLabel="Submit";this.fields=[];this.values={};this.hasLocation=!1;this.loaded=!1;this.specError=null;this.retryLoadSchema=()=>{this.loaded=!1,this.specError=null,this.loadSchema()};this.onLocation=e=>{let r=e.detail;r&&(this.values={...this.values,latitude:r.latitude,longitude:r.longitude,timezone:r.timezone??r.utcOffset})};this.onSubmit=e=>{e.preventDefault();let r=this.fields.filter(s=>s.required).filter(s=>this.values[s.name]===void 0||this.values[s.name]==="");if(r.length>0){this.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{missing:r.map(s=>s.name)},bubbles:!0,composed:!0}));return}this.dispatchEvent(new CustomEvent("roxy-submit",{detail:{endpoint:this.endpoint,values:this.values},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.loadSchema()}async loadSchema(){this.specError=null;try{let e=await yt(this.specUrl),r=`/${this.endpoint.replace(/^\//,"")}`,s=e.paths?.[r]?.[this.method.toLowerCase()];if(!s)throw new Error(`Endpoint ${this.method} ${r} not found in OpenAPI spec`);let o=e.components?.schemas??{},l=[],d;if(s.requestBody){let m=s.requestBody.content?.["application/json"]?.schema;d=this.resolve(m,o)}if(d?.properties){let m=new Set(d.required??[]);for(let[h,g]of Object.entries(d.properties)){let f=this.resolve(g,o)??{};l.push({name:h,type:this.fieldType(f),required:m.has(h),description:f.description,enum:f.enum,min:f.minimum,max:f.maximum,default:f.default})}}for(let m of s.parameters??[])if(m.in==="path"||m.in==="query"){let h=this.resolve(m.schema,o)??{};l.push({name:m.name,type:this.fieldType(h),required:!!m.required,description:h.description,enum:h.enum,default:h.default})}this.fields=l,this.hasLocation=l.some(m=>m.name==="latitude")&&l.some(m=>m.name==="longitude")&&l.some(m=>m.name==="timezone");let c={};for(let m of l)m.default!==void 0&&(c[m.name]=m.default);this.values=c,this.loaded=!0}catch(e){let r=e instanceof Error?e.message:String(e);this.specError=r,this.loaded=!0,this.dispatchEvent(new CustomEvent("roxy-spec-error",{detail:{url:this.specUrl,message:r},bubbles:!0,composed:!0}))}}resolve(e,r){if(e){if("$ref"in e&&e.$ref){let s=e.$ref.split("/").pop();return s?r[s]:void 0}return e}}fieldType(e){return e.enum?"enum":e.format==="date"?"date":e.format==="time"?"time":e.format==="date-time"?"datetime":e.type==="integer"||e.type==="number"?"number":"text"}setValue(e,r){this.values={...this.values,[e]:r}}render(){if(!this.loaded)return t`<form><div class="roxy-skeleton" style="height: 8rem"></div></form>`;if(this.specError)return t`<div class="spec-error" role="alert">
				Schema load failed: ${this.specError}
				<button type="button" class="submit" @click=${this.retryLoadSchema}>Retry</button>
			</div>`;let e=r=>{if(this.hasLocation&&(r.name==="latitude"||r.name==="longitude"||r.name==="timezone"))return n;let s=`roxy-form-${r.name}`;return t`<div class="field">
				<label for=${s}>
					${ee(r.name)}${r.required?t`<span class="req" aria-hidden="true">*</span>`:n}
				</label>
				${r.enum?t`<select
							id=${s}
							?required=${r.required}
							@change=${o=>this.setValue(r.name,o.target.value)}
						>
							<option value="">Choose</option>
							${r.enum.map(o=>t`<option value=${o} ?selected=${this.values[r.name]===o}>
									${o}
								</option>`)}
						</select>`:t`<input
							id=${s}
							type=${this.htmlType(r.type)}
							?required=${r.required}
							min=${r.min??""}
							max=${r.max??""}
							step=${r.type==="number"?"any":""}
							.value=${this.values[r.name]??""}
							@input=${o=>this.setValue(r.name,this.coerce(r.type,o.target.value))}
						/>`}
				${r.description?t`<small class="help">${r.description}</small>`:n}
			</div>`};return t`<form @submit=${this.onSubmit}>
			<h2 class="title">${ee(this.endpoint.split("/").pop()??"")}</h2>
			${this.hasLocation?t`<div class="location-block">
						<label>Birth location</label>
						<roxy-location-search
							@roxy-location-select=${this.onLocation}
							placeholder="City of birth"
						></roxy-location-search>
						<small class="help">
							Required: latitude, longitude, timezone. Pick a city to autofill.
						</small>
					</div>`:n}
			<div class="fields">
				${this.fields.map(r=>e(r))}
			</div>
			<button class="submit" type="submit">${this.submitLabel}</button>
		</form>`}htmlType(e){switch(e){case"date":return"date";case"time":return"time";case"datetime":return"datetime-local";case"number":return"number";default:return"text"}}coerce(e,r){if(r!==""){if(e==="number"){let s=Number(r);return Number.isFinite(s)?s:void 0}return r}}};_.styles=[b,x`
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
		`],p([y({type:String,attribute:"data-endpoint"})],_.prototype,"endpoint",2),p([y({type:String})],_.prototype,"method",2),p([y({type:String,attribute:"spec-url"})],_.prototype,"specUrl",2),p([y({type:String,attribute:"submit-label"})],_.prototype,"submitLabel",2),p([E()],_.prototype,"fields",2),p([E()],_.prototype,"values",2),p([E()],_.prototype,"hasLocation",2),p([E()],_.prototype,"loaded",2),p([E()],_.prototype,"specError",2),_=p([v("roxy-endpoint-form")],_);var te=class extends u{constructor(){super(...arguments);this.data=null}render(){let e=this.data;if(!e)return t`<div class="roxy-empty" role="status">No Guna Milan data</div>`;let r=(e.breakdown??[]).filter(g=>g?.category!==void 0),s=e.total??0,o=e.maxScore??36,l=s/o*100,d="color-mix(in srgb, var(--roxy-border) 50%, transparent)",c=l>=70?"var(--roxy-success)":l>=50?"var(--roxy-warning)":"var(--roxy-danger)",m=l*2.827,h=(100-l)*2.827;return t`<article class="card" aria-label="Guna Milan score">
			<div class="score-header">
				<div class="score-info">
					<div class="score-bar">
						<div>
							<span class="total">${w(e.total,1)}</span>
							<span class="over"> / ${e.maxScore}</span>
							${typeof e.percentage=="number"?t`<small style="margin-left: 0.5rem; color: var(--roxy-muted)">
										${_r(e.percentage,1)}
									</small>`:n}
						</div>
						${e.recommendation?t`<span class="recommendation">${e.recommendation}</span>`:n}
					</div>
				</div>
				<div class="score-ring" role="meter" aria-label="Guna milan score" aria-valuemin="0" aria-valuemax="36" aria-valuenow="${s}">
					<svg viewBox="0 0 100 100" aria-hidden="true">
						<circle class="ring-track" cx="50" cy="50" r="45" fill="none" stroke="${d}" stroke-width="8"/>
						<circle class="ring-fill" cx="50" cy="50" r="45" fill="none" stroke="${c}" stroke-width="8"
								stroke-dasharray="${m},${h}" stroke-linecap="round"
								transform="rotate(-90 50 50)"/>
						<text x="50" y="50" text-anchor="middle" dominant-baseline="central" class="ring-text">${s}</text>
						<text x="50" y="64" text-anchor="middle" dominant-baseline="central" class="ring-max">/${o}</text>
					</svg>
				</div>
			</div>

			${r.length>0?t`<table>
						<thead>
							<tr>
								<th>Category</th>
								<th>Progress</th>
								<th class="score">Score</th>
							</tr>
						</thead>
						<tbody>
							${r.map(g=>{let f=g.score??0,k=g.maxScore??ut(g.category),$=k?f/k*100:0;return t`<tr>
									<td>${g.category}</td>
									<td class="bar-cell">
										<div class="mini-bar">
											<span style="width: ${$}%"></span>
										</div>
									</td>
									<td class="score">${w(f,1)} / ${k}</td>
								</tr>`})}
						</tbody>
					</table>`:n}
			${(e.doshas?.length??0)>0||(e.doshaCancellations?.length??0)>0?t`<div class="tags">
						${e.doshas?.map(g=>t`<span class="dosha">${g}</span>`)}
						${e.doshaCancellations?.map(g=>t`<span class="cancel" title=${g.reason}>${g.dosha} cancelled</span>`)}
					</div>`:n}
		</article>`}};te.styles=[b,x`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.score-header {
				display: flex;
				align-items: center;
				gap: 1rem;
			}
			.score-info {
				flex: 1;
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
			.score-ring {
				width: 120px;
				height: 120px;
				flex-shrink: 0;
			}
			.score-ring svg {
				width: 100%;
				height: 100%;
			}
			.score-ring .ring-text {
				font-size: 22px;
				font-weight: 700;
				fill: var(--roxy-fg, #0a0a0a);
				font-family: var(--roxy-font-sans);
			}
			.score-ring .ring-max {
				font-size: 10px;
				fill: var(--roxy-muted, #71717a);
				font-family: var(--roxy-font-sans);
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
		`],p([y({attribute:!1})],te.prototype,"data",2),te=p([v("roxy-guna-milan")],te);function ut(i){if(!i)return 1;switch(i.toLowerCase()){case"varna":return 1;case"vasya":return 2;case"tara":return 3;case"yoni":return 4;case"maitri":return 5;case"gana":return 6;case"bhakoot":return 7;case"nadi":return 8;default:return 1}}var q=class extends u{constructor(){super(...arguments);this.data=null;this.mode="lookup"}resolveHexagram(){let e=this.data;if(!e)return null;if("hexagram"in e&&e.hexagram){if("lines"in e){let s=e;return{hex:s.hexagram,lines:s.lines,changingLinePositions:s.changingLinePositions,resultingHexagram:s.resultingHexagram}}let r=e;return{hex:r.hexagram,dailyMessage:r.dailyMessage}}return{hex:e}}render(){let e=this.resolveHexagram();if(!e)return t`<div class="roxy-empty" role="status">No hexagram data</div>`;let{hex:r,lines:s,changingLinePositions:o,dailyMessage:l,resultingHexagram:d}=e,c=s??this.derivedLines(r),m=new Set(o??[]);return t`<article class="card" aria-label="I Ching hexagram">
			<div class="glyphs">
				${r.symbol?t`<div class="symbol">${r.symbol}</div>`:n}
				<div class="lines" aria-hidden="true">
					${c.slice().reverse().map((h,g)=>{let f=c.length-1-g+1,k=m.has(f),$=h===6||h===8;return t`<div class="line ${`${$?"broken":"solid"}${k?" changing":""}`}">
								${$?S`<span class="seg"></span><span class="seg"></span>`:S`<span class="seg"></span>`}
							</div>`})}
				</div>
			</div>
			<div>
				<h2 class="title">
					${r.number?t`${r.number}. `:n}${r.english??r.chinese??"Hexagram"}
				</h2>
				<p class="subtitle">
					${r.chinese?t`${r.chinese}`:n}
					${r.pinyin?t` · ${r.pinyin}`:n}
				</p>
				<div class="trigrams">
					${r.upperTrigram?t`<div>
								Upper
								<span class="tri-glyph"
									>${tr[r.upperTrigram]??""}</span
								>${r.upperTrigram}
							</div>`:n}
					${r.lowerTrigram?t`<div>
								Lower
								<span class="tri-glyph"
									>${tr[r.lowerTrigram]??""}</span
								>${r.lowerTrigram}
							</div>`:n}
				</div>
				${r.judgment?t`<p class="judgment">${r.judgment}</p>`:n}
				${r.image?t`<p class="image">${r.image}</p>`:n}
				${l?t`<p class="message">${l}</p>`:n}
				${r.interpretation?.general?t`<p>${r.interpretation.general}</p>`:n}
				${m.size>0?t`<div class="changing">
							Changing lines: ${Array.from(m).sort((h,g)=>h-g).join(", ")}.
							${d?.english?t` Becomes hexagram ${d.number}
										${d.english}.`:n}
						</div>`:n}
			</div>
		</article>`}derivedLines(e){let r=e.symbol.codePointAt(0)??0;if(r>=19904&&r<=19967){let s=r-19904,o=[];for(let l=0;l<6;l++){let d=s>>l&1;o.push(d?8:7)}return o}return Array.from({length:6},()=>7)}};q.styles=[b,x`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				grid-template-columns: 6rem 1fr;
				gap: var(--roxy-space-lg, 1.5rem);
			}

			@container (max-width: 480px) {
				.card {
					grid-template-columns: 1fr;
				}
			}

			.glyphs {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
				justify-items: center;
			}
			.symbol {
				font-size: 3rem;
				line-height: 1;
				color: var(--roxy-accent-fg, #b45309);
			}
			.lines {
				display: grid;
				gap: 4px;
				width: 4rem;
			}
			.line {
				display: flex;
				gap: 4px;
				justify-content: center;
				align-items: center;
				height: 8px;
			}
			.seg {
				display: block;
				height: 6px;
				background: var(--roxy-fg, #0a0a0a);
				border-radius: 1px;
			}
			.line.broken .seg {
				width: 1.4rem;
			}
			.line.solid .seg {
				width: 3rem;
			}
			.line.changing .seg {
				background: var(--roxy-accent, #f59e0b);
			}

			.title {
				margin: 0;
				font-size: var(--roxy-text-xl, 1.5rem);
				font-weight: var(--roxy-weight-bold, 600);
				letter-spacing: var(--roxy-tracking-tight);
			}
			.subtitle {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
			}
			.trigrams {
				display: flex;
				gap: var(--roxy-space-md, 1rem);
				margin-bottom: var(--roxy-space-sm, 0.5rem);
				color: var(--roxy-secondary, #475569);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.tri-glyph {
				font-size: var(--roxy-text-xl, 1.5rem);
				color: var(--roxy-accent-fg, #b45309);
				margin-right: 4px;
				vertical-align: middle;
			}
			.judgment,
			.image,
			.message {
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.judgment::before {
				content: 'Judgment. ';
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-secondary, #475569);
			}
			.image::before {
				content: 'Image. ';
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-secondary, #475569);
			}

			.changing {
				margin-top: var(--roxy-space-md, 1rem);
				padding-top: var(--roxy-space-md, 1rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				color: var(--roxy-accent-fg, #b45309);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
		`],p([y({attribute:!1})],q.prototype,"data",2),p([y({type:String,reflect:!0})],q.prototype,"mode",2),q=p([v("roxy-hexagram")],q);var U=class extends u{constructor(){super(...arguments);this.data=null;this.period="daily"}render(){let e=this.data;if(!e)return t`<div class="roxy-empty" role="status">No horoscope data</div>`;let r=e.sign??"",s=r?z[C(r)]??"":"",o="energyRating"in e&&typeof e.energyRating=="number"?e.energyRating:null,l="date"in e&&e.date||"week"in e&&e.week||"month"in e&&e.month||"";return t`<article
			class="card"
			aria-label=${`${this.period} horoscope for ${r}`}
		>
			<header class="head">
				<span class="glyph" aria-hidden="true">${s}</span>
				<div>
					<h2 class="title">${r} ${this.period}</h2>
					${l?t`<div class="date">${l}</div>`:n}
				</div>
				${o!==null?t`<span class="energy" aria-label=${`Energy ${o} of 10`}>
							Energy ${o}/10
							<span class="energy-bar"
								><span style="width: ${o/10*100}%"></span
							></span>
						</span>`:n}
			</header>

			${e.overview?t`<p class="overview">${e.overview}</p>`:n}

			<div class="sections">
				${e.love?t`<div class="section">
							<h3>Love</h3>
							<p>${e.love}</p>
						</div>`:n}
				${e.career?t`<div class="section">
							<h3>Career</h3>
							<p>${e.career}</p>
						</div>`:n}
				${e.health?t`<div class="section">
							<h3>Health</h3>
							<p>${e.health}</p>
						</div>`:n}
				${e.finance?t`<div class="section">
							<h3>Finance</h3>
							<p>${e.finance}</p>
						</div>`:n}
				${"advice"in e&&e.advice?t`<div class="section">
							<h3>Advice</h3>
							<p>${e.advice}</p>
						</div>`:n}
			</div>

			${(()=>{let d="luckyNumber"in e&&e.luckyNumber!==void 0?e.luckyNumber:void 0,c="luckyColor"in e&&e.luckyColor?e.luckyColor:"",m="luckyNumbers"in e&&e.luckyNumbers?e.luckyNumbers:[],h="luckyDays"in e&&e.luckyDays?e.luckyDays:[],g=e.compatibleSigns??[];return d===void 0&&!c&&m.length===0&&h.length===0&&g.length===0?n:t`<div class="lucky">
						${d!==void 0?t`<span>Lucky number <strong>${d}</strong></span>`:n}
						${c?t`<span>Lucky color <strong>${c}</strong></span>`:n}
						${m.length?t`<span
									>Lucky numbers
									<strong>${m.join(", ")}</strong></span
								>`:n}
						${h.length?t`<span
									>Lucky days <strong>${h.join(", ")}</strong></span
								>`:n}
						${g.length?t`<span class="compat-wrap">
									Best with
									<span class="compat"
										>${g.map(f=>t`<span>${f}</span>`)}</span
									>
								</span>`:n}
					</div>`})()}
		</article>`}};U.styles=[b,x`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.head {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}

			.glyph {
				font-size: 2.25rem;
				color: var(--roxy-accent-fg, #b45309);
				line-height: 1;
			}

			.title {
				font-size: var(--roxy-text-xl, 1.5rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
				letter-spacing: var(--roxy-tracking-tight);
				text-transform: capitalize;
			}

			.date {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
			}

			.energy {
				margin-left: auto;
				font-variant-numeric: tabular-nums;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.energy-bar {
				display: inline-block;
				width: 6rem;
				height: 6px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
				margin-left: 6px;
				vertical-align: middle;
			}
			.energy-bar > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}

			.overview {
				font-size: var(--roxy-text-base, 1rem);
				color: var(--roxy-fg, #0a0a0a);
				margin: 0;
			}

			.sections {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}

			.section h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.section p {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}

			.lucky {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}

			.lucky strong {
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.compat-wrap {
				width: 100%;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.compat {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.compat span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 16%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: capitalize;
			}
		`],p([y({attribute:!1})],U.prototype,"data",2),p([y({type:String,reflect:!0})],U.prototype,"period",2),U=p([v("roxy-horoscope-card")],U);var ae=class extends u{constructor(){super(...arguments);this.data=null}render(){if(!this.data)return t`<div class="roxy-empty" role="status">No KP data</div>`;let e=this.data.planets??[];return t`<div
			class="wrap"
			aria-label="KP planets table"
			tabindex="0"
		>
			<header class="head">
				<h2 class="title">KP planets</h2>
				${typeof this.data.ayanamsa=="number"?t`<span class="ayanamsa">Ayanamsa: ${w(this.data.ayanamsa,2)}°</span>`:n}
			</header>
			<table role="table">
				<thead>
					<tr>
						<th scope="col">Planet</th>
						<th scope="col">Sign</th>
						<th scope="col">Sign lord</th>
						<th scope="col">Nakshatra</th>
						<th scope="col">Star lord</th>
						<th scope="col">Sub lord</th>
						<th scope="col">Sub sub lord</th>
						<th scope="col">KP no.</th>
					</tr>
				</thead>
				<tbody>
					${e.map(r=>t`<tr>
							<td class="planet">
								${r.planet}
								${r.retrograde?t`<span class="retro">R</span>`:n}
							</td>
							<td>${r.sign??""}</td>
							<td>${r.signLord??""}</td>
							<td>${r.nakshatra??""}</td>
							<td>${r.nakshatraLord??""}</td>
							<td>${r.subLord??""}</td>
							<td>${r.subSubLord??""}</td>
							<td>${r.kpNumber??""}</td>
						</tr>`)}
				</tbody>
			</table>
		</div>`}};ae.styles=[b,x`
			.wrap {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-bg, #fff);
				overflow: auto;
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
			.ayanamsa {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
				min-width: 560px;
			}
			thead {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 20%, transparent);
			}
			th,
			td {
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				text-align: left;
				white-space: nowrap;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.04em;
			}
			tbody tr {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
			}
			td.planet {
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.retro {
				color: var(--roxy-warning-fg, #9a3412);
				font-size: var(--roxy-text-xs, 0.75rem);
				margin-left: 4px;
			}
		`],p([y({attribute:!1})],ae.prototype,"data",2),ae=p([v("roxy-kp-planets-table")],ae);function Nr(i,a){let e,r=((...s)=>{e&&clearTimeout(e),e=setTimeout(()=>{e=void 0,i(...s)},a)});return r.cancel=()=>{e&&(clearTimeout(e),e=void 0)},r}var T=class extends u{constructor(){super(...arguments);this.endpoint="https://roxyapi.com/api/v2/location/search";this.placeholder="Search city";this.defaultValue="";this.query="";this.results=[];this.isOpen=!1;this.isLoading=!1;this.highlight=-1;this.secretKeyWarned=!1;this.debouncedFetch=Nr(e=>{this.fetchResults(e)},300);this.onInput=e=>{let r=e.target.value;if(this.query=r,r.length<2){this.results=[],this.isOpen=!1,this.highlight=-1;return}this.debouncedFetch(r)};this.onKeyDown=e=>{if(!this.isOpen||this.results.length===0){e.key==="ArrowDown"&&this.query.length>=2&&(this.fetchResults(this.query),e.preventDefault());return}if(e.key==="ArrowDown")e.preventDefault(),this.highlight=(this.highlight+1)%this.results.length;else if(e.key==="ArrowUp")e.preventDefault(),this.highlight=(this.highlight-1+this.results.length)%this.results.length;else if(e.key==="Enter"){e.preventDefault();let r=this.results[this.highlight]??this.results[0];r&&this.select(r)}else e.key==="Escape"&&(this.isOpen=!1)}}connectedCallback(){super.connectedCallback(),this.query=this.defaultValue,this.clickOutsideHandler=e=>{e.composedPath().includes(this)||(this.isOpen=!1)},document.addEventListener("mousedown",this.clickOutsideHandler)}disconnectedCallback(){super.disconnectedCallback(),this.clickOutsideHandler&&document.removeEventListener("mousedown",this.clickOutsideHandler),this.debouncedFetch.cancel(),this.abortController&&(this.abortController.abort(),this.abortController=void 0)}warnIfSecretKey(){if(this.secretKeyWarned||!this.apiKey||this.apiKey.startsWith("pk_"))return;this.secretKeyWarned=!0;let e="Possible secret key in client-side <roxy-location-search>; use a `pk_` publishable key with origin allowlist instead.";console.warn(e),this.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:"possible-secret-key",message:e},bubbles:!0,composed:!0}))}async fetchResults(e){this.warnIfSecretKey(),this.abortController&&this.abortController.abort();let r=new AbortController;this.abortController=r,this.isLoading=!0;try{let s=new URL(this.endpoint);s.searchParams.set("q",e),s.searchParams.set("limit","8");let o={Accept:"application/json"};this.apiKey&&(o["X-API-Key"]=this.apiKey),this.publishableKey&&(o["X-API-Key"]=this.publishableKey);let l=await fetch(s,{headers:o,signal:r.signal});if(!l.ok)throw new Error(`HTTP ${l.status}`);let d=await l.json();if(r.signal.aborted)return;this.results=d.cities??[],this.isOpen=this.results.length>0,this.highlight=this.results.length>0?0:-1}catch(s){if(s?.name==="AbortError")return;this.results=[],this.isOpen=!1}finally{this.abortController===r&&(this.abortController=void 0),r.signal.aborted||(this.isLoading=!1)}}select(e){this.query=`${e.city}${e.province?`, ${e.province}`:""}, ${e.country}`,this.isOpen=!1,this.results=[],this.dispatchEvent(new CustomEvent("roxy-location-select",{detail:e,bubbles:!0,composed:!0}))}render(){return t`<div class="field">
			<input
				type="text"
				role="combobox"
				aria-expanded=${this.isOpen?"true":"false"}
				aria-controls="roxy-location-listbox"
				aria-autocomplete="list"
				autocomplete="off"
				placeholder=${this.placeholder}
				.value=${this.query}
				@input=${this.onInput}
				@keydown=${this.onKeyDown}
				@focus=${()=>{this.results.length>0&&(this.isOpen=!0)}}
			/>
			${this.isLoading?t`<span class="spinner" role="status" aria-label="Loading"></span>`:n}
			${this.isOpen?t`<ul
						id="roxy-location-listbox"
						class="results"
						role="listbox"
					>
						${this.results.length===0?t`<li class="empty" role="status">No cities found</li>`:this.results.map((e,r)=>t`<li role="presentation">
										<button
											type="button"
											class="option"
											role="option"
											aria-selected=${this.highlight===r?"true":"false"}
											@click=${()=>this.select(e)}
											@mouseenter=${()=>{this.highlight=r}}
										>
											<span class="city">${e.city}</span>
											<span class="where"
												>${e.province?t`${e.province}, `:""}${e.country}</span
											>
											<span class="tz"
												>UTC${e.utcOffset>=0?"+":""}${e.utcOffset}</span
											>
										</button>
									</li>`)}
					</ul>`:n}
		</div>`}};T.styles=[b,x`
			:host {
				display: block;
				position: relative;
			}
			.field {
				position: relative;
			}
			input {
				width: 100%;
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-base, 1rem);
				font-family: inherit;
				color: var(--roxy-fg, #0a0a0a);
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				transition:
					border-color var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
				box-sizing: border-box;
			}
			input:focus {
				outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
				outline-offset: 2px;
				border-color: var(--roxy-accent-fg, #b45309);
			}
			.spinner {
				position: absolute;
				right: 12px;
				top: 50%;
				transform: translateY(-50%);
				width: 14px;
				height: 14px;
				border: 2px solid var(--roxy-muted, #71717a);
				border-top-color: transparent;
				border-radius: 50%;
				animation: roxy-spin 700ms linear infinite;
			}
			@keyframes roxy-spin {
				to {
					transform: translateY(-50%) rotate(360deg);
				}
			}
			@media (prefers-reduced-motion: reduce) {
				.spinner {
					animation: none;
				}
			}

			.results {
				position: absolute;
				z-index: 50;
				top: calc(100% + 4px);
				left: 0;
				right: 0;
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				box-shadow: var(--roxy-shadow-md);
				max-height: 22rem;
				overflow-y: auto;
				animation: roxy-fade-in var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.option {
				display: flex;
				align-items: baseline;
				gap: var(--roxy-space-sm, 0.5rem);
				width: 100%;
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				background: transparent;
				border: 0;
				text-align: left;
				font-family: inherit;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
				cursor: pointer;
				transition: background-color var(--roxy-motion-duration, 200ms);
			}
			.option:hover,
			.option[aria-selected='true'] {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 10%, transparent);
			}
			.option .city {
				font-weight: var(--roxy-weight-bold, 600);
			}
			.option .where {
				color: var(--roxy-muted, #71717a);
				flex-grow: 1;
			}
			.option .tz {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
			}
			.empty {
				padding: var(--roxy-space-md, 1rem);
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
		`],p([y({type:String,attribute:"api-key"})],T.prototype,"apiKey",2),p([y({type:String,attribute:"publishable-key"})],T.prototype,"publishableKey",2),p([y({type:String})],T.prototype,"endpoint",2),p([y({type:String})],T.prototype,"placeholder",2),p([y({type:String,attribute:"default-value"})],T.prototype,"defaultValue",2),p([E()],T.prototype,"query",2),p([E()],T.prototype,"results",2),p([E()],T.prototype,"isOpen",2),p([E()],T.prototype,"isLoading",2),p([E()],T.prototype,"highlight",2),T=p([v("roxy-location-search")],T);var Y=class extends u{constructor(){super(...arguments);this.data=null;this.mode="current"}render(){let e=this.data;if(!e)return t`<div class="roxy-empty" role="status">No moon phase data</div>`;let r="phases"in e?e.phases:"calendar"in e?e.calendar:[];if(this.mode!=="current"&&r.length>0){let s="month"in e?e.month:void 0,o="year"in e?e.year:void 0;return t`<article
				class="card"
				aria-label="Moon phase calendar"
			>
				<h2 class="label">${s??"Moon phases"} ${o??""}</h2>
				<div class="list" role="list">
					${r.map(l=>this.renderListItem(l))}
				</div>
			</article>`}return"phase"in e?this.renderSingle(e):n}renderSingle(e){let r=Mr(e.phase);return t`<article class="card" aria-label="Current moon phase">
			<div class="hero">
				<span class="emoji" aria-hidden="true">${r}</span>
				<div>
					<h2 class="label">${e.phase??"Moon"}</h2>
					${e.date?t`<div class="date">${e.date}</div>`:n}
				</div>
			</div>
			<div class="stats">
				${typeof e.illumination=="number"?t`<div>
							<span>Illumination</span>
							<strong>${xt(e.illumination)}</strong>
						</div>`:n}
				${typeof e.age=="number"?t`<div>
							<span>Age</span>
							<strong>${w(e.age,1)} days</strong>
						</div>`:n}
				${e.sign?t`<div>
							<span>Sign</span>
							<strong>${e.sign}</strong>
						</div>`:n}
				${typeof e.distance=="number"?t`<div>
							<span>Distance</span>
							<strong>${(e.distance/1e3).toFixed(0)}k km</strong>
						</div>`:n}
			</div>
			${e.meaning?.description?t`<p class="meaning">${e.meaning.description}</p>`:n}
			${e.meaning?.keywords?.length?t`<div class="keywords">
						${e.meaning.keywords.map(s=>t`<span>${s}</span>`)}
					</div>`:n}
		</article>`}renderListItem(e){let r=Mr(e.phase);return t`<div class="list-item" role="listitem">
			<span aria-hidden="true">${r}</span>
			<span>${e.phase}</span>
			<span>${e.date??""}</span>
		</div>`}};Y.styles=[b,x`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.hero {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			.emoji {
				font-size: 3rem;
				line-height: 1;
			}
			.label {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: capitalize;
			}
			.date {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			.stats {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.stats div span:first-child {
				display: block;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.stats strong {
				color: var(--roxy-fg, #0a0a0a);
				font-variant-numeric: tabular-nums;
			}

			.meaning {
				color: var(--roxy-fg, #0a0a0a);
			}
			.keywords {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				margin-top: var(--roxy-space-sm, 0.5rem);
			}
			.keywords span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			.list {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.list-item {
				display: grid;
				grid-template-columns: 2.5rem 1fr auto;
				gap: var(--roxy-space-sm, 0.5rem);
				align-items: center;
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				padding: var(--roxy-space-sm, 0.5rem) 0;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.list-item:last-child {
				border-bottom: none;
			}
		`],p([y({attribute:!1})],Y.prototype,"data",2),p([y({type:String,reflect:!0})],Y.prototype,"mode",2),Y=p([v("roxy-moon-phase")],Y);function Mr(i){return i?Pr[i.toLowerCase()]??"\u{1F319}":"\u{1F319}"}function xt(i){let a=i<=1?i*100:i;return`${Math.round(a)}%`}function R(i,a,e,r){let s=r*Math.PI/180;return{x:i+e*Math.cos(s),y:a+e*Math.sin(s)}}var nr=420,A=nr/2,or=164,ft=146,ir=120,je=96,vt=178,bt=196,K=class extends u{constructor(){super(...arguments);this.data=null;this.houseSystem="placidus"}getPlanets(){return this.data?.planets??[]}getAscendant(){return this.data?.ascendant?.longitude??0}getMidheaven(){let e=this.data?.midheaven?.longitude;return typeof e=="number"?e:null}toAngle(e){return 180+this.getAscendant()-e}render(){if(!this.data)return t`<div class="roxy-empty" role="status">No chart data</div>`;let e=this.getPlanets(),r=this.data.aspects??[];return t`<div class="wrap">
			<header>
				<h2 class="title">Natal chart</h2>
				${this.data.birthDetails?t`<div class="meta">
							${[this.data.birthDetails.date,this.data.birthDetails.time].filter(Boolean).join(" \xB7 ")}
						</div>`:n}
			</header>
			<svg
				viewBox="0 0 ${nr} ${nr}"
				role="img"
				aria-label="Natal chart wheel with twelve houses, planets, and aspects"
			>
				<title>Natal chart wheel</title>
				<desc>
					Twelve zodiac sign segments around a circular wheel. Planet glyphs are
					placed at their ecliptic longitudes. Aspect lines connect related planets.
				</desc>
				<circle
					class="wheel-line"
					cx=${A}
					cy=${A}
					r=${or}
					stroke-width="1.5"
				/>
				<circle
					class="wheel-line"
					cx=${A}
					cy=${A}
					r=${ir}
					stroke-width="1"
				/>
				<circle
					class="wheel-line"
					cx=${A}
					cy=${A}
					r=${je-16}
					stroke-width="0.5"
				/>
				${this.renderSpokes()} ${this.renderSigns()} ${this.renderHouseNumbers()}
				${this.renderAspects(e,r)} ${this.renderPlanets(e)}
				${this.renderAngles()}
			</svg>
			<div class="legend">
				<span>${e.length} planets</span>
				<span>${r.length} aspects</span>
				<span><span class="legend-swatch" style="background: var(--roxy-success)"></span>harmonious</span>
				<span><span class="legend-swatch" style="background: var(--roxy-danger)"></span>challenging</span>
			</div>
			${this.renderDetails()}
			${this.renderInterpretations()}
		</div>`}renderAngles(){let e=this.getAscendant(),r=this.getMidheaven(),s=[this.renderAngleMark(e,"ASC")];return r!==null&&s.push(this.renderAngleMark(r,"MC")),s}renderAngleMark(e,r){let s=this.toAngle(e),o=R(A,A,or,s),l=R(A,A,vt,s),d=R(A,A,bt,s);return S`
			<g>
				<line class="angle-tick" x1=${o.x} y1=${o.y} x2=${l.x} y2=${l.y} />
				<text class="angle-marker" x=${d.x} y=${d.y} text-anchor="middle" dominant-baseline="central">${r}</text>
			</g>
		`}renderSpokes(){return Array.from({length:12},(e,r)=>{let s=this.toAngle(r*30),o=R(A,A,ir,s),l=R(A,A,or,s);return S`<line class="wheel-line" x1=${o.x} y1=${o.y} x2=${l.x} y2=${l.y} stroke-width="0.8" />`})}renderSigns(){return pe.map((e,r)=>{let s=this.toAngle(r*30+15),o=R(A,A,ft,s);return S`<text class="sign-glyph" x=${o.x} y=${o.y} text-anchor="middle" dominant-baseline="central">${z[e]}</text>`})}renderHouseNumbers(){let e=Math.floor(this.getAscendant()/30);return Array.from({length:12},(r,s)=>{let o=this.toAngle(s*30+15),l=R(A,A,ir-12,o),d=(s-e+12)%12+1;return S`<text class="house-num" x=${l.x} y=${l.y} text-anchor="middle" dominant-baseline="central">${d}</text>`})}renderPlanets(e){return e.map(r=>{if(!Number.isFinite(r.longitude))return n;let s=this.toAngle(r.longitude),o=R(A,A,je,s),l=L[C(r.name)]??r.name.slice(0,2),d=r.isRetrograde?" R":"",c=d?`${l}\u1D3F`:l;return S`<text class="planet-glyph" x=${o.x} y=${o.y} text-anchor="middle" dominant-baseline="central"><title>${r.name}${d}</title>${c}</text>`})}renderDetails(){let e=this.data?.summary,r=this.data?.aspectsInterpretation;if(!e&&!r)return n;let s=e?.retrogradePlanets??[],o=e?.elementDistribution??{},l=e?.modalityDistribution??{},d=Math.max(1,...Object.values(o)),c=Math.max(1,...Object.values(l));return t`<div class="details">
			${e?.dominantElement||e?.dominantModality?t`<div class="pill-row">
						${e.dominantElement?t`<span class="pill">Dominant element: ${e.dominantElement}</span>`:n}
						${e.dominantModality?t`<span class="pill">Dominant modality: ${e.dominantModality}</span>`:n}
					</div>`:n}
			${r?t`<div class="pill-row">
						<span class="pill pill--success">Harmonious ${r.harmonious}</span>
						<span class="pill pill--danger">Challenging ${r.challenging}</span>
						<span class="pill pill--muted">Neutral ${r.neutral}</span>
					</div>`:n}
			${s.length>0?t`<div class="pill-row">
						${s.map(m=>{let h=L[m]??m.slice(0,2);return t`<span class="pill pill--muted">${h} ${m} R</span>`})}
					</div>`:n}
			${r?.summary?t`<p class="summary">${r.summary}</p>`:n}
			${Object.keys(o).length>0||Object.keys(l).length>0?t`<div class="dist-grid">
						${Object.keys(o).length>0?t`<div class="dist-section">
									<h3>Elements</h3>
									${Object.entries(o).map(([m,h])=>t`<div class="dist-row">
											<span>${m}</span>
											<div class="dist-bar"><span style="width: ${Math.round(h/d*100)}%"></span></div>
											<span>${h}</span>
										</div>`)}
								</div>`:n}
						${Object.keys(l).length>0?t`<div class="dist-section">
									<h3>Modalities</h3>
									${Object.entries(l).map(([m,h])=>t`<div class="dist-row">
											<span>${m}</span>
											<div class="dist-bar"><span style="width: ${Math.round(h/c*100)}%"></span></div>
											<span>${h}</span>
										</div>`)}
								</div>`:n}
					</div>`:n}
		</div>`}renderInterpretations(){let e=this.getPlanets().filter(r=>r.interpretation);return e.length===0?n:t`<section class="interpretations">
			<h3>Planet readings</h3>
			${e.map((r,s)=>{let o=r.interpretation,l=L[C(r.name)]??"",d=w(r.degree??0,1);return t`<details class="interp-card" name="natal-planet-readings" ?open=${s===0}>
					<summary>${l} ${r.name} <small>${r.sign??""} ${d}</small></summary>
					<div class="interp-body">
						${o.summary?t`<p class="interp-summary">${o.summary}</p>`:n}
						${o.detailed?t`<p class="interp-detail">${o.detailed}</p>`:n}
						${o.keywords?.length?t`<div class="interp-keywords">${o.keywords.map(c=>t`<span class="kw">${c}</span>`)}</div>`:n}
					</div>
				</details>`})}
		</section>`}renderAspects(e,r){let s=new Map;for(let o of e){if(typeof o.longitude!="number")continue;let l=C(o.name);l&&s.set(l,o.longitude)}return r.map(o=>{let l=s.get(C(o.planet1)),d=s.get(C(o.planet2));if(l===void 0||d===void 0)return n;let c=R(A,A,je-18,this.toAngle(l)),m=R(A,A,je-18,this.toAngle(d)),h=ke(o),g=Ne[h]??"aspect-other",f=w(o.orb,1);return S`<line class=${`aspect ${g}`} x1=${c.x} y1=${c.y} x2=${m.x} y2=${m.y}><title>${o.planet1} ${h||""} ${o.planet2}${f?` (orb ${f}\xB0)`:""}</title></line>`})}};K.styles=[b,x`
			.wrap {
				width: 100%;
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
				color: var(--roxy-primary, #0f172a);
			}

			.meta {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			svg {
				display: block;
				width: 100%;
				max-width: 360px;
				height: auto;
				margin: 0 auto;
			}

			.wheel-line {
				fill: none;
				stroke: var(--roxy-border, #e4e4e7);
			}

			.sign-glyph {
				fill: var(--roxy-secondary, #475569);
				font-size: 14px;
				font-family: var(--roxy-font-sans);
			}

			.planet-glyph {
				fill: var(--roxy-accent, #f59e0b);
				font-size: 14px;
				font-weight: 600;
				font-family: var(--roxy-font-sans);
			}

			.house-num {
				fill: var(--roxy-muted, #71717a);
				font-size: 9px;
				font-family: var(--roxy-font-sans);
			}

			.aspect {
				stroke-width: 0.8;
				fill: none;
				opacity: 0.55;
			}
			.aspect-trine,
			.aspect-sextile {
				stroke: var(--roxy-success, #16a34a);
			}
			.aspect-square,
			.aspect-opposition {
				stroke: var(--roxy-danger, #dc2626);
			}
			.aspect-conjunction {
				stroke: var(--roxy-accent-fg, #b45309);
			}
			.aspect-other {
				stroke: var(--roxy-muted, #71717a);
				opacity: 0.4;
			}

			.angle-marker {
				fill: var(--roxy-accent-fg, #b45309);
				font-size: 10px;
				font-weight: 700;
				font-family: var(--roxy-font-sans);
				letter-spacing: 0.04em;
			}
			.angle-tick {
				stroke: var(--roxy-accent-fg, #b45309);
				stroke-width: 1.5;
			}

			.legend {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-md, 1rem);
			}
			.legend-swatch {
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				margin-right: 4px;
				vertical-align: middle;
			}

			.details {
				margin-top: var(--roxy-space-md, 1rem);
			}

			.pill-row {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				margin-bottom: var(--roxy-space-xs, 0.25rem);
			}

			.pill {
				padding: 2px 8px;
				border-radius: var(--roxy-radius-sm, 4px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-fg, #0f172a) 8%, transparent);
				color: var(--roxy-fg, #0f172a);
			}

			.pill--success {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 15%, transparent);
				color: var(--roxy-success, #16a34a);
			}

			.pill--danger {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 15%, transparent);
				color: var(--roxy-danger, #dc2626);
			}

			.pill--muted {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}

			.summary {
				color: var(--roxy-fg, #0f172a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: var(--roxy-space-md, 1rem) 0;
			}

			.dist-grid {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: var(--roxy-space-md, 1rem);
			}

			@container (max-width: 639px) {
				.dist-grid {
					grid-template-columns: 1fr;
				}
			}

			.dist-section h3 {
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-muted, #71717a);
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}

			.dist-row {
				display: grid;
				grid-template-columns: 4rem 1fr 1.5rem;
				align-items: center;
				gap: var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-fg, #0f172a);
				margin-bottom: 4px;
			}

			.dist-bar {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 20%, transparent);
				height: 6px;
				border-radius: 3px;
			}

			.dist-bar > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				border-radius: 3px;
			}

			.interpretations {
				margin-top: var(--roxy-space-md, 1rem);
			}
			.interpretations h3 {
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: 600;
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
			}
			.interp-card {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				margin-bottom: var(--roxy-space-xs, 0.25rem);
			}
			.interp-card summary {
				cursor: pointer;
				font-weight: 500;
				color: var(--roxy-fg, #0f172a);
			}
			.interp-card summary small {
				color: var(--roxy-muted, #71717a);
				margin-left: 0.5em;
				font-weight: 400;
			}
			.interp-body {
				margin-top: var(--roxy-space-xs, 0.25rem);
				color: var(--roxy-fg, #0f172a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.interp-keywords {
				display: flex;
				flex-wrap: wrap;
				gap: 0.25rem;
				margin-top: 0.5rem;
			}
			.interp-keywords .kw {
				padding: 1px 8px;
				border-radius: 9999px;
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-accent-fg, #b45309);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
		`],p([y({attribute:!1})],K.prototype,"data",2),p([y({type:String,attribute:"house-system",reflect:!0})],K.prototype,"houseSystem",2),K=p([v("roxy-natal-chart")],K);var V=class extends u{constructor(){super(...arguments);this.data=null;this.type="life-path"}render(){let e=this.data;if(!e)return t`<div class="roxy-empty" role="status">No numerology data</div>`;let r=$t[this.type]??this.type;return"coreNumbers"in e?this.renderChart(e,r):"personalYear"in e?this.renderPersonalYear(e,r):this.renderNumberCard(e,r)}renderNumberCard(e,r){let s=e.meaning?.keywords??[];return t`<article class="card" aria-label=${r}>
			<div class="hero">
				${typeof e.number=="number"?t`<div class="numeral">${e.number}</div>`:n}
				<div>
					<p class="label">${r}</p>
					${e.meaning?.title?t`<h2 class="title">${e.meaning.title}</h2>`:n}
				</div>
			</div>
			${e.meaning?.description?t`<p class="meaning">${e.meaning.description}</p>`:n}
			${e.calculation?t`<pre class="calc">${e.calculation}</pre>`:n}
			${s.length>0?t`<div class="chips">
						${s.map(o=>t`<span>${o}</span>`)}
					</div>`:n}
			${e.hasKarmicDebt&&e.karmicDebtNumber?t`<div class="karmic">
						Karmic debt ${e.karmicDebtNumber}.
						${wt(e.karmicDebtMeaning)}
					</div>`:n}
		</article>`}renderPersonalYear(e,r){return t`<article class="card" aria-label=${r}>
			<div class="hero">
				${typeof e.personalYear=="number"?t`<div class="numeral">${e.personalYear}</div>`:n}
				<div>
					<p class="label">${r}</p>
					${e.theme?t`<h2 class="title">${e.theme}</h2>`:n}
				</div>
			</div>
			${e.forecast?t`<p class="meaning">${e.forecast}</p>`:n}
			${e.advice?t`<p>${e.advice}</p>`:n}
		</article>`}renderChart(e,r){let s=Object.entries(e.coreNumbers).filter(([,o])=>o!=null);return t`<article class="card" aria-label=${r}>
			<div>
				<p class="label">${r}</p>
				${e.profile?.name?t`<h2 class="title">${e.profile.name}</h2>`:n}
			</div>
			${s.length>0?t`<div class="cores">
						${s.map(([o,l])=>t`<div class="item">
								<span>${ee(o)}</span>
								<strong>${l.number??""}</strong>
							</div>`)}
					</div>`:n}
		</article>`}};V.styles=[b,x`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.hero {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			.numeral {
				font-size: 4rem;
				line-height: 1;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-fg, #b45309);
				font-variant-numeric: tabular-nums;
			}
			.label {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.meaning {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
			}

			.calc {
				margin: 0;
				font-family: var(--roxy-font-mono);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 30%, transparent);
				padding: var(--roxy-space-sm, 0.5rem);
				border-radius: var(--roxy-radius-sm, 4px);
				white-space: pre-wrap;
				overflow-wrap: anywhere;
			}

			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.chips span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			.cores {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-md, 1rem);
			}
			.cores .item {
				display: flex;
				align-items: baseline;
				gap: var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.cores .item span:first-child {
				color: var(--roxy-muted, #71717a);
				text-transform: capitalize;
			}
			.cores .item strong {
				color: var(--roxy-accent-fg, #b45309);
				font-variant-numeric: tabular-nums;
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.karmic {
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 12%, transparent);
				border: 1px solid color-mix(in srgb, var(--roxy-warning, #ea580c) 32%, transparent);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				border-radius: var(--roxy-radius-md, 8px);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
		`],p([y({attribute:!1})],V.prototype,"data",2),p([y({type:String,reflect:!0})],V.prototype,"type",2),V=p([v("roxy-numerology-card")],V);var $t={"life-path":"Life Path",expression:"Expression","personal-year":"Personal Year",chart:"Numerology chart"};function wt(i){return i?[i.description,i.challenge,i.resolution].filter(Boolean).join(" "):""}var F=class extends u{constructor(){super(...arguments);this.data=null;this.detail="detailed"}render(){let e=this.data;if(!e)return t`<div class="roxy-empty" role="status">No panchang data</div>`;let r="sunrise"in e?e:null,s=[["Tithi",this.formatPart(e.tithi)],["Nakshatra",this.formatPart(e.nakshatra)],["Yoga",this.formatPart(e.yoga)],["Karana",this.formatPart(e.karana)]];r&&s.push(["Vara",this.formatPart(r.vara)]);let o=r?[["Brahma Muhurta",r.brahmaMuhurta],["Abhijit Muhurta",r.abhijitMuhurta],["Vijaya Muhurta",r.vijayaMuhurta],["Godhuli Muhurta",r.godhuliMuhurta],["Nishita Muhurta",r.nishitaMuhurta],["Pratah Sandhya",r.pratahSandhya],["Sayahna Sandhya",r.sayahnaSandhya]]:[],l=r?[["Rahu Kaal",r.rahuKaal],["Yamaganda",r.yamaganda],["Gulika",r.gulika]]:[];return t`<div class="wrap" aria-label="Panchang">
			<header class="head">
				<h2 class="title">Panchang</h2>
				<span class="date">${r?ze(r.date):""}</span>
			</header>
			<table>
				<tbody>
					${s.map(([d,c])=>t`<tr>
							<th>${d}</th>
							<td>${c}</td>
						</tr>`)}
					${r?.sunrise?t`<tr>
								<th>Sunrise</th>
								<td>${O(r.sunrise)}</td>
							</tr>`:n}
					${r?.sunset?t`<tr>
								<th>Sunset</th>
								<td>${O(r.sunset)}</td>
							</tr>`:n}
					${r?.moonrise?t`<tr>
								<th>Moonrise</th>
								<td>${O(r.moonrise)}</td>
							</tr>`:n}
					${r?.moonset?t`<tr>
								<th>Moonset</th>
								<td>${O(r.moonset)}</td>
							</tr>`:n}
				</tbody>
			</table>
			${this.detail==="detailed"&&(o.some(d=>!!d[1])||l.some(d=>!!d[1]))?t`
						<div class="section">Auspicious muhurtas</div>
						<table>
							<tbody>
								${o.filter(([,d])=>!!d).map(([d,c])=>t`<tr>
											<th>${d}</th>
											<td>${ar(c)}</td>
										</tr>`)}
							</tbody>
						</table>
						<div class="section">Inauspicious periods</div>
						<table>
							<tbody>
								${l.filter(([,d])=>!!d).map(([d,c])=>t`<tr>
											<th>${d}</th>
											<td>${ar(c)}</td>
										</tr>`)}
							</tbody>
						</table>
					`:n}
		</div>`}formatPart(e){if(!e)return"";if(typeof e=="string")return e;if(typeof e=="object"){let r=e;return[r.name,r.lord?`(${r.lord})`:"",r.phase].filter(Boolean).join(" ")}return String(e)}};F.styles=[b,x`
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
		`],p([y({attribute:!1})],F.prototype,"data",2),p([y({type:String,reflect:!0})],F.prototype,"detail",2),F=p([v("roxy-panchang-table")],F);var lr=[{key:"sthanaBala",label:"Sthana",color:"var(--roxy-info, #0284c7)"},{key:"digBala",label:"Dig",color:"var(--roxy-success, #16a34a)"},{key:"kalaBala",label:"Kala",color:"var(--roxy-warning, #ea580c)"},{key:"chestaBala",label:"Chesta",color:"var(--roxy-accent, #f59e0b)"},{key:"naisargikaBala",label:"Naisargika",color:"var(--roxy-secondary, #475569)"},{key:"drikBala",label:"Drik",color:"var(--roxy-danger, #dc2626)"}],se=class extends u{constructor(){super(...arguments);this.data=null}render(){if(!this.data?.planets?.length)return t`<div class="roxy-empty" role="status">No shadbala data</div>`;let e=[...this.data.planets].sort((r,s)=>r.relativeRank-s.relativeRank);return t`<div class="wrap" aria-label="Shadbala planetary strength">
			<div class="head">
				<h2 class="title">Shadbala</h2>
				<p class="subtitle">${e.length} planets ranked by strength</p>
			</div>

			<div role="list" aria-label="Planet strength bars">
				${e.map(r=>this.renderPlanetRow(r))}
			</div>

			<div class="legend" aria-label="Strength component legend">
				${lr.map(r=>t`<div class="legend-row">
						<span
							class="legend-swatch"
							style="background: ${r.color}"
							aria-hidden="true"
						></span>
						${r.label}
					</div>`)}
			</div>
		</div>`}renderPlanetRow(e){let r=L[C(e.planet)]??"",s=lr.map(h=>Math.max(0,e[h.key])),o=s.reduce((h,g)=>h+g,0),l=typeof e.strengthRatio=="number"&&e.strengthRatio>=1,d=l?"adequacy-badge--adequate":"adequacy-badge--weak",c=l?"adequate":"weak",m=w(e.totalRupas,2)&&w(e.minRequired,2)?`${w(e.totalRupas,2)} / ${w(e.minRequired,2)} R`:"";return t`<div class="planet-row" role="listitem" aria-label="${e.planet} shadbala">
			<div class="planet-label">
				<span class="glyph" aria-hidden="true">${r}</span>
				${e.planet}
				<span class="rank-badge" aria-label="rank ${e.relativeRank}">#${e.relativeRank}</span>
			</div>
			<div class="bar-wrap">
				<div class="bar" role="img" aria-label="Strength components for ${e.planet}">
					${o>0?lr.map((h,g)=>{let f=s[g];if(f<=0)return n;let k=f/o*100;return t`<div
									class="bar-segment"
									style="flex-grow: ${k}; background: ${h.color};"
									title="${h.label}: ${w(f,1)}"
								></div>`}):n}
				</div>
			</div>
			<div class="pills">
				${m?t`<span class="rupas-label">${m}</span>`:n}
				<span class="${`adequacy-badge ${d}`}">${c}</span>
			</div>
		</div>`}};se.styles=[b,x`
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

			.planet-row {
				display: grid;
				grid-template-columns: 8rem 1fr auto;
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
				padding: var(--roxy-space-sm, 0.5rem) 0;
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
			}

			.planet-row:last-of-type {
				border-bottom: none;
			}

			.planet-label {
				display: flex;
				align-items: center;
				gap: 6px;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.glyph {
				font-size: 1.2em;
				line-height: 1;
			}

			.bar-wrap {
				display: flex;
				flex-direction: column;
				gap: 4px;
			}

			.bar {
				display: flex;
				height: 12px;
				border-radius: var(--roxy-radius-sm, 4px);
				overflow: hidden;
				background: var(--roxy-border, #e4e4e7);
			}

			.bar-segment {
				height: 100%;
				transition: flex-grow var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}

			.pills {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				gap: 4px;
			}

			.rupas-label {
				font-variant-numeric: tabular-nums;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				white-space: nowrap;
			}

			.adequacy-badge {
				display: inline-block;
				padding: 1px 6px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.adequacy-badge--adequate {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 12%, transparent);
				color: var(--roxy-success-fg, #166534);
			}

			.adequacy-badge--weak {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 12%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}

			.rank-badge {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-accent-fg, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.legend {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-sm, 0.5rem);
			}

			.legend-row {
				display: flex;
				align-items: center;
				gap: 6px;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
			}

			.legend-swatch {
				display: inline-block;
				width: 10px;
				height: 10px;
				border-radius: var(--roxy-radius-sm, 4px);
				flex-shrink: 0;
			}

			@container (max-width: 480px) {
				.planet-row {
					grid-template-columns: 6rem 1fr;
					grid-template-rows: auto auto;
				}
				.pills {
					grid-column: 1 / -1;
					flex-direction: row;
					align-items: center;
					justify-content: flex-start;
				}
			}
		`],p([y({attribute:!1})],se.prototype,"data",2),se=p([v("roxy-shadbala-table")],se);var dr=360,P=dr/2,Dr=170,kt=154,Or=124,Se=96,oe=class extends u{constructor(){super(...arguments);this.data=null}render(){if(!this.data)return t`<div class="roxy-empty" role="status">No synastry data</div>`;let{person1:e,person2:r,compatibilityScore:s,analysis:o}=this.data,l=this.data.interAspects??[],d=e?.planets??[],c=r?.planets??[],m=typeof s=="number"?Math.round(s):void 0,h=o?.overall,g=o?.strengths??[],f=o?.challenges??[];return d.length>0&&c.length>0?t`<div
			class="wrap"
			aria-label="Synastry compatibility chart"
		>
			<div class="head">
				<h2 class="title">Synastry</h2>
				${typeof m=="number"?t`<span class="score" aria-label=${`Score ${m} of 100`}
							>${m} / 100</span
						>`:n}
			</div>
			<svg
				viewBox="0 0 ${dr} ${dr}"
				role="img"
				aria-label="Dual chart wheel comparing two natal charts"
			>
				<title>Synastry dual wheel</title>
				<circle
					class="wheel-line"
					cx=${P}
					cy=${P}
					r=${Dr}
					stroke-width="1.5"
				/>
				<circle
					class="wheel-line"
					cx=${P}
					cy=${P}
					r=${Se+14}
					stroke-width="0.8"
				/>
				<circle
					class="wheel-line"
					cx=${P}
					cy=${P}
					r=${Se-14}
					stroke-width="0.6"
				/>
				${this.renderSpokes()} ${this.renderSigns()}
				${this.renderInterAspectLines(d,c,l)}
				${this.renderRing(d,Or,"p1")} ${this.renderRing(c,Se,"p2")}
			</svg>
			<div class="legend-row">
				<span><span class="swatch" style="background: var(--roxy-accent)"></span>Person 1</span>
				<span><span class="swatch" style="background: var(--roxy-info)"></span>Person 2</span>
				<span><span class="swatch" style="background: var(--roxy-success)"></span>harmonious</span>
				<span><span class="swatch" style="background: var(--roxy-danger)"></span>challenging</span>
			</div>
			${h?t`<p class="summary">${h}</p>`:n}
			${l.length>0?this.renderAspects(l):n}
			${g.length>0||f.length>0?t`<div class="lists">
						${g.length?t`<div>
									<h3>Strengths</h3>
									<ul>
										${g.map($=>t`<li>${$}</li>`)}
									</ul>
								</div>`:n}
						${f.length?t`<div>
									<h3>Challenges</h3>
									<ul>
										${f.map($=>t`<li>${$}</li>`)}
									</ul>
								</div>`:n}
					</div>`:n}
		</div>`:t`<div
				class="wrap"
				aria-label="Synastry compatibility chart"
			>
				<div class="head">
					<h2 class="title">Synastry</h2>
					${typeof m=="number"?t`<span class="score" aria-label=${`Score ${m} of 100`}
								>${m} / 100</span
							>`:n}
				</div>
				<div class="missing-planets" role="status">
					Synastry response missing planet positions. Pass
					<code>data</code> with <code>person1.planets</code> and
					<code>person2.planets</code> arrays from the natal-chart endpoint, or
					use the <code>&lt;roxy-data&gt;</code> fallback.
				</div>
				${h?t`<p class="summary">${h}</p>`:n}
				${l.length>0?this.renderAspects(l):n}
				${g.length>0||f.length>0?t`<div class="lists">
							${g.length?t`<div>
										<h3>Strengths</h3>
										<ul>
											${g.map($=>t`<li>${$}</li>`)}
										</ul>
									</div>`:n}
							${f.length?t`<div>
										<h3>Challenges</h3>
										<ul>
											${f.map($=>t`<li>${$}</li>`)}
										</ul>
									</div>`:n}
						</div>`:n}
			</div>`}toAngle(e){return 180-e}renderSpokes(){return Array.from({length:12},(e,r)=>{let s=this.toAngle(r*30),o=R(P,P,Se-14,s),l=R(P,P,Dr,s);return S`<line class="wheel-line" x1=${o.x} y1=${o.y} x2=${l.x} y2=${l.y} stroke-width="0.6" />`})}renderSigns(){return pe.map((e,r)=>{let s=this.toAngle(r*30+15),o=R(P,P,kt,s);return S`<text class="sign" x=${o.x} y=${o.y} text-anchor="middle" dominant-baseline="central">${z[e]}</text>`})}renderRing(e,r,s){return e.map(o=>{if(!Number.isFinite(o.longitude))return n;let l=R(P,P,r,this.toAngle(o.longitude)),d=L[C(o.name)]??o.name.slice(0,2);return S`<text class=${s} x=${l.x} y=${l.y} text-anchor="middle" dominant-baseline="central"><title>${o.name}</title>${d}</text>`})}renderInterAspectLines(e,r,s){let o=(l,d)=>{let c=C(d);for(let m of l)if(C(m.name)===c&&typeof m.longitude=="number")return m.longitude};return s.map(l=>{let d=o(e,l.planet1),c=o(r,l.planet2);if(d===void 0||c===void 0)return n;let m=R(P,P,Or-12,this.toAngle(d)),h=R(P,P,Se+8,this.toAngle(c)),g=ke(l),f=Ne[g]??"aspect-other",k=w(l.orb,1);return S`<line class=${`aspect ${f}`} x1=${m.x} y1=${m.y} x2=${h.x} y2=${h.y}><title>${l.planet1} ${g} ${l.planet2}${k?` (orb ${k}\xB0)`:""}</title></line>`})}renderAspects(e){return t`<table>
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
				${e.slice(0,12).map(r=>t`<tr>
						<td>${r.planet1}</td>
						<td>${r.planet2}</td>
						<td>${ke(r)||""}</td>
						<td class="orb">${w(r.orb,1)}</td>
						<td>${St(r.strength)}</td>
					</tr>`)}
			</tbody>
		</table>`}};oe.styles=[b,x`
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
			.aspect {
				stroke-width: 0.8;
				fill: none;
				opacity: 0.5;
			}
			.aspect-trine,
			.aspect-sextile {
				stroke: var(--roxy-success, #16a34a);
			}
			.aspect-square,
			.aspect-opposition {
				stroke: var(--roxy-danger, #dc2626);
			}
			.aspect-conjunction {
				stroke: var(--roxy-accent-fg, #b45309);
			}
			.aspect-other {
				stroke: var(--roxy-muted, #71717a);
				opacity: 0.35;
			}
			.legend-row {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				margin-top: calc(var(--roxy-space-xs, 0.25rem) * -1);
			}
			.legend-row .swatch {
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				margin-right: 4px;
				vertical-align: middle;
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

			.missing-planets {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 8%, transparent);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-md, 1rem);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: 1.5;
			}
			.missing-planets code {
				font-family: var(--roxy-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
				font-size: 0.95em;
				background: color-mix(in srgb, var(--roxy-fg, #0a0a0a) 6%, transparent);
				padding: 0 4px;
				border-radius: 4px;
			}
		`],p([y({attribute:!1})],oe.prototype,"data",2),oe=p([v("roxy-synastry-chart")],oe);function St(i){return typeof i=="number"?Math.round(i).toString():""}var W=class extends u{constructor(){super(...arguments);this.data=null;this.flipped=!1;this.toggleFlip=()=>{this.flipped=!this.flipped}}render(){let e=this.data;return e?"card"in e?this.renderDailyCard(e):this.renderFullCard(e):t`<div class="roxy-empty" role="status">No tarot data</div>`}renderDailyCard(e){let r=e.card,s=this.flipped!==!!r.reversed,o=r.keywords??[];return t`<article class="card" aria-label=${r.name??"Tarot card"}>
			<div class="image-wrap">
				${r.imageUrl?t`<img
							class=${`image ${s?"reversed":""}`}
							src=${r.imageUrl}
							alt=${r.name??"Tarot card"}
							tabindex="0"
							@click=${this.toggleFlip}
							@keydown=${l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),this.toggleFlip())}}
						/>`:t`<div
							class=${`image ${s?"reversed":""}`}
							style="aspect-ratio: 0.6; display: flex; align-items: center; justify-content: center; color: var(--roxy-muted)"
						>
							${r.name??"?"}
						</div>`}
			</div>
			<div>
				<div class="meta">
					${r.arcana?t`${r.arcana} arcana`:n}
					${s?t` · reversed`:n}
				</div>
				<h2 class="title">${r.name??"Tarot card"}</h2>
				${e.dailyMessage?t`<p class="message">${e.dailyMessage}</p>`:n}
				${r.meaning?t`<p>${r.meaning}</p>`:n}
				${o.length>0?t`<div class="chips">
							${o.map(l=>t`<span>${l}</span>`)}
						</div>`:n}
				<button
					class="flip"
					type="button"
					@click=${this.toggleFlip}
					aria-pressed=${this.flipped?"true":"false"}
				>
					Flip card
				</button>
			</div>
		</article>`}renderFullCard(e){let r=this.flipped,s=r?e.reversed:e.upright,o=r?e.keywords?.reversed??[]:e.keywords?.upright??[];return t`<article class="card" aria-label=${e.name??"Tarot card"}>
			<div class="image-wrap">
				${e.imageUrl?t`<img
							class=${`image ${r?"reversed":""}`}
							src=${e.imageUrl}
							alt=${e.name??"Tarot card"}
							tabindex="0"
							@click=${this.toggleFlip}
							@keydown=${l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),this.toggleFlip())}}
						/>`:t`<div
							class=${`image ${r?"reversed":""}`}
							style="aspect-ratio: 0.6; display: flex; align-items: center; justify-content: center; color: var(--roxy-muted)"
						>
							${e.name??"?"}
						</div>`}
			</div>
			<div>
				<div class="meta">
					${e.arcana?t`${e.arcana} arcana`:n}
					${e.number!==void 0&&e.number!==null?t` · ${e.number}`:n}
					${r?t` · reversed`:n}
				</div>
				<h2 class="title">${e.name??"Tarot card"}</h2>
				${s?.description?t`<p>${s.description}</p>`:n}
				${o.length>0?t`<div class="chips">
							${o.map(l=>t`<span>${l}</span>`)}
						</div>`:n}
				<button
					class="flip"
					type="button"
					@click=${this.toggleFlip}
					aria-pressed=${this.flipped?"true":"false"}
				>
					Flip card
				</button>
			</div>
		</article>`}};W.styles=[b,x`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				grid-template-columns: minmax(0, 9rem) 1fr;
				gap: var(--roxy-space-lg, 1.5rem);
				align-items: start;
			}

			@container (max-width: 480px) {
				.card {
					grid-template-columns: 1fr;
				}
			}

			.image-wrap {
				perspective: 800px;
			}
			.image {
				display: block;
				width: 100%;
				height: auto;
				border-radius: var(--roxy-radius-md, 8px);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				transition:
					transform var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
				cursor: pointer;
			}
			.image.reversed {
				transform: rotate(180deg);
			}
			.image:focus-visible {
				outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
				outline-offset: 2px;
			}

			.title {
				margin: 0;
				font-size: var(--roxy-text-xl, 1.5rem);
				font-weight: var(--roxy-weight-bold, 600);
				letter-spacing: var(--roxy-tracking-tight);
			}
			.meta {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				margin-bottom: var(--roxy-space-sm, 0.5rem);
			}

			.message {
				color: var(--roxy-fg, #0a0a0a);
				margin: var(--roxy-space-sm, 0.5rem) 0 var(--roxy-space-md, 1rem);
			}

			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				margin-top: var(--roxy-space-sm, 0.5rem);
			}
			.chips span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			.flip {
				margin-top: var(--roxy-space-sm, 0.5rem);
				background: transparent;
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: 4px 12px;
				font-family: inherit;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
				cursor: pointer;
				transition:
					transform var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.flip:hover {
				transform: scale(1.02);
			}
		`],p([y({attribute:!1})],W.prototype,"data",2),p([E()],W.prototype,"flipped",2),W=p([v("roxy-tarot-card")],W);var J=class extends u{constructor(){super(...arguments);this.data=null;this.spread="three-card"}render(){let e=this.data;if(!e)return t`<div class="roxy-empty" role="status">No tarot spread</div>`;let r="answer"in e,s="cards"in e&&!("spread"in e),o=s?[]:"positions"in e?e.positions??[]:[],l=s&&"cards"in e?e.cards:[],d=r?e.answer:void 0,c=r?e.strength:void 0,m="spread"in e?e.spread:this.spread.replace(/-/g," "),h="question"in e?e.question:void 0,g="summary"in e?e.summary:void 0,f=r?e.interpretation:void 0,k=d?d.toLowerCase().replace(/[^a-z]/g,""):"";return t`<article class="wrap" aria-label="Tarot spread">
			<header class="head">
				<h2 class="title">${m}</h2>
				${h?t`<span class="question">"${h}"</span>`:n}
			</header>
			${r?t`<div>
						<span class=${`answer ${k}`}>${d}</span>
						${c?t`<small> · ${c}</small>`:n}
					</div>`:n}
			${o.length>0?t`<div class="grid">
						${o.map($=>t`<div class="card">
								<p class="label">${$.name??""}</p>
								<div class="image">
									${$.card?.imageUrl?t`<img
												src=${$.card.imageUrl}
												alt=${$.card.name??"tarot card"}
												class=${$.card.reversed?"reversed":""}
											/>`:t`${$.card?.name??"?"}`}
								</div>
								<p class="name">
									${$.card?.name??""}
									${$.card?.reversed?t`<small>(reversed)</small>`:n}
								</p>
								${$.interpretation?t`<p class="interp">${$.interpretation}</p>`:n}
							</div>`)}
					</div>`:n}
			${l.length>0?t`<div class="grid">
						${l.map($=>t`<div class="card">
								<div class="image">
									${$.imageUrl?t`<img
												src=${$.imageUrl}
												alt=${$.name??"tarot card"}
												class=${$.reversed?"reversed":""}
											/>`:t`${$.name??"?"}`}
								</div>
								<p class="name">
									${$.name??""}
									${$.reversed?t`<small>(reversed)</small>`:n}
								</p>
								${$.meaning?t`<p class="interp">${$.meaning}</p>`:n}
							</div>`)}
					</div>`:n}
			${g?t`<p class="reading">${g}</p>`:n}
			${f?t`<p class="reading">${f}</p>`:n}
		</article>`}};J.styles=[b,x`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.head {
				display: flex;
				justify-content: space-between;
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
				align-items: baseline;
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: capitalize;
			}
			.question {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-style: italic;
			}

			.answer {
				display: inline-block;
				padding: 4px 14px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-weight: var(--roxy-weight-bold, 600);
				font-size: var(--roxy-text-base, 1rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.answer.yes {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.answer.no {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.answer.maybe {
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 16%, transparent);
				color: var(--roxy-warning-fg, #9a3412);
			}

			.grid {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}

			.card {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem);
				background: var(--roxy-bg, #fff);
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.label {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				margin: 0;
			}
			.image {
				width: 100%;
				aspect-ratio: 0.6;
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				border-radius: var(--roxy-radius-sm, 4px);
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				overflow: hidden;
			}
			.image img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				transition:
					transform var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.image img.reversed {
				transform: rotate(180deg);
			}
			.name {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.interp {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
			}

			.reading {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
			}
		`],p([y({attribute:!1})],J.prototype,"data",2),p([y({type:String,reflect:!0})],J.prototype,"spread",2),J=p([v("roxy-tarot-spread")],J);var ie=class extends u{constructor(){super(...arguments);this.data=null}render(){if(!this.data?.transitPlanets?.length)return t`<div class="roxy-empty" role="status">No transits data</div>`;let{transitDate:e,transitTime:r,transitPlanets:s,transitAspects:o,summary:l}=this.data,d=[ze(e),O(r)].filter(Boolean).join(" ");return t`<div class="wrap" aria-label="Transit positions table">
			<div class="head">
				<h2 class="title">Transits</h2>
				${d?t`<p class="subtitle">${d}</p>`:n}
			</div>

			${l?this.renderSummaryPills(l):n}

			<div>
				<p class="section-label">Planet positions</p>
				<div class="overflow-scroll">
					${this.renderPlanetsTable(s)}
				</div>
			</div>

			${o?.length?t`<div>
						<p class="section-label">Transit aspects</p>
						<div class="overflow-scroll">
							${this.renderAspectsList(o)}
						</div>
					</div>`:n}
		</div>`}renderSummaryPills(e){return t`<div class="summary-pills" role="region" aria-label="Aspect summary">
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
		</div>`}renderPlanetsTable(e){return t`<table class="planets-table">
			<thead>
				<tr>
					<th scope="col">Planet</th>
					<th scope="col">Sign</th>
					<th scope="col">Degree</th>
					<th scope="col">Speed</th>
				</tr>
			</thead>
			<tbody>
				${e.map(r=>{let s=L[C(r.name)]??"",o=z[C(r.sign)]??"",l=r.speed>=0?"\u2191":"\u2193";return t`<tr>
						<td>
							<div class="planet-cell">
								<span class="glyph" aria-hidden="true">${s}</span>
								${r.name}
								${r.isRetrograde?t`<span class="retro-badge" aria-label="retrograde">R</span>`:n}
							</div>
						</td>
						<td>
							<div class="planet-cell">
								<span class="glyph" aria-hidden="true">${o}</span>
								${r.sign}
							</div>
						</td>
						<td class="num">${w(r.degree,2)}</td>
						<td class="speed">
							<span class="speed-arrow" aria-hidden="true">${l}</span>
							${w(Math.abs(r.speed),4)}
						</td>
					</tr>`})}
			</tbody>
		</table>`}renderAspectsList(e){return t`<div role="list" aria-label="Transit aspects">
			${e.map((r,s)=>{let o=L[C(r.transitPlanet)]??"",l=L[C(r.natalPlanet)]??"",d=(r.nature??"neutral").toLowerCase(),c=r.interpretation,m=(r.type??"").toLowerCase(),h=r.isApplying?"Applying":"Separating";return t`<details class="aspect-card" role="listitem" name="transit-aspects" ?open=${s===0}>
					<summary>
						<span aria-hidden="true">${o}</span>
						${r.transitPlanet}
						<span class="nature-badge ${d}">${m}</span>
						<span aria-hidden="true">${l}</span>
						${r.natalPlanet}
						<span class="meta">
							${h} · orb ${w(r.orb,2)}° · strength ${w(r.strength,1)}
						</span>
					</summary>
					<div class="interp-body">
						${c?.summary?t`<p>${c.summary}</p>`:n}
						${c?.impact?t`<p><strong>Impact:</strong> ${c.impact}</p>`:n}
						${c?.timing?t`<p><strong>Timing:</strong> ${c.timing}</p>`:n}
						${c?.guidance?t`<p><strong>Guidance:</strong> ${c.guidance}</p>`:n}
						${c?.keywords?.length?t`<div class="interp-keywords">
										${c.keywords.map(g=>t`<span class="kw">${g}</span>`)}
									</div>`:n}
					</div>
				</details>`})}
		</div>`}};ie.styles=[b,x`
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

			.overflow-scroll {
				overflow-x: auto;
				-webkit-overflow-scrolling: touch;
			}

			.aspect-card {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				margin-bottom: var(--roxy-space-xs, 0.25rem);
			}
			.aspect-card summary {
				cursor: pointer;
				font-weight: 500;
				color: var(--roxy-fg, #0a0a0a);
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: 0.5em;
			}
			.aspect-card summary .meta {
				color: var(--roxy-muted, #71717a);
				font-weight: 400;
				font-size: var(--roxy-text-xs, 0.75rem);
				margin-left: auto;
				font-variant-numeric: tabular-nums;
			}
			.aspect-card .interp-body {
				margin-top: var(--roxy-space-xs, 0.25rem);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: 1.45;
			}
			.aspect-card .interp-body p {
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
			}
			.interp-keywords {
				display: flex;
				flex-wrap: wrap;
				gap: 0.25rem;
				margin-top: 0.5rem;
			}
			.interp-keywords .kw {
				padding: 1px 8px;
				border-radius: 9999px;
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-accent-fg, #b45309);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.nature-badge {
				display: inline-block;
				padding: 1px 8px;
				border-radius: 9999px;
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: 600;
			}
			.nature-badge.harmonious {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 12%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.nature-badge.challenging {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 12%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.nature-badge.neutral {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
		`],p([y({attribute:!1})],ie.prototype,"data",2),ie=p([v("roxy-transits-table")],ie);var X=class extends u{constructor(){super(...arguments);this.data=null;this.chartStyle="south"}buildHouses(){if(!this.data)return[];let e=this.data,r=this.data?.meta?.Lagna?.rashi??"",s=[];for(let o=0;o<12;o++){let l=_e[o],c=(e[l]?.signs??[]).map(h=>h.graha).filter(Boolean),m=Me[l]??"";s.push({number:o+1,sign:m,planets:c,isLagna:r?r.toLowerCase()===m.toLowerCase():!1})}return s}render(){if(!this.data)return t`<div class="roxy-empty" role="status">No kundli data</div>`;let e=this.buildHouses(),r=this.chartStyle==="north";return t`<div class="wrap">
			<h2 class="title">Vedic kundli</h2>
			<svg
				viewBox="0 0 300 300"
				role="img"
				aria-label="Vedic birth chart with twelve sign houses"
			>
				<title>Vedic kundli</title>
				${r?Oe():Ge()}
				${r?e.map(s=>He(s)):e.map(s=>De(s))}
			</svg>
		</div>`}};X.styles=[b,x`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}
			svg {
				display: block;
				width: 100%;
				max-width: 360px;
				margin: 0 auto;
			}
			.line {
				fill: transparent;
				stroke: var(--roxy-border, #e4e4e7);
			}
			.sign-text {
				fill: var(--roxy-muted, #71717a);
				font-size: 9px;
				font-weight: 500;
				font-family: var(--roxy-font-sans);
			}
			.planet-text {
				fill: var(--roxy-fg, #0a0a0a);
				font-size: 11px;
				font-weight: 600;
				font-family: var(--roxy-font-sans);
			}
			.house-num {
				fill: var(--roxy-muted, #71717a);
				font-size: 9px;
				font-weight: 400;
				font-family: var(--roxy-font-sans);
			}
			.lagna-marker {
				fill: var(--roxy-accent-fg, #b45309);
				font-size: 8px;
				font-weight: 700;
				font-family: var(--roxy-font-sans);
				letter-spacing: 0.05em;
			}
			.lagna-bg {
				fill: color-mix(in srgb, var(--roxy-accent, #f59e0b) 12%, transparent);
				stroke: color-mix(in srgb, var(--roxy-accent, #f59e0b) 45%, transparent);
				stroke-width: 0.8;
			}
		`],p([y({attribute:!1})],X.prototype,"data",2),p([y({type:String,reflect:!0,attribute:"chart-style"})],X.prototype,"chartStyle",2),X=p([v("roxy-vedic-kundli")],X);var Z=class extends u{constructor(){super(...arguments);this.data=null;this.filter="";this.handleInput=e=>{this.filter=e.target.value}}renderQualityChip(e){let r=`quality-chip quality-${e}`;return t`<span class=${r}>${e}</span>`}renderDetailCard(e){return t`<div class="detail-card">
			<p class="detail-name">
				${e.name}
				${e.quality?this.renderQualityChip(e.quality):n}
			</p>
			${e.description?t`<p class="description">${e.description}</p>`:n}
			${e.result?t`<details>
						<summary>Effects</summary>
						<div class="result-body">${e.result}</div>
					</details>`:n}
		</div>`}render(){if(!this.data)return t`<div class="roxy-empty" role="status">No yoga data</div>`;let e=this.data,r=this.filter.toLowerCase();if("description"in e&&typeof e.description=="string"){let s=e;return t`<div class="wrap">${this.renderDetailCard(s)}</div>`}if("yogas"in e&&Array.isArray(e.yogas)){let s=e.yogas;if(s.length>0&&"description"in s[0]){let m=s,h=r?m.filter(f=>f.name.toLowerCase().includes(r)):m,g=e.total;return t`<div class="wrap">
					<div class="head">
						<h2 class="title">Yoga catalog</h2>
						${g!==void 0?t`<span class="count">${g} total</span>`:n}
					</div>
					<div class="search-wrap">
						<input
							class="search"
							type="search"
							placeholder="Filter yogas..."
							aria-label="Filter yoga list by name"
							.value=${this.filter}
							@input=${this.handleInput}
						/>
					</div>
					<div
						class="detail-grid"
						role="region"
						aria-live="polite"
						aria-label="Yoga results"
					>
						${h.length>0?h.map(f=>this.renderDetailCard(f)):t`<p class="no-results">No yogas match your search.</p>`}
					</div>
				</div>`}let l=s,d=r?l.filter(m=>m.name.toLowerCase().includes(r)):l,c=e.total;return t`<div class="wrap">
				<div class="head">
					<h2 class="title">Yoga catalog</h2>
					${c!==void 0?t`<span class="count">${c} total</span>`:n}
				</div>
				<div class="search-wrap">
					<input
						class="search"
						type="search"
						placeholder="Filter yogas..."
						aria-label="Filter yoga list by name"
						.value=${this.filter}
						@input=${this.handleInput}
					/>
				</div>
				<div
					class="grid"
					role="region"
					aria-live="polite"
					aria-label="Yoga results"
				>
					${d.length>0?d.map(m=>t`<div class="yoga-chip">
									${m.name}
									<span class="yoga-id">${m.id}</span>
								</div>`):t`<p class="no-results">No yogas match your search.</p>`}
				</div>
			</div>`}return t`<div class="roxy-empty" role="status">No yoga data</div>`}};Z.styles=[b,x`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.head {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}
			.count {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
			}
			.search-wrap {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.search {
				width: 100%;
				max-width: 280px;
				padding: 0.35em 0.75em;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-family: var(--roxy-font-sans);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-bg, #fff);
				color: var(--roxy-fg, #0a0a0a);
				outline: none;
			}
			.search::placeholder {
				color: var(--roxy-fg, #0a0a0a);
				opacity: 0.65;
			}
			.search:focus {
				border-color: var(--roxy-accent, #f59e0b);
				box-shadow: 0 0 0 2px color-mix(in srgb, var(--roxy-accent, #f59e0b) 30%, transparent);
			}
			.grid {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
				grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
			}
			.yoga-chip {
				padding: 0.4em 0.8em;
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				font-size: var(--roxy-text-sm, 0.875rem);
				background: var(--roxy-bg, #fff);
				color: var(--roxy-fg, #0a0a0a);
				word-break: break-word;
			}
			.yoga-chip .yoga-id {
				display: block;
				font-size: 0.7em;
				color: var(--roxy-fg, #0a0a0a);
				opacity: 0.75;
				margin-top: 0.15em;
			}
			.detail-card {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-md, 1rem);
				background: var(--roxy-bg, #fff);
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.detail-name {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
				display: flex;
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
				flex-wrap: wrap;
			}
			.quality-chip {
				display: inline-block;
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: 600;
				padding: 0.15em 0.6em;
				border-radius: 999px;
			}
			.quality-Positive {
				background: color-mix(in srgb, var(--roxy-success, #22c55e) 18%, transparent);
				color: var(--roxy-success-fg, #15803d);
				border: 1px solid color-mix(in srgb, var(--roxy-success, #22c55e) 40%, transparent);
			}
			.quality-Negative {
				background: color-mix(in srgb, var(--roxy-danger, #ef4444) 18%, transparent);
				color: var(--roxy-danger-fg, #b91c1c);
				border: 1px solid color-mix(in srgb, var(--roxy-danger, #ef4444) 40%, transparent);
			}
			.quality-Both {
				background: color-mix(in srgb, var(--roxy-warning, #f59e0b) 18%, transparent);
				color: var(--roxy-warning-fg, #b45309);
				border: 1px solid color-mix(in srgb, var(--roxy-warning, #f59e0b) 40%, transparent);
			}
			.description {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				margin: 0;
				line-height: var(--roxy-leading-normal, 1.5);
			}
			details {
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			details summary {
				cursor: pointer;
				color: var(--roxy-accent-fg, #b45309);
				font-weight: 500;
				padding: 0.25em 0;
				list-style: none;
				display: flex;
				align-items: center;
				gap: 0.4em;
			}
			details summary::before {
				content: '+';
				font-size: 1.1em;
				line-height: 1;
			}
			details[open] summary::before {
				content: '-';
			}
			details .result-body {
				padding-top: var(--roxy-space-xs, 0.25rem);
				color: var(--roxy-fg, #0a0a0a);
				line-height: var(--roxy-leading-normal, 1.5);
			}
			.no-results {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				padding: var(--roxy-space-md, 1rem) 0;
				text-align: center;
			}
			.detail-grid {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
		`],p([y({attribute:!1})],Z.prototype,"data",2),p([E()],Z.prototype,"filter",2),Z=p([v("roxy-yoga-list")],Z);var Ie=[{pascal:"RoxyNatalChart",tag:"roxy-natal-chart",slug:"natal-chart",heading:"Natal chart",description:"Western natal chart wheel for /astrology/natal-chart responses",docsLabel:"Western",endpointLabel:"POST /astrology/natal-chart",docsSummary:"Natal chart wheel with planet glyphs and aspect lines",topic:"Astrology"},{pascal:"RoxyHoroscopeCard",tag:"roxy-horoscope-card",slug:"horoscope-card",heading:"Daily horoscope",description:"Daily, weekly, or monthly horoscope card for /astrology/horoscope/...",docsLabel:"Western",endpointLabel:"GET /astrology/horoscope/{sign}/{daily,weekly,monthly}",docsSummary:"Daily, weekly, or monthly horoscope card",topic:"Astrology"},{pascal:"RoxySynastryChart",tag:"roxy-synastry-chart",slug:"synastry-chart",heading:"Synastry",description:"Dual-wheel synastry chart with inter-aspects table",docsLabel:"Western",endpointLabel:"POST /astrology/synastry",docsSummary:"Dual-wheel synastry with inter-aspects table",topic:"Astrology"},{pascal:"RoxyCompatibilityCard",tag:"roxy-compatibility-card",slug:"compatibility-card",heading:"Compatibility score",description:"Cross-domain compatibility score card",docsLabel:"Cross",endpointLabel:"POST /astrology/compatibility-score, /numerology/compatibility, /biorhythm/compatibility",docsSummary:"Score card with category breakdown",topic:"Astrology"},{pascal:"RoxyMoonPhase",tag:"roxy-moon-phase",slug:"moon-phase",heading:"Moon phase",description:"Moon phase card and calendar",docsLabel:"Western",endpointLabel:"GET /astrology/moon-phase/{current,upcoming,calendar/...}",docsSummary:"Moon phase card and calendar",topic:"Astrology"},{pascal:"RoxyVedicKundli",tag:"roxy-vedic-kundli",slug:"vedic-kundli",heading:"Vedic kundli",description:"South or North Indian Vedic kundli for /vedic-astrology/birth-chart",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/birth-chart",docsSummary:"South or North Indian kundli",topic:"Vedic"},{pascal:"RoxyPanchangTable",tag:"roxy-panchang-table",slug:"panchang-table",heading:"Panchang",description:"Panchang muhurta table with auspicious and inauspicious periods",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/panchang/{basic,detailed}",docsSummary:"15+ muhurtas in detailed mode",topic:"Vedic"},{pascal:"RoxyDashaTimeline",tag:"roxy-dasha-timeline",slug:"dasha-timeline",heading:"Vimshottari dasha",description:"Vimshottari dasha timeline with active mahadasha highlighted",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/dasha/{current,major,sub/...}",docsSummary:"Vimshottari mahadasha + antardasha + pratyantardasha",topic:"Vedic"},{pascal:"RoxyDoshaCard",tag:"roxy-dosha-card",slug:"dosha-card",heading:"Manglik dosha",description:"Manglik, Kaal Sarp, or Sade Sati presence card",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/dosha/{manglik,kalsarpa,sadhesati}",docsSummary:"Presence, severity, remedies, scoped effects",topic:"Vedic"},{pascal:"RoxyGunaMilan",tag:"roxy-guna-milan",slug:"guna-milan",heading:"Guna milan",description:"36-point Ashtakoota matrimonial compatibility breakdown",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/compatibility",docsSummary:"36-point Ashtakoota with eight sub-scores",topic:"Vedic"},{pascal:"RoxyKpPlanetsTable",tag:"roxy-kp-planets-table",slug:"kp-planets-table",heading:"KP planets",description:"KP planets table with sub-lord and sub-sub-lord columns",docsLabel:"Vedic (KP)",endpointLabel:"POST /vedic-astrology/kp/planets",docsSummary:"Sub-lord and sub-sub-lord columns",topic:"Vedic"},{pascal:"RoxyTransitsTable",tag:"roxy-transits-table",slug:"transits-table",heading:"Transits",description:"Live planet positions plus aspects to a natal chart",docsLabel:"Western",endpointLabel:"POST /astrology/transits",docsSummary:"Transit planet positions plus optional aspects to a natal chart",topic:"Astrology"},{pascal:"RoxyDivisionalChart",tag:"roxy-divisional-chart",slug:"divisional-chart",heading:"Divisional chart",description:"D2 to D60 varga chart wheel with Vargottama markers",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/divisional-chart",docsSummary:"Generic divisional varga wheel from D2 Hora to D60 Shashtiamsa",topic:"Vedic"},{pascal:"RoxyAshtakavargaGrid",tag:"roxy-ashtakavarga-grid",slug:"ashtakavarga-grid",heading:"Ashtakavarga",description:"Sarva and Bhinna ashtakavarga heatmap with bindu scores",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/ashtakavarga",docsSummary:"Sarva, Bhinna, and Shodhya Pinda views in a tabbed heatmap",topic:"Vedic"},{pascal:"RoxyShadbalaTable",tag:"roxy-shadbala-table",slug:"shadbala-table",heading:"Shadbala",description:"Six-fold planetary strength with adequacy badge per planet",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/shadbala",docsSummary:"Six-fold planetary strength bar plus rupas and adequacy badge",topic:"Vedic"},{pascal:"RoxyYogaList",tag:"roxy-yoga-list",slug:"yoga-list",heading:"Yoga catalog",description:"Yoga reference cards from the catalog with optional detail mode",docsLabel:"Vedic",endpointLabel:"GET /vedic-astrology/yoga, /yoga/{id}",docsSummary:"Filterable yoga cards from the 300 plus yoga catalog",topic:"Vedic"},{pascal:"RoxyChoghadiyaGrid",tag:"roxy-choghadiya-grid",slug:"choghadiya-grid",heading:"Choghadiya",description:"Day and night Choghadiya muhurta tiles for activity timing",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/panchang/choghadiya",docsSummary:"Day and night Choghadiya muhurta tiles colored by effect",topic:"Vedic"},{pascal:"RoxyNumerologyCard",tag:"roxy-numerology-card",slug:"numerology-card",heading:"Life path number",description:"Numerology card for life path, expression, personal year, or full chart",docsLabel:"Numerology",endpointLabel:"POST /numerology/{life-path,expression,personal-year,chart}",docsSummary:"Life path, expression, personal year, full chart",topic:"Numerology"},{pascal:"RoxyTarotCard",tag:"roxy-tarot-card",slug:"tarot-card",heading:"Daily tarot card",description:"Single tarot card with upright/reversed flip animation",docsLabel:"Tarot",endpointLabel:"GET /tarot/cards/{id}, POST /tarot/daily",docsSummary:"Single card with upright and reversed flip",topic:"Tarot"},{pascal:"RoxyTarotSpread",tag:"roxy-tarot-spread",slug:"tarot-spread",heading:"Three-card spread",description:"Tarot spread renderer for three-card, Celtic Cross, love, or yes/no",docsLabel:"Tarot",endpointLabel:"POST /tarot/spreads/{three-card,celtic-cross,love}, /tarot/yes-no, /tarot/draw",docsSummary:"Spreads with positions and reading",topic:"Tarot"},{pascal:"RoxyBiorhythmChart",tag:"roxy-biorhythm-chart",slug:"biorhythm-chart",heading:"Daily biorhythm",description:"Daily biorhythm bars or multi-day forecast cycle lines",docsLabel:"Biorhythm",endpointLabel:"POST /biorhythm/{daily,forecast,critical-days}",docsSummary:"Daily bars, forecast cycle lines, critical days",topic:"Biorhythm"},{pascal:"RoxyHexagram",tag:"roxy-hexagram",slug:"hexagram",heading:"I Ching hexagram",description:"I Ching hexagram with trigram glyphs, judgment, image, and changing lines",docsLabel:"I Ching",endpointLabel:"GET /iching/hexagrams/{number}, /iching/cast, POST /iching/daily, /iching/daily/cast",docsSummary:"Hexagram with trigrams, judgment, image, changing lines",topic:"I Ching"},{pascal:"RoxyEndpointForm",tag:"roxy-endpoint-form",slug:"endpoint-form",heading:"Schema-driven form",description:"Schema-driven form that emits roxy-submit with a validated payload",docsLabel:"Helper",endpointLabel:"Any endpoint via x-roxy-ui hints",docsSummary:"Schema-driven form, emits roxy-submit",topic:"Helpers",selfFetching:!0},{pascal:"RoxyLocationSearch",tag:"roxy-location-search",slug:"location-search",heading:"City search",description:"City search input with debounced /location/search calls",docsLabel:"Helper",endpointLabel:"GET /location/search",docsSummary:"Debounced city search input, emits roxy-location-select",topic:"Helpers",selfFetching:!0},{pascal:"RoxyData",tag:"roxy-data",slug:"data",heading:"Generic renderer",description:"Generic fallback renderer for any OpenAPI response shape",docsLabel:"Helper",endpointLabel:"Any response shape",docsSummary:"Generic fallback renderer for unknown shapes",topic:"Helpers",selfFetching:!0}];var Hr="0.2.3";var At=Ie.map(i=>i.slug);return qr(Ct);})();
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
//# sourceMappingURL=roxy-ui.js.map
