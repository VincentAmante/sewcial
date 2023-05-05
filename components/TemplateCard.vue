<script setup lang="ts">
// Import download button
import DownloadButton from '@/components/DownloadButton.vue'

// Variables passed to this component are props
const props = defineProps({
  image: {
    type: String,
    required: true
  }
})
</script>

<!-- Card -->
<template>
  <div
    class="cards m-2 cursor-pointer group min-w-[20rem]"
  >
    <div class="card flex flex-col bg-primary rounded-2xl w-full h-full">
      <div class="aspect-[1.1/1] overflow-hidden h-80">
        <div
          class="card-image bg-cover bg-center bg-no-repeat rounded-t-2xl align-middle brightness-100 h-full
       transition-all group-hover:scale-105 group-hover:brightness-[80%]"
          :style="{ backgroundImage: `url(${image})` }"
        />
      </div>
      <div class="card-info flex flex-col p-4 justify-start grow items">
        <h1 class="my-2">
          <slot name="item-name" />
        </h1>
        <h3 class="my-2 capitalize">
          <slot name="owner" />
        </h3>
        <p class=" text-justify grow">
          <slot name="description" />
        </p>
        <div class="flex justify-center">
          <DownloadButton />
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Scoped Styling -->
<!-- <style scoped lang="scss">
.cards {
    margin: 10px;

    .card {
      flex-direction: column;
      color: $clr-text;
      background-color: $clr-primary;
      width: 180px; // change this depending on the thign
      height: 300px;
      border-radius: 15px;

      @include media(desktop) {
        width: 260px;
        height: 370px;
      }

      &:hover {
        cursor: pointer;
        box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);

        .card-image {
          filter: brightness(80%);

        }
      }
    }

    // Content
    .card-info {
      flex-direction: column;
      padding: 1rem;
      justify-content: center;

      h1, h3 {
        margin: 0;
      }
    }

    // Images
    .card-image{
      aspect-ratio: 1.1 / 1;
      overflow: hidden;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 15px 15px 0px 0px;
      width: 100%;
      vertical-align: middle;
      filter: brightness(100%);

    }
  }
</style> -->
