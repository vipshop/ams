<template>
    <div class="scrimba">
        <a :href="href" target="_blank" rel="noopener noreferrer">在 Scrimba 上尝试这节课{{ title ? '：' + title : '' }}</a>
    </div>
</template>

<script>
export default {
    props: {
        href: String,
        title: String
    }
}
</script>
<style scoped>
.scrimba,
.vueschool {
  background-color: #e7ecf3;
  padding: 1em 1.25em;
  border-radius: 2px;
  color: #486491;
  position: relative;
}
.scrimba a,
.vueschool a {
  color: #486491 !important;
  position: relative;
  padding-left: 36px;
}
.scrimba a:before,
.vueschool a:before {
  content: '';
  position: absolute;
  display: block;
  width: 30px;
  height: 30px;
  top: -5px;
  left: -4px;
  border-radius: 50%;
  background-color: #73abfe;
}
.scrimba a:after,
.vueschool a:after {
  content: '';
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  top: 5px;
  left: 8px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 8px solid #fff;
}
</style>
