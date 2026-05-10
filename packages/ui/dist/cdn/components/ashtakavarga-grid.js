"use strict";var RoxyUI_ashtakavarga_grid=(()=>{var H=Object.defineProperty;var it=Object.getOwnPropertyDescriptor;var wt=Object.getOwnPropertyNames;var Pt=Object.prototype.hasOwnProperty;var Ct=(o,t)=>{for(var e in t)H(o,e,{get:t[e],enumerable:!0})},Tt=(o,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of wt(t))!Pt.call(o,s)&&s!==e&&H(o,s,{get:()=>t[s],enumerable:!(r=it(t,s))||r.enumerable});return o};var Rt=o=>Tt(H({},"__esModule",{value:!0}),o),B=(o,t,e,r)=>{for(var s=r>1?void 0:r?it(t,e):t,i=o.length-1,a;i>=0;i--)(a=o[i])&&(s=(r?a(t,e,s):a(s))||s);return r&&s&&H(t,e,s),s};var Yt={};Ct(Yt,{RoxyAshtakavargaGrid:()=>$});var q=globalThis,z=q.ShadowRoot&&(q.ShadyCSS===void 0||q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),at=new WeakMap,P=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(z&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=at.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&at.set(e,t))}return t}toString(){return this.cssText}},nt=o=>new P(typeof o=="string"?o:o+"",void 0,G),C=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((r,s,i)=>r+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[i+1],o[0]);return new P(e,o,G)},ht=(o,t)=>{if(z)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),s=q.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,o.appendChild(r)}},W=z?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return nt(e)})(o):o;var{is:kt,defineProperty:Mt,getOwnPropertyDescriptor:Nt,getOwnPropertyNames:Ot,getOwnPropertySymbols:Ut,getPrototypeOf:Lt}=Object,D=globalThis,lt=D.trustedTypes,Ht=lt?lt.emptyScript:"",Bt=D.reactiveElementPolyfillSupport,T=(o,t)=>o,R={toAttribute(o,t){switch(t){case Boolean:o=o?Ht:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},j=(o,t)=>!kt(o,t),ct={attribute:!0,type:String,converter:R,reflect:!1,useDefault:!1,hasChanged:j};Symbol.metadata??=Symbol("metadata"),D.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ct){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&Mt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){let{get:s,set:i}=Nt(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:s,set(a){let h=s?.call(this);i?.call(this,a),this.requestUpdate(t,h,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ct}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;let t=Lt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){let e=this.properties,r=[...Ot(e),...Ut(e)];for(let s of r)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let s of r)e.unshift(W(s))}else t!==void 0&&e.push(W(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ht(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:R).toAttribute(e,r.type);this._$Em=t,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(t,e){let r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let i=r.getPropertyOptions(s),a=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:R;this._$Em=s;let h=a.fromAttribute(e,i.type);this[s]=h??this._$Ej?.get(s)??h,this._$Em=null}}requestUpdate(t,e,r,s=!1,i){if(t!==void 0){let a=this.constructor;if(s===!1&&(i=this[t]),r??=a.getPropertyOptions(t),!((r.hasChanged??j)(i,e)||r.useDefault&&r.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:s,wrapped:i},a){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),i!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,i]of r){let{wrapped:a}=i,h=this[s];a!==!0||this._$AL.has(s)||h===void 0||this.C(s,void 0,i,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[T("elementProperties")]=new Map,f[T("finalized")]=new Map,Bt?.({ReactiveElement:f}),(D.reactiveElementVersions??=[]).push("2.1.2");var tt=globalThis,dt=o=>o,I=tt.trustedTypes,pt=I?I.createPolicy("lit-html",{createHTML:o=>o}):void 0,vt="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,$t="?"+y,qt=`<${$t}>`,x=document,M=()=>x.createComment(""),N=o=>o===null||typeof o!="object"&&typeof o!="function",et=Array.isArray,zt=o=>et(o)||typeof o?.[Symbol.iterator]=="function",Y=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,mt=/>/g,b=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,gt=/"/g,bt=/^(?:script|style|textarea|title)$/i,rt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),u=rt(1),te=rt(2),ee=rt(3),A=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),yt=new WeakMap,_=x.createTreeWalker(x,129);function _t(o,t){if(!et(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(t):t}var Dt=(o,t)=>{let e=o.length-1,r=[],s,i=t===2?"<svg>":t===3?"<math>":"",a=k;for(let h=0;h<e;h++){let n=o[h],d,p,l=-1,m=0;for(;m<n.length&&(a.lastIndex=m,p=a.exec(n),p!==null);)m=a.lastIndex,a===k?p[1]==="!--"?a=ut:p[1]!==void 0?a=mt:p[2]!==void 0?(bt.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=b):p[3]!==void 0&&(a=b):a===b?p[0]===">"?(a=s??k,l=-1):p[1]===void 0?l=-2:(l=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?b:p[3]==='"'?gt:ft):a===gt||a===ft?a=b:a===ut||a===mt?a=k:(a=b,s=void 0);let g=a===b&&o[h+1].startsWith("/>")?" ":"";i+=a===k?n+qt:l>=0?(r.push(d),n.slice(0,l)+vt+n.slice(l)+y+g):n+y+(l===-2?h:g)}return[_t(o,i+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},O=class o{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let i=0,a=0,h=t.length-1,n=this.parts,[d,p]=Dt(t,e);if(this.el=o.createElement(d,r),_.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=_.nextNode())!==null&&n.length<h;){if(s.nodeType===1){if(s.hasAttributes())for(let l of s.getAttributeNames())if(l.endsWith(vt)){let m=p[a++],g=s.getAttribute(l).split(y),L=/([.?@])?(.*)/.exec(m);n.push({type:1,index:i,name:L[2],strings:g,ctor:L[1]==="."?J:L[1]==="?"?Z:L[1]==="@"?Q:w}),s.removeAttribute(l)}else l.startsWith(y)&&(n.push({type:6,index:i}),s.removeAttribute(l));if(bt.test(s.tagName)){let l=s.textContent.split(y),m=l.length-1;if(m>0){s.textContent=I?I.emptyScript:"";for(let g=0;g<m;g++)s.append(l[g],M()),_.nextNode(),n.push({type:2,index:++i});s.append(l[m],M())}}}else if(s.nodeType===8)if(s.data===$t)n.push({type:2,index:i});else{let l=-1;for(;(l=s.data.indexOf(y,l+1))!==-1;)n.push({type:7,index:i}),l+=y.length-1}i++}}static createElement(t,e){let r=x.createElement("template");return r.innerHTML=t,r}};function E(o,t,e=o,r){if(t===A)return t;let s=r!==void 0?e._$Co?.[r]:e._$Cl,i=N(t)?void 0:t._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(o),s._$AT(o,e,r)),r!==void 0?(e._$Co??=[])[r]=s:e._$Cl=s),s!==void 0&&(t=E(o,s._$AS(o,t.values),s,r)),t}var F=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,s=(t?.creationScope??x).importNode(e,!0);_.currentNode=s;let i=_.nextNode(),a=0,h=0,n=r[0];for(;n!==void 0;){if(a===n.index){let d;n.type===2?d=new U(i,i.nextSibling,this,t):n.type===1?d=new n.ctor(i,n.name,n.strings,this,t):n.type===6&&(d=new X(i,this,t)),this._$AV.push(d),n=r[++h]}a!==n?.index&&(i=_.nextNode(),a++)}return _.currentNode=x,s}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},U=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),N(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):zt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=O.createElement(_t(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(e);else{let i=new F(s,this),a=i.u(this.options);i.p(e),this.T(a),this._$AH=i}}_$AC(t){let e=yt.get(t.strings);return e===void 0&&yt.set(t.strings,e=new O(t)),e}k(t){et(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,s=0;for(let i of t)s===e.length?e.push(r=new o(this.O(M()),this.O(M()),this,this.options)):r=e[s],r._$AI(i),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=dt(t).nextSibling;dt(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},w=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,i){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=c}_$AI(t,e=this,r,s){let i=this.strings,a=!1;if(i===void 0)t=E(this,t,e,0),a=!N(t)||t!==this._$AH&&t!==A,a&&(this._$AH=t);else{let h=t,n,d;for(t=i[0],n=0;n<i.length-1;n++)d=E(this,h[r+n],e,n),d===A&&(d=this._$AH[n]),a||=!N(d)||d!==this._$AH[n],d===c?t=c:t!==c&&(t+=(d??"")+i[n+1]),this._$AH[n]=d}a&&!s&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},J=class extends w{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},Z=class extends w{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},Q=class extends w{constructor(t,e,r,s,i){super(t,e,r,s,i),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??c)===A)return;let r=this._$AH,s=t===c&&r!==c||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==c&&(r===c||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},X=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}};var jt=tt.litHtmlPolyfillSupport;jt?.(O,U),(tt.litHtmlVersions??=[]).push("3.3.2");var xt=(o,t,e)=>{let r=e?.renderBefore??t,s=r._$litPart$;if(s===void 0){let i=e?.renderBefore??null;r._$litPart$=s=new U(t.insertBefore(M(),i),i,void 0,e??{})}return s._$AI(o),s};var st=globalThis,v=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=xt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};v._$litElement$=!0,v.finalized=!0,st.litElementHydrateSupport?.({LitElement:v});var It=st.litElementPolyfillSupport;It?.({LitElement:v});(st.litElementVersions??=[]).push("4.2.2");var At=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};var Vt={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:j},Kt=(o=Vt,t,e)=>{let{kind:r,metadata:s}=e,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),r==="setter"&&((o=Object.create(o)).wrapped=!0),i.set(e.name,o),r==="accessor"){let{name:a}=e;return{set(h){let n=t.get.call(this);t.set.call(this,h),this.requestUpdate(a,n,o,!0,h)},init(h){return h!==void 0&&this.C(a,void 0,o,h),h}}}if(r==="setter"){let{name:a}=e;return function(h){let n=this[a];t.call(this,h),this.requestUpdate(a,n,o,!0,h)}}throw Error("Unsupported decorator location: "+r)};function V(o){return(t,e)=>typeof e=="object"?Kt(o,t,e):((r,s,i)=>{let a=s.hasOwnProperty(i);return s.constructor.createProperty(i,r),a?Object.getOwnPropertyDescriptor(s,i):void 0})(o,t,e)}function St(o){return V({...o,state:!0,attribute:!1})}var ot={Aries:"\u2648",Taurus:"\u2649",Gemini:"\u264A",Cancer:"\u264B",Leo:"\u264C",Virgo:"\u264D",Libra:"\u264E",Scorpio:"\u264F",Sagittarius:"\u2650",Capricorn:"\u2651",Aquarius:"\u2652",Pisces:"\u2653"};var Gt=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],De=Gt.map(o=>o.toLowerCase());var Et=C`
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
`;var Wt={sarva:"Sarvashtakavarga",bhinna:"Bhinnashtakavarga",pinda:"Shodhya Pinda"},S=["sarva","bhinna","pinda"],$=class extends v{constructor(){super(...arguments);this.data=null;this.activeTab="sarva"}render(){if(!this.data)return u`<div class="roxy-empty" role="status">No ashtakavarga data</div>`;let e=this.data.signs??[];return u`<div class="wrap" aria-label="Ashtakavarga grid">
			<div class="head">
				<h2 class="title">Ashtakavarga</h2>
				${e.length?u`<p class="subtitle">${e.length} signs</p>`:c}
			</div>

			<div
				class="tablist"
				role="tablist"
				aria-label="Ashtakavarga views"
				@keydown=${this.onTabKeyDown}
			>
				${S.map(r=>u`<button
						class="tab"
						role="tab"
						id="tab-${r}"
						aria-selected=${this.activeTab===r?"true":"false"}
						aria-controls="panel-${r}"
						tabindex=${this.activeTab===r?"0":"-1"}
						@click=${()=>{this.activeTab=r}}
					>
						${Wt[r]}
					</button>`)}
			</div>

			<div
				id="panel-${this.activeTab}"
				role="tabpanel"
				aria-labelledby="tab-${this.activeTab}"
			>
				${this.activeTab==="sarva"?this.renderSarva(e):this.activeTab==="bhinna"?this.renderBhinna(e):this.renderPinda()}
			</div>
		</div>`}onTabKeyDown(e){let r=S.indexOf(this.activeTab);e.key==="ArrowRight"?(e.preventDefault(),this.activeTab=S[(r+1)%S.length],this.focusActiveTab()):e.key==="ArrowLeft"&&(e.preventDefault(),this.activeTab=S[(r-1+S.length)%S.length],this.focusActiveTab())}focusActiveTab(){requestAnimationFrame(()=>{this.shadowRoot?.querySelector(`#tab-${this.activeTab}`)?.focus()})}heatClass(e){return e<=1?"heat-1":e<=2?"heat-2":e<=3?"heat-3":e<=4?"heat-4":e<=5?"heat-5":e<=6?"heat-6":"heat-7"}renderSarva(e){let r=this.data.sarvashtakavarga;return r?u`<div class="overflow-scroll">
			<table aria-label="Sarvashtakavarga bindu counts per sign">
				<thead>
					<tr>
						<th scope="col">Sign</th>
						<th scope="col">Bindus</th>
					</tr>
				</thead>
				<tbody>
					${e.map((s,i)=>{let a=r.bindus[i]??0,h=this.heatClass(a);return u`<tr>
							<td>
								<div class="planet-cell">
									<span class="glyph" aria-hidden="true">${ot[s]??""}</span>
									${s}
								</div>
							</td>
							<td class="${`heat-cell ${h}`}">${a}</td>
						</tr>`})}
				</tbody>
				<tfoot>
					<tr class="total-row">
						<td>Total</td>
						<td>${r.total}</td>
					</tr>
				</tfoot>
			</table>
		</div>`:u`<p class="roxy-empty">No sarvashtakavarga data</p>`}renderBhinna(e){let r=this.data.bhinnashtakavarga;return r?.length?u`<div class="overflow-scroll">
			<table class="bhinna-table" aria-label="Bhinnashtakavarga planet-by-sign grid">
				<thead>
					<tr>
						<th scope="col">Planet</th>
						${e.map(s=>u`<th scope="col" title=${s}>${ot[s]??s.slice(0,2)}</th>`)}
						<th scope="col">Total</th>
					</tr>
				</thead>
				<tbody>
					${r.map(s=>u`<tr>
						<td>${s.planet}</td>
						${s.bindus.map(i=>{let a=this.heatClass(i);return u`<td class="${`heat-cell ${a}`}">${i}</td>`})}
						<td>${s.total}</td>
					</tr>`)}
				</tbody>
			</table>
		</div>`:u`<p class="roxy-empty">No bhinnashtakavarga data</p>`}renderPinda(){let e=this.data.shodhyaPinda;return e?.length?u`<div class="overflow-scroll">
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
					${e.map(r=>u`<tr>
							<td>${r.planet}</td>
							<td>${r.rashiPinda}</td>
							<td>${r.grahaPinda}</td>
							<td>${r.shodhyaPinda}</td>
						</tr>`)}
				</tbody>
			</table>
		</div>`:u`<p class="roxy-empty">No shodhya pinda data</p>`}};$.styles=[Et,C`
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
		`],B([V({attribute:!1})],$.prototype,"data",2),B([St()],$.prototype,"activeTab",2),$=B([At("roxy-ashtakavarga-grid")],$);return Rt(Yt);})();
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
//# sourceMappingURL=ashtakavarga-grid.js.map
