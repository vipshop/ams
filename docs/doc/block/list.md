---
List: List 列表
---
# List 列表

## 在线配置
<ClientOnly>
<ams-config name="list" type="block"/>
</ClientOnly>

## 示例预览
<ClientOnly>
<block-list-demo />
</ClientOnly>

## 示例代码
<<< @/fe/.vuepress/components/block/list/block.js

## 关于分页

是否显示分页由[列表接口](/api/api.html#常用的接口)返回的`total`字段决定，当接口没有返回该字段或者该字段返回0，则不显示分页。如果不需要分页的场景可以利用此特性。

## 排序配置

配置在 `sorts` 内的字段可以支持排序，排序变更时会触发 list action并携带对应的排序参数

## 过滤配置

配置在 `filters` 内的字段可以支持过滤，可以通过 `multiple` 控制是否支持多选，如果 `remote` 配置为false、则会使用默认的字符串过滤并且不会请求接口（如果要自定本地过滤请使用props透传），当`remote`为true时，选择的过滤结果将携带在参数上并会发起新的请求刷新列表

如果没有配置会使用同名field的props.options配置，如果都没有filter配置会失效

## 搜索配置 <Badge text="0.5.0+"/>

::: tip
在 `ams@0.5.0` 以前的版本是通过配置 `searchs` 和 `searchsOptions` 实现的搜索配置，`0.5.0+` 使用新的slot operation实现列表的搜索和多选配置（0.5.0-0.6.0 会兼容searchs和searchsOptions，将在0.6.0+移除兼容支持）
:::

通过配置slot为searchs可以配置搜索条件，slot operation配置参考：[operation配置](../api/operation.md)

```js {3，9}
operations: {
	testSelect: {
		slot: 'searchs',
		type: 'field',
		field: 'testSelect'
		// label: '可省略'
	},
	search: {
		slot: 'searchs',
		type: 'button',
		props: {
			type: 'primary'
		},
		label: '搜索',
		event: 'list'
	}
}

```

## 多选操作配置 <Badge text="0.5.0+"/>

通过配置slot为multipleSelect可以配置多选操作（多选操作只有在选择了至少一行后才会出现，需要配置list 的 `options.multipleSelect` 为true），slot operation配置参考：[operation配置](../api/operation.md)

```js {3，9}
operations: {
	selectMulti: {
		slot: 'multipleSelect',
		type: 'field',
		field: 'testSelect'
		// label: '可省略'
	},
	buttonMulti: {
		slot: 'multipleSelect',
		type: 'button',
		label: '删除',
		event: 'multi'
	}
}
```

## slotBlocks 配置

### 搜索条顶部的slot block

配置子block的slot为`top`，可以插入到搜索条顶部

``` js {8}
blocks: {
	listTop: {
		type: 'component',
		options: {
			is: 'div',
			text: '我是列表区块最顶部的插槽内容！！'
		},
		slot: 'top'
	}
}
```

### 搜索条和表格之间的slot block

配置子block的slot为`tableTop`，可以插入到搜索条和表格之间


``` js {8}
blocks: {
	listTableTop: {
		type: 'component',
		options: {
			is: 'div',
			text: '我是列表区块表格顶部的插槽内容！！'
		},
		slot: 'tableTop'
	}
}
```