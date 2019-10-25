import ams from '../../ams';

export default {
    computed: {
        ctx() {
            return (
                (ams.blocks[this.name] && ams.blocks[this.name].ctx) || 'view'
            );
        }
    },
    props: ['field', 'path', 'value', 'name', 'context']
};
