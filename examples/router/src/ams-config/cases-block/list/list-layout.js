import ams from '@ams-team/ams';

ams.block('list-layout', {
    blocks: {
        firstScreen: {
            type: 'component',
            style: {
                position: 'releative'
            },
            blocks: {
                listOperationView: {
                    type: 'list',
                    resource: 'resource',
                    style: {
                        width: '100%',
                        transition: '0.3s'
                    },
                    options: {
                        // 支持多选
                        multipleSelect: true
                        // 列表高度自适应屏幕
                        // tableHeightFit: true
                    },
                    props: {
                        // height: 600,
                        'row-key': function(row) {
                            return row.id;
                        },
                        'expand-row-keys': []
                    },
                    expand: {
                        id: true,
                        testText: true,
                        testArrays: true,
                        testDatetime: true,
                        testRate: true
                    },
                    // 过滤设置（列表特有）
                    filters: {
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
                        }
                    },
                    // 排序设置（列表特有）
                    sorts: {
                        testInputnumber: true
                    },
                    fields: {
                        testVideo: false,
                        testAudio: false,
                        testUnits: false,
                        precent: false,
                        // testArrays: false,
                        testRadioArray: false,
                        testCheckboxArray: false
                    },
                    data: {
                        searchs: {
                            testText: 'a',
                            testTextarea: 'b'
                        }
                    },
                    operations: {
                        dropdown: {
                            slot: 'searchs',
                            type: 'dropdown',
                            label: '更多搜索',
                            event: 'list',
                            props: {
                                placeholder: '搜索...'
                            },
                            style: {
                                width: '300px'
                            },
                            fields: {
                                testText: true,
                                testDate: true,
                                testTime: true,
                                testDatetime: true,
                                testSwitch: true
                            }
                        },
                        edit: {
                            type: 'button',
                            label: '跳转'
                        },
                        edit2: {
                            type: 'button',
                            label: '跳转2'
                        },

                        testText: {
                            slot: 'searchs',
                            type: 'field',
                            field: 'testText',
                            label: '文本'
                        },
                        testSelect: {
                            slot: 'searchs',
                            type: 'field'
                            // field: 'testSelect' // field可省略
                            // label: '可省略'
                        },
                        testSwitch: {
                            slot: 'searchs',
                            type: 'field',
                            field: 'testSwitch',
                            style: {
                                height: '40px',
                                'line-height': '40px'
                            }
                            // label: '可省略'
                        },
                        testNewInput: {
                            slot: 'searchs',
                            type: 'field',
                            field: {
                                type: 'text',
                                props: {
                                    placeholder: '折'
                                },
                                style: {
                                    width: '70px'
                                }
                            }
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

                        reset: {
                            slot: 'searchs',
                            type: 'reset',
                            label: '重置'
                        },

                        selectMulti: {
                            slot: 'multipleSelect',
                            type: 'field',
                            field: 'testSelect'
                            // label: '可省略'
                        },

                        // testSelect1: {
                        //     type: 'field',
                        //     field: 'testSelect'
                        //     // label: '可省略'
                        // },

                        buttonMulti: {
                            slot: 'multipleSelect',
                            type: 'button',
                            label: '删除',
                            event: 'multi'
                        }
                    },
                    events: {
                        init: '@list @setExpandRow',
                        edit: '@routerPush:/list/edit'
                    },
                    actions: {
                        setExpandRow() {
                            // 设置默认展开行
                            this.block.props['expand-row-keys'] = ['2'];
                        },
                        fieldChange(args) {
                            console.log('fieldChange', args);
                            if (args.path === 'multipleSelect.testSelect') {
                                console.log('multipleSelect.testSelect', args.value);
                            }
                        },
                        multi(args) {
                            console.log('multipleSelect action', args.$prevReturn);
                        },
                        created() {
                            console.log('created');
                        },
                        destroyed() {
                            console.log('destroyed', this);
                        }
                    },
                    on: {
                        'cell-click': function(row, column, cell, event) {
                            if (!column.columnKey || column.columnKey === 'prodStatus') {
                                return false;
                            }

                            this.block.style.width = '75%';
                            setTimeout(() => {
                                this.callAction('@listSideBar.show', {
                                    row: row
                                });
                            }, 0);
                        }
                    }
                },
                listSideBar: {
                    type: 'form',
                    resource: 'resource',
                    style: {
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '0%',
                        height: '100%',
                        transition: '0.3s',
                        overflowY: 'scroll',
                        borderRadius: '10px'
                    },
                    fields: {
                        a: false,
                        c: false,
                        testVideo: false,
                        testAudio: false
                    },
                    actions: {
                        show({ row }) {
                            this.data = row;
                            this.block.style.width = '25%';
                            this.block.style.border = '1px solid #EBEEF5';
                        }
                    }
                }
            }
        }
    }
});
