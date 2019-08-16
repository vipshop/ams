---
Originfile: Originfile 原始文件上传
---
# Originfile 文件

需要设置 `contentType` 为 `multipart` 才能正常上传
本方式会使用FormData对象上传文件
参考：https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects

## 如何选择file和originfile

- `file` 适合文件上传是单独的接口，独立于表单
- `originfile` 用于表单内文件上传需要通过二进制的方式根据表单一起提交上传，另外 `originfile` 需要设置 `contentType` 为 `multipart` 才能正常上传

## 在线实验室
<ClientOnly>
<ams-config name="originfile" type="field"/>
</ClientOnly>