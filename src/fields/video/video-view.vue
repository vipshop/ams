<template>
    <div :style="field.style">
        <video
           class="video"
           controls="controls"
           :src="viewValue"
           v-bind="field.props"
           v-playback-rate="videoRate"
       >
            <p>你的浏览器不支持html5视频播放</p>
        </video>
        <div v-if="field.props && field.props['isShowPlaybackRate']" class="ams-video__actions">
            播放速率：
            <el-select
                v-model="videoRate"
                size="mini"
                class="ams-video__action-rate"
            >
                <el-option
                    v-for="item in rateList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
        </div>
    </div>
</template>

<script>
import mixins from '../../ams/mixins';

/**
 * 视频播放倍速列表
 */
const VIDEO_RATE_LIST = [
    {
        label: '0.25 倍',
        value: 0.25,
    },
    {
        label: '0.5 倍',
        value: 0.5,
    },
    {
        label: '0.75',
        value: 0.75,
    },
    {
        label: '正常',
        value: 1,
    },
    {
        label: '1.25 倍',
        value: 1.25,
    },
    {
        label: '1.5 倍',
        value: 1.5,
    },
    {
        label: '1.75 倍',
        value: 1.75,
    },
    {
        label: '2 倍',
        value: 2,
    },
];

export default {
    directives: {
        playbackRate(el, binding) {
            el.playbackRate = binding.value;
        }
    },
    mixins: [mixins.fieldViewMixin],
    data() {
        return {
            videoRate: 1,
            rateList: VIDEO_RATE_LIST,
        };
    },
};
</script>

<style lang="scss" scoped>
.ams-field-video-view {
    .video {
        display: block;
        width: 100%;
    }
}
.ams-video__actions {
    margin-top: 10px;
    color: #666;
    line-height: 1.2;
}
.ams-video__action-rate {
    width: 90px;
}
</style>

