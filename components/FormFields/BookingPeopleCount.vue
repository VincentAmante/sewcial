<script setup lang="ts">
    import { computed } from '@vue/reactivity';

    const props =  defineProps({
        modelValue: {
            type: Number,
            required: true
        }
    })
    const emit = defineEmits(['update:modelValue'])
    const bookingPeople = computed({
        get(){
            return props.modelValue
        },
        set(value){
            emit('update:modelValue', value)
        }
    })
</script>

<template>
    <label for="booking-people">
        <caption>
          How many people?
        </caption>
        <input type="number" v-model="bookingPeople" min="0">
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

    input[type='number'] {
      outline: grey;
      border-radius: 5px;
      padding: .5em;
      // padding-block: 1em;
      border: 1px solid grey;
    }
  }
</style>