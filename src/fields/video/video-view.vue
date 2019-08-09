<template>
    <div :style="field.style">
        <video class="video"
               controls="controls"
               :src="viewValue">
            <p>你的浏览器不支持html5视频播放</p>
        </video>
    </div>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin]
};
</script>

<style lang="scss">
.ams-field-video-view {
    // width: ;

    .video {
        width: 100%;
    }
}
</style>

