const data = {
    switch: 1
};
const resource = {
    fields: {
        switch: {
            type: 'switch',
            label: 'switch'
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
            data,
            resource,
            ctx: 'view',
        }
    }
};
