import { setupCalendar, Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'
// import 'v-calendar/lib/v-calendar.min.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(setupCalendar, {})
  nuxtApp.vueApp.component('VCalendar', Calendar)
  nuxtApp.vueApp.component('VDatePicker', DatePicker)
})
