<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { usePageFrontmatter } from "@vuepress/client";
import { type ThemeBlogHomePageFrontmatter } from "./frontmatter/blogHome";

const frontmatter = usePageFrontmatter<ThemeBlogHomePageFrontmatter>();

const artist = computed(() => frontmatter.value.tagline)
const themeColor = computed(() => frontmatter.value.heroAlt)

const initHeight = `calc(100vh - var(--navbar-height))`
const heroHeight = ref(initHeight)
const flipped = ref(false)

const windowSize = ref<{ width: number, height: number }>({
    width: 0,
    height: 0
})

const endHeight = windowSize.value.width > windowSize.value.height ? '350px' : '240px'

// Set default backgroundImage for PC
const backgroundImage = ref("/hero/2.webp")

const handleResize = (): void => {
    windowSize.value.width = window.innerWidth
    windowSize.value.height = window.innerHeight

    // Change backgroundImage based on the aspect ratio
    let aspectRatio = windowSize.value.width / windowSize.value.height;
    if (aspectRatio < 0.7) {
        backgroundImage.value = "/hero/1.webp";
    } else if (aspectRatio >= 0.7 && aspectRatio <= 1.2) {
        backgroundImage.value = "/hero/2.webp";
    } else {
        backgroundImage.value = "/hero/3.webp";
    }
}

const handleScroll = (): void => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    if (scrollTop < windowSize.value.height * 0.1) {
        expandHero()
    }else if (scrollTop > windowSize.value.height * 0.1 && scrollTop < windowSize.value.height * 0.3) {
        collapseHero()
    }
}

const setHero = () => {
    if (flipped.value) {
        expandHero()
        backToTop()
    } else {
        collapseHero()
    }
}

const flipBtn = () => {
    flipped.value = !flipped.value
}

const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const expandHero = () => {
    heroHeight.value = initHeight

    // setTimeout(() => {
    //     heroHeight.value = initHeight
    // }, 500)

    flipped.value = false
}

const collapseHero = () => {
    heroHeight.value = endHeight

    // setTimeout(() => {
    //     heroHeight.value = endHeight
    // }, 500)

    flipped.value = true
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    handleResize()
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <div class="blog-hero" :style="{ height: heroHeight, backgroundImage: `url(${backgroundImage})` }">
        <div class="mask"></div>
        <img class="hero-image hero-image-pc" src="/aneot.svg" alt="hero image"
            :style="`filter: drop-shadow(` + themeColor + ` 0 0 6px);`">
        <img class="hero-image hero-image-mobile" src="/aneot-short.svg" alt="hero image"
            :style="`filter: drop-shadow(` + themeColor + ` 0 0 6px);`">
        <p class="artist" :style="`text-shadow: ` + themeColor + ` 0 0 2px;`">{{ artist }}</p>
        <div class="button-wrapper">
            <button class="btn collapse-button" :class="{ flipped: flipped }" @click="setHero">
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
    width: 100%;
    margin-bottom: 1rem;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: height 1s ease;

    /* Set default background-image for PC */
    background-image: url("/hero-2.webp");

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

/* Mobile */
@media all and (max-aspect-ratio: 1/1) {
    .hero-image-pc {
        display: none;
    }

    .artist {
        left: 6vw;
    }
}

/* PC */
@media all and (min-aspect-ratio: 1/1) {
    .hero-image-mobile {
        display: none;
    }

    .artist {
        left: 2vw;
    }
}
</style>