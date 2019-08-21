<template>
<div class="ams-args">
    <h2 id="参数列表" class="ams-args-title"><a href="#参数列表" aria-hidden="true" class="header-anchor">#</a> 参数列表</h2>
    <el-table :data="args"
              class="ams-args-table">
        <el-table-column prop="name"
                         width="160px"
                         label="参数">
        </el-table-column>
        <el-table-column prop="info"
                         label="说明">
        </el-table-column>
        <el-table-column prop="type"
                         label="可选值 | 类型">
        </el-table-column>
        <el-table-column prop="require"
                         width="80px"
                         label="必填">
        </el-table-column>
        <!-- <el-table-column prop="default"
                         label="默认值">
        </el-table-column> -->
    </el-table>
</div>
</template>


<script>
import ams from '@ams-team/ams';

export default {
    props: {
        config: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            args: []
        };
    },
    created() {
        this.getArgs();
    },
    methods: {
        getArgs() {
            const ans = [];
            let config = ams.deepCloneConfig(this.config);
            // console.log(config);
            Object.keys(config).forEach(name => {
                let field = config[name];
                this.getArg(name, field, '', ans);
            });
            // console.log(JSON.stringify(this.config));
            this.args = ans;
        },
        getArg(name, field, path = '', ans) {
            if (!field) {
                return;
            }
            ans.push({
                name: `${path}${name}`,
                info: field.info,
                require: field.rules ? '是' : '否',
                type: this.getType(field)
            });
            // object类型
            let objectField;
            // array类型
            let arrayField;
            if (field.type === 'union') {
                Object.keys(field.fields).forEach(key => {
                    if (!field.fields[key]) {
                        return;
                    }
                    let unionField = field.fields[key];
                    if (unionField.type === 'object') {
                        objectField = unionField;
                    }
                    if (unionField.type === 'array') {
                        arrayField = unionField;
                    }
                });
            }
            if (field.type === 'object') {
                objectField = field;
            } else if (field.type === 'array') {
                arrayField = field;
            }
            if (objectField) {
                Object.keys(objectField.fields).forEach(key => {
                    this.getArg(key, objectField.fields[key], `${path}${name}.`, ans);
                });
            }
            if (arrayField) {
                this.getArg('[]', arrayField.field, `${path}${name}`, ans);
            }
        },
        getType(field) {
            const typeMap = {
                switch: 'boolean',
                text: 'string',
                textarea: 'string',
                color: 'string',
                inputnumber: 'number',
                rate: 'number',
                slider: 'number',
                progress: 'number',
                image: 'string',
                headimage: 'string',
                file: 'string',
                audio: 'string',
                video: 'string',
            };
            let type = field.valueType || typeMap[field.type] || field.type;

            if (type === 'union') {
                type = Object.keys(field.fields).filter(key => field.fields[key]).map(key => {
                    return this.getType(field.fields[key]);
                }).join(' | ');
            }
            if (/^(?:radio|checkbox|select)$/.test(type)) {
                let options = field.props && field.props.options;
                if (Array.isArray(options)) {
                    type = options.map(option => JSON.stringify(option.value)).join(' | ');
                } else {
                    type = Object.keys(options).map(option => JSON.stringify(option)).join(' | ');
                }
            }

            return type;
        }
    }
};
</script>

<style lang="scss">
.ams-args{
    overflow: hidden;
    clear: both;
}
.ams-args-title{
    font-size: 24px; // 1.65rem
    padding-bottom: 8px; // 0.3rem
    border-bottom: 1px solid #eaecef;
    color: #2c3e50;
    margin-top: 60px;
    padding-top: 0;
    margin-bottom: 0;
    a{
        font-size: .85em;
        float: left;
        margin-left: -.87em;
        padding-right: .23em;
        margin-top: .125em;
        opacity: 0;
    }
}
.ams-args-table {
    width: 100%;
    margin-top: 20px;
}
</style>

