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
const { data: item } = useFetch(`/api/CatalogueItems/${route.params.id}`)

onMounted(async () => {
  try {
    await item.value
  } catch {
    showError({
      statusCode: 404,
      message: 'Item not found'
    })
  }
})
</script>

<template>
  <main class="flex flex-col w-full text-secondary relative items-center">
    <div class="flex flex-col items-center justify-center px-4 my-desktop-h gap-4 max-w-4xl w-full desktop:flex-row desktop:gap-12">
      <div class="uppercase self-start desktop:hidden">
        <p class="caption">
          <a href="/shop/catalogue">Catalogue</a> > {{ item?.name }}
        </p>
      </div>
      <ItemImage
        :image="item?.imageSrc"
        class="max-w-md"
      />
      <div class="w-full desktop:self-start flex flex-col">
        <div class="breadcrumb uppercase self-start hidden desktop:block">
          <p class="caption">
            <a href="/shop/catalogue">Catalogue</a> > {{ item?.name }}
          </p>
        </div>
        <ItemDescription :sizes="item?.sizingsData">
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
