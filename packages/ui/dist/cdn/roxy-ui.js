"use strict";var RoxyUI=(()=>{var de=Object.defineProperty;var He=Object.getOwnPropertyDescriptor;var gr=Object.getOwnPropertyNames;var ur=Object.prototype.hasOwnProperty;var hr=(o,t)=>{for(var e in t)de(o,e,{get:t[e],enumerable:!0})},yr=(o,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of gr(t))!ur.call(o,a)&&a!==e&&de(o,a,{get:()=>t[a],enumerable:!(r=He(t,a))||r.enumerable});return o};var xr=o=>yr(de({},"__esModule",{value:!0}),o),d=(o,t,e,r)=>{for(var a=r>1?void 0:r?He(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(a=(r?n(t,e,a):n(a))||a);return r&&a&&de(t,e,a),a};var Xr={};hr(Xr,{ROXY_UI_COMPONENTS:()=>Zr,ROXY_UI_VERSION:()=>Wr,RoxyBiorhythmChart:()=>T,RoxyCompatibilityCard:()=>M,RoxyDashaTimeline:()=>L,RoxyData:()=>K,RoxyDoshaCard:()=>N,RoxyEndpointForm:()=>A,RoxyGunaMilan:()=>G,RoxyHexagram:()=>C,RoxyHoroscopeCard:()=>D,RoxyKpPlanetsTable:()=>Y,RoxyLocationSearch:()=>k,RoxyMoonPhase:()=>O,RoxyNatalChart:()=>H,RoxyNumerologyCard:()=>j,RoxyPanchangTable:()=>U,RoxySynastryChart:()=>F,RoxyTarotCard:()=>R,RoxyTarotSpread:()=>I,RoxyVedicKundli:()=>q});var me=globalThis,pe=me.ShadowRoot&&(me.ShadyCSS===void 0||me.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$e=Symbol(),je=new WeakMap,te=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==$e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(pe&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=je.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&je.set(e,t))}return t}toString(){return this.cssText}},Ue=o=>new te(typeof o=="string"?o:o+"",void 0,$e),y=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((r,a,i)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+o[i+1],o[0]);return new te(e,o,$e)},Re=(o,t)=>{if(pe)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),a=me.litNonce;a!==void 0&&r.setAttribute("nonce",a),r.textContent=e.cssText,o.appendChild(r)}},we=pe?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return Ue(e)})(o):o;var{is:fr,defineProperty:vr,getOwnPropertyDescriptor:br,getOwnPropertyNames:$r,getOwnPropertySymbols:wr,getPrototypeOf:kr}=Object,ge=globalThis,Ie=ge.trustedTypes,Sr=Ie?Ie.emptyScript:"",Ar=ge.reactiveElementPolyfillSupport,ae=(o,t)=>o,se={toAttribute(o,t){switch(t){case Boolean:o=o?Sr:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},ue=(o,t)=>!fr(o,t),qe={attribute:!0,type:String,converter:se,reflect:!1,useDefault:!1,hasChanged:ue};Symbol.metadata??=Symbol("metadata"),ge.litPropertyMetadata??=new WeakMap;var z=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=qe){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),a=this.getPropertyDescriptor(t,r,e);a!==void 0&&vr(this.prototype,t,a)}}static getPropertyDescriptor(t,e,r){let{get:a,set:i}=br(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:a,set(n){let c=a?.call(this);i?.call(this,n),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??qe}static _$Ei(){if(this.hasOwnProperty(ae("elementProperties")))return;let t=kr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ae("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ae("properties"))){let e=this.properties,r=[...$r(e),...wr(e)];for(let a of r)this.createProperty(a,e[a])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,a]of e)this.elementProperties.set(r,a)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let a=this._$Eu(e,r);a!==void 0&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let a of r)e.unshift(we(a))}else t!==void 0&&e.push(we(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Re(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,r);if(a!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:se).toAttribute(e,r.type);this._$Em=t,i==null?this.removeAttribute(a):this.setAttribute(a,i),this._$Em=null}}_$AK(t,e){let r=this.constructor,a=r._$Eh.get(t);if(a!==void 0&&this._$Em!==a){let i=r.getPropertyOptions(a),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:se;this._$Em=a;let c=n.fromAttribute(e,i.type);this[a]=c??this._$Ej?.get(a)??c,this._$Em=null}}requestUpdate(t,e,r,a=!1,i){if(t!==void 0){let n=this.constructor;if(a===!1&&(i=this[t]),r??=n.getPropertyOptions(t),!((r.hasChanged??ue)(i,e)||r.useDefault&&r.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:a,wrapped:i},n){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),i!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),a===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,i]of this._$Ep)this[a]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[a,i]of r){let{wrapped:n}=i,c=this[a];n!==!0||this._$AL.has(a)||c===void 0||this.C(a,void 0,i,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[ae("elementProperties")]=new Map,z[ae("finalized")]=new Map,Ar?.({ReactiveElement:z}),(ge.reactiveElementVersions??=[]).push("2.1.2");var ze=globalThis,Be=o=>o,he=ze.trustedTypes,Ke=he?he.createPolicy("lit-html",{createHTML:o=>o}):void 0,We="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,Ze="?"+B,Er=`<${Ze}>`,W=document,ne=()=>W.createComment(""),oe=o=>o===null||typeof o!="object"&&typeof o!="function",Te=Array.isArray,_r=o=>Te(o)||typeof o?.[Symbol.iterator]=="function",ke=`[ 	
\f\r]`,ie=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ge=/-->/g,Ye=/>/g,V=RegExp(`>|${ke}(?:([^\\s"'>=/]+)(${ke}*=${ke}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fe=/'/g,Ve=/"/g,Xe=/^(?:script|style|textarea|title)$/i,Me=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),s=Me(1),$=Me(2),st=Me(3),Z=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),Je=new WeakMap,J=W.createTreeWalker(W,129);function Qe(o,t){if(!Te(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ke!==void 0?Ke.createHTML(t):t}var Pr=(o,t)=>{let e=o.length-1,r=[],a,i=t===2?"<svg>":t===3?"<math>":"",n=ie;for(let c=0;c<e;c++){let m=o[c],u,h,v=-1,S=0;for(;S<m.length&&(n.lastIndex=S,h=n.exec(m),h!==null);)S=n.lastIndex,n===ie?h[1]==="!--"?n=Ge:h[1]!==void 0?n=Ye:h[2]!==void 0?(Xe.test(h[2])&&(a=RegExp("</"+h[2],"g")),n=V):h[3]!==void 0&&(n=V):n===V?h[0]===">"?(n=a??ie,v=-1):h[1]===void 0?v=-2:(v=n.lastIndex-h[2].length,u=h[1],n=h[3]===void 0?V:h[3]==='"'?Ve:Fe):n===Ve||n===Fe?n=V:n===Ge||n===Ye?n=ie:(n=V,a=void 0);let w=n===V&&o[c+1].startsWith("/>")?" ":"";i+=n===ie?m+Er:v>=0?(r.push(u),m.slice(0,v)+We+m.slice(v)+B+w):m+B+(v===-2?c:w)}return[Qe(o,i+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},le=class o{constructor({strings:t,_$litType$:e},r){let a;this.parts=[];let i=0,n=0,c=t.length-1,m=this.parts,[u,h]=Pr(t,e);if(this.el=o.createElement(u,r),J.currentNode=this.el.content,e===2||e===3){let v=this.el.content.firstChild;v.replaceWith(...v.childNodes)}for(;(a=J.nextNode())!==null&&m.length<c;){if(a.nodeType===1){if(a.hasAttributes())for(let v of a.getAttributeNames())if(v.endsWith(We)){let S=h[n++],w=a.getAttribute(v).split(B),X=/([.?@])?(.*)/.exec(S);m.push({type:1,index:i,name:X[2],strings:w,ctor:X[1]==="."?Ae:X[1]==="?"?Ee:X[1]==="@"?_e:ee}),a.removeAttribute(v)}else v.startsWith(B)&&(m.push({type:6,index:i}),a.removeAttribute(v));if(Xe.test(a.tagName)){let v=a.textContent.split(B),S=v.length-1;if(S>0){a.textContent=he?he.emptyScript:"";for(let w=0;w<S;w++)a.append(v[w],ne()),J.nextNode(),m.push({type:2,index:++i});a.append(v[S],ne())}}}else if(a.nodeType===8)if(a.data===Ze)m.push({type:2,index:i});else{let v=-1;for(;(v=a.data.indexOf(B,v+1))!==-1;)m.push({type:7,index:i}),v+=B.length-1}i++}}static createElement(t,e){let r=W.createElement("template");return r.innerHTML=t,r}};function Q(o,t,e=o,r){if(t===Z)return t;let a=r!==void 0?e._$Co?.[r]:e._$Cl,i=oe(t)?void 0:t._$litDirective$;return a?.constructor!==i&&(a?._$AO?.(!1),i===void 0?a=void 0:(a=new i(o),a._$AT(o,e,r)),r!==void 0?(e._$Co??=[])[r]=a:e._$Cl=a),a!==void 0&&(t=Q(o,a._$AS(o,t.values),a,r)),t}var Se=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,a=(t?.creationScope??W).importNode(e,!0);J.currentNode=a;let i=J.nextNode(),n=0,c=0,m=r[0];for(;m!==void 0;){if(n===m.index){let u;m.type===2?u=new ce(i,i.nextSibling,this,t):m.type===1?u=new m.ctor(i,m.name,m.strings,this,t):m.type===6&&(u=new Pe(i,this,t)),this._$AV.push(u),m=r[++c]}n!==m?.index&&(i=J.nextNode(),n++)}return J.currentNode=W,a}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},ce=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,a){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),oe(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==Z&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):_r(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&oe(this._$AH)?this._$AA.nextSibling.data=t:this.T(W.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,a=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=le.createElement(Qe(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===a)this._$AH.p(e);else{let i=new Se(a,this),n=i.u(this.options);i.p(e),this.T(n),this._$AH=i}}_$AC(t){let e=Je.get(t.strings);return e===void 0&&Je.set(t.strings,e=new le(t)),e}k(t){Te(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,a=0;for(let i of t)a===e.length?e.push(r=new o(this.O(ne()),this.O(ne()),this,this.options)):r=e[a],r._$AI(i),a++;a<e.length&&(this._$AR(r&&r._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=Be(t).nextSibling;Be(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ee=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,a,i){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=l}_$AI(t,e=this,r,a){let i=this.strings,n=!1;if(i===void 0)t=Q(this,t,e,0),n=!oe(t)||t!==this._$AH&&t!==Z,n&&(this._$AH=t);else{let c=t,m,u;for(t=i[0],m=0;m<i.length-1;m++)u=Q(this,c[r+m],e,m),u===Z&&(u=this._$AH[m]),n||=!oe(u)||u!==this._$AH[m],u===l?t=l:t!==l&&(t+=(u??"")+i[m+1]),this._$AH[m]=u}n&&!a&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ae=class extends ee{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}},Ee=class extends ee{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}},_e=class extends ee{constructor(t,e,r,a,i){super(t,e,r,a,i),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??l)===Z)return;let r=this._$AH,a=t===l&&r!==l||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==l&&(r===l||a);a&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Pe=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}};var zr=ze.litHtmlPolyfillSupport;zr?.(le,ce),(ze.litHtmlVersions??=[]).push("3.3.2");var er=(o,t,e)=>{let r=e?.renderBefore??t,a=r._$litPart$;if(a===void 0){let i=e?.renderBefore??null;r._$litPart$=a=new ce(t.insertBefore(ne(),i),i,void 0,e??{})}return a._$AI(o),a};var Le=globalThis,g=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=er(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}};g._$litElement$=!0,g.finalized=!0,Le.litElementHydrateSupport?.({LitElement:g});var Tr=Le.litElementPolyfillSupport;Tr?.({LitElement:g});(Le.litElementVersions??=[]).push("4.2.2");var x=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};var Mr={attribute:!0,type:String,converter:se,reflect:!1,hasChanged:ue},Lr=(o=Mr,t,e)=>{let{kind:r,metadata:a}=e,i=globalThis.litPropertyMetadata.get(a);if(i===void 0&&globalThis.litPropertyMetadata.set(a,i=new Map),r==="setter"&&((o=Object.create(o)).wrapped=!0),i.set(e.name,o),r==="accessor"){let{name:n}=e;return{set(c){let m=t.get.call(this);t.set.call(this,c),this.requestUpdate(n,m,o,!0,c)},init(c){return c!==void 0&&this.C(n,void 0,o,c),c}}}if(r==="setter"){let{name:n}=e;return function(c){let m=this[n];t.call(this,c),this.requestUpdate(n,m,o,!0,c)}}throw Error("Unsupported decorator location: "+r)};function p(o){return(t,e)=>typeof e=="object"?Lr(o,t,e):((r,a,i)=>{let n=a.hasOwnProperty(i);return a.constructor.createProperty(i,r),n?Object.getOwnPropertyDescriptor(a,i):void 0})(o,t,e)}function _(o){return p({...o,state:!0,attribute:!1})}var f=y`
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
`;var rr={physical:"#dc2626",emotional:"#0284c7",intellectual:"#16a34a",intuitive:"#a855f7",aesthetic:"#f59e0b",awareness:"#ec4899",spiritual:"#14b8a6",passion:"#ef4444",mastery:"#6366f1",wisdom:"#475569"},T=class extends g{constructor(){super(...arguments);this.data=null;this.mode="daily"}render(){let e=this.data;return e?this.mode==="critical-days"&&e.criticalDays?.length?this.renderCritical(e):this.mode==="forecast"&&e.days?.length?this.renderForecast(e):this.renderDaily(e):s`<div class="roxy-empty" role="status">No biorhythm data</div>`}renderDaily(e){let r=e.cycles??{},a=Object.entries(r);return s`<section class="wrap" aria-label="Daily biorhythm">
			<header class="head">
				<h2 class="title">Biorhythm</h2>
				${typeof e.energyRating=="number"?s`<span class="energy">Energy ${e.energyRating}/10</span>`:l}
			</header>
			<div class="bars" role="list">
				${a.map(([i,n])=>{let c=typeof n=="number"?n:0,m=(c+1)/2*100,u=rr[i]??"var(--roxy-accent, #f59e0b)";return s`<div class="bar" role="listitem">
						<span style="text-transform: capitalize">${i}</span>
						<span class="track">
							<span
								class="fill"
								style="width: ${m}%; background: ${u}"
							></span>
						</span>
						<span class="value">${(c*100).toFixed(0)}%</span>
					</div>`})}
			</div>
			${e.interpretation?s`<p class="advice">${e.interpretation}</p>`:l}
			${e.advice?s`<p class="advice">${e.advice}</p>`:l}
			${e.criticalAlerts?.length?s`<div>
						${e.criticalAlerts.map(i=>s`<p class="alert">${i}</p>`)}
					</div>`:l}
		</section>`}renderForecast(e){let r=e.days??[];if(r.length===0)return s`<div class="roxy-empty" role="status">No forecast</div>`;let a=600,i=160,n=a/Math.max(r.length-1,1),c=Object.keys(r[0]?.cycles??{});return s`<section class="wrap" aria-label="Biorhythm forecast">
			<header class="head">
				<h2 class="title">Forecast</h2>
				<span class="energy"
					>${e.startDate??""} - ${e.endDate??""}</span
				>
			</header>
			<svg
				viewBox="0 0 ${a} ${i}"
				role="img"
				aria-label="Biorhythm cycle lines across the forecast window"
			>
				<title>Biorhythm forecast</title>
				<line
					x1="0"
					y1=${i/2}
					x2=${a}
					y2=${i/2}
					stroke="var(--roxy-border, #e4e4e7)"
					stroke-width="1"
				/>
				${c.map(m=>{let u=r.map((v,S)=>{let w=v.cycles?.[m]??0,X=S*n,pr=i/2-w*(i/2-8);return`${X.toFixed(2)},${pr.toFixed(2)}`}).join(" "),h=rr[m]??"#475569";return $`<polyline points=${u} fill="none" stroke=${h} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />`})}
			</svg>
			${e.summary?.periodAdvice?s`<p class="advice">${e.summary.periodAdvice}</p>`:l}
		</section>`}renderCritical(e){return s`<section class="wrap" aria-label="Critical days">
			<header class="head">
				<h2 class="title">Critical days</h2>
				<span class="energy"
					>${e.totalCriticalDays??e.criticalDays?.length??0} total</span
				>
			</header>
			<div>
				${(e.criticalDays??[]).map(r=>s`<span class="crit"
						>${r.date} · ${r.cycle??""} ${r.severity??""}</span
					>`)}
			</div>
		</section>`}};T.styles=[f,y`
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
		`],d([p({attribute:!1})],T.prototype,"data",2),d([p({type:String,reflect:!0})],T.prototype,"mode",2),T=d([x("roxy-biorhythm-chart")],T);var M=class extends g{constructor(){super(...arguments);this.data=null;this.mode="astrology"}getBreakdown(){let e=this.data;if(!e)return{};if(e.categoryScores)return e.categoryScores;if(e.categoryBreakdown)return e.categoryBreakdown;let r={};return typeof e.emotional=="number"&&(r.emotional=e.emotional),typeof e.communication=="number"&&(r.communication=e.communication),typeof e.romance=="number"&&(r.romance=e.romance),e.elementBalance&&Object.assign(r,e.elementBalance),r}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No compatibility data</div>`;let r=e.overallScore??e.score,a=this.getBreakdown();return s`<article
			class="card"
			aria-label=${`Compatibility (${this.mode})`}
		>
			<div class="head">
				<h2>${this.mode} compatibility</h2>
				<div>
					${typeof r=="number"?s`<div class="score">${r}</div>`:l}
					${e.rating?s`<div class="rating">${e.rating}</div>`:l}
				</div>
			</div>

			${Object.keys(a).length>0?s`<div role="list">
						${Object.entries(a).map(([i,n])=>s`<div class="bar-row" role="listitem">
								<span style="text-transform: capitalize">${i}</span>
								<span class="bar"
									><span style="width: ${Math.max(0,Math.min(100,n))}%"></span
								></span>
								<span>${n}</span>
							</div>`)}
					</div>`:l}
			${e.relationshipArchetype?s`<p>
						<span class="archetype">${e.relationshipArchetype}</span>
					</p>`:l}
			${e.summary?s`<p>${e.summary}</p>`:l}
			${e.advice?s`<p>${e.advice}</p>`:l}
			${(e.strengths?.length??0)>0||(e.challenges?.length??0)>0?s`<div class="lists">
						${e.strengths?.length?s`<div>
									<h3>Strengths</h3>
									<ul>
										${e.strengths.map(i=>s`<li>${i}</li>`)}
									</ul>
								</div>`:l}
						${e.challenges?.length?s`<div>
									<h3>Challenges</h3>
									<ul>
										${e.challenges.map(i=>s`<li>${i}</li>`)}
									</ul>
								</div>`:l}
						${e.keyAspects?.length?s`<div>
									<h3>Key aspects</h3>
									<ul>
										${e.keyAspects.map(i=>s`<li>${i}</li>`)}
									</ul>
								</div>`:l}
					</div>`:l}
		</article>`}};M.styles=[f,y`
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
				color: var(--roxy-info, #0284c7);
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
		`],d([p({attribute:!1})],M.prototype,"data",2),d([p({type:String,reflect:!0})],M.prototype,"mode",2),M=d([x("roxy-compatibility-card")],M);var L=class extends g{constructor(){super(...arguments);this.data=null;this.period="current"}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No dasha data</div>`;let r=this.collectPeriods(e),a=r.length?Math.max(...r.map(i=>i.durationYears??i.years??1)):0;return s`<div class="wrap" aria-label="Dasha timeline">
			<header class="head">
				<h2 class="title">
					${this.period==="major"?"Vimshottari Mahadasha":this.period==="sub"?"Antardasha":"Active dashas"}
				</h2>
				${e.nakshatraName||e.moonNakshatra?s`<div class="nakshatra">
							Moon nakshatra: ${e.nakshatraName??e.moonNakshatra}
							${e.nakshatraLord?s`(lord ${e.nakshatraLord})`:l}
						</div>`:l}
			</header>

			${this.period==="current"?this.renderCurrent(e):l}
			${r.length>0?s`<div class="timeline" role="list">
						${r.map(i=>this.renderBar(i,a))}
					</div>`:l}
		</div>`}renderCurrent(e){return s`<div class="current">
			${e.mahadasha?s`<div>
						<span>Mahadasha</span>
						<strong>${e.mahadasha.lord??e.mahadasha.mahadashaLord}</strong>
						${typeof e.remainingInMahadasha=="number"?s`<small>${e.remainingInMahadasha.toFixed(1)} years left</small>`:l}
					</div>`:l}
			${e.antardasha?s`<div>
						<span>Antardasha</span>
						<strong>${e.antardasha.lord??e.antardasha.antardashaLord}</strong>
						${typeof e.remainingInAntardasha=="number"?s`<small>${e.remainingInAntardasha.toFixed(1)} years left</small>`:l}
					</div>`:l}
			${e.pratyantardasha?s`<div>
						<span>Pratyantardasha</span>
						<strong
							>${e.pratyantardasha.lord??e.pratyantardasha.pratyantardashaLord}</strong
						>
						${typeof e.remainingInPratyantardasha=="number"?s`<small
									>${e.remainingInPratyantardasha.toFixed(2)} years left</small
								>`:l}
					</div>`:l}
		</div>`}collectPeriods(e){return this.period==="major"&&e.mahadashas?.length?e.mahadashas:this.period==="sub"&&e.antardashas?.length?e.antardashas:e.mahadashas??e.antardashas??[]}renderBar(e,r){let a=e.lord??e.mahadashaLord??e.antardashaLord??e.planet??"",i=e.durationYears??e.years??0,n=r>0?i/r*100:0;return s`<div class="bar" role="listitem">
			<span>${a}</span>
			<span class="bar-track"><span style="width: ${n}%"></span></span>
			<span class="dates">
				${e.startDate?tr(e.startDate):""}
				${e.endDate?s`- ${tr(e.endDate)}`:""}
			</span>
		</div>`}};L.styles=[f,y`
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
		`],d([p({attribute:!1})],L.prototype,"data",2),d([p({type:String,reflect:!0})],L.prototype,"period",2),L=d([x("roxy-dasha-timeline")],L);function tr(o){let t=o.match(/^(\d{4})/);return t?t[1]:o}var Nr=["title","name","label","heading","overview","summary"],Cr=["imageUrl","image","icon","symbol"],Dr=["imageUrl","image"],K=class extends g{constructor(){super(...arguments);this.data=null}render(){return this.data==null?s`<div class="roxy-empty" role="status">No data</div>`:s`<div
			class="roxy-card"
			aria-label="Generic data display"
		>
			${this.renderValue(this.data)}
		</div>`}renderValue(e){return e==null?l:typeof e=="string"?s`<p>${e}</p>`:typeof e=="number"||typeof e=="boolean"?s`<p>${String(e)}</p>`:Array.isArray(e)?this.renderArray(e):this.renderObject(e)}renderArray(e){return e.length===0?s`<div class="roxy-empty" role="status">Empty list</div>`:e.every(i=>i===null||["string","number","boolean"].includes(typeof i))?s`<ul class="roxy-chips">
				${e.map(i=>s`<li>${String(i)}</li>`)}
			</ul>`:e.every(i=>i!==null&&typeof i=="object"&&!Array.isArray(i))?this.renderTable(e):s`<ol>
			${e.map(i=>s`<li>${this.renderValue(i)}</li>`)}
		</ol>`}renderTable(e){let r=this.collectKeys(e);return s`<table class="roxy-table" role="table">
			<thead>
				<tr>
					${r.map(a=>s`<th>${this.humanize(a)}</th>`)}
				</tr>
			</thead>
			<tbody>
				${e.map(a=>s`<tr>
						${r.map(i=>s`<td>${this.formatPrimitive(a[i])}</td>`)}
					</tr>`)}
			</tbody>
		</table>`}renderObject(e){let r=Nr.find(c=>typeof e[c]=="string"),a=Cr.find(c=>typeof e[c]=="string"&&e[c].startsWith("http")),i=r!=="summary"&&typeof e.summary=="string"?"summary":null,n=Object.entries(e).filter(([c,m])=>c!==r&&c!==i&&!Dr.includes(c)&&m!==null&&m!==void 0);return s`
			${a?s`<img
						class="roxy-image"
						src=${String(e[a])}
						alt=${r?String(e[r]):"illustration"}
						loading="lazy"
					/>`:l}
			${r?s`<h3 class="roxy-title">${e[r]}</h3>`:l}
			${i?s`<p class="roxy-summary">${e[i]}</p>`:l}
			${n.length>0?s`<dl class="roxy-rows">
						${n.map(([c,m])=>s`
								<dt>${this.humanize(c)}</dt>
								<dd>${this.renderField(m)}</dd>
							`)}
					</dl>`:l}
		`}renderField(e){return e==null?"":typeof e=="string"?e:typeof e=="number"||typeof e=="boolean"?String(e):Array.isArray(e)&&e.every(a=>["string","number","boolean"].includes(typeof a))?s`<ul class="roxy-chips">
					${e.map(a=>s`<li>${String(a)}</li>`)}
				</ul>`:s`<roxy-data .data=${e}></roxy-data>`}formatPrimitive(e){return e==null?"":typeof e=="string"?e:typeof e=="number"||typeof e=="boolean"?String(e):Array.isArray(e)?e.map(String).join(", "):JSON.stringify(e)}collectKeys(e){let r=new Set;for(let a of e)for(let i of Object.keys(a))r.add(i);return Array.from(r)}humanize(e){return e.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^\w/,r=>r.toUpperCase())}};K.styles=[f,y`
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
		`],d([p({attribute:!1})],K.prototype,"data",2),K=d([x("roxy-data")],K);var Or={manglik:"Mangal Dosha",kalsarpa:"Kaal Sarp Dosha",sadhesati:"Sade Sati"},N=class extends g{constructor(){super(...arguments);this.data=null;this.type="manglik"}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No dosha data</div>`;let r=!!e.present,a=Or[this.type]??this.type,i=(e.severity??"").toLowerCase();return s`<article
			class="card"
			aria-label=${a}
		>
			<header class="head">
				<h2 class="title">${a}</h2>
				<div style="display:flex; gap:0.5rem; align-items:center;">
					<span class=${`badge ${r?"present":"absent"}`}>
						${r?"Present":"Absent"}
					</span>
					${e.severity?s`<span
								class=${`severity ${i}`}
								role="img"
								aria-label=${`Severity ${e.severity}`}
							>
								<span></span><span></span><span></span>
							</span>`:l}
				</div>
			</header>
			${e.description?s`<p class="description">${e.description}</p>`:l}
			${this.renderEffects(e.effects)}
			${e.remedies&&e.remedies.length>0?s`<div>
						<h3>Remedies</h3>
						<ul>
							${e.remedies.map(n=>s`<li>${n}</li>`)}
						</ul>
					</div>`:l}
			${e.exceptions&&e.exceptions.length>0?s`<div>
						<h3>Exceptions</h3>
						<ul>
							${e.exceptions.map(n=>s`<li>${n}</li>`)}
						</ul>
					</div>`:l}
		</article>`}renderEffects(e){if(!e)return l;if(typeof e=="string")return s`<p>${e}</p>`;let r=Object.entries(e).filter(([,a])=>typeof a=="string"&&a.length>0);return r.length===0?l:s`<div class="effects">
			${r.map(([a,i])=>s`<div>
					<h3>${a}</h3>
					<p>${i}</p>
				</div>`)}
		</div>`}};N.styles=[f,y`
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
				color: var(--roxy-success, #16a34a);
			}
			.badge.present {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger, #dc2626);
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
		`],d([p({attribute:!1})],N.prototype,"data",2),d([p({type:String,reflect:!0})],N.prototype,"type",2),N=d([x("roxy-dosha-card")],N);var A=class extends g{constructor(){super(...arguments);this.endpoint="vedic-astrology/birth-chart";this.method="POST";this.specUrl="https://roxyapi.com/api/v2/openapi.json";this.submitLabel="Submit";this.fields=[];this.values={};this.hasLocation=!1;this.loaded=!1;this.onLocation=e=>{let r=e.detail;r&&(this.values={...this.values,latitude:r.latitude,longitude:r.longitude,timezone:r.timezone??r.utcOffset})};this.onSubmit=e=>{e.preventDefault();let r=this.fields.filter(a=>a.required).filter(a=>this.values[a.name]===void 0||this.values[a.name]==="");if(r.length>0){this.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{missing:r.map(a=>a.name)},bubbles:!0,composed:!0}));return}this.dispatchEvent(new CustomEvent("roxy-submit",{detail:{endpoint:this.endpoint,values:this.values},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.loadSchema()}async loadSchema(){try{let e=await fetch(this.specUrl);if(!e.ok)throw new Error(`HTTP ${e.status}`);let r=await e.json(),a=`/${this.endpoint.replace(/^\//,"")}`,i=r.paths?.[a]?.[this.method.toLowerCase()];if(!i)return;let n=r.components?.schemas??{},c=[],m;if(i.requestBody){let h=i.requestBody.content?.["application/json"]?.schema;m=this.resolve(h,n)}if(m?.properties){let h=new Set(m.required??[]);for(let[v,S]of Object.entries(m.properties)){let w=this.resolve(S,n)??{};c.push({name:v,type:this.fieldType(w),required:h.has(v),description:w.description,enum:w.enum,min:w.minimum,max:w.maximum,default:w.default})}}for(let h of i.parameters??[])if(h.in==="path"||h.in==="query"){let v=this.resolve(h.schema,n)??{};c.push({name:h.name,type:this.fieldType(v),required:!!h.required,description:v.description,enum:v.enum,default:v.default})}this.fields=c,this.hasLocation=c.some(h=>h.name==="latitude")&&c.some(h=>h.name==="longitude")&&c.some(h=>h.name==="timezone");let u={};for(let h of c)h.default!==void 0&&(u[h.name]=h.default);this.values=u,this.loaded=!0}catch{this.loaded=!0}}resolve(e,r){if(e){if("$ref"in e&&e.$ref){let a=e.$ref.split("/").pop();return a?r[a]:void 0}return e}}fieldType(e){return e.enum?"enum":e.format==="date"?"date":e.format==="time"?"time":e.format==="date-time"?"datetime":e.type==="integer"||e.type==="number"?"number":"text"}setValue(e,r){this.values={...this.values,[e]:r}}render(){if(!this.loaded)return s`<form><div class="roxy-skeleton" style="height: 8rem"></div></form>`;let e=r=>{if(this.hasLocation&&(r.name==="latitude"||r.name==="longitude"||r.name==="timezone"))return l;let a=`roxy-form-${r.name}`;return s`<div class="field">
				<label for=${a}>
					${ar(r.name)}${r.required?s`<span class="req" aria-hidden="true">*</span>`:l}
				</label>
				${r.enum?s`<select
							id=${a}
							?required=${r.required}
							@change=${i=>this.setValue(r.name,i.target.value)}
						>
							<option value="">Choose</option>
							${r.enum.map(i=>s`<option value=${i} ?selected=${this.values[r.name]===i}>
									${i}
								</option>`)}
						</select>`:s`<input
							id=${a}
							type=${this.htmlType(r.type)}
							?required=${r.required}
							min=${r.min??""}
							max=${r.max??""}
							step=${r.type==="number"?"any":""}
							.value=${this.values[r.name]??""}
							@input=${i=>this.setValue(r.name,this.coerce(r.type,i.target.value))}
						/>`}
				${r.description?s`<small class="help">${r.description}</small>`:l}
			</div>`};return s`<form @submit=${this.onSubmit}>
			<h2 class="title">${ar(this.endpoint.split("/").pop()??"")}</h2>
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
				${this.fields.map(r=>e(r))}
			</div>
			<button class="submit" type="submit">${this.submitLabel}</button>
		</form>`}htmlType(e){switch(e){case"date":return"date";case"time":return"time";case"datetime":return"datetime-local";case"number":return"number";default:return"text"}}coerce(e,r){if(r!==""){if(e==="number"){let a=Number(r);return Number.isFinite(a)?a:void 0}return r}}};A.styles=[f,y`
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
				gap: var(--roxy-space-md, 1rem);
			}
			.field {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			label {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			label .req {
				color: var(--roxy-danger, #dc2626);
				margin-left: 4px;
			}
			input,
			select {
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
				color: #fff;
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
		`],d([p({type:String,attribute:"data-endpoint"})],A.prototype,"endpoint",2),d([p({type:String})],A.prototype,"method",2),d([p({type:String,attribute:"spec-url"})],A.prototype,"specUrl",2),d([p({type:String,attribute:"submit-label"})],A.prototype,"submitLabel",2),d([_()],A.prototype,"fields",2),d([_()],A.prototype,"values",2),d([_()],A.prototype,"hasLocation",2),d([_()],A.prototype,"loaded",2),A=d([x("roxy-endpoint-form")],A);function ar(o){return o.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^\w/,t=>t.toUpperCase())}var G=class extends g{constructor(){super(...arguments);this.data=null}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No Guna Milan data</div>`;let r=e.total??e.totalScore??0,a=e.maxScore??36,i=(e.breakdown??[]).filter(n=>n&&(n.name||n.score!==void 0));return s`<article class="card" aria-label="Guna Milan score">
			<div class="score-bar">
				<div>
					<span class="total">${r}</span>
					<span class="over"> / ${a}</span>
					${typeof e.percentage=="number"?s`<small style="margin-left: 0.5rem; color: var(--roxy-muted)">
								${e.percentage}%
							</small>`:l}
				</div>
				${e.recommendation?s`<span class="recommendation">${e.recommendation}</span>`:l}
			</div>

			${i.length>0?s`<table>
						<thead>
							<tr>
								<th>Category</th>
								<th>Progress</th>
								<th class="score">Score</th>
							</tr>
						</thead>
						<tbody>
							${i.map(n=>{let c=n.score??0,m=n.max??n.maxScore??Hr(n.name),u=m?c/m*100:0;return s`<tr>
									<td>${n.name??""}</td>
									<td class="bar-cell">
										<div class="mini-bar">
											<span style="width: ${u}%"></span>
										</div>
									</td>
									<td class="score">${c} / ${m}</td>
								</tr>`})}
						</tbody>
					</table>`:l}
			${(e.doshas?.length??0)>0||(e.doshaCancellations?.length??0)>0?s`<div class="tags">
						${e.doshas?.map(n=>s`<span class="dosha">${n}</span>`)}
						${e.doshaCancellations?.map(n=>s`<span class="cancel">${n}</span>`)}
					</div>`:l}
		</article>`}};G.styles=[f,y`
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
		`],d([p({attribute:!1})],G.prototype,"data",2),G=d([x("roxy-guna-milan")],G);function Hr(o){if(!o)return 1;switch(o.toLowerCase()){case"varna":return 1;case"vasya":return 2;case"tara":return 3;case"yoni":return 4;case"maitri":return 5;case"gana":return 6;case"bhakoot":return 7;case"nadi":return 8;default:return 1}}var xe={Sun:"\u2609",Moon:"\u263D",Mercury:"\u263F",Venus:"\u2640",Earth:"\u2641",Mars:"\u2642",Jupiter:"\u2643",Saturn:"\u2644",Uranus:"\u2645",Neptune:"\u2646",Pluto:"\u2647",Rahu:"\u260A",Ketu:"\u260B",Ascendant:"Asc",Lagna:"La",NorthNode:"\u260A",SouthNode:"\u260B"},sr={Sun:"Su",Moon:"Mo",Mercury:"Me",Venus:"Ve",Mars:"Ma",Jupiter:"Ju",Saturn:"Sa",Uranus:"Ur",Neptune:"Ne",Pluto:"Pl",Rahu:"Ra",Ketu:"Ke",Ascendant:"Asc",Lagna:"La"},re={Aries:"\u2648",Taurus:"\u2649",Gemini:"\u264A",Cancer:"\u264B",Leo:"\u264C",Virgo:"\u264D",Libra:"\u264E",Scorpio:"\u264F",Sagittarius:"\u2650",Capricorn:"\u2651",Aquarius:"\u2652",Pisces:"\u2653"},ir={Aries:"Ar",Taurus:"Ta",Gemini:"Ge",Cancer:"Cn",Leo:"Le",Virgo:"Vi",Libra:"Li",Scorpio:"Sc",Sagittarius:"Sg",Capricorn:"Cp",Aquarius:"Aq",Pisces:"Pi"};var Ne={heaven:"\u2630",lake:"\u2631",fire:"\u2632",thunder:"\u2633",wind:"\u2634",water:"\u2635",mountain:"\u2636",earth:"\u2637",Heaven:"\u2630",Lake:"\u2631",Fire:"\u2632",Thunder:"\u2633",Wind:"\u2634",Water:"\u2635",Mountain:"\u2636",Earth:"\u2637"},nr={"new moon":"\u{1F311}","waxing crescent":"\u{1F312}","first quarter":"\u{1F313}","waxing gibbous":"\u{1F314}","full moon":"\u{1F315}","waning gibbous":"\u{1F316}","last quarter":"\u{1F317}","waning crescent":"\u{1F318}"};var C=class extends g{constructor(){super(...arguments);this.data=null;this.mode="lookup"}getHexagram(){return this.data?"hexagram"in this.data&&this.data.hexagram?{...this.data.hexagram,lines:this.data.lines,changingLinePositions:this.data.changingLinePositions}:this.data:null}render(){let e=this.getHexagram();if(!e)return s`<div class="roxy-empty" role="status">No hexagram data</div>`;let r=e.lines??this.derivedLines(e),a=new Set(e.changingLinePositions??[]);return s`<article class="card" aria-label="I Ching hexagram">
			<div class="glyphs">
				${e.symbol?s`<div class="symbol">${e.symbol}</div>`:l}
				<div class="lines" aria-hidden="true">
					${r.slice().reverse().map((i,n)=>{let c=r.length-1-n+1,m=a.has(c),u=i===6||i===8;return s`<div class="line ${`${u?"broken":"solid"}${m?" changing":""}`}">
								${u?$`<span class="seg"></span><span class="seg"></span>`:$`<span class="seg"></span>`}
							</div>`})}
				</div>
			</div>
			<div>
				<h2 class="title">
					${e.number?s`${e.number}. `:l}${e.english??e.chinese??"Hexagram"}
				</h2>
				<p class="subtitle">
					${e.chinese?s`${e.chinese}`:l}
					${e.pinyin?s` · ${e.pinyin}`:l}
				</p>
				<div class="trigrams">
					${e.upperTrigram?s`<div>
								Upper
								<span class="tri-glyph"
									>${Ne[e.upperTrigram]??""}</span
								>${e.upperTrigram}
							</div>`:l}
					${e.lowerTrigram?s`<div>
								Lower
								<span class="tri-glyph"
									>${Ne[e.lowerTrigram]??""}</span
								>${e.lowerTrigram}
							</div>`:l}
				</div>
				${e.judgment?s`<p class="judgment">${e.judgment}</p>`:l}
				${e.image?s`<p class="image">${e.image}</p>`:l}
				${e.dailyMessage?s`<p class="message">${e.dailyMessage}</p>`:l}
				${e.interpretation?.general?s`<p>${e.interpretation.general}</p>`:l}
				${a.size>0?s`<div class="changing">
							Changing lines: ${Array.from(a).sort((i,n)=>i-n).join(", ")}.
							${e.resultingHexagram?.english?s` Becomes hexagram ${e.resultingHexagram.number}
										${e.resultingHexagram.english}.`:l}
						</div>`:l}
			</div>
		</article>`}derivedLines(e){if(!e.symbol)return Array.from({length:6},()=>7);let r=e.symbol.codePointAt(0)??0;if(r>=19904&&r<=19967){let a=r-19904,i=[];for(let n=0;n<6;n++){let c=a>>n&1;i.push(c?8:7)}return i}return Array.from({length:6},()=>7)}};C.styles=[f,y`
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
		`],d([p({attribute:!1})],C.prototype,"data",2),d([p({type:String,reflect:!0})],C.prototype,"mode",2),C=d([x("roxy-hexagram")],C);var D=class extends g{constructor(){super(...arguments);this.data=null;this.period="daily"}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No horoscope data</div>`;let r=e.sign??"",a=r?re[jr(r)]??"":"",i=typeof e.energyRating=="number"?e.energyRating:null,n=e.date??e.week??e.month??"";return s`<article
			class="card"
			aria-label=${`${this.period} horoscope for ${r}`}
		>
			<header class="head">
				<span class="glyph" aria-hidden="true">${a}</span>
				<div>
					<h2 class="title">${r} ${this.period}</h2>
					${n?s`<div class="date">${n}</div>`:l}
				</div>
				${i!==null?s`<span class="energy" aria-label=${`Energy ${i} of 10`}>
							Energy ${i}/10
							<span class="energy-bar"
								><span style="width: ${i/10*100}%"></span
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
				${e.advice?s`<div class="section">
							<h3>Advice</h3>
							<p>${e.advice}</p>
						</div>`:l}
			</div>

			${e.luckyNumber||e.luckyColor||(e.compatibleSigns?.length??0)>0?s`<div class="lucky">
						${e.luckyNumber!==void 0?s`<span>Lucky number <strong>${e.luckyNumber}</strong></span>`:l}
						${e.luckyColor?s`<span>Lucky color <strong>${e.luckyColor}</strong></span>`:l}
						${e.luckyNumbers?.length?s`<span
									>Lucky numbers
									<strong>${e.luckyNumbers.join(", ")}</strong></span
								>`:l}
						${e.luckyDays?.length?s`<span
									>Lucky days <strong>${e.luckyDays.join(", ")}</strong></span
								>`:l}
						${e.compatibleSigns?.length?s`<span class="compat-wrap">
									Best with
									<span class="compat"
										>${e.compatibleSigns.map(c=>s`<span>${c}</span>`)}</span
									>
								</span>`:l}
					</div>`:l}
		</article>`}};D.styles=[f,y`
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
		`],d([p({attribute:!1})],D.prototype,"data",2),d([p({type:String,reflect:!0})],D.prototype,"period",2),D=d([x("roxy-horoscope-card")],D);function jr(o){return o.charAt(0).toUpperCase()+o.slice(1).toLowerCase()}var Y=class extends g{constructor(){super(...arguments);this.data=null}render(){if(!this.data)return s`<div class="roxy-empty" role="status">No KP data</div>`;let e=this.data.planets??[];return s`<div
			class="wrap"
			aria-label="KP planets table"
			tabindex="0"
		>
			<header class="head">
				<h2 class="title">KP planets</h2>
				${this.data.ayanamsa?s`<span class="ayanamsa">Ayanamsa: ${this.data.ayanamsa}</span>`:l}
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
					${e.map(r=>s`<tr>
							<td class="planet">
								${r.planet??r.name??""}
								${r.retrograde?s`<span class="retro">R</span>`:l}
							</td>
							<td>${r.sign??""}</td>
							<td>${r.signLord??""}</td>
							<td>${r.nakshatra??""}</td>
							<td>${r.starLord??r.nakshatraLord??""}</td>
							<td>${r.subLord??""}</td>
							<td>${r.subSubLord??""}</td>
							<td>${r.kpNumber??""}</td>
						</tr>`)}
				</tbody>
			</table>
		</div>`}};Y.styles=[f,y`
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
				color: var(--roxy-warning, #ea580c);
				font-size: var(--roxy-text-xs, 0.75rem);
				margin-left: 4px;
			}
		`],d([p({attribute:!1})],Y.prototype,"data",2),Y=d([x("roxy-kp-planets-table")],Y);function or(o,t){let e;return((...r)=>{e&&clearTimeout(e),e=setTimeout(()=>o(...r),t)})}var k=class extends g{constructor(){super(...arguments);this.endpoint="https://roxyapi.com/api/v2/location/search";this.placeholder="Search city";this.defaultValue="";this.query="";this.results=[];this.isOpen=!1;this.isLoading=!1;this.highlight=-1;this.debouncedFetch=or(e=>{this.fetchResults(e)},300);this.onInput=e=>{let r=e.target.value;if(this.query=r,r.length<2){this.results=[],this.isOpen=!1,this.highlight=-1;return}this.debouncedFetch(r)};this.onKeyDown=e=>{if(!this.isOpen||this.results.length===0){e.key==="ArrowDown"&&this.query.length>=2&&(this.fetchResults(this.query),e.preventDefault());return}if(e.key==="ArrowDown")e.preventDefault(),this.highlight=(this.highlight+1)%this.results.length;else if(e.key==="ArrowUp")e.preventDefault(),this.highlight=(this.highlight-1+this.results.length)%this.results.length;else if(e.key==="Enter"){e.preventDefault();let r=this.results[this.highlight]??this.results[0];r&&this.select(r)}else e.key==="Escape"&&(this.isOpen=!1)}}connectedCallback(){super.connectedCallback(),this.query=this.defaultValue,this.clickOutsideHandler=e=>{e.composedPath().includes(this)||(this.isOpen=!1)},document.addEventListener("mousedown",this.clickOutsideHandler)}disconnectedCallback(){super.disconnectedCallback(),this.clickOutsideHandler&&document.removeEventListener("mousedown",this.clickOutsideHandler)}async fetchResults(e){this.isLoading=!0;try{let r=new URL(this.endpoint);r.searchParams.set("q",e),r.searchParams.set("limit","8");let a={Accept:"application/json"};this.apiKey&&(a["X-API-Key"]=this.apiKey),this.publishableKey&&(a["X-API-Key"]=this.publishableKey);let i=await fetch(r,{headers:a});if(!i.ok)throw new Error(`HTTP ${i.status}`);let n=await i.json();this.results=n.cities??[],this.isOpen=this.results.length>0,this.highlight=this.results.length>0?0:-1}catch{this.results=[],this.isOpen=!1}finally{this.isLoading=!1}}select(e){this.query=`${e.city}${e.province?`, ${e.province}`:""}, ${e.country}`,this.isOpen=!1,this.results=[],this.dispatchEvent(new CustomEvent("roxy-location-select",{detail:e,bubbles:!0,composed:!0}))}render(){return s`<div class="field">
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
						${this.results.length===0?s`<li class="empty" role="status">No cities found</li>`:this.results.map((e,r)=>s`<li role="presentation">
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
												>${e.province?s`${e.province}, `:""}${e.country}</span
											>
											<span class="tz"
												>UTC${e.utcOffset>=0?"+":""}${e.utcOffset}</span
											>
										</button>
									</li>`)}
					</ul>`:l}
		</div>`}};k.styles=[f,y`
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
		`],d([p({type:String,attribute:"api-key"})],k.prototype,"apiKey",2),d([p({type:String,attribute:"publishable-key"})],k.prototype,"publishableKey",2),d([p({type:String})],k.prototype,"endpoint",2),d([p({type:String})],k.prototype,"placeholder",2),d([p({type:String,attribute:"default-value"})],k.prototype,"defaultValue",2),d([_()],k.prototype,"query",2),d([_()],k.prototype,"results",2),d([_()],k.prototype,"isOpen",2),d([_()],k.prototype,"isLoading",2),d([_()],k.prototype,"highlight",2),k=d([x("roxy-location-search")],k);var O=class extends g{constructor(){super(...arguments);this.data=null;this.mode="current"}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No moon phase data</div>`;let r=e.phases??e.upcoming??[];return this.mode!=="current"&&r.length>0?s`<article
				class="card"
				aria-label="Moon phase calendar"
			>
				<h2 class="label">${e.month??"Moon phases"} ${e.year??""}</h2>
				<div class="list" role="list">
					${r.map(a=>this.renderListItem(a))}
				</div>
			</article>`:this.renderSingle(e)}renderSingle(e){let r=lr(e.phase);return s`<article class="card" aria-label="Current moon phase">
			<div class="hero">
				<span class="emoji" aria-hidden="true">${r}</span>
				<div>
					<h2 class="label">${e.phase??"Moon"}</h2>
					${e.date?s`<div class="date">${e.date}</div>`:l}
				</div>
			</div>
			<div class="stats">
				${typeof e.illumination=="number"?s`<div>
							<span>Illumination</span>
							<strong>${(e.illumination*100).toFixed(0)}%</strong>
						</div>`:l}
				${typeof e.age=="number"?s`<div>
							<span>Age</span>
							<strong>${e.age.toFixed(1)} days</strong>
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
		</article>`}renderListItem(e){let r=lr(e.phase);return s`<div class="list-item" role="listitem">
			<span aria-hidden="true">${r}</span>
			<span>${e.phase}</span>
			<span>${e.date??""}</span>
		</div>`}};O.styles=[f,y`
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
		`],d([p({attribute:!1})],O.prototype,"data",2),d([p({type:String,reflect:!0})],O.prototype,"mode",2),O=d([x("roxy-moon-phase")],O);function lr(o){return o?nr[o.toLowerCase()]??"\u{1F319}":"\u{1F319}"}function P(o,t,e,r){let a=r*Math.PI/180;return{x:o+e*Math.cos(a),y:t+e*Math.sin(a)}}var De=320,b=De/2,cr=150,Ur=134,Ce=110,fe=88,H=class extends g{constructor(){super(...arguments);this.data=null;this.houseSystem="placidus"}getPlanets(){let e=this.data?.planets;return e?Array.isArray(e)?e:Object.entries(e).map(([r,a])=>({...a,name:r})):[]}render(){if(!this.data)return s`<div class="roxy-empty" role="status">No chart data</div>`;let e=this.getPlanets(),r=this.data.aspects??[];return s`<div class="wrap">
			<header>
				<h2 class="title">Natal chart</h2>
				${this.data.birthDetails?s`<div class="meta">
							${[this.data.birthDetails.date,this.data.birthDetails.time,this.data.birthDetails.location].filter(Boolean).join(" \xB7 ")}
						</div>`:l}
			</header>
			<svg
				viewBox="0 0 ${De} ${De}"
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
					cx=${b}
					cy=${b}
					r=${cr}
					stroke-width="1.5"
				/>
				<circle
					class="wheel-line"
					cx=${b}
					cy=${b}
					r=${Ce}
					stroke-width="1"
				/>
				<circle
					class="wheel-line"
					cx=${b}
					cy=${b}
					r=${fe-16}
					stroke-width="0.5"
				/>
				${this.renderSpokes()} ${this.renderSigns()} ${this.renderHouseNumbers()}
				${this.renderAspects(e,r)} ${this.renderPlanets(e)}
			</svg>
			<div class="legend">
				<span>${e.length} planets</span>
				<span>${r.length} aspects</span>
				<span>House system: ${this.houseSystem}</span>
			</div>
		</div>`}renderSpokes(){return Array.from({length:12},(e,r)=>{let a=r*30-90,i=P(b,b,Ce,a),n=P(b,b,cr,a);return $`<line class="wheel-line" x1=${i.x} y1=${i.y} x2=${n.x} y2=${n.y} stroke-width="0.8" />`})}renderSigns(){return["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"].map((r,a)=>{let i=a*30+15-90,n=P(b,b,Ur,i);return $`<text class="sign-glyph" x=${n.x} y=${n.y} text-anchor="middle" dominant-baseline="central">${re[r]}</text>`})}renderHouseNumbers(){return Array.from({length:12},(e,r)=>{let a=r*30+15-90,i=P(b,b,Ce-12,a);return $`<text class="house-num" x=${i.x} y=${i.y} text-anchor="middle" dominant-baseline="central">${r+1}</text>`})}renderPlanets(e){return e.map(r=>{let a=typeof r.longitude=="number"?r.longitude:typeof r.degree=="number"?r.degree:NaN;if(!Number.isFinite(a))return l;let i=a-90,n=P(b,b,fe,i),c=r.name??r.planet??"",m=xe[ve(c)]??c.slice(0,2),u=r.retrograde||r.isRetrograde?" R":"";return $`<text class="planet-glyph" x=${n.x} y=${n.y} text-anchor="middle" dominant-baseline="central"><title>${c}${u}</title>${m}</text>`})}renderAspects(e,r){let a=new Map;for(let i of e){let n=typeof i.longitude=="number"?i.longitude:typeof i.degree=="number"?i.degree:null;if(n===null)continue;let c=ve(i.name??i.planet??"");c&&a.set(c,n)}return r.map(i=>{let n=a.get(ve(i.planet1??"")),c=a.get(ve(i.planet2??""));if(n===void 0||c===void 0)return l;let m=P(b,b,fe-18,n-90),u=P(b,b,fe-18,c-90);return $`<line class="aspect" x1=${m.x} y1=${m.y} x2=${u.x} y2=${u.y} />`})}};H.styles=[f,y`
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
				stroke: color-mix(in srgb, var(--roxy-accent, #f59e0b) 32%, transparent);
				stroke-width: 0.6;
				fill: none;
			}

			.legend {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-md, 1rem);
			}
		`],d([p({attribute:!1})],H.prototype,"data",2),d([p({type:String,attribute:"house-system",reflect:!0})],H.prototype,"houseSystem",2),H=d([x("roxy-natal-chart")],H);function ve(o){return o?o.charAt(0).toUpperCase()+o.slice(1).toLowerCase():""}var j=class extends g{constructor(){super(...arguments);this.data=null;this.type="life-path"}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No numerology data</div>`;let r=Rr[this.type]??this.type,a=e.personalYear??e.number,i=e.coreNumbers?Object.entries(e.coreNumbers).filter(([,n])=>n!=null):[];return s`<article
			class="card"
			aria-label=${r}
		>
			<div class="hero">
				${typeof a=="number"?s`<div class="numeral">${a}</div>`:l}
				<div>
					<p class="label">${r}</p>
					${e.title?s`<h2 class="title">${e.title}</h2>`:e.type?s`<h2 class="title">
									${e.type==="master"?"Master number":"Single digit"}
								</h2>`:l}
				</div>
			</div>
			${e.theme?s`<p><strong>Theme:</strong> ${e.theme}</p>`:l}
			${e.meaning?s`<p class="meaning">${e.meaning}</p>`:l}
			${e.advice?s`<p>${e.advice}</p>`:l}
			${e.calculation?s`<pre class="calc">${e.calculation}</pre>`:l}
			${e.keywords?.length?s`<div class="chips">
						${e.keywords.map(n=>s`<span>${n}</span>`)}
					</div>`:l}
			${i.length>0?s`<div class="cores">
						${i.map(([n,c])=>{let m=typeof c=="number"?c:c.number;return s`<div class="item">
								<span>${Ir(n)}</span>
								<strong>${m??""}</strong>
							</div>`})}
					</div>`:l}
			${e.hasKarmicDebt&&e.karmicDebtNumber?s`<div class="karmic">
						Karmic debt ${e.karmicDebtNumber}.
						${e.karmicDebtMeaning?e.karmicDebtMeaning:""}
					</div>`:l}
		</article>`}};j.styles=[f,y`
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
				word-break: break-all;
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
		`],d([p({attribute:!1})],j.prototype,"data",2),d([p({type:String,reflect:!0})],j.prototype,"type",2),j=d([x("roxy-numerology-card")],j);var Rr={"life-path":"Life Path",expression:"Expression","personal-year":"Personal Year",chart:"Numerology chart"};function Ir(o){return o.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^\w/,t=>t.toUpperCase())}var U=class extends g{constructor(){super(...arguments);this.data=null;this.detail="detailed"}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No panchang data</div>`;let r=[["Tithi",this.formatPart(e.tithi)],["Nakshatra",this.formatPart(e.nakshatra)],["Yoga",this.formatPart(e.yoga)],["Karana",this.formatPart(e.karana)],["Vara",e.vara??""]],a=[["Brahma Muhurta",e.brahmaMuhurta],["Abhijit Muhurta",e.abhijitMuhurta],["Vijaya Muhurta",e.vijayaMuhurta],["Godhuli Muhurta",e.godhuliMuhurta],["Nishita Muhurta",e.nishitaMuhurta],["Pratah Sandhya",e.pratahSandhya],["Sayahna Sandhya",e.sayahnaSandhya]],i=[["Rahu Kaal",e.rahuKaal],["Yamaganda",e.yamaganda],["Gulika",e.gulika]];return s`<div class="wrap" aria-label="Panchang">
			<header class="head">
				<h2 class="title">Panchang</h2>
				<span class="date">${e.date??""}</span>
			</header>
			<table>
				<tbody>
					${r.map(([n,c])=>s`<tr>
							<th>${n}</th>
							<td>${c}</td>
						</tr>`)}
					${e.sunrise?s`<tr>
								<th>Sunrise</th>
								<td>${e.sunrise}</td>
							</tr>`:l}
					${e.sunset?s`<tr>
								<th>Sunset</th>
								<td>${e.sunset}</td>
							</tr>`:l}
					${e.moonrise?s`<tr>
								<th>Moonrise</th>
								<td>${e.moonrise}</td>
							</tr>`:l}
					${e.moonset?s`<tr>
								<th>Moonset</th>
								<td>${e.moonset}</td>
							</tr>`:l}
				</tbody>
			</table>
			${this.detail==="detailed"&&(a.some(n=>!!n[1])||i.some(n=>!!n[1]))?s`
						<div class="section">Auspicious muhurtas</div>
						<table>
							<tbody>
								${a.filter(([,n])=>!!n).map(([n,c])=>s`<tr>
											<th>${n}</th>
											<td>${dr(c)}</td>
										</tr>`)}
							</tbody>
						</table>
						<div class="section">Inauspicious periods</div>
						<table>
							<tbody>
								${i.filter(([,n])=>!!n).map(([n,c])=>s`<tr>
											<th>${n}</th>
											<td>${dr(c)}</td>
										</tr>`)}
							</tbody>
						</table>
					`:l}
		</div>`}formatPart(e){if(!e)return"";if(typeof e=="string")return e;if(typeof e=="object"){let r=e;return[r.name,r.lord?`(${r.lord})`:"",r.phase].filter(Boolean).join(" ")}return String(e)}};U.styles=[f,y`
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
		`],d([p({attribute:!1})],U.prototype,"data",2),d([p({type:String,reflect:!0})],U.prototype,"detail",2),U=d([x("roxy-panchang-table")],U);function dr(o){return o?o.start&&o.end?`${o.start} - ${o.end}`:o.start??o.end??"":""}var Oe=360,E=Oe/2,mr=170,qr=154,Br=124,be=96,F=class extends g{constructor(){super(...arguments);this.data=null}render(){if(!this.data)return s`<div class="roxy-empty" role="status">No synastry data</div>`;let{person1:e,person2:r,compatibilityScore:a,summary:i,interAspects:n=[]}=this.data,c=this.normalizePlanets(e?.planets),m=this.normalizePlanets(r?.planets);return s`<div
			class="wrap"
			aria-label="Synastry compatibility chart"
		>
			<div class="head">
				<h2 class="title">Synastry</h2>
				${typeof a=="number"?s`<span class="score" aria-label=${`Score ${a} of 100`}
							>${a} / 100</span
						>`:l}
			</div>
			<svg
				viewBox="0 0 ${Oe} ${Oe}"
				role="img"
				aria-label="Dual chart wheel comparing two natal charts"
			>
				<title>Synastry dual wheel</title>
				<circle
					class="wheel-line"
					cx=${E}
					cy=${E}
					r=${mr}
					stroke-width="1.5"
				/>
				<circle
					class="wheel-line"
					cx=${E}
					cy=${E}
					r=${be+14}
					stroke-width="0.8"
				/>
				<circle
					class="wheel-line"
					cx=${E}
					cy=${E}
					r=${be-14}
					stroke-width="0.6"
				/>
				${this.renderSpokes()} ${this.renderSigns()}
				${this.renderRing(c,Br,"p1")} ${this.renderRing(m,be,"p2")}
			</svg>
			${i?s`<p class="summary">${i}</p>`:l}
			${n.length>0?this.renderAspects(n):l}
			${(this.data.strengths?.length??0)>0||(this.data.challenges?.length??0)>0?s`<div class="lists">
						${this.data.strengths?.length?s`<div>
									<h3>Strengths</h3>
									<ul>
										${this.data.strengths.map(u=>s`<li>${u}</li>`)}
									</ul>
								</div>`:l}
						${this.data.challenges?.length?s`<div>
									<h3>Challenges</h3>
									<ul>
										${this.data.challenges.map(u=>s`<li>${u}</li>`)}
									</ul>
								</div>`:l}
					</div>`:l}
		</div>`}normalizePlanets(e){return e?Array.isArray(e)?e:Object.entries(e).map(([r,a])=>({...a,name:r})):[]}renderSpokes(){return Array.from({length:12},(e,r)=>{let a=r*30-90,i=P(E,E,be-14,a),n=P(E,E,mr,a);return $`<line class="wheel-line" x1=${i.x} y1=${i.y} x2=${n.x} y2=${n.y} stroke-width="0.6" />`})}renderSigns(){return["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"].map((r,a)=>{let i=a*30+15-90,n=P(E,E,qr,i);return $`<text class="sign" x=${n.x} y=${n.y} text-anchor="middle" dominant-baseline="central">${re[r]}</text>`})}renderRing(e,r,a){return e.map(i=>{let n=typeof i.longitude=="number"?i.longitude:typeof i.degree=="number"?i.degree:NaN;if(!Number.isFinite(n))return l;let c=P(E,E,r,n-90),m=i.name??i.planet??"",u=xe[Kr(m)]??m.slice(0,2);return $`<text class=${a} x=${c.x} y=${c.y} text-anchor="middle" dominant-baseline="central"><title>${m}</title>${u}</text>`})}renderAspects(e){return s`<table>
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
				${e.slice(0,16).map(r=>s`<tr>
						<td>${r.planet1??""}</td>
						<td>${r.planet2??""}</td>
						<td>${r.aspect??""}</td>
						<td class="orb">
							${typeof r.orb=="number"?r.orb.toFixed(1):""}
						</td>
						<td>${r.strength??""}</td>
					</tr>`)}
			</tbody>
		</table>`}};F.styles=[f,y`
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
		`],d([p({attribute:!1})],F.prototype,"data",2),F=d([x("roxy-synastry-chart")],F);function Kr(o){return o?o.charAt(0).toUpperCase()+o.slice(1).toLowerCase():""}var R=class extends g{constructor(){super(...arguments);this.data=null;this.flipped=!1;this.toggleFlip=()=>{this.flipped=!this.flipped}}getCard(){return this.data?"card"in this.data&&this.data.card?this.data.card:this.data:null}render(){let e=this.getCard();if(!e)return s`<div class="roxy-empty" role="status">No tarot data</div>`;let r=this.flipped!==!!e.reversed,a=typeof e.meaning=="string"?e.meaning:(r?e.meaning?.reversed:e.meaning?.upright)??e.meaning?.spiritual??e.upright?.meaning,i=this.data&&"dailyMessage"in this.data?this.data.dailyMessage:void 0;return s`<article class="card" aria-label=${e.name??"Tarot card"}>
			<div class="image-wrap">
				${e.imageUrl?s`<img
							class=${`image ${r?"reversed":""}`}
							src=${e.imageUrl}
							alt=${e.name??"Tarot card"}
							tabindex="0"
							@click=${this.toggleFlip}
							@keydown=${n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),this.toggleFlip())}}
						/>`:s`<div
							class=${`image ${r?"reversed":""}`}
							style="aspect-ratio: 0.6; display: flex; align-items: center; justify-content: center; color: var(--roxy-muted)"
						>
							${e.name??"?"}
						</div>`}
			</div>
			<div>
				<div class="meta">
					${e.arcana?s`${e.arcana} arcana`:l}
					${e.number!==void 0&&e.number!==null?s` · ${e.number}`:l}
					${r?s` · reversed`:l}
					${e.position?s`<span class="position">${e.position}</span>`:l}
				</div>
				<h2 class="title">${e.name??"Tarot card"}</h2>
				${i?s`<p class="message">${i}</p>`:l}
				${a?s`<p>${a}</p>`:l}
				${e.keywords?.length?s`<div class="chips">
							${e.keywords.map(n=>s`<span>${n}</span>`)}
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
		</article>`}};R.styles=[f,y`
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
			.position {
				color: var(--roxy-info, #0284c7);
				margin-left: var(--roxy-space-xs, 0.25rem);
				text-transform: capitalize;
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
		`],d([p({attribute:!1})],R.prototype,"data",2),d([_()],R.prototype,"flipped",2),R=d([x("roxy-tarot-card")],R);var I=class extends g{constructor(){super(...arguments);this.data=null;this.spread="three-card"}render(){let e=this.data;if(!e)return s`<div class="roxy-empty" role="status">No tarot spread</div>`;let r=e.positions??e.cards??[],a=!!e.answer,i=a?(e.answer??"").toLowerCase().replace(/[^a-z]/g,""):"";return s`<article class="wrap" aria-label="Tarot spread">
			<header class="head">
				<h2 class="title">${e.spread??this.spread.replace(/-/g," ")}</h2>
				${e.question?s`<span class="question">"${e.question}"</span>`:l}
			</header>
			${a?s`<div>
						<span class=${`answer ${i}`}>${e.answer}</span>
						${e.strength?s`<small> · ${e.strength}</small>`:l}
					</div>`:l}
			${r.length>0?s`<div class="grid">
						${r.map(n=>s`<div class="card">
								<p class="label">${n.label??n.name??n.position??""}</p>
								<div class="image">
									${n.card?.imageUrl?s`<img
												src=${n.card.imageUrl}
												alt=${n.card.name??"tarot card"}
												class=${n.card.reversed?"reversed":""}
											/>`:s`${n.card?.name??"?"}`}
								</div>
								<p class="name">
									${n.card?.name??""}
									${n.card?.reversed?s`<small>(reversed)</small>`:l}
								</p>
								${n.interpretation?s`<p class="interp">${n.interpretation}</p>`:l}
							</div>`)}
					</div>`:l}
			${e.reading?s`<p class="reading">${e.reading}</p>`:l}
			${e.interpretation&&!e.reading?s`<p class="reading">${e.interpretation}</p>`:l}
		</article>`}};I.styles=[f,y`
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
				color: var(--roxy-success, #16a34a);
			}
			.answer.no {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger, #dc2626);
			}
			.answer.maybe {
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 16%, transparent);
				color: var(--roxy-warning, #ea580c);
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
		`],d([p({attribute:!1})],I.prototype,"data",2),d([p({type:String,reflect:!0})],I.prototype,"spread",2),I=d([x("roxy-tarot-spread")],I);var Gr={1:{x:150,y:58},2:{x:205,y:52},3:{x:253,y:112},4:{x:243,y:150},5:{x:253,y:188},6:{x:205,y:248},7:{x:150,y:242},8:{x:95,y:248},9:{x:47,y:188},10:{x:57,y:150},11:{x:47,y:112},12:{x:95,y:52}},Yr={1:{x:150,y:35},2:{x:222,y:40},3:{x:265,y:100},4:{x:265,y:150},5:{x:265,y:200},6:{x:222,y:260},7:{x:150,y:265},8:{x:78,y:260},9:{x:35,y:200},10:{x:35,y:150},11:{x:35,y:100},12:{x:78,y:40}},Fr=["aries","taurus","gemini","cancer","leo","virgo","libra","scorpio","sagittarius","capricorn","aquarius","pisces"],Vr={aries:"Aries",taurus:"Taurus",gemini:"Gemini",cancer:"Cancer",leo:"Leo",virgo:"Virgo",libra:"Libra",scorpio:"Scorpio",sagittarius:"Sagittarius",capricorn:"Capricorn",aquarius:"Aquarius",pisces:"Pisces"},q=class extends g{constructor(){super(...arguments);this.data=null;this.chartStyle="south"}buildHouses(){if(!this.data)return[];let e=[];if(Array.isArray(this.data.houses)){for(let r of this.data.houses)e.push({house:r.house??r.number??e.length+1,sign:r.sign??"",planets:r.planets??[]});if(e.length>0)return e}for(let r=0;r<12;r++){let a=Fr[r],n=(this.data[a]?.signs??[]).map(c=>c.planet??"").filter(Boolean);e.push({house:r+1,sign:Vr[a]??"",planets:n})}return e}render(){if(!this.data)return s`<div class="roxy-empty" role="status">No kundli data</div>`;let e=this.buildHouses();return s`<div class="wrap">
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
				${e.map(r=>this.renderHouseGroup(r))}
			</svg>
		</div>`}renderHouseGroup(e){let r=Gr[e.house],a=Yr[e.house];if(!r||!a)return l;let i=ir[e.sign]??"",n=e.planets??[];return $`
			<g>
				${i?$`<text class="sign-text" x=${a.x} y=${a.y} text-anchor="middle" dominant-baseline="central">${i}</text>`:l}
				${n.map((c,m)=>{let u=sr[Jr(c)]??c.slice(0,2),h=13,S=r.y-(n.length-1)*h/2+m*h;return $`<text class="planet-text" x=${r.x} y=${S} text-anchor="middle" dominant-baseline="central">${u}</text>`})}
			</g>
		`}};q.styles=[f,y`
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
		`],d([p({attribute:!1})],q.prototype,"data",2),d([p({type:String,reflect:!0,attribute:"chart-style"})],q.prototype,"chartStyle",2),q=d([x("roxy-vedic-kundli")],q);function Jr(o){return o?o.charAt(0).toUpperCase()+o.slice(1).toLowerCase():""}var Wr="0.1.0",Zr=["natal-chart","horoscope-card","synastry-chart","compatibility-card","moon-phase","vedic-kundli","panchang-table","dasha-timeline","dosha-card","guna-milan","kp-planets-table","numerology-card","tarot-card","tarot-spread","biorhythm-chart","hexagram","endpoint-form","location-search","data"];return xr(Xr);})();
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
