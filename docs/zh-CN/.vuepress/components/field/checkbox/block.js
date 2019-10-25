const options = {
	a: '黄金糕',
	b: '双皮奶',
	c: '蚵仔煎',
	d: '龙须面',
	e: '北京烤鸭'
}
export default {
	checkboxField1: {
		type: 'form',
		resource: {
			fields: {
				checkboxFieldA: {
					type: 'checkbox',
					label: '多选',
					props: {
						options: options
					}
				},
				checkboxFieldB: {
					type: 'checkbox',
					label: '带默认值',
					default: 'a,e',
					props: {
						options: options
					}
				},
				checkboxFieldC: {
					type: 'checkbox',
					label: '纯展示',
					default: 'b,c',
					props: {
						options: options
					},
					ctx: 'view'
				},
				checkboxFieldD: {
					type: 'checkbox',
					label: '超出隐藏',
					default: 'b,c,d,e',
					props: {
						options: options
					},
					collapseLimit: 2,
					ctx: 'view'
                },
                checkboxDisable: {
                    type: 'checkbox',
                    label: '多选禁用',
                    props: {
                        // 全部禁用
                        // disabled: true,
                        options: [
                            {
                                label: '黄金糕',
                                value: 'a',
                                disabled: true
                            },
                            {
                                label: '双皮奶',
                                value: 'b',
                                disabled: true
                            },
                            {
                                label: '蚵仔煎',
                                value: 'c'
                            }
                        ]
                    }
                },
                checkboxBorder: {
                    type: 'checkbox',
                    label: '多选边框',
                    props: {
                        type: 'border',
                        options: [
                            {
                                label: '黄金糕',
                                value: 'a',
                                disabled: true
                            },
                            {
                                label: '双皮奶',
                                value: 'b'
                            },
                            {
                                label: '蚵仔煎',
                                value: 'c'
                            }
                        ]
                    }
                },
                checkboxButton: {
                    type: 'checkbox',
                    label: '多选按钮',
                    props: {
                        type: 'button',
                        size: 'mini',
                        'select-all': true,
                        options: [
                            {
                                label: '黄金糕',
                                value: 'a'
                            },
                            {
                                label: '双皮奶',
                                value: 'b'
                            },
                            {
                                label: '蚵仔煎',
                                value: 'c'
                            }
                        ]
                    }
                },
			}
		},
		ctx: 'edit'
	},
	checkboxField2: {
		type: 'form',
		resource: {
			fields: {
				checkboxFieldA: {
					type: 'checkbox',
					label: '多选',
					props: {
						'select-all': true,
						options: options
					}
				}
			}
		},
		ctx: 'edit'
	}
};
