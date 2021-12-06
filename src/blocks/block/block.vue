<template>
    <component v-if="block && block.type"
               :is="'ams-block-' + block.type"
               :name="name"
               class="ams-block" />
    <ams-blocks v-else-if="block"
                :blocks="block.blocks"></ams-blocks>
</template>

<script>
/* eslint-disable vue/require-component-is,vue/valid-template-root */

import ams from '../../ams';

export default {
    props: {
        name: {
            type: String,
            default: '',
            required: true
        }
    },
    data() {
        return {
            block: null
        };
    },
    async created() {
        let block = await ams.getBlock(this.name);
        if (block) {
            this.block = block;
        }
    }
};
</script>
