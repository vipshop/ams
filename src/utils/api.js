import { get as lodashGet } from 'lodash';

const defaultGetter = {
    codePath: 'code',
    successCode: 0,
    dataPath: 'data',
    totalPath: 'total',
    listPath: 'list',
    messagePath: 'msg',
};

/**
 * 从 API Response 中获取相关字段，如是否成功、total、data 等
 * https://github.com/vipshop/ams/pull/125
 *
 * @param {Object} response : api response data
 * @param {String} action : read/update/list/delete 增删改查
 * @param {Object} actionGetter : 适配更多接口的返回值
 *
 * ams 默认接口数据结构： https://vipshop.github.io/ams/api/api.html#%E9%80%9A%E7%94%A8%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84
 *
 * -------常规请求----------
 *  {
      [codePath]: [successCode],
      [dataPath]: String,
      [messagePath]: String
 *  }
 *
 *
 * ------- 列表请求----------
 * {
      [codePath]: [successCode],
      [dataPath]: {
          [dataPath.listPath]: [],
          [dataPath.totalPath]: Number,
      },
      [messagePath]: String
 *  }
 *
 *
 */
export function responseHandler(response, action, actionGetter) {
    const configGetter = this.getConfig(`resource.api.${action}.getter`);
    const getter = {
        ...defaultGetter,
        ...actionGetter,
        ...configGetter
    };

    const code = lodashGet(response.data, getter.codePath); // api response（success/result）对应的值
    // eslint-disable-next-line
    const isSuccess = code == getter.successCode;
    return {
        code,
        getter,
        isSuccess,
        data: lodashGet(response.data, getter.dataPath),
        message: lodashGet(response.data, getter.messagePath),
    };
}