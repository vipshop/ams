import { deepExtend, get } from '../../../utils';
import * as fieldGetSet from '../field-get-set';

// fields
export const RESET_GET_SET = {
    get: fieldGetSet.get,
    set: fieldGetSet.set,
    view: fieldGetSet.view
};

// debounce timer
let timer;

const optionsCache = {};
const lockQuerys = {};

// 场景一：远程select、关键字搜索、最小化回填、options缓存
// isInitEmpty: false,
// isCache: true,
// isLock: true,
// isMiniBackfill: true,
// 场景二：远程checkbox或者radio、通过接口请求options、无关键字搜索、完整列表回填
// isInitEmpty: true,
// isCache: true,
// isLock: true,
// isMiniBackfill: false,

export const SELECT_REMOTE = {
    remoteConfig: {
        labelKey: 'name',
        valueKey: 'id',
        queryKey: 'query',
        action: '',
        dataPath: 'data.list',
        debounce: 500,
        // 初始化时是否自动发起请求
        isInitRemoteOptions: true,
        // 无参数时发起请求
        isInitEmpty: false,
        // 通过action缓存合并options数据，缓存数据只会用于回填，array类型的options不支持cache
        isCache: true,
        // 通过action锁定请求、多个同action不会同时发起请求
        isLock: true,
        // 最小化options回填，推荐select使用
        isMiniBackfill: true,
        // transform($field, data) {
        //     const field = $field.field;
        //     const remoteConfig = field.remoteConfig;
        //     // console.log('transform', $field, field, remoteConfig);
        //     const options = {};
        //     data.forEach(item => {
        //         options[item[remoteConfig.valueKey]] = item[remoteConfig.labelKey];
        //     });
        //     return options;
        // },
        transform($field, data) {
            const field = $field.field;
            const remoteConfig = field.remoteConfig;
            return data.map(item => ({
                label: item[remoteConfig.labelKey],
                value: item[remoteConfig.valueKey]
            }));
        },
        /**
         * @param {*} $field 当前field的实例引用
         * @param {*} query 当前搜索参数
         * @param {*} isBackfill 是否是触发回填
         */
        async request($field, query = '', isBackfill) {
            const field = $field.field;
            const remoteConfig = field.remoteConfig;

            // 组装请求参数
            const params = {
                url: remoteConfig.action,
                method: 'get'
            };
            if (query) {
                params.params = {};
                params.params[remoteConfig.queryKey] = query;
            }
            // 深度合并传入的params
            deepExtend(params, remoteConfig.params);

            const res = await $field.$ams.request(params);

            return res;
        },
        /**
         * @param {*} $field 当前field的实例引用
         * @param {*} query 当前搜索参数
         * @param {*} isBackfill 是否是触发回填
         */
        async remoteMethod($field, query = '', isBackfill) {
            let lockQuery;
            const nextLockQuery = () => {
                // console.log('nextLockQuery', lockQuery && lockQuery.query.length);
                if (lockQuery) {
                    lockQuery.isLocking = false;
                    const nextParmas = lockQuery.query.shift();
                    if (nextParmas) {
                        // console.log('query:', nextParmas, lockQuery.query.length);
                        $field.field.remoteConfig.remoteMethod.apply(this, nextParmas);
                    }
                }
            };
            try {
                const field = $field.field;
                const remoteConfig = field.remoteConfig;


                if (remoteConfig.isLock) {
                    lockQuery = lockQuerys[remoteConfig.action];
                    // console.log(JSON.stringify(lockQuery));
                    if (lockQuery) {
                        if (lockQuery.isLocking) {
                            // console.log('push to query');
                            lockQuery.query.push([$field, query, isBackfill]);
                            return;
                        }
                    } else {
                        lockQuery = {
                            isLocking: false,
                            query: []
                        };
                        lockQuerys[remoteConfig.action] = lockQuery;
                    }
                    lockQuery.isLocking = true;
                }

                const cacheKey = remoteConfig.action;
                // 当有缓存、是回填、缓存开启才会进入缓存获取
                if (remoteConfig.isCache && isBackfill && optionsCache[cacheKey]) {
                    // 命中缓存数据或者是允许空值初始化时
                    if (query && optionsCache[cacheKey][query] || remoteConfig.isInitEmpty) {
                        // console.log('get options from cache success', remoteConfig.isInitEmpty, optionsCache, remoteConfig.isMiniBackfill, query);
                        // 最小化回填时使用当前值
                        if (remoteConfig.isMiniBackfill && query) {
                            // $field.$set($field.field.props, 'options', {
                            //     [query]: optionsCache[cacheKey][query]
                            // });
                            $field.$set($field.field.props, 'options', [{
                                label: query,
                                value: optionsCache[cacheKey][query]
                            }]);
                            return nextLockQuery();
                        } else {
                            // console.log('no query, remoteConfig.isMiniBackfill');
                            // $field.$set($field.field.props, 'options', optionsCache[cacheKey]);
                            $field.$set($field.field.props, 'options',
                                Object.keys(optionsCache[cacheKey]).map(field => ({
                                    label: field,
                                    value: optionsCache[cacheKey][field]
                                }))
                            );
                            return nextLockQuery();
                        }
                    } else {
                        console.log('get options from cache fail');
                    }
                }

                $field.loading = true;
                const res = await remoteConfig.request.call(this, $field, query, isBackfill);
                $field.loading = false;

                let data = get(res.data, remoteConfig.dataPath);
                let successCode;
                if (typeof remoteConfig.successCode !== 'undefined') {
                    successCode = remoteConfig.successCode;
                } else {
                    successCode = this.getConfig('resource.api.successCode');
                }
                if (
                    res.data.code === successCode &&
                    data
                ) {
                    const options = remoteConfig.transform.call(this, $field, data);
                    const optionsEntity = options.reduce((obj, cur) => Object.assign(obj, { [cur.label]: cur.value }), {});
                    if (remoteConfig.isCache) {
                        optionsCache[cacheKey] = deepExtend(optionsCache[cacheKey] || {}, optionsEntity);
                    }
                    $field.$set($field.field.props, 'options', options);
                    if (typeof remoteConfig.onSuccess === 'function') {
                        remoteConfig.onSuccess(options, res);
                    }
                } else if (typeof remoteConfig.onError === 'function') {
                    remoteConfig.onError(data, res);
                }
                nextLockQuery();
            } catch (e) {
                console.log('remoteMethod error:', e);
                nextLockQuery();
            }
        }
    },
    props: {
        filterable: true,
        remote: true,
        options: {},
        'remote-method': function(query = '', $field) {
            // 主动调用时要传入$field vue实例，自动调用时通过$parent引用
            $field = $field || this.$parent;
            const $block = $field.$block;
            const remoteConfig = $field.field.remoteConfig;
            if (!$block || !remoteConfig || !remoteConfig.action) {
                return console.warn('no remote action or $block');
            }

            // 节流控制
            if (remoteConfig.debounce) {
                timer && clearTimeout(timer);
                timer = setTimeout(function () {
                    remoteConfig.remoteMethod.call($block, $field, query, false);
                }, remoteConfig.debounce);
            } else {
                remoteConfig.remoteMethod.call($block, $field, query, false);
            }
        }
    }
};
