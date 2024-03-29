
<script setup lang="ts">
defineProps({
  error: Object
})
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <main class="p-4 flex flex-col items-center justify-center bg-secondary min-h-screen">
    <div class="p-2 px-4 text-white rounded-md bg-accent-1 text-center max-w-lg w-full">
      <h1 class="text-primary text-4xl">
        Error!
      </h1>
      <div class="p-4 py-6 pb-10 rounded-md bg-cyan-950 text-left text-neutral-300 flex flex-col gap-4">
        <code>
          <span class="text-lime-400">statusCode:</span> {{ error?.statusCode }}
        </code>
        <code>
          <span class="text-lime-400">url:</span> {{ error?.url }}
        </code>
        <code>
          <span class="text-lime-400">message:</span> {{ error?.message }}
        </code>
      </div>
      <AppButton
        class="outline-none border-none hover:bg-cyan-950 hover:text-neutral-300"
        @click="() => handleError()"
      >
        Return to Home
      </AppButton>
    </div>
  </main>
</template>
