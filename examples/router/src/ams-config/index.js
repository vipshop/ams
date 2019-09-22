import ams from '@ams-team/ams';

import './resources/resource';
import './resources/login';
import './resources/table';

import './form/index';
import './form/form-edit';
import './form/form-view';
import './form/list';
import './form/list-operations';
import './form/list-layout';
import './form/list-edit';
import './form/list-pagination';
import './form/table';
import './login';

import './404';
import './router';
// sence
import './cases-sence/remote-oa';
import './cases-sence/remote-select';
import './cases-sence/array-object';
import './cases-sence/admin';
import './cases-sence/runtime-add-block';
import './cases-sence/get-set-view';
import './cases-sence/login-auth';
import './cases-sence/add-item-action';
import './cases-sence/outside-website';
// field
import './cases-field/input';
import './cases-field/date';
import './cases-field/editor';
import './cases-field/union';
import './cases-field/unitselect';
import './cases-field/originfile';
import './cases-field/image';
import './cases-field/arraylist';
import './cases-field/tree';
import './cases-field/link';
import './cases-field/plan-date';
import './cases-field/cascader';
// block
import './cases-block/calendar';
import './cases-block/dragimage';
import './cases-block/collapse';
import './cases-block/steps';
import './cases-block/card';
import './cases-block/dropdown';
import './cases-block/xlsx';
import './cases-block/grid';
import './cases-block/carousel';
import './cases-block/backtop';
import './cases-block/tabs';
import './cases-block/component';
import './cases-block/popover';
import './cases-block/bct-progress';
import './cases-block/imagelist';
import './cases-block/imagelist2';

// chart-demo
import './cases-chart/demo1';
import './cases-chart/demo2';

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
