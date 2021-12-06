<template>
  <div>
    <el-tag
      v-for="(tag, index) in tags"
      :disable-transitions="false"
      :key="index"
      v-on="on"
      v-bind="field.props"
      @click="on && on.click(tag)"
      @close="handleDelete(tag)">
      {{ field.props.template ? field.props.template.replace(idRegExp, tag[field.props['idKey']] || '').replace(nameRegExp, tag[field.props['nameKey']] || '').replace(subNameRegExp, tag[field.props['subNameKey']] || '') : (tag[field.props['nameKey']] || tag) }}
    </el-tag>

    <el-autocomplete
        v-if="inputVisible"
        ref="saveTagInput"
        v-model="inputValue"
        :fetch-suggestions="querySearchAsync"
        class="input-new-tag"
        popper-class="my-autocomplete"
        v-bind="field.props"
        @select="handleInputConfirm"
        @blur="hideInput"
        @clear="handleClear"
        @keyup.enter.native="handleInputEnterConfirm"
        >
        <template slot-scope="{ item }">
            <template v-if="item['no-match-text']">
                <p class="el-select-dropdown__empty">{{ item['no-match-text'] }}</p>
            </template>
            <template v-else>
                <div class="name">{{ typeof item[field.props['nameKey']] !== 'undefined' ? item[field.props['nameKey']] : item }}</div>
                <div class="sub-name" v-if="item[field.props['subNameKey']] || item[field.props['idKey']]">{{ item[field.props['subNameKey']] || item[field.props['idKey']] }}</div>
            </template>
        </template>
    </el-autocomplete>

    <el-button
        v-else-if="showAddButton"
        class="button-new-tag"
        :size="field.props.size"
        @click="showInput"
    >{{field.props.button}}</el-button>
  </div>
</template>

<script>
/* eslint-disable vue/require-prop-types */
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.fieldEditMixin],
    data() {
        return {
            inputVisible: false,
            canHideInput: true, // 是否可以隐藏输入框
            inputConfirm: false,
            restaurants: [],
            inputValue: '',
            idRegExp: null, // 替换id字段的正则
            nameRegExp: null, // 替换name字段的正则
            subNameRegExp: null // 替换subName字段的正则
        };
    },
    computed: {
        showAddButton: function() {
            if (this.field.props.button && (this.field.props['multiple-limit'] <= 0 || typeof this.field.props['multiple-limit'] !== 'number' || this.localValue && this.localValue.length < this.field.props['multiple-limit'])) {
                return true;
            }
            return false;
        },
        tags: function() {
            if (this.field.props['multiple-limit'] === 1 && typeof this.localValue === 'string') {
                // 如果是只有一个tag，兼容一下字符串的传值格式
                const obj = {};
                obj[this.field.props['idKey']] = null;
                obj[this.field.props['nameKey']] = this.localValue;
                obj[this.field.props['subNameKey']] = '';
                this.localValue = [obj];
            }
            return this.localValue;
        }
    },
    mounted() {
        this.idRegExp = new RegExp(`\\{\\{\\s*(${this.field.props['idKey']})\\s*\\}\\}`, 'ig');
        this.nameRegExp = new RegExp(`\\{\\{\\s*(${this.field.props['nameKey']})\\s*\\}\\}`, 'ig');
        this.subNameRegExp = new RegExp(`\\{\\{\\s*(${this.field.props['subNameKey']})\\s*\\}\\}`, 'ig');
        // console.log(this.idRegExp);
    },
    methods: {
        handleDelete(tag) {
            // 删除标签
            this.localValue.splice(this.localValue.indexOf(tag), 1);
        },
        showInput() {
            // 添加标签输入框
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleClear() {
            // 点击清除按钮
            this.canHideInput = false;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        hideInput() {
            // 隐藏输入框
            setTimeout(() => {
                if (!this.field.props || this.field.props['allow-create']) {
                    this.handleInputEnterConfirm();
                    return;
                }
                if (!this.canHideInput) {
                    this.canHideInput = true;
                    return;
                }
                this.inputVisible = false;
            }, 250);
        },
        handleInputConfirm(item) {
            // 选择下拉项
            if (item['no-match-text']) {
                return;
            }
            if (typeof item === 'string') {
                this.inputValue = item;
                this.handleInputEnterConfirm();
                return;
            }
            let oldValue = this.localValue;
            const id = item[this.field.props['idKey']] || '';
            const name = item[this.field.props['nameKey']] || '';
            const subName = item[this.field.props['subNameKey']] || '';

            if (oldValue && oldValue instanceof Array) {
                const result = oldValue.some(v => {
                    return v[this.field.props['idKey']] === id && v[this.field.props['nameKey']] === name && v[this.field.props['subNameKey']] === subName;
                });
                if (result) {
                    this.$message.error(`${name} 已存在～`);
                    return;
                }
            }
            const inputValue = {};
            inputValue[this.field.props['idKey']] = id;
            inputValue[this.field.props['nameKey']] = name;
            inputValue[this.field.props['subNameKey']] = subName;
            if (!oldValue) {
                oldValue = [];
            }
            oldValue.push(inputValue);
            this.localValue = oldValue;
            this.inputVisible = false;
            this.inputValue = '';
        },
        handleInputEnterConfirm() {
            // 自由添加模式
            if (!this.field.props || !this.field.props['allow-create']) {
                return;
            }
            let inputValue = this.inputValue;
            let oldValue = this.localValue;

            if (oldValue) {
                if (oldValue.indexOf(inputValue) > -1) {
                    this.$message.error(`${inputValue} 已存在～`);
                    return;
                }
            } else {
                oldValue = [];
            }
            if (inputValue) {
                oldValue.push(inputValue);
                this.localValue = oldValue;
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        async querySearchAsync(queryString, cb) {
            // 输入建议
            let restaurants = this.restaurants;
            if (queryString || restaurants.length < 1) {
                restaurants = await this.getList(queryString);
            }
            const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            if (this.field.props['no-match-text'] && results instanceof Array && results.length === 0) {
                results.push({
                    'no-match-text': this.field.props['no-match-text']
                });
            }
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                const name = restaurant[this.field.props['nameKey']] || restaurant;
                const subName = restaurant[this.field.props['subNameKey']];
                let id = restaurant[this.field.props['idKey']];
                id = typeof id === 'number' ? id.toString() : id;
                return (id && id.toLowerCase().indexOf(queryString.toLowerCase()) > -1) || (name && name.toLowerCase().indexOf(queryString.toLowerCase()) > -1) || (subName && subName.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
            };
        },
        async getList(item) {
            // 获取下拉选项数据
            const props = this.field.props;
            if (!props.action) {
                return props.options || [];
            }
            const method = props.method || 'GET';
            const params = {
                url: props.action,
                method: method
            };
            if (method === 'POST') {
                params.data = {
                    // page: 1,
                    // pageSize: 20
                };
                if (item) {
                    if (this.field.props['queryKey']) {
                        params.data[this.field.props['queryKey']] = item;
                    } else {
                        params.data[this.field.props['idKey']] = item;
                        params.data[this.field.props['nameKey']] = item;
                        params.data[this.field.props['subNameKey']] = item;
                    }
                }
            } else {
                params.params = {
                    // page: 1,
                    // pageSize: 20
                };
                if (item) {
                    if (props['queryKey']) {
                        params.params[props['queryKey']] = item;
                    } else {
                        params.params[props['idKey']] = item;
                        params.params[props['nameKey']] = item;
                        params.params[props['subNameKey']] = item;
                    }
                }
            }
            const resource = ams.resources[ams.blocks[this.name].resource];
            if (typeof props.withCredentials !== 'undefined') {
                params.withCredentials = props.withCredentials;
            } else if (typeof resource.api.withCredentials !== 'undefined') {
                params.withCredentials = resource.api.withCredentials;
            }
            const res = await ams.request(params);
            const successCode = typeof props.successCode === 'number' ? props.successCode : resource.api.successCode;
            // 默认successCode
            if (
                res.data &&
                res.data.code === successCode &&
                res.data.data &&
                res.data.data.list
            ) {
                return res.data.data.list;
            }
            return [];
        }
    }
};
</script>

<style lang="scss">
.my-autocomplete li {
    line-height: normal;
    padding: 5px 7px;
    .name,.sub-name {
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 22px;
    }
    .sub-name {
        font-size: 12px;
        color: #b4b4b4;
    }
    .highlighted .sub-name {
        color: #ddd;
    }
}
.my-autocomplete .el-select-dropdown__empty {
    padding: 0;
    background-color: #fff;
    margin: -5px -7px;
    cursor: default;
}
.ams-field-tag-edit{
    .el-tag{
        height: 40px;
        line-height: 38px;
        padding: 0 12px;
        font-size: 14px;
        vertical-align: baseline;
        &--medium{
            height: 36px;
            line-height: 34px;
            padding: 0 12px;
            font-size: 13px;
        }
        &--small{
            height: 32px;
            line-height: 30px;
            padding: 0 10px;
            font-size: 12px;
        }
        &--mini{
            height: 28px;
            padding: 0 8px;
            line-height: 26px;
            font-size: 12px;
        }
    }
    .input-new-tag {
        width: auto;
    }
}
</style>
