<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'text'
  }
})

const emit = defineEmits(['update:modelValue'])
const textInput = useVModel(props, 'modelValue', emit)
</script>

<template>
  <label
    :for="name"
    class="flex flex-col gap-0 text-secondary w-full"
  >
    <p class="m-0 pb-1">
      <slot>MISSING LABEL</slot>
    </p>
    <textarea
      id=""
      v-model.lazy="textInput"
      class="rounded-md border-2 border-solid border-secondary bg-none pb-2 px-1 focus:outline-none"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :required="isRequired"
    />
  </label>
</template>
