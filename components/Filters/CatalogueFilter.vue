<script setup lang="ts">
import { CatalogueItem, EnumMaterial } from '@prisma/client'
import DropDown from '../FormFields/DropDown.vue'
import CheckBox from '../FormFields/CheckBox.vue'
import BaseFilter from './BaseFilter.vue'

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

const emit = defineEmits(['update:catalogue'])

const sortOption = ref('')
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

function sort () {
  filteredCatalogue.value = filteredCatalogue.value.sort((a: CatalogueItem, b: CatalogueItem) => {
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
const filteredCatalogue = useVModel(props, 'catalogue', emit)

function filterByMaterial () {
  if (materialArr.length === 0) { return }

  const filters = materialArr.filter((material) => {
    return material.value.selected
  }).map((material) => {
    return material.value.value
  })

  filteredCatalogue.value = filteredCatalogue.value.filter((item) => {
    for (const material of item.materials) {
      if (filters.includes(material.material.name)) { return true }
    }
    return false
  })
}

function applyFilters () {
  filterByMaterial()
  sort()
  console.log(filteredCatalogue.value)
}
</script>

<template>
  <BaseFilter>
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
    <div>
      {{ filteredCatalogue }}
    </div>
    <AppButton @click="() => applyFilters()">
      Apply Filters
    </AppButton>
  </BaseFilter>
</template>
