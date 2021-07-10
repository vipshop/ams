import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('video', {
    resources: {
        video: {
            api: {
                prefix,
                create: 'create'
            },
            fields: {
                video1: {
                    label: '上传视频',
                    type: 'video'
                }
            }
        }
    },
    blocks: {
        videoEdit: {
            type: 'component',
            style: {
                width: '50%'
            },
            blocks: {
                videoEditTitle: {
                    type: 'title',
                    options: {
                        title: '视频编辑场景'
                    }
                },
                videoEditForm: {
                    type: 'form',
                    ctx: 'edit',
                    resource: 'video'
                }
            }
        },
        videoView: {
            type: 'component',
            style: {
                width: '50%'
            },
            blocks: {
                videoViewTitle: {
                    type: 'title',
                    options: {
                        title: '视频查看场景'
                    }
                },
                videoViewForm: {
                    type: 'form',
                    ctx: 'view',
                    resource: 'video',
                    fields: {
                        video1: {
                            default: 'https://vjs.zencdn.net/v/oceans.mp4',
                            props: {
                                isShowPlaybackRate: true
                            }
                        }
                    }
                }
            }
        }
    }
});
