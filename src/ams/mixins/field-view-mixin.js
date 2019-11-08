export default {
    computed: {
        viewValue() {
            return this.field.view ? this.field.view(this.value, this.field) : this.value;
        }
    },
    inject: ['$block'],
    props: ['field', 'path', 'value', 'name', 'context']
};
