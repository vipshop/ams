import ams from '@ams-team/ams';

ams.block('dragimage-updown', {
    blocks: {
        dragImagePicUpDownBlock: {
            type: 'drag-image-up-down',
            ctx: 'view',
            options: {
                url: 'http://d.vpimg1.com/upcb/2019/11/14/158/ias_234c5f37ab34a15253340464c9ca0d7b.png',
                width: 768, // 底图宽度
                height: 368, // 底图高度
                cutHeight: 200, // 需要裁剪的尺寸高度
                imgHeight: '368px', // 图片展示宽度
                top: 10, // 需要裁剪的区域离上面距离
                ratio: 0.04, // 移动速度
                showFrame: true // 是否展示裁剪框
            }
        }
    }
});
