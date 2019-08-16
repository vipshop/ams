<template>
    <ams-block v-if="init" name="ams-config" />
</template>

<script>
import ams from '@ams-team/ams'
import './entry'

export default {
    props: {
        type: String,
        name: String
    },
    data() {
        return {
            init: false
        }
    },
    mounted() {
        console.log('mounted');
        // 如果已经注册过则不再注册

        ams.block('ams-config', {
            type: 'ams-config',
            options: {
                type: this.type,
                name: this.name
            }
        });

        this.init = true;
    }
}
</script>
