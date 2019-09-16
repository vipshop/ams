export default {
	headimageField1: {
		type: 'form',
		resource: {
			fields: {
				headimageFieldA: {
					type: 'headimage',
					label: '头像',
					tip: '只能上传jpg/png文件，且不超过500kb',
					successUrlKey: 'url'
				}
			}
		},
		ctx: 'edit'
	}
};
