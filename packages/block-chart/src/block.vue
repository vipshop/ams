<template>
        <div
            v-loading = "loading"
            v-if="ready"
            :class="'ams-block-' + type" :style="block.style">

            <ams-blocks :blocks="block.slotBlocks.top" />

            <div ref="chart" class="ams-block-chart-canvas"></div>

            <ams-blocks :blocks="block.blocks" />
        </div>
</template>

<script>
/* eslint-disable max-depth,no-undefined */
import ams from '@ams-team/ams';
import echarts from 'echarts';
import 'echarts/theme/macarons.js';

// window暴露echarts
window.echarts = echarts;
export default {
    mixins: [ams.mixins.blockMixin],
    data() {
        return {
            type: 'chart',
            data: {},       // 数据记录
            chartDom: null  // echart节点存储
        };
    },
    watch: {
        data: {
            deep: true,
            handler(val, oldVal) {
                // 每当data改变时 重新计算option
                if (val && this.chartDom) {
                    this.setChartOption();
                }
            }
        }
    },
    created() {
        const autoResizeRender = ams.configs && ams.configs['block_chart'] && ams.configs['block_chart']['resize-render'];
        if (autoResizeRender !== false) {
            const { addEvent, debounce } = ams.utils;
            addEvent(window, 'resize', debounce(() => {
                this.chartDom && this.chartDom.resize();
            }, 100));
        }
    },
    updated() {
        // 节点上绑定有v-if/v-show时，只能在update阶段获得到refs
        this.$nextTick(async () => {
            // Code that will run only after the
            // entire view has been re-rendered
            if (this.$refs.chart && !this.chartDom) {
                // 初始化
                const globalTheme = ams.configs && ams.configs['block_chart'] && ams.configs['block_chart'].theme;
                const themeName = this.block.theme || globalTheme || 'macarons';
                this.chartDom = echarts.init(this.$refs.chart, themeName);
                const block = this.block;
                if (block && block.props && block.props.events) {
                    let o = block.props.events;
                    Object.keys(o).forEach(eventName => {
                        if (ams.utils.getType(o[eventName] === 'function')) {
                            this.chartDom.on(eventName, o[eventName]);
                        }
                    });
                }
                this.chartDom.showLoading();
                this.setChartOption();
            }
        });
    },
    methods: {
        setBlockData(data) {
            // 深拷贝，接口返回数据，避免覆盖
            let dataTmp = this.deepExtend(this.data, data);

            // 重置data对象数据指引，触发watch-data调用，在此处直接使用this.setChartOption会死循环
            this.data = this.deepExtendAndHandle({}, dataTmp);
        },
        deepExtend(destination, source) {
            // 数据深拷贝，与ams.utils.deepExtend不同在于数组的处理，数组直接覆盖
            const type = ams.utils.getType(source);
            if (type === 'object' || type === 'array') {
                for (let property in source) {
                    if (source.hasOwnProperty(property)) {
                        let old = destination[property];
                        let obj = source[property];
                        let oldType = ams.utils.getType(old);
                        let objType = ams.utils.getType(obj);
                        if (objType === 'object') {
                            const target = oldType === 'object' ? old : {};
                            destination[property] = this.deepExtend(target, obj);
                        } else if (objType === 'array') {
                            // const target = oldType === 'array' ? old : [];
                            destination[property] = obj;
                        } else {
                            destination[property] = source[property];
                        }
                    }
                }
            }
            return destination;
        },
        async setChartOption() {
            if (this.block.options && this.chartDom) {
                // 1、数据处理
                let options = this.deepExtendAndHandle({}, this.block.options);
                let series = options.series;
                let chartType = options.type;

                // yAxis为空报错处理
                if (options.type === 'line' || options.type === 'bar') {
                    options.yAxis = options.yAxis || {};
                }

                // 2、遍历series 添加默认type
                if (series) {
                    series.forEach(item => {
                        item.type = item.type ? item.type : chartType;
                        // todo action
                        // item.data = typeof item.data === 'function' ? item.data.call(this) : this.block.data[item.data];
                        // if (typeof item.data === 'function') {
                        //     item.data = item.data.call(this);
                        // } else if (typeof item.data === 'string'){
                        //     item.data = this.data[item.data];
                        // }
                    });
                }
                // 3、设置图表options
                this.chartDom.setOption(options);
                this.chartDom.hideLoading();
                if (options.watermark) {
                    const wmOptions = ams.utils.getType(options.watermark) === 'object' ? options.watermark : {};
                    ams.utils.watermark(Object.assign({
                        container: this.chartDom._dom,
                        width: '200px',
                        height: '150px',
                        uid: this._uid
                    }, wmOptions || {}));
                }
            }
        },
        // 深度拷贝options各个值, 并处理'data.xxx'这类数据
        deepExtendAndHandle(destination, source) {
            const type = ams.utils.getType(source);
            if (type === 'object' || type === 'array') {
                for (let property in source) {
                    if (!/^\$/.test(property) && source.hasOwnProperty(property)) {
                        let old = destination[property];
                        let obj = source[property];
                        let oldType = ams.utils.getType(old);
                        let objType = ams.utils.getType(obj);
                        // console.log('objType----', objType, obj);
                        if (objType === 'object') {
                            const target = oldType === 'object' ? old : {};
                            destination[property] = this.deepExtendAndHandle(target, obj);
                        } else if (objType === 'array') {
                            const target = oldType === 'array' ? old : [];
                            destination[property] = this.deepExtendAndHandle(target, obj);
                        } else {
                            if (objType === 'string') {
                                const value = this.setData(obj);
                                if (!value) {
                                    destination[property] = source[property];
                                } else {
                                    destination[property] = value;
                                }
                            } else {
                                destination[property] = source[property];
                            }
                        }
                    }
                }
            }
            return destination;
        },
        setData(stringVal) {
            let path = stringVal.split(/\.|\[/);
            let object = this;

            if (path.length > 0 && path[0] === 'data') {
                // 循环处理，data.test[2]这种字符串数据
                for (let i = 0; i < path.length; i++) {
                    if (path[i].charAt(path[i].length - 1) === ']') {
                        // 数组
                        object = object[path[i].slice(0, -1)];
                    } else {
                        // 对象
                        object = object[path[i]];
                    }
                    if (object === null || object === undefined) {
                        console.warn(`get "${stringVal}" fail`);
                        return false;
                    }
                }
                return object;
            } else {
                return stringVal;
            }
        }
    }
};
</script>

<style lang="scss">
.ams-block-chart-canvas {
    width: 100%;
    height: 100%;
}
</style>

