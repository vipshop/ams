# Array-simple


## 使用

在AMS的resourc配置使用：

```js
ArrayObject: {
    type: 'array-simple',
    label: 'ArrayObject',
    field: {
        type: 'object',
        label: '',
        fields: {
            text: {
                type: 'text',
                rules: [
                    {
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ]
            },
            testSelect: {
                type: 'select',
                collapseLimit: true,
                props: {
                    options: {
                        a: '黄金糕',
                        b: '双皮奶',
                        c: '蚵仔煎',
                        d: '龙须面',
                        e: '北京烤鸭'
                    }
                },
                style: {
                    width: '500px'
                }
            }
        },
        layout: {
            text: ['text', 'testSelect']
        },
        deletFunc: function(index) {
            this.value.splice(index, 1, {
                ...this.value[index],
                delet: 1
            });
        },
        show: function(data) {
            // console.log('ArrayObject', data);
            if (data.delet === 1) {
                return false;
            } else {
                return true;
            }
        }
    }
},
```

接口数据结构：

```
{
    "code": 200,
    "data": {
        "list":[
            {
                "ArrayObject": [
                    {
                        "text": "234",
                        "textSelect": "a,b,c"
                    },
                    {
                        "text": "345",
                        "textSelect": "a,b"
                    }
                ]
            }
            ...
        ]
    },
    "msg": "success"
}
```