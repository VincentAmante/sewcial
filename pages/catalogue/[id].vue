<script setup lang="ts">
import type { CatalogueItem } from '@prisma/client'
import { EnumMaterial } from '~/enums/Material'
import ItemDescription from '@/components/ItemDescription.vue'
import ItemImage from '@/components/ItemImage.vue'
import { useUserStore } from '~/stores/useUserStore'

const title = ref('Sewcial |')
useHead({
  title
})

definePageMeta({
  layout: 'shop'
})

const route = useRoute()
if (route.params.id === undefined) {
  showError('No ID provided')
}

type MaterialsData = {
  materials?: EnumMaterial[]
}
type CatalogueItemWithMaterials = CatalogueItem & MaterialsData
const itemPlaceholder: CatalogueItemWithMaterials = {
  id: 'NULL ID',
  name: 'loading name..',
  description: 'loading description..',
  priceAED: 0,
  imageSrc: '',
  categoryTagName: 'Loading category..',
  isFeatured: false,
  sizingsData: [{
    name: 'loading size..',
    size: 0
  }],
  materials: [] as EnumMaterial[],
  createdAt: new Date(),
  authorFirstName: '..',
  authorLastName: '..'
}
const catalogueItem: Ref<CatalogueItem> = ref(itemPlaceholder)

const itemIsLiked = ref(false)
const { refresh } = useFetch(`/api/CatalogueItems/${route.params.id}`, {
  onResponse ({ response }) {
    const data = response._data as CatalogueItem
    catalogueItem.value = data
    title.value = `Sewcial | ${data.name}`
  }
})
refresh()

const { user, isUserSet, updateLikedItems } = useUserStore()
if (isUserSet) {
  const { refresh: refreshIsLiked } = await useFetch('/api/CatalogueItems/isLiked', {
    method: 'POST',
    body: JSON.stringify({
      userId: user.id,
      catalogueItemId: route.params.id
    }),
    onResponse ({ response }) {
      itemIsLiked.value = response._data
    }
  })
  refreshIsLiked()
}

function onLike () {
  itemIsLiked.value = !itemIsLiked.value
  const { user, isUserSet } = useUserStore()
  if (isUserSet) {
    const url = itemIsLiked.value ? '/api/CatalogueItems/likeItem' : '/api/CatalogueItems/unlikeItem'
    useFetch(url, {
      method: 'POST',
      body: JSON.stringify({
        userId: user.id,
        catalogueItemId: catalogueItem.value.id
      }),
      onResponse () {
        const { refresh: refreshLiked } = useFetch('/api/CatalogueItems/getLikedIds', {
          body: {
            userId: user.id
          },
          onResponse ({ response }) {
            updateLikedItems(response._data.length)
          }
        })
        refreshLiked()
      }
    })
  }
}
</script>

<template>
  <main class="flex flex-col w-full text-secondary relative items-center my-desktop-h">
    <div class="flex flex-col items-center justify-center px-4 my-desktop-h gap-4 max-w-4xl w-full desktop:flex-row desktop:gap-20">
      <div class="uppercase self-start desktop:hidden">
        <div class="caption flex gap-2 text-base items-center">
          <NuxtLink to="/catalogue">
            Catalogue
          </NuxtLink>
          <AppIcon :icon="['fas', 'chevron-right']" />
          <p>
            {{ (catalogueItem.name) ? catalogueItem.name : 'Loading name..' }}
          </p>
        </div>
      </div>
      <ItemImage
        :image="catalogueItem.imageSrc"
        class="max-w-md"
      />
      <div class="w-full desktop:self-start flex flex-col">
        <div class="breadcrumb uppercase self-start hidden desktop:block">
          <div class="caption flex gap-2 text-base items-center">
            <NuxtLink to="/catalogue">
              Catalogue
            </NuxtLink>
            <AppIcon :icon="['fas', 'chevron-right']" />
            <p>
              {{ (catalogueItem.name) ? catalogueItem.name : 'Loading name..' }}
            </p>
          </div>
        </div>
        <ItemDescription
          :sizes="catalogueItem.sizingsData"
        >
          <template #item-name>
            {{ (catalogueItem.name) ? catalogueItem.name : 'Loading name..' }}
          </template>
          <template #owner-name>
            <!-- {{  }} -->
          </template>
          <template #description>
            {{ catalogueItem.description || 'Loading description..' }}
          </template>
          <template #sizing>
            XS
          </template>
        </ItemDescription>

        <div class="w-full flex items-center justify-center desktop:items-start desktop:justify-start desktop:mt-5 desktop:-ml-3">
          <LikeButton
            :is-liked="itemIsLiked"
            @click="() => onLike()"
          />
        </div>
      </div>

      <img
        class="hidden absolute left-0 top-0 w-[15%] desktop:block lgScreen:w-[10%] xlScreen:[5%]"
        src="@/assets/images/idsticker1.png"
      >
    </div>
  </main>
  <img
    class="hidden absolute right-0 bottom-0 w-[15%] desktop:block lgScreen:w-[10%] xlScreen:[5%]"
    src="@/assets/images/idsticker2.png"
  >
</template>
