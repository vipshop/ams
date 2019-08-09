import { read, create, update, list, deleteAction } from './api';
import * as router from './router';
import * as item from './item';
import ams from '../ams';

export default {
    ...router,
    ...item,
    read,
    create,
    update,
    list,
    delete: deleteAction,

    validate() {
        return new Promise((resolve, reject) => {
            // console.log(this.block.data)
            this.$refs.amsForm.validate((valid, result) => {
                if (valid) {
                    resolve();
                } else {
                    reject(new Error('validate fail:', result));
                }
            });
        });
    },

    /**
     * this.emitEvent('confirm', {message: '确认删除吗?'});
     * @confirm:确认删除吗？
     */
    async confirm({ $arg, message }) {
        await this.$confirm($arg || message);
    },

    /**
     * @alert:确认删除吗？
     * this.emitEvent('alert', {
     *      message: '确认删除吗？',
     *      options: {
     *          title: '我是一个测试标题'
     *      }
     * })
     */
    async alert({ $arg, message, options }) {
        await this.$alert($arg || message, options);
    },

    /**
     * dialog显隐 show/hide
     * 延迟100ms成功，使子blocks有足够的时间进行渲染
     */
    show() {
        this.data.visible = true;
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 100);
        });
    },
    hide() {
        this.data.visible = false;
    },
    /**
     * 显式清空$prevReturn
     */
    clearReturn() {
        ams.$prevReturn = '';
    },
    /**
     * 重置block数据、如form的表单重置
     */
    resetData() {
        this.setBlockData(this.block.data);
    },

    // 等待毫秒，如果不传值则为0
    wait({ $arg }) {
        return new Promise((resolve, reject) => {
            // console.log(this.block.data)
            setTimeout(() => {
                resolve();
            }, $arg || 0);
        });
    },
};
