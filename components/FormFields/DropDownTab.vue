<script setup lang="ts">
// Variables passed to this component are props
const props = defineProps({
  alignment: {
    type: String,
    default: 'left'
  },
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  }
})

const emit = defineEmits<{(
  e: 'update:modelValue', value: boolean): void
}>()
const tabToggled = useVModel(props, 'modelValue', emit)

</script>

<!-- Template with default text and icon -->
<template>
  <div class="text-secondary w-full relative flex flex-col self-start" :class="alignment">
    <div
      class="flex w-full justify-between items-center"
      @click="() => tabToggled = !tabToggled"
    >
      <h1>
        <slot name="title" class="text">
          Title Here
        </slot>
      </h1>
      <AppIcon
        :icon="(tabToggled ? ['fas', 'minus'] : ['fas', 'plus'])"
        class="icon mx-4 transition-all cursor-pointer text-[2rem]"
      />
    </div>
    <div
      class="transition-all overflow-hidden"
      :class="(tabToggled ? 'max-h-[1000px]' : 'max-h-0') + ' overflow-hidden'"
    >
      <slot>
        CONTENT HERE
      </slot>
    </div>
  </div>
</template>
