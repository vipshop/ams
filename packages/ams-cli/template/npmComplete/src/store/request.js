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
            if (response && response.data) {
                // 特殊的错误处理...
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
