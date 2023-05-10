<script setup lang="ts">
const props = defineProps({
  bgColour: {
    type: String,
    default: 'secondary'
  },
  textColour: {
    type: String,
    default: 'primary'
  }
})
</script>

<template>
  <button
    :class="[`bg-${bgColour}`, `text-${textColour}`]"
    class="p-4 px-8 border-2 rounded-3xl outline-none max-w-[18rem] hover:opacity-80"
  >
    <slot>
      Button!
    </slot>
  </button>
</template>
