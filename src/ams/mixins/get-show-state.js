import { get } from '../../utils';

export default {
    methods: {
        getShowState(field, data) {
            if (!field || field.hidden) {
                return false;
            }
            const type = typeof field.show;
            if (type === 'undefined') {
                return true;
            } else if (type === 'string') {
                if (!field.show) {
                    return true;
                }
                return get(data, field.show);// this.data[field.show];
            } else if (type === 'object') {
                if (!field.show.name) {
                    return true;
                }
                // eslint-disable-next-line eqeqeq
                return get(data, field.show.name) == field.show.value;
                // this.data[field.show.name] == field.show.value;
            } else if (type === 'function') {
                // 把this绑定到当前block，如果是operatio或者field是this.$block，如果是block内是this
                // 方便用户如果有更复杂的判断可能通过this获取更多的信息
                return field.show.call(this.$block || this, data);
            }
        }
    }
};
