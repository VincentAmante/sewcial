<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import 'v-calendar/style.css'

import { DatePicker } from 'v-calendar'
import SpeechBubble from '@/components/SpeechBubble.vue'
import DescriptionSlider from '@/components/DescriptionSlider.vue'
import AppButton from '@/components/AppButton.vue'
import ContactField from '@/components/FormFields/ContactField.vue'
import StartTimePicker from '@/components/FormFields/StartTimePicker.vue'
import EndTimePicker from '@/components/FormFields/EndTimePicker.vue'
import BookingPeopleCount from '@/components/FormFields/BookingPeopleCount.vue'
import TiltedHeading from '@/components/TiltedHeading.vue'

// This creates an app-wide event to toggle the description slider
function toggleTestSlider () {
  window.dispatchEvent(new Event('toggle-test'))
}

const name = ref('')
const email = ref('')
const message = ref('')
const telNumber = ref('')

// Returns an object with the form values
const object = computed(() => {
  return {
    name: name.value,
    email: email.value,
    telNumber: telNumber.value,
    message: message.value
  }
})

function showContactObject () {
  console.log(object.value)
}

const date = ref(new Date())
const startTime = ref(new Date())
const endTime = ref(new Date())
const peopleCount = ref(0)
</script>
<template>
  <main>
    <section class="banner-wrapper">
      <div class="sticker-container">
        <img class="sticker sticker-1" src="@/assets/images/Sticker_1.png" alt="">
        <img class="sticker sticker-2" src="@/assets/images/Sticker_2.png" alt="">
      </div>
      <div class="banner">
        <SpeechBubble>
          <h2>ICEN</h2>
          <p>This is a banner container</p>
          <p>It contains stickers that are horribly implemented</p>
        </SpeechBubble>
      </div>
    </section>
    <!-- Just test divs, don't mind -->
    <div class="test">
      <AppButton @click="() => toggleTestSlider()">
        Test DescriptionSlider
      </AppButton>

      <!-- <DescriptionSlider name="test" img-src="/images/placeholders/studio.png">
                    <template #title>Test Slider</template>
                    <template #default>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, totam officia. Repellendus consectetur pariatur ex repudiandae dignissimos ducimus, consequuntur laboriosam! Corporis porro sunt ipsa harum nulla quod rerum voluptatum sint.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod et ad illum, vero debitis dignissimos totam minima eligendi eveniet quisquam?</p>
                    </template>
                </DescriptionSlider> -->
      <form class="contact-field" action="">
        <ContactField v-model="name" name="name" is-required>
          Name
        </ContactField>
        <ContactField v-model="email" name="email" is-required>
          Email
        </ContactField>

        <ContactField v-model="telNumber" name="telNumber" is-required type="tel">
          Phone Number
        </ContactField>

        <ContactField v-model="message" name="message" is-required>
          Message
        </ContactField>

        <AppButton @click="() => showContactObject()">
          Send Message
        </AppButton>
        <div>
          <p>
            Output:
          </p>
          <div>
            {{ object }}
          </div>
        </div>
      </form>
      <ClientOnly>
        <div class="booking-sample">
          <DatePicker v-model="date" />
          <div class="value-display">
            <h2>Date Value</h2>
            <h3>
              {{ date }}
            </h3>
          </div>
          <div class="booking-input">
            <ClientOnly>
              <StartTimePicker v-model="startTime" :date="date" />
              <EndTimePicker v-model="endTime" :is-disabled="false" :start-time="startTime" />
              <BookingPeopleCount v-model="peopleCount" />
            </ClientOnly>
          </div>
          <div class="value-display">
            <h2>Start Time</h2>
            <h3>
              {{ startTime }}
            </h3>
          </div>

          <div class="value-display">
            <h2>End Time</h2>
            <h3>
              {{ endTime }}
            </h3>
          </div>

          <div class="value-display">
            <h2>
              People Count
            </h2>
            <h3>
              {{ peopleCount }}
            </h3>
          </div>
        </div>
      </ClientOnly>
    </div>
  </main>
</template>
<style scoped lang="scss">
    main {
        @include flex-col;
        align-items: center;
        justify-content: center;
        gap: 1em;
    }

    .test {
        max-width: 100%;
        @include flex-col;
        @include flex-centered;
    }

    .value-display {
        width: 100%;
        padding-inline: 1em;
        padding-block: .5em;
    }

    .booking-sample {
        @include flex-col;
        align-items: center;
        padding: 3vw;
        border-radius: 10px;
        background-color: $clr-secondary;
        gap: 1em;
        width: 90%;

        h2, h3 {
            margin: .1em;
            color: white;
        }

        .booking-input {
            width: 100%;
            justify-content: stretch;
            gap: 1em;
        }
    }

    .contact-field {
        @include flex-col;
        gap: 1.5em;
        border: 4px dashed $clr-secondary;
        border-radius: 45px;
        margin-block: 1em;
        // width: 100%;
        max-width: 700px;
        padding: 5vw;
    }

    .banner-wrapper {
        position: relative;
        // overflow-x: hidden;
        border-bottom: 6px dashed $clr-secondary;
        width: 100%;
        height: 80svh;
        z-index: -1;
        padding-inline: 1em;
        padding-block: 1em;

        .banner {
            // padding-inline: 5vw;
            padding-inline: clamp(.5em, 15vw, 20em);
            // display: none;
        }

        .sticker-container {
            position: absolute;
            width: 100%;
            height: 100%;

            // Sets stickers to display only past desktop
            .sticker {
                // display: none;
                @include media(desktop){
                    display: block;
                }
            }

            .sticker-1 {
                position: absolute;
                z-index: -5;
                right: 0;
                top: 0;
                transform: translateX(15%) translateY(00%);

                width: 12em;
            }
            .sticker-2 {
                position: absolute;
                z-index: -5;
                top: 0;
                left: 0;
                transform: translateX(-30%) translateY(80%);

                width: 15em;
            }
        }
    }

</style>
