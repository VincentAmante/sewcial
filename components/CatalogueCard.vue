<script setup lang="ts">
// Variables passed to this component are props
const props = defineProps({
  image: {
    type: String,
    required: true
  },

  available: {
    type: Boolean,
    default: true
  }
})
</script>

<!-- Card -->
<template>
  <div class="cards-container p-3 m-1">
    <div class="card text-dark w-full rounded-lg transition-all  cursor-pointer group hover:transform hover:scale-110">
      <div
        class="card-image aspect-[3/4] relative overflow-hidden bg-cover bg-center bg-no-repeat rounded-lg w-full align-middle transition-all"
      >
        <img
          class="w-full h-full absolute bg-secondary object-cover object-center aspect-[3/4]"
          :src="image"
        >
        <div
          v-if="!available"
          class="sold-text absolute w-full h-full bg-accent-2 bg-opacity-50 flex flex-col items-center justify-center"
        >
          <h1 class="text-primary text-2xl">
            SOLD
          </h1>
        </div>
      </div>
      <div class="card-heading flex flex-wrap justify-between items-baseline text-left gap-x-2 pt-2 text-secondary">
        <h1 class="item-name my-0 max-w-[10ch] text-ellipsis overflow-hidden">
          <slot name="item-name" />
        </h1>
        <h1 class="price my-0 text-accent-1">
          <slot name="price" />
        </h1>
      </div>
      <p class="description text-left mobile:text-center w-full text-secondary my-1">
        <slot name="description" />
      </p>
    </div>
  </div>
</template>

<!-- Scoped Styling -->
<!-- <style scoped lang="scss">
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
</style> -->
