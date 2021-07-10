# block-bct-progress bct定制进度条

## 预览图

![block-bct-progress](http://h5rsc.vipstatic.com/ams/packages/block-bct-progress.png)

## 例子

```js
ams.block('bct-progress', {
    resources: {
        /**
         * 配置数据（资源）
         * 首先我们需要配置`资源`、用于描述接口的`字段`组成、以及`api`的存取地址
         */
        ecahrtRes: {
            api: {
                // api前缀
                prefix: '//www.yournana.club/vipshop/',
                // 读取数据接口
                read: 'read',
            }
        }
    },
    /**
     * 配置区块
     */
    blocks: {
        userFlowDetail: {
            type: 'grid',
            style: {
                'grid-gap': '0'
            },
            blocks: {
                bctLeftTable: {
                    type: 'list',
                    resource: {
                        fields: {
                            userType: {
                                type: 'text',
                                label: '用户类型'
                            },
                            number: {
                                type: 'text',
                                label: '流入用户量'
                            },
                            rate: {
                                type: 'text',
                                label: '占比'
                            }
                        }
                    },
                    data: {
                        list: [{
                            userType: 1,
                            number: 2,
                            rate: 20
                        }, {
                            userType: 2,
                            number: 2,
                            rate: 20
                        }, {
                            userType: 3,
                            number: 2,
                            rate: 20
                        }]
                    }
                },
                bctProgress: {
                    type: 'bct-progress',
                    props: {
                        width: 150
                    },
                    data: {
                        leftLabel: '流入用户量',
                        leftValue: 21192,
                        rightLabel: '流出用户量',
                        rightValue: 20686,
                        iconClass: 'ams-icon-heart',
                        iconText: '心动者'
                    }
                },
                bctRightTable: {
                    type: 'list',
                    resource: {
                        fields: {
                            userType: {
                                type: 'text',
                                label: '用户类型'
                            },
                            number: {
                                type: 'text',
                                label: '流入用户量'
                            },
                            rate: {
                                type: 'text',
                                label: '占比'
                            }
                        }
                    },
                    data: {
                        list: [{
                            userType: 1,
                            number: 2,
                            rate: 20
                        }, {
                            userType: 2,
                            number: 2,
                            rate: 20
                        }]
                    }
                },
            }
        }
    }
});
```