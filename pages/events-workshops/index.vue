<script setup lang = "ts">
import type { Workshop, Event } from '@prisma/client'
// import { DatePicker } from 'v-calendar'
import { v4 as uuidv4 } from 'uuid'
import TiltedHeading from '@/components/TiltedHeading.vue'
import EventsCard from '@/components/EventsCard.vue'

useHead({
  title: 'Sewcial | Events & Workshops'
})

const bookingDate = ref(new Date())
const startTime = ref(new Date())
const endTime = ref(new Date())
const currentDefaultDate = ref(new Date())
const peopleCount = ref(0)

const anchorDate = ref(new Date())
const chosenDate = ref(anchorDate.value.getTime())
const { width: windowWidth } = useWindowSize()
const weekSelection = computed(() => {
  const week = []
  const firstDay = anchorDate.value.getDate() - anchorDate.value.getDay() + 1

  for (let i = 0; i < 7; i++) {
    const next = new Date(anchorDate.value)
    next.setDate(firstDay + i)
    week.push({
      value: next.getTime(),
      date: next.getDate(),
      day: (windowWidth.value > 640)
        ? next.toLocaleDateString('en-US', { weekday: 'short' })
        : (next.toLocaleDateString('en-US', { weekday: 'short' }).at(0)),
      month: next.toLocaleDateString('en-US', { month: 'long' })
    })
  }
  return week
})

const workshops = ref<Workshop[]>([])
const { refresh: refreshWorkshops } = useFetch('/api/Workshops', {
  onResponse ({ response }) {
    const data = response._data as Workshop[]
    workshops.value = data.map((workshop) => {
      workshop.startTime = new Date(workshop.startTime)
      workshop.endTime = new Date(workshop.endTime)
      return workshop
    })
  }
})

const events = ref<Event[]>([])
const { data: eventsData, pending: eventsPending, error: eventsError, refresh: refreshEvents } = useFetch('/api/Events', {
  onResponse ({ response }) {
    const data = response._data as Event[]
    events.value = data.map((event) => {
      event.startTime = new Date(event.startTime)
      event.endTime = new Date(event.endTime)
      return event
    })
  }
})
refreshEvents()
refreshWorkshops()

const workshopsOfDay = computed(() => {
  return workshops.value.filter((workshop) => {
    const workshopDate = new Date(workshop.startTime)
    const dayDate = new Date(chosenDate.value).getDate()
    const dayMonth = new Date(chosenDate.value).getMonth()
    const dayYear = new Date(chosenDate.value).getFullYear()

    if (workshopDate.getDate() === dayDate &&
      workshopDate.getMonth() === dayMonth &&
      workshopDate.getFullYear() === dayYear) {
      return true
    } else {
      return false
    }
    // return workshopDate.getDate() === new Date(chosenDate.value).getDate()
  })
})
function chooseDate (date: number) {
  chosenDate.value = date
}
function changeWeek (direction: number) {
  anchorDate.value = new Date(anchorDate.value.setDate(
    anchorDate.value.getDate() + (direction * 7))
  )
  chosenDate.value = anchorDate.value.getTime()
}
function diffHours (dateOlder: Date, dateEarlier: Date) {
  let diff = (dateOlder.getTime() - dateEarlier.getTime()) / 1000
  diff /= (60 * 60)
  return Math.abs(Math.round(diff))
}

const router = useRouter()

function bookEvent (id: string) {
  router.push({
    name: 'events-workshops-booking_type_id_date',
    params: {
      type: 'event',
      id,
      date: chosenDate.value
    }
  })
}

function bookWorkshop (id: string) {
  router.push({
    name: 'events-workshops-booking_type_id_date',
    params: {
      type: 'workshop',
      id,
      date: chosenDate.value
    }
  })
}
function bookSession () {
  router.push({
    name: 'events-workshops-booking_type_id_date',
    params: {
      type: 'session',
      id: uuidv4(),
      date: chosenDate.value
    }
  })
}
</script>

<template>
  <main>
    <section class="upcoming-events bg-accent-1 py-4 desktop:p-16">
      <!-- Page Heading -->
      <div class="flex align-center justify-center py-4 pb-16">
        <div class="page-heading">
          <TiltedHeading
            big
            text-color="primary"
            class="tilted-heading bg-secondary desktop:bg-accent-2 text-accent-1 transform translate-y-6"
          >
            upcoming
          </TiltedHeading>
          <h1 class="text-h-big-boy main-heading capitalize text-primary relative">
            Sewcial Events
          </h1>
        </div>
      </div>

      <!-- Cards -->
      <div
        v-if="!eventsPending && !eventsError && eventsData"
        class="flex flex-col desktop:flex-row overflow-x-scroll no-scrollbar"
      >
        <template
          v-for="event in events"
          :key="event.id"
        >
          <EventsCard
            v-if="event.startTime > new Date()"
            :image="event.thumbnail"
            @click="() => router.push(`/events-workshops/event-${event.id}`)"
            @clicked-rsvp="() => bookEvent(event.id)"
          >
            <template #event-name>
              {{ event.title }}
            </template>
            <template #date>
              {{ event.startTime.toLocaleDateString(undefined, {weekday: 'long'}) }},
              {{ event.startTime.getDate() }}
              {{ event.startTime.toLocaleDateString(undefined, {month: 'long'}) }}
            </template>
            <template #default>
              {{ event.description }}
            </template>
          </EventsCard>
        </template>
      </div>
    </section>

    <section class="workshops flex flex-col items-center justify-center relative overflow-x-hidden py-2 pb-20 overflow-y-hidden min-h-[40rem]">
      <div class="absolute hidden top-0 w-full desktop:block">
        <img class="none desktop:flex absolute left-0 top-0 w-fit transform translate-x-[-50%] max-w-xs" src="@/assets/images/Sticker_5.png">
        <img class="none desktop:flex absolute right-0 w-fit transform translate-x-[50%] translate-y-[90%] max-w-xs" src="@/assets/images/Sticker_6.png">
      </div>
      <div class="w-full flex flex-col px-default-w py-8">
        <!-- Navigation for Day -->

        <div class="mb-8">
          <h1 class="text-h-big-boy text-center text-secondary my-8 capitalize">
            Workshops
          </h1>
          <p class="text-h1 text-center text-secondary my-8">
            <span>
              {{ weekSelection[0].date }} {{ weekSelection[0].month }}
            </span>
            -
            <span>
              {{ weekSelection[6].date }} {{ weekSelection[6].month }}
            </span>
          </p>
        </div>
        <div class="flex flex-row items-center justify-around gap-6">
          <div
            class="flex flex-col items-center p-1 rounded-md cursor-pointer transition-all
              hover:transform hover:scale-110"
            @click="() => changeWeek(-1)"
          >
            <AppIcon :icon="['fas', 'chevron-left']" />
          </div>
          <div class="flex w-full justify-around">
            <div
              v-for="day in weekSelection"
              :key="day.value"
              class="flex flex-col items-center p-1 rounded-md cursor-pointer transition-all
              hover:transform hover:scale-110"
              @click="() => chooseDate(day.value)"
            >
              <h3 class="m-0 font-bold uppercase text-lg mobile:text-base">
                {{ day.day }}
              </h3>
              <p
                class="m-0 px-2 rounded-md"
                :class="(day.value === chosenDate) ? ['bg-secondary', 'text-primary'] : ''"
              >
                {{ day.date }}
              </p>
            </div>
          </div>
          <div
            class="flex flex-col items-center p-1 rounded-md cursor-pointer transition-all
              hover:transform hover:scale-110"
            @click="() => changeWeek(1)"
          >
            <AppIcon :icon="['fas', 'chevron-right']" />
          </div>
        </div>
        <!-- List of workshops -->
        <div>
          <template v-if="workshopsOfDay.length > 0">
            <!-- Insert Loop Here -->
            <div
              v-for="workshop in workshopsOfDay"
              :key="workshop.id"
              class="flex flex-col justify-between gap-x-4 p-4 my-4 text-left text-dark border-b-accent-1 border-b-4 border-dashed
              desktop:flex-row desktop:items-center"
            >
              <div class="flex desktop:flex-col justify-between items-start desktop:justify-center">
                <h1 class="font-bold my-1">
                  {{ workshop.startTime.toLocaleTimeString([], {hourCycle: 'h23',hour: '2-digit', minute: '2-digit'}) }}
                </h1>
                <p class="my-1 text-lg">
                  {{ diffHours(workshop.endTime, workshop.startTime) }} HRS
                </p>
              </div>

              <div
                class="cursor-pointer"
                @click="() => router.push(`/events-workshops/workshop-${workshop.id}`)"
              >
                <h1 class="my-1">
                  {{ workshop.title }}
                </h1>
                <p class="my-1 text-lg">
                  {{ workshop.priceAED }} AED
                </p>
              </div>

              <div>
                <p class="my-0 text-lg">
                  {{ workshop.totalSlots - workshop.bookedSlots }} Spots Available
                </p>
              </div>
              <div>
                <button class="bg-accent-1 text-primary rounded-md p-2 w-full px-4">
                  <h1
                    class="m-0"
                    @click="() => bookWorkshop(workshop.id)"
                  >
                    BOOK NOW
                  </h1>
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</template>
