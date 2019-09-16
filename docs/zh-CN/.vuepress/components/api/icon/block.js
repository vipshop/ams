export default {
	iconBlock1: {
		type: 'form',
		resource: {
			fields: {
				textFieldA: {
					type: 'text',
					label: '输入框icon',
					props: {
					  'prefix-icon': 'el-icon-search',
					  'suffix-icon': 'ams-icon-watcher'
					}
				},
				successLink: {
                    type: 'link',
					label: '链接Icon',
					default: 'https://vip.com',
					ctx: 'view',
                    props: {
                        type: 'success',
                        icon: 'ams-icon-crown'
                    }
                }
			}
		},
		ctx: 'edit',
		operations: {
			editItem: {
				type: 'button',
				label: '点赞',
				props: {
					type: 'primary',
					icon: 'ams-icon-heart'
				}
			}
		},
		blocks: {
			dropdownIconBLock: {
				type: 'dropdown',
				options: {
					menu: '下拉菜单Icon',
					menuItems: [
						{
							text: '黄金糕',
							props: {
								command: 'a',
								icon: 'ams-icon-advocate'
							}
						},
						{
							text: '狮子头',
							props: {
								command: 'b',
								icon: 'ams-icon-fold'
							}
						}
					]
				}
			}
		}
	}
};