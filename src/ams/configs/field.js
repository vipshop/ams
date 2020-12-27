import {
    get,
    set,
    view,
    equals,

    getFile,
    setFile,
    viewFile,

    getDate,
    setDate,

    getArray,
    setArray,

    getSelect,
    setSelect,

    getUnits,
    setUnits,
    viewUnits,

    getterCascader,
    setterCascader,

    getterArray,
    setterArray,
    viewerArray,

    viewDate,
    viewPassword
} from './field-get-set';

export const defaultFieldConfig = {
    /**
     * field.props 默认props
     * field.default 默认值
     * field.get value => localValue
     * field.set localValue => value
     * field.view value => viewValue
     * field.equals 比较函数
     */
    audio: {
        props: {
            action: ''
        },
        get: getFile,
        set: setFile,
        view,
        equals
    },

    cascader: {
        props: {
            filterable: true,
            clearable: true,
            props: {
                expandTrigger: 'hover',
                splitBy: '/',
                // checkStrictly: true
            }
        },
        get: getterCascader(getArray),
        set: setterCascader(setArray),
        view,
        equals
    },

    checkbox: {
        get: getArray,
        set: setArray,
        view,
        equals
    },

    date: {
        props: {
            type: 'date',
            placeholder: '选择日期'
        },
        get: getDate,
        set: setDate,
        view: viewDate,
        equals
    },
    datetime: {
        props: {
            type: 'datetime',
            placeholder: '选择日期时间'
        },
        get: getDate,
        set: setDate,
        view: viewDate,
        equals
    },
    datetimerange: {
        props: {
            type: 'datetimerange',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期'
        },
        get: getterArray(getDate),
        set: setterArray(setDate),
        view: viewerArray(viewDate),
        equals
    },
    file: {
        props: {
            action: ''
        },
        get: getFile,
        set: setFile,
        view: viewFile,
        equals
    },
    image: {
        props: {
            accept: 'image/*',
            action: '',
            fit: 'cover',
            'show-file-list': false
        },
        get,
        set,
        view,
        equals
    },
    inputnumber: {
        get,
        set,
        view,
        equals,
        emptyEquel: false
    },
    password: {
        props: {
            clearable: true,
            type: 'password'
        },
        get,
        set,
        view: viewPassword,
        equals
    },
    progress: {
        props: {
            'text-inside': true,
            'stroke-width': 18,
            'show-input': true,
            // 'show-input-controls': false,
            'input-size': 'mini'
        },
        get,
        set,
        view,
        equals
    },
    radio: {
        get,
        set,
        view,
        equals,
        emptyEquel: false
    },
    rate: {
        props: {
            'text-color': '#ff9900',
            'show-score': true
        },
        get,
        set,
        view,
        equals
    },
    select: {
        props: {
            multiple: true
        },
        get: getSelect,
        set: setSelect,
        view,
        equals,
        emptyEquel: false
    },
    slider: {
        get,
        set,
        view,
        equals
    },
    switch: {
        props: {
            'active-value': 1,
            'inactive-value': 0
        },
        get,
        set,
        view,
        equals
    },
    text: {
        props: {
            clearable: true
        },
        default: '',
        get,
        set,
        view,
        equals
    },
    textarea: {
        props: {
            clearable: true,
            type: 'textarea'
        },
        default: '',
        get,
        set,
        view,
        equals
    },
    time: {
        props: {
            placeholder: '选择时间'
        },
        get,
        set,
        view,
        equals
    },
    timepicker: {
        props: {
            placeholder: '选择时间',
            type: 'timepicker'
        },
        get: getDate,
        set: setDate,
        view: viewDate,
        equals
    },
    timerange: {
        props: {
            type: 'timerange',
            'is-range': true,
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间'
        },
        get: getterArray(getDate),
        set: setterArray(setDate),
        view: viewerArray(viewDate),
        equals
    },
    transfer: {
        props: {
            filterable: true,
            props: { key: 'value' }
        },
        get: getArray,
        set: setArray,
        view,
        equals
    },
    unitselect: {
        get: getUnits,
        set: setUnits,
        view: viewUnits,
        equals
    },
    video: {
        props: {
            action: ''
        },
        get: getFile,
        set: setFile,
        view,
        equals
    },
    tree: {
        props: {
            'default-expand-all': true,
            'node-key': 'value'
        },
        get: getArray,
        set: setArray,
        view,
        equals
    },
    default: {
        get,
        set,
        view,
        equals
    }
};

export const defaultListFieldWidth = {
    rate: '170px',
    unitselect: '170px',
    select: '140px',
    datetimerange: '340px',
    cascader: '250px',
    image: '120px',
    file: '160px',
    progress: '150px',
    video: '200px',
    audio: '160px'
};
