<script setup lang="ts">
// TODO: Consider abstracting shared states with EndTimePicker
import { computed, watch, reactive } from 'vue'

const props = defineProps({
  startTime: {
    type: Date,
    required: true
  },
  modelValue: {
    type: Date,
    required: true
  },
  isDisabled: {
    type: Boolean,
    required: true
  },
  hasError: {
    type: Boolean,
    required: false,
    default: false
  }
})

function toTimeFormat (time: number) {
  return new Intl.DateTimeFormat('en-GB',
    {
      timeStyle: 'short',
      timeZone: 'Asia/Dubai',
      hourCycle: 'h12'
    }).format(time)
}

function getHoursDiff (olderTime: number, newerTime: number) {
  if (newerTime - olderTime == 1) {
    return '(1 HR)'
  } else if (newerTime) {
    return `(${newerTime - olderTime} HRS)`
  }
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

const endingTimes = computed(() => {
  const endingTimesList = []
  const originalHour = props.startTime.getHours()
  const startDate = new Date(props.startTime)

  for (let hour = originalHour + 1, i = 0; hour <= openingHours.end; hour++, i++) {
    const time = startDate.setHours(hour)
    const timeValue: Date = new Date(time)
    let timeFormat: string = toTimeFormat(time)

    if (hour - originalHour < 4) {
      timeFormat = `${timeFormat} ${getHoursDiff(originalHour, hour)}`
    }

    endingTimesList[i] = {
      timeValue,
      timeFormat
    }
  }
  return endingTimesList
})

const { errorStyling, hasError } = useErrorStyling(props.hasError)
watch(() => props.hasError, (newValue) => {
  hasError.value = newValue
})
</script>

<template>
  <label
    class="flex flex-col w-full capitalize relative gap-1"
    for="end-time"
  >
    <caption class="text-left text-white uppercase">
      End Time
    </caption>
    <select
      v-model="startTime"
      name="end-time"
      :disabled="isDisabled"
      class=" rounded-md p-2 border-[1px] border-solid"
      :class="errorStyling"
      @change="hasError = false"
    >
      <option
        v-for="availableTime in endingTimes"
        :key="availableTime.timeValue"
        :value="availableTime.timeValue"
      >
        {{ availableTime.timeFormat }}
      </option>
    </select>
  </label>
</template>
