/**
 * 参考资料：https://baidu.gitee.io/amis/zh-CN/docs/concepts/template#javascript-模板引擎
 *
 */
import { register as registerLodash } from './tpl-lodash';

const enginers = {};

export function registerTplEnginer(name, enginer) {
    enginers[name] = enginer;
}

export function filter(tpl, data = {}, ...rest) {
    if (!tpl || typeof tpl !== 'string') {
        return '';
    }

    let names = Object.keys(enginers);
    for (let i = 0, len = names.length; i < len; i++) {
        const name = names[i];
        let enginer = enginers[name];
        if (enginer.test(tpl)) {
            return enginer.compile(tpl, data, ...rest);
        }
    }

    return tpl;
}

[registerLodash].forEach(fn => {
    const info = fn();

    registerTplEnginer(info.name, {
        test: info.test,
        compile: info.compile
    });
});