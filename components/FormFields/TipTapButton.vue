<script setup lang="ts">
const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

const disabledStyling = computed(() => {
  return props.isDisabled ? ['opacity-50', 'cursor-not-allowed'] : ''
})
const activeStyling = computed(() => {
  console.log(props.isActive)
  return props.isActive ? ['border-slate-400', 'text-dark'] : ['border-transparent', 'text-gray-400']
})
</script>

<template>
  <button
    class="text-sm p-1 m-0 border-solid rounded-md border-[1px] justify-center hover:border-slate-400 normal-case font-normal "
    :class="activeStyling"
  >
    <slot />
  </button>
</template>
