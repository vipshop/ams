
import ams from '../ams';
import { getRouter } from '../ams/mixins/router';

function createEmptyRouter() {
    ams.$router = getRouter({ routes: [] });
}

export function routerPush(params) {
    // console.log('routerPush', params)
    return new Promise((resolve, reject) => {
        if (!ams.$router) {
            createEmptyRouter();
            // return reject(
            //     'ams Err: please use this action after router block is render'
            // );
        }
        ams.$router.push(
            params.$arg || params,
            () => {
                resolve();
            },
            () => {
                reject(new Error('cancel'));
            }
        );
    });
}

export function routerReplace(params) {
    // console.log('routerReplace', params)
    return new Promise((resolve, reject) => {
        if (!ams.$router) {
            createEmptyRouter();
            // return reject(
            //     'ams Err: please use this action after router block is render'
            // );
        }
        ams.$router.replace(
            params.$arg || params,
            () => {
                resolve();
            },
            () => {
                reject(new Error('cancel'));
            }
        );
    });
}

export function routerGo(params) {
    // console.log('routerGo', params)
    return new Promise((resolve, reject) => {
        if (!ams.$router) {
            createEmptyRouter();
            // return reject(
            //     'ams Err: please use this action after router block is render'
            // );
        }
        ams.$router.go(
            params.$arg || params.step
        );
        // 延时调用resolve
        setTimeout(() => {
            resolve();
        }, 0);
    });
}
