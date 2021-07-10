import ams from '@ams-team/ams';
import { prefix } from '@/utils';

const datas = {
    checkbox: 'a,b,c',
    checkboxDisable: 'c',
    checkboxBorder: 'b,c',
    checkboxButton: 'a,c',
    radioButton: 'a',
    remoteCheckbox: 2003
};

ams.block('checkbox', {
    resources: {
        checkbox: {
            api: {
                prefix: prefix,
                read: 'getCheckbox',
                update: 'update'
            },
            fields: {
                checkbox: {
                    type: 'checkbox',
                    label: '多选1',
                    props: {
                        options: {
                            a: '黄金糕',
                            b: '双皮奶',
                            c: '蚵仔煎',
                            d: '龙须面',
                            e: '北京烤鸭',
                            222: '哈哈哈',
                            0: '000'
                        },
                        'select-all': true
                    },
                    rules: [
                        { required: true, message: '请输入活动名称', trigger: 'change' }
                    ]
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
                radioButton: {
                    type: 'checkbox',
                    label: '单选按钮',
                    props: {
                        type: 'button',
                        size: 'mini',
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
                remoteCheckbox: {
                    BASE: 'SELECT_REMOTE',
                    label: '远程选项',
                    type: 'checkbox',
                    remoteConfig: {
                        action: `${prefix}tag`,
                        queryKey: 'requiredName',
                        labelKey: 'name',
                        isInitEmpty: true,
                        isMiniBackfill: false
                    }
                }
            }
        }
    },
    blocks: {
        editCheckbox: {
            ctx: 'edit',
            type: 'form',
            resource: 'checkbox',
            style: {
                width: '50%'
            },
            events: {
                init: '@read',
                submit: '@update'
            },
            operations: {
                submit: {
                    type: 'button',
                    label: '提交'
                }
            },
            actions: {
                fieldChange({ name, value, path }) {
                    console.log('fieldChange--', name, value, path);
                    if (name === 'radioButton' && value && this.data) {
                        const valueArr = value.split(',') || [];
                        this.data.radioButton = valueArr[valueArr.length - 1];
                    }
                }
            }
        },
        viewCheckbox: {
            ctx: 'view',
            data: datas,
            type: 'form',
            resource: 'checkbox',
            style: {
                width: '50%'
            },
            events: {
                init: '@read'
            }
        }
    }
});
