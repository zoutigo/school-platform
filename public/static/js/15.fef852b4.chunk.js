(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[15],{1221:function(e,t,n){"use strict";var o=n(34),r=n(35);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(1)),i=(0,o(n(36)).default)(a.createElement("path",{d:"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"}),"Done");t.default=i},1238:function(e,t,n){"use strict";var o=n(1),r=n.n(o),a=n(1160),i=n(1158),l=n(1192),c=n(1168),u=function(e,t){var n=Object(c.b)(e,t);if(n){var o=n[0];return"component"===t.pluginType&&"mark"===t.object?o[t.type]:o.data}return t.getInitialData?t.getInitialData():{}},s=function(e,t){var n="function"===typeof Symbol&&e[Symbol.iterator];if(!n)return e;var o,r,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(o=a.next()).done;)i.push(o.value)}catch(l){r={error:l}}finally{try{o&&!o.done&&(n=a.return)&&n.call(a)}finally{if(r)throw r.error}}return i},d=n(1172),f=n(1108),p=n(1109),v=n(1110),h=n(1055),b=n(1149),m=n(231),y=n.n(m),O=n(1221),g=n.n(O),j=n(604),w=n(1476),E=function(e,t){var n="function"===typeof Symbol&&e[Symbol.iterator];if(!n)return e;var o,r,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(o=a.next()).done;)i.push(o.value)}catch(l){r={error:l}}finally{try{o&&!o.done&&(n=a.return)&&n.call(a)}finally{if(r)throw r.error}}return i};var C=function(e){var t=e.schema?Object(j.a)(e.schema):null,n=Boolean(e.schema),a=Object(o.useRef)(),i=E(Object(o.useState)(null),2),l=i[0],c=i[1],u=Object(o.useCallback)((function(t){e.close(),e.shouldInsertWithText?e.add({text:l,data:t}):e.add({data:t})}),[e.shouldInsertWithText,l]),s=Object(o.useCallback)((function(){a.current&&a.current.submit()}),[a.current]),d=Object(o.useCallback)((function(){t?s():u({})}),[s,u,n]);return r.a.createElement(f.a,{disableEnforceFocus:!0,PaperProps:{style:{minWidth:300}},open:e.open},r.a.createElement(p.a,null,e.shouldInsertWithText?r.a.createElement("div",null,r.a.createElement(b.a,{autoFocus:!0,placeholder:"Text",onChange:function(e){return c(e.target.value)},value:l})):null,n?r.a.createElement(w.b,{ref:a,model:e.data,schema:t,onSubmit:u},r.a.createElement(w.a,null)):null),r.a.createElement(v.a,null,r.a.createElement(h.a,{variant:"text",onClick:function(){e.close()},style:{marginRight:"auto"}},e.cancelLabel||"Cancel"),e.isActive?r.a.createElement(h.a,{variant:"contained",color:"secondary",onClick:function(){e.remove(),e.close()}},e.removeLabel||"Remove",r.a.createElement(y.a,{style:{marginLeft:10}})):null,r.a.createElement(h.a,{variant:"contained",color:"primary",onClick:d},e.submitLabel||"Ok",r.a.createElement(g.a,{style:{marginLeft:10}}))))},k=n(1193),_=n(234),N=function(e){var t=e.condition,n=e.wrapper,o=e.children;return t?n(o):o},T=Object(_.a)((function(){return n.e(19).then(n.bind(null,196))})),P=Object(_.a)((function(){return n.e(20).then(n.bind(null,388))})),x=r.a.memo((function(e){var t=e.icon,n=e.isActive,o=e.onClick,a=e.disabled,i=void 0!==a&&a,l=e.toolTip,c=void 0===l?"":l;return r.a.createElement(N,{condition:!i,wrapper:function(e){return r.a.createElement(P,{title:c},e)}},r.a.createElement(T,{onMouseDown:o,style:n?{color:"rgb(0, 188, 212)"}:i?{color:"gray"}:{color:"white"},disabled:i},t))})),S=n(1239),R=function(){return R=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},R.apply(this,arguments)},A=function(e,t){var n="function"===typeof Symbol&&e[Symbol.iterator];if(!n)return e;var o,r,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(o=a.next()).done;)i.push(o.value)}catch(l){r={error:l}}finally{try{o&&!o.done&&(n=a.return)&&n.call(a)}finally{if(r)throw r.error}}return i};t.a=r.a.memo((function(e){var t,n,f,p,v,h=e.plugin,b=Object(S.g)().t,m=Boolean(h.controls),y=A(Object(o.useState)(!1),2),O=y[0],g=y[1],j=Object(o.useRef)(),w="component"===h.pluginType&&"inline"===h.object&&(!(null===(t=null===j||void 0===j?void 0:j.current)||void 0===t?void 0:t.selection)||a.Range.isCollapsed(null===(n=null===j||void 0===j?void 0:j.current)||void 0===n?void 0:n.selection))&&!(null===(f=null===j||void 0===j?void 0:j.current)||void 0===f?void 0:f.isActive),E=Object(o.useCallback)((function(){return g(!1)}),[]),_=function(e){var t=Object(c.a)(e);return Boolean(t)}(h),N=Object(l.b)(h),T=Object(d.a)(h),P=Object(i.e)(),D=Object(k.c)();Object(o.useEffect)((function(){return D(O)}),[O,D]);var L=r.a.useCallback((function(e){e.preventDefault(),m||w?(O||(j.current={selection:P.selection,isActive:_,data:u(P,h)}),g(!O)):_?T():N()}),[_,m,O,w]),W=h.controls,I=W?"autoform"===W.type?function(e){return r.a.createElement(C,R({},e,{schema:null===W||void 0===W?void 0:W.schema}))}:W.Component:C,B=function(e){try{var t=Object(i.e)(),n=s(Object(o.useState)(!0),2),r=n[0],a=n[1];return!t||!!e.isDisabled&&(e.isDisabled(t).then((function(e){return a(e)})),r)}catch(l){return!1}}(h);return r.a.createElement(r.a.Fragment,null,r.a.createElement(x,{onClick:L,disabled:B,isActive:_,icon:h.icon||"component"===h.pluginType&&h.deserialize.tagName,toolTip:b(h.label)}),m||w?r.a.createElement(I,R({pluginConfig:h,close:E,open:O,add:function(e){var t;(null===(t=null===j||void 0===j?void 0:j.current)||void 0===t?void 0:t.selection)&&a.Transforms.select(P,null===j||void 0===j?void 0:j.current.selection),N(e)},remove:function(){var e;(null===(e=null===j||void 0===j?void 0:j.current)||void 0===e?void 0:e.selection)&&a.Transforms.select(P,null===j||void 0===j?void 0:j.current.selection),T()},isActive:null===(p=null===j||void 0===j?void 0:j.current)||void 0===p?void 0:p.isActive,shouldInsertWithText:w,data:null===(v=null===j||void 0===j?void 0:j.current)||void 0===v?void 0:v.data},e)):null)}))},1464:function(e,t,n){"use strict";var o=n(39),r=n.n(o),a=n(1),i=n.n(a),l=n(3),c=n.n(l),u=!("undefined"===typeof window||!window.document||!window.document.createElement),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var p=function(e){function t(){return d(this,t),f(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),s(t,[{key:"componentWillUnmount",value:function(){this.defaultNode&&document.body.removeChild(this.defaultNode),this.defaultNode=null}},{key:"render",value:function(){return u?(this.props.node||this.defaultNode||(this.defaultNode=document.createElement("div"),document.body.appendChild(this.defaultNode)),r.a.createPortal(this.props.children,this.props.node||this.defaultNode)):null}}]),t}(i.a.Component);p.propTypes={children:c.a.node.isRequired,node:c.a.any};var v=p,h=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();function b(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var y=function(e){function t(){return b(this,t),m(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),h(t,[{key:"componentDidMount",value:function(){this.renderPortal()}},{key:"componentDidUpdate",value:function(e){this.renderPortal()}},{key:"componentWillUnmount",value:function(){r.a.unmountComponentAtNode(this.defaultNode||this.props.node),this.defaultNode&&document.body.removeChild(this.defaultNode),this.defaultNode=null,this.portal=null}},{key:"renderPortal",value:function(e){this.props.node||this.defaultNode||(this.defaultNode=document.createElement("div"),document.body.appendChild(this.defaultNode));var t=this.props.children;"function"===typeof this.props.children.type&&(t=i.a.cloneElement(this.props.children)),this.portal=r.a.unstable_renderSubtreeIntoContainer(this,t,this.props.node||this.defaultNode)}},{key:"render",value:function(){return null}}]),t}(i.a.Component),O=y;y.propTypes={children:c.a.node.isRequired,node:c.a.any};var g=void 0;g=r.a.createPortal?v:O;t.a=g},1512:function(e,t,n){"use strict";n.r(t);var o=n(1),r=n.n(o),a=n(1464),i=n(1158),l=n(1160),c=function(){var e=Object(i.e)();try{return Boolean(e.selection)&&""!==l.Editor.string(e,e.selection)}catch(t){return!1}},u=n(1238);t.default=function(e){var t=e.plugins,n=e.translations,l=c(),s=Object(o.useRef)(),d=Object(i.e)();return Object(o.useEffect)((function(){var e=s.current;if(l){var t=window.getSelection();try{var n=t.getRangeAt(0).getBoundingClientRect();if(n){var o=n.left,r=n.top,a=n.width;e.style.opacity="1",e.style.top=r+window.scrollY-e.offsetHeight+"px",e.style.left=o+window.scrollX-e.offsetWidth/2+a/2+"px"}}catch(i){}}}),[d,l]),r.a.createElement(a.a,null,r.a.createElement("div",{className:"react-page-plugins-content-slate-inline-toolbar "+(l?"":"react-page-plugins-content-slate-inline-toolbar--hidden"),style:{padding:0},ref:s},t&&t.map((function(e,t){return e.addHoverButton?r.a.createElement(u.a,{translations:n,key:t,plugin:e}):null}))))}}}]);
//# sourceMappingURL=15.fef852b4.chunk.js.map