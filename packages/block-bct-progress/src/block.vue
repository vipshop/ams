<template>
    <div v-if="ready"
         :style="block.style"
         v-bind="block.props"
         v-on="on"
         class="ams-block-bct-progress">
        <el-row>
            <el-col :span="24" class="main-content">
                <div class="left-divider" :style="{top: dividerHeight}">
                    <div :style="{marginRight: width / 2 + 'px' }">
                        <el-divider content-position="center" >
                            <div class="label">{{ data.leftLabel }}</div>
                            <div class="value">{{ addCommas(data.leftValue) }}</div>
                        </el-divider>
                    </div>
                </div>
                <div
                    class="el-progress center-content"
                    :class="[
                    'el-progress--' + type,
                    status ? 'is-' + status : '',
                    {
                        'el-progress--without-text': false,
                        'el-progress--text-inside': textInside,
                    }
                    ]"
                    role="progressbar"
                    :aria-valuenow="percentage"
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    <div class="el-progress-circle" :style="{height: width + 'px', width: width + 'px'}">
                        <svg viewBox="0 0 100 100">
                            <path
                            class="el-progress-circle__track"
                            :d="trackPath"
                            stroke="#684bc5"
                            :stroke-width="relativeStrokeWidth"
                            fill="none"
                            :style="trailPathStyle"></path>
                            <path
                            class="el-progress-circle__path"
                            :d="trackPath"
                            :stroke="stroke"
                            fill="none"
                            stroke-linecap="round"
                            :stroke-width="percentage ? relativeStrokeWidth : 0"
                            :style="circlePathStyle"></path>
                        </svg>
                    </div>
                    <div
                    class="el-progress__text"
                    :style="{fontSize: progressTextSize + 'px'}"
                    >
                        <div v-if="iconClass" class="icon-class"><i :class="iconClass"></i></div>
                        <div class="icon-text">{{iconText}}</div>
                    </div>
                </div>
                <div class="right-divider" :style="{top: dividerHeight}">
                    <div :style="{marginLeft: width / 2 + 'px' }">
                        <el-divider content-position="center">
                            <div class="label">{{ data.rightLabel }}</div>
                            <div class="value">{{ addCommas(data.rightValue) }}</div>
                        </el-divider>
                    </div>
                </div>
            </el-col>
        </el-row>
        <ams-blocks :blocks="block.blocks" />
    </div>
</template>
<script>
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.blockMixin],
    computed: {
        // props-start
        props() {
            return this.block.props || {};
        },
        type() {
            return 'circle';
        },
        percentage() {
            const data = this.data;
            const leftValue = Number(data.leftValue);
            const rightValue = Number(data.rightValue);
            if (!Number.isNaN(leftValue) && !Number.isNaN(rightValue) && leftValue && rightValue) {
                return Math.floor(100 * rightValue / (leftValue + rightValue));
            }
            return this.props.percentage;
        },
        status() {
            return this.props.status || 0;
        },
        strokeWidth() {
            return this.props.strokeWidth || 6;
        },
        textInside() {
            return this.props.textInside;
        },
        width() {
            return this.props.width || 126;
        },
        color() {
            return this.props.color;
        },
        format() {
            return this.props.format;
        },
        iconClass() {
            return this.data.iconClass || this.props.iconClass || {};
        },
        iconText() {
            return this.data.iconText || this.content;
        },
        // props-end
        dividerHeight() {
            return (this.width - 49) / 2 + 'px';
        },
        barStyle() {
            const style = {};
            style.width = this.percentage + '%';
            style.backgroundColor = this.getCurrentColor(this.percentage);
            return style;
        },
        relativeStrokeWidth() {
            return (this.strokeWidth / this.width * 100).toFixed(1);
        },
        radius() {
            if (this.type === 'circle' || this.type === 'dashboard') {
                return parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);
            } else {
                return 0;
            }
        },
        trackPath() {
            const radius = this.radius;
            const isDashboard = this.type === 'dashboard';
            return `
          M 50 50
          m 0 ${isDashboard ? '' : '-'}${radius}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '-' : ''}${radius * 2}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '' : '-'}${radius * 2}
          `;
        },
        perimeter() {
            return 2 * Math.PI * this.radius;
        },
        rate() {
            return this.type === 'dashboard' ? 0.75 : 1;
        },
        strokeDashoffset() {
            const offset = -1 * this.perimeter * (1 - this.rate) / 2;
            return `${offset}px`;
        },
        trailPathStyle() {
            return {
                strokeDasharray: `${(this.perimeter * this.rate)}px, ${this.perimeter}px`,
                strokeDashoffset: this.strokeDashoffset
            };
        },
        circlePathStyle() {
            return {
                strokeDasharray: `${this.perimeter * this.rate * (this.percentage / 100)}px, ${this.perimeter}px`,
                strokeDashoffset: this.strokeDashoffset,
                transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
            };
        },
        stroke() {
            let ret;
            if (this.color) {
                ret = this.getCurrentColor(this.percentage);
            } else {
                switch (this.status) {
                    case 'success':
                        ret = '#13ce66';
                        break;
                    case 'exception':
                        ret = '#ff4949';
                        break;
                    case 'warning':
                        ret = '#e6a23c';
                        break;
                    default:
                        ret = '#20a0ff';
                }
            }
            return ret;
        },
        progressTextSize() {
            return this.type === 'line'
                ? 12 + this.strokeWidth * 0.4
                : this.width * 0.111111 + 2;
        },
        content() {
            if (typeof this.format === 'function') {
                return this.format(this.percentage) || '';
            } else {
                return `${this.percentage}%`;
            }
        }
    },
    methods: {
        getCurrentColor(percentage) {
            if (typeof this.color === 'function') {
                return this.color(percentage);
            } else if (typeof this.color === 'string') {
                return this.color;
            } else {
                return this.getLevelColor(percentage);
            }
        },
        getLevelColor(percentage) {
            const colorArray = this.getColorArray().sort((a, b) => a.percentage - b.percentage);

            for (let i = 0; i < colorArray.length; i++) {
                if (colorArray[i].percentage > percentage) {
                    return colorArray[i].color;
                }
            }
            return colorArray[colorArray.length - 1].color;
        },
        getColorArray() {
            const color = this.color;
            const span = 100 / color.length;
            return color.map((seriesColor, index) => {
                if (typeof seriesColor === 'string') {
                    return {
                        color: seriesColor,
                        progress: (index + 1) * span
                    };
                }
                return seriesColor;
            });
        },
        addCommas(number) {
            const parts = number.toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts.join('.');
        }
    }
};
</script>
<style lang="scss">
$mainColor1: #684bc5;
$mainColor2: #50b5ff;

.ams-block-bct-progress {
    .left-divider, .right-divider {
        position: absolute;
        width: 50%;
        z-index: 0;
        .label {
            font-size: 15px;
        }
        .value {
            font-size: 22px;
            font-weight: bold;
        }
    }
    .left-divider {
        left: 0;
        .el-divider {
            background-color: $mainColor1;
        }
        .el-divider__text {
            color: $mainColor1;
        }
    }
    .right-divider {
        right: 0;
        .el-divider {
            background-color: $mainColor2;
        }
        .el-divider__text {
            color: $mainColor2;
        }
    }
    .main-content {
        text-align: center;
        position: relative;
        .center-content {
            z-index: 2;
            background-color: #fff;
        }
    }
    .el-divider__text {
        font-size: 16px;
        text-align: center;
        padding: 0 6px;
    }
    .icon-class {
        color: $mainColor1;
        font-size: 40px;
        margin-top: -5%;
        margin-bottom: 5%;
    }
    .icon-text {
        color: $mainColor1;
        font-weight: bold;
    }
    .el-divider--horizontal {
        height: 2px;
    }
}
</style>

