<script setup lang="ts">
import type { CatalogueItem, Material } from '@prisma/client'
import CatalogueCard from '@/components/CatalogueCard.vue'
import IconFilterBlue from '@/components/icons/IconFilterBlue.vue'
import Pagination from '@/components/Pagination.vue'
import CatalogueFilter from '~/components/Filters/CatalogueFilter.vue'

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

onMounted(async () => {
  if (sessionStorage.getItem('catalogue') !== null) {
    catalogue.value = JSON.parse(sessionStorage.getItem('catalogue')!)
    filteredCatalogue.value = JSON.parse(sessionStorage.getItem('catalogue')!)
  } else {
    const { refresh } = await useFetch('/api/CatalogueItems/', {
      onResponse ({ response }) {
        // Needs to be converted to array
        const responseData = { ...response._data }
        const resList = []
        for (const item in responseData) {
          resList.push(responseData[item])
        }

        catalogue.value = resList
        filteredCatalogue.value = resList
        useSessionStorage('catalogue', JSON.stringify(resList))
      }
    })
    // Ensures fetches are made on page load
    refresh()
  }
})

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
function toggleFilter () {
  filterToggled.value = !filterToggled.value
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
  <section>
    <div class="catalogue-container flex flex-col desktop:flex-row">
      <!-- Filters -->
      <div class="flex flex-col border-b-4 desktop:border-b-0 border-dashed border-secondary desktop:border-none w-full self-start desktop:max-w-md p-4 h-full">
        <div
          class="flex flex-row items-center justify-end desktop:justify-start w-full px-8 pt-4 "
        >
          <div
            class="flex items-center px-3 gap-2 cursor-pointer hover:bg-slate-200 hover:bg-opacity-50 rounded-lg"
            @click="() => toggleFilter()"
          >
            <IconFilterBlue />
            <p class="text-secondary">
              Filter
            </p>
          </div>
        </div>

        <div
          class="mt-5 flex flex-col items-center rounded-2xl desktop:items-start "
        >
          <CatalogueFilter
            v-if="catalogue !== null"
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
          v-if="catalogue && filteredCatalogue"
          class="grid grid-cols-2 w-full self-center justify-center desktop:grid-cols-3 gap-0 tablet:gap-8 px-4"
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
        v-if="filteredCatalogue"
        v-model="cataloguePage"
        :items-per-page="9"
        :original-list="filteredCatalogue"
      />
    </div>
  </section>
</template>
