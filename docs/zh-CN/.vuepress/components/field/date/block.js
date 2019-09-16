export default {
	dateField1: {
		type: 'form',
		resource: {
			fields: {
				dateFieldA: {
					type: 'date',
					label: '日期',
					props: {
						placeholder: '请选择日期'
					}
				},
				dateFieldB: {
					type: 'date',
					label: '带默认值',
					default: 1546272000000,
					props: {
						placeholder: '请选择日期'
					}
				},
				dateFieldC: {
					type: 'date',
					label: '纯展示',
					default: 1546272000000,
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	}
};
