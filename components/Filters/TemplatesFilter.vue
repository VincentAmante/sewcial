<script setup lang="ts">
import type { Template } from '@prisma/client'
import DropDown from '../FormFields/DropDown.vue'
import DropDownTab from '../FormFields/DropDownTab.vue'
import CheckBox from '../FormFields/CheckBox.vue'
import BaseFilter from './BaseFilter.vue'
import { EnumMaterial } from '~/enums/Material'

// Typing for catalogue items where Materials are included
type Material = {
  MaterialOnTemplate: {
    material: {
      name: EnumMaterial
    }
  }[]
}
type TemplateWithMaterial = Template & Material

const props = defineProps<{
  templates: TemplateWithMaterial[]
}>()
const emit = defineEmits<{(
  e: 'apply-filter', value: TemplateWithMaterial[]): void
}>()
const filteredTemplates = ref(props.templates)

// Sorting parameters
const sortOption = ref('price')
const sortOptions = [
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
  if (filters.length === 0) {
    return
  }

  // any item with at least one of the selected materials is included
  filteredTemplates.value = filteredTemplates.value.filter((item) => {
    for (const material of item.MaterialOnTemplate) {
      if (filters.includes(material.material.name)) {
        return true
      }
    }
    return false
  })
}

function sort () {
  filteredTemplates.value = filteredTemplates.value.sort((a: Template, b: Template) => {
    // behaviour for each sort option is defined in this switch case
    // If none of the cases match, the order is unchanged
    switch (sortOption.value) {
      // case 'price':
      //   if (sortOrder.value === 'asc') {
      //     return (a.priceAED >= b.priceAED) ? 1 : -1
      //   } else {
      //     return (a.priceAED <= b.priceAED) ? 1 : -1
      //   }
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

// filter toggles
const willFilterMaterial = ref(false)

function applyFilters () {
  if (willFilterMaterial.value) {
    filteredTemplates.value = props.templates
    filterByMaterial()
  }
  sort() // needs to be last to save performance
  emit('apply-filter', filteredTemplates.value)
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
