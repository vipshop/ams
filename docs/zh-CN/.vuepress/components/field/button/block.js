export default {
	buttonField1: {
        ctx: 'edit',
		type: 'form',
		resource: {
			fields: {
                text: {
                    type: 'text',
                    label: '输入',
                    props: {
                        inline: true
                    }
                },
                buttonA: {
                    type: 'button',
                    // label: '按钮',
                    labelWidth: '0',
                    tooltip: '点击触发事件',
                    props: {
                        text: '点击',
                        inline: true,
                        type: 'primary'
                    },
                    event: 'pop:xxx'
                }
			}
		},
        actions: {
            pop({ $arg }) {
                this.$alert('你输入了：'+ $arg)
            }
        }
	}
};
