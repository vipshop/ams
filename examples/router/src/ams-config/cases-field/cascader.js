import ams from '@ams-team/ams';
const options = [{
    value: 'zhinan',
    label: '指南',
    children: [{
        value: 'shejiyuanze',
        label: '设计原则',
        children: [{
            value: 'yizhi',
            label: '一致'
        }, {
            value: 'fankui',
            label: '反馈'
        }]
    }, {
        value: 'daohang',
        label: '导航',
        children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
        }, {
            value: 'dingbudaohang',
            label: '顶部导航'
        }]
    }]
}, {
    value: 'ziyuan',
    label: '资源',
    children: [{
        value: 'axure',
        label: 'Axure Components'
    }, {
        value: 'sketch',
        label: 'Sketch Templates'
    }, {
        value: 'jiaohu',
        label: '组件交互文档'
    }]
}];

ams.block('cascader', {
    resources: {
        cascader1: {
            fields: {
                cascader1FieldA: {
                    type: 'cascader',
                    label: '默认可搜索',
                    props: {
                        options: options,
                        placeholder: '试试搜索：指南',
                        class: 'is-required'
                    }
                },
                cascader1FieldC: {
                    type: 'cascader',
                    label: '仅显示最后一级',
                    props: {
                        options: options,
                        clearable: true,
                        'show-all-levels': false
                    }
                },
                cascader1FieldD: {
                    type: 'cascader',
                    label: '选择任意一级选项',
                    props: {
                        options: options,
                        clearable: true,
                        props: {
                            // checkStrictly: true
                        }
                    }
                }
            }
        },
        cascader2: {
            fields: {
                cascader2FieldA: {
                    type: 'cascader',
                    label: '默认显示所有',
                    props: {
                        options: options,
                        props: {
                            // multiple: true
                        }
                    }
                },
                cascader2FieldB: {
                    type: 'cascader',
                    label: '折叠展示',
                    props: {
                        options: options,
                        'collapse-tags': true,
                        props: {
                            // multiple: true
                        }
                    }
                },
                cascader2FieldC: {
                    type: 'cascader',
                    label: '多选选择任意一级选项',
                    props: {
                        options: options,
                        props: {
                            // multiple: true,
                            // checkStrictly: true
                        }
                    }
                }
            }
        }
    },
    blocks: {
        cascaderFieldTitle1: {
            type: 'title',
            options: {
                title: '级联单选'
            }
        },
        cascaderField1: {
            ctx: 'edit',
            type: 'form',
            resource: 'cascader1',
            style: {
                width: '60%'
            },
            props: {
                'label-width': '170px'
            }
        },
        cascaderFieldTitle2: {
            type: 'title',
            options: {
                title: '级联多选'
            }
        },
        cascaderField2: {
            ctx: 'edit',
            type: 'form',
            resource: 'cascader2',
            style: {
                width: '60%'
            },
            props: {
                'label-width': '170px'
            }
        }
    }
});
