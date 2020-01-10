import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('form-view', {
    ctx: 'view',
    type: 'form',
    resource: 'resource',
    operations: {
        submit: {
            type: 'button',
            label: '提交',
            props: {
                type: 'primary'
            }
        },
        loginAction: {
            type: 'button',
            label: '需要登录的接口'
        }
    },
    // data: {
    //     testCheckbox: 0
    // },
    events: {
        init: '@read'
    },
    fields: {
        testText: {
            default: 'sss'
        }
    },
    actions: {
        loginAction() {
            this.$ams.request({
                url: `${prefix}some-login-action`
            });
        }
    }
});
