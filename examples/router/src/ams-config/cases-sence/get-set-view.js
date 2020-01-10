import ams from '@ams-team/ams';

const datas = {
    datetime: 'date:1546278503030',
    testSelect: ['a', 'b']
};

ams.block('get-set-view', {
    resources: {
        getSetView: {
            api: {
                prefix: '/test/',
                create: 'create'
            },
            fields: {
                datetime: {
                    label: 'datetime',
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
                    label: '多选数组',
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
            ctx: 'edit',
            type: 'form',
            resource: 'getSetView',
            style: {
                width: '50%'
            },
            data: {
                datetime: '',
                testSelect: []
            },
            events: {
                init: 'initFn',
                submit: '@create'
            },
            actions: {
                initFn() {
                    setTimeout(() => {
                        this.data.datetime = 'date:1546278503030';
                        this.data.testSelect = ['a', 'b'];
                    }, 1000);
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
            ctx: 'view',
            type: 'form',
            resource: 'getSetView',
            style: {
                width: '50%'
            },
            data: datas,
            events: {
                submit: '@create'
            }
        }
    }
});
