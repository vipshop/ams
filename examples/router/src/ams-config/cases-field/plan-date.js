import ams from '@ams-team/ams';
import { prefix } from '@/utils';

const datas = {
    date: 1546272000000,
    custom_dateA: 1546272000000,
    custom_dateB: 1546272000000,
    custom_dateC: 1546272000000
};

ams.block('plan-date', {
    resources: {
        'plan-date': {
            api: {
                prefix: prefix,
                update: 'update'
            },
            fields: {
                date: {
                    label: '常规日期1',
                    type: 'date'
                },
                custom_dateA: {
                    label: '自定义日期1',
                    type: 'plan-date',
                    props: {
                        'popper-class': 'testData',
                        'picker-options': {
                            disabledDate(time) {
                                const dates = ['2019/01/02 00:00:00', '2019/01/15 00:00:00'].map(date => new Date(date).getTime());
                                return dates.indexOf(time.getTime()) >= 0;
                            },
                            cellContent: [{
                                label: '2019/01/06',
                                value: '14501/16000'
                            }, {
                                label: '2019/01/07',
                                value: '14502/16000'
                            }, {
                                label: '2019/01/08',
                                value: '14503/16003'
                            }, {
                                label: '2019/01/09',
                                value: '11112/22222'
                            }]
                        }
                    },
                    on: {
                        async focus(date) {
                            console.log(date);
                        },
                        panelDateChange(date) {
                            console.log(date);
                        }
                    }
                },
                custom_dateB: {
                    label: '自定义日期2',
                    type: 'plan-date',
                    props: {
                        'picker-options': {
                            disabledDate(time) {
                                const dates = ['2019/01/02 00:00:00', '2019/01/15 00:00:00'].map(date => new Date(date).getTime());
                                return dates.indexOf(time.getTime()) >= 0;
                            },
                            cellContent: [{
                                label: '2019/01/08',
                                value: '<span style="color: red; width: 80px;">精武门/陈真</span>'
                            }, {
                                label: '2019/01/09',
                                value: '<span style="color: blue; width: 80px;">精武门/陈假</span>'
                            }, {
                                label: '2019/01/10',
                                value: '<span style="color: pink; width: 80px;">精武门/陈粒</span>'
                            }]
                        }
                    }
                },
                custom_dateC: {
                    label: '自定义日期3',
                    type: 'plan-date',
                    props: {
                        'popper-class': 'testData',
                        'picker-options': {
                            disabledDate() {
                                return false;
                            },
                            cellContent: []
                        }
                    },
                    on: {
                        async focus(date) {
                            await ams.callAction('@editPlanDate.changePanelContent', {
                                date
                            });
                        }
                    }
                }
            }
        }
    },
    blocks: {
        editPlanDate: {
            ctx: 'edit',
            type: 'form',
            resource: 'plan-date',
            style: {
                width: '50%'
            },
            data: datas,
            actions: {
                async changePanelContent({ date }) {
                    console.log('date', date);
                    await this.callAction('@update'); // 假装发一个请求
                    this.$set(this.fields.custom_dateC.props['picker-options'], 'disabledDate', function (time) {
                        const dates = ['2019/01/02 00:00:00', '2019/01/03 00:00:00'].map(e => new Date(e).getTime());
                        return dates.indexOf(time.getTime()) >= 0;
                    });
                    await this.$set(this.fields.custom_dateC.props['picker-options'], 'cellContent', [{
                        label: '2019/01/06',
                        value: '14501/16000'
                    }, {
                        label: '2019/01/07',
                        value: '14502/16000'
                    }, {
                        label: '2019/01/08',
                        value: '14503/16003'
                    }, {
                        label: '2019/01/09',
                        value: '11112/22222'
                    }]);
                }
            }
        },
        viewPlanDate: {
            ctx: 'view',
            type: 'form',
            resource: 'plan-date',
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
