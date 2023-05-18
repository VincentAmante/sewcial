<script setup lang="ts">
// Import download button
import { UseImage } from '@vueuse/components'
import DownloadButton from '@/components/DownloadButton.vue'

// Variables passed to this component are props
defineProps({
  image: {
    type: String,
    required: true
  }
})
</script>

<!-- Card -->
<template>
  <div
    class="cards m-2 cursor-pointer group select-none"
  >
    <div class="card flex flex-col bg-primary rounded-2xl w-full h-full max-w-xs">
      <div class="aspect-[1.1/1] overflow-hidden h-80">
        <UseImage
          loading="lazy"
          class="card-image object-cover object-center rounded-t-2xl align-middle brightness-100 w-full h-full
       transition-all group-hover:scale-105 group-hover:brightness-[80%]"
          :src="image"
        >
          <template #loading>
            <div class="text-primary bg-secondary flex flex-col items-center justify-center w-full h-full text-lg">
              Loading..
              <AppIcon class="animate-spin" :icon="['fas', 'spinner']" />
            </div>
          </template>
        </UseImage>
      </div>
      <div class="card-info flex flex-col p-4 justify-start grow items">
        <h1 class="my-2">
          <slot name="item-name" />
        </h1>
        <h3 class="my-2 capitalize">
          <slot name="owner" />
        </h3>
        <p class=" text-justify line-clamp-3">
          <slot name="description" />
        </p>
        <div class="flex justify-center items-end grow">
          <div>
            <DownloadButton />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
