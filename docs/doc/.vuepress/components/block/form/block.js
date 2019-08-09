import { fieldDefaultValue } from '../../config'

const blockConfig = {
    blocks: {
        formEditAll: {
            type: 'form',
            resource: 'form',
            ctx: 'edit',
            data: Object.assign({}, fieldDefaultValue), // 提供字段数据初始化值
            events: {
                init: '@console',
                submit: '@validate @confirm:确认提交吗? @update',
                cancel: '@cancel'
            },
            actions: {
                fieldChange({ name, value }) {
                    if (name === 'testSwitch') {
                        this.block.fields.testPassword.props.disabled = !value
                    }
                },
                cancel() {
                    this.$router.back()
                },
                console() {
                    console.log('@console action', this.data.id)
                }
            },
            layout: {
                time: ['time', 'datetime'],
                datetime: false
            },
            fields: {
                datetime: {
                    label: ''
                },
                text: {
                    label: '新文本',
                    props: {
                        disabled: false
                    }
                },
                password: {
                    props: {
                        disabled: true
                    }
                },
                // 字段隐藏
                textarea: false
            },
            operations: {
                submit: {
                    type: 'button',
                    label: '提交',
                    props: {
                        type: 'primary'
                    }
                },
                cancel: {
                    type: 'button',
                    label: '取消'
                }
            },
            blocks: {
                title1: {
                    type: 'title',
                    options: {
                        title: '主标题',
                        subTitle: '副标题'
                    },
                    style: {
                        marginLeft: '50px',
                        marginBottom: '40px'
                    },
                    slot: 'field:time'
                }
            }
        },
        formViewAll: {
            type: 'form',
            resource: 'form',
            ctx: 'view',
            data: Object.assign({}, fieldDefaultValue), // 提供字段数据初始化值
            events: {
                init: '@console'
            },
            actions: {
                console() {
                    console.log('@console action', this.data.id)
                }
            }
        }
    }
}

export default blockConfig
