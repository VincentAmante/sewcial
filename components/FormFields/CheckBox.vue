<script setup lang="ts">

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: false,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])
const checked = useVModel(props, 'modelValue', emit)
const toggle = useToggle(checked)
</script>

<template>
  <label

    class="flex justify-start text-center my-2 w-full px-2 gap-2  cursor-pointer"
  >
    <div
      :class="(checked) ? 'bg-secondary' : ''"
      class="p-2 min-w-[1.25rem] min-h-[1.25rem] aspect-square border-solid border-secondary border-[2px] rounded-md"
    >
      <input
        class="hidden pointer-events-none"
        type="checkbox"
        @click="() => toggle()"
      >
    </div>
    <div class="text-dark text-base">
      {{ label }}
    </div>
  </label>
</template>
