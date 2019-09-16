export default {
	getSetView: {
		resources: {
			getSetView: {
				api: {
					prefix: '/test/',
					create: 'create'
				},
				fields: {
					datetime: {
						label: '时间',
						type: 'datetime',
						get(value) {
							// 格式化成13位时间戳（datetime组件）
							console.log('get', value);
							return Number(value.slice(5));
						},
						set(value) {
							// localValue可能为Date或者是时间戳
							console.log('set', value);
							return 'date:' + (value instanceof Date ? value.getTime() : value);
						},
						view(value) {
							// 格式化13位时间戳
							console.log('view', value);
							return value.slice(5) / 1000;
						}
					},
					testSelect: {
						type: 'select',
						label: '字符串多选',
						props: {
							multiple: true,
							options: {
								'a': '黄金糕',
								'b': '双皮奶',
								'c': '蚵仔煎'
							}
						}
					},
					testArraySelect: {
						type: 'select',
						label: '数组多选',
						props: {
							multiple: true,
							options: {
								'a': '黄金糕',
								'b': '双皮奶',
								'c': '蚵仔煎'
							}
						},
						get(value) {
							console.log('get', value);
							if (typeof value === 'string') {
								return value.split(',');
							}
							return value;
						},
						set(value) {
							// localValue可能为Date或者是时间戳
							console.log('set', value);
							if (typeof value === 'string') {
								return value.split(',');
							}
							return value;
						}
					}
				}
			}
		},
		blocks: {
			editGetSetView: {
				data: {
					datetime: '',
					testSelect: '',
					testArraySelect: []
				},
				type: 'form',
				resource: 'getSetView',
				ctx: 'edit',
				style: {
					width: '50%'
				},
				events: {
					init: 'initFn',
					submit: '@alert @create'
				},
				actions: {
					initFn() {
						setTimeout(() => {
							this.data.datetime = 'date:1546278503030';
							this.data.testSelect = 'a,b'
							this.data.testArraySelect = ['a', 'b'];
						}, 1000);
					},
					alert() {
						alert('提交的表单数据是：' + JSON.stringify(this.data));
					}
				},
				operations: {
					submit: {
						type: 'button',
						label: '提交'
					}
				}
			},
			viewGetSetView: {
				data: {
					datetime: 'date:1546278503030',
					testSelect: 'a,b',
					testArraySelect: ['a', 'b']
				},
				type: 'form',
				resource: 'getSetView',
				ctx: 'view',
				style: {
					width: '50%'
				},
				events: {
					submit: '@create'
				}
			}
		}
	}
};
