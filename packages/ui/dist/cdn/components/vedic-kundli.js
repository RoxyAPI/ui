"use strict";var RoxyUI_vedic_kundli=(()=>{var L=Object.defineProperty;var ot=Object.getOwnPropertyDescriptor;var Rt=Object.getOwnPropertyNames;var Nt=Object.prototype.hasOwnProperty;var kt=(i,t)=>{for(var e in t)L(i,e,{get:t[e],enumerable:!0})},Ot=(i,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Rt(t))!Nt.call(i,r)&&r!==e&&L(i,r,{get:()=>t[r],enumerable:!(s=ot(t,r))||s.enumerable});return i};var Ht=i=>Ot(L({},"__esModule",{value:!0}),i),T=(i,t,e,s)=>{for(var r=s>1?void 0:s?ot(t,e):t,o=i.length-1,n;o>=0;o--)(n=i[o])&&(r=(s?n(t,e,r):n(r))||r);return s&&r&&L(t,e,r),r};var Qt={};kt(Qt,{RoxyVedicKundli:()=>$});var B=globalThis,I=B.ShadowRoot&&(B.ShadyCSS===void 0||B.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),nt=new WeakMap,C=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(I&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=nt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&nt.set(e,t))}return t}toString(){return this.cssText}},at=i=>new C(typeof i=="string"?i:i+"",void 0,V),P=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,r,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[o+1],i[0]);return new C(e,i,V)},lt=(i,t)=>{if(I)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=B.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},Y=I?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return at(e)})(i):i;var{is:Ut,defineProperty:Mt,getOwnPropertyDescriptor:Lt,getOwnPropertyNames:Tt,getOwnPropertySymbols:Bt,getPrototypeOf:It}=Object,q=globalThis,ht=q.trustedTypes,qt=ht?ht.emptyScript:"",zt=q.reactiveElementPolyfillSupport,R=(i,t)=>i,N={toAttribute(i,t){switch(t){case Boolean:i=i?qt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},z=(i,t)=>!Ut(i,t),ct={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:z};Symbol.metadata??=Symbol("metadata"),q.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ct){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&Mt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:o}=Lt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:r,set(n){let l=r?.call(this);o?.call(this,n),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ct}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let t=It(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let e=this.properties,s=[...Tt(e),...Bt(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(Y(r))}else t!==void 0&&e.push(Y(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return lt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:N).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let o=s.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:N;this._$Em=r;let l=n.fromAttribute(e,o.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(t,e,s,r=!1,o){if(t!==void 0){let n=this.constructor;if(r===!1&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??z)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,o]of s){let{wrapped:n}=o,l=this[r];n!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,o,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[R("elementProperties")]=new Map,f[R("finalized")]=new Map,zt?.({ReactiveElement:f}),(q.reactiveElementVersions??=[]).push("2.1.2");var X=globalThis,pt=i=>i,j=X.trustedTypes,dt=j?j.createPolicy("lit-html",{createHTML:i=>i}):void 0,$t="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,xt="?"+y,jt=`<${xt}>`,A=document,O=()=>A.createComment(""),H=i=>i===null||typeof i!="object"&&typeof i!="function",tt=Array.isArray,Dt=i=>tt(i)||typeof i?.[Symbol.iterator]=="function",W=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,mt=/>/g,x=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,yt=/"/g,_t=/^(?:script|style|textarea|title)$/i,et=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),st=et(1),w=et(2),ie=et(3),b=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),gt=new WeakMap,_=A.createTreeWalker(A,129);function At(i,t){if(!tt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return dt!==void 0?dt.createHTML(t):t}var Gt=(i,t)=>{let e=i.length-1,s=[],r,o=t===2?"<svg>":t===3?"<math>":"",n=k;for(let l=0;l<e;l++){let a=i[l],p,d,h=-1,u=0;for(;u<a.length&&(n.lastIndex=u,d=n.exec(a),d!==null);)u=n.lastIndex,n===k?d[1]==="!--"?n=ut:d[1]!==void 0?n=mt:d[2]!==void 0?(_t.test(d[2])&&(r=RegExp("</"+d[2],"g")),n=x):d[3]!==void 0&&(n=x):n===x?d[0]===">"?(n=r??k,h=-1):d[1]===void 0?h=-2:(h=n.lastIndex-d[2].length,p=d[1],n=d[3]===void 0?x:d[3]==='"'?yt:ft):n===yt||n===ft?n=x:n===ut||n===mt?n=k:(n=x,r=void 0);let m=n===x&&i[l+1].startsWith("/>")?" ":"";o+=n===k?a+jt:h>=0?(s.push(p),a.slice(0,h)+$t+a.slice(h)+y+m):a+y+(h===-2?l:m)}return[At(i,o+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},U=class i{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let o=0,n=0,l=t.length-1,a=this.parts,[p,d]=Gt(t,e);if(this.el=i.createElement(p,s),_.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=_.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith($t)){let u=d[n++],m=r.getAttribute(h).split(y),v=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:v[2],strings:m,ctor:v[1]==="."?J:v[1]==="?"?F:v[1]==="@"?Z:E}),r.removeAttribute(h)}else h.startsWith(y)&&(a.push({type:6,index:o}),r.removeAttribute(h));if(_t.test(r.tagName)){let h=r.textContent.split(y),u=h.length-1;if(u>0){r.textContent=j?j.emptyScript:"";for(let m=0;m<u;m++)r.append(h[m],O()),_.nextNode(),a.push({type:2,index:++o});r.append(h[u],O())}}}else if(r.nodeType===8)if(r.data===xt)a.push({type:2,index:o});else{let h=-1;for(;(h=r.data.indexOf(y,h+1))!==-1;)a.push({type:7,index:o}),h+=y.length-1}o++}}static createElement(t,e){let s=A.createElement("template");return s.innerHTML=t,s}};function S(i,t,e=i,s){if(t===b)return t;let r=s!==void 0?e._$Co?.[s]:e._$Cl,o=H(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=r:e._$Cl=r),r!==void 0&&(t=S(i,r._$AS(i,t.values),r,s)),t}var K=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??A).importNode(e,!0);_.currentNode=r;let o=_.nextNode(),n=0,l=0,a=s[0];for(;a!==void 0;){if(n===a.index){let p;a.type===2?p=new M(o,o.nextSibling,this,t):a.type===1?p=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(p=new Q(o,this,t)),this._$AV.push(p),a=s[++l]}n!==a?.index&&(o=_.nextNode(),n++)}return _.currentNode=A,r}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},M=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),H(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Dt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=U.createElement(At(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{let o=new K(r,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=gt.get(t.strings);return e===void 0&&gt.set(t.strings,e=new U(t)),e}k(t){tt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let o of t)r===e.length?e.push(s=new i(this.O(O()),this.O(O()),this,this.options)):s=e[r],s._$AI(o),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=pt(t).nextSibling;pt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(t,e=this,s,r){let o=this.strings,n=!1;if(o===void 0)t=S(this,t,e,0),n=!H(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else{let l=t,a,p;for(t=o[0],a=0;a<o.length-1;a++)p=S(this,l[s+a],e,a),p===b&&(p=this._$AH[a]),n||=!H(p)||p!==this._$AH[a],p===c?t=c:t!==c&&(t+=(p??"")+o[a+1]),this._$AH[a]=p}n&&!r&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},J=class extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},F=class extends E{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},Z=class extends E{constructor(t,e,s,r,o){super(t,e,s,r,o),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??c)===b)return;let s=this._$AH,r=t===c&&s!==c||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==c&&(s===c||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Q=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}};var Vt=X.litHtmlPolyfillSupport;Vt?.(U,M),(X.litHtmlVersions??=[]).push("3.3.2");var bt=(i,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let o=e?.renderBefore??null;s._$litPart$=r=new M(t.insertBefore(O(),o),o,void 0,e??{})}return r._$AI(i),r};var rt=globalThis,g=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=bt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};g._$litElement$=!0,g.finalized=!0,rt.litElementHydrateSupport?.({LitElement:g});var Yt=rt.litElementPolyfillSupport;Yt?.({LitElement:g});(rt.litElementVersions??=[]).push("4.2.2");var vt=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};var Wt={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:z},Kt=(i=Wt,t,e)=>{let{kind:s,metadata:r}=e,o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(e.name,i),s==="accessor"){let{name:n}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,i,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,i,l),l}}}if(s==="setter"){let{name:n}=e;return function(l){let a=this[n];t.call(this,l),this.requestUpdate(n,a,i,!0,l)}}throw Error("Unsupported decorator location: "+s)};function D(i){return(t,e)=>typeof e=="object"?Kt(i,t,e):((s,r,o)=>{let n=r.hasOwnProperty(o);return r.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(r,o):void 0})(i,t,e)}var St={Sun:"Su",Moon:"Mo",Mercury:"Me",Venus:"Ve",Mars:"Ma",Jupiter:"Ju",Saturn:"Sa",Uranus:"Ur",Neptune:"Ne",Pluto:"Pl",Rahu:"Ra",Ketu:"Ke",Ascendant:"Asc",Lagna:"La"};var Et={Aries:"Ar",Taurus:"Ta",Gemini:"Ge",Cancer:"Cn",Leo:"Le",Virgo:"Vi",Libra:"Li",Scorpio:"Sc",Sagittarius:"Sg",Capricorn:"Cp",Aquarius:"Aq",Pisces:"Pi"},it=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],wt=it.map(i=>i.toLowerCase());var Ct=P`
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
`;function Pt(i){return i?i.charAt(0).toUpperCase()+i.slice(1).toLowerCase():""}var Jt={1:{x:150,y:58},2:{x:205,y:52},3:{x:253,y:112},4:{x:243,y:150},5:{x:253,y:188},6:{x:205,y:248},7:{x:150,y:242},8:{x:95,y:248},9:{x:47,y:188},10:{x:57,y:150},11:{x:47,y:112},12:{x:95,y:52}},Ft={1:{x:150,y:35},2:{x:222,y:40},3:{x:265,y:100},4:{x:265,y:150},5:{x:265,y:200},6:{x:222,y:260},7:{x:150,y:265},8:{x:78,y:260},9:{x:35,y:200},10:{x:35,y:150},11:{x:35,y:100},12:{x:78,y:40}},Zt=Object.fromEntries(it.map(i=>[i.toLowerCase(),i])),$=class extends g{constructor(){super(...arguments);this.data=null;this.chartStyle="south"}buildHouses(){if(!this.data)return[];let e=this.data,s=[];for(let r=0;r<12;r++){let o=wt[r],l=(e[o]?.signs??[]).map(a=>a.graha).filter(Boolean);s.push({house:r+1,sign:Zt[o]??"",planets:l})}return s}render(){if(!this.data)return st`<div class="roxy-empty" role="status">No kundli data</div>`;let e=this.buildHouses();return st`<div class="wrap">
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
				${e.map(s=>this.renderHouseGroup(s))}
			</svg>
		</div>`}isLagna(e){let s=this.data?.meta?.Lagna?.rashi;return s?s.toLowerCase()===e.sign.toLowerCase():!1}renderHouseGroup(e){let s=Jt[e.house],r=Ft[e.house];if(!s||!r)return c;let o=Et[e.sign]??"",n=e.planets??[],l=this.isLagna(e);return w`
			<g>
				${l?w`<rect class="lagna-bg" x=${s.x-30} y=${s.y-28} width="60" height="56" rx="6" />`:c}
				${o?w`<text class="sign-text" x=${r.x} y=${r.y} text-anchor="middle" dominant-baseline="central">${o}</text>`:c}
				${l?w`<text class="lagna-marker" x=${s.x} y=${s.y-18} text-anchor="middle" dominant-baseline="central">LAGNA</text>`:c}
				${n.map((a,p)=>{let d=St[Pt(a)]??a.slice(0,2),h=13,v=(l?s.y+8:s.y)-(n.length-1)*h/2+p*h;return w`<text class="planet-text" x=${s.x} y=${v} text-anchor="middle" dominant-baseline="central">${d}</text>`})}
			</g>
		`}};$.styles=[Ct,P`
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
		`],T([D({attribute:!1})],$.prototype,"data",2),T([D({type:String,reflect:!0,attribute:"chart-style"})],$.prototype,"chartStyle",2),$=T([vt("roxy-vedic-kundli")],$);return Ht(Qt);})();
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
//# sourceMappingURL=vedic-kundli.js.map
