/* eslint-disable */
import { shallowMount } from '@vue/test-utils';
import Component from '@/blocks/block/operations.vue';
import ams from '@/index';
import Vue from 'vue'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.use(ams)

describe('block/operations.vue', () => {
	let wrapper;
    let mockJson = {
        type: 'list',
        ctx: 'view',
        resource: 'resource'
	};
	const operations = {
		save: {
			type: 'button',
			label: '保存',
			props: {
				type: 'primary'
			}
		},
		search: {
			slot: 'searchs',
			type: 'button',
			props: {
				type: 'primary'
			},
			label: '搜索',
			event: 'list'
		},
		reset: {
			slot: 'searchs',
			type: 'reset',
			label: '重置',
			event: 'reset'
		}
		// act_id: {
		// 	slot: 'searchs',
		// 	type: 'field',
		// 	field: 'act_id',
		// 	label: 'id',
		// 	props: {}
		// },
		// dropdown: {
		// 	slot: 'searchs',
		// 	type: 'dropdown',
		// 	field: 'dropdown',
		// 	fields: {
		// 		act_id: true
		// 	},
		// 	props: {}
		// }
	}
	beforeAll(() => {
        // operationsMock
        ams.block('operationsMock', {
			resources: {
				resource: {
					act_id: {
						type: 'text',
						label: 'act_id'
					}
				}
			},
			data: {
				searchs: {
					act_id: ''
				}
			},
			type: 'operations',
			operations: {
				...operations
			}
		})
		ams.getBlock = jest.fn().mockResolvedValue(mockJson);

        // 挂载listMock
        wrapper = shallowMount(Component, {
            provide: {
				$block: {
					fields: {},
					block: {
						data: {}
					}
				}
			},
			propsData: {
				name: 'operationsMock',
				slotName: 'searchs',
				slotFieldKey: 'searchsKey',
				context: {}
			}
        });
	})
	
    it('是一个 Vue 实例', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('operations.vue的props属性', () => {
        expect(wrapper.props().name).toBe('operationsMock')
        expect(wrapper.props().slotName).toBe('searchs')
        expect(wrapper.props().slotFieldKey).toBe('searchsKey')
		expect(wrapper.props().context).toEqual({})
	});
	it('operations.vue的computed属性', () => {
		expect(Object.keys(wrapper.vm.operations).length).toBe(2) // 只渲染slotName为searchs的
		expect(wrapper.vm.operations).toEqual(expect.objectContaining({
			search: expect.any(Object),
			reset: expect.any(Object)
			// act_id: expect.any(Object),
			// dropdown: expect.any(Object)
		}))
		expect(wrapper.vm.path).toBe('searchs')
		wrapper.setProps({ slotName: '' })
		expect(wrapper.vm.path).toBe('searchsKey')
		wrapper.setProps({ slotFieldKey: '' })
		expect(wrapper.vm.path).toBe('defaultOperations')
	});
	it('operations.vue的methods属性', () => {
		expect(wrapper.vm.setFieldDefaultValue).toBeDefined()
		expect(wrapper.vm.getDefaultValue).toBeDefined()
		expect(wrapper.vm.getDefaultValue(operations)).toBe(undefined)
		// expect(wrapper.vm.getDefaultValue({ 
		// 	id: { field: 'field' },
		// 	'dropdown': { field: 'dropdown' }
		// })).toBe(undefined)
		// expect(wrapper.vm.setFieldDefaultValue).toBeCalled()
		// expect(wrapper.vm.setFieldDefaultValue).toBeCalledTimes(0);
	});
});
