<script setup lang="ts">
const props = defineProps({
  isLikedPage: {
    type: Boolean,
    default: false
  }
})

defineEmits(['applyFilter', 'hideFilter'])

const filterStyling = computed(() => {
  switch (props.isLikedPage) {
    case true:
      return {
        bg: 'bg-accent-1',
        bgAlt: 'primary',
        text: 'text-primary'
      }
    case false:
    default:
      return {
        bg: 'bg-primary',
        bgAlt: 'accent-1',
        text: 'text-accent-1'
      }
  }
})
</script>

<template>
  <div
    class="bg-primary flex flex-col p-9"
    :class="filterStyling.bg"
  >
    <div
      class="uppercase text-base"
      :class="filterStyling.text"
      @click="$emit('hideFilter')"
    >
      Hide Filter
    </div>
    <div class="flex flex-col gap-4 my-2 gap-y-8">
      <slot />
    </div>
    <AppButton
      :bg-colour="filterStyling.bgAlt"
      @click="$emit('applyFilter')"
    >
      Apply Filters
    </AppButton>
  </div>
</template>
