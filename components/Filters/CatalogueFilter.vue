<script setup lang="ts">
import { CatalogueItem, EnumMaterial } from '@prisma/client'
import { computeStyles } from '@popperjs/core'
import DropDown from '../FormFields/DropDown.vue'
import CheckBox from '../FormFields/CheckBox.vue'
import BaseFilter from './BaseFilter.vue'

// Typing for catalogue items where Materials are included
type Material = {
  materials: {
    material: {
      name: EnumMaterial
    }
  }[]
}
type ItemWithMaterial = CatalogueItem & Material

const props = defineProps<{
  catalogue: ItemWithMaterial[]
}>()
const emit = defineEmits<{
  (e: 'apply-filter', value: ItemWithMaterial[]): void
}>()
const filteredCatalogue = ref(props.catalogue)

// Sorting parameters
const sortOption = ref('price')
const sortOptions = [
  {
    label: 'Price',
    value: 'price'
  },
  {
    label: 'Name',
    value: 'name'
  }
]
const sortOrder = ref('asc')
const sortOrderOptions = [
  {
    label: 'Ascending',
    value: 'asc'
  },
  {
    label: 'Descending',
    value: 'desc'
  }
]

// Material Options
type materialFilters = {
  label: string
  value: EnumMaterial
  selected: boolean
}
const materialArr = Object.keys(EnumMaterial).map((key: any) => EnumMaterial[key]).map(material => ref({
  label: material,
  value: (material as EnumMaterial),
  selected: false
} as materialFilters))

// Apply filter and sort

function filterByMaterial () {
  // if none selected, no filtering is applied

  // acquire selected filters
  const filters = materialArr.filter((material) => {
    return material.value.selected
  }).map((material) => {
    return material.value.value
  })
  console.log('filters:', filters)
  if (filters.length === 0) {
    return
  }

  // any item with at least one of the selected materials is included
  filteredCatalogue.value = filteredCatalogue.value.filter((item) => {
    for (const material of item.materials) {
      console.log('material.material.name: ', material.material.name)
      if (filters.includes(material.material.name)) {
        console.log('included')
        return true
      }
    }
    return false
  })

  console.log('filteredCatalogue:', filteredCatalogue.value)
}

function sort () {
  console.log('filteredCatalogueSort: ', filteredCatalogue.value)
  filteredCatalogue.value = filteredCatalogue.value.sort((a: CatalogueItem, b: CatalogueItem) => {
    // behaviour for each sort option is defined in this switch case
    // If none of the cases match, the order is unchanged
    switch (sortOption.value) {
      case 'price':
        if (sortOrder.value === 'asc') {
          return (a.priceAED >= b.priceAED) ? 1 : -1
        } else {
          return (a.priceAED <= b.priceAED) ? -1 : 1
        }
      case 'name':
        if (sortOrder.value === 'asc') {
          return (a.name.localeCompare(b.name))
        } else {
          return -(a.name.localeCompare(b.name))
        }
      default:
        return 1
    }
  })
}

function applyFilters () {
  filterByMaterial()
  sort() // needs to be last to save performance
  emit('apply-filter', filteredCatalogue.value)
}
</script>

<template>
  <BaseFilter @apply-filter="() => applyFilters()">
    <div class="flex flex-col gap-2">
      <h1 class="text-secondary my-1">
        Search
      </h1>
      <div class="flex justify-between items-center gap-2">
        <label>Sort By</label>
        <DropDown
          v-model:modelValue="sortOption"
          :options="sortOptions"
        />
      </div>
      <div class="flex justify-between items-center gap-2">
        <label>Sort Order</label>
        <DropDown
          v-model:modelValue="sortOrder"
          :options="sortOrderOptions"
        />
      </div>
    </div>

    <div>
      <h1 class="text-secondary my-1">
        Category
      </h1>
      <div class="flex justify-between items-center gap-2">
        <label>Category</label>
        <DropDown
          v-model:modelValue="sortOrder"
          :options="sortOrderOptions"
        />
      </div>
    </div>
    <div>
      <h1 class="text-secondary my-1">
        Material
      </h1>
      <div
        v-for="material in materialArr"
        :key="material.value"
        class="flex justify-between"
      >
        <CheckBox v-model="material.value.selected" :label="material.value.label" />
      </div>
    </div>
  </BaseFilter>
</template>
