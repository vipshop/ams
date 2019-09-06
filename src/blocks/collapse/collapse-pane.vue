<template>
    <ams-block :name="name" v-if="computedLoad" />
</template>

<script>

export default {
    props: {
        name: {
            type: String,
            default: '',
            required: true
        },
        option: {
            type: Object,
            default: {},
            required: true
        },
        active: [String, Array]
    },
    computed: {
        computedLoad() {
            if (this.option.load === true) {
                return true;
            }
            if (this.option.lazy === true) {
                if (this.active.indexOf(name) !== -1) {
                    this.option.load = true;
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        }
    }
};
</script>
