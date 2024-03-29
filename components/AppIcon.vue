<script setup lang="ts">
defineProps({
  icon: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <ClientOnly>
    <font-awesome-icon
      :icon="icon"
      v-bind="$attrs"
    />
  </ClientOnly>
</template>
