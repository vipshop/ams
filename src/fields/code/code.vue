<template>
    <div class="code-field-wrapper">
        <codemirror
            v-model="localValue" :options="cmOptions"
    />
    </div>
</template>

<script>
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import { codemirror } from 'vue-codemirror'
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin],
    components: {
        codemirror
    },
    data() {
        return {
            cmOptions: Object.freeze({
                tabSize: 2,
                mode: 'text/javascript',
                theme: 'base16-dark',
                lineNumbers: true,
                line: true,
            })
        };
    },
};
</script>
<style lang="scss" scoped>
.code-field-wrapper {
    height: 100%;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 1.5;
}
</style>