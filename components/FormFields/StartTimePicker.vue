<script setup lang="ts">
    // TODO: Consider abstracting shared states with EndTimePicker
    import { computed, watch } from 'vue';

    const props = defineProps({
      date: {
        type: Date,
        required: true
      },
      modelValue: {
        type: Date,
        required: true
      }
    })

    function toTimeFormat(time: number){
      return new Intl.DateTimeFormat('en-GB', 
      { 
        timeStyle: 'short', 
        timeZone: 'Asia/Dubai',
        hourCycle: 'h12'
      }).format(time);
    }
    const emit = defineEmits(['update:modelValue'])
    const startTime = computed({
        get(){
            return props.modelValue
        },
        set(value){
            emit('update:modelValue', value)
        }
    })
    // TODO: refactor somehow
    const openingHours = {
      start: 6,
      end: 19
    }

    const startingTimes = computed(() => {
      const { start, end } = openingHours;
      const currentDate = props.date;
      const availableTimesList = Array.from({ length: end - start }, (_, i) => {
        const time = new Date(currentDate).setHours(start + i, 0, 0);
        const timeValue = new Date(time);
        const timeFormat = toTimeFormat(time);
        return { timeValue, timeFormat };
      });
      return availableTimesList;
});
</script>

<template>
    <label for="start-time">
        <caption>
          Start Time
        </caption>
        <select name="start-time" id="booking-start-time" v-model="startTime">
          <option class="option" v-for="availableTime in startingTimes" :value="availableTime.timeValue">
            {{ availableTime.timeFormat }}
          </option>
        </select>
    </label>
</template>

<style scoped lang="scss">
  label {
    @include flex-col;
    // align-items: flex-start;
    width: 100%;
    text-transform: capitalize;
    position: relative;
    gap: .25em;

    caption {
      text-align: left;
      color: white;
      text-transform: uppercase;
    }

    select {
      outline: grey;
      border-radius: 5px;
      padding: .5em;
      // padding-block: 1em;
      border: 1px solid grey;
    }
  }
</style>