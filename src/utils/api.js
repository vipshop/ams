import lodashGet from 'lodash.get';

const defaultGetter = {
    codeKey: 'code',
    successCode: 0,
    dataPath: 'data',
    totalPath: 'data.total',
    messageKey: 'msg',
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
 * -------common response----------
 *  {
      [codeKey]: [successCode],
      [dataPath]: {
          [totalPath]: Number,
      },
      [messageKey]: 'success message'
 *  }
 *
 *
 * -------list response----------
 * {
      [codeKey]: [successCode],
      data: {
          list: [],
          total: Number,
      },
      [messageKey]: 'success message'
 *  }
 *
 *
 * -------list getter----------
 *  {
      codeKey,
      successCode,
      messageKey,
      dataPath: 'data.list',
      totalPath: 'data.total',
 *  }
 *
 *
 */
export function getInfoFromResponse(response, action, actionGetter) {
    const configGetter = this.getConfig(`resource.api.${action}.getter`);
    const getter = { ...defaultGetter, ...actionGetter, ...configGetter };

    const code = lodashGet(response.data, getter.codeKey); // api response（success/result）对应的值
    return {
        dataPath: getter.dataPath,
        data: lodashGet(response.data, getter.dataPath),
        total: lodashGet(response.data, getter.totalPath),
        totalPath: getter.totalPath,
        codeKey: getter.codeKey,
        successCode: getter.successCode, // expectedCode, 期待的 code(success/result) 对应的值
        message: lodashGet(response.data, getter.messageKey),
        code,
        // eslint-disable-next-line
        isSuccess: code == getter.successCode
    };
}