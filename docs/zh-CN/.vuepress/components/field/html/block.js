export default {
	htmlField1: {
        ctx: 'view',
		type: 'form',
		resource: {
			fields: {
                id: {
                    type: 'text',
                    label: '序号'
                },
				html: {
					type: 'html',
                    label: '渲染字段',
                    view(value, field, contxt) {
                        // 可在view里面进行html拼接
                        return value + '<img src="https://vipshop.github.io/ams/index/ams-logo.png" />'
                    }
				}
			}
		},
		data: {
            id: '1204',
            html: '<div style="color: red">我是渲染的内容</div>'
        }
	},
	htmlField2: {
        ctx: 'view',
		type: 'list',
		resource: {
			fields: {
                id: {
                    type: 'text',
                    label: '序号'
                },
				html: {
					type: 'html',
                    label: '渲染字段',
                    view(value, field, context) {
                        // 可在view里面进行html拼接
                        // console.log('context-上下文', context);
                        return '<span style="color:red;">'+ value+'</span><img src="https://vipshop.github.io/ams/index/ams-logo.png" />'
                        
                    }
				}
			}
		},
		data: {
            list: [
                {
                    id: 1,
                    html: '1'
                },
                {
                    id: 2,
                    html: '2'
                },
                {
                    id: 3,
                    html: '3'
                },
            ]
        }
	},
};
