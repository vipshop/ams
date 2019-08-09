<template>
    <div :style="field.style">
        {{selectOptions}}
    </div>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin],
    computed: {
        selectOptions() {
            if (this.value && this.field.props && this.field.props.options) {
                const vals = this.value.split(',');
                return this.field.props.options.filter(opt => {
                    return vals.indexOf(String(opt.value)) >= 0;
                }).map(opt => opt.label).join('，');
            }
            return '';
        }
    }

};
</script>
