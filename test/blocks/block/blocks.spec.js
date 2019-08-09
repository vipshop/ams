/* eslint-disable */
import { mount } from '@vue/test-utils';
import Component from '@/blocks/block/blocks.vue';

describe('block/blocks.vue', () => {
    it('是一个 Vue 实例', () => {
        const wrapper = mount(Component);
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('blocks.vue的props属性', () => {
        const wrapper = mount(Component);
        wrapper.setProps({ blocks: 'block' })
        expect(wrapper.props().blocks).toBe('block')
    })
});
