export const config = {
    BASE: 'CONFIG_FIELD',
    type: {
        default: 'date'
    },
    default: {
        type: 'inputnumber',
        default: 1556035200000
    },
    props: {
        current: 'value'
    }
};

export const defaults = {
    year: {
        label: '年',
        type: 'date',
        ctx: 'edit',
        default: 1556035200000,
        props: {
            type: 'year'
        }
    },
    month: {
        label: '月',
        type: 'date',
        ctx: 'edit',
        default: 1556035200000,
        props: {
            type: 'month'
        }
    },
    week: {
        label: '日',
        type: 'date',
        ctx: 'edit',
        default: 1556035200000,
        props: {
            type: 'week'
        }
    },
};
