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

    inject: ['$block'],

    methods: {
        emit() {
            ams.$prevReturn = this.context;
            this.$block.emitEvent(this.operation.event || this.operationKey);
        }
    },

    computed: {
        tooltip,
        badge
    }
};
