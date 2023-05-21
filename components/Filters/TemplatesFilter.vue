<script setup lang="ts">
import type { Template } from '@prisma/client'
import DropDown from '../FormFields/DropDown.vue'
import DropDownTab from '../FormFields/DropDownTab.vue'
import CheckBox from '../FormFields/CheckBox.vue'
import BaseFilter from './BaseFilter.vue'
import { EnumMaterial } from '~/enums/Material'
import { Skill } from '~/enums/Skill'
import { Category } from '~/enums/Category'

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
  e: 'apply-filter', value: TemplateWithMaterial[]): void,
  (e: 'hide-filter'): void
}>()
const filteredTemplates = ref(props.templates)

// Sorting parameters
const sortOption = ref('name')
const sortOptions = [
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

// Material Options
type materialFilters = {
  label: string
  value: EnumMaterial
  selected: boolean
}
const materialArr = Object.keys(EnumMaterial)
  .map((key: any) => EnumMaterial[key])
  .map(material => ref({
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

type skillFilters = {
  label: string
  value: Skill
  selected: boolean
}
const skillArr = Object.keys(Skill)
  .map((key: any) => Skill[key])
  .map(skill => ref({
    label: skill,
    value: (skill as Skill),
    selected: false
  } as skillFilters))

function filterBySkill () {
  // if none selected, no filtering is applied

  // acquire selected filters
  const filters = skillArr.filter((skill) => {
    return skill.value.selected
  }).map((skill) => {
    return skill.value.value
  })
  if (filters.length === 0) {
    return
  }

  // any item with at least one of the selected skills is included
  filteredTemplates.value = filteredTemplates.value.filter((item) => {
    return (filters.includes(item.skill as Skill))
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
  filteredTemplates.value = filteredTemplates.value.filter((item) => {
    if (item.categoryTagId === null) { return false }
    return filters.includes(item.categoryTagId)
  })
}

function sort () {
  filteredTemplates.value = filteredTemplates.value.sort((a: Template, b: Template) => {
    // behaviour for each sort option is defined in this switch case
    // If none of the cases match, the order is unchanged
    switch (sortOption.value) {
      case 'date':
      {
        const aDate = new Date(a.createdAt).getTime()
        const bDate = new Date(b.createdAt).getTime()
        if (sortOrder.value === 'asc') {
          return (aDate - bDate)
        } else {
          return -(aDate - bDate)
        }
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

// filter toggles
const willFilterMaterial = ref(false)
const willFilterSkill = ref(false)

function applyFilters () {
  filteredTemplates.value = props.templates
  if (willFilterMaterial.value) { filterByMaterial() }
  if (willFilterSkill.value) { filterBySkill() }
  if (willFilterCategory.value) { filterByCategory() }

  sort() // needs to be last to save performance
  emit('apply-filter', filteredTemplates.value)
}

function hideFilter () {
  emit('hide-filter')
}

function clearFilter () {
  sortOption.value = sortOptions[0].value
  sortOrder.value = sortOrderOptions[0].value

  willFilterCategory.value = false
  willFilterMaterial.value = false
  willFilterSkill.value = false

  materialArr.forEach((material) => {
    material.value.selected = false
  })
  categoryArr.forEach((category) => {
    category.value.selected = false
  })
  skillArr.forEach((skill) => {
    skill.value.selected = false
  })
}
</script>

<template>
  <BaseFilter
    @apply-filter="() => applyFilters()"
    @hide-filter="() => hideFilter()"
    @clear-filter="() => clearFilter()"
  >
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
      <DropDownTab v-model="willFilterSkill">
        <template #title>
          Skill
        </template>
        <template #default>
          <div
            v-for="skill in skillArr"
            :key="skill.value"
            class="flex justify-between"
          >
            <CheckBox v-model="skill.value.selected" :label="skill.value.label" />
          </div>
        </template>
      </DropDownTab>
    </div>
  </BaseFilter>
</template>
