<template>
    <div class="ams-field-radio-img" :style="field.style">

        <ul class="radio-img-group">
            <li
                v-for="item in options"
                :class="[localValue === item.value? 'active': '']"
                :key="item.value"
                @click="handleChoose(item)"
            >
                <img :src="item.image" alt="" />
                <p>{{item.label}}</p>
            </li>
        </ul>

    </div>
</template>

<script>
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.fieldEditMixin, ams.mixins.fieldEditOptionsMixin],
    methods: {
        handleChoose(item) {
            this.localValue = item.value;
        }
    }
};
</script>

<style lang="scss">
.ams-field-radio-img {
    .radio-img-group {
        li {
            display: inline-block;
            width: 100px;
            margin: 0 10px;
            border: 1px solid #eee;
            border-radius: 5px;
            color: #000;
            cursor: pointer;
            img {
                width: 100%;
                vertical-align: top;
            }
            p {
                margin: 0;

                font-size: 12px;
                text-align: center;
                line-height: 20px;
            }
        }
        .active {
            border-color: #409EFF;
            color: #409EFF;
        }
    }
}
</style>
