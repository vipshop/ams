<template>
    <ams-block v-if="init" name="table" class="demo" />
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
        if (ams && ams.blocks && ams.blocks['table']) {
            this.init = true;
            return;
        }

        const formFields =
            ['text', 'inputnumber', 'select']
            .reduce((obj, cur) => Object.assign(obj, { [cur]: fields[cur] }), {})

        ams.resource('table', {
            api: {
                prefix: 'https://easy-mock.com/mock/5bf25b2b34392218c898a5fd/',
                list: 'list'
            },
            fields: {
                id: {
                    type: 'text',
                    label: '序号',
                    on: {
                        change: function(...args) {
                            console.log('text change', args, this)
                        }
                    }
                },
                grade1: {
                    type: 'text',
                    label: '一级品类',
                    rules: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    props: {
                        'suffix-icon': 'el-icon-service'
                    }
                },
                grade2: {
                    type: 'text',
                    label: '二级品类'
                },
                day1: {
                    type: 'text',
                    label: '第1天'
                },
                day2: {
                    type: 'text',
                    label: '第2天'
                },
                day3: {
                    type: 'text',
                    label: '第3天'
                },
                day4: {
                    type: 'text',
                    label: '第4天'
                },
                day5: {
                    type: 'text',
                    label: '第5天'
                },
                day6: {
                    type: 'text',
                    label: '第6天'
                },
                day7: {
                    type: 'text',
                    label: '第7天'
                },
                week: {
                    type: 'text',
                    label: '前7天'
                }
            }
        });

        ams.block('table', block)

        this.init = true
    }
}
</script>
