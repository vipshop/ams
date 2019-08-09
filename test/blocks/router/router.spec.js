/* eslint-disable */
import Vue from 'vue';
import ElementUI from 'element-ui';
import ams from '@/index';
import { shallowMount, mount } from '@vue/test-utils';
import Component from '@/blocks/router/router.vue';

Vue.use(ElementUI);
Vue.use(ams)

describe('router/router.vue', () => {
    let wrapper;
    beforeAll(() => {
        ams.block('routerMock', {
            type: 'router',
            router: {
                mode: 'history',
                routes: [
                    {
                        name: '首页',
                        path: '/',
                        redirect: '/index'
                    },
                    {
                        path: 'index',
                        name: 'index',
                        block: 'index'
                    },
                    {
                        path: 'subBlock',
                        name: 'subBlock',
                        block: 'subBlock',
                        meta: {
                            hasMenu: false,
                            hidden: true
                        }
                    },
                    {
                        name: '404',
                        path: '404',
                        block: '404',
                        meta: {
                            hasMenu: false,
                            hidden: true
                        }
                    },
                    {
                        path: '*',
                        redirect: '/404',
                        meta: {
                            hidden: true
                        }
                    }
                ]
            },
            operations: {
                button: {
                    type: 'button',
                    label: '按钮1'
                }
            },
            blocks: {
                index: {
                    type: 'error'
                },
                subBlock: {
                    type: 'component',
                    options: {
                        is: 'div',
                        text: '子block示例'
                    },
                    style: {
                        border: '1px solid #E4E7ED'
                    }
                },
                404: {
                    type: 'error',
                    data: {
                        title: '404',
                        subtitle: 'Page not found'
                    },
                    operations: {
                        goIndex: {
                            type: 'button',
                            label: '返回首页',
                            props: {
                                type: 'danger',
                                size: 'medium',
                                round: true
                            }
                        }
                    },
                    events: {
                        goIndex: '@routerReplace:/'
                    }
                }
            }
        })

        wrapper = mount(Component, {
            propsData: {
                name: 'routerMock'
            }
        });
    })

    it('是一个 Vue 实例', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
        expect(ams.$router.app.$route.path).toBe('/index');
    });


    it('@routerPush', () => {
        // 初始路由判断
        expect(ams.$router.app.$route.path).toBe('/index');

        // routerPush 改变路由
        ams.callAction('@routerPush:/subBlock?test=1')
        expect(ams.$router.app.$route.path).toBe('/subBlock');
        expect(ams.$router.app.$route.query).toEqual({ test: '1' });
    })


    it('@routerReplace', () => {
        // routerReplace 改变路由
        ams.callAction('@routerReplace', {
            path: '/index',
            hash: 'test'
        });

        expect(ams.$router.app.$route.path).toBe('/index');
        expect(ams.$router.app.$route.hash).toBe('#test');
        expect(ams.$router.app.$route.fullPath).toBe('/index#test');
    })

    it('@routerGo', () => {
        // 初始路由判断
        expect(ams.$router.app.$route.path).toBe('/index');
        ams.callAction('@routerPush:/subBlock');
        expect(ams.$router.app.$route.path).toBe('/subBlock');
        ams.callAction('@routerGo', {
            step: -1
        });
        // todo, 未知原因
        expect(ams.$router.app.$route.path).toBe('/subBlock');
    })

});
