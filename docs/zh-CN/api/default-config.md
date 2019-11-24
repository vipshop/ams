---
DefaultConfig: DefaultConfig 简化配置
---
# 简化配置（默认配置）

通过简化配置可以将一些常用的配置用`常量`标识，减少重复代码的编写。可以使用ams内部继承的配置，也可以在项目自行配置，在文末自定义有使用说明。

在ams内部目前集成了以下几种简化配置，通过在浏览器控制台`console面板`打印`ams.configs`也可以查看

## FORM_SUBMIT

提交按钮的简化配置

```js
operations: {
    BASE: 'FORM_SUBMIT'
}
等同于
operations: {
    submit: {
        type: 'button',
        label: '提交',
        props: {
            type: 'primary'
        }
    }
}
```

## SELECT_REMOTE

远程搜索的简化配置，更多的配置详见[远程搜索](/field/select.html#远程搜索)

```js
select: {
    BASE: 'SELECT_REMOTE',
    label: 'select',
    type: 'select',
    remoteConfig: {
        action: 'http://xxx.vip.com/examples/admin/mock/simple.tags.json',
        queryKey: 'requiredName'
    }
}
```

## LIST

列表页的简化配置

```js
list: {
	BASE: 'LIST'
}
等同于
list: {
	type: 'list'
}
```

## LINE

折线图的简化配置

```js
line: {
	BASE: 'LINE'
}
等同于
line: {
	type: 'line',
    toolbox: {
        show: true,
        trigger: 'axis'
    },
    legend: {
        data: 'data.legend'
    },
    xAxis: {
        data: 'data.xAxis'
    }
}
```

## BAR

柱状图的简化配置

```js
bar: {
	BASE: 'BAR'
}
等同于
bar: {
	type: 'bar',
    tooltip: {
        show: true,
        trigger: 'axis'    // 触发类型, axis 坐标轴触发
    },
    legend: {
        data: 'data.legend'
    },
    xAxis: {
        data: 'data.xAxis'
    }
}
```

## PIE

饼状图的简化配置

```js
pie: {
	BASE: 'PIE'
}
等同于
pie: {
	type: 'pie',
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data: 'data.legend'
    }
}
```

## FUNNEL

漏斗图的简化配置

```js
funnel: {
	BASE: 'FUNNEL'
}
等同于
funnel: {
	tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%'
    },
    toolbox: {
        feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
        }
    },
    legend: {
        data: 'data.legend'
    }
}
```

## SCATTER

散点图的简化配置

```js
scatter: {
    BASE: 'SCATTER'
}
等同于
scatter: {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        right: 10,
        data: 'data.legend'
    },
    xAxis: {
        scale: true
    },
    yAxis: {
        scale: true     // y轴不会强制包含零刻度，在双数值轴的散点图中比较有用
    }
}
```

## RADAR

雷达图的简化配置

```js
radar: {
    BASE: 'RADAR'
}
等同于
radar: {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        data: 'data.legend',
        right: 0
    },
    // 雷达图坐标系, 每一个轴（indicator 指示器）都是一个单独的维度
    radar: {
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
            }
        }
    }
}
```

## 自定义

可以调用`ams.config(config)`设置自定义的简化配置，如需要一个`TEXT`类型，则可以设置

```js
ams.config({
    TEXT: {
        type: 'text',
        style: {}
    }
})
使用时如下：
custom: {
    BASE: 'TEXT'
}
```