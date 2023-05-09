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
      <DescriptionSlider
        name="lounge"
        img-src="/images/scenes/lounge.png"
      >
        <template #title>
          Sewcial Lounge
        </template>
        <template #default>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, totam officia. Repellendus consectetur pariatur ex repudiandae dignissimos ducimus, consequuntur laboriosam! Corporis porro sunt ipsa harum nulla quod rerum voluptatum sint.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod et ad illum, vero debitis dignissimos totam minima eligendi eveniet quisquam?</p>
        </template>
      </DescriptionSlider>

      <DescriptionSlider name="cafe" img-src="/images/scenes/cafe.png">
        <template #title>
          Sewcial Cafe
        </template>
        <template #default>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, totam officia. Repellendus consectetur pariatur ex repudiandae dignissimos ducimus, consequuntur laboriosam! Corporis porro sunt ipsa harum nulla quod rerum voluptatum sint.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod et ad illum, vero debitis dignissimos totam minima eligendi eveniet quisquam?</p>
        </template>
      </DescriptionSlider>

      <DescriptionSlider name="studio" img-src="/images/scenes/studio.png">
        <template #title>
          Sewcial Studio
        </template>
        <template #default>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, totam officia. Repellendus consectetur pariatur ex repudiandae dignissimos ducimus, consequuntur laboriosam! Corporis porro sunt ipsa harum nulla quod rerum voluptatum sint.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod et ad illum, vero debitis dignissimos totam minima eligendi eveniet quisquam?</p>
          <div class="flex flex-col">
            <SpeechBubble
              class="flex justify-between items-center cursor-pointer"
              @click="() => useRouter().push('/templates')"
            >
              <p class="text-alt uppercase">
                Try our templates
              </p>
              <img src="/images/door.png" alt="">
            </SpeechBubble>
            <SpeechBubble
              alignment="right"
              class="flex flex-row-reverse justify-between items-center cursor-pointer"
              @click="() => useRouter().push('/donate')"
            >
              <p class="text-alt uppercase">
                Donate Here
              </p>
              <img src="/images/door-alt.png" alt="">
            </SpeechBubble>
          </div>
        </template>
      </DescriptionSlider>

      <DescriptionSlider name="shop" img-src="/images/scenes/shop.png">
        <template #title>
          Sewcial Showcase
        </template>
        <template #default>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, totam officia. Repellendus consectetur pariatur ex repudiandae dignissimos ducimus, consequuntur laboriosam! Corporis porro sunt ipsa harum nulla quod rerum voluptatum sint.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod et ad illum, vero debitis dignissimos totam minima eligendi eveniet quisquam?</p>
          <div class="flex flex-col">
            <SpeechBubble
              class="flex justify-between items-center cursor-pointer"
              @click="() => useRouter().push('/shop/catalogue')"
            >
              <p class="text-alt uppercase">
                See our Catalogue
              </p>
              <img src="/images/door.png" alt="">
            </SpeechBubble>
          </div>
        </template>
      </DescriptionSlider>
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
