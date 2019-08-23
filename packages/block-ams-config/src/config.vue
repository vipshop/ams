<template>
    <div v-if="ready"
         class="ams-block-ams-config"
         :style="block.style">
        <div v-if="showAll"
             class="show-all">
            blocks
            <div class="show-item">
                <el-tag v-for="item in blocks"
                        :key="item"
                        @click="toggle('block', item)">{{item}}</el-tag>
            </div>
            fields
            <div class="show-item">
                <el-tag v-for="item in fields"
                        :key="item"
                        @click="toggle('field', item)">{{item}}</el-tag>
            </div>
            operations
            <div class="show-item">
                <el-tag v-for="item in operations"
                        :key="item"
                        @click="toggle('operation', item)">{{item}}</el-tag>
            </div>
        </div>
        <fieldConfig v-if="type === 'field'"
                     :config="config"
                     :defaults="defaults" />
        <blockConfig v-if="type === 'block'"
                     :config="config"
                     :defaults="defaults" />
        <operationConfig v-if="type === 'operation'"
                         :config="config"
                         :defaults="defaults" />
    </div>
</template>

<script>

import ams from '@ams-team/ams';
import fieldConfig from './field';
import blockConfig from './block';
import operationConfig from './operation';

import '@ams-team/ams/lib/AMS_CONFIG';
// import '@ams-team/ams/src/AMS_CONFIG';

// 初始化默认resource
ams.resource('demo', {
    fields: {
        id: {
            type: 'text',
            label: 'id',
            default: 2
        },
        name: {
            type: 'text',
            label: '名字',
            default: 'aa'
        },
        rate: {
            type: 'rate',
            label: '评分',
            default: 2
        }
    }
});

export default {
    components: {
        fieldConfig,
        blockConfig,
        operationConfig
    },
    mixins: [ams.mixins.blockMixin],
    data() {
        return {
            showAll: false,
            type: '',
            config: null,
            defaults: null,
            fields: [],
            blocks: [],
            operations: [],
            // CONFIG_FIELD: null, // ams.utils.deepExtend({ type: { default: 'text' }}, CONFIG_FIELD),
            // CONFIG_BLOCK: null, // ams.utils.deepExtend({ type: { default: 'form' }}, CONFIG_BLOCK),
            // CONFIG_OPERATION: null, // ams.utils.deepExtend({ type: { default: 'button' }}, CONFIG_OPERATION),
            // defaults: {
            //     哈哈: {
            //         'type': 'text',
            //         'label': '哈哈',
            //         'ctx': 'edit',
            //         'default': '2',
            //         'hidden': 0,
            //         'rules': [],
            //         'props': {}
            //     },
            //     测试: {
            //         'type': 'text',
            //         'label': '测试',
            //         'ctx': 'edit',
            //         'default': '3',
            //         'hidden': 0,
            //         'rules': [],
            //         'props': {}
            //     }
            // }
        };
    },
    methods: {
        afterReady() {
            const { type, name, showAll } = this.block.options;
            this.show(type, name);
            this.blocks = Object.keys(window.AMS_CONFIG.block);
            this.fields = Object.keys(window.AMS_CONFIG.field);
            this.operations = Object.keys(window.AMS_CONFIG.operation);
            if (showAll) {
                this.showAll = true;
            }
        },
        show(type, name) {
            this.type = type;
            const amsConfig = window.AMS_CONFIG[type][name];
            if (amsConfig) {
                this.defaults = amsConfig.defaults;
                this.config = amsConfig.config;
            } else {
                console.warn(`${type} ${name} without AMS_CONFIG`);
            }
        },
        toggle(type, name) {
            this.type = '';
            setTimeout(() => {
                this.show(type, name);
            }, 0);
        }
    }
};
</script>

<style lang="scss">
.ams-block-ams-config {
    .show-all {
        .el-tag {
            margin: 0 5px 5px 0;
        }
        .show-item{
            padding: 10px 0;
        }
    }
    .ams-config-content {
        overflow: hidden;
        .edit {
            width: 48%;
            float: left;
        }
        .preview {
            width: 48%;
            float: right;
            margin-left: 4%;
        }
    }
    .ams-block-router .sidebar-container{
        position: absolute;
    }
}

</style>

