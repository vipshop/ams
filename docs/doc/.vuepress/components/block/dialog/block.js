import { fieldDefaultValue } from '../../config'

const blockConfig = {
    blocks: {
        adminListView: {
            type: 'list',
            ctx: 'view',

            // 指定block使用的资源为上面声明的demo-res
            resource: 'dialog',

            events: {
                addItem: '@adminAddDialog.show'
            },
            operations: {
                addItem: {
                    type: 'button',
                    label: '弹窗添加',
                    props: {
                        type: 'primary'
                    }
                }
            },
            actions:{
                add({item}){
                    this.data.list.push(item);
                }
            },
            data: {
                list: [
                    {
                        text: "双11活动",
                        inputnumber: 3,
                        select: "a,b,c"
                    }
                ],
                total: 1
            }
        },
        adminAddDialog: {
            type: 'dialog',
            data: {
                title: '添加',
                visible: false
            },
            events: {
                submit: 'addDialogForm.submit'
            },
            actions: {},
            operations: {
                submit: {
                    type: 'button',
                    label: '提交',
                    props: {
                        type: 'primary'
                    }
                },
                hide: {
                    type: 'button',
                    label: '关闭'
                }
            },
            blocks: {
                addDialogForm: {
                    type: 'form',
                    resource: 'dialog',
                    ctx: 'edit',
                    events: {
                        submit: '@validate @add @adminAddDialog.hide @clear'
                    },
                    actions: {
                        add(){
                            this.callAction('@adminListView.add', {item: this.data})
                        },
                        clear() {
                            // 清空表单数据
                            this.data = {}
                        }
                    }
                }
            }
        }
    }
}

export default blockConfig
