<template>
    <div class="ams-block-drag-image" :style="block.style" v-if="block && block.options">
        <div :style="{ width: block.options.width + 'px', height: block.options.height + 'px' }">
            <img :src="block.options.url" alt="底图">
            <div class="mask"></div>
            <img alt="裁剪图" :src="block.options.url" class="cut-img" :style="{ clip: `rect(0px, ${block.options.cutWidth + block.options.left}px, ${block.options.height}px, ${block.options.left}px)` }">
            <div class="frame" :style="{ left: block.options.left + 'px', width: block.options.cutWidth + 'px', height: block.options.height + 'px' }"
                @mousedown="dragstart"
                @mousemove="dragmove"
                @mouseup="dragend">
                <div class="dot dot-left-top"></div>
                <div class="dot dot-left-bottom"></div>
                <div class="dot dot-right-top"></div>
                <div class="dot dot-right-bottom"></div>
            </div>
        </div>
    </div>
</template>
<script>
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.blockMixin],
    data() {
        return {
            isDrag: false,
            startClientX: 0
        };
    },
    methods: {
        dragstart(e) {
            this.isDrag = true;
            this.startClientX = e.clientX;
        },
        dragmove(e) {
            if (this.isDrag) {
                const left = this.block.options.left + (e.clientX - this.startClientX) * this.block.options.ratio;
                if (left < 0) {
                    this.block.options.left = 0;
                } else if (left > this.block.options.width - this.block.options.cutWidth) {
                    this.block.options.left = this.block.options.width - this.block.options.cutWidth;
                } else {
                    this.block.options.left = left;
                }
            }
        },
        dragend(e) {
            this.isDrag = false;
            this.on.getFrameLeft(this.block.options.left); // 返回需要裁剪的区域离左边距离
        }
    }
};
</script>
<style lang="scss">
.ams-block-drag-image {
    position: relative;
    img, .mask {
        width: 100%;
        height: 100%;
    }
    .cut-img, .mask {
        position: absolute;
        top: 0;
        left: 0;
    }
    .mask {
        background-color: rgba(0, 0, 0, 0.6);
    }
    .frame {
        position: absolute;
        top: 0;
        border: 2px dashed #20A0FF;
        box-sizing: border-box;
        cursor: move;
        .dot {
            position: absolute;
            width: 7px;
            height: 7px;
            border: 2px solid #20A0FF;
            background-color: white;
            box-sizing: border-box;
            &.dot-left-top {
                left: -4px;
                top: -4px;
            }
            &.dot-left-bottom {
                left: -4px;
                bottom: -4px;
            }
            &.dot-right-top {
                right: -4px;
                top: -4px;
            }
            &.dot-right-bottom {
                right: -4px;
                bottom: -4px;
            }
        }
    }
}
</style>

