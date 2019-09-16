const options = {
	a: '黄金糕',
	b: '双皮奶',
	c: '蚵仔煎',
	d: '龙须面',
	e: '北京烤鸭'
}

export default {
	selectField1: {
		type: 'form',
		resource: {
			fields: {
				selectFieldA: {
					type: 'select',
					label: '下拉选择',
					props: {
						placeholder: '请选择',
						clearable: true,
						options: options
					}
				},
				selectFieldB: {
					type: 'select',
					label: '单选',
					props: {
						placeholder: '请选择',
						clearable: true,
						multiple: false,
						options: options
					}
				},
				selectFieldC: {
					type: 'select',
					label: '带默认值',
					default: 'a,c',
					props: {
						placeholder: '请选择',
						clearable: true,
						options: options
					}
				},
				selectFieldD: {
					type: 'select',
					label: '纯展示',
					default: 'a,c',
					props: {
						options: options
					},
					ctx: 'view'
				},
				selectFieldE: {
					type: 'select',
					label: '超出隐藏',
					default: 'a,c,d,e',
					props: {
						options: options
					},
					collapseLimit: 2,
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	}
};
