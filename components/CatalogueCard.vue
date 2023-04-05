<script setup lang="ts">
    // Variables passed to this component are props
    const props = defineProps({
        image: {
          type: String,
          required: true
        },

        available: {
          type: String,
          default: 'available'
        }
    })
</script>

<!-- Card -->
<template>
    <div class="cards-container" onclick="location.href='html/image.html'">
        <div class="card">
          <div class="card-image" :class="available" :style="{ backgroundImage: `url(${image})` }">
            <div class = "sold-text"><h1>SOLD</h1></div>
          </div>
        <div class="card-heading">
            <h1 class = "item-name">
              <slot name="item-name"></slot>
            </h1>
            <h1 class = "price">
              <slot name="price"></slot>
            </h1>
        </div>
            <p class="description">
              <slot name="description"></slot>
            </p>
        </div>
    </div>
</template>

<!-- Scoped Styling -->
<style scoped lang="scss">
.cards-container {
    padding: .75em;
    margin:5px;
  
    .card {
      color: $clr-text;
      width: 100%; // change this depending on the thign
      border-radius:10px;
      transition: transform 0.5s;
    }
  
    // Content
    .card-heading {
      display:flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-items: baseline;
      padding-top: 1rem;
      text-align: left;

      .item-name {
        margin: 0;
        color: $clr-secondary;
      }

      .price {
        margin: 0 0 0 0px;
        color: $clr-accent-1;
      }
    }
    .description {
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: baseline;
        padding: 0.5rem 1rem 1rem 1rem;
        text-align: center;
        margin: 0;
    }
  
    // Images
    .card-image{
      aspect-ratio: 3 / 4;
      overflow: hidden;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 10px 10px 10px 10px;
      width: 100%;
      vertical-align: middle;

      transition: transform 0.5s;
  
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
        -webkit-transform: scale(1.1);
        .card-image {
          opacity: 1;
        }
      }

      &.available{
        .sold-text {
          display: none;
        }
      }

      &.notavailable {
        .sold-text {
          display: inline-block;
          position: relative;
          height: 100%;
          width: 100%;
          box-shadow: inset 0 0 0 2000px rgba(255, 78, 78, 0.5);
        }

        h1 {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
        }
      }
      
    }
  }
</style>