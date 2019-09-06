export const on = function () {
    const on = {};

    if (this.field && this.field.on) {
        Object.keys(this.field.on).forEach(key => {
            on[key] = (...args) => {
                return this.field.on[key].call(this.$block, ...args);
            };
        });
    }

    return on;
};
