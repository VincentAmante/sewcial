<script setup lang="ts">
import LikeMeButton from '@/components/LikeMeButton.vue'
import ItemDescription from '@/components/ItemDescription.vue'
import ItemImage from '@/components/ItemImage.vue'

definePageMeta({
  layout: 'shop'
})

const route = useRoute()
if (route.params.id === undefined) {
  throw new Error('No ID provided')
}
// const item = ref()
const { data: item } = useFetch(`/api/CatalogueItems/${route.params.id}`)
const sampleSizes = [
  {
    name: 'Chest',
    size: '34'
  },
  {
    name: 'Waist',
    size: '27'
  },
  {
    name: 'Arms',
    size: '30.5'
  },
  {
    name: 'Neck',
    size: '14.5'
  },

  {
    name: 'Neck',
    size: '14.5'
  }
]
</script>

<template>
  <main class="flex flex-col w-full text-secondary relative items-center">
    <div class="flex flex-col items-center justify-center mx-4 my-desktop-h gap-4 max-w-4xl desktop:flex-row ">
      <div class="uppercase self-start desktop:hidden">
        <p class="caption">
          <a href="/shop/catalogue">Catalogue</a> > {{ item?.name }}
        </p>
      </div>
      <ItemImage
        :image="'https://i.pinimg.com/564x/e1/cf/a1/e1cfa1a284fb717a0ef3023d7ee3e924.jpg'"
        class=" max-w-md"
      />
      <div>
        <div class="breadcrumb uppercase self-start hidden desktop:block">
          <p class="caption">
            <a href="/shop/catalogue">Catalogue</a> > {{ item?.name }}
          </p>
        </div>

        <ItemDescription :sizes="sampleSizes">
          <template #item-name>
            {{ item?.name }}
          </template>
          <template #owner-name>
            <!-- {{  }} -->
          </template>
          <template #description>
            {{ item?.description }}
          </template>
          <template #sizing>
            XS
          </template>
        </ItemDescription>

        <div class="w-full flex items-center justify-center">
          <LikeMeButton />
        </div>
      </div>
    </div>
  </main>
</template>
