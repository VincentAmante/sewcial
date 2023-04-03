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
    // case '':
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
  <header :class="formatStyle">
    <HeaderLogo class="logo" :class="formatStyle" :colour="navColour" :header-toggled="headerToggled" />
    <div class="btn-container">
      <ButtonLikedPage class="btn-liked-page" />
      <BurgerButton v-model="headerToggled" class="burger-btn" :colour="navColour" />
    </div>
  </header>

  <Navigation :is-toggled="headerToggled" :colour="navColour" :page="page" />
</template>

<style scoped lang="scss">
// TODO: Fix mobile responsiveness
// TODO: Make this into a singular fixed container, instead of what it is now

header {
    @include flex;
    width: 100%;
    position: static;
    top: 0;
    z-index: 105;
    align-items: center;
    justify-content: flex-end;
    padding-inline: clamp($margin-width-mobile, 5vw, 50px);
    height: clamp(70px, 15vw, 90px);
    border-bottom: 4px dashed $clr-secondary;
    &.home {
        border: none
    }

    .btn-container {
        @include flex;
        align-items: center;
        gap: .5vw;
        z-index: 105;
        position: fixed;
    }
    .btn-liked-page {
        height: 25px;
        @include media(tablet){
            height: 30px;
        }
    }

    &.home { position: fixed; }
    &:not(.shop){
        .btn-liked-page {
            display: none;
        }
    }
}

aside {
    position: fixed;
    top: 0;
    right: 0;
    overflow-x: hidden;
    height: 100%;
    z-index: 95;
}

.logo {
    // TODO: Set it so nav has its own header
    width: 100%;
    left: 0;
    right: 0;
    display: flex;
    justify-content: flex-start;
    padding-inline: clamp($margin-width-mobile, 5vw, 50px);
    position: absolute;

    @include media(tablet) {
        justify-content: center;
    }
}
</style>
