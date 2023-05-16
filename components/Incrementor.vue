<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    default: 'Event Missing'
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
  <div class="main flex gap-5 items-center justify-center">
    <button
      class="px-6 py-2 bg-accent-1 text-primary rounded-md cursor-pointer"
      @click="decrement"
    >
      -
    </button>
    <div class="counter flex bg-primary w-[60px] h-[50px] justify-center items-center rounded-md">
      <h3 class="text-secondary">
        <slot name="count">
          {{ count }}
        </slot>
      </h3>
    </div>
    <button
      class="px-6 py-2 bg-accent-1 text-primary rounded-md cursor-pointer"
      @click="increment"
    >
      +
    </button>
  </div>
</template>
