import ams from '@ams-team/ams';

ams.block('union', {
    resources: {
        'union': {
            fields: {
                union: {
                    type: 'union',
                    label: 'union',
                    current: 'date',
                    fields: {
                        date: {
                            type: 'timerange',
                            label: 'timerange1'
                        },
                        text: {
                            type: 'text',
                            label: 'text1',
                            default: 'sss'
                        }
                    }
                }
            }
        }
    },
    blocks: {
        unionEdit: {
            type: 'form',
            resource: 'union',
            ctx: 'edit',
            data: {
                union: '1548413724000,1548417324000',
            },
            operations: {
                update: {
                    type: 'button',
                    label: '提交',
                    props: {
                        type: 'primary'
                    }
                }
            }
        },
        unionView: {
            type: 'form',
            ctx: 'view',
            resource: 'union',
            data: {
                union: '1548413724000,1548417324000',
            }
        }
    }
});
