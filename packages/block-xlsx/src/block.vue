<template>
  <div class="ams-block-xlsx">
    <form class="file">
      <input
        ref="file"
        type="file"
        accept=".xls,.xlsx"
        @change="handleImport" />
    </form>
    <div class="loading v-modal"
        v-loading="loading"
        v-show="loading.show"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <span class="loading-text">{{ loading.text }}</span>
    </div>
  </div>
</template>
<script>
import ams from '@ams-team/ams';
import { exportHelper, importHelper } from './xlsx/vmHelpers';
import { fileToArrayBuffer, getLineBreakInExcel, removeFunction } from './utils';
import ExportWorker from './worker/exportWorker.js?worker';
import ImportWorker from './worker/importWorker.js?worker';

export default {
    mixins: [ams.mixins.blockMixin],
    data() {
        return {
            loading: {
                show: false,
                text: ''
            }
        };
    },
    computed: {
        options() {
            return this.block && this.block.options || {};
        },
        exportOptions() {
            const config = this.options && this.block.options.export;
            if (config.headers && this.fields) {
                config.headers = config.headers.map(field => {
                    const fieldConfig = this.fields[field.field] || {};

                    Object.assign(field, {
                        label: field.label || fieldConfig.label || '',
                        type: field.type || fieldConfig.type,
                        props: removeFunction(fieldConfig.props),
                        wch: typeof field.wch === 'undefined' ? 14 : field.wch
                    });
                    if (field.convert) {
                        field.convert = field.convert.toString();
                    }
                    if (field.type === 'select' && field.props.remote) {
                        field.type = 'text';
                    }
                    return field;
                });
            }
            return config;
        },
        importOptions() {
            const config = this.options && this.block.options.import;

            if (config.headers && this.fields) {
                config.headers = config.headers.map(field => {
                    const fieldConfig = this.fields[field.field] || {};
                    Object.assign(field, {
                        label: field.label || fieldConfig.label || '',
                        type: field.type || fieldConfig.type,
                        props: removeFunction(fieldConfig.props),
                        rules: removeFunction(fieldConfig.rules)
                    });
                    ['required', 'validate', 'convert', 'ignored'].forEach((item) => {
                        if (typeof field[item] === 'function') {
                            field[item] = field[item].toString();
                        }
                    });
                    return field;
                });
            }
            return config;
        }
    },
    methods: {
        setLoadingOptions(options) {
            if (options && typeof options === 'object') {
                Object.assign(this.loading, options);
            }
        },
        exportTemplate() {
            this.handleExport(true);
        },
        exportFile() {
            this.handleExport(false);
        },
        importFile() {
            this.$refs.file.click();
        },
        handleExport(isTemplate) {
            const exportOptions = this.exportOptions;
            const on = exportOptions.on || {};
            const methodToString = Object.keys(on)
                .map(item => ({ field: item, value: exportOptions.on[item].toString() }))
                .reduce((obj, cur) => Object.assign(obj, { [cur.field]: cur.value }), {});
            exportHelper({
                itemName: exportOptions.itemName,
                sheetName: exportOptions.itemName,
                $vm: this,
                ext: exportOptions.ext || 'xlsx',
                Worker: ExportWorker,
                workerInitData: {
                    order: {
                        field: exportOptions.idField,
                        direction: exportOptions.direction || 1
                    },
                    opts: exportOptions.options || {},
                    headers: exportOptions.headers,
                    mergeHeaders: exportOptions.mergeHeaders || [],
                    on: methodToString,
                    br: getLineBreakInExcel()
                },
                idField: exportOptions.idField || 'id',
                downlownTemplate: isTemplate || false,
                pagesize: exportOptions.pagesize || 100,
                eachFileRows: exportOptions.eachFileRows || 10000,
                exportType: exportOptions.exportType || 'async',
                getTotal: () => {
                    let query = {
                        ...exportOptions.query || {},
                        ...exportOptions.request.params || {}
                    };
                    query.is_export = 1;
                    query.pageSize = 0;
                    query.order = `${exportOptions.idField} desc`;
                    if (on.queryFilter) query = on.queryFilter(query);
                    return ams.request({
                        url: exportOptions.request.url,
                        method: exportOptions.request.method || 'get',
                        params: query,
                        data: exportOptions.request.data || {}
                    }).then(({ data }) => {
                        return data.data.total;
                    }).catch(this.$alert.error);
                },
                getList: (lastId, page, size) => {
                    let query = {};
                    let params = {};
                    let data = {};

                    const method =
                        exportOptions.request.method && exportOptions.request.method.toLocaleLowerCase()
                        || 'get';
                    if (['post', 'put'].indexOf(method) >= 0) {
                        query = {
                            pageSize: size,
                            ...exportOptions.query || {},
                            ...exportOptions.request.data || {}
                        };
                        params = exportOptions.request.params || {};
                    } else {
                        query = {
                            pageSize: size,
                            ...exportOptions.query || {},
                            ...exportOptions.request.params || {}
                        };
                        data = exportOptions.request.data || {};
                    }

                    if (exportOptions.exportType === 'sync') {
                        delete query.page;
                        if (lastId) {
                            query[`lt_${exportOptions.idField}`] = lastId;
                        }
                    } else {
                        query.page = page;
                    }
                    query.is_export = 1;
                    query.order = `${exportOptions.idField} desc`;
                    if (on.queryFilter) query = on.queryFilter(query);


                    if (['post', 'put'].indexOf(method) >= 0) {
                        data = query;
                    } else {
                        params = query;
                    }
                    return ams.request({
                        url: exportOptions.request.url,
                        method,
                        params,
                        data
                    }).then(({ data }) => data.data.list)
                        .catch(this.$alert.error);
                },
                setLoadingOptions: this.setLoadingOptions
            });
        },
        handleImport() {
            this.setLoadingOptions({ show: true });
            const file = this.$refs.file.files[0];
            if (file.type && ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].indexOf(file.type) < 0) {
                this.$alert('只能导入excel文件，格式为.xls,.xlsx，请重新选择');
                return;
            }
            this.$refs.file.value = null;
            const importOptions = this.importOptions;

            const methodToString = Object.keys(importOptions.on)
                .map(item => ({ field: item, value: importOptions.on[item].toString() }))
                .reduce((obj, cur) => Object.assign(obj, { [cur.field]: cur.value }), {});
            fileToArrayBuffer(file).then(ab => {
                const rowStartAt = Number(importOptions.rowStartAt) || 2;
                importHelper({
                    $vm: this,
                    Worker: ImportWorker,
                    workerInitData: {
                        opts: importOptions.options || {},
                        headers: importOptions.headers,
                        on: methodToString,
                        rowStartAt: rowStartAt - 1
                    },
                    file: ab,
                    eachPushRows: importOptions.eachPushRows || 100,
                    idField: importOptions.idField || 'id',
                    successCode: importOptions.request.successCode || 0,
                    importUrl: (sendData) => {
                        const extData = importOptions.request.data || {};

                        const on = importOptions.on;
                        if (on && typeof on.requestParse === 'function') {
                            sendData = on.requestParse(Object.assign({}, { data: sendData }, ...extData));
                        } else {
                            sendData = { data: JSON.stringify(sendData), ...extData };
                        }

                        const sendRequestData = {
                            url: importOptions.request.url,
                            method: 'post',
                            data: sendData,
                            params: importOptions.request.params || {}
                        };
                        ['params', 'withCredentials', 'contentType', 'headers'].forEach(key => {
                            if (typeof importOptions.request[key] !== 'undefined') {
                                sendRequestData[key] = importOptions.request[key];
                            }
                        });
                        return ams.request(sendRequestData).then(({ data }) => data);
                    },
                    setLoadingOptions: this.setLoadingOptions
                });
            });
        }
    }
};
</script>
<style lang="scss">
.ams-block-xlsx {
    .file {
        display: none;
    }
    .loading {
        z-index: 2013;
        .loading-text {
            position: fixed;
            top: 50%;
            color: #fff;
            font-size: 18px;
            width: 100%;
            text-align: center;
            margin-top: -20px;
        }
    }
}
</style>

