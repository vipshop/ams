export default {
	unionField1: {
		type: 'form',
		resource: {
			fields: {
				unionFieldA: {
					type: 'union',
					label: '联合',
					current: 'text',
					fields: {
						date: {
							type: 'timerange',
							label: '时间'
						},
						text: {
							type: 'text',
							label: '名称',
							default: '我是默认值'
						}
					}
				},
				unionFieldB: {
					type: 'union',
					label: '纯展示',
					current: 'colorField',
					ctx: 'view',
					fields: {
						date: {
							type: 'timerange',
							label: '时间',
							ctx: 'view',
						},
						colorField: {
							type: 'color',
							label: '颜色',
							default: '#f60',
							ctx: 'view',
						}
					}
				}
			}
		},
		ctx: 'edit'
	}
};
