import { parseTime } from '../../utils';

function defaultGetter(val) {
    return val;
}
function isEmptyString(val) {
    return val == null || val === '';
}

export const get = defaultGetter;
export const set = defaultGetter;
export const view = defaultGetter;
export const equals = function(val1, val2, field) {
    // console.log('equals', JSON.stringify(val1), JSON.stringify(val2));

    // 如果field要跳过空值认为相同时，需要主动设置emptyEquel为false，如radio可以为0值
    if (field && field.emptyEquel !== false) {
        // 同时为空值时，认为是相同值，如: '' false 0 undefined null NaN
        if (!val1 && !val2) {
            return true;
        }
    }

    // 先进行直接比较数据
    if (val1 === val2) {
        return true;
    }

    const type1 = typeof val1;
    const type2 = typeof val2;

    if (type1 === type2 && type1 === 'object') {
        // null 可能会混进来，如果进入到这里会一个null一个真object，所以直接返回false
        if (val1 === null || val2 === null) {
            return false;
        }
        const aProps = Object.getOwnPropertyNames(val1);
        const bProps = Object.getOwnPropertyNames(val2);

        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length !== bProps.length) {
            return false;
        }

        for (let i = 0; i < aProps.length; i++) {
            let propName = aProps[i];

            // If values of same property are not equal,
            // objects are not equivalent
            if (!equals(val1[propName], val2[propName])) {
                return false;
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return true;
    }

    if (type1 === 'function' || type2 === 'function') {
        // console.error('ams Err: please do not use function in field set !!');
        return String(val1) === String(val2);
    }

    return false;
};

// 文件
export const getFile = function(url) {
    if (url) {
        return [
            {
                name: url.replace(/^.*\/(?=\w+\.\w+$)/, ''),
                url: url
            }
        ];
    }
    return [];
};

export const setFile = function(arr) {
    return Array.isArray(arr) ? arr.map(item => item.url).join(',') : '';
};
export const viewFile = function(value) {
    return value ? value.replace(/^.*\/(?=\w+\.\w+$)/, '') : '';
};

// 常规的多值类型get、set
// string,string => [string, string]
export const getArray = function(val, field) {
    if (isEmptyString(val)) {
        return [];
    } else {
        const props = field && field.props && field.props.props || {};
        const splitBy = props.multiple && props.splitBy;
        return String(val).split(splitBy || ',');
    }
};

export const setArray = function(arr, field) {
    const props = field && field.props && field.props.props || {};
    const splitBy = props.multiple && props.splitBy;
    return Array.isArray(arr) ? arr.join(splitBy || ',') : '';
};

// 需要getter函数和setter函数的get、set
// string,string => [string, string]
export const getterArray = function(getter) {
    return function(val, field) {
        if (isEmptyString(val)) {
            return [];
        } else {
            return String(val).split(',').map(item => getter(item, field));
        }
    };
};

export const setterArray = function(setter) {
    return function(arr, field) {
        return arr ? arr.map(item => setter(item, field)).join(',') : '';
    };
};

export const viewerArray = function(viewer, spliter = ',') {
    return function(val, field) {
        const spliter = field.props.type === 'dates' ? ', ' : ' 至 ';
        const arr = isEmptyString(val) ? [] : String(val).split(',').map(item => viewer(item, field));
        return arr.join(spliter);
    };
};

// 单选的时候得到的一维数组，多选的时候得到二维数组
export const getterCascader = function(getter) {
    return function(val, field) {
        if (isEmptyString(val)) {
            return [];
        } else if (field && field.props && field.props.props && field.props.props.multiple) {
            return String(val).split(',').map(item => getter(item, field));
        }
        return String(val).split(',');
    };
};

// 单选的时候得到 a,b,c; 多选的时候得到的是 a1/a2/a3,b1/b2/b3
export const setterCascader = function(setter) {
    return function(arr, field) {
        if (field && field.props && field.props.props && field.props.props.multiple) {
            return arr ? arr.map(item => setter(item, field)).join(',') : '';
        }
        return arr ? arr.join(',') : '';
    };
};


// select需要兼容多值和单值的场景
export const getSelect = function (val, field) {
    if (field.props.multiple) {
        return getArray(val);
    } else {
        return val;
    }
};
export const setSelect = function (val, field) {
    if (field.props.multiple) {
        return setArray(val);
    } else {
        return val;
    }
};

// date
export const getDate = function(val, field) {
    // console.log('getDate', val);

    // element内部的date，如果传入是时间戳，会自动转换，不需要处理
    return /^(-)?\d{1,13}$/.test(val) ? Number(val) : val;
};

export const setDate = function(val, field) {
    // console.log('setDate', val);

    // element内部的date，如果传入是时间戳，会自动转换，不需要处理
    if (val instanceof Date) {
        return val.getTime();
    }
    return val;
};
export const viewDate = function(value, field) {
    let format = field.format;

    if (!format) {
        switch (field.props.type) {
            case 'year':
                format = 'yyyy';
                break;
            case 'month':
                format = 'yyyy-MM';
                break;
            case 'datetimerange':
                format = 'yyyy-MM-dd HH:mm:ss';
                break;
            case 'datetime':
                format = 'yyyy-MM-dd HH:mm:ss';
                break;
            case 'timepicker':
            case 'timerange':
                format = 'HH:mm:ss';
                break;
            default:
                format = 'yyyy-MM-dd';
                break;
        }
    }
    return parseTime(value, format);
};

// password
export const viewPassword = function (value) {
    return value ? value.replace(/./g, '*') : '';
};

// units 单位
export const getUnits = function(val, field) {
    let currentUnit = field.defaultUnit;
    const prependSlot = field.props && field.props.slot === 'prepend';
    for (let i = 0; i < field.units.length; i++) {
        const unitsReg = prependSlot ? ('^' + field.units[i]) : (field.units[i] + '$');
        if (new RegExp(unitsReg).test(val)) {
            currentUnit = field.units[i];
            break;
        }
    }
    // console.log('getUnits', val, 'currentUnit', currentUnit);
    // console.log(field);
    const reg = prependSlot ? ('^' + currentUnit) : (currentUnit + '$');

    return {
        unit: currentUnit,
        val: val ? val.replace(new RegExp(reg), '') : ''
    };
};

export const setUnits = function(val, field) {
    // console.log('setUnits', val);
    return field.props && field.props.slot === 'prepend' ? (val.unit + val.val) : (val.val + val.unit);
};
export const viewUnits = function(value, field) {
    return value;
};
