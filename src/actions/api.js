import ams from '../ams';
import { getInfoFromResponse } from '../utils/api';
import { getQueryString } from '../utils';

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
function _getSendData(config, method = 'get', prefix, arg) {
    const options = {};
    if (config.path) {
        options.url = `${config.prefix || prefix}${config.path}`;
    }
    const sendArg = typeof config.requestDataParse === 'function' ? config.requestDataParse(arg) : arg;
    options.method = (config.method || method).toLowerCase();
    if (options.method === 'post') {
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
        const { message, code, isSuccess, data } = getInfoFromResponse.call(this, res, 'read');
        if (isSuccess) {
            const config = this.resource.api.read;
            let blockData = data;
            if (typeof config === 'object') {
                const { transform, responseDataParse } = config;
                blockData = isFn(transform) ? transform(res.data.data) : (isFn(responseDataParse) ? responseDataParse(res.data) : data);
            }
            this.setBlockData(blockData);
        } else {
            this.$message.error(`${message}(${code})`);
            throw '@read:' + code;
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
        const { message, code, isSuccess } = getInfoFromResponse.call(this, res, 'update');
        if (isSuccess) {
            this.$message.success('更新成功');
            if (typeof this.on['update-success'] === 'function') {
                this.on['update-success'](res.data);
            }
        } else {
            this.$message.error(`${message}(${code})`);
            throw '@update:' + code;
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
        const { message, code, isSuccess } = getInfoFromResponse.call(this, res, 'delete');
        if (isSuccess) {
            this.$message.success('删除成功');
            if (typeof this.on['delete-success'] === 'function') {
                this.on['delete-success'](res.data);
            }
        } else {
            this.$message.error(`${message}(${code})`);
            throw '@delete:' + code;
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
        const { message, code, isSuccess } = getInfoFromResponse.call(this, res, 'create');
        if (isSuccess) {
            this.$message.success('创建成功');
            if (typeof this.on['create-success'] === 'function') {
                this.on['create-success'](res.data);
            }
        } else {
            this.$message.error(`${message}(${code})`);
            throw '@create code:' + code;
        }
        return res;
    }
});

function isFn(value) {
    return typeof value === 'function';
}

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
        let arg = {
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
        const requestAdaptor = this.resource.api.list.requestAdaptor || (data => data);
        arg = requestAdaptor(arg);
        if (typeof this.resource.api.list === 'object') {
            return _getSendData(this.resource.api.list, 'get', this.resource.api.prefix, arg);
        }
        return {
            url: `${this.resource.api.prefix}${this.resource.api.list}`,
            method: this.resource.api.method || 'get',
            params: arg
        };
    },
    /**
     *
     * @param {*} res { status: statusCode, data: JSON.parse(xhr.responseText) }
     */
    success(res) {
        // whenSuccess = res => res[codeKey] === expectedCode
        const { message, code, isSuccess, total, data } = getInfoFromResponse.call(this, res, 'list');
        if (isSuccess && res.data.data) {
            const config = this.resource.api.list;
            if (typeof config === 'object') {
                const { transform, responseDataParse } = config;
                if (isFn(transform)) {
                    this.data.list = transform(config, data);
                } else if (isFn(responseDataParse)) {
                    this.data = responseDataParse(res.data);
                } else {
                    this.data.list = data;
                }
            }
            this.data.total = total;
            if (typeof this.on['list-success'] === 'function') {
                this.on['list-success'](res.data);
            }
        } else {
            this.$message.error(`${message}(${code})`);
            throw '@list:' + code;
        }

        return res;
    }
});
