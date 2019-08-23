import ams from '@ams-team/ams';
import amsCode from '@ams-team/field-ams-code';
import ele from './config';
import CONFIG_BLOCK from './CONFIG_BLOCK';
import CONFIG_FIELD from './CONFIG_FIELD';
import CONFIG_OPERATION from './CONFIG_OPERATION';
import CONFIG_NONE from './CONFIG_NONE';

const block = {
    type: 'ams-config',
    install(Vue) {
        if (amsCode) {
            amsCode.install(Vue);
        }
        Vue.component(`ams-block-${this.type}`, ele);
        ams.config({
            CONFIG_BLOCK,
            CONFIG_FIELD,
            CONFIG_OPERATION,
            CONFIG_NONE,
            defaultFieldConfig: {
                text: {
                    // eslint-disable-next-line no-undefined
                    default: undefined
                }
            }
        });
    }
};

if (typeof window !== 'undefined') {
    // export to global
    if (window.Vue) {
        block.install(window.Vue);
    }
}

export default block;
