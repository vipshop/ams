import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('xlsx', {
    resources: {
        'resource-xlsx': {
            fields: {
                basic_id: {
                    type: 'text',
                    label: 'ID',
                    rules: {
                        required: true,
                        message: '必填且只能填写数字类型',
                        pattern: /^\d+$/
                    }
                },
                online_name: {
                    type: 'text',
                    label: '标题',
                    rules: {
                        required: true,
                        message: '必填'
                    }
                },
                department_id: {
                    type: 'select',
                    label: '所属部类',
                    props: {
                        options: {
                            '1': '食品部',
                            '2': '母婴业务部',
                            '3': '女装业务部',
                            '4': '男装业务部',
                            '5': '美妆业务部'
                        }
                    },
                    rules: {
                        required: true,
                        message: '必填'
                    }
                },
                warehouse_id: {
                    type: 'select',
                    label: '分仓',
                    props: {
                        options: {
                            '1': '广州仓',
                            '2': '上海仓',
                            '3': '成都仓',
                            '4': '北京仓',
                            '5': '武汉仓'
                        }
                    },
                    rules: {
                        required: true,
                        message: '必填'
                    }
                },
                to_warehouse_ids: {
                    type: 'select',
                    label: '上线区域',
                    props: {
                        options: {
                            '1': '广州',
                            '2': '上海',
                            '3': '成都',
                            '4': '北京',
                            '5': '武汉'
                        }
                    },
                    rules: {
                        required: true,
                        message: '必填'
                    }
                }
            }
        }
    },
    blocks: {
        buttons: {
            type: 'component',
            options: {
                is: 'div'
            },
            style: {
                padding: '10px'
            },
            operations: {
                downloadTemplate: {
                    type: 'button',
                    label: '下载模板',
                    props: {
                        size: 'mini'
                    }
                },
                downloadFile: {
                    type: 'button',
                    label: '下载文件',
                    props: {
                        size: 'mini',
                        type: 'primary'
                    }
                },
                uploadFile: {
                    type: 'button',
                    label: '上传文件',
                    props: {
                        size: 'mini',
                        type: 'success'
                    }
                }
            },
            actions: {
                downloadTemplate: function () { ams.$blocks.xlsxForm.exportTemplate() },
                downloadFile: function () { ams.$blocks.xlsxForm.exportFile() },
                uploadFile: function () { ams.$blocks.xlsxForm.importFile() }
            }
        },
        xlsxForm: {
            type: 'xlsx',
            ctx: 'edit',
            resource: 'resource-xlsx',
            fields: {
                title: 'hidden'
            },
            actions: {},
            options: {
                export: {
                    headers: [
                        {
                            field: 'basic_id', wch: 12,
                            convert: (v, row) => {
                                return `${v}-a`;
                            }
                        },
                        { field: 'online_name', wch: 18 },
                        { field: 'department_id', wch: 18 },
                        { field: 'warehouse_id', wch: 8, multirow: true },
                        { field: 'to_warehouse_ids', wch: 18, multirow: true }
                    ],
                    mergeHeaders: [
                        { from: 'basic_id', to: 'department_id', value: '基本信息', bg: '#ffffff' },
                        { from: 'warehouse_id', to: 'to_warehouse_ids', value: '分仓信息', bg: '#cccccc' }
                    ],
                    request: {
                        url: `${prefix}export`,
                        methods: 'get'
                    },
                    idField: 'basic_id',
                    itemName: '排期',
                    sheetName: '排期表',
                    pagesize: 100,
                    eachFileRows: 10000,
                    downlownTemplate: false,
                    query: {
                        page: 1
                    },
                    on: {
                        preDataFilter: function (org) {
                            org.basic_id = `加工-${org.basic_id}`;
                            return org;
                        },
                        getMultirows: function (data) {
                            return data.warehouses;
                        }
                    }
                },
                import: {
                    headers: [
                        { field: 'basic_id', wch: 12 },
                        { field: 'online_name', wch: 18 },
                        { field: 'department_id', wch: 18, multirow: true }
                    ],
                    request: {
                        url: `${prefix}export`,
                        methods: 'get'
                    },
                    rowStartAt: 2, // 从第2行开始读取
                    idField: 'basic_id',
                    itemName: '排期',
                    sheetName: '排期表',
                    on: {
                        combinerCheck: function (frontRow, curRow) { // 合并行规则
                            return String(frontRow.basic_id) === String(curRow.basic_id);
                        },
                        assignMultirow: function (item, multirows) {
                            item.list = multirows;
                        },
                        preCheck: function () { }, // 刚读取数据后的检查
                        postCheck: function () { }, // 发送接口前的处理
                        globalParse: function (items) { // 合并、对字段做处理后的处理
                            return items;
                        }
                    }
                }
            }
        }
    }
});