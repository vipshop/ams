import ams from '@ams-team/ams';

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
                        action: 'https://easy-mock.com/mock/5c76c559086fe75d555c7744/templates/demo/searchOA',
                        queryKey: 'name',
                        labelKey: 'name',
                        valueKey: 'avatar'
                    }
                }
            }
        }
    },
    data: {
        'oaName': '劳志伟'
    },
    type: 'form',
    resource: 'select-oa',
    ctx: 'edit',
    operations: {
        submit: {
            type: 'button',
            label: '提交'
        }
    }
});
