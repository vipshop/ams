import { deepExtend, listRemoveItem } from '../utils';
import ams from '../ams';

// 当前调用的block名
let currentParentBlock;

const WRAP_BLOCK_NAME = '$amsWrapItemBlock';
const FORM_BLOCK_NAME = `${WRAP_BLOCK_NAME}Form`;

const titleMap = {
    add: '添加',
    edit: '修改',
    view: '查看'
};

const formCtxMap = {
    view: 'view',
    edit: 'edit',
    add: 'edit'
};

/**
 * @param {object} blockConfig
 * @param {object} resource
 * @param {string} type 'add'|'edit'|'view'
 * @param {string} insertType 'dialog'|'after'
 */
export function commonHandlerItem({ blockConfig, type, resource, insertType, $prevReturn, operation }) {
    let { fields, formProps, dialogProps } = operation || {};

    return new Promise((resolve, reject) => {
        const $currentBlock = this;
        if (currentParentBlock) {
            let block = ams.blocks[currentParentBlock];
            if (block) {
                listRemoveItem(block.blocks, WRAP_BLOCK_NAME);
            }
        }
        blockConfig = deepExtend({
            type: ['dialog', 'drawer'].includes(insertType) ? insertType : 'component',
            data: {
                title: titleMap[type]
            },
            options: {
                is: 'div'
            },
            props: {
                id: WRAP_BLOCK_NAME,
                'append-to-body': true,
                ...dialogProps
            },
            style: {
                padding: ['dialog', 'drawer'].includes(insertType) ? '0' : '20px 0'
            },
            events: {
                cancel: '@hide @remove',
                submit: `@${FORM_BLOCK_NAME}.validate @${FORM_BLOCK_NAME}.${type === 'add' ? 'create' : 'update'} @${currentParentBlock}.list @hide @remove`
            },
            actions: {
                remove() {
                    listRemoveItem($currentBlock.block.blocks, WRAP_BLOCK_NAME);
                    resolve();
                }
            },
            blocks: {
                [FORM_BLOCK_NAME]: {
                    type: 'form',
                    ctx: formCtxMap[type],
                    resource: resource || this.resource,
                    fields,
                    props: formProps,
                    actions: {
                        init({ $prevReturn }) {
                            this.setBlockData($prevReturn);
                        }
                    }
                }
            },
            operations: {
                submit: {
                    type: 'button',
                    label: titleMap[type],
                    props: {
                        type: 'primary'
                    }
                },
                cancel: {
                    type: 'button',
                    label: '取消'
                }
            },
            on: {
                closed() {
                    console.log('closed');
                    listRemoveItem($currentBlock.block.blocks, WRAP_BLOCK_NAME);
                    resolve();
                }
            }
        }, blockConfig);

        // 查看模式，不需要弹窗下面的「修改/编辑」按钮，只需要取消按钮即可
        if (type === 'view') {
            delete blockConfig.operations.submit;
        }
        ams.block(WRAP_BLOCK_NAME, blockConfig);
        currentParentBlock = this.name;
        // 如果是同一个block触发删除旧弹窗后要通过setTimeout等待更新结束，否则不会成功更新
        setTimeout(() => {
            if (this.block.blocks) {
                this.block.blocks.push(WRAP_BLOCK_NAME);
            } else {
                // todo: this.$set?
                // this.block.blocks = [WRAP_BLOCK_NAME];
                this.$set(this.block, 'blocks', [WRAP_BLOCK_NAME]);
            }
            this.callAction(`@wait @${WRAP_BLOCK_NAME}.show`);
            setTimeout(() => {
                const ele = document.getElementById(WRAP_BLOCK_NAME);
                if (ele) {
                    ele.scrollIntoViewIfNeeded(false);
                }
            }, 0);
        }, 0);
    });
}

export async function addItemAfter(params) {
    await commonHandlerItem.call(this, { type: 'add', insertType: 'after', ...params });
}

export async function addItemDialog(params) {
    await commonHandlerItem.call(this, { type: 'add', insertType: 'dialog', ...params });
}

export async function addItemDrawer(params) {
    await commonHandlerItem.call(this, { type: 'add', insertType: 'drawer', ...params });
}

export async function editItemAfter(params) {
    await commonHandlerItem.call(this, { type: 'edit', insertType: 'after', ...params });
}

export async function editItemDialog(params) {
    await commonHandlerItem.call(this, { type: 'edit', insertType: 'dialog', ...params });
}
export async function editItemDrawer(params) {
    await commonHandlerItem.call(this, { type: 'edit', insertType: 'drawer', ...params });
}
export async function viewItemDialog(params) {
    await commonHandlerItem.call(this, { type: 'view', insertType: 'dialog', ...params });
}
export async function viewItemDrawer(params) {
    await commonHandlerItem.call(this, { type: 'view', insertType: 'drawer', ...params });
}
