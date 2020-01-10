import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('originfile', {
    resources: {
        'res-originfile': {
            api: {
                prefix: prefix,
                create: 'create',
                contentType: 'json'
            },
            fields: {
                name: {
                    type: 'text',
                    label: '任务名'
                },
                exec_time: {
                    type: 'text',
                    label: '执行时间'
                },
                edit_type: {
                    type: 'select',
                    label: '标签处理方式',
                    props: {
                        multiple: false,
                        options: {
                            '1': '打',
                            '2': '摘'
                        }
                    }
                },
                file: {
                    type: 'originfile',
                    label: '文件',
                    isShowResetButton: true
                },
                label: {
                    type: 'text',
                    label: '标签'
                }
            }
        }
    },
    ctx: 'edit',
    type: 'form',
    resource: 'res-originfile',
    data: {
        name: 'wei测试',
        edit_type: '1',
        label: '0'
    },
    operations: {
        submit: {
            type: 'button',
            label: '提交'
        }
    },
    events: {
        submit: '@create @confirm:111'
    },
    actions: {
        async create(arg) {
            await ams.actions.create.call(this, {
                ...arg,
                contentType: 'multipart'
            });
        }
    }
});
