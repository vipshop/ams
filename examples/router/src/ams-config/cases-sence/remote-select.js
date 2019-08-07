import ams from '@ams-team/ams';

ams.block('remote-select', {
    resources: {
        select: {
            api: {
                successCode: 200,
                // api前缀
                prefix: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/',
                tags: 'tag'
            },
            key: 'id',
            foreignKeys: ['projectId'],
            fields: {
                normalSelectEdit: {
                    type: 'select',
                    label: '本地select多选',
                    props: {
                        options: {
                            a: '黄金糕',
                            b: '双皮奶',
                            c: '蚵仔煎',
                            d: '龙须面',
                            e: '北京烤鸭',
                            0: '哈哈哈'
                        }
                    }
                },
                normalSingleSelectEdit: {
                    type: 'select',
                    label: '本地select单选',
                    useStringValue: false,
                    props: {
                        multiple: false,
                        clearable: true,
                        options: [{
                            label: '黄金糕',
                            value: 'a',
                            disabled: true
                        }, {
                            label: '双皮奶',
                            value: 'b'
                        }, {
                            label: '蚵仔煎',
                            value: 'c'
                        }, {
                            label: '龙须面',
                            value: 'd',
                            border: true
                        }, {
                            label: '北京烤鸭',
                            value: 'e'
                        }, {
                            label: '哈哈哈1',
                            value: 1
                        }]
                    },
                    get(val) { return val },
                    set(val) { return val },
                },
                selectEdit: {
                    BASE: 'SELECT_REMOTE',
                    label: '远程selectEdit',
                    type: 'select',
                    remoteConfig: {
                        action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/tag',
                        queryKey: 'requiredName',
                        labelKey: 'name',
                        params: {
                            params: {
                                a: 2
                            }
                        }
                    }
                },
                selectView: {
                    BASE: 'SELECT_REMOTE',
                    ctx: 'view',
                    label: '远程selectView',
                    type: 'select',
                    remoteConfig: {
                        action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/tag',
                        queryKey: 'requiredName',
                        labelKey: 'name',
                    }
                },
                singleSelectView: {
                    BASE: 'SELECT_REMOTE',
                    ctx: 'view',
                    label: '远程select单选view',
                    type: 'select',
                    props: {
                        multiple: false
                    },
                    remoteConfig: {
                        action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/tag',
                        queryKey: 'requiredName',
                        labelKey: 'name'
                    }
                },
                singleSelectEdit: {
                    BASE: 'SELECT_REMOTE',
                    label: '远程select单选edit',
                    type: 'select',
                    props: {
                        multiple: false,
                        clearable: true
                    },
                    remoteConfig: {
                        action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/tag',
                        queryKey: 'requiredName',
                        labelKey: 'name'
                    }
                },
                remoteCheckbox: {
                    ctx: 'edit',
                    BASE: 'SELECT_REMOTE',
                    label: 'checkbox',
                    type: 'checkbox',
                    remoteConfig: {
                        action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/tag',
                        queryKey: 'requiredName',
                        labelKey: 'name',
                        isInitEmpty: true,
                        isMiniBackfill: false,
                    }
                }
            }
        }
    },
    data: {
        selectView: 2003,
        selectEdit: 2003,
        singleSelectEdit: '2003',
        singleSelectView: '2003',
        normalSelectEdit: 0
    },
    type: 'form',
    resource: 'select',
    ctx: 'edit',
    props: {
        'label-width': '180px'
    },
    events: {
        submit: '@create'
    },
    operations: {
        submit: {
            type: 'button',
            label: '提交'
        }
    }
});
