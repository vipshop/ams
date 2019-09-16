export default {
	datetimeField1: {
		type: 'form',
		resource: {
			fields: {
				datetimeFieldA: {
					type: 'datetime',
					label: '日期时间',
					props: {
						placeholder: '请选择日期时间'
					}
				},
				datetimeFieldB: {
					type: 'datetime',
					label: '带默认值',
					default: 1546272000000,
					props: {
						placeholder: '请选择日期时间'
					}
				},
				datetimeFieldC: {
					type: 'datetime',
					label: '纯展示',
					default: 1546272000000,
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	}
};
