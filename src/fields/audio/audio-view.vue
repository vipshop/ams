<template>
    <div :style="field.style">
        <audio class="audio"
               controls="controls"
               :src="viewValue">
            <p>你的浏览器不支持html5音频播放</p>
        </audio>
    </div>
</template>

<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin]
};
</script>

<style lang="scss">
.ams-field-audio-view {
    .audio {
        width: 100%;
    }
}
</style>

