(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5fc89218"],{"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r("d3b7"),r("e6cf");function n(t,e,r,n,o,i,a){try{var s=t[i](a),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function s(t){n(a,o,i,s,c,"next",t)}function c(t){n(a,o,i,s,c,"throw",t)}s(void 0)}))}}},2852:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"do-exam"}},[r("v-app-bar",{staticClass:"countdowns",attrs:{app:"",color:"white","scroll-target":"#scrolling-techniques-7"}},[r("span",[t._v("剩余时间："+t._s(t.remainTime))])]),r("v-sheet",{staticClass:"overflow-y-auto",attrs:{id:"scrolling-techniques-7"}},[r("v-content",[r("v-container",[r("header",{staticClass:"paper-header"},[r("h1",[t._v(t._s(t.examPaper.name))]),r("div",[r("span",{staticClass:"question-title-padding"},[t._v("试卷总分："+t._s(t.examPaper.PaperScore)+" ")]),r("span",{staticClass:"question-title-padding"},[t._v("考试时间："+t._s(t.examPaper.countDown)+"分钟 ")]),r("span",{staticClass:"question-title-padding"},[t._v("当前考生：lxy ")])])]),r("v-card",{staticClass:"mx-auto mt-6",staticStyle:{"margin-bottom":"75px"},attrs:{"max-width":"344",outlined:"",elevation:"4"}},[r("v-list-item",{attrs:{"three-line":""}},[r("v-list-item-content",[r("v-list-item-title",{staticClass:"headline mb-1"},[t._v(" 2018的负数为？ ")]),r("v-list-item-subtitle",[r("v-item",{scopedSlots:t._u([{key:"default",fn:function(e){e.active,e.toggle;return[r("v-chip-group",{attrs:{column:"","active-class":"purple"},model:{value:t.current_option,callback:function(e){t.current_option=e},expression:"current_option"}},[r("v-chip",{staticClass:"option"},[t._v(" A. 2018 ")]),r("v-chip",{staticClass:"option"},[t._v(" B. -2018 ")]),r("v-chip",{staticClass:"option"},[t._v(" C. 20 ")]),r("v-chip",{staticClass:"option"},[t._v(" D. 0 ")])],1)]}}])})],1)],1)],1),r("v-card-actions",{staticClass:"btn"},[r("v-btn",{staticClass:"ma-2",attrs:{outlined:"",color:"indigo"},on:{click:function(e){return t.preQue()}}},[t._v("上一题")]),r("v-btn",{staticClass:"ma-2",attrs:{outlined:"",color:"indigo"},on:{click:function(e){return t.nextQue()}}},[t._v("下一题")]),r("v-btn",{staticClass:"ma-2",attrs:{tile:"",color:"indigo",dark:""},on:{click:t.confirmSubmitExam}},[t._v("提交")])],1)],1)],1)],1)],1),r("v-footer",{staticClass:"font-weight-medium",attrs:{absolute:""}},[r("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[r("v-bottom-sheet",{attrs:{persistent:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[r("v-btn",t._g({attrs:{color:"green",dark:""}},n),[t._v("查看答题卡")])]}}]),model:{value:t.sheet,callback:function(e){t.sheet=e},expression:"sheet"}},[r("v-sheet",{staticClass:"text-center",attrs:{height:"200px"}},[r("v-btn",{staticClass:"mt-6",attrs:{text:"",color:"error"},on:{click:function(e){t.sheet=!t.sheet}}},[t._v("close")]),r("div",{staticClass:"py-3"},t._l(t.formQueItems,(function(e,n){return r("v-btn",{key:n,staticClass:"ma-2",attrs:{outlined:-1===e.current_option,fab:"",color:"teal"},on:{click:function(e){return t.jumpToQue(n)}}},[t._v(t._s(n+1))])})),1)],1)],1)],1)],1),r("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.dialog_tips.dialog,callback:function(e){t.$set(t.dialog_tips,"dialog",e)},expression:"dialog_tips.dialog"}},[r("v-card",[r("v-card-text",[t._v(t._s(t.dialog_tips.card_title))]),r("v-card-actions",[r("v-spacer"),r("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:t.submitExam}},[t._v("是的，我确定提交")]),r("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){t.dialog_tips.dialog=!1}}},[t._v("返回继续答题")])],1)],1)],1)],1)},o=[],i=(r("d81d"),r("96cf"),r("1da1")),a=r("5530"),s=r("4c05"),c=r("2f62"),u={data:function(){return{dialog_tips:{dialog:!1,card_title:""},current_paper_id:this.$route.query.id,current_question:0,current_option:-1,sheet:!1,remainTime:0,timer:null,examPaper:{}}},created:function(){this.searchPaper()},computed:Object(a["a"])({},Object(c["b"])(["user"]),{formQueItem:function(){return console.log(this.formQueItems[this.current_question]),this.formQueItems[this.current_question]||{}}}),methods:{searchPaper:function(){var t=this;this.$api.SelPaper(this.$route.params.id).then((function(e){console.log(e);var r=e.data.examPaper_question.map((function(t){return t.current_option=-1,t}));t.examPaper=Object(a["a"])({},e.data.examPaper,{questions:r}),t.remainTime=60*t.examPaper.countDown,console.log(t.examPaper)}))},nextQue:function(){this.current_question<this.formQueItems.length-1&&(this.getOptionFromQueItems(++this.current_question),console.log("当前题目号为：",this.current_question+1))},preQue:function(){this.current_question>0&&(this.getOptionFromQueItems(--this.current_question),console.log(this.current_option),console.log("当前题目号为：",this.current_question+1))},jumpToQue:function(t){this.current_question=t,this.getOptionFromQueItems(t),console.log("当前题目号为：",this.current_question+1)},toggleOption:function(t){this.formQueItems[this.current_question].current_option=t},getOptionFromQueItems:function(t){this.current_option=this.formQueItems[t].current_option},confirmSubmitExam:function(){var t;for(t=0;t<this.formQueItems.length;t++){var e=this.formQueItems[t];if(-1===e.current_option){this.dialog_tips.dialog=!0,this.dialog_tips.card_title="你还有题目未做，是否提交？";break}}t===this.formQueItems.length&&(this.dialog_tips.dialog=!0,this.dialog_tips.card_title="时间还未到，是否继续提交？",this.submitExam())},submitExam:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.dialog_tips.dialog=!1,t.user.do_time=t.paper.countdown-t.remainTime;case 2:case"end":return e.stop()}}),e)})))()},timeReduce:function(){var t=this;this.timer=setInterval((function(){t.remainTime<=0?setTimeout((function(){t.submitExam()}),2e3):t.remainTime--}),1e3)}},components:{SnackBar:s["a"]}},l=u,h=(r("98e4"),r("2877")),f=r("6544"),p=r.n(f),d=r("40dc"),m=r("288c"),v=r("8336"),g=r("b0af"),y=r("99d9"),_=r("cc20"),w=r("ef9a"),x=r("62ad"),b=r("a523"),C=r("a75b"),L=r("169a"),k=r("553a"),E=r("d903"),I=r("da13"),O=r("5d23"),q=r("8dd9"),P=r("2fa4"),Q=Object(h["a"])(l,n,o,!1,null,"0f5d9a20",null);e["default"]=Q.exports;p()(Q,{VAppBar:d["a"],VBottomSheet:m["a"],VBtn:v["a"],VCard:g["a"],VCardActions:y["a"],VCardText:y["b"],VChip:_["a"],VChipGroup:w["a"],VCol:x["a"],VContainer:b["a"],VContent:C["a"],VDialog:L["a"],VFooter:k["a"],VItem:E["a"],VListItem:I["a"],VListItemContent:O["a"],VListItemSubtitle:O["b"],VListItemTitle:O["c"],VSheet:q["a"],VSpacer:P["a"]})},"48ed":function(t,e,r){},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function c(t,e,r,n){var o=e&&e.prototype instanceof m?e:m,i=Object.create(o.prototype),a=new O(n||[]);return i._invoke=L(t,r,a),i}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}t.wrap=c;var l="suspendedStart",h="suspendedYield",f="executing",p="completed",d={};function m(){}function v(){}function g(){}var y={};y[i]=function(){return this};var _=Object.getPrototypeOf,w=_&&_(_(q([])));w&&w!==r&&n.call(w,i)&&(y=w);var x=g.prototype=m.prototype=Object.create(y);function b(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function C(t,e){function r(o,i,a,s){var c=u(t[o],t,i);if("throw"!==c.type){var l=c.arg,h=l.value;return h&&"object"===typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,a,s)}),(function(t){r("throw",t,a,s)})):e.resolve(h).then((function(t){l.value=t,a(l)}),(function(t){return r("throw",t,a,s)}))}s(c.arg)}var o;function i(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}this._invoke=i}function L(t,e,r){var n=l;return function(o,i){if(n===f)throw new Error("Generator is already running");if(n===p){if("throw"===o)throw i;return P()}r.method=o,r.arg=i;while(1){var a=r.delegate;if(a){var s=k(a,r);if(s){if(s===d)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===l)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=f;var c=u(t,e,r);if("normal"===c.type){if(n=r.done?p:h,c.arg===d)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=p,r.method="throw",r.arg=c.arg)}}}function k(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,k(t,r),"throw"===r.method))return d;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=u(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,d;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,d):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,d)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function I(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function q(t){if(t){var r=t[i];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){while(++o<t.length)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:P}}function P(){return{value:e,done:!0}}return v.prototype=x.constructor=g,g.constructor=v,g[s]=v.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},b(C.prototype),C.prototype[a]=function(){return this},t.AsyncIterator=C,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new C(c(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},b(x),x[s]="Generator",x[i]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=q,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(I),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),I(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;I(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:q(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),d}},t}(t.exports);try{regeneratorRuntime=n}catch(o){Function("r","regeneratorRuntime = r")(n)}},"98e4":function(t,e,r){"use strict";var n=r("48ed"),o=r.n(n);o.a}}]);
//# sourceMappingURL=chunk-5fc89218.35d10966.js.map