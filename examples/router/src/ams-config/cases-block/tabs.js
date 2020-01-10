import ams from '@ams-team/ams';
const fromBlock = {
    ctx: 'edit',
    type: 'form',
    resource: {
        fields: {
            text: {
                label: '新文本',
                type: 'text'
            },
            date: {
                type: 'date',
                label: '日期'
            },
            password: {
                type: 'password',
                label: '密码'
            }
        }
    }
};
ams.block('tabs', {
    type: 'tabs',
    props: {
        editable: true
    },
    options: {
        'tabs-tab1': '<i class="el-icon-date"></i> tab1标题',
        'tabs-tab2': {
            label: '<i class="el-icon-date"></i> tab2延迟加载',
            lazy: true,
            closable: true
        },
        'tabs-tab3': {
            label: 'tab3不可点',
            disabled: true
        }
    },
    data: {
        // 新增tab计数
        tabIndex: '3',
        // 指定当前tab的位置
        active: 'tabs-tab2'
    },
    on: {
        'edit': function(targetName, action) {
            if (action === 'add') {
                let newTabName = `tabs-tab${++this.data.tabIndex}`;
                ams.block(newTabName, fromBlock);

                this.block.blocks.push(newTabName);
                this.block.options[newTabName] = {
                    label: newTabName
                };
                this.data.active = newTabName;
            }
        },
        'tab-remove': function() {
            alert('你点击了关闭');
        }
    },
    blocks: {
        'tabs-tab1': {
            type: 'component',
            style: {
                padding: '100px'
            },
            options: {
                is: 'div',
                text: '我是tabs1的内容'
            }
        },
        'tabs-tab2': {
            type: 'component',
            style: {
                padding: '100px'
            },
            options: {
                is: 'div',
                text: '我是tabs2的内容'
            }
        },
        'tabs-tab3': {
            type: 'component',
            style: {
                padding: '100px'
            },
            options: {
                is: 'div',
                text: '我是tabs3的内容'
            }
        }
    },
    operations: {
        hide: {
            type: 'icon',
            label: '关闭',
            props: {
                class: 'el-icon-close'
            }
        }
    }
});
