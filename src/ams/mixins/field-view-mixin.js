import { on } from './computed';

export default {
    computed: {
        on,
        viewValue() {
            return this.field.view ? this.field.view(this.value, this.field, this.context, this.$createElement) : this.value;
        },
        htmlViewValue() {
            return this.field.htmlView && this.field.htmlView(this.value, this.field, this.context, this.$createElement);
        }
    },
    inject: ['$block'],
    props: ['field', 'path', 'value', 'name', 'context']
};
