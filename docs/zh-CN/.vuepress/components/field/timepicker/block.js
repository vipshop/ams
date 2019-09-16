export default {
	timepickerField1: {
		type: 'form',
		resource: {
			fields: {
				timepickerFieldA: {
					type: 'timepicker',
					label: '时间',
					props: {
						placeholder: '请选择时间'
					}
				},
				timepickerFieldB: {
					type: 'timepicker',
					label: '带默认值',
					default: 1548404069000,
					props: {
						placeholder: '请选择时间'
					}
				},
				timepickerFieldC: {
					type: 'timepicker',
					label: '纯展示',
					default: 1548404069000,
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	}
};
