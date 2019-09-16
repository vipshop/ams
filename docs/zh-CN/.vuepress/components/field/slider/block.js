export default {
	sliderField1: {
		type: 'form',
		resource: {
			fields: {
				sliderFieldA: {
					type: 'slider',
					label: '滑块'
				},
				sliderFieldB: {
					type: 'slider',
					label: '带默认值',
					default: 10
				},
				sliderFieldC: {
					type: 'slider',
					label: '纯展示',
					default: 10,
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	}
};
