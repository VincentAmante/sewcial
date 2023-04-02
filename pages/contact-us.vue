<script setup lang="ts">
import { ref } from 'vue'
import SpeechBubble from '@/components/SpeechBubble.vue'
import ContactField from '@/components/FormFields/ContactField.vue'
import ContactTextArea from '@/components/FormFields/ContactTextArea.vue'
import AppButton from '@/components/AppButton.vue'

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
  <main>
    <section>
      <div class="description">
        <SpeechBubble>
          <h1>
            Get in touch with us
          </h1>
        </SpeechBubble>
        <SpeechBubble class="speech-bubble" alignment="right">
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
    <section>
      <form>
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
        <div class="btn-container">
          <AppButton class="button" @click="showContactForm()">
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
        @include flex-col;
        gap: 5em;

        @include media(tablet){
            flex-direction: row;
            justify-content: space-between
        }

        section {
            width: 100%
        }
    }

    .description {
        @include flex-col;
        width: 100%;
        padding-inline: .25em;

        h1, h2 {
            margin-block: 0em;
        }

        h2 {
            text-transform: initial;
        }

        .speech-bubble {
            @include flex-col;
            gap: 1.5em;
            padding-block: 2em;
        }
    }

    form {
        @include flex-col;
        gap: 1em;

        border: 4px dashed $clr-secondary;
        border-radius: 20px;
        padding: 3em;
    }

    .btn-container {
        width: 100%;
        @include flex;
        @include flex-centered;

        .button {
            width: 100%;
        }
    }
</style>
