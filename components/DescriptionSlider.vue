<script setup lang="ts">
import { ref, computed } from 'vue'
import ButtonClose from './icons/ButtonClose.vue'
import HeaderLogo from './TheHeader/HeaderLogo.vue'

const isOpen = ref(false)
const props = defineProps({
  // Name of the area the desc is about
  name: {
    type: String,
    required: true
  },

  // source for thumbnail, should be path from public
  imgSrc: {
    type: String,
    required: true
  }
})
const noSliderOpen = ref(true)

function onToggle () {
  if (noSliderOpen.value) {
    isOpen.value = true
    window.dispatchEvent(new Event('slider-opened'))
  }
}

function onSliderOpen () {
  noSliderOpen.value = false
}
function onSliderClose () {
  noSliderOpen.value = true
}

onMounted(() => {
  // Listens for an event based on the prop<name> to open
  // See TestViewIcen to see how that operates

  window.addEventListener('slider-opened', onSliderOpen)
  window.addEventListener('slider-closed', onSliderClose)
  window.addEventListener(`toggle-${props.name}`, onToggle)
})

function close () {
  isOpen.value = false
  window.dispatchEvent(new Event('slider-closed'))
}

// Computed variables will watch for certain variables inside its code
const toggledStyle = computed(() => {
  if (isOpen.value) {
    return {
      wrapper: ['bg-black', 'bg-opacity-20', 'pointer-events-auto'],
      slider: ['transform-none', 'translate-x-0']
    }
  } else {
    return {
      wrapper: [],
      slider: []
    }
  }
})

onUnmounted(() => {
  noSliderOpen.value = true
  window.dispatchEvent(new Event('slider-closed'))

  window.removeEventListener('slider-opened', onSliderOpen)
  window.removeEventListener('slider-closed', onSliderClose)
  window.removeEventListener(`toggle-${props.name}`, onToggle)
})
</script>

<template>
  <div
    :class="toggledStyle.wrapper"
    class="absolute top-0 left-0 w-screen h-screen z-[105] overflow-hidden pointer-events-none transition-all ease-out duration-150"
  >
    <div
      :class="toggledStyle.slider"
      class="relative pointer-events-auto -translate-x-full bg-primary max-w-3xl h-full transition-all ease-out duration-150 overflow-y-scroll no-scrollbar
      desktop:flex-row desktop:gap-8"
    >
      <div class="absolute top-0 w-full pt-mobile-h px-mobile-w flex justify-between">
        <HeaderLogo colour="secondary" />
        <div class="text-secondary text-4xl cursor-pointer">
          <!-- DEV: ButtonClose has a function for when the 'close-btn-clicked' emit is triggered -->
          <ButtonClose @close-btn-clicked="close" />
        </div>
      </div>
      <div
        class="flex flex-col h-full justify-center px-mobile-w pt-4 gap-8
        desktop:flex-row desktop:items-center desktop:justify-start desktop:gap-0"
      >
        <img
          :src="imgSrc"
          alt=""
          class="w-full max-w-sm object-contain max-h-80 self-center"
        >
        <div class="text-secondary px-8">
          <h1>
            <slot name="title" />
          </h1>
          <div class="text-justify relative">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
