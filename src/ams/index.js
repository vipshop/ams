/* eslint-disable complexity,no-new,max-depth */

import Vue from 'vue';
import initRequest from './request';
import initConfig from './config';

let amsRootId = 0;

const ams = {
    // 特殊参数、保存上一次action的返回值
    $prevReturn: '',
    /**
     * 属性
     */

    // 全局默认actios
    actions: {},
    // 扁平的blocks结构
    blocks: {},
    // blocks的vue对象引用、会根据vue生命周期自动注册卸载
    // 添加场景：src/ams/mixins/block-mixin.js -> initBlock -> ams.$blocks[this.name] = this;
    // 删除场景：src/ams/mixins/block-mixin.js -> destroyed -> delete ams.$blocks[this.name];
    $blocks: {},
    resources: {},
    bus: null,
    $router: null,

    /**
     * 方法
     */
    _setBlocks(blockConfig) {
        let blocks = blockConfig.blocks;
        const arr = [];
        Object.keys(blocks).forEach(blockId => {
            let subBlockConfig = blocks[blockId];
            this.block(blockId, subBlockConfig);
            // slot 插槽，无slot block为默认子blocks
            if (subBlockConfig.slot) {
                if (!blockConfig.slotBlocks[subBlockConfig.slot]) {
                    blockConfig.slotBlocks[subBlockConfig.slot] = [];
                }
                blockConfig.slotBlocks[subBlockConfig.slot].push(blockId);
            } else {
                arr.push(blockId);
            }
        });
        blockConfig.blocks = arr;
    },
    action(name, action) {
        if (this.actions[name]) {
            return console.warn('重复注册action：', name);
        }
        this.actions[name] = action;
    },
    /**
     * 注册资源
     * 文档：https://vipshop.github.io/ams/api/resource.html#%E6%B3%A8%E5%86%8C%E8%B5%84%E6%BA%90
     * 用法：ams.resource(name, resource)
     * @param {String} name
     * @param {Object} resourceConfig
     */
    resource(name, resourceConfig) {
        // 合并BASE简化配置
        if (resourceConfig) {
            resourceConfig = this.deepCloneConfig(resourceConfig);
            // console.log(name, resource);
            resourceConfig.api = resourceConfig.api || {};
            resourceConfig.key = resourceConfig.key || 'id';
            if (name) {
                this.resources[name] = resourceConfig;
            }
        }
        return resourceConfig;
    },
    // 封装同步和异步block
    async getBlock(name) {
        let block = ams.blocks[name];
        if (!block) {
            console.warn(`ams Err: can not find block: ${name}, please run ams.block() first`);
        }
        if (typeof block === 'function') {
            block = await block();
            if (block) {
                delete ams.blocks[name];
                ams.block(name, block);
            }
        }
        return ams.blocks[name];
    },
    /**
     * 注册 block
     * 文档：https://vipshop.github.io/ams/api/block.html
     * 用法：ams.block(name, blockConfig)
     *
     * @param {String}} name
     * @param {Object} blockConfig
     *
     */
    block(name, blockConfig) {
        if (this.blocks[name]) {
            console.warn('重复注册block：', name);
        }
        // 异步函数通过函数包装，延迟初始化
        if (typeof blockConfig === 'function') {
            this.blocks[name] = blockConfig;
            return;
        }
        // 合并BASE简化配置
        blockConfig = this.deepCloneConfig(blockConfig);
        // 初始化props
        blockConfig.props = {
            ...ams.configs.defaultBlockProps[blockConfig.type],
            ...blockConfig.props
        };
        // 通用配置
        blockConfig.options = blockConfig.options || {};
        // 注册resources
        if (blockConfig.resources) {
            Object.keys(blockConfig.resources).forEach(key =>
                this.resource(key, blockConfig.resources[key])
            );
        }
        // 合并全局config
        if (blockConfig.config) {
            this.config(blockConfig.config);
            delete blockConfig.config;
        }
        blockConfig.slotBlocks = blockConfig.slotBlocks || {};
        // 拉平block结构，换成名字引用
        if (blockConfig.blocks && !Array.isArray(blockConfig.blocks)) {
            this._setBlocks(blockConfig);
        }
        // 初始化data
        blockConfig.data = {
            ...ams.configs.defaultBlockDatas[blockConfig.type],
            ...blockConfig.data
        };
        // 初始化events
        blockConfig.events = blockConfig.events || {};
        // 初始化actions
        blockConfig.actions = blockConfig.actions || {};
        // 初始化列表参数
        if (this.configs.baseBlockType[blockConfig.type] === 'list') {
            const {
                pageSize = (blockConfig.pageSize || 20),
                pageSizes = [10, 20, 30, 40, 50, 100],
                layout = 'total, prev, sizes, pager, next, jumper',
                page = 1,
                total = 0,
                list = []
            } = blockConfig.data;
            blockConfig.data.pageSize = pageSize;
            blockConfig.data.pageSizes = pageSizes;
            blockConfig.data.layout = layout;
            blockConfig.data.page = page;
            blockConfig.data.total = total;
            blockConfig.data.list = list;
            // 列表默认值
            blockConfig.sorts = blockConfig.sorts || {};
            blockConfig.filters = blockConfig.filters || {};
            if (blockConfig.searchs || blockConfig.searchsOptions) {
                // !!!!! 搜索配置兼容旧版本及废弃提示 !!!!!
                console.warn('列表的searchs和searchsOptions已在ams@0.6.0+废弃，请使用 slot operations 替代，如：  \nsearchs:{testText:true} 修改为\noperations: { testText: {type: "field", field: "testText", slot: "searchs"} }');
            }
        } else if (blockConfig.type === 'dialog' || blockConfig.type === 'drawer') {
            // 初始化dialog
            blockConfig.data.visible = !!blockConfig.data.visible;
        }

        this.blocks[name] = blockConfig;

        // render
        if (blockConfig.render) {
            this.render(name, blockConfig.render);
        }
    },

    render(name, el) {
        if (el === true || !el || (typeof el === 'string' && !document.querySelector(el))) {
            el = document.createElement('div');
            el.id = `ams-root-${++amsRootId}`;
            document.body.appendChild(el);
        }
        const block = ams.blocks[name];
        if (block) {
            new Vue({
                el,
                template: `<ams-block name="${name}" />`
            });
        } else {
            console.warn('未注册block：', name);
        }
    },

    /**
     * Register a listener on Nova's built-in event bus
     */
    $on(...args) {
        this.bus.$on(...args);
    },

    /**
     * Register a one-time listener on the event bus
     */
    $once(...args) {
        this.bus.$once(...args);
    },

    /**
     * De-register a listener on the event bus
     */
    $off(...args) {
        this.bus.$off(...args);
    },

    /**
     * Emit an event on the event bus
     */
    $emit(...args) {
        this.bus.$emit(...args);
    },

    /**
     * 调用action
     *
     * @param {String} maybeMultipleActionStr '@addDialog.show @clear @hide'
     * @param {Object} args
     */
    async callAction(maybeMultipleActionStr = '', args = {}) {
        if (!maybeMultipleActionStr.trim()) return;
        /**
         *
         * actionName: '@list' -> ['@list']
         * \s是指空白，包括空格、换行、tab缩进等所有的空白
         * split(/\s+/) 简单理解：split('空白字符<主要是空格>'):
         *
         * eg:
         * 'a b c'.split(/\s+/)    -> ['a', 'b', 'c']
         * @addDialog.show @clear' -> ['@adminDialog.show', '@clear']
         *
         */
        const maybeMultipleActionStrArr = maybeMultipleActionStr.split(/\s+/);
        for (let i = 0; i < maybeMultipleActionStrArr.length; i++) {
            let actionStr = maybeMultipleActionStrArr[i];
            if (actionStr) {
                /**
                 * 举例几种场景的处理：
                 *
                 * #1
                 * actionStr: "@list"
                 * actionDetail: ["@list", "@", undefined, "list", undefined, index: 0, input: "@list", groups: undefined]
                 *
                 * #2
                 * actionStr: "addDialogForm.submit"
                 * -> actionDetail: ["addDialogForm.submit", undefined, "addDialogForm", "submit", undefined, index: 0, input: "addDialogForm.submit", groups: undefined]
                 *
                 * #3
                 * actionStr: "@addDialogForm.submit"
                 * -> actionDetail: ["addDialogForm.submit", "@", "addDialogForm", "submit", undefined, index: 0, input: "addDialogForm.submit", groups: undefined]
                 *
                 * 理解正则
                 * https://regexper.com/#%2F%5E%28%40%29%3F%28%3F%3A%28.*%3F%29%5C.%29%3F%28.*%3F%29%28%3F%3A%3A%28.*%29%29%3F%24%2F
                 */

                // actionDetail action字符串的组成
                let actionDetail = /^(@)?(?:(.*?)\.)?(.*?)(?::(.*))?$/.exec(actionStr);
                // eslint-disable-next-line no-unused-vars
                const [rawString, at, blockName, actionName, argument] = actionDetail;

                if (actionDetail) {
                    const target = blockName ? ams.$blocks[blockName] : this;
                    // args标准参数，如event配置为 @block.action:arg1,arg2，参数为args1,arg2的字符串
                    // 先取argument, argument为手动输入优先级应该高于从上一个action传递下来的args.$arg
                    args.$arg = argument || args.$arg || '';
                    args.$context = this;
                    args.$prevReturn = ams.$prevReturn;

                    // 事件 event
                    if (!at) {
                        if (target && target.emitEvent) {
                            // /ams/src/ams/mixins/block-mixin.js
                            await target.emitEvent(actionName, args);
                        }
                        // action
                    } else {
                        if (target) {
                            const action = (target.block && target.block.actions && target.block.actions[actionName]) || ams.actions[actionName];
                            if (action) {
                                let result = await action.call(
                                    target,
                                    args
                                );

                                // 保存当前结果，下一个action的args.$prevReturn用来取值
                                if (result) {
                                    // 只有需要显式return数据的场景才记录$prevReturn，方便控制需要关心的$prevReturn参数传递
                                    ams.$prevReturn = result;
                                }
                            }
                        }
                    }
                }
            }
        }
        return ams.$prevReturn;
    }
};

// 初始化request相关
initRequest(ams);
// 初始化config相关
initConfig(ams);

export default ams;
