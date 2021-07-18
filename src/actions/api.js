import ams from '../ams';
import { getQueryString, getType, isFn, responseHandler } from '../utils';
import { httpRequestTypeExcludeGet } from '../ams/request';

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
    } else if (
        // #161
        !this.data.hasOwnProperty(key) &&
        ($prevReturn && typeof $prevReturn.hasOwnProperty === 'function' && !$prevReturn.hasOwnProperty(key)) &&
        queryValue
    ) {
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
    // 支持 requestDataParse 为字符串形式，比如 requestDataParse: `query => { query.pageNum = query.page; return query; }`
    if (getType(config.requestDataParse) === 'string') {
        // eslint-disable-next-line no-new-func
        config.requestDataParse = new Function(`return ${config.requestDataParse}`)();
    }
    const sendArg = isFn(config.requestDataParse) ? config.requestDataParse(arg) : arg;
    // https://github.com/axios/axios/blob/fa3673710ea6bb3f351b4790bb17998d2f01f342/lib/core/Axios.js#L40
    options.method = (config.method || method).toUpperCase();
    if (httpRequestTypeExcludeGet.indexOf(options.method) >= 0) {
        options.data = sendArg;
    } else {
        options.params = sendArg;
    }
    return options;
}

export const read = ams.createApiAction({
    getOptions(params) {
        if (!this.resource) {
            console.error('resource参数配置有误，请检查');
            return;
        }
        const key = this.resource.key;
        let value = _getValue.call(this, key, params);
        const { read, prefix } = this.resource.api;
        const method = this.resource.api.method || 'get';
        if (typeof read === 'object') {
            return _getSendData(
                read,
                method,
                prefix,
                {
                    [key]: value,
                    ..._getForeignKeys.call(this, params)
                });
        }
        return {
            url: `${prefix}${read}`,
            method,
            params: {
                [key]: value,
                ..._getForeignKeys.call(this, params)
            }
        };
    },
    success(res) {
        const { message, code, isSuccess, data } = responseHandler.call(this, res, 'read');
        if (isSuccess) {
            const { transform, responseDataParse } = this.resource.api.read || {};
            const handler = transform || responseDataParse || (data => data);
            this.setBlockData(handler(data));
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

        const { update, prefix } = this.resource.api;
        const method = this.resource.api.method || 'post';
        if (typeof update === 'object') {
            return _getSendData(
                update,
                method,
                prefix,
                {
                    [key]: value,
                    ..._getForeignKeys.call(this, params),
                    ...this.data
                });
        }
        return {
            url: `${prefix}${update}`,
            method,
            params: {
                [key]: value,
                // resId: this.block.resource,
                ..._getForeignKeys.call(this, params)
            },
            data: this.data
        };
    },
    success(res) {
        const { isSuccess, message, code, data } = responseHandler.call(this, res, 'update');
        if (isSuccess) {
            this.$message.success('更新成功');
            const onSuccess = this.on['update-success'];
            if (isFn(onSuccess)) onSuccess(data);
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

        const prefix = this.resource.api.prefix;
        const deleteConfig = this.resource.api.delete;
        const method = this.resource.api.method || 'post';
        if (typeof deleteConfig === 'object') {
            return _getSendData(
                deleteConfig,
                method,
                prefix,
                {
                    [key]: value,
                    // resId: this.block.resource,
                    ..._getForeignKeys.call(this, params)
                });
        }
        // 支持传参数
        return {
            url: `${prefix}${deleteConfig}`,
            method,
            params: {
                [key]: value,
                // resId: this.block.resource,
                ..._getForeignKeys.call(this, params)
            }
        };
    },
    success(res) {
        const { isSuccess, message, code, data } = responseHandler.call(this, res, 'delete');
        if (isSuccess) {
            this.$message.success('删除成功');
            const onSuccess = this.on['delete-success'];
            if (isFn(onSuccess)) onSuccess(data);
        } else {
            this.$message.error(`${message}(${code})`);
            throw '@delete:' + code;
        }
        return res;
    }
});

export const create = ams.createApiAction({
    getOptions(params) {
        const { create, prefix } = this.resource.api;
        const method = this.resource.api.method || 'post';
        if (typeof this.resource.api.create === 'object') {
            return _getSendData(
                create,
                method,
                prefix,
                { ..._getForeignKeys.call(this, params), ...this.data }
            );
        }
        return {
            // withCredentials: true,
            url: `${prefix}${create}`,
            method,
            params: {
                // resId: this.block.resource,
                ..._getForeignKeys.call(this, params)
            },
            data: this.data
        };
    },
    success(res) {
        const { isSuccess, message, code, data } = responseHandler.call(this, res, 'create');
        if (isSuccess) {
            this.$message.success('创建成功');
            const onSuccess = this.on['create-success'];
            if (isFn(onSuccess)) onSuccess(data);
        } else {
            this.$message.error(`${message}(${code})`);
            throw '@create code:' + code;
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
        const { list, prefix } = this.resource.api;
        const method = this.resource.api.method || 'get';
        if (typeof list === 'object') {
            return _getSendData(list, method, prefix, arg);
        }
        return {
            url: `${prefix}${list}`,
            method,
            params: arg
        };
    },
    /**
     *
     * @param {*} res { status: statusCode, data: JSON.parse(xhr.responseText) }
     */
    success(res) {
        const { message, code, isSuccess, data, getter } = responseHandler.call(this, res, 'list');
        if (isSuccess) {
            const total = data[getter.totalPath];
            const list = data[getter.listPath];
            this.data.list = list;
            this.data.total = total;

            const { transform, responseDataParse } = this.resource.api.list || {};
            if (isFn(transform)) {
                this.data.list = transform(list);
            } else if (isFn(responseDataParse)) {
                const parsedData = responseDataParse({
                    ...res,
                    msg: message,
                    code,
                    data
                });
                if (getType(parsedData) !== 'object') {
                    console.error('responseDataParse中需要返回object类型，如{ list: [] }');
                    this.data.list = [];
                } else {
                    Object.assign(this.data, parsedData);
                }
            }
            const onSuccess = this.on['list-success'];
            if (isFn(onSuccess)) onSuccess(data);
        } else {
            this.$message.error(`${message}(${code})`);
            throw '@list:' + code;
        }

        return res;
    }
});
