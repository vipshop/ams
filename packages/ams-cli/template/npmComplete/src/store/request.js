import { Message } from 'element-ui';
import baseAPI from './api/base';
import ams from '@ams-team/ams';

const request = ams.request;
ams.config({
    contentType: 'json',
    resource: {
        // requestInterceptor(options) {
        //     options.headers = {
        //         ...options.headers,
        //         'xsrf-token': 'token'
        //     }
        //     return options
        // },
        responseInterceptor(response, options) {
            const msg = response.data.msg || '';
            if (response && response.data) {
                switch (response.data.code) {
                    // 特殊的错误处理
                    case 0: {
                        const responseConvert = response;
                        responseConvert.data.msg = msg;
                        return Promise.resolve(responseConvert);
                    }
                    // 其他错误
                    default:
                        // 抛出完整的 response
                        if (options && options.expectRawError) {
                            return Promise.reject({ code: response.data.code, msg, response });
                        }
                        // error时仅抛出 message，如果hideErrorMessage为false则弹出消息框
                        if (!options.hideErrorMessage) {
                            Message.error({ message: msg });
                        }
                        return Promise.reject(msg);
                }
            }
            return response;
        },
        api: {
            withCredentials: true
        }
    }
});
// export default service
export default function plugins(store) {
    store.api = {
        base: baseAPI(request)
    };
}
