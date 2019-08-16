---
Audio: Audio 音频
---

# Audio 音频

## 在线实验室
<ClientOnly>
<ams-config name="audio" type="field"/>
</ClientOnly>

## 示例预览
<ClientOnly>
<demo-list :type="'audio'"></demo-list>
</ClientOnly>

## 示例代码
```js
audio: {
    type: 'audio',
    label: '音频',
    tip: '只能上传jpg/png文件，且不超过500kb',
    successUrlKey: 'url',
    props: {
        action: 'https://jsonplaceholder.typicode.com/posts/'
    }
}
```