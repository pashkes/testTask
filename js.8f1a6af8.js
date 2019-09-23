parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"EN2s":[function(require,module,exports) {
function e(e,a){return r(e)||n(e,a)||t()}function t(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function n(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var i,s=e[Symbol.iterator]();!(r=(i=s.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(u){a=!0,o=u}finally{try{r||null==s.return||s.return()}finally{if(a)throw o}}return n}}function r(e){if(Array.isArray(e))return e}function a(e){return s(e)||i(e)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function i(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function s(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}var u=document.querySelector(".js-connect-form"),c=a(u.elements),l=document.querySelector(".js-status-sent"),d=u.querySelector("button"),m={EMAIL:/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,COUNTRY_CODE:/^\+[0-9]+$/},f={firstName:{name:"First name",required:!0,minLength:3},lastName:{name:"Last name",required:!0,minLength:3},email:{name:"Email",required:!0,regex:m.EMAIL},phonePrefix:{name:"Country code",required:!0,regex:m.COUNTRY_CODE},phone:{name:"Phone",required:!0,integer:!0,minLength:7}},h={getMinLength:function(e,t){return"".concat(e," must have at least ").concat(t," characters")},getRequired:function(e){return"".concat(e," is a required field")},getRightFormat:function(e){return"Please enter a valid ".concat(e)},getOnlyNumbers:function(e){return"".concat(e," should be only digits")}},g=function(e,t){var n={};for(var r in t)if(t.hasOwnProperty(r))switch(r){case"required":n[r]=e.length>0;break;case"minLength":n[r]=e.length>=t.minLength;break;case"regex":n[r]=t.regex.test(e);break;case"integer":n[r]=Number(e)&&"number"==typeof Number(e)}return n},y=function(t){t.preventDefault();var n=new FormData(u),r=a(n),o=[],i=!0,s=!1,l=void 0;try{for(var m,y=function(){var t=e(m.value,2),n=t[0],r=t[1],i=c.find(function(e){return e.name===n}).nextElementSibling,s=f[n],u=g(r,s),l=u.hasOwnProperty("required"),d=u.hasOwnProperty("minLength"),y=u.hasOwnProperty("regex"),b=u.hasOwnProperty("integer");l&&!u.required?(i.textContent=h.getRequired(s.name),i.classList.add("show")):b&&!u.integer?(i.textContent=h.getOnlyNumbers(s.name),i.classList.add("show")):d&&!u.minLength?(i.textContent=h.getMinLength(s.name,s.minLength),i.classList.add("show")):y&&!u.regex?(i.textContent=h.getRightFormat(s.name),i.classList.add("show")):(i.textContent="",i.classList.remove("show")),o.push.apply(o,a(Object.values(u)))},p=r[Symbol.iterator]();!(i=(m=p.next()).done);i=!0)y()}catch(w){s=!0,l=w}finally{try{i||null==p.return||p.return()}finally{if(s)throw l}}o.every(function(e){return e})&&(d.disabled=!d.disabled,C(n,b,v))},b=function(e){"success"===e.message?p():w()},v=function(){d.disabled=!d.disabled,console.error("Something went wrong")},p=function(){c.forEach(function(e){return e.value=""}),l.textContent="The form has been sent successfully, we will contact you",l.classList.add("success"),l.classList.remove("error"),d.disabled=!1},w=function(){l.textContent="Something went wrong, the email did not pass the check",l.classList.remove("success"),l.classList.add("error"),d.disabled=!1};u&&u.addEventListener("submit",y);var L=200,O=1e4,x="./check-email.php",q={POST:"POST"},S=function(e,t){var n=new XMLHttpRequest;return n.timeout=O,n.addEventListener("load",function(){n.status===L?e(JSON.parse(n.response)):t("Unknown status: ".concat(n.status,": ").concat(n.statusText))}),n.addEventListener("error",function(){t("Connection failed")}),n.addEventListener("timeout",function(){t("Request did not manage to fulfill for ".concat(n.timeout,"ms"))}),n},C=function(e,t,n){var r=S(t,n);r.open(q.POST,x),r.send(e)};
},{}]},{},["EN2s"], null)
//# sourceMappingURL=js.8f1a6af8.js.map