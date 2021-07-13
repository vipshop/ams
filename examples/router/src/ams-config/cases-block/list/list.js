import ams from '@ams-team/ams';

ams.block('list', {
    ctx: 'view',
    type: 'list',
    resource: 'resource',
    props: {
        // 自动加上索引
        type: 'index',
        // 定义列表操作项的宽度
        'operations-width': 300
    },
    options: {
        // 支持拖拽
        drag: true
    },
    // 过滤设置（列表特有）
    filters: {
        id: true,
        testCheckbox: {
            // 多选
            multiple: false,
            // 远程过滤
            remote: true
        },
        testSelect: {
            // 多选
            multiple: true,
            // 远程过滤
            remote: false
        },
        testCheckboxArray: {
            // 多选
            multiple: true,
            // 远程过滤
            remote: false
        }
    },
    // 排序设置（列表特有）
    sorts: {
        testInputnumber: true,
        testDatetime: true
    },
    fields: {
        // id: false,
        precent: false,
        testVideo: false,
        testAudio: false,
        testArrays: false,
        testText: false,
        testTree: false,
        testRadioArray: false
    },

    operations: {
        edit: {
            type: 'button',
            label: '固定跳转',
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
                    return data.id;  // 需要为数字或字符串
                }
            }
        },
        customEdit: {
            type: 'button',
            label: '参数跳转',
            show(data) {
                return data.id === 1 && data.testSwitch;
            },
            props: {
                size: 'mini'
            }

        },
        replace: {
            type: 'button',
            label: '替换跳转',
            show: 'testSwitch',
            props: {
                size: 'mini'
            },
            badge: {
                'is-dot': true,      // 原点显示
                type: 'warning',
                value: function(data) {
                    if (data.id <= 3) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        },
        back: {
            type: 'button',
            label: '回退',
            props: {
                size: 'mini'
            }
        },
        deleteAct: {
            type: 'button',
            label: '删除',
            props: {
                size: 'mini'
            }
        },
        id: {
            slot: 'rightTop',
            type: 'field',
            label: '文本'
        },
        id2: {
            slot: 'leftBottom',
            type: 'field',
            field: 'id',
            label: '文本'
        },
        timeRange: {
            slot: 'searchs',
            type: 'field',
            label: '日期选择',
            field: {
                type: 'datetimerange',
                props: {
                    size: 'mini'
                },
                default: [Number(new Date()), Number(new Date())]
            }
        },
        localOptions: {
            slot: 'searchs',
            type: 'field',
            label: '本地列表',
            field: {
                type: 'select',
                label: '本地用户',
                props: {
                    type: 'button',
                    size: 'mini',
                    multiple: false,
                    clearable: true,
                    options: [
                        {
                            label: '黄金糕',
                            value: 'a'
                        },
                        {
                            label: '双皮奶',
                            value: 'b'
                        },
                        {
                            label: '蚵仔煎',
                            value: 'c'
                        }
                    ]
                }
            }
        },
        remoteOptions: {
            slot: 'searchs',
            type: 'field',
            label: '远程列表',
            field: {
                isInitOptionsWithAPI: true,
                type: 'select',
                BASE: 'SELECT_REMOTE',
                remoteConfig: {
                    isInitEmpty: true,
                    action:
                        'http://rap2api.taobao.org/app/mock/245887/example/1582993530845',
                    queryKey: 'query'
                }
            }
        },
        remoteSearchOptions: {
            slot: 'searchs',
            type: 'field',
            label: '远程搜索列表',
            field: {
                type: 'select',
                BASE: 'SELECT_REMOTE',
                remoteConfig: {
                    action:
                        'http://rap2api.taobao.org/app/mock/245887/example/1582993530845',
                    queryKey: 'query'
                }
            }
        },
        radioButton: {
            slot: 'searchs',
            type: 'field',
            label: '单选按钮',
            field: {
                type: 'checkbox',
                label: '单选按钮',
                props: {
                    type: 'button',
                    size: 'mini',
                    options: [
                        {
                            label: '黄金糕',
                            value: 'a'
                        },
                        {
                            label: '双皮奶',
                            value: 'b'
                        },
                        {
                            label: '蚵仔煎',
                            value: 'c'
                        }
                    ]
                }
            }
        },
        testSelect: {
            slot: 'searchs',
            type: 'field'
            // desc: '<div style="color: red;">desc校验提示</div>'
            // field: 'testSelect' // field可省略
            // label: '可省略'
        },
        addItem: {
            slot: 'searchs',
            type: 'button',
            label: '新增',
            props: {
                type: 'primary'
            }
        },
        search: {
            slot: 'searchs',
            type: 'button',
            props: {
                type: 'primary'
            },
            label: '搜索',
            event: 'list:1'
        },
        resetItem: {
            slot: 'searchs',
            type: 'reset',
            label: '重置'
        },
        button: {
            slot: 'rightTop',
            type: 'button',
            label: '搜索',
            props: {
                type: 'primary'
            },
            event: 'list:1',
            tooltip: {
                effect: 'dark',
                content: 'Top Left 提示文字',
                placement: 'top-start'
            },
            badge: {
                'is-dot': true, // 原点显示
                // hidden: true,        // 隐藏
                // type: 'info',        // 类型：primary / success / warning / danger / info
                max: 3, // 超过最大值会显示 '{max}+'
                value: function(data) {
                    return true;
                }
            }
        }
    },

    on: {
        'cell-click': function() {
            console.log('cell-click', this);
            this.$refs.amsTable.clearFilter();
        },
        'list-success': function(res) {
            console.log(res);
        }
    },
    data: {
        pageSize: 20,
        // 定义分页数
        pageSizes: [10, 20],
        layout: 'total, prev, pager, next'
    },
    events: {
        submit: '@submit',
        init: '@list @afterRequest',
        edit: '@routerPush:/list/edit',
        replace: '@routerReplace:/list/edit',
        back: '@routerGo:-1'
    },

    actions: {
        afterRequest({ $prevReturn }) {
            console.log('beforeRequest', $prevReturn);
        },
        deleteAct() {
            this.callAction('@delete').then(res => {
                console.log('delete', res);
            });
        },
        submit({ $prevReturn }) {
            console.log('list-submit', $prevReturn);
        },
        async addItem() {
            const res = await this.callAction('@create');
            console.log('addItem action', res);
        },
        customEdit(params) {
            // console.log('customEdit', params)
            this.callAction('routerPush', {
                name: '编辑',
                query: { id: params.$prevReturn.id }
            });
        },
        resetItem() {
            this.data.rightTop.id = '';
            this.data.leftBottom.id2 = '';
            this.data.searchs.radioButton = '';
        }
    },
    blocks: {
        listTop: {
            slot: 'top',
            type: 'component',
            options: {
                is: 'div',
                text: '我是列表区块最顶部的插槽内容！！'
            },
            style: {
                padding: '20px',
                marginBottom: '20px',
                border: '1px solid #3eaf7c'
            }
        },
        listTableTop: {
            slot: 'tableTop',
            type: 'component',
            options: {
                is: 'div',
                text: '我是列表区块表格顶部的插槽内容！！'
            },
            style: {
                padding: '20px',
                border: '1px solid #f60'
            }
        }
    }
});
