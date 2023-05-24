
// eslint-disable-next-line import/named
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import {
  faInstagram,
  faSpotify,
  faFacebook,
  faGithub
} from '@fortawesome/free-brands-svg-icons'

import {
  faXmark,
  faChevronRight,
  faChevronLeft,
  faCircle as fasCircle,
  faSpinner,
  faRightFromBracket,
  faChevronDown,
  faPlus,
  faMinus,
  faHeart,
  faAt,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'

import {
  faCircle as farCircle,
  faCircleDot,
  faHeart as farHeart
} from '@fortawesome/free-regular-svg-icons'

const icons = [
  faInstagram,
  faSpotify,
  faFacebook,
  faXmark,
  faChevronRight,
  faChevronLeft,
  fasCircle,
  farCircle,
  faCircleDot,
  faSpinner,
  faRightFromBracket,
  faChevronDown,
  faPlus,
  faMinus,
  faGithub,
  faHeart,
  farHeart,
  faAt,
  faEnvelope
]
library.add(...icons)

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
