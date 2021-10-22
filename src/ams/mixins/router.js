import Vue from 'vue';
import VueRouter from 'vue-router';
import { isExternal } from '../../utils';

export function getRoute(route) {
    if (route.block || route.redirect) {
        const component = Vue.component('ams-block');
        return {
            ...route,
            component,
            props: {
                name: route.block
            },
            path: route.meta.path,
            children: null
        };
    } else if (route.component) {
        return {
            ...route,
            component: route.component,
            path: route.meta.path,
            children: null
        };
    }
    console.error(`routes：${route}, 配置有误`);
    return {};
}

export function getRoutes(routes, ansRoutes, basePath = '', baseIndex = '') {
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        route.meta = route.meta || {};
        const index = baseIndex ? `${baseIndex}.${i}` : `${i}`;
        route.meta.index = index;
        // 如果path填空或者/会导致多个/，需要合并为一个/
        const path = `${basePath}/${route.path}`.replace(/\/+/g, '/');
        route.meta.path = path;
        // 需要注册的路由，block或者重定向
        if ((route.block || route.redirect || route.component) && !isExternal(route.path)) {
            ansRoutes.push(getRoute(route));
        }
        if (route.children && route.children.length) {
            getRoutes(route.children, ansRoutes, path, index);
        }
    }
    return routes;
}

export function getRouter(router) {
    const routes = [];

    getRoutes(router.routes, routes);

    return new VueRouter({
        ...router,
        routes
    });
}
