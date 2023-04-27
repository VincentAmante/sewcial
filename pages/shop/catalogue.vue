<script setup lang="ts">
import { CatalogueItem, Material } from '@prisma/client'
import SpeechBubble from '@/components/SpeechBubble.vue'
import CatalogueCard from '@/components/CatalogueCard.vue'
import IconFilterBlue from '@/components/icons/IconFilterBlue.vue'
import Pagination from '@/components/Pagination.vue'
import CatalogueFilter from '~/components/Filters/CatalogueFilter.vue'

definePageMeta({
  layout: 'shop'
})

type WithMaterial<T> = T & {
  materials: {
    material: Material
  }[]
}
type CatalogueItemsWithMaterials = WithMaterial<CatalogueItem>[]

const { data: items } = useFetch('/api/CatalogueItems/')
const catalogue: Ref<CatalogueItemsWithMaterials> = ref(items)
const filteredCatalogue: Ref<CatalogueItemsWithMaterials | null> = ref(null)

onMounted(async () => {
  try {
    await items.value
    if (items.value === null) {
      showError({
        statusCode: 404,
        message: 'Item not found'
      })
      return
    }

    catalogue.value = items.value

    const catalogueCopy = readonly(catalogue.value).map((item) => {
      const materials = item.materials.map(material => material.material)
      return {
        ...item,
        materials
      }
    }) as unknown as CatalogueItemsWithMaterials
    filteredCatalogue.value = catalogueCopy
  } catch {
    showError({
      statusCode: 404,
      message: 'Item not found'
    })
  }
})
function toItem (itemUrl: string) {
  useRouter().push(`/shop/${itemUrl}`)
}
function onApplyFilter (newFilteredCatalogue: CatalogueItemsWithMaterials) {
  console.log('newFilteredCatalogue', newFilteredCatalogue)
  filteredCatalogue.value = newFilteredCatalogue
  console.log('filteredCatalogue', filteredCatalogue.value)
}
</script>

<template>
  <main class="flex flex-col">
    <div class="container flex flex-col border-b-secondary items-center justify-center border-dashed border-b-[4px] mobile:flex-row">
      <img class="head-img w-full h-auto mobile:w-1/2" src="https://via.placeholder.com/600x500">
      <div class="head-text flex flex-col justify-center mx-auto mb-8">
        <h1>NEW COLLECTION</h1>
        <h1>Lorem ipsum sit aset dolor</h1>
        <p>I got a condo in Manhattan, baby girl what’s happenin’?</p>
        <SpeechBubble class="speech">
          <p class="button">
            VIEW LIMITED EDITION
          </p>
          {{ catalogue }}
        </SpeechBubble>
      </div>
    </div>

    <div class="catalogue-container flex desktop:flex-row">
      <!-- Filters -->
      <div class="filters-dropdown">
        <CatalogueFilter
          :catalogue="catalogue"
          @apply-filter="(newFilteredCatalogue) => onApplyFilter(newFilteredCatalogue)"
        />
      </div>

      <!-- Catalogue Items -->
      <div class="flex flex-col w-full desktop:mt-8">
        <div class="grid grid-cols-2 mx-auto self-center justify-center desktop:grid-cols-3">
          <CatalogueCard
            v-for="item in filteredCatalogue"
            :key="item.id"
            :image="item.imageSrc"
            @click="() => toItem(item.id)"
          >
            <template #item-name>
              {{ item.name }}
            </template>
            <template #price>
              {{ item.priceAED }} AED
            </template>
            <template #description>
              {{ item.description }}
            </template>
          </CatalogueCard>
        </div>
      </div>
    </div>
    <!-- Paginate -->
    <div class="paginate my-8">
      <Pagination :total-items="9" :items-per-page="6" :current-page="1" />
    </div>
  </main>
</template>
