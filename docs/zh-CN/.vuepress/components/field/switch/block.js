export default {
	switchField1: {
		type: 'form',
		resource: {
			fields: {
				switchFieldA: {
					type: 'switch',
					label: '开关',
					default: 1
				},
				switchFieldB: {
					type: 'switch',
					label: '禁用',
					props: {
						disabled: true
					}
				}
			}
		},
		ctx: 'edit'
	},
	switchField2: {
		type: 'form',
		resource: {
			fields: {
				switchFieldB: {
					type: 'switch',
					labelWidth: '0',
					props: {
						'active-text': '按月付费',
						'inactive-text': '按年付费'
					}
				}
			}
		},
		ctx: 'edit'
	},
	switchField3: {
		type: 'form',
		resource: {
			fields: {
				switchFieldB: {
					type: 'switch',
					labelWidth: '0',
					props: {
						'active-color': '#13ce66',
						'inactive-color': '#ff4949',
						'active-value': '100',
						'inactive-value': '0'
					}
				}
			}
		},
		ctx: 'edit'
	}
};
