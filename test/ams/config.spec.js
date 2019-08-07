import ams from '@/ams';
import mockBlock from '../mock/blockJson.js';

describe('config', () => {

    beforeAll(() => {
        // 初始化blcok
        ams.block('mockBlock', mockBlock)
    })

    it('ams.config', () => {
        const config = {
            resource: {
                responseInterceptor(res) {
                    // 响应拦截，当返回未登录状态码时进行登录跳转
                    if (res.data.code === 2004) {
                        const redirectUrl = res.data.data.redirectUrl
                        if (typeof redirectUrl === 'string') {
                            location.href = redirectUrl
                        }
                        return false
                    }
                    return res
                },
                requestInterceptor(options) {
                    // 请求拦截，添加请求头，未登录返回数据
                    options.headers = {
                        ...options.headers,
                        'X-Requested-With': 'XMLHttpRequest' // 表明是AJax异步，后端用来返回未登录数据
                    }
                    options.params = {
                        ...options.params
                    }
                    return options
                }
            }
        }

        ams.config(config)
        expect(ams.configs.resource.responseInterceptor).toBe(config.resource.responseInterceptor)
        expect(ams.configs.resource.requestInterceptor).toBe(config.resource.requestInterceptor)
    });
});
