// 更新日志
export default [
    {
        version: '0.32.1',
        date: '2020.06.03',
        log: [
            'feat: 设置add/editDialogDrawer 默认为 append-to-body',
            'feat: 添加addItemDrawer和editItemDrawer配置',
            'feat: 点击删除的时候，显示弹窗进行二次确认',
            'feat: text增加tooltip配置',
            'feat: multiple的operation增加allowNoSelect配置',
            'feat: list增加表头管理',
            'fix: 修复表头管理设置后operation错乱，先请空触发渲染；增加缓存字段跟resource对比',
            'fix: 修复远程搜索再设置了isInitEmpty:true情况下，设置额外传参报错问题',
            'fix: 更改列表区块的total赋值逻辑'
        ]
    },
    {
        version: '0.31.3',
        date: '2020.04.26',
        log: [
            'feat: 添加block-alert类型',
            'feat: field-tag 增加 no-match-text 配置下，搜索无数据时可显示相关信息',
            'fix: 修复field-tag一些搜索异常场景'
        ]
    },
    {
        version: '0.30.5',
        date: '2020.04.01',
        log: [
            'fix: block-xlsx导入配置post方式时，支持用data来传参',
            'feat: field-editor富文本自定义字段，支持 Quilljs 参数配置和事件绑定',
            'feat: 完善富文本编辑器示例',
            'refactor: 调整富文本字段 options 的入参方式',
            'fix: 图片字段，在图片校验通过时，没有 resolve',
            'fix: 远程搜索传参',
            'feat: issue#77 导航的 Logo 和标题支持点击跳转',
            'feat: ams.configs增加consoleWarn的全局配置',
            'fix:issue#79 修复远程 SELECT 字段在接口返回异常时没有重置下拉列表的问题'
        ]
    },
    {
        version: '0.29.11',
        date: '2020.02.23',
        log: [

            'fix: 修复block的show配置在router切换下异常',
            'feat: select远程搜索的remoteConfig支持method和url的配置',
            'fix: router区块增加loading',
            'feat: 更新element-ui版本到2.14.1，增加popconfirm组件',
            'feat: 更换chart区块的颜色序列',
            'fix: break-change，resource中的默认contentType修改为form',
            'fix: 配置responseDataParse时，不覆盖data之前配置的数据',
            'feat: xlsx区块的上传，增加on.getXlsxData方法',
            'feat: list曲表增加table-column配置',
            'fix: 增强list中格式的校验',
            'feat: 默认action增加clear',
            'feat: list区块增加multipleSelectAffixShow配置',
            'fix: operations-mixin兼容block-list中配置multipleSelectAffixShow: true的情况',
            'fix： xlsx导入限制修复',
            'feat: list的block支持配置hidden和show'
        ]
    },
    {
        version: '0.28.7',
        date: '2020.01.08',
        log: [
            'feat: select支持分组',
            'feat: 新增视频字段实例',
            'feat: 视频字段在展示场景支持倍速控制',
            'refactor: 视频字段展示场景下，控制是否展示出视频操作判断保护',
            'fix: 修复视频字段和播放控制之间的间隙问题',
            'feat: update的action增加put处理',
            'feat: 优化左侧菜单 UI，使其和页头 UI 联调更协调',
            'feat: 菜单支持入参 `hide-timeout` 参数',
            'fix: resource中的update配置，method配置失效问题',
            'fix: @list中的method默认设置为get'
        ]
    },
    {
        version: '0.28.0',
        date: '2020.12.23',
        log: [
            'fix:  `inputnumber` 字段忽略了设置为 0 时的场景',
            'feat: 新增处理上传视频中，Element UI 的 `on-error` 事件',
            'feat: 将上传视频成功流程里的 this.field 调整为 this 和 transform 的一致',
            'feat: `table`组件支持height配置',
        ]
    },
    {
        version: '0.27.17',
        date: '2020.12.17',
        log: [
            'fix: `video`上传的 on-error 事件无法执行清空操作',
            'fix: `video`上传失败时清空选项',
            'feat: `table`组件暴露border设置',
            'fix: ESLint，数字类型变量不能指派给字符串类型',
            'feat: `ams.request`formData 场景支持入参 Blob 格式',
            'fix: 修复默认action自定义配置无传method时，传参异常问题',
            'feat: `ams.request`增加responseType',
        ]
    },
    {
        version: '0.27.9',
        date: '2020.11.26',
        log: [
            'feat: form区块支持changeConfig配置',
            'fix: 修复list区块在前端分页下，不触发current-change事件问题',
            'feat: 更正block-chart的颜色分布',
            'fix: 内置的用户信息区块和 ELEMENT UI 框架中图片放大功能的样式冲突',
            'feat: 默认@list的action中，将requestDataParse的处理参数改为res.data',
            'feat: 默认@list的action中，将responseDataParse处理范围从data.list变更为data',
            'feat: 简化operaions中自定义field的配置',
            'feat: operations增加changeConfig配置',
            'feat: 列表拖动功能支持根据 SortableJS 官方文档配置参数',
            'fix: 修正列表拖拽某列的使用方法'
        ]
    },
    {
        version: '0.26.3',
        date: '2020.09.17',
        log: [
            'feat: 资源的api请求配置，新增requestDataParse和responseDataParse',
            'feat: 图片编辑可选图片场，供可选的列表图片接入 el-image 来实现 fit 入参',
            'fix: 图片编辑单张图片预览场景接入 el-image 组件用以实现 fit 入参',
            'fix: field的default值初始化处理',
            'feat: 对field default值也进行get/set处理'
        ]
    },
    {
        version: '0.25.39',
        date: '2020.07.29',
        log: [
            'feat: 修复列表区块操作中，最后一项操作表的居中问题',
            'feat: 更新collpase和imagelist的样式',
            'feat: 新增多种类型的icon',
            'feat: list区块请求时禁止分页操作',
            'feat: unitselect字段增加on.change回调',
            'feat: list区块增加前端排序',
            'feat: field-audio、field-image、field-video支持在props配置before-upload回调',
            'feat: table组件支持tableTop的插槽',
            'feat: list组件，前端分页时，点击排序请求接口',
            'feat:  前端分页时，点击排序触发fieldChange',
            'feat: object增加collapseKeys配置',
            'feat: 字段button增加emitFieldChange配置，可手动触发fieldChange方法',
            'feat: operation添加info支持',
            'feat: 远程搜索组件添加onSuccess和onError的回调方法',
            'fix: table组件添加context参数',
            'feat: 补全list区块的props配置',
            'feat: 内置action的read中，添加tansform配置',
            'feat: 内置的action支持配置path/method/successCode/transform',
            'feat: resource增加method的配置',
            'feat: table组件支持配置data.layout',
            'feat: changeConfig增加第三个参数透传this',
            'feat: router增加showTimeout配置',
            'fix: 修复block-xlsx当code不等于0，msg不为array的情况',
            'feat: block-xlsx@0.8.8，导入的request支持withCredentials、contentType、headers、successCode的配置',
            'fix: list组件的列支持配置min-width',
            'feat: text-view增加suffix-icon配置',
            'fix: options选项多时的popover交互修改'
        ]
    },
    {
        version: '0.24.22',
        date: '2020.04.23',
        log: [
            'feat: 更新字体图标',
            'feat: field-iamge的successCode支持porps配置',
            'feat: 增加列表配置项enterkey-search，配置为true时阻止列表搜索栏的回车搜索事件。场景：某些field类型为textarea时，默认回车时会发起搜索',
            'feat: block的配置增加水印功能',
            'feat: 通过ams-cli初始化的项目默认使用vishop的主题',
            'fixed: block-steps支持description和props',
            'fixed: datetime和datetime选择1970年部分月份时，值置空问题',
            'fixed: field-array的删除按钮层级问题,',
            'feat: field.info支持object配置，可以配置icon类型；',
            'feat: 默认的几个action增加成功回调逻辑',
            'feat：列表区块，改变页妈和页数时，增加on事件',
            'feat: block-title增加append的slot插槽；',
            'feat: 增加block-popover文档',
            'feat: field-audio、field-image、field-video支持成功回调（on-success）和失败回调（on-error）',
            'feat：支持所有block调用@show@hide进行显隐操作',
            'feat: field-audio、field-video和field-file支持通过props配置successCode',
            'fix: SELECT_REMOTE里的remoteMethod，在判断successCode是否配置的bug',
            'fix：补充field的默认参数的时候，不覆盖默认参数',
            'fix: 修复block-list的hidden失效',
            'fix：字段类型为select，对外使用的view钩子中，加上context的参数',
            "fix: block-list的options.operationsWidth改成props['operations-width']",
            'fix：checkbox等进行全选操作时，加上change回调',
            'feat: ams-cli@0.8.3：模板增加打包配置css.extract，解决打包后样式覆盖问题；npmComplete模板，修复全局结果拦截器responseInterceptor的返回promise的bug',
            'feat: block-form支持配置label加粗样式；field-file、field-audio、field-video的上传按钮支持disabled属性配置',
            'feat: 给array字段增加sortable配置，默认为true',
            'feat: 区块table增加索引配置',
            'fix: 修复编辑态的列表block在前端分页情况下，path路径问题',
            'fix: 修复parseTime中时间格式化异常'
        ]
    },
    {
        version: '0.23.5',
        date: '2020.01.08',
        log: [
            'feat: field增加html渲染字段',
            'feat: 列表字段添加desc属性',
            'fix: 修复导入获取rows的范围',
            'feat: 文档增加自助仪表盘入口',
            'feat: docs增加ams-helper介绍',
            'fix: 修复datetime和datetime选择1970年部分月份时，值变空问题',
            'feat: 更新字体图标，增加ams-icon-code',
            'feat: block-steps支持description和props',
            'fix: 修复field-array的删除按钮层级问题',
            'feat: field-image的successCode支持props定义'
        ]
    },
    {
        version: '0.22.9',
        date: '2019.12.14',
        log: [
            'feat: text的view组件添加on事件',
            'feat: theme-vipshop主题修改',
            'feat: block-list的操作按钮context增加数据index',
            'feat: block-imagelist增加显示角标信息',
            'feat: 添加nav-left插槽',
            'feat: 新增drawer抽屉block',
            'feat: array-simple数据更换'
        ]
    },
    {
        version: '0.21.6',
        date: '2019.12.3',
        log: [
            'feat: text的view组件添加on事件',
            'feat: theme-vipshop主题修改',
            'feat: block-list的操作按钮context增加数据index',
            'feat: block-imagelist增加显示角标信息',
            'feat: 添加nav-left插槽',
            'feat: 新增drawer抽屉block',
            'feat: array-simple数据更换',
            'fix: field-image兼容接口通过data直接返回图片地址的情况',
            'fix: 修复block-list的表头操作栏样式问题',
            'fix: field-image删除previewUrl'
        ]
    },
    {
        version: '0.20.10',
        date: '2019.11.18',
        log: [
            'feat：增加事件销毁机制，tabs增加监听resize事件',
            'feat：block-chart添加loading',
            'feat: block-imagelist增加支持插入分类名称和隐藏标题信息块',
            'feat: operations支持配置换行展示',
            'feat: 增加block默认data机制',
            'feat: 把field-headimage整合到field-image，并删除field-headimage',
            'feat: block-card、block-component、block-dialog、block-imagelist、block-tabs增加loading效果，可以在该区块的action通过this.showLoading和this.hideLoading来控制',
            'feat: 增加图标ams-icon-user',
            'fix: 修复field-select在view状态下，无法匹配值为空的选项',
            'fix: block-chart的图例icon设置为默认图标',
            'fix: block-imagelist支持搜索换行',
            'fix: block-grid兼容低级浏览器',
            'fix: block-imagelist标题块高度不一致、删除title逻辑判断',
            'fix: 路由菜单样式',
            'fix: fieldChange无法获取不在资源声明的field的name',
            'fix: 修复列表在有操作按钮的时候，行距过高的问题'
        ]
    },
    {
        version: '0.19.8',
        date: '2019.11.5',
        log: [
            'feat: link增加上下文数据',
            'feat: block增加beforeDestroy声明周期',
            'feat: 优化列表拖拽',
            'feat: 列表分页组件布局支持自定义',
            'feat: vipshop主题的带导航菜单支持顶部栏',
            'feat: field添加button类型，提取operation的tooltip和badge',
            'feat: array/object field补全上下文',
            'feat: block-title的标题支持html',
            'feat: field的labelWidth为0时，不显示label',
            'feat: color添加文字框',
            'feat: block-title支持suffix-info消息提示',
            'feat: 新增icon：ams-icon-xinxitishiwenhao，fixed设置size时operations的label错位',
            'fix: 修复block-list展开无法配置label宽度',
            'fix: 修复field-file的before-upload无法覆盖问题'
        ]
    },
    {
        version: '0.18.6',
        date: '2019.10.16',
        log: [
            'feat: 扩展列表行展开为表单展示',
            'fix: 列表高度自适应',
            'fix: 删除block-chart的base默认样式配置，解决主题无法生效问题',
            'fix: field-select远程搜索isInitRemoteOptions的逻辑',
            'fix: 恢复block的operations修改',
            'fix: block-list和block-imagelist绑定block.props',
            'fix: 动态添加collapse'
        ]
    },
    {
        version: '0.17.12',
        date: '2019.09.30',
        log: [
            'feat: 列表支持拖拽',
            'feat: 添加sortable@1.10.0cdn文件',
            'feat: block-image-label添加eidt和view状态',
            'feat: 按钮添加Badge标记',
            'feat: 新增uniqueOpened菜单只保持一个子菜单展开',
            'feat: 新增定制区块block-image-label',
            'feat: 路由添加class类名控制',
            'feat: 更新block-bct-progress排版',
            'feat: field-checkbox添加button类型',
            'feat: field-radio添加button类型',
            'feat: block-bct-progress增加props和on',
            'feat: 新增block-imagelist类型，可以支持有图或者无图的列表矩阵',
            'feat: operation新增text纯文本类型',
            'feat: field支持通过props.class配置该field的样式名，比如只想通过样式添加一个红色星号',
            'feat: 新增block-popover区块组件',
            'feat: field-checkbox字段配置select-all属性实现全选',
            'fix：解决11~12位的时间戳转为为日期异常',
            'fix: checkbox-button样式优化',
            'fix: field-image从默认列表里选择图片后还校验失败的问题',
            'fix: operation的点击阻止事件冒泡',
            'fix: 迁移demo页面mock接口到RAP2平台',
            'fix: block-list在多选时多选框出现省略号的问题'
        ]
    },
    {
        version: '0.16.0',
        date: '2019.09.18',
        log: [
            'feat: block-form表单增加键盘enter事件',
            'feat: block-router支持forcedRefresh和replace',
            'feat: 新增block-bct-progress组件',
            'fix: field-timerange纯展示时结果不对'
        ]
    },
    {
        version: '0.15.12',
        date: '2019.09.16',
        log: [
            'feat: field-array 增加最大最小长度限制',
            'feat: 拓展图标icon',
            'feat: field-file、field-video、field-audio 支持限制文件大小',
            'feat: block-list 添加page-sizes分页数控制属性',
            'feat: 更改field使用的defaultFieldConfig路径，用于扩展自定义组件的默认配置',
            'feat: transfer支持slots，配置项为left-footer | right-footer',
            'feat: block和field的on支持异步函数',
            'feat: select的options支持自定义&例子',
            'feat: block-list接口添加rightTop/leftBottom/rightBottom的field数据',
            'feat: block-list操作项支持宽度',
            'feat: collapse添加lazy属性',
            'fix: 去掉router配置icon的简写方式，统一使用icon完整样式名',
            'fix: field的changeConfig无法修改ctx等属性的问题',
            'fix: field-object配置的field不支持inline:true同一行展示',
            'fix: field-image在设置了默认图后无法从默认列表里选择图片',
            'fix: select-remote同类型能匹配赋值，value返回值支持string和number',
            'fix: transfer的v-for时无配置key',
            'fix: 解决transfer无配置slots报错'
        ]
    },
    {
        version: '0.14.1',
        date: '2019.08.29',
        log: [
            'feat: field-image 在 view 状态增加大图预览',
            'feat: block-list 增加前端分页 pagination: "simulate"',
            'fix: field-image 默认图片列表内容比较多时加上滚动条',
            'fix: block-form 在校验失败时弹出失败信息',
            'fix: 修复cascader在单选时的格式处理问题'
        ]
    },
    {
        version: '0.13.2',
        date: '2019.08.21',
        log: [
            'feat: field-image、field-headimage、field-file 增加默认上传地址；',
            'feat: block-list、field-object 增加支持 filed 的 changeConfig 配置，实现字段间联动；',
            'feat: field-image 支持显示已上传列表，新增默认图片列表；',
            'feat: element-ui 升级到 2.11.1 版本'
        ]
    },
    {
        version: '0.12.1',
        date: '2019.08.16',
        log: [
            'feat: block-list新增三个位置的 operations-slot（rightTop、leftBottom、rightBottom）',
            'feat: field-unitselect 增加 slot 显示位置和宽度配置的支持',
            'feat: field-text 增加文字类型的 slots 配置支持',
            'fix: field-input 的 slots 名字写错',
            'fix: 如果列表接口没有返回 list 字段时代表没有数据，而不是直接显示报错提示',
            'fix: block-collapse 在没有默认 active 时报错'
        ]
    },
    {
        version: '0.11.0',
        date: '2019.08.13',
        log: [
            'feat: router 支持 component 配置'
        ]
    },
    {
        version: '0.10.6',
        date: '2019.08.08',
        log: [
            'feat: 增加 block-carousel 组件',
            'fix: 远程搜索当 ctx=view 时增加 isInitRemoteOptions 判断 ',
            'fix: block-tabs 支持更多属性配置',
            'fix: list 的搜索传值需要兼容零',
            'fix: block-list 的 search 传值需要兼容0'
        ]
    },
    {
        version: '0.9.1',
        date: '2019.08.01',
        log: [
            'feat: 增加支持指定某几个 field 变成行内表单，并且支持设置宽度',
            'feat: 增加 block-grid 布局',
            'fix: package.json 的 element 版本没有更新，导致 npm 安装使用的效果不一致',
            'fix: block-card 的操作按钮样式问题',
            'fix: block-router 的字体样式问题',
            'fix: 修改ams-operations，避免在没有 operations 时也生成一个空的 div 节点'
        ]
    },
    {
        version: '0.8.11',
        date: '2019.07.22',
        log: [
            'feat: 远程搜索添加 isInitRemoteOptions 配置参数，默认为 true',
            'feat: 增加文字链接类型 field-link',
            'feat: block-collapse 绑定外部传入的on方法',
            'feat: field-file、field-video、field-audio 增加对按钮的文案 button-label 和 size 配置支持',
            'feat: block-list 增加对 align 配置支持',
            'feat: 更新 element-ui 至 2.9.1',
            'fix: element 时间格式化代码引用已兼容处理部分',
            'fix: 调整 field-array 类型在表格里的行高',
            'fix: 卡片区块如果 header 是通过 slotBlock 配置到，去掉 header 自带的 padding 和 border',
            'fix: 列表的操作按钮在不同 size 时上下间距问题'
        ]
    },
    {
        version: '0.7.19',
        date: '2019.06.13',
        log: [
            'feat: 支持 Dropdown 下拉菜单区块',
            'feat: 列表区块增加 slot: "tableTop"，显示在搜索条和表格之间',
            'feat: 列表区块的搜索条支持按回车触发搜索',
            'feat: field-color 在 view 状态下优化成纯展示，不可点',
            'feat: operation 加入 tooltip 配置，支持 string 和 object 两种格式',
            'feat: 新增树形控件 field-tree 及 demo',
            'feat: 增加 arraylist 的 collapseLimit 参数',
            'feat: form block 增加 field 实例的 ref 引用',
            'feat: SELECT_REMOTE远程select搜索重构优化',
            'feat: addItemAfter、addItemDialog、editItemAfter、editItemDialog 增加边距和滚动进入视图',
            'feat: dropdown operation优化',
            'feat: 增加isInitEmpty参数控制初始化的请求',
            'feat: 增加debounce参数控制请求的节流',
            'feat: 增加isCache参数控制缓存数据',
            'feat: 增加isLock参数控制多请求并发',
            'feat: 增加isMiniBackfill参数控制回填行为',
            'feat: 增加transform参数控制options组装定制',
            'feat: 增加request参数控制接口请求过程及参数定制',
            'feat: 支持checkbox、radio等options的异步获取',
            'feat: @list增加可以通过$arg修改当前页码（如搜索传入@list:1重置页码为1）',
            'fix: 图表BASE，删除title非必须参数',
            'fix: 级联选择器在view状态下 "\" 的颜色问题',
            'fix: 修复object、array、union三种特殊类型的默认值逻辑',
            'fix: 修复卡片区块的操作按钮样式问题',
            'fix: 修复field-array在没有label时的样式问题和显示NaN问题',
            'fix: 修复默认api action取值问题',
            'fix: block-form，在ctx为view时，去除必填标识等校验规则',
            'fix: show action增加延时等待子blocks渲染ready',
            'fix: 导航菜单增加子导航数量判断',
            'fix: 修复SELECT_REMOTE的传值被清空的问题',
            'fix: 修复list内的props内含有type属性时sort不生效的问题',
            'fix: 修复值在==时不会触发fieldChange',
            '...'
        ]
    },
    {
        version: '0.6.12',
        date: '2019.04.16',
        log: [
            'feat: 更新AMS_CONFIG可视化配置文件',
            'feat: 添加OA搜索示例DEMO',
            'feat: 增加form 的desc配置',
            'feat: title更新，增加函数比较，增加field的默认ctx',
            'feat: 增加list分页显示总数',
            'feat: 增加基础field类型共享共用逻辑',
            'feat: block内可以通过config选项配置全局配置',
            'feat: text、textarea支持显示折叠配置',
            'feat: 调整operations行间距',
            'feat: 新增union类型field',
            'fix: 默认action获取$arg的错误',
            'fix: 增加配置示例，修复使用对象值时equal的判断问题',
            'fix: 更新tabs样式',
            'fix：steps增加block.style，tabs去除内置visible，增加绑定element内置方法',
            'fix: radio如果有0值无法首先选中',
            'fix: tab block去除默认全部展开',
            'fix: 去除navbar的scoped限制'
        ]
    },
    {
        version: '0.5.33',
        date: '2019.04.02',
        log: [
            'feat: 多选类view状态统一改成纯文本方式',
            'feat: request responseInterceptor增加options返回',
            'feat: component支持html配置',
            'feat: 将card block集成到主框架内',
            'feat: 支持field的info提示信息配置',
            'feat: object类型支持layout配置和show条件、hidden配置',
            'feat: 优化layout配置，被合并的field可以不用再显式的写fieldName: false隐藏原field',
            'feat: 优化show条件配置，支持通过深层的key，如： show: "a.b.c"',
            'feat: 优化list共用逻辑共享方式，可以通过配置 ams.configs.baseBlockType.table = "list"',
            'fix: 多选值如果是0值view的问题',
            'fix: 多选值array类型的options的value会默认转成string，可以在field配置useStringValue为false关闭转换',
            'fix: on事件的this指向问题',
            'fix: 多选类0值无法匹配的问题',
            'fix: list的字段hidden设置失效',
            'fix: remote select内获取resource.api.successCode错误',
            '...'
        ]
    },
    {
        version: '0.4.13',
        date: '2019.02.05',
        log: [
            'feat: router菜单外链增加target配置，支持在本页打开',
            'feat: date和datetime增加支持传入view的format',
            'feat: 修复element-ui的dialog position:fixed 优先度不高可能会被覆盖的问题',
            'feat: 修复router block于项目已有vue-router可能的冲突问题',
            'feat: 增加全局参数拦截器',
            'feat: 把 element-ui 从 2.4.8 更新到 2.5.4',
            'feat: components支持打包单个',
            'feat: form 内的operation支持通过show条件控制显示条件',
            'feat: field支持配置hidden实现隐藏',
            'fix: selectOptions的错误图',
            'fix: select field兼容多选和单选',
            'fix: video field增加style透传',
            'fix: 非顶级field无默认get和set、view，增加兼容判断'
        ]
    },
    {
        version: '0.3.5',
        date: '2018.12.08',
        log: [
            'feat: fields不使用computed实现，方便运行时修改',
            'feat: config方法变成深度合并',
            'feat: resource增加foreignKeys用于资源关联',
            'feat: 内置api action支持深度合并修改请求params，方便定制重用',
            'feat: 默认的api action（@read、@list等）在code检查失败时会抛出error，使链式action调用中断',
            'feat: contentType:json | form（post数据格式） 和 withCredentials的配置支持在resource配置和通过ams.config全局配置',
            'feat: action只有在显式return数据的时候才会记录$prevReturn，方便使用者控制action参数的有序传递',
            'feat: $prevReturn支持在调用action时传入$prevReturn参数覆盖（如：列表operation场景）',
            'feat: resource增加key的配置，默认为id，方便做数据项标记和数据关联以及默认接口',
            'feat: operation的去除event参数配置，改用operation的key作为event参数',
            'feat: 实现block和resource的任意层级的简化配置机制，通过 { base: ams.configs.LIST } 或者 { base: "LIST" } 简化常用配置',
            'feat: 支持任意层级数组array和对象object复合field类型的描述',
            'feat: dialog弹窗配置功能实现',
            'feat: 跨block的事件event和动作action调用实现',
            'feat: action支持传入参数',
            'feat: select远程搜索可过滤的高级功能',
            'feat: 支持任意层级数组array复合field类型的描述',
            'feat: 支持任意层级对象object复合field类型的描述',
            'fix: radio和select的key问题',
            'fix: 修复多个action的$prevReturn问题',
        ]
    },
    {
        version: '0.2.1',
        date: '2018.11.09',
        log: [
            'feat: 规范化mixin、导出提供给自定义filed、block使用',
            'feat: 去除filter的props为"fieldOptions"的默认设置，修改为不传入filter.options则使用field.props.options',
            'feat: 增加render方法简化初始化配置',
            'feat: 实现block的循环嵌套结构',
            'feat: operation的实现和配置',
            'feat: 列表强化支持',
            'feat: 多filed联动实现',
            'fix: resource的props会被全部覆盖的问题',
            '...'
        ]
    },
    {
        version: '0.1.11',
        date: '2018.10.15-10.19',
        log: [
            'feat: 基础block支持',
            'feat: 基础resource支持',
            'feat: 基础field支持',
            'feat: 接口CURD等交互',
            'feat: 表单校验',
            '...'
        ]
    }
]
