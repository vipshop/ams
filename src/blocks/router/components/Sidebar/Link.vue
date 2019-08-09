
<template>
  <!-- eslint-disable vue/require-component-is-->
  <component v-bind="linkProps(to)">
    <slot/>
  </component>
</template>

<script>
import { isExternal } from '../../../../utils';

export default {
    props: {
        to: {
            type: Object,
            required: true
        }
    },
    methods: {
        isExternalLink(routePath) {
            return isExternal(routePath);
        },
        linkProps(to) {
            if (this.isExternalLink(to.path)) {
                return {
                    is: 'a',
                    href: to.path,
                    target: to.target,
                    rel: 'noopener'
                };
            }
            return {
                is: 'router-link',
                to: to.path
            };
        }
    }
};
</script>
