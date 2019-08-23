const value = '#508ff2';

export default {
    resources: {
        res: {
            fields: {
                id: {
                    type: 'text',
                    label: 'id',
                    hidden: true
                },
                testColor: {
                    type: '<%=name%>',
                    label: '<%=name%>'
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
                testColor: value
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
            }
        },
        formView: {
            type: 'form',
            ctx: 'view',

            data: {
                testColor: value
            },

            resource: 'res',

            style: {
                width: '50%'
            }
        },
        list: {
            type: 'list',
            fields: {
                id: {
                    hidden: false
                }
            },
            data: {
                list: [{ id: '1', testColor: value }],
                total: 1
            },
            resource: 'res',
        }
    }
};
