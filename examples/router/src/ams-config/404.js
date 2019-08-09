import ams from '@ams-team/ams';

ams.block('404', {
    type: 'error',
    data: {
        title: '404',
        subtitle: 'Page not found'
    },
    operations: {
        goIndex: {
            type: 'button',
            label: '返回首页',
            props: {
                type: 'danger',
                size: 'medium',
                round: true
            }
        }
    },
    events: {
        goIndex: '@routerReplace:/'
    }
});
