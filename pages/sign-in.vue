<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true
  }
})
const { signIn } = useAuth()

</script>

<template>
  <main class="bg-secondary overflow-hidden flex flex-col items-center min-h-screen">
    <div class="w-full flex flex-col items-center py-20 text-primary gap-8">
      <h1 class="text-4xl">
        Sign In
      </h1>
      <button
        class="flex justify-center text-3xl bg-accent-1 gap-4 py-4 px-2 rounded-md text-primary hover:bg-dark hover:text-accent-1 w-full max-w-xs"
        @click="signIn('github')"
      >
        <div>
          <AppIcon :icon="['fab', 'github']" />
        </div>
        <div>Github</div>
      </button>
    </div>
  </main>
</template>
