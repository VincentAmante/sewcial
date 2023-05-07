<script setup lang = "ts">
import { Workshop } from '@prisma/client'
// import { DatePicker } from 'v-calendar'
import TiltedBubble from '@/components/TiltedBubble.vue'
import TiltedHeading from '@/components/TiltedHeading.vue'
import EventsCard from '@/components/EventsCard.vue'
import StartTimePicker from '@/components/FormFields/StartTimePicker.vue'
import EndTimePicker from '@/components/FormFields/EndTimePicker.vue'
import BookingPeopleCount from '@/components/FormFields/BookingPeopleCount.vue'

const bookingDate = ref(new Date())
const startTime = ref(new Date())
const endTime = ref(new Date())
const peopleCount = ref(0)

const anchorDate = ref(new Date())
const chosenDate = ref(anchorDate.value.getTime())
const weekSelection = computed(() => {
  const week = []
  const firstDay = anchorDate.value.getDate() - anchorDate.value.getDay() + 1

  for (let i = 0; i < 7; i++) {
    const next = new Date(anchorDate.value)
    next.setDate(firstDay + i)
    week.push({
      value: next.getTime(),
      date: next.getDate(),
      day: next.toLocaleDateString('en-US', { weekday: 'short' }),
      month: next.toLocaleDateString('en-US', { month: 'long' })
    })
  }
  return week
})

const workshops = ref<Workshop[]>([])
const { data: workshopData, pending: workshopPending, error: workshopError, refresh: refreshWorkshops } = useFetch('/api/Workshops', {
  onResponse ({ response }) {
    const data = response._data as Workshop[]
    workshops.value = data.map((workshop) => {
      workshop.startTime = new Date(workshop.startTime)
      workshop.endTime = new Date(workshop.endTime)
      return workshop
    })
  }
})
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
function bookEvent () {
  router.push({
    path: '/booking',
    query: {
      type: 'event',
      id: 'a',
      date: chosenDate.value
    }
  })
}
function bookWorkshop () {
  router.push({
    name: 'events-booking_type_id_date',
    params: {
      type: 'event',
      id: 'a',
      date: chosenDate.value
    }
  })
}
function bookSession () {
  router.push({
    name: 'events-booking_type_id',
    params: {
      type: 'session',
      id: 'a',
      date: chosenDate.value
    }
  })
}
</script>

<template>
  <main>
    <div>{{ workshopsOfDay }}</div>
    <section
      class="events-splash flex flex-col items-center justify-center my-12
    tablet:flex-row tablet:gap-8"
    >
      <!-- Left Sticker -->
      <img class="splash-sticker-l hidden" src="@/assets/images/Events_Stickers_L.png" width="190" height="250" alt="">

      <div class="splash-heading flex flex-col text-secondary mb-12">
        <p class="text-h-giant relative">
          Sew...
        </p>
        <TiltedBubble>
          booking
        </TiltedBubble>
        <p class="text-h-giant relative">
          a session?
        </p>
      </div>

      <!-- Right Sticker -->
      <div class="splash-sticker-container hidden">
        <img
          class="splash-sticker-r"
          src="@/assets/images/Events_Stickers_R.png"
          width="150"
          height="175"
          alt=""
        >
      </div>

      <div class="flex flex-col items-center justify-center bg-secondary p-6 rounded-lg">
        <VDatePicker v-model="bookingDate" class="date-picker" />

        <div class="booking-input my-4">
          <div class="time-picker flex gap-4">
            <StartTimePicker v-model="startTime" :date="bookingDate" />
            <EndTimePicker v-model="endTime" :is-disabled="false" :start-time="startTime" />
          </div>
          <BookingPeopleCount v-model="peopleCount" />
        </div>
        <div class="book-now rounded-t-[1px] border-dashed border-primary w-full">
          <p class="text-sm font-bold text-primary mb-0">
            Total Amount (VAT inclusive): 25 AED
          </p>
          <button class=" border-none rounded-lg bg-accent-1 text-primary w-full mb-2 p-4">
            <h>BOOK NOW!</h>
          </button>
        </div>
      </div>
    </section>

    <section class="upcoming-events bg-accent-1">
      <!-- Page Heading -->
      <div class="flex align-center justify-center py-8">
        <div class="page-heading">
          <TiltedHeading
            text-color="accent-1"
            class="tilted-heading bg-secondary text-accent-1"
          >
            upcoming
          </TiltedHeading>
          <h1 class="text-h-big-boy main-heading capitalize text-primary relative">
            Sewcial Events
          </h1>
        </div>
      </div>

      <!-- Cards -->
      <div class="card-container">
        <div class="grid-container mx-4 tablet:mx-auto">
          <div
            class="card-grid grid w-full content-center
        tablet:grid-cols-3 tablet:justify-center"
          >
            <EventsCard
              :image="'src/assets/images/OpenMic.png'"
            >
              <template #event-name>
                OPEN MIC
              </template>
              <template #date>
                Saturday, Your Mom
              </template>
            </EventsCard>
            <EventsCard :image="'src/assets/images/BoardGamesNight.png'">
              <template #event-name>
                ITEM NAME
              </template>
              <template #date>
                OWNER
              </template>
            </EventsCard>
            <EventsCard :image="'src/assets/images/CommunitySale.png'">
              <template #event-name>
                ITEM NAME
              </template>
              <template #date>
                OWNER
              </template>
            </EventsCard>
          </div>
        </div>
      </div>
    </section>

    <section class="workshops flex flex-col items-center justify-center relative overflow-x-hidden py-2 pb-20 overflow-y-hidden">
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
            &lt;
          </div>
          <div class="flex w-full justify-around">
            <div
              v-for="day in weekSelection"
              :key="day.value"
              class="flex flex-col items-center p-1 rounded-md cursor-pointer transition-all
              hover:transform hover:scale-110"
              @click="() => chooseDate(day.value)"
            >
              <h3 class="m-0 font-bold uppercase">
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
            &gt;
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

              <div>
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
                    @click="() => bookWorkshop()"
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
</template>
