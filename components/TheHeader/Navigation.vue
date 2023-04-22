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
  return (props.isToggled) ? 'toggled' : ''
})

const secondaryColour = computed(() => {
  return (props.colour === 'primary') ? 'secondary' : 'primary'
})
</script>

<template>
  <nav :class="[navStyle, colour]">
    <div class="logo-container">
      <HeaderLogo class="logo" :colour="secondaryColour" />
    </div>
    <ul class="routes uppercase">
      <li id="nav-home">
        <a href="/">
          Map
        </a>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="right" />
      </li>
      <li id="nav-about">
        <a href="/about-us">
          About Us
        </a>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="right" />
      </li>
      <li id="nav-discover">
        <a href="/test/icen">
          Discover (Test Icen)
        </a>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="right" />
      </li>
      <li id="nav-contact-us">
        <a href="/contact-us">
          Contact Us
        </a>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="right" />
      </li>
      <li id="nav-donate">
        <a href="/donate">
          Donate
        </a>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="right" />
      </li>
      <li id="nav-templates">
        <a href="/templates">
          Templates
        </a>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="right" />
      </li>
    </ul>

    <div class="other">
      <DevSelect class="dev-select" />
      <AppButton class="btn">
        Book
      </AppButton>
      <div class="social-media-btns">
        <ButtonTwitter />
        <ButtonFacebook />
        <ButtonInstagram />
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
    nav {
        @include flex-col;
        @include conditional-bg;
        @include conditional-text-alt('a');
        @include conditional-text-alt('.right');
        @include conditional-text('.btn');
        @include conditional-bg-alt('.btn');

        position: fixed;
        padding-top: clamp(50px, 6vh, 200px);
        gap: 5px;
        z-index: 100;
        top: 0;
        right: 0;
        width: 100vw;
        height: 100%;
        transition: all ease-out .25s;
        transform: translateX(100%);

        justify-content: center;

        &.toggled {
            transform: translateX(0);
        }
        pointer-events: initial;

        @include media(mobile){
            width: clamp(350px, 70vw, 450px);
        }
    }

    .routes {
        @include flex-col;
        list-style: none;
        padding-inline: 50px;
        // gap: clamp(5px, 5.5vh, 44px);

        li {
            display: flex;
            // justify-content: center;
            align-items: center;
            justify-content: center;
            position: relative;
            opacity: .5;
            transition: all ease-out .15s;

            &:hover {
                opacity: .9;
            }

            .right {
                display: none;
                visibility: hidden;
                height: 1.25em;
            }
            a {
                @extend .text-h2;
                text-decoration: none;
                text-align: center;
            }

            @include media(mobile) {
                justify-content: space-between;
                .right {
                    display: initial;
                    visibility: visible;
                    position: absolute;
                    right: 0;
                }

                a {
                    width: 100%;
                    text-align: left;
                }
            }
        }
    }

    .other {
        @include flex-col;
        align-items: center;
        justify-content: center;
        padding-inline: clamp(50px, 7.5vmax, 95px);
        gap: clamp(5px, 2svh, 2.5em);
        .btn {
            width: 100%;
        }

        .social-media-btns {
            @include flex;
            justify-content: space-between;
            width: 100%;

            & > * {
                color: $clr-accent-1;
            }
        }
    }

    li:has(.router-link-active) {
        opacity: 1;
    }

    .logo-container {
        @include flex;
        align-items: center;
        justify-content: flex-start;
        position: absolute;
        top: 0;
        padding-inline: clamp($margin-width-mobile, 5vw, 50px);
        height: clamp(70px, 15vw, 90px);
    }
</style>
