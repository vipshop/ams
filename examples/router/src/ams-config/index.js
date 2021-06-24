import { Message } from 'element-ui';
import ams from '@ams-team/ams';

import './resources/resource';
import './resources/login';
import './resources/table';

import './form/index';
import './login';

import './404';
import './router';
// sence
import './cases-sence/remote-oa';
import './cases-sence/array-object';
import './cases-sence/admin';
import './cases-sence/runtime-add-block';
import './cases-sence/get-set-view';
import './cases-sence/login-auth';
import './cases-sence/add-item-action';
import './cases-sence/outside-website';
// chart-demo
import './cases-sence/cases-chart/demo1';
import './cases-sence/cases-chart/demo2';

// field
import './cases-field/input';
import './cases-field/radio';
import './cases-field/checkbox';
import './cases-field/date';
import './cases-field/editor';
import './cases-field/union';
import './cases-field/unitselect';
import './cases-field/originfile';
import './cases-field/image';
import './cases-field/video';
import './cases-field/arraylist';
import './cases-field/tree';
import './cases-field/link';
import './cases-field/plan-date';
import './cases-field/cascader';
import './cases-field/select';

// block
import './cases-block/list/list';
import './cases-block/list/list-operations';
import './cases-block/list/list-layout';
import './cases-block/list/list-edit';
import './cases-block/list/list-pagination';
import './cases-block/list/list-drag';
import './cases-block/list/list-field-convert';
import './cases-block/list/list-simulate';
import './cases-block/alert';
import './cases-block/calendar';
import './cases-block/dragimage';
import './cases-block/dragimage-updown';
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
import './cases-block/popconfirm';
import './cases-block/bct-progress';
import './cases-block/imagelist/imagelist';
import './cases-block/imagelist/imagelist2';
import './cases-block/title';
import './cases-block/drawer';
import './cases-block/table';
import './cases-block/form/edit';
import './cases-block/form/view';

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
