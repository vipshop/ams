<template>
  <div></div>
</template>
<script>
// 空白页，用于路由跳转
export default {
    created() {
        let url = this.$route.query.url;
        this.$router.replace({
            path: url,
        });
    }
};
</script>