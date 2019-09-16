export default {
	datetimerangeField1: {
		type: 'form',
		resource: {
			fields: {
				datetimerangeFieldA: {
					type: 'datetimerange',
					label: '日期时间',
					props: {
						placeholder: '请选择日期时间'
					}
				},
				datetimerangeFieldB: {
					type: 'datetimerange',
					label: '带默认值',
					default: '1547568120000,1551290400000',
					props: {
						placeholder: '请选择日期时间'
					}
				},
				datetimerangeFieldC: {
					type: 'datetimerange',
					label: '纯展示',
					default: '1547568120000,1551290400000',
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	}
};
