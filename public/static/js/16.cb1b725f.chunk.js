(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[16],{2428:function(e,r,t){"use strict";var n=t(35),o=t(36);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var a=o(t(1)),s=(0,n(t(37)).default)(a.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"}),"Error");r.default=s},2429:function(e,r,t){"use strict";var n=t(35),o=t(36);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var a=o(t(1)),s=(0,n(t(37)).default)(a.createElement("path",{d:"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"}),"CloudUpload");r.default=s},2480:function(e,r,t){"use strict";t.r(r);var n=t(1),o=t.n(n),a=t(2082),s=t(2147),i=t(2429),l=t.n(i),p=t(2428),u=t.n(p),c={buttonContent:"Upload image",noFileError:"No file selected",badExtensionError:"Bad file type",tooBigError:"Too big",uploadingError:"Error while uploading",unknownError:"Unknown error"},d=t(2237),f=function(){var e=function(r,t){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])})(r,t)};return function(r,t){function n(){this.constructor=r}e(r,t),r.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}(),h=function(){return(h=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var o in r=arguments[t])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e}).apply(this,arguments)},g=function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.state={isUploading:!1,hasError:!1,errorText:"",progress:0},r.hasExtension=function(e){var t="("+(r.props.allowedExtensions?r.props.allowedExtensions.map((function(e){return e.toLowerCase()})).join("|"):"").replace(/\./g,"\\.")+")$";return new RegExp(t,"i").test(e.toLowerCase())},r.handleError=function(e){var t="";switch(e){case 1:t=r.props.t(r.props.translations.noFileError);break;case 2:t=r.props.t(r.props.translations.badExtensionError);break;case 3:t=r.props.t(r.props.translations.tooBigError);break;case 4:t=r.props.t(r.props.translations.uploadingError);break;default:t=r.props.t(r.props.translations.unknownError)}r.setState({hasError:!0,errorText:t,isUploading:!0},(function(){return r.setState({isUploading:!1})})),setTimeout((function(){return r.setState({hasError:!1,errorText:""})}),5e3)},r.handleFileSelected=function(e){if(e.target.files&&e.target.files[0]){var t=e.target.files[0];r.hasExtension(t.name)?t.size>r.props.maxFileSize?r.handleError(3):(r.props.imageLoaded&&r.readFile(t).then((function(e){return r.props.imageLoaded(e)})),r.props.imageUpload&&(r.setState({isUploading:!0}),r.props.imageUpload(t,r.handleReportProgress).then((function(e){r.setState({progress:void 0,isUploading:!1}),r.props.imageUploaded&&r.props.imageUploaded(e)})).catch((function(e){r.setState({isUploading:!1}),r.props.imageUploadError&&r.props.imageUploadError(e)})))):r.handleError(2)}else r.handleError(1)},r.handleFileUploadClick=function(){return r.fileInput.click()},r.handleReportProgress=function(e){return r.setState({progress:e})},r.renderChildren=function(){return r.state.isUploading?o.a.createElement(s.a,{value:r.state.progress,size:19}):r.state.hasError?o.a.createElement(o.a.Fragment,null,r.state.errorText,o.a.createElement(u.a,{style:{marginLeft:"8px"}})):o.a.createElement(o.a.Fragment,null,r.props.translations.buttonContent,r.props.icon)},r}return f(r,e),r.prototype.readFile=function(e){return new Promise((function(r,t){var n=new FileReader;n.onload=function(t){var n=t.target.result;n=n.replace(";base64",";name="+e.name+";base64"),r({file:e,dataUrl:n})},n.readAsDataURL(e)}))},r.prototype.render=function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement(a.a,{disabled:this.state.isUploading,variant:"contained",color:this.state.hasError?"secondary":"primary",onClick:this.handleFileUploadClick,style:this.props.style,size:"small"},this.renderChildren()),!this.state.isUploading&&o.a.createElement("input",{style:{display:"none"},ref:function(r){return e.fileInput=r},type:"file",onChange:this.handleFileSelected}))},r.defaultProps={icon:o.a.createElement(l.a,{style:{marginLeft:"8px"}}),allowedExtensions:["jpg","jpeg","png"],maxFileSize:5242880,translations:c},r}(o.a.Component);r.default=function(e){var r=Object(d.g)().t;return o.a.createElement(g,h({},e,{t:r}))}}}]);
//# sourceMappingURL=16.cb1b725f.chunk.js.map