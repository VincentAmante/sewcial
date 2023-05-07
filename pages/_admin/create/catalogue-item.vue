<script setup lang="ts">
import type { Author, CatalogueCategoryTag } from '../../../node_modules/.prisma/client'
import { EnumMaterial } from '~/enums/Material'

const name = ref('')
const description = ref('')
const imageSrc = ref('')
const priceAed = ref(0)
const isFeatured = ref(false)
const chosenAuthor = ref('Select an author')

type WithAuthorName<T> = T & {
  authorName: string
}
const { data: authors } = useFetch('/api/Authors/')

type materialOptions = {
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
  } as materialOptions))

// *------------------*

async function submitForm () {
  const categoryTagName = JSON.parse(chosenFormatStructure.value).name
  const materials = materialArr.filter((material) => {
    return material.value.selected
  }).map((material) => {
    return material.value.value
  }) as EnumMaterial[]
  const chosenAuthorJson = (JSON.parse(chosenAuthor.value) as WithAuthorName<Author>)

  const { result } = await useFetch('/api/CatalogueItems/create', {
    method: 'POST',
    body: JSON.stringify({
      name: name.value,
      authorFirstName: chosenAuthorJson.firstName,
      authorLastName: chosenAuthorJson.lastName,
      description: description.value,
      imageSrc: imageSrc.value,
      priceAED: priceAed.value,
      isFeatured: isFeatured.value,
      categoryTagName,
      sizingsData: chosenFormatValues.value,
      materials
    })
  })
}

// *------------------*

const { data: categoryTags } = useFetch('/api/Categories')

const chosenFormatStructure: Ref<string> = ref(JSON.stringify({
  name: 'Loading formats..',
  sizings: [{
    name: 'Loading sizings..',
    size: 0
  }]
}))
const categoryFormats = computed(() => {
  if (categoryTags.value && categoryTags.value.length > 0 && categoryTags.value !== null) {
    const firstCategory = categoryTags.value[0] as CatalogueCategoryTag
    chosenFormatStructure.value = JSON.stringify(firstCategory)
  }

  return (categoryTags.value?.map(categoryTag => ({
    label: categoryTag.name,
    value: JSON.stringify(categoryTag)
  })) || [])
})
const chosenFormatValues = ref({
  name: '',
  sizings: [{
    name: '',
    size: 0
  }]
})
const chosenFormat = computed(() => {
  chosenFormatValues.value = JSON.parse(chosenFormatStructure.value)
  return chosenFormatValues.value
})
// *------------------*

const authorOptions = computed(() => {
  const defAuthorVal = JSON.stringify({
    firstName: 'MISSING NAME',
    lastName: 'MISSING NAME',
    authorName: 'MISSING NAME'
  })
  const defaultAuthor = [{
    label: '',
    value: defAuthorVal
  }]

  JSON.stringify({
    label: 'No authors found',
    value: {
      firstName: 'MISSING NAME',
      lastName: 'MISSING NAME',
      authorName: 'MISSING NAME'
    }
  })

  return authors.value?.map((author) => {
    const authorString = {
      label: `${author.firstName} ${author.lastName}`,
      value: JSON.stringify(author)
    }

    return authorString || defaultAuthor
  }) || defaultAuthor
})
</script>

<template>
  <div class="flex flex-col w-full  p-2 items-center">
    <NForm class="max-w-lg w-full bg-secondary p-4 rounded-md">
      <NFormItem label="Name">
        <NInput
          v-model:value="name"
          type="text"
        />
      </NFormItem>
      <NFormItem label="Author" class="capitalize">
        <NSelect
          v-model:value="chosenAuthor"
          :options="authorOptions"
        />
      </NFormItem>
      <NFormItem label="Description">
        <NInput
          v-model:value="description"
          type="textarea"
        />
      </NFormItem>
      <NFormItem label="Image Link">
        <NInput
          v-model:value="imageSrc"
          type="text"
        />
      </NFormItem>
      <NFormItem label="Price (AED)">
        <NInputNumber
          v-model:value="priceAed"
          type="number"
          min="0"
          max="1000"
          step="0.01"
          class="w-full"
        />
      </NFormItem>
      <NFormItem label="Category">
        <NFormItem>
          <NSelect v-model:value="chosenFormatStructure" :options="categoryFormats" />
        </NFormItem>
      </NFormItem>
      <NFormItem label="Featured" class="flex flex-col items-start">
        <NSwitch
          v-model:value="isFeatured"
          class="w-full"
        />
      </NFormItem>
      <div class="flex flex-col">
        <h1 class="text-white my-0">
          Sizings
        </h1>
        <NFormItem
          v-for="sizing in chosenFormat.sizingFormat"
          :key="sizing.name"
          :label="sizing.name"
          class="capitalize"
        >
          <NInputNumber v-model:value="sizing.size" type="number" min="0" max="1000" />
        </NFormItem>
      </div>
      <NSpace>
        <h1 class="text-white my-0">
          Materials
        </h1>
        <NCheckbox
          v-for="material in materialArr"
          :key="material.value.value"
          v-model:checked="material.value.selected"
        >
          {{ material.value.label }}
        </NCheckBox>
      </NSpace>
      <NButton
        strong
        round
        type="primary"
        class="w-full max-w-sm"
        @click="() => submitForm()"
      >
        Submit
      </NButton>
    </NForm>
    {{ chosenFormatValues }}
  </div>
</template>
