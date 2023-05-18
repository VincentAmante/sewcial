<script setup lang="ts">
import type { CatalogueItem, Material } from '@prisma/client'
import TiltedHeading from '@/components/TiltedHeading.vue'
import IconFilterBlue from '@/components/icons/IconFilterBlue.vue'
import CatalogueCard from '@/components/CatalogueCard.vue'
import Pagination from '@/components/Pagination.vue'
import { useUserStore } from '~/stores/useUserStore'
import CatalogueFilter from '~/components/Filters/CatalogueFilter.vue'

useHead({
  title: 'Sewcial | Liked Items'
})

definePageMeta({
  layout: 'shop',
  middleware: 'auth'
})

type WithMaterial<T> = T & {
  materials: {
    material: Material
  }[]
}
type CatalogueItemsWithMaterials = WithMaterial<CatalogueItem>[]

// Catalogue contains an original list of all catalogue items
const catalogue: Ref<CatalogueItemsWithMaterials | null> = ref(null)

// Filtered catalogue contains a filtered list of catalogue items
// This list tends to lose items due to filtering, so the filter reverts to ${catalogue} when no filters are applied
const filteredCatalogue: Ref<CatalogueItemsWithMaterials | null> = ref(null)
const cataloguePage: Ref<CatalogueItem[]> = ref([])

const { user } = useUserStore()
const { pending, error, refresh } = await useFetch('/api/CatalogueItems/getLiked', {
  method: 'POST',
  body: JSON.stringify({
    userId: user.id
  }),
  onResponse ({ response }) {
    // Needs to be converted to array
    const responseData = { ...response._data }
    const resList = []
    for (const item in responseData) {
      resList.push(responseData[item].catalogueItem)
    }

    catalogue.value = resList
    filteredCatalogue.value = resList
  }
})
// Ensures fetches are made on page load
refresh()

function toItem (itemUrl: string) {
  useRouter().push(`/catalogue/${itemUrl}`)
}

function onApplyFilter (newFilteredCatalogue: CatalogueItemsWithMaterials) {
  filteredCatalogue.value = newFilteredCatalogue
}

const filterToggled = ref(true)
function onHideFilter () {
  filterToggled.value = false
}
function onShowFilter () {
  filterToggled.value = true
}

const filterToggleStyling = computed(() => {
  if (filterToggled.value) {
    return ['desktop:translate-x-[0%]', 'desktop:block']
  } else {
    return ['desktop:translate-x-[-100%]', 'hidden', 'desktop:block']
  }
})
</script>

<template>
  <main>
    <div class="w-full relative overflow-hidden">
      <!-- Left sticker -->
      <!-- <img class="elements-left hidden absolute right-[90%] top-[15%] desktop:flex" src="@/assets/images/Sticker_1.png" width="190" height="250" alt=""> -->
      <div class="sticker-container absolute w-full">
        <img class="hidden absolute -z-[5] left-0 top-0 transform translate-x-[-30%] translate-y-[20%] w-48 desktop:block" src="@/assets/images/Sticker_1.png" alt="">
        <img class="hidden absolute -z-[5] right-0 top-0 transform translate-x-[41%] translate-y-[70%] w-36 desktop:block" src="@/assets/images/Sticker_2.png" alt="">
      </div>
      <!-- Page Heading -->
      <div class="heading-container w-full flex flex-row content-center justify-center py-8 tablet:py-20 border-b-secondary border-dashed border-b-4">
        <div class="page-heading">
          <TiltedHeading
            class="bg-accent-1 transform -translate-x-8 translate-y-4"
            big
          >
            your liked
          </TiltedHeading>
          <h1 class="text-h-big-boy capitalize text-secondary relative">
            Products
          </h1>
        </div>
      </div>

      <!-- Right sticker -->
      <!-- <div class="sticker-position">
        <img class="elements-right" src="@/assets/images/Sticker_2.png" width="150" height="175" alt="">
      </div> -->
    </div>

    <div class="catalogue-container flex flex-col desktop:flex-row">
      <!-- Filters -->
      <div class="flex flex-col border-b-4 desktop:border-b-0 border-dashed border-secondary desktop:border-none w-full self-start desktop:max-w-md p-4 h-full">
        <div
          class="flex flex-row items-center justify-end desktop:justify-start w-full gap-2 px-8 pt-4"
          @click="() => onShowFilter()"
        >
          <IconFilterBlue />
          <p class="text-secondary">
            Filter
          </p>
        </div>

        <div
          class="mt-5 flex flex-col items-center rounded-2xl desktop:items-start "
        >
          <CatalogueFilter
            v-if="!pending && !error && catalogue !== null"
            is-liked="true"
            :catalogue="catalogue"
            class="w-full z-[100] max-w-lg transition-all duration-500 ease-in-out pt-0"
            :class="filterToggleStyling"
            @apply-filter="(newFilteredCatalogue) => onApplyFilter(newFilteredCatalogue)"
            @hide-filter="() => onHideFilter()"
          />
        </div>
      </div>

      <!-- Catalogue Items -->
      <div class="flex flex-col w-full desktop:pt-8 desktop:border-l-4 desktop:border-dashed desktop:border-secondary h-full">
        <div
          v-if="!pending && !error"
          class="grid grid-cols-2 w-full self-center justify-center desktop:grid-cols-3 gap-4 tablet:gap-8 px-4"
        >
          <CatalogueCard
            v-for="item in cataloguePage"
            :key="item.id"
            :image="item.imageSrc"
            @click="() => toItem(item.id)"
          >
            <template #item-name>
              {{ item.name }}
            </template>
            <template #price>
              {{ item.priceAED }} AED
            </template>
            <template #description>
              {{ item.description }}
            </template>
          </CatalogueCard>
        </div>
      </div>
    </div>
    <!-- Paginate -->
    <div class="paginate my-8">
      <Pagination
        v-if="!pending && !error && filteredCatalogue"
        v-model="cataloguePage"
        :items-per-page="9"
        :original-list="filteredCatalogue"
      />
    </div>
  </main>
</template>

<!-- Styling -->
<!-- <style scoped lang="scss">

//Heading
.container {
    .heading-container {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    padding-block: 2em;

    @include media(tablet) {
        padding-block: 5em;
    }

    .main-heading{
        text-transform: capitalize;
        color: $clr-secondary;
        position: relative;
        margin: -20px 0 0 15px;

        @include media(tablet) {
            margin: -30px 0 0 50px;
        }
    }
}

// Stickers

.sticker-position {
    display: none;
    position: absolute;
    right: 0%;
    bottom: 0%;
    left: 90%;
    top: 18%;

    @include media(desktop) {
        display: flex;
        overflow: hidden;
    }
 }

.elements-left {
    display: none;
    position: absolute;
    right: 90%;
    top: 13%;

    @include media(desktop) {
        display: flex;
    }
}
}

// Products
.browse-container {
    color: $clr-primary;
    display: flex;
    flex-direction: column;
    border-top: 4px dashed $clr-secondary;
    .filter {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 3em;
        margin-inline: 2em;
        color: $clr-secondary;

        @include media (tablet) {
            margin-inline: 4em;
        }

        @include media (desktop) {
            margin-inline: 5em;
        }

        .filter-dropdown {
            display:  flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5em;
        }
    }

    .grid-container {
            display: flex;
            align-content: center;
            width: 100%;

            .catalogue-grid {
                display: grid;
                grid-template-columns: 50% 50%;
                margin-inline: auto;
                align-self: center;
                justify-content: center;

                @include media (mobile) {
                    grid-template-columns: 45% 45%;
                }
            }

            .grid-item {
                height: 10%;
            }
        }

    @include media (desktop) {

        .filters-dropdown {
            display: none;
        }

        .filters-container {
            display: flex;
        }

        .grid-container {
            margin-top: 2em;

            .catalogue-grid{
                grid-template-columns: 30% 30% 30%;
            }
        }
    }
}
.paginate {
    margin-block: 2em;
}

</style> -->
