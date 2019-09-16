export default {
	fileField1: {
		type: 'form',
		resource: {
			fields: {
				fileFieldA: {
					type: 'file',
					label: '文件上传'
				},
				fileFieldB: {
					type: 'file',
					label: '限制大小',
					tip: '不超过50kb',
					successUrlKey: 'url',
					check: {
						maxSizeInKB: 50
					}
				},
				fileFieldC: {
					type: 'file',
					label: '自定义',
					successUrlKey: 'url',
					props: {
						'button-label': '导入'
					}
				}
			}
		},
		ctx: 'edit'
	}
};
