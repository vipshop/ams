export const defaultBlockProps = {
    form: {
        ref: 'amsForm',
        'label-width': '100px'
    },
    list: {
        ref: 'amsForm'
    },
    imagelist: {
        shadow: 'hover',
        subtitle: 'hover'
    },
    dialog: {
        top: '5vh',
        width: '80%'
    },
    popover: {
        placement: 'bottom-start',
        width: '200',
        trigger: 'hover'
    }
};

export const baseBlockType = {
    list: 'list',
    table: 'list',
    imagelist: 'list'
};

export const baseFieldType = {
    array: 'array',
    object: 'object',
    union: 'union',
};
