<script setup lang="ts">
import { computed } from 'vue'
import { useVModel, useToggle } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  },
  colour: {
    type: String,
    required: true,
    default: 'primary'
  }
})

// Allows a child component to send an update to the parent via emits aka events
const emit = defineEmits(['update:modelValue'])
const isToggled = useVModel(props, 'modelValue', emit)
const toggleBurger = useToggle(isToggled)
// watches for changes in {isToggled}'s value, makes changes accordingly
const burgerToggled = computed(() => {
  return (isToggled.value) ? 'toggled' : 'not-toggled'
})
</script>

<template>
  <label for="burgerToggle" class="burger-label">
    <input id="" v-model="isToggled" type="checkbox" name="burgerToggle">
    <div class="burger" :class="[colour, burgerToggled]" @click="toggleBurger()">
      <div v-for="i in 3" :class="colour" />
    </div>
  </label>
</template>

<style scoped lang="scss">
    .burger-label {
        // position: absolute;
        // top: clamp(10px, 7.5vh, 64px);
        // right: clamp($margin-width-mobile, 5vw, 50px);
        input {
            // position: absolute;
            display: none;
        }
    }

    .burger {
        @include flex-col;
        justify-content: space-between;
        height: 20px;
        aspect-ratio: 1;
        cursor: pointer;
        pointer-events: visible;

        div {
            width: 30px;
            height: 16%;
            border-radius: 5px;
            transition: all ease-in .15s;

            @include conditional-bg;
        }

        @include media(tablet){
            height: 25px;

            div {
                width: 35px;
            }
        }
        &.toggled {
            div {
                @include conditional-bg-alt;
            }

            div:nth-child(1){
                transform: scaleX(1) translateX(0px) translateY(0.5px) rotate(45deg);
                @include media(tablet) {
                    transform: scaleX(1) translateX(0px) translateY(4.5px) rotate(45deg);
                }
            }
            div:nth-child(2){
                opacity: 0;
            }
            div:nth-child(3){
                transform: scaleX(1) translateX(0px) translateY(-16px) rotate(-45deg);
                @include media(tablet) {
                    transform: scaleX(1) translateX(0px) translateY(-16px) rotate(-45deg);
                }
            }
        }
    }
</style>
