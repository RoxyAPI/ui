"use strict";var RoxyUI_horoscope_card=(()=>{var H=Object.defineProperty;var se=Object.getOwnPropertyDescriptor;var Ee=Object.getOwnPropertyNames;var we=Object.prototype.hasOwnProperty;var Ce=(o,e)=>{for(var t in e)H(o,t,{get:e[t],enumerable:!0})},Pe=(o,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Ee(e))!we.call(o,s)&&s!==t&&H(o,s,{get:()=>e[s],enumerable:!(r=se(e,s))||r.enumerable});return o};var ke=o=>Pe(H({},"__esModule",{value:!0}),o),T=(o,e,t,r)=>{for(var s=r>1?void 0:r?se(e,t):e,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(e,t,s):n(s))||s);return r&&s&&H(e,t,s),s};var We={};Ce(We,{RoxyHoroscopeCard:()=>v});var z=globalThis,D=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),oe=new WeakMap,w=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(D&&e===void 0){let r=t!==void 0&&t.length===1;r&&(e=oe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&oe.set(t,e))}return e}toString(){return this.cssText}},ie=o=>new w(typeof o=="string"?o:o+"",void 0,V),C=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((r,s,i)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[i+1],o[0]);return new w(t,o,V)},ne=(o,e)=>{if(D)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let r=document.createElement("style"),s=z.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=t.cssText,o.appendChild(r)}},W=D?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return ie(t)})(o):o;var{is:Re,defineProperty:Ne,getOwnPropertyDescriptor:Me,getOwnPropertyNames:Ue,getOwnPropertySymbols:Le,getPrototypeOf:Oe}=Object,q=globalThis,ae=q.trustedTypes,He=ae?ae.emptyScript:"",Te=q.reactiveElementPolyfillSupport,P=(o,e)=>o,k={toAttribute(o,e){switch(e){case Boolean:o=o?He:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},j=(o,e)=>!Re(o,e),ce={attribute:!0,type:String,converter:k,reflect:!1,useDefault:!1,hasChanged:j};Symbol.metadata??=Symbol("metadata"),q.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ce){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(e,r,t);s!==void 0&&Ne(this.prototype,e,s)}}static getPropertyDescriptor(e,t,r){let{get:s,set:i}=Me(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){let c=s?.call(this);i?.call(this,n),this.requestUpdate(e,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ce}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let e=Oe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let t=this.properties,r=[...Ue(t),...Le(t)];for(let s of r)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[r,s]of t)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[t,r]of this.elementProperties){let s=this._$Eu(t,r);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let s of r)t.unshift(W(s))}else e!==void 0&&t.push(W(e));return t}static _$Eu(e,t){let r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ne(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){let r=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,r);if(s!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:k).toAttribute(t,r.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,t){let r=this.constructor,s=r._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let i=r.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:k;this._$Em=s;let c=n.fromAttribute(t,i.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(e,t,r,s=!1,i){if(e!==void 0){let n=this.constructor;if(s===!1&&(i=this[e]),r??=n.getPropertyOptions(e),!((r.hasChanged??j)(i,t)||r.useDefault&&r.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:s,wrapped:i},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),i!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,i]of r){let{wrapped:n}=i,c=this[s];n!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,i,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[P("elementProperties")]=new Map,y[P("finalized")]=new Map,Te?.({ReactiveElement:y}),(q.reactiveElementVersions??=[]).push("2.1.2");var X=globalThis,le=o=>o,B=X.trustedTypes,he=B?B.createPolicy("lit-html",{createHTML:o=>o}):void 0,fe="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,ge="?"+g,ze=`<${ge}>`,A=document,N=()=>A.createComment(""),M=o=>o===null||typeof o!="object"&&typeof o!="function",ee=Array.isArray,De=o=>ee(o)||typeof o?.[Symbol.iterator]=="function",K=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,de=/>/g,x=RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ue=/'/g,me=/"/g,$e=/^(?:script|style|textarea|title)$/i,te=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),u=te(1),Qe=te(2),Xe=te(3),b=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),ye=new WeakMap,_=A.createTreeWalker(A,129);function ve(o,e){if(!ee(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return he!==void 0?he.createHTML(e):e}var qe=(o,e)=>{let t=o.length-1,r=[],s,i=e===2?"<svg>":e===3?"<math>":"",n=R;for(let c=0;c<t;c++){let a=o[c],p,d,h=-1,m=0;for(;m<a.length&&(n.lastIndex=m,d=n.exec(a),d!==null);)m=n.lastIndex,n===R?d[1]==="!--"?n=pe:d[1]!==void 0?n=de:d[2]!==void 0?($e.test(d[2])&&(s=RegExp("</"+d[2],"g")),n=x):d[3]!==void 0&&(n=x):n===x?d[0]===">"?(n=s??R,h=-1):d[1]===void 0?h=-2:(h=n.lastIndex-d[2].length,p=d[1],n=d[3]===void 0?x:d[3]==='"'?me:ue):n===me||n===ue?n=x:n===pe||n===de?n=R:(n=x,s=void 0);let f=n===x&&o[c+1].startsWith("/>")?" ":"";i+=n===R?a+ze:h>=0?(r.push(p),a.slice(0,h)+fe+a.slice(h)+g+f):a+g+(h===-2?c:f)}return[ve(o,i+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},U=class o{constructor({strings:e,_$litType$:t},r){let s;this.parts=[];let i=0,n=0,c=e.length-1,a=this.parts,[p,d]=qe(e,t);if(this.el=o.createElement(p,r),_.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=_.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(fe)){let m=d[n++],f=s.getAttribute(h).split(g),O=/([.?@])?(.*)/.exec(m);a.push({type:1,index:i,name:O[2],strings:f,ctor:O[1]==="."?F:O[1]==="?"?J:O[1]==="@"?Z:E}),s.removeAttribute(h)}else h.startsWith(g)&&(a.push({type:6,index:i}),s.removeAttribute(h));if($e.test(s.tagName)){let h=s.textContent.split(g),m=h.length-1;if(m>0){s.textContent=B?B.emptyScript:"";for(let f=0;f<m;f++)s.append(h[f],N()),_.nextNode(),a.push({type:2,index:++i});s.append(h[m],N())}}}else if(s.nodeType===8)if(s.data===ge)a.push({type:2,index:i});else{let h=-1;for(;(h=s.data.indexOf(g,h+1))!==-1;)a.push({type:7,index:i}),h+=g.length-1}i++}}static createElement(e,t){let r=A.createElement("template");return r.innerHTML=e,r}};function S(o,e,t=o,r){if(e===b)return e;let s=r!==void 0?t._$Co?.[r]:t._$Cl,i=M(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(o),s._$AT(o,t,r)),r!==void 0?(t._$Co??=[])[r]=s:t._$Cl=s),s!==void 0&&(e=S(o,s._$AS(o,e.values),s,r)),e}var Y=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,s=(e?.creationScope??A).importNode(t,!0);_.currentNode=s;let i=_.nextNode(),n=0,c=0,a=r[0];for(;a!==void 0;){if(n===a.index){let p;a.type===2?p=new L(i,i.nextSibling,this,e):a.type===1?p=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(p=new Q(i,this,e)),this._$AV.push(p),a=r[++c]}n!==a?.index&&(i=_.nextNode(),n++)}return _.currentNode=A,s}p(e){let t=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},L=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,s){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),M(e)?e===l||e==null||e===""?(this._$AH!==l&&this._$AR(),this._$AH=l):e!==this._$AH&&e!==b&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):De(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==l&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,s=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=U.createElement(ve(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(t);else{let i=new Y(s,this),n=i.u(this.options);i.p(t),this.T(n),this._$AH=i}}_$AC(e){let t=ye.get(e.strings);return t===void 0&&ye.set(e.strings,t=new U(e)),t}k(e){ee(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,s=0;for(let i of e)s===t.length?t.push(r=new o(this.O(N()),this.O(N()),this,this.options)):r=t[s],r._$AI(i),s++;s<t.length&&(this._$AR(r&&r._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let r=le(e).nextSibling;le(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,s,i){this.type=1,this._$AH=l,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=l}_$AI(e,t=this,r,s){let i=this.strings,n=!1;if(i===void 0)e=S(this,e,t,0),n=!M(e)||e!==this._$AH&&e!==b,n&&(this._$AH=e);else{let c=e,a,p;for(e=i[0],a=0;a<i.length-1;a++)p=S(this,c[r+a],t,a),p===b&&(p=this._$AH[a]),n||=!M(p)||p!==this._$AH[a],p===l?e=l:e!==l&&(e+=(p??"")+i[a+1]),this._$AH[a]=p}n&&!s&&this.j(e)}j(e){e===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},F=class extends E{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===l?void 0:e}},J=class extends E{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==l)}},Z=class extends E{constructor(e,t,r,s,i){super(e,t,r,s,i),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??l)===b)return;let r=this._$AH,s=e===l&&r!==l||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==l&&(r===l||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Q=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}};var je=X.litHtmlPolyfillSupport;je?.(U,L),(X.litHtmlVersions??=[]).push("3.3.2");var xe=(o,e,t)=>{let r=t?.renderBefore??e,s=r._$litPart$;if(s===void 0){let i=t?.renderBefore??null;r._$litPart$=s=new L(e.insertBefore(N(),i),i,void 0,t??{})}return s._$AI(o),s};var re=globalThis,$=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=xe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};$._$litElement$=!0,$.finalized=!0,re.litElementHydrateSupport?.({LitElement:$});var Be=re.litElementPolyfillSupport;Be?.({LitElement:$});(re.litElementVersions??=[]).push("4.2.2");var _e=o=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,e)}):customElements.define(o,e)};var Ie={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:j},Ge=(o=Ie,e,t)=>{let{kind:r,metadata:s}=t,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),r==="setter"&&((o=Object.create(o)).wrapped=!0),i.set(t.name,o),r==="accessor"){let{name:n}=t;return{set(c){let a=e.get.call(this);e.set.call(this,c),this.requestUpdate(n,a,o,!0,c)},init(c){return c!==void 0&&this.C(n,void 0,o,c),c}}}if(r==="setter"){let{name:n}=t;return function(c){let a=this[n];e.call(this,c),this.requestUpdate(n,a,o,!0,c)}}throw Error("Unsupported decorator location: "+r)};function I(o){return(e,t)=>typeof t=="object"?Ge(o,e,t):((r,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,r),n?Object.getOwnPropertyDescriptor(s,i):void 0})(o,e,t)}var Ae={Aries:"\u2648",Taurus:"\u2649",Gemini:"\u264A",Cancer:"\u264B",Leo:"\u264C",Virgo:"\u264D",Libra:"\u264E",Scorpio:"\u264F",Sagittarius:"\u2650",Capricorn:"\u2651",Aquarius:"\u2652",Pisces:"\u2653"};var Ve=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],Dt=Ve.map(o=>o.toLowerCase());var be=C`
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
`;function Se(o){return o?o.charAt(0).toUpperCase()+o.slice(1).toLowerCase():""}var v=class extends ${constructor(){super(...arguments);this.data=null;this.period="daily"}render(){let t=this.data;if(!t)return u`<div class="roxy-empty" role="status">No horoscope data</div>`;let r=t.sign??"",s=r?Ae[Se(r)]??"":"",i="energyRating"in t&&typeof t.energyRating=="number"?t.energyRating:null,n="date"in t&&t.date||"week"in t&&t.week||"month"in t&&t.month||"";return u`<article
			class="card"
			aria-label=${`${this.period} horoscope for ${r}`}
		>
			<header class="head">
				<span class="glyph" aria-hidden="true">${s}</span>
				<div>
					<h2 class="title">${r} ${this.period}</h2>
					${n?u`<div class="date">${n}</div>`:l}
				</div>
				${i!==null?u`<span class="energy" aria-label=${`Energy ${i} of 10`}>
							Energy ${i}/10
							<span class="energy-bar"
								><span style="width: ${i/10*100}%"></span
							></span>
						</span>`:l}
			</header>

			${t.overview?u`<p class="overview">${t.overview}</p>`:l}

			<div class="sections">
				${t.love?u`<div class="section">
							<h3>Love</h3>
							<p>${t.love}</p>
						</div>`:l}
				${t.career?u`<div class="section">
							<h3>Career</h3>
							<p>${t.career}</p>
						</div>`:l}
				${t.health?u`<div class="section">
							<h3>Health</h3>
							<p>${t.health}</p>
						</div>`:l}
				${t.finance?u`<div class="section">
							<h3>Finance</h3>
							<p>${t.finance}</p>
						</div>`:l}
				${"advice"in t&&t.advice?u`<div class="section">
							<h3>Advice</h3>
							<p>${t.advice}</p>
						</div>`:l}
			</div>

			${(()=>{let c="luckyNumber"in t&&t.luckyNumber!==void 0?t.luckyNumber:void 0,a="luckyColor"in t&&t.luckyColor?t.luckyColor:"",p="luckyNumbers"in t&&t.luckyNumbers?t.luckyNumbers:[],d="luckyDays"in t&&t.luckyDays?t.luckyDays:[],h=t.compatibleSigns??[];return c===void 0&&!a&&p.length===0&&d.length===0&&h.length===0?l:u`<div class="lucky">
						${c!==void 0?u`<span>Lucky number <strong>${c}</strong></span>`:l}
						${a?u`<span>Lucky color <strong>${a}</strong></span>`:l}
						${p.length?u`<span
									>Lucky numbers
									<strong>${p.join(", ")}</strong></span
								>`:l}
						${d.length?u`<span
									>Lucky days <strong>${d.join(", ")}</strong></span
								>`:l}
						${h.length?u`<span class="compat-wrap">
									Best with
									<span class="compat"
										>${h.map(m=>u`<span>${m}</span>`)}</span
									>
								</span>`:l}
					</div>`})()}
		</article>`}};v.styles=[be,C`
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
		`],T([I({attribute:!1})],v.prototype,"data",2),T([I({type:String,reflect:!0})],v.prototype,"period",2),v=T([_e("roxy-horoscope-card")],v);return ke(We);})();
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
//# sourceMappingURL=horoscope-card.js.map
