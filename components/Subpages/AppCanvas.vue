<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import Experience from '@/Experience/Experience'
const experience = ref<Experience | null>()

onMounted(() => {
  const appElem: HTMLCanvasElement | null = document.querySelector('#canvas')
  if (appElem != null) {
    experience.value = new Experience(appElem)
  }
})

// FIXME: Improve canvas unmount handling
/** Currently, this code is done because when you switch pages and then go back to home, the canvas is lost
 *  ideally, we don't want the Experience to load a long time, so if canvas-loading is getting too long, then consider alternatives */
onBeforeUnmount(() => {
  if (experience.value != null) {
    experience.value.unmount()
    experience.value = null
  }

  (window as any).experience = null
  document.getElementById('canvas')?.parentElement?.removeChild(document.getElementById('canvas')!)
})
</script>

<template>
  <canvas
    id="canvas"
    ref="canvas"
    class="w-full h-full bg-secondary pointer-events-auto"
  />
</template>
