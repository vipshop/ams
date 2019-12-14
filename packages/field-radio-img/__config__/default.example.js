export default {
    resources: {
        res: {
            fields: {
                radioImg: {
                    type: 'radio-img',
                    label: '单选图片',
                    props: {
                        options: [
                            {
                                label: '全部人群',
                                value: 'a',
                                image: 'https://h5rsc.vipstatic.com/ams/favicon64*2.ico'
                            },
                            {
                                label: '特殊人群',
                                value: 'b',
                                image: 'https://h5rsc.vipstatic.com/ams/favicon64*2.ico'
                            }
                        ]
                    }
                }
            }
        }
    },
    blocks: {
        formEdit: {
            type: 'form',
            ctx: 'edit',
            resource: 'res',
            data: {
                radioImg: 'a'
            },
            style: {
                width: '50%'
            },
            operations: {
                create: {
                    type: 'button',
                    label: '提交',
                    props: {
                        type: 'primary'
                    }
                }
            },
            actions: {
                fieldChange({ name, path, value }) {
                    console.log('fieldChange---', name, path, value);
                }
            }
        },
        formView: {
            type: 'form',
            ctx: 'view',
            data: {
                radioImg: 'a'
            },
            resource: 'res',

            style: {
                width: '50%'
            }
        }
    }
};
