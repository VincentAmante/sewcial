<script setup lang="ts">
import 'v-calendar/style.css'
import { DatePicker } from 'v-calendar'
import RichTextEditor from '~~/components/FormFields/RichTextEditor.vue'
import CatalogueFilter from '~~/components/Filters/CatalogueFilter.vue'
import DropDown from '~/components/FormFields/DropDown.vue'
import CheckBox from '~/components/FormFields/CheckBox.vue'

const { data, pending, refresh } = useFetch('/api/CatalogueItems')

// This creates an app-wide event to toggle the description slider
function toggleTestSlider (name: string) {
  window.dispatchEvent(new Event(`toggle-${name}`))
}

function sampleError () {
  showError({
    statusCode: 500,
    message: 'This is a sample error'
  })
}

async function createCategoryTag () {
  const { result } = await useFetch('/api/CatalogueCategoryTag/create', {
    method: 'POST',
    body: JSON.stringify({
      name: 'test'
    })
  })
}

const options = [
  {
    label: 'Option 1',
    value: 'option1'
  },
  {
    label: 'Option 2',
    value: 'option2'
  },
  {
    label: 'Option 3',
    value: 'option3'
  }
]
const selectedOption = ref('Select Option')

const sampleCheckBoxVal = ref(false)

const { data: catalogue } = useFetch('/api/CatalogueItems')

function logData () {
  console.log('catalogue', data.value)
}
</script>
<template>
  <main class="flex flex-col items-center justify-center gap-4">
    <AppButton @click="() => logData()">
      Log Data
    </AppButton>
    <div class="max-w-full flex flex-col items-center justify-center">
      <AppButton @click="() => toggleTestSlider('cafe')">
        Sewcial Cafe
      </AppButton>
      <AppButton @click="() => toggleTestSlider('studio')">
        Sewcial Studio
      </AppButton>
      <AppButton @click="() => toggleTestSlider('workshop')">
        Sewcial Workshop
      </AppButton>
      <AppButton @click="() => toggleTestSlider('lounge')">
        Sewcial Lounge
      </AppButton>

      <AppButton @click="() => sampleError()">
        Throw error
      </AppButton>

      <AppButton @click="() => createCategoryTag()">
        Make CategoryTag
      </AppButton>

      <DescriptionSlider name="cafe" img-src="/images/placeholders/studio.png">
        <template #title>
          Sewcial Cafe
        </template>
        <template #default>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, totam officia. Repellendus consectetur pariatur ex repudiandae dignissimos ducimus, consequuntur laboriosam! Corporis porro sunt ipsa harum nulla quod rerum voluptatum sint.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod et ad illum, vero debitis dignissimos totam minima eligendi eveniet quisquam?</p>
        </template>
      </DescriptionSlider>

      <DescriptionSlider name="studio" img-src="/images/placeholders/studio.png">
        <template #title>
          Sewcial Studio
        </template>
        <template #default>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, totam officia. Repellendus consectetur pariatur ex repudiandae dignissimos ducimus, consequuntur laboriosam! Corporis porro sunt ipsa harum nulla quod rerum voluptatum sint.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod et ad illum, vero debitis dignissimos totam minima eligendi eveniet quisquam?</p>
          <div class="flex flex-col">
            <SpeechBubble
              class="flex justify-between items-center cursor-pointer"
              @click="() => useRouter().push('/templates')"
            >
              <p class="text-alt uppercase">
                Try our templates
              </p>
              <img src="/images/door.png" alt="">
            </SpeechBubble>
            <SpeechBubble
              alignment="right"
              class="flex flex-row-reverse justify-between items-center cursor-pointer"
              @click="() => useRouter().push('/donate')"
            >
              <p class="text-alt uppercase">
                Donate Here
              </p>
              <img src="/images/door-alt.png" alt="">
            </SpeechBubble>
          </div>
        </template>
      </DescriptionSlider>

      <DescriptionSlider name="workshop" img-src="/images/placeholders/studio.png">
        <template #title>
          Sewcial Showcase
        </template>
        <template #default>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, totam officia. Repellendus consectetur pariatur ex repudiandae dignissimos ducimus, consequuntur laboriosam! Corporis porro sunt ipsa harum nulla quod rerum voluptatum sint.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod et ad illum, vero debitis dignissimos totam minima eligendi eveniet quisquam?</p>
          <div class="flex flex-col">
            <SpeechBubble
              class="flex justify-between items-center cursor-pointer"
              @click="() => useRouter().push('/shop/catalogue')"
            >
              <p class="text-alt uppercase">
                See our Catalogue
              </p>
              <img src="/images/door.png" alt="">
            </SpeechBubble>
          </div>
        </template>
      </DescriptionSlider>

      <DescriptionSlider name="lounge" img-src="/images/placeholders/studio.png">
        <template #title>
          Sewcial Lounge
        </template>
        <template #default>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, totam officia. Repellendus consectetur pariatur ex repudiandae dignissimos ducimus, consequuntur laboriosam! Corporis porro sunt ipsa harum nulla quod rerum voluptatum sint.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod et ad illum, vero debitis dignissimos totam minima eligendi eveniet quisquam?</p>
        </template>
      </DescriptionSlider>

      <CheckBox v-model="sampleCheckBoxVal" label="Sample" />
      <DropDown v-model="selectedOption" :options="options" />
      {{ selectedOption }}
      <ClientOnly>
        <div class="border-black border-solid border-2 mb-20">
          <CatalogueFilter :catalogue="catalogue" />
        </div>
        <!-- <div class="booking-sample flex flex-col items-center p-[3vw] rounded-xl bg-secondary gap-4 w-[90%]">
          <DatePicker v-model="date" />
          <div class="w-full px-4 py-2">
            <h2 class="m-1 text-white">Date Value</h2>
            <h3 class="m-1 text-white">
              {{ date }}
            </h3>
          </div>
          <div class="booking-input w-full content-stretch gap-4">
            <ClientOnly>
              <StartTimePicker v-model="startTime" :date="date" />
              <EndTimePicker v-model="endTime" :is-disabled="false" :start-time="startTime" />
              <BookingPeopleCount v-model="peopleCount" />
            </ClientOnly>
          </div>
          <div class="w-full px-4 py-2">
            <h2 class="m-1 text-white">Start Time</h2>
            <h3 class="m-1 text-white">
              {{ startTime }}
            </h3>
          </div>

          <div class="w-full px-4 py-2">
            <h2 class="m-1 text-white">End Time</h2>
            <h3 class="m-1 text-white">
              {{ endTime }}
            </h3>
          </div>

          <div class="w-full px-4 py-2">
            <h2 class="m-1 text-white">
              People Count
            </h2>
            <h3 class="m-1 text-white">
              {{ peopleCount }}
            </h3>
          </div>
        </div> -->
      </ClientOnly>
    </div>
  </main>
</template>
