# 操作（operations）

:::tip
该页面假设你已经阅读过了[operations基础配置](/api/block.html#operations)。如果你还对`operations`配置不太了解，推荐你先阅读它。
:::

## 配置指定位置的具名插槽 operation <Badge text="0.5.0+"/>

`slot` 属性可以指定operation所在插槽，如list支持 `searchs` 和 `multipleSelect` 定制搜索操作和多选操作

以下用list内的配置为例

`edit` 没有配置slot，会存在默认的每一行数据后面（默认slot）

`testSelect` 、`testNewInput` 、 `search` 、 `reset` 的 slot 为 search，控制的是搜索区域的操作

`selectMulti` 、 `buttonMulti` 的 slot 为 multipleSelect，控制的是多选操作区的操作（多选操作只有在选择了至少一行后才会出现，需要配置list 的 `options.multipleSelect` 为true）


```js {8,14,27,36,42,48}
operations: {
	edit: {
		type: 'button',
		label: '跳转'
	},

	testSelect: {
		slot: 'searchs',
		type: 'field',
		field: 'testSelect'
		// label: '可省略'
	},
	testNewInput: {
		slot: 'searchs',
		type: 'field',
		field: {
			type: 'text',
			props: {
				placeholder: '折'
			},
			style: {
				width: '50px'
			}
		}
	},
	search: {
		slot: 'searchs',
		type: 'button',
		props: {
			type: 'primary'
		},
		label: '搜索',
		event: 'list'
	},
	reset: {
		slot: 'searchs',
		type: 'reset',
        label: '重置'
	},

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

## button operation添加tooltip和badge <Badge text="0.7.12+"/>
```js
operations: {
    edit: {
        type: 'button',
        label: '编辑按钮',
        show: {
            name: 'testSwitch',
            value: '1'
        },
        props: {
            size: 'mini'
        },
        tooltip: {
            effect: 'dark',
            content: 'Top Left 提示文字',
            placement: 'top-start'
        },
        badge: {
            // 'is-dot': true,      // 原点显示
            // hidden: true,        // 隐藏
            // type: 'info',        // 类型：primary / success / warning / danger / info
            max: 3,                 // 超过最大值会显示 '{max}+'
            value: function(data) {
                // return '' //同样不显示
                return data.id;  // 需要为数字或字符串
            }
        }
    }
}
```

## field operation <Badge text="0.5.0+"/>

::: warning
0.5.0 - 0.5.21 默认slot暂不支持field operation，在0.5.22+ 支持
:::

field operation可以生成任意field的edit态操作

可以通过处理 `fieldChange` 事件来捕获field operation的状态变更，通过判断 `path` 来响应对应的 field operation。当前值可以通过args.value获取，同时也可以通过 `this.data.searchs.testSelect` 获取路径和所配置的slot有关（如searchs 和 multipleSelect）

```js
operations: {
	testSelect: {
		slot: 'searchs',
		type: 'field',
		field: 'testSelect'
	},
},
actions: {
	fieldChange(args) {
		// console.log('fieldChange', args)
		if (args.path === 'searchs.testSelect') {
			console.log('searchs.testSelect', args.value)
		}
	}
}
```

### 默认值与reset operation

默认值可以在block的初始data内指定，如

```js
data: {
	searchs: {
		testText: 'a',
		testTextarea: 'b'
	}
},
```

配置一个reset operation 会重置当前slot内的全部field operaiont状态为默认值，reset operation的其它配置参数同button


## 配置：button 按钮

常规的按钮操作

<ClientOnly>
<ams-config name="button" type="operation"/>
</ClientOnly>

## 配置：icon 图标

icon operation可以配置图标，配置label 会显示为tooltip

<ClientOnly>
<ams-config name="icon" type="operation"/>
</ClientOnly>

## 配置：field 表单

field operation可以生成任意field的edit态操作，参考上面的说明

<ClientOnly>
<ams-config name="field" type="operation"/>
</ClientOnly>

## 配置：reset 重置

配置一个reset operation 会重置当前slot内的全部field operaiont状态为默认值，reset operation的其它配置参数同button

<ClientOnly>
<ams-config name="reset" type="operation"/>
</ClientOnly>
