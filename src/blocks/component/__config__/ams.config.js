export const config = {
    BASE: 'CONFIG_BLOCK',
    type: {
        default: 'component'
    },
    options: {
        current: 'value',
        fields: {
            value: {
                default: {
                    is: 'div',
                    text: 'texttexttext',
                    html: ''
                }
            }
        }
    },
    style: {
        current: 'value',
        fields: {
            value: {
                default: {
                    width: '200px',
                    height: '200px',
                    background: '#f5f7fa'
                }
            }
        }
    }
};

export const defaults = {};
