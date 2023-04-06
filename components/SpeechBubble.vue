<script setup lang="ts">
// Variables passed to this component are props
const props = defineProps({
  alignment: {
    type: String,
    default: 'left'
  }
})

const alignmentStyle = computed(() => {
  const leftStyling = {
    wrapper: ['self-start', 'bg-accent-1'],
    arrow: ['border-l-[50px]', 'border-l-transparent', '-transform-y-2', 'translate-x-[-2.5em]', 'rotate-[-15deg]', 'left-0', 'border-b-accent-1']
  }
  const rightStyling = {
    wrapper: ['self-end', 'bg-secondary'],
    arrow: ['bg-b-secondary', 'border-r-[50px]', 'border-r-transparent', 'transform-y-2', 'translate-x-[2.5em]', 'rotate-[15deg]', 'right-0']
  }

  switch (props.alignment) {
    case 'right':
      return rightStyling
    case 'left':
      return leftStyling
    default:
      return leftStyling
  }
})
</script>

<!-- Template with defined slots -->
<!-- Currently, content by default goes to the one without a name -->
<!-- Slot 'Icon' has no implementation yet -->
<template lang="">
  <div
    class=" speech-bubble relative rounded-3xl text-primary m-2 mx-3 p-2 px-7 w-fit max-w-[55ch] break-words"
    :class="[alignment, alignmentStyle.wrapper]"
  >
    <slot name="icon" />
    <slot class="text" />
    <div
      class="arrow absolute -z-[1] w-0 h-0 border-b-[20px] border-solid bottom-0"
      :class="[alignmentStyle.arrow]"
    />
  </div>
</template>
