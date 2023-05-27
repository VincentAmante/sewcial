<script setup lang="ts">
import { computed } from 'vue'
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
    default: '',
    required: false
  },
  isRequired: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'text'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  hasError: {
    type: Boolean,
    required: false,
    default: false
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

const { errorStyling, hasError } = useErrorStyling(props.hasError)
watch(() => props.hasError, (newValue) => {
  hasError.value = newValue
})
</script>

<template>
  <label
    :for="name"
    class="error flex flex-col w-full"
  >
    <p class="m-0 pb-1">
      <span class="pl-1">
        <slot>MISSING LABEL</slot>
      </span>
      <span
        v-if="isRequired"
        class="pl-1"
      >*</span>
    </p>
    <input
      id=""
      v-model.lazy="textInput"
      class="rounded-md border-2 border-solid pb-2 px-1 focus:outline-none disabled:opacity-25"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :required="isRequired"
      :disabled="disabled"
      :class="(hasError) ? errorStyling: ['border-secondary', 'bg-primary ']"
    >
  </label>
</template>
