export default {
	audioField1: {
		type: 'form',
		resource: {
			fields: {
				audioFieldA: {
					type: 'audio',
					label: '音频'
				},
				audioFieldB: {
					type: 'audio',
					label: '限制大小',
					tip: '不超过500kb',
					successUrlKey: 'url',
					check: {
						maxSizeInKB: 500
					}
				},
				audioFieldC: {
					type: 'audio',
					label: '音频',
					successUrlKey: 'url',
					props: {
						'button-label': '自定义'
					}
				}
			}
		},
		ctx: 'edit'
	}
};
