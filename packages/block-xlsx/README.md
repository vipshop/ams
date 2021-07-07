# block-xlsx 批量导入导出

## 结构

```sh
export interface Data { [field: string]: any }
export interface XlsxBlock {
    type: 'xlsx',
    resource: string,
    options: Data,
    fields?: { [field: string]: Data | false },
    events?: Data,
    actions?: { [field: string]: () => any },
    operations?: { [field: string]: Data },
    on?: { [field: string]: () => any }
}
```

## 配置

可用配置项表

参数 |	类型 |	是否必填 |	说明
type |	string |	是 |	block类型，固定值为xlsx
resource |	string |	否 |	指定resource
options |	object |	是 |	配置项详见下文
events |	object |	否 |	事件定义
actions |	object |	否 |	自定义actions，可被events中使用
fields |	object |	否 |	block级别作用域的fields，重置resource中的默认配置
on |	object |	否 |	目前可监听`uploadSuccess() => {}`方法，上传成功后的事件钩子

options配置中又细分为`export`的配置和`import`的配置

```js
options: {
    export: {},
    import: {}
}
```
[导出流程图》》](http://fcms.vip.vip.com/ams-doc/block/xlsx.html#%E9%85%8D%E7%BD%AE)

```js
export: {
  headers: [
    { field: 'basic_id', wch: 12,
      convert: (v, row) => {
        return `${v}-a`
      }
    },
    { field: 'online_name', wch: 18 },
    { field: 'department_id', wch: 18 },
    { field: 'warehouse_id', wch: 8, multirow: true },
    { field: 'to_warehouse_ids', wch: 18, multirow: true }
  ],
  mergeHeaders: [
    { from: 'basic_id', to: 'department_id', value: '基本信息', bg: '#ffffff' },
    { from: 'warehouse_id', to: 'to_warehouse_ids', value: '分仓信息', bg: '#cccccc' }
  ],
  request: {
    url: '/SchedulesBasic/SchedulesBasic/searchPageList',
    method: 'get',
    params: {
      department_id: 1
    }
  },
  idField: 'basic_id',
  itemName: '排期',
  sheetName: '排期表',
  pagesize: 100,
  eachFileRows: 100,
  downlownTemplate: false,
  query: {
    sell_time_from_egt: 1514736000,
    sell_time_from_elt: 1517587200,
    schedule_type: 1,
    brand_audit_status: 'all',
    sale_type: 'new',
    page: 1
  },
  on: {
    preDataFilter(org) {
      org.basic_id = `加工-${org.basic_id}`
      return org
    },
    getMultirows(data) {
      return data.warehouses
    }
  }
}
```
### options.export.headers
设置导出表头字段的基本信息

headers配置项表
| 参数 | 类型 | 是否必填 | 说明
| -- | -- | -- | --
| field | string | 是 | 对应`resource`中的field
| type | string | 否 | 不设置会默认继承`resource`中对应field的type
| label | string | 否 | 不配置会默认继承`resource`中对应field的label
| rules | object | 否 | 不配置会默认继承`resource`中对应field的rules
| wch | object | 否 | excel列宽度
| convert | function | 否 | 对单元格处理，`(value, row) => {}`，`value`是单元格的值，`row`是该行的值
| multirow | object | 否 | 是否标识为合并字段

当type为select/checkbox/radio时，会自动匹配`resource`对应字段props中的options进行文本转义。判断逻辑为

### options.export.mergeHeaders
增加一级表头，一级表头中可以包含多个字段

mergeHeaders配置项表
| 参数 | 类型 | 是否必填 | 说明
| -- | -- | -- | --
| from | string | 是 | 合并表头的开始字段
| to | string | 是 | 合并表头的结束字段
| value | string | 是 | 合并表头的名称
| bg | string | 是 | 设置合并表头的背景颜色

### options.export.request
设置请求链接和请求方式，可设置额外传参的data和params
```js
request: {
  url: '/SchedulesBasic/SchedulesBasic/searchPageList', // 请求链接
  method: 'get',  // 请求方式
  data: {},
  params: {}
}
```

### options.export.exportType
设置导出的方式，目前提供了两种导出方式，async和sync方式，区别为：

设置为`async`为异步方式，根据total计算出page批量导出
设置为`sync`为同步方式，根据idField和pagesize导出，详情见导出流程图

### options.export.itemName
设置导出文件的名称，最后会带上导出时间戳作为文件名，如设置`itemName: '排期'`，则最后导出为`排期`

### options.export.pagesize
设置导出时每次请求的条数

### options.export.eachFileRows
设置文件超过多少行后就导出一个文件，如总条数为10万行，设置每个`eachFileRows: 50000`则会导出`2个文件`

### options.export.downlownTemplate
设置是否导出方式为模板（不包含数据请求）

### options.export.query(接口注意事项)
设置请求时带上的查询条件

> *接口需要根据进行下面参数处理* 假设配置idField = 'id',则在插件内部自动处理了下面的query，接口需配合做下面变更

``` js
{
is_export: 1, // 当is_export为1时，则代表导出专用接口
order: 'id desc', // 根据配置的idField进行数值降序排列
pagesize: 0, // 当pagesize为0是，只返回total总数，当pagesize > 0时，不返回total总数，可以减少total的查询
lt_id: 100 // 根据order的排序结果，从id小于100开始截取，获取pagesize长度的数量返回
}
```

### options.export.on
设置导出时的处理方法，包含
```js
  // 请求接口前对query进行处理
  queryFilter(query) {
    return query
  }
  // 从接口拿到的数据进行初始化处理
  preDataFilter(org) {
    org.basic_id = `加工-${org.basic_id}`
    return org
  },
  // 设置拆分条数的方法
  getMultirows(data) {
    return data.warehouses
  }
```

其中`处理字段`的流程又细分为（如无设置对应流程则跳到下一级判断）


```js
import: {
    headers: [
        { field: 'basic_id', wch: 12 },
        { field: 'online_name', wch: 18 },
        { field: 'department_id', wch: 18, multirow: true }
    ],
    request: {
        url: '/SchedulesBasic/SchedulesBasic/searchPageList',
        method: 'get'
    },
    rowStartAt: 2, // 设置开始坐标为2，从第2行开始读取数据
    idField: 'basic_id',
    itemName: '排期',
    sheetName: '排期表',
    on: {
        combinerCheck(frontRow, curRow) { // 合并行规则
          return String(frontRow.basic_id) === String(curRow.basic_id)
        },
        assignMultirow(item, multirows) {
          item.list = multirows
        },
        preCheck(items, options) {}, // 刚读取数据后的检查
        postCheck(items, options) {}, // 发送接口前的处理
        postParse(items, options) { // 合并、对字段做处理后的处理
          return items
        }
    }
}
```
### options.import.headers
设置导入表头字段的基本信息

headers配置项表
| 参数 | 类型 | 是否必填 | 说明
| -- | -- | -- | --
| field | string | 是 | 对应`resource`中的field
| label | string | 否 | 不配置会默认继承`resource`中对应field的label
| type | string | 否 | 不配置会默认继承`resource`中对应field的type
| ignored | boolean | 否 | 默认为`false`，设置`true`会忽略该字段，不做后续处理也不会传值
| required | boolean或者function | 否 | 设置是否必填，默认会读取`resource`对应字段props中rules的required，`(value, entities, row) => boolean`，`value`是单元格的值，`entities`包含了该行{ field: value }的集合，`row`包含了value[]的集合，下同。调用发生在trim前
| trim | boolean | 否 | 默认为true，读取导入的数据，若为string类型，自动去除首尾空格。调用发生在validate之前
| validate | function | 否 | 设置校验方式，默认会读取`resource`对应字段props中rules的pattern，`(value, entities, row) => boolean`
| dict | string或者function | 否 | 转义方式，如为function则有三个参数，`(value, entities, row) => any`
| split | string | 否 | 拆分数据方式，如设置`split:,`，则读取到`a,b,c`会拆成三个数据
| join | string | 否 | 合并数据方式，在split的基础上做数据合并
| convert | function | 否 | 对单元格处理，`(value, entities, row, rowIndex) => any`
| multirow | object | 否 | 是否标识为合并字段

其中，当`resource`对应字段设置中：
type为`select/radio/select`的时候，会自动匹配对应字段props中的options进行值转义，如无法匹配校验失败会弹窗提示
type为`date/datetime`的时候，会自动校验日期格式

### options.import.request
设置请求链接和请求方式，设置额外传参的data和params
> 上传目前只接受post方法
```js
request: {
  method: 'post',
  url: '/SchedulesBasic/SchedulesBasic/searchPageList', // 请求链接
  data: {},
  params: {}
}
```

### options.import.rowStartAt
设置数据头部位置，如设置`rowStartAt`为1，则从第1行开始读取，可以支持无表头导入

### options.import.eachPushRows
设置单次发送请求的数据量，默认为100。如excel内有300条数据，设置`eachPushRows`为200，则会发2次请求

### options.import.idField
设置行数据的唯一ID

### options.import.options
这里设置的options数据可以透传到options.import.on的`preCheck`,`postCheck`,`postParse`方法的第二个参数中，可以用于在这些方法中处理复杂的字段转义

### options.import.on

设置导入时的处理方法，包含以下方法
```js
// 合并行规则，frontRow：前一行，curRow：当前行
combinerCheck(frontRow, curRow) { 
  return String(frontRow.basic_id) === String(curRow.basic_id)
},
// 多行合并数据处理后的操作，在这里可以将multirows设置给item作为一个字段
assignMultirow(item, multirows) {
  item.list = multirows
},
// 首次从excel读取数据后的检查
preCheck(items, options) {
},
// 发送数据到接口前的处理
postCheck(items, options) {
},
// 合并、对字段做处理后的处理，items为读取处理后的所有数据
postParse(items, options) {
  return items
}
// 批量请求时，每次请求的回调，res为请求后的回调({ code, msg, data })
importProgress(res) {}
```

## 示例代码

> 通过在block中配置按钮后，调用对应的action方法请求xlsx内部的方法执行

```js
ams.block('xlsx', {
  resources: {
    'resource-calendar': {
      api: {
        prefix: '/Promotion/PromotionSchedule/'
      },
      fields: {
        basic_id: {
          type: 'text',
          label: 'ID',
          props: {
          },
          rules: {
            required: true,
            message: '必填且只能填写数字类型',
            pattern: /^\d+$/
          }
        },
        online_name: {
          type: 'text',
          label: '标题'
        },
        department_id: {
          type: 'select',
          label: '所属部类',
          props: {
            options: {
              '1': '食品部',
              '2': '母婴业务部',
              '3': '女装业务部',
              '4': '男装业务部'
            }
          }
        },
        warehouse_id: {
          type: 'text',
          label: '分仓'
        },
        to_warehouse_ids: {
          type: 'select',
          label: '上线区域',
          props: {
            options: {
              '1': '广州',
              '2': '上海',
              '3': '成都',
              '4': '北京',
              '5': '武汉'
            }
          }
        }
      }
    }
  },
  blocks: {
    buttons: {
      type: 'component',
      options: {
        is: 'div'
      },
      style: {
        padding: '10px'
      },
      operations: {
        downloadTemplate: {
          type: 'button',
          label: '下载模板',
          props: {
            size: 'mini'
          }
        },
        downloadFile: {
          type: 'button',
          label: '下载文件',
          props: {
            size: 'mini',
            type: 'primary'
          }
        },
        uploadFile: {
          type: 'button',
          label: '上传文件',
          props: {
            size: 'mini',
            type: 'success'
          }
        }
      },
      actions: {
        downloadTemplate() { ams.$blocks.xlsxForm.exportTemplate() },
        downloadFile() { ams.$blocks.xlsxForm.exportFile() },
        uploadFile() { ams.$blocks.xlsxForm.importFile() }
      }
    },
    xlsxForm: {
      type: 'xlsx',
      ctx: 'edit',
      resource: 'resource-calendar',
      fields: {
        title: 'hidden'
      },
      actions: {},
      options: {
        export: {
          headers: [
            { field: 'basic_id', wch: 12,
              convert: (v, row) => {
                return `${v}-a`
              }
            },
            { field: 'online_name', wch: 18 },
            { field: 'department_id', wch: 18 },
            { field: 'warehouse_id', wch: 8, multirow: true },
            { field: 'to_warehouse_ids', wch: 18, multirow: true }
          ],
          mergeHeaders: [
            { from: 'basic_id', to: 'department_id', value: '基本信息', bg: '#ffffff' },
            { from: 'warehouse_id', to: 'to_warehouse_ids', value: '分仓信息', bg: '#cccccc' }
          ],
          request: {
            url: '/SchedulesBasic/SchedulesBasic/searchPageList',
            method: 'get'
          },
          idField: 'basic_id',
          itemName: '排期',
          sheetName: '排期表',
          pagesize: 100,
          eachFileRows: 100,
          downlownTemplate: false,
          query: {
            sell_time_from_egt: 1514736000,
            sell_time_from_elt: 1517587200,
            schedule_type: 1,
            brand_audit_status: 'all',
            sale_type: 'new',
            page: 1
          },
          on: {
            preDataFilter(org) {
              org.basic_id = `加工-${org.basic_id}`
              return org
            },
            getMultirows(data) {
              return data.warehouses
            }
          }
        },
        import: {
          headers: [
            { field: 'basic_id', wch: 12 },
            { field: 'online_name', wch: 18 },
            { field: 'department_id', wch: 18, multirow: true }
          ],
          request: {
            url: '/SchedulesBasic/SchedulesBasic/searchPageList',
            method: 'get'
          },
          rowStartAt: 2, // 设置开始坐标为2，从第2行开始读取数据
          idField: 'basic_id',
          itemName: '排期',
          sheetName: '排期表',
          on: {
            combinerCheck(frontRow, curRow) { // 合并行规则
              return String(frontRow.basic_id) === String(curRow.basic_id)
            },
            assignMultirow(item, multirows) {
              item.list = multirows
            },
            preCheck(items, options) {}, // 刚读取数据后的检查
            postCheck(items, options) {}, // 发送接口前的处理
            postParse(items, options) { // 合并、对字段做处理后的处理
              return items
            }
          }
        }
      },
      on: {
        importSuccess() {
          // 上传成功后的处理，如刷新列表
        }
      }
    }
  }
})
```

## 发布

本模块比较特殊，依赖了`typescript`、`worker-loader`、`script-loader`等

所以该模块的打包和发布是脱离ams publish的，打包发布时：

进入当前目录，运行：

```sh
npm i && npm run build && npm publish
```