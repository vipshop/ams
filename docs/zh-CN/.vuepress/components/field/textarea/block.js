export default {
	textareaField1: {
		type: 'form',
		resource: {
			fields: {
				textareaFieldA: {
					type: 'textarea',
					label: '文本域',
					props: {
						placeholder: '请输入文本'
					}
				},
				textareaFieldB: {
					type: 'textarea',
					label: '必填',
					props: {
						placeholder: '请输入文本'
					},
					rules: [{
                        required: true,
                        message: '请输入文本',
                        trigger: 'blur'
                    }]
				}
			}
		},
		ctx: 'edit'
	},
	textareaField2: {
		type: 'form',
		resource: {
			fields: {
				textareaFieldA: {
					type: 'textarea',
					label: '编辑状态',
					props: {
						placeholder: '请输入文本'
					},
					collapseLimit: 15
				},
				textareaFieldB: {
					type: 'textarea',
					label: '超出隐藏',
					props: {
						placeholder: '请输入文本'
					},
					collapseLimit: 15,
					ctx: 'view'
				}
			}
		},
		data: {
			textareaFieldA: 'AMS 是 Admin Materials System 的首字母缩写，意为管理后台物料系统，是通过JSON配置的形式来快速搭建管理后台的一整套解决方案。',
			textareaFieldB: 'AMS 是 Admin Materials System 的首字母缩写，意为管理后台物料系统，是通过JSON配置的形式来快速搭建管理后台的一整套解决方案。'
		},
		ctx: 'edit'
	}
};
