export default {
	timerangeField1: {
		type: 'form',
		resource: {
			fields: {
				timerangeFieldA: {
					type: 'timerange',
					label: '时间',
					props: {
						placeholder: '请选择时间'
					}
				},
				timerangeFieldB: {
					type: 'timerange',
					label: '带默认值',
					default: '1548413724000,1548417324000',
					props: {
						placeholder: '请选择时间'
					}
				},
				timerangeFieldC: {
					type: 'timerange',
					label: '纯展示',
					default: '1548413724000,1548417324000',
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	}
};
