import '../entry'

export default {
    data() {
        return {
            init: false,
            showConfig: false,
            configCode: '',
            codeBlock: {
                type: 'form',
                data: {
                    code: ''
                },
                resource: {
                    fields: {
                        code: {
                            type: 'ams-code',
                            labelWidth: '0'
                        }
                    }
                }
            }
        };
    },
    props: {
        blockName: String,
        onlineDemo: String
    },
    methods: {
        toggleDemoCofig(e){
            if (e.target.className === 'el-link--inner') {
                return
            }
            this.showConfig = !this.showConfig
        }
    }
};
