<script setup lang="ts">
const name = ref('')
const email = ref('')
const mobileNumber = ref('')
const message = ref('')

function showContactForm () {
  console.log({
    name: name.value,
    email: email.value,
    mobileNumber: mobileNumber.value,
    message: message.value
  })
}
</script>

<template>
  <main class="flex flex-col gap-20 tablet:flex-row tablet:justify-between">
    <section class="w-full">
      <div class="description flex flex-col w-full px-1">
        <SpeechBubble class="flex flex-col gap-6 py-24">
          <h1>
            Get in touch with us
          </h1>
        </SpeechBubble>
        <SpeechBubble
          class="flex flex-col gap-6 py-24"
          alignment="right"
        >
          <div>
            <h1>Location</h1>
            <h2>Dubai Marina, Dubai, UAE</h2>
          </div>
          <div>
            <h1>Phone Number</h1>
            <h2>+971 00 000 000</h2>
          </div>
          <div>
            <h1>Email</h1>
            <h2>sewcial@gmail.com</h2>
          </div>
        </SpeechBubble>
      </div>
    </section>
    <section class="w-full">
      <form class="flex flex-col gap-4 border-4 border-dashed border-secondary rounded-3xl p-12">
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
          <AppButton class="w-full" @click="showContactForm()">
            Send Message
          </AppButton>
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped lang="scss">

    main {
        padding: $margin-width;
    }
</style>
