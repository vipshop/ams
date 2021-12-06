import ams from '@ams-team/ams';

ams.block('list-tab', {
    type: 'tabs',
    options: {
        'tabs-list1': '<i class="el-icon-date"></i> tab1标题',
        'tabs-list2': '<i class="el-icon-date"></i> tab2标题'
    },
    data: {
        active: ''
    },
    blocks: {
        'tabs-list1': {
            ctx: 'view',
            type: 'list',
            events: {
                init: '@list'
            },
            resource: {
                api: {
                    prefix: 'https://www.yournana.club/vipshop/',
                    list: 'list?page=1&pageSize=20&testText=a'
                },
                fields: {
                    id: {
                        type: 'textarea',
                        label: 'ID',
                        props: {
                            'class-name': 'drag-column'
                        }
                    },
                    testText: {
                        type: 'text',
                        label: '店铺'
                    }
                }
            },
            data: {
                list: [],
                pageSize: 20,
                pageSizes: [10, 20]
            },
            operations: {
                multiSetHeader: {
                    type: 'button',
                    label: '设置'
                }
            }
        },
        'tabs-list2': {
            ctx: 'view',
            type: 'list',
            events: {
                init: '@list'
            },
            resource: {
                api: {
                    prefix: 'https://www.yournana.club/vipshop/',
                    list: 'list?page=1&pageSize=20&testText=a'
                },
                fields: {
                    id: {
                        type: 'textarea',
                        label: 'ID',
                        props: {
                            'class-name': 'drag-column'
                        }
                    },
                    testText: {
                        type: 'text',
                        label: '店铺'
                    }
                }
            },
            data: {
                list: Array.from(Array(100), (v, k) => ({
                    id: k + 1,
                    testText: `标题${k + 1}`
                })),
                pageSize: 20,
                pageSizes: [10, 20]
            },
            operations: {
                multiSetHeader: {
                    type: 'button',
                    label: '设置'
                }
            }
        }
    }
});
