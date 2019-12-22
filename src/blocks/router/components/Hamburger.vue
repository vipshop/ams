<template>
    <span :class="{ 'is-active': isActive }" class="hamburger" @click="toggleClick">
        <i class="ams-icon-fold"></i>
    </span>
</template>

<script>
export default {
    name: 'Hamburger',
    props: {
        isActive: {
            type: Boolean,
            default: false
        },
        toggleClick: {
            type: Function,
            default: null
        }
    }
};
</script>

<style scoped lang="scss">
.hamburger {
    display: inline-block;
    vertical-align: top;
    padding: 0 10px;
    cursor: pointer;
    font-size: 20px;
    transform: rotate(180deg);
    transition: 0.38s;
    transform-origin: 50% 50%;
    &:hover{
        opacity: 0.7;
    }
    &.is-active {
        transform: rotate(0deg);
    }
}
</style>
