"use strict";var RoxyUI_synastry_chart=(()=>{var I=Object.defineProperty;var ht=Object.getOwnPropertyDescriptor;var Ot=Object.getOwnPropertyNames;var Ut=Object.prototype.hasOwnProperty;var Ht=(n,t)=>{for(var e in t)I(n,e,{get:t[e],enumerable:!0})},zt=(n,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ot(t))!Ut.call(n,s)&&s!==e&&I(n,s,{get:()=>t[s],enumerable:!(r=ht(t,s))||r.enumerable});return n};var qt=n=>zt(I({},"__esModule",{value:!0}),n),F=(n,t,e,r)=>{for(var s=r>1?void 0:r?ht(t,e):t,o=n.length-1,i;o>=0;o--)(i=n[o])&&(s=(r?i(t,e,s):i(s))||s);return r&&s&&I(t,e,s),s};var ne={};Ht(ne,{RoxySynastryChart:()=>w});var j=globalThis,D=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),pt=new WeakMap,C=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(D&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=pt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&pt.set(e,t))}return t}toString(){return this.cssText}},dt=n=>new C(typeof n=="string"?n:n+"",void 0,Y),R=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((r,s,o)=>r+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new C(e,n,Y)},ut=(n,t)=>{if(D)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),s=j.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,n.appendChild(r)}},K=D?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return dt(e)})(n):n;var{is:It,defineProperty:jt,getOwnPropertyDescriptor:Dt,getOwnPropertyNames:Bt,getOwnPropertySymbols:Gt,getPrototypeOf:Vt}=Object,B=globalThis,mt=B.trustedTypes,Wt=mt?mt.emptyScript:"",Ft=B.reactiveElementPolyfillSupport,N=(n,t)=>n,T={toAttribute(n,t){switch(t){case Boolean:n=n?Wt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},G=(n,t)=>!It(n,t),ft={attribute:!0,type:String,converter:T,reflect:!1,useDefault:!1,hasChanged:G};Symbol.metadata??=Symbol("metadata"),B.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ft){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&jt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){let{get:s,set:o}=Dt(this.prototype,t)??{get(){return this[e]},set(i){this[e]=i}};return{get:s,set(i){let c=s?.call(this);o?.call(this,i),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ft}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;let t=Vt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N("properties"))){let e=this.properties,r=[...Bt(e),...Gt(e)];for(let s of r)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let s of r)e.unshift(K(s))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ut(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){let o=(r.converter?.toAttribute!==void 0?r.converter:T).toAttribute(e,r.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){let r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let o=r.getPropertyOptions(s),i=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:T;this._$Em=s;let c=i.fromAttribute(e,o.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(t,e,r,s=!1,o){if(t!==void 0){let i=this.constructor;if(s===!1&&(o=this[t]),r??=i.getPropertyOptions(t),!((r.hasChanged??G)(o,e)||r.useDefault&&r.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:s,wrapped:o},i){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??e??this[t]),o!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,o]of r){let{wrapped:i}=o,c=this[s];i!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,o,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[N("elementProperties")]=new Map,y[N("finalized")]=new Map,Ft?.({ReactiveElement:y}),(B.reactiveElementVersions??=[]).push("2.1.2");var rt=globalThis,gt=n=>n,V=rt.trustedTypes,yt=V?V.createPolicy("lit-html",{createHTML:n=>n}):void 0,vt="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,St="?"+$,Yt=`<${St}>`,A=document,L=()=>A.createComment(""),k=n=>n===null||typeof n!="object"&&typeof n!="function",st=Array.isArray,Kt=n=>st(n)||typeof n?.[Symbol.iterator]=="function",J=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$t=/-->/g,xt=/>/g,_=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_t=/'/g,bt=/"/g,wt=/^(?:script|style|textarea|title)$/i,nt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),g=nt(1),H=nt(2),he=nt(3),v=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),At=new WeakMap,b=A.createTreeWalker(A,129);function Et(n,t){if(!st(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return yt!==void 0?yt.createHTML(t):t}var Jt=(n,t)=>{let e=n.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",i=M;for(let c=0;c<e;c++){let a=n[c],h,d,l=-1,m=0;for(;m<a.length&&(i.lastIndex=m,d=i.exec(a),d!==null);)m=i.lastIndex,i===M?d[1]==="!--"?i=$t:d[1]!==void 0?i=xt:d[2]!==void 0?(wt.test(d[2])&&(s=RegExp("</"+d[2],"g")),i=_):d[3]!==void 0&&(i=_):i===_?d[0]===">"?(i=s??M,l=-1):d[1]===void 0?l=-2:(l=i.lastIndex-d[2].length,h=d[1],i=d[3]===void 0?_:d[3]==='"'?bt:_t):i===bt||i===_t?i=_:i===$t||i===xt?i=M:(i=_,s=void 0);let f=i===_&&n[c+1].startsWith("/>")?" ":"";o+=i===M?a+Yt:l>=0?(r.push(h),a.slice(0,l)+vt+a.slice(l)+$+f):a+$+(l===-2?c:f)}return[Et(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},O=class n{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let o=0,i=0,c=t.length-1,a=this.parts,[h,d]=Jt(t,e);if(this.el=n.createElement(h,r),b.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=b.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let l of s.getAttributeNames())if(l.endsWith(vt)){let m=d[i++],f=s.getAttribute(l).split($),q=/([.?@])?(.*)/.exec(m);a.push({type:1,index:o,name:q[2],strings:f,ctor:q[1]==="."?Q:q[1]==="?"?X:q[1]==="@"?tt:P}),s.removeAttribute(l)}else l.startsWith($)&&(a.push({type:6,index:o}),s.removeAttribute(l));if(wt.test(s.tagName)){let l=s.textContent.split($),m=l.length-1;if(m>0){s.textContent=V?V.emptyScript:"";for(let f=0;f<m;f++)s.append(l[f],L()),b.nextNode(),a.push({type:2,index:++o});s.append(l[m],L())}}}else if(s.nodeType===8)if(s.data===St)a.push({type:2,index:o});else{let l=-1;for(;(l=s.data.indexOf($,l+1))!==-1;)a.push({type:7,index:o}),l+=$.length-1}o++}}static createElement(t,e){let r=A.createElement("template");return r.innerHTML=t,r}};function E(n,t,e=n,r){if(t===v)return t;let s=r!==void 0?e._$Co?.[r]:e._$Cl,o=k(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(n),s._$AT(n,e,r)),r!==void 0?(e._$Co??=[])[r]=s:e._$Cl=s),s!==void 0&&(t=E(n,s._$AS(n,t.values),s,r)),t}var Z=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,s=(t?.creationScope??A).importNode(e,!0);b.currentNode=s;let o=b.nextNode(),i=0,c=0,a=r[0];for(;a!==void 0;){if(i===a.index){let h;a.type===2?h=new U(o,o.nextSibling,this,t):a.type===1?h=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(h=new et(o,this,t)),this._$AV.push(h),a=r[++c]}i!==a?.index&&(o=b.nextNode(),i++)}return b.currentNode=A,s}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},U=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),k(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==v&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Kt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&k(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=O.createElement(Et(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(e);else{let o=new Z(s,this),i=o.u(this.options);o.p(e),this.T(i),this._$AH=o}}_$AC(t){let e=At.get(t.strings);return e===void 0&&At.set(t.strings,e=new O(t)),e}k(t){st(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,s=0;for(let o of t)s===e.length?e.push(r=new n(this.O(L()),this.O(L()),this,this.options)):r=e[s],r._$AI(o),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=gt(t).nextSibling;gt(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},P=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=p}_$AI(t,e=this,r,s){let o=this.strings,i=!1;if(o===void 0)t=E(this,t,e,0),i=!k(t)||t!==this._$AH&&t!==v,i&&(this._$AH=t);else{let c=t,a,h;for(t=o[0],a=0;a<o.length-1;a++)h=E(this,c[r+a],e,a),h===v&&(h=this._$AH[a]),i||=!k(h)||h!==this._$AH[a],h===p?t=p:t!==p&&(t+=(h??"")+o[a+1]),this._$AH[a]=h}i&&!s&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Q=class extends P{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},X=class extends P{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},tt=class extends P{constructor(t,e,r,s,o){super(t,e,r,s,o),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??p)===v)return;let r=this._$AH,s=t===p&&r!==p||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==p&&(r===p||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},et=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}};var Zt=rt.litHtmlPolyfillSupport;Zt?.(O,U),(rt.litHtmlVersions??=[]).push("3.3.2");var Pt=(n,t,e)=>{let r=e?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=e?.renderBefore??null;r._$litPart$=s=new U(t.insertBefore(L(),o),o,void 0,e??{})}return s._$AI(n),s};var ot=globalThis,x=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Pt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return v}};x._$litElement$=!0,x.finalized=!0,ot.litElementHydrateSupport?.({LitElement:x});var Qt=ot.litElementPolyfillSupport;Qt?.({LitElement:x});(ot.litElementVersions??=[]).push("4.2.2");var Ct=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};var Xt={attribute:!0,type:String,converter:T,reflect:!1,hasChanged:G},te=(n=Xt,t,e)=>{let{kind:r,metadata:s}=e,o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),o.set(e.name,n),r==="accessor"){let{name:i}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(i,a,n,!0,c)},init(c){return c!==void 0&&this.C(i,void 0,n,c),c}}}if(r==="setter"){let{name:i}=e;return function(c){let a=this[i];t.call(this,c),this.requestUpdate(i,a,n,!0,c)}}throw Error("Unsupported decorator location: "+r)};function it(n){return(t,e)=>typeof e=="object"?te(n,t,e):((r,s,o)=>{let i=s.hasOwnProperty(o);return s.constructor.createProperty(o,r),i?Object.getOwnPropertyDescriptor(s,o):void 0})(n,t,e)}var Rt={Sun:"\u2609",Moon:"\u263D",Mercury:"\u263F",Venus:"\u2640",Earth:"\u2641",Mars:"\u2642",Jupiter:"\u2643",Saturn:"\u2644",Uranus:"\u2645",Neptune:"\u2646",Pluto:"\u2647",Rahu:"\u260A",Ketu:"\u260B",Ascendant:"Asc",Lagna:"La",NorthNode:"\u260A",SouthNode:"\u260B","North node":"\u260A","South node":"\u260B",Chiron:"\u26B7",Lilith:"\u26B8","Black moon lilith":"\u26B8"};var Nt={Aries:"\u2648",Taurus:"\u2649",Gemini:"\u264A",Cancer:"\u264B",Leo:"\u264C",Virgo:"\u264D",Libra:"\u264E",Scorpio:"\u264F",Sagittarius:"\u2650",Capricorn:"\u2651",Aquarius:"\u2652",Pisces:"\u2653"};var Tt=R`
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
`;function S(n,t,e,r){let s=r*Math.PI/180;return{x:n+e*Math.cos(s),y:t+e*Math.sin(s)}}function at(n,t=1){return typeof n!="number"||!Number.isFinite(n)?"":n.toFixed(t).replace(/\.?0+$/,"")}var lt=360,u=lt/2,Mt=170,ee=154,Lt=124,z=96,w=class extends x{constructor(){super(...arguments);this.data=null}render(){if(!this.data)return g`<div class="roxy-empty" role="status">No synastry data</div>`;let{person1:e,person2:r,compatibilityScore:s,analysis:o}=this.data,i=this.data.interAspects??[],c=e?.planets??[],a=r?.planets??[],h=typeof s=="number"?Math.round(s):void 0,d=o?.overall,l=o?.strengths??[],m=o?.challenges??[];return g`<div
			class="wrap"
			aria-label="Synastry compatibility chart"
		>
			<div class="head">
				<h2 class="title">Synastry</h2>
				${typeof h=="number"?g`<span class="score" aria-label=${`Score ${h} of 100`}
							>${h} / 100</span
						>`:p}
			</div>
			<svg
				viewBox="0 0 ${lt} ${lt}"
				role="img"
				aria-label="Dual chart wheel comparing two natal charts"
			>
				<title>Synastry dual wheel</title>
				<circle
					class="wheel-line"
					cx=${u}
					cy=${u}
					r=${Mt}
					stroke-width="1.5"
				/>
				<circle
					class="wheel-line"
					cx=${u}
					cy=${u}
					r=${z+14}
					stroke-width="0.8"
				/>
				<circle
					class="wheel-line"
					cx=${u}
					cy=${u}
					r=${z-14}
					stroke-width="0.6"
				/>
				${this.renderSpokes()} ${this.renderSigns()}
				${this.renderInterAspectLines(c,a,i)}
				${this.renderRing(c,Lt,"p1")} ${this.renderRing(a,z,"p2")}
			</svg>
			<div class="legend-row">
				<span><span class="swatch" style="background: var(--roxy-accent)"></span>Person 1</span>
				<span><span class="swatch" style="background: var(--roxy-info)"></span>Person 2</span>
				<span><span class="swatch" style="background: var(--roxy-success)"></span>harmonious</span>
				<span><span class="swatch" style="background: var(--roxy-danger)"></span>challenging</span>
			</div>
			${d?g`<p class="summary">${d}</p>`:p}
			${i.length>0?this.renderAspects(i):p}
			${l.length>0||m.length>0?g`<div class="lists">
						${l.length?g`<div>
									<h3>Strengths</h3>
									<ul>
										${l.map(f=>g`<li>${f}</li>`)}
									</ul>
								</div>`:p}
						${m.length?g`<div>
									<h3>Challenges</h3>
									<ul>
										${m.map(f=>g`<li>${f}</li>`)}
									</ul>
								</div>`:p}
					</div>`:p}
		</div>`}toAngle(e){return 180-e}renderSpokes(){return Array.from({length:12},(e,r)=>{let s=this.toAngle(r*30),o=S(u,u,z-14,s),i=S(u,u,Mt,s);return H`<line class="wheel-line" x1=${o.x} y1=${o.y} x2=${i.x} y2=${i.y} stroke-width="0.6" />`})}renderSigns(){return["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"].map((r,s)=>{let o=this.toAngle(s*30+15),i=S(u,u,ee,o);return H`<text class="sign" x=${i.x} y=${i.y} text-anchor="middle" dominant-baseline="central">${Nt[r]}</text>`})}renderRing(e,r,s){return e.map(o=>{if(!Number.isFinite(o.longitude))return p;let i=S(u,u,r,this.toAngle(o.longitude)),c=Rt[ct(o.name)]??o.name.slice(0,2);return H`<text class=${s} x=${i.x} y=${i.y} text-anchor="middle" dominant-baseline="central"><title>${o.name}</title>${c}</text>`})}renderInterAspectLines(e,r,s){let o=(i,c)=>{let a=ct(c);for(let h of i)if(ct(h.name)===a&&typeof h.longitude=="number")return h.longitude};return s.map(i=>{let c=o(e,i.planet1),a=o(r,i.planet2);if(c===void 0||a===void 0)return p;let h=S(u,u,Lt-12,this.toAngle(c)),d=S(u,u,z+8,this.toAngle(a)),l=kt(i),m=re[l]??"aspect-other",f=at(i.orb,1);return H`<line class=${`aspect ${m}`} x1=${h.x} y1=${h.y} x2=${d.x} y2=${d.y}><title>${i.planet1} ${l} ${i.planet2}${f?` (orb ${f}\xB0)`:""}</title></line>`})}renderAspects(e){return g`<table>
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
				${e.slice(0,12).map(r=>g`<tr>
						<td>${r.planet1}</td>
						<td>${r.planet2}</td>
						<td>${kt(r)||""}</td>
						<td class="orb">${at(r.orb,1)}</td>
						<td>${se(r.strength)}</td>
					</tr>`)}
			</tbody>
		</table>`}};w.styles=[Tt,R`
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
		`],F([it({attribute:!1})],w.prototype,"data",2),w=F([Ct("roxy-synastry-chart")],w);function ct(n){return n?n.charAt(0).toUpperCase()+n.slice(1).toLowerCase():""}var re={conjunction:"aspect-conjunction",sextile:"aspect-sextile",square:"aspect-square",trine:"aspect-trine",opposition:"aspect-opposition"};function kt(n){return(n.type??"").toLowerCase().replace(/_/g,"-")}function se(n){return typeof n=="number"?Math.round(n).toString():""}return qt(ne);})();
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
//# sourceMappingURL=synastry-chart.js.map
