import ams from '../ams';
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
 * { path: 'list', method: 'get', successCode: 0,
        transform(data) {
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
    options.method = config.method || method;
    if (['post', 'POST'].indexOf(config.method) >= 0) {
        options.data = arg;
    } else {
        options.params = arg;
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
        const successCode = this.getConfig('resource.api.read.successCode') || this.getConfig('resource.api.successCode');
        if (res.data.code === successCode) {
            const config = this.resource.api.read;
            if (typeof config === 'object' && typeof config.transform === 'function') {
                this.setBlockData(config.transform(res.data.data));
            } else {
                this.setBlockData(res.data.data);
            }
        } else {
            this.$message.error(`${res.data.msg}(${res.data.code})`);
            throw '@read:' + res.data.code;
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
                    ..._getForeignKeys.call(this, params)
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
        // 默认successCode
        const successCode = this.getConfig('resource.api.update.successCode') || this.getConfig('resource.api.successCode');
        if (res.data.code === successCode) {
            this.$message.success('更新成功');
            if (typeof this.on['update-success'] === 'function') {
                this.on['update-success'](res.data);
            }
        } else {
            this.$message.error(`${res.data.msg}(${res.data.code})`);
            throw '@update:' + res.data.code;
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
        // 默认successCode
        const successCode = this.getConfig('resource.api.delete.successCode') || this.getConfig('resource.api.successCode');
        if (res.data.code === successCode) {
            this.$message.success('删除成功');
            if (typeof this.on['delete-success'] === 'function') {
                this.on['delete-success'](res.data);
            }
        } else {
            this.$message.error(`${res.data.msg}(${res.data.code})`);
            throw '@delete:' + res.data.code;
        }
        return res;
    }
});

export const create = ams.createApiAction({
    getOptions(params) {
        if (typeof this.resource.api.create === 'object') {
            return _getSendData(this.resource.api.create, 'post', this.resource.api.prefix, { ..._getForeignKeys.call(this, params) });
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
        // 默认successCode
        const successCode = this.getConfig('resource.api.create.successCode') || this.getConfig('resource.api.successCode');
        if (res.data.code === successCode) {
            this.$message.success('创建成功');
            if (typeof this.on['create-success'] === 'function') {
                this.on['create-success'](res.data);
            }
        } else {
            this.$message.error(`${res.data.msg}(${res.data.code})`);
            throw '@create code:' + res.data.code;
        }
        return res;
    }
});

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
        // 默认successCode
        const successCode = this.getConfig('resource.api.list.successCode') || this.getConfig('resource.api.successCode');
        if (
            res.data.code === successCode &&
            res.data.data
        ) {
            const listConfig = this.resource.api.list;
            if (typeof listConfig === 'object' && typeof listConfig.transform === 'function') {
                this.data.list = listConfig.transform(res.data.data.list) || [];
            } else {
                this.data.list = res.data.data.list || [];
            }
            this.data.total = res.data.data.total;
            if (typeof this.on['list-success'] === 'function') {
                this.on['list-success'](res.data);
            }
        } else {
            this.$message.error(`${res.data.msg}(${res.data.code})`);
            throw '@list:' + res.data.code;
        }

        return res;
    }
});
