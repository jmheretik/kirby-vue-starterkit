(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{204:function(t,e,n){var content=n(206);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(31).default)("cb41ff4e",content,!1,{sourceMap:!1})},205:function(t,e,n){"use strict";var r=n(204);n.n(r).a},206:function(t,e,n){(e=n(30)(!1)).push([t.i,".intro{padding:10vh 0;text-align:center}.intro h1{position:relative;margin-bottom:1rem;font-weight:900;font-size:calc(1vw + 2rem);z-index:1}",""]),t.exports=e},207:function(t,e,n){"use strict";n(18);var r=n(2),o={name:"Intro",props:{title:{type:String,default:null}}},c=(n(205),n(10)),l=Object(c.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("header",{staticClass:"intro"},[e("h1",[this._v(this._s(this.title))])])}),[],!1,null,null,null).exports;e.a={components:{Intro:l},asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.app,e.next=3,n.$api.getPage(n.$pageId);case 3:return e.t0=e.sent,e.abrupt("return",{page:e.t0});case 5:case"end":return e.stop()}}),e)})))()},head:function(){return{title:"".concat(this.$site.title," | ").concat(this.page.title)}}}},213:function(t,e,n){var content=n(227);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(31).default)("6759f5ab",content,!1,{sourceMap:!1})},225:function(t,e){function n(t,e){let r=e||[];return t.forEach(t=>{t.mixins&&n(t.mixins,r),t.asyncData&&!r.includes(t)&&r.push(t)}),r}function r(t){if(t&&t.mixins){let e=n(t.mixins);if(e.length){let n=e.map(t=>t.asyncData);t.asyncData&&n.push(t.asyncData),t.asyncData=async t=>{const e=await Promise.all(n.map(e=>e(t)));return Object.assign.apply(Object,e)}}}return t}function o(t,e){if(t&&t.mixins){let o=n(t.mixins);if(o.length)if(t.asyncData){let e=t.asyncData;t.asyncData=async t=>(t.mixins=o,await e(t))}else if(e)return r(t)}return t}const c=r;c.sync=function(t){if(t&&t.mixins){let e=n(t.mixins);if(e.length){let n=e.map(t=>t.asyncData);t.asyncData&&n.push(t.asyncData),t.asyncData=async t=>{let e;for(let i=0;i<n.length;i++)t.asyncDataResult=e,e=Object.assign(e||{},await n[i](t));return e}}}return t},c.manual=t=>o(t,!1),c.controlled=t=>o(t,!0);t.exports=c},226:function(t,e,n){"use strict";var r=n(213);n.n(r).a},227:function(t,e,n){(e=n(30)(!1)).push([t.i,".grid{display:grid;list-style:none;grid-gap:1rem;line-height:0;grid-template-columns:repeat(1,1fr);grid-auto-flow:dense}.grid li{position:relative;--cols:1;--rows:1;overflow:hidden;background:#000;line-height:0}.grid li:first-child{--cols:2;--rows:2}.grid li:nth-child(5){--cols:2}.grid li:nth-child(6){--rows:2}.grid li:nth-child(7){--cols:2}.grid a{display:block;height:10rem}.grid img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover;transition:all .3s}.grid figcaption,.grid img{position:absolute;top:0;right:0;bottom:0;left:0}.grid figcaption{display:flex;align-items:center;justify-content:center;color:#fff;line-height:1;text-align:center;background:rgba(0,0,0,.5);text-transform:uppercase;font-size:.875rem;letter-spacing:.125em;font-weight:600}@media screen and (min-width:45em){.grid{grid-template-columns:repeat(3,1fr)}.grid li{grid-column-start:span var(--cols);grid-row-start:span var(--rows)}.grid a{padding-bottom:52.65%}}",""]),t.exports=e},230:function(t,e,n){"use strict";n.r(e);n(18);var r=n(2),o=n(225),c=n.n(o),l=n(207),f=c()({mixins:[l.a],asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.app,e.next=3,n.$api.getPage("photography");case 3:return e.t0=e.sent,e.abrupt("return",{photography:e.t0});case 5:case"end":return e.stop()}}),e)})))()}}),d=(n(226),n(10)),component=Object(d.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[n("Intro",{attrs:{title:t.page.title}}),t._v(" "),t.photography?n("ul",{staticClass:"grid"},t._l(t.photography.children,(function(e){return n("li",{key:e.id},[n("nuxt-link",{attrs:{to:"/"+e.id}},[n("figure",[e.coverHome?n("span",{domProps:{innerHTML:t._s(e.coverHome.html)}}):t._e(),t._v(" "),n("figcaption",[n("span",[n("span",{staticClass:"example-name"},[t._v(t._s(e.title))])])])])])],1)})),0):t._e()],1)}),[],!1,null,null,null);e.default=component.exports}}]);