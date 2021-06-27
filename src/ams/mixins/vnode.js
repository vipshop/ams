/**
 * 支持需要自定义渲染的场景，比如表格展开行
 */
export default {
    components: {
        Vnode: {
            functional: true,
            render: (h, ctx) => {
                let render = ctx.props.render || (() => <span></span>);
                if (typeof render === 'string') {
                    // eslint-disable-next-line no-new-func
                    render = new Function(`return ${render}`)();
                }
                return render(h, ctx.props.scope);
            }
        }
    },
};
