(window.webpackJsonp=window.webpackJsonp||[]).push([[173],{1315:function(t,a,s){"use strict";s.r(a);var e=s(23),v=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"tag-标签"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#tag-标签"}},[t._v("#")]),t._v(" Tag 标签")]),t._v(" "),s("h2",{attrs:{id:"预览"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#预览"}},[t._v("#")]),t._v(" 预览")]),t._v(" "),s("ClientOnly",[s("demo-list",{attrs:{type:"tag"}})],1),t._v(" "),s("h2",{attrs:{id:"安装使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装使用"}},[t._v("#")]),t._v(" 安装使用")]),t._v(" "),s("h3",{attrs:{id:"npm安装-ams-team-field-tag"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#npm安装-ams-team-field-tag"}},[t._v("#")]),t._v(" npm安装 @ams-team/field-tag "),s("Badge",{attrs:{text:"1.0.9"}})],1),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("npm i --save @ams-team/field-tag\n")])])]),s("p",[t._v("npm安装完后，记得在入口文件引入：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" tag "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@ams-team/field-tag'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nVue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("tag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h3",{attrs:{id:"使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用"}},[t._v("#")]),t._v(" 使用")]),t._v(" "),s("p",[t._v("在AMS的resourc配置：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("testTag"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    type"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'tag'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    label"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'标签'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    props"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        placeholder"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'请输入标签'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        action"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'//rap2api.taobao.org/app/mock/231578/ams/mock/tag'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        successCode"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("接口数据结构：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('{\n    "code":200,\n    "data":{\n        "list":[\n            {\n                "id":"aaaa.bbb",\n                "name":"aaaa.bbb.name"\n            }\n            ...\n        ]\n    },\n    "msg":"success"\n}\n')])])]),s("h2",{attrs:{id:"传值"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#传值"}},[t._v("#")]),t._v(" 传值")]),t._v(" "),s("p",[t._v("Array")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('[\n    {\n        "id":"aaaa.bbb",\n        "name":"aaaa.bbb.name"\n    }\n    ...\n]\n')])])]),s("h2",{attrs:{id:"配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置"}},[t._v("#")]),t._v(" 配置")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("参数")]),t._v(" "),s("th",[t._v("类型")]),t._v(" "),s("th",[t._v("必填")]),t._v(" "),s("th",[t._v("说明")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("type")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("是")]),t._v(" "),s("td",[t._v("文本类型，固定值为"),s("code",[t._v("tag")])])]),t._v(" "),s("tr",[s("td",[t._v("label")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("否")]),t._v(" "),s("td",[t._v("标签文本")])]),t._v(" "),s("tr",[s("td",[t._v("hidden")]),t._v(" "),s("td",[t._v("boolean")]),t._v(" "),s("td",[t._v("否")]),t._v(" "),s("td",[t._v("是否隐藏field，默认为false")])]),t._v(" "),s("tr",[s("td",[t._v("rules")]),t._v(" "),s("td",[t._v("array")]),t._v(" "),s("td",[t._v("否")]),t._v(" "),s("td",[t._v("校验规则，详见"),s("a",{attrs:{href:"https://github.com/yiminghe/async-validator",target:"_blank",rel:"noopener noreferrer"}},[t._v("async-validator"),s("OutboundLink")],1)])]),t._v(" "),s("tr",[s("td",[t._v("props")]),t._v(" "),s("td",[t._v("object")]),t._v(" "),s("td",[t._v("-")]),t._v(" "),s("td",[t._v("补充属性")])]),t._v(" "),s("tr",[s("td",[t._v("props.action")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("是")]),t._v(" "),s("td",[t._v("标签数据接口地址")])]),t._v(" "),s("tr",[s("td",[t._v("props.method")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("否")]),t._v(" "),s("td",[t._v("接口请求方法，默认值为"),s("code",[t._v("GET")])])]),t._v(" "),s("tr",[s("td",[t._v("props.successCode")]),t._v(" "),s("td",[t._v("number")]),t._v(" "),s("td",[t._v("否")]),t._v(" "),s("td",[t._v("接口请求成功code，默认值和resource的全局配置里的"),s("code",[t._v("api")]),t._v(" "),s("code",[t._v("successCode")]),t._v(" 一致")])]),t._v(" "),s("tr",[s("td",[t._v("props.placeholder")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("否")]),t._v(" "),s("td",[t._v("输入框的"),s("code",[t._v("placeholder")]),t._v("配置")])]),t._v(" "),s("tr",[s("td",[t._v("props.button")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("否")]),t._v(" "),s("td",[t._v("添加按钮的文案配置，默认值为 "),s("code",[t._v("+ 添加")])])]),t._v(" "),s("tr",[s("td",[t._v("props.size")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("否")]),t._v(" "),s("td",[t._v("尺寸，可取值：medium / small / mini")])]),t._v(" "),s("tr",[s("td",[t._v("props.closable")]),t._v(" "),s("td",[t._v("boolean")]),t._v(" "),s("td",[t._v("否")]),t._v(" "),s("td",[t._v("编辑状态下，标签是否可关闭，默认值为 "),s("code",[t._v("false")])])]),t._v(" "),s("tr",[s("td",[t._v("props.template")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("否")]),t._v(" "),s("td",[t._v("标签显示的内容模板，语法和vue的模板语法类似，比如 "),s("code",[t._v(t._s(t.name)+" - "+t._s(t.id))]),t._v(" （其中name和id是数据结构里的字段），默认标签内容只展示"),s("code",[t._v("name")]),t._v("字段")])])])])],1)}),[],!1,null,null,null);a.default=v.exports}}]);