(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{1279:function(e,o,s){"use strict";s.r(o);var t=s(388),i={progressField1:{type:"form",resource:{fields:{progressFieldA:{type:"progress",label:"进度"},progressFieldB:{type:"progress",label:"带默认值",default:10},progressFieldC:{type:"progress",label:"纯展示",default:10,ctx:"view"}}},ctx:"edit"}},n=s(400),a=s.n(n),l=s(399),c=s.n(l),r={mixins:[t.a],mounted:function(){var e=a()(i[this.blockName]);this.configCode=c()(e,{indent_size:2,space_in_empty_paren:!0}),ams&&ams.blocks&&ams.blocks[this.blockName]||ams.block(this.blockName,i[this.blockName]),this.init=!0}},d=s(23),f=Object(d.a)(r,(function(){var e=this,o=e.$createElement,s=e._self._c||o;return s("el-card",{staticClass:"demo demo-card",attrs:{shadow:"hover"}},[e.init?s("ams-block",{staticClass:"demo-card-preview",attrs:{name:e.blockName}}):e._e(),e._v(" "),s("div",{class:"demo-card-config "+(e.showConfig?"open":"")},[s("highlight-code",{attrs:{lang:"javascript"}},[e._v("\n            "+e._s(e.configCode)+"\n        ")])],1),e._v(" "),s("div",{staticClass:"demo-card-config-btn",on:{click:e.toggleDemoCofig}},[s("i",{class:"el-icon-caret-"+(e.showConfig?"top":"bottom")}),e._v("\n         "+e._s(e.showConfig?"隐藏":"显示")+"配置\n        "),e.onlineDemo?s("el-link",{attrs:{href:e.onlineDemo,target:"_blank",type:"success"}},[e._v("在线运行")]):e._e()],1)],1)}),[],!1,null,null,null);o.default=f.exports},387:function(e,o,s){"use strict";var t=s(0),i=(s(393),s(392)),n=s.n(i),a=s(390),l=s.n(a),c=s(398),r=s(394),d=s.n(r),f=(s(395),s(396)),u=s.n(f),g=s(397),m=s.n(g);t.default.use(n.a),t.default.use(l.a),console.log("ams init config"),t.default.use(u.a),t.default.use(m.a),"undefined"!=typeof window&&(window.Vue=t.default),t.default.use(c.a,{languages:{javascript:d.a}}),l.a.config({resource:{api:{withCredentials:!1}}})},388:function(e,o,s){"use strict";s(387);o.a={data:function(){return{init:!1,showConfig:!1,configCode:"",codeBlock:{type:"form",data:{code:""},resource:{fields:{code:{type:"ams-code",labelWidth:"0"}}}}}},props:{blockName:String,onlineDemo:String},methods:{toggleDemoCofig:function(e){"el-link--inner"!==e.target.className&&(this.showConfig=!this.showConfig)}}}}}]);