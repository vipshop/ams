import { get as lodashGet } from 'lodash';

/**
 * 从 Api Response 中解析相关数据，如 是否成功、total、message 等
 * response:
    {
      "code": 0, // code：int类型，必须，0 代表默认的【成功】状态
      "data": {  // data：object类型，非必须，用于返回具体的数据
          ...
      },
      "msg": "success" // msg：string类型，返回的信息说明，成功=“success"，失败=”ERROR内容“
    }
 *
 * response: {
      [codeKey]: successCode,
      [dataPath]: {
          [totalKey]: 100,
      },
      [msgKey]: 'success'
    }
 */
const defaultGetter = {
    codeKey: 'code',
    successCode: 0,
    dataPath: 'data.data', // 应该默认返回data
    totalKey: 'data.total',
    msgKey: 'msg',
};

/**
 * 从 API Response 中获取相关字段，如是否成功、total、data 等
 * https://github.com/vipshop/ams/pull/125
 *
 * @param {Object} response : api response data
 * response: {
 *
 * }
 * @param {String} action : read/update/list/delete 增删改查
 *
 */
export function getInfoFromResponse(response, action /** read/list/update/delete */, actionGetter) {
    const configGetter = this.getConfig(`resource.api.${action}.getter`);
    const getter = { ...defaultGetter, ...configGetter, ...actionGetter };

    const code = lodashGet(response.data, getter.codeKey); // api response（success/result）对应的值
    return {
        dataPath: getter.dataPath,
        data: lodashGet(response.data, getter.dataPath),
        total: lodashGet(response.data, getter.totalKey),
        totalKey: getter.totalKey,
        codeKey: getter.codeKey,
        successCode: getter.successCode, // expectedCode, 期待的 code(success/result) 对应的值
        message: lodashGet(response.data, getter.message),
        code,
        // eslint-disable-next-line
        isSuccess: code == getter.successCode
    };
}