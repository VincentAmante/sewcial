<script setup lang="ts">
import { UseImage } from '@vueuse/components'

// Variables passed to this component are props
defineProps({
  image: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
})
</script>

<!-- Card -->
<template>
  <div class="cards-container p-3 m-1">
    <div class="card text-dark w-full rounded-lg transition-all  cursor-pointer group hover:transform hover:scale-110">
      <div
        class="card-image aspect-[3/4] relative overflow-hidden bg-cover bg-center bg-no-repeat rounded-lg w-full align-middle transition-all"
      >
        <UseImage
          class="w-full h-full absolute bg-secondary object-cover object-center aspect-[3/4] flex flex-col"
          :src="image"
        >
          <template #loading>
            <div class="text-secondary flex flex-col items-center justify-center w-full h-full">
              Loading..
              <AppIcon class="animate-spin" :icon="['fas', 'spinner']" />
            </div>
          </template>
        </UseImage>
        <div
          v-if="!available"
          class="sold-text absolute w-full h-full bg-accent-2 bg-opacity-50 flex flex-col items-center justify-center"
        >
          <h1 class="text-primary text-2xl">
            SOLD
          </h1>
        </div>
      </div>
      <div class="card-heading flex flex-wrap justify-between items-baseline text-left gap-x-2 pt-2 text-secondary">
        <h1 class="item-name my-0 max-w-[14ch] text-ellipsis overflow-hidden">
          <slot name="item-name" />
        </h1>
        <h1 class="price my-0 text-accent-1">
          <slot name="price" />
        </h1>
      </div>
      <p class="description text-left w-full text-secondary my-1 line-clamp-4">
        <slot name="description" />
      </p>
    </div>
  </div>
</template>
