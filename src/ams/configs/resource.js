import { Message } from 'element-ui';
import { get as lodashGet } from 'lodash';

export const resource = {
    // /**
    //  * 全局请求参数拦截器，只能有一个，新配置的会覆盖旧的，返回处理过的请求参数
    //  */
    // requestInterceptor(options) {
    //     options.headers = {
    //         ...options.headers,
    //         "xsrf-token": "token"
    //     }
    //     return options;
    // },
    // /**
    //  * 全局请求结果拦截器，只能有一个，新配置的会覆盖旧的，返回空会中断后续处理，不处理的场景返回res
    //  */
    // responseInterceptor(res) {
    //     if (res.data.code === -33) {
    //         // 跳转登录并
    //         ams.callAction('routerPush:/login')
    //         return;
    //     }
    //     return res;
    // },

    api: {
        // 全局默认withCredentials
        withCredentials: true,
        // 全局默认contentType json|form|multipart
        contentType: 'form',
        // 全局成功code
        successCode: 0,
        // 全局responseType
        responseType: ''
    },

    codes: {
        '-1701': function (res, options) {
            const redirectUrl = lodashGet(res, 'data.data.redirectUrl');
            if (!redirectUrl) return res;
            const split = redirectUrl.includes('?') ? '&' : '?';
            location.href = `${redirectUrl}${split}ams_redirect_url=${encodeURIComponent(location.href)}`;
            return false;
        },
        '-1702': function (res, options) {
            Message.error(res.data && res.data.msg || '没有操作权限');
            return false;
        }
    }
};
