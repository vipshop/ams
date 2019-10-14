export default {
    ctx: 'view',
    type: 'image-label',
    options: {
        title: '标题文本标题'
    },
    data: {
        imgList: [
            'http://gd6-inner-vos.tools.vip.com/fcms/15526374516601.png',
            'http://gd6-inner-vos.tools.vip.com/fcms/15526374516601.png',
            'http://gd6-inner-vos.tools.vip.com/fcms/15526374516601.png',
            'http://gd6-inner-vos.tools.vip.com/fcms/15526374516601.png',
        ],
        imgTipComList: [
            {
                top: 20,
                left: 20,
                width: 50,
                height: 50,
                text: '你好'
            }
        ]
    },
    operations: {
        button: {
            type: 'button',
            label: 'xx'
        }
    }
};
