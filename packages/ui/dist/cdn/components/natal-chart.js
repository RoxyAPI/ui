"use strict";var RoxyUI_natal_chart=(()=>{var q=Object.defineProperty;var ht=Object.getOwnPropertyDescriptor;var Ht=Object.getOwnPropertyNames;var Lt=Object.prototype.hasOwnProperty;var kt=(n,t)=>{for(var e in t)q(n,e,{get:t[e],enumerable:!0})},qt=(n,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Ht(t))!Lt.call(n,r)&&r!==e&&q(n,r,{get:()=>t[r],enumerable:!(s=ht(t,r))||s.enumerable});return n};var zt=n=>qt(q({},"__esModule",{value:!0}),n),z=(n,t,e,s)=>{for(var r=s>1?void 0:s?ht(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&q(t,e,r),r};var re={};kt(re,{RoxyNatalChart:()=>x,longitudeToSignPosition:()=>Ut});var D=globalThis,I=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),dt=new WeakMap,C=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(I&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=dt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&dt.set(e,t))}return t}toString(){return this.cssText}},pt=n=>new C(typeof n=="string"?n:n+"",void 0,J),M=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,r,i)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+n[i+1],n[0]);return new C(e,n,J)},ut=(n,t)=>{if(I)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=D.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,n.appendChild(s)}},Z=I?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return pt(e)})(n):n;var{is:Dt,defineProperty:It,getOwnPropertyDescriptor:jt,getOwnPropertyNames:Bt,getOwnPropertySymbols:Gt,getPrototypeOf:Vt}=Object,j=globalThis,mt=j.trustedTypes,Wt=mt?mt.emptyScript:"",Yt=j.reactiveElementPolyfillSupport,R=(n,t)=>n,N={toAttribute(n,t){switch(t){case Boolean:n=n?Wt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},B=(n,t)=>!Dt(n,t),gt={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:B};Symbol.metadata??=Symbol("metadata"),j.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=gt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&It(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:i}=jt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){let l=r?.call(this);i?.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??gt}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let t=Vt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let e=this.properties,s=[...Bt(e),...Gt(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(Z(r))}else t!==void 0&&e.push(Z(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ut(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:N).toAttribute(e,s.type);this._$Em=t,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(t,e){let s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let i=s.getPropertyOptions(r),o=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:N;this._$Em=r;let l=o.fromAttribute(e,i.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(t,e,s,r=!1,i){if(t!==void 0){let o=this.constructor;if(r===!1&&(i=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??B)(i,e)||s.useDefault&&s.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:i},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),i!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,i]of this._$Ep)this[r]=i;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,i]of s){let{wrapped:o}=i,l=this[r];o!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,i,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[R("elementProperties")]=new Map,g[R("finalized")]=new Map,Yt?.({ReactiveElement:g}),(j.reactiveElementVersions??=[]).push("2.1.2");var nt=globalThis,ft=n=>n,G=nt.trustedTypes,yt=G?G.createPolicy("lit-html",{createHTML:n=>n}):void 0,vt="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,St="?"+y,Ft=`<${St}>`,v=document,U=()=>v.createComment(""),O=n=>n===null||typeof n!="object"&&typeof n!="function",it=Array.isArray,Kt=n=>it(n)||typeof n?.[Symbol.iterator]=="function",Q=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$t=/-->/g,_t=/>/g,A=RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xt=/'/g,At=/"/g,Et=/^(?:script|style|textarea|title)$/i,ot=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),V=ot(1),P=ot(2),ce=ot(3),S=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),bt=new WeakMap,b=v.createTreeWalker(v,129);function wt(n,t){if(!it(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return yt!==void 0?yt.createHTML(t):t}var Jt=(n,t)=>{let e=n.length-1,s=[],r,i=t===2?"<svg>":t===3?"<math>":"",o=T;for(let l=0;l<e;l++){let a=n[l],h,u,c=-1,m=0;for(;m<a.length&&(o.lastIndex=m,u=o.exec(a),u!==null);)m=o.lastIndex,o===T?u[1]==="!--"?o=$t:u[1]!==void 0?o=_t:u[2]!==void 0?(Et.test(u[2])&&(r=RegExp("</"+u[2],"g")),o=A):u[3]!==void 0&&(o=A):o===A?u[0]===">"?(o=r??T,c=-1):u[1]===void 0?c=-2:(c=o.lastIndex-u[2].length,h=u[1],o=u[3]===void 0?A:u[3]==='"'?At:xt):o===At||o===xt?o=A:o===$t||o===_t?o=T:(o=A,r=void 0);let f=o===A&&n[l+1].startsWith("/>")?" ":"";i+=o===T?a+Ft:c>=0?(s.push(h),a.slice(0,c)+vt+a.slice(c)+y+f):a+y+(c===-2?l:f)}return[wt(n,i+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},H=class n{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let i=0,o=0,l=t.length-1,a=this.parts,[h,u]=Jt(t,e);if(this.el=n.createElement(h,s),b.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=b.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(let c of r.getAttributeNames())if(c.endsWith(vt)){let m=u[o++],f=r.getAttribute(c).split(y),k=/([.?@])?(.*)/.exec(m);a.push({type:1,index:i,name:k[2],strings:f,ctor:k[1]==="."?tt:k[1]==="?"?et:k[1]==="@"?st:w}),r.removeAttribute(c)}else c.startsWith(y)&&(a.push({type:6,index:i}),r.removeAttribute(c));if(Et.test(r.tagName)){let c=r.textContent.split(y),m=c.length-1;if(m>0){r.textContent=G?G.emptyScript:"";for(let f=0;f<m;f++)r.append(c[f],U()),b.nextNode(),a.push({type:2,index:++i});r.append(c[m],U())}}}else if(r.nodeType===8)if(r.data===St)a.push({type:2,index:i});else{let c=-1;for(;(c=r.data.indexOf(y,c+1))!==-1;)a.push({type:7,index:i}),c+=y.length-1}i++}}static createElement(t,e){let s=v.createElement("template");return s.innerHTML=t,s}};function E(n,t,e=n,s){if(t===S)return t;let r=s!==void 0?e._$Co?.[s]:e._$Cl,i=O(t)?void 0:t._$litDirective$;return r?.constructor!==i&&(r?._$AO?.(!1),i===void 0?r=void 0:(r=new i(n),r._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=r:e._$Cl=r),r!==void 0&&(t=E(n,r._$AS(n,t.values),r,s)),t}var X=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??v).importNode(e,!0);b.currentNode=r;let i=b.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new L(i,i.nextSibling,this,t):a.type===1?h=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(h=new rt(i,this,t)),this._$AV.push(h),a=s[++l]}o!==a?.index&&(i=b.nextNode(),o++)}return b.currentNode=v,r}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},L=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),O(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==S&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Kt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(v.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=H.createElement(wt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{let i=new X(r,this),o=i.u(this.options);i.p(e),this.T(o),this._$AH=i}}_$AC(t){let e=bt.get(t.strings);return e===void 0&&bt.set(t.strings,e=new H(t)),e}k(t){it(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let i of t)r===e.length?e.push(s=new n(this.O(U()),this.O(U()),this,this.options)):s=e[r],s._$AI(i),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ft(t).nextSibling;ft(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},w=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,i){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,r){let i=this.strings,o=!1;if(i===void 0)t=E(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==S,o&&(this._$AH=t);else{let l=t,a,h;for(t=i[0],a=0;a<i.length-1;a++)h=E(this,l[s+a],e,a),h===S&&(h=this._$AH[a]),o||=!O(h)||h!==this._$AH[a],h===d?t=d:t!==d&&(t+=(h??"")+i[a+1]),this._$AH[a]=h}o&&!r&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tt=class extends w{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},et=class extends w{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},st=class extends w{constructor(t,e,s,r,i){super(t,e,s,r,i),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??d)===S)return;let s=this._$AH,r=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==d&&(s===d||r);r&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}};var Zt=nt.litHtmlPolyfillSupport;Zt?.(H,L),(nt.litHtmlVersions??=[]).push("3.3.2");var Pt=(n,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let i=e?.renderBefore??null;s._$litPart$=r=new L(t.insertBefore(U(),i),i,void 0,e??{})}return r._$AI(n),r};var at=globalThis,$=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Pt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}};$._$litElement$=!0,$.finalized=!0,at.litElementHydrateSupport?.({LitElement:$});var Qt=at.litElementPolyfillSupport;Qt?.({LitElement:$});(at.litElementVersions??=[]).push("4.2.2");var Ct=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};var Xt={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:B},te=(n=Xt,t,e)=>{let{kind:s,metadata:r}=e,i=globalThis.litPropertyMetadata.get(r);if(i===void 0&&globalThis.litPropertyMetadata.set(r,i=new Map),s==="setter"&&((n=Object.create(n)).wrapped=!0),i.set(e.name,n),s==="accessor"){let{name:o}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,n,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,n,l),l}}}if(s==="setter"){let{name:o}=e;return function(l){let a=this[o];t.call(this,l),this.requestUpdate(o,a,n,!0,l)}}throw Error("Unsupported decorator location: "+s)};function W(n){return(t,e)=>typeof e=="object"?te(n,t,e):((s,r,i)=>{let o=r.hasOwnProperty(i);return r.constructor.createProperty(i,s),o?Object.getOwnPropertyDescriptor(r,i):void 0})(n,t,e)}var Mt={Sun:"\u2609",Moon:"\u263D",Mercury:"\u263F",Venus:"\u2640",Earth:"\u2641",Mars:"\u2642",Jupiter:"\u2643",Saturn:"\u2644",Uranus:"\u2645",Neptune:"\u2646",Pluto:"\u2647",Rahu:"\u260A",Ketu:"\u260B",Ascendant:"Asc",Lagna:"La",NorthNode:"\u260A",SouthNode:"\u260B"};var Rt={Aries:"\u2648",Taurus:"\u2649",Gemini:"\u264A",Cancer:"\u264B",Leo:"\u264C",Virgo:"\u264D",Libra:"\u264E",Scorpio:"\u264F",Sagittarius:"\u2650",Capricorn:"\u2651",Aquarius:"\u2652",Pisces:"\u2653"};var Nt=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];var Tt=M`
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
`;function ee(n){let t=n%360;return t<0?t+360:t}function Ut(n){let t=ee(n),e=Math.floor(t/30)%12,s=t%30,r=Math.floor(s),i=(s-r)*60,o=Math.floor(i),l=Math.round((i-o)*60);return{sign:Nt[e]??"Aries",signIndex:e,degree:r,minute:o,second:l}}function _(n,t,e,s){let r=s*Math.PI/180;return{x:n+e*Math.cos(r),y:t+e*Math.sin(r)}}var ct=320,p=ct/2,Ot=150,se=134,lt=110,F=88,x=class extends ${constructor(){super(...arguments);this.data=null;this.houseSystem="placidus"}getPlanets(){let e=this.data?.planets;return e?Array.isArray(e)?e:Object.entries(e).map(([s,r])=>({...r,name:s})):[]}render(){if(!this.data)return V`<div class="roxy-empty" role="status">No chart data</div>`;let e=this.getPlanets(),s=this.data.aspects??[];return V`<div class="wrap">
			<header>
				<h2 class="title">Natal chart</h2>
				${this.data.birthDetails?V`<div class="meta">
							${[this.data.birthDetails.date,this.data.birthDetails.time,this.data.birthDetails.location].filter(Boolean).join(" \xB7 ")}
						</div>`:d}
			</header>
			<svg
				viewBox="0 0 ${ct} ${ct}"
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
					cx=${p}
					cy=${p}
					r=${Ot}
					stroke-width="1.5"
				/>
				<circle
					class="wheel-line"
					cx=${p}
					cy=${p}
					r=${lt}
					stroke-width="1"
				/>
				<circle
					class="wheel-line"
					cx=${p}
					cy=${p}
					r=${F-16}
					stroke-width="0.5"
				/>
				${this.renderSpokes()} ${this.renderSigns()} ${this.renderHouseNumbers()}
				${this.renderAspects(e,s)} ${this.renderPlanets(e)}
			</svg>
			<div class="legend">
				<span>${e.length} planets</span>
				<span>${s.length} aspects</span>
				<span>House system: ${this.houseSystem}</span>
			</div>
		</div>`}renderSpokes(){return Array.from({length:12},(e,s)=>{let r=s*30-90,i=_(p,p,lt,r),o=_(p,p,Ot,r);return P`<line class="wheel-line" x1=${i.x} y1=${i.y} x2=${o.x} y2=${o.y} stroke-width="0.8" />`})}renderSigns(){return["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"].map((s,r)=>{let i=r*30+15-90,o=_(p,p,se,i);return P`<text class="sign-glyph" x=${o.x} y=${o.y} text-anchor="middle" dominant-baseline="central">${Rt[s]}</text>`})}renderHouseNumbers(){return Array.from({length:12},(e,s)=>{let r=s*30+15-90,i=_(p,p,lt-12,r);return P`<text class="house-num" x=${i.x} y=${i.y} text-anchor="middle" dominant-baseline="central">${s+1}</text>`})}renderPlanets(e){return e.map(s=>{let r=typeof s.longitude=="number"?s.longitude:typeof s.degree=="number"?s.degree:NaN;if(!Number.isFinite(r))return d;let i=r-90,o=_(p,p,F,i),l=s.name??s.planet??"",a=Mt[K(l)]??l.slice(0,2),h=s.retrograde||s.isRetrograde?" R":"";return P`<text class="planet-glyph" x=${o.x} y=${o.y} text-anchor="middle" dominant-baseline="central"><title>${l}${h}</title>${a}</text>`})}renderAspects(e,s){let r=new Map;for(let i of e){let o=typeof i.longitude=="number"?i.longitude:typeof i.degree=="number"?i.degree:null;if(o===null)continue;let l=K(i.name??i.planet??"");l&&r.set(l,o)}return s.map(i=>{let o=r.get(K(i.planet1??"")),l=r.get(K(i.planet2??""));if(o===void 0||l===void 0)return d;let a=_(p,p,F-18,o-90),h=_(p,p,F-18,l-90);return P`<line class="aspect" x1=${a.x} y1=${a.y} x2=${h.x} y2=${h.y} />`})}};x.styles=[Tt,M`
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
		`],z([W({attribute:!1})],x.prototype,"data",2),z([W({type:String,attribute:"house-system",reflect:!0})],x.prototype,"houseSystem",2),x=z([Ct("roxy-natal-chart")],x);function K(n){return n?n.charAt(0).toUpperCase()+n.slice(1).toLowerCase():""}return zt(re);})();
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
