# 接口api规范

AMS为了整合一些常规的数据交互操作，包含数据读取、数据展示、数据编辑、数据列表等，对接口的数据结构有基本规范要求。

## 通用数据结构

所有的接口请按照下面三个字段key进行组装返回：

+ `code`：int类型，必须，0 代表默认的【成功】状态，-1701 代表唯品会业务【未登录】状态，-1702 代表唯品会业务【无权限】状态。其它情况按照具体业务需要定code

+ `data`：object类型，非必须，用于返回具体的数据

+ `msg`：string类型，返回的信息说明，成功=“success"，失败=”ERROR内容“

返回结构例子：

```js
{
    "code": 0, 
    "data": {
        ...
    },
    "msg": "success"
}
```

## 常用的接口

### read：读取单条数据

参数(get)：

- `id`：唯一id字段（可通过key配置）
- `resId`：资源id（可选）

示例：

url：`/get?id=1&resId=demo`

返回结构：

```js
{
    "code": 0,
    "data": {
        "testName": "123",
        "testDate": 12345678
    },
    "msg": "success"
}
```

### update：更新单条数据

参数(post)：

- `id`：唯一id字段（可通过key配置）
- `resId`：资源id（可选）

示例：

url：`/update?id=1&resId=demo`

data：`{"testName":"123","testDate":12345678}`

返回结构：

```js
{
    "code": 0,
    "data": {
        "testName": "123",
        "testDate": 12345678
    },
    "msg": "success"
}
```

### create：创建单条数据

参数(post)：

- `resId`：资源id（可选）

示例：

url：`/create?resId=demo`

data：`{"testName":"123","testDate":12345678}`

返回结构：

```js
{
    "code": 0,
    "data": {
        "testName": "123",
        "testDate": 12345678
    },
    "msg": "success"
}
```

### delete：删除单条数据

参数(post)：

- `id`：唯一id字段（可通过key配置）
- `resId`：资源id（可选）

示例：

url：`/delete?id=1&resId=demo`

data：

返回结构：

```js
{
    "code": 0,
    "data": {
        "testName": "123",
        "testDate": 12345678
    },
    "msg": "success"
}
```

### list：列表数据接口

参数(get)：

- `resId`：资源id（可选）
- 搜素/筛选：fieldNameTest=value1 多个值由逗号,分隔。key传入具体的字段名
- `sortField`：排序字段
- `sortOrder`：asc|desc 升序|降序
- `page`：分页（从1开始）
- `pageSize`：分页条目（默认20）

示例：

url：`/list?resId=demo&pageSize=20&page=1&sortField=lastModifiedTime&sortOrder=asc&status=-1&tags=标签`


返回结构：

```js
{
    "code": 0,
    "data": {
        "list": [ // 凡是涉及到列表类型到数据，都使用 list 这个字段以数组类型返回
            {
                "testName": "123",
                "testDate": 12345678
            },
            {
                "testName": "123",
                "testDate": 12345678
            }
        ],
        "total": 992 // 凡是需要分页的，都需要返回 total 这个字段。相反，如果不想显示分页，接口不反回这个字段即可
    },
    "msg": "success"
}
```