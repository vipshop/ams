import { deepExtend } from '../../utils';

export default {
    methods: {
        getField(field, context) {
            // 可以通过field的配置changeConfig动态改变该field的某些配置
            if (context && field.changeConfig) {
                return field.changeConfig(deepExtend({}, field), context, this);
            }
            return field;
        }
    }
};
