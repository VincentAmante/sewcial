<script setup lang="ts">
import { ref } from 'vue'
import { Author, Skill, EnumMaterial, CatalogueCategoryTag } from '@prisma/client'
import { JSONContent, generateHTML } from '@tiptap/vue-3'
import { StarterKit } from '@tiptap/starter-kit'
import RichTextEditor from '~/components/FormFields/RichTextEditor.vue'
import { content } from '~/tailwind.config'

definePageMeta({
  layout: 'admin'
})

// Author Data
type WithAuthorName<T> = T & {
  authorName: string
}
const { data: authors } = useFetch('/api/Authors/')

type materialOptions = {
  label: string
  value: EnumMaterial
  selected: boolean
}

const materialArr = Object.keys(EnumMaterial).map((key: any) => EnumMaterial[key]).map(material => ref({
  label: material,
  value: (material as EnumMaterial),
  selected: false
} as materialOptions))

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

const name = ref('')
const description = ref('')
const detailsContent: JSONContent = ref({ type: 'doc', content: [] })
const priceAED = ref(0)
const isFeatured = ref(false)
const skill: Ref<Skill> = ref('beginner')
const chosenAuthor = ref('Select an author')
const imageSrc = ref('')
const templateImg = ref('')

const instructions = ref({
  materialsRequired: [''],
  equipment: [''],
  assembly: ['']
})

const skillOptions = computed(() => {
  const skillArr = Object.keys(Skill).map((key: any) => Skill[key])

  const materials = materialArr.filter((material) => {
    return material.value.selected
  }).map((material) => {
    return material.value.value
  }) as EnumMaterial[]

  return skillArr.map(skill => ({
    label: skill,
    value: (skill as Skill)
  }))
})

const sampleTemplateData = {
  name: 'name',
  description: 'description',
  details: 'details',
  priceAED: 0,
  isFeatured: false,
  skill: ('beginner' as Skill),
  categoryTagId: 'shirts'
  // authorFirstName: chosenAuthor.value.firstName,
  // authorLastName: chosenAuthor.value.lastName
}

// TODO: Switch out all the samples with the actual data
async function submitForm () {
  const chosenAuthorJson = (JSON.parse(chosenAuthor.value) as WithAuthorName<Author>)
  const materials = materialArr.filter((material) => {
    return material.value.selected
  }).map((material) => {
    return material.value.value
  }) as EnumMaterial[]

  const result = await useFetch('/api/Templates/create', {
    method: 'POST',
    body: JSON.stringify({
      name: name.value,
      authorFirstName: chosenAuthorJson.firstName,
      authorLastName: chosenAuthorJson.lastName,
      description: description.value,
      priceAED: priceAED.value,
      isFeatured: isFeatured.value,
      skill: (skill.value as Skill),
      categoryTagId: sampleTemplateData.categoryTagId,
      thumbnail: imageSrc.value,
      materials,
      materialsRequired: instructions.value.materialsRequired,
      equipment: instructions.value.equipment,
      assembly: instructions.value.assembly,
      templateImage: templateImg.value
    })
  })
}

// Safe to remove
const contentPreview = computed(() => {
  return generateHTML(detailsContent.value, [StarterKit])
})

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
      <NFormItem label="Image Link">
        <NInput
          v-model:value="imageSrc"
          type="text"
        />
      </NFormItem>
      <NFormItem label="Template Image Link">
        <NInput
          v-model:value="templateImg"
          type="text"
        />
      </NFormItem>
      <NFormItem label="Description">
        <NInput
          v-model:value="description"
          type="textarea"
        />
      </NFormItem>
      <!-- <NFormItem label="Details">
        <ClientOnly>
          <NSpace>
            <RichTextEditor
              v-model="detailsContent"
              :content="detailsContent"
              :placeholder="'Details'"
            />
            <div class="text-white">
              <h1>Preview</h1>
              <div v-html="contentPreview" />
            </div>
          </NSpace>
        </ClientOnly>
      </NFormItem> -->
      <div class="flex flex-col">
        <NFormItem label="Materials Required">
          <NDynamicInput v-model:value="instructions.materialsRequired" />
        </NFormItem>
        <div class="text-white bg-cyan-950 bg-opacity-80 p-1 pb-4 rounded-md">
          <h1>Preview</h1>
          <ul class="flex flex-col list-disc gap-2">
            <li
              v-for="(material, index) in instructions.materialsRequired"
              :key="index"
              class="ml-6"
            >
              {{ material }}
            </li>
          </ul>
        </div>
        <NFormItem label="Equipment">
          <NDynamicInput v-model:value="instructions.equipment" />
        </NFormItem>
        <div class="text-white bg-cyan-950 bg-opacity-80 p-1 pb-4 rounded-md">
          <h1>Preview</h1>
          <ul class="flex flex-col list-disc gap-2">
            <li
              v-for="(equipment, index) in instructions.equipment"
              :key="index"
              class="ml-6"
            >
              {{ equipment }}
            </li>
          </ul>
        </div>
        <NFormItem label="Assembly">
          <NDynamicInput v-model:value="instructions.assembly" />
        </NFormItem>
        <div class="text-white bg-cyan-950 bg-opacity-80 p-1 pb-4 rounded-md">
          <h1>Preview</h1>
          <ul class="flex flex-col list-disc gap-2">
            <li
              v-for="(assembly, index) in instructions.assembly"
              :key="index"
              class="ml-6"
            >
              {{ assembly }}
            </li>
          </ul>
        </div>
      </div>
      <NFormItem label="Price (AED)">
        <NInputNumber
          v-model:value="priceAED"
          type="number"
          min="0"
          max="1000"
          step="0.01"
          class="w-full"
        />
      </NFormItem>

      <NFormItem label="Featured" class="flex flex-col items-start">
        <NSwitch
          v-model:value="isFeatured"
          class="w-full"
        />
      </NFormItem>
      <NFormItem label="Category">
        <NFormItem>
          <NSelect v-model:value="chosenFormatStructure" :options="categoryFormats" />
        </NFormItem>
      </NFormItem>
      <NFormItem label="skill">
        <NSelect v-model:value="skill" :options="skillOptions" />
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
  </div>
</template>
