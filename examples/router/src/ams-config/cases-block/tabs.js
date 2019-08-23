import ams from '@ams-team/ams';

ams.block('tabs', {
    'type': 'tabs',
    'options': {
        'tabs-tab1': 'tab1标题',
        'tabs-tab2': {
            label: 'tab2延迟加载',
            lazy: true,
            closable: true
        },
        'tabs-tab3': {
            label: 'tab3不可点',
            disabled: true
        }
    },
    on: {
        'tab-remove': function() {
            alert('你点击了关闭');
        }
    },
    'blocks': {
        'tabs-tab1': {
            'type': 'component',
            'options': {
                'is': 'div',
                'text': '我是tabs1的内容'
            },
            'style': {
                'padding': '100px'
            }
        },
        'tabs-tab2': {
            'type': 'component',
            'options': {
                'is': 'div',
                'text': '我是tabs2的内容'
            },
            'style': {
                'padding': '100px'
            }
        },
        'tabs-tab3': {
            'type': 'component',
            'options': {
                'is': 'div',
                'text': '我是tabs3的内容'
            },
            'style': {
                'padding': '100px'
            }
        }
    },
    'operations': {
        'hide': {
            'type': 'icon',
            'label': '关闭',
            'props': {
                'class': 'el-icon-close'
            }
        }
    }
});
