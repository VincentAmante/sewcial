<script setup lang="ts">
import type { Event } from '@prisma/client'
import { generateHTML, JSONContent } from '@tiptap/vue-3'
import { StarterKit } from '@tiptap/starter-kit'

const title = ref('Sewcial |')
useHead({
  title
})

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
    title.value = `Sewcial | ${data.title}`
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
    name: 'events-workshops-booking_type_id_date',
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
    class="flex flex-col items-center py-8 bg-secondary w-full min-h-screen"
  >
    <section class="flex flex-col items-center tablet:flex-row tablet:justify-between tablet:gap-x-16 tablet:items-stretch max-w-[90%] px-default-w my-10">
      <div class="flex flex-col gap-4 uppercase text-primary w-full tablet:basis-1/3 tablet:gap-8">
        <div class="text-primary text-base">
          <span @click="() => router.push('/events-workshops')">Events</span>
          &gt;
          <span>{{ event?.title }}</span>
        </div>
        <div>
          <div class="flex flex-col tablet:flex-col-reverse gap-4">
            <img
              :src="event?.thumbnail"
              alt="event image"
              class="rounded-2xl outline-primary outline-dashed outline-2 max-w-xs tablet:max-w-sm bg-contain"
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
      <div class="flex flex-col text-primary w-full h-full tablet:basis-2/3 mt-12">
        <div
          v-if="!pending
            && !error
            && event.details"
          class=" break-words"
          v-html="content"
        />
      </div>
    </section>
  </main>
  <Footer />
</template>
