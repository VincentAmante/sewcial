<script setup lang="ts">
import ButtonDownload from '@/components/icons/ButtonDownload.vue'
// Variables passed to this component are props
const props = defineProps({
  image: {
    type: String,
    required: true
  }
})
</script>

<!-- Browse Image Card Templates -->
<template>
  <div class="card info-Slide-up">
    <!-- Image -->
    <img :src="image">
    <!-- Info -->
    <div class="info-container">
      <div class="info-wrapper">
        <div class="card-text">
          <h1><slot name="item-name" /></h1>
          <h3 class="capitalize">
            <slot name="owner-name" />
          </h3>
        </div>
        <ButtonDownload class="btn-download" />
      </div>
    </div>
  </div>
</template>

<!-- Scoped Styling -->
<style scoped lang="scss">
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
    .card-text{
        color: $clr-text;
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
    background-color: $clr-primary;
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
        img{
        box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);
        filter: brightness(80%);
        }
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
</style>
