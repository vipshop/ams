export const on = function () {
    const on = {};
    if (this.field && this.field.on) {
        Object.keys(this.field.on).forEach(key => {
            on[key] = (...args) => {
                return this.field.on[key].call(this.$block, ...args, this);
            };
        });
    }

    return on;
};

export const tooltip = function () {
    let tooltip;
    if (this.operation && this.operation.tooltip) {
        tooltip = this.operation.tooltip;
    } else if (this.field && this.field.tooltip) {
        tooltip = this.field.tooltip;
    }

    if (tooltip) {
        if (typeof tooltip === 'string') return { effect: 'dark', placement: 'bottom', content: tooltip };
        if (typeof tooltip === 'object') return tooltip;
        return null;
    }
    return null;

};

export const badge = function () {
    let badge;
    if (this.operation && this.operation.badge) {
        badge = this.operation.badge;
    } else if (this.field && this.field.badge) {
        badge = this.field.badge;
    }

    if (badge) {
        if (typeof badge.value === 'function') {
            let value =  badge.value.call(this.$block || this, this.context);
            // element badge的value只能为string和number类型，对boolean类型进行转换
            if (value === true) {
                return {
                    ...badge,
                    value: '1',
                    hidden: false
                };
            } else if (value === false) {
                return {
                    ...badge,
                    value: '',
                    hidden: true
                };
            }

            return {
                ...badge,
                value
            };
        } else {
            return badge;
        }
    }
};
