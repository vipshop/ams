<template>
    <div :style="field.style">
        <mavon-editor ref="mavonEditor" @imgAdd="imgAdd" v-on="on" v-model="localValue" v-bind="field.props"/>
    </div>
</template>

<script>
import ams from '@ams-team/ams';
// import xss from 'xss';
export default {
    mixins: [ams.mixins.fieldEditMixin],
    data() {
        return {
            // localValue: ''
        };
    },
    // computed: {
    //     newLocalValue: {
    //         // getter
    //         get: function () {
    //             return this.localValue;
    //         },
    //         // setter
    //         set: function (newValue) {
    //             this.localValue = xss(newValue);
    //         }
    //     }
    // },
    mounted() {
        const props = this.field.props || {};
        if (typeof props.html !== 'undefined') {
            this.$refs.mavonEditor.markdownIt.set({ html: props.html });
        }
    },
    methods: {
        async imgAdd(pos, $file) {
            const props = this.field.props || {};
            const $editor = this.$refs.mavonEditor;
            if (typeof props['imgAdd'] === 'function') {
                return props['imgAdd'].call(this, pos, $file, $editor);
            }
            if (!props.action) {
                return;
            }
            let successCode;
            if (typeof props.successCode !== 'undefined') {
                successCode = props.successCode;
            } else {
                successCode = this.$block.getConfig('resource.api.successCode');
            }
            const res = await ams.request({
                url: props.action,
                method: 'POST',
                data: {
                    [props.name || 'file']: $file
                },
                contentType: 'multipart'
            });
            if (res.data && res.data.code === successCode) {
                // 优先取props的success-url-key，successUrlKey和field.successUrlKey慢慢废弃
                const successUrlKey = props['success-url-key'] || props.successUrlKey || this.field.successUrlKey || 'url';
                if (res.data.data) {
                    $editor.$img2Url(pos, res.data.data[successUrlKey] || res.data.data);
                }
                if (typeof props['on-success'] === 'function') {
                    props['on-success'](res, $file, $editor);
                }
            } else if (typeof props['on-error'] === 'function') {
                props['on-error'](res, $file, $editor);
            } else {
                this.$message.error(`${res.msg}(${res.code})`);
            }
        }
    },
};
</script>
