export default {
    type: 'drag-image',
    options: {
        // 图片地址
        url: 'http://static.699pic.com/best_album/25.jpg',
        // 图片宽度
        width: 400,
        // 图片高度
        height: 200,
        // imgWidth: '400px',
        // 裁剪宽度
        cutWidth: 300,
        // 裁剪位置
        left: 50,
        // 裁剪框展示
        showFrame: true,
        // 拖动速度
        ratio: 0.5,
        // frame内容
        frameHtml: '<div style="width: 50px; height: 50px; margin: 50px auto; background: #000">test</div>'
    },
    blocks: {
        changeBlock: {
            type: 'component',
            style: {
                marginTop: '20px'
            },
            operations: {
                change: {
                    type: 'button',
                    label: '改变frameHtml',
                    props: {
                        type: 'primary'
                    }
                }
            },
            actions: {
                change() {
                    ams.$blocks.default.block.options.frameHtml = '<div style="width: 50px; height: 50px; margin: 50px auto; background: #000">hello</div>';
                }
            }
        }
    }
};
