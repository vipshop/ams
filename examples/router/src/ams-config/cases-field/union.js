import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('union', {
    resources: {
        union: {
            api: {
                prefix: prefix,
                update: 'update'
            },
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
            ctx: 'edit',
            type: 'form',
            resource: 'union',
            data: {
                union: '1548413724000,1548417324000'
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
            ctx: 'view',
            type: 'form',
            resource: 'union',
            data: {
                union: '1548413724000,1548417324000'
            }
        }
    }
});
