<script setup lang="ts">
import ButtonClose from '@/components/icons/ButtonClose.vue'
defineProps({
  redirectTo: {
    type: String,
    default: '/'
  },
  isModalOnly: {
    type: Boolean,
    default: false
  }
})
const { signIn } = useAuth()

defineEmits(['close'])
</script>

<template>
  <div class="flex flex-col items-center bg-secondary rounded-lg p-2 m-4 justify-center min-h-[12rem] gap-4  relative">
    <div class="w-full flex flex-row items-center justify-center px-mobile-w">
      <h1 class="text-h1 text-primary">
        Sign In
      </h1>
      <ButtonClose
        class="absolute right-0 top-0 text-primary pr-4 my-2 text-4xl cursor-pointer"
        @click="$emit('close')"
      />
    </div>
    <button
      class="flex justify-center bg-accent-1 gap-4 py-4 px-2 rounded-md text-primary hover:bg-dark hover:text-accent-1 w-full max-w-xs"
      @click="signIn('github')"
    >
      <div>
        <AppIcon :icon="['fab', 'github']" />
      </div>
      <div>Github</div>
    </button>
  </div>
</template>
