<template>
    <div class="ams-block-drag-image-up-down" v-if="ready" :style="block.style">

        <ams-blocks :blocks="block.slotBlocks.top" />

        <div class="content" v-if="block && block.options" :style="{ width: block.options.width + 'px', height: block.options.height + 'px' }">
            <img :src="block.options.url" alt="底图" :style="{ height: block.options.imgHeight }" />
            <template v-if="block.options.showFrame">
                <div class="mask"></div>
                <img alt="裁剪图" class="cut-img"
                  :src="block.options.url"
                  :style="{ clip: `rect(${block.options.top}px, ${block.options.width}px, ${block.options.top + block.options.cutHeight}px, 0px)` }">
                <div class="frame" :style="{ top: block.options.top + 'px', width: block.options.width + 'px', height: block.options.cutHeight + 'px' }"
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
            disY: 0
        };
    },
    methods: {
        dragstart(e) {
            this.isDrag = true;
            let odiv = e.target; // 获取目标元素
            // 算出鼠标相对元素的位置
            this.disY = e.clientY - odiv.offsetTop;
        },
        dragmove(e) {
            if (this.isDrag) {
                let top = e.clientY - this.disY;
                if (top < 0) {
                    this.block.options.top = 0;
                } else if (top > this.block.options.height - this.block.options.cutHeight) {
                    this.block.options.top = this.block.options.height - this.block.options.cutHeight;
                } else {
                    this.block.options.top = top;
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
.ams-block-drag-image-up-down {
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
        left: 0;
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

