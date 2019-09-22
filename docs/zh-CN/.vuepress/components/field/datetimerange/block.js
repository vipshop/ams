export default {
	datetimerangeField1: {
		type: 'form',
		resource: {
			fields: {
				datetimerangeFieldA: {
					type: 'datetimerange',
					label: '日期时间',
					props: {
						placeholder: '请选择日期时间'
					}
				},
				datetimerangeFieldB: {
					type: 'datetimerange',
					label: '带默认值',
					default: '1547568120000,1551290400000',
					props: {
						placeholder: '请选择日期时间'
					}
				},
				datetimerangeFieldC: {
					type: 'datetimerange',
					label: '纯展示',
					default: '1547568120000,1551290400000',
					ctx: 'view'
				}
			}
		},
		ctx: 'edit'
	},
	datetimerangeField2: {
		type: 'form',
		resource: {
			fields: {
				datetimerangeFieldA: {
					type: 'datetimerange',
					label: '日期',
					props: {
						placeholder: '请选择日期',
						type: 'daterange'
					}
				},
				datetimerangeFieldB: {
					type: 'datetimerange',
					label: '带默认值',
					default: '1547568120000,1551290400000',
					props: {
						placeholder: '请选择日期',
						type: 'daterange'
					}
				},
				datetimerangeFieldC: {
					type: 'datetimerange',
					label: '纯展示',
					default: '1547568120000,1551290400000',
					ctx: 'view',
					props: {
						type: 'daterange'
					}
				}
			}
		},
		ctx: 'edit'
	},
	datetimerangeField3: {
		type: 'form',
		resource: {
			fields: {
				datetimerangeFieldA: {
					type: 'datetimerange',
					label: '日期',
					props: {
						placeholder: '请选择日期',
						type: 'dates'
					}
				},
				datetimerangeFieldC: {
					type: 'datetimerange',
					label: '纯展示',
					default: '1547568120000,1551290400000',
					ctx: 'view',
					props: {
						type: 'dates'
					}
				}
			}
		},
		ctx: 'edit'
	},
	datetimerangeField4: {
		type: 'form',
		resource: {
			fields: {
				datetimerangeFieldA: {
					type: 'datetimerange',
					label: '日期时间',
					props: {
                        'value-format': 'yyyy-MM-dd HH:mm:ss'
					},
					default: ['2019-03-16 00:00:00', '2019-04-24 00:00:00']
				},
				datetimerangeFieldC: {
					type: 'datetimerange',
					label: '纯展示',
					default: ['2019-03-16 00:00:00', '2019-04-24 00:00:00'],
					ctx: 'view',
					props: {
                        'value-format': 'yyyy-MM-dd HH:mm:ss'
                    }
				}
			}
		},
		ctx: 'edit'
	}
};
