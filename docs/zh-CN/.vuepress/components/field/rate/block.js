export default {
	rateField1: {
		type: 'form',
		resource: {
			fields: {
				rateFieldA: {
					type: 'rate',
					label: '评分'
				},
				rateFieldB: {
					type: 'rate',
					label: '带默认值',
					default: '2.5'
				},
				rateFieldC: {
					type: 'rate',
					label: '纯展示',
					default: '2.5',
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	}
};
