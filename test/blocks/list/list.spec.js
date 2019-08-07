/* eslint-disable */
import Vue from 'vue';
import ElementUI from 'element-ui';
import ams from '@/index';
import { shallowMount } from '@vue/test-utils';
import Component from '@/blocks/list/list.vue';
import mockBlock from '../../mock/blockJson';

Vue.use(ElementUI);
Vue.use(ams)

describe('list/list.vue', () => {
    let wrapper;
    beforeAll(() => {
        ams.block('listMock', mockBlock)

        wrapper = shallowMount(Component, {
            propsData: {
                name: 'listMock'
            }
        });
    })

    it('是一个 Vue 实例', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
});
