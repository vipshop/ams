import { on } from './computed';
import { filter } from '../../utils/tpl';

export default {
    computed: {
        on,
        viewValue() {
            const view = this.field.view;
            // 当 view 为字符串的时候，将其视作模板，即 tpl
            if (typeof view === 'string') {
                return filter(view, {
                    fieldValue: this.value,
                    filed: this.field,
                    context: this.context
                });
            }
            return view ? view(this.value, this.field, this.context) : this.value;
        }
    },
    inject: ['$block'],
    props: ['field', 'path', 'value', 'name', 'context']
};
