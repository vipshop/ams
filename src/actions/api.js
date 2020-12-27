import { get as lodashGet } from 'lodash';
import ams from '../ams';
import { getQueryString } from '../utils';

/**
 * 获取 API Response 相关字段
 *
 * @param {Object} response : api response data
 * @param {String} action : read/update/list/delete
 */
function getInfoFromApi (response, action) {
    const getConfigKey = (action, key) => this.getConfig(`resource.api.${action}.${key}`) || this.getConfig(`resource.api.${key}`)

    // this.getConfig -> src/ams/mixins/block-mixin.js
    const dataKey = getConfigKey(action, 'dataKey') || 'data.list';
    // 用于 list 接口，通常提供给list、table 的分页组件使用
    const totalKey = getConfigKey(action, 'totalKey') || 'data.total';

    const messageKey = getConfigKey(action, 'message') || 'message';
    const message = lodashGet(response.data, messageKey);

    // deprecated
    const successCode =  getConfigKey(action, 'successCode');

    const codeKey = getConfigKey(action, 'code') || 'code';
    const expectedCodeValue = getConfigKey(action, 'successCode');
    const apiCodeValue = lodashGet(response.data, codeKey);

    return {
        dataKey,
        totalKey,
        codeKey,
        successCode,
        messageKey,
        message,
        apiCodeValue,
        expectedCodeValue,
    }
}

/**
 * 自动获取的key值有几种场景：
 * 1、通过 this.data[key] 获取
 * 2、通过 链式action调用 传入，通过 (1)$prevReturn[key] 获取 (2) $prevReturn为数组时是批量操作，通过{ [key]: any }[]获取
 * 3、通过 queryString 传入，通过解析 key=value 获取
 * 4、通过 @read:1 传入，通过 $arg 获取
 */
function _getValue(key, { $arg, $prevReturn }) {
    let value = '';
    let queryValue = getQueryString(key);
    if (this.data[key]) {
        value = this.data[key];
        console.log('this.data[key]', value);
    } else if ($prevReturn && $prevReturn[key]) {
        value = $prevReturn[key];
        console.log('$prevReturn', value);
    } else if ($prevReturn && Array.isArray($prevReturn) && $prevReturn.length) {
        value = $prevReturn.map(arg => arg[key]).filter(arg => arg).join(',');
        console.log('$prevReturn', value);
    } else if (queryValue) {
        value = queryValue;
        console.log('getQueryString', value);
    } else if ($arg) {
        value = $arg;
        console.log('$arg', value);
    }
    return value;
}
function _getForeignKeys(params) {
    const args = {};
    const keys = this.resource && this.resource.foreignKeys;
    if (keys) {
        keys.forEach(key => {
            args[key] = _getValue.call(this, key, params);
        });
    }
    return args;
}
/**
 * @param {*} config action的配置，如
 * {    path: 'list',
        method: 'get',
        successCode: 0,
        transform(data) {
            return data;
        },
        requestDataParse(data) {
            return data;
        },
        responseDataParse(data) {
            return data;
        }
    }
 * @param {*} method GET/POST
 * @param {*} prefix 域名前缀
 * @param {*} arg 参数
 */
function _getSendData(config, method, prefix, arg) {
    const options = {};
    if (config.path) {
        options.url = `${config.prefix || prefix}${config.path}`;
    }
    const sendArg = typeof config.requestDataParse === 'function' ? config.requestDataParse(arg) : arg;
    options.method = config.method || method;
    if (['post', 'POST'].indexOf(options.method) >= 0) {
        options.data = sendArg;
    } else {
        options.params = sendArg;
    }
    return options;
}

export const read = ams.createApiAction({
    getOptions(params) {
        const key = this.resource.key;
        let value = _getValue.call(this, key, params);
        if (typeof this.resource.api.read === 'object') {
            return _getSendData(
                this.resource.api.read,
                'get',
                this.resource.api.prefix,
                {
                    [key]: value,
                    ..._getForeignKeys.call(this, params)
                });
        }
        return {
            url: `${this.resource.api.prefix}${this.resource.api.read}`,
            method: this.resource.api.method || 'get',
            params: {
                [key]: value,
                // resId: this.block.resource,
                ..._getForeignKeys.call(this, params)
            }
        };
    },
    success(res) {
        const { message, apiCodeValue, expectedCodeValue, dataKey, totalKey } = getInfoFromApi.call(this, res,  'read')
        if (apiCodeValue === expectedCodeValue) {
            const config = this.resource.api.read;
            if (typeof config === 'object' && typeof config.transform === 'function') {
                this.setBlockData(config.transform(res.data.data));
            } else if (typeof config === 'object' && typeof config.responseDataParse === 'function') {
                this.setBlockData(config.responseDataParse(res.data));
            } else {
                this.setBlockData(res.data.data);
            }
        } else {
            this.$message.error(`${message}(${apiCodeValue})`);
            throw '@read:' + apiCodeValue;
        }
        return res;
    }
});

export const update = ams.createApiAction({
    getOptions(params) {
        const key = this.resource.key;
        let value = _getValue.call(this, key, params);
        if (typeof this.resource.api.update === 'object') {
            return _getSendData(
                this.resource.api.update,
                'post',
                this.resource.api.prefix,
                {
                    [key]: value,
                    ..._getForeignKeys.call(this, params),
                    ...this.data
                });
        }
        return {
            url: `${this.resource.api.prefix}${this.resource.api.update}`,
            method: this.resource.api.method || 'post',
            params: {
                [key]: value,
                // resId: this.block.resource,
                ..._getForeignKeys.call(this, params)
            },
            data: this.data
        };
    },
    success(res) {
        const { message, apiCodeValue, expectedCodeValue, dataKey, totalKey } = getInfoFromApi.call(this, res,  'update')
        if (apiCodeValue === expectedCodeValue) {
            this.$message.success('更新成功');
            if (typeof this.on['update-success'] === 'function') {
                this.on['update-success'](res.data);
            }
        } else {
            this.$message.error(`${message}(${apiCodeValue})`);
            throw '@update:' + apiCodeValue;
        }
        return res;
    }
});

export const deleteAction = ams.createApiAction({
    getOptions(params) {
        const key = this.resource.key;
        let value = _getValue.call(this, key, params);

        if (typeof this.resource.api.delete === 'object') {
            return _getSendData(
                this.resource.api.delete,
                'post',
                this.resource.api.prefix,
                {
                    [key]: value,
                    // resId: this.block.resource,
                    ..._getForeignKeys.call(this, params)
                });
        }
        // 支持传参数
        return {
            url: `${this.resource.api.prefix}${this.resource.api.delete}`,
            method: this.resource.api.method || 'post',
            params: {
                [key]: value,
                // resId: this.block.resource,
                ..._getForeignKeys.call(this, params)
            }
        };
    },
    success(res) {
        const { message, apiCodeValue, expectedCodeValue, dataKey, totalKey } = getInfoFromApi.call(this, res, 'delete')
        if (apiCodeValue === expectedCodeValue) {
            this.$message.success('删除成功');
            if (typeof this.on['delete-success'] === 'function') {
                this.on['delete-success'](res.data);
            }
        } else {
            this.$message.error(`${message}(${apiCodeValue})`);
            throw '@delete:' + apiCodeValue;
        }
        return res;
    }
});

export const create = ams.createApiAction({
    getOptions(params) {
        if (typeof this.resource.api.create === 'object') {
            return _getSendData(
                this.resource.api.create,
                'post',
                this.resource.api.prefix,
                { ..._getForeignKeys.call(this, params), ...this.data }
            );
        }
        return {
            // withCredentials: true,
            url: `${this.resource.api.prefix}${this.resource.api.create}`,
            method: this.resource.api.method || 'post',
            params: {
                // resId: this.block.resource,
                ..._getForeignKeys.call(this, params)
            },
            data: this.data
        };
    },
    success(res) {
        const { message, apiCodeValue, expectedCodeValue, dataKey, totalKey } = getInfoFromApi.call(this, res,  'create')
        if (apiCodeValue === expectedCodeValue) {
            this.$message.success('创建成功');
            if (typeof this.on['create-success'] === 'function') {
                this.on['create-success'](res.data);
            }
        } else {
            this.$message.error(`${message}(${apiCodeValue})`);
            throw '@create code:' + apiCodeValue;
        }
        return res;
    }
});

// https://github.com/vipshop/ams/blob/5c8e0112c3b8e42c4bed9ff658767bbdbcf9bbd4/src/ams/request.js#L162
// createApiAction -> src/ams/request.js
export const list = ams.createApiAction({
    getOptions(params) {
        // 使用传入页数，如搜索使用 @list:1 将页数重置为1
        if (params.$arg) {
            let page = Number(params.$arg);
            if (!isNaN(page)) {
                this.data.page = page;
            }
        }
        const arg = {
            // resId: this.block.resource,
            page: this.data.page,
            pageSize: this.data.pageSize,
            ..._getForeignKeys.call(this, params)
        };

        // 排序
        if (this.sortField) {
            arg.sortField = this.sortField;
            if (this.sortOrder === 'ascending') {
                arg.sortOrder = 'asc';
            } else if (this.sortOrder === 'descending') {
                arg.sortOrder = 'desc';
            }
        }
        // 过滤
        Object.keys(this.filters).forEach(name => {
            arg[name] = this.filters[name];
        });
        // 搜索
        if (this.data.searchs) {
            Object.keys(this.data.searchs).forEach(name => {
                const search = this.data.searchs[name];
                if (search || search === 0) {
                    arg[name] = search;
                }
            });
        }
        // slot:rightTop
        if (this.data.rightTop) {
            Object.keys(this.data.rightTop).forEach(name => {
                const value = this.data.rightTop[name];
                if (value || value === 0) {
                    arg[name] = value;
                }
            });
        }
        // slot:leftBottom
        if (this.data.leftBottom) {
            Object.keys(this.data.leftBottom).forEach(name => {
                const value = this.data.leftBottom[name];
                if (value || value === 0) {
                    arg[name] = value;
                }
            });
        }
        // slot:rightBottom
        if (this.data.rightBottom) {
            Object.keys(this.data.rightBottom).forEach(name => {
                const value = this.data.rightBottom[name];
                if (value || value === 0) {
                    arg[name] = value;
                }
            });
        }
        if (typeof this.resource.api.list === 'object') {
            return _getSendData(this.resource.api.list, 'get', this.resource.api.prefix, arg);
        }
        return {
            url: `${this.resource.api.prefix}${this.resource.api.list}`,
            method: this.resource.api.method || 'get',
            params: arg
        };
    },
    success(res) {
        // whenSuccess = res => res[codeKey] === expectedCodeValue
        const { message, apiCodeValue, expectedCodeValue, dataKey, totalKey } = getInfoFromApi.call(this, res,   'list')
        if (
            apiCodeValue === expectedCodeValue &&
            res.data.data
        ) {
            const finalData = lodashGet(res.data, dataKey);
            const total = lodashGet(res.data, totalKey);
            const listConfig = this.resource.api.list;
            if (typeof listConfig === 'object' && typeof listConfig.transform === 'function') {
                this.data.list = listConfig.transform(finalData) || [];
            } else {
                this.data.list = finalData || [];
            }
            this.data.total = total;
            if (typeof this.on['list-success'] === 'function') {
                this.on['list-success'](res.data);
            }
        } else {
            this.$message.error(`${message}(${apiCodeValue})`);
            throw '@list:' + apiCodeValue;
        }

        return res;
    }
});
