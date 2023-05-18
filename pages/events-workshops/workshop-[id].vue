<script setup lang="ts">
import type { Event } from '@prisma/client'
import { generateHTML, JSONContent } from '@tiptap/vue-3'
import { StarterKit } from '@tiptap/starter-kit'

// Route Params
const route = useRoute()
const id = ref(route.params.id)
if (
  id.value === undefined) {
  showError('Invalid params')
}
const content: Ref<any> = ref({
  type: 'doc',
  content: []
})

const event: Ref<Event | null> = ref(null)
const { data, pending, error, refresh } = useFetch(`/api/Events/${id.value}`, {
  onResponse ({ response }) {
    const data = response._data as Event
    event.value = data
    if (data.details !== null) {
      content.value = generateHTML(data.details as JSONContent, [StarterKit])
    }
  }
})
refresh()

// onMounted(() => {
//   content.value = generateHTML(event.value?.details as JSONContent, [StarterKit])
// })
const router = useRouter()
function bookEvent (id: string) {
  if (event.value?.startTime === undefined) {
    showError('Invalid event')
  }
  if (event.value === null) {
    showError('Invalid event data')
    return
  }

  router.push({
    name: 'events-booking_type_id_date',
    params: {
      type: 'event',
      id,
      date: new Date(event.value.startTime).getTime()
    }
  })
}
</script>

<template>
  <main
    class="flex flex-col items-center gap-2 py-8 px-default-w bg-secondary w-full
  tablet:flex-row tablet:justify-around tablet:gap-10 tablet:items-stretch"
  >
    <div class="flex flex-col gap-8 uppercase text-primary w-full">
      <div class="text-primary text-base">
        <span @click="() => router.push('/events-workshops')">Events</span>
        &gt;
        <span>Luggate Tag</span>
      </div>
      <div>
        <div class="flex flex-col tablet:flex-col-reverse gap-4">
          <img
            :src="event?.thumbnail"
            alt="event image"
            class="rounded-2xl outline-primary outline-dashed outline-2 max-w-sm bg-contain"
          >

          <div class="flex flex-col gap-1">
            <h1 class="my-0">
              {{ event?.title }}
            </h1>
            <h2 class="my-0">
              March 18 (Saturday)
            </h2>
            <h3 class="my-0">
              10:00 am - 11:00 am
            </h3>
          </div>
        </div>
      </div>
      <div class="flex w-full items-center justify-center tablet:items-start tablet:justify-start">
        <SpeechBubble>
          <p
            class="text-alt uppercase my-4 mx-8 font-bold"
            @click="() => bookEvent(event.id)"
          >
            Book Now!
          </p>
        </SpeechBubble>
      </div>
    </div>
    <div class="flex flex-col text-primary w-full h-full">
      <div
        v-if="!pending
          && !error
          && event.details"
        class=" break-words"
        v-html="content"
      />
    </div>
  </main>
</template>
