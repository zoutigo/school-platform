(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[2],{1163:function(e,n,t){"use strict";t.d(n,"a",(function(){return l})),t.d(n,"b",(function(){return d})),t.d(n,"c",(function(){return s}));var r=t(1),i=t.n(r),o=t(15),u=function(){return u=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e},u.apply(this,arguments)},c=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)n.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(t[r[i]]=e[r[i]])}return t},a=i.a.createContext(null),l=function(e){var n=e.store,t=c(e,["store"]);return i.a.createElement(o.a,u({store:n,context:a},t))},d=(Object(o.d)(a),Object(o.b)(a)),s=Object(o.c)(a)},1173:function(e,n,t){"use strict";t.d(n,"h",(function(){return r})),t.d(n,"g",(function(){return i})),t.d(n,"e",(function(){return o})),t.d(n,"d",(function(){return u})),t.d(n,"b",(function(){return c})),t.d(n,"c",(function(){return a})),t.d(n,"f",(function(){return l})),t.d(n,"a",(function(){return d})),t.d(n,"j",(function(){return f})),t.d(n,"k",(function(){return p})),t.d(n,"i",(function(){return y}));var r="SET_DISPLAY_REFERENCE_NODE_ID",i="SET_DISPLAY_MODE",o="preview",u="layout",c="edit",a="insert",l="resizing",d=c,s=function(e,n){return function(){return{type:i,ts:new Date,mode:e,referenceNodeId:n}}},f=function(e){return{type:r,ts:new Date,referenceNodeId:e}},p=function(e,n){return{type:i,ts:new Date,mode:e,referenceNodeId:n}},y=(s(a),s(c));s(o),s(u),s(l)},1194:function(e,n,t){"use strict";var r;t.d(n,"a",(function(){return r})),t.d(n,"b",(function(){return i})),function(e){e.LEFT_OF="left-of",e.RIGHT_OF="right-of",e.ABOVE="above",e.BELOW="below",e.INLINE_LEFT="inline-left",e.INLINE_RIGHT="inline-right"}(r||(r={}));var i=!0},1204:function(e,n,t){"use strict";t.d(n,"b",(function(){return a})),t.d(n,"a",(function(){return l}));var r=t(372),i=function(e){var n="function"===typeof Symbol&&Symbol.iterator,t=n&&e[n],r=0;if(t)return t.call(e);if(e&&"number"===typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")},o=function(e,n){var t="function"===typeof Symbol&&e[Symbol.iterator];if(!t)return e;var r,i,o=t.call(e),u=[];try{for(;(void 0===n||n-- >0)&&!(r=o.next()).done;)u.push(r.value)}catch(c){i={error:c}}finally{try{r&&!r.done&&(t=o.return)&&t.call(o)}finally{if(i)throw i.error}}return u},u=function(){for(var e=[],n=0;n<arguments.length;n++)e=e.concat(o(arguments[n]));return e},c=function e(n,t,o){var c,a;void 0===o&&(o=[]);try{for(var l=i(n),d=l.next();!d.done;d=l.next()){var s=d.value;if(s.id===t)return{node:s,ancestors:o};if(Object(r.a)(s)&&s.cells){if(f=e(s.cells,t,u([s],o)))return f}else if(!Object(r.a)(s)&&s.rows){var f;if(f=e(s.rows,t,u([s],o)))return f}}}catch(p){c={error:p}}finally{try{d&&!d.done&&(a=l.return)&&a.call(l)}finally{if(c)throw c.error}}return null},a=function(e,n){var t,r;if(e.reactPage.__nodeCache||(e.reactPage.__nodeCache={}),e.reactPage.__nodeCache[n])return e.reactPage.__nodeCache[n];var i=c(null===(r=null===(t=e.reactPage.values)||void 0===t?void 0:t.present)||void 0===r?void 0:r.rows,n);return e.reactPage.__nodeCache[n]=i,i},l=function(e){var n,t;return null===(t=null===(n=null===e||void 0===e?void 0:e.reactPage)||void 0===n?void 0:n.values)||void 0===t?void 0:t.present}},1205:function(e,n,t){"use strict";t.d(n,"g",(function(){return o})),t.d(n,"f",(function(){return u})),t.d(n,"d",(function(){return c})),t.d(n,"e",(function(){return a})),t.d(n,"c",(function(){return l})),t.d(n,"a",(function(){return d})),t.d(n,"b",(function(){return s})),t.d(n,"n",(function(){return f})),t.d(n,"m",(function(){return p})),t.d(n,"k",(function(){return y})),t.d(n,"l",(function(){return v})),t.d(n,"j",(function(){return b})),t.d(n,"i",(function(){return g})),t.d(n,"h",(function(){return O}));var r=t(1206),i=function(){return i=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e},i.apply(this,arguments)},o="CELL_UPDATE_IS_DRAFT",u="CELL_UPDATE_DATA",c="CELL_REMOVE",a="CELL_RESIZE",l="CELL_FOCUS",d="CELL_BLUR",s="CELL_BLUR_ALL",f=function(e,n,t){return void 0===n&&(n=!1),void 0===t&&(t=null),{type:o,ts:new Date,id:e,isDraft:n,lang:t}},p=function(e){return function(n,t){return i({type:u,ts:new Date,id:e,data:n},t)}},y=function(e,n){return void 0===n&&(n=null),{type:c,ts:new Date,id:e,ids:n||Object(r.a)()}},v=function(e){return function(n){return void 0===n&&(n=1),{type:a,ts:new Date,id:e,size:n}}},b=function(e,n,t){return void 0===n&&(n=!1),void 0===t&&(t=void 0),{type:l,ts:new Date,id:e,scrollToCell:n,source:t}},g=function(e){return{type:d,ts:new Date,id:e}},O=function(){return{type:s,ts:new Date}}},1206:function(e,n,t){"use strict";t.d(n,"a",(function(){return i}));var r=t(232),i=function(){return{cell:Object(r.a)(),item:Object(r.a)(),others:[Object(r.a)(),Object(r.a)(),Object(r.a)()]}}},1207:function(e,n,t){"use strict";t.d(n,"a",(function(){return f})),t.d(n,"d",(function(){return p})),t.d(n,"g",(function(){return y})),t.d(n,"h",(function(){return v})),t.d(n,"e",(function(){return b})),t.d(n,"f",(function(){return g})),t.d(n,"c",(function(){return O})),t.d(n,"b",(function(){return h})),t.d(n,"l",(function(){return w})),t.d(n,"j",(function(){return E})),t.d(n,"q",(function(){return I})),t.d(n,"n",(function(){return T})),t.d(n,"m",(function(){return A})),t.d(n,"p",(function(){return P})),t.d(n,"k",(function(){return S})),t.d(n,"o",(function(){return L})),t.d(n,"i",(function(){return N}));var r=t(232),i=t(261),o=t(260),u=t(168),c=t(1173),a=t(1206),l=t(1205),d=function(){return d=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e},d.apply(this,arguments)},s=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)n.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(t[r[i]]=e[r[i]])}return t},f="CELL_INSERT_ABOVE",p="CELL_INSERT_BELOW",y="CELL_INSERT_LEFT_OF",v="CELL_INSERT_RIGHT_OF",b="CELL_INSERT_INLINE_LEFT",g="CELL_INSERT_INLINE_RIGHT",O="CELL_INSERT_AT_END",h="CELL_INSERT_AS_NEW_ROW",m=function(e,n){var t;return Array.isArray(e)?{id:Object(r.a)(),cells:e.map((function(e){return j(e,n)}))}:Object(u.a)(d(d({id:Object(r.a)()},e),{cells:null===(t=e.cells)||void 0===t?void 0:t.map((function(e){return j(e,n)}))}))},j=function(e,n){var t,c,a,l,s,f,p,y,v,b,g,O=n.cellPlugins,h=n.lang,j=e.plugin&&("string"==typeof e.plugin?e.plugin:e.plugin.id),_=j&&O.find((function(e){return e.id===j})),w=(null===(c=e.rows)||void 0===c?void 0:c.length)>0?e.rows:null!==(l=null===(a=null===_||void 0===_?void 0:_.createInitialChildren)||void 0===a?void 0:a.call(_))&&void 0!==l?l:[],E=d(((t={})[h]=null!==(v=null!==(p=null!==(s=null===e||void 0===e?void 0:e.data)&&void 0!==s?s:null===(f=null===_||void 0===_?void 0:_.createInitialData)||void 0===f?void 0:f.call(_,e))&&void 0!==p?p:null===(y=null===_||void 0===_?void 0:_.createInitialState)||void 0===y?void 0:y.call(_,e))&&void 0!==v?v:null,t),null!==(b=e.dataI18n)&&void 0!==b?b:{});return Object(u.a)({id:null!==(g=e.id)&&void 0!==g?g:Object(r.a)(),isDraft:e.isDraft,isDraftI18n:e.isDraftI18n,inline:e.inline,size:e.size||12,hasInlineNeighbour:e.hasInlineNeighbour,plugin:_?{id:_.id,version:_.version}:void 0,rows:null===w||void 0===w?void 0:w.map((function(e){return m(e,{lang:h,cellPlugins:Object(i.b)(O,{pluginId:j,data:Object(o.a)({dataI18n:E},h)})})})),dataI18n:E})},_=function(e){return function(n){return function(t,r,i,o){var u,d=r.id,s=r.inline,b=r.hasInlineNeighbour,g=r.ancestorIds;void 0===i&&(i=0),void 0===o&&(o=null);var O=i,h=j(t,n);switch(e){case f:case p:case y:case v:(s||b)&&i<1&&(O=1)}var m={type:e,ts:new Date,item:h,hoverId:0===i?d:null!==(u=g[Math.max(i-1)])&&void 0!==u?u:d,level:O,ids:o||Object(a.a)()};return function(e){e(m),(!t.id||n.focusAfter)&&(e(Object(c.i)()),setTimeout((function(){e(Object(l.j)(m.ids.item,!0))}),300))}}}},w=_(p),E=_(f),I=_(v),T=_(y),A=_(b),P=_(g),S=_(O),L=_(h),D=function e(n){n.id;var t=s(n,["id"]);return d(d({},t),{dataI18n:t.dataI18n?JSON.parse(JSON.stringify(t.dataI18n)):{},id:Object(r.a)(),rows:t.rows?t.rows.map((function(n){return d(d({},n),{id:Object(r.a)(),cells:n.cells?n.cells.map(e):void 0})})):void 0})},N=function(e){return function(n){var t;return w(e)(D(n),{ancestorIds:[],id:n.id,hasInlineNeighbour:n.hasInlineNeighbour,inline:n.inline,levels:null,pluginId:null===(t=n.plugin)||void 0===t?void 0:t.id})}}},1208:function(e,n,t){"use strict";t.d(n,"a",(function(){return r})),t.d(n,"b",(function(){return i}));var r="SET_LANG",i=function(e){return{type:r,lang:e}}},1239:function(e,n,t){"use strict";t.d(n,"d",(function(){return s})),t.d(n,"a",(function(){return f})),t.d(n,"f",(function(){return p})),t.d(n,"g",(function(){return y})),t.d(n,"e",(function(){return v})),t.d(n,"b",(function(){return b})),t.d(n,"c",(function(){return g}));var r=t(1),i=t.n(r),o=t(1240),u=t(1163),c=function(e){return e.reactPage.settings.lang},a=t(271),l=t(380),d=function(){return d=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e},d.apply(this,arguments)},s=function(){return Object(r.useContext)(o.a)},f=Object(r.createContext)({allowMoveInEditMode:!0,allowResizeInEditMode:!0,cellPlugins:[],languages:[],pluginsWillChange:!1}),p=function(){return Object(r.useContext)(f)},y=function(){var e=p().uiTranslator;return{t:function(n){var t;return null!==(t=null===e||void 0===e?void 0:e(n))&&void 0!==t?t:n}}},v=function(){return Object(u.c)(c)},b=function(){return Object(a.b)(p().cellSpacing)},g=function(e){var n=p(),t=i.a.useMemo((function(){return d(d({},n),{cellSpacing:Object(a.b)(e)})}),[n,JSON.stringify(e)]);return"undefined"===typeof e||null==e?[l.a,void 0]:[f.Provider,t]}},1240:function(e,n,t){"use strict";t.d(n,"a",(function(){return p})),t.d(n,"b",(function(){return v}));var r=t(81),i=t(364),o=t(1291),u=t(1194),c=function(e,n){var t="function"===typeof Symbol&&e[Symbol.iterator];if(!t)return e;var r,i,o=t.call(e),u=[];try{for(;(void 0===n||n-- >0)&&!(r=o.next()).done;)u.push(r.value)}catch(c){i={error:c}}finally{try{r&&!r.done&&(t=o.return)&&t.call(o)}finally{if(i)throw i.error}}return u},a=function(){for(var e=[],n=0;n<arguments.length;n++)e=e.concat(c(arguments[n]));return e},l=t(1208),d=t(1204),s=t(1),f=t(232),p=Object(s.createContext)(null),y=function(){function e(e){var n=this,t=e.middleware,c=void 0===t?[]:t,l=e.store,s=e.initialState;this.getNodeWithAncestors=function(e){return Object(d.b)(n.store.getState(),e)},this.getNode=function(e){var t;return null===(t=Object(d.b)(n.store.getState(),e))||void 0===t?void 0:t.node},this.store=l||function(e,n){void 0===n&&(n=[]);var t=!u.b&&"object"===typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):r.c;return Object(r.d)(o.a,e,t(r.a.apply(void 0,a(n,[i.a]))))}(s,c),this.middleware=c}return e.prototype.setLang=function(e){this.store.dispatch(Object(l.b)(e))},e}(),v=function(){return{id:Object(f.a)(),rows:[]}};n.c=y},1248:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"ActionTypes",{enumerable:!0,get:function(){return i.ActionTypes}}),Object.defineProperty(n,"ActionCreators",{enumerable:!0,get:function(){return i.ActionCreators}}),Object.defineProperty(n,"parseActions",{enumerable:!0,get:function(){return o.parseActions}}),Object.defineProperty(n,"isHistory",{enumerable:!0,get:function(){return o.isHistory}}),Object.defineProperty(n,"includeAction",{enumerable:!0,get:function(){return o.includeAction}}),Object.defineProperty(n,"excludeAction",{enumerable:!0,get:function(){return o.excludeAction}}),Object.defineProperty(n,"combineFilters",{enumerable:!0,get:function(){return o.combineFilters}}),Object.defineProperty(n,"groupByActionTypes",{enumerable:!0,get:function(){return o.groupByActionTypes}}),Object.defineProperty(n,"newHistory",{enumerable:!0,get:function(){return o.newHistory}}),Object.defineProperty(n,"default",{enumerable:!0,get:function(){return u.default}});var r,i=t(1249),o=t(1250),u=(r=t(1309))&&r.__esModule?r:{default:r}},1249:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.ActionCreators=n.ActionTypes=void 0;var r={UNDO:"@@redux-undo/UNDO",REDO:"@@redux-undo/REDO",JUMP_TO_FUTURE:"@@redux-undo/JUMP_TO_FUTURE",JUMP_TO_PAST:"@@redux-undo/JUMP_TO_PAST",JUMP:"@@redux-undo/JUMP",CLEAR_HISTORY:"@@redux-undo/CLEAR_HISTORY"};n.ActionTypes=r;var i={undo:function(){return{type:r.UNDO}},redo:function(){return{type:r.REDO}},jumpToFuture:function(e){return{type:r.JUMP_TO_FUTURE,index:e}},jumpToPast:function(e){return{type:r.JUMP_TO_PAST,index:e}},jump:function(e){return{type:r.JUMP,index:e}},clearHistory:function(){return{type:r.CLEAR_HISTORY}}};n.ActionCreators=i},1250:function(e,n,t){"use strict";function r(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Array.isArray(e)?e:"string"===typeof e?[e]:n}Object.defineProperty(n,"__esModule",{value:!0}),n.parseActions=r,n.isHistory=function(e){return"undefined"!==typeof e.present&&"undefined"!==typeof e.future&&"undefined"!==typeof e.past&&Array.isArray(e.future)&&Array.isArray(e.past)},n.includeAction=function(e){var n=r(e);return function(e){return n.indexOf(e.type)>=0}},n.excludeAction=function(e){var n=r(e);return function(e){return n.indexOf(e.type)<0}},n.combineFilters=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return n.reduce((function(e,n){return function(t,r,i){return e(t,r,i)&&n(t,r,i)}}),(function(){return!0}))},n.groupByActionTypes=function(e){var n=r(e);return function(e){return n.indexOf(e.type)>=0?e.type:null}},n.newHistory=function(e,n,t){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return{past:e,present:n,future:t,group:r,_latestUnfiltered:n,index:e.length,limit:e.length+t.length+1}}},1251:function(e,n,t){"use strict";function r(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var i,o;Object.defineProperty(n,"__esModule",{value:!0}),n.set=function(e){i=e},n.start=function(e,n){void(o={header:[],prev:[],action:[],next:[],msgs:[]}),i&&(console.group?(o.header=["%credux-undo","font-style: italic","action",e.type],o.action=l("action",c,e),o.prev=l("prev history",u,n)):(o.header=["redux-undo action",e.type],o.action=["action",e],o.prev=["prev history",n]))},n.end=function(e){i&&(console.group?o.next=l("next history",a,e):o.next=["next history",e],function(){var e=o,n=e.header,t=e.prev,i=e.next,u=e.action,c=e.msgs;if(console.group){var a,l,d,s,f;(a=console).groupCollapsed.apply(a,r(n)),(l=console).log.apply(l,r(t)),(d=console).log.apply(d,r(u)),(s=console).log.apply(s,r(i)),(f=console).log.apply(f,r(c)),console.groupEnd()}else{var p,y,v,b,g;(p=console).log.apply(p,r(n)),(y=console).log.apply(y,r(t)),(v=console).log.apply(v,r(u)),(b=console).log.apply(b,r(i)),(g=console).log.apply(g,r(c))}}())},n.log=function(){if(i){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];o.msgs=o.msgs.concat([].concat(n,["\n"]))}};var u="#9E9E9E",c="#03A9F4",a="#4CAF50";function l(e,n,t){return["%c".concat(e),"color: ".concat(n,"; font-weight: bold"),t]}},1252:function(e,n,t){"use strict";t.d(n,"a",(function(){return i})),t.d(n,"b",(function(){return o}));var r=t(1206),i="UPDATE_VALUE",o=function(e){return{type:i,ts:new Date,value:e,ids:Object(r.a)()}}},1291:function(e,n,t){"use strict";t.d(n,"b",(function(){return L}));var r=t(81),i=t(1248),o=t.n(i),u=t(1251),c=t(1205),a=t(1207),l=t(1252),d=t(1194),s=t(503),f=t(232),p=t(168),y=t(190),v=t(361),b=function(){return b=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e},b.apply(this,arguments)},g=function(e,n){var t="function"===typeof Symbol&&e[Symbol.iterator];if(!t)return e;var r,i,o=t.call(e),u=[];try{for(;(void 0===n||n-- >0)&&!(r=o.next()).done;)u.push(r.value)}catch(c){i={error:c}}finally{try{r&&!r.done&&(t=o.return)&&t.call(o)}finally{if(i)throw i.error}}return u},O=function(){for(var e=[],n=0;n<arguments.length;n++)e=e.concat(g(arguments[n]));return e},h=function(e,n,t){void 0===e&&(e=[]),void 0===t&&(t=0);var r=0===t&&0===e.length?[{id:Object(f.a)(),rows:[{id:Object(f.a)(),cells:[]}]}]:e;switch(n.type){case c.e:r=Object(v.c)(r,n);break;case a.c:case a.b:case a.d:case a.a:r=r.filter((function(e){return e.id!==n.item.id}));break;case a.g:r=r.filter((function(e){return e.id!==n.item.id})).map((function(e){return n.hoverId===e.id?[b(b({},n.item),{id:n.ids.item,inline:null}),b(b({},e),{id:n.ids.others[0]})]:[e]})).reduce(y.a,[]);break;case a.h:r=r.filter((function(e){return e.id!==n.item.id})).map((function(e){return n.hoverId===e.id?[b(b({},e),{id:n.ids.others[0]}),b(b({},n.item),{id:n.ids.item,inline:null})]:[e]})).reduce(y.a,[]);break;case a.f:case a.e:r=r.filter((function(e){return e.id!==n.item.id})).map((function(e){return n.hoverId===e.id?[{id:n.ids.cell,rows:[{id:n.ids.others[0],cells:[b(b({},n.item),{inline:n.type===a.f?"right":"left",id:n.ids.item,size:0}),b(b({},e),{id:n.ids.others[1],inline:null,hasInlineNeighbour:n.ids.item,size:0})]}]}]:[e]})).reduce(y.a,[]);break;case c.d:r=r.filter((function(e){return e.id!==n.id}))}var i=r.map((function(e){return function(e,n,t){return Object(y.b)(function(e,n){var r,i,o,u,l,d=function(){return Object(p.a)(b(b({},e),{rows:j(e.rows,n,t+1)}))};switch(n.type){case c.g:if(n.id===e.id){var s=d();return n.lang?b(b({},s),{isDraftI18n:b(b({},null!==(o=s.isDraftI18n)&&void 0!==o?o:{}),(r={},r[n.lang]=n.isDraft,r))}):b(b({},s),{isDraft:n.isDraft})}return d();case c.f:if(n.id===e.id){s=d();var f=b({},null!==(u=s.dataI18n)&&void 0!==u?u:{}),y=null===n.data;return n.lang&&y&&(null===f||void 0===f||delete f[n.lang]),b(b({},s),{dataI18n:b(b({},null!==f&&void 0!==f?f:{}),y?{}:(i={},i[n.lang]=n.data,i))})}return d();case a.a:return n.hoverId===e.id?{id:n.ids.cell,rows:j([{id:n.ids.others[0],cells:[b(b({},n.item),{id:n.ids.item,inline:null})]},{id:n.ids.others[1],cells:[b(b({},d()),{id:n.ids.others[2]})]}],b(b({},n),{hoverId:null}),t+1)}:d();case a.d:return n.hoverId===e.id?{id:n.ids.cell,rows:j([{id:n.ids.others[0],cells:[b(b({},d()),{id:n.ids.others[1]})]},{id:n.ids.others[2],cells:[b(b({},n.item),{id:n.ids.item,inline:null})]}],b(b({},n),{hoverId:null}),t+1)}:d();case a.b:return n.hoverId===e.id?b(b({},e),{rows:O(null!==(l=e.rows)&&void 0!==l?l:[],[{id:n.ids.others[1],cells:[b(b({},n.item),{id:n.ids.item,inline:null})]}])}):d();default:return d()}}(e,n))}(e,n,t)}));return Object(y.c)(i)},m=function(e,n,t){return Object(y.d)(function(e,n){var r=function(){return b(b({},e),{cells:h(e.cells,n,t+1)})};switch(n.type){case a.g:return n.hoverId!==e.id?r():b(b({},e),{cells:h(O([b(b({},n.item),{id:n.ids.item,inline:null})],e.cells),b(b({},n),{hoverId:null}),t+1)});case a.h:return n.hoverId!==e.id?r():b(b({},e),{cells:h(O(e.cells,[b(b({},n.item),{id:n.ids.item,inline:null})]),b(b({},n),{hoverId:null}),t+1)});default:return r()}}(e,n))},j=function(e,n,t){return void 0===e&&(e=[]),void 0===t&&(t=0),Object(y.e)(function(e,n){switch(n.type){case a.a:return e.map((function(e){return n.hoverId===e.id?[{cells:[b(b({},n.item),{id:n.ids.item,inline:null})],id:n.ids.others[0]},b(b({},e),{id:n.ids.others[1]})]:[e]})).reduce(y.a,[]).map((function(e){return m(e,n,t)}));case a.d:return e.map((function(e){return n.hoverId===e.id?[b(b({},e),{id:n.ids.others[0]}),{cells:[b(b({},n.item),{id:n.ids.item,inline:null})],id:n.ids.others[1]}]:[e]})).reduce(y.a,[]).map((function(e){return m(e,n,t)}));case a.c:return(0!==t?e:O(e,[{cells:[b(b({},n.item),{id:n.ids.item,inline:null})],id:n.ids.others[1]}])).map((function(e){return m(e,n,t)}));default:return e.map((function(e){return m(e,n,t)}))}}(e,n))},_=function(){return _=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e},_.apply(this,arguments)};d.b||Object(u.set)(!0);var w=o()((function(e,n){if("UPDATE_VALUE"===n.type)return n.value;var t=(null===e||void 0===e?void 0:e.rows)?Object(s.a)(j(e.rows,n,0)):[];return _(_({},e),{rows:t})}),{filter:function(e,n,t){var r;return!(null===(r=e)||void 0===r?void 0:r.notUndoable)&&[l.a,c.f,c.d,c.e,a.a,a.d,a.g,a.h,a.e,a.f,a.c,a.b].indexOf(e.type)>=0},neverSkipReducer:!0,syncFilter:!0}),E=t(1173),I=function(){return I=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e},I.apply(this,arguments)},T=t(1473),A=t(1208),P=function(){return P=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e},P.apply(this,arguments)},S=Object(r.b)({values:w,display:function(e,n){switch(void 0===e&&(e={mode:E.a}),n.type){case E.h:return I(I({},e),{referenceNodeId:n.referenceNodeId});case c.b:return{mode:e.mode,referenceNodeId:null};case E.g:return{mode:n.mode,referenceNodeId:n.referenceNodeId||e.referenceNodeId};default:return e}},focus:function(e,n){switch(void 0===e&&(e=null),n.type){case c.c:return{nodeId:n.id,source:n.source,scrollToCell:n.scrollToCell?(new Date).getTime():null};case c.b:return null;case c.a:return n.id===(null===e||void 0===e?void 0:e.nodeId)?null:e;default:return e}},settings:function(e,n){return void 0===e&&(e={lang:null}),n.type===A.a?P(P({},e),{lang:n.lang}):e},hover:function(e,n){switch(void 0===e&&(e=null),n.type){case T.a:return{nodeId:n.hoverId,position:n.position};case T.b:return null;default:return e}},__nodeCache:function(){return null}});n.a=Object(r.b)({reactPage:S});function L(e,n){return{reactPage:{__nodeCache:{},hover:null,focus:null,display:{mode:"edit"},settings:{lang:n},values:{past:[],present:e,future:[]}}}}},1309:function(e,n,t){"use strict";function r(e){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};i.set(n.debug);var t,r=l({limit:void 0,filter:function(){return!0},groupBy:function(){return null},undoType:o.ActionTypes.UNDO,redoType:o.ActionTypes.REDO,jumpToPastType:o.ActionTypes.JUMP_TO_PAST,jumpToFutureType:o.ActionTypes.JUMP_TO_FUTURE,jumpType:o.ActionTypes.JUMP,neverSkipReducer:!1,ignoreInitialState:!1,syncFilter:!1},n,{initTypes:(0,u.parseActions)(n.initTypes,["@@redux-undo/INIT"]),clearHistoryType:(0,u.parseActions)(n.clearHistoryType,[o.ActionTypes.CLEAR_HISTORY])}),c=r.neverSkipReducer?function(n,t){for(var r=arguments.length,i=new Array(r>2?r-2:0),o=2;o<r;o++)i[o-2]=arguments[o];return l({},n,{present:e.apply(void 0,[n.present,t].concat(i))})}:function(e){return e};return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};i.start(o,n);for(var a,l=n,d=arguments.length,s=new Array(d>2?d-2:0),O=2;O<d;O++)s[O-2]=arguments[O];if(!t){if(i.log("history is uninitialized"),void 0===n){var h={type:"@@redux-undo/CREATE_HISTORY"},m=e.apply(void 0,[n,h].concat(s));return l=f(m,r.ignoreInitialState),i.log("do not set initialState on probe actions"),i.end(l),l}(0,u.isHistory)(n)?(l=t=r.ignoreInitialState?n:(0,u.newHistory)(n.past,n.present,n.future),i.log("initialHistory initialized: initialState is a history",t)):(l=t=f(n,r.ignoreInitialState),i.log("initialHistory initialized: initialState is not a history",t))}switch(o.type){case void 0:return l;case r.undoType:return a=b(l,-1),i.log("perform undo"),i.end(a),c.apply(void 0,[a,o].concat(s));case r.redoType:return a=b(l,1),i.log("perform redo"),i.end(a),c.apply(void 0,[a,o].concat(s));case r.jumpToPastType:return a=v(l,o.index),i.log("perform jumpToPast to ".concat(o.index)),i.end(a),c.apply(void 0,[a,o].concat(s));case r.jumpToFutureType:return a=y(l,o.index),i.log("perform jumpToFuture to ".concat(o.index)),i.end(a),c.apply(void 0,[a,o].concat(s));case r.jumpType:return a=b(l,o.index),i.log("perform jump to ".concat(o.index)),i.end(a),c.apply(void 0,[a,o].concat(s));case g(o.type,r.clearHistoryType):return a=f(l.present,r.ignoreInitialState),i.log("perform clearHistory"),i.end(a),c.apply(void 0,[a,o].concat(s));default:if(a=e.apply(void 0,[l.present,o].concat(s)),r.initTypes.some((function(e){return e===o.type})))return i.log("reset history due to init action"),i.end(t),t;if(l._latestUnfiltered===a)return l;var j="function"===typeof r.filter&&!r.filter(o,a,l);if(j){var _=(0,u.newHistory)(l.past,a,l.future,l.group);return r.syncFilter||(_._latestUnfiltered=l._latestUnfiltered),i.log("filter ignored action, not storing it in past"),i.end(_),_}var w=r.groupBy(o,a,l);if(null!=w&&w===l.group){var E=(0,u.newHistory)(l.past,a,l.future,l.group);return i.log("groupBy grouped the action with the previous action"),i.end(E),E}return l=p(l,a,r.limit,w),i.log("inserted new state into history"),i.end(l),l}}};var i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==r(e)&&"function"!==typeof e)return{default:e};var n=c();if(n&&n.has(e))return n.get(e);var t={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var u=i?Object.getOwnPropertyDescriptor(e,o):null;u&&(u.get||u.set)?Object.defineProperty(t,o,u):t[o]=e[o]}t.default=e,n&&n.set(e,t);return t}(t(1251)),o=t(1249),u=t(1250);function c(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return c=function(){return e},e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){d(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function d(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function f(e,n){var t=(0,u.newHistory)([],e,[]);return n&&(t._latestUnfiltered=null),t}function p(e,n,t,r){var o=e.past.length+1;i.log("inserting",n),i.log("new free: ",t-o);var c=e.past,a=e._latestUnfiltered,l=t&&t<=o,d=c.slice(l?1:0),f=null!=a?[].concat(s(d),[a]):d;return(0,u.newHistory)(f,n,[],r)}function y(e,n){if(n<0||n>=e.future.length)return e;var t=e.past,r=e.future,i=e._latestUnfiltered,o=[].concat(s(t),[i],s(r.slice(0,n))),c=r[n],a=r.slice(n+1);return(0,u.newHistory)(o,c,a)}function v(e,n){if(n<0||n>=e.past.length)return e;var t=e.past,r=e.future,i=e._latestUnfiltered,o=t.slice(0,n),c=[].concat(s(t.slice(n+1)),[i],s(r)),a=t[n];return(0,u.newHistory)(o,a,c)}function b(e,n){return n>0?y(e,n-1):n<0?v(e,e.past.length+n):e}function g(e,n){return n.indexOf(e)>-1?e:!e}},1473:function(e,n,t){"use strict";t.d(n,"a",(function(){return i})),t.d(n,"b",(function(){return o})),t.d(n,"h",(function(){return c})),t.d(n,"i",(function(){return a})),t.d(n,"d",(function(){return l})),t.d(n,"e",(function(){return d})),t.d(n,"f",(function(){return s})),t.d(n,"g",(function(){return f})),t.d(n,"k",(function(){return p})),t.d(n,"j",(function(){return y})),t.d(n,"c",(function(){return v}));var r=t(1194),i="CELL_DRAG_HOVER",o="CLEAR_CLEAR_HOVER",u=function(e,n,t,r){var o;void 0===t&&(t=0);var u=0===t?n.id:null!==(o=n.ancestorIds[Math.max(0,t-1)])&&void 0!==o?o:n.id;return{type:i,ts:new Date,dragId:e.id,hoverId:u,level:t,position:r}},c=function(e,n,t){return u(e,n,t,r.a.LEFT_OF)},a=function(e,n,t){return u(e,n,t,r.a.RIGHT_OF)},l=function(e,n,t){return u(e,n,t,r.a.ABOVE)},d=function(e,n,t){return u(e,n,t,r.a.BELOW)},s=function(e,n){return u(e,n,0,r.a.INLINE_LEFT)},f=function(e,n){return u(e,n,0,r.a.INLINE_RIGHT)},p=function(e){return{type:"CELL_DRAG",ts:new Date,id:e}},y=function(){return{type:o,ts:new Date}},v=function(){return{type:"CELL_DRAG_CANCEL",ts:new Date}}}}]);
//# sourceMappingURL=2.66ea09f0.chunk.js.map