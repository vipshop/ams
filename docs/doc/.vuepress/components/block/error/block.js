const blockConfig = {
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
    }
}

export default blockConfig
