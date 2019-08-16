<template>
    <ams-block v-if="init"
               name="convent"
               class="demo convent" />
</template>

<script>
import ams from '@ams-team/ams'
import '../../entry'
import blockConfig from './config.js'

export default {
    data() {
        return {
            init: false
        }
    },
    mounted() {
        // 如果已经注册过则不再注册
        if (ams && ams.blocks && ams.blocks['convent']) {
            this.init = true;
            return;
        }

        ams.block('convent', blockConfig);

        this.init = true
    }
}
</script>