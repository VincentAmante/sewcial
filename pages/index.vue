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

const loadingScreenStyle = ref({
  background: [''],
  screen: ['']
})
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

  window.addEventListener('done-loading', () => {
    const loadingScreen = document.querySelector('#loading-screen')
    if (loadingScreen != null) {
      loadingScreenStyle.value = {
        background: ['bg-secondary', 'bg-opacity-0', 'pointer-events-none'],
        screen: ['transform', 'translate-y-[-100%]', 'opacity-0']
      }
    }
  })
})

// FIXME: Improve canvas unmount handling
/** Currently, this code is done because when you switch pages and then go back to home, the canvas is lost
 *  ideally, we don't want the Experience to load a long time, so if canvas-loading is getting too long, then consider alternatives */
onBeforeUnmount(() => {
  if (experience.value != null) { experience.value.unmount() }
})
</script>

<template>
  <main class="overflow-hidden">
    <div
      id="loading-screen"
      class="absolute w-full h-full flex justify-center items-center z-50 bg-secondary transition-all duration-1000"
      :class="loadingScreenStyle.background"
    >
      <div
        class="m-4 mx-8 bg-accent-1 rounded-3xl transition-all duration-1000 max-w-md w-full py-4"
        :class="loadingScreenStyle.screen"
      >
        <h1 class="text-h-big-boy text-primary text-center">
          Loading..
        </h1>
        <h2
          id="loading-type"
          class="w-full font-light text-primary text-center"
        >
          Downloading Assets -
          <span id="loading-bar">0</span>
        </h2>
      </div>
    </div>
    <div class="canvas-wrapper w-[100vw] h-[100vh] pointer-events-none overflow-hidden absolute z-[-100]">
      <canvas
        id="canvas"
        class="w-full h-full bg-secondary pointer-events-auto"
      />
    </div>
  </main>
</template>
