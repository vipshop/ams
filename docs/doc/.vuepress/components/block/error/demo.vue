<template>
    <ams-block v-if="init" name="error" class="demo" />
</template>

<script>
import ams from '@ams-team/ams'
import '../../entry'
import { fields } from '../../config'
import block from './block'

export default {
    data(){
        return {
            init: false
        }
    },
    mounted(){
        // 如果已经注册过则不再注册
        if (ams && ams.blocks && ams.blocks['error']) {
            this.init = true;
            return;
        }

        ams.block('error', block)

        this.init = true
    }
}
</script>
