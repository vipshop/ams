export default {
	arrayField1: {
		type: 'form',
		resource: {
			fields: {
				arrayFieldA: {
					type: 'array',
					label: '数组',
					field: {
						type: 'text',
						label: 'text'
					}
				},
				arrayFieldB: {
					type: 'array',
					label: '带默认值',
					default: ['1', '2'],
					field: {
						type: 'text',
						label: '元素'
					}
				},
				arrayFieldC: {
					type: 'array',
					label: '纯展示',
					default: ['唯品会', '京东'],
					field: {
						type: 'text',
						label: '公司',
						ctx: 'view'
					},
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	},
	arrayField2: {
		type: 'form',
		resource: {
			fields: {
				arrayFieldA: {
					type: 'array',
					label: '地址',
					field: {
						type: 'array',
						label: '省份',
						field: {
							type: 'text',
							label: '市区'
						}
					}
				},
				arrayFieldB: {
					type: 'array',
					label: '带默认值',
					default: [['广州', '深圳'], ['北京']],
					field: {
						type: 'array',
						label: '省份',
						field: {
							type: 'text',
							label: '市区'
						}
					}
				},
				arrayFieldC: {
					type: 'array',
					label: '纯展示',
					default: [['广州', '深圳'], ['北京']],
					field: {
						type: 'array',
						label: '省份',
						field: {
							type: 'text',
							label: '市区',
							ctx: 'view'
						},
						ctx: 'view'
					},
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	}
};
