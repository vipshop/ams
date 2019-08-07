/* eslint-disable */
import Vue from 'vue';
import ElementUI from 'element-ui';
import ams from '@/index';
import { shallowMount } from '@vue/test-utils';
import Component from '@/blocks/card/card.vue';

Vue.use(ElementUI);
Vue.use(ams)

describe('card/card.vue', () => {
    let wrapper;
    let mockJson = {
        type: 'card',
        options: {
            headerTitle: '自定义标题',
        },
        data: { test: 'init' }
    };
    beforeAll(() => {
        // 注册block
        ams.block('cardMock', mockJson)

        // 挂载cardMock
        wrapper = shallowMount(Component, {
            propsData: {
                name: 'cardMock'
            }
        });
    })

    it('是一个 Vue 实例', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
        // 测试初始化数据是否符合预期
        expect(wrapper.vm.data.test).toBe('init');
    });

    it('card.vue的setBlockData方法', () => {
        // 测试setBlockData被触发后的后续行为符合预期
        wrapper.vm.setBlockData({test: 'shao'});
        expect(wrapper.vm.data.test).toBe('shao');

        // 利用mock函数测试事件会被正常触发
        let mockFn = jest.fn();
        wrapper.setMethods({ setBlockData: mockFn });
        wrapper.vm.setBlockData({test: 'shao'});
        expect(mockFn).toBeCalled();
        expect(mockFn).toBeCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith({test: 'shao'})
    })

    it('card.vue的props属性', () => {
        // 测试props的name是否符合预期
        expect(wrapper.props().name).toBe('cardMock');
        // props name数据规则验证
        const name = wrapper.vm.$options.props.name;
        expect(name.type).toBe(String)
        expect(name.default).toBe('')
        expect(name.required).toBeTruthy()
    })
});
