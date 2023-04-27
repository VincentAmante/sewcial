<script setup lang="ts">
import { Template, Skill } from '@prisma/client'
import { JSONContent, generateHTML } from '@tiptap/vue-3'
import { StarterKit } from '@tiptap/starter-kit'
import SpeechBubble from '@/components/SpeechBubble.vue'
import ButtonDownload from '@/components/icons/ButtonDownload.vue'
import ButtonFullscreen from '@/components/icons/ButtonFullscreen.vue'

const route = useRoute()
if (route.params.id === undefined) {
  showError('No ID provided')
}

const templatePlaceholder: Template = {
  id: 'NULL ID',
  name: 'loading name..',
  description: 'loading description..',
  priceAED: 0,
  categoryTagId: 'Loading category..',
  isFeatured: false,
  skill: Skill.beginner,
  details: {
    type: 'doc',
    content: [
      { }
    ]
  },
  authorFirstName: '..',
  authorLastName: '..'
}
const template: Ref<Template> = ref(templatePlaceholder)

const { data: item } = useFetch(`/api/Templates/${route.params.id}`)
const detailsHtml = ref('')

onMounted(async () => {
  try {
    await item.value
    template.value = (item.value as Template)
    detailsHtml.value = generateHTML(template.value.details as JSONContent, [StarterKit])
  } catch {
    showError({
      statusCode: 404,
      message: 'Template not found'
    })
  }
})
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
        <p> > {{ template.name }}</p>
      </div>
      <div class="template-selected">
        <img src="https://i.pinimg.com/564x/9c/82/9e/9c829e04b5ccbee04f5fa689dcdd984b.jpg" alt="template-1">
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
      <h1>LONG SLEEVE BLAZER DRESS TEMPLATE</h1>
      <img src="https://i.pinimg.com/originals/03/14/5e/03145e4cc2f8a95f3bbe0028be946d91.jpg">
      <div class="buttons">
        <ButtonDownload class="btn" />
        <ButtonFullscreen class="btn" />
      </div>
    </section>

    <!-- Instructions Section -->
    <section class="instructions">
      <div v-html="detailsHtml" />
      <!-- <div class="requirements">
        <div class="materials" >
          <h1>MATERIALS NEEDED</h1>
          <ul>
            <li>Fabric scraps or fat quarters</li>
            <li>Medium-weight fusible interfacing (Pellon 931TD)</li>
            <li>Clear vinyl (2 gauge)</li>
            <li>Extra wide double fold bias tape (1/2″)</li>
            <li>Coordinating thread</li>
          </ul>
        </div>
        <div class="equipment">
          <h1>EQUIPMENTS</h1>
          <ul>
            <li>Sewing machine</li>
            <li>Sewing shears</li>
            <li>Iron</li>
            <li>Point turning tool</li>
            <li>Measuring tape</li>
          </ul>
        </div>
      </div>
      <div class="assembly">
        <h1>ASSEMBLY</h1>
        <ul>
          <li>Cut the parts according to the template.</li>
          <li>Place the body pieces face down on your ironing board. Center the body interfacing pieces onto the wrong side of the body pieces. </li>
          <li>Carefully flip over the pieces, making sure the interfacing remains in place, so that the right side of the body piece is facing up. </li>
          <li>Press on the fabric to fuse the interfacing pieces to the fabric, using a dry iron for 10-15 seconds.</li>
          <li>Center the vinyl piece over the pocket window on the back side of the piece. Use sewing clips (or hair clips) to secure the vinyl in place. On the front side of the piece, top stitch 1/8″ around the outside edge of the window to finish the window edge and secure the vinyl to the piece.</li>
          <li>Place the front body piece facing up on your work surface. Align the pocket piece on the front body piece, so that the wrong side of the pocket piece is facing the right side of the body piece and the lower corners of each piece are precisely aligned. Pin. Baste 1/8″ around the outer edge of the pocket to secure it to the body piece. Remove pins.</li>
          <li>Center the strap piece along the top edge of the right side of the front body piece, so that the ends of the strap overlap the edge of the front body piece by about 1/2″. Pin. Baste 1/8″ from the edge of the front body piece to anchor the strap into place. Remove pins.</li>
        </ul>
      </div> -->
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
