<script setup lang="ts">
import { z } from 'zod'
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

const email = ref('')
function signInWithEmail () {
  emailHasError.value = false

  const emailParser = z.string().email()

  const result = emailParser.safeParse(email.value)
  if (result.success) {
    const data = result.data

    signIn('email', {
      email: data
    })
  } else {
    emailHasError.value = true
  }
}

const emailHasError = ref(false)

const emailErrorStyling = computed(() => {
  return emailHasError.value
    ? {
        container: 'border-accent-2',
        input: 'text-accent-2',
        placeholder: 'placeholder:text-accent-2'
      }
    : {
        container: 'border-primary',
        input: 'text-primary',
        placeholder: 'placeholder:text-primary'
      }
})
</script>

<template>
  <div class="flex flex-col items-center bg-secondary rounded-lg p-2 m-4 justify-center gap-4  relative w-full py-4 pb-8">
    <div class="w-full flex flex-row items-center justify-center">
      <h1 class="text-h1 text-primary">
        Sign In
      </h1>
      <ButtonClose
        class="absolute right-0 top-0 text-primary pr-4 my-2 text-4xl cursor-pointer"
        @click="$emit('close')"
      />
    </div>
    <div class="w-full flex items-center justify-center pb-2">
      <button
        class="flex justify-center bg-accent-1 gap-4 py-4 px-2 rounded-md text-primary hover:bg-dark hover:text-accent-1 w-full max-w-xs"
        @click="signIn('github')"
      >
        <div>
          <AppIcon :icon="['fab', 'github']" />
        </div>
        <div>Log in with Github</div>
      </button>
    </div>
    <div class="w-full flex flex-col items-center justify-center max-w-xs gap-2 mt-3">
      <label
        for="email"
        class="flex items-center border-b-2 w-full"
        :class="emailErrorStyling.container"
      >
        <AppIcon
          :icon="['fas', 'at']"
          :class="emailErrorStyling.input"
        />
        <input
          v-model="email"
          required
          type="email"
          name="email"
          placeholder="e.g. john.smith@email.com"
          class="bg-transparent border-0 placeholder:opacity-75 focus:ring-0 w-full ring-0 outline-none px-2"
          :class="emailErrorStyling.placeholder"
        >
      </label>
      <button
        class="flex justify-center bg-accent-1 gap-4 py-4 px-2 rounded-md text-primary hover:bg-dark hover:text-accent-1 w-full max-w-xs"
        @click="() => signInWithEmail()"
      >
        <div>
          <AppIcon :icon="['fas', 'envelope']" />
        </div>
        <div>Log in with Email</div>
      </button>
    </div>
  </div>
</template>
