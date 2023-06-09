<script setup lang="ts">
import type { Template, Material } from '@prisma/client'
import TiltedHeading from '@/components/TiltedHeading.vue'
import TemplateCard from '@/components/TemplateCard.vue'
import IconFilterVue from '@/components/icons/IconFilter.vue'
import TemplateHoverCard from '@/components/TemplateHoverCard.vue'
import TemplatesFilter from '~/components/Filters/TemplatesFilter.vue'

useHead({
  title: 'Sewcial | Templates'
})

type WithMaterial<T> = T & {
  MaterialOnTemplate: {
    material: Material
  }[]
}
type TemplateWithMaterials = WithMaterial<Template>[]

const templates: Ref<TemplateWithMaterials> = ref([])
const filteredTemplates: Ref<TemplateWithMaterials | null> = ref(null)
const templatePage: Ref<Template[]> = ref([])

onMounted(async () => {
  if (sessionStorage.getItem('templates') !== null) {
    templates.value = JSON.parse(sessionStorage.getItem('templates')!)
    filteredTemplates.value = JSON.parse(sessionStorage.getItem('templates')!).filter((template: TemplateWithMaterials) => !template.isFeatured)
  } else {
    const { refresh } = await useFetch('/api/Templates/', {
      onResponse ({ response }) {
        // Needs to be converted to array
        const responseData = { ...response._data }
        const resList = []
        for (const item in responseData) {
          resList.push(responseData[item])
        }
        templates.value = resList

        // Featured templates won't go through filters and sorting anyway
        filteredTemplates.value = resList
          .filter((template: TemplateWithMaterials) => !template.isFeatured)

        useSessionStorage('templates', JSON.stringify(resList))
      }
    })
    // Ensures fetches are made on page load
    refresh()
  }
})

function toTemplate (templateUrl: string) {
  useRouter().push(`/templates/${templateUrl}`)
}

function onApplyFilter (newFilteredTemplates: TemplateWithMaterials) {
  filteredTemplates.value = newFilteredTemplates
}

const filterToggled = ref(false)
function onHideFilter () {
  filterToggled.value = false
}
function toggleFilter () {
  filterToggled.value = !filterToggled.value
}
</script>

<template>
  <main class="relative overflow-x-hidden">
    <!--Stickers-->
    <div class="sticker-container absolute w-full">
      <img class="hidden absolute -z-[5] left-0 top-0 transform translate-x-[-30%] translate-y-[20%] w-48 desktop:block" src="@/assets/images/Sticker_1.png" alt="">
      <img class="hidden absolute -z-[5] right-0 top-0 transform translate-x-[41%] translate-y-[10%] w-48 desktop:block" src="@/assets/images/Sticker_2.png" alt="">
    </div>
    <!-- Page Heading -->
    <div
      class="heading-container flex flex-col items-center py-8 px-default-w
    tablet:flex-row tablet:justify-between tablet:py-20 gap-x-20
    desktop:gap-x-60"
    >
      <div class="pb-6 px-8">
        <TiltedHeading class="bg-accent-1 transform translate-x-[-1em] translate-y-[.75em]">
          COMMUNITY
        </TiltedHeading>
        <h1 class="templates-heading capitalize text-secondary relative text-5xl">
          Templates
        </h1>
      </div>
      <p class="leading-6 text-dark mt-0">
        Here you'll find a treasure trove of free sewing templates for a variety of projects that can be sorted with our easy-to-use filter system. Click on a project to learn more and access a tutorial and download link for the sewing template. These templates are perfect for both beginners and experienced sewists alike, so dive in and start crafting!
      </p>
    </div>

    <!-- Featured section -->
    <section class="bg-accent-1 p-4 pr-0 desktop:p-20 no-scrollbar desktop:pr-0 min-h-[50rem]">
      <h2 class="text-primary">
        Featured
      </h2>
      <div
        v-if="templates.length > 0"
        class="flex overflow-x-scroll scrollbar-blue pb-2"
      >
        <template
          v-for="template in templates"
        >
          <TemplateCard
            v-if="template.isFeatured"
            :key="template.id"
            :image="template.thumbnail"
            @click="() => toTemplate(template.id)"
          >
            <template #item-name>
              {{ template.name }}
            </template>
            <template #owner>
              {{ template.authorFirstName }} {{ template.authorLastName }}
            </template>
            <template #description>
              {{ template.description }}
            </template>
          </TemplateCard>
        </template>
      </div>
    </section>

    <!-- Browse section -->
    <section class="bg-secondary p-8 outline-4 outline-dashed outline-secondary desktop:p-20 min-h-[50rem]">
      <h2 class="text-primary">
        Browse
      </h2>
      <div class="filter flex justify-between items-center mt-4">
        <p class="text-primary">
          {{ templates.length }} ITEMS
        </p>
        <div class="group relative flex flex-col">
          <div class="filter-options flex items-center gap-2">
            <div
              class="bg-primary bg-opacity-20 px-4 rounded-lg uppercase flex flex-row items-center justify-around gap-2 cursor-pointer
              hover:bg-opacity-40"
              @click="() => toggleFilter()"
            >
              <IconFilterVue />
              <p class="text-primary select-none">
                Filter
              </p>
            </div>
            <div class="desktop:relative mt-5">
              <TemplatesFilter
                v-if="templates.length > 0 && filterToggled"
                :templates="templates"
                class="absolute top-0 right-0 z-50 w-screen rounded-lg mt-5 max-w-md"
                @apply-filter="(newFilteredTemplates) => onApplyFilter(newFilteredTemplates)"
                @hide-filter="() => onHideFilter()"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="column-cards pt-4 gap-4 desktop:gap-8 columns-1 mobile:columns-3">
        <template
          v-for="template in templatePage"
        >
          <TemplateHoverCard
            v-if="!template.isFeatured"
            :key="template.id"
            class="mb-6"
            :image="template.thumbnail"
            :template-url="template.templateImage"
            @click="() => toTemplate(template.id)"
          >
            <template #item-name>
              {{ template.name }}
            </template>
            <template #owner-name>
              {{ template.authorFirstName }} {{ template.authorLastName }}
            </template>
          </TemplateHoverCard>
        </template>
      </div>
      <div class="paginate my-8">
        <Pagination
          v-if="templates.length > 0 && filteredTemplates"
          v-model="templatePage"
          :items-per-page="9"
          :original-list="filteredTemplates"
          alt-colors
        />
      </div>
    </section>
  </main>
</template>
