import ams from '@ams-team/ams';

ams.block('dragimage', {
    blocks: {
        scheduleBlock: {
            type: 'drag-image',
            ctx: 'view',
            options: {
                url: 'http://c.vpimg1.com/upcb/2019/09/17/172/ias_156871245334665.jpg',
                width: 712, // 底图宽度
                height: 340, // 底图高度
                cutWidth: 300, // 需要裁剪的尺寸宽度
                left: 100, // 需要裁剪的区域离左边距离
                ratio: 0.04 // 移动速度
            },
            on: {
                getFrameLeft(arg) {
                    // 获取需要裁剪的区域离左边距离
                    console.log(arg);
                }
            }
        }
    }
});
