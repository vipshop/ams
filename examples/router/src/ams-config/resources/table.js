import ams from '@ams-team/ams';
import { prefix } from '@/utils';

// http://localhost:9526/examples/router/mock/list

ams.resource('table', {
    key: 'id',
    api: {
        prefix: prefix,
        list: 'table'
    },
    fields: {
        id: {
            type: 'text',
            label: '序号',
            on: {
                change: function(...args) {
                    console.log('text change', args, this);
                }
            }
            // props: {
            //     'render-header': function(h, { column }) { // h即为cerateElement的简写，具体可看vue官方文档
            //         return h(
            //             'div',
            //             [
            //                 h('span', column.label),
            //                 h('el-tooltip', [
            //                     h('i', {
            //                         class: 'el-icon-question',
            //                         style: 'color:#409eff;margin-left:5px;'
            //                     })
            //                 ], {
            //                     content: '这是一个提示xxxxx'
            //                 })
            //             ],
            //         )
            //     }
            // }
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
            // props: {
            //     'render-header': function(h, { column }) { // h即为cerateElement的简写，具体可看vue官方文档
            //         return h(
            //             'div',
            //             [
            //                 h('span', column.label),
            //                 h('i', {
            //                     class: 'el-icon-circle-plus-outline',
            //                     style: 'color:#409eff;margin-left:5px;'
            //                 })
            //             ],
            //         )
            //     }
            // }

        },
        week: {
            type: 'text',
            label: '前7天'
        }
    }
});
