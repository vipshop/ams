export default {
	linkField1: {
		type: 'form',
		resource: {
			fields: {
				link: {
                    type: 'link',
                    label: 'href链接',
                    props: {
                        href: 'https://vip.com',
                        target: '_blank'
                    }
                },
                primaryLink: {
                    type: 'link',
                    label: '值为链接ID',
                    props: {
                        type: 'primary',
                        target: '_blank',
                        href(value) {
                            return 'http://vip.com/v/gce/ruledetail?id=' + value;
                        }
                    }
                },
                successLink: {
                    type: 'link',
                    label: '值为链接',
                    props: {
                        type: 'success',
                        icon: 'el-icon-share'
                    }
                }
			}
		},
		ctx: 'edit'
	},
	linkField2: {
		type: 'form',
		resource: {
			fields: {
				link: {
                    type: 'link',
                    label: 'href链接',
                    props: {
                        href: 'https://vip.com',
                        target: '_blank'
                    }
                },
                primaryLink: {
                    type: 'link',
                    label: '值为链接ID',
                    props: {
                        type: 'primary',
                        target: '_blank',
                        href(value) {
                            return 'http://vip.com/v/gce/ruledetail?id=' + value;
                        }
                    }
                },
                successLink: {
                    type: 'link',
                    label: '值为链接',
                    props: {
                        type: 'success',
                        icon: 'el-icon-share'
                    }
                }
			}
		},
		data: {
			link: '默认',
			primaryLink: '51853695',
			successLink: 'https://vip.com'
		},
		ctx: 'view'
	},
	linkField3: {
		type: 'form',
		resource: {
			fields: {
                objectLink: {
                    type: 'object',
                    label: '对象类型',
                    fields: {
                        name: {
                            type: 'text',
                            label: '测试'
                        },
                        link: {
                            type: 'link',
                            label: '链接',
                            props: {
                                type: 'primary',
                                target: '_blank',
                            }
                        }
                    }
                },
                arrayLink: {
                    type: 'array',
                    label: '多个链接',
                    field: {
                        type: 'link',
                        label: '链接',
                        props: {
                            type: 'primary',
                            target: '_blank',
                            href(value, field) {
                                return 'http://vip.com/v/gce/ruledetail?id=' + value;
                            }
                        }
                    }
                },
                viewArrayLink: {
                    type: 'array',
                    label: '多个链接展示',
                    field: {
                        type: 'link',
                        label: '链接',
                        props: {
                            type: 'primary',
                            target: '_blank',
                            href(value, field) {
                                return 'http://vip.com/v/gce/ruledetail?id=' + value;
                            }
						},
						ctx: 'view'
					},
					ctx: 'view'
                }
			}
		},
		data: {
			objectLink: {
				name: 'w3cmark',
				link: 'http://w3cmark.com'
			},
			arrayLink: ['51853695-1', '51853695-2', '51853695-3'],
			viewArrayLink: ['51853695-1', '51853695-2', '51853695-3']
		},
		ctx: 'edit'
	}
};
