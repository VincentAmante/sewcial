<script setup lang="ts">
import type { Event } from '@prisma/client'
import { JSONContent } from '@tiptap/vue-3'
import RichTextEditor from '~/components/FormFields/RichTextEditor.vue'

definePageMeta({
  layout: 'admin'
})
const detailsContent: JSONContent = ref({ type: 'doc', content: [] })

const event: Ref<Event> = ref({
  title: '',
  details: detailsContent.value,
  startTime: new Date(),
  endTime: new Date(),
  thumbnail: ''
})

async function submitForm () {
  event.value.startTime = new Date(event.value.startTime)
  event.value.endTime = new Date(event.value.endTime)

  const res = await fetch('/api/Events/create', {
    method: 'POST',
    body: JSON.stringify(event.value)
  })
}

// Sets it so that the end time starts off hour after the start time
watch(() => event.value.startTime, () => {
  const startHour = new Date(event.value.startTime).getHours()
  event.value.endTime = (new Date(event.value.startTime))
  event.value.endTime.setHours(startHour + 1)
})
</script>

<template>
  <div>
    <NForm>
      {{ event }}
      <NFormItem label="Title">
        <NInput v-model:value="event.title" />
      </NFormItem>

      <NFormItem label="Thumbnail Src">
        <NInput v-model:value="event.thumbnail" />
      </NFormItem>
      {{ event.startTime }}
      <RichTextEditor v-model="event.details" />
      <NSpace>
        <NFormItem label="Start">
          <NDatePicker v-model:value="event.startTime" type="datetime" />
        </NFormItem>
        <NFormItem label="End">
          <NDatePicker v-model:value="event.endTime" type="datetime" />
        </NFormItem>
      </NSpace>
    </NForm>
    <NButton @click="() => submitForm()">
      Submit
    </NButton>
  </div>
</template>
