const options = [
	{
		value: 'zhinan',
		label: '指南',
		children: [
			{
				value: 'shejiyuanze',
				label: '设计原则',
				children: [
					{
						value: 'yizhi',
						label: '一致'
					},
					{
						value: 'fankui',
						label: '反馈'
					},
					{
						value: 'xiaolv',
						label: '效率'
					},
					{
						value: 'kekong',
						label: '可控'
					}
				]
			},
			{
				value: 'daohang',
				label: '导航',
				children: [
					{
						value: 'cexiangdaohang',
						label: '侧向导航'
					},
					{
						value: 'dingbudaohang',
						label: '顶部导航'
					}
				]
			}
		]
	}
]
export default {
	cascaderField1: {
		type: 'form',
		resource: {
			fields: {
				cascaderFieldA: {
					type: 'cascader',
					label: '默认',
					props: {
						options: options
					}
				},
				cascaderFieldB: {
					type: 'cascader',
					label: '带默认值',
					default: 'zhinan,shejiyuanze,yizhi',
					props: {
						options: options
					}
				},
				cascaderFieldC: {
					type: 'cascader',
					label: '纯展示',
					default: 'zhinan,shejiyuanze,yizhi',
					props: {
						options: options
					},
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	}
};
