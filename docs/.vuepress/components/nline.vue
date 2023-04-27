<template>
    <div class="nline"></div>
</template>

<script>
export default {
    name: "nline",
    props: {
        height: {
            type: Number,
            default: 1
        },
    },
}
/* 一些调用时按需要调整高度的示例，不指定则默认为1px
<div class="nline" :style="{ height: height + 'px' }"></div>
或
<nline height="3"></nline>
*/
</script>

<style>
.nline {
    /* put styles here. */
    width: 100%;
    background-color: black;
}
</style>



