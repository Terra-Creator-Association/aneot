<template>
    <div class="line"></div>
</template>

<script>
export default {
    name: "line",
    props: {
        height: {
            type: Number,
            default: 1
        },
    },
}
/* 一些调用时按需要调整高度的示例，不指定则默认为1px
<div class="line" :style="{ height: height + 'px' }"></div>
或
<line height="3"></line>
*/
</script>

<style>
.line {
    /* put styles here. */
    width: 100%;
    background-color: black;
}
</style>



