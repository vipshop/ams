# 全局配置

可以通过ams.config配置各种全局的选项，会深度合并现有配置

在block内可以配置config字段，会跟ams.config的配置一起执行

```js
ams.config({
    resource: {
        /**
         * 全局请求参数拦截器，只能有一个，新配置的会覆盖旧的，返回处理过的请求参数
         */
        requestInterceptor(options) {
            options.headers = {
                ...options.headers,
                "xsrf-token": "token"
            }
            return options;
        },
        /**
         * 全局请求结果拦截器，只能有一个，新配置的会覆盖旧的，返回空会中断后续处理，不处理的场景返回res
         */
        responseInterceptor(res) {
            if (res.data.code === -33) {
                // 跳转登录并中断请求
                ams.callAction('routerPush:/login')
                return;
            }
            return res;
        },

        api: {
            // 全局默认withCredentials，请求接口是否携带cookie
            withCredentials: true,
            // 全局默认contentType json | form
            contentType: 'json',
            // 全局成功code
            successCode: 0
        }
    }
})
```