const blockConfig = {
    render: true,
    type: 'router',
    data: {},
    resources: {
        routerRes: {
            api: {
                prefix:
                    'https://easy-mock.com/mock/5a0023effbbb09615044cb82/',
                read: 'read'
            },
            fields: {
                testDate: {
                    type: 'date',
                    label: '日期'
                },
                testSwitch: {
                    type: 'switch',
                    label: '开关'
                }
            }
        }
    },
    router: {
        routes: [
            {
                path: '',
                name: '首页',
                block: 'formEditAll',
                meta: {
                    icon: 'menu'
                }
            }
        ]
    },
    blocks: {
        formEditAll: {
            type: 'form',
            resource: 'routerRes',
            ctx: 'edit',
            style: {
                width: '50%'
            },
            data: {
                testRadio: 'c'
            },
            events: {
                init: '@read',
                submit: '@validate @update'
            },
            operations: {
                submit: {
                    type: 'button',
                    event: 'submit',
                    label: '提交',
                    props: {
                        type: 'primary'
                    }
                }
            }
        }
    }
}

export default blockConfig
