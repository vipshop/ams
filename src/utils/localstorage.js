import ams from '../ams';
const PREFIX = 'AMS_';
const storage = window.localStorage;
/**
 * 把数据序列化为 JSON 后存储、读取
 */
const getAppName = () => {
    const appName = ams.configs.appName;
    if (appName) {
        return appName.toLocaleUpperCase() + '_';
    }
    return '';
};
export const LocalStorage = {
    /**
     * @param {string} key
     * @param {any} val
     */
    set(key, val) {
        if (typeof val === 'undefined') {
            storage.removeItem(key);
        } else {
            try {
                storage.setItem(PREFIX + getAppName() + key, JSON.stringify(val));
            } catch (e) {
                console.error('localStorage的空间已满，问题详情：', e);
            }
        }
    },

    /**
     * @param {string} key
     * @return {any} 若为 JSON 格式，则返回 parse 后的结果，否则返回原字符串
     */
    get(key) {
        const string = storage.getItem(PREFIX + getAppName() + key);
        try {
            return JSON.parse(string);
        } catch (e) {
            return string;
        }
    },

    /**
     * @param {string} key
     */
    remove(key) {
        storage.removeItem(PREFIX + key);
    }
};
