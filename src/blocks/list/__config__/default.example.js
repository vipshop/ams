const data = {
    text: 'texttext'
};
const resource = {
    fields: {
        text: {
            type: 'text',
            label: 'text'
        }
    }
};
export default {
    type: 'list',
    data,
    resource,
    ctx: 'edit',
    operations: {
        update: {
            type: 'button',
            label: '提交',
            props: {
                type: 'primary'
            }
        }
    }
};
