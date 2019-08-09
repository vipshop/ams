import ams from '@ams-team/ams';

ams.block('unitselect', {
    resources: {
        'unitselect': {
            fields: {
                money: {
                    type: 'unitselect',
                    label: '金额',
                    defaultUnit: '万元',
                    units: ['万元', '亿元'],
                    style: {
                        width: '200px'
                    },
                    get(val, field) {
                        if (isNaN(val)) {
                            val = '0万元';
                        } else if (val > 1e8) {
                            val = (val / 1e8).toFixed(2) + '亿元';
                        } else {
                            val = (val / 1e4).toFixed(2) + '万元';
                        }
                        let currentUnit = field.defaultUnit;
                        for (let i = 0; i < field.units.length; i++) {
                            if (new RegExp(field.units[i] + '$').test(val)) {
                                currentUnit = field.units[i];
                                break;
                            }
                        }
                        console.log('getUnits', val, 'currentUnit', currentUnit);
                        return {
                            unit: currentUnit,
                            val: val ? val.replace(new RegExp(currentUnit + '$'), '') : ''
                        };
                    },
                    set(val, field) {
                        console.log('setUnits', val);
                        if (val.unit === '万元') {
                            return isNaN(val.val) ? 0 : val.val * 1e4;
                        } else {
                            return isNaN(val.val) ? 0 : val.val * 1e8;
                        }
                    },
                    view(value, field) {
                        console.log('viewUnits', value);
                        if (isNaN(value)) {
                            return '0万元';
                        } else if (value > 1e8) {
                            return (value / 1e8).toFixed(2) + '亿元';
                        } else {
                            return (value / 1e4).toFixed(2) + '万元';
                        }
                    }
                },
                meter: {
                    type: 'unitselect',
                    label: '距离',
                    defaultUnit: '毫米',
                    units: ['毫米', '厘米', '分米', '千米'],
                    style: {
                        width: '200px'
                    }
                }
            }
        }
    },
    blocks: {
        unitselectEdit: {
            type: 'form',
            resource: 'unitselect',
            ctx: 'edit',
            data: {
                money: 123918241234,
                meter: '222毫米'
            },
            operations: {
                update: {
                    type: 'button',
                    label: '提交',
                    props: {
                        type: 'primary'
                    }
                }
            }
        },
        unitselectView: {
            type: 'form',
            ctx: 'view',
            resource: 'unitselect',
            data: {
                money: 123918241234,
                meter: '222毫米'
            }
        }
    }
});
