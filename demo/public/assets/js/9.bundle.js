webpackJsonp([9],{221:function(e,t,r){var n,o,a;!function(r,i){o=[],n=i,a="function"==typeof n?n.apply(t,o):n,!(void 0!==a&&(e.exports=a))}(this,function(){function e(o,a){if("function"!=typeof a)throw new Error("Bad callback given: "+a);if(!o)throw new Error("No options given");var c=o.onResponse;if(o="string"==typeof o?{uri:o}:JSON.parse(JSON.stringify(o)),o.onResponse=c,o.verbose&&(e.log=n()),o.url&&(o.uri=o.url,delete o.url),!o.uri&&""!==o.uri)throw new Error("options.uri is a required argument");if("string"!=typeof o.uri)throw new Error("options.uri must be a string");for(var u=["proxy","_redirectsFollowed","maxRedirects","followRedirect"],s=0;s<u.length;s++)if(o[u[s]])throw new Error("options."+u[s]+" is not supported");if(o.callback=a,o.method=o.method||"GET",o.headers=o.headers||{},o.body=o.body||null,o.timeout=o.timeout||e.DEFAULT_TIMEOUT,o.headers.host)throw new Error("Options.headers.host is not supported");o.json&&(o.headers.accept=o.headers.accept||"application/json","GET"!==o.method&&(o.headers["content-type"]="application/json"),"boolean"!=typeof o.json?o.body=JSON.stringify(o.json):"string"!=typeof o.body&&(o.body=JSON.stringify(o.body)));var l=function(e){var t=[];for(var r in e)e.hasOwnProperty(r)&&t.push(encodeURIComponent(r)+"="+encodeURIComponent(e[r]));return t.join("&")};if(o.qs){var f="string"==typeof o.qs?o.qs:l(o.qs);-1!==o.uri.indexOf("?")?o.uri=o.uri+"&"+f:o.uri=o.uri+"?"+f}var p=function(e){var t={};t.boundry="-------------------------------"+Math.floor(1e9*Math.random());var r=[];for(var n in e)e.hasOwnProperty(n)&&r.push("--"+t.boundry+'\nContent-Disposition: form-data; name="'+n+'"\n\n'+e[n]+"\n");return r.push("--"+t.boundry+"--"),t.body=r.join(""),t.length=t.body.length,t.type="multipart/form-data; boundary="+t.boundry,t};if(o.form){if("string"==typeof o.form)throw"form name unsupported";if("POST"===o.method){var d=(o.encoding||"application/x-www-form-urlencoded").toLowerCase();switch(o.headers["content-type"]=d,d){case"application/x-www-form-urlencoded":o.body=l(o.form).replace(/%20/g,"+");break;case"multipart/form-data":var h=p(o.form);o.body=h.body,o.headers["content-type"]=h.type;break;default:throw new Error("unsupported encoding:"+d)}}}return o.onResponse=o.onResponse||r,o.onResponse===!0&&(o.onResponse=a,o.callback=r),!o.headers.authorization&&o.auth&&(o.headers.authorization="Basic "+i(o.auth.username+":"+o.auth.password)),t(o)}function t(t){function r(){f=!0;var r=new Error("ETIMEDOUT");return r.code="ETIMEDOUT",r.duration=t.timeout,e.log.error("Timeout",{id:l._id,milliseconds:t.timeout}),t.callback(r,l)}function n(r){if(f)return e.log.debug("Ignoring timed out state change",{state:l.readyState,id:l.id});if(e.log.debug("State change",{state:l.readyState,id:l.id,timed_out:f}),l.readyState===c.OPENED){e.log.debug("Request started",{id:l.id});for(var n in t.headers)l.setRequestHeader(n,t.headers[n])}else l.readyState===c.HEADERS_RECEIVED?o():l.readyState===c.LOADING?(o(),i()):l.readyState===c.DONE&&(o(),i(),u())}function o(){if(!m.response){if(m.response=!0,e.log.debug("Got response",{id:l.id,status:l.status}),clearTimeout(l.timeoutTimer),l.statusCode=l.status,p&&0==l.statusCode){var r=new Error("CORS request rejected: "+t.uri);return r.cors="rejected",m.loading=!0,m.end=!0,t.callback(r,l)}t.onResponse(null,l)}}function i(){m.loading||(m.loading=!0,e.log.debug("Response body loading",{id:l.id}))}function u(){if(!m.end){if(m.end=!0,e.log.debug("Request done",{id:l.id}),l.body=l.responseText,t.json)try{l.body=JSON.parse(l.responseText)}catch(r){return t.callback(r,l)}t.callback(null,l,l.body)}}var l=new c,f=!1,p=a(t.uri),d="withCredentials"in l;if(s+=1,l.seq_id=s,l.id=s+": "+t.method+" "+t.uri,l._id=l.id,p&&!d){var h=new Error("Browser does not support cross-origin request: "+t.uri);return h.cors="unsupported",t.callback(h,l)}l.timeoutTimer=setTimeout(r,t.timeout);var m={response:!1,loading:!1,end:!1};return l.onreadystatechange=n,l.open(t.method,t.uri,!0),p&&(l.withCredentials=!!t.withCredentials),l.send(t.body),l}function r(){}function n(){var e,t,n={},a=["trace","debug","info","warn","error"];for(t=0;t<a.length;t++)e=a[t],n[e]=r,"undefined"!=typeof console&&console&&console[e]&&(n[e]=o(console,e));return n}function o(e,t){function r(r,n){return"object"==typeof n&&(r+=" "+JSON.stringify(n)),e[t].call(e,r)}return r}function a(e){var t,r=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/;try{t=location.href}catch(n){t=document.createElement("a"),t.href="",t=t.href}var o=r.exec(t.toLowerCase())||[],a=r.exec(e.toLowerCase()),i=!(!a||a[1]==o[1]&&a[2]==o[2]&&(a[3]||("http:"===a[1]?80:443))==(o[3]||("http:"===o[1]?80:443)));return i}function i(e){var t,r,n,o,a,i,c,u,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",l=0,f=0,p="",d=[];if(!e)return e;do t=e.charCodeAt(l++),r=e.charCodeAt(l++),n=e.charCodeAt(l++),u=t<<16|r<<8|n,o=u>>18&63,a=u>>12&63,i=u>>6&63,c=63&u,d[f++]=s.charAt(o)+s.charAt(a)+s.charAt(i)+s.charAt(c);while(l<e.length);switch(p=d.join(""),e.length%3){case 1:p=p.slice(0,-2)+"==";break;case 2:p=p.slice(0,-1)+"="}return p}var c=XMLHttpRequest;if(!c)throw new Error("missing XMLHttpRequest");e.log={trace:r,debug:r,info:r,warn:r,error:r};var u=18e4,s=0;e.withCredentials=!1,e.DEFAULT_TIMEOUT=u,e.defaults=function(t,r){var n=function(e){var r=function(r,n){r="string"==typeof r?{uri:r}:JSON.parse(JSON.stringify(r));for(var o in t)void 0===r[o]&&(r[o]=t[o]);return e(r,n)};return r},o=n(e);return o.get=n(e.get),o.post=n(e.post),o.put=n(e.put),o.head=n(e.head),o};var l=["get","put","post","head"];return l.forEach(function(t){var r=t.toUpperCase(),n=t.toLowerCase();e[n]=function(t){"string"==typeof t?t={method:r,uri:t}:(t=JSON.parse(JSON.stringify(t)),t.method=r);var n=[t].concat(Array.prototype.slice.apply(arguments,[1]));return e.apply(this,n)}}),e.couch=function(t,n){function o(e,t,r){if(e)return n(e,t,r);if((t.statusCode<200||t.statusCode>299)&&r.error){e=new Error("CouchDB error: "+(r.error.reason||r.error.error));for(var o in r)e[o]=r[o];return n(e,t,r)}return n(e,t,r)}"string"==typeof t&&(t={uri:t}),t.json=!0,t.body&&(t.json=t.body),delete t.body,n=n||r;var a=e(t,o);return a},e})},225:function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(1),u=r(221),s=r(226),l=r(227),f=r(228),p=r(229),d=function(e){function t(e){n(this,t);var r=o(this,Object.getPrototypeOf(t).call(this,e));return r.state={web:null,mobile:null,openSource:null},r}return a(t,e),i(t,[{key:"componentDidMount",value:function(){var e=this,t="/data/projects/index.json";u(t,function(t,r,n){if(!t&&200==r.statusCode){var o=JSON.parse(n);e.setState({web:o.web,mobile:o.mobile,openSource:o.openSource})}})}},{key:"render",value:function(){return this.state.web?c.createElement("div",{id:"projects"},c.createElement(s["default"],null),c.createElement(l["default"],{projects:this.state.web}),c.createElement(f["default"],{projects:this.state.mobile}),c.createElement(p["default"],{projects:this.state.openSource})):null}}]),t}(c.Component);e.exports=d},226:function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(1),u=function(e){function t(){return n(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return a(t,e),i(t,[{key:"render",value:function(){return c.createElement("div",{id:"intro"},c.createElement("div",{className:"work-intro"},c.createElement("h1",{className:"work-title"},"Our Work"),c.createElement("div",{className:"rich-text"},c.createElement("b",null,"We deliver powerful applications."),"Tivix has deep experience in developing software for web, mobile, and cloud platforms",c.createElement("b",null," "),". Whether we are developing with Python/Django, iOS, Android, or AngularJS, our job is to deliver ",c.createElement("b",null,"software that matters. "))),c.createElement("div",{className:"work-nav"},c.createElement("h5",null,"View projects by:"),c.createElement("ul",null,c.createElement("li",null,c.createElement("a",{href:"#web"},"Web ",c.createElement("i",{className:"fa fa-angle-right"}))),c.createElement("li",null,c.createElement("a",{href:"#mobile"},"Mobile ",c.createElement("i",{className:"fa fa-angle-right"}))),c.createElement("li",null,c.createElement("a",{href:"#opensource"},"Open source ",c.createElement("i",{className:"fa fa-angle-right"}))))))}}]),t}(c.Component);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=u},227:function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(1),u=r(154),s=function(e){function t(){return n(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return a(t,e),i(t,[{key:"render",value:function(){var e=this.props.projects.map(function(e){return c.createElement("div",{className:"project-content"},c.createElement("h3",{className:"project-title"},c.createElement(u.Link,{to:"/projects/"+e.id},e.name)),c.createElement("h4",{className:"project-headline"},e.title),c.createElement(u.Link,{to:"/projects/"+e.id},c.createElement("img",{src:e.imageUrl,className:"browser",height:"185",width:"263"})))});return c.createElement("div",{className:"work web",id:"web"},c.createElement("h2",null,"Web"),e)}}]),t}(c.Component);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=s},228:function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(1),u=r(154),s=function(e){function t(){return n(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return a(t,e),i(t,[{key:"render",value:function(){var e=this.props.projects.map(function(e){return c.createElement("div",{className:"project-content"},c.createElement("h3",{className:"project-title"},c.createElement(u.Link,{to:"/projects/"+e.id},e.name)),c.createElement("h4",{className:"project-headline"},e.title),c.createElement(u.Link,{to:"/projects/"+e.id},c.createElement("img",{src:e.imageUrl,className:"mobile",height:"184",width:"208"})),c.createElement("p",{className:"gradient-overlay"}))});return c.createElement("div",{className:"work mobile",id:"mobile"},c.createElement("h2",null,"Mobile"),e)}}]),t}(c.Component);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=s},229:function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(1),u=r(154),s=function(e){function t(){return n(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return a(t,e),i(t,[{key:"render",value:function(){var e=this.props.projects.map(function(e){return c.createElement("div",{className:"project-content"},c.createElement("h3",{className:"opensource-title"},c.createElement(u.Link,{to:"/projects/"+e.id},e.name)),c.createElement("h4",{className:"project-headline"},e.title),c.createElement(u.Link,{to:"/projects/"+e.id},c.createElement("img",{src:e.imageUrl,className:"browser",height:"185",width:"263"})))});return c.createElement("div",{className:"work opensource",id:"opensource"},c.createElement("h2",null,"Open Source"),e)}}]),t}(c.Component);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=s}});