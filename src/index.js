// css reset
import 'normalize.css/normalize.css';
import './styles/index.scss';
import './theme-default/index.scss';

import ams from './ams';
import mixins from './ams/mixins';
import * as utils from './utils';

// action
import actions from './actions';

// block
import alert from './blocks/alert';
import block from './blocks/block';
import card from './blocks/card';
import component from './blocks/component';
import collapse from './blocks/collapse';
import dialog from './blocks/dialog';
import drawer from './blocks/drawer';
import error from './blocks/error';
import list from './blocks/list';
import imagelist from './blocks/imagelist';
import form from './blocks/form';
import router from './blocks/router';
import tabs from './blocks/tabs';
import table from './blocks/table';
import title from './blocks/title';
import steps from './blocks/steps';
import dropdownBlock from './blocks/dropdown';
import grid from './blocks/grid';
import carousel from './blocks/carousel';
import backtop from './blocks/backtop';
import popover from './blocks/popover';
import popconfirm from './blocks/popconfirm';
import timeline from './blocks/timeline';

// field 和文件夹一一对应
import array from './fields/array';
import audio from './fields/audio';
import cascader from './fields/cascader';
import checkbox from './fields/checkbox';
import color from './fields/color';
import date from './fields/date';
import datetime from './fields/datetime';
import datetimerange from './fields/datetimerange';
import file from './fields/file';
import image from './fields/image';
import inputnumber from './fields/inputnumber';
import object from './fields/object';
import originfile from './fields/originfile';
import password from './fields/password';
import progress from './fields/progress';
import radio from './fields/radio';
import rate from './fields/rate';
import select from './fields/select';
import slider from './fields/slider';
import switchField from './fields/switch';
import text from './fields/text';
import textarea from './fields/textarea';
import time from './fields/time';
import timepicker from './fields/timepicker';
import timerange from './fields/timerange';
import transfer from './fields/transfer';
import union from './fields/union';
import unitselect from './fields/unitselect';
import video from './fields/video';
import tree from './fields/tree';
import link from './fields/link';
import fbutton from './fields/button';
import html from './fields/html';

// operation
import button from './operations/button';
import operationsText from './operations/text';
import reset from './operations/reset';
import icon from './operations/icon';
import field from './operations/field';
import dropdown from './operations/dropdown';
import filter from './operations/filter';
// 版本号
ams.version = '0.34.5';
// 挂载到ams上
ams.mixins = mixins;
ams.utils = utils;
// 注册install方法
ams.install = function(Vue) {
    ams.bus = new Vue();
    ams.registerBlock = function(block) {
        block.install(Vue);
    };
    /**
     * defaultData 默认值
     */
    ams.registerField = function(field, defaultFieldConfig) {
        if (typeof defaultFieldConfig !== 'undefined') {
            ams.configs.defaultFieldConfig[field.type] = defaultFieldConfig;
        }
        field.install(Vue);
    };
    ams.registerOperation = function(operation) {
        operation.install(Vue);
    };
    // actions
    Object.keys(actions).forEach(actionName =>
        ams.action(actionName, actions[actionName])
    );
    // blocks
    ams.registerBlock(alert);
    ams.registerBlock(block);
    ams.registerBlock(card);
    ams.registerBlock(component);
    ams.registerBlock(collapse);
    ams.registerBlock(dialog);
    ams.registerBlock(drawer);
    ams.registerBlock(error);
    ams.registerBlock(form);
    ams.registerBlock(list);
    ams.registerBlock(imagelist);
    ams.registerBlock(router);
    ams.registerBlock(tabs);
    ams.registerBlock(table);
    ams.registerBlock(title);
    ams.registerBlock(steps);
    ams.registerBlock(dropdownBlock);
    ams.registerBlock(grid);
    ams.registerBlock(carousel);
    ams.registerBlock(backtop);
    ams.registerBlock(popover);
    ams.registerBlock(popconfirm);
    ams.registerBlock(timeline);

    // fields
    ams.registerField(array);
    ams.registerField(audio);
    ams.registerField(cascader);
    ams.registerField(checkbox);
    ams.registerField(color);
    ams.registerField(date);
    ams.registerField(datetime);
    ams.registerField(datetimerange);
    ams.registerField(file);
    ams.registerField(image);
    ams.registerField(inputnumber);
    ams.registerField(object);
    ams.registerField(originfile);
    ams.registerField(password);
    ams.registerField(progress);
    ams.registerField(radio);
    ams.registerField(rate);
    ams.registerField(select);
    ams.registerField(slider);
    ams.registerField(switchField);
    ams.registerField(text);
    ams.registerField(textarea);
    ams.registerField(time);
    ams.registerField(timepicker);
    ams.registerField(timerange);
    ams.registerField(transfer);
    ams.registerField(union);
    ams.registerField(unitselect);
    ams.registerField(video);
    ams.registerField(tree);
    ams.registerField(link);
    ams.registerField(fbutton);
    ams.registerField(html);
    // operations
    ams.registerOperation(button);
    ams.registerOperation(operationsText);
    ams.registerOperation(reset);
    ams.registerOperation(icon);
    ams.registerOperation(field);
    ams.registerOperation(dropdown);
    ams.registerOperation(filter);

    // inject vue prototype
    Vue.prototype.$ams = ams;
};

if (typeof window !== 'undefined') {
    // export to global
    window.ams = ams;
    if (window.Vue) {
        ams.install(window.Vue);
    }
}

export default ams;
