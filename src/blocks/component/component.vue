<template>
    <component v-if="ready"
               v-bind="block.props"
               v-on="on"
               ref="amsComponent"
               :is="block.options.is || 'div'"
               class="ams-block-component"
               :style="block.style"
               v-loading="loading">
        <div v-html="block.options.html"></div>
        {{block.options.text}}
        <ams-blocks v-if="block"
                    :blocks="block.blocks"></ams-blocks>
        <ams-operations :name="name"
                        :context="data"></ams-operations>
    </component>
</template>

<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.blockMixin]
};
</script>
