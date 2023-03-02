<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { usePageFrontmatter } from "@vuepress/client";
import { type ThemeBlogHomePageFrontmatter } from "./frontmatter/blogHome";

const frontmatter = usePageFrontmatter<ThemeBlogHomePageFrontmatter>();

const artist = computed(() => frontmatter.value.tagline)
const themeColor = computed(() => frontmatter.value.heroAlt)


const heroHeight = ref(`calc(100vh - var(--navbar-height))`)
const flipped = ref(false)

const windowSize = ref<{ width: number, height: number }>({
    width: 0,
    height: 0
})

const handleResize = (): void => {
    windowSize.value.width = window.innerWidth
    windowSize.value.height = window.innerHeight
}

const flipHero = () => {
    const width = windowSize.value.width
    if (flipped.value) {
        heroHeight.value = 'calc(100vh - var(--navbar-height))'
    } else {
        heroHeight.value = width > 768 ? '350px' : '240px'
    }

    flipped.value = !flipped.value

    setTimeout(() => {
        if (flipped.value) {
            heroHeight.value = width > 768 ? '350px' : '240px'
        } else {
            heroHeight.value = 'calc(100vh - var(--navbar-height))'
        }
    }, 1000)

}

onMounted(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<template>
    <div class="blog-hero" :style="{ height: heroHeight }">
        <div class="mask"></div>
        <img class="hero-image hero-image-pc" src="/aneot.svg" alt="hero image"
            :style="`filter: drop-shadow(` + themeColor + ` 0 0 6px);`">
        <img class="hero-image hero-image-mobile" src="/aneot-short.svg" alt="hero image" style="">
        <p class="artist" :style="`text-shadow: ` + themeColor + ` 0 0 2px;`">{{ artist }}</p>
        <div class="button-wrapper">
            <button class="btn collapse-button" :class="{ flipped: flipped }" @click="flipHero">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon slide-down-icon" viewBox="0 0 1024 1024"
                    fill="currentColor" aria-label="slide-down icon">
                    <path
                        d="M108.775 312.23c13.553 0 27.106 3.734 39.153 11.806l375.205 250.338 363.641-252.808c32.587-21.624 76.499-12.83 98.123 19.757 21.685 32.467 12.95 76.56-19.576 98.184l-402.854 278.89c-23.733 15.901-54.694 15.962-78.547.12L69.501 442.097c-32.647-21.685-41.441-65.777-19.817-98.304 13.734-20.54 36.201-31.563 59.09-31.563Z">
                    </path>
                </svg>
            </button>
        </div>
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
    // height: calc(100vh - var(--navbar-height));
    width: 100%;
    margin-bottom: 1rem;
    background-image: url("/hero.webp"); //背景图，存放在docs/.vuepress/public
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: height 1s ease;

}

.artist {
    font-family: 'crimson', 'LXGW WenKai Screen R', serif;
    color: aliceblue;
    justify-self: flex-end;
    position: relative;
    bottom: 0.5vh;
    max-width: 30vw;
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
}

.hero-image-mobile {
    max-width: 75%;
}

.btn {
    z-index: 2;
    border-width: 0;
    background-color: transparent;
    cursor: pointer;
    rotate: 180deg;
    width: 60px;
    height: 60px;
    padding: 10px;
    display: block;
    color: rgba(255, 255, 255, 0.8);
    filter: drop-shadow(gray 0 0 3px);

    &::after {
        position: absolute;
        content: '';
        top: -10px;
        bottom: -10px;
        left: -10px;
        right: -10px;
    }
}

.button-wrapper {
    position: absolute;
    bottom: 0;
    left: 50vw;
    transform: translateX(-50%);
}

.flip-button {
    transition: transform 0.2s ease;
}

.flipped {
    transform: rotateX(180deg);
}

/* mobile */
@media all and (max-width: 768px) {
    .hero-image-pc {
        display: none;
    }

    .artist {
        left: 6vw;
    }
}

/* PC */
@media all and (min-width: 769px) {
    .hero-image-mobile {
        display: none;
    }

    .artist {
        left: 2vw;
    }
}
</style>