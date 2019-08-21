export default {
	imageField1: {
		resources: {
			imageRes: {
				fields: {
					image1: {
						label: '图片上传',
						type: 'image',
						rules: [
							{
								required: true,
								message: '请上传图片',
								trigger: 'change'
							}
						]
					}
				}
			}
		},
		blocks: {
			editImage: {
				type: 'form',
				resource: 'imageRes',
				ctx: 'edit',
				style: {
					width: '50%'
				},
				events: {
					submit: '@validate @create'
				},
				operations: {
					submit: {
						type: 'button',
						label: '提交'
					}
				}
			},
			viewImage: {
				type: 'form',
				resource: 'imageRes',
				ctx: 'view',
				style: {
					width: '50%'
				}
			}
		}
	},
	imageField2: {
		type: 'form',
		resource: {
			fields: {
				image3: {
					label: '尺寸范围',
					type: 'image',
					tip: '范围240-640',
					successUrlKey: 'url',
					// check: { maxSizeInKB, imgMaxWidth, imgMaxHeight, imgMinWidth, imgMinHeight, imgWidth, imgHeight },
					check: {
						imgMaxWidth: 640,
						imgMaxHeight: 640,
						imgMinWidth: 240,
						imgMinHeight: 240,
					},
					props: {
						action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image'
					}
				},
				image4: {
					label: '固定尺寸',
					type: 'image',
					tip: '640x640',
					successUrlKey: 'url',
					check: {
						imgWidth: 640,
						imgHeight: 640
					},
					props: {
						action:
							'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image'
					}
				},
				image5: {
					label: '图片类型',
					type: 'image',
					tip: '只能上传png文件',
					successUrlKey: 'url',
					props: {
						accept: 'image/png',
						action:
							'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image'
					}
				}
			}
		},
		ctx: 'edit'
	},
	imageField3: {
		type: 'form',
		resource: {
			fields: {
				image1: {
					label: '默认',
					type: 'image',
					tip: '只能不超过50kb的图片',
					props: {
						action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image',
						'file-list': [{
							'name': 'food.jpeg',
							'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
						}, {
							'name': '精选美景图片',
							'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
						}]
					}
				},
				image2: {
					label: 'picture',
					type: 'image',
					tip: '只能不超过50kb的图片',
					props: {
						action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image',
						'list-type': 'picture',
						'file-list': [{
							'name': 'food.jpeg',
							'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
						}, {
							'name': '精选美景图片',
							'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
						}]
					}
				},
				image3: {
					label: 'picture-card',
					type: 'image',
					tip: '只能不超过50kb的图片',
					props: {
						action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image',
						'list-type': 'picture-card',
						'file-list': [{
							'name': 'food.jpeg',
							'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
						}, {
							'name': '精选美景图片',
							'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
						}]
					}
				}
			}
		},
		ctx: 'edit'
	},
	imageField4: {
		type: 'form',
		resource: {
			fields: {
				image3: {
					label: '默认图列表',
					type: 'image',
					props: {
						action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image',
						'default-image-list': [{
							'name': 'food.jpeg',
							'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
						}, {
							'name': '精选美景图片精选美景图片',
							'url': 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
						}]
					}
				}
			}
		},
		ctx: 'edit'
	}
};
