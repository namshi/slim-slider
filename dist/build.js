!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.SlimSlider=e():t.SlimSlider=e()}(this,function(){return function(t){function e(n){if(i[n])return i[n].exports;var s=i[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=4)}([function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},o=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),a=i(3),u=n(a),h=i(2),c=(n(h),i(1)),l={timing:400,childsClassName:".slim-slide",dir:"ltr",threshold:10,showButtons:!1,infinite:!1,showPointers:!0,showThumbnails:!1,itemsPerSlide:1},p=function(){function t(e){var i=this;if(s(this,t),this.handleSwipe=function(t){var e=t.deltaY/i.slideWidth*100>-20;i.panEnabled&&e?(i.translate(i.pos+t.deltaX),t.isFinal?"panleft"==t.type?i.goToNext():"panright"==t.type?i.goToPrevious():i.slideTo(i.current):"panend"!=t.type&&"pancancel"!=t.type||i.slideTo(i.current)):i.slideTo(i.current)},this.options=Object.assign({},l,e),!this.options.selector)throw new Error("option missing: Providing a selector is a must to initialize the slider!");this.init()}return o(t,[{key:"setPan",value:function(t){this.panEnabled=t,this.initGesture()}},{key:"initGesture",value:function(){this.sliderManager&&(this.sliderManager.destroy(),this.sliderManager=null);var t=this.panEnabled?{touchAction:"pan-y"}:{touchAction:"none"};this.sliderManager=new u.default.Manager(this.slider,r({},t,{recognizers:[[u.default.Pan,{direction:u.default.DIRECTION_ALL}]]})),this.sliderManager.on("panstart panmove panend pancancel panleft panright panup pandown",this.handleSwipe)}},{key:"init",value:function(){this.timeout,this.panEnabled=!0,this.timing=this.options.timing,this.threshold=this.options.threshold,this.current=0,this.pos=0,this.operator="rtl"===this.options.dir?1:-1,this.events=new c.Events,this.parent=this.options.selector.nodeName?this.options.selector:document.querySelector(this.options.selector),this.slides=this.parent.querySelectorAll(this.options.childsClassName),this.slideCount=Math.ceil(this.slides.length/this.options.itemsPerSlide),this.slideWidth=this.parent.offsetWidth,this.itemWidth=this.parent.offsetWidth/this.options.itemsPerSlide,this.initDom(),this.options.showPointers&&this.createPagination(),this.options.showThumbnails&&this.createThumbs(),this.options.showButtons&&this.createButtons(),this.initGesture(),this.registerListeners(),(0,c.dispatchEvent)(this.parent,"after.slim.init",{current:this.current})}},{key:"initDom",value:function(){var t=this;this.slider&&this.sliderWrapper||(this.slider=(0,c.create)("div",{class:"slim-slides"}),this.sliderWrapper=(0,c.create)("div",{class:"slim-slider-wrapper"}),this.slides.forEach(function(e){t.slider.appendChild(e)}),this.sliderWrapper.appendChild(this.slider),this.parent.appendChild(this.sliderWrapper)),this.slides[0].classList.add("active"),this.parent.style.direction=this.options.dir,this.slides.forEach(function(e,i){e.dataset.item=i,e.style.minWidth=t.itemWidth+"px"})}},{key:"createPagination",value:function(){this.carouselPagination=(0,c.create)("div",{class:"carousel-pagination"});for(var t=0;t<this.slideCount;t++){var e=(0,c.create)("div",{class:"carousel-pagination-pointer pointer_"+t});this.carouselPagination.appendChild(e)}this.parent.appendChild(this.carouselPagination)}},{key:"createThumbs",value:function(){var t=this;this.thumbnails=(0,c.create)("div",{class:"thumbs"});for(var e=function(e){var i=(0,c.create)("div",{class:"thumb thumb_"+e}),n=(0,c.create)("a",{class:"thumb-link","data-slideto":e,href:"#"}),s=(0,c.create)("img",{class:"thumb-image",src:""+t.slides[e].dataset.thumb});n.appendChild(s),i.appendChild(n),t.thumbnails.appendChild(i),t.events.addEvent(i,"click",function(i){i.preventDefault(),t.slideTo(e)})},i=0;i<this.slideCount;i++)e(i);this.parent.appendChild(this.thumbnails)}},{key:"createButtons",value:function(){this.carouselButtons=(0,c.create)("div",{class:"carousel-buttons"}),this.nextButton=(0,c.create)("a",{class:"next carousel-arrow"}),this.prevButton=(0,c.create)("a",{class:"prev carousel-arrow"}),this.carouselButtons.appendChild(this.nextButton),this.carouselButtons.appendChild(this.prevButton),this.parent.appendChild(this.carouselButtons)}},{key:"updatePagination",value:function(){var t=this.parent.querySelector(this.options.childsClassName+".active").dataset.item,e=this.parent.querySelector(".pointer_"+t),i=this.parent.querySelector(".carousel-pagination-pointer.active");i&&i.classList.remove("active"),e&&e.classList.add("active")}},{key:"updateThumbs",value:function(){var t=this.parent.querySelector(this.options.childsClassName+".active").dataset.item,e=this.parent.querySelector(".thumb_"+t),i=this.parent.querySelector(".thumb.active");i&&i.classList.remove("active"),e&&e.classList.add("active")}},{key:"goToNext",value:function(){this.slideTo(this.current-this.operator)}},{key:"goToPrevious",value:function(){this.slideTo(this.current+this.operator)}},{key:"registerListeners",value:function(){var t=this;this.events.addEvent(this.nextButton,"click",function(e){t.goToNext()}),this.events.addEvent(this.prevButton,"click",function(e){t.goToPrevious()}),this.events.addEvent(this.parent,"after.slim.init",function(e){t.updatePagination(),t.updateThumbs()}),this.events.addEvent(this.parent,"after.slim.slide",function(e){t.updatePagination(),t.updateThumbs()}),window.addEventListener("resize",function(e){clearTimeout(t.resized),t.resized=setTimeout(function(e){t.destroy(),t.init(),t.slideTo(0)},500)})}},{key:"translate",value:function(t){var e=this;(0,c.requestAnimationFrame)(function(i){e.slider.style.transform="translateX("+t+"px)",e.slider.style.webkitTransform="translateX("+t+"px)"})}},{key:"slideTo",value:function(t){var e=this,i=this.options.infinite?0:this.slideCount-1;this.current=t<0?0:t>this.slideCount-1?i:t,this.pos=this.operator*this.current*this.slideWidth;var n=this.parent.querySelector(this.options.childsClassName+".active");this.slider.classList.add("is-animating"),n&&n.classList.remove("active"),this.slides[this.current].classList.add("active"),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(t){e.slider.classList.remove("is-animating"),(0,c.dispatchEvent)(e.parent,"after.slim.slide",{current:e.current})},this.timing),this.translate(this.pos)}},{key:"removeDom",value:function(){this.thumbnails&&this.parent.removeChild(this.thumbnails),this.carouselPagination&&this.parent.removeChild(this.carouselPagination),this.carouselButtons&&this.parent.removeChild(this.carouselButtons)}},{key:"destroy",value:function(){this.events.destroyAll(),this.removeDom()}}]),t}();e.default=p,t.exports=e.default},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=document.createElement(t);try{Object.keys(e).forEach(function(t){i.setAttribute(t,e[t])})}catch(t){console.error(t)}return i}function r(t,e,i){var n=new CustomEvent(e,{bubbles:!0,cancelable:!0,details:i});t.dispatchEvent(n)}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();e.create=s,e.dispatchEvent=r;e.Events=function(){function t(){n(this,t),this.listeners=[]}return o(t,[{key:"addEvent",value:function(t,e,i,n){t&&t.addEventListener(e,i,n),this.listeners.push({el:t,fn:i,e:e})}},{key:"destroyAll",value:function(){this.listeners.forEach(function(t){t.el.removeEventListener(t.e,t.fn)})}}]),t}(),e.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame},function(t,e,i){function n(){try{var t=new s("cat",{detail:{foo:"bar"}});return"cat"===t.type&&"bar"===t.detail.foo}catch(t){}return!1}var s=i.i({}).CustomEvent;t.exports=n()?s:"undefined"!=typeof document&&"function"==typeof document.createEvent?function(t,e){var i=document.createEvent("CustomEvent");return e?i.initCustomEvent(t,e.bubbles,e.cancelable,e.detail):i.initCustomEvent(t,!1,!1,void 0),i}:function(t,e){var i=document.createEventObject();return i.type=t,e?(i.bubbles=Boolean(e.bubbles),i.cancelable=Boolean(e.cancelable),i.detail=e.detail):(i.bubbles=!1,i.cancelable=!1,i.detail=void 0),i}},function(t,e,i){var n;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function(s,r,o,a){"use strict";function u(t,e,i){return setTimeout(d(t,i),e)}function h(t,e,i){return!!Array.isArray(t)&&(c(t,i[e],i),!0)}function c(t,e,i){var n;if(t)if(t.forEach)t.forEach(e,i);else if(t.length!==a)for(n=0;n<t.length;)e.call(i,t[n],n,t),n++;else for(n in t)t.hasOwnProperty(n)&&e.call(i,t[n],n,t)}function l(t,e,i){var n="DEPRECATED METHOD: "+e+"\n"+i+" AT \n";return function(){var e=new Error("get-stack-trace"),i=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",r=s.console&&(s.console.warn||s.console.log);return r&&r.call(s.console,n,i),t.apply(this,arguments)}}function p(t,e,i){var n,s=e.prototype;n=t.prototype=Object.create(s),n.constructor=t,n._super=s,i&&vt(n,i)}function d(t,e){return function(){return t.apply(e,arguments)}}function f(t,e){return typeof t==yt?t.apply(e?e[0]||a:a,e):t}function v(t,e){return t===a?e:t}function m(t,e,i){c(E(e),function(e){t.addEventListener(e,i,!1)})}function g(t,e,i){c(E(e),function(e){t.removeEventListener(e,i,!1)})}function y(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function T(t,e){return t.indexOf(e)>-1}function E(t){return t.trim().split(/\s+/g)}function b(t,e,i){if(t.indexOf&&!i)return t.indexOf(e);for(var n=0;n<t.length;){if(i&&t[n][i]==e||!i&&t[n]===e)return n;n++}return-1}function C(t){return Array.prototype.slice.call(t,0)}function w(t,e,i){for(var n=[],s=[],r=0;r<t.length;){var o=e?t[r][e]:t[r];b(s,o)<0&&n.push(t[r]),s[r]=o,r++}return i&&(n=e?n.sort(function(t,i){return t[e]>i[e]}):n.sort()),n}function P(t,e){for(var i,n,s=e[0].toUpperCase()+e.slice(1),r=0;r<mt.length;){if(i=mt[r],n=i?i+s:e,n in t)return n;r++}return a}function A(){return Pt++}function S(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow||s}function x(t,e){var i=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){f(t.options.enable,[t])&&i.handler(e)},this.init()}function _(t){var e,i=t.options.inputClass;return new(e=i?i:xt?Y:_t?H:St?V:F)(t,I)}function I(t,e,i){var n=i.pointers.length,s=i.changedPointers.length,r=e&Nt&&n-s===0,o=e&(Rt|qt)&&n-s===0;i.isFirst=!!r,i.isFinal=!!o,r&&(t.session={}),i.eventType=e,D(t,i),t.emit("hammer.input",i),t.recognize(i),t.session.prevInput=i}function D(t,e){var i=t.session,n=e.pointers,s=n.length;i.firstInput||(i.firstInput=M(e)),s>1&&!i.firstMultiple?i.firstMultiple=M(e):1===s&&(i.firstMultiple=!1);var r=i.firstInput,o=i.firstMultiple,a=o?o.center:r.center,u=e.center=N(n);e.timeStamp=bt(),e.deltaTime=e.timeStamp-r.timeStamp,e.angle=L(a,u),e.distance=q(a,u),O(i,e),e.offsetDirection=R(e.deltaX,e.deltaY);var h=z(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=h.x,e.overallVelocityY=h.y,e.overallVelocity=Et(h.x)>Et(h.y)?h.x:h.y,e.scale=o?X(o.pointers,n):1,e.rotation=o?W(o.pointers,n):0,e.maxPointers=i.prevInput?e.pointers.length>i.prevInput.maxPointers?e.pointers.length:i.prevInput.maxPointers:e.pointers.length,k(i,e);var c=t.element;y(e.srcEvent.target,c)&&(c=e.srcEvent.target),e.target=c}function O(t,e){var i=e.center,n=t.offsetDelta||{},s=t.prevDelta||{},r=t.prevInput||{};e.eventType!==Nt&&r.eventType!==Rt||(s=t.prevDelta={x:r.deltaX||0,y:r.deltaY||0},n=t.offsetDelta={x:i.x,y:i.y}),e.deltaX=s.x+(i.x-n.x),e.deltaY=s.y+(i.y-n.y)}function k(t,e){var i,n,s,r,o=t.lastInterval||e,u=e.timeStamp-o.timeStamp;if(e.eventType!=qt&&(u>Mt||o.velocity===a)){var h=e.deltaX-o.deltaX,c=e.deltaY-o.deltaY,l=z(u,h,c);n=l.x,s=l.y,i=Et(l.x)>Et(l.y)?l.x:l.y,r=R(h,c),t.lastInterval=e}else i=o.velocity,n=o.velocityX,s=o.velocityY,r=o.direction;e.velocity=i,e.velocityX=n,e.velocityY=s,e.direction=r}function M(t){for(var e=[],i=0;i<t.pointers.length;)e[i]={clientX:Tt(t.pointers[i].clientX),clientY:Tt(t.pointers[i].clientY)},i++;return{timeStamp:bt(),pointers:e,center:N(e),deltaX:t.deltaX,deltaY:t.deltaY}}function N(t){var e=t.length;if(1===e)return{x:Tt(t[0].clientX),y:Tt(t[0].clientY)};for(var i=0,n=0,s=0;s<e;)i+=t[s].clientX,n+=t[s].clientY,s++;return{x:Tt(i/e),y:Tt(n/e)}}function z(t,e,i){return{x:e/t||0,y:i/t||0}}function R(t,e){return t===e?Lt:Et(t)>=Et(e)?t<0?Wt:Xt:e<0?Ft:Yt}function q(t,e,i){i||(i=Ut);var n=e[i[0]]-t[i[0]],s=e[i[1]]-t[i[1]];return Math.sqrt(n*n+s*s)}function L(t,e,i){i||(i=Ut);var n=e[i[0]]-t[i[0]],s=e[i[1]]-t[i[1]];return 180*Math.atan2(s,n)/Math.PI}function W(t,e){return L(e[1],e[0],Vt)+L(t[1],t[0],Vt)}function X(t,e){return q(e[0],e[1],Vt)/q(t[0],t[1],Vt)}function F(){this.evEl=Zt,this.evWin=$t,this.pressed=!1,x.apply(this,arguments)}function Y(){this.evEl=Qt,this.evWin=te,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function j(){this.evTarget=ie,this.evWin=ne,this.started=!1,x.apply(this,arguments)}function B(t,e){var i=C(t.touches),n=C(t.changedTouches);return e&(Rt|qt)&&(i=w(i.concat(n),"identifier",!0)),[i,n]}function H(){this.evTarget=re,this.targetIds={},x.apply(this,arguments)}function U(t,e){var i=C(t.touches),n=this.targetIds;if(e&(Nt|zt)&&1===i.length)return n[i[0].identifier]=!0,[i,i];var s,r,o=C(t.changedTouches),a=[],u=this.target;if(r=i.filter(function(t){return y(t.target,u)}),e===Nt)for(s=0;s<r.length;)n[r[s].identifier]=!0,s++;for(s=0;s<o.length;)n[o[s].identifier]&&a.push(o[s]),e&(Rt|qt)&&delete n[o[s].identifier],s++;return a.length?[w(r.concat(a),"identifier",!0),a]:void 0}function V(){x.apply(this,arguments);var t=d(this.handler,this);this.touch=new H(this.manager,t),this.mouse=new F(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function G(t,e){t&Nt?(this.primaryTouch=e.changedPointers[0].identifier,Z.call(this,e)):t&(Rt|qt)&&Z.call(this,e)}function Z(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var i={x:e.clientX,y:e.clientY};this.lastTouches.push(i);var n=this.lastTouches,s=function(){var t=n.indexOf(i);t>-1&&n.splice(t,1)};setTimeout(s,oe)}}function $(t){for(var e=t.srcEvent.clientX,i=t.srcEvent.clientY,n=0;n<this.lastTouches.length;n++){var s=this.lastTouches[n],r=Math.abs(e-s.x),o=Math.abs(i-s.y);if(r<=ae&&o<=ae)return!0}return!1}function J(t,e){this.manager=t,this.set(e)}function K(t){if(T(t,de))return de;var e=T(t,fe),i=T(t,ve);return e&&i?de:e||i?e?fe:ve:T(t,pe)?pe:le}function Q(){if(!he)return!1;var t={},e=s.CSS&&s.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(i){t[i]=!e||s.CSS.supports("touch-action",i)}),t}function tt(t){this.options=vt({},this.defaults,t||{}),this.id=A(),this.manager=null,this.options.enable=v(this.options.enable,!0),this.state=ge,this.simultaneous={},this.requireFail=[]}function et(t){return t&Ce?"cancel":t&Ee?"end":t&Te?"move":t&ye?"start":""}function it(t){return t==Yt?"down":t==Ft?"up":t==Wt?"left":t==Xt?"right":""}function nt(t,e){var i=e.manager;return i?i.get(t):t}function st(){tt.apply(this,arguments)}function rt(){st.apply(this,arguments),this.pX=null,this.pY=null}function ot(){st.apply(this,arguments)}function at(){tt.apply(this,arguments),this._timer=null,this._input=null}function ut(){st.apply(this,arguments)}function ht(){st.apply(this,arguments)}function ct(){tt.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function lt(t,e){return e=e||{},e.recognizers=v(e.recognizers,lt.defaults.preset),new pt(t,e)}function pt(t,e){this.options=vt({},lt.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=_(this),this.touchAction=new J(this,this.options.touchAction),dt(this,!0),c(this.options.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function dt(t,e){var i=t.element;if(i.style){var n;c(t.options.cssProps,function(s,r){n=P(i.style,r),e?(t.oldCssProps[n]=i.style[n],i.style[n]=s):i.style[n]=t.oldCssProps[n]||""}),e||(t.oldCssProps={})}}function ft(t,e){var i=r.createEvent("Event");i.initEvent(t,!0,!0),i.gesture=e,e.target.dispatchEvent(i)}var vt,mt=["","webkit","Moz","MS","ms","o"],gt=r.createElement("div"),yt="function",Tt=Math.round,Et=Math.abs,bt=Date.now;vt="function"!=typeof Object.assign?function(t){if(t===a||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),i=1;i<arguments.length;i++){var n=arguments[i];if(n!==a&&null!==n)for(var s in n)n.hasOwnProperty(s)&&(e[s]=n[s])}return e}:Object.assign;var Ct=l(function(t,e,i){for(var n=Object.keys(e),s=0;s<n.length;)(!i||i&&t[n[s]]===a)&&(t[n[s]]=e[n[s]]),s++;return t},"extend","Use `assign`."),wt=l(function(t,e){return Ct(t,e,!0)},"merge","Use `assign`."),Pt=1,At=/mobile|tablet|ip(ad|hone|od)|android/i,St="ontouchstart"in s,xt=P(s,"PointerEvent")!==a,_t=St&&At.test(navigator.userAgent),It="touch",Dt="pen",Ot="mouse",kt="kinect",Mt=25,Nt=1,zt=2,Rt=4,qt=8,Lt=1,Wt=2,Xt=4,Ft=8,Yt=16,jt=Wt|Xt,Bt=Ft|Yt,Ht=jt|Bt,Ut=["x","y"],Vt=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(S(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&g(this.element,this.evEl,this.domHandler),this.evTarget&&g(this.target,this.evTarget,this.domHandler),this.evWin&&g(S(this.element),this.evWin,this.domHandler)}};var Gt={mousedown:Nt,mousemove:zt,mouseup:Rt},Zt="mousedown",$t="mousemove mouseup";p(F,x,{handler:function(t){var e=Gt[t.type];e&Nt&&0===t.button&&(this.pressed=!0),e&zt&&1!==t.which&&(e=Rt),this.pressed&&(e&Rt&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:Ot,srcEvent:t}))}});var Jt={pointerdown:Nt,pointermove:zt,pointerup:Rt,pointercancel:qt,pointerout:qt},Kt={2:It,3:Dt,4:Ot,5:kt},Qt="pointerdown",te="pointermove pointerup pointercancel";s.MSPointerEvent&&!s.PointerEvent&&(Qt="MSPointerDown",te="MSPointerMove MSPointerUp MSPointerCancel"),p(Y,x,{handler:function(t){var e=this.store,i=!1,n=t.type.toLowerCase().replace("ms",""),s=Jt[n],r=Kt[t.pointerType]||t.pointerType,o=r==It,a=b(e,t.pointerId,"pointerId");s&Nt&&(0===t.button||o)?a<0&&(e.push(t),a=e.length-1):s&(Rt|qt)&&(i=!0),a<0||(e[a]=t,this.callback(this.manager,s,{pointers:e,changedPointers:[t],pointerType:r,srcEvent:t}),i&&e.splice(a,1))}});var ee={touchstart:Nt,touchmove:zt,touchend:Rt,touchcancel:qt},ie="touchstart",ne="touchstart touchmove touchend touchcancel";p(j,x,{handler:function(t){var e=ee[t.type];if(e===Nt&&(this.started=!0),this.started){var i=B.call(this,t,e);e&(Rt|qt)&&i[0].length-i[1].length===0&&(this.started=!1),this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:It,srcEvent:t})}}});var se={touchstart:Nt,touchmove:zt,touchend:Rt,touchcancel:qt},re="touchstart touchmove touchend touchcancel";p(H,x,{handler:function(t){var e=se[t.type],i=U.call(this,t,e);i&&this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:It,srcEvent:t})}});var oe=2500,ae=25;p(V,x,{handler:function(t,e,i){var n=i.pointerType==It,s=i.pointerType==Ot;if(!(s&&i.sourceCapabilities&&i.sourceCapabilities.firesTouchEvents)){if(n)G.call(this,e,i);else if(s&&$.call(this,i))return;this.callback(t,e,i)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var ue=P(gt.style,"touchAction"),he=ue!==a,ce="compute",le="auto",pe="manipulation",de="none",fe="pan-x",ve="pan-y",me=Q();J.prototype={set:function(t){t==ce&&(t=this.compute()),he&&this.manager.element.style&&me[t]&&(this.manager.element.style[ue]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return c(this.manager.recognizers,function(e){f(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),K(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,i=t.offsetDirection;if(this.manager.session.prevented)return void e.preventDefault();var n=this.actions,s=T(n,de)&&!me[de],r=T(n,ve)&&!me[ve],o=T(n,fe)&&!me[fe];if(s){var a=1===t.pointers.length,u=t.distance<2,h=t.deltaTime<250;if(a&&u&&h)return}return o&&r?void 0:s||r&&i&jt||o&&i&Bt?this.preventSrc(e):void 0},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var ge=1,ye=2,Te=4,Ee=8,be=Ee,Ce=16,we=32;tt.prototype={defaults:{},set:function(t){return vt(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(h(t,"recognizeWith",this))return this;var e=this.simultaneous;return t=nt(t,this),e[t.id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return h(t,"dropRecognizeWith",this)?this:(t=nt(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(h(t,"requireFailure",this))return this;var e=this.requireFail;return t=nt(t,this),b(e,t)===-1&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(h(t,"dropRequireFailure",this))return this;t=nt(t,this);var e=b(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){i.manager.emit(e,t)}var i=this,n=this.state;n<Ee&&e(i.options.event+et(n)),e(i.options.event),t.additionalEvent&&e(t.additionalEvent),n>=Ee&&e(i.options.event+et(n))},tryEmit:function(t){return this.canEmit()?this.emit(t):void(this.state=we)},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(we|ge)))return!1;t++}return!0},recognize:function(t){var e=vt({},t);return f(this.options.enable,[this,e])?(this.state&(be|Ce|we)&&(this.state=ge),this.state=this.process(e),void(this.state&(ye|Te|Ee|Ce)&&this.tryEmit(e))):(this.reset(),void(this.state=we))},process:function(t){},getTouchAction:function(){},reset:function(){}},p(st,tt,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,i=t.eventType,n=e&(ye|Te),s=this.attrTest(t);return n&&(i&qt||!s)?e|Ce:n||s?i&Rt?e|Ee:e&ye?e|Te:ye:we}}),p(rt,st,{defaults:{event:"pan",threshold:10,pointers:1,direction:Ht},getTouchAction:function(){var t=this.options.direction,e=[];return t&jt&&e.push(ve),t&Bt&&e.push(fe),e},directionTest:function(t){var e=this.options,i=!0,n=t.distance,s=t.direction,r=t.deltaX,o=t.deltaY;return s&e.direction||(e.direction&jt?(s=0===r?Lt:r<0?Wt:Xt,i=r!=this.pX,n=Math.abs(t.deltaX)):(s=0===o?Lt:o<0?Ft:Yt,i=o!=this.pY,n=Math.abs(t.deltaY))),t.direction=s,i&&n>e.threshold&&s&e.direction},attrTest:function(t){return st.prototype.attrTest.call(this,t)&&(this.state&ye||!(this.state&ye)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=it(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),p(ot,st,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[de]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&ye)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),p(at,tt,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[le]},process:function(t){var e=this.options,i=t.pointers.length===e.pointers,n=t.distance<e.threshold,s=t.deltaTime>e.time;if(this._input=t,!n||!i||t.eventType&(Rt|qt)&&!s)this.reset();else if(t.eventType&Nt)this.reset(),this._timer=u(function(){this.state=be,this.tryEmit()},e.time,this);else if(t.eventType&Rt)return be;return we},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===be&&(t&&t.eventType&Rt?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=bt(),this.manager.emit(this.options.event,this._input)))}}),p(ut,st,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[de]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&ye)}}),p(ht,st,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:jt|Bt,pointers:1},getTouchAction:function(){return rt.prototype.getTouchAction.call(this)},attrTest:function(t){var e,i=this.options.direction;return i&(jt|Bt)?e=t.overallVelocity:i&jt?e=t.overallVelocityX:i&Bt&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&i&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&Et(e)>this.options.velocity&&t.eventType&Rt},emit:function(t){var e=it(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),p(ct,tt,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[pe]},process:function(t){var e=this.options,i=t.pointers.length===e.pointers,n=t.distance<e.threshold,s=t.deltaTime<e.time;if(this.reset(),t.eventType&Nt&&0===this.count)return this.failTimeout();if(n&&s&&i){if(t.eventType!=Rt)return this.failTimeout();var r=!this.pTime||t.timeStamp-this.pTime<e.interval,o=!this.pCenter||q(this.pCenter,t.center)<e.posThreshold;this.pTime=t.timeStamp,this.pCenter=t.center,o&&r?this.count+=1:this.count=1,this._input=t;var a=this.count%e.taps;if(0===a)return this.hasRequireFailures()?(this._timer=u(function(){this.state=be,this.tryEmit()},e.interval,this),ye):be}return we},failTimeout:function(){return this._timer=u(function(){this.state=we},this.options.interval,this),we},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==be&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),lt.VERSION="2.0.7",lt.defaults={domEvents:!1,touchAction:ce,enable:!0,inputTarget:null,inputClass:null,preset:[[ut,{enable:!1}],[ot,{enable:!1},["rotate"]],[ht,{direction:jt}],[rt,{direction:jt},["swipe"]],[ct],[ct,{event:"doubletap",taps:2},["tap"]],[at]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var Pe=1,Ae=2;pt.prototype={set:function(t){return vt(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?Ae:Pe},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var i,n=this.recognizers,s=e.curRecognizer;(!s||s&&s.state&be)&&(s=e.curRecognizer=null);for(var r=0;r<n.length;)i=n[r],e.stopped===Ae||s&&i!=s&&!i.canRecognizeWith(s)?i.reset():i.recognize(t),!s&&i.state&(ye|Te|Ee)&&(s=e.curRecognizer=i),r++}},get:function(t){if(t instanceof tt)return t;for(var e=this.recognizers,i=0;i<e.length;i++)if(e[i].options.event==t)return e[i];return null},add:function(t){if(h(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(h(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,i=b(e,t);i!==-1&&(e.splice(i,1),this.touchAction.update())}return this},on:function(t,e){if(t!==a&&e!==a){var i=this.handlers;return c(E(t),function(t){i[t]=i[t]||[],i[t].push(e)}),this}},off:function(t,e){if(t!==a){var i=this.handlers;return c(E(t),function(t){e?i[t]&&i[t].splice(b(i[t],e),1):delete i[t]}),this}},emit:function(t,e){this.options.domEvents&&ft(t,e);var i=this.handlers[t]&&this.handlers[t].slice();if(i&&i.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var n=0;n<i.length;)i[n](e),n++}},destroy:function(){this.element&&dt(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},vt(lt,{INPUT_START:Nt,INPUT_MOVE:zt,INPUT_END:Rt,INPUT_CANCEL:qt,STATE_POSSIBLE:ge,STATE_BEGAN:ye,STATE_CHANGED:Te,STATE_ENDED:Ee,STATE_RECOGNIZED:be,STATE_CANCELLED:Ce,STATE_FAILED:we,DIRECTION_NONE:Lt,DIRECTION_LEFT:Wt,DIRECTION_RIGHT:Xt,DIRECTION_UP:Ft,DIRECTION_DOWN:Yt,DIRECTION_HORIZONTAL:jt,DIRECTION_VERTICAL:Bt,DIRECTION_ALL:Ht,Manager:pt,Input:x,TouchAction:J,TouchInput:H,MouseInput:F,PointerEventInput:Y,TouchMouseInput:V,SingleTouchInput:j,Recognizer:tt,AttrRecognizer:st,Tap:ct,Pan:rt,Swipe:ht,Pinch:ot,Rotate:ut,Press:at,on:m,off:g,each:c,merge:wt,extend:Ct,assign:vt,inherit:p,bindFn:d,prefixed:P});var Se="undefined"!=typeof s?s:"undefined"!=typeof self?self:{};Se.Hammer=lt,n=function(){return lt}.call(e,i,e,t),!(n!==a&&(t.exports=n))}(window,document,"Hammer")},function(t,e,i){t.exports=i(0)}])});
//# sourceMappingURL=build.js.map