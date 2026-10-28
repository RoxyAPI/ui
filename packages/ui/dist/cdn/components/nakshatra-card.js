var RoxyUI_nakshatra_card=(()=>{var H=Object.defineProperty;var xt=Object.getOwnPropertyDescriptor;var se=Object.getOwnPropertyNames;var ie=Object.prototype.hasOwnProperty;var ae=(o,t)=>{for(var e in t)H(o,e,{get:t[e],enumerable:!0})},de=(o,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of se(t))!ie.call(o,n)&&n!==e&&H(o,n,{get:()=>t[n],enumerable:!(r=xt(t,n))||r.enumerable});return o};var le=o=>de(H({},"__esModule",{value:!0}),o),p=(o,t,e,r)=>{for(var n=r>1?void 0:r?xt(t,e):t,s=o.length-1,i;s>=0;s--)(i=o[s])&&(n=(r?i(t,e,n):i(n))||n);return r&&n&&H(t,e,n),n};var Ge={};ae(Ge,{ROXY_UI_TOKENS_STYLE_ID:()=>W,RoxyNakshatraCard:()=>P,injectRoxyTokens:()=>J});var K=globalThis,q=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ot=Symbol(),bt=new WeakMap,F=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==ot)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(q&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=bt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&bt.set(e,t))}return t}toString(){return this.cssText}},vt=o=>new F(typeof o=="string"?o:o+"",void 0,ot),f=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((r,n,s)=>r+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+o[s+1],o[0]);return new F(e,o,ot)},St=(o,t)=>{if(q)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),n=K.litNonce;n!==void 0&&r.setAttribute("nonce",n),r.textContent=e.cssText,o.appendChild(r)}},nt=q?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return vt(e)})(o):o;var{is:ce,defineProperty:he,getOwnPropertyDescriptor:pe,getOwnPropertyNames:ue,getOwnPropertySymbols:ye,getPrototypeOf:me}=Object,D=globalThis,wt=D.trustedTypes,ge=wt?wt.emptyScript:"",fe=D.reactiveElementPolyfillSupport,L=(o,t)=>o,U={toAttribute(o,t){switch(t){case Boolean:o=o?ge:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},B=(o,t)=>!ce(o,t),Et={attribute:!0,type:String,converter:U,reflect:!1,useDefault:!1,hasChanged:B};Symbol.metadata??=Symbol("metadata"),D.litPropertyMetadata??=new WeakMap;var v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Et){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),n=this.getPropertyDescriptor(t,r,e);n!==void 0&&he(this.prototype,t,n)}}static getPropertyDescriptor(t,e,r){let{get:n,set:s}=pe(this.prototype,t)??{get(){return this[e]},set(i){this[e]=i}};return{get:n,set(i){let l=n?.call(this);s?.call(this,i),this.requestUpdate(t,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Et}static _$Ei(){if(this.hasOwnProperty(L("elementProperties")))return;let t=me(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(L("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(L("properties"))){let e=this.properties,r=[...ue(e),...ye(e)];for(let n of r)this.createProperty(n,e[n])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,n]of e)this.elementProperties.set(r,n)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let n=this._$Eu(e,r);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let n of r)e.unshift(nt(n))}else t!==void 0&&e.push(nt(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return St(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,r);if(n!==void 0&&r.reflect===!0){let s=(r.converter?.toAttribute!==void 0?r.converter:U).toAttribute(e,r.type);this._$Em=t,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){let r=this.constructor,n=r._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let s=r.getPropertyOptions(n),i=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:U;this._$Em=n;let l=i.fromAttribute(e,s.type);this[n]=l??this._$Ej?.get(n)??l,this._$Em=null}}requestUpdate(t,e,r,n=!1,s){if(t!==void 0){let i=this.constructor;if(n===!1&&(s=this[t]),r??=i.getPropertyOptions(t),!((r.hasChanged??B)(s,e)||r.useDefault&&r.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:n,wrapped:s},i){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??e??this[t]),s!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[n,s]of r){let{wrapped:i}=s,l=this[n];i!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,s,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[L("elementProperties")]=new Map,v[L("finalized")]=new Map,fe?.({ReactiveElement:v}),(D.reactiveElementVersions??=[]).push("2.1.2");var ht=globalThis,$t=o=>o,V=ht.trustedTypes,kt=V?V.createPolicy("lit-html",{createHTML:o=>o}):void 0,Rt="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,Ct="?"+w,xe=`<${Ct}>`,T=document,M=()=>T.createComment(""),G=o=>o===null||typeof o!="object"&&typeof o!="function",pt=Array.isArray,be=o=>pt(o)||typeof o?.[Symbol.iterator]=="function",st=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Tt=/-->/g,At=/>/g,$=RegExp(`>|${st}(?:([^\\s"'>=/]+)(${st}*=${st}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_t=/'/g,Pt=/"/g,Ft=/^(?:script|style|textarea|title)$/i,ut=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),c=ut(1),qe=ut(2),De=ut(3),A=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Ot=new WeakMap,k=T.createTreeWalker(T,129);function Lt(o,t){if(!pt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return kt!==void 0?kt.createHTML(t):t}var ve=(o,t)=>{let e=o.length-1,r=[],n,s=t===2?"<svg>":t===3?"<math>":"",i=N;for(let l=0;l<e;l++){let a=o[l],m,y,u=-1,b=0;for(;b<a.length&&(i.lastIndex=b,y=i.exec(a),y!==null);)b=i.lastIndex,i===N?y[1]==="!--"?i=Tt:y[1]!==void 0?i=At:y[2]!==void 0?(Ft.test(y[2])&&(n=RegExp("</"+y[2],"g")),i=$):y[3]!==void 0&&(i=$):i===$?y[0]===">"?(i=n??N,u=-1):y[1]===void 0?u=-2:(u=i.lastIndex-y[2].length,m=y[1],i=y[3]===void 0?$:y[3]==='"'?Pt:_t):i===Pt||i===_t?i=$:i===Tt||i===At?i=N:(i=$,n=void 0);let S=i===$&&o[l+1].startsWith("/>")?" ":"";s+=i===N?a+xe:u>=0?(r.push(m),a.slice(0,u)+Rt+a.slice(u)+w+S):a+w+(u===-2?l:S)}return[Lt(o,s+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},I=class o{constructor({strings:t,_$litType$:e},r){let n;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[m,y]=ve(t,e);if(this.el=o.createElement(m,r),k.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(n=k.nextNode())!==null&&a.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(let u of n.getAttributeNames())if(u.endsWith(Rt)){let b=y[i++],S=n.getAttribute(u).split(w),z=/([.?@])?(.*)/.exec(b);a.push({type:1,index:s,name:z[2],strings:S,ctor:z[1]==="."?at:z[1]==="?"?dt:z[1]==="@"?lt:R}),n.removeAttribute(u)}else u.startsWith(w)&&(a.push({type:6,index:s}),n.removeAttribute(u));if(Ft.test(n.tagName)){let u=n.textContent.split(w),b=u.length-1;if(b>0){n.textContent=V?V.emptyScript:"";for(let S=0;S<b;S++)n.append(u[S],M()),k.nextNode(),a.push({type:2,index:++s});n.append(u[b],M())}}}else if(n.nodeType===8)if(n.data===Ct)a.push({type:2,index:s});else{let u=-1;for(;(u=n.data.indexOf(w,u+1))!==-1;)a.push({type:7,index:s}),u+=w.length-1}s++}}static createElement(t,e){let r=T.createElement("template");return r.innerHTML=t,r}};function O(o,t,e=o,r){if(t===A)return t;let n=r!==void 0?e._$Co?.[r]:e._$Cl,s=G(t)?void 0:t._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),s===void 0?n=void 0:(n=new s(o),n._$AT(o,e,r)),r!==void 0?(e._$Co??=[])[r]=n:e._$Cl=n),n!==void 0&&(t=O(o,n._$AS(o,t.values),n,r)),t}var it=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,n=(t?.creationScope??T).importNode(e,!0);k.currentNode=n;let s=k.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let m;a.type===2?m=new j(s,s.nextSibling,this,t):a.type===1?m=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(m=new ct(s,this,t)),this._$AV.push(m),a=r[++l]}i!==a?.index&&(s=k.nextNode(),i++)}return k.currentNode=T,n}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},j=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,n){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=O(this,t,e),G(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):be(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&G(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,n=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=I.createElement(Lt(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===n)this._$AH.p(e);else{let s=new it(n,this),i=s.u(this.options);s.p(e),this.T(i),this._$AH=s}}_$AC(t){let e=Ot.get(t.strings);return e===void 0&&Ot.set(t.strings,e=new I(t)),e}k(t){pt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,n=0;for(let s of t)n===e.length?e.push(r=new o(this.O(M()),this.O(M()),this,this.options)):r=e[n],r._$AI(s),n++;n<e.length&&(this._$AR(r&&r._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=$t(t).nextSibling;$t(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,n,s){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=d}_$AI(t,e=this,r,n){let s=this.strings,i=!1;if(s===void 0)t=O(this,t,e,0),i=!G(t)||t!==this._$AH&&t!==A,i&&(this._$AH=t);else{let l=t,a,m;for(t=s[0],a=0;a<s.length-1;a++)m=O(this,l[r+a],e,a),m===A&&(m=this._$AH[a]),i||=!G(m)||m!==this._$AH[a],m===d?t=d:t!==d&&(t+=(m??"")+s[a+1]),this._$AH[a]=m}i&&!n&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},at=class extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},dt=class extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},lt=class extends R{constructor(t,e,r,n,s){super(t,e,r,n,s),this.type=5}_$AI(t,e=this){if((t=O(this,t,e,0)??d)===A)return;let r=this._$AH,n=t===d&&r!==d||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==d&&(r===d||n);n&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ct=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){O(this,t)}};var Se=ht.litHtmlPolyfillSupport;Se?.(I,j),(ht.litHtmlVersions??=[]).push("3.3.3");var Ut=(o,t,e)=>{let r=e?.renderBefore??t,n=r._$litPart$;if(n===void 0){let s=e?.renderBefore??null;r._$litPart$=n=new j(t.insertBefore(M(),s),s,void 0,e??{})}return n._$AI(o),n};var yt=globalThis,E=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ut(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};E._$litElement$=!0,E.finalized=!0,yt.litElementHydrateSupport?.({LitElement:E});var we=yt.litElementPolyfillSupport;we?.({LitElement:E});(yt.litElementVersions??=[]).push("4.2.2");var Nt=[{endpoint:"vedic-astrology/nakshatras/{id}",method:"GET"}];var Ee={attribute:!0,type:String,converter:U,reflect:!1,hasChanged:B},$e=(o=Ee,t,e)=>{let{kind:r,metadata:n}=e,s=globalThis.litPropertyMetadata.get(n);if(s===void 0&&globalThis.litPropertyMetadata.set(n,s=new Map),r==="setter"&&((o=Object.create(o)).wrapped=!0),s.set(e.name,o),r==="accessor"){let{name:i}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(i,a,o,!0,l)},init(l){return l!==void 0&&this.C(i,void 0,o,l),l}}}if(r==="setter"){let{name:i}=e;return function(l){let a=this[i];t.call(this,l),this.requestUpdate(i,a,o,!0,l)}}throw Error("Unsupported decorator location: "+r)};function g(o){return(t,e)=>typeof e=="object"?$e(o,t,e):((r,n,s)=>{let i=n.hasOwnProperty(s);return n.constructor.createProperty(s,r),i?Object.getOwnPropertyDescriptor(n,s):void 0})(o,t,e)}function x(o){return g({...o,state:!0,attribute:!1})}var _=o=>o??d;var Mt=["de","en","es","fr","hi","pt","ru","tr","zh-Hans","zh-Hant"];function gt(o){if(o.lang)return o.lang;if(typeof document>"u")return;let t=o.closest?.("[lang]")?.getAttribute("lang");return t||document.documentElement.lang||void 0}var ke={tw:"hant",hk:"hant",mo:"hant",cn:"hans",sg:"hans",my:"hans"};function mt(o){let t=o.toLowerCase();return Mt.find(e=>e.toLowerCase()===t)}function Gt(o){let t=gt(o);if(!t)return;let e=mt(t);if(e)return e;let r=t.toLowerCase().split("-"),n=r[0];if(n==="zh"){let s=r.find(i=>i==="hans"||i==="hant")??ke[r[1]??""];return s?mt(`zh-${s}`):void 0}return mt(n)}var It=`/**
 * Roxy UI design tokens: every colour, size, space, radius, font and duration a component reads.
 *
 * Two tiers. BASES are the few values a host tunes: fonts, base text size and its scale ratio, the
 * space unit, the base radius, motion, and the colour bases (bg, fg, accent and the four status
 * colours). Every other token DERIVES from them with calc() or color-mix(), so dark mode reassigns
 * the colour bases only and one font token restyles every heading. A host may still set any
 * derived token directly, and its value wins.
 *
 * Delivery: a global light-DOM stylesheet (linked, or injected by the CDN bundle). Custom properties
 * inherit through the shadow boundary, so a token set on any light-DOM ancestor reaches every
 * component. The :host selectors apply only if this sheet is adopted into a shadow root.
 *
 * Light is the default. Dark applies under prefers-color-scheme: dark, or [data-theme="dark"] or
 * .dark on the element or any ancestor; [data-theme="light"] or .light opts back into light. An
 * explicit choice wins over the OS because those blocks come later in source order.
 *
 * A derivation is computed where it is declared, so the derived block also matches every theme
 * trigger: a base reassigned on :root or on an element carrying data-theme, .light or .dark
 * re-derives everything below it.
 *
 * Font: --roxy-font-sans is unset by default, so every component inherits the host page font; any
 * value set by the host or a preset replaces it, and --roxy-font-display follows it until set.
 *
 * Motion: --roxy-motion-duration defaults to 200ms and prefers-reduced-motion forces 0ms.
 */

/*
 * Two mechanisms keep the host page in charge of every token, and both are load bearing.
 *
 * Every rule sits in the roxy.tokens cascade layer, and an unlayered declaration beats a layered
 * one at ANY specificity, so a plain \`:root { --roxy-accent: #8b5cf6 }\` on the host page wins, and
 * so does the same line inside a layer of its own, because this statement registers ours first
 * and the CDN bundle injects this sheet at the top of <head>. A host that links this file after its
 * own CSS orders the layers itself: \`@layer roxy, base, components, utilities;\` before either sheet.
 *
 * Every selector is ALSO wrapped in :where(), which has ZERO specificity, so a host declaration
 * still wins wherever a layer cannot decide it, under every dark signal alike.
 *
 * The theme presets in styles/themes/*.css write into roxy.theme; both files declare this order,
 * so either one loading alone still ranks a preset above these defaults.
 */
@layer roxy.tokens, roxy.theme;

@layer roxy.tokens {
	/* Bases, light. Also the mode-specific derivations: accent ink and status inks mix toward black. */
	:where(:root, :host) {
		/* A real inherited property: native controls, popups and scrollbars follow it. */
		color-scheme: light;

		--roxy-bg: #ffffff;
		--roxy-fg: #0a0a0a;
		--roxy-accent: #4a6297;
		--roxy-success: #16a34a;
		--roxy-warning: #ea580c;
		--roxy-danger: #dc2626;
		--roxy-info: #0284c7;

		/* Accent and status inks: 70 percent toward black reads at AA on the card and on a tint of the base. */
		--roxy-accent-ink: color-mix(in oklab, var(--roxy-accent) 70%, black);
		--roxy-success-fg: color-mix(in oklab, var(--roxy-success) 70%, black);
		--roxy-warning-fg: color-mix(in oklab, var(--roxy-warning) 70%, black);
		--roxy-danger-fg: color-mix(in oklab, var(--roxy-danger) 70%, black);
		--roxy-info-fg: color-mix(in oklab, var(--roxy-info) 70%, black);

		/* Unset on purpose: a component inherits the host page font until a host or preset sets one. */
		--roxy-font-sans: initial;
		--roxy-font-mono:
			ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas,
			"Liberation Mono", monospace;

		--roxy-text-base: 1rem;
		--roxy-text-scale: 1.15;
		--roxy-weight-normal: 400;
		--roxy-weight-bold: 600;
		--roxy-leading-tight: 1.25;
		--roxy-leading-normal: 1.5;
		--roxy-tracking-tight: -0.01em;
		--roxy-tracking-normal: 0em;

		--roxy-space-unit: 0.25rem;
		--roxy-radius: 6px;

		--roxy-motion-duration: 200ms;
		--roxy-motion-easing: cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Derived roles, identical in every mode, restated on every theme trigger so they follow its bases. */
	:where(:root, :host, [data-theme], .light, .dark) {
		/* Flat: the card is the page colour, separated by a hairline. */
		--roxy-surface: var(--roxy-bg);
		--roxy-primary: var(--roxy-fg);
		--roxy-secondary: color-mix(in oklab, var(--roxy-fg) 78%, var(--roxy-bg));
		--roxy-muted: color-mix(in oklab, var(--roxy-fg) 60%, var(--roxy-bg));
		--roxy-border: color-mix(in oklab, var(--roxy-fg) 14%, var(--roxy-bg));
		--roxy-ring: color-mix(in srgb, var(--roxy-accent) 40%, transparent);
		--roxy-heat: var(--roxy-danger);

		--roxy-font-display: var(--roxy-font-sans);

		--roxy-text-sm: calc(var(--roxy-text-base) / var(--roxy-text-scale));
		--roxy-text-xs: calc(var(--roxy-text-sm) / var(--roxy-text-scale));
		--roxy-text-lg: calc(var(--roxy-text-base) * var(--roxy-text-scale));
		--roxy-text-xl: calc(
			var(--roxy-text-lg) *
			var(--roxy-text-scale) *
			var(--roxy-text-scale)
		);

		--roxy-space-xs: var(--roxy-space-unit);
		--roxy-space-sm: calc(var(--roxy-space-unit) * 2);
		--roxy-space-md: calc(var(--roxy-space-unit) * 4);
		--roxy-space-lg: calc(var(--roxy-space-unit) * 6);
		--roxy-space-xl: calc(var(--roxy-space-unit) * 10);
		--roxy-line-thick: calc(var(--roxy-space-unit) / 2);
		--roxy-touch: calc(var(--roxy-space-unit) * 11);

		--roxy-radius-sm: calc(var(--roxy-radius) / 2);
		--roxy-radius-md: var(--roxy-radius);
		--roxy-radius-lg: calc(var(--roxy-radius) * 5 / 3);
		--roxy-radius-full: 9999px;

		/* Flat surfaces cast nothing; only a floating layer (a popup, an enlarged chart) lifts. */
		--roxy-shadow-sm: none;
		--roxy-shadow-md: 0 4px 12px color-mix(in srgb, black 10%, transparent);
		--roxy-shadow-lg: 0 12px 32px color-mix(in srgb, black 18%, transparent);
	}

	/* Bases, dark, by system preference. Inks mix toward white so they read on a dark card. */
	@media (prefers-color-scheme: dark) {
		:where(:root, :host) {
			color-scheme: dark;
			--roxy-bg: #0a0a0a;
			--roxy-fg: #fafafa;
			--roxy-accent: #92aade;
			--roxy-success: #22c55e;
			--roxy-warning: #fb923c;
			--roxy-danger: #ef4444;
			--roxy-info: #38bdf8;

			--roxy-accent-ink: var(--roxy-accent);
			--roxy-success-fg: color-mix(in oklab, var(--roxy-success) 70%, white);
			--roxy-warning-fg: color-mix(in oklab, var(--roxy-warning) 70%, white);
			--roxy-danger-fg: color-mix(in oklab, var(--roxy-danger) 70%, white);
			--roxy-info-fg: color-mix(in oklab, var(--roxy-info) 70%, white);
		}
	}

	/* Explicit light: beats the OS dark block when the host chooses light. */
	:where(
		:root[data-theme="light"],
		[data-theme="light"],
		:root.light,
		.light,
		:host([data-theme="light"])
	) {
		color-scheme: light;
		--roxy-bg: #ffffff;
		--roxy-fg: #0a0a0a;
		--roxy-accent: #4a6297;
		--roxy-success: #16a34a;
		--roxy-warning: #ea580c;
		--roxy-danger: #dc2626;
		--roxy-info: #0284c7;

		--roxy-accent-ink: color-mix(in oklab, var(--roxy-accent) 70%, black);
		--roxy-success-fg: color-mix(in oklab, var(--roxy-success) 70%, black);
		--roxy-warning-fg: color-mix(in oklab, var(--roxy-warning) 70%, black);
		--roxy-danger-fg: color-mix(in oklab, var(--roxy-danger) 70%, black);
		--roxy-info-fg: color-mix(in oklab, var(--roxy-info) 70%, black);
	}

	/* Explicit dark: a .dark class or data-theme="dark" on any ancestor themes every component below it. */
	:where(
		:root[data-theme="dark"],
		[data-theme="dark"],
		:root.dark,
		.dark,
		:host([data-theme="dark"])
	) {
		color-scheme: dark;
		--roxy-bg: #0a0a0a;
		--roxy-fg: #fafafa;
		--roxy-accent: #92aade;
		--roxy-success: #22c55e;
		--roxy-warning: #fb923c;
		--roxy-danger: #ef4444;
		--roxy-info: #38bdf8;

		--roxy-accent-ink: var(--roxy-accent);
		--roxy-success-fg: color-mix(in oklab, var(--roxy-success) 70%, white);
		--roxy-warning-fg: color-mix(in oklab, var(--roxy-warning) 70%, white);
		--roxy-danger-fg: color-mix(in oklab, var(--roxy-danger) 70%, white);
		--roxy-info-fg: color-mix(in oklab, var(--roxy-info) 70%, white);
	}

	@media (prefers-reduced-motion: reduce) {
		:where(:root, :host) {
			--roxy-motion-duration: 0ms;
		}
	}
}
`;var W="roxy-ui-tokens";function J(){if(typeof document>"u")return null;let o=document.getElementById(W);if(o)return o;let t=document.createElement("style");return t.id=W,t.textContent=It,document.head.prepend(t),t}function jt(o){return o.toLowerCase().replace(/[\s_-]+/g," ").trim()}var zt="__ROXY_UI_I18N__";function Ht(){let o=globalThis,t=o[zt];if(t)return t;let e={catalogs:{},fieldLabels:{},requested:new Set,listeners:new Set};return o[zt]=e,e}function Te(o,t){return t?o.replace(/\{\{(\w+)\}\}/g,(e,r)=>r in t?String(t[r]??""):e):o}function Kt(o,t,e){return Te(Ae(o,t)??t,e)}function Ae(o,t){if(!o)return;let{catalogs:e}=Ht(),r=o.toLowerCase();return(e[r]??e[r.split("-")[0]])?.[jt(t)]}function qt(o){let{listeners:t}=Ht();return t.add(o),()=>{t.delete(o)}}var X=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){this.unsubscribe=qt(()=>this.host.requestUpdate())}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}};var Z=class extends E{constructor(){super();this.translator=(e,r)=>this.t(e,r);new X(this)}connectedCallback(){super.connectedCallback(),J()}t(e,r){return Kt(this.effectiveLang(),e,r)}effectiveLang(){return gt(this)}};var Dt=f`:where([part~=card]){background:var(--roxy-surface);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-lg);box-shadow:var(--roxy-shadow-sm)}:where([part~=card] [part~=card],[part~=card] [part~=reading],[part~=card] .roxy-card){border:0;border-block-start:1px solid var(--roxy-border);box-shadow:none;background:0 0;border-radius:0;padding-inline:0}:host([bare]) [part~=card]{box-shadow:none;background:0 0;border:0;border-radius:0;padding:0}:where(h1,h2){color:var(--roxy-fg);font-size:var(--roxy-text-lg);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-tight);text-wrap:balance}:where(h3,h4,h5,h6){color:var(--roxy-fg);font-size:var(--roxy-text-base);font-weight:var(--roxy-weight-bold);line-height:var(--roxy-leading-tight);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-label,th,dt){color:var(--roxy-muted);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-normal);letter-spacing:var(--roxy-tracking-normal);text-transform:none}:where(.roxy-chips){gap:var(--roxy-space-xs);flex-wrap:wrap;margin:0;padding:0;list-style:none;display:flex}:where(.roxy-chip,.roxy-chips>li){align-items:center;gap:var(--roxy-space-xs);padding:calc(var(--roxy-space-unit) / 2) var(--roxy-space-sm);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-sm);color:var(--roxy-secondary);font-size:var(--roxy-text-xs);line-height:var(--roxy-leading-tight);overflow-wrap:anywhere;background:0 0;max-inline-size:100%;display:inline-flex}:where(.roxy-chip[data-tone=success],.roxy-chips>li[data-tone=success]){color:var(--roxy-success-fg)}:where(.roxy-chip[data-tone=warning],.roxy-chips>li[data-tone=warning]){color:var(--roxy-warning-fg)}:where(.roxy-chip[data-tone=danger],.roxy-chips>li[data-tone=danger]){color:var(--roxy-danger-fg)}:where(.roxy-chip[data-tone=info],.roxy-chips>li[data-tone=info]){color:var(--roxy-info-fg)}:where(table){border-collapse:collapse;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums}:where(th,td){padding:var(--roxy-space-xs) var(--roxy-space-sm);border-block-end:1px solid var(--roxy-border);text-align:start;vertical-align:top}:where(summary){cursor:pointer}:where(a,button,summary,input,select,textarea,[tabindex]):focus-visible{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}:where(summary:focus-visible){border-radius:var(--roxy-radius-sm)}:where(input,select,textarea,button){font:inherit}:where(input:not([type=checkbox],[type=radio],[type=range]),select,textarea){padding:var(--roxy-space-xs) var(--roxy-space-sm);background:var(--roxy-bg);color:var(--roxy-fg);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md)}`;var _e=f`:host{--roxy-label-col:minmax(0, 25%);--_mask:var(--roxy-surface);font-family:var(--roxy-font-sans);color:var(--roxy-fg);font-size:var(--roxy-text-base);line-height:var(--roxy-leading-normal);animation:roxy-fade-in var(--roxy-motion-duration) var(--roxy-motion-easing) both;background:0 0;display:block;container-type:inline-size}:host([bare]){--_mask:var(--roxy-bg)}:host([hidden]){display:none}:host([bare]){--roxy-surface:transparent;--roxy-shadow-sm:none;--roxy-shadow-md:none}*,:before,:after{box-sizing:border-box}h1,h2,h3,h4{font-family:var(--roxy-font-display)}@keyframes roxy-fade-in{0%{transform:translateY(calc(var(--roxy-space-unit) / 2))}to{transform:translateY(0)}}@media (prefers-reduced-motion:reduce){:host{animation:none}}.roxy-skeleton{background:linear-gradient(90deg, var(--roxy-border) 0%, color-mix(in srgb, var(--roxy-border) 60%, transparent) 50%, var(--roxy-border) 100%);border-radius:var(--roxy-radius-md);background-size:200% 100%;animation:1.4s ease-in-out infinite roxy-shimmer}@keyframes roxy-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.roxy-skeleton{animation:none}}.roxy-sr-only{clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0;padding:0;position:absolute;overflow:hidden}.roxy-empty{padding:var(--roxy-space-lg);color:var(--roxy-muted);text-align:center;font-size:var(--roxy-text-sm)}.roxy-error{gap:var(--roxy-space-sm);padding:var(--roxy-space-lg);background:var(--roxy-surface);border:1px solid var(--roxy-danger);border-radius:var(--roxy-radius-md);color:var(--roxy-danger-fg);font-size:var(--roxy-text-sm);justify-items:start;display:grid}:host(:focus-within) .roxy-card{outline:var(--roxy-line-thick) solid var(--roxy-ring);outline-offset:var(--roxy-line-thick)}.roxy-attribution{margin-top:var(--roxy-space-sm);font-size:var(--roxy-text-xs);color:var(--roxy-muted);text-align:right}.roxy-attribution a{color:inherit;text-decoration:none}.roxy-attribution a:hover{color:var(--roxy-accent-ink);text-decoration:underline}.roxy-edit-bar{margin-bottom:var(--roxy-space-sm);justify-content:flex-end;display:flex}.roxy-edit{padding:var(--roxy-space-xs) var(--roxy-space-md);border:1px solid var(--roxy-border);border-radius:var(--roxy-radius-md);color:var(--roxy-fg);font-family:inherit;font-size:var(--roxy-text-sm);cursor:pointer;background:0 0}.roxy-edit:hover{border-color:var(--roxy-accent);color:var(--roxy-accent-ink)}.roxy-edit:disabled{cursor:progress;color:var(--roxy-muted)}roxy-endpoint-form+*{margin-top:var(--roxy-space-md)}.roxy-more{justify-items:center;gap:var(--roxy-space-sm);margin-top:var(--roxy-space-md);display:grid}.roxy-more .roxy-edit{min-height:var(--roxy-touch)}:host{font-variant-emoji:text}`,Q=[_e,Dt];var Pe="__cols",Oe="__rows";function Re(o){return typeof o=="object"&&o!==null&&!Array.isArray(o)}function tt(o){if(Array.isArray(o)){let s=!1,i=o.map(l=>{let a=tt(l);return a!==l&&(s=!0),a});return s?i:o}if(!Re(o))return o;let t=o[Pe],e=o[Oe];if(Array.isArray(t)&&Array.isArray(e)&&Object.keys(o).length===2)return e.map(s=>{let i={};return t.forEach((l,a)=>{i[l]=tt(s[a])}),i});let r=!1,n={};for(let[s,i]of Object.entries(o)){let l=tt(i);l!==i&&(r=!0),n[s]=l}return r?n:o}function Bt(o){return tt(o)}function Vt(o,t){return o.find(e=>e.attrs&&Object.entries(e.attrs).every(([r,n])=>t[r]===n))??o[0]}var Ce="pk_live_YOUR_KEY",Yt={secret:{reason:"possible-secret-key",message:"Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side."},sample:{reason:"sample-key",message:"Replace the sample key with your own publishable key from your RoxyAPI account."}};function Wt(o){if(o)return o===Ce?Yt.sample:o.startsWith("pk_")?void 0:Yt.secret}function Jt(o,t,e={}){e.warn&&console.warn(t.message),o.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:t.reason,message:t.message},bubbles:!0,composed:!0}))}var Xt="https://roxyapi.com/api/v2";async function Fe(o){try{let t=await o.json();if(t?.error){let e=t.code==="validation_error"&&Array.isArray(t.issues)?t.issues.filter(r=>typeof r.path=="string"&&typeof r.message=="string").map(r=>({path:r.path,message:r.message})):null;return{message:t.error,issues:e?.length?e:null,worded:!0}}}catch{}return{message:`Request failed (${o.status})`,issues:null,worded:!1}}var Zt={fromAttribute:o=>{if(o!=null){try{let t=JSON.parse(o);if(t&&typeof t=="object"&&!Array.isArray(t))return t}catch{}console.warn("[roxy-ui] submit-context must be a JSON object; sending the request without it.")}}},C=class extends Error{constructor(e,r=null,n=!0){super(e);this.issues=r;this.worded=n}};function Qt(o){return o.submitUrl?void 0:Wt(o.publishableKey)}async function ft(o,t,e){let r=Qt(o);if(r)throw new C(r.message);let n=o.submitUrl?await fetch(o.submitUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:Le(t,o.submitContext),signal:e}):await Ue(o,t,e);if(!n.ok){let s=await Fe(n);throw new C(s.message,s.issues,s.worded)}return await n.json()}function Le(o,t){return JSON.stringify(t?{...o,context:t}:o)}function Ue(o,t,e){let r=new URL(`${o.baseUrl??Xt}${t.path}`,document.baseURI);for(let[s,i]of Object.entries(t.query??{}))i!=null&&r.searchParams.set(s,String(i));let n={Accept:"application/json"};return o.publishableKey&&(n["X-API-Key"]=o.publishableKey),t.body!=null&&(n["Content-Type"]="application/json"),fetch(r,{method:t.method??"GET",headers:n,body:t.body!=null?JSON.stringify(t.body):void 0,signal:e})}var et=class{constructor(t){this.baseUrl=Xt;this.worded=!0;this.host=t,t.addController(this)}hostDisconnected(){this.abort?.abort(),this.abort=void 0}async run(t){this.worded=!0;let e=Qt(this);if(e){this.host.error=e.message,Jt(this.host,e);return}this.abort?.abort();let r=new AbortController;this.abort=r,this.host.loading=!0,this.host.error=null,this.host.issues=null;try{let n=await ft(this,t,r.signal);if(r.signal.aborted)return;this.host.data=n}catch(n){if(r.signal.aborted||n?.name==="AbortError")return;n instanceof C&&(this.host.issues=n.issues),this.worded=n instanceof C&&n.worded,this.host.error=n instanceof Error?n.message:String(n)}finally{this.abort===r&&(this.abort=void 0),r.signal.aborted||(this.host.loading=!1)}}};function te(o,t,e,r=[]){let n={...e},s=`/${o.replace(/^\//,"")}`.replace(/\{([^}]+)\}/g,(m,y)=>{let u=n[y];return delete n[y],encodeURIComponent(String(u??""))}),i=new Set(r),l={},a={};for(let[m,y]of Object.entries(n))y===void 0||y===""||(t==="GET"||i.has(m)?l[m]=y:a[m]=y);return{path:s,method:t,query:l,body:t==="POST"?a:void 0}}function ee(){return c`<svg class="roxy-chevron" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}var ho=f`summary{list-style:none}summary::-webkit-details-marker{display:none}.roxy-chevron{aspect-ratio:auto;width:.7lh;height:.7lh;color:var(--roxy-muted);transition:transform var(--roxy-motion-duration) var(--roxy-motion-easing);flex-shrink:0}details[open]>summary .roxy-chevron{transform:rotate(180deg)}@media (prefers-reduced-motion:reduce){.roxy-chevron{transition:none}}`;var mo=f`.block{border-top:1px solid var(--roxy-border);padding-top:var(--roxy-space-md)}.block h3{margin:0 0 var(--roxy-space-sm)}.interp-card{padding-block:var(--roxy-space-sm)}.interp-card summary{font-weight:var(--roxy-weight-bold);color:var(--roxy-fg);align-items:center;gap:var(--roxy-space-sm);font-size:var(--roxy-text-sm);display:flex}.interp-lead{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;flex:auto;order:1;min-width:0;display:inline-flex}.interp-aside{align-items:center;gap:var(--roxy-space-sm);flex-shrink:0;order:2;display:inline-flex}.roxy-chevron{order:3}.interp-aside small{color:var(--roxy-muted);font-weight:var(--roxy-weight-normal);white-space:nowrap}@container (width<=26rem){.interp-card summary{flex-wrap:wrap}.roxy-chevron{order:2}.interp-aside{flex-basis:100%;order:3;justify-content:flex-end}}.interp-body{margin-top:var(--roxy-space-sm);gap:var(--roxy-space-sm);color:var(--roxy-fg);font-size:var(--roxy-text-sm);line-height:var(--roxy-leading-normal);overflow-wrap:anywhere;display:grid}.interp-body p{margin:0}`;function re(o,t,e){let r=o.filter(n=>!!n.body);return r.length===0?d:c`<section class="block" part="section readings"><h3>${e}</h3>${r.map((n,s)=>c`<details class="interp-card" part="reading" name="${t}" ?open="${s===0}"><summary><span class="interp-lead">${n.label}</span> ${ee()} ${n.aside?c`<span class="interp-aside"><small>${n.aside}</small></span>`:d}</summary><div class="interp-body"><p>${n.body}</p>${n.extra??d}</div></details>`)}</section>`}var Ne="roxy-data";function Me(o){return o.nodeName==="SCRIPT"&&o.getAttribute("type")==="application/json"}var rt=class{constructor(t){this.host=t,t.addController(this)}hostConnected(){if(this.host.data!=null)return;let t=this.read();t!==void 0&&(this.host.data=t,this.host.requestUpdate())}read(){let t=this.findInlineScript();return t?this.parse(t.textContent):void 0}findInlineScript(){for(let t of Array.from(this.host.children))if(Me(t)&&t.classList.contains(Ne))return t;return null}parse(t){if(t?.trim())try{return JSON.parse(t)}catch{return}}};var h=class extends Z{constructor(){super();this.data=null;this.endpoint="";this.remember=!1;this.hideReadings=!1;this.hideSections="";this.loading=!1;this.error=null;this.issues=null;this.selfFetched=!1;this.editing=!1;this.sticky=!1;this.hostLoaded=!1;this.moreLoading=!1;this.moreError=null;this.onMore=async()=>{let e=this.lastRequest,r=this.listKey,n=this.listRows();if(!(!e||!r||!n)){this.moreLoading=!0,this.moreError=null;try{let s=await ft(this.fetcher,{...e,query:{...e.query,offset:n.length}});if(this.lastRequest!==e)return;let i=s[r];this.data={...this.data,...s,[r]:[...n,...Array.isArray(i)?i:[]]}}catch(s){this.lastRequest===e&&(this.moreError=s instanceof Error?s.message:String(s))}finally{this.moreLoading=!1}}};this.onEdit=()=>{this.editing=!0};this.onFormSubmit=e=>{let r=this.selfFetch();if(!r)return;let n=e.detail;this.lastValues=n.values,this.sticky=!!n.sticky,this.selfFetched=!0,this.editing=!1,this.remember&&this.writeRemembered(n.values),this.fetchFresh(te(r.endpoint,r.method,n.values,n.queryKeys??[]))};new rt(this),this.fetcher=new et(this)}static{this.styles=[Q]}static{this.endpoints=[]}willUpdate(e){if(e.has("data")&&this.data!=null){let r=Bt(this.data);r!==this.data&&(this.data=r)}(e.has("publishableKey")||e.has("baseUrl")||e.has("submitUrl")||e.has("submitContext"))&&this.syncFetcher()}syncFetcher(){this.fetcher.publishableKey=this.publishableKey,this.baseUrl&&(this.fetcher.baseUrl=this.baseUrl),this.fetcher.submitUrl=this.submitUrl,this.fetcher.submitContext=this.submitContext}selfFetch(){let e=this.endpoint?{endpoint:this.endpoint,method:"POST"}:this.hostLoaded||!(this.publishableKey||this.submitUrl)?void 0:Vt(this.constructor.endpoints,this);return e&&{endpoint:e.endpoint,method:this.method??e.method}}render(){return c`${this.hiddenSectionsStyle()}${this.renderState()}`}drawn(e){try{return this.renderData(e)}catch(r){return console.warn(`[roxy-ui] ${this.localName} could not draw its response`,r),this.dispatchEvent(new CustomEvent("roxy-render-error",{detail:{error:r},bubbles:!0,composed:!0})),customElements.get("roxy-data")?c`<roxy-data .data="${e}" lang="${_(this.effectiveLang())}"></roxy-data>`:this.renderEmpty()}}hiddenSectionsStyle(){let e=this.hideSections.split(",").map(n=>n.trim().toLowerCase()).filter(n=>/^[a-z][a-z0-9-]*$/.test(n));if(e.length===0)return d;let r=e.map(n=>`[part~="${n}"],roxy-endpoint-form::part(${n}){display:none!important}`).join("");return c`<style>${r}</style>`}renderState(){return this.selfFetch()&&this.sticky&&this.selfFetched&&!this.editing?this.renderWithForm(this.stickyBody()):this.loading?this.renderLoading():this.error!=null?this.renderError(this.error):this.data!=null?this.selfFetched?this.editing?this.renderForm():this.renderResult(this.data):this.showAttribution()?c`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data):this.renderNoData()}renderInterpretation(e,r,n){return this.hideReadings?d:re(e,r,this.t(n??"Reading"))}renderResult(e){let r=c`<div class="roxy-edit-bar" part="edit-bar"><button type="button" class="roxy-edit" @click="${this.onEdit}">${this.t("Edit query")}</button></div>${this.drawn(e)}`;return this.showAttribution()?c`${r}${this.renderAttribution()}`:r}renderWithForm(e){return c`${this.renderForm()}${e}`}stickyBody(){return this.loading?this.renderLoading():this.error!=null?this.issues?d:this.renderErrorBanner(this.error):this.data==null?d:this.showAttribution()?c`${this.drawn(this.data)}${this.renderAttribution()}`:this.drawn(this.data)}renderMore(){let e=this.listRows(),r=this.data?.total;return!this.lastRequest||!e||typeof r!="number"?d:e.length>=r?d:c`<div class="roxy-more" part="more"><button type="button" class="roxy-edit" ?disabled="${this.moreLoading}" aria-busy="${this.moreLoading?"true":"false"}" @click="${this.onMore}">${this.t("Show more")}</button> ${this.moreError?c`<p class="roxy-error" role="alert">${this.t(this.moreError)}</p>`:d}</div>`}listRows(){let e=this.listKey?this.data?.[this.listKey]:void 0;return Array.isArray(e)?e:void 0}fetchFresh(e){return this.lastRequest=e,this.openedRow=void 0,this.openedRowId=void 0,this.moreError=null,this.fetcher.run(e)}load(e){return this.hostLoaded=!0,this.syncFetcher(),this.fetchFresh(e)}pickRow(e){this.dispatchEvent(new CustomEvent("roxy-symbol-select",{detail:e,bubbles:!0,composed:!0})),this.openRow(e.id)}openRow(e){if(!this.rowDetail||!(this.publishableKey||this.submitUrl))return;let r=this.openedRow??document.createElement(this.rowDetail.tag);r.publishableKey=this.publishableKey,r.baseUrl=this.baseUrl,r.submitUrl=this.submitUrl,r.submitContext=this.submitContext,r.hideReadings=this.hideReadings,r.hideSections=this.hideSections;let n=this.effectiveLang();n&&r.setAttribute("lang",n),this.openedRow=r,this.openedRowId=e,r.load({path:`/${this.rowDetail.path.replace("{id}",encodeURIComponent(e))}`,method:"GET",query:{lang:Gt(this)}}).then(()=>r.scrollIntoView?.({block:"nearest"}))}showAttribution(){return this.attribution!=null&&this.attribution!=="off"&&this.attribution!=="false"}renderAttribution(){return c`<div class="roxy-attribution" part="attribution"><a href="https://roxyapi.com/?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener">${this.t("Spiritual data by RoxyAPI")}</a></div>`}renderNoData(){return this.selfFetch()?this.renderWithForm(d):this.renderEmpty()}renderForm(){let e=this.selfFetch();return c`<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="${e?.endpoint??""}" method="${e?.method??"POST"}" spec-url="${_(this.specUrl)}" publishable-key="${_(this.publishableKey)}" location-url="${_(this.locationUrl)}" submit-label="${_(this.submitLabel)}" lang="${_(this.effectiveLang())}" .initialValues="${this.formInitialValues()}" .serverIssues="${this.issues}" .apiRoute="${this.fetcher}" .autoload="${!this.selfFetched}" .fullPages="${!!this.listKey}" @roxy-submit="${this.onFormSubmit}"></roxy-endpoint-form>`}formInitialValues(){return this.lastValues??(this.remember?this.readRemembered():void 0)}rememberKey(){return`roxy-ui:form:${this.selfFetch()?.endpoint??""}`}readRemembered(){try{let e=sessionStorage.getItem(this.rememberKey());return e?JSON.parse(e):void 0}catch{return}}writeRemembered(e){try{sessionStorage.setItem(this.rememberKey(),JSON.stringify(e))}catch{}}renderEmpty(){return c`<div class="roxy-empty" role="status" part="empty">${this.t("No data")}</div>`}renderLoading(){return c`<div class="roxy-skeleton" style="height:5lh" role="status" aria-label="${this.t("Loading")}" part="loading"></div>`}renderError(e){let r=!!this.selfFetch();if(r&&this.issues)return this.renderForm();let n=this.renderErrorBanner(e);return r?c`${n}${this.renderForm()}`:n}renderErrorBanner(e){return c`<div class="roxy-error" role="alert" part="error">${!this.fetcher.worded&&this.errorMessage||this.t(e)}</div>`}};p([g({attribute:!1})],h.prototype,"data",2),p([g({type:String,attribute:"data-endpoint"})],h.prototype,"endpoint",2),p([g({type:String})],h.prototype,"method",2),p([g({type:String,attribute:"publishable-key"})],h.prototype,"publishableKey",2),p([g({type:String,attribute:"base-url"})],h.prototype,"baseUrl",2),p([g({type:String,attribute:"spec-url"})],h.prototype,"specUrl",2),p([g({type:String,attribute:"submit-url"})],h.prototype,"submitUrl",2),p([g({attribute:"submit-context",converter:Zt})],h.prototype,"submitContext",2),p([g({type:String,attribute:"location-url"})],h.prototype,"locationUrl",2),p([g({type:Boolean})],h.prototype,"remember",2),p([g({type:Boolean,attribute:"hide-readings",reflect:!0})],h.prototype,"hideReadings",2),p([g({type:String,attribute:"hide-sections",reflect:!0})],h.prototype,"hideSections",2),p([g({type:String,attribute:"submit-label"})],h.prototype,"submitLabel",2),p([g({type:String,attribute:"error-message"})],h.prototype,"errorMessage",2),p([g({type:String})],h.prototype,"attribution",2),p([x()],h.prototype,"loading",2),p([x()],h.prototype,"error",2),p([x()],h.prototype,"issues",2),p([x()],h.prototype,"selfFetched",2),p([x()],h.prototype,"editing",2),p([x()],h.prototype,"sticky",2),p([x()],h.prototype,"openedRow",2),p([x()],h.prototype,"openedRowId",2),p([x()],h.prototype,"moreLoading",2),p([x()],h.prototype,"moreError",2);var oe=o=>t=>{customElements.get(o)||customElements.define(o,t)};var ne=f`.roxy-facts{gap:var(--roxy-space-sm) var(--roxy-space-lg);margin:var(--roxy-space-sm) 0 0;font-size:var(--roxy-text-sm);font-variant-numeric:tabular-nums;flex-wrap:wrap;display:flex}.roxy-facts>div{min-width:0}.roxy-facts dd{overflow-wrap:anywhere;margin:0}`;var P=class extends h{renderData(t){let e=t.remedies;return c`<article class="wrap" part="card" aria-label="${this.t("Nakshatra {{name}}",{name:t.name})}"><header class="head" part="header"><h2>${t.name}</h2>${typeof t.number=="number"?c`<span class="number">${this.t("Nakshatra {{number}} of 27",{number:t.number})}</span>`:d} ${t.range?c`<span class="range">${t.range}</span>`:d}</header><dl class="roxy-facts" part="details">${t.lord?c`<div><dt>${this.t("Lord")}</dt><dd>${t.lord}</dd></div>`:d} ${t.deity?c`<div><dt>${this.t("Deity")}</dt><dd>${t.deity}</dd></div>`:d} ${t.symbol?c`<div><dt>${this.t("Symbol")}</dt><dd>${t.symbol}</dd></div>`:d}</dl>${t.characteristics&&!this.hideReadings?c`<div class="section" part="section characteristics"><h3>${this.t("Characteristics")}</h3><p>${t.characteristics}</p></div>`:d} ${e&&!this.hideReadings?c`<div class="section" part="section remedies"><h3>${this.t("Remedies")}</h3><div class="remedies">${e.mantras?c`<div class="remedy"><strong>${this.t("Mantras:")}</strong> ${e.mantras}</div>`:d} ${e.gemstones?c`<div class="remedy"><strong>${this.t("Gemstones:")}</strong> ${e.gemstones}</div>`:d} ${e.rituals?c`<div class="remedy"><strong>${this.t("Rituals:")}</strong> ${e.rituals}</div>`:d}</div></div>`:d}</article>`}};P.endpoints=Nt,P.styles=[Q,ne,f`.wrap{gap:var(--roxy-space-md);padding:var(--roxy-space-md);grid-template-columns:minmax(0,1fr);display:grid}.head{align-items:baseline;gap:var(--roxy-space-sm);flex-wrap:wrap;display:flex}h2,h3,p{margin:0}.number{color:var(--roxy-accent-ink);font-size:var(--roxy-text-sm);font-weight:var(--roxy-weight-bold)}.range{color:var(--roxy-muted);font-size:var(--roxy-text-sm)}.roxy-facts{margin:0}.section h3{margin-block-end:var(--roxy-space-xs)}.section p,.remedy{font-size:var(--roxy-text-sm)}.remedies{gap:var(--roxy-space-xs);display:grid}.remedy strong{color:var(--roxy-secondary)}`],P=p([oe("roxy-nakshatra-card")],P);return le(Ge);})();
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

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
