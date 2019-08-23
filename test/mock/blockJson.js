const mockBlock = {
    resources: {
        resource: {
            api: {
                prefix: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/',
                create: 'create',
                update: 'update',
                read: 'read',
                delete: 'delete',
                list: 'list'
            },
            fields: {
                id: {
                    type: 'text',
                    label: 'id',
                    // hidden: true,
                    on: {
                        change: function(...args) {
                            console.log('text change', args, this);
                        }
                    }
                },
                testText: {
                    type: 'text',
                    rules: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    style: {
                        width: '100px'
                    },
                    props: {
                        'suffix-icon': 'el-icon-service'
                    }
                },
                testDate: {
                    type: 'date',
                    label: '日期'
                },
                testSelect: {
                    BASE: 'SELECT_REMOTE',
                    ctx: 'view',
                    label: '远程selectView',
                    type: 'select',
                    remoteConfig: {
                        action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/tag',
                        queryKey: 'requiredName',
                        labelKey: 'name'
                    }
                }
            }
        }
    },
    blocks: {
        list: {
            type: 'list',
            resource: 'resource',
            ctx: 'view',
            on: {
                'cell-click': function() {
                    this.$refs.amsTable.clearFilter();
                }
            },
            events: {
                init: '@list'
            },
            blocks: {
                listTop: {
                    type: 'component',
                    options: {
                        is: 'div',
                        text: '我是列表区块最顶部的插槽内容！！'
                    },
                    style: {
                        height: '80px',
                        'line-height': '80px',
                        margin: '20px auto 0',
                        border: '1px solid #E4E7ED'
                    },
                    slot: 'top'
                }
            }
        },
        err: function(){
            return {
                type: 'error',
                resource: 'resource'
            }
        }
    }
}

export default mockBlock;
