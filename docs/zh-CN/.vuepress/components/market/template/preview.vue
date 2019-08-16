<template>
<div class="preview-template-wrap" v-if="ready">
    <ams-block name="templatePreview"/>
</div>
</template>

<script>
import ams from '@ams-team/ams'
import '../../entry'
import templateData from '../templateData';

export default {
    data() {
        return {
            ready: false
        }
    },
    mounted() {
        let templateId = ams.utils.getQueryString('templateId');
        console.log('templateData', templateId, templateData)
        for(let i = 0; i < templateData.length; i++){
            if (templateId == templateData[i].templateId) {
                let config = (new Function(`return ${templateData[i].templateContent}`))();
                console.log(config);
                ams.block('templatePreview', config);
                this.ready = true;
                return;
            }
        }
    }
}
</script>

<style>
.preview-template-wrap{
    position: fixed;
    margin: 0 !important;
    z-index: 9999;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
}
</style>
