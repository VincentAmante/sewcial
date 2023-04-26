<script setup lang="ts">
const emits = defineEmits(['applyFilter', 'hideFilter'])
</script>

<template>
  <div class="bg-primary max-w-xs flex flex-col p-9">
    <div
      class="uppercase text-base text-accent-1"
      @click="$emit('hideFilter')"
    >
      Hide Filter
    </div>
    <div class="flex flex-col gap-4 my-2">
      <slot />
    </div>
    <AppButton
      bg-colour="accent-1"
      @click="$emit('applyFilter')"
    >
      Apply Filters
    </AppButton>
  </div>
</template>
