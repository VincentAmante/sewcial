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
      class="absolute z-50 flex items-center justify-center w-full h-full transition-all duration-1000 bg-secondary"
      :class="loadingScreenStyle.background"
    >
      <div
        class="px-8 py-4 m-2 transition-all duration-1000 bg-accent-1 rounded-3xl"
        :class="loadingScreenStyle.screen"
      >
        <AppIcon class="w-full text-4xl text-center animate-spin text-primary" :icon="['fas', 'spinner']" />
        <h1 class="my-0 text-center text-h-big-boy text-primary">
          Loading..
        </h1>
        <p
          id="loading-type"
          class="w-full mt-0 font-light text-center text-primary"
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
