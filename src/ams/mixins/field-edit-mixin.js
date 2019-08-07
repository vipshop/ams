import { on } from './computed';
import { equals } from '../configs/field-get-set';

export default {
    computed: {
        on,
        localValue: {
            get() {
                return this.field.get ? this.field.get(this.value, this.field) : this.value;
            },
            set(val) {
                const newValue = this.field.set ? this.field.set(val, this.field) : val;
                const isNotChange = this.field.equals ? this.field.equals(newValue, this.value, this.field) : equals(newValue, this.value, this.field);
                if (!isNotChange) {
                    this.fieldChange(newValue, this.field, this.path);
                }
            }
        }
    },
    inject: ['fieldChange', '$block'],
    props: ['field', 'path', 'value', 'name']
};
