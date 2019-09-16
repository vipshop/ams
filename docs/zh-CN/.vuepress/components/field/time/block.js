export default {
	timeField1: {
		type: 'form',
		resource: {
			fields: {
				timeFieldA: {
					type: 'time',
					label: '时间',
					props: {
						placeholder: '请选择时间'
					}
				},
				timeFieldB: {
					type: 'time',
					label: '带默认值',
					default: '11:00',
					props: {
						placeholder: '请选择时间'
					}
				},
				timeFieldC: {
					type: 'time',
					label: '纯展示',
					default: '11:00',
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	}
};
