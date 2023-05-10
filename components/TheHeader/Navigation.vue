<script setup lang="ts">
import { computed } from 'vue'

// imports other vue components
import AppButton from '../AppButton.vue'
import ButtonTwitter from '../icons/ButtonTwitter.vue'
import ButtonFacebook from '../icons/ButtonFacebook.vue'
import ButtonInstagram from '../icons/ButtonInstagram.vue'
import HeaderLogo from './HeaderLogo.vue'
import DevSelect from './DevSelect.vue'

// Defines props in TypeScript
/**
     *  Note that when using in the <script> tag, the components are tagged 'props.propName'
     */
const props = defineProps({
  isToggled: {
    type: Boolean,
    required: true,
    default: false
  },
  colour: {
    type: String,
    required: true,
    default: 'primary'
  },
  page: {
    type: String,
    required: true
  }
})

// Computed property, should theoretically react if any element inside changes
const navStyle = computed(() => {
  return (props.isToggled) ? ['transform-none'] : ''
})

// Provies alt colours based on the main colour
const navColour = computed(() => {
  switch (props.colour) {
    case 'primary':
      return {
        alt: 'secondary',
        bg: 'bg-primary',
        text: 'text-primary',
        bgAlt: 'bg-secondary',
        textAlt: 'text-secondary'
      }
    case 'secondary':
      return {
        alt: 'primary',
        bg: 'bg-secondary',
        text: 'text-secondary',
        bgAlt: 'bg-primary',
        textAlt: 'text-primary'

      }
    case 'accent-1':
      return {
        alt: 'accent-2',
        bg: 'bg-accent-1',
        text: 'text-accent-1',
        bgAlt: 'bg-accent-2',
        textAlt: 'text-accent-2'
      }
    case 'accent-2':
      return {
        alt: 'accent-1',
        bg: 'bg-accent-2',
        text: 'text-accent-2',
        bgAlt: 'bg-accent-1',
        textAlt: 'text-accent-1'
      }
    default:
      return {
        bg: 'bg-primary',
        text: 'text-primary',
        bgAlt: 'bg-secondary',
        textAlt: 'text-secondary'
      }
  }
})
const secondaryColour = computed(() => {
  return (props.colour === 'primary') ? 'secondary' : 'primary'
})
</script>

<template>
  <nav
    class="flex flex-col justify-around pb-10 fixed gap-1 top-0 right-0 w-screen h-full transition-all transform translate-x-full z-[105] max-w-lg"
    :class="[navStyle, colour, navColour.bg]"
  >
    <div
      class="flex items-center justify-start absolute top-0 px-mobile-w
    tablet:px-12 h-[70px] tablet:h-[90px]"
    >
      <HeaderLogo class="logo" :colour="secondaryColour" />
    </div>
    <ul class="flex flex-col uppercase px-12 mt-20">
      <li
        id="nav-home"
        class="flex items-center justify-center relative opacity-50 hover:opacity-90 transition-all"
        :class="[navColour.textAlt]"
      >
        <a
          class="text-2xl font-bold no-underline my-4
         mobile:w-full mobile:text-left"
          href="/"
        >
          Map
        </a>
        <font-awesome-icon
          :icon="['fas', 'chevron-right']"
          class="right hidden invisible h-5
        mobile:visible mobile:block mobile:absolute mobile:right-0"
        />
      </li>
      <li
        id="nav-about"
        class="flex items-center justify-center relative opacity-50 hover:opacity-90 transition-all"
        :class="[navColour.textAlt]"
      >
        <a
          class="text-2xl font-bold no-underline my-3
         mobile:w-full mobile:text-left"
          href="/about-us"
        >
          About Us
        </a>
        <font-awesome-icon
          :icon="['fas', 'chevron-right']"
          class="right hidden invisible h-5
        mobile:visible mobile:block mobile:absolute mobile:right-0"
        />
      </li>
      <li
        id="nav-discover"
        class="flex items-center justify-center relative opacity-50 hover:opacity-90 transition-all"
        :class="[navColour.textAlt]"
      >
        <a
          class="text-2xl font-bold no-underline my-3
         mobile:w-full mobile:text-left"
          href="/shop"
        >
          Discover
        </a>
        <font-awesome-icon
          :icon="['fas', 'chevron-right']"
          class="right hidden invisible h-5
        mobile:visible mobile:block mobile:absolute mobile:right-0"
        />
      </li>
      <li
        id="nav-contact-us"
        class="flex items-center justify-center relative opacity-50 hover:opacity-90 transition-all"
        :class="[navColour.textAlt]"
      >
        <a
          class="text-2xl font-bold no-underline my-3
         mobile:w-full mobile:text-left"
          href="/contact-us"
        >
          Contact Us
        </a>
        <font-awesome-icon
          :icon="['fas', 'chevron-right']"
          class="right hidden invisible h-5
        mobile:visible mobile:block mobile:absolute mobile:right-0"
        />
      </li>
      <li
        id="nav-donate"
        class="flex items-center justify-center relative opacity-50 hover:opacity-90 transition-all"
        :class="[navColour.textAlt]"
      >
        <a
          class="text-2xl font-bold no-underline my-3
         mobile:w-full mobile:text-left"
          href="/donate"
        >
          Donate
        </a>
        <font-awesome-icon
          :icon="['fas', 'chevron-right']"
          class="right hidden invisible h-5
        mobile:visible mobile:block mobile:absolute mobile:right-0"
        />
      </li>
      <li
        id="nav-templates"
        class="flex items-center justify-center relative opacity-50 hover:opacity-90 transition-all"
        :class="[navColour.textAlt]"
      >
        <a
          class="text-2xl font-bold no-underline my-3
         mobile:w-full mobile:text-left"
          href="/templates"
        >
          Templates
        </a>
        <font-awesome-icon
          :icon="['fas', 'chevron-right']"
          class="right hidden invisible h-5
        mobile:visible mobile:block mobile:absolute mobile:right-0"
        />
      </li>
    </ul>

    <div class="other flex flex-col items-center px-mobile-w justify-center gap-2">
      <!-- <DevSelect class="dev-select bg-white" /> -->
      <AppButton
        class="w-full"
        :class="[navColour.text]"
        :bg-colour="navColour.alt"
        :text-colour="colour"
      >
        Book
      </AppButton>
      <div class="social-media-btns text-accent-1 flex justify-between w-full mobile:justify-around">
        <ButtonTwitter />
        <ButtonFacebook />
        <ButtonInstagram />
      </div>
    </div>
  </nav>
</template>
