<script setup lang="ts">
import { CatalogueItem, EnumMaterial } from '@prisma/client'
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

type MaterialsData = {
  materials?: EnumMaterial[]
}
type CatalogueItemWithMaterials = CatalogueItem & MaterialsData
const itemPlaceholder: CatalogueItemWithMaterials = {
  id: 'NULL ID',
  name: 'loading name..',
  description: 'loading description..',
  priceAED: 0,
  imageSrc: '',
  categoryTagName: 'Loading category..',
  isFeatured: false,
  sizingsData: [{
    name: 'loading size..',
    size: 0
  }],
  materials: [] as EnumMaterial[]
}
const catalogueItem: Ref<CatalogueItem> = ref(itemPlaceholder)
const { data: item } = useFetch(`/api/CatalogueItems/${route.params.id}`)

onMounted(async () => {
  try {
    await item.value
    catalogueItem.value = (item.value as CatalogueItemWithMaterials)
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
          <a href="/shop/catalogue">Catalogue</a> > {{ catalogueItem.name }}
        </p>
      </div>
      <ItemImage
        :image="item?.imageSrc"
        class="max-w-md"
      />
      <div class="w-full desktop:self-start flex flex-col">
        <div class="breadcrumb uppercase self-start hidden desktop:block">
          <p class="caption">
            <a href="/shop/catalogue">Catalogue</a> > {{ catalogueItem.name }}
          </p>
        </div>
        <ItemDescription :sizes="catalogueItem.sizingsData">
          <template #item-name>
            {{ catalogueItem.name }}
          </template>
          <template #owner-name>
            <!-- {{  }} -->
          </template>
          <template #description>
            {{ catalogueItem.description }}
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
