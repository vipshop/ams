import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('object', {
    resources: {
        object: {
            api: {
                prefix: prefix,
                create: 'create',
                contentType: 'json'
            },
            fields: {
                object1: {
                    label: '对象 1',
                    type: 'object',
                    fields: {
                        field1: {
                            label: '字段 1',
                            type: 'text',
                            info: '字段 1 info',
                            desc: '字段 1 desc'
                        },
                        field2: {
                            label: '字段 2',
                            type: 'select',
                            desc: '字段 2 desc'
                        }
                    }
                },
                object2: {
                    label: '对象 2',
                    type: 'object',
                    layout: { field1: ['field1', 'field2'] },
                    fields: {
                        field1: {
                            label: '字段 1',
                            type: 'text',
                            info: '字段 1 info',
                            desc: '字段 1 desc'
                        },
                        field2: {
                            label: '字段 2',
                            type: 'select',
                            desc: '字段 2 desc'
                        }
                    }
                }
            }
        }
    },
    blocks: {
        objectEditMode: {
            ctx: 'edit',
            type: 'form',
            resource: 'object'
        }
    }
});
