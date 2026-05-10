"use strict";var RoxyUI=(()=>{var Ae=Object.defineProperty;var mt=Object.getOwnPropertyDescriptor;var Gt=Object.getOwnPropertyNames;var jt=Object.prototype.hasOwnProperty;var It=(i,r)=>{for(var e in r)Ae(i,e,{get:r[e],enumerable:!0})},Bt=(i,r,e,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let s of Gt(r))!jt.call(i,s)&&s!==e&&Ae(i,s,{get:()=>r[s],enumerable:!(t=mt(r,s))||t.enumerable});return i};var qt=i=>Bt(Ae({},"__esModule",{value:!0}),i),c=(i,r,e,t)=>{for(var s=t>1?void 0:t?mt(r,e):r,o=i.length-1,l;o>=0;o--)(l=i[o])&&(s=(t?l(r,e,s):l(s))||s);return t&&s&&Ae(r,e,s),s};var Cr={};It(Cr,{ROXY_COMPONENTS:()=>Be,ROXY_UI_COMPONENTS:()=>Ar,ROXY_UI_VERSION:()=>Ht,RoxyAshtakavargaGrid:()=>M,RoxyBiorhythmChart:()=>D,RoxyChoghadiyaGrid:()=>te,RoxyCompatibilityCard:()=>H,RoxyDashaTimeline:()=>G,RoxyData:()=>j,RoxyDivisionalChart:()=>I,RoxyDoshaCard:()=>B,RoxyEndpointForm:()=>_,RoxyGunaMilan:()=>re,RoxyHexagram:()=>q,RoxyHoroscopeCard:()=>U,RoxyKpPlanetsTable:()=>ae,RoxyLocationSearch:()=>T,RoxyMoonPhase:()=>Y,RoxyNatalChart:()=>K,RoxyNumerologyCard:()=>V,RoxyPanchangTable:()=>F,RoxyShadbalaTable:()=>se,RoxySynastryChart:()=>oe,RoxyTarotCard:()=>W,RoxyTarotSpread:()=>J,RoxyTransitsTable:()=>ie,RoxyVedicKundli:()=>X,RoxyYogaList:()=>Z});var Ce=globalThis,Ee=Ce.ShadowRoot&&(Ce.ShadyCSS===void 0||Ce.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,qe=Symbol(),ht=new WeakMap,ye=class{constructor(r,e,t){if(this._$cssResult$=!0,t!==qe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o,e=this.t;if(Ee&&r===void 0){let t=e!==void 0&&e.length===1;t&&(r=ht.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),t&&ht.set(e,r))}return r}toString(){return this.cssText}},gt=i=>new ye(typeof i=="string"?i:i+"",void 0,qe),x=(i,...r)=>{let e=i.length===1?i[0]:r.reduce((t,s,o)=>t+(l=>{if(l._$cssResult$===!0)return l.cssText;if(typeof l=="number")return l;throw Error("Value passed to 'css' function must be a 'css' function result: "+l+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[o+1],i[0]);return new ye(e,i,qe)},yt=(i,r)=>{if(Ee)i.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of r){let t=document.createElement("style"),s=Ce.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=e.cssText,i.appendChild(t)}},Ue=Ee?i=>i:i=>i instanceof CSSStyleSheet?(r=>{let e="";for(let t of r.cssRules)e+=t.cssText;return gt(e)})(i):i;var{is:Ut,defineProperty:Yt,getOwnPropertyDescriptor:Kt,getOwnPropertyNames:Vt,getOwnPropertySymbols:Ft,getPrototypeOf:Wt}=Object,Re=globalThis,ut=Re.trustedTypes,Jt=ut?ut.emptyScript:"",Xt=Re.reactiveElementPolyfillSupport,ue=(i,r)=>i,xe={toAttribute(i,r){switch(r){case Boolean:i=i?Jt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,r){let e=i;switch(r){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Pe=(i,r)=>!Ut(i,r),xt={attribute:!0,type:String,converter:xe,reflect:!1,useDefault:!1,hasChanged:Pe};Symbol.metadata??=Symbol("metadata"),Re.litPropertyMetadata??=new WeakMap;var z=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=xt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(r,t,e);s!==void 0&&Yt(this.prototype,r,s)}}static getPropertyDescriptor(r,e,t){let{get:s,set:o}=Kt(this.prototype,r)??{get(){return this[e]},set(l){this[e]=l}};return{get:s,set(l){let d=s?.call(this);o?.call(this,l),this.requestUpdate(r,d,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??xt}static _$Ei(){if(this.hasOwnProperty(ue("elementProperties")))return;let r=Wt(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(ue("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ue("properties"))){let e=this.properties,t=[...Vt(e),...Ft(e)];for(let s of t)this.createProperty(s,e[s])}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let s=this._$Eu(e,t);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let t=new Set(r.flat(1/0).reverse());for(let s of t)e.unshift(Ue(s))}else r!==void 0&&e.push(Ue(r));return e}static _$Eu(r,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(r.set(t,this[t]),delete this[t]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return yt(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,e,t){this._$AK(r,t)}_$ET(r,e){let t=this.constructor.elementProperties.get(r),s=this.constructor._$Eu(r,t);if(s!==void 0&&t.reflect===!0){let o=(t.converter?.toAttribute!==void 0?t.converter:xe).toAttribute(e,t.type);this._$Em=r,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(r,e){let t=this.constructor,s=t._$Eh.get(r);if(s!==void 0&&this._$Em!==s){let o=t.getPropertyOptions(s),l=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:xe;this._$Em=s;let d=l.fromAttribute(e,o.type);this[s]=d??this._$Ej?.get(s)??d,this._$Em=null}}requestUpdate(r,e,t,s=!1,o){if(r!==void 0){let l=this.constructor;if(s===!1&&(o=this[r]),t??=l.getPropertyOptions(r),!((t.hasChanged??Pe)(o,e)||t.useDefault&&t.reflect&&o===this._$Ej?.get(r)&&!this.hasAttribute(l._$Eu(r,t))))return;this.C(r,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:t,reflect:s,wrapped:o},l){t&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,l??e??this[r]),o!==!0||l!==void 0)||(this._$AL.has(r)||(this.hasUpdated||t||(e=void 0),this._$AL.set(r,e)),s===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[s,o]of t){let{wrapped:l}=o,d=this[s];l!==!0||this._$AL.has(s)||d===void 0||this.C(s,void 0,o,d)}}let r=!1,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw r=!1,this._$EM(),t}r&&this._$AE(e)}willUpdate(r){}_$AE(r){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(r){}firstUpdated(r){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[ue("elementProperties")]=new Map,z[ue("finalized")]=new Map,Xt?.({ReactiveElement:z}),(Re.reactiveElementVersions??=[]).push("2.1.2");var Xe=globalThis,ft=i=>i,Te=Xe.trustedTypes,vt=Te?Te.createPolicy("lit-html",{createHTML:i=>i}):void 0,At="$lit$",Q=`lit$${Math.random().toFixed(9).slice(2)}$`,Ct="?"+Q,Zt=`<${Ct}>`,de=document,ve=()=>de.createComment(""),be=i=>i===null||typeof i!="object"&&typeof i!="function",Ze=Array.isArray,Qt=i=>Ze(i)||typeof i?.[Symbol.iterator]=="function",Ye=`[ 	
\f\r]`,fe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,$t=/>/g,ne=RegExp(`>|${Ye}(?:([^\\s"'>=/]+)(${Ye}*=${Ye}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),wt=/'/g,kt=/"/g,Et=/^(?:script|style|textarea|title)$/i,Qe=i=>(r,...e)=>({_$litType$:i,strings:r,values:e}),a=Qe(1),S=Qe(2),_r=Qe(3),ce=Symbol.for("lit-noChange"),n=Symbol.for("lit-nothing"),St=new WeakMap,le=de.createTreeWalker(de,129);function Rt(i,r){if(!Ze(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return vt!==void 0?vt.createHTML(r):r}var er=(i,r)=>{let e=i.length-1,t=[],s,o=r===2?"<svg>":r===3?"<math>":"",l=fe;for(let d=0;d<e;d++){let p=i[d],m,h,g=-1,f=0;for(;f<p.length&&(l.lastIndex=f,h=l.exec(p),h!==null);)f=l.lastIndex,l===fe?h[1]==="!--"?l=bt:h[1]!==void 0?l=$t:h[2]!==void 0?(Et.test(h[2])&&(s=RegExp("</"+h[2],"g")),l=ne):h[3]!==void 0&&(l=ne):l===ne?h[0]===">"?(l=s??fe,g=-1):h[1]===void 0?g=-2:(g=l.lastIndex-h[2].length,m=h[1],l=h[3]===void 0?ne:h[3]==='"'?kt:wt):l===kt||l===wt?l=ne:l===bt||l===$t?l=fe:(l=ne,s=void 0);let k=l===ne&&i[d+1].startsWith("/>")?" ":"";o+=l===fe?p+Zt:g>=0?(t.push(m),p.slice(0,g)+At+p.slice(g)+Q+k):p+Q+(g===-2?d:k)}return[Rt(i,o+(i[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]},$e=class i{constructor({strings:r,_$litType$:e},t){let s;this.parts=[];let o=0,l=0,d=r.length-1,p=this.parts,[m,h]=er(r,e);if(this.el=i.createElement(m,t),le.currentNode=this.el.content,e===2||e===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=le.nextNode())!==null&&p.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(At)){let f=h[l++],k=s.getAttribute(g).split(Q),$=/([.?@])?(.*)/.exec(f);p.push({type:1,index:o,name:$[2],strings:k,ctor:$[1]==="."?Ve:$[1]==="?"?Fe:$[1]==="@"?We:ge}),s.removeAttribute(g)}else g.startsWith(Q)&&(p.push({type:6,index:o}),s.removeAttribute(g));if(Et.test(s.tagName)){let g=s.textContent.split(Q),f=g.length-1;if(f>0){s.textContent=Te?Te.emptyScript:"";for(let k=0;k<f;k++)s.append(g[k],ve()),le.nextNode(),p.push({type:2,index:++o});s.append(g[f],ve())}}}else if(s.nodeType===8)if(s.data===Ct)p.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(Q,g+1))!==-1;)p.push({type:7,index:o}),g+=Q.length-1}o++}}static createElement(r,e){let t=de.createElement("template");return t.innerHTML=r,t}};function he(i,r,e=i,t){if(r===ce)return r;let s=t!==void 0?e._$Co?.[t]:e._$Cl,o=be(r)?void 0:r._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(i),s._$AT(i,e,t)),t!==void 0?(e._$Co??=[])[t]=s:e._$Cl=s),s!==void 0&&(r=he(i,s._$AS(i,r.values),s,t)),r}var Ke=class{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:t}=this._$AD,s=(r?.creationScope??de).importNode(e,!0);le.currentNode=s;let o=le.nextNode(),l=0,d=0,p=t[0];for(;p!==void 0;){if(l===p.index){let m;p.type===2?m=new we(o,o.nextSibling,this,r):p.type===1?m=new p.ctor(o,p.name,p.strings,this,r):p.type===6&&(m=new Je(o,this,r)),this._$AV.push(m),p=t[++d]}l!==p?.index&&(o=le.nextNode(),l++)}return le.currentNode=de,s}p(r){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}},we=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,t,s){this.type=2,this._$AH=n,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=he(this,r,e),be(r)?r===n||r==null||r===""?(this._$AH!==n&&this._$AR(),this._$AH=n):r!==this._$AH&&r!==ce&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):Qt(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==n&&be(this._$AH)?this._$AA.nextSibling.data=r:this.T(de.createTextNode(r)),this._$AH=r}$(r){let{values:e,_$litType$:t}=r,s=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=$e.createElement(Rt(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(e);else{let o=new Ke(s,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(r){let e=St.get(r.strings);return e===void 0&&St.set(r.strings,e=new $e(r)),e}k(r){Ze(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,s=0;for(let o of r)s===e.length?e.push(t=new i(this.O(ve()),this.O(ve()),this,this.options)):t=e[s],t._$AI(o),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);r!==this._$AB;){let t=ft(r).nextSibling;ft(r).remove(),r=t}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},ge=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,s,o){this.type=1,this._$AH=n,this._$AN=void 0,this.element=r,this.name=e,this._$AM=s,this.options=o,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=n}_$AI(r,e=this,t,s){let o=this.strings,l=!1;if(o===void 0)r=he(this,r,e,0),l=!be(r)||r!==this._$AH&&r!==ce,l&&(this._$AH=r);else{let d=r,p,m;for(r=o[0],p=0;p<o.length-1;p++)m=he(this,d[t+p],e,p),m===ce&&(m=this._$AH[p]),l||=!be(m)||m!==this._$AH[p],m===n?r=n:r!==n&&(r+=(m??"")+o[p+1]),this._$AH[p]=m}l&&!s&&this.j(r)}j(r){r===n?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},Ve=class extends ge{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===n?void 0:r}},Fe=class extends ge{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==n)}},We=class extends ge{constructor(r,e,t,s,o){super(r,e,t,s,o),this.type=5}_$AI(r,e=this){if((r=he(this,r,e,0)??n)===ce)return;let t=this._$AH,s=r===n&&t!==n||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,o=r!==n&&(t===n||s);s&&this.element.removeEventListener(this.name,this,t),o&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},Je=class{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){he(this,r)}};var tr=Xe.litHtmlPolyfillSupport;tr?.($e,we),(Xe.litHtmlVersions??=[]).push("3.3.2");var Pt=(i,r,e)=>{let t=e?.renderBefore??r,s=t._$litPart$;if(s===void 0){let o=e?.renderBefore??null;t._$litPart$=s=new we(r.insertBefore(ve(),o),o,void 0,e??{})}return s._$AI(i),s};var et=globalThis,u=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=Pt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ce}};u._$litElement$=!0,u.finalized=!0,et.litElementHydrateSupport?.({LitElement:u});var rr=et.litElementPolyfillSupport;rr?.({LitElement:u});(et.litElementVersions??=[]).push("4.2.2");var v=i=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,r)}):customElements.define(i,r)};var ar={attribute:!0,type:String,converter:xe,reflect:!1,hasChanged:Pe},sr=(i=ar,r,e)=>{let{kind:t,metadata:s}=e,o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),t==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(e.name,i),t==="accessor"){let{name:l}=e;return{set(d){let p=r.get.call(this);r.set.call(this,d),this.requestUpdate(l,p,i,!0,d)},init(d){return d!==void 0&&this.C(l,void 0,i,d),d}}}if(t==="setter"){let{name:l}=e;return function(d){let p=this[l];r.call(this,d),this.requestUpdate(l,p,i,!0,d)}}throw Error("Unsupported decorator location: "+t)};function y(i){return(r,e)=>typeof e=="object"?sr(i,r,e):((t,s,o)=>{let l=s.hasOwnProperty(o);return s.constructor.createProperty(o,t),l?Object.getOwnPropertyDescriptor(s,o):void 0})(i,r,e)}function E(i){return y({...i,state:!0,attribute:!1})}var L={Sun:"\u2609",Moon:"\u263D",Mercury:"\u263F",Venus:"\u2640",Earth:"\u2641",Mars:"\u2642",Jupiter:"\u2643",Saturn:"\u2644",Uranus:"\u2645",Neptune:"\u2646",Pluto:"\u2647",Rahu:"\u260A",Ketu:"\u260B",Ascendant:"Asc",Lagna:"La",NorthNode:"\u260A",SouthNode:"\u260B","North node":"\u260A","South node":"\u260B",Chiron:"\u26B7",Lilith:"\u26B8","Black moon lilith":"\u26B8"},tt={Sun:"Su",Moon:"Mo",Mercury:"Me",Venus:"Ve",Mars:"Ma",Jupiter:"Ju",Saturn:"Sa",Uranus:"Ur",Neptune:"Ne",Pluto:"Pl",Rahu:"Ra",Ketu:"Ke",Ascendant:"Asc",Lagna:"La"},N={Aries:"\u2648",Taurus:"\u2649",Gemini:"\u264A",Cancer:"\u264B",Leo:"\u264C",Virgo:"\u264D",Libra:"\u264E",Scorpio:"\u264F",Sagittarius:"\u2650",Capricorn:"\u2651",Aquarius:"\u2652",Pisces:"\u2653"},rt={Aries:"Ar",Taurus:"Ta",Gemini:"Ge",Cancer:"Cn",Leo:"Le",Virgo:"Vi",Libra:"Li",Scorpio:"Sc",Sagittarius:"Sg",Capricorn:"Cp",Aquarius:"Aq",Pisces:"Pi"},pe=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],_e=pe.map(i=>i.toLowerCase());var at={heaven:"\u2630",lake:"\u2631",fire:"\u2632",thunder:"\u2633",wind:"\u2634",water:"\u2635",mountain:"\u2636",earth:"\u2637",Heaven:"\u2630",Lake:"\u2631",Fire:"\u2632",Thunder:"\u2633",Wind:"\u2634",Water:"\u2635",Mountain:"\u2636",Earth:"\u2637"},Tt={"new moon":"\u{1F311}","waxing crescent":"\u{1F312}","first quarter":"\u{1F313}","waxing gibbous":"\u{1F314}","full moon":"\u{1F315}","waning gibbous":"\u{1F316}","last quarter":"\u{1F317}","waning crescent":"\u{1F318}"};var b=x`
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
`;var or={sarva:"Sarvashtakavarga",bhinna:"Bhinnashtakavarga",pinda:"Shodhya Pinda"},me=["sarva","bhinna","pinda"],M=class extends u{constructor(){super(...arguments);this.data=null;this.activeTab="sarva"}render(){if(!this.data)return a`<div class="roxy-empty" role="status">No ashtakavarga data</div>`;let e=this.data.signs??[];return a`<div class="wrap" aria-label="Ashtakavarga grid">
			<div class="head">
				<h2 class="title">Ashtakavarga</h2>
				${e.length?a`<p class="subtitle">${e.length} signs</p>`:n}
			</div>

			<div
				class="tablist"
				role="tablist"
				aria-label="Ashtakavarga views"
				@keydown=${this.onTabKeyDown}
			>
				${me.map(t=>a`<button
						class="tab"
						role="tab"
						id="tab-${t}"
						aria-selected=${this.activeTab===t?"true":"false"}
						aria-controls="panel-${t}"
						tabindex=${this.activeTab===t?"0":"-1"}
						@click=${()=>{this.activeTab=t}}
					>
						${or[t]}
					</button>`)}
			</div>

			<div
				id="panel-${this.activeTab}"
				role="tabpanel"
				aria-labelledby="tab-${this.activeTab}"
			>
				${this.activeTab==="sarva"?this.renderSarva(e):this.activeTab==="bhinna"?this.renderBhinna(e):this.renderPinda()}
			</div>
		</div>`}onTabKeyDown(e){let t=me.indexOf(this.activeTab);e.key==="ArrowRight"?(e.preventDefault(),this.activeTab=me[(t+1)%me.length],this.focusActiveTab()):e.key==="ArrowLeft"&&(e.preventDefault(),this.activeTab=me[(t-1+me.length)%me.length],this.focusActiveTab())}focusActiveTab(){requestAnimationFrame(()=>{this.shadowRoot?.querySelector(`#tab-${this.activeTab}`)?.focus()})}heatClass(e){return e<=1?"heat-1":e<=2?"heat-2":e<=3?"heat-3":e<=4?"heat-4":e<=5?"heat-5":e<=6?"heat-6":"heat-7"}renderSarva(e){let t=this.data.sarvashtakavarga;return t?a`<div class="overflow-scroll">
			<table aria-label="Sarvashtakavarga bindu counts per sign">
				<thead>
					<tr>
						<th scope="col">Sign</th>
						<th scope="col">Bindus</th>
					</tr>
				</thead>
				<tbody>
					${e.map((s,o)=>{let l=t.bindus[o]??0,d=this.heatClass(l);return a`<tr>
							<td>
								<div class="planet-cell">
									<span class="glyph" aria-hidden="true">${N[s]??""}</span>
									${s}
								</div>
							</td>
							<td class="${`heat-cell ${d}`}">${l}</td>
						</tr>`})}
				</tbody>
				<tfoot>
					<tr class="total-row">
						<td>Total</td>
						<td>${t.total}</td>
					</tr>
				</tfoot>
			</table>
		</div>`:a`<p class="roxy-empty">No sarvashtakavarga data</p>`}renderBhinna(e){let t=this.data.bhinnashtakavarga;return t?.length?a`<div class="overflow-scroll">
			<table class="bhinna-table" aria-label="Bhinnashtakavarga planet-by-sign grid">
				<thead>
					<tr>
						<th scope="col">Planet</th>
						${e.map(s=>a`<th scope="col" title=${s}>${N[s]??s.slice(0,2)}</th>`)}
						<th scope="col">Total</th>
					</tr>
				</thead>
				<tbody>
					${t.map(s=>a`<tr>
						<td>${s.planet}</td>
						${s.bindus.map(o=>{let l=this.heatClass(o);return a`<td class="${`heat-cell ${l}`}">${o}</td>`})}
						<td>${s.total}</td>
					</tr>`)}
				</tbody>
			</table>
		</div>`:a`<p class="roxy-empty">No bhinnashtakavarga data</p>`}renderPinda(){let e=this.data.shodhyaPinda;return e?.length?a`<div class="overflow-scroll">
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
					${e.map(t=>a`<tr>
							<td>${t.planet}</td>
							<td>${t.rashiPinda}</td>
							<td>${t.grahaPinda}</td>
							<td>${t.shodhyaPinda}</td>
						</tr>`)}
				</tbody>
			</table>
		</div>`:a`<p class="roxy-empty">No shodhya pinda data</p>`}};M.styles=[b,x`
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
		`],c([y({attribute:!1})],M.prototype,"data",2),c([E()],M.prototype,"activeTab",2),M=c([v("roxy-ashtakavarga-grid")],M);var Lt={physical:"#dc2626",emotional:"#0284c7",intellectual:"#16a34a",intuitive:"#a855f7",aesthetic:"#f59e0b",awareness:"#ec4899",spiritual:"#14b8a6",passion:"#ef4444",mastery:"#6366f1",wisdom:"#475569"},D=class extends u{constructor(){super(...arguments);this.data=null;this.mode="daily"}render(){let e=this.data;return e?this.mode==="critical-days"&&"criticalDays"in e?this.renderCritical(e):this.mode==="forecast"&&"days"in e?this.renderForecast(e):this.renderDaily(e):a`<div class="roxy-empty" role="status">No biorhythm data</div>`}renderDaily(e){let t=e.quickRead??{},s=Object.entries(t).map(([o,l])=>{let d=typeof l=="number"?l:0,p=Math.abs(d)>1?d/100:d;return[o,p]});return a`<section class="wrap" aria-label="Daily biorhythm">
			<header class="head">
				<h2 class="title">Biorhythm</h2>
				${typeof e.energyRating=="number"?a`<span class="energy">Energy ${e.energyRating}/10</span>`:n}
			</header>
			<div class="bars" role="list">
				${s.map(([o,l])=>{let d=(l+1)/2*100,p=Lt[o]??"var(--roxy-accent, #f59e0b)";return a`<div class="bar" role="listitem">
						<span style="text-transform: capitalize">${o}</span>
						<span class="track">
							<span
								class="fill"
								style="width: ${d}%; background: ${p}"
							></span>
						</span>
						<span class="value">${Math.round(l*100)}%</span>
					</div>`})}
			</div>
			${e.dailyMessage?a`<p class="advice">${e.dailyMessage}</p>`:n}
			${e.advice?a`<p class="advice">${e.advice}</p>`:n}
		</section>`}renderForecast(e){let t=e.days??[];if(t.length===0)return a`<div class="roxy-empty" role="status">No forecast</div>`;let s=600,o=160,l=s/Math.max(t.length-1,1),d=["physical","emotional","intellectual","intuitive"];return a`<section class="wrap" aria-label="Biorhythm forecast">
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
				${d.map(p=>{let m=t.map((g,f)=>{let k=g[p]??0,$=f*l,pt=o/2-k/100*(o/2-8);return`${$.toFixed(2)},${pt.toFixed(2)}`}).join(" "),h=Lt[p]??"#475569";return S`<polyline points=${m} fill="none" stroke=${h} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />`})}
			</svg>
			${e.summary?.periodAdvice?a`<p class="advice">${e.summary.periodAdvice}</p>`:n}
		</section>`}renderCritical(e){return a`<section class="wrap" aria-label="Critical days">
			<header class="head">
				<h2 class="title">Critical days</h2>
				<span class="energy">${e.totalCriticalDays} total</span>
			</header>
			<div>
				${e.criticalDays.map(t=>a`<span class="crit"
						>${t.date} · ${t.cycle} ${t.severity}</span
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
		`],c([y({attribute:!1})],D.prototype,"data",2),c([y({type:String,reflect:!0})],D.prototype,"mode",2),D=c([v("roxy-biorhythm-chart")],D);function C(i){return i?i.charAt(0).toUpperCase()+i.slice(1).toLowerCase():""}function ee(i){return i.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^\w/,r=>r.toUpperCase())}function _t(i){try{let r=new Date(i);return Number.isNaN(r.getTime())?i:r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return i}}var te=class extends u{constructor(){super(...arguments);this.data=null}renderTile(e){let t=e.effect==="Good"?"good":e.effect==="Bad"?"bad":"neutral",s=L[C(e.lord)]??"",o=`${_t(e.start)} - ${_t(e.end)}`;return a`<div class="cho-tile ${t}" role="listitem">
			<span class="tile-name">${e.name}</span>
			<span class="tile-time" aria-label="Time range">${o}</span>
			<span class="tile-lord">
				${s?a`<span aria-hidden="true">${s}</span>`:n}
				${e.lord}
			</span>
		</div>`}render(){if(!this.data)return a`<div class="roxy-empty" role="status">No choghadiya data</div>`;let{date:e,dayChoghadiya:t,nightChoghadiya:s}=this.data;return a`<div class="wrap">
			<div class="header">
				<h2 class="title">Choghadiya</h2>
				${e?a`<p class="subtitle">${e}</p>`:n}
			</div>

			<div class="cho-grid">
				<section class="period-col" aria-label="Day muhurta periods">
					<h3 class="period-heading">Day</h3>
					<div role="list" aria-label="Daytime choghadiya">
						${t&&t.length>0?t.map(o=>this.renderTile(o)):a`<p class="roxy-empty" role="status">No daytime periods</p>`}
					</div>
				</section>

				<section class="period-col" aria-label="Night muhurta periods">
					<h3 class="period-heading">Night</h3>
					<div role="list" aria-label="Nighttime choghadiya">
						${s&&s.length>0?s.map(o=>this.renderTile(o)):a`<p class="roxy-empty" role="status">No nighttime periods</p>`}
					</div>
				</section>
			</div>
		</div>`}};te.styles=[b,x`
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
		`],c([y({attribute:!1})],te.prototype,"data",2),te=c([v("roxy-choghadiya-grid")],te);function O(i){if(typeof i!="string"||i.length===0||/^\d{4}-\d{2}-\d{2}$/.test(i))return"";let e=/^\d{2}:\d{2}(:\d{2})?$/.test(i)?`1970-01-01T${i}`:i,t=new Date(e);return Number.isNaN(t.getTime())?i:t.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit",hour12:!0})}function Ne(i){if(typeof i!="string"||i.length===0)return"";let r=new Date(/^\d{4}-\d{2}-\d{2}$/.test(i)?`${i}T00:00:00`:i);return Number.isNaN(r.getTime())?i:r.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}function st(i){if(!i)return"";let r=O(i.start),e=O(i.end);return r&&e?`${r} - ${e}`:r||e||""}function w(i,r=1){return typeof i!="number"||!Number.isFinite(i)?"":i.toFixed(r).replace(/\.?0+$/,"")}function Nt(i,r=1){let e=w(i,r);return e?`${e}%`:""}var ze={conjunction:"aspect-conjunction",sextile:"aspect-sextile",square:"aspect-square",trine:"aspect-trine",opposition:"aspect-opposition"};function ke(i){return(i.type??"").toLowerCase().replace(/_/g,"-")}var H=class extends u{constructor(){super(...arguments);this.data=null;this.mode="astrology"}getBreakdown(){let e=this.data;if(!e)return{};if("categories"in e&&e.categories){let t={};for(let[s,o]of Object.entries(e.categories))typeof o=="number"&&Number.isFinite(o)&&(t[s]=o);return t}return{}}render(){let e=this.data;if(!e)return a`<div class="roxy-empty" role="status">No compatibility data</div>`;let t=e.overallScore,s=this.getBreakdown(),o="rating"in e?e.rating:void 0,l="archetype"in e?e.archetype:void 0,d="advice"in e?e.advice:void 0,p="summary"in e?e.summary:void 0,m="interpretation"in e?e.interpretation:void 0,h="strengths"in e?e.strengths:void 0,g="challenges"in e?e.challenges:void 0,f="keyAspects"in e?e.keyAspects:void 0;return a`<article
			class="card"
			aria-label=${`Compatibility (${this.mode})`}
		>
			<div class="head">
				<h2>${this.mode} compatibility</h2>
				<div>
					${typeof t=="number"?a`<div class="score">${w(t,0)}</div>`:n}
					${o?a`<div class="rating">${o}</div>`:n}
				</div>
			</div>

			${Object.keys(s).length>0?a`<div role="list">
						${Object.entries(s).map(([k,$])=>a`<div class="bar-row" role="listitem">
								<span style="text-transform: capitalize">${k}</span>
								<span class="bar"
									><span style="width: ${Math.max(0,Math.min(100,$))}%"></span
								></span>
								<span>${w($,0)}</span>
							</div>`)}
					</div>`:n}
			${l?a`<p>
						<span class="archetype">${l.label}</span>
						${l.description?a` · ${l.description}`:n}
					</p>`:n}
			${p?a`<p>${p}</p>`:n}
			${m&&!p?a`<p>${m}</p>`:n}
			${d?a`<p>${d}</p>`:n}
			${(h?.length??0)>0||(g?.length??0)>0?a`<div class="lists">
						${h?.length?a`<div>
									<h3>Strengths</h3>
									<ul>
										${h.map(k=>a`<li>${k}</li>`)}
									</ul>
								</div>`:n}
						${g?.length?a`<div>
									<h3>Challenges</h3>
									<ul>
										${g.map(k=>a`<li>${k}</li>`)}
									</ul>
								</div>`:n}
					</div>`:n}
			${f?.length?a`<div>
						<h3 style="margin: 0 0 0.25rem; font-size: var(--roxy-text-xs); color: var(--roxy-muted); text-transform: uppercase; letter-spacing: 0.06em;">Key aspects</h3>
						<ul style="margin: 0; padding-left: 1rem; font-size: var(--roxy-text-sm);">
							${f.slice(0,6).map(k=>a`<li>${ir(k)}</li>`)}
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
		`],c([y({attribute:!1})],H.prototype,"data",2),c([y({type:String,reflect:!0})],H.prototype,"mode",2),H=c([v("roxy-compatibility-card")],H);function ir(i){let r=i.type.toLowerCase().replace(/_/g,"-"),e=typeof i.orb=="number"?` (orb ${w(i.orb,1)}\xB0)`:"",t=[i.planet1,r,i.planet2].filter(Boolean).join(" ");return i.description?`${t}${e} \xB7 ${i.description}`:`${t}${e}`}var G=class extends u{constructor(){super(...arguments);this.data=null;this.period="current"}render(){let e=this.data;if(!e)return a`<div class="roxy-empty" role="status">No dasha data</div>`;let t=this.collectPeriods(e),s=t.length?Math.max(...t.map(o=>o.durationYears)):0;return a`<div class="wrap" aria-label="Dasha timeline">
			<header class="head">
				<h2 class="title">
					${this.period==="major"?"Vimshottari Mahadasha":this.period==="sub"?"Antardasha":"Active dashas"}
				</h2>
				${"nakshatraName"in e&&e.nakshatraName?a`<div class="nakshatra">
						Moon nakshatra: ${e.nakshatraName}
						${"nakshatraLord"in e&&e.nakshatraLord?a`(lord ${e.nakshatraLord})`:n}
					</div>`:n}
			</header>

			${this.period==="current"?this.renderCurrent(e):n}
			${t.length>0?a`<div class="timeline" role="list">
						${t.map(o=>this.renderBar(o,s))}
					</div>`:n}
		</div>`}renderCurrent(e){return"mahadasha"in e?a`<div class="current">
			${"mahadasha"in e&&e.mahadasha?a`<div>
					<span>Mahadasha</span>
					<strong>${e.mahadasha.planet}</strong>
					${"remainingInMahadasha"in e&&e.remainingInMahadasha?a`<small>${w(e.remainingInMahadasha.years+e.remainingInMahadasha.months/12,1)} years left</small>`:n}
				</div>`:n}
			${"antardasha"in e&&e.antardasha?a`<div>
					<span>Antardasha</span>
					<strong>${e.antardasha.planet}</strong>
					${"remainingInAntardasha"in e&&e.remainingInAntardasha?a`<small>${w(e.remainingInAntardasha.years+e.remainingInAntardasha.months/12,1)} years left</small>`:n}
				</div>`:n}
			${"pratyantardasha"in e&&e.pratyantardasha?a`<div>
					<span>Pratyantardasha</span>
					<strong>${e.pratyantardasha.planet}</strong>
					${"remainingInPratyantardasha"in e&&e.remainingInPratyantardasha?a`<small>${w(e.remainingInPratyantardasha.years+e.remainingInPratyantardasha.months/12,1)} years left</small>`:n}
				</div>`:n}
		</div>`:n}collectPeriods(e){return"mahadashas"in e&&e.mahadashas?.length?e.mahadashas:"antardashas"in e&&e.antardashas?.length?e.antardashas:[]}renderBar(e,t){let s=e.durationYears,o=t>0?s/t*100:0;return a`<div class="bar" role="listitem">
			<span>${e.planet}</span>
			<span class="bar-track"><span style="width: ${o}%"></span></span>
			<span class="dates">
				${e.startDate?zt(e.startDate):""}
				${e.endDate?a`- ${zt(e.endDate)}`:""}
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
		`],c([y({attribute:!1})],G.prototype,"data",2),c([y({type:String,reflect:!0})],G.prototype,"period",2),G=c([v("roxy-dasha-timeline")],G);function zt(i){let r=i.match(/^(\d{4})/);return r?r[1]:i}var nr=["title","name","label","heading","overview","summary"],lr=["imageUrl","image","icon","symbol"],dr=["imageUrl","image"],cr=6,j=class extends u{constructor(){super(...arguments);this.data=null;this.depth=0}render(){return this.data==null?a`<div class="roxy-empty" role="status">No data</div>`:this.depth>=cr?a`<div class="roxy-empty" role="status">…</div>`:a`<div
			class="roxy-card"
			aria-label="Generic data display"
		>
			${this.renderValue(this.data)}
		</div>`}renderValue(e){return e==null?n:typeof e=="string"?a`<p>${e}</p>`:typeof e=="number"||typeof e=="boolean"?a`<p>${String(e)}</p>`:Array.isArray(e)?this.renderArray(e):this.renderObject(e)}renderArray(e){return e.length===0?a`<div class="roxy-empty" role="status">Empty list</div>`:e.every(o=>o===null||["string","number","boolean"].includes(typeof o))?a`<ul class="roxy-chips">
				${e.map(o=>a`<li>${String(o)}</li>`)}
			</ul>`:e.every(o=>o!==null&&typeof o=="object"&&!Array.isArray(o))?this.renderTable(e):a`<ol>
			${e.map(o=>a`<li>${this.renderValue(o)}</li>`)}
		</ol>`}renderTable(e){let t=this.collectKeys(e);return a`<table class="roxy-table" role="table">
			<thead>
				<tr>
					${t.map(s=>a`<th>${ee(s)}</th>`)}
				</tr>
			</thead>
			<tbody>
				${e.map(s=>a`<tr>
						${t.map(o=>a`<td>${this.formatPrimitive(s[o])}</td>`)}
					</tr>`)}
			</tbody>
		</table>`}renderObject(e){let t=nr.find(d=>typeof e[d]=="string"),s=lr.find(d=>typeof e[d]=="string"&&e[d].startsWith("http")),o=t!=="summary"&&typeof e.summary=="string"?"summary":null,l=Object.entries(e).filter(([d,p])=>d!==t&&d!==o&&!dr.includes(d)&&p!==null&&p!==void 0);return a`
			${s?a`<img
						class="roxy-image"
						src=${String(e[s])}
						alt=${t?String(e[t]):"illustration"}
						loading="lazy"
					/>`:n}
			${t?a`<h3 class="roxy-title">${e[t]}</h3>`:n}
			${o?a`<p class="roxy-summary">${e[o]}</p>`:n}
			${l.length>0?a`<dl class="roxy-rows">
						${l.map(([d,p])=>a`
								<dt>${ee(d)}</dt>
								<dd>${this.renderField(p)}</dd>
							`)}
					</dl>`:n}
		`}renderField(e){return e==null?"":typeof e=="string"?e:typeof e=="number"||typeof e=="boolean"?String(e):Array.isArray(e)&&e.every(s=>["string","number","boolean"].includes(typeof s))?a`<ul class="roxy-chips">
					${e.map(s=>a`<li>${String(s)}</li>`)}
				</ul>`:a`<roxy-data .data=${e} .depth=${this.depth+1}></roxy-data>`}formatPrimitive(e){return e==null?"":typeof e=="string"?e:typeof e=="number"||typeof e=="boolean"?String(e):Array.isArray(e)?e.map(String).join(", "):JSON.stringify(e)}collectKeys(e){let t=new Set;for(let s of e)for(let o of Object.keys(s))t.add(o);return Array.from(t)}};j.styles=[b,x`
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
		`],c([y({attribute:!1})],j.prototype,"data",2),c([y({attribute:!1})],j.prototype,"depth",2),j=c([v("roxy-data")],j);var Me=Object.fromEntries(pe.map(i=>[i.toLowerCase(),i])),pr={1:{x:150,y:58},2:{x:205,y:52},3:{x:253,y:112},4:{x:243,y:150},5:{x:253,y:188},6:{x:205,y:248},7:{x:150,y:242},8:{x:95,y:248},9:{x:47,y:188},10:{x:57,y:150},11:{x:47,y:112},12:{x:95,y:52}},mr={1:{x:150,y:35},2:{x:222,y:40},3:{x:265,y:100},4:{x:265,y:150},5:{x:265,y:200},6:{x:222,y:260},7:{x:150,y:265},8:{x:78,y:260},9:{x:35,y:200},10:{x:35,y:150},11:{x:35,y:100},12:{x:78,y:40}},hr={1:{x:150,y:60},2:{x:225,y:100},3:{x:255,y:150},4:{x:225,y:200},5:{x:150,y:240},6:{x:75,y:200},7:{x:45,y:150},8:{x:75,y:100},9:{x:100,y:80},10:{x:150,y:108},11:{x:200,y:80},12:{x:200,y:220}};function De(i){let r=pr[i.number],e=mr[i.number];if(!r||!e)return n;let t=rt[i.sign]??"",s=i.planets;return S`
		<g>
			${i.isLagna?S`<rect
							class="lagna-bg"
							x=${r.x-30} y=${r.y-28}
							width="60" height="56" rx="6"
						/>`:n}
			${t?S`<text class="sign-text" x=${e.x} y=${e.y} text-anchor="middle" dominant-baseline="central">${t}</text>`:n}
			${i.isLagna?S`<text class="lagna-marker" x=${r.x} y=${r.y-18} text-anchor="middle" dominant-baseline="central">LAGNA</text>`:n}
			${s.map((o,l)=>{let d=tt[C(o)]??o.slice(0,2),p=13,g=(i.isLagna?r.y+8:r.y)-(s.length-1)*p/2+l*p;return S`<text class="planet-text" x=${r.x} y=${g} text-anchor="middle" dominant-baseline="central">${d}</text>`})}
		</g>
	`}function Oe(){return S`
		<polygon class="line" points="150,10 290,150 150,290 10,150" stroke-width="1.5" />
		<line class="line" x1="150" y1="10" x2="150" y2="290" stroke-width="1" />
		<line class="line" x1="10" y1="150" x2="290" y2="150" stroke-width="1" />
		<line class="line" x1="150" y1="10" x2="10" y2="150" stroke-width="0.6" stroke-dasharray="3,3" />
		<line class="line" x1="150" y1="10" x2="290" y2="150" stroke-width="0.6" stroke-dasharray="3,3" />
		<line class="line" x1="150" y1="290" x2="10" y2="150" stroke-width="0.6" stroke-dasharray="3,3" />
		<line class="line" x1="150" y1="290" x2="290" y2="150" stroke-width="0.6" stroke-dasharray="3,3" />
	`}function He(i){let r=hr[i.number];if(!r)return n;let e=rt[i.sign]??"",t=i.planets;return S`
		<g>
			${i.isLagna?S`<circle class="lagna-bg" cx=${r.x} cy=${r.y} r="22" />`:n}
			${e?S`<text class="sign-text" x=${r.x} y=${r.y-10} text-anchor="middle" dominant-baseline="central">${e}</text>`:n}
			<text class="house-num" x=${r.x} y=${r.y+2} text-anchor="middle" dominant-baseline="central">${i.number}</text>
			${t.map((s,o)=>{let l=tt[C(s)]??s.slice(0,2),d=11,m=r.y+14-(t.length-1)*d/2+o*d;return S`<text class="planet-text" x=${r.x} y=${m} text-anchor="middle" dominant-baseline="central">${l}</text>`})}
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
	`}var I=class extends u{constructor(){super(...arguments);this.data=null;this.chartStyle="south"}buildHouses(){if(!this.data)return[];let e=this.data.chart,s=(this.data.chart.meta??{}).Lagna?.rashi??"",o=[];for(let l=0;l<12;l++){let d=_e[l],m=(e[d]?.signs??[]).map(g=>g.graha).filter(Boolean),h=Me[d]??"";o.push({number:l+1,sign:h,planets:m,isLagna:s?s.toLowerCase()===h.toLowerCase():!1})}return o}render(){if(!this.data)return a`<div class="roxy-empty" role="status">No divisional chart data</div>`;let{division:e,vargottama:t}=this.data,s=this.buildHouses(),o=this.chartStyle==="north";return a`<div class="wrap">
			<div class="header">
				<h2 class="title">
					D${e.number} ${e.name}
					${e.sanskritName&&e.sanskritName!==e.name?a`<span class="division-meta"> · ${e.sanskritName}</span>`:n}
				</h2>
				${e.significance?a`<p class="significance">${e.significance}</p>`:n}
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

			${t&&t.length>0?a`<div class="vargottama-row" role="list" aria-label="Vargottama planets">
						<span class="vargottama-label">Vargottama:</span>
						${t.map(l=>a`<span class="vargottama-pill" role="listitem">
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
		`],c([y({attribute:!1})],I.prototype,"data",2),c([y({type:String,reflect:!0,attribute:"chart-style"})],I.prototype,"chartStyle",2),I=c([v("roxy-divisional-chart")],I);var gr={manglik:"Mangal Dosha",kalsarpa:"Kaal Sarp Dosha",sadhesati:"Sade Sati"},B=class extends u{constructor(){super(...arguments);this.data=null;this.type="manglik"}render(){let e=this.data;if(!e)return a`<div class="roxy-empty" role="status">No dosha data</div>`;let t=!!e.present,s=gr[this.type]??this.type,o=(e.severity??"").toLowerCase(),l=o==="severe"?3:o==="moderate"?2:o==="mild"?1:0,d=l*33,p=l===3?"var(--roxy-danger)":l===2?"var(--roxy-warning)":l===1?"var(--roxy-success)":"transparent";return a`<article
			class="card"
			aria-label=${s}
		>
			<header class="head">
				<h2 class="title">${s}</h2>
				<span class=${`badge ${t?"present":"absent"}`}>
					${t?"Present":"Absent"}
				</span>
			</header>
			${e.severity?a`<div
						class="severity-bar"
						role="meter"
						aria-valuemin="0"
						aria-valuemax="3"
						aria-valuenow="${l}"
						aria-label="Severity ${e.severity}"
					>
						<span class="severity-fill" style="width: ${d}%; background: ${p};"></span>
					</div>`:n}
			${e.description?a`<p class="description">${e.description}</p>`:n}
			${this.renderEffects(e)}
			${e.remedies&&e.remedies.length>0?a`<div>
						<h3>Remedies</h3>
						<ul>
							${e.remedies.map(m=>a`<li>${m}</li>`)}
						</ul>
					</div>`:n}
			${"exceptions"in e&&e.exceptions&&e.exceptions.length>0?a`<div>
					<h3>Exceptions</h3>
					<ul>
						${e.exceptions.map(m=>a`<li>${m}</li>`)}
					</ul>
				</div>`:n}
		</article>`}renderEffects(e){if(!e.effects)return n;let t=Object.entries(e.effects).filter(([,s])=>typeof s=="string"&&s.length>0);return t.length===0?n:a`<div class="effects">
			${t.map(([s,o])=>a`<div>
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
		`],c([y({attribute:!1})],B.prototype,"data",2),c([y({type:String,reflect:!0})],B.prototype,"type",2),B=c([v("roxy-dosha-card")],B);var ot=new Map;async function yr(i){let r=ot.get(i);return r||(r=fetch(i).then(async e=>{if(!e.ok)throw new Error(`HTTP ${e.status}`);return await e.json()}).catch(e=>{throw ot.delete(i),e}),ot.set(i,r)),r}var _=class extends u{constructor(){super(...arguments);this.endpoint="vedic-astrology/birth-chart";this.method="POST";this.specUrl="https://roxyapi.com/api/v2/openapi.json";this.submitLabel="Submit";this.fields=[];this.values={};this.hasLocation=!1;this.loaded=!1;this.specError=null;this.retryLoadSchema=()=>{this.loaded=!1,this.specError=null,this.loadSchema()};this.onLocation=e=>{let t=e.detail;t&&(this.values={...this.values,latitude:t.latitude,longitude:t.longitude,timezone:t.timezone??t.utcOffset})};this.onSubmit=e=>{e.preventDefault();let t=this.fields.filter(s=>s.required).filter(s=>this.values[s.name]===void 0||this.values[s.name]==="");if(t.length>0){this.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{missing:t.map(s=>s.name)},bubbles:!0,composed:!0}));return}this.dispatchEvent(new CustomEvent("roxy-submit",{detail:{endpoint:this.endpoint,values:this.values},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.loadSchema()}async loadSchema(){this.specError=null;try{let e=await yr(this.specUrl),t=`/${this.endpoint.replace(/^\//,"")}`,s=e.paths?.[t]?.[this.method.toLowerCase()];if(!s)throw new Error(`Endpoint ${this.method} ${t} not found in OpenAPI spec`);let o=e.components?.schemas??{},l=[],d;if(s.requestBody){let m=s.requestBody.content?.["application/json"]?.schema;d=this.resolve(m,o)}if(d?.properties){let m=new Set(d.required??[]);for(let[h,g]of Object.entries(d.properties)){let f=this.resolve(g,o)??{};l.push({name:h,type:this.fieldType(f),required:m.has(h),description:f.description,enum:f.enum,min:f.minimum,max:f.maximum,default:f.default})}}for(let m of s.parameters??[])if(m.in==="path"||m.in==="query"){let h=this.resolve(m.schema,o)??{};l.push({name:m.name,type:this.fieldType(h),required:!!m.required,description:h.description,enum:h.enum,default:h.default})}this.fields=l,this.hasLocation=l.some(m=>m.name==="latitude")&&l.some(m=>m.name==="longitude")&&l.some(m=>m.name==="timezone");let p={};for(let m of l)m.default!==void 0&&(p[m.name]=m.default);this.values=p,this.loaded=!0}catch(e){let t=e instanceof Error?e.message:String(e);this.specError=t,this.loaded=!0,this.dispatchEvent(new CustomEvent("roxy-spec-error",{detail:{url:this.specUrl,message:t},bubbles:!0,composed:!0}))}}resolve(e,t){if(e){if("$ref"in e&&e.$ref){let s=e.$ref.split("/").pop();return s?t[s]:void 0}return e}}fieldType(e){return e.enum?"enum":e.format==="date"?"date":e.format==="time"?"time":e.format==="date-time"?"datetime":e.type==="integer"||e.type==="number"?"number":"text"}setValue(e,t){this.values={...this.values,[e]:t}}render(){if(!this.loaded)return a`<form><div class="roxy-skeleton" style="height: 8rem"></div></form>`;if(this.specError)return a`<div class="spec-error" role="alert">
				Schema load failed: ${this.specError}
				<button type="button" class="submit" @click=${this.retryLoadSchema}>Retry</button>
			</div>`;let e=t=>{if(this.hasLocation&&(t.name==="latitude"||t.name==="longitude"||t.name==="timezone"))return n;let s=`roxy-form-${t.name}`;return a`<div class="field">
				<label for=${s}>
					${ee(t.name)}${t.required?a`<span class="req" aria-hidden="true">*</span>`:n}
				</label>
				${t.enum?a`<select
							id=${s}
							?required=${t.required}
							@change=${o=>this.setValue(t.name,o.target.value)}
						>
							<option value="">Choose</option>
							${t.enum.map(o=>a`<option value=${o} ?selected=${this.values[t.name]===o}>
									${o}
								</option>`)}
						</select>`:a`<input
							id=${s}
							type=${this.htmlType(t.type)}
							?required=${t.required}
							min=${t.min??""}
							max=${t.max??""}
							step=${t.type==="number"?"any":""}
							.value=${this.values[t.name]??""}
							@input=${o=>this.setValue(t.name,this.coerce(t.type,o.target.value))}
						/>`}
				${t.description?a`<small class="help">${t.description}</small>`:n}
			</div>`};return a`<form @submit=${this.onSubmit}>
			<h2 class="title">${ee(this.endpoint.split("/").pop()??"")}</h2>
			${this.hasLocation?a`<div class="location-block">
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
				${this.fields.map(t=>e(t))}
			</div>
			<button class="submit" type="submit">${this.submitLabel}</button>
		</form>`}htmlType(e){switch(e){case"date":return"date";case"time":return"time";case"datetime":return"datetime-local";case"number":return"number";default:return"text"}}coerce(e,t){if(t!==""){if(e==="number"){let s=Number(t);return Number.isFinite(s)?s:void 0}return t}}};_.styles=[b,x`
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
		`],c([y({type:String,attribute:"data-endpoint"})],_.prototype,"endpoint",2),c([y({type:String})],_.prototype,"method",2),c([y({type:String,attribute:"spec-url"})],_.prototype,"specUrl",2),c([y({type:String,attribute:"submit-label"})],_.prototype,"submitLabel",2),c([E()],_.prototype,"fields",2),c([E()],_.prototype,"values",2),c([E()],_.prototype,"hasLocation",2),c([E()],_.prototype,"loaded",2),c([E()],_.prototype,"specError",2),_=c([v("roxy-endpoint-form")],_);var re=class extends u{constructor(){super(...arguments);this.data=null}render(){let e=this.data;if(!e)return a`<div class="roxy-empty" role="status">No Guna Milan data</div>`;let t=(e.breakdown??[]).filter(g=>g?.category!==void 0),s=e.total??0,o=e.maxScore??36,l=s/o*100,d="color-mix(in srgb, var(--roxy-border) 50%, transparent)",p=l>=70?"var(--roxy-success)":l>=50?"var(--roxy-warning)":"var(--roxy-danger)",m=l*2.827,h=(100-l)*2.827;return a`<article class="card" aria-label="Guna Milan score">
			<div class="score-header">
				<div class="score-info">
					<div class="score-bar">
						<div>
							<span class="total">${w(e.total,1)}</span>
							<span class="over"> / ${e.maxScore}</span>
							${typeof e.percentage=="number"?a`<small style="margin-left: 0.5rem; color: var(--roxy-muted)">
										${Nt(e.percentage,1)}
									</small>`:n}
						</div>
						${e.recommendation?a`<span class="recommendation">${e.recommendation}</span>`:n}
					</div>
				</div>
				<div class="score-ring" role="meter" aria-label="Guna milan score" aria-valuemin="0" aria-valuemax="36" aria-valuenow="${s}">
					<svg viewBox="0 0 100 100" aria-hidden="true">
						<circle class="ring-track" cx="50" cy="50" r="45" fill="none" stroke="${d}" stroke-width="8"/>
						<circle class="ring-fill" cx="50" cy="50" r="45" fill="none" stroke="${p}" stroke-width="8"
								stroke-dasharray="${m},${h}" stroke-linecap="round"
								transform="rotate(-90 50 50)"/>
						<text x="50" y="50" text-anchor="middle" dominant-baseline="central" class="ring-text">${s}</text>
						<text x="50" y="64" text-anchor="middle" dominant-baseline="central" class="ring-max">/${o}</text>
					</svg>
				</div>
			</div>

			${t.length>0?a`<table>
						<thead>
							<tr>
								<th>Category</th>
								<th>Progress</th>
								<th class="score">Score</th>
							</tr>
						</thead>
						<tbody>
							${t.map(g=>{let f=g.score??0,k=g.maxScore??ur(g.category),$=k?f/k*100:0;return a`<tr>
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
			${(e.doshas?.length??0)>0||(e.doshaCancellations?.length??0)>0?a`<div class="tags">
						${e.doshas?.map(g=>a`<span class="dosha">${g}</span>`)}
						${e.doshaCancellations?.map(g=>a`<span class="cancel" title=${g.reason}>${g.dosha} cancelled</span>`)}
					</div>`:n}
		</article>`}};re.styles=[b,x`
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
		`],c([y({attribute:!1})],re.prototype,"data",2),re=c([v("roxy-guna-milan")],re);function ur(i){if(!i)return 1;switch(i.toLowerCase()){case"varna":return 1;case"vasya":return 2;case"tara":return 3;case"yoni":return 4;case"maitri":return 5;case"gana":return 6;case"bhakoot":return 7;case"nadi":return 8;default:return 1}}var q=class extends u{constructor(){super(...arguments);this.data=null;this.mode="lookup"}resolveHexagram(){let e=this.data;if(!e)return null;if("hexagram"in e&&e.hexagram){if("lines"in e){let s=e;return{hex:s.hexagram,lines:s.lines,changingLinePositions:s.changingLinePositions,resultingHexagram:s.resultingHexagram}}let t=e;return{hex:t.hexagram,dailyMessage:t.dailyMessage}}return{hex:e}}render(){let e=this.resolveHexagram();if(!e)return a`<div class="roxy-empty" role="status">No hexagram data</div>`;let{hex:t,lines:s,changingLinePositions:o,dailyMessage:l,resultingHexagram:d}=e,p=s??this.derivedLines(t),m=new Set(o??[]);return a`<article class="card" aria-label="I Ching hexagram">
			<div class="glyphs">
				${t.symbol?a`<div class="symbol">${t.symbol}</div>`:n}
				<div class="lines" aria-hidden="true">
					${p.slice().reverse().map((h,g)=>{let f=p.length-1-g+1,k=m.has(f),$=h===6||h===8;return a`<div class="line ${`${$?"broken":"solid"}${k?" changing":""}`}">
								${$?S`<span class="seg"></span><span class="seg"></span>`:S`<span class="seg"></span>`}
							</div>`})}
				</div>
			</div>
			<div>
				<h2 class="title">
					${t.number?a`${t.number}. `:n}${t.english??t.chinese??"Hexagram"}
				</h2>
				<p class="subtitle">
					${t.chinese?a`${t.chinese}`:n}
					${t.pinyin?a` · ${t.pinyin}`:n}
				</p>
				<div class="trigrams">
					${t.upperTrigram?a`<div>
								Upper
								<span class="tri-glyph"
									>${at[t.upperTrigram]??""}</span
								>${t.upperTrigram}
							</div>`:n}
					${t.lowerTrigram?a`<div>
								Lower
								<span class="tri-glyph"
									>${at[t.lowerTrigram]??""}</span
								>${t.lowerTrigram}
							</div>`:n}
				</div>
				${t.judgment?a`<p class="judgment">${t.judgment}</p>`:n}
				${t.image?a`<p class="image">${t.image}</p>`:n}
				${l?a`<p class="message">${l}</p>`:n}
				${t.interpretation?.general?a`<p>${t.interpretation.general}</p>`:n}
				${m.size>0?a`<div class="changing">
							Changing lines: ${Array.from(m).sort((h,g)=>h-g).join(", ")}.
							${d?.english?a` Becomes hexagram ${d.number}
										${d.english}.`:n}
						</div>`:n}
			</div>
		</article>`}derivedLines(e){let t=e.symbol.codePointAt(0)??0;if(t>=19904&&t<=19967){let s=t-19904,o=[];for(let l=0;l<6;l++){let d=s>>l&1;o.push(d?8:7)}return o}return Array.from({length:6},()=>7)}};q.styles=[b,x`
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
		`],c([y({attribute:!1})],q.prototype,"data",2),c([y({type:String,reflect:!0})],q.prototype,"mode",2),q=c([v("roxy-hexagram")],q);var U=class extends u{constructor(){super(...arguments);this.data=null;this.period="daily"}render(){let e=this.data;if(!e)return a`<div class="roxy-empty" role="status">No horoscope data</div>`;let t=e.sign??"",s=t?N[C(t)]??"":"",o="energyRating"in e&&typeof e.energyRating=="number"?e.energyRating:null,l="date"in e&&e.date||"week"in e&&e.week||"month"in e&&e.month||"";return a`<article
			class="card"
			aria-label=${`${this.period} horoscope for ${t}`}
		>
			<header class="head">
				<span class="glyph" aria-hidden="true">${s}</span>
				<div>
					<h2 class="title">${t} ${this.period}</h2>
					${l?a`<div class="date">${l}</div>`:n}
				</div>
				${o!==null?a`<span class="energy" aria-label=${`Energy ${o} of 10`}>
							Energy ${o}/10
							<span class="energy-bar"
								><span style="width: ${o/10*100}%"></span
							></span>
						</span>`:n}
			</header>

			${e.overview?a`<p class="overview">${e.overview}</p>`:n}

			<div class="sections">
				${e.love?a`<div class="section">
							<h3>Love</h3>
							<p>${e.love}</p>
						</div>`:n}
				${e.career?a`<div class="section">
							<h3>Career</h3>
							<p>${e.career}</p>
						</div>`:n}
				${e.health?a`<div class="section">
							<h3>Health</h3>
							<p>${e.health}</p>
						</div>`:n}
				${e.finance?a`<div class="section">
							<h3>Finance</h3>
							<p>${e.finance}</p>
						</div>`:n}
				${"advice"in e&&e.advice?a`<div class="section">
							<h3>Advice</h3>
							<p>${e.advice}</p>
						</div>`:n}
			</div>

			${(()=>{let d="luckyNumber"in e&&e.luckyNumber!==void 0?e.luckyNumber:void 0,p="luckyColor"in e&&e.luckyColor?e.luckyColor:"",m="luckyNumbers"in e&&e.luckyNumbers?e.luckyNumbers:[],h="luckyDays"in e&&e.luckyDays?e.luckyDays:[],g=e.compatibleSigns??[];return d===void 0&&!p&&m.length===0&&h.length===0&&g.length===0?n:a`<div class="lucky">
						${d!==void 0?a`<span>Lucky number <strong>${d}</strong></span>`:n}
						${p?a`<span>Lucky color <strong>${p}</strong></span>`:n}
						${m.length?a`<span
									>Lucky numbers
									<strong>${m.join(", ")}</strong></span
								>`:n}
						${h.length?a`<span
									>Lucky days <strong>${h.join(", ")}</strong></span
								>`:n}
						${g.length?a`<span class="compat-wrap">
									Best with
									<span class="compat"
										>${g.map(f=>a`<span>${f}</span>`)}</span
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
		`],c([y({attribute:!1})],U.prototype,"data",2),c([y({type:String,reflect:!0})],U.prototype,"period",2),U=c([v("roxy-horoscope-card")],U);var ae=class extends u{constructor(){super(...arguments);this.data=null}render(){if(!this.data)return a`<div class="roxy-empty" role="status">No KP data</div>`;let e=this.data.planets??[];return a`<div
			class="wrap"
			aria-label="KP planets table"
			tabindex="0"
		>
			<header class="head">
				<h2 class="title">KP planets</h2>
				${typeof this.data.ayanamsa=="number"?a`<span class="ayanamsa">Ayanamsa: ${w(this.data.ayanamsa,2)}°</span>`:n}
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
					${e.map(t=>a`<tr>
							<td class="planet">
								${t.planet}
								${t.retrograde?a`<span class="retro">R</span>`:n}
							</td>
							<td>${t.sign??""}</td>
							<td>${t.signLord??""}</td>
							<td>${t.nakshatra??""}</td>
							<td>${t.nakshatraLord??""}</td>
							<td>${t.subLord??""}</td>
							<td>${t.subSubLord??""}</td>
							<td>${t.kpNumber??""}</td>
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
		`],c([y({attribute:!1})],ae.prototype,"data",2),ae=c([v("roxy-kp-planets-table")],ae);function je(i,r){let e,t=((...s)=>{e&&clearTimeout(e),e=setTimeout(()=>{e=void 0,i(...s)},r)});return t.cancel=()=>{e&&(clearTimeout(e),e=void 0)},t}var T=class extends u{constructor(){super(...arguments);this.endpoint="https://roxyapi.com/api/v2/location/search";this.placeholder="Search city";this.defaultValue="";this.query="";this.results=[];this.isOpen=!1;this.isLoading=!1;this.highlight=-1;this.secretKeyWarned=!1;this.debouncedFetch=je(e=>{this.fetchResults(e)},300);this.onInput=e=>{let t=e.target.value;if(this.query=t,t.length<2){this.results=[],this.isOpen=!1,this.highlight=-1;return}this.debouncedFetch(t)};this.onKeyDown=e=>{if(!this.isOpen||this.results.length===0){e.key==="ArrowDown"&&this.query.length>=2&&(this.fetchResults(this.query),e.preventDefault());return}if(e.key==="ArrowDown")e.preventDefault(),this.highlight=(this.highlight+1)%this.results.length;else if(e.key==="ArrowUp")e.preventDefault(),this.highlight=(this.highlight-1+this.results.length)%this.results.length;else if(e.key==="Enter"){e.preventDefault();let t=this.results[this.highlight]??this.results[0];t&&this.select(t)}else e.key==="Escape"&&(this.isOpen=!1)}}connectedCallback(){super.connectedCallback(),this.query=this.defaultValue,this.clickOutsideHandler=e=>{e.composedPath().includes(this)||(this.isOpen=!1)},document.addEventListener("mousedown",this.clickOutsideHandler)}disconnectedCallback(){super.disconnectedCallback(),this.clickOutsideHandler&&document.removeEventListener("mousedown",this.clickOutsideHandler),this.debouncedFetch.cancel(),this.abortController&&(this.abortController.abort(),this.abortController=void 0)}warnIfSecretKey(){if(this.secretKeyWarned||!this.apiKey||this.apiKey.startsWith("pk_"))return;this.secretKeyWarned=!0;let e="Possible secret key in client-side <roxy-location-search>; use a `pk_` publishable key with origin allowlist instead.";console.warn(e),this.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:"possible-secret-key",message:e},bubbles:!0,composed:!0}))}async fetchResults(e){this.warnIfSecretKey(),this.abortController&&this.abortController.abort();let t=new AbortController;this.abortController=t,this.isLoading=!0;try{let s=new URL(this.endpoint);s.searchParams.set("q",e),s.searchParams.set("limit","8");let o={Accept:"application/json"};this.apiKey&&(o["X-API-Key"]=this.apiKey),this.publishableKey&&(o["X-API-Key"]=this.publishableKey);let l=await fetch(s,{headers:o,signal:t.signal});if(!l.ok)throw new Error(`HTTP ${l.status}`);let d=await l.json();if(t.signal.aborted)return;this.results=d.cities??[],this.isOpen=this.results.length>0,this.highlight=this.results.length>0?0:-1}catch(s){if(s?.name==="AbortError")return;this.results=[],this.isOpen=!1}finally{this.abortController===t&&(this.abortController=void 0),t.signal.aborted||(this.isLoading=!1)}}select(e){this.query=`${e.city}${e.province?`, ${e.province}`:""}, ${e.country}`,this.isOpen=!1,this.results=[],this.dispatchEvent(new CustomEvent("roxy-location-select",{detail:e,bubbles:!0,composed:!0}))}render(){return a`<div class="field">
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
			${this.isLoading?a`<span class="spinner" role="status" aria-label="Loading"></span>`:n}
			${this.isOpen?a`<ul
						id="roxy-location-listbox"
						class="results"
						role="listbox"
					>
						${this.results.length===0?a`<li class="empty" role="status">No cities found</li>`:this.results.map((e,t)=>a`<li role="presentation">
										<button
											type="button"
											class="option"
											role="option"
											aria-selected=${this.highlight===t?"true":"false"}
											@click=${()=>this.select(e)}
											@mouseenter=${()=>{this.highlight=t}}
										>
											<span class="city">${e.city}</span>
											<span class="where"
												>${e.province?a`${e.province}, `:""}${e.country}</span
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
		`],c([y({type:String,attribute:"api-key"})],T.prototype,"apiKey",2),c([y({type:String,attribute:"publishable-key"})],T.prototype,"publishableKey",2),c([y({type:String})],T.prototype,"endpoint",2),c([y({type:String})],T.prototype,"placeholder",2),c([y({type:String,attribute:"default-value"})],T.prototype,"defaultValue",2),c([E()],T.prototype,"query",2),c([E()],T.prototype,"results",2),c([E()],T.prototype,"isOpen",2),c([E()],T.prototype,"isLoading",2),c([E()],T.prototype,"highlight",2),T=c([v("roxy-location-search")],T);var Y=class extends u{constructor(){super(...arguments);this.data=null;this.mode="current"}render(){let e=this.data;if(!e)return a`<div class="roxy-empty" role="status">No moon phase data</div>`;let t="phases"in e?e.phases:"calendar"in e?e.calendar:[];if(this.mode!=="current"&&t.length>0){let s="month"in e?e.month:void 0,o="year"in e?e.year:void 0;return a`<article
				class="card"
				aria-label="Moon phase calendar"
			>
				<h2 class="label">${s??"Moon phases"} ${o??""}</h2>
				<div class="list" role="list">
					${t.map(l=>this.renderListItem(l))}
				</div>
			</article>`}return"phase"in e?this.renderSingle(e):n}renderSingle(e){let t=Mt(e.phase);return a`<article class="card" aria-label="Current moon phase">
			<div class="hero">
				<span class="emoji" aria-hidden="true">${t}</span>
				<div>
					<h2 class="label">${e.phase??"Moon"}</h2>
					${e.date?a`<div class="date">${e.date}</div>`:n}
				</div>
			</div>
			<div class="stats">
				${typeof e.illumination=="number"?a`<div>
							<span>Illumination</span>
							<strong>${xr(e.illumination)}</strong>
						</div>`:n}
				${typeof e.age=="number"?a`<div>
							<span>Age</span>
							<strong>${w(e.age,1)} days</strong>
						</div>`:n}
				${e.sign?a`<div>
							<span>Sign</span>
							<strong>${e.sign}</strong>
						</div>`:n}
				${typeof e.distance=="number"?a`<div>
							<span>Distance</span>
							<strong>${(e.distance/1e3).toFixed(0)}k km</strong>
						</div>`:n}
			</div>
			${e.meaning?.description?a`<p class="meaning">${e.meaning.description}</p>`:n}
			${e.meaning?.keywords?.length?a`<div class="keywords">
						${e.meaning.keywords.map(s=>a`<span>${s}</span>`)}
					</div>`:n}
		</article>`}renderListItem(e){let t=Mt(e.phase);return a`<div class="list-item" role="listitem">
			<span aria-hidden="true">${t}</span>
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
		`],c([y({attribute:!1})],Y.prototype,"data",2),c([y({type:String,reflect:!0})],Y.prototype,"mode",2),Y=c([v("roxy-moon-phase")],Y);function Mt(i){return i?Tt[i.toLowerCase()]??"\u{1F319}":"\u{1F319}"}function xr(i){let r=i<=1?i*100:i;return`${Math.round(r)}%`}function R(i,r,e,t){let s=t*Math.PI/180;return{x:i+e*Math.cos(s),y:r+e*Math.sin(s)}}var lt=420,A=lt/2,it=164,fr=146,nt=120,Ie=96,vr=178,br=196,K=class extends u{constructor(){super(...arguments);this.data=null;this.houseSystem="placidus"}getPlanets(){return this.data?.planets??[]}getAscendant(){return this.data?.ascendant?.longitude??0}getMidheaven(){let e=this.data?.midheaven?.longitude;return typeof e=="number"?e:null}toAngle(e){return 180+this.getAscendant()-e}render(){if(!this.data)return a`<div class="roxy-empty" role="status">No chart data</div>`;let e=this.getPlanets(),t=this.data.aspects??[];return a`<div class="wrap">
			<header>
				<h2 class="title">Natal chart</h2>
				${this.data.birthDetails?a`<div class="meta">
							${[this.data.birthDetails.date,this.data.birthDetails.time].filter(Boolean).join(" \xB7 ")}
						</div>`:n}
			</header>
			<svg
				viewBox="0 0 ${lt} ${lt}"
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
					r=${it}
					stroke-width="1.5"
				/>
				<circle
					class="wheel-line"
					cx=${A}
					cy=${A}
					r=${nt}
					stroke-width="1"
				/>
				<circle
					class="wheel-line"
					cx=${A}
					cy=${A}
					r=${Ie-16}
					stroke-width="0.5"
				/>
				${this.renderSpokes()} ${this.renderSigns()} ${this.renderHouseNumbers()}
				${this.renderAspects(e,t)} ${this.renderPlanets(e)}
				${this.renderAngles()}
			</svg>
			<div class="legend">
				<span>${e.length} planets</span>
				<span>${t.length} aspects</span>
				<span><span class="legend-swatch" style="background: var(--roxy-success)"></span>harmonious</span>
				<span><span class="legend-swatch" style="background: var(--roxy-danger)"></span>challenging</span>
			</div>
			${this.renderDetails()}
			${this.renderInterpretations()}
		</div>`}renderAngles(){let e=this.getAscendant(),t=this.getMidheaven(),s=[this.renderAngleMark(e,"ASC")];return t!==null&&s.push(this.renderAngleMark(t,"MC")),s}renderAngleMark(e,t){let s=this.toAngle(e),o=R(A,A,it,s),l=R(A,A,vr,s),d=R(A,A,br,s);return S`
			<g>
				<line class="angle-tick" x1=${o.x} y1=${o.y} x2=${l.x} y2=${l.y} />
				<text class="angle-marker" x=${d.x} y=${d.y} text-anchor="middle" dominant-baseline="central">${t}</text>
			</g>
		`}renderSpokes(){return Array.from({length:12},(e,t)=>{let s=this.toAngle(t*30),o=R(A,A,nt,s),l=R(A,A,it,s);return S`<line class="wheel-line" x1=${o.x} y1=${o.y} x2=${l.x} y2=${l.y} stroke-width="0.8" />`})}renderSigns(){return pe.map((e,t)=>{let s=this.toAngle(t*30+15),o=R(A,A,fr,s);return S`<text class="sign-glyph" x=${o.x} y=${o.y} text-anchor="middle" dominant-baseline="central">${N[e]}</text>`})}renderHouseNumbers(){let e=Math.floor(this.getAscendant()/30);return Array.from({length:12},(t,s)=>{let o=this.toAngle(s*30+15),l=R(A,A,nt-12,o),d=(s-e+12)%12+1;return S`<text class="house-num" x=${l.x} y=${l.y} text-anchor="middle" dominant-baseline="central">${d}</text>`})}renderPlanets(e){return e.map(t=>{if(!Number.isFinite(t.longitude))return n;let s=this.toAngle(t.longitude),o=R(A,A,Ie,s),l=L[C(t.name)]??t.name.slice(0,2),d=t.isRetrograde?" R":"",p=d?`${l}\u1D3F`:l;return S`<text class="planet-glyph" x=${o.x} y=${o.y} text-anchor="middle" dominant-baseline="central"><title>${t.name}${d}</title>${p}</text>`})}renderDetails(){let e=this.data?.summary,t=this.data?.aspectsInterpretation;if(!e&&!t)return n;let s=e?.retrogradePlanets??[],o=e?.elementDistribution??{},l=e?.modalityDistribution??{},d=Math.max(1,...Object.values(o)),p=Math.max(1,...Object.values(l));return a`<div class="details">
			${e?.dominantElement||e?.dominantModality?a`<div class="pill-row">
						${e.dominantElement?a`<span class="pill">Dominant element: ${e.dominantElement}</span>`:n}
						${e.dominantModality?a`<span class="pill">Dominant modality: ${e.dominantModality}</span>`:n}
					</div>`:n}
			${t?a`<div class="pill-row">
						<span class="pill pill--success">Harmonious ${t.harmonious}</span>
						<span class="pill pill--danger">Challenging ${t.challenging}</span>
						<span class="pill pill--muted">Neutral ${t.neutral}</span>
					</div>`:n}
			${s.length>0?a`<div class="pill-row">
						${s.map(m=>{let h=L[m]??m.slice(0,2);return a`<span class="pill pill--muted">${h} ${m} R</span>`})}
					</div>`:n}
			${t?.summary?a`<p class="summary">${t.summary}</p>`:n}
			${Object.keys(o).length>0||Object.keys(l).length>0?a`<div class="dist-grid">
						${Object.keys(o).length>0?a`<div class="dist-section">
									<h3>Elements</h3>
									${Object.entries(o).map(([m,h])=>a`<div class="dist-row">
											<span>${m}</span>
											<div class="dist-bar"><span style="width: ${Math.round(h/d*100)}%"></span></div>
											<span>${h}</span>
										</div>`)}
								</div>`:n}
						${Object.keys(l).length>0?a`<div class="dist-section">
									<h3>Modalities</h3>
									${Object.entries(l).map(([m,h])=>a`<div class="dist-row">
											<span>${m}</span>
											<div class="dist-bar"><span style="width: ${Math.round(h/p*100)}%"></span></div>
											<span>${h}</span>
										</div>`)}
								</div>`:n}
					</div>`:n}
		</div>`}renderInterpretations(){let e=this.getPlanets().filter(t=>t.interpretation);return e.length===0?n:a`<section class="interpretations">
			<h3>Planet readings</h3>
			${e.map(t=>{let s=t.interpretation,o=L[C(t.name)]??"",l=w(t.degree??0,1);return a`<details class="interp-card">
					<summary>${o} ${t.name} <small>${t.sign??""} ${l}</small></summary>
					<div class="interp-body">
						${s.summary?a`<p class="interp-summary">${s.summary}</p>`:n}
						${s.detailed?a`<p class="interp-detail">${s.detailed}</p>`:n}
						${s.keywords?.length?a`<div class="interp-keywords">${s.keywords.map(d=>a`<span class="kw">${d}</span>`)}</div>`:n}
					</div>
				</details>`})}
		</section>`}renderAspects(e,t){let s=new Map;for(let o of e){if(typeof o.longitude!="number")continue;let l=C(o.name);l&&s.set(l,o.longitude)}return t.map(o=>{let l=s.get(C(o.planet1)),d=s.get(C(o.planet2));if(l===void 0||d===void 0)return n;let p=R(A,A,Ie-18,this.toAngle(l)),m=R(A,A,Ie-18,this.toAngle(d)),h=ke(o),g=ze[h]??"aspect-other",f=w(o.orb,1);return S`<line class=${`aspect ${g}`} x1=${p.x} y1=${p.y} x2=${m.x} y2=${m.y}><title>${o.planet1} ${h||""} ${o.planet2}${f?` (orb ${f}\xB0)`:""}</title></line>`})}};K.styles=[b,x`
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
		`],c([y({attribute:!1})],K.prototype,"data",2),c([y({type:String,attribute:"house-system",reflect:!0})],K.prototype,"houseSystem",2),K=c([v("roxy-natal-chart")],K);var V=class extends u{constructor(){super(...arguments);this.data=null;this.type="life-path"}render(){let e=this.data;if(!e)return a`<div class="roxy-empty" role="status">No numerology data</div>`;let t=$r[this.type]??this.type;return"coreNumbers"in e?this.renderChart(e,t):"personalYear"in e?this.renderPersonalYear(e,t):this.renderNumberCard(e,t)}renderNumberCard(e,t){let s=e.meaning?.keywords??[];return a`<article class="card" aria-label=${t}>
			<div class="hero">
				${typeof e.number=="number"?a`<div class="numeral">${e.number}</div>`:n}
				<div>
					<p class="label">${t}</p>
					${e.meaning?.title?a`<h2 class="title">${e.meaning.title}</h2>`:n}
				</div>
			</div>
			${e.meaning?.description?a`<p class="meaning">${e.meaning.description}</p>`:n}
			${e.calculation?a`<pre class="calc">${e.calculation}</pre>`:n}
			${s.length>0?a`<div class="chips">
						${s.map(o=>a`<span>${o}</span>`)}
					</div>`:n}
			${e.hasKarmicDebt&&e.karmicDebtNumber?a`<div class="karmic">
						Karmic debt ${e.karmicDebtNumber}.
						${wr(e.karmicDebtMeaning)}
					</div>`:n}
		</article>`}renderPersonalYear(e,t){return a`<article class="card" aria-label=${t}>
			<div class="hero">
				${typeof e.personalYear=="number"?a`<div class="numeral">${e.personalYear}</div>`:n}
				<div>
					<p class="label">${t}</p>
					${e.theme?a`<h2 class="title">${e.theme}</h2>`:n}
				</div>
			</div>
			${e.forecast?a`<p class="meaning">${e.forecast}</p>`:n}
			${e.advice?a`<p>${e.advice}</p>`:n}
		</article>`}renderChart(e,t){let s=Object.entries(e.coreNumbers).filter(([,o])=>o!=null);return a`<article class="card" aria-label=${t}>
			<div>
				<p class="label">${t}</p>
				${e.profile?.name?a`<h2 class="title">${e.profile.name}</h2>`:n}
			</div>
			${s.length>0?a`<div class="cores">
						${s.map(([o,l])=>a`<div class="item">
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
		`],c([y({attribute:!1})],V.prototype,"data",2),c([y({type:String,reflect:!0})],V.prototype,"type",2),V=c([v("roxy-numerology-card")],V);var $r={"life-path":"Life Path",expression:"Expression","personal-year":"Personal Year",chart:"Numerology chart"};function wr(i){return i?[i.description,i.challenge,i.resolution].filter(Boolean).join(" "):""}var F=class extends u{constructor(){super(...arguments);this.data=null;this.detail="detailed"}render(){let e=this.data;if(!e)return a`<div class="roxy-empty" role="status">No panchang data</div>`;let t="sunrise"in e?e:null,s=[["Tithi",this.formatPart(e.tithi)],["Nakshatra",this.formatPart(e.nakshatra)],["Yoga",this.formatPart(e.yoga)],["Karana",this.formatPart(e.karana)]];t&&s.push(["Vara",this.formatPart(t.vara)]);let o=t?[["Brahma Muhurta",t.brahmaMuhurta],["Abhijit Muhurta",t.abhijitMuhurta],["Vijaya Muhurta",t.vijayaMuhurta],["Godhuli Muhurta",t.godhuliMuhurta],["Nishita Muhurta",t.nishitaMuhurta],["Pratah Sandhya",t.pratahSandhya],["Sayahna Sandhya",t.sayahnaSandhya]]:[],l=t?[["Rahu Kaal",t.rahuKaal],["Yamaganda",t.yamaganda],["Gulika",t.gulika]]:[];return a`<div class="wrap" aria-label="Panchang">
			<header class="head">
				<h2 class="title">Panchang</h2>
				<span class="date">${t?Ne(t.date):""}</span>
			</header>
			<table>
				<tbody>
					${s.map(([d,p])=>a`<tr>
							<th>${d}</th>
							<td>${p}</td>
						</tr>`)}
					${t?.sunrise?a`<tr>
								<th>Sunrise</th>
								<td>${O(t.sunrise)}</td>
							</tr>`:n}
					${t?.sunset?a`<tr>
								<th>Sunset</th>
								<td>${O(t.sunset)}</td>
							</tr>`:n}
					${t?.moonrise?a`<tr>
								<th>Moonrise</th>
								<td>${O(t.moonrise)}</td>
							</tr>`:n}
					${t?.moonset?a`<tr>
								<th>Moonset</th>
								<td>${O(t.moonset)}</td>
							</tr>`:n}
				</tbody>
			</table>
			${this.detail==="detailed"&&(o.some(d=>!!d[1])||l.some(d=>!!d[1]))?a`
						<div class="section">Auspicious muhurtas</div>
						<table>
							<tbody>
								${o.filter(([,d])=>!!d).map(([d,p])=>a`<tr>
											<th>${d}</th>
											<td>${st(p)}</td>
										</tr>`)}
							</tbody>
						</table>
						<div class="section">Inauspicious periods</div>
						<table>
							<tbody>
								${l.filter(([,d])=>!!d).map(([d,p])=>a`<tr>
											<th>${d}</th>
											<td>${st(p)}</td>
										</tr>`)}
							</tbody>
						</table>
					`:n}
		</div>`}formatPart(e){if(!e)return"";if(typeof e=="string")return e;if(typeof e=="object"){let t=e;return[t.name,t.lord?`(${t.lord})`:"",t.phase].filter(Boolean).join(" ")}return String(e)}};F.styles=[b,x`
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
		`],c([y({attribute:!1})],F.prototype,"data",2),c([y({type:String,reflect:!0})],F.prototype,"detail",2),F=c([v("roxy-panchang-table")],F);var dt=[{key:"sthanaBala",label:"Sthana",color:"var(--roxy-info, #0284c7)"},{key:"digBala",label:"Dig",color:"var(--roxy-success, #16a34a)"},{key:"kalaBala",label:"Kala",color:"var(--roxy-warning, #ea580c)"},{key:"chestaBala",label:"Chesta",color:"var(--roxy-accent, #f59e0b)"},{key:"naisargikaBala",label:"Naisargika",color:"var(--roxy-secondary, #475569)"},{key:"drikBala",label:"Drik",color:"var(--roxy-danger, #dc2626)"}],se=class extends u{constructor(){super(...arguments);this.data=null}render(){if(!this.data?.planets?.length)return a`<div class="roxy-empty" role="status">No shadbala data</div>`;let e=[...this.data.planets].sort((t,s)=>t.relativeRank-s.relativeRank);return a`<div class="wrap" aria-label="Shadbala planetary strength">
			<div class="head">
				<h2 class="title">Shadbala</h2>
				<p class="subtitle">${e.length} planets ranked by strength</p>
			</div>

			<div role="list" aria-label="Planet strength bars">
				${e.map(t=>this.renderPlanetRow(t))}
			</div>

			<div class="legend" aria-label="Strength component legend">
				${dt.map(t=>a`<div class="legend-row">
						<span
							class="legend-swatch"
							style="background: ${t.color}"
							aria-hidden="true"
						></span>
						${t.label}
					</div>`)}
			</div>
		</div>`}renderPlanetRow(e){let t=L[C(e.planet)]??"",s=dt.map(h=>Math.max(0,e[h.key])),o=s.reduce((h,g)=>h+g,0),l=typeof e.strengthRatio=="number"&&e.strengthRatio>=1,d=l?"adequacy-badge--adequate":"adequacy-badge--weak",p=l?"adequate":"weak",m=w(e.totalRupas,2)&&w(e.minRequired,2)?`${w(e.totalRupas,2)} / ${w(e.minRequired,2)} R`:"";return a`<div class="planet-row" role="listitem" aria-label="${e.planet} shadbala">
			<div class="planet-label">
				<span class="glyph" aria-hidden="true">${t}</span>
				${e.planet}
				<span class="rank-badge" aria-label="rank ${e.relativeRank}">#${e.relativeRank}</span>
			</div>
			<div class="bar-wrap">
				<div class="bar" role="img" aria-label="Strength components for ${e.planet}">
					${o>0?dt.map((h,g)=>{let f=s[g];if(f<=0)return n;let k=f/o*100;return a`<div
									class="bar-segment"
									style="flex-grow: ${k}; background: ${h.color};"
									title="${h.label}: ${w(f,1)}"
								></div>`}):n}
				</div>
			</div>
			<div class="pills">
				${m?a`<span class="rupas-label">${m}</span>`:n}
				<span class="${`adequacy-badge ${d}`}">${p}</span>
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
		`],c([y({attribute:!1})],se.prototype,"data",2),se=c([v("roxy-shadbala-table")],se);var ct=360,P=ct/2,Dt=170,kr=154,Ot=124,Se=96,oe=class extends u{constructor(){super(...arguments);this.data=null}render(){if(!this.data)return a`<div class="roxy-empty" role="status">No synastry data</div>`;let{person1:e,person2:t,compatibilityScore:s,analysis:o}=this.data,l=this.data.interAspects??[],d=e?.planets??[],p=t?.planets??[],m=typeof s=="number"?Math.round(s):void 0,h=o?.overall,g=o?.strengths??[],f=o?.challenges??[];return d.length>0&&p.length>0?a`<div
			class="wrap"
			aria-label="Synastry compatibility chart"
		>
			<div class="head">
				<h2 class="title">Synastry</h2>
				${typeof m=="number"?a`<span class="score" aria-label=${`Score ${m} of 100`}
							>${m} / 100</span
						>`:n}
			</div>
			<svg
				viewBox="0 0 ${ct} ${ct}"
				role="img"
				aria-label="Dual chart wheel comparing two natal charts"
			>
				<title>Synastry dual wheel</title>
				<circle
					class="wheel-line"
					cx=${P}
					cy=${P}
					r=${Dt}
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
				${this.renderInterAspectLines(d,p,l)}
				${this.renderRing(d,Ot,"p1")} ${this.renderRing(p,Se,"p2")}
			</svg>
			<div class="legend-row">
				<span><span class="swatch" style="background: var(--roxy-accent)"></span>Person 1</span>
				<span><span class="swatch" style="background: var(--roxy-info)"></span>Person 2</span>
				<span><span class="swatch" style="background: var(--roxy-success)"></span>harmonious</span>
				<span><span class="swatch" style="background: var(--roxy-danger)"></span>challenging</span>
			</div>
			${h?a`<p class="summary">${h}</p>`:n}
			${l.length>0?this.renderAspects(l):n}
			${g.length>0||f.length>0?a`<div class="lists">
						${g.length?a`<div>
									<h3>Strengths</h3>
									<ul>
										${g.map($=>a`<li>${$}</li>`)}
									</ul>
								</div>`:n}
						${f.length?a`<div>
									<h3>Challenges</h3>
									<ul>
										${f.map($=>a`<li>${$}</li>`)}
									</ul>
								</div>`:n}
					</div>`:n}
		</div>`:a`<div
				class="wrap"
				aria-label="Synastry compatibility chart"
			>
				<div class="head">
					<h2 class="title">Synastry</h2>
					${typeof m=="number"?a`<span class="score" aria-label=${`Score ${m} of 100`}
								>${m} / 100</span
							>`:n}
				</div>
				<div class="missing-planets" role="status">
					Synastry response missing planet positions. Pass
					<code>data</code> with <code>person1.planets</code> and
					<code>person2.planets</code> arrays from the natal-chart endpoint, or
					use the <code>&lt;roxy-data&gt;</code> fallback.
				</div>
				${h?a`<p class="summary">${h}</p>`:n}
				${l.length>0?this.renderAspects(l):n}
				${g.length>0||f.length>0?a`<div class="lists">
							${g.length?a`<div>
										<h3>Strengths</h3>
										<ul>
											${g.map($=>a`<li>${$}</li>`)}
										</ul>
									</div>`:n}
							${f.length?a`<div>
										<h3>Challenges</h3>
										<ul>
											${f.map($=>a`<li>${$}</li>`)}
										</ul>
									</div>`:n}
						</div>`:n}
			</div>`}toAngle(e){return 180-e}renderSpokes(){return Array.from({length:12},(e,t)=>{let s=this.toAngle(t*30),o=R(P,P,Se-14,s),l=R(P,P,Dt,s);return S`<line class="wheel-line" x1=${o.x} y1=${o.y} x2=${l.x} y2=${l.y} stroke-width="0.6" />`})}renderSigns(){return pe.map((e,t)=>{let s=this.toAngle(t*30+15),o=R(P,P,kr,s);return S`<text class="sign" x=${o.x} y=${o.y} text-anchor="middle" dominant-baseline="central">${N[e]}</text>`})}renderRing(e,t,s){return e.map(o=>{if(!Number.isFinite(o.longitude))return n;let l=R(P,P,t,this.toAngle(o.longitude)),d=L[C(o.name)]??o.name.slice(0,2);return S`<text class=${s} x=${l.x} y=${l.y} text-anchor="middle" dominant-baseline="central"><title>${o.name}</title>${d}</text>`})}renderInterAspectLines(e,t,s){let o=(l,d)=>{let p=C(d);for(let m of l)if(C(m.name)===p&&typeof m.longitude=="number")return m.longitude};return s.map(l=>{let d=o(e,l.planet1),p=o(t,l.planet2);if(d===void 0||p===void 0)return n;let m=R(P,P,Ot-12,this.toAngle(d)),h=R(P,P,Se+8,this.toAngle(p)),g=ke(l),f=ze[g]??"aspect-other",k=w(l.orb,1);return S`<line class=${`aspect ${f}`} x1=${m.x} y1=${m.y} x2=${h.x} y2=${h.y}><title>${l.planet1} ${g} ${l.planet2}${k?` (orb ${k}\xB0)`:""}</title></line>`})}renderAspects(e){return a`<table>
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
				${e.slice(0,12).map(t=>a`<tr>
						<td>${t.planet1}</td>
						<td>${t.planet2}</td>
						<td>${ke(t)||""}</td>
						<td class="orb">${w(t.orb,1)}</td>
						<td>${Sr(t.strength)}</td>
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
		`],c([y({attribute:!1})],oe.prototype,"data",2),oe=c([v("roxy-synastry-chart")],oe);function Sr(i){return typeof i=="number"?Math.round(i).toString():""}var W=class extends u{constructor(){super(...arguments);this.data=null;this.flipped=!1;this.toggleFlip=()=>{this.flipped=!this.flipped}}render(){let e=this.data;return e?"card"in e?this.renderDailyCard(e):this.renderFullCard(e):a`<div class="roxy-empty" role="status">No tarot data</div>`}renderDailyCard(e){let t=e.card,s=this.flipped!==!!t.reversed,o=t.keywords??[];return a`<article class="card" aria-label=${t.name??"Tarot card"}>
			<div class="image-wrap">
				${t.imageUrl?a`<img
							class=${`image ${s?"reversed":""}`}
							src=${t.imageUrl}
							alt=${t.name??"Tarot card"}
							tabindex="0"
							@click=${this.toggleFlip}
							@keydown=${l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),this.toggleFlip())}}
						/>`:a`<div
							class=${`image ${s?"reversed":""}`}
							style="aspect-ratio: 0.6; display: flex; align-items: center; justify-content: center; color: var(--roxy-muted)"
						>
							${t.name??"?"}
						</div>`}
			</div>
			<div>
				<div class="meta">
					${t.arcana?a`${t.arcana} arcana`:n}
					${s?a` · reversed`:n}
				</div>
				<h2 class="title">${t.name??"Tarot card"}</h2>
				${e.dailyMessage?a`<p class="message">${e.dailyMessage}</p>`:n}
				${t.meaning?a`<p>${t.meaning}</p>`:n}
				${o.length>0?a`<div class="chips">
							${o.map(l=>a`<span>${l}</span>`)}
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
		</article>`}renderFullCard(e){let t=this.flipped,s=t?e.reversed:e.upright,o=t?e.keywords?.reversed??[]:e.keywords?.upright??[];return a`<article class="card" aria-label=${e.name??"Tarot card"}>
			<div class="image-wrap">
				${e.imageUrl?a`<img
							class=${`image ${t?"reversed":""}`}
							src=${e.imageUrl}
							alt=${e.name??"Tarot card"}
							tabindex="0"
							@click=${this.toggleFlip}
							@keydown=${l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),this.toggleFlip())}}
						/>`:a`<div
							class=${`image ${t?"reversed":""}`}
							style="aspect-ratio: 0.6; display: flex; align-items: center; justify-content: center; color: var(--roxy-muted)"
						>
							${e.name??"?"}
						</div>`}
			</div>
			<div>
				<div class="meta">
					${e.arcana?a`${e.arcana} arcana`:n}
					${e.number!==void 0&&e.number!==null?a` · ${e.number}`:n}
					${t?a` · reversed`:n}
				</div>
				<h2 class="title">${e.name??"Tarot card"}</h2>
				${s?.description?a`<p>${s.description}</p>`:n}
				${o.length>0?a`<div class="chips">
							${o.map(l=>a`<span>${l}</span>`)}
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
		`],c([y({attribute:!1})],W.prototype,"data",2),c([E()],W.prototype,"flipped",2),W=c([v("roxy-tarot-card")],W);var J=class extends u{constructor(){super(...arguments);this.data=null;this.spread="three-card"}render(){let e=this.data;if(!e)return a`<div class="roxy-empty" role="status">No tarot spread</div>`;let t="answer"in e,s="cards"in e&&!("spread"in e),o=s?[]:"positions"in e?e.positions??[]:[],l=s&&"cards"in e?e.cards:[],d=t?e.answer:void 0,p=t?e.strength:void 0,m="spread"in e?e.spread:this.spread.replace(/-/g," "),h="question"in e?e.question:void 0,g="summary"in e?e.summary:void 0,f=t?e.interpretation:void 0,k=d?d.toLowerCase().replace(/[^a-z]/g,""):"";return a`<article class="wrap" aria-label="Tarot spread">
			<header class="head">
				<h2 class="title">${m}</h2>
				${h?a`<span class="question">"${h}"</span>`:n}
			</header>
			${t?a`<div>
						<span class=${`answer ${k}`}>${d}</span>
						${p?a`<small> · ${p}</small>`:n}
					</div>`:n}
			${o.length>0?a`<div class="grid">
						${o.map($=>a`<div class="card">
								<p class="label">${$.name??""}</p>
								<div class="image">
									${$.card?.imageUrl?a`<img
												src=${$.card.imageUrl}
												alt=${$.card.name??"tarot card"}
												class=${$.card.reversed?"reversed":""}
											/>`:a`${$.card?.name??"?"}`}
								</div>
								<p class="name">
									${$.card?.name??""}
									${$.card?.reversed?a`<small>(reversed)</small>`:n}
								</p>
								${$.interpretation?a`<p class="interp">${$.interpretation}</p>`:n}
							</div>`)}
					</div>`:n}
			${l.length>0?a`<div class="grid">
						${l.map($=>a`<div class="card">
								<div class="image">
									${$.imageUrl?a`<img
												src=${$.imageUrl}
												alt=${$.name??"tarot card"}
												class=${$.reversed?"reversed":""}
											/>`:a`${$.name??"?"}`}
								</div>
								<p class="name">
									${$.name??""}
									${$.reversed?a`<small>(reversed)</small>`:n}
								</p>
								${$.meaning?a`<p class="interp">${$.meaning}</p>`:n}
							</div>`)}
					</div>`:n}
			${g?a`<p class="reading">${g}</p>`:n}
			${f?a`<p class="reading">${f}</p>`:n}
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
		`],c([y({attribute:!1})],J.prototype,"data",2),c([y({type:String,reflect:!0})],J.prototype,"spread",2),J=c([v("roxy-tarot-spread")],J);var ie=class extends u{constructor(){super(...arguments);this.data=null}render(){if(!this.data?.transitPlanets?.length)return a`<div class="roxy-empty" role="status">No transits data</div>`;let{transitDate:e,transitTime:t,transitPlanets:s,transitAspects:o,summary:l}=this.data,d=[Ne(e),O(t)].filter(Boolean).join(" ");return a`<div class="wrap" aria-label="Transit positions table">
			<div class="head">
				<h2 class="title">Transits</h2>
				${d?a`<p class="subtitle">${d}</p>`:n}
			</div>

			${l?this.renderSummaryPills(l):n}

			<div>
				<p class="section-label">Planet positions</p>
				<div class="overflow-scroll">
					${this.renderPlanetsTable(s)}
				</div>
			</div>

			${o?.length?a`<div>
						<p class="section-label">Transit aspects</p>
						<div class="overflow-scroll">
							${this.renderAspectsTable(o)}
						</div>
					</div>`:n}
		</div>`}renderSummaryPills(e){return a`<div class="summary-pills" role="region" aria-label="Aspect summary">
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
		</div>`}renderPlanetsTable(e){return a`<table class="planets-table">
			<thead>
				<tr>
					<th scope="col">Planet</th>
					<th scope="col">Sign</th>
					<th scope="col">Degree</th>
					<th scope="col">Speed</th>
				</tr>
			</thead>
			<tbody>
				${e.map(t=>{let s=L[C(t.name)]??"",o=N[C(t.sign)]??"",l=t.speed>=0?"\u2191":"\u2193";return a`<tr>
						<td>
							<div class="planet-cell">
								<span class="glyph" aria-hidden="true">${s}</span>
								${t.name}
								${t.isRetrograde?a`<span class="retro-badge" aria-label="retrograde">R</span>`:n}
							</div>
						</td>
						<td>
							<div class="planet-cell">
								<span class="glyph" aria-hidden="true">${o}</span>
								${t.sign}
							</div>
						</td>
						<td class="num">${w(t.degree,2)}</td>
						<td class="speed">
							<span class="speed-arrow" aria-hidden="true">${l}</span>
							${w(Math.abs(t.speed),4)}
						</td>
					</tr>`})}
			</tbody>
		</table>`}renderAspectsTable(e){return a`<table class="aspects-table">
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
				${e.map(t=>{let s=L[C(t.transitPlanet)]??"",o=L[C(t.natalPlanet)]??"",l=`nature-${(t.nature??"").toLowerCase()}`,d=t.interpretation?.summary??"";return a`<tr class=${d?"aspect-row":"aspect-row no-interp"}>
							<td>
								<div class="arrow-cell">
									<span class="glyph" aria-hidden="true">${s}</span>
									${t.transitPlanet}
								</div>
							</td>
							<td>
								<div class="arrow-cell">
									<span class="glyph" aria-hidden="true">${o}</span>
									${t.natalPlanet}
								</div>
							</td>
							<td class=${l}>${(t.type??"").toLowerCase()}</td>
							<td class="num">${w(t.orb,2)}</td>
							<td>${t.isApplying?"Applying":"Separating"}</td>
							<td class="num">${w(t.strength,1)}</td>
						</tr>
						${d?a`<tr class="interp-row">
										<td colspan="6">${d}</td>
									</tr>`:n}`})}
			</tbody>
		</table>`}};ie.styles=[b,x`
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
		`],c([y({attribute:!1})],ie.prototype,"data",2),ie=c([v("roxy-transits-table")],ie);var X=class extends u{constructor(){super(...arguments);this.data=null;this.chartStyle="south"}buildHouses(){if(!this.data)return[];let e=this.data,t=this.data?.meta?.Lagna?.rashi??"",s=[];for(let o=0;o<12;o++){let l=_e[o],p=(e[l]?.signs??[]).map(h=>h.graha).filter(Boolean),m=Me[l]??"";s.push({number:o+1,sign:m,planets:p,isLagna:t?t.toLowerCase()===m.toLowerCase():!1})}return s}render(){if(!this.data)return a`<div class="roxy-empty" role="status">No kundli data</div>`;let e=this.buildHouses(),t=this.chartStyle==="north";return a`<div class="wrap">
			<h2 class="title">Vedic kundli</h2>
			<svg
				viewBox="0 0 300 300"
				role="img"
				aria-label="Vedic birth chart with twelve sign houses"
			>
				<title>Vedic kundli</title>
				${t?Oe():Ge()}
				${t?e.map(s=>He(s)):e.map(s=>De(s))}
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
		`],c([y({attribute:!1})],X.prototype,"data",2),c([y({type:String,reflect:!0,attribute:"chart-style"})],X.prototype,"chartStyle",2),X=c([v("roxy-vedic-kundli")],X);var Z=class extends u{constructor(){super(...arguments);this.data=null;this.filter="";this.handleInput=je(e=>{this.filter=e.target.value},200)}renderQualityChip(e){let t=`quality-chip quality-${e}`;return a`<span class=${t}>${e}</span>`}renderDetailCard(e){return a`<div class="detail-card">
			<p class="detail-name">
				${e.name}
				${e.quality?this.renderQualityChip(e.quality):n}
			</p>
			${e.description?a`<p class="description">${e.description}</p>`:n}
			${e.result?a`<details>
						<summary>Effects</summary>
						<div class="result-body">${e.result}</div>
					</details>`:n}
		</div>`}render(){if(!this.data)return a`<div class="roxy-empty" role="status">No yoga data</div>`;let e=this.data,t=this.filter.toLowerCase();if("description"in e&&typeof e.description=="string"){let s=e;return a`<div class="wrap">${this.renderDetailCard(s)}</div>`}if("yogas"in e&&Array.isArray(e.yogas)){let s=e.yogas;if(s.length>0&&"description"in s[0]){let m=s,h=t?m.filter(f=>f.name.toLowerCase().includes(t)):m,g=e.total;return a`<div class="wrap">
					<div class="head">
						<h2 class="title">Yoga catalog</h2>
						${g!==void 0?a`<span class="count">${g} total</span>`:n}
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
						${h.length>0?h.map(f=>this.renderDetailCard(f)):a`<p class="no-results">No yogas match your search.</p>`}
					</div>
				</div>`}let l=s,d=t?l.filter(m=>m.name.toLowerCase().includes(t)):l,p=e.total;return a`<div class="wrap">
				<div class="head">
					<h2 class="title">Yoga catalog</h2>
					${p!==void 0?a`<span class="count">${p} total</span>`:n}
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
					${d.length>0?d.map(m=>a`<div class="yoga-chip">
									${m.name}
									<span class="yoga-id">${m.id}</span>
								</div>`):a`<p class="no-results">No yogas match your search.</p>`}
				</div>
			</div>`}return a`<div class="roxy-empty" role="status">No yoga data</div>`}};Z.styles=[b,x`
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
		`],c([y({attribute:!1})],Z.prototype,"data",2),c([E()],Z.prototype,"filter",2),Z=c([v("roxy-yoga-list")],Z);var Be=[{pascal:"RoxyNatalChart",tag:"roxy-natal-chart",slug:"natal-chart",heading:"Natal chart",description:"Western natal chart wheel for /astrology/natal-chart responses",docsLabel:"Western",endpointLabel:"POST /astrology/natal-chart",docsSummary:"Natal chart wheel with planet glyphs and aspect lines",topic:"Astrology"},{pascal:"RoxyHoroscopeCard",tag:"roxy-horoscope-card",slug:"horoscope-card",heading:"Daily horoscope",description:"Daily, weekly, or monthly horoscope card for /astrology/horoscope/...",docsLabel:"Western",endpointLabel:"GET /astrology/horoscope/{sign}/{daily,weekly,monthly}",docsSummary:"Daily, weekly, or monthly horoscope card",topic:"Astrology"},{pascal:"RoxySynastryChart",tag:"roxy-synastry-chart",slug:"synastry-chart",heading:"Synastry",description:"Dual-wheel synastry chart with inter-aspects table",docsLabel:"Western",endpointLabel:"POST /astrology/synastry",docsSummary:"Dual-wheel synastry with inter-aspects table",topic:"Astrology"},{pascal:"RoxyCompatibilityCard",tag:"roxy-compatibility-card",slug:"compatibility-card",heading:"Compatibility score",description:"Cross-domain compatibility score card",docsLabel:"Cross",endpointLabel:"POST /astrology/compatibility-score, /numerology/compatibility, /biorhythm/compatibility",docsSummary:"Score card with category breakdown",topic:"Astrology"},{pascal:"RoxyMoonPhase",tag:"roxy-moon-phase",slug:"moon-phase",heading:"Moon phase",description:"Moon phase card and calendar",docsLabel:"Western",endpointLabel:"GET /astrology/moon-phase/{current,upcoming,calendar/...}",docsSummary:"Moon phase card and calendar",topic:"Astrology"},{pascal:"RoxyVedicKundli",tag:"roxy-vedic-kundli",slug:"vedic-kundli",heading:"Vedic kundli",description:"South or North Indian Vedic kundli for /vedic-astrology/birth-chart",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/birth-chart",docsSummary:"South or North Indian kundli",topic:"Vedic"},{pascal:"RoxyPanchangTable",tag:"roxy-panchang-table",slug:"panchang-table",heading:"Panchang",description:"Panchang muhurta table with auspicious and inauspicious periods",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/panchang/{basic,detailed}",docsSummary:"15+ muhurtas in detailed mode",topic:"Vedic"},{pascal:"RoxyDashaTimeline",tag:"roxy-dasha-timeline",slug:"dasha-timeline",heading:"Vimshottari dasha",description:"Vimshottari dasha timeline with active mahadasha highlighted",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/dasha/{current,major,sub/...}",docsSummary:"Vimshottari mahadasha + antardasha + pratyantardasha",topic:"Vedic"},{pascal:"RoxyDoshaCard",tag:"roxy-dosha-card",slug:"dosha-card",heading:"Manglik dosha",description:"Manglik, Kaal Sarp, or Sade Sati presence card",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/dosha/{manglik,kalsarpa,sadhesati}",docsSummary:"Presence, severity, remedies, scoped effects",topic:"Vedic"},{pascal:"RoxyGunaMilan",tag:"roxy-guna-milan",slug:"guna-milan",heading:"Guna milan",description:"36-point Ashtakoota matrimonial compatibility breakdown",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/compatibility",docsSummary:"36-point Ashtakoota with eight sub-scores",topic:"Vedic"},{pascal:"RoxyKpPlanetsTable",tag:"roxy-kp-planets-table",slug:"kp-planets-table",heading:"KP planets",description:"KP planets table with sub-lord and sub-sub-lord columns",docsLabel:"Vedic (KP)",endpointLabel:"POST /vedic-astrology/kp/planets",docsSummary:"Sub-lord and sub-sub-lord columns",topic:"Vedic"},{pascal:"RoxyTransitsTable",tag:"roxy-transits-table",slug:"transits-table",heading:"Transits",description:"Live planet positions plus aspects to a natal chart",docsLabel:"Western",endpointLabel:"POST /astrology/transits",docsSummary:"Transit planet positions plus optional aspects to a natal chart",topic:"Astrology"},{pascal:"RoxyDivisionalChart",tag:"roxy-divisional-chart",slug:"divisional-chart",heading:"Divisional chart",description:"D2 to D60 varga chart wheel with Vargottama markers",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/divisional-chart",docsSummary:"Generic divisional varga wheel from D2 Hora to D60 Shashtiamsa",topic:"Vedic"},{pascal:"RoxyAshtakavargaGrid",tag:"roxy-ashtakavarga-grid",slug:"ashtakavarga-grid",heading:"Ashtakavarga",description:"Sarva and Bhinna ashtakavarga heatmap with bindu scores",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/ashtakavarga",docsSummary:"Sarva, Bhinna, and Shodhya Pinda views in a tabbed heatmap",topic:"Vedic"},{pascal:"RoxyShadbalaTable",tag:"roxy-shadbala-table",slug:"shadbala-table",heading:"Shadbala",description:"Six-fold planetary strength with adequacy badge per planet",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/shadbala",docsSummary:"Six-fold planetary strength bar plus rupas and adequacy badge",topic:"Vedic"},{pascal:"RoxyYogaList",tag:"roxy-yoga-list",slug:"yoga-list",heading:"Yoga catalog",description:"Yoga reference cards from the catalog with optional detail mode",docsLabel:"Vedic",endpointLabel:"GET /vedic-astrology/yoga, /yoga/{id}",docsSummary:"Filterable yoga cards from the 300 plus yoga catalog",topic:"Vedic"},{pascal:"RoxyChoghadiyaGrid",tag:"roxy-choghadiya-grid",slug:"choghadiya-grid",heading:"Choghadiya",description:"Day and night Choghadiya muhurta tiles for activity timing",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/panchang/choghadiya",docsSummary:"Day and night Choghadiya muhurta tiles colored by effect",topic:"Vedic"},{pascal:"RoxyNumerologyCard",tag:"roxy-numerology-card",slug:"numerology-card",heading:"Life path number",description:"Numerology card for life path, expression, personal year, or full chart",docsLabel:"Numerology",endpointLabel:"POST /numerology/{life-path,expression,personal-year,chart}",docsSummary:"Life path, expression, personal year, full chart",topic:"Numerology"},{pascal:"RoxyTarotCard",tag:"roxy-tarot-card",slug:"tarot-card",heading:"Daily tarot card",description:"Single tarot card with upright/reversed flip animation",docsLabel:"Tarot",endpointLabel:"GET /tarot/cards/{id}, POST /tarot/daily",docsSummary:"Single card with upright and reversed flip",topic:"Tarot"},{pascal:"RoxyTarotSpread",tag:"roxy-tarot-spread",slug:"tarot-spread",heading:"Three-card spread",description:"Tarot spread renderer for three-card, Celtic Cross, love, or yes/no",docsLabel:"Tarot",endpointLabel:"POST /tarot/spreads/{three-card,celtic-cross,love}, /tarot/yes-no, /tarot/draw",docsSummary:"Spreads with positions and reading",topic:"Tarot"},{pascal:"RoxyBiorhythmChart",tag:"roxy-biorhythm-chart",slug:"biorhythm-chart",heading:"Daily biorhythm",description:"Daily biorhythm bars or multi-day forecast cycle lines",docsLabel:"Biorhythm",endpointLabel:"POST /biorhythm/{daily,forecast,critical-days}",docsSummary:"Daily bars, forecast cycle lines, critical days",topic:"Biorhythm"},{pascal:"RoxyHexagram",tag:"roxy-hexagram",slug:"hexagram",heading:"I Ching hexagram",description:"I Ching hexagram with trigram glyphs, judgment, image, and changing lines",docsLabel:"I Ching",endpointLabel:"GET /iching/hexagrams/{number}, /iching/cast, POST /iching/daily, /iching/daily/cast",docsSummary:"Hexagram with trigrams, judgment, image, changing lines",topic:"I Ching"},{pascal:"RoxyEndpointForm",tag:"roxy-endpoint-form",slug:"endpoint-form",heading:"Schema-driven form",description:"Schema-driven form that emits roxy-submit with a validated payload",docsLabel:"Helper",endpointLabel:"Any endpoint via x-roxy-ui hints",docsSummary:"Schema-driven form, emits roxy-submit",topic:"Helpers",selfFetching:!0},{pascal:"RoxyLocationSearch",tag:"roxy-location-search",slug:"location-search",heading:"City search",description:"City search input with debounced /location/search calls",docsLabel:"Helper",endpointLabel:"GET /location/search",docsSummary:"Debounced city search input, emits roxy-location-select",topic:"Helpers",selfFetching:!0},{pascal:"RoxyData",tag:"roxy-data",slug:"data",heading:"Generic renderer",description:"Generic fallback renderer for any OpenAPI response shape",docsLabel:"Helper",endpointLabel:"Any response shape",docsSummary:"Generic fallback renderer for unknown shapes",topic:"Helpers",selfFetching:!0}];var Ht="0.2.1";var Ar=Be.map(i=>i.slug);return qt(Cr);})();
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
