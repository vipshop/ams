import ams from '@ams-team/ams';

ams.block('tree', {
    resources: {
        tree: {
            fields: {
                tree: {
                    type: 'tree',
                    label: '树',
                    props: {
                        options: [{
                            value: 1,
                            label: '一级 1',
                            children: [{
                                value: 4,
                                label: '二级 1-1',
                                children: [{
                                    value: 9,
                                    label: '三级 1-1-1',
                                    children: [{
                                        value: 91,
                                        label: '四级 1-1-1-1'
                                    }, {
                                        value: 92,
                                        label: '四级 1-1-1-2'
                                    }]
                                }, {
                                    value: 10,
                                    label: '三级 1-1-2'
                                }]
                            }]
                        }, {
                            value: 2,
                            label: '一级 2',
                            children: [{
                                value: 5,
                                label: '二级 2-1'
                            }, {
                                value: 6,
                                label: '二级 2-2'
                            }]
                        }, {
                            value: 3,
                            label: '一级 3',
                            children: [{
                                value: 7,
                                label: '二级 3-1'
                            }, {
                                value: 8,
                                label: '二级 3-2'
                            }]
                        }]
                    }
                }
            }
        }
    },
    blocks: {
        treeView: {
            ctx: 'view',
            type: 'form',
            resource: 'tree',
            fields: {
                tree: {
                    label: '树预览'
                }
            },
            data: {
                tree: '91,7'
            }
        },
        treeEdit: {
            ctx: 'edit',
            type: 'form',
            resource: 'tree',
            fields: {
                tree: {
                    props: {
                        // 'default-expand-all': true,
                        'show-checkbox': true
                    },
                    on: {
                        'check-change'(data, checked, indeterminate) {
                            console.log('hhhhh', data, checked, indeterminate);
                        }
                    },
                    label: '树编辑'
                }
            },
            data: {
                tree: '91,7'
            },
            actions: {
                fieldChange: function({ value, path }) {
                    console.log('fieldChange', value, path);
                }
            }
        }
    }
});
