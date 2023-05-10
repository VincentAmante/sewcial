<script setup lang="ts">
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
  <div class="card w-full">
    <div
      class="aspect-[1.5/1] overflow-hidden bg-cover bg-center bg-no-repeat h-full rounded-lg outline-4 outline-dashed outline-secondary w-auto
      tablet:aspect-[0.85/1]"
      :style="{ backgroundImage: `url(${image})` }"
    />
  </div>
</template>
