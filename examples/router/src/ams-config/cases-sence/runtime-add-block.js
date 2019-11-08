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
                type: 'list',
                resource: {
                    fields: {
                        a: {
                            type: 'text',
                            label: '文本'
                        }
                    }
                },
                operations: {
                    testNewInput1: {
                        slot: 'searchs',
                        type: 'field',
                        field: {
                            type: 'text'
                        }
                    },
                    testNewInput2: {
                        slot: 'rightTop',
                        type: 'field',
                        field: {
                            type: 'text',
                            props: {
                                placeholder: '折'
                            },
                            style: {
                                width: '70px'
                            }
                        }
                    }
                },
                actions: {
                    fieldChange(args) {
                        // this.setBlockData({
                        //     testTextarea: 'b2'
                        // });
                        console.log('fieldChange', args);
                    }
                }
            });
            this.block.blocks.push(blockId);
        }
    }
});
