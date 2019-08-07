import ams from '@ams-team/ams';

const datas = {
    datetime: 'date:1546278503030'
};

ams.block('get-set-view', {
    resources: {
        getSetView: {
            fields: {
                datetime: {
                    label: 'datetime',
                    type: 'datetime',
                    get(value) {
                        // 格式化成13位时间戳（datetime组件）
                        return Number(value.slice(5));
                    },
                    set(value) {
                        // localValue可能为Date或者是时间戳
                        return 'date:' + (value instanceof Date ? value.getTime() : value);
                    },
                    view(value) {
                        // 格式化13位时间戳
                        return value.slice(5) / 1000;
                    }
                }
            }
        }
    },
    blocks: {
        editGetSetView: {
            data: datas,
            type: 'form',
            resource: 'getSetView',
            ctx: 'edit',
            style: {
                width: '50%'
            },
            actions: {
                submit() {
                    alert(this.data.datetime);
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
            data: datas,
            type: 'form',
            resource: 'getSetView',
            ctx: 'view',
            style: {
                width: '50%'
            },
            events: {
                submit: '@create'
            }
        }
    }
});
