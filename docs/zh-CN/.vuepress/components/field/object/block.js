const fields = {
	text: {
		type: 'text',
		label: '规则',
		rules: [
			{
				required: true,
				message: '请输入活动名称',
				trigger: 'blur'
			}
		]
	},
	date: {
		type: 'date',
		label: '日期'
	}
}
export default {
	objectField1: {
		type: 'form',
		resource: {
			fields: {
				objectFieldA: {
					type: 'object',
					label: '对象',
					fields: fields
				},
				objectFieldB: {
					type: 'object',
					label: '带默认值',
					default: {
						text: '我是文案',
						date: '1546272000000'
					},
					fields: fields
				},
				objectFieldC: {
					type: 'object',
					label: '纯展示',
					default: {
						text: '我是文案',
						date: '1546272000000'
					},
					fields: {
						text: {
							type: 'text',
							label: '规则',
							ctx: 'view'
						},
						date: {
							type: 'date',
							label: '日期',
							ctx: 'view'
						}
					}
				}
			}
		},
		ctx: 'edit'
	},
	objectField2: {
		type: 'form',
		resource: {
			fields: {
				objectFieldA: {
					type: 'object',
					label: '对象',
					fields: {
						text: {
							type: 'text',
							label: '规则',
							props: {
								inline: true
							}
						},
						date: {
							type: 'date',
							label: '日期',
							props: {
								inline: true
							}
						},
						select: {
							type: 'select',
							label: '公司',
							props: {
								options: {
									'a': '黄金糕',
									'b': '双皮奶',
									'c': '蚵仔煎',
									'd': '龙须面',
									'e': '北京烤鸭'
								},
								inline: true
							}
						},
						content: {
							type: 'textarea',
							label: '内容'
						}
					}
				}
			}
		},
		ctx: 'edit'
	},
	objectField3: {
		type: 'form',
		resource: {
			fields: {
				objectFieldA: {
					type: 'object',
					label: '组合编辑',
					fields: {
						date: {
							type: 'date',
							label: '日期'
						},
						ArrayArray: {
							type: 'array',
							label: '组织架构',
							field: {
								type: 'object',
								label: '一级',
								fields: {
									text: {
										type: 'text',
										label: '名称',
									},
									array: {
										type: 'array',
										label: '二级',
										field: {
											type: 'text',
											label: '名称'
										}
									}
								}
							}
						}
					}
				},
				objectFieldB: {
					type: 'object',
					label: '带默认值组合',
					default: {
						date: '1546272000000',
						organization: [
							{
								text: '产品技术中心',
								secondary: ['电商前端']
							}
						]
					},
					fields: {
						date: {
							type: 'date',
							label: '日期'
						},
						organization: {
							type: 'array',
							label: '组织架构',
							field: {
								type: 'object',
								// label: '一级',
								fields: {
									text: {
										type: 'text',
										label: '名称',
									},
									secondary: {
										type: 'array',
										label: '二级部门',
										field: {
											type: 'text'
											// label: '名称'
										}
									}
								}
							}
						}
					}
				},
				objectFieldC: {
					type: 'object',
					label: '组合展示',
					ctx: 'view',
					default: {
						date: '1546272000000',
						organization: [
							{
								text: '产品技术中心',
								secondary: ['电商前端']
							}
						]
					},
					fields: {
						date: {
							type: 'date',
							label: '日期',
							ctx: 'view',
						},
						organization: {
							type: 'array',
							label: '组织架构',
							ctx: 'view',
							field: {
								type: 'object',
								label: '一级',
								ctx: 'view',
								fields: {
									text: {
										type: 'text',
										label: '名称',
										ctx: 'view'
									},
									secondary: {
										type: 'array',
										label: '二级',
										ctx: 'view',
										field: {
											type: 'text',
											label: '名称',
											ctx: 'view'
										}
									}
								}
							}
						}
					}
				}
			}
		},
		ctx: 'edit'
	},
	objectField4: {
		type: 'form',
		resource: {
			fields: {
				objectFieldA: {
					type: 'object',
					label: '收货地址',
					fields: {
						ArrayArray: {
							type: 'array',
							// label: '地址',
							default: [{
							}],
							field: {
								type: 'object',
								label: '地址',
								fields: {
									province: {
										type: 'select',
										props: {
											multiple: false,
											placeholder: '请选择省份',
											inline: true,
											options: {
												gd: '广东省',
												gx: '广西省',
												hn: '湖南省'
											}
										}
									},
									city: {
										type: 'select',
										props: {
											multiple: false,
											placeholder: '请选择',
											inline: true
										},
										changeConfig(field, context) {
											if (context) {
												if (context.province === 'gd') {
													field.props.options = {
														'gz': '广州市',
														'dg': '东莞市',
														'sz': '深圳市'
													};
												} else if (context.province === 'gx') {
													field.props.options = {
														'gl': '桂林市',
														'nn': '南宁市',
														'bh': '北海市'
													};
												} else if (context.province === 'hn') {
													field.props.options = {
														'cs': '长沙市',
														'rz': '永州市'
													};
												}
												
											}
											field.props.options && !field.props.options[context.city] && (context.city = '');
											return field;
										}
									}
								}
							}
						}
					}
				}
			}
		},
		ctx: 'edit'
	}
};
