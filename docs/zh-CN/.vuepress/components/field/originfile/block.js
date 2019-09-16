export default {
	originfileField1: {
		type: 'form',
		resource: {
			fields: {
				originfileFieldA: {
					type: 'originfile',
					label: '文件上传',
					tip: '不超过500kb',
					successUrlKey: 'url'
				}
			}
		},
		ctx: 'edit'
	}
};
