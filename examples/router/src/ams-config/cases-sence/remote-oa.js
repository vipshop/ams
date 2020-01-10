import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('remote-oa', {
    resources: {
        'select-oa': {
            api: {
                successCode: 0
            },
            fields: {
                oaName: {
                    BASE: 'SELECT_REMOTE',
                    label: 'OA用户',
                    type: 'select',
                    props: {
                        multiple: false,
                        placeholder: '请输入OA信息',
                        clearable: true
                    },
                    rules: {
                        required: true,
                        message: '必填',
                        trigger: 'change'
                    },
                    remoteConfig: {
                        action: `${prefix}searchOA`,
                        queryKey: 'name',
                        labelKey: 'name',
                        valueKey: 'avatar'
                    }
                }
            }
        }
    },
    ctx: 'edit',
    type: 'form',
    resource: 'select-oa',
    data: {
        oaName: '劳志伟'
    },
    operations: {
        submit: {
            type: 'button',
            label: '提交'
        }
    }
});
