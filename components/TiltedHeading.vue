<script setup lang="ts">
// Variables passed to this component are props
const props = defineProps({
  textColor: {
    type: String,
    default: 'primary',
    required: false
  },
  big: {
    type: Boolean,
    default: false,
    required: false
  }
})

const dynamicStyle = computed(() => {
  const styles: string[] = []
  switch (props.textColor) {
    case 'primary':
      styles.push('text-primary')
      break
    case 'secondary':
      styles.push('text-secondary')
      break
    case 'accent-1':
      styles.push('text-accent-1')
      break
    case 'accent-2':
      styles.push('text-accent-2')
      break
    default:
      styles.push('text-primary')
      break
  }
  return styles
})

const tilt = computed(() => {
  return (props.big) ? '-rotate-[10deg]' : '-rotate-[15deg]'
})
</script>

<template lang="">
  <p
    class="text-h-tilted rounded-md py-1 px-2 relative w-fit max-w-[50ch]"
    :class="[dynamicStyle, tilt]"
  >
    <slot />
  </p>
</template>
