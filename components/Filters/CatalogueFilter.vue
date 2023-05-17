<script setup lang="ts">
import type { CatalogueItem } from '@prisma/client'
import DropDown from '../FormFields/DropDown.vue'
import DropDownTab from '../FormFields/DropDownTab.vue'
import CheckBox from '../FormFields/CheckBox.vue'
import BaseFilter from './BaseFilter.vue'
import { EnumMaterial } from '~/enums/Material'
import { Category } from '~/enums/Category'

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
  catalogue: ItemWithMaterial[],
  isLiked?: boolean
}>()
const emit = defineEmits<{(
  e: 'apply-filter', value: ItemWithMaterial[]): void,
  (e: 'hide-filter'): void
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
  },
  {
    label: 'Date',
    value: 'date'
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

// Price Filters

const priceFilterOption = ref('none')
const priceFilterOptions = [
  {
    label: 'None',
    value: 'none'
  },
  {
    label: 'Less than 50',
    value: 'sub50'
  },
  {
    label: '50 - 100',
    value: '50to100'
  },
  {
    label: '100 - 150',
    value: '100to150'
  },
  {
    label: '150 - 200',
    value: '100to150'
  }
]
function filterPrice () {
  let priceSort: (item: ItemWithMaterial) => boolean

  switch (priceFilterOption.value) {
    case 'sub50':
      priceSort = (item: ItemWithMaterial) => (item.priceAED < 50)
      break
    case '50to100':
      priceSort = (item: ItemWithMaterial) => (item.priceAED >= 50 && item.priceAED < 100)
      break
    case '100to150':
      priceSort = (item: ItemWithMaterial) => (item.priceAED >= 100 && item.priceAED < 150)
      break
    case '150to200':
      priceSort = (item: ItemWithMaterial) => (item.priceAED >= 150 && item.priceAED < 200)
      break
    case 'none':
    default:
      priceSort = () => true
  }

  filteredCatalogue.value = filteredCatalogue.value.filter((item) => {
    return priceSort(item)
  })
}

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
  // acquire selected filters
  const filters = materialArr.filter((material) => {
    return material.value.selected
  }).map((material) => {
    return material.value.value
  })

  // if none selected, no filtering is applied
  if (filters.length === 0) {
    return
  }

  // any item with at least one of the selected materials is included
  filteredCatalogue.value = filteredCatalogue.value.filter((item) => {
    for (const material of item.materials) {
      if (filters.includes(material.material.name)) {
        return true
      }
    }
    return false
  })
}

// Category Options

const willFilterCategory = ref(false)
type categoryFilters = {
  label: string
  value: string
  selected: boolean
}
const categoryArr = Object.keys(Category)
  .map((key: any) => Category[key])
  .map(category => ref({
    label: category,
    value: (category as string),
    selected: false
  } as categoryFilters))

function filterByCategory () {
  // acquire selected filters
  const filters = categoryArr.filter((category) => {
    return category.value.selected
  }).map((category) => {
    return category.value.value
  })

  // if none selected, no filtering is applied
  if (filters.length === 0) {
    return
  }

  // any item with at least one of the selected categories is included
  filteredCatalogue.value = filteredCatalogue.value.filter((item) => {
    if (item.categoryTagName === null) { return false }
    return filters.includes(item.categoryTagName)
  })
}

function sort () {
  // Sorting functions
  const priceSort = (a: CatalogueItem, b: CatalogueItem) => {
    const aPrice = a.priceAED
    const bPrice = b.priceAED

    if (sortOrder.value === 'asc') {
      return (aPrice >= bPrice) ? 1 : -1
    } else {
      return (aPrice <= bPrice) ? 1 : -1
    }
  }
  const nameSort = (a: CatalogueItem, b: CatalogueItem) => {
    const aName = a.name
    const bName = b.name

    if (sortOrder.value === 'asc') {
      return (aName >= bName) ? 1 : -1
    } else {
      return (aName <= bName) ? 1 : -1
    }
  }
  const dateSort = (a: CatalogueItem, b: CatalogueItem) => {
    const aTime = new Date(a.createdAt).getTime()
    const bTime = new Date(b.createdAt).getTime()

    if (sortOrder.value === 'asc') {
      return (aTime >= bTime) ? 1 : -1
    } else {
      return (aTime <= bTime) ? 1 : -1
    }
  }

  // Assigning sort function here to save performance on each iteration
  let sortFunc: (a: CatalogueItem, b: CatalogueItem) => number
  switch (sortOption.value) {
    // behaviour for each sort option is defined in this switch case
    // If none of the cases match, the order is unchanged
    case 'price':
      sortFunc = priceSort
      break
    case 'name':
      sortFunc = nameSort
      break
    case 'date':
      sortFunc = dateSort
      break
    default:
      sortFunc = () => 1
  }

  filteredCatalogue.value = filteredCatalogue.value.sort((a: CatalogueItem, b: CatalogueItem) => {
    return sortFunc(a, b)
  })
}

// filter toggles
const willFilterMaterial = ref(false)

function applyFilters () {
  filteredCatalogue.value = props.catalogue
  if (willFilterMaterial.value) { filterByMaterial() }
  filterPrice()
  if (willFilterCategory.value) { filterByCategory() }
  sort() // needs to be last to save performance
  emit('apply-filter', filteredCatalogue.value)
}

function hideFilter () {
  emit('hide-filter')
}

const filterStyling = computed(() => {
  return (props.isLiked) ? 'primary' : 'secondary'
})
</script>

<template>
  <BaseFilter
    :is-liked-page="isLiked"
    @apply-filter="() => applyFilters()"
    @hide-filter="() => hideFilter()"
  >
    <div class="flex flex-col gap-2 gap-y-4">
      <h1
        class="my-1"
        :class="`text-${filterStyling}`"
      >
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

      <div class="flex justify-between items-center gap-2">
        <label>Price Filter</label>
        <DropDown
          v-model:modelValue="priceFilterOption"
          :options="priceFilterOptions"
        />
      </div>
    </div>

    <div>
      <DropDownTab v-model="willFilterCategory">
        <template #title>
          Category
        </template>
        <template #default>
          <div
            v-for="category in categoryArr"
            :key="category.value"
            class="flex justify-between"
          >
            <CheckBox v-model="category.value.selected" :label="category.value.label" />
          </div>
        </template>
      </DropDownTab>
    </div>
    <div>
      <DropDownTab v-model="willFilterMaterial">
        <template #title>
          Material
        </template>
        <template #default>
          <div
            v-for="material in materialArr"
            :key="material.value"
            class="flex justify-between"
          >
            <CheckBox v-model="material.value.selected" :label="material.value.label" />
          </div>
        </template>
      </DropDownTab>
    </div>
  </BaseFilter>
</template>
