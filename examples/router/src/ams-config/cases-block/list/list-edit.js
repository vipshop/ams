import ams from '@ams-team/ams';

ams.block('list-edit', {
    ctx: 'edit',
    type: 'list',
    props: {
        type: 'index'
    },
    resource: {
        fields: {
            a: {
                type: 'text',
                label: '指标',
                props: {
                    width: '170px'
                }
            },
            b: {
                type: 'text',
                label: '连续次数'
            },
            c1: {
                type: 'unitselect',
                label: '时间段',
                units: ['分钟', '小时'],
                defaultUnit: '分钟'
            },
            c2: {
                type: 'unitselect',
                label: '往前偏移',
                units: ['分钟'],
                defaultUnit: '分钟'
            },
            d: {
                type: 'select',
                label: '统计方式',
                props: {
                    multiple: false,
                    options: {
                        '0': '总和',
                        '1': '最大值',
                        '2': '最小值',
                        '3': '平均值'
                    }
                }
            },
            e: {
                type: 'select',
                label: '对比',
                props: {
                    multiple: false,
                    options: {
                        '0': '昨天',
                        '1': '前天',
                        '2': '上周',
                        '3': '前10分钟',
                        '4': '前5分钟',
                        '5': '不对比',
                        '6': '自定义'
                    }
                }
            },
            f: {
                type: 'select',
                label: '条件',
                props: {
                    multiple: false,
                    options: {
                        '0': '同比下降',
                        '1': '同比上升'
                    }
                },
                changeConfig(field, context) {
                    if (context && context.e === '5') {
                        field.props.options = {
                            '>': '>',
                            '>=': '>=',
                            '<': '<',
                            '<=': '<=',
                            '==': '=='
                        };
                    }
                    !field.props.options[context.f] && (context.f = '');
                    // console.log(context);
                    return field;
                }
            },
            g: {
                type: 'text',
                label: '阀值'
            },
            h: {
                type: 'select',
                label: '行连接',
                props: {
                    multiple: false,
                    options: {
                        '0': 'and',
                        '1': 'or'
                    }
                }
            }
        }
    },
    data: {
        list: [{
            a: '大促指标',
            b: '12',
            c1: '12',
            c2: '23',
            d: '0',
            e: '0',
            f: '0',
            g: '12',
            h: '0'
        }, {
            a: '大促指标',
            b: '12',
            c1: '12',
            c2: '23',
            d: '0',
            e: '0',
            f: '0',
            g: '12',
            h: '0'
        }]
    },
    operations: {
        removeItem: {
            type: 'button',
            label: '删除',
            props: {
                type: 'danger',
                icon: 'el-icon-delete'
            }
        },
        addItem1: {
            slot: 'searchs',
            type: 'button',
            label: '新增规则',
            props: {
                type: 'primary'
            },
            event: 'addItem'
        },
        addItem2: {
            slot: 'rightTop',
            type: 'button',
            label: '右上',
            props: {
                type: 'primary'
            },
            event: 'addItem'
        },
        addItem3: {
            slot: 'leftBottom',
            type: 'button',
            label: '左下',
            props: {
                type: 'primary'
            },
            event: 'addItem'
        },
        addItem4: {
            slot: 'rightBottom',
            type: 'button',
            label: '右下1',
            props: {
                type: 'primary'
            },
            event: 'addItem'
        },
        addItem5: {
            slot: 'rightBottom',
            type: 'button',
            label: '添加',
            props: {
                type: 'primary'
            },
            event: 'addItem'
        },
        saveItem: {
            slot: 'searchs',
            type: 'button',
            label: '保存',
            props: {
                type: 'primary'
            }
        }
    },
    actions: {
        addItem: function() {
            // this.showLoading();
            this.data.list.push({
                'a': '',
                'b': '',
                'c1': '',
                'c2': '',
                'd': '',
                'e': '',
                'f': '',
                'g': '',
                'h': ''
            });
        },
        saveItem: function() {
            alert('你点击了保存按钮');
        },
        removeItem: function(args) {
            console.log(args);
            this.data.list.splice(args.$prevReturn.__index, 1);
        }
    }
});
