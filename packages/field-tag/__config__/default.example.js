export default {
    resources: {
        res: {
            fields: {
                id: {
                    type: 'text',
                    label: 'id',
                    hidden: true
                },
                name: {
                    type: 'text',
                    label: '名称',
                    hidden: true
                },
                time: {
                    type: 'datetime',
                    label: '修改时间',
                    hidden: true
                },
                lastModifier: {
                    type: 'text',
                    label: '最后修改',
                    hidden: true
                },
                testTag: {
                    type: 'tag',
                    label: '选择标签（接口数据）',
                    get(value) {
                        return value.map(item => {
                            return (item.name || item) + '-get';
                        });
                    },
                    set(value) {
                        return value.map(item => {
                            return (item.name || item) + '-set';
                        });
                    },
                    view(value) {
                        return value.map(item => {
                            return item.name + '-view';
                        });
                    },
                    props: {
                        placeholder: '请输入标签',
                        action: 'https://www.easy-mock.com/mock/5a0023effbbb09615044cb82/tag',
                        successCode: 200
                    }
                },
                testTag2: {
                    type: 'tag',
                    label: '选择标签（mini）',
                    props: {
                        placeholder: '请输入标签',
                        action: 'https://www.easy-mock.com/mock/5a0023effbbb09615044cb82/tag',
                        successCode: 200,
                        size: 'mini',
                        'multiple-limit': 2
                        // type: 'info'
                        // 'trigger-on-focus': false
                    },
                    'collapseLimit': 2
                },
                testTag4: {
                    type: 'tag',
                    label: '选择标签（静态数据）',
                    props: {
                        placeholder: '请选择标签',
                        options: [
                            {
                                'id': 2001,
                                'name': '电商',
                            },
                            {
                                'id': 2002,
                                'name': '游戏',
                            },
                            {
                                'id': 2003,
                                'name': '效率',
                            },
                            {
                                'id': 2004,
                                'name': '资讯',
                            },
                            {
                                'id': 2005,
                                'name': '社区',
                            }
                        ]
                    }
                },
                testTag3: {
                    type: 'tag',
                    label: '创建标签（输入数据）',
                    props: {
                        placeholder: '请输入5个字符内的标签',
                        'allow-create': true,
                        maxlength: 5
                    }
                },
                testTag5: {
                    type: 'tag',
                    label: '创建或选择标签（静态数据）',
                    props: {
                        placeholder: '请输入标签',
                        'allow-create': true,
                        options: ['唯品会', '天猫', '淘宝', '京东', '拼多多']
                    }
                },
                testTag6: {
                    type: 'tag',
                    label: '创建或选择标签（接口数据）',
                    props: {
                        placeholder: '请输入标签',
                        'allow-create': true,
                        action: 'https://www.easy-mock.com/mock/5a0023effbbb09615044cb82/tag',
                        successCode: 200,
                        options: ['唯品会', '天猫', '淘宝', '京东', '拼多多']
                    }
                }
            }
        }
    },
    blocks: {
        formEdit: {
            type: 'form',
            ctx: 'edit',
            // 指定block使用的资源为上面声明的res
            resource: 'res',
            data: {
                testTag: [{ id: 2002, name: 'aaaa.ccc.name', subName: '分类一' }],
                testTag2: [{ id: 2002, name: 'aaaa.ccc.name', subName: '分类一' }],
                testTag3: ['前端'],
            },
            operations: {
                create: {
                    type: 'button',
                    label: '提交',
                    props: {
                        type: 'primary'
                    }
                }
            },
            props: {
                'label-width': '220px'
            },
            style: {
                width: '50%'
            }
        },
        formView: {
            type: 'form',
            ctx: 'view',
            data: {
                testTag: [
                    { id: 2002, name: 'aaaa.ccc.name', subName: '' },
                    { id: 2003, name: '组货分类（场景类型）', subName: '' }
                ],
                testTag2: [
                    { id: 2002, name: 'aaaa.ccc.name', subName: '' },
                    { id: 2003, name: '组货分类（场景类型）', subName: '' },
                    { id: 2004, name: '组货分类一', subName: '' },
                    { id: 2005, name: '组货分类二', subName: '' },
                    { id: 2006, name: '组货分类三', subName: '' },
                    { id: 2007, name: '组货分类四', subName: '' },
                    { id: 2008, name: '组货分类五', subName: '' },
                    { id: 2009, name: '组货分类六', subName: '' },
                    { id: 2010, name: '组货分类七', subName: '' },
                    { id: 2011, name: '组货分类八', subName: '' },
                    { id: 2012, name: '组货分类九', subName: '' },
                    { id: 2013, name: '组货分类十', subName: '' },
                    { id: 2014, name: '组货分类十一', subName: '' },
                    { id: 2015, name: '组货分类十二', subName: '' },
                    { id: 2016, name: '组货分类十三', subName: '' }
                ],
                testTag3: ['前端']
            },

            // 指定block使用的资源为上面声明的res
            resource: 'res',
            props: {
                'label-width': '220px'
            },
            style: {
                width: '50%'
            }
        },

        listBlock: {
            type: 'list',

            fields: {
                id: {
                    hidden: false
                },
                name: {
                    hidden: false
                },
                time: {
                    hidden: false
                },
                lastModifier: {
                    hidden: false
                }
            },

            data: {
                list: [
                    {
                        id: '1',
                        name: '列表区块',
                        time: '2019-04-02 20:23:23',
                        lastModifier: 'jun85.li',
                        testTag: [
                            { id: 2002, name: 'aaaa.ccc.name', subName: '' },
                            { id: 2003, name: '组货分类（场景类型）', subName: '' }
                        ],
                        testTag2: [
                            { id: 2002, name: 'aaaa.ccc.name', subName: '' },
                            { id: 2003, name: '组货分类（场景类型）', subName: '' },
                            { id: 2004, name: '组货分类一', subName: '' },
                            { id: 2005, name: '组货分类二', subName: '' },
                            { id: 2006, name: '组货分类三', subName: '' },
                            { id: 2007, name: '组货分类四', subName: '' },
                            { id: 2008, name: '组货分类五', subName: '' },
                            { id: 2009, name: '组货分类六', subName: '' },
                            { id: 2010, name: '组货分类七', subName: '' },
                            { id: 2011, name: '组货分类八', subName: '' },
                            { id: 2012, name: '组货分类九', subName: '' },
                            { id: 2013, name: '组货分类十', subName: '' },
                            { id: 2014, name: '组货分类十一', subName: '' },
                            { id: 2015, name: '组货分类十二', subName: '' },
                            { id: 2016, name: '组货分类十三', subName: '' }
                        ],
                        testTag3: ['前端']
                    },
                    {
                        id: '2',
                        name: '列表区块',
                        time: '2019-04-02 20:23:23',
                        lastModifier: 'jun85.li',
                        testTag: [
                            { id: 2002, name: 'aaaa.ccc.name', subName: '' },
                            { id: 2003, name: '组货分类（场景类型）', subName: '' }
                        ],
                        testTag2: [
                            { id: 2002, name: 'aaaa.ccc.name', subName: '' },
                            { id: 2003, name: '组货分类（场景类型）', subName: '' },
                            { id: 2004, name: '组货分类二', subName: '' }
                        ],
                        testTag3: ['前端']
                    }
                ],
                total: 1
            },

            // 指定block使用的资源为上面声明的res
            resource: 'res',
        }
    }
};
