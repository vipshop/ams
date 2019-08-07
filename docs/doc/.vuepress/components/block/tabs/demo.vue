<template>
    <ams-block v-if="init" name="tabs" class="demo" />
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
        if (ams && ams.blocks && ams.blocks['tabs']) {
            this.init = true;
            return;
        }

        ams.block('tabs', block)

        this.init = true
    }
}
</script>
