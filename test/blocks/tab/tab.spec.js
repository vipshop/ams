/* eslint-disable */
import Vue from 'vue';
import ElementUI from 'element-ui';
import ams from '@/index';
import { shallowMount } from '@vue/test-utils';
import Component from '@/blocks/tabs/tabs.vue';

Vue.use(ElementUI);
Vue.use(ams)

describe('tabs/tabs.vue', () => {
    let wrapper;
    beforeAll(() => {
        ams.block('tabsMock', {
            type: 'tabs',
            data: {
                active: 'subBlock'
            },
            operations: {
                button: {
                    type: 'button',
                    label: '按钮1'
                }
            },
            options: {
                subBlock: '标题1',
                subBlock1: '标题2'
            },
            blocks: {
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
                subBlock1: {
                    type: 'component',
                    options: {
                        is: 'div',
                        text: '子block示例2'
                    },
                    style: {
                        border: '1px solid #E4E7ED'
                    }
                }
            }
          })

        wrapper = shallowMount(Component, {
            propsData: {
                name: 'tabsMock'
            }
        });
    })

    it('是一个 Vue 实例', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('tab的computed和methods', () => {
        expect(wrapper.vm.showBlocks).toEqual(['subBlock', 'subBlock1']);
        wrapper.vm.setBlockData({ active: '0' });
        expect(wrapper.vm.afterReady).toBeDefined();
        wrapper.vm.afterReady();
        expect(wrapper.vm.data.active).toBe('subBlock');
        wrapper.vm.block.options = {};
        expect(wrapper.vm.showBlocks).toEqual([]);
    })
});
