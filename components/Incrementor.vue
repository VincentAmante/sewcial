<script setup lang="ts">

import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  text: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])
const count = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

// function increments count
function increment () {
  count.value++
}
// function decrements count
function decrement () {
  if (count.value > 0) {
    count.value--
  }
}
</script>

<template>
  <div class="main">
    <button @click="decrement">
      -
    </button>
    <div class="counter">
      <h3>
        <slot name="count">
          {{ count }}
        </slot>
      </h3>
    </div>
    <button @click="increment">
      +
    </button>
  </div>
</template>

<style scoped lang="scss">
.main{
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
}
button {
  padding: 10px 25px;
    font-size: 25px;
    background-color: $clr-accent-1;
    color: $clr-primary;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
h3{
  //  padding: 10px 25px;
    font-size: 25px;
    // background-color: white;
    color: $clr-secondary;
    border: none;
    // border-radius: 5px;
}
.counter{
  display: flex;
  background-color: white;
  width: 60px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
</style>
