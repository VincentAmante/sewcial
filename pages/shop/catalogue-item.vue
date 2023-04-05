<script setup lang="ts">
import LikeMeButton from '@/components/LikeMeButton.vue'
import ItemDescription from '@/components/ItemDescription.vue'
import ItemImage from '@/components/ItemImage.vue'
</script>

<template>
  <main>
    <div class="container">
      <div class="item-container">
        <div class="breadcrumb">
          <p class="caption">
            CATALOGUE > FEATURED
          </p>
        </div>

        <ItemImage :image="'https://i.pinimg.com/564x/e1/cf/a1/e1cfa1a284fb717a0ef3023d7ee3e924.jpg'" />

        <ItemDescription>
          <template #item-name>
            PATCHWORK JACKET
          </template>
          <template #owner-name>
            BY JOHN DOE
          </template>
          <template #description>
            Lorem ipsum dolor sit amet consectetur. At et venenatis ac adipiscing. Cum at pharetra feugiat sagittis egestas bibendum.
          </template>
          <template #sizing>
            XS
          </template>
          <template #chest-size>
            34
          </template>
          <template #neck-size>
            14.5
          </template>
          <template #waist-size>
            27
          </template>
          <template #arm-size>
            30.5
          </template>
        </ItemDescription>

        <LikeMeButton />
      </div>
    </div>
  </main>
</template>

<style scoped lang = "scss">
    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        color: $clr-secondary;
    }

    .item-container {
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin:1em;

        .breadcrumb {
            margin-right: auto;
        }
    }

    // .image-container {
    //     aspect-ratio: 1.5 / 1;
    //     width: 100%;
    //     height: auto;
    //     overflow:hidden;
    //     border-radius: 20px;
    //     border: 4px dashed $clr-secondary;
    //     align-content: center;
    //     justify-content: center;
    // }
</style>
