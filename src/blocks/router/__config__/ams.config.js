export const config = {
    BASE: 'CONFIG_BLOCK',
    type: {
        default: 'router'
    },
    router: {
        type: 'union',
        current: 'value',
        label: 'router配置',
        info: '可以配置菜单和页面路由',
        fields: {
            BASE: 'CONFIG_NONE',
            value: {
                type: 'ams-code',
                label: '配置',
                valueType: 'object',
                default: {
                    routes: [
                        {
                            path: '',
                            name: 'subBlock',
                            block: 'subBlock',
                            meta: {
                                icon: 'el-icon-menu'
                            }
                        }
                    ]
                }
            }
        }
    }
};

export const defaults = {};
