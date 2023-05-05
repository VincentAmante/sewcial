<script setup lang="ts">
import { Template, Material } from '@prisma/client'
import TiltedHeading from '@/components/TiltedHeading.vue'
import TemplateCard from '@/components/TemplateCard.vue'
import IconFilterVue from '@/components/icons/IconFilter.vue'
import TemplateHoverCard from '@/components/TemplateHoverCard.vue'

type WithMaterial<T> = T & {
  materials: {
    material: Material
  }[]
}
type TemplateWithMaterials = WithMaterial<Template>[]

const templates: Ref<TemplateWithMaterials | null> = ref(null)
const filteredTemplates: Ref<TemplateWithMaterials | null> = ref(null)

const { data, pending, error, refresh } = await useFetch('/api/templates/', {
  onResponse ({ response }) {
    // Needs to be converted to array
    const responseData = { ...response._data }
    const resList = []
    for (const item in responseData) {
      resList.push(responseData[item])
    }

    templates.value = resList
    filteredTemplates.value = resList
    console.log('loading')
  }
})
// Ensures fetches are made on page load
refresh()

function toTemplate (templateUrl: string) {
  useRouter().push(`/template/${templateUrl}`)
}

function onApplyFilter (newFilteredTemplates: TemplateWithMaterials) {
  filteredTemplates.value = newFilteredTemplates
}
</script>

<template>
  <main class="relative overflow-x-hidden">
    <!--Stickers-->
    <div class="sticker-container absolute w-full">
      <img class="hidden absolute -z-[5] left-0 top-0 transform translate-x-[-30%] translate-y-[20%] w-48 desktop:block" src="@/assets/images/Sticker_1.png" alt="">
      <img class="hidden absolute -z-[5] right-0 top-0 transform translate-x-[30%] translate-y-[10%] w-48 desktop:block" src="@/assets/images/Sticker_2.png" alt="">
    </div>
    <!-- Page Heading -->
    <div
      class="heading-container flex flex-col items-center py-8 px-default-w
    tablet:flex-row tablet:justify-between tablet:py-20 gap-x-20
    desktop:gap-x-60"
    >
      <div class="pb-6 px-8">
        <TiltedHeading class="transform translate-x-[-1em] translate-y-[.75em]">
          COMMUNITY
        </TiltedHeading>
        <h1 class="templates-heading capitalize text-secondary relative text-5xl">
          Templates
        </h1>
      </div>
      <p class="leading-6 text-dark mt-0">
        Lorem ipsum dolor sit amet consectetur. At purus maecenas nunc egestas sed. Tempor adipiscing venenatis praesent nisi tincidunt. Orci enim tristique aenean eu ac. Vel vestibulum imperdiet scelerisque dignissim in sagittis non dolor senectus. Sapien sodales tortor elementum suspendisse non mauris scelerisque.
      </p>
    </div>

    <!-- Featured section -->
    <section class="bg-accent-1 p-4 desktop:p-20">
      <h2 class="text-primary">
        Featured
      </h2>
      <div
        v-if="!pending && !error"
        class="flex overflow-scroll"
      >
        <template
          v-for="template in filteredTemplates"
        >
          <TemplateCard
            v-if="template.isFeatured"
            :key="template.id"
            :image="template.thumbnail"
          >
            <template #item-name>
              {{ template.name }}
            </template>
            <template #owner>
              {{ template.authorFirstName }} {{ template.authorLastName }}
            </template>
          </TemplateCard>
        </template>
      </div>
    </section>

    <!-- Browse section -->
    <section class="bg-secondary p-8 outline-4 outline-dashed outline-secondary desktop:p-20 ">
      <h2 class="text-secondary">
        Browse
      </h2>
      <div class="filter flex justify-between items-center mt-4">
        <p class="text-secondary">
          400 ITEMS
        </p>
        <div class="filter-options flex items-center gap-2 cursor-pointer uppercase bg-primary bg-opacity-20 rounded-lg px-4">
          <IconFilterVue />
          <p class="text-primary">
            Filter
          </p>
        </div>
      </div>

      <div class="column-cards pt-4 gap-4 desktop:gap-8 columns-2 desktop:columns-3">
        <TemplateHoverCard class="mb-6" :image="'https://i.pinimg.com/originals/81/fb/e1/81fbe1c31719a0bd6258fec7a34ad20c.jpg'">
          <template #item-name>
            ITEM NAME
          </template>
          <template #owner-name>
            OWNER'S NAME
          </template>
        </TemplateHoverCard>
        <TemplateHoverCard class="mb-6" :image="'https://i.pinimg.com/564x/e4/63/98/e46398c55b4125f51c33b3742c5a6aa0.jpg'">
          <template #item-name>
            ITEM NAME
          </template>
          <template #owner-name>
            OWNER'S NAME
          </template>
        </TemplateHoverCard>
        <TemplateHoverCard class="mb-6" :image="'https://i.pinimg.com/564x/03/14/5e/03145e4cc2f8a95f3bbe0028be946d91.jpg'">
          <template #item-name>
            ITEM NAME
          </template>
          <template #owner-name>
            OWNER'S NAME
          </template>
        </TemplateHoverCard>
        <TemplateHoverCard class="mb-6" :image="'https://i.pinimg.com/564x/23/c4/81/23c48185983ff59bd1df6da8e50530c0.jpg'">
          <template #item-name>
            ITEM NAME
          </template>
          <template #owner-name>
            OWNER'S NAME
          </template>
        </TemplateHoverCard>
        <TemplateHoverCard class="mb-6" :image="'https://i.pinimg.com/564x/cd/79/58/cd7958c4f5bb8af5d17b0acf9ce0a1bf.jpg'">
          <template #item-name>
            ITEM NAME
          </template>
          <template #owner-name>
            OWNER'S NAME
          </template>
        </TemplateHoverCard>
        <TemplateHoverCard class="mb-6" :image="'https://i.pinimg.com/564x/c5/e3/00/c5e3007fb19097f6485d945dc212bffa.jpg'">
          <template #item-name>
            ITEM NAME
          </template>
          <template #owner-name>
            OWNER'S NAME
          </template>
        </TemplateHoverCard>
        <TemplateHoverCard class="mb-6" :image="'https://i.pinimg.com/564x/b0/64/9b/b0649b47f772eff32155388dde42f478.jpg'">
          <template #item-name>
            ITEM NAME
          </template>
          <template #owner-name>
            OWNER'S NAME
          </template>
        </TemplateHoverCard>
        <TemplateHoverCard class="mb-6" :image="'https://i.pinimg.com/564x/12/f4/4a/12f44a7e16756e088ed14f4f98113b7d.jpg'">
          <template #item-name>
            ITEM NAME
          </template>
          <template #owner-name>
            OWNER'S NAME
          </template>
        </TemplateHoverCard>
        <TemplateHoverCard class="mb-6" :image="'https://i.pinimg.com/564x/34/e6/75/34e6756de25e19f8799ade7a9a58ace4.jpg'">
          <template #item-name>
            ITEM NAME
          </template>
          <template #owner-name>
            OWNER'S NAME
          </template>
        </TemplateHoverCard>
        <TemplateHoverCard class="mb-6" :image="'https://i.pinimg.com/564x/6d/44/7f/6d447f67c950729e8b2bdfc7fe37a160.jpg'">
          <template #item-name>
            ITEM NAME
          </template>
          <template #owner-name>
            OWNER'S NAME
          </template>
        </TemplateHoverCard>
        <TemplateHoverCard class="mb-6" :image="'https://i.pinimg.com/564x/34/c1/f9/34c1f9aba7f0085ca1ea447af8920627.jpg'">
          <template #item-name>
            ITEM NAME
          </template>
          <template #owner-name>
            OWNER'S NAME
          </template>
        </TemplateHoverCard>
        <TemplateHoverCard class="mb-6" :image="'https://i.pinimg.com/564x/99/16/ec/9916ecb60b4098637c3db2e6ec701aef.jpg'">
          <template #item-name>
            ITEM NAME
          </template>
          <template #owner-name>
            OWNER'S NAME
          </template>
        </TemplateHoverCard>
      </div>
    </section>
  </main>
</template>
