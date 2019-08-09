export const config = {
    BASE: 'CONFIG_FIELD',
    type: {
        default: 'cascader'
    },
    default: {
        type: 'text',
        default: '',
        props: {
            placeholder: '默认值：多个值由,分隔'
        }
    },
    props: {
        current: 'value',
        fields: {
            value: {
                default: {
                    options: [
                        {
                            value: 'zhinan',
                            label: '指南',
                            children: [
                                {
                                    value: 'shejiyuanze',
                                    label: '设计原则',
                                    children: [
                                        {
                                            value: 'yizhi',
                                            label: '一致'
                                        },
                                        {
                                            value: 'fankui',
                                            label: '反馈'
                                        }
                                    ]
                                },
                                {
                                    value: 'daohang',
                                    label: '导航',
                                    children: [
                                        {
                                            value: 'cexiangdaohang',
                                            label: '侧向导航'
                                        },
                                        {
                                            value: 'dingbudaohang',
                                            label: '顶部导航'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            value: 'ziyuan',
                            label: '资源',
                            children: [
                                {
                                    value: 'axure',
                                    label: 'Axure Components'
                                },
                                {
                                    value: 'sketch',
                                    label: 'Sketch Templates'
                                },
                                {
                                    value: 'jiaohu',
                                    label: '组件交互文档'
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
};

export const defaults = {};
