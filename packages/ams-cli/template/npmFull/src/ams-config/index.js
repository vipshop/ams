import ams from '@ams-team/ams';

import './resources/resource';

import './form/index';
import './form/list';

import './404';
import './router';

// chart-demo
import './cases-chart/demo1';

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
        api: {
            withCredentials: false
        }
    }
});
