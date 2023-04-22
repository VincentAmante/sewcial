<script setup lang="ts">
import { ref, computed } from 'vue'
import ButtonClose from './icons/ButtonClose.vue'

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

onMounted(() => {
  // Listens for an event based on the prop<name> to open
  // See TestViewIcen to see how that operates
  window.addEventListener(`toggle-${props.name}`, () => {
    isOpen.value = true
  })
})

function close () {
  isOpen.value = false
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
      wrapper: [''],
      slider: ['']
    }
  }
})
</script>

<template>
  <div
    :class="toggledStyle.wrapper"
    class="absolute top-0 left-0 w-screen h-screen z-[105] overflow-hidden pointer-events-none transition-all ease-out duration-150"
  >
    <div
      :class="toggledStyle.slider"
      class="relative pointer-events-auto -translate-x-full bg-primary max-w-full h-full transition-all ease-out duration-150 desktop:flex-row desktop:w-1/2"
    >
      <div class="absolute right-0 pt-mobile-h pr-mobile-w">
        <!-- DEV: ButtonClose has a function for when the 'close-btn-clicked' emit is triggered -->
        <ButtonClose @close-btn-clicked="close" />
      </div>
      <div class="flex flex-col h-full justify-center desktop:flex-row desktop:items-center desktop:justify-start desktop:grid desktop:grid-flow-col px-mobile-w">
        <img
          :src="imgSrc"
          alt=""
          class="w-full object-contain max-h-80"
        >
        <div class="content text-secondary">
          <h1>
            <slot name="title" />
          </h1>
          <div class="description text-justify relative">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
