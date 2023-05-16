<script setup lang="ts">
import type { CatalogueItem, Material } from '@prisma/client'
import SpeechBubbleRaw from '@/components/SpeechBubble.vue'
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
const { pending, error, refresh } = await useFetch('/api/CatalogueItems/', {
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
  useRouter().push(`/catalogue/${itemUrl}`)
}

function onApplyFilter (newFilteredCatalogue: CatalogueItemsWithMaterials) {
  filteredCatalogue.value = newFilteredCatalogue
}

const filterToggled = ref(true)
function onHideFilter () {
  filterToggled.value = false
}
function onShowFilter () {
  filterToggled.value = true
}

const filterToggleStyling = computed(() => {
  if (filterToggled.value) {
    return ['desktop:translate-x-[0%]', 'desktop:block']
  } else {
    return ['desktop:translate-x-[-100%]', 'hidden', 'desktop:block']
  }
})
</script>

<template>
  <main class="flex flex-col">
    <div class="flex flex-col border-b-secondary items-center justify-center border-dashed border-b-[4px] mobile:flex-row  min-h-[30rem]">
      <img
        class="w-full h-auto mobile:w-1/2 max-w-lg"
        src="@/assets/images/collection.png"
      >
      <div class="flex flex-col items-center justify-center w-full h-full mb-8 min-h-[30vh] text-secondary tablet:items-start p-4 tablet:px-20">
        <div class="text-left p-2 max-w-md">
          <h1>NEW COLLECTION</h1>
          <h2>Renewed Blooms</h2>
          <p>
            Celebrate the season with our unique and eco-friendly upcycled clothing pieces, featuring vibrant floral patterns and sustainable materials.
          </p>
        </div>
        <SpeechBubble
          alignment="start"
          class="speech mx-auto tablet:mx-8"
        >
          <p class="button p-2 px-4">
            VIEW LIMITED EDITION
          </p>
        </SpeechBubble>
      </div>
    </div>

    <div class="catalogue-container flex flex-col desktop:flex-row">
      <!-- Filters -->
      <div class="flex flex-col border-b-4 desktop:border-b-0 border-dashed border-secondary desktop:border-none w-full self-start desktop:max-w-md p-4 h-full">
        <div
          class="flex flex-row items-center justify-end desktop:justify-start w-full gap-2 px-8 pt-4"
          @click="() => onShowFilter()"
        >
          <IconFilterBlue />
          <p class="text-secondary">
            Filter
          </p>
        </div>

        <div
          class="mt-5 flex flex-col items-center rounded-2xl desktop:items-start "
        >
          <CatalogueFilter
            v-if="!pending && !error && catalogue !== null"
            :catalogue="catalogue"
            class="w-full z-[100] max-w-lg transition-all duration-500 ease-in-out pt-0"
            :class="filterToggleStyling"
            @apply-filter="(newFilteredCatalogue) => onApplyFilter(newFilteredCatalogue)"
            @hide-filter="() => onHideFilter()"
          />
        </div>
      </div>

      <!-- Catalogue Items -->
      <div class="flex flex-col w-full desktop:pt-8 desktop:border-l-4 desktop:border-dashed desktop:border-secondary h-full">
        <div
          v-if="!pending && !error"
          class="grid grid-cols-2 w-full self-center justify-center desktop:grid-cols-3 gap-4 tablet:gap-8 px-4"
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
