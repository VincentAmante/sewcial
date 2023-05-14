<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import ButtonLikedPage from '../icons/ButtonLikedPage.vue'

import BurgerButton from './BurgerButton.vue'
import Navigation from './Navigation.vue'

const props = defineProps({
  format: {
    type: String,
    default: 'base'
  }
})

const headerToggled = ref(false)
// Resets headerI
const route = useRoute()
const page = ref(route.path)

// Defines what colour to use based on page
// TODO: Improve efficiency
const setColour = (page: String) => {
  page = page.substring(1)
  // Decides colours for the header
  switch (page) {
    case 'home':
    case '':
      return 'primary'
    case 'test':
    case 'about':
    case 'test-icen':
    case 'test-kie':
    case 'test-nehan':
    case 'templates':
      return 'secondary'
    default:
      return 'secondary'
  }
}
const navColour = ref(setColour(page.value))
watch(route, (newPath) => {
  headerToggled.value = false
  page.value = newPath.path
  navColour.value = setColour(page.value)
})

// Sets as to whether the like-button appears
const formatStyle = computed(() => {
  switch (props.format) {
    case 'home':
    case '':
      return {
        header: ['z-[135]', 'fixed', 'border-none', 'pointer-events-none'],
        logo: ['tablet:justify-start']
      }
    case 'about':
    case 'shop':
      return {
        header: ['z-[135]'],
        logo: ['tablet:justify-start']
      }
    default:
      return {
        header: ['z-[135]'],
        logo: ['tablet:justify-start']
      }
  }
})

const emit = defineEmits(['clickedLikedBtn'])
</script>
<template>
  <header
    :class="formatStyle.header"
    class="flex items-center justify-end w-full border-b-4 border-dashed border-secondary static top-0 px-mobile-w"
  >
    <TheHeaderLogo
      :class="formatStyle.logo"
      :colour="navColour"
      :header-toggled="headerToggled"
      class="logo w-full left-0 right-0 flex justify-start absolute"
    />
    <div class="flex items-center gap-2 z-[150] fixed">
      <ButtonLikedPage
        class="btn-liked-page h-6 tablet:h-[30px]"
        :class="(format === 'shop') ? 'block' : 'hidden'"
        @click="$emit('clickedLikedBtn')"
      />
      <BurgerButton
        v-model="headerToggled"
        class="burger-btn z-[150]"
        :colour="navColour"
      />
    </div>
  </header>

  <Navigation
    :is-toggled="headerToggled"
    :colour="navColour"
    :page="page"
  />
</template>

<style scoped lang="scss">

header {
    padding-inline: clamp($margin-width-mobile, 5vw, 50px);
    height: clamp(70px, 15vw, 90px);
    }
.logo {
    padding-inline: clamp($margin-width-mobile, 5vw, 50px);
}
</style>
