<script setup lang="ts">
// Import download button
import RSVPButton from '@/components/RSVPButton.vue'

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
  <div class="cards m-1 h-full w-full flex flex-col items-center" onclick="location.href='html/image.html'">
    <div class="card flex flex-col text-dark bg-primary w-full max-w-sm rounded-2xl transition-all hover:cursor-pointer group group-hover:transform">
      <img
        class="card-image aspect-[1.1/1] overflow-hidden object-cover object-center rounded-t-2xl w-full align-middle filter brightness-90 transition-all group-hover:brightness-[100%]"
        :src="image || ''"
      >
      <div class="card-info flex flex-col p-7 text-left">
        <h1 class="my-1">
          <slot name="event-name" />
        </h1>
        <h3 class="my-1">
          <slot name="date" />
        </h3>
        <h3 class="disclaimer pt-2 my-6">
          FREE ENTRY!
        </h3>
        <RSVPButton />
      </div>
    </div>
  </div>
</template>