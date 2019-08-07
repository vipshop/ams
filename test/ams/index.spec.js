import Vue from 'vue';
import ElementUI from 'element-ui';
import ams from '@/index';
import mockBlock from '../mock/blockJson.js';

Vue.use(ElementUI);
Vue.use(ams)

describe('ams', () => {

    beforeAll(() => {
        // 初始化blcok
        ams.block('mockBlock', mockBlock)
    })

    it('ams.action', async () => {
        // mock函数，默认返回'retrunTest'
        const mockFn = jest.fn().mockReturnValue('retrunTest')

        // action 定义
        ams.action('mockFn', mockFn)
        expect(ams.actions.mockFn).toBe(mockFn)

        // action 调用
        await ams.callAction('@mockFn')
        expect(mockFn).toBeCalled()
        expect(mockFn).toHaveBeenCalledTimes(1)
        expect(ams.$prevReturn).toBe('retrunTest')
    });

    it('ams.block', () => {
        // mock console.warn
        const spyFn = jest.spyOn(console, 'warn')

        // 重复注册mock
        ams.block('mockBlock', {})
        expect(spyFn).toHaveBeenCalled();
        expect(spyFn).toHaveBeenCalledWith('重复注册block：', 'mockBlock');
    })

    it('ams.getBlock', async() => {
        // err为function类型的block
        let block = await ams.getBlock('err');

        expect(block.type).toBe('error');
        expect(block.resource).toBe('resource');
    })

    it('ams.$on', () => {
        // Mock函数
        const mockFn = jest.fn();

        ams.$on('mockFn', mockFn);
        ams.$emit('mockFn', 'edward');

        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledWith('edward');

        // 取消函数监听，再触发函数
        ams.$off('mockFn', mockFn);
        ams.$emit('mockFn');
        expect(mockFn).toBeCalledTimes(1);
    })

    it('ams.$once', () => {
        // Mock函数
        const mockFn = jest.fn();

        // 仅在第一次触发会执行，之后不会执行
        ams.$once('mockOnce', mockFn);
        ams.$emit('mockOnce', 'edward');
        ams.$emit('mockOnce');
        ams.$emit('mockOnce');

        expect(mockFn).toBeCalled();
        expect(mockFn).toBeCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith('edward');
    })

    it('ams.render', () => {
        // mock console.warn
        const spyFn = jest.spyOn(console, 'warn')

        // 使用未定义block，抛出warn
        ams.render('404')
        expect(spyFn).toHaveBeenCalled();
        expect(spyFn).toHaveBeenCalledWith('未注册block：', '404');
    })

});
