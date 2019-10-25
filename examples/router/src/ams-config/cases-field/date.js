import ams from '@ams-team/ams';
import { prefix } from '@/utils';

const datas = {
    time: '11:00',
    timepicker: 1548404069000,
    timerange: '1548413724000,1548417324000',

    year: 1420041600000,
    month: '2019-06',
    date: 1546272000000,
    week: 1546272000000,
    datetime: 1546272000000,
    datetimeWithFormat: 1546272000000,

    datetimerangeWithFormat: ['2019-03-16 00:00:00', '2019-04-24 00:00:00'],

    datetimerange: '31507200000,1551290400000',
    daterange: '1548259200000,1551110400000',
    dates: '1546963200000,1547568000000,1548086400000,1548172800000'
};

ams.block('date', {
    resources: {
        date: {
            // time
            // timepicker
            // timerange
            // year/month/date/week/datetime
            // datetimerange/daterange/dates
            api: {
                prefix: prefix,
                update: 'update'
            },
            fields: {
                time: {
                    label: 'time',
                    type: 'time',
                    props: {
                        'picker-options': {
                            step: '00:15'
                        }
                    }
                },
                timepicker: {
                    label: 'timepicker',
                    type: 'timepicker'
                },
                timerange: {
                    label: 'timerange',
                    type: 'timerange'
                },
                year: {
                    label: 'year(format int)',
                    type: 'date',
                    props: {
                        'value-format': 'timestamp',
                        type: 'year'
                    }
                },
                month: {
                    label: 'month(format string)',
                    type: 'date',
                    props: {
                        'value-format': 'yyyy-MM',
                        type: 'month'
                    }
                },
                date: {
                    label: 'date',
                    type: 'date'
                },
                datetimeWithFormat: {
                    label: 'datetime自定义格式化',
                    type: 'datetime',
                    formart: '{y}-{m}-{d} {h}:{i}'
                },
                week: {
                    label: 'week',
                    type: 'date',
                    props: {
                        type: 'week'
                    }
                },
                datetime: {
                    label: 'datetime',
                    type: 'date'
                },
                datetimerange: {
                    label: 'datetimerange',
                    type: 'datetimerange'
                },
                datetimerangeWithFormat: {
                    label: '使用数组format',
                    type: 'datetimerange',
                    props: {
                        'value-format': 'yyyy-MM-dd HH:mm:ss'
                    },
                    get(val) {
                        return val;
                    },
                    set(val) {
                        return val;
                    },
                    view(val) {
                        return val && val.join ? val.join(' 至 ') : '';
                    }
                    /**
                    可以通过以下方式全局配置，就可以不用通过每一个field都配置
                    ams.config({
                        defaultFieldConfig: {
                            datetimerange: {
                                get(val){return val},
                                set(val){return val},
                                view(val){return val},
                            }
                        }
                    })
                     */
                },
                daterange: {
                    label: 'daterange',
                    type: 'datetimerange',
                    props: {
                        type: 'daterange'
                    }
                },
                dates: {
                    label: 'dates',
                    type: 'datetimerange',
                    props: {
                        type: 'dates'
                    }
                }
            }
        }
    },
    blocks: {
        editDate: {
            data: datas,
            type: 'form',
            resource: 'date',
            ctx: 'edit',
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
                submit: '@update'
            }
        },
        viewDate: {
            data: datas,
            type: 'form',
            resource: 'date',
            ctx: 'view',
            style: {
                width: '50%'
            }
        }
    }
});
