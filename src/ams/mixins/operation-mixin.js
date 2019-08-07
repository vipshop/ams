import ams from '..';

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
        tooltip() {
            const tooltip = this.operation.tooltip;
            if (tooltip) {
                if (typeof tooltip === 'string') return { effect: 'dark', placement: 'bottom', content: tooltip };
                if (typeof tooltip === 'object') return tooltip;
                return null;
            }
            return null;
        }
    }
};
