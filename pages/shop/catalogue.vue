<script setup lang="ts">
import { CatalogueItem, EnumMaterial, Material } from '@prisma/client'
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

// Catalogue contains an original list of all catalogue items
const catalogue: Ref<CatalogueItemsWithMaterials | null> = ref(null)

// Filtered catalogue contains a filtered list of catalogue items
// This list tends to lose items due to filtering, so the filter reverts to ${catalogue} when no filters are applied
const filteredCatalogue: Ref<CatalogueItemsWithMaterials | null> = ref(null)

const cataloguePage: Ref<CatalogueItem[]> = ref([])

const { data, pending, error, refresh } = await useFetch('/api/CatalogueItems/', {
  onResponse ({ response }) {
    // Needs to be converted to array
    const responseData = { ...response._data }
    const resList = []
    for (const item in responseData) {
      resList.push(responseData[item])
    }

    catalogue.value = resList
    filteredCatalogue.value = resList
  }
})
// Ensures fetches are made on page load
refresh()

function toItem (itemUrl: string) {
  useRouter().push(`/shop/${itemUrl}`)
}

function onApplyFilter (newFilteredCatalogue: CatalogueItemsWithMaterials) {
  filteredCatalogue.value = newFilteredCatalogue
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
        </SpeechBubble>
      </div>
    </div>

    <div class="catalogue-container flex desktop:flex-row">
      <!-- Filters -->
      <div class="filters-dropdown">
        <div>
          <CatalogueFilter
            v-if="!pending && !error && catalogue !== null"
            :catalogue="catalogue"
            @apply-filter="(newFilteredCatalogue) => onApplyFilter(newFilteredCatalogue)"
          />
        </div>
      </div>

      <!-- Catalogue Items -->
      <div class="flex flex-col w-full desktop:mt-8">
        <div
          v-if="!pending && !error"
          class="grid grid-cols-2 mx-auto self-center justify-center desktop:grid-cols-3"
        >
          <CatalogueCard
            v-for="item in cataloguePage"
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
      <Pagination
        v-if="!pending && !error && filteredCatalogue"
        v-model="cataloguePage"
        :items-per-page="9"
        :original-list="filteredCatalogue"
      />
    </div>
  </main>
</template>
