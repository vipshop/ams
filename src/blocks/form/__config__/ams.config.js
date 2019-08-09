export const config = {
    BASE: 'CONFIG_BLOCK',
    type: {
        default: 'form'
    },
    ctx: {
        type: 'radio',
        props: {
            options: {
                edit: '编辑',
                view: '展示'
            },
        },
        default: 'edit',
        label: '状态',
        info: '编辑态为edit，展示态为view'
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
        desc: '可用slot：top field:{fieldName} '
    },
    layout: {
        type: 'union',
        current: 'none',
        label: 'layout配置',
        info: `可以重定义field的布局，如合并多个field在同一行，如{ testText: ['testTest', 'testDate']}`,
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
};

export const defaults = {};
