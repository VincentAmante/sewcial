<script setup lang="ts">
import SpeechBubble from '@/components/SpeechBubble.vue'
import CatalogueCard from '@/components/CatalogueCard.vue'
import IconFilterBlue from '@/components/icons/IconFilterBlue.vue'
import Pagination from '@/components/Pagination.vue'
import CatalogueFilter from '~/components/Filters/CatalogueFilter.vue'

definePageMeta({
  layout: 'shop'
})

const { data: items } = useFetch('/api/CatalogueItems/')
const filteredItems = ref(items)

const catalogueItems = computed(() => {
  filteredItems.value = items.value
  return filteredItems.value
})

function filter () {
  if (items.value === null) { return }
  filteredItems.value = items.value.filter((item: any) => {
    const tags = item.tags
    for (const tag of tags) {
      if (tag.tagName.toLowerCase().includes('activewear')) {
        return true
      }
    }
    return false
  })
}

function toItem (itemUrl: string) {
  useRouter().push(`/shop/${itemUrl}`)
}
</script>

<template>
  <main class="flex flex-col items-center">
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

    <div class="catalogue-container desktop:flex-row">
      <!-- Filters -->
      <div class="filters-dropdown hidden">
        <IconFilterBlue />
        <p>FILTER</p>
      </div>
      <div class="filters-container hidden">
        <p>HIDE FILTERS</p>
        <DropdownTab>
          <h1>SHOP BY</h1>
        </DropdownTab>
        <DropdownTab>
          <h1>STYLE</h1>
        </DropdownTab>
        <DropdownTab>
          <h1>PRICE</h1>
        </DropdownTab>
        <button>
          <p class="button">
            APPLY FILTERS
          </p>
        </button>
      </div>

      <!-- Catalogue Items -->
      <div class="flex content-center w-full desktop:mt-8">
        <div class="grid grid-cols-2 mx-auto self-center justify-center desktop:grid-cols-3">
          <CatalogueCard
            v-for="item in items"
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
    <div class="p-4 px-8 bg-cyan-950 text-white">
      <p>Catalogue Items</p>
      <code>
        {{ catalogueItems }}
      </code>
    </div>
    <!-- Paginate -->
    <div class="paginate my-8">
      <Pagination :total-items="9" :items-per-page="6" :current-page="1" />
    </div>
  </main>
</template>
