export default {
	transferField1: {
		type: 'form',
		resource: {
			fields: {
				transferFieldA: {
					type: 'transfer',
					label: '默认',
					props: {
						options: [{
						  value: "a",
						  label: "黄金糕"
						}, {
						  value: "b",
						  label: "双皮奶"
						}, {
						  value: "c",
						  label: "蚵仔煎"
						}, {
						  value: "d",
						  label: "龙须面"
						}, {
						  value: "e",
						  label: "北京烤鸭"
						}]
					}
				},
				transferFieldB: {
					type: 'transfer',
					label: '带默认值',
					default: 'a,e',
					props: {
						options: [{
							value: "a",
							label: "黄金糕"
						  }, {
							value: "b",
							label: "双皮奶"
						  }, {
							value: "c",
							label: "蚵仔煎"
						  }, {
							value: "d",
							label: "龙须面"
						  }, {
							value: "e",
							label: "北京烤鸭"
						  }]
					}
				},
				transferFieldC: {
					type: 'transfer',
					label: '纯展示',
					default: 'b,c',
					props: {
						options: [{
							value: "a",
							label: "黄金糕"
						  }, {
							value: "b",
							label: "双皮奶"
						  }, {
							value: "c",
							label: "蚵仔煎"
						  }, {
							value: "d",
							label: "龙须面"
						  }, {
							value: "e",
							label: "北京烤鸭"
						  }]
					},
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	}
};
