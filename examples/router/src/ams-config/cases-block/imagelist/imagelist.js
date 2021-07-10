import ams from '@ams-team/ams';

ams.block('imagelist', {
    type: 'imagelist',
    ctx: 'view',
    resource: {
        api: {
            prefix: 'https://nei.netease.com/api/apimock/b7c10125b452d3142d8375cf634f0b47/ams/mock/',
            list: 'imagelist'
        },
        fields: {
            id: {
                type: 'text'
            }
        }
    },
    data: {
        searchs: {
            id: 'w3cmark1',
            aa: '活动1'
        }
    },
    operations: {
        id: {
            slot: 'searchs',
            type: 'field',
            label: '文本'
        },
        aa: {
            slot: 'searchs',
            type: 'field',
            label: '名称',
            field: {
                type: 'text'
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
        showBatch: {
            slot: 'multipleSelect',
            type: 'button',
            label: '批量操作',
            show() {
                return !this.showBatchOperations;
            }
        },
        batchPassItems: {
            slot: 'multipleSelect',
            type: 'button',
            label: '批量通过',
            show() {
                return this.showBatchOperations;
            }
        },
        batchRejectedItems: {
            slot: 'multipleSelect',
            type: 'button',
            label: '批量驳回',
            show() {
                return this.showBatchOperations;
            }
        },
        clearAll: {
            slot: 'multipleSelect',
            type: 'button',
            label: '清空',
            show() {
                return this.showBatchOperations;
            }
        },
        hideBatch: {
            slot: 'multipleSelect',
            type: 'button',
            label: '退出',
            show() {
                return this.showBatchOperations;
            }
        },
        upload1: {
            slot: 'rightTop',
            type: 'button',
            label: '图片上传'
        },
        upload2: {
            slot: 'rightTop',
            type: 'button',
            label: '文案上传'
        },
        rejectedItem: {
            type: 'text',
            props: {
                type: 'danger',
                size: 'mini'
            },
            label: '驳回'
        },
        rejectedItem1: {
            type: 'text',
            props: {
                size: 'mini'
            },
            label: '通过(设计)'
        },
        rejectedItem2: {
            type: 'text',
            props: {
                size: 'mini',
                disabled: true
            },
            label: '通过(协助)'
        },
        deleteItem: {
            type: 'button',
            props: {
                type: 'text',
                size: 'mini',
                icon: 'el-icon-delete',
                disabled: true
            }
        },
        editItem: {
            type: 'icon',
            label: '编辑',
            icon: 'el-icon-edit'
        },
        buttonMulti: {
            type: 'button',
            label: '删除',
            event: 'multi'
        }
    },
    pageSize: 10,
    props: {
        // class: 'aa',
        // shadow: 'always', // 阴影效果，可取值：hover（默认）| always | never
        // subtitle: 'always' // 子标题出现方式，可取值：hover（默认）| always
        // pagination: 'simulate' // 模拟分页,
        // 'empty-text': '暂无数据'
    },
    events: {
        init: '@list'
    },
    actions: {
        batchPassItems() {
            if (this.batchSelected.length) {
                // 选中的结果
                console.log(this.batchSelected);
            } else {
                this.$message.error('请先勾选数据');
            }
            console.log('批量通过');
        },
        clearAll() {
            this.batchSelected = [];
        },
        batchRejectedItems() {
            if (this.batchSelected.length) {
                // 选中的结果
                console.log(this.batchSelected);
            } else {
                this.$message.error('请先勾选数据');
            }
            console.log('批量驳回');
        },
        rejectedItem() {
            alert('点击了驳回');
            this.showLoading();
        },
        rejectedItem1() {
            alert('通过(设计)');
        },
        deleteItem() {
            alert('点击了删除');
        },
        clickImageItem(args) {
            // 内置的action
            console.log(args);
            alert('点击图片');
        },
        editItem() {
            alert('点击了编辑');
        },
        fieldChange({ name, value }) {
            console.log(name, value);
        }
    },
    options: {
        // imageSrc: { // 图片地址
        //     field: 'image' // 字段名
        // },
        title: { // 主标题
            field: 'title',
            // 'prefix-icon': 'el-icon-search'
            'prefix-tag': {
                type: 'info', // success | info | warning | danger
                label(args) {
                    return args.status;
                }
            }
        },
        subtitle: { // 子标题
            field: 'content'
        },
        info: { // 标题右边信息
            field: 'info'
        },
        // subscript: { // 右下角角标
        //     field: 'info'
        // }
        categorys: [{ // 分类
            title: '<span style="color:#f60">90后</span>', // 分类名称
            index: 0 // 插入分类的位置
        }, {
            title: '80后',
            index: 3
        }, {
            title: '70后',
            index: 4
        }]
    }
});