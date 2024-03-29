<script setup lang="ts">

import { onMounted, ref, onBeforeUnmount } from 'vue'
import LazyAppCanvas from '@/components/Subpages/AppCanvas.vue'
// import router from '@/router'

const router = useRouter()
// Listens for a certain event where it then redirects to /about
// So far this seems to be the best way to handle ThreeJS -> Vue interactions

definePageMeta({
  layout: 'home'
})

useServerSeoMeta({
  title: 'Sewcial'
})

const loadingScreenStyle = ref({
  background: [''],
  screen: ['']
})

function doneLoading () {
  const loadingScreen = document.querySelector('#loading-screen')
  if (loadingScreen != null) {
    loadingScreenStyle.value = {
      background: ['bg-secondary', 'bg-opacity-0', 'pointer-events-none'],
      screen: ['transform', 'translate-y-[-100%]', 'opacity-0']
    }
  }

  window.removeEventListener('done-loading', doneLoading)
}
onMounted(() => {
  window.addEventListener(
    'triggerMessage',
    () => {
      router.push({ name: 'about-us' })
    }
  )
  window.addEventListener('done-loading', doneLoading)
})

onBeforeUnmount(() => {
  window.removeEventListener('doneLoading', doneLoading)
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
        class="bg-accent-1 rounded-3xl transition-all duration-1000 py-4 px-8 m-2"
        :class="loadingScreenStyle.screen"
      >
        <AppIcon class="animate-spin text-center text-4xl w-full text-primary" :icon="['fas', 'spinner']" />
        <h1 class="text-h-big-boy text-primary text-center my-0">
          Loading..
        </h1>
        <p
          id="loading-type"
          class="w-full font-light text-primary text-center mt-0"
        >
          Downloading Assets
          <span id="loading-bar" class="hidden">0</span>
        </p>
      </div>
    </div>
    <div class="canvas-wrapper w-[100vw] h-[100vh] pointer-events-none overflow-hidden absolute z-[-100]">
      <LazyAppCanvas />
    </div>
  </main>
</template>
