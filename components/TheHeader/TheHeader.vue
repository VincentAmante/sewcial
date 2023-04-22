<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import ButtonLikedPage from '../icons/ButtonLikedPage.vue'

import BurgerButton from './BurgerButton.vue'
import Navigation from './Navigation.vue'
import HeaderLogo from '@/components/TheHeader/HeaderLogo.vue'

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
      return 'home'
    case 'about':
    case 'shop':
      return 'shop'
    default:
      return 'base'
  }
})
</script>
<template>
  <header
    :class="formatStyle"
    class="flex items-center justify-end w-full border-b-4 border-dashed border-secondary static top-0 z-[105]"
  >
    <TheHeaderLogo
      :class="formatStyle"
      :colour="navColour"
      :header-toggled="headerToggled"
      class="logo w-full left-0 right-0 flex justify-start absolute tablet:justify-center"
    />
    <div class="flex items-center gap-2 z-[105] fixed">
      <ButtonLikedPage class="btn-liked-page h-6 tablet:h-[30px]" />
      <BurgerButton v-model="headerToggled" class="burger-btn" :colour="navColour" />
    </div>
  </header>

  <Navigation :is-toggled="headerToggled" :colour="navColour" :page="page" />
</template>

<style scoped lang="scss">

header {
    padding-inline: clamp($margin-width-mobile, 5vw, 50px);
    height: clamp(70px, 15vw, 90px);
    &.home {
        border: none
    }
    &.home { position: fixed; }
    &:not(.shop){
        .btn-liked-page {
            display: none;
        }
    }
}

.logo {
    padding-inline: clamp($margin-width-mobile, 5vw, 50px);
}
</style>
