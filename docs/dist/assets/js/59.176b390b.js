(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{1266:function(e,t,i){"use strict";i.r(t);var n=i(388),a={linkField1:{type:"form",resource:{fields:{link:{type:"link",label:"href链接",props:{href:"https://vip.com",target:"_blank"}},primaryLink:{type:"link",label:"值为链接ID",props:{type:"primary",target:"_blank",href:function(e){return"http://vip.com/v/gce/ruledetail?id="+e}}},successLink:{type:"link",label:"值为链接",props:{type:"success",icon:"el-icon-share"}}}},ctx:"edit"},linkField2:{type:"form",resource:{fields:{link:{type:"link",label:"href链接",props:{href:"https://vip.com",target:"_blank"}},primaryLink:{type:"link",label:"值为链接ID",props:{type:"primary",target:"_blank",href:function(e){return"http://vip.com/v/gce/ruledetail?id="+e}}},successLink:{type:"link",label:"值为链接",props:{type:"success",icon:"el-icon-share"}}}},data:{link:"默认",primaryLink:"51853695",successLink:"https://vip.com"},ctx:"view"},linkField3:{type:"form",resource:{fields:{objectLink:{type:"object",label:"对象类型",fields:{name:{type:"text",label:"测试"},link:{type:"link",label:"链接",props:{type:"primary",target:"_blank"}}}},arrayLink:{type:"array",label:"多个链接",field:{type:"link",label:"链接",props:{type:"primary",target:"_blank",href:function(e,t){return"http://vip.com/v/gce/ruledetail?id="+e}}}},viewArrayLink:{type:"array",label:"多个链接展示",field:{type:"link",label:"链接",props:{type:"primary",target:"_blank",href:function(e,t){return"http://vip.com/v/gce/ruledetail?id="+e}},ctx:"view"},ctx:"view"}}},data:{objectLink:{name:"w3cmark",link:"http://w3cmark.com"},arrayLink:["51853695-1","51853695-2","51853695-3"],viewArrayLink:["51853695-1","51853695-2","51853695-3"]},ctx:"edit"}},l=i(400),o=i.n(l),r=i(399),s=i.n(r),c={mixins:[n.a],mounted:function(){var e=o()(a[this.blockName]);this.configCode=s()(e,{indent_size:2,space_in_empty_paren:!0}),ams&&ams.blocks&&ams.blocks[this.blockName]||ams.block(this.blockName,a[this.blockName]),this.init=!0}},p=i(23),d=Object(p.a)(c,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-card",{staticClass:"demo demo-card",attrs:{shadow:"hover"}},[e.init?i("ams-block",{staticClass:"demo-card-preview",attrs:{name:e.blockName}}):e._e(),e._v(" "),i("div",{class:"demo-card-config "+(e.showConfig?"open":"")},[i("highlight-code",{attrs:{lang:"javascript"}},[e._v("\n            "+e._s(e.configCode)+"\n        ")])],1),e._v(" "),i("div",{staticClass:"demo-card-config-btn",on:{click:e.toggleDemoCofig}},[i("i",{class:"el-icon-caret-"+(e.showConfig?"top":"bottom")}),e._v("\n         "+e._s(e.showConfig?"隐藏":"显示")+"配置\n        "),e.onlineDemo?i("el-link",{attrs:{href:e.onlineDemo,target:"_blank",type:"success"}},[e._v("在线运行")]):e._e()],1)],1)}),[],!1,null,null,null);t.default=d.exports},387:function(e,t,i){"use strict";var n=i(0),a=(i(393),i(392)),l=i.n(a),o=i(390),r=i.n(o),s=i(398),c=i(394),p=i.n(c),d=(i(395),i(396)),f=i.n(d),k=i(397),m=i.n(k);n.default.use(l.a),n.default.use(r.a),console.log("ams init config"),n.default.use(f.a),n.default.use(m.a),"undefined"!=typeof window&&(window.Vue=n.default),n.default.use(s.a,{languages:{javascript:p.a}}),r.a.config({resource:{api:{withCredentials:!1}}})},388:function(e,t,i){"use strict";i(387);t.a={data:function(){return{init:!1,showConfig:!1,configCode:"",codeBlock:{type:"form",data:{code:""},resource:{fields:{code:{type:"ams-code",labelWidth:"0"}}}}}},props:{blockName:String,onlineDemo:String},methods:{toggleDemoCofig:function(e){"el-link--inner"!==e.target.className&&(this.showConfig=!this.showConfig)}}}}}]);