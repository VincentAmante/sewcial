<script setup lang="ts">
import { z } from 'zod'
import ContactField from '@/components/FormFields/ContactField.vue'
import ContactTextArea from '@/components/FormFields/ContactTextArea.vue'

const name = ref('')
const email = ref('')
const mobileNumber = ref('')
const message = ref('')

function validateThenParse (input: string, validator: z.ZodType<any>) {
  const parsed = validator.safeParse(input)
  if (parsed.success) {
    return {
      status: 'success',
      result: parsed.data
    }
  } else {
    return {
      status: 'error',
      result: parsed.error
    }
  }
}

async function submitContactForm () {
  const nameInput = validateThenParse(name.value, z.string().min(0))
  const emailInput = validateThenParse(email.value, z.string().email())
  const mobileNumberInput = validateThenParse(mobileNumber.value, z.string().min(0))
  const messageInput = validateThenParse(message.value, z.string().min(0))

  if (nameInput.status === 'error' ||
  emailInput.status === 'error' ||
  mobileNumberInput.status === 'error' ||
  messageInput.status === 'error') {
  } else {
    await useFetch('/api/ContactSubmissions/create', {
      method: 'POST',
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        mobile: mobileNumber.value,
        message: message.value
      })
    })
  }
}
</script>

<template>
  <main class="flex flex-col py-default-h gap-[5vmax] mx-default-w tablet:flex-row tablet:justify-between">
    <section class="w-full flex flex-col px-[3vw]">
      <div class="flex flex-col w-full px-0">
        <SpeechBubble class="flex flex-col py-4">
          <h1 class="p-0 text-h1">
            Get in touch with us
          </h1>
        </SpeechBubble>
        <SpeechBubble
          class="flex flex-col gap-4 py-8"
          alignment="right"
        >
          <div>
            <h1 class="my-0">
              Location
            </h1>
            <h2 class="my-0 font-normal">
              Dubai Marina, Dubai, UAE
            </h2>
          </div>
          <div>
            <h1 class="my-0">
              Phone Number
            </h1>
            <h2 class="my-0 font-normal">
              +971 00 000 000
            </h2>
          </div>
          <div>
            <h1 class="my-0">
              Email
            </h1>
            <h2 class="my-0 font-normal">
              sewcial@gmail.com
            </h2>
          </div>
        </SpeechBubble>
      </div>
    </section>
    <section class="w-full max-w-2xl">
      <form
        class="flex flex-col gap-4 border-4 border-dashed border-secondary rounded-3xl p-12"
        @submit.prevent="() => submitContactForm()"
      >
        <ContactField v-model="name" name="name">
          Name
        </ContactField>
        <ContactField v-model="email" name="email" type="email">
          Email
        </ContactField>
        <ContactField v-model="mobileNumber" name="number" type="tel">
          Number
        </ContactField>
        <ContactTextArea v-model="message" name="message">
          Message
        </ContactTextArea>
        <div class="flex justify-center items-center w-full">
          <AppButton class="w-full">
            Send Message
          </AppButton>
        </div>
      </form>
    </section>
  </main>
</template>

<!-- <style scoped lang="scss">
    main {
        padding: $margin-width;

        h1, h2 {
          margin-block: 0;
        }
        h2 {
          font-weight: 400;
          text-transform: none;
        }
    }
</style> -->
