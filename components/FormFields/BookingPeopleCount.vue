<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  hasError: {
    type: Boolean,
    required: false,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])
const bookingPeople = computed({
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

    class="flex flex-col w-full capitalize relative gap-1"
    for="booking-people"
  >
    <caption class="text-left text-white uppercase">
      How many people?
    </caption>
    <input
      v-model="bookingPeople"
      type="number"
      min="0"
      class=" rounded-md p-2 border-[1px] border-solid"
      :class="errorStyling"
      @change="hasError = false"
    >
  </label>
</template>
