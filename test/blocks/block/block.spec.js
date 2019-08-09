/* eslint-disable */
import Vue from 'vue';
import ElementUI from 'element-ui';
import ams from '@/index';
import Component from '@/blocks/block/block.vue';
import { shallowMount } from '@vue/test-utils';

Vue.use(ElementUI);
Vue.use(ams)

describe('block/block.vue', () => {
    let wrapper;
    let mockJson = {
        type: 'list',
        ctx: 'view',
        resource: 'resource'
    };

    beforeAll(() => {
        // 拦截ams的getBlock
        ams.getBlock = jest.fn().mockResolvedValue(mockJson);
        
        // 注册listMock
        ams.block('listMock', {
            type: 'list'
        })

        // 挂载listMock
        wrapper = shallowMount(Component, {
            propsData: {
                name: 'listMock'
            }
        });
    })

    it('是一个 Vue 实例', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
        expect(wrapper.vm.block).toMatchObject({type: 'list'});
        expect(wrapper.vm.block.type).toBe('list');
    });

    it('block.vue的props属性', () => {
        // props数据结果验证
        expect(wrapper.props().name).toBe('listMock');
        // props数据规则验证
        const name = wrapper.vm.$options.props.name;
        expect(name.type).toBe(String)
        expect(name.default).toBe('')
        expect(name.required).toBeTruthy()
    })

    it('block.vue的created', ()=> {
        // 利用mock函数测试ams.getBlock的调用
        expect(ams.getBlock).toBeCalled();
        expect(ams.getBlock).toBeCalledTimes(1);
        expect(ams.getBlock).toHaveBeenCalledWith('listMock')
        expect(ams.getBlock()).resolves.toEqual(mockJson);
    });
    
});
