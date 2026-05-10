"use strict";var RoxyUI_tarot_spread=(()=>{var H=Object.defineProperty;var re=Object.getOwnPropertyDescriptor;var Ae=Object.getOwnPropertyNames;var Se=Object.prototype.hasOwnProperty;var Ee=(o,e)=>{for(var t in e)H(o,t,{get:e[t],enumerable:!0})},Ce=(o,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Ae(e))!Se.call(o,r)&&r!==t&&H(o,r,{get:()=>e[r],enumerable:!(s=re(e,r))||s.enumerable});return o};var we=o=>Ce(H({},"__esModule",{value:!0}),o),z=(o,e,t,s)=>{for(var r=s>1?void 0:s?re(e,t):e,i=o.length-1,n;i>=0;i--)(n=o[i])&&(r=(s?n(e,t,r):n(r))||r);return s&&r&&H(e,t,r),r};var Ie={};Ee(Ie,{RoxyTarotSpread:()=>_});var j=globalThis,D=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),oe=new WeakMap,w=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(D&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=oe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&oe.set(t,e))}return e}toString(){return this.cssText}},ie=o=>new w(typeof o=="string"?o:o+"",void 0,W),P=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((s,r,i)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[i+1],o[0]);return new w(t,o,W)},ne=(o,e)=>{if(D)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),r=j.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,o.appendChild(s)}},Y=D?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return ie(t)})(o):o;var{is:Pe,defineProperty:Re,getOwnPropertyDescriptor:Ue,getOwnPropertyNames:Ne,getOwnPropertySymbols:Oe,getPrototypeOf:Me}=Object,L=globalThis,ae=L.trustedTypes,Te=ae?ae.emptyScript:"",ke=L.reactiveElementPolyfillSupport,R=(o,e)=>o,U={toAttribute(o,e){switch(e){case Boolean:o=o?Te:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},q=(o,e)=>!Pe(o,e),le={attribute:!0,type:String,converter:U,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??=Symbol("metadata"),L.litPropertyMetadata??=new WeakMap;var $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=le){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(e,s,t);r!==void 0&&Re(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){let{get:r,set:i}=Ue(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){let l=r?.call(this);i?.call(this,n),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??le}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let e=Me(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let t=this.properties,s=[...Ne(t),...Oe(t)];for(let r of s)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,r]of t)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let r=this._$Eu(t,s);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let r of s)t.unshift(Y(r))}else e!==void 0&&t.push(Y(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ne(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:U).toAttribute(t,s.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let i=s.getPropertyOptions(r),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:U;this._$Em=r;let l=n.fromAttribute(t,i.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(e,t,s,r=!1,i){if(e!==void 0){let n=this.constructor;if(r===!1&&(i=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??q)(i,t)||s.useDefault&&s.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:i},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),i!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,i]of this._$Ep)this[r]=i;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,i]of s){let{wrapped:n}=i,l=this[r];n!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,i,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[R("elementProperties")]=new Map,$[R("finalized")]=new Map,ke?.({ReactiveElement:$}),(L.reactiveElementVersions??=[]).push("2.1.2");var X=globalThis,ce=o=>o,B=X.trustedTypes,de=B?B.createPolicy("lit-html",{createHTML:o=>o}):void 0,ge="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,$e="?"+y,He=`<${$e}>`,A=document,O=()=>A.createComment(""),M=o=>o===null||typeof o!="object"&&typeof o!="function",ee=Array.isArray,ze=o=>ee(o)||typeof o?.[Symbol.iterator]=="function",F=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,he=/-->/g,pe=/>/g,x=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ue=/'/g,me=/"/g,ye=/^(?:script|style|textarea|title)$/i,te=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),u=te(1),Je=te(2),Ze=te(3),S=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),fe=new WeakMap,b=A.createTreeWalker(A,129);function ve(o,e){if(!ee(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return de!==void 0?de.createHTML(e):e}var je=(o,e)=>{let t=o.length-1,s=[],r,i=e===2?"<svg>":e===3?"<math>":"",n=N;for(let l=0;l<t;l++){let a=o[l],p,m,d=-1,f=0;for(;f<a.length&&(n.lastIndex=f,m=n.exec(a),m!==null);)f=n.lastIndex,n===N?m[1]==="!--"?n=he:m[1]!==void 0?n=pe:m[2]!==void 0?(ye.test(m[2])&&(r=RegExp("</"+m[2],"g")),n=x):m[3]!==void 0&&(n=x):n===x?m[0]===">"?(n=r??N,d=-1):m[1]===void 0?d=-2:(d=n.lastIndex-m[2].length,p=m[1],n=m[3]===void 0?x:m[3]==='"'?me:ue):n===me||n===ue?n=x:n===he||n===pe?n=N:(n=x,r=void 0);let g=n===x&&o[l+1].startsWith("/>")?" ":"";i+=n===N?a+He:d>=0?(s.push(p),a.slice(0,d)+ge+a.slice(d)+y+g):a+y+(d===-2?l:g)}return[ve(o,i+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},T=class o{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let i=0,n=0,l=e.length-1,a=this.parts,[p,m]=je(e,t);if(this.el=o.createElement(p,s),b.currentNode=this.el.content,t===2||t===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=b.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(ge)){let f=m[n++],g=r.getAttribute(d).split(y),h=/([.?@])?(.*)/.exec(f);a.push({type:1,index:i,name:h[2],strings:g,ctor:h[1]==="."?J:h[1]==="?"?Z:h[1]==="@"?G:C}),r.removeAttribute(d)}else d.startsWith(y)&&(a.push({type:6,index:i}),r.removeAttribute(d));if(ye.test(r.tagName)){let d=r.textContent.split(y),f=d.length-1;if(f>0){r.textContent=B?B.emptyScript:"";for(let g=0;g<f;g++)r.append(d[g],O()),b.nextNode(),a.push({type:2,index:++i});r.append(d[f],O())}}}else if(r.nodeType===8)if(r.data===$e)a.push({type:2,index:i});else{let d=-1;for(;(d=r.data.indexOf(y,d+1))!==-1;)a.push({type:7,index:i}),d+=y.length-1}i++}}static createElement(e,t){let s=A.createElement("template");return s.innerHTML=e,s}};function E(o,e,t=o,s){if(e===S)return e;let r=s!==void 0?t._$Co?.[s]:t._$Cl,i=M(e)?void 0:e._$litDirective$;return r?.constructor!==i&&(r?._$AO?.(!1),i===void 0?r=void 0:(r=new i(o),r._$AT(o,t,s)),s!==void 0?(t._$Co??=[])[s]=r:t._$Cl=r),r!==void 0&&(e=E(o,r._$AS(o,e.values),r,s)),e}var K=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,r=(e?.creationScope??A).importNode(t,!0);b.currentNode=r;let i=b.nextNode(),n=0,l=0,a=s[0];for(;a!==void 0;){if(n===a.index){let p;a.type===2?p=new k(i,i.nextSibling,this,e):a.type===1?p=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(p=new Q(i,this,e)),this._$AV.push(p),a=s[++l]}n!==a?.index&&(i=b.nextNode(),n++)}return b.currentNode=A,r}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},k=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=E(this,e,t),M(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ze(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=T.createElement(ve(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(t);else{let i=new K(r,this),n=i.u(this.options);i.p(t),this.T(n),this._$AH=i}}_$AC(e){let t=fe.get(e.strings);return t===void 0&&fe.set(e.strings,t=new T(e)),t}k(e){ee(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,r=0;for(let i of e)r===t.length?t.push(s=new o(this.O(O()),this.O(O()),this,this.options)):s=t[r],s._$AI(i),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=ce(e).nextSibling;ce(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,i){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(e,t=this,s,r){let i=this.strings,n=!1;if(i===void 0)e=E(this,e,t,0),n=!M(e)||e!==this._$AH&&e!==S,n&&(this._$AH=e);else{let l=e,a,p;for(e=i[0],a=0;a<i.length-1;a++)p=E(this,l[s+a],t,a),p===S&&(p=this._$AH[a]),n||=!M(p)||p!==this._$AH[a],p===c?e=c:e!==c&&(e+=(p??"")+i[a+1]),this._$AH[a]=p}n&&!r&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},J=class extends C{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}},Z=class extends C{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}},G=class extends C{constructor(e,t,s,r,i){super(e,t,s,r,i),this.type=5}_$AI(e,t=this){if((e=E(this,e,t,0)??c)===S)return;let s=this._$AH,r=e===c&&s!==c||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==c&&(s===c||r);r&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Q=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){E(this,e)}};var De=X.litHtmlPolyfillSupport;De?.(T,k),(X.litHtmlVersions??=[]).push("3.3.2");var _e=(o,e,t)=>{let s=t?.renderBefore??e,r=s._$litPart$;if(r===void 0){let i=t?.renderBefore??null;s._$litPart$=r=new k(e.insertBefore(O(),i),i,void 0,t??{})}return r._$AI(o),r};var se=globalThis,v=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=_e(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}};v._$litElement$=!0,v.finalized=!0,se.litElementHydrateSupport?.({LitElement:v});var Le=se.litElementPolyfillSupport;Le?.({LitElement:v});(se.litElementVersions??=[]).push("4.2.2");var xe=o=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,e)}):customElements.define(o,e)};var qe={attribute:!0,type:String,converter:U,reflect:!1,hasChanged:q},Be=(o=qe,e,t)=>{let{kind:s,metadata:r}=t,i=globalThis.litPropertyMetadata.get(r);if(i===void 0&&globalThis.litPropertyMetadata.set(r,i=new Map),s==="setter"&&((o=Object.create(o)).wrapped=!0),i.set(t.name,o),s==="accessor"){let{name:n}=t;return{set(l){let a=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,a,o,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,o,l),l}}}if(s==="setter"){let{name:n}=t;return function(l){let a=this[n];e.call(this,l),this.requestUpdate(n,a,o,!0,l)}}throw Error("Unsupported decorator location: "+s)};function I(o){return(e,t)=>typeof t=="object"?Be(o,e,t):((s,r,i)=>{let n=r.hasOwnProperty(i);return r.constructor.createProperty(i,s),n?Object.getOwnPropertyDescriptor(r,i):void 0})(o,e,t)}var be=P`
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
`;var _=class extends v{constructor(){super(...arguments);this.data=null;this.spread="three-card"}render(){let t=this.data;if(!t)return u`<div class="roxy-empty" role="status">No tarot spread</div>`;let s="answer"in t,r="cards"in t&&!("spread"in t),i=r?[]:"positions"in t?t.positions??[]:[],n=r&&"cards"in t?t.cards:[],l=s?t.answer:void 0,a=s?t.strength:void 0,p="spread"in t?t.spread:this.spread.replace(/-/g," "),m="question"in t?t.question:void 0,d="summary"in t?t.summary:void 0,f=s?t.interpretation:void 0,g=l?l.toLowerCase().replace(/[^a-z]/g,""):"";return u`<article class="wrap" aria-label="Tarot spread">
			<header class="head">
				<h2 class="title">${p}</h2>
				${m?u`<span class="question">"${m}"</span>`:c}
			</header>
			${s?u`<div>
						<span class=${`answer ${g}`}>${l}</span>
						${a?u`<small> · ${a}</small>`:c}
					</div>`:c}
			${i.length>0?u`<div class="grid">
						${i.map(h=>u`<div class="card">
								<p class="label">${h.name??""}</p>
								<div class="image">
									${h.card?.imageUrl?u`<img
												src=${h.card.imageUrl}
												alt=${h.card.name??"tarot card"}
												class=${h.card.reversed?"reversed":""}
											/>`:u`${h.card?.name??"?"}`}
								</div>
								<p class="name">
									${h.card?.name??""}
									${h.card?.reversed?u`<small>(reversed)</small>`:c}
								</p>
								${h.interpretation?u`<p class="interp">${h.interpretation}</p>`:c}
							</div>`)}
					</div>`:c}
			${n.length>0?u`<div class="grid">
						${n.map(h=>u`<div class="card">
								<div class="image">
									${h.imageUrl?u`<img
												src=${h.imageUrl}
												alt=${h.name??"tarot card"}
												class=${h.reversed?"reversed":""}
											/>`:u`${h.name??"?"}`}
								</div>
								<p class="name">
									${h.name??""}
									${h.reversed?u`<small>(reversed)</small>`:c}
								</p>
								${h.meaning?u`<p class="interp">${h.meaning}</p>`:c}
							</div>`)}
					</div>`:c}
			${d?u`<p class="reading">${d}</p>`:c}
			${f?u`<p class="reading">${f}</p>`:c}
		</article>`}};_.styles=[be,P`
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
		`],z([I({attribute:!1})],_.prototype,"data",2),z([I({type:String,reflect:!0})],_.prototype,"spread",2),_=z([xe("roxy-tarot-spread")],_);return we(Ie);})();
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
//# sourceMappingURL=tarot-spread.js.map
