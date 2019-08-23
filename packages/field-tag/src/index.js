import view from './view';
import edit from './edit';
import ams from '@ams-team/ams';

const field = {
    type: 'tag',
    install(Vue) {
        ams.configs.defaultFieldConfig.tag = {
            props: {
                closable: false,
                clearable: true,
                button: '+ 添加',
                placeholder: '请输入...',
                'multiple-limit': 0,
                'allow-create': false, // 通过在输入框中输入文字来创建新的标签
                idKey: 'id', // id字段
                nameKey: 'name', // name字段
                subNameKey: 'subName' // subName字段
            }
        };
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};

if (typeof window !== 'undefined') {
    // export to global
    if (window.Vue) {
        field.install(window.Vue);
    }
}

export default field;
