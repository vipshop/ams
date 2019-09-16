export default {
	passwordField1: {
		type: 'form',
		resource: {
			fields: {
				passwordField: {
					type: 'password',
					label: '密码',
					props: {
						placeholder: '请输入密码'
					}
				}
			}
		},
		ctx: 'edit'
	},
	passwordField2: {
		type: 'form',
		resource: {
			fields: {
				passwordField: {
					type: 'password',
					label: '密码',
					props: {
						placeholder: '请输入密码'
					}
				}
			}
		},
		data: {
			passwordField: '123456'
		},
		ctx: 'view'
	}
};
