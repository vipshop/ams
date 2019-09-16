export default {
	videoField1: {
		type: 'form',
		resource: {
			fields: {
				videoFieldA: {
					type: 'video',
					label: '视频'
				},
				videoFieldB: {
					type: 'video',
					label: '视频',
					tip: '不超过500kb',
					successUrlKey: 'url',
					check: {
						maxSizeInKB: 500
					}
				},
				videoFieldC: {
					type: 'video',
					label: '视频',
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
