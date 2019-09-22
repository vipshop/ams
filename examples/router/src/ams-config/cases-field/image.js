import ams from '@ams-team/ams';
import { prefix } from '@/utils';

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
                    check: {
                        maxSizeInKB: 50
                    },
                    default: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    props: {
                        action: `${prefix}upload-image`,
                        'list-type': 'picture-card',
                        'show-file-list': true,
                        'file-list': [{
                            'name': 'food.jpeg',
                            'url': 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                        }, {
                            'name': '精选美景图片',
                            'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }],
                        'preview-src-list': [
                            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                        ]
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
                        action: `${prefix}upload-image`,
                        'show-file-list': true,
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
                        action: `${prefix}upload-image`,
                        'list-type': 'picture-card',
                        'show-file-list': true,
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
                        action: `${prefix}upload-image`,
                        'list-type': 'picture',
                        'show-file-list': true,
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
                    props: {
                        action: `${prefix}upload-image`,
                        'default-image-list': []
                    }
                },
                image8: {
                    label: '默认列表',
                    type: 'image',
                    successUrlKey: 'url',
                    props: {
                        action: `${prefix}upload-image`,
                        'default-image-list': [{
                            'name': '精选',
                            'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }, {
                            'name': '',
                            'url': 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                        }]
                    }
                },
                image5: {
                    label: '图片类型',
                    type: 'image',
                    tip: '只能上传png文件',
                    successUrlKey: 'url',
                    props: {
                        accept: 'image/png',
                        action: `${prefix}upload-image`
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
