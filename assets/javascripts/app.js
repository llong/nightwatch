!function(e,t){"use strict";"function"==typeof define&&define.amd?define(["angular"],t):e.hasOwnProperty("angular")?t(e.angular):"object"==typeof exports&&(module.exports=t(require("angular")))}(this,function(e){"use strict";function t(e,t){var o;try{o=e[t]}catch(r){o=!1}if(o){var n="__"+Math.round(1e7*Math.random());try{e[t].setItem(n,n),e[t].removeItem(n,n)}catch(r){o=!1}}return o}function o(o){var r=t(window,o);return function(){var n="ngStorage-";this.setKeyPrefix=function(e){if("string"!=typeof e)throw new TypeError("[ngStorage] - "+o+"Provider.setKeyPrefix() expects a String.");n=e};var a=e.toJson,s=e.fromJson;this.setSerializer=function(e){if("function"!=typeof e)throw new TypeError("[ngStorage] - "+o+"Provider.setSerializer expects a function.");a=e},this.setDeserializer=function(e){if("function"!=typeof e)throw new TypeError("[ngStorage] - "+o+"Provider.setDeserializer expects a function.");s=e},this.supported=function(){return!!r},this.get=function(e){return r&&s(r.getItem(n+e))},this.set=function(e,t){return r&&r.setItem(n+e,a(t))},this.remove=function(e){r&&r.removeItem(n+e)},this.$get=["$rootScope","$window","$log","$timeout","$document",function(r,i,l,c,u){var p,d,h=n.length,f=t(i,o),g=f||(l.warn("This browser does not support Web Storage!"),{setItem:e.noop,getItem:e.noop,removeItem:e.noop}),m={$default:function(t){for(var o in t)e.isDefined(m[o])||(m[o]=e.copy(t[o]));return m.$sync(),m},$reset:function(e){for(var t in m)"$"===t[0]||delete m[t]&&g.removeItem(n+t);return m.$default(e)},$sync:function(){for(var e,t=0,o=g.length;o>t;t++)(e=g.key(t))&&n===e.slice(0,h)&&(m[e.slice(h)]=s(g.getItem(e)))},$apply:function(){var t;if(d=null,!e.equals(m,p)){t=e.copy(p),e.forEach(m,function(o,r){e.isDefined(o)&&"$"!==r[0]&&(g.setItem(n+r,a(o)),delete t[r])});for(var o in t)g.removeItem(n+o);p=e.copy(m)}},$supported:function(){return!!f}};return m.$sync(),p=e.copy(m),r.$watch(function(){d||(d=c(m.$apply,100,!1))}),i.addEventListener&&i.addEventListener("storage",function(t){if(t.key){var o=u[0];o.hasFocus&&o.hasFocus()||n!==t.key.slice(0,h)||(t.newValue?m[t.key.slice(h)]=s(t.newValue):delete m[t.key.slice(h)],p=e.copy(m),r.$apply())}}),i.addEventListener&&i.addEventListener("beforeunload",function(){m.$apply()}),m}]}}return e=e&&e.module?e:window.angular,e.module("ngStorage",[]).provider("$localStorage",o("localStorage")).provider("$sessionStorage",o("sessionStorage"))});var app=angular.module("app",["ngRoute","ngStorage"]);app.config(["$routeProvider","$locationProvider",function(e,t){e.when("/",{templateUrl:"/assets/partials/dashboard.html",controller:"dashboardController"}).when("/login",{templateUrl:"/assets/partials/login.html",controller:"loginController"}).when("/register",{templateUrl:"/assets/partials/register.html",controller:"registerController"}).when("/create-name-password",{templateUrl:"/assets/partials/create-name-password.html"}).when("/add-phone",{templateUrl:"/assets/partials/add-phone.html"}).when("/primary-address",{templateUrl:"/assets/partials/primary-address.html"}).when("/billing-address",{templateUrl:"/assets/partials/billing-address.html"}).when("/create-subaccount",{templateUrl:"/assets/partials/create-subaccount.html"}).when("/create-group",{templateUrl:"/assets/partials/create-group.html"}).when("/add-device",{templateUrl:"/assets/partials/add-device.html",controller:"deviceController"}).when("/add-horse",{templateUrl:"/assets/partials/add-horse.html",controller:"horseController"}).when("/notification-settings",{templateUrl:"/assets/partials/notification-settings.html"}).otherwise({redirectTo:"/login"})}]),app.run(["$http","$localStorage",function(e,t){if(t.token){var o=t.token;e.defaults.headers.common.Authorization="Bearer "+o.access_token,e.defaults.headers.common.Accept="application/json;odata=verbose"}}]),app.factory("authenticate",function(){var e="https://portaldev.nightwatch24.com:44433/";return e}),app.factory("horseService",["$http",function(e){var t="https://portaldev.nightwatch24.com:44433/",o={async:function(){var o=e.get(t+"/api/horse").then(function(e){return e.data});return o}};return o}]),app.controller("dashboardController",["$scope","$http","$localStorage","$location","authenticate",function(e,t,o,r,n){var a=n,s=function(){t.get(a+"api/horse",{headers:{Authorization:"Bearer "+o.token.access_token}}).then(function(t){e.horses=t.data,console.log(e.horses),e.serialNumber="",e.nickName=""})["catch"](function(e){if(null==token)throw r.path("/login"),e;console.log("all good")})["finally"](function(){e.loading=!1})};s(),e.ediColor=function(e){return e.edi_score<4?"label-success":e.edi_score<6?"label-warning":"label-danger"},e.loading=!0,e.getHorse=function(o){e.activeHorse=o,console.log(o),console.log(e.activeHorse),t.get(a+"/api/horse/"+o.id+"/metric/latest").then(function(t){e.metrics=t.data,console.log(e.metrics)})["catch"](function(e){console.log(e)})["finally"](function(){e.loading=!1})}}]),app.controller("deviceController",["$scope","$http","$localStorage","$location","authenticate",function(e,t,o,r,n){var a=n;e.regex=/^[a-zA-Z0-9]{12}?/,e.addDevice=function(){t.post(a+"api/device",{serialNumber:e.serialNumber,nickName:e.nickName}).then(function(t){e.devices=t,console.log(t),e.serialNumber="",e.nickName=""},function(e){console.log(e)})}}]),app.controller("groupController",["$scope",function(e){e.group=!1,e.groups=[],e.assignGroupLink="",e.assignGroup=function(){e.group?(e.group=!1,this.innerHTML="Don't Assign Address To Group"):(e.group=!0,this.innerHTML="Don't Assign Address To Group")},e.addGroup=function(){e.groups.push({groupName:e.groupName,address:e.address,address2:e.address2,city:e.city,state:e.state,country:e.country}),e.groupName="",e.address="",e.address2="",e.city="",e.state="",e.country="",e.group=!1}}]),app.controller("horseController",["$scope","$http","$localStorage","$location","authenticate",function(e,t,o,r,n){var a=n;e.addHorse=function(){t.post(a+"api/horse",{registeredName:e.registeredName,nickName:e.nickName,sex:e.sex,breed:e.breed}).then(function(t){e.horses=t,console.log(t),e.horseForm=null},function(e){console.log(e)})}}]),app.controller("loginController",["$scope","$http","$localStorage","$location","authenticate",function(e,t,o,r,n){var a=n;e.login=function(){t.post(a+"api/login",{username:e.username,password:e.password}).then(function(t){e.userData=t.data,o.token=t.data,console.log(t)})["catch"](function(e){throw e})["finally"](function(){r.path("/")})}}]),app.controller("mainController",["$scope","$http","$localStorage","$location","authenticate",function(e,t,o,r,n){e.toggleMenu=function(){e.expanded=!e.expanded}}]),app.controller("registerController",["$scope","$http","authenticate",function(e,t,o){var r=o;e.register=function(o,n){e.password===e.password2&&t.post(r+"account/register",{username:e.username,email:e.email,salutation:e.salutation,firstName:e.firstName,lastName:e.lastName,password:e.password}).then(function(e){console.log(e)},function(e){console.log(e)})}}]),app.controller("userController",["$scope",function(e){e.showUserForm=function(){e.skipButton=!1,e.AddUserForm=!0,console.log("click")}}]);