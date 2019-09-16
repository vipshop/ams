export default {
	textField1: {
		type: 'form',
		resource: {
			fields: {
				textField: {
					type: 'text',
					label: '文本',
					props: {
						placeholder: '请输入内容'
					}
				}
			}
		},
		ctx: 'edit'
	},
	textField2: {
		type: 'form',
		resource: {
			fields: {
				textField: {
					type: 'text',
					label: '文本',
					props: {
						placeholder: '请输入内容',
						disabled: true
					}
				}
			}
		},
		ctx: 'edit'
	},
	textField3: {
		type: 'form',
		resource: {
			fields: {
				textField: {
					type: 'text',
					label: '文本',
					props: {
						placeholder: '请输入内容',
						clearble: true
					}
				}
			}
		},
		data: {
			textField: '鼠标经过，左边会出现清空按钮'
		},
		ctx: 'edit'
	},
	textField4: {
		type: 'form',
		resource: {
			fields: {
				textFieldA: {
					type: 'text',
					label: '文本',
					props: {
						placeholder: '请输入内容',
						'prefix-icon': 'el-icon-search'
					}
				},
				textFieldB: {
					type: 'text',
					label: '文本',
					props: {
						placeholder: '请输入内容',
						'suffix-icon': 'el-icon-service'
					}
				}
			}
		},
		ctx: 'edit',
		style: {
			width: '50%'
		}
	},
	textField5: {
		type: 'form',
		resource: {
			fields: {
				textField: {
					type: 'text',
					label: '文本',
					rules: [
						{ required: true, message: '请输入活动名称', trigger: 'blur' },
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					props: {
						placeholder: '请输入内容'
					}
				}
			}
		},
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
	}
};
