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
        subtitle: 'hover',
        'empty-text': '暂无数据'
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

export const defaultBlockDatas = {
    router: {
        title: '系统标题'
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
