import ams from '@ams-team/ams';

ams.block('drawer', {
    blocks: {
        'drawer1': {
            type: 'component',
            operations: {
                drawer1: {
                    type: 'button',
                    label: '示例1',
                    event: 'drawerPop.show'
                }
            }
        },
        'drawerPop': {
            type: 'drawer',
            data: {
                title: '普通示例1',
                visible: false
            }
        }
            
    }
});
