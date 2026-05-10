"use strict";var RoxyUI_natal_chart=(()=>{var q=Object.defineProperty;var dt=Object.getOwnPropertyDescriptor;var Ht=Object.getOwnPropertyNames;var zt=Object.prototype.hasOwnProperty;var qt=(n,t)=>{for(var e in t)q(n,e,{get:t[e],enumerable:!0})},It=(n,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Ht(t))!zt.call(n,r)&&r!==e&&q(n,r,{get:()=>t[r],enumerable:!(s=dt(t,r))||s.enumerable});return n};var Dt=n=>It(q({},"__esModule",{value:!0}),n),I=(n,t,e,s)=>{for(var r=s>1?void 0:s?dt(t,e):t,o=n.length-1,i;o>=0;o--)(i=n[o])&&(r=(s?i(t,e,r):i(r))||r);return s&&r&&q(t,e,r),r};var ie={};qt(ie,{RoxyNatalChart:()=>_});var D=globalThis,j=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),ut=new WeakMap,P=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(j&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ut.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ut.set(e,t))}return t}toString(){return this.cssText}},mt=n=>new P(typeof n=="string"?n:n+"",void 0,J),N=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,r,o)=>s+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+n[o+1],n[0]);return new P(e,n,J)},gt=(n,t)=>{if(j)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=D.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,n.appendChild(s)}},Z=j?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return mt(e)})(n):n;var{is:jt,defineProperty:Bt,getOwnPropertyDescriptor:Gt,getOwnPropertyNames:Vt,getOwnPropertySymbols:Wt,getPrototypeOf:Ft}=Object,B=globalThis,ft=B.trustedTypes,Kt=ft?ft.emptyScript:"",Yt=B.reactiveElementPolyfillSupport,R=(n,t)=>n,M={toAttribute(n,t){switch(t){case Boolean:n=n?Kt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},G=(n,t)=>!jt(n,t),yt={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:G};Symbol.metadata??=Symbol("metadata"),B.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=yt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&Bt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:o}=Gt(this.prototype,t)??{get(){return this[e]},set(i){this[e]=i}};return{get:r,set(i){let c=r?.call(this);o?.call(this,i),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??yt}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let t=Ft(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let e=this.properties,s=[...Vt(e),...Wt(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(Z(r))}else t!==void 0&&e.push(Z(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:M).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let o=s.getPropertyOptions(r),i=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:M;this._$Em=r;let c=i.fromAttribute(e,o.type);this[r]=c??this._$Ej?.get(r)??c,this._$Em=null}}requestUpdate(t,e,s,r=!1,o){if(t!==void 0){let i=this.constructor;if(r===!1&&(o=this[t]),s??=i.getPropertyOptions(t),!((s.hasChanged??G)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:o},i){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??e??this[t]),o!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,o]of s){let{wrapped:i}=o,c=this[r];i!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,o,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[R("elementProperties")]=new Map,f[R("finalized")]=new Map,Yt?.({ReactiveElement:f}),(B.reactiveElementVersions??=[]).push("2.1.2");var nt=globalThis,$t=n=>n,V=nt.trustedTypes,xt=V?V.createPolicy("lit-html",{createHTML:n=>n}):void 0,Et="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,wt="?"+$,Jt=`<${wt}>`,v=document,k=()=>v.createComment(""),L=n=>n===null||typeof n!="object"&&typeof n!="function",ot=Array.isArray,Zt=n=>ot(n)||typeof n?.[Symbol.iterator]=="function",Q=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_t=/-->/g,At=/>/g,A=RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bt=/'/g,vt=/"/g,Ct=/^(?:script|style|textarea|title)$/i,it=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),W=it(1),E=it(2),de=it(3),S=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),St=new WeakMap,b=v.createTreeWalker(v,129);function Pt(n,t){if(!ot(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return xt!==void 0?xt.createHTML(t):t}var Qt=(n,t)=>{let e=n.length-1,s=[],r,o=t===2?"<svg>":t===3?"<math>":"",i=T;for(let c=0;c<e;c++){let a=n[c],d,u,l=-1,m=0;for(;m<a.length&&(i.lastIndex=m,u=i.exec(a),u!==null);)m=i.lastIndex,i===T?u[1]==="!--"?i=_t:u[1]!==void 0?i=At:u[2]!==void 0?(Ct.test(u[2])&&(r=RegExp("</"+u[2],"g")),i=A):u[3]!==void 0&&(i=A):i===A?u[0]===">"?(i=r??T,l=-1):u[1]===void 0?l=-2:(l=i.lastIndex-u[2].length,d=u[1],i=u[3]===void 0?A:u[3]==='"'?vt:bt):i===vt||i===bt?i=A:i===_t||i===At?i=T:(i=A,r=void 0);let y=i===A&&n[c+1].startsWith("/>")?" ":"";o+=i===T?a+Jt:l>=0?(s.push(d),a.slice(0,l)+Et+a.slice(l)+$+y):a+$+(l===-2?c:y)}return[Pt(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},O=class n{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let o=0,i=0,c=t.length-1,a=this.parts,[d,u]=Qt(t,e);if(this.el=n.createElement(d,s),b.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(r=b.nextNode())!==null&&a.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(let l of r.getAttributeNames())if(l.endsWith(Et)){let m=u[i++],y=r.getAttribute(l).split($),z=/([.?@])?(.*)/.exec(m);a.push({type:1,index:o,name:z[2],strings:y,ctor:z[1]==="."?tt:z[1]==="?"?et:z[1]==="@"?st:C}),r.removeAttribute(l)}else l.startsWith($)&&(a.push({type:6,index:o}),r.removeAttribute(l));if(Ct.test(r.tagName)){let l=r.textContent.split($),m=l.length-1;if(m>0){r.textContent=V?V.emptyScript:"";for(let y=0;y<m;y++)r.append(l[y],k()),b.nextNode(),a.push({type:2,index:++o});r.append(l[m],k())}}}else if(r.nodeType===8)if(r.data===wt)a.push({type:2,index:o});else{let l=-1;for(;(l=r.data.indexOf($,l+1))!==-1;)a.push({type:7,index:o}),l+=$.length-1}o++}}static createElement(t,e){let s=v.createElement("template");return s.innerHTML=t,s}};function w(n,t,e=n,s){if(t===S)return t;let r=s!==void 0?e._$Co?.[s]:e._$Cl,o=L(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(n),r._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=r:e._$Cl=r),r!==void 0&&(t=w(n,r._$AS(n,t.values),r,s)),t}var X=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??v).importNode(e,!0);b.currentNode=r;let o=b.nextNode(),i=0,c=0,a=s[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new U(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new rt(o,this,t)),this._$AV.push(d),a=s[++c]}i!==a?.index&&(o=b.nextNode(),i++)}return b.currentNode=v,r}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},U=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),L(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==S&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Zt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(v.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=O.createElement(Pt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{let o=new X(r,this),i=o.u(this.options);o.p(e),this.T(i),this._$AH=o}}_$AC(t){let e=St.get(t.strings);return e===void 0&&St.set(t.strings,e=new O(t)),e}k(t){ot(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let o of t)r===e.length?e.push(s=new n(this.O(k()),this.O(k()),this,this.options)):s=e[r],s._$AI(o),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=$t(t).nextSibling;$t(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,e=this,s,r){let o=this.strings,i=!1;if(o===void 0)t=w(this,t,e,0),i=!L(t)||t!==this._$AH&&t!==S,i&&(this._$AH=t);else{let c=t,a,d;for(t=o[0],a=0;a<o.length-1;a++)d=w(this,c[s+a],e,a),d===S&&(d=this._$AH[a]),i||=!L(d)||d!==this._$AH[a],d===p?t=p:t!==p&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}i&&!r&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tt=class extends C{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},et=class extends C{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},st=class extends C{constructor(t,e,s,r,o){super(t,e,s,r,o),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??p)===S)return;let s=this._$AH,r=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==p&&(s===p||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}};var Xt=nt.litHtmlPolyfillSupport;Xt?.(O,U),(nt.litHtmlVersions??=[]).push("3.3.2");var Nt=(n,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let o=e?.renderBefore??null;s._$litPart$=r=new U(t.insertBefore(k(),o),o,void 0,e??{})}return r._$AI(n),r};var at=globalThis,x=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Nt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}};x._$litElement$=!0,x.finalized=!0,at.litElementHydrateSupport?.({LitElement:x});var te=at.litElementPolyfillSupport;te?.({LitElement:x});(at.litElementVersions??=[]).push("4.2.2");var Rt=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};var ee={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:G},se=(n=ee,t,e)=>{let{kind:s,metadata:r}=e,o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),s==="setter"&&((n=Object.create(n)).wrapped=!0),o.set(e.name,n),s==="accessor"){let{name:i}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(i,a,n,!0,c)},init(c){return c!==void 0&&this.C(i,void 0,n,c),c}}}if(s==="setter"){let{name:i}=e;return function(c){let a=this[i];t.call(this,c),this.requestUpdate(i,a,n,!0,c)}}throw Error("Unsupported decorator location: "+s)};function F(n){return(t,e)=>typeof e=="object"?se(n,t,e):((s,r,o)=>{let i=r.hasOwnProperty(o);return r.constructor.createProperty(o,s),i?Object.getOwnPropertyDescriptor(r,o):void 0})(n,t,e)}var Mt={Sun:"\u2609",Moon:"\u263D",Mercury:"\u263F",Venus:"\u2640",Earth:"\u2641",Mars:"\u2642",Jupiter:"\u2643",Saturn:"\u2644",Uranus:"\u2645",Neptune:"\u2646",Pluto:"\u2647",Rahu:"\u260A",Ketu:"\u260B",Ascendant:"Asc",Lagna:"La",NorthNode:"\u260A",SouthNode:"\u260B","North node":"\u260A","South node":"\u260B",Chiron:"\u26B7",Lilith:"\u26B8","Black moon lilith":"\u26B8"};var Tt={Aries:"\u2648",Taurus:"\u2649",Gemini:"\u264A",Cancer:"\u264B",Leo:"\u264C",Virgo:"\u264D",Libra:"\u264E",Scorpio:"\u264F",Sagittarius:"\u2650",Capricorn:"\u2651",Aquarius:"\u2652",Pisces:"\u2653"};var ct=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],Qe=ct.map(n=>n.toLowerCase());var kt=N`
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
`;function g(n,t,e,s){let r=s*Math.PI/180;return{x:n+e*Math.cos(r),y:t+e*Math.sin(r)}}function Lt(n,t=1){return typeof n!="number"||!Number.isFinite(n)?"":n.toFixed(t).replace(/\.?0+$/,"")}var Ot={conjunction:"aspect-conjunction",sextile:"aspect-sextile",square:"aspect-square",trine:"aspect-trine",opposition:"aspect-opposition"};function Ut(n){return(n.type??"").toLowerCase().replace(/_/g,"-")}function H(n){return n?n.charAt(0).toUpperCase()+n.slice(1).toLowerCase():""}var pt=384,h=pt/2,lt=150,re=134,ht=110,Y=88,ne=162,oe=176,_=class extends x{constructor(){super(...arguments);this.data=null;this.houseSystem="placidus"}getPlanets(){return this.data?.planets??[]}getAscendant(){return this.data?.ascendant?.longitude??0}getMidheaven(){let e=this.data?.midheaven?.longitude;return typeof e=="number"?e:null}toAngle(e){return 180+this.getAscendant()-e}render(){if(!this.data)return W`<div class="roxy-empty" role="status">No chart data</div>`;let e=this.getPlanets(),s=this.data.aspects??[];return W`<div class="wrap">
			<header>
				<h2 class="title">Natal chart</h2>
				${this.data.birthDetails?W`<div class="meta">
							${[this.data.birthDetails.date,this.data.birthDetails.time].filter(Boolean).join(" \xB7 ")}
						</div>`:p}
			</header>
			<svg
				viewBox="0 0 ${pt} ${pt}"
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
					cx=${h}
					cy=${h}
					r=${lt}
					stroke-width="1.5"
				/>
				<circle
					class="wheel-line"
					cx=${h}
					cy=${h}
					r=${ht}
					stroke-width="1"
				/>
				<circle
					class="wheel-line"
					cx=${h}
					cy=${h}
					r=${Y-16}
					stroke-width="0.5"
				/>
				${this.renderSpokes()} ${this.renderSigns()} ${this.renderHouseNumbers()}
				${this.renderAspects(e,s)} ${this.renderPlanets(e)}
				${this.renderAngles()}
			</svg>
			<div class="legend">
				<span>${e.length} planets</span>
				<span>${s.length} aspects</span>
				<span><span class="legend-swatch" style="background: var(--roxy-success)"></span>harmonious</span>
				<span><span class="legend-swatch" style="background: var(--roxy-danger)"></span>challenging</span>
			</div>
		</div>`}renderAngles(){let e=this.getAscendant(),s=this.getMidheaven(),r=[this.renderAngleMark(e,"ASC")];return s!==null&&r.push(this.renderAngleMark(s,"MC")),r}renderAngleMark(e,s){let r=this.toAngle(e),o=g(h,h,lt,r),i=g(h,h,ne,r),c=g(h,h,oe,r);return E`
			<g>
				<line class="angle-tick" x1=${o.x} y1=${o.y} x2=${i.x} y2=${i.y} />
				<text class="angle-marker" x=${c.x} y=${c.y} text-anchor="middle" dominant-baseline="central">${s}</text>
			</g>
		`}renderSpokes(){return Array.from({length:12},(e,s)=>{let r=this.toAngle(s*30),o=g(h,h,ht,r),i=g(h,h,lt,r);return E`<line class="wheel-line" x1=${o.x} y1=${o.y} x2=${i.x} y2=${i.y} stroke-width="0.8" />`})}renderSigns(){return ct.map((e,s)=>{let r=this.toAngle(s*30+15),o=g(h,h,re,r);return E`<text class="sign-glyph" x=${o.x} y=${o.y} text-anchor="middle" dominant-baseline="central">${Tt[e]}</text>`})}renderHouseNumbers(){let e=Math.floor(this.getAscendant()/30);return Array.from({length:12},(s,r)=>{let o=this.toAngle(r*30+15),i=g(h,h,ht-12,o),c=(r-e+12)%12+1;return E`<text class="house-num" x=${i.x} y=${i.y} text-anchor="middle" dominant-baseline="central">${c}</text>`})}renderPlanets(e){return e.map(s=>{if(!Number.isFinite(s.longitude))return p;let r=this.toAngle(s.longitude),o=g(h,h,Y,r),i=Mt[H(s.name)]??s.name.slice(0,2),c=s.isRetrograde?" R":"",a=c?`${i}\u1D3F`:i;return E`<text class="planet-glyph" x=${o.x} y=${o.y} text-anchor="middle" dominant-baseline="central"><title>${s.name}${c}</title>${a}</text>`})}renderAspects(e,s){let r=new Map;for(let o of e){if(typeof o.longitude!="number")continue;let i=H(o.name);i&&r.set(i,o.longitude)}return s.map(o=>{let i=r.get(H(o.planet1)),c=r.get(H(o.planet2));if(i===void 0||c===void 0)return p;let a=g(h,h,Y-18,this.toAngle(i)),d=g(h,h,Y-18,this.toAngle(c)),u=Ut(o),l=Ot[u]??"aspect-other",m=Lt(o.orb,1);return E`<line class=${`aspect ${l}`} x1=${a.x} y1=${a.y} x2=${d.x} y2=${d.y}><title>${o.planet1} ${u||""} ${o.planet2}${m?` (orb ${m}\xB0)`:""}</title></line>`})}};_.styles=[kt,N`
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
				stroke-width: 0.8;
				fill: none;
				opacity: 0.55;
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
				opacity: 0.4;
			}

			.angle-marker {
				fill: var(--roxy-accent-fg, #b45309);
				font-size: 10px;
				font-weight: 700;
				font-family: var(--roxy-font-sans);
				letter-spacing: 0.04em;
			}
			.angle-tick {
				stroke: var(--roxy-accent-fg, #b45309);
				stroke-width: 1.5;
			}

			.legend {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-md, 1rem);
			}
			.legend-swatch {
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				margin-right: 4px;
				vertical-align: middle;
			}
		`],I([F({attribute:!1})],_.prototype,"data",2),I([F({type:String,attribute:"house-system",reflect:!0})],_.prototype,"houseSystem",2),_=I([Rt("roxy-natal-chart")],_);return Dt(ie);})();
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
