import ams from '@ams-team/ams';

const datas = {};

ams.block('image', {
    resources: {
        image: {
            fields: {
                image1: {
                    label: '默认图片上传',
                    type: 'image'
                },
                image2: {
                    label: '大小限制',
                    type: 'image',
                    tip: '只能不超过50kb的图片',
                    successUrlKey: 'url',
                    // check: { maxSizeInKB, imgMaxWidth, imgMaxHeight, imgMinWidth, imgMinHeight, imgWidth, imgHeight },
                    check: {
                        maxSizeInKB: 50
                    },
                    default: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    props: {
                        action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image',
                        'list-type': 'picture-card',
                        'file-list': [{
                            'name': 'food.jpeg',
                            'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }, {
                            'name': '精选美景图片',
                            'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }]
                    },
                    rules: [
                        {
                            required: true,
                            message: '请上传图片',
                            trigger: 'change'
                        }
                    ]
                },
                image4: {
                    label: '固定尺寸',
                    type: 'image',
                    tip: '640x640',
                    successUrlKey: 'url',
                    props: {
                        action:
                            'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image',
                        'file-list': [{
                            'name': 'food.jpeg',
                            'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }, {
                            'name': '精选美景图片',
                            'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }]
                    }
                },
                image6: {
                    label: '上传列表',
                    type: 'image',
                    tip: '640x640',
                    successUrlKey: 'url',
                    props: {
                        action:
                            'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image',
                        'list-type': 'picture-card',
                        'file-list': [{
                            'name': 'food.jpeg',
                            'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }, {
                            'name': '精选美景图片',
                            'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }]
                    }
                },
                image7: {
                    label: '上传列表',
                    type: 'image',
                    tip: '640x640',
                    successUrlKey: 'url',
                    props: {
                        action:
                            'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image',
                        'list-type': 'picture',
                        'file-list': [{
                            'name': 'food.jpeg',
                            'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }, {
                            'name': '精选美景图片',
                            'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }]
                    }
                },
                image3: {
                    label: '默认列表',
                    type: 'image',
                    tip: '范围640-640',
                    successUrlKey: 'url',
                    // check: { maxSizeInKB, imgMaxWidth, imgMaxHeight, imgMinWidth, imgMinHeight, imgWidth, imgHeight },
                    check: {
                        imgMaxWidth: 640,
                        imgMaxHeight: 640,
                        imgMinWidth: 640,
                        imgMinHeight: 640,
                    },
                    props: {
                        action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image',
                        'default-image-list': [{
                            'name': 'food.jpeg',
                            'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }, {
                            'name': '精选美景图片精选美景图片',
                            'url': 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                        }]
                    }
                },
                image5: {
                    label: '图片类型',
                    type: 'image',
                    tip: '只能上传png文件',
                    successUrlKey: 'url',
                    // check: { maxSizeInKB, imgMaxWidth, imgMaxHeight, imgMinWidth, imgMinHeight, imgWidth, imgHeight },
                    // check: {
                    //     imgWidth: 640,
                    //     imgHeight: 640
                    // },
                    props: {
                        accept: 'image/png',
                        action:
                            'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image'
                    }
                }
            }
        }
    },
    blocks: {
        editImage: {
            data: datas,
            type: 'form',
            resource: 'image',
            ctx: 'edit',
            style: {
                width: '50%'
            },
            events: {
                submit: '@validate @create'
            },
            operations: {
                submit: {
                    type: 'button',
                    label: '提交'
                }
            }
        },
        viewImage: {
            data: datas,
            type: 'form',
            resource: 'image',
            ctx: 'view',
            style: {
                width: '50%'
            }
        }
    }
});
