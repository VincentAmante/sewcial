<script setup lang="ts">
import { UseImage } from '@vueuse/components'
import ButtonDownload from '@/components/icons/ButtonDownload.vue'

// Variables passed to this component are props
defineProps({
  image: {
    type: String,
    required: true
  }
})
</script>

<!-- Browse Image Card Templates -->
<template>
  <div class="info-Slide-up relative w-full text-primary overflow-hidden rounded-lg cursor-pointer group">
    <!-- Image -->
    <UseImage
      class="w-full h-full group-hover:brightness-75"
      :src="image"
    >
      <template #loading>
        <div class="text-secondary bg-primary flex flex-col items-center justify-center w-full h-full text-lg">
          Loading..
          <AppIcon class="animate-spin" :icon="['fas', 'spinner']" />
        </div>
      </template>
    </UseImage>
    <!-- Info -->
    <div class="info-container bg-primary absolute top-auto bottom-0 left-0 w-full py-4 transform desktop:translate-y-full backface-hidden transition-all group-hover:transform-none">
      <div class="info-wrapper flex justify-between items-center px-4">
        <div class="card-text text-dark">
          <h1><slot name="item-name" /></h1>
          <h3 class="capitalize">
            <slot name="owner-name" />
          </h3>
        </div>
        <ButtonDownload
          class="btn-download "
        />
      </div>
    </div>
  </div>
</template>

<!-- Scoped Styling -->
<!-- <style scoped>
    .card {
    position: relative;
    width: 100%;
    color:#fff;
    overflow: hidden;
    border-radius: 10px;
    }
    img{
        width: 100%;
        height: 100%;
    }
    .info-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
    .info-container {
    position: absolute;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 15px 0 15px;
    transform: translateY(100%);
    backface-visibility: hidden;
    transition: opacity 0.1s 0.3s, -webkit-transform 0.4s;
    transition: transform 0.4s, opacity 0.1s 0.3s;
    transition: transform 0.4s, opacity 0.1s 0.3s, -webkit-transform 0.4s;
    border-radius: 0 0 10px 10px;
    }

    .info-Slide-up:hover{
      cursor: pointer;
    }
    .info-Slide-up:hover img {
        box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);
        filter: brightness(80%);
        }
    .info-Slide-up:hover .info-container {
    transform: translateY(0px);
    transition: opacity 0.1s, -webkit-transform 0.4s;
    transition: transform 0.4s, opacity 0.1s;
    transition: transform 0.4s, opacity 0.1s, -webkit-transform 0.4s;
    // border-top: 3px dashed $clr-primary;
    }

    .btn-download{
        width: 40px;
        height: 40px;
        @include media(desktop) {
            width: 50px;
            height: 50px;
        }
    }
</style> -->
