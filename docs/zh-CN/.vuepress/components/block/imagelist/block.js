export default {
	imagelist1: {
		type: 'imagelist',
		resource: {
			api: {
				prefix: 'https://nei.netease.com/api/apimock/b7c10125b452d3142d8375cf634f0b47/ams/mock/',
				list: 'imagelist'
			},
			fields: {
				id: {
					type: 'text'
				}
			}
		},
		operations: {
			id: {
				slot: 'searchs',
				type: 'field',
				label: '文本'
			},
			search: {
				slot: 'searchs',
				type: 'button',
				props: {
					type: 'primary'
				},
				label: '搜索',
				event: 'list:1'
			},
			rejectedItem: {
				type: 'text',
				props: {
					type: 'danger',
					size: 'mini',
				},
				label: '驳回'
			},
			rejectedItem1: {
				type: 'text',
				props: {
					size: 'mini',
				},
				label: '通过(设计)'
			},
			rejectedItem2: {
				type: 'text',
				props: {
					size: 'mini',
				},
				label: '通过(协助)'
			},
			deleteItem: {
				type: 'button',
				props: {
					size: 'mini',
					type: 'text',
					icon: 'el-icon-delete'
				}
			},
			editItem: {
				type: 'icon',
				label: '编辑',
				icon: 'el-icon-edit'
			}
		},
		pageSize: 10,
		props: {
			// shadow: 'always', // 阴影效果，可取值：hover（默认）| always | never
			// subtitle: 'always' // 子标题出现方式，可取值：hover（默认）| always
			// pagination: 'simulate' // 模拟分页
		},
		events: {
			init: '@list',
		},
		actions: {
			rejectedItem() {
				alert('点击了驳回');
			},
			rejectedItem1() {
				alert('通过(设计)');
			},
			clickImageItem(args) {
				// 内置的action
				console.log(args);
				alert('点击图片');
			},
			editItem() {
				alert('点击了编辑');
			}
		},
		options: {
			// imageSrc: {
			//     field: 'image' // 字段名
			// },
			title: {
				field: 'title',
				// 'prefix-icon': 'el-icon-search'
				'prefix-tag': {
					type: 'info', // success | info | warning | danger
					label(args) {
						return args.status;
					}
				}
			},
			subtitle: {
				field: 'content'
			},
			info: {
				field: 'info'
			}
		}
	},
	imagelist2: {
		type: 'imagelist',
		resource: {
			api: {
				prefix: 'https://nei.netease.com/api/apimock/b7c10125b452d3142d8375cf634f0b47/ams/mock/',
				list: 'imagelist2'
			},
			fields: {
				id: {
					type: 'text'
				}
			}
		},
		operations: {
			id: {
				slot: 'searchs',
				type: 'field',
				label: '文本'
			},
			search: {
				slot: 'searchs',
				type: 'button',
				props: {
					type: 'primary'
				},
				label: '搜索',
				event: 'list:1'
			},
			rejectedItem: {
				type: 'text',
				props: {
					type: 'danger',
					size: 'mini',
				},
				label: '驳回'
			},
			rejectedItem1: {
				type: 'text',
				props: {
					size: 'mini',
				},
				label: '通过(设计)'
			},
			rejectedItem2: {
				type: 'text',
				props: {
					size: 'mini',
				},
				label: '通过(协助)'
			},
			deleteItem: {
				type: 'button',
				props: {
					size: 'mini',
					type: 'text',
					icon: 'el-icon-delete'
				}
			},
			editItem: {
				type: 'icon',
				label: '编辑',
				icon: 'el-icon-edit'
			}
		},
		props: {
			// shadow: 'always', // 阴影效果，可取值：hover（默认）| always | never
			// subtitle: 'always' // 子标题出现方式，可取值：hover（默认）| always
			// pagination: 'simulate' // 模拟分页
		},
		events: {
			init: '@list',
		},
		actions: {
			rejectedItem() {
				alert('点击了驳回');
			},
			rejectedItem1() {
				alert('通过(设计)');
			},
			clickImageItem(args) {
				// 内置的action
				console.log(args);
				alert('点击图片');
			},
			editItem() {
				alert('点击了编辑');
			}
		},
		options: {
			title: {
				field: 'title',
				// 'prefix-icon': 'el-icon-search'
				'prefix-tag': {
					type: 'info', // success | info | warning | danger
					label(args) {
						return args.status;
					}
				}
			},
			subtitle: {
				field: 'content'
			},
			info: {
				field: 'info'
			}
		}
	},
	imagelist3: {
		type: 'imagelist',
		resource: {
			api: {
				prefix: 'https://nei.netease.com/api/apimock/b7c10125b452d3142d8375cf634f0b47/ams/mock/',
				list: 'imagelist'
			},
			fields: {
				id: {
					type: 'text'
				}
			}
		},
		operations: {
			id: {
				slot: 'searchs',
				type: 'field',
				label: '文本'
			},
			search: {
				slot: 'searchs',
				type: 'button',
				props: {
					type: 'primary'
				},
				label: '搜索',
				event: 'list:1'
			},
			rejectedItem: {
				type: 'text',
				props: {
					type: 'danger',
					size: 'mini',
				},
				label: '驳回'
			},
			rejectedItem1: {
				type: 'text',
				props: {
					size: 'mini',
				},
				label: '通过(设计)'
			},
			rejectedItem2: {
				type: 'text',
				props: {
					size: 'mini',
				},
				label: '通过(协助)'
			},
			deleteItem: {
				type: 'button',
				props: {
					size: 'mini',
					type: 'text',
					icon: 'el-icon-delete'
				}
			},
			editItem: {
				type: 'icon',
				label: '编辑',
				icon: 'el-icon-edit'
			}
		},
		pageSize: 10,
		events: {
			init: '@list',
		},
		actions: {
			rejectedItem() {
				alert('点击了驳回');
			},
			rejectedItem1() {
				alert('通过(设计)');
			},
			clickImageItem(args) {
				// 内置的action
				console.log(args);
				alert('点击图片');
			},
			editItem() {
				alert('点击了编辑');
			}
		},
		options: {
			title: false,
			subtitle: {
				field: 'content'
			},
			info: false
		}
	},
	imagelist4: {
		type: 'imagelist',
		resource: {
			api: {
				prefix: 'https://nei.netease.com/api/apimock/b7c10125b452d3142d8375cf634f0b47/ams/mock/',
				list: 'imagelist'
			},
			fields: {
				id: {
					type: 'text'
				}
			}
		},
		operations: {
			showBatch: {
				slot: 'multipleSelect',
				type: 'button',
				label: '批量操作',
				show() {
					return !this.showBatchOperations;
				}
			},
			batchPassItems: {
				slot: 'multipleSelect',
				type: 'button',
				label: '批量通过',
				show() {
					return this.showBatchOperations;
				}
			},
			batchRejectedItems: {
				slot: 'multipleSelect',
				type: 'button',
				label: '批量驳回',
				show() {
					return this.showBatchOperations;
				}
			},
			hideBatch: {
				slot: 'multipleSelect',
				type: 'button',
				label: '退出',
				show() {
					return this.showBatchOperations;
				}
			},
			'buttonMulti': {
				'type': 'button',
				props: {
					size: 'mini',
					type: 'text',
					icon: 'el-icon-delete'
				}
			}
		},
		pageSize: 10,
		props: {
			// shadow: 'always', // 阴影效果，可取值：hover（默认）| always | never
			// subtitle: 'always' // 子标题出现方式，可取值：hover（默认）| always
			// pagination: 'simulate' // 模拟分页,
			// 'empty-text': '暂无数据'
		},
		events: {
			init: '@list',
		},
		actions: {
			batchPassItems() {
				if (this.batchSelected.length) {
					// 选中的结果
					console.log(this.batchSelected);
				} else {
					this.$message.error('请先勾选数据');
				}
				console.log('批量通过');
			},
			batchRejectedItems() {
				if (this.batchSelected.length) {
					// 选中的结果
					console.log(this.batchSelected);
				} else {
					this.$message.error('请先勾选数据');
				}
				console.log('批量驳回');
			}
		},
		options: {
			imageSrc: {
			    field: 'image' // 字段名
			},
			title: {
				field: 'title',
				// 'prefix-icon': 'el-icon-search'
				'prefix-tag': {
					type: 'info', // success | info | warning | danger
					label(args) {
						return args.status;
					}
				}
			},
			subtitle: {
				field: 'content'
			},
			info: {
				field: 'info'
			}
		}
	},
	imagelist5: {
		type: 'imagelist',
		resource: {
			api: {
				prefix: 'https://nei.netease.com/api/apimock/b7c10125b452d3142d8375cf634f0b47/ams/mock/',
				list: 'imagelist'
			},
			fields: {
				id: {
					type: 'text'
				}
			}
		},
		operations: {
			id: {
				slot: 'searchs',
				type: 'field',
				label: '文本'
			},
			search: {
				slot: 'searchs',
				type: 'button',
				props: {
					type: 'primary'
				},
				label: '搜索',
				event: 'list:1'
			},
			rejectedItem: {
				type: 'text',
				props: {
					type: 'danger',
					size: 'mini',
				},
				label: '驳回'
			},
			rejectedItem1: {
				type: 'text',
				props: {
					size: 'mini',
				},
				label: '通过(设计)'
			},
			rejectedItem2: {
				type: 'text',
				props: {
					size: 'mini',
				},
				label: '通过(协助)'
			},
			deleteItem: {
				type: 'button',
				props: {
					size: 'mini',
					type: 'text',
					icon: 'el-icon-delete'
				}
			},
			editItem: {
				type: 'icon',
				label: '编辑',
				icon: 'el-icon-edit'
			}
		},
		pageSize: 10,
		events: {
			init: '@list',
		},
		actions: {
			rejectedItem() {
				alert('点击了驳回');
			},
			rejectedItem1() {
				alert('通过(设计)');
			},
			clickImageItem(args) {
				// 内置的action
				console.log(args);
				alert('点击图片');
			},
			editItem() {
				alert('点击了编辑');
			}
		},
		options: {
			title: {
				field: 'title',
				'prefix-tag': {
					type: 'info', // success | info | warning | danger
					label(args) {
						return args.status;
					}
				}
			},
			subtitle: {
				field: 'content'
			},
			info: {
				field: 'info'
			}
		},
		blocks: {
			listTop: {
				type: 'component',
				options: {
					is: 'div',
					text: '我是图片列表区块最顶部的插槽内容！！'
				},
				style: {
					padding: '20px',
					marginBottom: '20px',
					border: '1px solid #3eaf7c'
				},
				slot: 'top'
			},
			listTableTop: {
				type: 'component',
				options: {
					is: 'div',
					text: '我是图片列表区块图片顶部的插槽内容！！'
				},
				style: {
					padding: '20px',
					border: '1px solid #f60'
				},
				slot: 'tableTop'
			}
		}
	},
	imagelist6: {
		type: 'imagelist',
		resource: {
			api: {
				prefix: 'https://nei.netease.com/api/apimock/b7c10125b452d3142d8375cf634f0b47/ams/mock/',
				list: 'imagelist'
			},
			fields: {
				id: {
					type: 'text'
				}
			}
		},
		operations: {
			id: {
				slot: 'searchs',
				type: 'field',
				label: '文本'
			},
			search: {
				slot: 'searchs',
				type: 'button',
				props: {
					type: 'primary'
				},
				label: '搜索',
				event: 'list:1'
			},
			rejectedItem: {
				type: 'text',
				props: {
					type: 'danger',
					size: 'mini',
				},
				label: '驳回'
			},
			rejectedItem1: {
				type: 'text',
				props: {
					size: 'mini',
				},
				label: '通过(设计)'
			},
			rejectedItem2: {
				type: 'text',
				props: {
					size: 'mini',
				},
				label: '通过(协助)'
			},
			deleteItem: {
				type: 'button',
				props: {
					size: 'mini',
					type: 'text',
					icon: 'el-icon-delete'
				}
			},
			editItem: {
				type: 'icon',
				label: '编辑',
				icon: 'el-icon-edit'
			}
		},
		pageSize: 10,
		events: {
			init: '@list',
		},
		actions: {
			rejectedItem() {
				alert('点击了驳回');
			},
			rejectedItem1() {
				alert('通过(设计)');
			},
			clickImageItem(args) {
				// 内置的action
				console.log(args);
				alert('点击图片');
			},
			editItem() {
				alert('点击了编辑');
			}
		},
		options: {
			title: {
				field: 'title',
				'prefix-tag': {
					type: 'info', // success | info | warning | danger
					label(args) {
						return args.status;
					}
				}
			},
			subtitle: {
				field: 'content'
			},
			info: {
				field: 'info'
			},
			categorys: [{ // 分类
				title: '90后', // 分类名称
				index: 0 // 插入分类的位置
			}, {
				title: '80后',
				index: 3
			}, {
				title: '70后',
				index: 4
			}]
		}
	}
};
