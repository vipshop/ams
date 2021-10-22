import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('select', {
    resources: {
        select: {
            api: {
                successCode: 200,
                // api前缀
                prefix: prefix,
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
                normalSelectView: {
                    type: 'select',
                    ctx: 'view',
                    label: '本地selectView',
                    props: {
                        options: {
                            e: '北京烤鸭',
                            0: '哈哈哈'
                        }
                    }
                },
                button: {
                    type: 'button',
                    label: '',
                    props: {
                        inline: true,
                        text: '按钮'
                    }
                },
                normalSingleSelectEdit: {
                    type: 'select',
                    label: '本地select单选',
                    useStringValue: false,
                    props: {
                        inline: false,
                        multiple: false,
                        clearable: true,
                        options: [{
                            label: '全部',
                            value: ''
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
                    set(val) { return val }
                },
                normalSingleSelectView: {
                    type: 'select',
                    ctx: 'view',
                    label: '本地selectView',
                    props: {
                        options: [{
                            label: '全部',
                            value: ''
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
                    set(val) { return val }
                },
                selectGroupEdit: {
                    type: 'select',
                    ctx: 'edit',
                    label: '本地分组selectView',
                    props: {
                        multiple: false,
                        options: [{
                            label: '热门城市',
                            options: [{
                                value: 'Shanghai',
                                label: '上海'
                            }, {
                                value: 'Beijing',
                                label: '北京'
                            }]
                        }, {
                            label: '城市名',
                            options: [{
                                value: 'Chengdu',
                                label: '成都'
                            }, {
                                value: 'Shenzhen',
                                label: '深圳'
                            }, {
                                value: 'Guangzhou',
                                label: '广州'
                            }, {
                                value: 'Dalian',
                                label: '大连'
                            }]
                        }]
                    }
                },
                selectEdit: {
                    BASE: 'SELECT_REMOTE',
                    label: '远程selectEdit',
                    type: 'select',
                    remoteConfig: {
                        action: `${prefix}tag`,
                        queryKey: 'requiredName',
                        labelKey: 'name',
                        params: {
                            a: 2
                        },
                        isCache: false,
                        transform($field, data) {
                            const field = $field.field;
                            const remoteConfig = field.remoteConfig;
                            const options = [];
                            data.forEach(item => {
                                const value = item[remoteConfig.valueKey];
                                const label = item[remoteConfig.labelKey];
                                options.push({
                                    value,
                                    label,
                                    html: `<span style="float: left">${label}</span><span style="float: right; color: #8492a6; font-size: 13px">${value}</span>`
                                });
                            });
                            return options;
                        }
                    }
                },
                selectView: {
                    BASE: 'SELECT_REMOTE',
                    ctx: 'view',
                    label: '远程selectView',
                    type: 'select',
                    remoteConfig: {
                        action: `${prefix}tag`,
                        queryKey: 'requiredName',
                        labelKey: 'name',
                        onSuccess: function(options, res) {
                            console.log('请求成功后的回调', options, res);
                        },
                        onError: function(options, res) {
                            console.log('请求失败的回调', options, res);
                        }
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
                        action: `${prefix}tag`,
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
                        action: `${prefix}tag`,
                        queryKey: 'requiredName',
                        labelKey: 'name'
                    }
                }
            }
        }
    },
    ctx: 'edit',
    type: 'form',
    resource: 'select',
    props: {
        'label-width': '180px'
    },
    operations: {
        submit: {
            type: 'button',
            label: '提交'
        }
    },
    data: {
        selectView: 2002,
        selectEdit: 1,
        singleSelectEdit: 2,
        singleSelectView: 2003,
        normalSelectEdit: 0,
        normalSelectView: 0,
        normalSingleSelectEdit: '',
        normalSingleSelectView: ''
    },
    events: {
        submit: '@create'
    },
    layout: {
        normalSelectView: ['normalSelectView', 'button']
    },
    blocks: {
    }
});
