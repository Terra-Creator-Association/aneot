<script setup lang="ts">
</script>

<template>
    <div class="blog-hero">
        <div class="mask" style="background: url(&quot;/hero.webp&quot;) center center / cover no-repeat;"></div>
        <img class="hero-image hero-image-pc" src="/aneot.svg" alt="hero image" style="">
        <img class="hero-image hero-image-mobile" src="/aneot-short.svg" alt="hero image" style="">
    </div>
</template>

<style scoped lang="scss">
.blog-hero {
    color-scheme: light;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 450px;
    width: 100%;
    margin-bottom: 1rem;
    background-image: url("/hero.webp"); //背景图，存放在docs/.vuepress/public
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

    &::after {
        content: "© 红海岸 2023"; // 画师名
        font-family: 'crimson', 'LXGW WenKai Screen R', serif;
        color: aliceblue;
        text-shadow: #68ba62 0 0 2px; // 主题色
        justify-self: flex-end;
        position: relative;
        bottom: 1.5vh;
    }
}
.hero-image {
    position: relative;
    z-index: 2;
    display: block;
    max-width: 100%;
    max-height: 15rem;
    margin: 1.5rem auto;
    transition: transform 0.25s ease-in-out 0.04s, opacity 0.25s ease-in-out 0.04s;
    transform: translateY(0px);
    opacity: 1;
    filter: drop-shadow(#68ba62 0 0 6px); // 主题色
}

.hero-image-mobile {
    max-width: 75%;
}

/* mobile */
@media all and (max-width: 768px) {
    .hero-image-pc {
        display: none;
    }
    .blog-hero {
        &::after {
            left: 5vw;
        }
    }
}

/* PC */
@media all and (min-width: 769px) {
    .hero-image-mobile {
        display: none;
    }
    .blog-hero {
        &::after {
            left: 1.5vw;
        }
    }
}
</style>