import { on } from './computed';

export default {
    computed: {
        on,
        viewValue() {
            return this.field.view ? this.field.view(this.value, this.field, this.context) : this.value;
        }
    },
    inject: ['$block'],
    props: ['field', 'path', 'value', 'name', 'context']
};
