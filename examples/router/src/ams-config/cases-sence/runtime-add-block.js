import ams from '@ams-team/ams';

let currentId = 1;
ams.block('runtime-add-block', {
    type: 'form',
    operations: {
        addBlock: {
            type: 'button',
            label: '动态增加block'
        }
    },
    blocks: {
        run1: {
            type: 'error'
        }
    },
    actions: {
        addBlock() {
            console.log(this.block.blocks);
            const blockId = `run${++currentId}`;
            ams.block(blockId, {
                type: 'error'
            });
            this.block.blocks.push(blockId);
        }
    }
});
