<script setup lang="ts">
    // Variables passed to this component are props
    const props = defineProps({
        image: {
          type: String,
          required: true
        },
    })
</script>

<!-- Card -->
<template>
    <div class="card">
          <div class="card-image" :style="{ backgroundImage: `url(${image})` }"></div>
    </div>
</template>

<!-- Scoped Styling -->
<style scoped lang="scss">
.card {
    width: 100%;    

    // Images
    .card-image{
      aspect-ratio: 1.5 / 1;
      overflow: hidden;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 10px 10px 10px 10px;
      border-radius: 20px;
      outline: 4px dashed $clr-secondary;
      width: auto;
      height: 100%;
      vertical-align: middle;
      transition: transform 0.5s;

      @include media (tablet) {
        aspect-ratio: 0.85/1;
      }

    }
}
</style>