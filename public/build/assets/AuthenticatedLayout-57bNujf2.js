import{r as v,j as r,t as k,a as H,J as de}from"./app-aKzVPUA-.js";import{z as he}from"./transition-CUXbCy6r.js";const Q=v.createContext(),L=({children:i})=>{const[e,n]=v.useState(!1),t=()=>{n(a=>!a)};return r.jsx(Q.Provider,{value:{open:e,setOpen:n,toggleOpen:t},children:r.jsx("div",{className:"relative",children:i})})},me=({children:i})=>{const{open:e,setOpen:n,toggleOpen:t}=v.useContext(Q);return r.jsxs(r.Fragment,{children:[r.jsx("div",{onClick:t,children:i}),e&&r.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>n(!1)})]})},pe=({align:i="right",width:e="48",contentClasses:n="py-1 bg-white",children:t})=>{const{open:a,setOpen:s}=v.useContext(Q);let o="origin-top";i==="left"?o="ltr:origin-top-left rtl:origin-top-right start-0":i==="right"&&(o="ltr:origin-top-right rtl:origin-top-left end-0");let l="";return e==="48"&&(l="w-48"),r.jsx(r.Fragment,{children:r.jsx(he,{show:a,enter:"transition ease-out duration-200",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:r.jsx("div",{className:`absolute z-50 mt-2 rounded-md shadow-lg ${o} ${l}`,onClick:()=>s(!1),children:r.jsx("div",{className:"rounded-md ring-1 ring-black ring-opacity-5 "+n,children:t})})})})},ue=({className:i="",children:e,...n})=>r.jsx(k,{...n,className:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none "+i,children:e});L.Trigger=me;L.Content=pe;L.Link=ue;function ee({trigger:i,children:e,className:n=""}){const[t,a]=v.useState(!1);return r.jsxs("div",{className:"relative inline-block text-left",children:[r.jsx("div",{children:r.jsx("button",{type:"button",className:"nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2",onMouseEnter:()=>a(!0),onMouseLeave:()=>a(!1),onClick:()=>a(!t),children:i})}),t&&r.jsx("div",{className:`absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-2xl bg-white/98 backdrop-blur-20 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-menu ${n}`,onMouseEnter:()=>a(!0),onMouseLeave:()=>a(!1),children:r.jsx("div",{className:"py-2",children:e})})]})}function $({active:i=!1,className:e="",children:n,...t}){return r.jsx(k,{...t,className:"inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none "+(i?"border-indigo-400 text-gray-900 focus:border-indigo-700":"border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700")+e,children:n})}function w({active:i=!1,className:e="",children:n,...t}){return r.jsx(k,{...t,className:`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${i?"border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800":"border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800"} text-base font-medium transition duration-150 ease-in-out focus:outline-none ${e}`,children:n})}function xe({title:i,titleId:e,...n},t){return v.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":e},n),i?v.createElement("title",{id:e},i):null,v.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"}))}const re=v.forwardRef(xe);function fe({title:i,titleId:e,...n},t){return v.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":e},n),i?v.createElement("title",{id:e},i):null,v.createElement("path",{fillRule:"evenodd",d:"M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z",clipRule:"evenodd"}))}const ge=v.forwardRef(fe);function ve(){const[i,e]=v.useState(0),[n,t]=v.useState([]),[a,s]=v.useState(!1);v.useEffect(()=>{o();const p=setInterval(o,3e4);return()=>clearInterval(p)},[]);const o=async()=>{try{const p=await H.get("/notifications/unread-count",{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}});e(p.data.count)}catch{e(0)}},l=async()=>{try{const p=await H.get("/notifications",{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}});t(p.data.notifications||[])}catch{t([])}},c=async p=>{try{await H.post(`/notifications/${p}/read`,{},{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}}),o(),l()}catch{}},m=async()=>{try{await H.post("/notifications/mark-all-read",{},{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}}),e(0),l()}catch{}},d=()=>{s(!a),a||l()},u=p=>{switch(p){case"sale_approved":return"✅";case"sale_rejected":return"❌";case"new_sale":return"📋";case"goal_reached":return"🎯";default:return"📢"}},h=p=>{switch(p){case"sale_approved":return"bg-green-100 text-green-800";case"sale_rejected":return"bg-red-100 text-red-800";case"new_sale":return"bg-blue-100 text-blue-800";case"goal_reached":return"bg-yellow-100 text-yellow-800";default:return"bg-gray-100 text-gray-800"}};return r.jsxs("div",{className:"relative",children:[r.jsxs("button",{onClick:d,className:"relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200",children:[i>0?r.jsx(ge,{className:"h-6 w-6 text-pink-600"}):r.jsx(re,{className:"h-6 w-6 text-gray-600"}),i>0&&r.jsx("span",{className:"absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transform translate-x-1/2 -translate-y-1/2",children:i>9?"9+":i})]}),a&&r.jsxs("div",{className:"absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden",children:[r.jsx("div",{className:"bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-3 border-b border-gray-100",children:r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx("h3",{className:"text-lg font-semibold text-gray-800",children:"Notificações"}),i>0&&r.jsx("button",{onClick:m,className:"text-sm text-pink-600 hover:text-pink-800 font-medium",children:"Marcar todas como lidas"})]})}),r.jsx("div",{className:"max-h-96 overflow-y-auto",children:n.length>0?n.map(p=>r.jsx("div",{className:`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${p.read?"":"bg-pink-50"}`,onClick:()=>!p.read&&c(p.id),children:r.jsxs("div",{className:"flex items-start space-x-3",children:[r.jsx("div",{className:`p-2 rounded-full ${h(p.type)}`,children:r.jsx("span",{className:"text-lg",children:u(p.type)})}),r.jsxs("div",{className:"flex-1",children:[r.jsx("p",{className:"text-sm text-gray-800",children:p.message}),r.jsx("p",{className:"text-xs text-gray-500 mt-1",children:new Date(p.created_at).toLocaleString("pt-BR")})]}),!p.read&&r.jsx("div",{className:"w-2 h-2 bg-pink-500 rounded-full mt-2"})]})},p.id)):r.jsxs("div",{className:"px-4 py-8 text-center",children:[r.jsx("div",{className:"w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3",children:r.jsx(re,{className:"h-8 w-8 text-gray-400"})}),r.jsx("p",{className:"text-gray-500",children:"Nenhuma notificação no momento"})]})}),n.length>0&&r.jsx("div",{className:"px-4 py-3 bg-gray-50 border-t border-gray-100",children:r.jsx("a",{href:"/notifications",className:"text-sm text-pink-600 hover:text-pink-800 font-medium block text-center",children:"Ver todas as notificações"})})]}),a&&r.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>s(!1)})]})}const be=String.prototype.replace,ye=/%20/g,te={RFC1738:"RFC1738",RFC3986:"RFC3986"},U={RFC1738:function(i){return be.call(i,ye,"+")},RFC3986:function(i){return String(i)}},we=te.RFC1738,ae=te.RFC3986,Z=Object.prototype.hasOwnProperty,O=Array.isArray,C=function(){const i=[];for(let e=0;e<256;++e)i.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return i}(),je=function(e){for(;e.length>1;){const n=e.pop(),t=n.obj[n.prop];if(O(t)){const a=[];for(let s=0;s<t.length;++s)typeof t[s]<"u"&&a.push(t[s]);n.obj[n.prop]=a}}},ke=function(e,n){const t=n&&n.plainObjects?Object.create(null):{};for(let a=0;a<e.length;++a)typeof e[a]<"u"&&(t[a]=e[a]);return t},Ne=function i(e,n,t){if(!n)return e;if(typeof n!="object"){if(O(e))e.push(n);else if(e&&typeof e=="object")(t&&(t.plainObjects||t.allowPrototypes)||!Z.call(Object.prototype,n))&&(e[n]=!0);else return[e,n];return e}if(!e||typeof e!="object")return[e].concat(n);let a=e;return O(e)&&!O(n)&&(a=ke(e,t)),O(e)&&O(n)?(n.forEach(function(s,o){if(Z.call(e,o)){const l=e[o];l&&typeof l=="object"&&s&&typeof s=="object"?e[o]=i(l,s,t):e.push(s)}else e[o]=s}),e):Object.keys(n).reduce(function(s,o){const l=n[o];return Z.call(s,o)?s[o]=i(s[o],l,t):s[o]=l,s},a)},Ce=function(i,e,n){const t=i.replace(/\+/g," ");if(n==="iso-8859-1")return t.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(t)}catch{return t}},_=1024,Me=function(e,n,t,a,s){if(e.length===0)return e;let o=e;if(typeof e=="symbol"?o=Symbol.prototype.toString.call(e):typeof e!="string"&&(o=String(e)),t==="iso-8859-1")return escape(o).replace(/%u[0-9a-f]{4}/gi,function(c){return"%26%23"+parseInt(c.slice(2),16)+"%3B"});let l="";for(let c=0;c<o.length;c+=_){const m=o.length>=_?o.slice(c,c+_):o,d=[];for(let u=0;u<m.length;++u){let h=m.charCodeAt(u);if(h===45||h===46||h===95||h===126||h>=48&&h<=57||h>=65&&h<=90||h>=97&&h<=122||s===we&&(h===40||h===41)){d[d.length]=m.charAt(u);continue}if(h<128){d[d.length]=C[h];continue}if(h<2048){d[d.length]=C[192|h>>6]+C[128|h&63];continue}if(h<55296||h>=57344){d[d.length]=C[224|h>>12]+C[128|h>>6&63]+C[128|h&63];continue}u+=1,h=65536+((h&1023)<<10|m.charCodeAt(u)&1023),d[d.length]=C[240|h>>18]+C[128|h>>12&63]+C[128|h>>6&63]+C[128|h&63]}l+=d.join("")}return l},Le=function(e){const n=[{obj:{o:e},prop:"o"}],t=[];for(let a=0;a<n.length;++a){const s=n[a],o=s.obj[s.prop],l=Object.keys(o);for(let c=0;c<l.length;++c){const m=l[c],d=o[m];typeof d=="object"&&d!==null&&t.indexOf(d)===-1&&(n.push({obj:o,prop:m}),t.push(d))}}return je(n),e},ze=function(e){return!e||typeof e!="object"?!1:!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},Oe=function(e,n){return[].concat(e,n)},q=function(e,n){if(O(e)){const t=[];for(let a=0;a<e.length;a+=1)t.push(n(e[a]));return t}return n(e)},Be=Object.prototype.hasOwnProperty,oe={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,n){return e+"["+n+"]"},repeat:function(e){return e}},M=Array.isArray,Fe=Array.prototype.push,ie=function(i,e){Fe.apply(i,M(e)?e:[e])},$e=Date.prototype.toISOString,ne=ae,b={addQueryPrefix:!1,allowDots:!1,allowEmptyArrays:!1,arrayFormat:"indices",charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encodeDotInKeys:!1,encoder:Me,encodeValuesOnly:!1,format:ne,formatter:U[ne],indices:!1,serializeDate:function(e){return $e.call(e)},skipNulls:!1,strictNullHandling:!1},Ae=function(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"||typeof e=="symbol"||typeof e=="bigint"},T={},se=function(e,n,t,a,s,o,l,c,m,d,u,h,p,g,N,z,A,D){let f=e,V=D,E=0,G=!1;for(;(V=V.get(T))!==void 0&&!G;){const y=V.get(e);if(E+=1,typeof y<"u"){if(y===E)throw new RangeError("Cyclic object value");G=!0}typeof V.get(T)>"u"&&(E=0)}if(typeof d=="function"?f=d(n,f):f instanceof Date?f=p(f):t==="comma"&&M(f)&&(f=q(f,function(y){return y instanceof Date?p(y):y})),f===null){if(o)return m&&!z?m(n,b.encoder,A,"key",g):n;f=""}if(Ae(f)||ze(f)){if(m){const y=z?n:m(n,b.encoder,A,"key",g);return[N(y)+"="+N(m(f,b.encoder,A,"value",g))]}return[N(n)+"="+N(String(f))]}const P=[];if(typeof f>"u")return P;let F;if(t==="comma"&&M(f))z&&m&&(f=q(f,m)),F=[{value:f.length>0?f.join(",")||null:void 0}];else if(M(d))F=d;else{const y=Object.keys(f);F=u?y.sort(u):y}const X=c?n.replace(/\./g,"%2E"):n,S=a&&M(f)&&f.length===1?X+"[]":X;if(s&&M(f)&&f.length===0)return S+"[]";for(let y=0;y<F.length;++y){const B=F[y],Y=typeof B=="object"&&typeof B.value<"u"?B.value:f[B];if(l&&Y===null)continue;const I=h&&c?B.replace(/\./g,"%2E"):B,ce=M(f)?typeof t=="function"?t(S,I):S:S+(h?"."+I:"["+I+"]");D.set(e,E);const J=new WeakMap;J.set(T,D),ie(P,se(Y,ce,t,a,s,o,l,c,t==="comma"&&z&&M(f)?null:m,d,u,h,p,g,N,z,A,J))}return P},Ve=function(e){if(!e)return b;if(typeof e.allowEmptyArrays<"u"&&typeof e.allowEmptyArrays!="boolean")throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");if(typeof e.encodeDotInKeys<"u"&&typeof e.encodeDotInKeys!="boolean")throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");if(e.encoder!==null&&typeof e.encoder<"u"&&typeof e.encoder!="function")throw new TypeError("Encoder has to be a function.");const n=e.charset||b.charset;if(typeof e.charset<"u"&&e.charset!=="utf-8"&&e.charset!=="iso-8859-1")throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");let t=ae;if(typeof e.format<"u"){if(!Be.call(U,e.format))throw new TypeError("Unknown format option provided.");t=e.format}const a=U[t];let s=b.filter;(typeof e.filter=="function"||M(e.filter))&&(s=e.filter);let o;if(e.arrayFormat in oe?o=e.arrayFormat:"indices"in e?o=e.indices?"indices":"repeat":o=b.arrayFormat,"commaRoundTrip"in e&&typeof e.commaRoundTrip!="boolean")throw new TypeError("`commaRoundTrip` must be a boolean, or absent");const l=typeof e.allowDots>"u"?e.encodeDotInKeys===!0?!0:b.allowDots:!!e.allowDots;return{addQueryPrefix:typeof e.addQueryPrefix=="boolean"?e.addQueryPrefix:b.addQueryPrefix,allowDots:l,allowEmptyArrays:typeof e.allowEmptyArrays=="boolean"?!!e.allowEmptyArrays:b.allowEmptyArrays,arrayFormat:o,charset:n,charsetSentinel:typeof e.charsetSentinel=="boolean"?e.charsetSentinel:b.charsetSentinel,commaRoundTrip:e.commaRoundTrip,delimiter:typeof e.delimiter>"u"?b.delimiter:e.delimiter,encode:typeof e.encode=="boolean"?e.encode:b.encode,encodeDotInKeys:typeof e.encodeDotInKeys=="boolean"?e.encodeDotInKeys:b.encodeDotInKeys,encoder:typeof e.encoder=="function"?e.encoder:b.encoder,encodeValuesOnly:typeof e.encodeValuesOnly=="boolean"?e.encodeValuesOnly:b.encodeValuesOnly,filter:s,format:t,formatter:a,serializeDate:typeof e.serializeDate=="function"?e.serializeDate:b.serializeDate,skipNulls:typeof e.skipNulls=="boolean"?e.skipNulls:b.skipNulls,sort:typeof e.sort=="function"?e.sort:null,strictNullHandling:typeof e.strictNullHandling=="boolean"?e.strictNullHandling:b.strictNullHandling}};function Ee(i,e){let n=i;const t=Ve(e);let a,s;typeof t.filter=="function"?(s=t.filter,n=s("",n)):M(t.filter)&&(s=t.filter,a=s);const o=[];if(typeof n!="object"||n===null)return"";const l=oe[t.arrayFormat],c=l==="comma"&&t.commaRoundTrip;a||(a=Object.keys(n)),t.sort&&a.sort(t.sort);const m=new WeakMap;for(let h=0;h<a.length;++h){const p=a[h];t.skipNulls&&n[p]===null||ie(o,se(n[p],p,l,c,t.allowEmptyArrays,t.strictNullHandling,t.skipNulls,t.encodeDotInKeys,t.encode?t.encoder:null,t.filter,t.sort,t.allowDots,t.serializeDate,t.format,t.formatter,t.encodeValuesOnly,t.charset,m))}const d=o.join(t.delimiter);let u=t.addQueryPrefix===!0?"?":"";return t.charsetSentinel&&(t.charset==="iso-8859-1"?u+="utf8=%26%2310003%3B&":u+="utf8=%E2%9C%93&"),d.length>0?u+d:""}const K=Object.prototype.hasOwnProperty,Se=Array.isArray,R={allowDots:!1,allowEmptyArrays:!1,allowPrototypes:!1,allowSparse:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decodeDotInKeys:!1,decoder:Ce,delimiter:"&",depth:5,duplicates:"combine",ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},He=function(i){return i.replace(/&#(\d+);/g,function(e,n){return String.fromCharCode(parseInt(n,10))})},le=function(i,e){return i&&typeof i=="string"&&e.comma&&i.indexOf(",")>-1?i.split(","):i},Re="utf8=%26%2310003%3B",De="utf8=%E2%9C%93",Pe=function(e,n){const t={__proto__:null},a=n.ignoreQueryPrefix?e.replace(/^\?/,""):e,s=n.parameterLimit===1/0?void 0:n.parameterLimit,o=a.split(n.delimiter,s);let l=-1,c,m=n.charset;if(n.charsetSentinel)for(c=0;c<o.length;++c)o[c].indexOf("utf8=")===0&&(o[c]===De?m="utf-8":o[c]===Re&&(m="iso-8859-1"),l=c,c=o.length);for(c=0;c<o.length;++c){if(c===l)continue;const d=o[c],u=d.indexOf("]="),h=u===-1?d.indexOf("="):u+1;let p,g;h===-1?(p=n.decoder(d,R.decoder,m,"key"),g=n.strictNullHandling?null:""):(p=n.decoder(d.slice(0,h),R.decoder,m,"key"),g=q(le(d.slice(h+1),n),function(z){return n.decoder(z,R.decoder,m,"value")})),g&&n.interpretNumericEntities&&m==="iso-8859-1"&&(g=He(g)),d.indexOf("[]=")>-1&&(g=Se(g)?[g]:g);const N=K.call(t,p);N&&n.duplicates==="combine"?t[p]=Oe(t[p],g):(!N||n.duplicates==="last")&&(t[p]=g)}return t},Ie=function(i,e,n,t){let a=t?e:le(e,n);for(let s=i.length-1;s>=0;--s){let o;const l=i[s];if(l==="[]"&&n.parseArrays)o=n.allowEmptyArrays&&a===""?[]:[].concat(a);else{o=n.plainObjects?Object.create(null):{};const c=l.charAt(0)==="["&&l.charAt(l.length-1)==="]"?l.slice(1,-1):l,m=n.decodeDotInKeys?c.replace(/%2E/g,"."):c,d=parseInt(m,10);!n.parseArrays&&m===""?o={0:a}:!isNaN(d)&&l!==m&&String(d)===m&&d>=0&&n.parseArrays&&d<=n.arrayLimit?(o=[],o[d]=a):m!=="__proto__"&&(o[m]=a)}a=o}return a},Ze=function(e,n,t,a){if(!e)return;const s=t.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,o=/(\[[^[\]]*])/,l=/(\[[^[\]]*])/g;let c=t.depth>0&&o.exec(s);const m=c?s.slice(0,c.index):s,d=[];if(m){if(!t.plainObjects&&K.call(Object.prototype,m)&&!t.allowPrototypes)return;d.push(m)}let u=0;for(;t.depth>0&&(c=l.exec(s))!==null&&u<t.depth;){if(u+=1,!t.plainObjects&&K.call(Object.prototype,c[1].slice(1,-1))&&!t.allowPrototypes)return;d.push(c[1])}return c&&d.push("["+s.slice(c.index)+"]"),Ie(d,n,t,a)},_e=function(e){return R};function Te(i,e){const n=_e();if(i===""||i===null||typeof i>"u")return n.plainObjects?Object.create(null):{};const t=typeof i=="string"?Pe(i,n):i;let a=n.plainObjects?Object.create(null):{};const s=Object.keys(t);for(let o=0;o<s.length;++o){const l=s[o],c=Ze(l,t[l],n,typeof i=="string");a=Ne(a,c,n)}return n.allowSparse===!0?a:Le(a)}function j(){return j=Object.assign?Object.assign.bind():function(i){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var t in n)({}).hasOwnProperty.call(n,t)&&(i[t]=n[t])}return i},j.apply(null,arguments)}class W{constructor(e,n,t){var a,s;this.name=e,this.definition=n,this.bindings=(a=n.bindings)!=null?a:{},this.wheres=(s=n.wheres)!=null?s:{},this.config=t}get template(){const e=`${this.origin}/${this.definition.uri}`.replace(/\/+$/,"");return e===""?"/":e}get origin(){return this.config.absolute?this.definition.domain?`${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port?`:${this.config.port}`:""}`:this.config.url:""}get parameterSegments(){var e,n;return(e=(n=this.template.match(/{[^}?]+\??}/g))==null?void 0:n.map(t=>({name:t.replace(/{|\??}/g,""),required:!/\?}$/.test(t)})))!=null?e:[]}matchesUrl(e){var n;if(!this.definition.methods.includes("GET"))return!1;const t=this.template.replace(/[.*+$()[\]]/g,"\\$&").replace(/(\/?){([^}?]*)(\??)}/g,(l,c,m,d)=>{var u;const h=`(?<${m}>${((u=this.wheres[m])==null?void 0:u.replace(/(^\^)|(\$$)/g,""))||"[^/?]+"})`;return d?`(${c}${h})?`:`${c}${h}`}).replace(/^\w+:\/\//,""),[a,s]=e.replace(/^\w+:\/\//,"").split("?"),o=(n=new RegExp(`^${t}/?$`).exec(a))!=null?n:new RegExp(`^${t}/?$`).exec(decodeURI(a));if(o){for(const l in o.groups)o.groups[l]=typeof o.groups[l]=="string"?decodeURIComponent(o.groups[l]):o.groups[l];return{params:o.groups,query:Te(s)}}return!1}compile(e){return this.parameterSegments.length?this.template.replace(/{([^}?]+)(\??)}/g,(n,t,a)=>{var s,o;if(!a&&[null,void 0].includes(e[t]))throw new Error(`Ziggy error: '${t}' parameter is required for route '${this.name}'.`);if(this.wheres[t]&&!new RegExp(`^${a?`(${this.wheres[t]})?`:this.wheres[t]}$`).test((o=e[t])!=null?o:""))throw new Error(`Ziggy error: '${t}' parameter '${e[t]}' does not match required format '${this.wheres[t]}' for route '${this.name}'.`);return encodeURI((s=e[t])!=null?s:"").replace(/%7C/g,"|").replace(/%25/g,"%").replace(/\$/g,"%24")}).replace(this.config.absolute?/(\.[^/]+?)(\/\/)/:/(^)(\/\/)/,"$1/").replace(/\/+$/,""):this.template}}class We extends String{constructor(e,n,t=!0,a){if(super(),this.t=a??(typeof Ziggy<"u"?Ziggy:globalThis==null?void 0:globalThis.Ziggy),!this.t&&typeof document<"u"&&document.getElementById("ziggy-routes-json")&&(globalThis.Ziggy=JSON.parse(document.getElementById("ziggy-routes-json").textContent),this.t=globalThis.Ziggy),this.t=j({},this.t,{absolute:t}),e){if(!this.t.routes[e])throw new Error(`Ziggy error: route '${e}' is not in the route list.`);this.i=new W(e,this.t.routes[e],this.t),this.o=this.u(n)}}toString(){const e=Object.keys(this.o).filter(n=>!this.i.parameterSegments.some(({name:t})=>t===n)).filter(n=>n!=="_query").reduce((n,t)=>j({},n,{[t]:this.o[t]}),{});return this.i.compile(this.o)+Ee(j({},e,this.o._query),{addQueryPrefix:!0,arrayFormat:"indices",encodeValuesOnly:!0,skipNulls:!0,encoder:(n,t)=>typeof n=="boolean"?Number(n):t(n)})}h(e){e?this.t.absolute&&e.startsWith("/")&&(e=this.l().host+e):e=this.m();let n={};const[t,a]=Object.entries(this.t.routes).find(([s,o])=>n=new W(s,o,this.t).matchesUrl(e))||[void 0,void 0];return j({name:t},n,{route:a})}m(){const{host:e,pathname:n,search:t}=this.l();return(this.t.absolute?e+n:n.replace(this.t.url.replace(/^\w*:\/\/[^/]+/,""),"").replace(/^\/+/,"/"))+t}current(e,n){const{name:t,params:a,query:s,route:o}=this.h();if(!e)return t;const l=new RegExp(`^${e.replace(/\./g,"\\.").replace(/\*/g,".*")}$`).test(t);if([null,void 0].includes(n)||!l)return l;const c=new W(t,o,this.t);n=this.u(n,c);const m=j({},a,s);if(Object.values(n).every(u=>!u)&&!Object.values(m).some(u=>u!==void 0))return!0;const d=(u,h)=>Object.entries(u).every(([p,g])=>Array.isArray(g)&&Array.isArray(h[p])?g.every(N=>h[p].includes(N)||h[p].includes(decodeURIComponent(N))):typeof g=="object"&&typeof h[p]=="object"&&g!==null&&h[p]!==null?d(g,h[p]):h[p]==g||h[p]==decodeURIComponent(g));return d(n,m)}l(){var e,n,t,a,s,o;const{host:l="",pathname:c="",search:m=""}=typeof window<"u"?window.location:{};return{host:(e=(n=this.t.location)==null?void 0:n.host)!=null?e:l,pathname:(t=(a=this.t.location)==null?void 0:a.pathname)!=null?t:c,search:(s=(o=this.t.location)==null?void 0:o.search)!=null?s:m}}get params(){const{params:e,query:n}=this.h();return j({},e,n)}get routeParams(){return this.h().params}get queryParams(){return this.h().query}has(e){return this.t.routes.hasOwnProperty(e)}u(e={},n=this.i){e!=null||(e={}),e=["string","number"].includes(typeof e)?[e]:e;const t=n.parameterSegments.filter(({name:a})=>!this.t.defaults[a]);return Array.isArray(e)?e=e.reduce((a,s,o)=>j({},a,t[o]?{[t[o].name]:s}:typeof s=="object"?s:{[s]:""}),{}):t.length!==1||e[t[0].name]||!e.hasOwnProperty(Object.values(n.bindings)[0])&&!e.hasOwnProperty("id")||(e={[t[0].name]:e}),j({},this.p(n),this.$(e,n))}p(e){return e.parameterSegments.filter(({name:n})=>this.t.defaults[n]).reduce((n,{name:t},a)=>j({},n,{[t]:this.t.defaults[t]}),{})}$(e,{bindings:n,parameterSegments:t}){return Object.entries(e).reduce((a,[s,o])=>{if(!o||typeof o!="object"||Array.isArray(o)||!t.some(({name:l})=>l===s))return j({},a,{[s]:o});if(!o.hasOwnProperty(n[s])){if(!o.hasOwnProperty("id"))throw new Error(`Ziggy error: object passed as '${s}' parameter is missing route model binding key '${n[s]}'.`);n[s]="id"}return j({},a,{[s]:o[n[s]]})},{})}valueOf(){return this.toString()}}function x(i,e,n,t){const a=new We(i,e,n,t);return i?a.toString():a}function Ke({header:i,children:e}){const n=de().props.auth.user,[t,a]=v.useState(!1),[s,o]=v.useState(!1),l=()=>["admin","manager","production_admin","finance_admin","financeiro"].includes(n.role),c=()=>["admin","manager","production_admin","finance_admin","financeiro"].includes(n.role),m=()=>["admin","manager","production_admin","finance_admin","financeiro"].includes(n.role);return v.useEffect(()=>{const d=()=>{o(window.scrollY>50)};return window.addEventListener("scroll",d),()=>window.removeEventListener("scroll",d)},[]),r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
                
                :root {
                    --primary-color: #D4A574;
                    --secondary-color: #F5E6D3;
                    --accent-color: #E8B4CB;
                    --accent-dark: #C8869B;
                    --text-dark: #2C2C2C;
                    --text-light: #666;
                    --white: #FFFFFF;
                    --gradient: linear-gradient(135deg, #D4A574 0%, #E8B4CB 100%);
                    --gradient-soft: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 100%);
                    --gradient-hero: linear-gradient(135deg, rgba(212, 165, 116, 0.95) 0%, rgba(232, 180, 203, 0.95) 100%);
                    --shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    --shadow-hover: 0 25px 50px rgba(0, 0, 0, 0.2);
                    --shadow-glow: 0 0 30px rgba(212, 165, 116, 0.3);
                }

                * {
                    font-family: 'Poppins', sans-serif;
                }

                .premium-bg {
                    background: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 30%, #F0F9FF 70%, #FDF2F8 100%);
                    position: relative;
                    overflow: hidden;
                }

                .floating-particles {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 0;
                }

                .particle {
                    position: absolute;
                    background: rgba(212, 165, 116, 0.1);
                    border-radius: 50%;
                    animation: float 15s infinite linear;
                }

                @keyframes float {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.3;
                    }
                    90% {
                        opacity: 0.3;
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }

                .navbar-glass {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(212, 165, 116, 0.2);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .navbar-scrolled {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(25px);
                    box-shadow: var(--shadow);
                    border-bottom: 2px solid var(--primary-color);
                }

                .logo-container {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }

                .logo-container::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: var(--gradient);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    opacity: 0;
                    transition: all 0.4s ease;
                    z-index: -1;
                }

                .logo-container:hover::before {
                    width: 120%;
                    height: 120%;
                    opacity: 0.1;
                }

                .logo-container:hover {
                    transform: scale(1.1) rotate(5deg);
                    filter: drop-shadow(0 0 20px rgba(212, 165, 116, 0.4));
                }

                .nav-link {
                    position: relative;
                    padding: 6px 10px;
                    border-radius: 12px;
                    font-weight: 500;
                    font-size: 0.75rem;
                    color: var(--text-dark);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                    white-space: nowrap;
                }
                
                @media (min-width: 640px) {
                    .nav-link {
                        padding: 6px 12px;
                        font-size: 0.8125rem;
                    }
                }
                
                @media (min-width: 768px) {
                    .nav-link {
                        padding: 8px 14px;
                        font-size: 0.875rem;
                        border-radius: 14px;
                    }
                }
                
                @media (min-width: 1024px) {
                    .nav-link {
                        padding: 10px 16px;
                        font-size: 0.9375rem;
                        font-weight: 600;
                        border-radius: 15px;
                    }
                }
                
                @media (min-width: 1280px) {
                    .nav-link {
                        padding: 12px 20px;
                        font-size: 1rem;
                    }
                }

                .nav-link::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: var(--gradient-soft);
                    transition: left 0.5s ease;
                    z-index: -1;
                }

                .nav-link:hover::before,
                .nav-link.active::before {
                    left: 0;
                }

                .nav-link:hover {
                    color: var(--primary-color);
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(212, 165, 116, 0.2);
                }
                
                @media (min-width: 1024px) {
                    .nav-link:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 10px 25px rgba(212, 165, 116, 0.2);
                    }
                }

                .nav-link.active {
                    color: var(--primary-color);
                    background: var(--gradient-soft);
                    box-shadow: 0 8px 20px rgba(212, 165, 116, 0.3);
                }

                .user-dropdown {
                    background: var(--gradient-soft);
                    border: 2px solid transparent;
                    background-clip: padding-box;
                    border-radius: 12px;
                    padding: 4px 8px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                
                @media (min-width: 768px) {
                    .user-dropdown {
                        padding: 6px 12px;
                        border-radius: 16px;
                    }
                }
                
                @media (min-width: 1024px) {
                    .user-dropdown {
                        padding: 8px 16px;
                        border-radius: 20px;
                    }
                }

                .user-dropdown::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: var(--gradient);
                    border-radius: inherit;
                    z-index: -1;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .user-dropdown:hover::before {
                    opacity: 1;
                }

                .user-dropdown:hover {
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: var(--shadow-hover);
                }

                .user-avatar {
                    background: var(--gradient);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(212, 165, 116, 0.3);
                }

                .user-avatar:hover {
                    transform: scale(1.1) rotate(10deg);
                    box-shadow: var(--shadow-glow);
                }

                .dropdown-content {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(212, 165, 116, 0.2);
                    border-radius: 20px;
                    box-shadow: var(--shadow-hover);
                    overflow: hidden;
                    margin-top: 8px;
                }

                .dropdown-header {
                    background: var(--gradient-soft);
                    padding: 16px;
                    border-bottom: 1px solid rgba(212, 165, 116, 0.1);
                }

                .dropdown-link {
                    padding: 12px 16px;
                    transition: all 0.3s ease;
                    border-radius: 0;
                    margin: 4px 8px;
                    border-radius: 12px;
                }

                .dropdown-link:hover {
                    background: var(--gradient-soft);
                    color: var(--primary-color);
                    transform: translateX(5px);
                }

                .mobile-menu {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(20px);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    border-bottom: 1px solid rgba(212, 165, 116, 0.2);
                }

                .mobile-toggle {
                    background: var(--gradient-soft);
                    border-radius: 12px;
                    padding: 6px;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }
                
                @media (min-width: 640px) {
                    .mobile-toggle {
                        padding: 8px;
                        border-radius: 15px;
                    }
                }

                .mobile-toggle:hover {
                    background: var(--gradient);
                    color: white;
                    transform: scale(1.1);
                    box-shadow: 0 5px 15px rgba(212, 165, 116, 0.3);
                }

                .header-section {
                    background: var(--gradient-soft);
                    border-bottom: 2px solid var(--primary-color);
                    box-shadow: var(--shadow);
                    position: relative;
                    overflow: hidden;
                }

                .header-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, rgba(212, 165, 116, 0.05) 0%, rgba(232, 180, 203, 0.05) 100%);
                    pointer-events: none;
                }

                .main-content {
                    position: relative;
                    z-index: 1;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                    transform: translateY(30px);
                }

                .animate-fadeInUp.delay-200 {
                    animation-delay: 0.2s;
                }

                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .icon-hover {
                    transition: all 0.3s ease;
                }

                .icon-hover:hover {
                    transform: scale(1.2) rotate(10deg);
                    color: var(--primary-color);
                }

                /* Mobile responsive menu animations */
                .mobile-nav-item {
                    transition: all 0.3s ease;
                    margin: 4px 0;
                }

                .mobile-nav-item:hover {
                    transform: translateX(10px) scale(1.02);
                    background: var(--gradient-soft);
                    border-radius: 15px;
                }

                /* Scroll indicator */
                .scroll-indicator {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 4px;
                    background: var(--gradient);
                    z-index: 9999;
                    transition: width 0.3s ease;
                }

                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                ::-webkit-scrollbar-thumb {
                    background: var(--gradient);
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: var(--accent-color);
                }
                
                /* Responsive icon sizes */
                .nav-icon {
                    width: 0.875rem;
                    height: 0.875rem;
                }
                
                @media (min-width: 768px) {
                    .nav-icon {
                        width: 1rem;
                        height: 1rem;
                    }
                }
                
                @media (min-width: 1024px) {
                    .nav-icon {
                        width: 1.125rem;
                        height: 1.125rem;
                    }
                }
                
                /* Hide text on smaller screens, show icons only */
                .nav-text {
                    display: none;
                }

                @media (min-width: 900px) {
                    .nav-text {
                        display: inline;
                    }
                }

                /* Better spacing for dropdown menus */
                .dropdown-menu {
                    min-width: 200px;
                }

                /* Compact navigation for tablets */
                @media (max-width: 1024px) {
                    .nav-link {
                        padding: 8px 10px;
                        gap: 0;
                    }

                    .nav-icon {
                        width: 1.125rem;
                        height: 1.125rem;
                    }
                }
                
                /* Adjust navbar height */
                .navbar-height {
                    height: 3rem;
                }
                
                @media (min-width: 640px) {
                    .navbar-height {
                        height: 3.5rem;
                    }
                }
                
                @media (min-width: 768px) {
                    .navbar-height {
                        height: 3.75rem;
                    }
                }
                
                @media (min-width: 1024px) {
                    .navbar-height {
                        height: 4rem;
                    }
                }
            `}),r.jsxs("div",{className:"min-h-screen premium-bg",children:[r.jsx("div",{className:"floating-particles",children:Array.from({length:25},(d,u)=>r.jsx("div",{className:"particle",style:{left:Math.random()*100+"%",width:Math.random()*10+4+"px",height:Math.random()*10+4+"px",animationDelay:Math.random()*15+"s",animationDuration:Math.random()*10+15+"s"}},u))}),r.jsxs("nav",{className:`fixed top-0 w-full z-50 navbar-glass ${s?"navbar-scrolled":""}`,children:[r.jsx("div",{className:"mx-auto w-full max-w-[100%] px-2 sm:px-3 md:px-4 lg:px-6 xl:max-w-7xl xl:px-8",children:r.jsxs("div",{className:"navbar-height flex justify-between items-center",children:[r.jsxs("div",{className:"flex items-center flex-shrink-0",children:[r.jsx("div",{className:"flex shrink-0 items-center",children:r.jsx(k,{href:"/",className:"logo-container",children:r.jsx("img",{src:"/images/logo.webp",alt:"BBKits Logo",className:"h-6 sm:h-7 md:h-8 lg:h-9 xl:h-10 w-auto object-contain drop-shadow-xl hover:drop-shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-3 filter hover:brightness-110 hover:saturate-125 cursor-pointer animate-pulse hover:animate-none rounded-lg sm:rounded-xl bg-white from-white/20 to-transparent backdrop-blur-sm border border-white/30 p-0.5 sm:p-0.75 lg:p-1 shadow-xl hover:shadow-yellow-400/50"})})}),r.jsxs("div",{className:"hidden md:flex items-center space-x-0.5 lg:space-x-1 xl:space-x-2 ms-2 sm:ms-3 md:ms-4 lg:ms-6 xl:ms-10",children:[r.jsxs($,{href:x("dashboard"),active:window.location.pathname==="/dashboard",className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname==="/dashboard"?"active":""}`,children:[r.jsx("svg",{className:"nav-icon icon-hover",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("path",{d:"M13 9V3h8v6h-8ZM3 13V3h8v10H3Zm10 8V11h8v10h-8ZM3 21v-6h8v6H3Z"})}),r.jsx("span",{className:"nav-text",children:"Dashboard"})]}),r.jsxs($,{href:x("sales.index"),active:window.location.pathname.includes("/sales"),className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname.includes("/sales")?"active":""}`,children:[r.jsx("svg",{className:"nav-icon icon-hover",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("path",{d:"M7 4V2C7 1.45 7.45 1 8 1h8c.55 0 1 .45 1 1v2h5c.55 0 1 .45 1 1s-.45 1-1 1h-1v11c0 1.66-1.34 3-3 3H6c-1.66 0-3-1.34-3-3V6H2c-.55 0-1-.45-1-1s.45-1 1-1h5Zm2-1v1h6V3H9Zm6.5 15L19 14.5l-1.41-1.41L15 15.67l-1.59-1.58L12 15.5 15.5 18Z"})}),r.jsx("span",{className:"nav-text",children:"Vendas"})]}),(n.role==="finance_admin"||n.role==="financeiro"||n.role==="admin")&&r.jsxs($,{href:x("finance.orders.index"),active:window.location.pathname.includes("/finance"),className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname.includes("/finance")?"active":""}`,children:[r.jsx("svg",{className:"nav-icon icon-hover",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("path",{d:"M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4Z"})}),r.jsx("span",{className:"nav-text",children:"Financeiro"})]}),(n.role==="production_admin"||n.role==="admin")&&r.jsxs($,{href:x("production.orders.index"),active:window.location.pathname.includes("/production"),className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname.includes("/production")?"active":""}`,children:[r.jsx("svg",{className:"nav-icon icon-hover",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("path",{d:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"})}),r.jsx("span",{className:"nav-text",children:"Produção"})]}),(n.role==="manager"||n.role==="admin")&&r.jsxs($,{href:x("manager.dashboard"),active:window.location.pathname.includes("/manager"),className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname.includes("/manager")?"active":""}`,children:[r.jsxs("svg",{className:"nav-icon icon-hover",viewBox:"0 0 24 24",fill:"currentColor",children:[r.jsx("path",{d:"M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z"}),r.jsx("path",{d:"M18 11h-4v2h4v-2zm0 4h-4v2h4v-2z"})]}),r.jsx("span",{className:"nav-text",children:"Gerência"})]}),(n.role==="admin"||n.role==="financeiro")&&r.jsxs(ee,{trigger:r.jsxs(r.Fragment,{children:[r.jsxs("svg",{className:"nav-icon icon-hover",viewBox:"0 0 24 24",fill:"currentColor",children:[r.jsx("path",{d:"M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Z"}),r.jsx("path",{d:"M10 11l2 2 4-4",stroke:"white",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]}),r.jsx("span",{className:"nav-text",children:"Admin"}),r.jsx("svg",{className:"nav-icon ml-1 h-3 w-3",fill:"currentColor",viewBox:"0 0 20 20",children:r.jsx("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"})})]}),children:[r.jsxs(k,{href:x("admin.dashboard"),className:"dropdown-link flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg",children:[r.jsx("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("path",{d:"M13 9V3h8v6h-8ZM3 13V3h8v10H3Zm10 8V11h8v10h-8ZM3 21v-6h8v6H3Z"})}),"Dashboard Admin"]}),r.jsxs(k,{href:x("admin.users.index"),className:"dropdown-link flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg",children:[r.jsx("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("path",{d:"M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z"})}),"Usuários"]}),r.jsxs(k,{href:x("admin.sales.index"),className:"dropdown-link flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg",children:[r.jsx("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("path",{d:"M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4Z"})}),"Painel Financeiro"]}),r.jsxs(k,{href:"/admin/embroidery",className:"dropdown-link flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg",children:[r.jsxs("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"currentColor",children:[r.jsx("path",{d:"M9.5 16a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM9.5 4a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z"}),r.jsx("path",{d:"M6.5 9.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"})]}),"Bordados"]}),n.role==="admin"&&r.jsxs(k,{href:x("admin.permissions.index"),className:"dropdown-link flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg",children:[r.jsx("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("path",{d:"M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Z"})}),"Permissões"]}),["admin","manager"].includes(n.role)&&r.jsxs(k,{href:x("admin.reports.index"),className:"dropdown-link flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg",children:[r.jsx("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("path",{d:"M7 18h2V6H7v12Zm4 0h2v-6h-2v6Zm4 0h2V2h-2v16Z"})}),"Relatórios"]})]}),l()&&r.jsxs(ee,{trigger:r.jsxs(r.Fragment,{children:[r.jsxs("svg",{className:"nav-icon icon-hover",viewBox:"0 0 24 24",fill:"currentColor",children:[r.jsx("path",{d:"M12 2 2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5Z"}),r.jsx("path",{d:"m8 10 4 4 4-4",stroke:"white",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]}),r.jsx("span",{className:"nav-text",children:"Materiais"}),r.jsx("svg",{className:"nav-icon ml-1 h-3 w-3",fill:"currentColor",viewBox:"0 0 20 20",children:r.jsx("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"})})]}),children:[r.jsxs(k,{href:x("admin.materials.index"),className:"dropdown-link flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg",children:[r.jsx("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("path",{d:"M12 2 2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5Z"})}),"Gerenciar Materiais"]}),c()&&r.jsxs(k,{href:x("admin.suppliers.index"),className:"dropdown-link flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg",children:[r.jsx("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("path",{d:"M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z"})}),"Fornecedores"]}),m()&&r.jsxs(k,{href:x("admin.inventory.index"),className:"dropdown-link flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg",children:[r.jsxs("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"currentColor",children:[r.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"}),r.jsx("path",{d:"M14 2v6h6M16 13H8m8 4H8m2-8H8",stroke:"white",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]}),"Transações de Estoque"]})]})]})]}),r.jsxs("div",{className:"hidden md:flex md:items-center md:gap-2 lg:gap-3",children:[r.jsx(ve,{}),r.jsx("div",{className:"relative",children:r.jsxs(L,{children:[r.jsx(L.Trigger,{children:r.jsx("span",{className:"inline-flex rounded-md",children:r.jsx("button",{type:"button",className:"user-dropdown",children:r.jsxs("div",{className:"flex items-center gap-1.5 sm:gap-2 lg:gap-3",children:[r.jsx("div",{className:"user-avatar w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[10px] sm:text-xs",children:n.name.charAt(0).toUpperCase()}),r.jsx("span",{className:"hidden lg:block font-medium text-xs lg:text-sm xl:text-base text-gray-700",children:n.name}),r.jsx("svg",{className:"-me-0.5 ms-1 lg:ms-2 h-3 w-3 lg:h-4 lg:w-4 transition-transform duration-300 group-hover:rotate-180",fill:"currentColor",viewBox:"0 0 20 20",children:r.jsx("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"})})]})})})}),r.jsxs(L.Content,{className:"dropdown-content w-64",children:[r.jsx("div",{className:"dropdown-header",children:r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx("div",{className:"user-avatar w-12 h-12 text-sm",children:n.name.charAt(0).toUpperCase()}),r.jsxs("div",{children:[r.jsx("div",{className:"font-bold text-gray-800",children:n.name}),r.jsx("div",{className:"text-sm text-gray-600",children:n.email}),r.jsxs("div",{className:"text-xs text-purple-600 font-medium mt-1",children:["✨"," ",n.role==="vendedora"?"Vendedora BBKits":n.role==="admin"?"Administrador":n.role==="finance_admin"?"Financeiro Admin":n.role==="production_admin"?"Produção Admin":"Financeiro"]})]})]})}),r.jsxs(L.Link,{href:x("profile.edit"),className:"dropdown-link flex items-center gap-3",children:[r.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),"👤 Meu Perfil"]}),r.jsxs(L.Link,{href:x("logout"),method:"post",as:"button",className:"dropdown-link flex items-center gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 w-full text-left",children:[r.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"})}),"🚪 Sair"]})]})]})})]}),r.jsx("div",{className:"-me-2 flex items-center md:hidden",children:r.jsx("button",{onClick:()=>a(!t),className:"mobile-toggle",children:r.jsxs("div",{className:"relative w-5 h-5 sm:w-6 sm:h-6",children:[r.jsx("div",{className:`absolute inset-0 transition-all duration-300 ${t?"opacity-0 rotate-45":"opacity-100 rotate-0"}`,children:r.jsx("svg",{className:"h-5 w-5 sm:h-6 sm:w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 6h16M4 12h16M4 18h16"})})}),r.jsx("div",{className:`absolute inset-0 transition-all duration-300 ${t?"opacity-100 rotate-0":"opacity-0 -rotate-45"}`,children:r.jsx("svg",{className:"h-5 w-5 sm:h-6 sm:w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})})})]})})})]})}),r.jsxs("div",{className:`md:hidden mobile-menu transition-all duration-500 ease-in-out overflow-hidden ${t?"max-h-screen opacity-100":"max-h-0 opacity-0"}`,children:[r.jsxs("div",{className:"space-y-2 pb-4 pt-4 px-4",children:[r.jsxs(w,{href:x("dashboard"),active:window.location.pathname==="/dashboard",className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[r.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"})}),"Dashboard"]}),r.jsxs(w,{href:x("sales.index"),active:window.location.pathname.includes("/sales"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[r.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"})}),"Minhas Vendas"]}),(n.role==="finance_admin"||n.role==="financeiro"||n.role==="admin")&&r.jsxs(w,{href:x("finance.orders.index"),active:window.location.pathname.includes("/finance"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[r.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"})}),"Financeiro"]}),(n.role==="production_admin"||n.role==="admin")&&r.jsxs(w,{href:x("production.orders.index"),active:window.location.pathname.includes("/production"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[r.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"})}),"Produção"]}),(n.role==="admin"||n.role==="financeiro")&&r.jsxs(r.Fragment,{children:[r.jsxs(w,{href:x("admin.dashboard"),active:window.location.pathname==="/admin/dashboard",className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[r.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"})}),"Admin Dashboard"]}),(n.role==="manager"||n.role==="admin")&&r.jsxs(w,{href:x("manager.dashboard"),active:window.location.pathname.includes("/manager"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[r.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})}),"Dashboard Gerencial"]}),r.jsxs(w,{href:x("admin.users.index"),active:window.location.pathname==="/admin/users",className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[r.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M19 7.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"})}),"Gerenciar Usuários"]}),r.jsxs(w,{href:x("admin.sales.index"),active:window.location.pathname.includes("/admin/sales"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[r.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})}),"Painel Financeiro"]}),r.jsxs(w,{href:"/admin/embroidery",active:window.location.pathname.includes("/admin/embroidery"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[r.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"})}),"Gerenciar Bordados"]}),l()&&r.jsxs(w,{href:x("admin.materials.index"),active:window.location.pathname.includes("/admin/materials"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[r.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"})}),"Gerenciar Materiais"]}),c()&&r.jsxs(w,{href:x("admin.suppliers.index"),active:window.location.pathname.includes("/admin/suppliers"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[r.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})}),"Gerenciar Fornecedores"]}),m()&&r.jsxs(w,{href:x("admin.inventory.index"),active:window.location.pathname.includes("/admin/inventory"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[r.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"})}),"Transações de Estoque"]}),n.role==="admin"&&r.jsxs(w,{href:x("admin.permissions.index"),active:window.location.pathname.includes("/admin/permissions"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[r.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"})}),"Gerenciar Permissões"]})]})]}),r.jsxs("div",{className:"border-t border-pink-200 mx-4 py-4",children:[r.jsx("div",{className:"px-4 pb-4",children:r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx("div",{className:"user-avatar w-12 h-12 text-sm",children:n.name.charAt(0).toUpperCase()}),r.jsxs("div",{children:[r.jsx("div",{className:"text-base font-bold text-gray-800",children:n.name}),r.jsx("div",{className:"text-sm text-gray-600",children:n.email}),r.jsxs("div",{className:"text-xs text-purple-600 font-medium mt-1",children:["✨"," ",n.role==="vendedora"?"Vendedora BBKits":n.role==="admin"?"Administrador":n.role==="finance_admin"?"Financeiro Admin":n.role==="production_admin"?"Produção Admin":"Financeiro"]})]})]})}),r.jsxs("div",{className:"space-y-2",children:[r.jsxs(w,{href:x("profile.edit"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[r.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),"👤 Meu Perfil"]}),r.jsxs(w,{method:"post",href:x("logout"),as:"button",className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 w-full text-left",children:[r.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"})}),"🚪 Sair"]})]})]})]})]}),i&&r.jsx("header",{className:"header-section mt-12 sm:mt-14 md:mt-15 lg:mt-16 border-b border-pink-100/50 relative z-10",children:r.jsx("div",{className:"mx-auto max-w-7xl px-4 py-4 sm:py-5 md:py-6 sm:px-6 lg:px-8 relative z-10",children:r.jsx("div",{className:"animate-fadeInUp",children:i})})}),r.jsx("main",{className:"pt-12 sm:pt-14 md:pt-15 lg:pt-16 min-h-screen main-content",children:r.jsx("div",{className:"animate-fadeInUp delay-200 relative z-10",children:e})})]})]})}export{Ke as A,x as s};
