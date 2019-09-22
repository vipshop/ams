import ams from '@ams-team/ams';

ams.block('imagelist2', {
    type: 'imagelist',
    ctx: 'view',
    resource: {
        api: {
            prefix: 'http://rap2api.taobao.org/app/mock/231578/ams/mock/',
            list: 'imagelist2'
        },
        fields: {
            id: {
                type: 'text'
            }
        }
    },
    operations: {
        id: {
            slot: 'searchs',
            type: 'field',
            label: '文本'
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
        rejectedItem: {
            type: 'text',
            props: {
                type: 'danger',
                size: 'mini',
            },
            label: '驳回'
        },
        rejectedItem1: {
            type: 'text',
            props: {
                size: 'mini',
            },
            label: '通过(设计)'
        },
        rejectedItem2: {
            type: 'text',
            props: {
                size: 'mini',
            },
            label: '通过(协助)'
        },
        deleteItem: {
            type: 'button',
            props: {
                type: 'text',
                size: 'mini',
                icon: 'el-icon-delete'
            }
        },
        editItem: {
            type: 'icon',
            label: '编辑',
            icon: 'el-icon-edit'
        }
    },
    pageSize: 10,
    props: {
        // shadow: 'always', // 阴影效果，可取值：hover（默认）| always | never
        subtitle: 'always' // 子标题出现方式，可取值：hover（默认）| always
        // pagination: 'simulate' // 模拟分页
    },
    events: {
        init: '@list',
    },
    actions: {
        rejectedItem() {
            alert('点击了驳回');
        },
        rejectedItem1() {
            alert('通过(设计)');
        },
        clickImageItem(args) {
            // 内置的action
            console.log(args);
            alert('点击图片');
        },
        editItem() {
            alert('点击了编辑');
        }
    },
    options: {
        title: {
            field: 'title',
            // 'prefix-icon': 'el-icon-search'
            'prefix-tag': {
                type: 'info', // success | info | warning | danger
                label(args) {
                    return args.status;
                }
            }
        },
        subtitle: {
            field: 'content'
        },
        info: {
            field: 'info'
        }
    }
});