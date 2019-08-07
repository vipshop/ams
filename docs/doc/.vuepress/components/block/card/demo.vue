<template>
    <ams-block v-if="init" name="card" class="demo" />
</template>

<script>
import ams from '@ams-team/ams'
import '../../entry'
import block from './block'

export default {
    data(){
        return {
            init: false
        }
    },
    mounted(){
        // 如果已经注册过则不再注册
        if (ams && ams.blocks && ams.blocks['card']) {
            this.init = true;
            return;
        }

        ams.block('card', block)

        this.init = true
    }
}
</script>
