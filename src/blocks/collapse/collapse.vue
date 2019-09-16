<template>
    <div v-if="ready"
         class="ams-block-collapse"
         :style="block.style">
        <el-collapse v-model="data.active" v-on="on" :accordion="block.props.accordion || false">
            <template v-for="option in options">
                    <el-collapse-item :key="option.name" :name="option.name">

                        <template slot="title">
                            <span v-html="option['title']"></span>
                        </template>

                        <CollapsePane :name="option.name" :active="data.active" :option="option"/>

                    </el-collapse-item>
            </template>
        </el-collapse>
        <ams-operations
        :operations="block.operations"
        :name="name"
        class="operations"/>
    </div>
</template>

<script>
import mixins from '../../ams/mixins';
import CollapsePane from './collapse-pane.vue';

export default {
    components: {
        CollapsePane
    },
    mixins: [mixins.blockMixin],
    computed: {
        isAccordion() {
            return this.block.props && this.block.props.accordion;
        },
        options() {
            let options = [];
            Object.keys(this.block.options).forEach(name => {
                const option = this.block.options[name];
                if (typeof option === 'string') {
                    options.push({
                        name: name,
                        title: option,
                        lazy: false,
                        load: false
                    });
                } else {
                    options.push({
                        name: name,
                        title: option.title,
                        lazy: option.lazy,
                        load: false
                    });
                }

            });
            return options;
        }
    }
};
</script>
