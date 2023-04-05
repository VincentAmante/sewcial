<script setup lang="ts">
    // Import download button
    import RSVPButton from '@/components/RSVPButton.vue';
    
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
    <div class="cards" onclick="location.href='html/image.html'">
        <div class="card">
          <div class="card-image" :style="{ backgroundImage: `url(${image})` }"></div>
        <div class="card-info">
            <h1>
              <slot name="event-name"></slot>
            </h1>
            <h3>
              <slot name="date"></slot>
            </h3>
            <h3 class = "disclaimer">
              FREE ENTRY!
            </h3>
            <RSVPButton></RSVPButton>
        </div>
        </div>
    </div>
</template>

<!-- Scoped Styling -->
<style scoped lang="scss">
.cards {
    padding: .75em;
    margin: 5px;
    .card {
      flex-direction: column;
      color: $clr-text;
      background-color: $clr-primary;
      width: 100%; // change this depending on the thign
      border-radius: 20px;
      transition: transform 300ms linear;

      &:hover {
        cursor: pointer;
        transform: scale(1);
        box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);
        
        .card-image {
          filter: brightness(100%);
        }
      }
    }
  
    // Content
    .card-info {
      flex-direction: column;
      padding: 1.8rem;
      text-align: left;
      h1, h3 {
        margin-block: 0.2em;
      }

      .disclaimer {
        padding-top: 0.5em;
        margin-block: 1.5em;
      }
    }
  
    // Images
    .card-image{
      aspect-ratio: 1.1 / 1;
      overflow: hidden;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 20px 20px 0px 0px;
      width: 100%;
      vertical-align: middle;
      filter: brightness(90%);
      // background-image: url(../assets/images/OpenMic.png);
    }
  }
  
</style>