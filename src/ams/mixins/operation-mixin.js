import ams from '..';
import { tooltip, badge } from './computed';

export default {
    props: {
        // block name
        name: {
            type: String,
            default: '',
            required: true
        },
        path: {
            type: String,
            default: ''
        },
        operationKey: {
            type: String,
            default: '',
            required: true
        },
        operation: {
            type: Object,
            required: true
        },
        context: {
            type: [String, Object, Array],
            default: '',
            required: false
        }
    },
    // src/ams/mixins/block-mixin.js
    inject: ['$block'],

    methods: {
        emit() {
            ams.$prevReturn = this.context;
            const allowNoSelect = this.operation.props && this.operation.props.allowNoSelect;
            const block = this.$block.block;
            // 兼容block-list中配置multipleSelectAffixShow: true的情况
            if (
                block.type === 'list' &&
                this.path === 'multipleSelect' &&
                !allowNoSelect &&
                Array.isArray(this.context) &&
                !this.context.length) {
                this.$message('已选择的数据项为空');
                return;
            }
            this.$block.emitEvent(this.operation.event || this.operationKey, { operation: this.operation });
        }
    },

    computed: {
        tooltip,
        badge
    }
};
