"use strict";var RoxyUI=(()=>{var he=Object.defineProperty;var Ke=Object.getOwnPropertyDescriptor;var St=Object.getOwnPropertyNames;var kt=Object.prototype.hasOwnProperty;var At=(i,r)=>{for(var e in r)he(i,e,{get:r[e],enumerable:!0})},Ct=(i,r,e,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of St(r))!kt.call(i,a)&&a!==e&&he(i,a,{get:()=>r[a],enumerable:!(t=Ke(r,a))||t.enumerable});return i};var Et=i=>Ct(he({},"__esModule",{value:!0}),i),p=(i,r,e,t)=>{for(var a=t>1?void 0:t?Ke(r,e):r,o=i.length-1,n;o>=0;o--)(n=i[o])&&(a=(t?n(r,e,a):n(a))||a);return t&&a&&he(r,e,a),a};var yr={};At(yr,{ROXY_COMPONENTS:()=>Se,ROXY_UI_COMPONENTS:()=>gr,ROXY_UI_VERSION:()=>wt,RoxyBiorhythmChart:()=>T,RoxyCompatibilityCard:()=>N,RoxyDashaTimeline:()=>M,RoxyData:()=>z,RoxyDoshaCard:()=>D,RoxyEndpointForm:()=>R,RoxyGunaMilan:()=>V,RoxyHexagram:()=>O,RoxyHoroscopeCard:()=>H,RoxyKpPlanetsTable:()=>F,RoxyLocationSearch:()=>_,RoxyMoonPhase:()=>G,RoxyNatalChart:()=>j,RoxyNumerologyCard:()=>I,RoxyPanchangTable:()=>U,RoxySynastryChart:()=>W,RoxyTarotCard:()=>B,RoxyTarotSpread:()=>q,RoxyVedicKundli:()=>K});var ue=globalThis,ge=ue.ShadowRoot&&(ue.ShadyCSS===void 0||ue.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ke=Symbol(),Ye=new WeakMap,se=class{constructor(r,e,t){if(this._$cssResult$=!0,t!==ke)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o,e=this.t;if(ge&&r===void 0){let t=e!==void 0&&e.length===1;t&&(r=Ye.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),t&&Ye.set(e,r))}return r}toString(){return this.cssText}},Ve=i=>new se(typeof i=="string"?i:i+"",void 0,ke),v=(i,...r)=>{let e=i.length===1?i[0]:r.reduce((t,a,o)=>t+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+i[o+1],i[0]);return new se(e,i,ke)},Fe=(i,r)=>{if(ge)i.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of r){let t=document.createElement("style"),a=ue.litNonce;a!==void 0&&t.setAttribute("nonce",a),t.textContent=e.cssText,i.appendChild(t)}},Ae=ge?i=>i:i=>i instanceof CSSStyleSheet?(r=>{let e="";for(let t of r.cssRules)e+=t.cssText;return Ve(e)})(i):i;var{is:_t,defineProperty:Rt,getOwnPropertyDescriptor:Pt,getOwnPropertyNames:Lt,getOwnPropertySymbols:Tt,getPrototypeOf:Nt}=Object,ye=globalThis,We=ye.trustedTypes,Mt=We?We.emptyScript:"",zt=ye.reactiveElementPolyfillSupport,oe=(i,r)=>i,ie={toAttribute(i,r){switch(r){case Boolean:i=i?Mt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,r){let e=i;switch(r){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},xe=(i,r)=>!_t(i,r),Je={attribute:!0,type:String,converter:ie,reflect:!1,useDefault:!1,hasChanged:xe};Symbol.metadata??=Symbol("metadata"),ye.litPropertyMetadata??=new WeakMap;var L=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=Je){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){let t=Symbol(),a=this.getPropertyDescriptor(r,t,e);a!==void 0&&Rt(this.prototype,r,a)}}static getPropertyDescriptor(r,e,t){let{get:a,set:o}=Pt(this.prototype,r)??{get(){return this[e]},set(n){this[e]=n}};return{get:a,set(n){let c=a?.call(this);o?.call(this,n),this.requestUpdate(r,c,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??Je}static _$Ei(){if(this.hasOwnProperty(oe("elementProperties")))return;let r=Nt(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(oe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(oe("properties"))){let e=this.properties,t=[...Lt(e),...Tt(e)];for(let a of t)this.createProperty(a,e[a])}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[t,a]of e)this.elementProperties.set(t,a)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let a=this._$Eu(e,t);a!==void 0&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let t=new Set(r.flat(1/0).reverse());for(let a of t)e.unshift(Ae(a))}else r!==void 0&&e.push(Ae(r));return e}static _$Eu(r,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(r.set(t,this[t]),delete this[t]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Fe(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,e,t){this._$AK(r,t)}_$ET(r,e){let t=this.constructor.elementProperties.get(r),a=this.constructor._$Eu(r,t);if(a!==void 0&&t.reflect===!0){let o=(t.converter?.toAttribute!==void 0?t.converter:ie).toAttribute(e,t.type);this._$Em=r,o==null?this.removeAttribute(a):this.setAttribute(a,o),this._$Em=null}}_$AK(r,e){let t=this.constructor,a=t._$Eh.get(r);if(a!==void 0&&this._$Em!==a){let o=t.getPropertyOptions(a),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:ie;this._$Em=a;let c=n.fromAttribute(e,o.type);this[a]=c??this._$Ej?.get(a)??c,this._$Em=null}}requestUpdate(r,e,t,a=!1,o){if(r!==void 0){let n=this.constructor;if(a===!1&&(o=this[r]),t??=n.getPropertyOptions(r),!((t.hasChanged??xe)(o,e)||t.useDefault&&t.reflect&&o===this._$Ej?.get(r)&&!this.hasAttribute(n._$Eu(r,t))))return;this.C(r,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:t,reflect:a,wrapped:o},n){t&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,n??e??this[r]),o!==!0||n!==void 0)||(this._$AL.has(r)||(this.hasUpdated||t||(e=void 0),this._$AL.set(r,e)),a===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,o]of this._$Ep)this[a]=o;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[a,o]of t){let{wrapped:n}=o,c=this[a];n!==!0||this._$AL.has(a)||c===void 0||this.C(a,void 0,o,c)}}let r=!1,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw r=!1,this._$EM(),t}r&&this._$AE(e)}willUpdate(r){}_$AE(r){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(r){}firstUpdated(r){}};L.elementStyles=[],L.shadowRootOptions={mode:"open"},L[oe("elementProperties")]=new Map,L[oe("finalized")]=new Map,zt?.({ReactiveElement:L}),(ye.reactiveElementVersions??=[]).push("2.1.2");var Te=globalThis,Xe=i=>i,fe=Te.trustedTypes,Ze=fe?fe.createPolicy("lit-html",{createHTML:i=>i}):void 0,st="$lit$",Y=`lit$${Math.random().toFixed(9).slice(2)}$`,ot="?"+Y,Dt=`<${ot}>`,Z=document,le=()=>Z.createComment(""),ce=i=>i===null||typeof i!="object"&&typeof i!="function",Ne=Array.isArray,Ot=i=>Ne(i)||typeof i?.[Symbol.iterator]=="function",Ce=`[ 	
\f\r]`,ne=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Qe=/-->/g,et=/>/g,J=RegExp(`>|${Ce}(?:([^\\s"'>=/]+)(${Ce}*=${Ce}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),tt=/'/g,rt=/"/g,it=/^(?:script|style|textarea|title)$/i,Me=i=>(r,...e)=>({_$litType$:i,strings:r,values:e}),s=Me(1),k=Me(2),wr=Me(3),Q=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),at=new WeakMap,X=Z.createTreeWalker(Z,129);function nt(i,r){if(!Ne(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ze!==void 0?Ze.createHTML(r):r}var Ht=(i,r)=>{let e=i.length-1,t=[],a,o=r===2?"<svg>":r===3?"<math>":"",n=ne;for(let c=0;c<e;c++){let d=i[c],m,g,u=-1,f=0;for(;f<d.length&&(n.lastIndex=f,g=n.exec(d),g!==null);)f=n.lastIndex,n===ne?g[1]==="!--"?n=Qe:g[1]!==void 0?n=et:g[2]!==void 0?(it.test(g[2])&&(a=RegExp("</"+g[2],"g")),n=J):g[3]!==void 0&&(n=J):n===J?g[0]===">"?(n=a??ne,u=-1):g[1]===void 0?u=-2:(u=n.lastIndex-g[2].length,m=g[1],n=g[3]===void 0?J:g[3]==='"'?rt:tt):n===rt||n===tt?n=J:n===Qe||n===et?n=ne:(n=J,a=void 0);let w=n===J&&i[c+1].startsWith("/>")?" ":"";o+=n===ne?d+Dt:u>=0?(t.push(m),d.slice(0,u)+st+d.slice(u)+Y+w):d+Y+(u===-2?c:w)}return[nt(i,o+(i[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]},de=class i{constructor({strings:r,_$litType$:e},t){let a;this.parts=[];let o=0,n=0,c=r.length-1,d=this.parts,[m,g]=Ht(r,e);if(this.el=i.createElement(m,t),X.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(a=X.nextNode())!==null&&d.length<c;){if(a.nodeType===1){if(a.hasAttributes())for(let u of a.getAttributeNames())if(u.endsWith(st)){let f=g[n++],w=a.getAttribute(u).split(Y),x=/([.?@])?(.*)/.exec(f);d.push({type:1,index:o,name:x[2],strings:w,ctor:x[1]==="."?_e:x[1]==="?"?Re:x[1]==="@"?Pe:re}),a.removeAttribute(u)}else u.startsWith(Y)&&(d.push({type:6,index:o}),a.removeAttribute(u));if(it.test(a.tagName)){let u=a.textContent.split(Y),f=u.length-1;if(f>0){a.textContent=fe?fe.emptyScript:"";for(let w=0;w<f;w++)a.append(u[w],le()),X.nextNode(),d.push({type:2,index:++o});a.append(u[f],le())}}}else if(a.nodeType===8)if(a.data===ot)d.push({type:2,index:o});else{let u=-1;for(;(u=a.data.indexOf(Y,u+1))!==-1;)d.push({type:7,index:o}),u+=Y.length-1}o++}}static createElement(r,e){let t=Z.createElement("template");return t.innerHTML=r,t}};function te(i,r,e=i,t){if(r===Q)return r;let a=t!==void 0?e._$Co?.[t]:e._$Cl,o=ce(r)?void 0:r._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),o===void 0?a=void 0:(a=new o(i),a._$AT(i,e,t)),t!==void 0?(e._$Co??=[])[t]=a:e._$Cl=a),a!==void 0&&(r=te(i,a._$AS(i,r.values),a,t)),r}var Ee=class{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:t}=this._$AD,a=(r?.creationScope??Z).importNode(e,!0);X.currentNode=a;let o=X.nextNode(),n=0,c=0,d=t[0];for(;d!==void 0;){if(n===d.index){let m;d.type===2?m=new pe(o,o.nextSibling,this,r):d.type===1?m=new d.ctor(o,d.name,d.strings,this,r):d.type===6&&(m=new Le(o,this,r)),this._$AV.push(m),d=t[++c]}n!==d?.index&&(o=X.nextNode(),n++)}return X.currentNode=Z,a}p(r){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}},pe=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,t,a){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=te(this,r,e),ce(r)?r===l||r==null||r===""?(this._$AH!==l&&this._$AR(),this._$AH=l):r!==this._$AH&&r!==Q&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):Ot(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==l&&ce(this._$AH)?this._$AA.nextSibling.data=r:this.T(Z.createTextNode(r)),this._$AH=r}$(r){let{values:e,_$litType$:t}=r,a=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=de.createElement(nt(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===a)this._$AH.p(e);else{let o=new Ee(a,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(r){let e=at.get(r.strings);return e===void 0&&at.set(r.strings,e=new de(r)),e}k(r){Ne(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,a=0;for(let o of r)a===e.length?e.push(t=new i(this.O(le()),this.O(le()),this,this.options)):t=e[a],t._$AI(o),a++;a<e.length&&(this._$AR(t&&t._$AB.nextSibling,a),e.length=a)}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);r!==this._$AB;){let t=Xe(r).nextSibling;Xe(r).remove(),r=t}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},re=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,a,o){this.type=1,this._$AH=l,this._$AN=void 0,this.element=r,this.name=e,this._$AM=a,this.options=o,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=l}_$AI(r,e=this,t,a){let o=this.strings,n=!1;if(o===void 0)r=te(this,r,e,0),n=!ce(r)||r!==this._$AH&&r!==Q,n&&(this._$AH=r);else{let c=r,d,m;for(r=o[0],d=0;d<o.length-1;d++)m=te(this,c[t+d],e,d),m===Q&&(m=this._$AH[d]),n||=!ce(m)||m!==this._$AH[d],m===l?r=l:r!==l&&(r+=(m??"")+o[d+1]),this._$AH[d]=m}n&&!a&&this.j(r)}j(r){r===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},_e=class extends re{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===l?void 0:r}},Re=class extends re{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==l)}},Pe=class extends re{constructor(r,e,t,a,o){super(r,e,t,a,o),this.type=5}_$AI(r,e=this){if((r=te(this,r,e,0)??l)===Q)return;let t=this._$AH,a=r===l&&t!==l||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,o=r!==l&&(t===l||a);a&&this.element.removeEventListener(this.name,this,t),o&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},Le=class{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){te(this,r)}};var Gt=Te.litHtmlPolyfillSupport;Gt?.(de,pe),(Te.litHtmlVersions??=[]).push("3.3.2");var lt=(i,r,e)=>{let t=e?.renderBefore??r,a=t._$litPart$;if(a===void 0){let o=e?.renderBefore??null;t._$litPart$=a=new pe(r.insertBefore(le(),o),o,void 0,e??{})}return a._$AI(i),a};var ze=globalThis,y=class extends L{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=lt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Q}};y._$litElement$=!0,y.finalized=!0,ze.litElementHydrateSupport?.({LitElement:y});var jt=ze.litElementPolyfillSupport;jt?.({LitElement:y});(ze.litElementVersions??=[]).push("4.2.2");var b=i=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,r)}):customElements.define(i,r)};var It={attribute:!0,type:String,converter:ie,reflect:!1,hasChanged:xe},Ut=(i=It,r,e)=>{let{kind:t,metadata:a}=e,o=globalThis.litPropertyMetadata.get(a);if(o===void 0&&globalThis.litPropertyMetadata.set(a,o=new Map),t==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(e.name,i),t==="accessor"){let{name:n}=e;return{set(c){let d=r.get.call(this);r.set.call(this,c),this.requestUpdate(n,d,i,!0,c)},init(c){return c!==void 0&&this.C(n,void 0,i,c),c}}}if(t==="setter"){let{name:n}=e;return function(c){let d=this[n];r.call(this,c),this.requestUpdate(n,d,i,!0,c)}}throw Error("Unsupported decorator location: "+t)};function h(i){return(r,e)=>typeof e=="object"?Ut(i,r,e):((t,a,o)=>{let n=a.hasOwnProperty(o);return a.constructor.createProperty(o,t),n?Object.getOwnPropertyDescriptor(a,o):void 0})(i,r,e)}function P(i){return h({...i,state:!0,attribute:!1})}var $=v`
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
`;var ct={physical:"#dc2626",emotional:"#0284c7",intellectual:"#16a34a",intuitive:"#a855f7",aesthetic:"#f59e0b",awareness:"#ec4899",spiritual:"#14b8a6",passion:"#ef4444",mastery:"#6366f1",wisdom:"#475569"},T=class extends y{constructor(){super(...arguments);this.data=null;this.mode="daily"}render(){let e=this.data;return e?this.mode==="critical-days"&&"criticalDays"in e?this.renderCritical(e):this.mode==="forecast"&&"days"in e?this.renderForecast(e):this.renderDaily(e):s`<div class="roxy-empty" role="status">No biorhythm data</div>`}renderDaily(e){let t=e.quickRead??{},a=Object.entries(t).map(([o,n])=>{let c=typeof n=="number"?n:0,d=Math.abs(c)>1?c/100:c;return[o,d]});return s`<section class="wrap" aria-label="Daily biorhythm">
			<header class="head">
				<h2 class="title">Biorhythm</h2>
				${typeof e.energyRating=="number"?s`<span class="energy">Energy ${e.energyRating}/10</span>`:l}
			</header>
			<div class="bars" role="list">
				${a.map(([o,n])=>{let c=(n+1)/2*100,d=ct[o]??"var(--roxy-accent, #f59e0b)";return s`<div class="bar" role="listitem">
						<span style="text-transform: capitalize">${o}</span>
						<span class="track">
							<span
								class="fill"
								style="width: ${c}%; background: ${d}"
							></span>
						</span>
						<span class="value">${Math.round(n*100)}%</span>
					</div>`})}
			</div>
			${e.dailyMessage?s`<p class="advice">${e.dailyMessage}</p>`:l}
			${e.advice?s`<p class="advice">${e.advice}</p>`:l}
		</section>`}renderForecast(e){let t=e.days??[];if(t.length===0)return s`<div class="roxy-empty" role="status">No forecast</div>`;let a=600,o=160,n=a/Math.max(t.length-1,1),c=["physical","emotional","intellectual","intuitive"];return s`<section class="wrap" aria-label="Biorhythm forecast">
			<header class="head">
				<h2 class="title">Forecast</h2>
				<span class="energy">${e.startDate} - ${e.endDate}</span>
			</header>
			<svg
				viewBox="0 0 ${a} ${o}"
				role="img"
				aria-label="Biorhythm cycle lines across the forecast window"
			>
				<title>Biorhythm forecast</title>
				<line
					x1="0"
					y1=${o/2}
					x2=${a}
					y2=${o/2}
					stroke="var(--roxy-border, #e4e4e7)"
					stroke-width="1"
				/>
				${c.map(d=>{let m=t.map((u,f)=>{let w=u[d]??0,x=f*n,qe=o/2-w/100*(o/2-8);return`${x.toFixed(2)},${qe.toFixed(2)}`}).join(" "),g=ct[d]??"#475569";return k`<polyline points=${m} fill="none" stroke=${g} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />`})}
			</svg>
			${e.summary?.periodAdvice?s`<p class="advice">${e.summary.periodAdvice}</p>`:l}
		</section>`}renderCritical(e){return s`<section class="wrap" aria-label="Critical days">
			<header class="head">
				<h2 class="title">Critical days</h2>
				<span class="energy">${e.totalCriticalDays} total</span>
			</header>
			<div>
				${e.criticalDays.map(t=>s`<span class="crit"
						>${t.date} · ${t.cycle} ${t.severity}</span
					>`)}
			</div>
		</section>`}};T.styles=[$,v`
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
		`],p([h({attribute:!1})],T.prototype,"data",2),p([h({type:String,reflect:!0})],T.prototype,"mode",2),T=p([b("roxy-biorhythm-chart")],T);function ee(i){if(typeof i!="string"||i.length===0||/^\d{4}-\d{2}-\d{2}$/.test(i))return"";let e=/^\d{2}:\d{2}(:\d{2})?$/.test(i)?`1970-01-01T${i}`:i,t=new Date(e);return Number.isNaN(t.getTime())?i:t.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit",hour12:!0})}function dt(i){if(typeof i!="string"||i.length===0)return"";let r=new Date(/^\d{4}-\d{2}-\d{2}$/.test(i)?`${i}T00:00:00`:i);return Number.isNaN(r.getTime())?i:r.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}function De(i){if(!i)return"";let r=ee(i.start),e=ee(i.end);return r&&e?`${r} - ${e}`:r||e||""}function A(i,r=1){return typeof i!="number"||!Number.isFinite(i)?"":i.toFixed(r).replace(/\.?0+$/,"")}function pt(i,r=1){let e=A(i,r);return e?`${e}%`:""}var N=class extends y{constructor(){super(...arguments);this.data=null;this.mode="astrology"}getBreakdown(){let e=this.data;if(!e)return{};if("categories"in e&&e.categories){let t={};for(let[a,o]of Object.entries(e.categories))typeof o=="number"&&Number.isFinite(o)&&(t[a]=o);return t}return{}}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No compatibility data</div>`;let t=e.overallScore,a=this.getBreakdown(),o="rating"in e?e.rating:void 0,n="archetype"in e?e.archetype:void 0,c="advice"in e?e.advice:void 0,d="summary"in e?e.summary:void 0,m="interpretation"in e?e.interpretation:void 0,g="strengths"in e?e.strengths:void 0,u="challenges"in e?e.challenges:void 0,f="keyAspects"in e?e.keyAspects:void 0;return s`<article
			class="card"
			aria-label=${`Compatibility (${this.mode})`}
		>
			<div class="head">
				<h2>${this.mode} compatibility</h2>
				<div>
					${typeof t=="number"?s`<div class="score">${A(t,0)}</div>`:l}
					${o?s`<div class="rating">${o}</div>`:l}
				</div>
			</div>

			${Object.keys(a).length>0?s`<div role="list">
						${Object.entries(a).map(([w,x])=>s`<div class="bar-row" role="listitem">
								<span style="text-transform: capitalize">${w}</span>
								<span class="bar"
									><span style="width: ${Math.max(0,Math.min(100,x))}%"></span
								></span>
								<span>${A(x,0)}</span>
							</div>`)}
					</div>`:l}
			${n?s`<p>
						<span class="archetype">${n.label}</span>
						${n.description?s` · ${n.description}`:l}
					</p>`:l}
			${d?s`<p>${d}</p>`:l}
			${m&&!d?s`<p>${m}</p>`:l}
			${c?s`<p>${c}</p>`:l}
			${(g?.length??0)>0||(u?.length??0)>0?s`<div class="lists">
						${g?.length?s`<div>
									<h3>Strengths</h3>
									<ul>
										${g.map(w=>s`<li>${w}</li>`)}
									</ul>
								</div>`:l}
						${u?.length?s`<div>
									<h3>Challenges</h3>
									<ul>
										${u.map(w=>s`<li>${w}</li>`)}
									</ul>
								</div>`:l}
					</div>`:l}
			${f?.length?s`<div>
						<h3 style="margin: 0 0 0.25rem; font-size: var(--roxy-text-xs); color: var(--roxy-muted); text-transform: uppercase; letter-spacing: 0.06em;">Key aspects</h3>
						<ul style="margin: 0; padding-left: 1rem; font-size: var(--roxy-text-sm);">
							${f.slice(0,6).map(w=>s`<li>${Bt(w)}</li>`)}
						</ul>
					</div>`:l}
		</article>`}};N.styles=[$,v`
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
		`],p([h({attribute:!1})],N.prototype,"data",2),p([h({type:String,reflect:!0})],N.prototype,"mode",2),N=p([b("roxy-compatibility-card")],N);function Bt(i){let r=i.type.toLowerCase().replace(/_/g,"-"),e=typeof i.orb=="number"?` (orb ${A(i.orb,1)}\xB0)`:"",t=[i.planet1,r,i.planet2].filter(Boolean).join(" ");return i.description?`${t}${e} \xB7 ${i.description}`:`${t}${e}`}var M=class extends y{constructor(){super(...arguments);this.data=null;this.period="current"}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No dasha data</div>`;let t=this.collectPeriods(e),a=t.length?Math.max(...t.map(o=>o.durationYears)):0;return s`<div class="wrap" aria-label="Dasha timeline">
			<header class="head">
				<h2 class="title">
					${this.period==="major"?"Vimshottari Mahadasha":this.period==="sub"?"Antardasha":"Active dashas"}
				</h2>
				${"nakshatraName"in e&&e.nakshatraName?s`<div class="nakshatra">
						Moon nakshatra: ${e.nakshatraName}
						${"nakshatraLord"in e&&e.nakshatraLord?s`(lord ${e.nakshatraLord})`:l}
					</div>`:l}
			</header>

			${this.period==="current"?this.renderCurrent(e):l}
			${t.length>0?s`<div class="timeline" role="list">
						${t.map(o=>this.renderBar(o,a))}
					</div>`:l}
		</div>`}renderCurrent(e){return"mahadasha"in e?s`<div class="current">
			${"mahadasha"in e&&e.mahadasha?s`<div>
					<span>Mahadasha</span>
					<strong>${e.mahadasha.planet}</strong>
					${"remainingInMahadasha"in e&&e.remainingInMahadasha?s`<small>${A(e.remainingInMahadasha.years+e.remainingInMahadasha.months/12,1)} years left</small>`:l}
				</div>`:l}
			${"antardasha"in e&&e.antardasha?s`<div>
					<span>Antardasha</span>
					<strong>${e.antardasha.planet}</strong>
					${"remainingInAntardasha"in e&&e.remainingInAntardasha?s`<small>${A(e.remainingInAntardasha.years+e.remainingInAntardasha.months/12,1)} years left</small>`:l}
				</div>`:l}
			${"pratyantardasha"in e&&e.pratyantardasha?s`<div>
					<span>Pratyantardasha</span>
					<strong>${e.pratyantardasha.planet}</strong>
					${"remainingInPratyantardasha"in e&&e.remainingInPratyantardasha?s`<small>${A(e.remainingInPratyantardasha.years+e.remainingInPratyantardasha.months/12,1)} years left</small>`:l}
				</div>`:l}
		</div>`:l}collectPeriods(e){return"mahadashas"in e&&e.mahadashas?.length?e.mahadashas:"antardashas"in e&&e.antardashas?.length?e.antardashas:[]}renderBar(e,t){let a=e.durationYears,o=t>0?a/t*100:0;return s`<div class="bar" role="listitem">
			<span>${e.planet}</span>
			<span class="bar-track"><span style="width: ${o}%"></span></span>
			<span class="dates">
				${e.startDate?mt(e.startDate):""}
				${e.endDate?s`- ${mt(e.endDate)}`:""}
			</span>
		</div>`}};M.styles=[$,v`
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
		`],p([h({attribute:!1})],M.prototype,"data",2),p([h({type:String,reflect:!0})],M.prototype,"period",2),M=p([b("roxy-dasha-timeline")],M);function mt(i){let r=i.match(/^(\d{4})/);return r?r[1]:i}var qt=["title","name","label","heading","overview","summary"],Kt=["imageUrl","image","icon","symbol"],Yt=["imageUrl","image"],Vt=6,z=class extends y{constructor(){super(...arguments);this.data=null;this.depth=0}render(){return this.data==null?s`<div class="roxy-empty" role="status">No data</div>`:this.depth>=Vt?s`<div class="roxy-empty" role="status">…</div>`:s`<div
			class="roxy-card"
			aria-label="Generic data display"
		>
			${this.renderValue(this.data)}
		</div>`}renderValue(e){return e==null?l:typeof e=="string"?s`<p>${e}</p>`:typeof e=="number"||typeof e=="boolean"?s`<p>${String(e)}</p>`:Array.isArray(e)?this.renderArray(e):this.renderObject(e)}renderArray(e){return e.length===0?s`<div class="roxy-empty" role="status">Empty list</div>`:e.every(o=>o===null||["string","number","boolean"].includes(typeof o))?s`<ul class="roxy-chips">
				${e.map(o=>s`<li>${String(o)}</li>`)}
			</ul>`:e.every(o=>o!==null&&typeof o=="object"&&!Array.isArray(o))?this.renderTable(e):s`<ol>
			${e.map(o=>s`<li>${this.renderValue(o)}</li>`)}
		</ol>`}renderTable(e){let t=this.collectKeys(e);return s`<table class="roxy-table" role="table">
			<thead>
				<tr>
					${t.map(a=>s`<th>${this.humanize(a)}</th>`)}
				</tr>
			</thead>
			<tbody>
				${e.map(a=>s`<tr>
						${t.map(o=>s`<td>${this.formatPrimitive(a[o])}</td>`)}
					</tr>`)}
			</tbody>
		</table>`}renderObject(e){let t=qt.find(c=>typeof e[c]=="string"),a=Kt.find(c=>typeof e[c]=="string"&&e[c].startsWith("http")),o=t!=="summary"&&typeof e.summary=="string"?"summary":null,n=Object.entries(e).filter(([c,d])=>c!==t&&c!==o&&!Yt.includes(c)&&d!==null&&d!==void 0);return s`
			${a?s`<img
						class="roxy-image"
						src=${String(e[a])}
						alt=${t?String(e[t]):"illustration"}
						loading="lazy"
					/>`:l}
			${t?s`<h3 class="roxy-title">${e[t]}</h3>`:l}
			${o?s`<p class="roxy-summary">${e[o]}</p>`:l}
			${n.length>0?s`<dl class="roxy-rows">
						${n.map(([c,d])=>s`
								<dt>${this.humanize(c)}</dt>
								<dd>${this.renderField(d)}</dd>
							`)}
					</dl>`:l}
		`}renderField(e){return e==null?"":typeof e=="string"?e:typeof e=="number"||typeof e=="boolean"?String(e):Array.isArray(e)&&e.every(a=>["string","number","boolean"].includes(typeof a))?s`<ul class="roxy-chips">
					${e.map(a=>s`<li>${String(a)}</li>`)}
				</ul>`:s`<roxy-data .data=${e} .depth=${this.depth+1}></roxy-data>`}formatPrimitive(e){return e==null?"":typeof e=="string"?e:typeof e=="number"||typeof e=="boolean"?String(e):Array.isArray(e)?e.map(String).join(", "):JSON.stringify(e)}collectKeys(e){let t=new Set;for(let a of e)for(let o of Object.keys(a))t.add(o);return Array.from(t)}humanize(e){return e.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^\w/,t=>t.toUpperCase())}};z.styles=[$,v`
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
		`],p([h({attribute:!1})],z.prototype,"data",2),p([h({attribute:!1})],z.prototype,"depth",2),z=p([b("roxy-data")],z);var Ft={manglik:"Mangal Dosha",kalsarpa:"Kaal Sarp Dosha",sadhesati:"Sade Sati"},D=class extends y{constructor(){super(...arguments);this.data=null;this.type="manglik"}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No dosha data</div>`;let t=!!e.present,a=Ft[this.type]??this.type,o=(e.severity??"").toLowerCase();return s`<article
			class="card"
			aria-label=${a}
		>
			<header class="head">
				<h2 class="title">${a}</h2>
				<div style="display:flex; gap:0.5rem; align-items:center;">
					<span class=${`badge ${t?"present":"absent"}`}>
						${t?"Present":"Absent"}
					</span>
					${e.severity?s`<span
								class=${`severity ${o}`}
								role="img"
								aria-label=${`Severity ${e.severity}`}
							>
								<span></span><span></span><span></span>
							</span>`:l}
				</div>
			</header>
			${e.description?s`<p class="description">${e.description}</p>`:l}
			${this.renderEffects(e)}
			${e.remedies&&e.remedies.length>0?s`<div>
						<h3>Remedies</h3>
						<ul>
							${e.remedies.map(n=>s`<li>${n}</li>`)}
						</ul>
					</div>`:l}
			${"exceptions"in e&&e.exceptions&&e.exceptions.length>0?s`<div>
					<h3>Exceptions</h3>
					<ul>
						${e.exceptions.map(n=>s`<li>${n}</li>`)}
					</ul>
				</div>`:l}
		</article>`}renderEffects(e){if(!e.effects)return l;let t=Object.entries(e.effects).filter(([,a])=>typeof a=="string"&&a.length>0);return t.length===0?l:s`<div class="effects">
			${t.map(([a,o])=>s`<div>
					<h3>${a}</h3>
					<p>${o}</p>
				</div>`)}
		</div>`}};D.styles=[$,v`
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
			.severity {
				display: flex;
				align-items: center;
				gap: 4px;
			}
			.severity span {
				width: 14px;
				height: 4px;
				border-radius: 2px;
				background: var(--roxy-border, #e4e4e7);
			}
			.severity.mild span:nth-child(1) {
				background: var(--roxy-warning, #ea580c);
			}
			.severity.moderate span:nth-child(-n + 2) {
				background: var(--roxy-warning, #ea580c);
			}
			.severity.severe span {
				background: var(--roxy-danger, #dc2626);
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
		`],p([h({attribute:!1})],D.prototype,"data",2),p([h({type:String,reflect:!0})],D.prototype,"type",2),D=p([b("roxy-dosha-card")],D);var Oe=new Map;async function Wt(i){let r=Oe.get(i);return r||(r=fetch(i).then(async e=>{if(!e.ok)throw new Error(`HTTP ${e.status}`);return await e.json()}).catch(e=>{throw Oe.delete(i),e}),Oe.set(i,r)),r}var R=class extends y{constructor(){super(...arguments);this.endpoint="vedic-astrology/birth-chart";this.method="POST";this.specUrl="https://roxyapi.com/api/v2/openapi.json";this.submitLabel="Submit";this.fields=[];this.values={};this.hasLocation=!1;this.loaded=!1;this.specError=null;this.retryLoadSchema=()=>{this.loaded=!1,this.specError=null,this.loadSchema()};this.onLocation=e=>{let t=e.detail;t&&(this.values={...this.values,latitude:t.latitude,longitude:t.longitude,timezone:t.timezone??t.utcOffset})};this.onSubmit=e=>{e.preventDefault();let t=this.fields.filter(a=>a.required).filter(a=>this.values[a.name]===void 0||this.values[a.name]==="");if(t.length>0){this.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{missing:t.map(a=>a.name)},bubbles:!0,composed:!0}));return}this.dispatchEvent(new CustomEvent("roxy-submit",{detail:{endpoint:this.endpoint,values:this.values},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.loadSchema()}async loadSchema(){this.specError=null;try{let e=await Wt(this.specUrl),t=`/${this.endpoint.replace(/^\//,"")}`,a=e.paths?.[t]?.[this.method.toLowerCase()];if(!a)throw new Error(`Endpoint ${this.method} ${t} not found in OpenAPI spec`);let o=e.components?.schemas??{},n=[],c;if(a.requestBody){let m=a.requestBody.content?.["application/json"]?.schema;c=this.resolve(m,o)}if(c?.properties){let m=new Set(c.required??[]);for(let[g,u]of Object.entries(c.properties)){let f=this.resolve(u,o)??{};n.push({name:g,type:this.fieldType(f),required:m.has(g),description:f.description,enum:f.enum,min:f.minimum,max:f.maximum,default:f.default})}}for(let m of a.parameters??[])if(m.in==="path"||m.in==="query"){let g=this.resolve(m.schema,o)??{};n.push({name:m.name,type:this.fieldType(g),required:!!m.required,description:g.description,enum:g.enum,default:g.default})}this.fields=n,this.hasLocation=n.some(m=>m.name==="latitude")&&n.some(m=>m.name==="longitude")&&n.some(m=>m.name==="timezone");let d={};for(let m of n)m.default!==void 0&&(d[m.name]=m.default);this.values=d,this.loaded=!0}catch(e){let t=e instanceof Error?e.message:String(e);this.specError=t,this.loaded=!0,this.dispatchEvent(new CustomEvent("roxy-spec-error",{detail:{url:this.specUrl,message:t},bubbles:!0,composed:!0}))}}resolve(e,t){if(e){if("$ref"in e&&e.$ref){let a=e.$ref.split("/").pop();return a?t[a]:void 0}return e}}fieldType(e){return e.enum?"enum":e.format==="date"?"date":e.format==="time"?"time":e.format==="date-time"?"datetime":e.type==="integer"||e.type==="number"?"number":"text"}setValue(e,t){this.values={...this.values,[e]:t}}render(){if(!this.loaded)return s`<form><div class="roxy-skeleton" style="height: 8rem"></div></form>`;if(this.specError)return s`<div class="spec-error" role="alert">
				Schema load failed: ${this.specError}
				<button type="button" class="submit" @click=${this.retryLoadSchema}>Retry</button>
			</div>`;let e=t=>{if(this.hasLocation&&(t.name==="latitude"||t.name==="longitude"||t.name==="timezone"))return l;let a=`roxy-form-${t.name}`;return s`<div class="field">
				<label for=${a}>
					${ht(t.name)}${t.required?s`<span class="req" aria-hidden="true">*</span>`:l}
				</label>
				${t.enum?s`<select
							id=${a}
							?required=${t.required}
							@change=${o=>this.setValue(t.name,o.target.value)}
						>
							<option value="">Choose</option>
							${t.enum.map(o=>s`<option value=${o} ?selected=${this.values[t.name]===o}>
									${o}
								</option>`)}
						</select>`:s`<input
							id=${a}
							type=${this.htmlType(t.type)}
							?required=${t.required}
							min=${t.min??""}
							max=${t.max??""}
							step=${t.type==="number"?"any":""}
							.value=${this.values[t.name]??""}
							@input=${o=>this.setValue(t.name,this.coerce(t.type,o.target.value))}
						/>`}
				${t.description?s`<small class="help">${t.description}</small>`:l}
			</div>`};return s`<form @submit=${this.onSubmit}>
			<h2 class="title">${ht(this.endpoint.split("/").pop()??"")}</h2>
			${this.hasLocation?s`<div class="location-block">
						<label>Birth location</label>
						<roxy-location-search
							@roxy-location-select=${this.onLocation}
							placeholder="City of birth"
						></roxy-location-search>
						<small class="help">
							Required: latitude, longitude, timezone. Pick a city to autofill.
						</small>
					</div>`:l}
			<div class="fields">
				${this.fields.map(t=>e(t))}
			</div>
			<button class="submit" type="submit">${this.submitLabel}</button>
		</form>`}htmlType(e){switch(e){case"date":return"date";case"time":return"time";case"datetime":return"datetime-local";case"number":return"number";default:return"text"}}coerce(e,t){if(t!==""){if(e==="number"){let a=Number(t);return Number.isFinite(a)?a:void 0}return t}}};R.styles=[$,v`
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
		`],p([h({type:String,attribute:"data-endpoint"})],R.prototype,"endpoint",2),p([h({type:String})],R.prototype,"method",2),p([h({type:String,attribute:"spec-url"})],R.prototype,"specUrl",2),p([h({type:String,attribute:"submit-label"})],R.prototype,"submitLabel",2),p([P()],R.prototype,"fields",2),p([P()],R.prototype,"values",2),p([P()],R.prototype,"hasLocation",2),p([P()],R.prototype,"loaded",2),p([P()],R.prototype,"specError",2),R=p([b("roxy-endpoint-form")],R);function ht(i){return i.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^\w/,r=>r.toUpperCase())}var V=class extends y{constructor(){super(...arguments);this.data=null}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No Guna Milan data</div>`;let t=(e.breakdown??[]).filter(a=>a?.category!==void 0);return s`<article class="card" aria-label="Guna Milan score">
			<div class="score-bar">
				<div>
					<span class="total">${A(e.total,1)}</span>
					<span class="over"> / ${e.maxScore}</span>
					${typeof e.percentage=="number"?s`<small style="margin-left: 0.5rem; color: var(--roxy-muted)">
								${pt(e.percentage,1)}
							</small>`:l}
				</div>
				${e.recommendation?s`<span class="recommendation">${e.recommendation}</span>`:l}
			</div>

			${t.length>0?s`<table>
						<thead>
							<tr>
								<th>Category</th>
								<th>Progress</th>
								<th class="score">Score</th>
							</tr>
						</thead>
						<tbody>
							${t.map(a=>{let o=a.score??0,n=a.maxScore??Jt(a.category),c=n?o/n*100:0;return s`<tr>
									<td>${a.category}</td>
									<td class="bar-cell">
										<div class="mini-bar">
											<span style="width: ${c}%"></span>
										</div>
									</td>
									<td class="score">${A(o,1)} / ${n}</td>
								</tr>`})}
						</tbody>
					</table>`:l}
			${(e.doshas?.length??0)>0||(e.doshaCancellations?.length??0)>0?s`<div class="tags">
						${e.doshas?.map(a=>s`<span class="dosha">${a}</span>`)}
						${e.doshaCancellations?.map(a=>s`<span class="cancel" title=${a.reason}>${a.dosha} cancelled</span>`)}
					</div>`:l}
		</article>`}};V.styles=[$,v`
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
				color: var(--roxy-danger-fg, #991b1b);
			}
			.tags .cancel {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 18%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
		`],p([h({attribute:!1})],V.prototype,"data",2),V=p([b("roxy-guna-milan")],V);function Jt(i){if(!i)return 1;switch(i.toLowerCase()){case"varna":return 1;case"vasya":return 2;case"tara":return 3;case"yoni":return 4;case"maitri":return 5;case"gana":return 6;case"bhakoot":return 7;case"nadi":return 8;default:return 1}}var be={Sun:"\u2609",Moon:"\u263D",Mercury:"\u263F",Venus:"\u2640",Earth:"\u2641",Mars:"\u2642",Jupiter:"\u2643",Saturn:"\u2644",Uranus:"\u2645",Neptune:"\u2646",Pluto:"\u2647",Rahu:"\u260A",Ketu:"\u260B",Ascendant:"Asc",Lagna:"La",NorthNode:"\u260A",SouthNode:"\u260B","North node":"\u260A","South node":"\u260B",Chiron:"\u26B7",Lilith:"\u26B8","Black moon lilith":"\u26B8"},ut={Sun:"Su",Moon:"Mo",Mercury:"Me",Venus:"Ve",Mars:"Ma",Jupiter:"Ju",Saturn:"Sa",Uranus:"Ur",Neptune:"Ne",Pluto:"Pl",Rahu:"Ra",Ketu:"Ke",Ascendant:"Asc",Lagna:"La"},ae={Aries:"\u2648",Taurus:"\u2649",Gemini:"\u264A",Cancer:"\u264B",Leo:"\u264C",Virgo:"\u264D",Libra:"\u264E",Scorpio:"\u264F",Sagittarius:"\u2650",Capricorn:"\u2651",Aquarius:"\u2652",Pisces:"\u2653"},gt={Aries:"Ar",Taurus:"Ta",Gemini:"Ge",Cancer:"Cn",Leo:"Le",Virgo:"Vi",Libra:"Li",Scorpio:"Sc",Sagittarius:"Sg",Capricorn:"Cp",Aquarius:"Aq",Pisces:"Pi"};var He={heaven:"\u2630",lake:"\u2631",fire:"\u2632",thunder:"\u2633",wind:"\u2634",water:"\u2635",mountain:"\u2636",earth:"\u2637",Heaven:"\u2630",Lake:"\u2631",Fire:"\u2632",Thunder:"\u2633",Wind:"\u2634",Water:"\u2635",Mountain:"\u2636",Earth:"\u2637"},yt={"new moon":"\u{1F311}","waxing crescent":"\u{1F312}","first quarter":"\u{1F313}","waxing gibbous":"\u{1F314}","full moon":"\u{1F315}","waning gibbous":"\u{1F316}","last quarter":"\u{1F317}","waning crescent":"\u{1F318}"};var O=class extends y{constructor(){super(...arguments);this.data=null;this.mode="lookup"}resolveHexagram(){let e=this.data;if(!e)return null;if("hexagram"in e&&e.hexagram){if("lines"in e){let a=e;return{hex:a.hexagram,lines:a.lines,changingLinePositions:a.changingLinePositions,resultingHexagram:a.resultingHexagram}}let t=e;return{hex:t.hexagram,dailyMessage:t.dailyMessage}}return{hex:e}}render(){let e=this.resolveHexagram();if(!e)return s`<div class="roxy-empty" role="status">No hexagram data</div>`;let{hex:t,lines:a,changingLinePositions:o,dailyMessage:n,resultingHexagram:c}=e,d=a??this.derivedLines(t),m=new Set(o??[]);return s`<article class="card" aria-label="I Ching hexagram">
			<div class="glyphs">
				${t.symbol?s`<div class="symbol">${t.symbol}</div>`:l}
				<div class="lines" aria-hidden="true">
					${d.slice().reverse().map((g,u)=>{let f=d.length-1-u+1,w=m.has(f),x=g===6||g===8;return s`<div class="line ${`${x?"broken":"solid"}${w?" changing":""}`}">
								${x?k`<span class="seg"></span><span class="seg"></span>`:k`<span class="seg"></span>`}
							</div>`})}
				</div>
			</div>
			<div>
				<h2 class="title">
					${t.number?s`${t.number}. `:l}${t.english??t.chinese??"Hexagram"}
				</h2>
				<p class="subtitle">
					${t.chinese?s`${t.chinese}`:l}
					${t.pinyin?s` · ${t.pinyin}`:l}
				</p>
				<div class="trigrams">
					${t.upperTrigram?s`<div>
								Upper
								<span class="tri-glyph"
									>${He[t.upperTrigram]??""}</span
								>${t.upperTrigram}
							</div>`:l}
					${t.lowerTrigram?s`<div>
								Lower
								<span class="tri-glyph"
									>${He[t.lowerTrigram]??""}</span
								>${t.lowerTrigram}
							</div>`:l}
				</div>
				${t.judgment?s`<p class="judgment">${t.judgment}</p>`:l}
				${t.image?s`<p class="image">${t.image}</p>`:l}
				${n?s`<p class="message">${n}</p>`:l}
				${t.interpretation?.general?s`<p>${t.interpretation.general}</p>`:l}
				${m.size>0?s`<div class="changing">
							Changing lines: ${Array.from(m).sort((g,u)=>g-u).join(", ")}.
							${c?.english?s` Becomes hexagram ${c.number}
										${c.english}.`:l}
						</div>`:l}
			</div>
		</article>`}derivedLines(e){let t=e.symbol.codePointAt(0)??0;if(t>=19904&&t<=19967){let a=t-19904,o=[];for(let n=0;n<6;n++){let c=a>>n&1;o.push(c?8:7)}return o}return Array.from({length:6},()=>7)}};O.styles=[$,v`
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
		`],p([h({attribute:!1})],O.prototype,"data",2),p([h({type:String,reflect:!0})],O.prototype,"mode",2),O=p([b("roxy-hexagram")],O);var H=class extends y{constructor(){super(...arguments);this.data=null;this.period="daily"}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No horoscope data</div>`;let t=e.sign??"",a=t?ae[Xt(t)]??"":"",o="energyRating"in e&&typeof e.energyRating=="number"?e.energyRating:null,n="date"in e&&e.date||"week"in e&&e.week||"month"in e&&e.month||"";return s`<article
			class="card"
			aria-label=${`${this.period} horoscope for ${t}`}
		>
			<header class="head">
				<span class="glyph" aria-hidden="true">${a}</span>
				<div>
					<h2 class="title">${t} ${this.period}</h2>
					${n?s`<div class="date">${n}</div>`:l}
				</div>
				${o!==null?s`<span class="energy" aria-label=${`Energy ${o} of 10`}>
							Energy ${o}/10
							<span class="energy-bar"
								><span style="width: ${o/10*100}%"></span
							></span>
						</span>`:l}
			</header>

			${e.overview?s`<p class="overview">${e.overview}</p>`:l}

			<div class="sections">
				${e.love?s`<div class="section">
							<h3>Love</h3>
							<p>${e.love}</p>
						</div>`:l}
				${e.career?s`<div class="section">
							<h3>Career</h3>
							<p>${e.career}</p>
						</div>`:l}
				${e.health?s`<div class="section">
							<h3>Health</h3>
							<p>${e.health}</p>
						</div>`:l}
				${e.finance?s`<div class="section">
							<h3>Finance</h3>
							<p>${e.finance}</p>
						</div>`:l}
				${"advice"in e&&e.advice?s`<div class="section">
							<h3>Advice</h3>
							<p>${e.advice}</p>
						</div>`:l}
			</div>

			${(()=>{let c="luckyNumber"in e&&e.luckyNumber!==void 0?e.luckyNumber:void 0,d="luckyColor"in e&&e.luckyColor?e.luckyColor:"",m="luckyNumbers"in e&&e.luckyNumbers?e.luckyNumbers:[],g="luckyDays"in e&&e.luckyDays?e.luckyDays:[],u=e.compatibleSigns??[];return c===void 0&&!d&&m.length===0&&g.length===0&&u.length===0?l:s`<div class="lucky">
						${c!==void 0?s`<span>Lucky number <strong>${c}</strong></span>`:l}
						${d?s`<span>Lucky color <strong>${d}</strong></span>`:l}
						${m.length?s`<span
									>Lucky numbers
									<strong>${m.join(", ")}</strong></span
								>`:l}
						${g.length?s`<span
									>Lucky days <strong>${g.join(", ")}</strong></span
								>`:l}
						${u.length?s`<span class="compat-wrap">
									Best with
									<span class="compat"
										>${u.map(f=>s`<span>${f}</span>`)}</span
									>
								</span>`:l}
					</div>`})()}
		</article>`}};H.styles=[$,v`
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
		`],p([h({attribute:!1})],H.prototype,"data",2),p([h({type:String,reflect:!0})],H.prototype,"period",2),H=p([b("roxy-horoscope-card")],H);function Xt(i){return i.charAt(0).toUpperCase()+i.slice(1).toLowerCase()}var F=class extends y{constructor(){super(...arguments);this.data=null}render(){if(!this.data)return s`<div class="roxy-empty" role="status">No KP data</div>`;let e=this.data.planets??[];return s`<div
			class="wrap"
			aria-label="KP planets table"
			tabindex="0"
		>
			<header class="head">
				<h2 class="title">KP planets</h2>
				${typeof this.data.ayanamsa=="number"?s`<span class="ayanamsa">Ayanamsa: ${A(this.data.ayanamsa,2)}°</span>`:l}
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
					${e.map(t=>s`<tr>
							<td class="planet">
								${t.planet}
								${t.retrograde?s`<span class="retro">R</span>`:l}
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
		</div>`}};F.styles=[$,v`
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
		`],p([h({attribute:!1})],F.prototype,"data",2),F=p([b("roxy-kp-planets-table")],F);function xt(i,r){let e,t=((...a)=>{e&&clearTimeout(e),e=setTimeout(()=>{e=void 0,i(...a)},r)});return t.cancel=()=>{e&&(clearTimeout(e),e=void 0)},t}var _=class extends y{constructor(){super(...arguments);this.endpoint="https://roxyapi.com/api/v2/location/search";this.placeholder="Search city";this.defaultValue="";this.query="";this.results=[];this.isOpen=!1;this.isLoading=!1;this.highlight=-1;this.secretKeyWarned=!1;this.debouncedFetch=xt(e=>{this.fetchResults(e)},300);this.onInput=e=>{let t=e.target.value;if(this.query=t,t.length<2){this.results=[],this.isOpen=!1,this.highlight=-1;return}this.debouncedFetch(t)};this.onKeyDown=e=>{if(!this.isOpen||this.results.length===0){e.key==="ArrowDown"&&this.query.length>=2&&(this.fetchResults(this.query),e.preventDefault());return}if(e.key==="ArrowDown")e.preventDefault(),this.highlight=(this.highlight+1)%this.results.length;else if(e.key==="ArrowUp")e.preventDefault(),this.highlight=(this.highlight-1+this.results.length)%this.results.length;else if(e.key==="Enter"){e.preventDefault();let t=this.results[this.highlight]??this.results[0];t&&this.select(t)}else e.key==="Escape"&&(this.isOpen=!1)}}connectedCallback(){super.connectedCallback(),this.query=this.defaultValue,this.clickOutsideHandler=e=>{e.composedPath().includes(this)||(this.isOpen=!1)},document.addEventListener("mousedown",this.clickOutsideHandler)}disconnectedCallback(){super.disconnectedCallback(),this.clickOutsideHandler&&document.removeEventListener("mousedown",this.clickOutsideHandler),this.debouncedFetch.cancel(),this.abortController&&(this.abortController.abort(),this.abortController=void 0)}warnIfSecretKey(){if(this.secretKeyWarned||!this.apiKey||this.apiKey.startsWith("pk_"))return;this.secretKeyWarned=!0;let e="Possible secret key in client-side <roxy-location-search>; use a `pk_` publishable key with origin allowlist instead.";console.warn(e),this.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{reason:"possible-secret-key",message:e},bubbles:!0,composed:!0}))}async fetchResults(e){this.warnIfSecretKey(),this.abortController&&this.abortController.abort();let t=new AbortController;this.abortController=t,this.isLoading=!0;try{let a=new URL(this.endpoint);a.searchParams.set("q",e),a.searchParams.set("limit","8");let o={Accept:"application/json"};this.apiKey&&(o["X-API-Key"]=this.apiKey),this.publishableKey&&(o["X-API-Key"]=this.publishableKey);let n=await fetch(a,{headers:o,signal:t.signal});if(!n.ok)throw new Error(`HTTP ${n.status}`);let c=await n.json();if(t.signal.aborted)return;this.results=c.cities??[],this.isOpen=this.results.length>0,this.highlight=this.results.length>0?0:-1}catch(a){if(a?.name==="AbortError")return;this.results=[],this.isOpen=!1}finally{this.abortController===t&&(this.abortController=void 0),t.signal.aborted||(this.isLoading=!1)}}select(e){this.query=`${e.city}${e.province?`, ${e.province}`:""}, ${e.country}`,this.isOpen=!1,this.results=[],this.dispatchEvent(new CustomEvent("roxy-location-select",{detail:e,bubbles:!0,composed:!0}))}render(){return s`<div class="field">
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
			${this.isLoading?s`<span class="spinner" role="status" aria-label="Loading"></span>`:l}
			${this.isOpen?s`<ul
						id="roxy-location-listbox"
						class="results"
						role="listbox"
					>
						${this.results.length===0?s`<li class="empty" role="status">No cities found</li>`:this.results.map((e,t)=>s`<li role="presentation">
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
												>${e.province?s`${e.province}, `:""}${e.country}</span
											>
											<span class="tz"
												>UTC${e.utcOffset>=0?"+":""}${e.utcOffset}</span
											>
										</button>
									</li>`)}
					</ul>`:l}
		</div>`}};_.styles=[$,v`
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
		`],p([h({type:String,attribute:"api-key"})],_.prototype,"apiKey",2),p([h({type:String,attribute:"publishable-key"})],_.prototype,"publishableKey",2),p([h({type:String})],_.prototype,"endpoint",2),p([h({type:String})],_.prototype,"placeholder",2),p([h({type:String,attribute:"default-value"})],_.prototype,"defaultValue",2),p([P()],_.prototype,"query",2),p([P()],_.prototype,"results",2),p([P()],_.prototype,"isOpen",2),p([P()],_.prototype,"isLoading",2),p([P()],_.prototype,"highlight",2),_=p([b("roxy-location-search")],_);var G=class extends y{constructor(){super(...arguments);this.data=null;this.mode="current"}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No moon phase data</div>`;let t="phases"in e?e.phases:"calendar"in e?e.calendar:[];if(this.mode!=="current"&&t.length>0){let a="month"in e?e.month:void 0,o="year"in e?e.year:void 0;return s`<article
				class="card"
				aria-label="Moon phase calendar"
			>
				<h2 class="label">${a??"Moon phases"} ${o??""}</h2>
				<div class="list" role="list">
					${t.map(n=>this.renderListItem(n))}
				</div>
			</article>`}return"phase"in e?this.renderSingle(e):l}renderSingle(e){let t=ft(e.phase);return s`<article class="card" aria-label="Current moon phase">
			<div class="hero">
				<span class="emoji" aria-hidden="true">${t}</span>
				<div>
					<h2 class="label">${e.phase??"Moon"}</h2>
					${e.date?s`<div class="date">${e.date}</div>`:l}
				</div>
			</div>
			<div class="stats">
				${typeof e.illumination=="number"?s`<div>
							<span>Illumination</span>
							<strong>${Zt(e.illumination)}</strong>
						</div>`:l}
				${typeof e.age=="number"?s`<div>
							<span>Age</span>
							<strong>${A(e.age,1)} days</strong>
						</div>`:l}
				${e.sign?s`<div>
							<span>Sign</span>
							<strong>${e.sign}</strong>
						</div>`:l}
				${typeof e.distance=="number"?s`<div>
							<span>Distance</span>
							<strong>${(e.distance/1e3).toFixed(0)}k km</strong>
						</div>`:l}
			</div>
			${e.meaning?.description?s`<p class="meaning">${e.meaning.description}</p>`:l}
			${e.meaning?.keywords?.length?s`<div class="keywords">
						${e.meaning.keywords.map(a=>s`<span>${a}</span>`)}
					</div>`:l}
		</article>`}renderListItem(e){let t=ft(e.phase);return s`<div class="list-item" role="listitem">
			<span aria-hidden="true">${t}</span>
			<span>${e.phase}</span>
			<span>${e.date??""}</span>
		</div>`}};G.styles=[$,v`
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
		`],p([h({attribute:!1})],G.prototype,"data",2),p([h({type:String,reflect:!0})],G.prototype,"mode",2),G=p([b("roxy-moon-phase")],G);function ft(i){return i?yt[i.toLowerCase()]??"\u{1F319}":"\u{1F319}"}function Zt(i){let r=i<=1?i*100:i;return`${Math.round(r)}%`}function C(i,r,e,t){let a=t*Math.PI/180;return{x:i+e*Math.cos(a),y:r+e*Math.sin(a)}}var Ie=384,S=Ie/2,Ge=150,Qt=134,je=110,$e=88,er=162,tr=176,j=class extends y{constructor(){super(...arguments);this.data=null;this.houseSystem="placidus"}getPlanets(){return this.data?.planets??[]}getAscendant(){return this.data?.ascendant?.longitude??0}getMidheaven(){let e=this.data?.midheaven?.longitude;return typeof e=="number"?e:null}toAngle(e){return 180+this.getAscendant()-e}render(){if(!this.data)return s`<div class="roxy-empty" role="status">No chart data</div>`;let e=this.getPlanets(),t=this.data.aspects??[];return s`<div class="wrap">
			<header>
				<h2 class="title">Natal chart</h2>
				${this.data.birthDetails?s`<div class="meta">
							${[this.data.birthDetails.date,this.data.birthDetails.time].filter(Boolean).join(" \xB7 ")}
						</div>`:l}
			</header>
			<svg
				viewBox="0 0 ${Ie} ${Ie}"
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
					cx=${S}
					cy=${S}
					r=${Ge}
					stroke-width="1.5"
				/>
				<circle
					class="wheel-line"
					cx=${S}
					cy=${S}
					r=${je}
					stroke-width="1"
				/>
				<circle
					class="wheel-line"
					cx=${S}
					cy=${S}
					r=${$e-16}
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
		</div>`}renderAngles(){let e=this.getAscendant(),t=this.getMidheaven(),a=[this.renderAngleMark(e,"ASC")];return t!==null&&a.push(this.renderAngleMark(t,"MC")),a}renderAngleMark(e,t){let a=this.toAngle(e),o=C(S,S,Ge,a),n=C(S,S,er,a),c=C(S,S,tr,a);return k`
			<g>
				<line class="angle-tick" x1=${o.x} y1=${o.y} x2=${n.x} y2=${n.y} />
				<text class="angle-marker" x=${c.x} y=${c.y} text-anchor="middle" dominant-baseline="central">${t}</text>
			</g>
		`}renderSpokes(){return Array.from({length:12},(e,t)=>{let a=this.toAngle(t*30),o=C(S,S,je,a),n=C(S,S,Ge,a);return k`<line class="wheel-line" x1=${o.x} y1=${o.y} x2=${n.x} y2=${n.y} stroke-width="0.8" />`})}renderSigns(){return["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"].map((t,a)=>{let o=this.toAngle(a*30+15),n=C(S,S,Qt,o);return k`<text class="sign-glyph" x=${n.x} y=${n.y} text-anchor="middle" dominant-baseline="central">${ae[t]}</text>`})}renderHouseNumbers(){let e=Math.floor(this.getAscendant()/30);return Array.from({length:12},(t,a)=>{let o=this.toAngle(a*30+15),n=C(S,S,je-12,o),c=(a-e+12)%12+1;return k`<text class="house-num" x=${n.x} y=${n.y} text-anchor="middle" dominant-baseline="central">${c}</text>`})}renderPlanets(e){return e.map(t=>{if(!Number.isFinite(t.longitude))return l;let a=this.toAngle(t.longitude),o=C(S,S,$e,a),n=be[we(t.name)]??t.name.slice(0,2),c=t.isRetrograde?" R":"",d=c?`${n}\u1D3F`:n;return k`<text class="planet-glyph" x=${o.x} y=${o.y} text-anchor="middle" dominant-baseline="central"><title>${t.name}${c}</title>${d}</text>`})}renderAspects(e,t){let a=new Map;for(let o of e){if(typeof o.longitude!="number")continue;let n=we(o.name);n&&a.set(n,o.longitude)}return t.map(o=>{let n=a.get(we(o.planet1)),c=a.get(we(o.planet2));if(n===void 0||c===void 0)return l;let d=C(S,S,$e-18,this.toAngle(n)),m=C(S,S,$e-18,this.toAngle(c)),g=ar(o),u=rr[g]??"aspect-other",f=A(o.orb,1);return k`<line class=${`aspect ${u}`} x1=${d.x} y1=${d.y} x2=${m.x} y2=${m.y}><title>${o.planet1} ${g||""} ${o.planet2}${f?` (orb ${f}\xB0)`:""}</title></line>`})}};j.styles=[$,v`
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
		`],p([h({attribute:!1})],j.prototype,"data",2),p([h({type:String,attribute:"house-system",reflect:!0})],j.prototype,"houseSystem",2),j=p([b("roxy-natal-chart")],j);function we(i){return i?i.charAt(0).toUpperCase()+i.slice(1).toLowerCase():""}var rr={conjunction:"aspect-conjunction",sextile:"aspect-sextile",square:"aspect-square",trine:"aspect-trine",opposition:"aspect-opposition"};function ar(i){return(i.type??"").toLowerCase().replace(/_/g,"-")}var I=class extends y{constructor(){super(...arguments);this.data=null;this.type="life-path"}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No numerology data</div>`;let t=sr[this.type]??this.type;return"coreNumbers"in e?this.renderChart(e,t):"personalYear"in e?this.renderPersonalYear(e,t):this.renderNumberCard(e,t)}renderNumberCard(e,t){let a=e.meaning?.keywords??[];return s`<article class="card" aria-label=${t}>
			<div class="hero">
				${typeof e.number=="number"?s`<div class="numeral">${e.number}</div>`:l}
				<div>
					<p class="label">${t}</p>
					${e.meaning?.title?s`<h2 class="title">${e.meaning.title}</h2>`:l}
				</div>
			</div>
			${e.meaning?.description?s`<p class="meaning">${e.meaning.description}</p>`:l}
			${e.calculation?s`<pre class="calc">${e.calculation}</pre>`:l}
			${a.length>0?s`<div class="chips">
						${a.map(o=>s`<span>${o}</span>`)}
					</div>`:l}
			${e.hasKarmicDebt&&e.karmicDebtNumber?s`<div class="karmic">
						Karmic debt ${e.karmicDebtNumber}.
						${or(e.karmicDebtMeaning)}
					</div>`:l}
		</article>`}renderPersonalYear(e,t){return s`<article class="card" aria-label=${t}>
			<div class="hero">
				${typeof e.personalYear=="number"?s`<div class="numeral">${e.personalYear}</div>`:l}
				<div>
					<p class="label">${t}</p>
					${e.theme?s`<h2 class="title">${e.theme}</h2>`:l}
				</div>
			</div>
			${e.forecast?s`<p class="meaning">${e.forecast}</p>`:l}
			${e.advice?s`<p>${e.advice}</p>`:l}
		</article>`}renderChart(e,t){let a=Object.entries(e.coreNumbers).filter(([,o])=>o!=null);return s`<article class="card" aria-label=${t}>
			<div>
				<p class="label">${t}</p>
				${e.profile?.name?s`<h2 class="title">${e.profile.name}</h2>`:l}
			</div>
			${a.length>0?s`<div class="cores">
						${a.map(([o,n])=>s`<div class="item">
								<span>${ir(o)}</span>
								<strong>${n.number??""}</strong>
							</div>`)}
					</div>`:l}
		</article>`}};I.styles=[$,v`
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
		`],p([h({attribute:!1})],I.prototype,"data",2),p([h({type:String,reflect:!0})],I.prototype,"type",2),I=p([b("roxy-numerology-card")],I);var sr={"life-path":"Life Path",expression:"Expression","personal-year":"Personal Year",chart:"Numerology chart"};function or(i){return i?[i.description,i.challenge,i.resolution].filter(Boolean).join(" "):""}function ir(i){return i.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^\w/,r=>r.toUpperCase())}var U=class extends y{constructor(){super(...arguments);this.data=null;this.detail="detailed"}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No panchang data</div>`;let t="sunrise"in e?e:null,a=[["Tithi",this.formatPart(e.tithi)],["Nakshatra",this.formatPart(e.nakshatra)],["Yoga",this.formatPart(e.yoga)],["Karana",this.formatPart(e.karana)]];t&&a.push(["Vara",this.formatPart(t.vara)]);let o=t?[["Brahma Muhurta",t.brahmaMuhurta],["Abhijit Muhurta",t.abhijitMuhurta],["Vijaya Muhurta",t.vijayaMuhurta],["Godhuli Muhurta",t.godhuliMuhurta],["Nishita Muhurta",t.nishitaMuhurta],["Pratah Sandhya",t.pratahSandhya],["Sayahna Sandhya",t.sayahnaSandhya]]:[],n=t?[["Rahu Kaal",t.rahuKaal],["Yamaganda",t.yamaganda],["Gulika",t.gulika]]:[];return s`<div class="wrap" aria-label="Panchang">
			<header class="head">
				<h2 class="title">Panchang</h2>
				<span class="date">${t?dt(t.date):""}</span>
			</header>
			<table>
				<tbody>
					${a.map(([c,d])=>s`<tr>
							<th>${c}</th>
							<td>${d}</td>
						</tr>`)}
					${t?.sunrise?s`<tr>
								<th>Sunrise</th>
								<td>${ee(t.sunrise)}</td>
							</tr>`:l}
					${t?.sunset?s`<tr>
								<th>Sunset</th>
								<td>${ee(t.sunset)}</td>
							</tr>`:l}
					${t?.moonrise?s`<tr>
								<th>Moonrise</th>
								<td>${ee(t.moonrise)}</td>
							</tr>`:l}
					${t?.moonset?s`<tr>
								<th>Moonset</th>
								<td>${ee(t.moonset)}</td>
							</tr>`:l}
				</tbody>
			</table>
			${this.detail==="detailed"&&(o.some(c=>!!c[1])||n.some(c=>!!c[1]))?s`
						<div class="section">Auspicious muhurtas</div>
						<table>
							<tbody>
								${o.filter(([,c])=>!!c).map(([c,d])=>s`<tr>
											<th>${c}</th>
											<td>${De(d)}</td>
										</tr>`)}
							</tbody>
						</table>
						<div class="section">Inauspicious periods</div>
						<table>
							<tbody>
								${n.filter(([,c])=>!!c).map(([c,d])=>s`<tr>
											<th>${c}</th>
											<td>${De(d)}</td>
										</tr>`)}
							</tbody>
						</table>
					`:l}
		</div>`}formatPart(e){if(!e)return"";if(typeof e=="string")return e;if(typeof e=="object"){let t=e;return[t.name,t.lord?`(${t.lord})`:"",t.phase].filter(Boolean).join(" ")}return String(e)}};U.styles=[$,v`
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
		`],p([h({attribute:!1})],U.prototype,"data",2),p([h({type:String,reflect:!0})],U.prototype,"detail",2),U=p([b("roxy-panchang-table")],U);var Be=360,E=Be/2,vt=170,nr=154,bt=124,me=96,W=class extends y{constructor(){super(...arguments);this.data=null}render(){if(!this.data)return s`<div class="roxy-empty" role="status">No synastry data</div>`;let{person1:e,person2:t,compatibilityScore:a,analysis:o}=this.data,n=this.data.interAspects??[],c=e?.planets??[],d=t?.planets??[],m=typeof a=="number"?Math.round(a):void 0,g=o?.overall,u=o?.strengths??[],f=o?.challenges??[];return c.length>0&&d.length>0?s`<div
			class="wrap"
			aria-label="Synastry compatibility chart"
		>
			<div class="head">
				<h2 class="title">Synastry</h2>
				${typeof m=="number"?s`<span class="score" aria-label=${`Score ${m} of 100`}
							>${m} / 100</span
						>`:l}
			</div>
			<svg
				viewBox="0 0 ${Be} ${Be}"
				role="img"
				aria-label="Dual chart wheel comparing two natal charts"
			>
				<title>Synastry dual wheel</title>
				<circle
					class="wheel-line"
					cx=${E}
					cy=${E}
					r=${vt}
					stroke-width="1.5"
				/>
				<circle
					class="wheel-line"
					cx=${E}
					cy=${E}
					r=${me+14}
					stroke-width="0.8"
				/>
				<circle
					class="wheel-line"
					cx=${E}
					cy=${E}
					r=${me-14}
					stroke-width="0.6"
				/>
				${this.renderSpokes()} ${this.renderSigns()}
				${this.renderInterAspectLines(c,d,n)}
				${this.renderRing(c,bt,"p1")} ${this.renderRing(d,me,"p2")}
			</svg>
			<div class="legend-row">
				<span><span class="swatch" style="background: var(--roxy-accent)"></span>Person 1</span>
				<span><span class="swatch" style="background: var(--roxy-info)"></span>Person 2</span>
				<span><span class="swatch" style="background: var(--roxy-success)"></span>harmonious</span>
				<span><span class="swatch" style="background: var(--roxy-danger)"></span>challenging</span>
			</div>
			${g?s`<p class="summary">${g}</p>`:l}
			${n.length>0?this.renderAspects(n):l}
			${u.length>0||f.length>0?s`<div class="lists">
						${u.length?s`<div>
									<h3>Strengths</h3>
									<ul>
										${u.map(x=>s`<li>${x}</li>`)}
									</ul>
								</div>`:l}
						${f.length?s`<div>
									<h3>Challenges</h3>
									<ul>
										${f.map(x=>s`<li>${x}</li>`)}
									</ul>
								</div>`:l}
					</div>`:l}
		</div>`:s`<div
				class="wrap"
				aria-label="Synastry compatibility chart"
			>
				<div class="head">
					<h2 class="title">Synastry</h2>
					${typeof m=="number"?s`<span class="score" aria-label=${`Score ${m} of 100`}
								>${m} / 100</span
							>`:l}
				</div>
				<div class="missing-planets" role="status">
					Synastry response missing planet positions. Pass
					<code>data</code> with <code>person1.planets</code> and
					<code>person2.planets</code> arrays from the natal-chart endpoint, or
					use the <code>&lt;roxy-data&gt;</code> fallback.
				</div>
				${g?s`<p class="summary">${g}</p>`:l}
				${n.length>0?this.renderAspects(n):l}
				${u.length>0||f.length>0?s`<div class="lists">
							${u.length?s`<div>
										<h3>Strengths</h3>
										<ul>
											${u.map(x=>s`<li>${x}</li>`)}
										</ul>
									</div>`:l}
							${f.length?s`<div>
										<h3>Challenges</h3>
										<ul>
											${f.map(x=>s`<li>${x}</li>`)}
										</ul>
									</div>`:l}
						</div>`:l}
			</div>`}toAngle(e){return 180-e}renderSpokes(){return Array.from({length:12},(e,t)=>{let a=this.toAngle(t*30),o=C(E,E,me-14,a),n=C(E,E,vt,a);return k`<line class="wheel-line" x1=${o.x} y1=${o.y} x2=${n.x} y2=${n.y} stroke-width="0.6" />`})}renderSigns(){return["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"].map((t,a)=>{let o=this.toAngle(a*30+15),n=C(E,E,nr,o);return k`<text class="sign" x=${n.x} y=${n.y} text-anchor="middle" dominant-baseline="central">${ae[t]}</text>`})}renderRing(e,t,a){return e.map(o=>{if(!Number.isFinite(o.longitude))return l;let n=C(E,E,t,this.toAngle(o.longitude)),c=be[Ue(o.name)]??o.name.slice(0,2);return k`<text class=${a} x=${n.x} y=${n.y} text-anchor="middle" dominant-baseline="central"><title>${o.name}</title>${c}</text>`})}renderInterAspectLines(e,t,a){let o=(n,c)=>{let d=Ue(c);for(let m of n)if(Ue(m.name)===d&&typeof m.longitude=="number")return m.longitude};return a.map(n=>{let c=o(e,n.planet1),d=o(t,n.planet2);if(c===void 0||d===void 0)return l;let m=C(E,E,bt-12,this.toAngle(c)),g=C(E,E,me+8,this.toAngle(d)),u=$t(n),f=lr[u]??"aspect-other",w=A(n.orb,1);return k`<line class=${`aspect ${f}`} x1=${m.x} y1=${m.y} x2=${g.x} y2=${g.y}><title>${n.planet1} ${u} ${n.planet2}${w?` (orb ${w}\xB0)`:""}</title></line>`})}renderAspects(e){return s`<table>
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
				${e.slice(0,12).map(t=>s`<tr>
						<td>${t.planet1}</td>
						<td>${t.planet2}</td>
						<td>${$t(t)||""}</td>
						<td class="orb">${A(t.orb,1)}</td>
						<td>${cr(t.strength)}</td>
					</tr>`)}
			</tbody>
		</table>`}};W.styles=[$,v`
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
		`],p([h({attribute:!1})],W.prototype,"data",2),W=p([b("roxy-synastry-chart")],W);function Ue(i){return i?i.charAt(0).toUpperCase()+i.slice(1).toLowerCase():""}var lr={conjunction:"aspect-conjunction",sextile:"aspect-sextile",square:"aspect-square",trine:"aspect-trine",opposition:"aspect-opposition"};function $t(i){return(i.type??"").toLowerCase().replace(/_/g,"-")}function cr(i){return typeof i=="number"?Math.round(i).toString():""}var B=class extends y{constructor(){super(...arguments);this.data=null;this.flipped=!1;this.toggleFlip=()=>{this.flipped=!this.flipped}}render(){let e=this.data;return e?"card"in e?this.renderDailyCard(e):this.renderFullCard(e):s`<div class="roxy-empty" role="status">No tarot data</div>`}renderDailyCard(e){let t=e.card,a=this.flipped!==!!t.reversed,o=t.keywords??[];return s`<article class="card" aria-label=${t.name??"Tarot card"}>
			<div class="image-wrap">
				${t.imageUrl?s`<img
							class=${`image ${a?"reversed":""}`}
							src=${t.imageUrl}
							alt=${t.name??"Tarot card"}
							tabindex="0"
							@click=${this.toggleFlip}
							@keydown=${n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),this.toggleFlip())}}
						/>`:s`<div
							class=${`image ${a?"reversed":""}`}
							style="aspect-ratio: 0.6; display: flex; align-items: center; justify-content: center; color: var(--roxy-muted)"
						>
							${t.name??"?"}
						</div>`}
			</div>
			<div>
				<div class="meta">
					${t.arcana?s`${t.arcana} arcana`:l}
					${a?s` · reversed`:l}
				</div>
				<h2 class="title">${t.name??"Tarot card"}</h2>
				${e.dailyMessage?s`<p class="message">${e.dailyMessage}</p>`:l}
				${t.meaning?s`<p>${t.meaning}</p>`:l}
				${o.length>0?s`<div class="chips">
							${o.map(n=>s`<span>${n}</span>`)}
						</div>`:l}
				<button
					class="flip"
					type="button"
					@click=${this.toggleFlip}
					aria-pressed=${this.flipped?"true":"false"}
				>
					Flip card
				</button>
			</div>
		</article>`}renderFullCard(e){let t=this.flipped,a=t?e.reversed:e.upright,o=t?e.keywords?.reversed??[]:e.keywords?.upright??[];return s`<article class="card" aria-label=${e.name??"Tarot card"}>
			<div class="image-wrap">
				${e.imageUrl?s`<img
							class=${`image ${t?"reversed":""}`}
							src=${e.imageUrl}
							alt=${e.name??"Tarot card"}
							tabindex="0"
							@click=${this.toggleFlip}
							@keydown=${n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),this.toggleFlip())}}
						/>`:s`<div
							class=${`image ${t?"reversed":""}`}
							style="aspect-ratio: 0.6; display: flex; align-items: center; justify-content: center; color: var(--roxy-muted)"
						>
							${e.name??"?"}
						</div>`}
			</div>
			<div>
				<div class="meta">
					${e.arcana?s`${e.arcana} arcana`:l}
					${e.number!==void 0&&e.number!==null?s` · ${e.number}`:l}
					${t?s` · reversed`:l}
				</div>
				<h2 class="title">${e.name??"Tarot card"}</h2>
				${a?.description?s`<p>${a.description}</p>`:l}
				${o.length>0?s`<div class="chips">
							${o.map(n=>s`<span>${n}</span>`)}
						</div>`:l}
				<button
					class="flip"
					type="button"
					@click=${this.toggleFlip}
					aria-pressed=${this.flipped?"true":"false"}
				>
					Flip card
				</button>
			</div>
		</article>`}};B.styles=[$,v`
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
		`],p([h({attribute:!1})],B.prototype,"data",2),p([P()],B.prototype,"flipped",2),B=p([b("roxy-tarot-card")],B);var q=class extends y{constructor(){super(...arguments);this.data=null;this.spread="three-card"}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No tarot spread</div>`;let t="answer"in e,a="cards"in e&&!("spread"in e),o=a?[]:"positions"in e?e.positions??[]:[],n=a&&"cards"in e?e.cards:[],c=t?e.answer:void 0,d=t?e.strength:void 0,m="spread"in e?e.spread:this.spread.replace(/-/g," "),g="question"in e?e.question:void 0,u="summary"in e?e.summary:void 0,f=t?e.interpretation:void 0,w=c?c.toLowerCase().replace(/[^a-z]/g,""):"";return s`<article class="wrap" aria-label="Tarot spread">
			<header class="head">
				<h2 class="title">${m}</h2>
				${g?s`<span class="question">"${g}"</span>`:l}
			</header>
			${t?s`<div>
						<span class=${`answer ${w}`}>${c}</span>
						${d?s`<small> · ${d}</small>`:l}
					</div>`:l}
			${o.length>0?s`<div class="grid">
						${o.map(x=>s`<div class="card">
								<p class="label">${x.name??""}</p>
								<div class="image">
									${x.card?.imageUrl?s`<img
												src=${x.card.imageUrl}
												alt=${x.card.name??"tarot card"}
												class=${x.card.reversed?"reversed":""}
											/>`:s`${x.card?.name??"?"}`}
								</div>
								<p class="name">
									${x.card?.name??""}
									${x.card?.reversed?s`<small>(reversed)</small>`:l}
								</p>
								${x.interpretation?s`<p class="interp">${x.interpretation}</p>`:l}
							</div>`)}
					</div>`:l}
			${n.length>0?s`<div class="grid">
						${n.map(x=>s`<div class="card">
								<div class="image">
									${x.imageUrl?s`<img
												src=${x.imageUrl}
												alt=${x.name??"tarot card"}
												class=${x.reversed?"reversed":""}
											/>`:s`${x.name??"?"}`}
								</div>
								<p class="name">
									${x.name??""}
									${x.reversed?s`<small>(reversed)</small>`:l}
								</p>
								${x.meaning?s`<p class="interp">${x.meaning}</p>`:l}
							</div>`)}
					</div>`:l}
			${u?s`<p class="reading">${u}</p>`:l}
			${f?s`<p class="reading">${f}</p>`:l}
		</article>`}};q.styles=[$,v`
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
		`],p([h({attribute:!1})],q.prototype,"data",2),p([h({type:String,reflect:!0})],q.prototype,"spread",2),q=p([b("roxy-tarot-spread")],q);var dr={1:{x:150,y:58},2:{x:205,y:52},3:{x:253,y:112},4:{x:243,y:150},5:{x:253,y:188},6:{x:205,y:248},7:{x:150,y:242},8:{x:95,y:248},9:{x:47,y:188},10:{x:57,y:150},11:{x:47,y:112},12:{x:95,y:52}},pr={1:{x:150,y:35},2:{x:222,y:40},3:{x:265,y:100},4:{x:265,y:150},5:{x:265,y:200},6:{x:222,y:260},7:{x:150,y:265},8:{x:78,y:260},9:{x:35,y:200},10:{x:35,y:150},11:{x:35,y:100},12:{x:78,y:40}},mr=["aries","taurus","gemini","cancer","leo","virgo","libra","scorpio","sagittarius","capricorn","aquarius","pisces"],hr={aries:"Aries",taurus:"Taurus",gemini:"Gemini",cancer:"Cancer",leo:"Leo",virgo:"Virgo",libra:"Libra",scorpio:"Scorpio",sagittarius:"Sagittarius",capricorn:"Capricorn",aquarius:"Aquarius",pisces:"Pisces"},K=class extends y{constructor(){super(...arguments);this.data=null;this.chartStyle="south"}buildHouses(){if(!this.data)return[];let e=this.data,t=[];for(let a=0;a<12;a++){let o=mr[a],c=(e[o]?.signs??[]).map(d=>d.graha).filter(Boolean);t.push({house:a+1,sign:hr[o]??"",planets:c})}return t}render(){if(!this.data)return s`<div class="roxy-empty" role="status">No kundli data</div>`;let e=this.buildHouses();return s`<div class="wrap">
			<h2 class="title">Vedic kundli</h2>
			<svg
				viewBox="0 0 300 300"
				role="img"
				aria-label="Vedic birth chart with twelve sign houses"
			>
				<title>Vedic kundli</title>
				<polygon class="line" points="150,10 290,150 150,290 10,150" stroke-width="1.5" />
				<polygon
					class="line"
					points="220,80 220,220 80,220 80,80"
					stroke-width="1"
					fill="none"
				/>
				<line class="line" x1="150" y1="10" x2="80" y2="80" stroke-width="1" />
				<line class="line" x1="150" y1="10" x2="220" y2="80" stroke-width="1" />
				<line class="line" x1="290" y1="150" x2="220" y2="80" stroke-width="1" />
				<line class="line" x1="290" y1="150" x2="220" y2="220" stroke-width="1" />
				<line class="line" x1="150" y1="290" x2="220" y2="220" stroke-width="1" />
				<line class="line" x1="150" y1="290" x2="80" y2="220" stroke-width="1" />
				<line class="line" x1="10" y1="150" x2="80" y2="220" stroke-width="1" />
				<line class="line" x1="10" y1="150" x2="80" y2="80" stroke-width="1" />
				${e.map(t=>this.renderHouseGroup(t))}
			</svg>
		</div>`}isLagna(e){let t=this.data?.meta?.Lagna?.rashi;return t?t.toLowerCase()===e.sign.toLowerCase():!1}renderHouseGroup(e){let t=dr[e.house],a=pr[e.house];if(!t||!a)return l;let o=gt[e.sign]??"",n=e.planets??[],c=this.isLagna(e);return k`
			<g>
				${c?k`<rect class="lagna-bg" x=${t.x-30} y=${t.y-28} width="60" height="56" rx="6" />`:l}
				${o?k`<text class="sign-text" x=${a.x} y=${a.y} text-anchor="middle" dominant-baseline="central">${o}</text>`:l}
				${c?k`<text class="lagna-marker" x=${t.x} y=${t.y-18} text-anchor="middle" dominant-baseline="central">LAGNA</text>`:l}
				${n.map((d,m)=>{let g=ut[ur(d)]??d.slice(0,2),u=13,x=(c?t.y+8:t.y)-(n.length-1)*u/2+m*u;return k`<text class="planet-text" x=${t.x} y=${x} text-anchor="middle" dominant-baseline="central">${g}</text>`})}
			</g>
		`}};K.styles=[$,v`
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
		`],p([h({attribute:!1})],K.prototype,"data",2),p([h({type:String,reflect:!0,attribute:"chart-style"})],K.prototype,"chartStyle",2),K=p([b("roxy-vedic-kundli")],K);function ur(i){return i?i.charAt(0).toUpperCase()+i.slice(1).toLowerCase():""}var Se=[{pascal:"RoxyNatalChart",tag:"roxy-natal-chart",slug:"natal-chart",domain:"astrology",heading:"Natal chart",endpoints:["astrology.generateNatalChart"],description:"Western natal chart wheel for /astrology/natal-chart responses",docsLabel:"Western",endpointLabel:"POST /astrology/natal-chart",docsSummary:"Natal chart wheel with planet glyphs and aspect lines",topic:"Astrology"},{pascal:"RoxyHoroscopeCard",tag:"roxy-horoscope-card",slug:"horoscope-card",domain:"astrology",heading:"Daily horoscope",endpoints:["astrology.getDailyHoroscope","astrology.getWeeklyHoroscope","astrology.getMonthlyHoroscope"],description:"Daily, weekly, or monthly horoscope card for /astrology/horoscope/...",docsLabel:"Western",endpointLabel:"GET /astrology/horoscope/{sign}/{daily,weekly,monthly}",docsSummary:"Daily, weekly, or monthly horoscope card",topic:"Astrology"},{pascal:"RoxySynastryChart",tag:"roxy-synastry-chart",slug:"synastry-chart",domain:"astrology",heading:"Synastry",endpoints:["astrology.calculateSynastry"],description:"Dual-wheel synastry chart with inter-aspects table",docsLabel:"Western",endpointLabel:"POST /astrology/synastry",docsSummary:"Dual-wheel synastry with inter-aspects table",topic:"Astrology"},{pascal:"RoxyCompatibilityCard",tag:"roxy-compatibility-card",slug:"compatibility-card",domain:"astrology",heading:"Compatibility score",endpoints:["astrology.calculateCompatibility","numerology.calculateNumCompatibility","biorhythm.calculateBioCompatibility"],description:"Cross-domain compatibility score card",docsLabel:"Cross",endpointLabel:"POST /astrology/compatibility-score, /numerology/compatibility, /biorhythm/compatibility",docsSummary:"Score card with category breakdown",topic:"Astrology"},{pascal:"RoxyMoonPhase",tag:"roxy-moon-phase",slug:"moon-phase",domain:"astrology",heading:"Moon phase",endpoints:["astrology.getCurrentMoonPhase","astrology.getUpcomingMoonPhases","astrology.getMoonCalendar"],description:"Moon phase card and calendar",docsLabel:"Western",endpointLabel:"GET /astrology/moon-phase/{current,upcoming,calendar/...}",docsSummary:"Moon phase card and calendar",topic:"Astrology"},{pascal:"RoxyVedicKundli",tag:"roxy-vedic-kundli",slug:"vedic-kundli",domain:"vedic",heading:"Vedic kundli",endpoints:["vedicAstrology.generateBirthChart"],description:"South or North Indian Vedic kundli for /vedic-astrology/birth-chart",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/birth-chart",docsSummary:"South or North Indian kundli",topic:"Vedic"},{pascal:"RoxyPanchangTable",tag:"roxy-panchang-table",slug:"panchang-table",domain:"vedic",heading:"Panchang",endpoints:["vedicAstrology.getBasicPanchang","vedicAstrology.getDetailedPanchang"],description:"Panchang muhurta table with auspicious and inauspicious periods",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/panchang/{basic,detailed}",docsSummary:"15+ muhurtas in detailed mode",topic:"Vedic"},{pascal:"RoxyDashaTimeline",tag:"roxy-dasha-timeline",slug:"dasha-timeline",domain:"vedic",heading:"Vimshottari dasha",endpoints:["vedicAstrology.getCurrentDasha","vedicAstrology.getMajorDashas","vedicAstrology.getSubDashas"],description:"Vimshottari dasha timeline with active mahadasha highlighted",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/dasha/{current,major,sub/...}",docsSummary:"Vimshottari mahadasha + antardasha + pratyantardasha",topic:"Vedic"},{pascal:"RoxyDoshaCard",tag:"roxy-dosha-card",slug:"dosha-card",domain:"vedic",heading:"Manglik dosha",endpoints:["vedicAstrology.checkManglikDosha","vedicAstrology.checkKalsarpaDosha","vedicAstrology.checkSadhesati"],description:"Manglik, Kaal Sarp, or Sade Sati presence card",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/dosha/{manglik,kalsarpa,sadhesati}",docsSummary:"Presence, severity, remedies, scoped effects",topic:"Vedic"},{pascal:"RoxyGunaMilan",tag:"roxy-guna-milan",slug:"guna-milan",domain:"vedic",heading:"Guna milan",endpoints:["vedicAstrology.calculateGunMilan"],description:"36-point Ashtakoota matrimonial compatibility breakdown",docsLabel:"Vedic",endpointLabel:"POST /vedic-astrology/compatibility",docsSummary:"36-point Ashtakoota with eight sub-scores",topic:"Vedic"},{pascal:"RoxyKpPlanetsTable",tag:"roxy-kp-planets-table",slug:"kp-planets-table",domain:"vedic",heading:"KP planets",endpoints:["vedicAstrology.getKpPlanets"],description:"KP planets table with sub-lord and sub-sub-lord columns",docsLabel:"Vedic (KP)",endpointLabel:"POST /vedic-astrology/kp/planets",docsSummary:"Sub-lord and sub-sub-lord columns",topic:"Vedic"},{pascal:"RoxyNumerologyCard",tag:"roxy-numerology-card",slug:"numerology-card",domain:"numerology",heading:"Life path number",endpoints:["numerology.calculateLifePath","numerology.calculateExpression","numerology.calculatePersonalYear","numerology.generateNumerologyChart"],description:"Numerology card for life path, expression, personal year, or full chart",docsLabel:"Numerology",endpointLabel:"POST /numerology/{life-path,expression,personal-year,chart}",docsSummary:"Life path, expression, personal year, full chart",topic:"Numerology"},{pascal:"RoxyTarotCard",tag:"roxy-tarot-card",slug:"tarot-card",domain:"tarot",heading:"Daily tarot card",endpoints:["tarot.getCard","tarot.getDailyCard"],description:"Single tarot card with upright/reversed flip animation",docsLabel:"Tarot",endpointLabel:"GET /tarot/cards/{id}, POST /tarot/daily",docsSummary:"Single card with upright and reversed flip",topic:"Tarot"},{pascal:"RoxyTarotSpread",tag:"roxy-tarot-spread",slug:"tarot-spread",domain:"tarot",heading:"Three-card spread",endpoints:["tarot.castThreeCard","tarot.castCelticCross","tarot.castLoveSpread","tarot.castYesNo","tarot.drawCards"],description:"Tarot spread renderer for three-card, Celtic Cross, love, or yes/no",docsLabel:"Tarot",endpointLabel:"POST /tarot/spreads/{three-card,celtic-cross,love}, /tarot/yes-no, /tarot/draw",docsSummary:"Spreads with positions and reading",topic:"Tarot"},{pascal:"RoxyBiorhythmChart",tag:"roxy-biorhythm-chart",slug:"biorhythm-chart",domain:"biorhythm",heading:"Daily biorhythm",endpoints:["biorhythm.getDailyBiorhythm","biorhythm.getForecast","biorhythm.getCriticalDays"],description:"Daily biorhythm bars or multi-day forecast cycle lines",docsLabel:"Biorhythm",endpointLabel:"POST /biorhythm/{daily,forecast,critical-days}",docsSummary:"Daily bars, forecast cycle lines, critical days",topic:"Biorhythm"},{pascal:"RoxyHexagram",tag:"roxy-hexagram",slug:"hexagram",domain:"iching",heading:"I Ching hexagram",endpoints:["iching.getHexagram","iching.castReading","iching.getDailyHexagram","iching.castDailyReading","iching.getRandomHexagram"],description:"I Ching hexagram with trigram glyphs, judgment, image, and changing lines",docsLabel:"I Ching",endpointLabel:"GET /iching/hexagrams/{number}, /iching/cast, POST /iching/daily, /iching/daily/cast",docsSummary:"Hexagram with trigrams, judgment, image, changing lines",topic:"I Ching"},{pascal:"RoxyEndpointForm",tag:"roxy-endpoint-form",slug:"endpoint-form",domain:"utility",heading:"Schema-driven form",endpoints:[],description:"Schema-driven form that emits roxy-submit with a validated payload",docsLabel:"Helper",endpointLabel:"Any endpoint via x-roxy-ui hints",docsSummary:"Schema-driven form, emits roxy-submit",topic:"Helpers",selfFetching:!0},{pascal:"RoxyLocationSearch",tag:"roxy-location-search",slug:"location-search",domain:"utility",heading:"City search",endpoints:["location.searchCities"],description:"City search input with debounced /location/search calls",docsLabel:"Helper",endpointLabel:"GET /location/search",docsSummary:"Debounced city search input, emits roxy-location-select",topic:"Helpers",selfFetching:!0},{pascal:"RoxyData",tag:"roxy-data",slug:"data",domain:"utility",heading:"Generic renderer",endpoints:[],description:"Generic fallback renderer for any OpenAPI response shape",docsLabel:"Helper",endpointLabel:"Any response shape",docsSummary:"Generic fallback renderer for unknown shapes",topic:"Helpers",selfFetching:!0}];var wt="0.1.3";var gr=Se.map(i=>i.slug);return Et(yr);})();
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
