import { Message } from 'element-ui';
import ams from '@ams-team/ams';

ams.config({
    resource: {
        responseInterceptor(res) {
            // console.log('responseInterceptor', res)
            if (res.data.code === -33) {
                ams.callAction('@routerPush:/login');
                return false;
            }
            return res;
        },
        // requestInterceptor(options) {
        //     options.headers = {
        //         ...options.headers,
        //         'xsrf-token': 'token'
        //     }
        //     return options
        // },
        errorInterceptor(enhancedErr) {
            const { code, xhr, response, message } = enhancedErr;
            console.log(`Http code: ${code}, Message: ${message}`, 'XHR object: ', xhr, 'Response Content: ', response);
            Message.error(message || '网络错误，请重试');
            // 继续抛出错误
            throw enhancedErr;
        },
        api: {
            withCredentials: false
        }
    }
});