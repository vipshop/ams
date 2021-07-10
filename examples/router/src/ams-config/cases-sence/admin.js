import ams from '@ams-team/ams';

const resource = {
    api: {
        contentType: 'form',
        // api前缀
        prefix: '//www.yournana.club/vipshop/',
        // 读取数据接口
        read: 'read',
        // 更新数据接口
        update: 'update',
        // 更新数据接口
        list: 'list-pagination',
        delete: 'delete',
        create: 'create'
    },
    fields: {
        id: {
            type: 'text',
            label: 'id',
            ctx: 'view'
        },
        title: {
            type: 'text',
            label: '标题'
        },
        content: {
            type: 'textarea',
            label: '内容'
        },
        create_time: {
            type: 'datetime',
            label: '创建时间',
            props: {
                'value-format': 'yyyy-MM-dd HH:mm:ss'
            }
        },
        update_time: {
            type: 'datetime',
            label: '更新时间',
            props: {
                'value-format': 'yyyy-MM-dd HH:mm:ss'
            }
        }
    }
};

ams.block('admin', {
    blocks: {
        adminListView: {
            ctx: 'view',
            type: 'list',
            // 指定block使用的资源为上面声明的demo-res
            resource,
            events: {
                init: '@list @test',
                removeItem: '@confirm:确认删除吗? @delete init',
                editItem: '@adminEditDialog.show',
                addItem: '@adminAddDialog.show'
            },
            // 排序设置（列表特有）
            sorts: {
                id: true
            },
            actions: {
                test() {
                    console.log(this);
                }
            },
            operations: {
                id: {
                    slot: 'searchs',
                    type: 'field',
                    field: 'id',
                    label: 'id'
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
                addItem: {
                    slot: 'searchs',
                    type: 'button',
                    label: '添加',
                    props: {
                        type: 'primary'
                    }
                },
                editItem: {
                    type: 'button',
                    props: {
                        type: 'primary',
                        icon: 'el-icon-edit',
                        circle: true
                    }
                },
                removeItem: {
                    type: 'button',
                    props: {
                        type: 'danger',
                        icon: 'el-icon-delete',
                        circle: true
                    }
                }
            }
        },
        adminEditDialog: {
            type: 'dialog',
            data: {
                title: '编辑',
                visible: false
            },
            events: {
                submit: 'editDialogForm.submit'
            },
            actions: {},
            operations: {
                submit: {
                    type: 'button',
                    label: '提交',
                    props: {
                        type: 'primary'
                    }
                },
                hide: {
                    type: 'button',
                    label: '关闭'
                }
            },
            blocks: {
                editDialogForm: {
                    type: 'form',
                    resource, // 此处的resource能否去掉？
                    ctx: 'edit',
                    events: {
                        init: '@read',
                        submit: '@validate @update adminListView.init @adminEditDialog.hide'
                    }
                }
            }
        },
        adminAddDialog: {
            type: 'dialog',
            data: {
                title: '添加',
                visible: false
            },
            events: {
                submit: 'addDialogForm.submit'
            },
            actions: {},
            operations: {
                submit: {
                    type: 'button',
                    label: '提交',
                    props: {
                        type: 'primary'
                    }
                },
                hide: {
                    type: 'button',
                    label: '关闭'
                }
            },
            blocks: {
                addDialogForm: {
                    type: 'form',
                    resource,
                    ctx: 'edit',
                    events: {
                        submit:
                            '@validate @create adminListView.init @adminAddDialog.hide @resetData'
                    }
                }
            }
        }
    }
});
