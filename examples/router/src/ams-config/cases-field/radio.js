import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('radio', {
    resources: {
        radio: {
            api: {
                prefix: prefix,
                read: 'getRadio',
                update: 'update'
            },
            fields: {
                radio: {
                    type: 'radio',
                    label: '单选',
                    props: {
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
                            },
                            {
                                label: '龙须面',
                                value: 'd'
                            },
                            {
                                label: '北京烤鸭',
                                value: 'e'
                            },
                            {
                                label: '哈哈哈',
                                value: 1
                            }
                        ]
                    },
                    on: {
                        change(val) {
                            console.log('radio-change', val);
                        }
                    }
                },
                radioDisable: {
                    type: 'radio',
                    label: '禁用单选',
                    props: {
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
                radioBorder: {
                    type: 'radio',
                    label: '边框单选',
                    props: {
                        type: 'border',
                        size: 'small',
                        // disabled: true,
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
                radioButton: {
                    type: 'radio',
                    label: '单选按钮',
                    props: {
                        type: 'button',
                        // disabled: true,
                        size: 'mini',
                        textColor: '#F5F6F8',
                        fill: '#9EA2A7',
                        options: [
                            {
                                label: '黄金糕',
                                value: 'a'
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
                    },
                    on: {
                        change(val) {
                            console.log('radiobutton-change', val);
                        }
                    }
                }
            }
        }
    },
    blocks: {
        editRadio: {
            ctx: 'edit',
            type: 'form',
            resource: 'radio',
            style: {
                width: '50%'
            },
            operations: {
                submit: {
                    type: 'button',
                    label: '提交'
                }
            },
            events: {
                init: '@read',
                submit: '@update'
            }
        },
        viewRadio: {
            ctx: 'view',
            type: 'form',
            resource: 'radio',
            style: {
                width: '50%'
            },
            events: {
                init: '@read'
            }
        }
    }
});
