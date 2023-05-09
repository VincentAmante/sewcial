<script setup lang="ts">
import { computed } from 'vue'
import { useVModel, useToggle } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  },
  colour: {
    type: String,
    required: true,
    default: 'primary'
  }
})

// Allows a child component to send an update to the parent via emits aka events
const emit = defineEmits(['update:modelValue'])
const isToggled = useVModel(props, 'modelValue', emit)
const toggleBurger = useToggle(isToggled)
// watches for changes in {isToggled}'s value, makes changes accordingly
const burgerToggled = computed(() => {
  return (isToggled.value) ? 'toggled' : 'not-toggled'
})

const navColour = computed(() => {
  switch (props.colour) {
    case 'primary':
      return {
        bg: 'bg-primary',
        bgAlt: 'bg-secondary'
      }
    case 'secondary':
      return {
        bg: 'bg-secondary',
        bgAlt: 'bg-primary'
      }
    case 'accent-1':
      return {
        bg: 'bg-accent-1',
        bgAlt: 'bg-accent-2'
      }
    case 'accent-2':
      return {
        bg: 'bg-accent-2',
        bgAlt: 'bg-accent-1'
      }
    default:
      return {
        bg: 'bg-primary',
        bgAlt: 'bg-secondary'
      }
  }
})

const toggledStyles = computed(() => {
  if (isToggled.value) {
    return {
      div1: [navColour.value.bgAlt, 'transform', 'scale-x-100', 'translate-x-0', 'translate-y-[0px]', 'rotate-[45deg]', 'tablet:translate-y-[1px]'],
      div2: [navColour.value.bgAlt, 'opacity-0'],
      div3: [navColour.value.bgAlt, 'transform', 'scale-x-100', 'translate-x-0', 'translate-y-[-16px]', 'rotate-[-45deg]']
    }
  } else {
    return {
      div1: [navColour.value.bg],
      div2: [navColour.value.bg],
      div3: [navColour.value.bg]
    }
  }
})
</script>

<template>
  <label for="burgerToggle" class="burger-label">
    <input
      id=""
      v-model="isToggled"
      class="hidden"
      type="checkbox"
      name="burgerToggle"
    >
    <div class="burger flex flex-col justify-between h-5 aspect-square cursor-pointer pointer-events-auto" :class="[colour, burgerToggled]" @click="toggleBurger()">
      <div
        class="w-[30px] h-[16%] rounded transition-all transform"
        :class="[colour, ...toggledStyles.div1]"
      />
      <div
        class="w-[30px] h-[16%] rounded transition-all transform"
        :class="[colour, ...toggledStyles.div2]"
      />
      <div
        class="w-[30px] h-[16%] rounded transition-all transform"
        :class="[colour, ...toggledStyles.div3]"
      />
    </div>
  </label>
</template>
