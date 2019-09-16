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
    $blocks: {},
    resources: {},
    bus: null,
    $router: null,

    /**
     * 方法
     */
    _setBlocks(block) {
        let blocks = block.blocks;
        const arr = [];
        Object.keys(blocks).forEach(blockId => {
            let subBlock = blocks[blockId];
            this.block(blockId, subBlock);
            // slot 插槽，无slot block为默认子blocks
            if (subBlock.slot) {
                if (!block.slotBlocks[subBlock.slot]) {
                    block.slotBlocks[subBlock.slot] = [];
                }
                block.slotBlocks[subBlock.slot].push(blockId);
            } else {
                arr.push(blockId);
            }
        });
        block.blocks = arr;
    },
    action(name, action) {
        if (this.actions[name]) {
            return console.warn('重复注册action：', name);
        }
        this.actions[name] = action;
    },
    resource(name, resource) {
        // 合并BASE简化配置
        if (resource) {
            resource = this.deepCloneConfig(resource);
            // console.log(name, resource);
            resource.api = resource.api || {};
            resource.key = resource.key || 'id';
            if (name) {
                this.resources[name] = resource;
            }
        }
        return resource;
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
    block(name, block) {
        if (this.blocks[name]) {
            console.warn('重复注册block：', name);
        }
        // 异步函数通过函数包装，延迟初始化
        if (typeof block === 'function') {
            this.blocks[name] = block;
            return;
        }
        // 合并BASE简化配置
        block = this.deepCloneConfig(block);
        // 初始化props
        block.props = {
            ...ams.configs.defaultBlockProps[block.type],
            ...block.props
        };
        // 通用配置
        block.options = block.options || {};
        // 注册resources
        if (block.resources) {
            Object.keys(block.resources).forEach(key =>
                this.resource(key, block.resources[key])
            );
        }
        // 合并全局config
        if (block.config) {
            this.config(block.config);
            delete block.config;
        }
        block.slotBlocks = block.slotBlocks || {};
        // 拉平block结构，换成名字引用
        if (block.blocks && !Array.isArray(block.blocks)) {
            this._setBlocks(block);
        }
        // 初始化data
        block.data = block.data || {};
        // 初始化events
        block.events = block.events || {};
        // 初始化actions
        block.actions = block.actions || {};
        // 初始化列表参数
        if (this.configs.baseBlockType[block.type] === 'list') {
            block.data.pageSize = block.data.pageSize || block.pageSize || 20;
            block.data.pageSizes = block.data.pageSizes || [10, 20, 30, 40, 50, 100];
            block.data.page = block.data.page || 1;
            block.data.total = block.data.total || 0;
            block.data.list = block.data.list || [];
            // 列表默认值
            block.sorts = block.sorts || {};
            block.filters = block.filters || {};
            if (block.searchs || block.searchsOptions) {
                // !!!!! 搜索配置兼容旧版本及废弃提示 !!!!!
                console.warn('列表的searchs和searchsOptions已在ams@0.6.0+废弃，请使用 slot operations 替代，如：  \nsearchs:{testText:true} 修改为\noperations: { testText: {type: "field", field: "testText", slot: "searchs"} }\n详情请参考：https://vipshop.github.io/ams/api/operation.html');
            }
        } else if (block.type === 'dialog') {
            // 初始化dialog
            block.data.visible = !!block.data.visible;
        }

        this.blocks[name] = block;

        // render
        if (block.render) {
            this.render(name, block.render);
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
     *
     * @param {调用action} acitonName
     * @param {*} args
     */
    async callAction(acitonName = '', args = {}) {
        const actionNames = acitonName.split(/\s+/);
        for (let i = 0; i < actionNames.length; i++) {
            let name = actionNames[i];
            if (name) {
                let names = /^(@)?(?:(.*?)\.)?(.*?)(?::(.*))?$/.exec(name);
                if (names) {
                    name = names[3];
                    const target = names[2] ? ams.$blocks[names[2]] : this;
                    // args标准参数，如event配置为 @block.action:arg1,arg2，参数为args1,arg2的字符串
                    // 先取name[4], name[4]为手动输入优先级应该高于从上一个action传递下来的args.$arg
                    args.$arg = names[4] || args.$arg || '';
                    args.$context = this;
                    args.$prevReturn = ams.$prevReturn;

                    // 事件 event
                    if (!names[1]) {
                        if (target && target.emitEvent) {
                            await target.emitEvent(name, args);
                        }
                        // action
                    } else {
                        if (target) {
                            const action = (target.block && target.block.actions && target.block.actions[name]) || ams.actions[name];
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
