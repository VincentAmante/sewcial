<script setup lang="ts">
import type { Template } from '@prisma/client'
import SpeechBubble from '@/components/SpeechBubble.vue'
import ButtonDownload from '@/components/icons/ButtonDownload.vue'
import ButtonFullscreen from '@/components/icons/ButtonFullscreen.vue'
import { Skill } from '~/enums/Skill'

const route = useRoute()
if (route.params.id === undefined) {
  showError('No ID provided')
}

const templatePlaceholder: Template = {
  id: 'NULL ID',
  name: 'loading name..',
  description: 'loading description..',
  priceAED: 0,
  thumbnail: '',
  templateImage: '',
  categoryTagId: 'Loading category..',
  isFeatured: false,
  skill: Skill.beginner,
  materialsRequired: ['..'],
  equipment: ['..'],
  assembly: ['..'],
  authorFirstName: '..',
  authorLastName: '..',
  details: {},
  createdAt: new Date()
}
const template: Ref<Template> = ref(templatePlaceholder)

const { data, pending, error, refresh } = useFetch(`/api/Templates/${route.params.id}`, {
  onResponse ({ response }) {
    const data = response._data as Template
    template.value = data
  }
})
refresh()

</script>

<template>
  <main>
    <!-- Selected Template Info Section -->
    <div class="main">
      <!--Stickers-->
      <div class="sticker-container">
        <img class="sticker sticker-2" src="@/assets/images/Sticker_3.png" alt="">
        <img class="sticker sticker-1" src="@/assets/images/Sticker_4.png" alt="">
      </div>
      <div class="breadcrumbs">
        <p>TEMPLATES</p>
        <p> {{ template.name }}</p>
      </div>
      <div class="template-selected">
        <img :src="template.thumbnail" alt="template-1">
        <div class="template-info">
          <h1>{{ template.name }}</h1>
          <p>{{ template.description }}</p>

          <SpeechBubble class="speech-bubble">
            <a>DOWNLOAD AS PDF</a>
          </SpeechBubble>
          <SpeechBubble alignment="right" class="speech-bubble">
            <a>VIEW TEMPLATE ONLINE</a>
          </SpeechBubble>
        </div>
      </div>
    </div>

    <!-- Template Image Section -->
    <section class="template">
      <h1>{{ template.name }}</h1>
      <img :src="template.templateImage">
      <div class="buttons">
        <ButtonDownload class="btn" />
        <ButtonFullscreen class="btn" />
      </div>
    </section>

    <!-- Instructions Section -->
    <section class="instructions">
      <div class="requirements">
        <div class="materials">
          <h1>MATERIALS NEEDED</h1>
          <ul>
            <li v-for="(material, index) in template.materialsRequired" :key="index">
              {{ material }}
            </li>
          </ul>
        </div>
        <div class="equipment">
          <h1>EQUIPMENTS</h1>
          <ul>
            <li
              v-for="(equipment, index) in template.equipment"
              :key="index"
            >
              {{ equipment }}
            </li>
          </ul>
        </div>
      </div>
      <div class="assembly">
        <h1>ASSEMBLY</h1>
        <ul>
          <li
            v-for="(step, index) in template.assembly"
            :key="index"
          >
            {{ step }}
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.sticker-container {
    position: absolute;
    width: 100%;

    // Sets stickers to display only past desktop
    .sticker {
        display: none;
        @include media(desktop){
            display: block;
        }
    }

    .sticker-1 {
        position: absolute;
        z-index: -5;
        right: 0;
        top: 0;
        transform: translateX(30%) translateY(5%);

        width: 22em;
    }
    .sticker-2 {
        position: absolute;
        z-index: -5;
        top: 0;
        left: 0;
        transform: translateX(-75%) translateY(10%);

        width: 20em;
    }
}

.instructions{
    background-color: $clr-secondary;
    color: $clr-primary;
    outline: 4px dashed $clr-secondary;
    @extend .main;
    display: flex;
    flex-direction: column;
    gap: 2em;
    li{
        line-height: 1.5em;
    }
    .assembly li{
        margin-bottom: 0.7em;
        list-style-type: decimal;
    }
    .requirements{
      display: flex;
      flex-direction: column;
      gap: 2em;

      li{
          list-style-type: disc;
      }
    }
    .assembly ul, .requirements ul, .equipments ul{
      padding: 0 1em 0 1em;
    }
    @include media(desktop) {
        flex-direction: row-reverse;
        justify-content: space-around;
        .assembly{
            width: 50%;
        }
    }
}
.main{
    padding: 2em;
    position: relative;
    overflow: hidden;
    .template-selected{
      display: flex;
      flex-direction: column;
      align-items: center;
      img{
          width: 100%;
          border-radius: 15px;
          outline: 4px dashed $clr-secondary;
          :hover{
              cursor: pointer;
          }
          @include media(desktop) {
          width: 30%;
          }
      }

      .template-info{
          color: $clr-secondary;
          margin-top: 20px;
          p{
              margin-bottom: 3em;
          }
          @include media(desktop) {
              width: 40%;
          }
      }
      @include media(desktop) {
          flex-direction: row;
          justify-content: space-evenly;
          margin-top: 0;
      }
    }
    .speech-bubble{
        margin: 10px;
        font-weight: 500;
        padding-block: 20px;
        :hover{
            cursor: pointer;
        }
    }
    @include media(desktop) {
        padding: 5em;
    }
}
.template{
  @extend .main;
    background-color: white;
    color: $clr-secondary;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 100%;
      @include media(desktop) {
      width: 70%;
      }
    }
  .btn{
    margin: 10px;
  }
  .buttons{
    display: flex;
    justify-content: center;
  }
}

.breadcrumbs{
    display: flex;
    align-items: center;
    gap: 0.5em;
    color: $clr-secondary;
    padding-bottom: 2em;
}
</style>
