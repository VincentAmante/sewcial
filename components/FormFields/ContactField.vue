<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
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
const textInput = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <label
    :for="name"
    class="flex flex-col gap-0 text-secondary w-full"
  >
    <p class="m-0 pb-1">
      <slot>MISSING LABEL</slot>
    </p>
    <input
      id=""
      v-model.lazy="textInput"
      class=" rounded-md border-2 border-solid border-secondary bg-none py-1 px-1 focus:outline-none align-middle"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :required="isRequired"
    >
  </label>
</template>
