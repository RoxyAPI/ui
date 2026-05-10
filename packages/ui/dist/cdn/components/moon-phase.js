"use strict";var RoxyUI_moon_phase=(()=>{var k=Object.defineProperty;var rt=Object.getOwnPropertyDescriptor;var wt=Object.getOwnPropertyNames;var Ct=Object.prototype.hasOwnProperty;var Pt=(o,t)=>{for(var e in t)k(o,e,{get:t[e],enumerable:!0})},Mt=(o,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of wt(t))!Ct.call(o,r)&&r!==e&&k(o,r,{get:()=>t[r],enumerable:!(s=rt(t,r))||s.enumerable});return o};var Rt=o=>Mt(k({},"__esModule",{value:!0}),o),H=(o,t,e,s)=>{for(var r=s>1?void 0:s?rt(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(r=(s?n(t,e,r):n(r))||r);return s&&r&&k(t,e,r),r};var Kt={};Pt(Kt,{RoxyMoonPhase:()=>_});var j=globalThis,q=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),ot=new WeakMap,w=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(q&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ot.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ot.set(e,t))}return t}toString(){return this.cssText}},it=o=>new w(typeof o=="string"?o:o+"",void 0,V),C=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((s,r,i)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[i+1],o[0]);return new w(e,o,V)},nt=(o,t)=>{if(q)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=j.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,o.appendChild(s)}},W=q?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return it(e)})(o):o;var{is:Nt,defineProperty:Tt,getOwnPropertyDescriptor:Lt,getOwnPropertyNames:Ut,getOwnPropertySymbols:Ot,getPrototypeOf:kt}=Object,z=globalThis,at=z.trustedTypes,Ht=at?at.emptyScript:"",jt=z.reactiveElementPolyfillSupport,P=(o,t)=>o,M={toAttribute(o,t){switch(t){case Boolean:o=o?Ht:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},D=(o,t)=>!Nt(o,t),ct={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:D};Symbol.metadata??=Symbol("metadata"),z.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ct){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&Tt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:i}=Lt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:r,set(n){let c=r?.call(this);i?.call(this,n),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ct}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let t=kt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let e=this.properties,s=[...Ut(e),...Ot(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(W(r))}else t!==void 0&&e.push(W(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return nt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:M).toAttribute(e,s.type);this._$Em=t,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(t,e){let s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let i=s.getPropertyOptions(r),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:M;this._$Em=r;let c=n.fromAttribute(e,i.type);this[r]=c??this._$Ej?.get(r)??c,this._$Em=null}}requestUpdate(t,e,s,r=!1,i){if(t!==void 0){let n=this.constructor;if(r===!1&&(i=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??D)(i,e)||s.useDefault&&s.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:i},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),i!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,i]of this._$Ep)this[r]=i;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,i]of s){let{wrapped:n}=i,c=this[r];n!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,i,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[P("elementProperties")]=new Map,f[P("finalized")]=new Map,jt?.({ReactiveElement:f}),(z.reactiveElementVersions??=[]).push("2.1.2");var X=globalThis,lt=o=>o,I=X.trustedTypes,ht=I?I.createPolicy("lit-html",{createHTML:o=>o}):void 0,gt="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,yt="?"+y,qt=`<${yt}>`,A=document,N=()=>A.createComment(""),T=o=>o===null||typeof o!="object"&&typeof o!="function",tt=Array.isArray,zt=o=>tt(o)||typeof o?.[Symbol.iterator]=="function",F=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,pt=/>/g,x=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ut=/'/g,mt=/"/g,$t=/^(?:script|style|textarea|title)$/i,et=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),u=et(1),te=et(2),ee=et(3),b=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),ft=new WeakMap,v=A.createTreeWalker(A,129);function _t(o,t){if(!tt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return ht!==void 0?ht.createHTML(t):t}var Dt=(o,t)=>{let e=o.length-1,s=[],r,i=t===2?"<svg>":t===3?"<math>":"",n=R;for(let c=0;c<e;c++){let a=o[c],d,p,h=-1,m=0;for(;m<a.length&&(n.lastIndex=m,p=n.exec(a),p!==null);)m=n.lastIndex,n===R?p[1]==="!--"?n=dt:p[1]!==void 0?n=pt:p[2]!==void 0?($t.test(p[2])&&(r=RegExp("</"+p[2],"g")),n=x):p[3]!==void 0&&(n=x):n===x?p[0]===">"?(n=r??R,h=-1):p[1]===void 0?h=-2:(h=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?x:p[3]==='"'?mt:ut):n===mt||n===ut?n=x:n===dt||n===pt?n=R:(n=x,r=void 0);let g=n===x&&o[c+1].startsWith("/>")?" ":"";i+=n===R?a+qt:h>=0?(s.push(d),a.slice(0,h)+gt+a.slice(h)+y+g):a+y+(h===-2?c:g)}return[_t(o,i+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},L=class o{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let i=0,n=0,c=t.length-1,a=this.parts,[d,p]=Dt(t,e);if(this.el=o.createElement(d,s),v.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=v.nextNode())!==null&&a.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith(gt)){let m=p[n++],g=r.getAttribute(h).split(y),O=/([.?@])?(.*)/.exec(m);a.push({type:1,index:i,name:O[2],strings:g,ctor:O[1]==="."?J:O[1]==="?"?Y:O[1]==="@"?Z:E}),r.removeAttribute(h)}else h.startsWith(y)&&(a.push({type:6,index:i}),r.removeAttribute(h));if($t.test(r.tagName)){let h=r.textContent.split(y),m=h.length-1;if(m>0){r.textContent=I?I.emptyScript:"";for(let g=0;g<m;g++)r.append(h[g],N()),v.nextNode(),a.push({type:2,index:++i});r.append(h[m],N())}}}else if(r.nodeType===8)if(r.data===yt)a.push({type:2,index:i});else{let h=-1;for(;(h=r.data.indexOf(y,h+1))!==-1;)a.push({type:7,index:i}),h+=y.length-1}i++}}static createElement(t,e){let s=A.createElement("template");return s.innerHTML=t,s}};function S(o,t,e=o,s){if(t===b)return t;let r=s!==void 0?e._$Co?.[s]:e._$Cl,i=T(t)?void 0:t._$litDirective$;return r?.constructor!==i&&(r?._$AO?.(!1),i===void 0?r=void 0:(r=new i(o),r._$AT(o,e,s)),s!==void 0?(e._$Co??=[])[s]=r:e._$Cl=r),r!==void 0&&(t=S(o,r._$AS(o,t.values),r,s)),t}var K=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??A).importNode(e,!0);v.currentNode=r;let i=v.nextNode(),n=0,c=0,a=s[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new U(i,i.nextSibling,this,t):a.type===1?d=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(d=new Q(i,this,t)),this._$AV.push(d),a=s[++c]}n!==a?.index&&(i=v.nextNode(),n++)}return v.currentNode=A,r}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},U=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),T(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):zt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=L.createElement(_t(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{let i=new K(r,this),n=i.u(this.options);i.p(e),this.T(n),this._$AH=i}}_$AC(t){let e=ft.get(t.strings);return e===void 0&&ft.set(t.strings,e=new L(t)),e}k(t){tt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let i of t)r===e.length?e.push(s=new o(this.O(N()),this.O(N()),this,this.options)):s=e[r],s._$AI(i),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=lt(t).nextSibling;lt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,i){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(t,e=this,s,r){let i=this.strings,n=!1;if(i===void 0)t=S(this,t,e,0),n=!T(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else{let c=t,a,d;for(t=i[0],a=0;a<i.length-1;a++)d=S(this,c[s+a],e,a),d===b&&(d=this._$AH[a]),n||=!T(d)||d!==this._$AH[a],d===l?t=l:t!==l&&(t+=(d??"")+i[a+1]),this._$AH[a]=d}n&&!r&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},J=class extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}},Y=class extends E{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}},Z=class extends E{constructor(t,e,s,r,i){super(t,e,s,r,i),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??l)===b)return;let s=this._$AH,r=t===l&&s!==l||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==l&&(s===l||r);r&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Q=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}};var It=X.litHtmlPolyfillSupport;It?.(L,U),(X.litHtmlVersions??=[]).push("3.3.2");var xt=(o,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let i=e?.renderBefore??null;s._$litPart$=r=new U(t.insertBefore(N(),i),i,void 0,e??{})}return r._$AI(o),r};var st=globalThis,$=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=xt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};$._$litElement$=!0,$.finalized=!0,st.litElementHydrateSupport?.({LitElement:$});var Bt=st.litElementPolyfillSupport;Bt?.({LitElement:$});(st.litElementVersions??=[]).push("4.2.2");var vt=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};var Gt={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:D},Vt=(o=Gt,t,e)=>{let{kind:s,metadata:r}=e,i=globalThis.litPropertyMetadata.get(r);if(i===void 0&&globalThis.litPropertyMetadata.set(r,i=new Map),s==="setter"&&((o=Object.create(o)).wrapped=!0),i.set(e.name,o),s==="accessor"){let{name:n}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(n,a,o,!0,c)},init(c){return c!==void 0&&this.C(n,void 0,o,c),c}}}if(s==="setter"){let{name:n}=e;return function(c){let a=this[n];t.call(this,c),this.requestUpdate(n,a,o,!0,c)}}throw Error("Unsupported decorator location: "+s)};function B(o){return(t,e)=>typeof e=="object"?Vt(o,t,e):((s,r,i)=>{let n=r.hasOwnProperty(i);return r.constructor.createProperty(i,s),n?Object.getOwnPropertyDescriptor(r,i):void 0})(o,t,e)}var Wt=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],De=Wt.map(o=>o.toLowerCase());var At={"new moon":"\u{1F311}","waxing crescent":"\u{1F312}","first quarter":"\u{1F313}","waxing gibbous":"\u{1F314}","full moon":"\u{1F315}","waning gibbous":"\u{1F316}","last quarter":"\u{1F317}","waning crescent":"\u{1F318}"};var bt=C`
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
`;function St(o,t=1){return typeof o!="number"||!Number.isFinite(o)?"":o.toFixed(t).replace(/\.?0+$/,"")}var _=class extends ${constructor(){super(...arguments);this.data=null;this.mode="current"}render(){let e=this.data;if(!e)return u`<div class="roxy-empty" role="status">No moon phase data</div>`;let s="phases"in e?e.phases:"calendar"in e?e.calendar:[];if(this.mode!=="current"&&s.length>0){let r="month"in e?e.month:void 0,i="year"in e?e.year:void 0;return u`<article
				class="card"
				aria-label="Moon phase calendar"
			>
				<h2 class="label">${r??"Moon phases"} ${i??""}</h2>
				<div class="list" role="list">
					${s.map(n=>this.renderListItem(n))}
				</div>
			</article>`}return"phase"in e?this.renderSingle(e):l}renderSingle(e){let s=Et(e.phase);return u`<article class="card" aria-label="Current moon phase">
			<div class="hero">
				<span class="emoji" aria-hidden="true">${s}</span>
				<div>
					<h2 class="label">${e.phase??"Moon"}</h2>
					${e.date?u`<div class="date">${e.date}</div>`:l}
				</div>
			</div>
			<div class="stats">
				${typeof e.illumination=="number"?u`<div>
							<span>Illumination</span>
							<strong>${Ft(e.illumination)}</strong>
						</div>`:l}
				${typeof e.age=="number"?u`<div>
							<span>Age</span>
							<strong>${St(e.age,1)} days</strong>
						</div>`:l}
				${e.sign?u`<div>
							<span>Sign</span>
							<strong>${e.sign}</strong>
						</div>`:l}
				${typeof e.distance=="number"?u`<div>
							<span>Distance</span>
							<strong>${(e.distance/1e3).toFixed(0)}k km</strong>
						</div>`:l}
			</div>
			${e.meaning?.description?u`<p class="meaning">${e.meaning.description}</p>`:l}
			${e.meaning?.keywords?.length?u`<div class="keywords">
						${e.meaning.keywords.map(r=>u`<span>${r}</span>`)}
					</div>`:l}
		</article>`}renderListItem(e){let s=Et(e.phase);return u`<div class="list-item" role="listitem">
			<span aria-hidden="true">${s}</span>
			<span>${e.phase}</span>
			<span>${e.date??""}</span>
		</div>`}};_.styles=[bt,C`
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
		`],H([B({attribute:!1})],_.prototype,"data",2),H([B({type:String,reflect:!0})],_.prototype,"mode",2),_=H([vt("roxy-moon-phase")],_);function Et(o){return o?At[o.toLowerCase()]??"\u{1F319}":"\u{1F319}"}function Ft(o){let t=o<=1?o*100:o;return`${Math.round(t)}%`}return Rt(Kt);})();
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
//# sourceMappingURL=moon-phase.js.map
