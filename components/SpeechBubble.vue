<script setup lang="ts">
// Variables passed to this component are props
const props = defineProps({
  alignment: {
    type: String,
    default: 'left'
  },
  colourOverride: {
    type: String,
    default: 'none'
  }
})

const clrOverride = ref(props.colourOverride.toLowerCase())

watchEffect(() => {
  clrOverride.value = props.colourOverride.toLowerCase()
})
// Normally the alignment of a bubble has specific colouring
// but in cases where the colouring needs to be overriden, this computed property exists
const bubbleColour = computed(() => {
  switch (clrOverride.value) {
    case 'primary':
      return {
        wrapper: 'bg-primary',
        arrow: 'border-b-primary'
      }

    case 'secondary':
      return {
        wrapper: 'bg-secondary',
        arrow: 'border-b-secondary'
      }

    case 'accent-1':
      return {
        wrapper: 'bg-accent-1',
        arrow: 'border-b-accent-1'
      }

    case 'accent-2':
      return {
        wrapper: 'bg-accent-2',
        arrow: 'border-b-accent-2'
      }

    default:
      switch (props.alignment) {
        case 'right':
          return {
            wrapper: 'bg-secondary',
            arrow: 'border-b-secondary'
          }
        case 'left':
          return {
            wrapper: 'bg-accent-1',
            arrow: 'border-b-accent-1'
          }
        default:
          return {
            wrapper: 'bg-accent-1',
            arrow: 'border-b-accent-1'
          }
      }
  }
})

const alignmentStyle = computed(() => {
  const leftStyling = {
    wrapper: ['self-start', bubbleColour.value.wrapper],
    arrow: ['border-l-[50px]', 'border-l-transparent', '-transform-y-2', 'translate-x-[-2.5em]', 'rotate-[-15deg]', 'left-0', bubbleColour.value.arrow]
  }
  const rightStyling = {
    wrapper: ['self-end', bubbleColour.value.wrapper],
    arrow: ['border-r-[50px]', 'border-r-transparent', 'transform-y-2', 'translate-x-[2.5em]', 'rotate-[15deg]', 'right-0', bubbleColour.value.arrow]
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
<template>
  <div
    class="relative rounded-3xl text-primary m-2 mx-3 p-2 px-7 w-fit max-w-[55ch] break-words"
    :class="[alignment, alignmentStyle.wrapper]"
  >
    <slot name="icon" />
    <slot class="text" />
    <div
      class="absolute w-0 h-0 border-b-[20px] border-solid bottom-0"
      :class="[alignmentStyle.arrow]"
    />
  </div>
</template>
