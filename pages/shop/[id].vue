<script setup lang="ts">
import type { CatalogueItem } from '@prisma/client'
import { EnumMaterial } from '~/enums/Material'
import LikeMeButton from '@/components/LikeMeButton.vue'
import ItemDescription from '@/components/ItemDescription.vue'
import ItemImage from '@/components/ItemImage.vue'

definePageMeta({
  layout: 'shop'
})

const route = useRoute()
if (route.params.id === undefined) {
  showError('No ID provided')
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
  materials: [] as EnumMaterial[],
  createdAt: new Date(),
  authorFirstName: '..',
  authorLastName: '..'
}
const catalogueItem: Ref<CatalogueItem> = ref(itemPlaceholder)

onMounted(async () => {
  try {
    const { data: item } = await useFetch(`/api/CatalogueItems/${route.params.id}`)
    catalogueItem.value = (await item.value as CatalogueItemWithMaterials)
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
          <a href="/shop/catalogue">Catalogue</a> <span>&gt;</span> {{ (catalogueItem.name) ? catalogueItem.name : 'Loading name..' }}
        </p>
      </div>
      <ItemImage
        :image="catalogueItem.imageSrc"
        class="max-w-md"
      />
      <div class="w-full desktop:self-start flex flex-col">
        <div class="breadcrumb uppercase self-start hidden desktop:block">
          <p class="caption">
            <a href="/shop/catalogue">Catalogue</a> <span>&gt;</span> {{ (catalogueItem.name) ? catalogueItem.name : 'Loading name..' }}
          </p>
        </div>
        <ItemDescription :sizes="catalogueItem.sizingsData">
          <template #item-name>
            {{ (catalogueItem.name) ? catalogueItem.name : 'Loading name..' }}
          </template>
          <template #owner-name>
            <!-- {{  }} -->
          </template>
          <template #description>
            {{ catalogueItem.description || 'Loading description..' }}
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
