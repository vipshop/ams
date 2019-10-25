export default {
    ctx: 'view',
    type: 'image-label',
    options: {
        title: '标题文本标题'
    },
    data: {
        imgList: [
            'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
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
