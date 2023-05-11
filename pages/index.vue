<script setup lang="ts">

import { onMounted, ref, onBeforeUnmount } from 'vue'
import Experience from '@/Experience/Experience'
// import router from '@/router'

const router = useRouter()
// Listens for a certain event where it then redirects to /about
// So far this seems to be the best way to handle ThreeJS -> Vue interactions

definePageMeta({
  layout: 'home'
})

useHead({
  title: 'Sewcial',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Your new third place for creativity, sustainability, and community. Upcycle clothes, make friends and build a better future! 🌍🧵🪡'
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: 'Sewcial'
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: 'Your new third place for creativity, sustainability, and community. Upcycle clothes, make friends and build a better future! 🌍🧵🪡'
    },
    {
      hid: 'theme-color',
      name: 'theme-color',
      content: '#FF96C3'
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: 'https://sewcial.space/images/thumbnail.png'
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Sewcial'
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'Your new third place for creativity, sustainability, and community. Upcycle clothes, make friends and build a better future! 🌍🧵🪡'
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: 'https://sewcial.space/images/thumbnail.png'
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: 'https://sewcial.space'
    },
    {
      hid: 'og:site_name',
      property: 'og:site_name',
      content: 'Sewcial'
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'website'
    }
  ]
})

const experience = ref<Experience>()
onMounted(() => {
  window.addEventListener(
    'triggerMessage',
    () => {
      router.push({ name: 'about-us' })
    }
  )
  const appElem: HTMLCanvasElement | null = document.querySelector('#canvas')
  if (appElem != null) {
    experience.value = new Experience(appElem)
  }
})

// FIXME: Improve canvas unmount handling
/** Currently, this code is done because when you switch pages and then go back to home, the canvas is lost
 *  ideally, we don't want the Experience to load a long time, so if canvas-loading is getting too long, then consider alternatives */
onBeforeUnmount(() => {
  if (experience.value != null) { experience.value.unmount() }
})
</script>

<template>
  <main>
    <div class="canvas-wrapper">
      <canvas id="canvas" />
    </div>
  </main>
</template>

<style scoped lang="scss">

  main {
    overflow: hidden;
  }
  .canvas-wrapper {
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    overflow: hidden;
    position: absolute;
    z-index: -100;
  }
  canvas {
    width: 100%;
    height: 100%;
    background-color: $clr-secondary;
    pointer-events: initial;
  }

  .logo-white {
    position: absolute;
    padding-top: 50px;
    padding-left: 50px;
  }
</style>
