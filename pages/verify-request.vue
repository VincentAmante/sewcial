<script setup lang="ts">
if (useAuth().status.value === 'authenticated') {
  useRouter().push('/catalogue')
}

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/catalogue'
  }
})

useHead({
  title: 'Sewcial | Sign in'
})
</script>

<template>
  <main class="bg-secondary overflow-hidden flex flex-col items-center min-h-screen px-default-w">
    <div class=" flex flex-col items-center my-20 gap-8 bg-primary text-accent-1 w-full rounded-lg p-8 ">
      <h1 class="text-4xl">
        Verify Request
      </h1>
      <div class="w-full flex flex-col items-center justify-center max-w-xs gap-2 mt-3 text-center">
        <h2 class="font-normal">
          Email sent!
        </h2>
        <h2 class="font-normal">
          Please check your email to be able to log in
        </h2>
      </div>
    </div>
  </main>
</template>
