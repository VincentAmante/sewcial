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
    name: 'events-workshops-booking_type_id_date',
    params: {
      type: 'session',
      id: uuidv4(),
      date: chosenDate.value
    }
  })
}

const errors = ref({
  bookingDate: false,
  startTime: false,
  endTime: false,
  peopleCount: false
})
const formHasFalse = computed(() => {
  return Object.values(errors.value).includes(true)
})
function resetFormValidation () {
  errors.value = {
    bookingDate: false,
    startTime: false,
    endTime: false,
    peopleCount: false
  }
}

function validateBooking () {
  resetFormValidation()

  if (bookingDate.value === undefined) {
    errors.value.bookingDate = true
  }
  if (startTime.value === undefined || startTime.value.getTime() === currentDefaultDate.value.getTime()) {
    errors.value.startTime = true
  }
  if (endTime.value === undefined || endTime.value.getTime() === currentDefaultDate.value.getTime()) {
    errors.value.endTime = true
  }
  if (peopleCount.value === undefined || peopleCount.value <= 0) {
    errors.value.peopleCount = true
  }

  if (!formHasFalse.value) {
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
      <img
        class="hidden absolute left-0 top-0 desktop:block lgScreen:w-[8%] xlScreen:[3%]"
        src="@/assets/images/bookingsticker1.png"
      >
      <img
        class="hidden absolute right-0 top-0 desktop:block lgScreen:w-[7.5%] xlScreen:[3%]"
        src="@/assets/images/bookingsticker2.png"
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
      <div class="flex flex-col items-center justify-center bg-secondary p-6 rounded-lg w-full max-w-sm">
        <VDatePicker
          v-model="bookingDate"
          class="date-picker w-full bg-red-200"
        />
        <div class="booking-input my-4 w-full">
          <div class="time-picker flex gap-4 w-full">
            <StartTimePicker
              v-model="startTime"
              :date="bookingDate"
              :has-error="errors.startTime"
            />
            <EndTimePicker
              v-model="endTime"
              :is-disabled="false"
              :start-time="startTime"
              :has-error="errors.endTime"
            />
          </div>
          <BookingPeopleCount
            v-model="peopleCount"
            :has-error="errors.peopleCount"
          />
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
  <Footer />
</template>
