<script setup lang="ts">
// TODO: Consider abstracting shared states with EndTimePicker
import { computed, watch } from 'vue'
import { useErrorStyling } from '@/composables/useErrorStyling'

const props = defineProps({
  date: {
    type: Date,
    required: true
  },
  modelValue: {
    type: Date,
    required: true
  },
  hasError: {
    type: Boolean,
    required: false,
    default: false
  }
})
const startingTimes = computed(() => {
  const { start, end } = openingHours
  const currentDate = props.date
  const availableTimesList = Array.from({ length: end - start }, (_, i) => {
    const time = new Date(currentDate).setHours(start + i, 0, 0)
    const timeValue = new Date(time)
    const timeFormat = toTimeFormat(time)
    return { timeValue, timeFormat }
  })
  return availableTimesList
})

function toTimeFormat (time: number) {
  return new Intl.DateTimeFormat('en-GB',
    {
      timeStyle: 'short',
      timeZone: 'Asia/Dubai',
      hourCycle: 'h12'
    }).format(time)
}
const emit = defineEmits(['update:modelValue'])
const startTime = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})
// TODO: refactor somehow
const openingHours = {
  start: 6,
  end: 19
}

const { errorStyling, hasError } = useErrorStyling(props.hasError)
watch(() => props.hasError, (newValue) => {
  hasError.value = newValue
})
</script>

<template>
  <label
    class="flex flex-col w-full capitalize relative gap-1"
    for="start-time"
  >
    <caption class="text-left text-white uppercase">
      Start Time
    </caption>
    <select
      id="booking-start-time"
      v-model="startTime"
      name="start-time"
      class=" rounded-md p-2 border-[1px] border-solid"
      :class="errorStyling"
      @change="hasError = false"
    >
      <option
        v-for="availableTime in startingTimes"
        :key="availableTime.timeValue"
        :value="availableTime.timeValue"
        class="option"
      >
        {{ availableTime.timeFormat }}
      </option>
    </select>
  </label>
</template>
