<template>
    <div class="demo">
        <p class="demo-item">表单展示状态</p>
        <ams-block v-if="init"
                   :name="`${type}-view`" />
        <p class="demo-item">表单编辑状态</p>
        <ams-block v-if="init"
                   :name="`${type}-edit`" />
    </div>
</template>

<script>
import ams from '@ams-team/ams'
import '../entry'
import { fields, fieldDefaultValue } from '../config';

export default {
    props: {
        type: String
    },
    data() {
        return {
            init: false
        }
    },
    mounted() {
        // 如果已经注册过则不再注册
        if (ams && ams.blocks && ams.blocks[`${this.type}`]) {
            this.init = true;
            return;
        }
        const getValues = (configObj, fieldType) => {
            switch (this.type) {
                case 'object': {
                    return {
                        simpleObject: configObj['simpleObject'],
                        multiObject: configObj['multiObject']
                    }
                }
                case 'array': {
                    return {
                        simpleArray: configObj['simpleArray'],
                        ArrayArray: configObj['ArrayArray']
                    }
                }
                default: {
                    return {
                        [fieldType]: configObj[fieldType]
                    }
                }
            }
        }

        const demo = {
            blocks: {
                [`${this.type}-edit`]: {
                    type: 'form',
                    ctx: 'edit',
                    resource: this.type,
                    data: getValues(fieldDefaultValue, this.type)
                },
                [`${this.type}-view`]: {
                    type: 'form',
                    ctx: 'view',
                    resource: this.type,
                    data: getValues(fieldDefaultValue, this.type)
                }
            }
        }
        console.log(getValues(fieldDefaultValue, this.type))
        // 只拿出对应的field来展示
        const demoResource = {
            fields: getValues(fields, this.type)
        }

        ams.resource(this.type, demoResource)
        ams.block(`${this.type}`, demo)

        this.init = true;
    }
}
</script>
