export const config = {
    BASE: 'CONFIG_BLOCK',
    type: {
        default: 'list'
    },
    resource: {
        type: 'union',
        current: 'string',
        label: '资源',
        default: 'demo',
        info: '资源配置，可以通过string使用同名resource，或者直接通过object指定',
        fields: {
            string: {
                type: 'text',
                label: 'string',
                default: 'demo',
                info: '资源名'
            },
            code: {
                type: 'ams-code',
                label: 'object',
                valueType: 'object',
                default: {
                    key: 'id',
                    api: {
                        prefix: '/',
                        create: 'create',
                        update: 'update',
                        read: 'read',
                        delete: 'delete',
                        list: 'list'
                    },
                    fields: {
                        id: {
                            type: 'text',
                            label: 'id',
                            default: 1
                        },
                        name: {
                            type: 'text',
                            label: '名字',
                            default: 'name'
                        },
                        rate: {
                            type: 'rate',
                            label: '评分',
                            default: 3
                        }
                    }
                }
            }
        }
    },
    fields: {
        type: 'union',
        current: 'none',
        label: 'fields配置',
        info: '会合并覆盖resource内的fields',
        fields: {
            BASE: 'CONFIG_NONE',
            value: {
                type: 'ams-code',
                label: '配置',
                valueType: 'object',
                default: {}
            }
        }
    },
    blocks: {
        desc: '可用slot：top'
    },
    data: {
        current: 'value',
        fields: {
            value: {
                default: {
                    list: [{
                        id: 1,
                        name: 'name1',
                        rate: 2.2
                    }, {
                        id: 2,
                        name: 'name2',
                        rate: 2.3
                    }, {
                        id: 3,
                        name: 'name3',
                        rate: 2.4
                    }],
                    total: 3
                }
            }
        }
    },
    operations: {
        desc: '可用slot：searchs（搜索条件） multipleSelect（多选操作）',
        fields: {
            value: {
                default: {
                    input: {
                        type: 'field',
                        slot: 'searchs',
                        field: {
                            type: 'text',
                            props: {
                                placeholder: '请输入'
                            }
                        }
                    },
                    search: {
                        type: 'button',
                        slot: 'searchs',
                        label: '搜索',
                        props: {
                            type: 'primary'
                        }
                    }
                }
            }
        }
    }
};

export const defaults = {};
