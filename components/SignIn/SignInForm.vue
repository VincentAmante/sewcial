<script setup lang="ts">

const props = defineProps({
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
  <div class="flex flex-col items-center bg-secondary rounded-lg p-2 m-4 jus">
    <div class="w-full flex flex-row items-center justify-center relative">
      <h1 class="text-h1 text-primary">
        Sign In
      </h1>
      <p
        class="absolute right-0 text-primary text-2xl pr-4"
        @click="$emit('close')"
      >
        X
      </p>
    </div>
    <button
      class="flex justify-between bg-accent-1 gap-4 py-4 px-2 rounded-md text-primary hover:bg-dark hover:text-accent-1"
      @click="signIn('github')"
    >
      <div>G</div>
      <div>Github</div>
    </button>
  </div>
</template>
