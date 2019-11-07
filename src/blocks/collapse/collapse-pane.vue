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
            type: [String, Object],
            required: true
        },
        active: {
            type: [String, Array],
            default: ''
        }
    },
    data() {
        return {
            load: false
        };
    },
    computed: {
        computedLoad() {
            if (this.load === true) { return true }

            if (typeof this.option === 'string') {
                this.load = true;
                return true;
            } else if (typeof this.option === 'object') {
                if (this.option.lazy === true) {
                    if (this.active.indexOf(this.name) !== -1) {
                        this.load = true;
                        return true;
                    } else {
                        return false;
                    }
                }
            }

            return true;
        }
    }
};
</script>
