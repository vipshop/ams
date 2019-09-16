export default {
	inputnumberField1: {
		type: 'form',
		resource: {
			fields: {
				inputnumberFieldA: {
					type: 'inputnumber',
					label: '计数器'
				},
				inputnumberFieldB: {
					type: 'inputnumber',
					label: '带默认值',
					default: 10
				},
				inputnumberFieldC: {
					type: 'inputnumber',
					label: '纯展示',
					default: 10,
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	}
};
