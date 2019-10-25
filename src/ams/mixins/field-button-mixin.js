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
            this.$block.emitEvent(this.field.event);
        }
    }
};
