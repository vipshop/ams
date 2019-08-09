<template>
    <ams-block v-if="init" name="form" class="demo" />
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
        if (ams && ams.blocks && ams.blocks['form']) {
            this.init = true;
            return;
        }

        const formFields =
            ['text', 'date', 'time', 'datetime', 'switch', 'password', 'textarea']
            .reduce((obj, cur) => Object.assign(obj, { [cur]: fields[cur] }), {})

        ams.resource('form', { fields: formFields })
        ams.block('form', block)

        this.init = true
    }
}
</script>
