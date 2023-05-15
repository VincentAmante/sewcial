<script setup lang="ts">
// Import download button
import DownloadButton from '@/components/DownloadButton.vue'

// Variables passed to this component are props
const props = defineProps({
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
        <div
          class="card-image bg-cover bg-center bg-no-repeat rounded-t-2xl align-middle brightness-100 h-full
       transition-all group-hover:scale-105 group-hover:brightness-[80%]"
          :style="{ backgroundImage: `url(${image})` }"
        />
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
