export default {
	progressField1: {
		type: 'form',
		resource: {
			fields: {
				progressFieldA: {
					type: 'progress',
					label: '进度'
				},
				progressFieldB: {
					type: 'progress',
					label: '带默认值',
					default: 10
				},
				progressFieldC: {
					type: 'progress',
					label: '纯展示',
					default: 10,
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	}
};
