<template>
    <div v-if="ready"
         :style="block.style"
         class="ams-block-image-label">

        <div class="images-wrapper" ref="boxWrapper">

            <el-button v-if="isEidt"
                 class="operation-add"
                 type="primary"
                 size="mini"
                 icon="el-icon-plus"
                 @click="add">添加意见</el-button>

            <div class="tip-com"
                ref="tipCom"
                v-for="(item, index) in data.imgTipComList"
                :key="index"
                :style="{top: `${item.top}px`, left: `${item.left}px`}">

                <span v-if="isEidt" class="dot" @mousedown="move($event, index)"></span>
                <span v-if="isEidt" class="dot-close" @click="close(index)">x</span>

                <textarea class="text"
                        v-model="item.text"
                        :disabled="!isEidt"
                        :style="{width: `${item.width}px`, height: `${item.height}px`, resize: `${isEidt?'':'none'}`}"></textarea>
            </div>

            <div class="top-image">
                <img :src="data.imgList[0]" alt="" />
            </div>
            <div class="bottom-list">
                <img class="bottom-left-image" :src="data.imgList[1]" alt="">
                <img class="bottom-center-image" :src="data.imgList[2]" alt="">
                <img class="bottom-right-image" :src="data.imgList[3]" alt="">
            </div>
        </div>

        <ams-blocks :blocks="block.blocks" />

    </div>
</template>
<script>
import ams from '@ams-team/ams';
import { getStyle } from './utils';

export default {
    mixins: [ams.mixins.blockMixin],
    data() {
        return {
            zIndex: 5,
            data: {
                imgList: [],
                imgTipComList: []
            }
            // 数据格式
            // imgTipComList: [
            //     {
            //         top: 20,
            //         left: 20,
            //         width: 50,
            //         height: 50,
            //         text: '你好'
            //     }
            // ]
        };
    },
    computed: {
        isEidt() {
            if (this.block.ctx === 'view') {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        move(e, index) {
            if (!this.isEidt) {
                return false;
            }

            // 获取目标元素
            const dom = e.target.parentElement;
            dom.style.zIndex = this.zIndex++;

            // 算出鼠标相对元素的位置
            let disX = e.clientX - dom.offsetLeft;
            let disY = e.clientY - dom.offsetTop;
            const wrapperWidth = parseInt(getStyle(this.$refs.boxWrapper, 'width'), 10);
            const wrapperHeight = parseInt(getStyle(this.$refs.boxWrapper, 'height'), 10);
            const domWidth = parseInt(getStyle(dom, 'width'), 10);
            const domHeight = parseInt(getStyle(dom, 'height'), 10);

            document.onmousemove = (e) => {
                // 鼠标按下并移动的事件, 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;
                let top = e.clientY - disY;

                // 移动当前元素
                if (left <= 20) {
                    left = 20;
                } else if (left >= wrapperWidth - domWidth) {
                    left = wrapperWidth - domWidth;
                }

                if (top <= 0) {
                    top = 0;
                } else if (top >= wrapperHeight - domHeight) {
                    top = wrapperHeight - domHeight;
                }

                this.data.imgTipComList[index].top = top;
                this.data.imgTipComList[index].left = left;
            };
            // 鼠标移除解绑事件
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };

            // chrom，ff阻止默认事件文字选中
            e.preventDefault && e.preventDefault();
        },
        add() {
            this.data.imgTipComList.push({
                top: 30,
                left: 20,
                width: 150,
                height: 40,
                text: ''
            });
        },
        close(index) {
            this.data.imgTipComList.splice(index, 1);
        },
        getTipComData() {
            this.$refs.tipCom.forEach((ele, index) => {
                this.data.imgTipComList[index].width = parseInt(getStyle(ele, 'width'), 10);
                this.data.imgTipComList[index].height = parseInt(getStyle(ele, 'height'), 10);
            });

            return this.data.imgTipComList;
        }
    }
};
</script>
<style lang="scss">
.ams-block-image-label {
    .images-wrapper {
        position: relative;
        width: 516px;
        height: 400px;
    }
    .tip-com {
        position: absolute;
        .dot {
            position: absolute;
            top: 0px;
            left: -20px;
            width: 20px;
            height: 20px;
            cursor: pointer;
            border-radius: 100%;
            background: rgba(0, 0, 0, .7);
        }
        .dot-close {
            position: absolute;
            top: -10px;
            right: -10px;
            width: 20px;
            height: 20px;
            color: #fff;
            text-align: center;
            cursor: pointer;
            border-radius: 100%;
            background: rgba(0, 0, 0, .7);
        }
        textarea{
            // width: 100%;
            // height: 100%;
            color: #fff;
            border: 1px solid #000;
            background: rgba(0, 0, 0, .5);
            border-radius: 5px;
            vertical-align: top;
        }
    }

    .top-image {
        width: 100%;
        height: 248px;
        margin-bottom: 12px;
        img {
            display: block;
            width: 100%;
            height: 100%;
            border: 1px solid #ccc;
        }
    }

    .bottom-list {
        width: 100%;
        height: 138px;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        img {
            // float: left;

            border: 1px solid #ccc;
        }
        .bottom-left-image {
            width: 150px;
            height: 138px;
            margin-right: 8px;
        }
        .bottom-center-image {
            width: 237px;
            height: 138px;
            margin-right: 8px;
        }
        .bottom-right-image {
            width: 109px;
            height: 138px;
        }
    }
    .operation-add {
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>

