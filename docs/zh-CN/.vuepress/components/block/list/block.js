import {prefix} from '../../utils/common'

const fields = {
	text: {
		label: '文本',
		type: 'text'
	},
	inputnumber: {
		type: 'inputnumber',
		label: '数字输入'
	},
	select: {
		type: 'select',
		label: 'select多选',
		props: {
			options: {
				a: '黄金糕',
				b: '双皮奶',
				c: '蚵仔煎',
				d: '龙须面',
				e: '北京烤鸭'
			}
		}
	}
}
export default {
	defaultList: {
		type: 'list',
		resource: {
			fields: fields
		},
		data: {
			list: [{
				text: '双11活动',
				inputnumber: 3,
				select: 'a,b,c'
			},
			{
				text: '双11活动2',
				inputnumber: 4,
				select: 'b,c'
			},
			{
				text: '双11活动3',
				inputnumber: 5,
				select: 'a,b,c'
			},
			{
				text: '双11活动4',
				inputnumber: 6,
				select: 'c'
			}]
		}
	},
	emptyList: {
		type: 'list',
		resource: {
			fields: fields
		},
		data: {
			list: []
		},
		props: {
			'empty-text': '没有找到对应的应用，请尝试其他条件'
		}
	},
	indexList: {
		type: 'list',
		resource: {
			fields: fields
		},
		data: {
			list: [{
				text: '双11活动',
				inputnumber: 3,
				select: 'a,b,c'
			},
			{
				text: '双11活动2',
				inputnumber: 4,
				select: 'b,c'
			},
			{
				text: '双11活动3',
				inputnumber: 5,
				select: 'a,b,c'
			},
			{
				text: '双11活动4',
				inputnumber: 6,
				select: 'c'
			}]
		},
		props: {
			type: 'index'
		}
	},
	pagesList: {
		type: 'list',
		resource: {
            api: {
                prefix,
                list: "smallList",
                successCode: 0
            },
            fields: {
                id: {
                    type: "text",
					label: "ID",
					props: {
						width: 50
					}
                },
                testText: {
                    type: "text",
                    label: "名称"
                },
                testTextarea: {
                    type: "textarea",
                    label: "文本框"
                },
                testDate: {
                    type: "datetime",
                    label: "创建时间"
                },
                testSwitch: {
                    type: "switch",
					label: "开关"
                }
            }
		},
		events: {
			init: '@list'
		}
	},
	simulatePagesList: {
		type: 'list',
		resource: {
            api: {
				prefix,
				list: 'list-pagination'
			},
			fields: {
				'id': {
					'type': 'text',
					'label': 'ID'
				},
				'title': {
					'type': 'text',
					'label': '标题'
				},
				'content': {
					'type': 'textarea',
					'label': '内容'
				}
			}
		},
		events: {
			init: '@list'
		},
		pageSize: 10,
		props: {
			pagination: 'simulate' // 模拟分页
		}
	},
	filtersList: {
		type: 'list',
		resource: {
            api: {
                prefix,
                list: "smallList",
                successCode: 0
            },
            fields: {
                id: {
                    type: "text",
					label: "ID",
					props: {
						width: 100
					}
                },
				testSelect: {
					type: 'select',
					label: 'select多选',
					props: {
						options: {
							a: '黄金糕',
							b: '双皮奶',
							c: '蚵仔煎',
							d: '龙须面',
							e: '北京烤鸭'
						}
					}
				},
                testText: {
                    type: "text",
                    label: "名称"
                },
                testTextarea: {
                    type: "textarea",
                    label: "文本框"
                },
                testDate: {
                    type: "datetime",
                    label: "创建时间"
                }
            }
		},
		filters: {
			testSelect: {
				multiple: true, // 多选
				remote: true // 远程过滤
			}
		},
		// 排序设置（列表特有）
		sorts: {
			id: true
		},
		events: {
			init: '@list'
		}
	},
	searchsList: {
		type: 'list',
		resource: {
			api: {
                prefix,
                list: "smallList",
                successCode: 0
            },
            fields: {
                id: {
                    type: "text",
					label: "ID"
                },
				testSelect: {
					type: 'select',
					label: 'select多选',
					props: {
						options: {
							a: '黄金糕',
							b: '双皮奶',
							c: '蚵仔煎',
							d: '龙须面',
							e: '北京烤鸭'
						}
					}
				},
                testText: {
                    type: "text",
					label: "名称",
					props: {
						placeholder: '请输入名词'
					}
                }
            }
		},
		data: {
			list: [{
				id: 3,
				testText: '双11活动',
				testSelect: 'a,b,c'
			},
			{
				id: 4,
				testText: '双11活动2',
				testSelect: 'b,c'
			},
			{
				id: 5,
				testText: '双11活动3',
				testSelect: 'a,b,c'
			},
			{
				id: 6,
				testText: '双11活动4',
				testSelect: 'c'
			}]
		},
		operations: {
			testText: {
				slot: 'searchs',
				type: 'field',
				label: "名称"
			},
			testSelect: {
				slot: 'searchs',
				type: 'field',
				label: "类型"
			},
			search: {
				slot: 'searchs',
				type: 'button',
				props: {
					type: 'primary'
				},
				label: '搜索',
				event: 'list:1'
			}
		}
	},
	multipleSelectList: {
		type: 'list',
		resource: {
            fields: {
                id: {
                    type: "text",
					label: "ID"
                },
				testSelect: {
					type: 'select',
					label: 'select多选',
					props: {
						options: {
							a: '黄金糕',
							b: '双皮奶',
							c: '蚵仔煎',
							d: '龙须面',
							e: '北京烤鸭'
						}
					}
				},
                testText: {
                    type: "text",
					label: "名称",
					props: {
						placeholder: '请输入名词'
					}
                }
            }
		},
		data: {
			list: [{
				id: 3,
				testText: '双11活动',
				testSelect: 'a,b,c'
			},
			{
				id: 4,
				testText: '双11活动2',
				testSelect: 'b,c'
			},
			{
				id: 5,
				testText: '双11活动3',
				testSelect: 'a,b,c'
			},
			{
				id: 6,
				testText: '双11活动4',
				testSelect: 'c'
			}],
			total: 100
		},
		options: {
			multipleSelect: true
		},
		operations: {
			selectMulti: {
				slot: 'multipleSelect',
				type: 'field',
				field: 'testSelect'
				// label: '可省略'
			},
			buttonMulti: {
				slot: 'multipleSelect',
				type: 'button',
				label: '删除',
				event: 'multi'
			}
		},
		actions: {
			multi(args) {
				this.$message('你点击了删除按钮！')
				console.log('multipleSelect action', args.$prevReturn);
			}
		}
	},
	slotBlocksList: {
		type: 'list',
		resource: {
            fields: {
                id: {
                    type: "text",
					label: "ID"
                },
				testSelect: {
					type: 'select',
					label: 'select多选',
					props: {
						options: {
							a: '黄金糕',
							b: '双皮奶',
							c: '蚵仔煎',
							d: '龙须面',
							e: '北京烤鸭'
						}
					}
				},
                testText: {
                    type: "text",
					label: "名称",
					props: {
						placeholder: '请输入名词'
					}
                }
            }
		},
		data: {
			list: [{
				id: 3,
				testText: '双11活动',
				testSelect: 'a,b,c'
			},
			{
				id: 4,
				testText: '双11活动2',
				testSelect: 'b,c'
			},
			{
				id: 5,
				testText: '双11活动3',
				testSelect: 'a,b,c'
			},
			{
				id: 6,
				testText: '双11活动4',
				testSelect: 'c'
			}],
			total: 100
		},
		operations: {
			testText: {
				slot: 'searchs',
				type: 'field'
			},
			search: {
				slot: 'searchs',
				type: 'button',
				props: {
					type: 'primary'
				},
				label: '搜索',
				event: 'list:1'
			}
		},
		blocks: {
			listTop: {
				type: 'component',
				options: {
					is: 'div',
					text: '我是列表区块最顶部的插槽内容！！'
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
					text: '我是列表区块表格顶部的插槽内容！！'
				},
				style: {
					padding: '20px',
					border: '1px solid #f60'
				},
				slot: 'tableTop'
			}
		}
	},
	operationsList: {
		type: 'list',
		resource: {
			fields: {
				text: {
					label: '文本',
					type: 'text'
				},
				inputnumber: {
					type: 'inputnumber',
					label: '数字输入'
				},
				select: {
					type: 'select',
					label: 'select多选',
					props: {
						options: {
							a: '黄金糕',
							b: '双皮奶',
							c: '蚵仔煎',
							d: '龙须面',
							e: '北京烤鸭'
						}
					}
				}
			}
		},
		props: {
			'operations-width': 200,
		},
		data: {
			list: [{
				text: '双11活动',
				inputnumber: 3,
				select: 'a,b,c'
			},
			{
				text: '双11活动2',
				inputnumber: 4,
				select: 'b,c'
			},
			{
				text: '双11活动3',
				inputnumber: 5,
				select: 'a,b,c'
			},
			{
				text: '双11活动4',
				inputnumber: 6,
				select: 'c'
			}]
		},
		operations: {
			testNewInput: {
				slot: 'searchs',
				type: 'field',
				field: {
					type: 'text',
					props: {
					placeholder: '折'
					},
					style: {
						width: '100px'
					}
				}
			},
			search: {
				slot: 'searchs',
				type: 'button',
				props: {
					type: 'primary'
				},
				label: '搜索',
				event: 'list'
			},
			search: {
				slot: 'searchs',
				type: 'button',
				props: {
					type: 'primary'
				},
				label: '搜索',
				event: 'list'
			},
			reset: {
				slot: 'searchs',
				type: 'reset',
				label: '重置'
			},
			addItem: {
				type: "button",
				label: "新建",
				props: {
					type: "primary"
				},
				slot: "searchs"
			},
			editItem: {
				type: 'button',
				label: '编辑',
				props: {
					type: 'primary',
					icon: 'el-icon-edit'
				}
			},
			removeItem: {
				type: 'button',
				props: {
					type: 'danger',
					icon: 'el-icon-delete',
					circle: true
				}
			}
		},
		actions: {
			addItem: function() {
				this.$message('这是”新建“按钮事件响应Demo效果，可在区块配置的“actions”里修改～')
			},
			editItem: function() {
				this.$message('这是”编辑“按钮事件响应Demo效果，可在区块配置的“actions”里修改～')
			},
			removeItem: function() {
				this.$message('这是”删除“按钮事件响应Demo效果，可在区块配置的“actions”里修改～')
			},
			reset: function() {
				this.$message('这是”重置“按钮事件响应Demo效果，可在区块配置的“actions”里修改～')
			}
		}
	},
	suffixInfoList: {
		type: 'list',
		resource: {
            api: {
				prefix,
				list: 'list-pagination'
			},
			fields: {
				'id': {
					'type': 'text',
					'label': 'ID'
				},
				'title': {
					'type': 'text',
					'label': '标题',
					props: {
						// 'suffix-info': '我是提示', // 后缀提示
						// 'suffix-info-warning': '我是提示warning', // 后缀警告提示
						// 'suffix-info-danger': '我是提示danger' // 后缀错误提示
					},
					changeConfig(field, context) {
						if (context) {
							if (context.id === 2) {
								field.props['suffix-info-warning'] = '我是提示warning';
							} else if (context.id === 3) {
								field.props['suffix-info-danger'] = '我是提示danger';
							} else {
								field.props['suffix-info'] = '我是提示';
							}
						}
						return field;
					}
				},
				'content': {
					'type': 'textarea',
					'label': '内容'
				}
			}
		},
		events: {
			init: '@list'
		},
		pageSize: 10,
		props: {
			pagination: 'simulate' // 模拟分页
		}
	},
	editList: {
		type: 'list',
		ctx: 'edit',
		props: {
			type: 'index'
		},
		resource: {
			fields: {
				quota: {
					type: 'text',
					'label': '指标',
					props: {
						width: '170px'
					}
				},
				times: {
					type: 'text',
					label: '连续次数'
				},
				period: {
					type: 'unitselect',
					label: '时间段',
					units: ['分钟', '小时'],
					defaultUnit: '分钟'
				},
				compared: {
					type: 'select',
					label: '对比',
					props: {
						'multiple': false,
						'options': {
							'0': '昨天',
							'5': '不对比'
						}
					}
				},
				condition: {
					type: 'select',
					label: '条件',
					props: {
						'multiple': false,
						'options': {
							'0': '同比下降',
							'1': '同比上升'
						}
					},
					changeConfig(field, context) {
						if (context && context.compared === '5') {
							field.props.options = {
								'>': '>',
								'>=': '>=',
								'<': '<',
								'<=': '<=',
								'==': '=='
							};
						}
						field.props.options && !field.props.options[context.condition] && (context.condition = '');
						return field;
					}
				}
			}
		},
		data: {
			list: [{
				quota: '大促指标',
				times: '12',
				period: '12',
				compared: '0',
				condition: '0'
			}]
		},
		operations: {
			removeItem: {
				type: 'button',
				label: '删除',
				props: {
					type: 'danger',
					icon: 'el-icon-delete'
				}
			},
			addItem1: {
				type: 'button',
				label: '新增规则',
				props: {
					type: 'primary'
				},
				slot: 'searchs',
				event: 'addItem'
			},
			addItem2: {
				type: 'button',
				label: '右上',
				props: {
					type: 'primary'
				},
				slot: 'rightTop',
				event: 'addItem'
			},
			addItem3: {
				type: 'button',
				label: '左下',
				props: {
					type: 'primary'
				},
				slot: 'leftBottom',
				event: 'addItem'
			},
			addItem4: {
				type: 'button',
				label: '右下1',
				props: {
					type: 'primary'
				},
				slot: 'rightBottom',
				event: 'addItem'
			},
			addItem5: {
				type: 'button',
				label: '右下2',
				props: {
					type: 'primary'
				},
				slot: 'rightBottom',
				event: 'addItem'
			},
			saveItem: {
				type: 'button',
				label: '保存',
				props: {
					type: 'primary'
				},
				slot: 'searchs'
			}
		},
		actions: {
			addItem: function() {
				// this.showLoading();
				this.data.list.push({
					quota: '',
					times: '',
					period: '',
					compared: '',
					condition: ''
				});
			},
			saveItem: function() {
				alert('你点击了保存按钮');
			}
		}
	},
	editList2: {
		type: 'list',
		ctx: 'view',
		resource: {
			fields: {
				quota: {
					type: 'text',
					'label': '指标',
					props: {
						width: '170px'
					}
				},
				times: {
					type: 'text',
					label: '连续次数',
					changeConfig(field, context) {
						if (context && context.edit) {
							field.ctx = 'edit'
						} else {
							field.ctx = 'view'
						}
						return field;
					}
				},
				period: {
					type: 'unitselect',
					label: '时间段',
					units: ['分钟', '小时'],
					defaultUnit: '分钟'
				},
				compared: {
					type: 'select',
					label: '对比',
					props: {
						'multiple': false,
						'options': {
							'0': '昨天',
							'5': '不对比'
						}
					}
				},
				condition: {
					type: 'select',
					label: '条件',
					ctx: 'view',
					props: {
						'multiple': false,
						'options': {
							'0': '同比下降',
							'1': '同比上升'
						}
					},
					changeConfig(field, context) {
						if (context && context.edit) {
							field.ctx = 'edit'
						} else {
							field.ctx = 'view'
						}
						return field;
					}
				}
			}
		},
		data: {
			list: [{
				quota: '大促指标1',
				times: '12',
				period: '12',
				compared: '0',
				condition: '0',
				edit: false
			}, {
				quota: '大促指标2',
				times: '12',
				period: '12',
				compared: '0',
				condition: '0',
				edit: false
			}]
		},
		operations: {
			removeItem: {
				type: 'button',
				label: '删除',
				props: {
					type: 'danger',
					size: 'small'
				}
			},
			editItem: {
				type: 'button',
				label: '编辑',
				props: {
					type: 'primary',
					size: 'small'
				},
				show(data) {
					return !data.edit
				}
			},
			saveItem: {
				type: 'button',
				label: '保存',
				props: {
					type: 'primary',
					size: 'small'
				},
				show(data) {
					return data.edit
				}
			}
		},
		actions: {
			editItem: function(arg) {
				arg.$prevReturn.edit = !arg.$prevReturn.edit
			},
			saveItem: function(arg){
				arg.$prevReturn.edit = !arg.$prevReturn.edit
				this.$message.success('保存成功');
			}
		}
    },
    expandList: {
        type: 'list',
		resource: {
            api: {
                prefix,
                list: "smallList",
                successCode: 0
            },
            fields: {
                id: {
                    type: "text",
					label: "ID",
					props: {
						width: 50
					}
                },
                testText: {
                    type: "text",
                    label: "名称"
                },
                testTextarea: {
                    type: "textarea",
                    label: "文本框"
                },
                testDate: {
                    type: "datetime",
                    label: "创建时间"
                },
                testSwitch: {
                    type: "switch",
					label: "开关"
                }
            }
        },
        expand: {
            id: true,
            testText: true,
            testTextarea: true,
            testDate: true,
            testSwitch: true
        },
		events: {
			init: '@list'
		}
    },
    dragList: {
        type: 'list',
		resource: {
            api: {
                prefix,
                list: "smallList",
                successCode: 0
            },
            fields: {
                id: {
                    type: "text",
					label: "ID",
					props: {
						width: 50
					}
                },
                testText: {
                    type: "text",
                    label: "名称",
                    props: {
                        // 实现名称字段拖拽
                        'class-name': 'drag-column'
                    }
                },
                testTextarea: {
                    type: "textarea",
                    label: "文本框"
                },
                testDate: {
                    type: "datetime",
                    label: "创建时间"
                },
                testSwitch: {
                    type: "switch",
					label: "开关"
                }
            }
        },
        options: {
            drag: true,
            // 隐藏拖拽icon
            // showDragIcon: false
        },
        on: {
            'drag-start': function({ oldIndex }) {
                console.log('drag-start', oldIndex)
            },
            'drag-end': function({ oldIndex,  newIndex}) {
                console.log('drag-end', oldIndex, newIndex)
            }
        },
		events: {
			init: '@list'
		}
    },
    opearationsList: {
        type: 'list',
		resource: {
            api: {
                prefix,
                list: "smallList",
                successCode: 0
            },
            fields: {
                id: {
                    type: "text",
					label: "ID",
					props: {
						width: 50
					}
                },
                testText: {
                    type: "text",
                    label: "名称"
                },
                testTextarea: {
                    type: "textarea",
                    label: "文本框"
                },
                testDate: {
                    type: "datetime",
                    label: "创建时间"
                }
            }
        },
        operations: {
            edit: {
                type: 'button',
                label: '编辑',
                props: {
                    size: 'mini',
                    type: 'primary'
                },
                badge: {
                    // 'is-dot': true,      // 原点显示
                    // hidden: true,        // 隐藏
                    // type: 'info',        // 类型：primary / success / warning / danger / info
                    max: 3,                 // 超过最大值会显示 '{max}+'
                    value: function(data) {
                        // return '' //同样不显示
                        return data.id;  // 需要为数字或字符串
                    }
                }
            },
            add: {
                type: 'button',
                label: '添加',
                props: {
                    size: 'mini'
                },
                tooltip: {
                    effect: 'dark',
                    content: 'Top Left 提示文字',
                    placement: 'top-start'
                },
                badge: {
                    'is-dot': true,      // 原点显示
                    type: 'primary',        // 类型：primary / success / warning / danger / info
                    value: function(data) {
                        if (data.testSwitch === true || data.testSwitch === 1) {
                            return '1'
                        } else {
                            return false;
                        }
                    }
                }
            },
            del: {
                type: 'button',
                label: '删除',
                props: {
                    size: 'mini',
                    type: 'danger'
                },
                show: {
                    name: 'testSwitch',
                    value: '1'
                }
            }
        },
		events: {
			init: '@list'
		}
    }
};
