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
    blocks: {
        edit: {
            type: 'form',
            data,
            resource,
            ctx: 'edit'
        },
        view: {
            type: 'form',
            ctx: 'view',
            data,
            resource,
        }
    }
};
