import ams from '@ams-team/ams';

ams.block('alert', {
    type: 'component',
    blocks: {
        alertBase: {
            type: 'title',
            options: {
                title: '基本用法'
            }
        },
        alertSuccess: {
            type: 'alert',
            props: {
                title: '成功提示的文案',
                type: 'success'
            }
        },
        alertInfo: {
            type: 'alert',
            props: {
                title: '消息提示的文案',
                type: 'info'
            }
        },
        alertWarning: {
            type: 'alert',
            props: {
                title: '警告提示的文案',
                type: 'warning'
            }
        },

        alertBasic: {
            type: 'title',
            options: {
                title: '主题'
            }
        },
        alertError: {
            type: 'alert',
            props: {
                title: '错误提示的文案',
                type: 'error'
            }
        },
        alertSuccessDark: {
            type: 'alert',
            props: {
                title: '成功提示的文案',
                type: 'success',
                effect: 'dark'
            }
        },
        alertInfoDark: {
            type: 'alert',
            props: {
                title: '消息提示的文案',
                type: 'info',
                effect: 'dark'
            }
        },
        alertWarningDark: {
            type: 'alert',
            props: {
                title: '警告提示的文案',
                type: 'warning',
                effect: 'dark'
            }
        },
        alertErrorDark: {
            type: 'alert',
            props: {
                title: '错误提示的文案',
                type: 'error',
                effect: 'dark'
            }
        },

        alertCustom: {
            type: 'title',
            options: {
                title: '自定义关闭按钮'
            }
        },
        alertErrorClosable: {
            type: 'alert',
            props: {
                title: '不可关闭的 alert',
                type: 'error',
                closable: false
            }
        },
        alertErrorCloseText: {
            type: 'alert',
            props: {
                title: '不可关闭的 alert',
                type: 'info',
                'close-text': '知道了'
            }
        },
        alertErrorCloseCallBack: {
            type: 'alert',
            props: {
                title: '设置了回调的alert',
                type: 'warning'
            },
            on: {
                close() {
                    console.log('hello');
                }
            }
        },

        alertShowIcon: {
            type: 'title',
            options: {
                title: '带有icon'
            }
        },
        alertSuccessShowIcon: {
            type: 'alert',
            props: {
                title: '成功提示的文案',
                type: 'success',
                'show-icon': true
            }
        },

        alertCenter: {
            type: 'title',
            options: {
                title: '文字居中'
            }
        },
        alertSuccessShowIconCenter: {
            type: 'alert',
            props: {
                title: '成功提示的文案',
                type: 'success',
                'show-icon': true,
                center: true
            }
        },

        alertDescription: {
            type: 'title',
            options: {
                title: '带有辅助性文字介绍'
            }
        },
        alertSuccessDescription: {
            type: 'alert',
            props: {
                title: '带辅助性文字介绍',
                type: 'success',
                description: '是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……'
            }
        },

        alertShowIconAndDesc: {
            type: 'title',
            options: {
                title: '带有 icon 和辅助性文字介绍'
            }
        },
        alertSuccessShowIconAndDesc: {
            type: 'alert',
            props: {
                title: '成功提示的文案',
                type: 'success',
                'show-icon': true,
                description: '文字说明文字说明文字说明文字说明文字说明文字说明'
            }
        }
    }
});
