import { serialize, deepExtend } from '../utils';
export const httpRequestTypeExcludeGet = ['POST', 'PUT', 'DELETE', 'PATCH'];

export default function initRequest(ams) {
    let escape = encodeURIComponent;

    ams.param = function(obj) {
        let params = [];
        params.add = function(key, value) {
            if (value == null) value = '';
            this.push(escape(key) + '=' + escape(value));
        };
        serialize(params, obj);
        return params.join('&').replace(/%20/g, '+');
    };

    /**
     * 使用FormData对象
     * https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects
     * */
    ams.formData = function(obj) {
        let formData = new FormData();

        Object.keys(obj).forEach(key => {
            let val = obj[key];
            val = val == null ? '' : val;
            if (typeof val === 'object') {
                if (val instanceof window.File || val instanceof window.Blob) {
                    formData.append(key, val);
                } else {
                    formData.append(key, JSON.stringify(val));
                }
            } else {
                formData.append(key, val);
            }
        });
        return formData;
    };
    /**
    ams.request({
        method: 'post',
        url: '/user/12345',
        data: {
            firstName: 'Fred',
            lastName: 'Flintstone'
        },
        params, {a: 1},
        withCredentials: true,
        contentType: true,
        responseType: '',
        headers: {'X-Custom-Header': 'foobar'}
    });
    */
    ams.request = function(options) {
        return new Promise((resolve, reject) => {
            // 全局请求参数拦截器
            if (ams.configs.resource.requestInterceptor) {
                options = ams.configs.resource.requestInterceptor(options);
            }
            const api = ams.configs.resource.api;
            let {
                method,
                url,
                data,
                params,
                headers = {},
                withCredentials = api.withCredentials,
                contentType = api.contentType,
                responseType = api.responseType,
            } = options;

            const xhr = new XMLHttpRequest();
            let sendData = null;
            method = (method || 'GET').toUpperCase();

            if (params) {
                url +=
                    (/\?/.test(url) ? '&' : '?') +
                    Object.keys(params)
                        .map(key => `${key}=${escape(params[key])}`)
                        .join('&');
            }

            xhr.open(method, url, true);

            // 处理sendData
            // 可用contentType： json|form|multipart
            if (httpRequestTypeExcludeGet.indexOf(method) >= 0) {
                if (contentType === 'json') {
                    headers['Content-Type'] =
                        headers['Content-Type'] ||
                        'application/json;charset=UTF-8';
                    sendData = data ? JSON.stringify(data) : null;
                } else if (contentType === 'multipart') {
                    // 该模式下不要修改Content-Type
                    sendData = data ? ams.formData(data) : null;
                } else {
                    headers['Content-Type'] =
                        headers['Content-Type'] ||
                        'application/x-www-form-urlencoded;charset=UTF-8';
                    sendData = data ? ams.param(data) : null;
                }
            }

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            const { errorInterceptor } = ams.configs.resource || (err => {
                throw err;
            });

            function handleError(err, response) {
                // 没服务器返回的错误状态码会置为0
                err.code = xhr.status || 0;
                err.response = response;
                err.options = options;

                try {
                    const response = errorInterceptor(err);
                    if (response) {
                        resolve(response);
                    } else {
                        reject(new Error('cancel by error interceptor'));
                    }
                } catch (e) {
                    reject(e);
                }
            }

            xhr.onreadystatechange = function() {
                // console.log('onreadystatechange', xhr.readyState, xhr.status);
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        // options.success(xhr.responseText);
                        let response = {
                            status: xhr.status,
                            data: {}
                        };
                        try {
                            response.data = JSON.parse(xhr.responseText);
                        } catch (e) {}

                        // 全局请求结果拦截器
                        if (ams.configs.resource.responseInterceptor) {
                            response = ams.configs.resource.responseInterceptor(
                                response,
                                options
                            );
                        }

                        // 全局错误code处理
                        const codes = ams.configs.resource.codes;
                        const code = response && response.data && response.data.code;
                        if (codes && codes[code]) {
                            response = codes[code](
                                response,
                                options
                            );
                        }

                        if (response) {
                            resolve(response);
                        } else {
                            reject(new Error('cancel by response interceptor'));
                        }

                    } else {
                        const response = {
                            status: xhr.status,
                            content: xhr.responseText,
                            // 默认不放data，本来默认是个对象就是不对，但旧API不能改，只能另写一段
                        };
                        try {
                            response.data = JSON.parse(xhr.responseText);
                        } catch (e) {}

                        // 仅当status不为0时才走这里的错误逻辑，否则会和onerror走2次逻辑
                        if (xhr.status !== 0) {
                            handleError(new Error(`${xhr.status}`), response);
                        }
                    }
                }
            };
            xhr.onerror = function() {
                handleError(new Error('network error'));
            };

            // withCredentials默认为true
            xhr.withCredentials = withCredentials;

            xhr.responseType = responseType;

            xhr.send(sendData);
        });
    };

    /**
     * options.getOptions
     * options.beforeRequest
     * options.success
     */
    ams.createApiAction = function(options) {
        /**
         * params.url
         * params.method
         * params.params
         * params.headers
         * params.data
         * params.withCredentials
         * params.contentType
         *
         * params.getOptions
         * params.beforeRequest
         * params.success
         */
        return async function(params = {}) {
            this.showLoading();

            try {
                let requestOptions = {
                    contentType: this.getConfig('resource.api.contentType'),
                    withCredentials: this.getConfig(
                        'resource.api.withCredentials'
                    ),
                    ...(params.getOptions || options.getOptions).call(
                        this,
                        params
                    )
                };

                const resetOptions = {};

                if (params.url) {
                    resetOptions.url = params.url;
                }
                if (params.method) {
                    resetOptions.method = params.method;
                }
                if (params.params) {
                    resetOptions.params = params.params;
                }
                if (params.data) {
                    resetOptions.data = params.data;
                }
                if (params.headers) {
                    resetOptions.headers = params.headers;
                }
                if (params.contentType) {
                    resetOptions.contentType = params.contentType;
                }
                if (typeof params.withCredentials !== 'undefined') {
                    resetOptions.withCredentials = params.withCredentials;
                }


                // 单次请求可以覆盖url、method、params、data
                deepExtend(requestOptions, resetOptions);

                const beforeRequest =
                    params.beforeRequest || options.beforeRequest;

                if (beforeRequest) {
                    requestOptions = beforeRequest.call(
                        this,
                        requestOptions,
                        params
                    );
                }
                const res = await ams.request(requestOptions);

                this.hideLoading();

                return (params.success || options.success).call(
                    this,
                    res,
                    requestOptions
                );

            } catch (e) {
                // 处理完继续抛出错误使 action 中断
                this.hideLoading();
                throw e;
            }
        };
    };
}
