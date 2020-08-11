import ams from '..';
import { on, tooltip, badge } from './computed';

export default {
    computed: {
        on,
        tooltip,
        badge
    },
    inject: ['fieldChange', '$block'],
    props: ['field', 'path', 'value', 'name', 'context'],
    methods: {
        emit() {
            ams.$prevReturn = this.context;
            const field = this.field;
            if (field.props && field.props.emitFieldChange) {
                this.fieldChange(field.props.text || field.label, field, this.path);
            }
            this.$block.emitEvent(field.event);
        }
    }
};
