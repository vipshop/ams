import ams from '../../ams';
import { on } from './computed';

export default {
    computed: {
        ctx() {
            return (
                (ams.blocks[this.name] && ams.blocks[this.name].ctx) || 'edit'
            );
        },
        on
    },
    inject: ['fieldChange', '$block'],
    props: ['field', 'path', 'value', 'name', 'context']
};
