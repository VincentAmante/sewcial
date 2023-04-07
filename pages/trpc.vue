<script setup lang="ts">
import ContactField from '@/components/FormFields/ContactField.vue'
const { $client } = useNuxtApp()

const hello = await $client.hello.useQuery({ text: 'client' })

const firstName = ref('')

async function sayHello () {
  await $client.hello.useQuery({ text: firstName.value }).then((res) => {
    result.value = res.data.value?.greeting || 'ERROR'
  })
}

const result = ref('result will go here')
</script>

<template>
  <div class="px-8 my-6 mx-desktop-w flex flex-col gap-4">
    <div>
      <!-- As `superjson` is already pre-configured, we can use `time` as a `Date` object without further deserialization 🎉 -->
      tRPC Data: "{{ hello.data.value?.greeting }}" send at "{{ hello.data.value?.time.toLocaleDateString('en-EN') }}".
    </div>

    <div class="p-4 my-3 text-secondary border-dashed border-secondary border-[4px] rounded-3xl">
      <h2>Write your name here and it will say hello</h2>
      <ContactField
        v-model="firstName"
        name="firstName"
        is-required
      >
        First Name
      </ContactField>

      <AppButton @click="sayHello">
        Say Hi
      </AppButton>
    </div>

    <div>
      <h1>Message</h1>
      <div class="p-4 rounded-md border-solid border-black border-2">
        {{ result }}
      </div>
    </div>
  </div>
</template>
