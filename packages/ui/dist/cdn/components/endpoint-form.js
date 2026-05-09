"use strict";var RoxyUI_endpoint_form=(()=>{var L=Object.defineProperty;var ie=Object.getOwnPropertyDescriptor;var Ee=Object.getOwnPropertyNames;var we=Object.prototype.hasOwnProperty;var Ce=(i,e)=>{for(var t in e)L(i,t,{get:e[t],enumerable:!0})},Oe=(i,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Ee(e))!we.call(i,r)&&r!==t&&L(i,r,{get:()=>e[r],enumerable:!(s=ie(e,r))||s.enumerable});return i};var Pe=i=>Oe(L({},"__esModule",{value:!0}),i),y=(i,e,t,s)=>{for(var r=s>1?void 0:s?ie(e,t):e,o=i.length-1,n;o>=0;o--)(n=i[o])&&(r=(s?n(e,t,r):n(r))||r);return s&&r&&L(e,t,r),r};var We={};Ce(We,{RoxyEndpointForm:()=>m});var j=globalThis,D=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),oe=new WeakMap,O=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(D&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=oe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&oe.set(t,e))}return e}toString(){return this.cssText}},ne=i=>new O(typeof i=="string"?i:i+"",void 0,K),P=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((s,r,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[o+1],i[0]);return new O(t,i,K)},ae=(i,e)=>{if(D)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),r=j.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}},J=D?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return ne(t)})(i):i;var{is:Ue,defineProperty:Te,getOwnPropertyDescriptor:ke,getOwnPropertyNames:Me,getOwnPropertySymbols:Re,getPrototypeOf:qe}=Object,B=globalThis,le=B.trustedTypes,He=le?le.emptyScript:"",Ne=B.reactiveElementPolyfillSupport,U=(i,e)=>i,T={toAttribute(i,e){switch(e){case Boolean:i=i?He:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},I=(i,e)=>!Ue(i,e),ce={attribute:!0,type:String,converter:T,reflect:!1,useDefault:!1,hasChanged:I};Symbol.metadata??=Symbol("metadata"),B.litPropertyMetadata??=new WeakMap;var $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ce){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(e,s,t);r!==void 0&&Te(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){let{get:r,set:o}=ke(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){let l=r?.call(this);o?.call(this,n),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ce}static _$Ei(){if(this.hasOwnProperty(U("elementProperties")))return;let e=qe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(U("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(U("properties"))){let t=this.properties,s=[...Me(t),...Re(t)];for(let r of s)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,r]of t)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let r=this._$Eu(t,s);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let r of s)t.unshift(J(r))}else e!==void 0&&t.push(J(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ae(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:T).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){let s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let o=s.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:T;this._$Em=r;let l=n.fromAttribute(t,o.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(e,t,s,r=!1,o){if(e!==void 0){let n=this.constructor;if(r===!1&&(o=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??I)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:o},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,o]of s){let{wrapped:n}=o,l=this[r];n!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,o,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[U("elementProperties")]=new Map,$[U("finalized")]=new Map,Ne?.({ReactiveElement:$}),(B.reactiveElementVersions??=[]).push("2.1.2");var ee=globalThis,he=i=>i,V=ee.trustedTypes,de=V?V.createPolicy("lit-html",{createHTML:i=>i}):void 0,ge="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,$e="?"+v,ze=`<${$e}>`,A=document,M=()=>A.createComment(""),R=i=>i===null||typeof i!="object"&&typeof i!="function",te=Array.isArray,Le=i=>te(i)||typeof i?.[Symbol.iterator]=="function",Y=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,ue=/>/g,_=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),me=/'/g,fe=/"/g,ve=/^(?:script|style|textarea|title)$/i,se=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),g=se(1),Qe=se(2),Xe=se(3),S=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),ye=new WeakMap,x=A.createTreeWalker(A,129);function be(i,e){if(!te(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return de!==void 0?de.createHTML(e):e}var je=(i,e)=>{let t=i.length-1,s=[],r,o=e===2?"<svg>":e===3?"<math>":"",n=k;for(let l=0;l<t;l++){let a=i[l],p,c,h=-1,f=0;for(;f<a.length&&(n.lastIndex=f,c=n.exec(a),c!==null);)f=n.lastIndex,n===k?c[1]==="!--"?n=pe:c[1]!==void 0?n=ue:c[2]!==void 0?(ve.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=_):c[3]!==void 0&&(n=_):n===_?c[0]===">"?(n=r??k,h=-1):c[1]===void 0?h=-2:(h=n.lastIndex-c[2].length,p=c[1],n=c[3]===void 0?_:c[3]==='"'?fe:me):n===fe||n===me?n=_:n===pe||n===ue?n=k:(n=_,r=void 0);let u=n===_&&i[l+1].startsWith("/>")?" ":"";o+=n===k?a+ze:h>=0?(s.push(p),a.slice(0,h)+ge+a.slice(h)+v+u):a+v+(h===-2?l:u)}return[be(i,o+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},q=class i{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let o=0,n=0,l=e.length-1,a=this.parts,[p,c]=je(e,t);if(this.el=i.createElement(p,s),x.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=x.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith(ge)){let f=c[n++],u=r.getAttribute(h).split(v),z=/([.?@])?(.*)/.exec(f);a.push({type:1,index:o,name:z[2],strings:u,ctor:z[1]==="."?G:z[1]==="?"?Q:z[1]==="@"?X:C}),r.removeAttribute(h)}else h.startsWith(v)&&(a.push({type:6,index:o}),r.removeAttribute(h));if(ve.test(r.tagName)){let h=r.textContent.split(v),f=h.length-1;if(f>0){r.textContent=V?V.emptyScript:"";for(let u=0;u<f;u++)r.append(h[u],M()),x.nextNode(),a.push({type:2,index:++o});r.append(h[f],M())}}}else if(r.nodeType===8)if(r.data===$e)a.push({type:2,index:o});else{let h=-1;for(;(h=r.data.indexOf(v,h+1))!==-1;)a.push({type:7,index:o}),h+=v.length-1}o++}}static createElement(e,t){let s=A.createElement("template");return s.innerHTML=e,s}};function w(i,e,t=i,s){if(e===S)return e;let r=s!==void 0?t._$Co?.[s]:t._$Cl,o=R(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,t,s)),s!==void 0?(t._$Co??=[])[s]=r:t._$Cl=r),r!==void 0&&(e=w(i,r._$AS(i,e.values),r,s)),e}var Z=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,r=(e?.creationScope??A).importNode(t,!0);x.currentNode=r;let o=x.nextNode(),n=0,l=0,a=s[0];for(;a!==void 0;){if(n===a.index){let p;a.type===2?p=new H(o,o.nextSibling,this,e):a.type===1?p=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(p=new F(o,this,e)),this._$AV.push(p),a=s[++l]}n!==a?.index&&(o=x.nextNode(),n++)}return x.currentNode=A,r}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},H=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),R(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Le(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&R(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=q.createElement(be(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(t);else{let o=new Z(r,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o}}_$AC(e){let t=ye.get(e.strings);return t===void 0&&ye.set(e.strings,t=new q(e)),t}k(e){te(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,r=0;for(let o of e)r===t.length?t.push(s=new i(this.O(M()),this.O(M()),this,this.options)):s=t[r],s._$AI(o),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=he(e).nextSibling;he(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(e,t=this,s,r){let o=this.strings,n=!1;if(o===void 0)e=w(this,e,t,0),n=!R(e)||e!==this._$AH&&e!==S,n&&(this._$AH=e);else{let l=e,a,p;for(e=o[0],a=0;a<o.length-1;a++)p=w(this,l[s+a],t,a),p===S&&(p=this._$AH[a]),n||=!R(p)||p!==this._$AH[a],p===d?e=d:e!==d&&(e+=(p??"")+o[a+1]),this._$AH[a]=p}n&&!r&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},G=class extends C{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},Q=class extends C{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},X=class extends C{constructor(e,t,s,r,o){super(e,t,s,r,o),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??d)===S)return;let s=this._$AH,r=e===d&&s!==d||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==d&&(s===d||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},F=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}};var De=ee.litHtmlPolyfillSupport;De?.(q,H),(ee.litHtmlVersions??=[]).push("3.3.2");var _e=(i,e,t)=>{let s=t?.renderBefore??e,r=s._$litPart$;if(r===void 0){let o=t?.renderBefore??null;s._$litPart$=r=new H(e.insertBefore(M(),o),o,void 0,t??{})}return r._$AI(i),r};var re=globalThis,b=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=_e(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}};b._$litElement$=!0,b.finalized=!0,re.litElementHydrateSupport?.({LitElement:b});var Be=re.litElementPolyfillSupport;Be?.({LitElement:b});(re.litElementVersions??=[]).push("4.2.2");var xe=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};var Ie={attribute:!0,type:String,converter:T,reflect:!1,hasChanged:I},Ve=(i=Ie,e,t)=>{let{kind:s,metadata:r}=t,o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(t.name,i),s==="accessor"){let{name:n}=t;return{set(l){let a=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,a,i,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,i,l),l}}}if(s==="setter"){let{name:n}=t;return function(l){let a=this[n];e.call(this,l),this.requestUpdate(n,a,i,!0,l)}}throw Error("Unsupported decorator location: "+s)};function E(i){return(e,t)=>typeof t=="object"?Ve(i,e,t):((s,r,o)=>{let n=r.hasOwnProperty(o);return r.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(r,o):void 0})(i,e,t)}function N(i){return E({...i,state:!0,attribute:!1})}var Ae=P`
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
`;var m=class extends b{constructor(){super(...arguments);this.endpoint="vedic-astrology/birth-chart";this.method="POST";this.specUrl="https://roxyapi.com/api/v2/openapi.json";this.submitLabel="Submit";this.fields=[];this.values={};this.hasLocation=!1;this.loaded=!1;this.onLocation=t=>{let s=t.detail;s&&(this.values={...this.values,latitude:s.latitude,longitude:s.longitude,timezone:s.timezone??s.utcOffset})};this.onSubmit=t=>{t.preventDefault();let s=this.fields.filter(r=>r.required).filter(r=>this.values[r.name]===void 0||this.values[r.name]==="");if(s.length>0){this.dispatchEvent(new CustomEvent("roxy-validation-error",{detail:{missing:s.map(r=>r.name)},bubbles:!0,composed:!0}));return}this.dispatchEvent(new CustomEvent("roxy-submit",{detail:{endpoint:this.endpoint,values:this.values},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.loadSchema()}async loadSchema(){try{let t=await fetch(this.specUrl);if(!t.ok)throw new Error(`HTTP ${t.status}`);let s=await t.json(),r=`/${this.endpoint.replace(/^\//,"")}`,o=s.paths?.[r]?.[this.method.toLowerCase()];if(!o)return;let n=s.components?.schemas??{},l=[],a;if(o.requestBody){let c=o.requestBody.content?.["application/json"]?.schema;a=this.resolve(c,n)}if(a?.properties){let c=new Set(a.required??[]);for(let[h,f]of Object.entries(a.properties)){let u=this.resolve(f,n)??{};l.push({name:h,type:this.fieldType(u),required:c.has(h),description:u.description,enum:u.enum,min:u.minimum,max:u.maximum,default:u.default})}}for(let c of o.parameters??[])if(c.in==="path"||c.in==="query"){let h=this.resolve(c.schema,n)??{};l.push({name:c.name,type:this.fieldType(h),required:!!c.required,description:h.description,enum:h.enum,default:h.default})}this.fields=l,this.hasLocation=l.some(c=>c.name==="latitude")&&l.some(c=>c.name==="longitude")&&l.some(c=>c.name==="timezone");let p={};for(let c of l)c.default!==void 0&&(p[c.name]=c.default);this.values=p,this.loaded=!0}catch{this.loaded=!0}}resolve(t,s){if(t){if("$ref"in t&&t.$ref){let r=t.$ref.split("/").pop();return r?s[r]:void 0}return t}}fieldType(t){return t.enum?"enum":t.format==="date"?"date":t.format==="time"?"time":t.format==="date-time"?"datetime":t.type==="integer"||t.type==="number"?"number":"text"}setValue(t,s){this.values={...this.values,[t]:s}}render(){if(!this.loaded)return g`<form><div class="roxy-skeleton" style="height: 8rem"></div></form>`;let t=s=>{if(this.hasLocation&&(s.name==="latitude"||s.name==="longitude"||s.name==="timezone"))return d;let r=`roxy-form-${s.name}`;return g`<div class="field">
				<label for=${r}>
					${Se(s.name)}${s.required?g`<span class="req" aria-hidden="true">*</span>`:d}
				</label>
				${s.enum?g`<select
							id=${r}
							?required=${s.required}
							@change=${o=>this.setValue(s.name,o.target.value)}
						>
							<option value="">Choose</option>
							${s.enum.map(o=>g`<option value=${o} ?selected=${this.values[s.name]===o}>
									${o}
								</option>`)}
						</select>`:g`<input
							id=${r}
							type=${this.htmlType(s.type)}
							?required=${s.required}
							min=${s.min??""}
							max=${s.max??""}
							step=${s.type==="number"?"any":""}
							.value=${this.values[s.name]??""}
							@input=${o=>this.setValue(s.name,this.coerce(s.type,o.target.value))}
						/>`}
				${s.description?g`<small class="help">${s.description}</small>`:d}
			</div>`};return g`<form @submit=${this.onSubmit}>
			<h2 class="title">${Se(this.endpoint.split("/").pop()??"")}</h2>
			${this.hasLocation?g`<div class="location-block">
						<label>Birth location</label>
						<roxy-location-search
							@roxy-location-select=${this.onLocation}
							placeholder="City of birth"
						></roxy-location-search>
						<small class="help">
							Required: latitude, longitude, timezone. Pick a city to autofill.
						</small>
					</div>`:d}
			<div class="fields">
				${this.fields.map(s=>t(s))}
			</div>
			<button class="submit" type="submit">${this.submitLabel}</button>
		</form>`}htmlType(t){switch(t){case"date":return"date";case"time":return"time";case"datetime":return"datetime-local";case"number":return"number";default:return"text"}}coerce(t,s){if(s!==""){if(t==="number"){let r=Number(s);return Number.isFinite(r)?r:void 0}return s}}};m.styles=[Ae,P`
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
		`],y([E({type:String,attribute:"data-endpoint"})],m.prototype,"endpoint",2),y([E({type:String})],m.prototype,"method",2),y([E({type:String,attribute:"spec-url"})],m.prototype,"specUrl",2),y([E({type:String,attribute:"submit-label"})],m.prototype,"submitLabel",2),y([N()],m.prototype,"fields",2),y([N()],m.prototype,"values",2),y([N()],m.prototype,"hasLocation",2),y([N()],m.prototype,"loaded",2),m=y([xe("roxy-endpoint-form")],m);function Se(i){return i.replace(/[_-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^\w/,e=>e.toUpperCase())}return Pe(We);})();
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
//# sourceMappingURL=endpoint-form.js.map
