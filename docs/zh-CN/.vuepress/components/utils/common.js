export function downloadTemplate(target,name, config) {
    const content = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>首页</title>
    <script src="https://h5rsc.vipstatic.com/ams/babel-polyfill/7.4.0/polyfill.min.js"></script>
</head>
<body>
    <script>
        var amsConfigJson = ${config};
    </script>

    <link rel="stylesheet" href="https://h5rsc.vipstatic.com/ams/element-ui@2.11.1/theme-chalk/index.css" />
    <script src="https://h5rsc.vipstatic.com/ams/vue@2.6.10.js"></script>
    <script src="https://h5rsc.vipstatic.com/ams/element-ui@2.11.1/index.js"></script>
    <script src="https://unpkg.com/@ams-team/ams/lib/ams.js"></script>
    <script id="ams-config" src="http://h5rsc.vipstatic.com/ams/ams-init@0.1.5.js"></script>
</body>
</html>`
    target.download = name
    target.href = `data:text/plain,${content}`
}

// mock接口前缀
// export const prefix = '//rap2api.taobao.org/app/mock/231578/ams/mock/';
export const prefix = '//www.yournana.club/vipshop/';