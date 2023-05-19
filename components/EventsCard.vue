<script setup lang="ts">
// Import download button
import RSVPButton from '@/components/RSVPButton.vue'

// Variables passed to this component are props
defineProps({
  image: {
    type: String,
    required: true
  }
})

defineEmits(['clickedRsvp'])
</script>

<!-- Card -->
<template>
  <div
    class="cards m-2 cursor-pointer group min-w-[20rem] select-none"
  >
    <div class="card flex flex-col text-dark bg-primary w-full h-full rounded-2xl transition-all group-hover:transform">
      <div class="aspect-[1.1/1] overflow-hidden h-80">
        <div
          class="card-image bg-cover bg-center bg-no-repeat rounded-t-2xl align-middle brightness-100 h-full
       transition-all group-hover:scale-105 group-hover:brightness-[80%]"
          :style="{ backgroundImage: `url(${image})` }"
        />
      </div>
      <div class="card-info flex flex-col p-4 justify-start grow items">
        <h1 class="my-2 break-words">
          <slot name="event-name" />
        </h1>
        <h3 class="my-2">
          <slot name="date" />
        </h3>
        <p>This is the event description.</p>
        <h3 class="disclaimer pt-2 my-6 grow">
          FREE ENTRY!
        </h3>
        <RSVPButton @click.stop="() => $emit('clickedRsvp')" />
      </div>
    </div>
  </div>
</template>
