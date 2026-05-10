"use strict";var RoxyUI_natal_chart=(()=>{var j=Object.defineProperty;var mt=Object.getOwnPropertyDescriptor;var Ht=Object.getOwnPropertyNames;var zt=Object.prototype.hasOwnProperty;var Dt=(n,t)=>{for(var e in t)j(n,e,{get:t[e],enumerable:!0})},jt=(n,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ht(t))!zt.call(n,s)&&s!==e&&j(n,s,{get:()=>t[s],enumerable:!(r=mt(t,s))||r.enumerable});return n};var It=n=>jt(j({},"__esModule",{value:!0}),n),I=(n,t,e,r)=>{for(var s=r>1?void 0:r?mt(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(s=(r?o(t,e,s):o(s))||s);return r&&s&&j(t,e,s),s};var oe={};Dt(oe,{RoxyNatalChart:()=>b});var q=globalThis,B=q.ShadowRoot&&(q.ShadyCSS===void 0||q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),gt=new WeakMap,M=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(B&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=gt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&gt.set(e,t))}return t}toString(){return this.cssText}},ft=n=>new M(typeof n=="string"?n:n+"",void 0,Z),N=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((r,s,i)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[i+1],n[0]);return new M(e,n,Z)},yt=(n,t)=>{if(B)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),s=q.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,n.appendChild(r)}},Q=B?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return ft(e)})(n):n;var{is:qt,defineProperty:Bt,getOwnPropertyDescriptor:Gt,getOwnPropertyNames:Vt,getOwnPropertySymbols:Wt,getPrototypeOf:Ft}=Object,G=globalThis,$t=G.trustedTypes,Kt=$t?$t.emptyScript:"",Yt=G.reactiveElementPolyfillSupport,R=(n,t)=>n,T={toAttribute(n,t){switch(t){case Boolean:n=n?Kt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},V=(n,t)=>!qt(n,t),xt={attribute:!0,type:String,converter:T,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??=Symbol("metadata"),G.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=xt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&Bt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){let{get:s,set:i}=Gt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let l=s?.call(this);i?.call(this,o),this.requestUpdate(t,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??xt}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let t=Ft(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let e=this.properties,r=[...Vt(e),...Wt(e)];for(let s of r)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let s of r)e.unshift(Q(s))}else t!==void 0&&e.push(Q(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return yt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:T).toAttribute(e,r.type);this._$Em=t,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(t,e){let r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let i=r.getPropertyOptions(s),o=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:T;this._$Em=s;let l=o.fromAttribute(e,i.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(t,e,r,s=!1,i){if(t!==void 0){let o=this.constructor;if(s===!1&&(i=this[t]),r??=o.getPropertyOptions(t),!((r.hasChanged??V)(i,e)||r.useDefault&&r.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:s,wrapped:i},o){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),i!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,i]of r){let{wrapped:o}=i,l=this[s];o!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,i,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[R("elementProperties")]=new Map,y[R("finalized")]=new Map,Yt?.({ReactiveElement:y}),(G.reactiveElementVersions??=[]).push("2.1.2");var it=globalThis,vt=n=>n,W=it.trustedTypes,bt=W?W.createPolicy("lit-html",{createHTML:n=>n}):void 0,Pt="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,Ct="?"+x,Jt=`<${Ct}>`,S=document,L=()=>S.createComment(""),U=n=>n===null||typeof n!="object"&&typeof n!="function",ot=Array.isArray,Zt=n=>ot(n)||typeof n?.[Symbol.iterator]=="function",X=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_t=/-->/g,At=/>/g,_=RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),St=/'/g,wt=/"/g,kt=/^(?:script|style|textarea|title)$/i,at=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),m=at(1),E=at(2),he=at(3),w=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),Et=new WeakMap,A=S.createTreeWalker(S,129);function Mt(n,t){if(!ot(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return bt!==void 0?bt.createHTML(t):t}var Qt=(n,t)=>{let e=n.length-1,r=[],s,i=t===2?"<svg>":t===3?"<math>":"",o=O;for(let l=0;l<e;l++){let a=n[l],d,p,h=-1,g=0;for(;g<a.length&&(o.lastIndex=g,p=o.exec(a),p!==null);)g=o.lastIndex,o===O?p[1]==="!--"?o=_t:p[1]!==void 0?o=At:p[2]!==void 0?(kt.test(p[2])&&(s=RegExp("</"+p[2],"g")),o=_):p[3]!==void 0&&(o=_):o===_?p[0]===">"?(o=s??O,h=-1):p[1]===void 0?h=-2:(h=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?_:p[3]==='"'?wt:St):o===wt||o===St?o=_:o===_t||o===At?o=O:(o=_,s=void 0);let $=o===_&&n[l+1].startsWith("/>")?" ":"";i+=o===O?a+Jt:h>=0?(r.push(d),a.slice(0,h)+Pt+a.slice(h)+x+$):a+x+(h===-2?l:$)}return[Mt(n,i+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},H=class n{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let i=0,o=0,l=t.length-1,a=this.parts,[d,p]=Qt(t,e);if(this.el=n.createElement(d,r),A.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=A.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Pt)){let g=p[o++],$=s.getAttribute(h).split(x),D=/([.?@])?(.*)/.exec(g);a.push({type:1,index:i,name:D[2],strings:$,ctor:D[1]==="."?et:D[1]==="?"?rt:D[1]==="@"?st:C}),s.removeAttribute(h)}else h.startsWith(x)&&(a.push({type:6,index:i}),s.removeAttribute(h));if(kt.test(s.tagName)){let h=s.textContent.split(x),g=h.length-1;if(g>0){s.textContent=W?W.emptyScript:"";for(let $=0;$<g;$++)s.append(h[$],L()),A.nextNode(),a.push({type:2,index:++i});s.append(h[g],L())}}}else if(s.nodeType===8)if(s.data===Ct)a.push({type:2,index:i});else{let h=-1;for(;(h=s.data.indexOf(x,h+1))!==-1;)a.push({type:7,index:i}),h+=x.length-1}i++}}static createElement(t,e){let r=S.createElement("template");return r.innerHTML=t,r}};function P(n,t,e=n,r){if(t===w)return t;let s=r!==void 0?e._$Co?.[r]:e._$Cl,i=U(t)?void 0:t._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(n),s._$AT(n,e,r)),r!==void 0?(e._$Co??=[])[r]=s:e._$Cl=s),s!==void 0&&(t=P(n,s._$AS(n,t.values),s,r)),t}var tt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,s=(t?.creationScope??S).importNode(e,!0);A.currentNode=s;let i=A.nextNode(),o=0,l=0,a=r[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new z(i,i.nextSibling,this,t):a.type===1?d=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(d=new nt(i,this,t)),this._$AV.push(d),a=r[++l]}o!==a?.index&&(i=A.nextNode(),o++)}return A.currentNode=S,s}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},z=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),U(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Zt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=H.createElement(Mt(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(e);else{let i=new tt(s,this),o=i.u(this.options);i.p(e),this.T(o),this._$AH=i}}_$AC(t){let e=Et.get(t.strings);return e===void 0&&Et.set(t.strings,e=new H(t)),e}k(t){ot(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,s=0;for(let i of t)s===e.length?e.push(r=new n(this.O(L()),this.O(L()),this,this.options)):r=e[s],r._$AI(i),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=vt(t).nextSibling;vt(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,i){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=c}_$AI(t,e=this,r,s){let i=this.strings,o=!1;if(i===void 0)t=P(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else{let l=t,a,d;for(t=i[0],a=0;a<i.length-1;a++)d=P(this,l[r+a],e,a),d===w&&(d=this._$AH[a]),o||=!U(d)||d!==this._$AH[a],d===c?t=c:t!==c&&(t+=(d??"")+i[a+1]),this._$AH[a]=d}o&&!s&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},et=class extends C{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},rt=class extends C{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},st=class extends C{constructor(t,e,r,s,i){super(t,e,r,s,i),this.type=5}_$AI(t,e=this){if((t=P(this,t,e,0)??c)===w)return;let r=this._$AH,s=t===c&&r!==c||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==c&&(r===c||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},nt=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}};var Xt=it.litHtmlPolyfillSupport;Xt?.(H,z),(it.litHtmlVersions??=[]).push("3.3.2");var Nt=(n,t,e)=>{let r=e?.renderBefore??t,s=r._$litPart$;if(s===void 0){let i=e?.renderBefore??null;r._$litPart$=s=new z(t.insertBefore(L(),i),i,void 0,e??{})}return s._$AI(n),s};var lt=globalThis,v=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Nt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};v._$litElement$=!0,v.finalized=!0,lt.litElementHydrateSupport?.({LitElement:v});var te=lt.litElementPolyfillSupport;te?.({LitElement:v});(lt.litElementVersions??=[]).push("4.2.2");var Rt=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};var ee={attribute:!0,type:String,converter:T,reflect:!1,hasChanged:V},re=(n=ee,t,e)=>{let{kind:r,metadata:s}=e,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),i.set(e.name,n),r==="accessor"){let{name:o}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,n,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,n,l),l}}}if(r==="setter"){let{name:o}=e;return function(l){let a=this[o];t.call(this,l),this.requestUpdate(o,a,n,!0,l)}}throw Error("Unsupported decorator location: "+r)};function F(n){return(t,e)=>typeof e=="object"?re(n,t,e):((r,s,i)=>{let o=s.hasOwnProperty(i);return s.constructor.createProperty(i,r),o?Object.getOwnPropertyDescriptor(s,i):void 0})(n,t,e)}var Y={Sun:"\u2609",Moon:"\u263D",Mercury:"\u263F",Venus:"\u2640",Earth:"\u2641",Mars:"\u2642",Jupiter:"\u2643",Saturn:"\u2644",Uranus:"\u2645",Neptune:"\u2646",Pluto:"\u2647",Rahu:"\u260A",Ketu:"\u260B",Ascendant:"Asc",Lagna:"La",NorthNode:"\u260A",SouthNode:"\u260B","North node":"\u260A","South node":"\u260B",Chiron:"\u26B7",Lilith:"\u26B8","Black moon lilith":"\u26B8"};var Tt={Aries:"\u2648",Taurus:"\u2649",Gemini:"\u264A",Cancer:"\u264B",Leo:"\u264C",Virgo:"\u264D",Libra:"\u264E",Scorpio:"\u264F",Sagittarius:"\u2650",Capricorn:"\u2651",Aquarius:"\u2652",Pisces:"\u2653"};var ct=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],Qe=ct.map(n=>n.toLowerCase());var Ot=N`
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
`;function f(n,t,e,r){let s=r*Math.PI/180;return{x:n+e*Math.cos(s),y:t+e*Math.sin(s)}}function dt(n,t=1){return typeof n!="number"||!Number.isFinite(n)?"":n.toFixed(t).replace(/\.?0+$/,"")}var Lt={conjunction:"aspect-conjunction",sextile:"aspect-sextile",square:"aspect-square",trine:"aspect-trine",opposition:"aspect-opposition"};function Ut(n){return(n.type??"").toLowerCase().replace(/_/g,"-")}function k(n){return n?n.charAt(0).toUpperCase()+n.slice(1).toLowerCase():""}var ut=420,u=ut/2,pt=164,se=146,ht=120,J=96,ne=178,ie=196,b=class extends v{constructor(){super(...arguments);this.data=null;this.houseSystem="placidus"}getPlanets(){return this.data?.planets??[]}getAscendant(){return this.data?.ascendant?.longitude??0}getMidheaven(){let e=this.data?.midheaven?.longitude;return typeof e=="number"?e:null}toAngle(e){return 180+this.getAscendant()-e}render(){if(!this.data)return m`<div class="roxy-empty" role="status">No chart data</div>`;let e=this.getPlanets(),r=this.data.aspects??[];return m`<div class="wrap">
			<header>
				<h2 class="title">Natal chart</h2>
				${this.data.birthDetails?m`<div class="meta">
							${[this.data.birthDetails.date,this.data.birthDetails.time].filter(Boolean).join(" \xB7 ")}
						</div>`:c}
			</header>
			<svg
				viewBox="0 0 ${ut} ${ut}"
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
					cx=${u}
					cy=${u}
					r=${pt}
					stroke-width="1.5"
				/>
				<circle
					class="wheel-line"
					cx=${u}
					cy=${u}
					r=${ht}
					stroke-width="1"
				/>
				<circle
					class="wheel-line"
					cx=${u}
					cy=${u}
					r=${J-16}
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
		</div>`}renderAngles(){let e=this.getAscendant(),r=this.getMidheaven(),s=[this.renderAngleMark(e,"ASC")];return r!==null&&s.push(this.renderAngleMark(r,"MC")),s}renderAngleMark(e,r){let s=this.toAngle(e),i=f(u,u,pt,s),o=f(u,u,ne,s),l=f(u,u,ie,s);return E`
			<g>
				<line class="angle-tick" x1=${i.x} y1=${i.y} x2=${o.x} y2=${o.y} />
				<text class="angle-marker" x=${l.x} y=${l.y} text-anchor="middle" dominant-baseline="central">${r}</text>
			</g>
		`}renderSpokes(){return Array.from({length:12},(e,r)=>{let s=this.toAngle(r*30),i=f(u,u,ht,s),o=f(u,u,pt,s);return E`<line class="wheel-line" x1=${i.x} y1=${i.y} x2=${o.x} y2=${o.y} stroke-width="0.8" />`})}renderSigns(){return ct.map((e,r)=>{let s=this.toAngle(r*30+15),i=f(u,u,se,s);return E`<text class="sign-glyph" x=${i.x} y=${i.y} text-anchor="middle" dominant-baseline="central">${Tt[e]}</text>`})}renderHouseNumbers(){let e=Math.floor(this.getAscendant()/30);return Array.from({length:12},(r,s)=>{let i=this.toAngle(s*30+15),o=f(u,u,ht-12,i),l=(s-e+12)%12+1;return E`<text class="house-num" x=${o.x} y=${o.y} text-anchor="middle" dominant-baseline="central">${l}</text>`})}renderPlanets(e){return e.map(r=>{if(!Number.isFinite(r.longitude))return c;let s=this.toAngle(r.longitude),i=f(u,u,J,s),o=Y[k(r.name)]??r.name.slice(0,2),l=r.isRetrograde?" R":"",a=l?`${o}\u1D3F`:o;return E`<text class="planet-glyph" x=${i.x} y=${i.y} text-anchor="middle" dominant-baseline="central"><title>${r.name}${l}</title>${a}</text>`})}renderDetails(){let e=this.data?.summary,r=this.data?.aspectsInterpretation;if(!e&&!r)return c;let s=e?.retrogradePlanets??[],i=e?.elementDistribution??{},o=e?.modalityDistribution??{},l=Math.max(1,...Object.values(i)),a=Math.max(1,...Object.values(o));return m`<div class="details">
			${e?.dominantElement||e?.dominantModality?m`<div class="pill-row">
						${e.dominantElement?m`<span class="pill">Dominant element: ${e.dominantElement}</span>`:c}
						${e.dominantModality?m`<span class="pill">Dominant modality: ${e.dominantModality}</span>`:c}
					</div>`:c}
			${r?m`<div class="pill-row">
						<span class="pill pill--success">Harmonious ${r.harmonious}</span>
						<span class="pill pill--danger">Challenging ${r.challenging}</span>
						<span class="pill pill--muted">Neutral ${r.neutral}</span>
					</div>`:c}
			${s.length>0?m`<div class="pill-row">
						${s.map(d=>{let p=Y[d]??d.slice(0,2);return m`<span class="pill pill--muted">${p} ${d} R</span>`})}
					</div>`:c}
			${r?.summary?m`<p class="summary">${r.summary}</p>`:c}
			${Object.keys(i).length>0||Object.keys(o).length>0?m`<div class="dist-grid">
						${Object.keys(i).length>0?m`<div class="dist-section">
									<h3>Elements</h3>
									${Object.entries(i).map(([d,p])=>m`<div class="dist-row">
											<span>${d}</span>
											<div class="dist-bar"><span style="width: ${Math.round(p/l*100)}%"></span></div>
											<span>${p}</span>
										</div>`)}
								</div>`:c}
						${Object.keys(o).length>0?m`<div class="dist-section">
									<h3>Modalities</h3>
									${Object.entries(o).map(([d,p])=>m`<div class="dist-row">
											<span>${d}</span>
											<div class="dist-bar"><span style="width: ${Math.round(p/a*100)}%"></span></div>
											<span>${p}</span>
										</div>`)}
								</div>`:c}
					</div>`:c}
		</div>`}renderInterpretations(){let e=this.getPlanets().filter(r=>r.interpretation);return e.length===0?c:m`<section class="interpretations">
			<h3>Planet readings</h3>
			${e.map((r,s)=>{let i=r.interpretation,o=Y[k(r.name)]??"",l=dt(r.degree??0,1);return m`<details class="interp-card" ?open=${s===0}>
					<summary>${o} ${r.name} <small>${r.sign??""} ${l}</small></summary>
					<div class="interp-body">
						${i.summary?m`<p class="interp-summary">${i.summary}</p>`:c}
						${i.detailed?m`<p class="interp-detail">${i.detailed}</p>`:c}
						${i.keywords?.length?m`<div class="interp-keywords">${i.keywords.map(a=>m`<span class="kw">${a}</span>`)}</div>`:c}
					</div>
				</details>`})}
		</section>`}renderAspects(e,r){let s=new Map;for(let i of e){if(typeof i.longitude!="number")continue;let o=k(i.name);o&&s.set(o,i.longitude)}return r.map(i=>{let o=s.get(k(i.planet1)),l=s.get(k(i.planet2));if(o===void 0||l===void 0)return c;let a=f(u,u,J-18,this.toAngle(o)),d=f(u,u,J-18,this.toAngle(l)),p=Ut(i),h=Lt[p]??"aspect-other",g=dt(i.orb,1);return E`<line class=${`aspect ${h}`} x1=${a.x} y1=${a.y} x2=${d.x} y2=${d.y}><title>${i.planet1} ${p||""} ${i.planet2}${g?` (orb ${g}\xB0)`:""}</title></line>`})}};b.styles=[Ot,N`
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
		`],I([F({attribute:!1})],b.prototype,"data",2),I([F({type:String,attribute:"house-system",reflect:!0})],b.prototype,"houseSystem",2),b=I([Rt("roxy-natal-chart")],b);return It(oe);})();
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
//# sourceMappingURL=natal-chart.js.map
