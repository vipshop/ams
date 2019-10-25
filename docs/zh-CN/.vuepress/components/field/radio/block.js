export default {
	radioField1: {
		type: 'form',
		resource: {
			fields: {
				radioFieldA: {
					type: 'radio',
					label: '单选',
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
				radioFieldB: {
					type: 'radio',
					label: '带默认值',
					default: 'a',
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
				radioFieldC: {
					type: 'radio',
					label: '纯展示',
					default: 'b',
					props: {
						options: {
							a: '黄金糕',
							b: '双皮奶',
							c: '蚵仔煎',
							d: '龙须面',
							e: '北京烤鸭'
						}
					},
					ctx: 'view'
                },
                radioBorder: {
                    type: 'radio',
                    label: '边框单选',
                    props: {
                        type: 'border',
                        size: 'small',
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
                                value: 'c',
                                disabled: true
                            }
                        ]
                    },
                    on: {
                        change(val) {
                            console.log('radio-change', val);
                        }
                    }
                },
                radioButtonA: {
                    type: 'radio',
                    label: '单选按钮',
                    default: 'a',
                    props: {
                        type: 'button',
                        // size: 'mini',
                        // textColor: '#F5F6F8',
                        // fill: '#9EA2A7',
                        options: [
                            {
                                label: '黄金糕',
                                value: 'a',
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
                    },
                    on: {
                        change(val) {
                            console.log('radiobutton-change', val);
                        }
                    }
                },
                radioButtonB: {
                    type: 'radio',
                    label: '自定义颜色',
                    default: 'a',
                    props: {
                        type: 'button',
                        size: 'mini',
                        textColor: '#F5F6F8',
                        fill: '#f60',
                        options: [
                            {
                                label: '黄金糕',
                                value: 'a',
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
                    },
                    on: {
                        change(val) {
                            console.log('radiobutton-change', val);
                        }
                    }
                }
			}
		},
		ctx: 'edit'
	}
};
