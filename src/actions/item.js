import { deepExtend, listRemoveItem } from '../utils';
import ams from '../ams';

// 当前调用的block名
let currentParentBlock;

const WRAP_BLOCK_NAME = '$amsWrapItemBlock';
const FROM_BLOCK_NAME = `${WRAP_BLOCK_NAME}From`;

/**
 * @param {object} blockConfig
 * @param {object} resource
 * @param {string} type 'add'|'edit'
 * @param {string} insertType 'dialog'|'after'
 */
export function commonHandlerItem({ blockConfig, type, resource, insertType, $prevReturn }) {
    return new Promise((resolve, reject) => {
        const $currentBlock = this;
        if (currentParentBlock) {
            let block = ams.blocks[currentParentBlock];
            if (block) {
                listRemoveItem(block.blocks, WRAP_BLOCK_NAME);
            }
        }
        blockConfig = deepExtend({
            type: insertType === 'dialog' ? 'dialog' : 'component',
            data: {
                title: type === 'add' ? '添加' : '修改'
            },
            options: {
                is: 'div'
            },
            props: {
                id: WRAP_BLOCK_NAME
            },
            style: {
                padding: insertType === 'dialog' ? '0' : '20px 0'
            },
            events: {
                cancel: '@hide @remove',
                submit: `@${FROM_BLOCK_NAME}.validate @${FROM_BLOCK_NAME}.${type === 'add' ? 'create' : 'update'} @${currentParentBlock}.list @hide @remove`
            },
            actions: {
                remove() {
                    console.log('remove');
                    listRemoveItem($currentBlock.block.blocks, WRAP_BLOCK_NAME);
                    resolve();
                }
            },
            blocks: {
                [FROM_BLOCK_NAME]: {
                    type: 'form',
                    ctx: 'edit',
                    resource: resource || this.resource,
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
                    label: type === 'add' ? '添加' : '修改',
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

export async function editItemAfter(params) {
    await commonHandlerItem.call(this, { type: 'edit', insertType: 'after', ...params });
}

export async function editItemDialog(params) {
    await commonHandlerItem.call(this, { type: 'edit', insertType: 'dialog', ...params });
}
