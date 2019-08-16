# 唯品会业务规范

## 规范状态码 <Badge text="ams@0.7.2+"/>
- 未登录：-1701
- 无操作权限：-1702

## 登录规范 <Badge text="ams@0.7.2+"/>

后台登录一般有两种场景

- 页面域与接口域相同（同域很简单，以往的接入方式即可）
- 页面域与接口域不同

### 页面域与接口域不同

如果页面域名为 `a.vip.com`，假如接口域为 `b.vip.com`，则接口域需要满足以下条件才能正常的打通cas登录状态：

1、 `b.vip.com` 对 `a.vip.com` 设置正确的CORS跨域头，并允许携带cookie（参考：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS）
参考header头配置：

```
Access-Control-Allow-Origin: http://a.vip.com #必需，不能使用*，因为*无法携带cookie
Access-Control-Allow-Methods: GET,POST,OPTIONS
Access-Control-Allow-Headers: x-requested-with,content-type,x-xsrf-token
Access-Control-Allow-Credentials: true #必需，需要携带cookie来使用cas认证信息
```

2、`b.vip.com` 接入cas登录

3、`b.vip.com` 发现来自 `a.vip.com` 的接口调用后判断是否已成功cas登录，如未登录则返回约定的特殊状态码 `-1701` 和需要跳转登录的地址 `data.redirectUrl`
``` json
{
    "code": -1701,
    "msg":"",
    "data":{
        "redirectUrl":"http://b.vip.com/login"
    }
}
```
ams框架会跳转 `http://b.vip.com/login?ams_redirect_url=${urlEncode(回跳地址)}`
`b.vip.com` 进行登录； 在 `http://b.vip.com/login` 页面完成登录操作后需要回跳至回跳地址（通过ams_redirect_url参数或者referer获取），注意 `b.vip.com` 需要校验`回跳地址` 是否是 `a.vip.com` 域名，避免安全问题

4、http://b.vip.com/login 地址需要完成第3点的进行登录、验证回跳地址、跳转回跳地址等操作

### 其它打通cas登录接口的方式参考
- a.vip.com 内嵌套一个b.vip.com的已接入cas的接口iframe，加载成功后页面再进行后续逻辑（iframe内完成cas登录）

## 权限规范 <Badge text="ams@0.7.2+"/>

如用户调用接口时不具备操作权限，则返回约定的特殊状态码 `-1702`，可在 `msg` 字段提供详情错误信息，如：
``` json
{
    "code": -1702,
    "msg":"不具备操作权限"
}
```