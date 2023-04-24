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
  <label :for="name" class="error">
    <p><slot>MISSING LABEL</slot></p>
    <input
      id=""
      v-model.lazy="textInput"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :required="isRequired"
    >
  </label>
</template>

<style scoped lang="scss">
    label {
        @include flex-col;
        gap: 0;
        color: $clr-secondary;
        width: 100%;

        p {
            margin: 0;
            padding-bottom: .25em;

            span {
                padding-left: .1em;
            }
        }

        input {
            border-radius: 10px;
            border: 3px solid $clr-secondary;
            background: none;
            padding-block: .5em;
            padding-inline: .25em;

            &:focus {
                outline: none;
                // border: 4px solid $clr-secondary;
            }
        }
    }
</style>
