<template>
    <div class="ams-block-drag-image" v-if="ready" :style="block.style">

        <ams-blocks :blocks="block.slotBlocks.top" />

        <div class="content" v-if="block && block.options" :style="{ width: block.options.width + 'px', height: block.options.height + 'px' }">
            <img :src="block.options.url" alt="底图" :style="{ width: block.options.imgWidth }" />
            <template v-if="block.options.showFrame">
                <div class="mask"></div>
                <img alt="裁剪图" class="cut-img"
                  :src="block.options.url"
                  :style="{ clip: `rect(0px, ${block.options.cutWidth + block.options.left}px, ${block.options.height}px, ${block.options.left}px)`}">
                <div class="frame" :style="{ left: block.options.left + 'px', width: block.options.cutWidth + 'px', height: block.options.height + 'px' }"
                    @mousedown="dragstart"
                    @mousemove="dragmove"
                    @mouseleave="dragend"
                    @mouseup="dragend">
                    <div class="dot dot-left-top"></div>
                    <div class="dot dot-left-bottom"></div>
                    <div class="dot dot-right-top"></div>
                    <div class="dot dot-right-bottom"></div>
                    <div v-if="block.options.frameHtml" v-html="block.options.frameHtml"></div>
                </div>
            </template>
        </div>

        <ams-blocks :blocks="block.blocks" />

    </div>
</template>
<script>
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.blockMixin],
    data() {
        return {
            isDrag: false,
            disX: 0
        };
    },
    methods: {
        dragstart(e) {
            this.isDrag = true;
            let odiv = e.target; // 获取目标元素
            // 算出鼠标相对元素的位置
            this.disX = e.clientX - odiv.offsetLeft;
        },
        dragmove(e) {
            if (this.isDrag) {
                let left = e.clientX - this.disX;
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
        }
    }
};
</script>
<style lang="scss">
.ams-block-drag-image {
    .content {
        position: relative;
    }
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
        border: 1px dashed #20A0FF;
        box-sizing: border-box;
        cursor: move;
        user-select: none;
        color: #fff;
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

