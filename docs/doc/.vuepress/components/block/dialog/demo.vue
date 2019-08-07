<template>
    <ams-block v-if="init" name="dialog" class="demo" />
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
        if (ams && ams.blocks && ams.blocks['dialog']) {
            this.init = true;
            return;
        }

        const formFields =
            ['text', 'inputnumber', 'select']
            .reduce((obj, cur) => Object.assign(obj, { [cur]: fields[cur] }), {})

        ams.resource('dialog', { fields: formFields })
        ams.block('dialog', block)

        this.init = true
    }
}
</script>
