"use strict";var RoxyUI_hexagram=(()=>{var O=Object.defineProperty;var oe=Object.getOwnPropertyDescriptor;var Ee=Object.getOwnPropertyNames;var we=Object.prototype.hasOwnProperty;var Ce=(i,e)=>{for(var t in e)O(i,t,{get:e[t],enumerable:!0})},Pe=(i,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Ee(e))!we.call(i,r)&&r!==t&&O(i,r,{get:()=>e[r],enumerable:!(s=oe(e,r))||s.enumerable});return i};var Re=i=>Pe(O({},"__esModule",{value:!0}),i),k=(i,e,t,s)=>{for(var r=s>1?void 0:s?oe(e,t):e,o=i.length-1,n;o>=0;o--)(n=i[o])&&(r=(s?n(e,t,r):n(r))||r);return s&&r&&O(e,t,r),r};var We={};Ce(We,{RoxyHexagram:()=>x});var j=globalThis,q=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),ne=new WeakMap,C=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(q&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=ne.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&ne.set(t,e))}return e}toString(){return this.cssText}},ae=i=>new C(typeof i=="string"?i:i+"",void 0,V),P=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((s,r,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[o+1],i[0]);return new C(t,i,V)},le=(i,e)=>{if(q)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),r=j.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}},W=q?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return ae(t)})(i):i;var{is:He,defineProperty:Me,getOwnPropertyDescriptor:Le,getOwnPropertyNames:Te,getOwnPropertySymbols:Ne,getPrototypeOf:Ue}=Object,z=globalThis,ce=z.trustedTypes,Oe=ce?ce.emptyScript:"",ke=z.reactiveElementPolyfillSupport,R=(i,e)=>i,H={toAttribute(i,e){switch(e){case Boolean:i=i?Oe:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},D=(i,e)=>!He(i,e),he={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:D};Symbol.metadata??=Symbol("metadata"),z.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=he){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(e,s,t);r!==void 0&&Me(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){let{get:r,set:o}=Le(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){let l=r?.call(this);o?.call(this,n),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??he}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let e=Ue(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let t=this.properties,s=[...Te(t),...Ne(t)];for(let r of s)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,r]of t)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let r=this._$Eu(t,s);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let r of s)t.unshift(W(r))}else e!==void 0&&t.push(W(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return le(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:H).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){let s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let o=s.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:H;this._$Em=r;let l=n.fromAttribute(t,o.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(e,t,s,r=!1,o){if(e!==void 0){let n=this.constructor;if(r===!1&&(o=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??D)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:o},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,o]of s){let{wrapped:n}=o,l=this[r];n!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,o,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[R("elementProperties")]=new Map,f[R("finalized")]=new Map,ke?.({ReactiveElement:f}),(z.reactiveElementVersions??=[]).push("2.1.2");var X=globalThis,pe=i=>i,I=X.trustedTypes,de=I?I.createPolicy("lit-html",{createHTML:i=>i}):void 0,$e="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,xe="?"+y,je=`<${xe}>`,b=document,L=()=>b.createComment(""),T=i=>i===null||typeof i!="object"&&typeof i!="function",ee=Array.isArray,qe=i=>ee(i)||typeof i?.[Symbol.iterator]=="function",K=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ue=/-->/g,me=/>/g,v=RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ge=/'/g,fe=/"/g,_e=/^(?:script|style|textarea|title)$/i,te=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),u=te(1),se=te(2),Xe=te(3),S=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ye=new WeakMap,A=b.createTreeWalker(b,129);function ve(i,e){if(!ee(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return de!==void 0?de.createHTML(e):e}var ze=(i,e)=>{let t=i.length-1,s=[],r,o=e===2?"<svg>":e===3?"<math>":"",n=M;for(let l=0;l<t;l++){let a=i[l],p,d,h=-1,m=0;for(;m<a.length&&(n.lastIndex=m,d=n.exec(a),d!==null);)m=n.lastIndex,n===M?d[1]==="!--"?n=ue:d[1]!==void 0?n=me:d[2]!==void 0?(_e.test(d[2])&&(r=RegExp("</"+d[2],"g")),n=v):d[3]!==void 0&&(n=v):n===v?d[0]===">"?(n=r??M,h=-1):d[1]===void 0?h=-2:(h=n.lastIndex-d[2].length,p=d[1],n=d[3]===void 0?v:d[3]==='"'?fe:ge):n===fe||n===ge?n=v:n===ue||n===me?n=M:(n=v,r=void 0);let g=n===v&&i[l+1].startsWith("/>")?" ":"";o+=n===M?a+je:h>=0?(s.push(p),a.slice(0,h)+$e+a.slice(h)+y+g):a+y+(h===-2?l:g)}return[ve(i,o+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},N=class i{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let o=0,n=0,l=e.length-1,a=this.parts,[p,d]=ze(e,t);if(this.el=i.createElement(p,s),A.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=A.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith($e)){let m=d[n++],g=r.getAttribute(h).split(y),_=/([.?@])?(.*)/.exec(m);a.push({type:1,index:o,name:_[2],strings:g,ctor:_[1]==="."?J:_[1]==="?"?F:_[1]==="@"?Z:w}),r.removeAttribute(h)}else h.startsWith(y)&&(a.push({type:6,index:o}),r.removeAttribute(h));if(_e.test(r.tagName)){let h=r.textContent.split(y),m=h.length-1;if(m>0){r.textContent=I?I.emptyScript:"";for(let g=0;g<m;g++)r.append(h[g],L()),A.nextNode(),a.push({type:2,index:++o});r.append(h[m],L())}}}else if(r.nodeType===8)if(r.data===xe)a.push({type:2,index:o});else{let h=-1;for(;(h=r.data.indexOf(y,h+1))!==-1;)a.push({type:7,index:o}),h+=y.length-1}o++}}static createElement(e,t){let s=b.createElement("template");return s.innerHTML=e,s}};function E(i,e,t=i,s){if(e===S)return e;let r=s!==void 0?t._$Co?.[s]:t._$Cl,o=T(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,t,s)),s!==void 0?(t._$Co??=[])[s]=r:t._$Cl=r),r!==void 0&&(e=E(i,r._$AS(i,e.values),r,s)),e}var Y=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,r=(e?.creationScope??b).importNode(t,!0);A.currentNode=r;let o=A.nextNode(),n=0,l=0,a=s[0];for(;a!==void 0;){if(n===a.index){let p;a.type===2?p=new U(o,o.nextSibling,this,e):a.type===1?p=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(p=new Q(o,this,e)),this._$AV.push(p),a=s[++l]}n!==a?.index&&(o=A.nextNode(),n++)}return A.currentNode=b,r}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},U=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=E(this,e,t),T(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):qe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(b.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=N.createElement(ve(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(t);else{let o=new Y(r,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o}}_$AC(e){let t=ye.get(e.strings);return t===void 0&&ye.set(e.strings,t=new N(e)),t}k(e){ee(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,r=0;for(let o of e)r===t.length?t.push(s=new i(this.O(L()),this.O(L()),this,this.options)):s=t[r],s._$AI(o),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=pe(e).nextSibling;pe(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},w=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(e,t=this,s,r){let o=this.strings,n=!1;if(o===void 0)e=E(this,e,t,0),n=!T(e)||e!==this._$AH&&e!==S,n&&(this._$AH=e);else{let l=e,a,p;for(e=o[0],a=0;a<o.length-1;a++)p=E(this,l[s+a],t,a),p===S&&(p=this._$AH[a]),n||=!T(p)||p!==this._$AH[a],p===c?e=c:e!==c&&(e+=(p??"")+o[a+1]),this._$AH[a]=p}n&&!r&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},J=class extends w{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}},F=class extends w{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}},Z=class extends w{constructor(e,t,s,r,o){super(e,t,s,r,o),this.type=5}_$AI(e,t=this){if((e=E(this,e,t,0)??c)===S)return;let s=this._$AH,r=e===c&&s!==c||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==c&&(s===c||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Q=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){E(this,e)}};var De=X.litHtmlPolyfillSupport;De?.(N,U),(X.litHtmlVersions??=[]).push("3.3.2");var Ae=(i,e,t)=>{let s=t?.renderBefore??e,r=s._$litPart$;if(r===void 0){let o=t?.renderBefore??null;s._$litPart$=r=new U(e.insertBefore(L(),o),o,void 0,t??{})}return r._$AI(i),r};var re=globalThis,$=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ae(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}};$._$litElement$=!0,$.finalized=!0,re.litElementHydrateSupport?.({LitElement:$});var Ie=re.litElementPolyfillSupport;Ie?.({LitElement:$});(re.litElementVersions??=[]).push("4.2.2");var be=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};var Be={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:D},Ge=(i=Be,e,t)=>{let{kind:s,metadata:r}=t,o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(t.name,i),s==="accessor"){let{name:n}=t;return{set(l){let a=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,a,i,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,i,l),l}}}if(s==="setter"){let{name:n}=t;return function(l){let a=this[n];e.call(this,l),this.requestUpdate(n,a,i,!0,l)}}throw Error("Unsupported decorator location: "+s)};function B(i){return(e,t)=>typeof t=="object"?Ge(i,e,t):((s,r,o)=>{let n=r.hasOwnProperty(o);return r.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(r,o):void 0})(i,e,t)}var Ve=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],qt=Ve.map(i=>i.toLowerCase());var ie={heaven:"\u2630",lake:"\u2631",fire:"\u2632",thunder:"\u2633",wind:"\u2634",water:"\u2635",mountain:"\u2636",earth:"\u2637",Heaven:"\u2630",Lake:"\u2631",Fire:"\u2632",Thunder:"\u2633",Wind:"\u2634",Water:"\u2635",Mountain:"\u2636",Earth:"\u2637"};var Se=P`
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
`;var x=class extends ${constructor(){super(...arguments);this.data=null;this.mode="lookup"}resolveHexagram(){let t=this.data;if(!t)return null;if("hexagram"in t&&t.hexagram){if("lines"in t){let r=t;return{hex:r.hexagram,lines:r.lines,changingLinePositions:r.changingLinePositions,resultingHexagram:r.resultingHexagram}}let s=t;return{hex:s.hexagram,dailyMessage:s.dailyMessage}}return{hex:t}}render(){let t=this.resolveHexagram();if(!t)return u`<div class="roxy-empty" role="status">No hexagram data</div>`;let{hex:s,lines:r,changingLinePositions:o,dailyMessage:n,resultingHexagram:l}=t,a=r??this.derivedLines(s),p=new Set(o??[]);return u`<article class="card" aria-label="I Ching hexagram">
			<div class="glyphs">
				${s.symbol?u`<div class="symbol">${s.symbol}</div>`:c}
				<div class="lines" aria-hidden="true">
					${a.slice().reverse().map((d,h)=>{let m=a.length-1-h+1,g=p.has(m),_=d===6||d===8;return u`<div class="line ${`${_?"broken":"solid"}${g?" changing":""}`}">
								${_?se`<span class="seg"></span><span class="seg"></span>`:se`<span class="seg"></span>`}
							</div>`})}
				</div>
			</div>
			<div>
				<h2 class="title">
					${s.number?u`${s.number}. `:c}${s.english??s.chinese??"Hexagram"}
				</h2>
				<p class="subtitle">
					${s.chinese?u`${s.chinese}`:c}
					${s.pinyin?u` · ${s.pinyin}`:c}
				</p>
				<div class="trigrams">
					${s.upperTrigram?u`<div>
								Upper
								<span class="tri-glyph"
									>${ie[s.upperTrigram]??""}</span
								>${s.upperTrigram}
							</div>`:c}
					${s.lowerTrigram?u`<div>
								Lower
								<span class="tri-glyph"
									>${ie[s.lowerTrigram]??""}</span
								>${s.lowerTrigram}
							</div>`:c}
				</div>
				${s.judgment?u`<p class="judgment">${s.judgment}</p>`:c}
				${s.image?u`<p class="image">${s.image}</p>`:c}
				${n?u`<p class="message">${n}</p>`:c}
				${s.interpretation?.general?u`<p>${s.interpretation.general}</p>`:c}
				${p.size>0?u`<div class="changing">
							Changing lines: ${Array.from(p).sort((d,h)=>d-h).join(", ")}.
							${l?.english?u` Becomes hexagram ${l.number}
										${l.english}.`:c}
						</div>`:c}
			</div>
		</article>`}derivedLines(t){let s=t.symbol.codePointAt(0)??0;if(s>=19904&&s<=19967){let r=s-19904,o=[];for(let n=0;n<6;n++){let l=r>>n&1;o.push(l?8:7)}return o}return Array.from({length:6},()=>7)}};x.styles=[Se,P`
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
		`],k([B({attribute:!1})],x.prototype,"data",2),k([B({type:String,reflect:!0})],x.prototype,"mode",2),x=k([be("roxy-hexagram")],x);return Re(We);})();
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
//# sourceMappingURL=hexagram.js.map
