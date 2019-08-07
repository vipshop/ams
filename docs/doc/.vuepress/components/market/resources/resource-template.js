export default {
    key: 'templateId',
    api: {
        successCode: 0,
        contentType: 'form',
        // api前缀
    },
    fields: {
        templateId: {
            type: 'text',
            ctx: 'view',
            label: '模版Id'
        },
        title: {
            type: 'text',
            label: '模板名称'
        },
        projectId: {
            type: 'text',
            label: '项目id'
        },
        templateContent: {
            type: 'textarea',
            label: '配置JSON'
        },
        description: {
            type: 'textarea',
            label: '模版说明',
            props: {
                rows: 3
            }
        },
        classId: {
            type: 'select',
            label: '分类',
            props: {
                multiple: false,
                options: {
                    0: '全部',
                    1: '列表',
                    2: '表单',
                    3: '异常页',
                    4: '路由',
                    5: '图表',
                    6: '规划日历'
                }
            }
        },
        image: {
            type: 'image',
            label: '展示图片',
            tip: '只能上传jpg/png文件，且不超过500kb',
            successUrlKey: 'url'
        },
        createTime: {
            type: 'datetime',
            label: '创建时间',
            ctx: 'view'
        },
        updateTime: {
            type: 'datetime',
            label: '更新时间',
            ctx: 'view'
        },
        creator: {
            type: 'text',
            label: '创建者OA',
            ctx: 'view'
        },
        editor: {
            type: 'text',
            label: '编辑者OA',
            ctx: 'view'
        }
    }
}
