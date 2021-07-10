/**
 * 采用lodash.template 实现模板编译
 *
 */
import template from 'lodash/template';
import dayjs from 'dayjs';
import { formatDate } from './date';

export const filters = {
    formatDate
};

export function getFilters() {
    return filters;
}

const imports = {
    dayjs: dayjs,
};

// 缓存一下提升性能
const EVAL_CACHE = {};

function lodashCompile(str, data) {
    try {
        const filters = getFilters();
        const finnalImports = {
            ...filters,
            ...imports
        };
        const fn =
            EVAL_CACHE[str] ||
            (EVAL_CACHE[str] = template(str, {
                imports: finnalImports,
                variable: 'data'
            }));

        return fn.call(data, data);
    } catch (e) {
        return `<span class="text-danger">${e.message}</span>`;
    }
}

export function register() {
    return {
        name: 'lodash',
        test: (str) => Boolean(str.indexOf('<%') > -1),
        compile: (str, data) => lodashCompile(str, data)
    };
}
