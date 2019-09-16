export default {
	radioField1: {
		type: 'form',
		resource: {
			fields: {
				radioFieldA: {
					type: 'radio',
					label: '单选',
					props: {
						options: {
							a: '黄金糕',
							b: '双皮奶',
							c: '蚵仔煎',
							d: '龙须面',
							e: '北京烤鸭'
						}
					}
				},
				radioFieldB: {
					type: 'radio',
					label: '带默认值',
					default: 'a',
					props: {
						options: {
							a: '黄金糕',
							b: '双皮奶',
							c: '蚵仔煎',
							d: '龙须面',
							e: '北京烤鸭'
						}
					}
				},
				radioFieldC: {
					type: 'radio',
					label: '纯展示',
					default: 'b',
					props: {
						options: {
							a: '黄金糕',
							b: '双皮奶',
							c: '蚵仔煎',
							d: '龙须面',
							e: '北京烤鸭'
						}
					},
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	}
};
