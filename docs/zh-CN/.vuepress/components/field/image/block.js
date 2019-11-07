import {prefix} from '../../utils/common'

export default {
	imageField1: {
		resources: {
			imageRes: {
                api: {
                    prefix: prefix,
                    create: 'create'
                },
				fields: {
					image1: {
						label: '图片上传',
						type: 'image'
					},
					image3: {
						label: '带校验',
						type: 'image',
						rules: [
							{
								required: true,
								message: '请上传图片',
								trigger: 'change'
							}
						],
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
					check: {
						imgMaxWidth: 640,
						imgMaxHeight: 640,
						imgMinWidth: 240,
						imgMinHeight: 240,
					},
					default: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
					props: {
						action: `${prefix}upload-image`
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
						action: `${prefix}upload-image`
					}
				},
				image5: {
					label: '图片类型',
					type: 'image',
					tip: '只能上传png文件',
					successUrlKey: 'url',
					props: {
						accept: 'image/png',
						action: `${prefix}upload-image`
					}
				},
				image6: {
					label: '图片大小',
					type: 'image',
					tip: '不能超过50kb',
					successUrlKey: 'url',
					check: {
						maxSizeInKB: 50
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
					props: {
						action: `${prefix}upload-image`,
						'show-file-list': true,
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
						action: `${prefix}upload-image`,
						'list-type': 'picture',
						'show-file-list': true,
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
					props: {
						action: `${prefix}upload-image`,
						'list-type': 'picture-card',
						'show-file-list': true,
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
						action: `${prefix}upload-image`,
						'default-image-list': [{
							'name': 'food.jpeg',
							'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
						}, {
							'name': '精选美景图片精选美景图片',
							'url': 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
						}]
					}
				},
				image4: {
					label: '默认列表图为空',
					type: 'image',
					props: {
						action: `${prefix}upload-image`,
						'default-image-list': []
					}
				},
				image5: {
					label: '加载默认列表图',
					type: 'image',
					default: 'http://demo.sc.chinaz.com/Files/pic/icons/7458/m1.png',
					props: {
						action: `${prefix}upload-image`,
						'default-image-list': null
					}
				}
			}
		},
		props: {
			'label-width': '150px',
		},
		actions: {
			init() {
				setTimeout(() => {
					this.fields.image5.props['default-image-list'] = [{
						'name': 'food.jpeg',
						'url': 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
					}, {
						'name': '精选美景图片精选美景图片',
						'url': 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
					}]
				}, 2000)
			}
		},
		ctx: 'edit'
	},
	imageField5: {
		type: 'form',
		resource: {
			fields: {
				image1: {
					label: '大图预览',
					type: 'image'
				},
				image2: {
					label: '预览列表',
					type: 'image',
					props: {
						'preview-src-list': [
                            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                        ]
					}
				}
			}
		},
		ctx: 'view',
		data: {
			image1: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
			image2: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
		}
	},
	imageFieldHeadimage: {
		type: 'form',
		resource: {
			fields: {
				image1: {
					label: '头像上传',
					type: 'image',
					props: {
						headimage: true
					}
				},
				image2: {
					label: '头像展示',
					type: 'image',
					ctx: 'view',
					default: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
					props: {
						headimage: true
					}
				}
			}
		},
		ctx: 'edit'
	}
};
