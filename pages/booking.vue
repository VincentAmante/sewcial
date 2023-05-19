<script setup lang = "ts">
import { v4 as uuidv4 } from 'uuid'
import TiltedBubble from '@/components/TiltedBubble.vue'
import StartTimePicker from '@/components/FormFields/StartTimePicker.vue'
import EndTimePicker from '@/components/FormFields/EndTimePicker.vue'
import BookingPeopleCount from '@/components/FormFields/BookingPeopleCount.vue'

useHead({
  title: 'Sewcial | Booking'
})

const bookingDate = ref(new Date())
const startTime = ref(new Date())
const endTime = ref(new Date())
const currentDefaultDate = ref(new Date())
const peopleCount = ref(0)

const anchorDate = ref(new Date())
const chosenDate = ref(anchorDate.value.getTime())
const router = useRouter()

function bookSession () {
  router.push({
    name: 'events-booking_type_id_date',
    params: {
      type: 'session',
      id: uuidv4(),
      date: chosenDate.value
    }
  })
}

function validateBooking () {
  let error = false

  if (bookingDate.value === undefined) {
    error = true
  }
  if (startTime.value === undefined || startTime.value.getTime() === currentDefaultDate.value.getTime()) {
    error = true
  }
  if (endTime.value === undefined || endTime.value.getTime() === currentDefaultDate.value.getTime()) {
    error = true
  }
  if (peopleCount.value === undefined || peopleCount.value <= 0) {
    error = true
  }

  if (!error) {
    bookSession()
  } else {
    console.log('error')
  }
}
</script>

<template>
  <main>
    <section
      class="events-splash flex flex-col items-center justify-center my-12 relative
    tablet:flex-row tablet:gap-20"
    >
      <!-- Left Sticker -->
      <img
        class="splash-sticker-l hidden tablet:block absolute top-0 left-0 transform translate-x-[-30%]"
        src="@/assets/images/Events_Stickers_L.png"
        width="190"
        height="250"
        alt=""
      >

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

      <div class="flex flex-col items-center justify-center bg-secondary p-6 rounded-lg w-full max-w-sm">
        <VDatePicker v-model="bookingDate" class="date-picker w-full" />
        <div class="booking-input my-4 w-full">
          <div class="time-picker flex gap-4 w-full">
            <StartTimePicker v-model="startTime" :date="bookingDate" />
            <EndTimePicker v-model="endTime" :is-disabled="false" :start-time="startTime" />
          </div>
          <BookingPeopleCount v-model="peopleCount" />
        </div>
        <div class="book-now rounded-t-[1px] border-dashed border-primary w-full">
          <p class="text-sm font-bold text-primary mb-0">
            Total Amount (VAT inclusive): 25 AED
          </p>
          <button
            class=" border-none rounded-lg bg-accent-1 text-primary w-full mb-2 p-2"
            @click="() => validateBooking()"
          >
            <h1>BOOK NOW!</h1>
          </button>
        </div>
      </div>
    </section>
  </main>
  <Footer></Footer>
</template>
