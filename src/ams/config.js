import * as configs from './configs';
import { getType, deepExtend } from '../utils';

export default function initConfig(ams) {
    // 配置列表
    ams.configs = {
        ...configs
    };

    /**
     * 方法
     */
    // 修改配置
    ams.config = function(config) {
        deepExtend(ams.configs, config);
    };

    function getBase(BASE) {
        if (typeof BASE === 'string') {
            BASE = ams.configs[BASE];
        }
        if (BASE) {
            // 深clone
            return deepCloneConfig(BASE);
        }
        return {};
    }

    // 合并配置，通过 { BASE: ams.configs.LIST } 或者 { BASE: 'LIST' } 简化常用配置
    function deepCloneConfig(target, base) {
        const type = getType(target);
        if (type === 'object') {
            let clone;
            // 内部也会递归 deepCloneConfig，保证currentBase已经不包含未处理的base值
            const currentBase = getBase(target.BASE);
            // 已有基础值
            if (getType(base) === 'object') {
                clone = base;
                Object.keys(currentBase).forEach(key => {
                    if (/\./.test(key)) {
                        console.warn(`ams Err: please do not use . in object key: ${key}, it may cause some error`);
                    }
                    const value = currentBase[key];
                    clone[key] =
                        typeof value === 'object'
                            ? deepCloneConfig(value)
                            : value;
                });
            } else {
                // 获取base值或者空{}
                clone = currentBase;
            }
            Object.keys(target).forEach(key => {
                if (key !== 'BASE') {
                    if (/\./.test(key)) {
                        console.warn(`ams Err: please do not use . in object key: ${key}, it may cause some error`);
                    }
                    const value = target[key];
                    // array 和 object 需要递归深克隆
                    clone[key] =
                        typeof value === 'object'
                            ? deepCloneConfig(value, clone[key])
                            : value;
                }
            });
            return clone;
        } else if (type === 'array') {
            const clone = [];
            for (let i = 0; i < target.length; i++) {
                const value = target[i];
                clone.push(
                    // object and array is 'object'
                    typeof target[i] === 'object'
                        ? deepCloneConfig(value)
                        : value
                );
            }
            return clone;
        }
        return target;
    }

    ams.deepCloneConfig = deepCloneConfig;

    // var a = ams.deepCloneConfig({
    //     BASE: { a: 2, f: [1,2], test(){}, ee: 3, dd: { f: 2 } },
    //     a: 1,
    //     b: { c: 2 },
    //     haha(){},
    //     reg: /1/,
    //     c: { BASE: { d: { e: 1 } } },
    //     d: { BASE: { f: 2 } },
    //     e: [1, 2, 3, { BASE: { test: 2 } }]
    // });
    // console.log(a);
}
