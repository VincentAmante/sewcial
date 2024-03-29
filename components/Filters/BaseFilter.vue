<script setup lang="ts">
defineEmits(['applyFilter', 'hideFilter', 'clearFilter'])
</script>

<template>
  <div class="bg-primary flex flex-col p-9">
    <div class="flex justify-between">
      <div
        class="uppercase text-base text-accent-1 cursor-pointer"
        @click="$emit('hideFilter')"
      >
        Hide Filters
      </div>
      <div
        class="uppercase text-base text-accent-1 cursor-pointer"
        @click="$emit('clearFilter')"
      >
        Clear Filters
      </div>
    </div>
    <div class="flex flex-col gap-4 my-2 gap-y-8">
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
